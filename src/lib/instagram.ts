import { z } from "zod";

const INSTAGRAM_USERNAME = "ws.inovacoes";
const INSTAGRAM_APP_ID = "936619743392459";
const INSTAGRAM_API_URL =
  `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`;

const captionSchema = z.object({
  node: z.object({
    text: z.string(),
  }),
});

const mediaNodeSchema = z.object({
  id: z.string(),
  shortcode: z.string(),
  __typename: z.string(),
  display_url: z.string().url(),
  thumbnail_src: z.string().url().optional(),
  taken_at_timestamp: z.number(),
  edge_media_to_caption: z.object({
    edges: z.array(captionSchema),
  }),
});

const instagramResponseSchema = z.object({
  data: z.object({
    user: z.object({
      username: z.string(),
      full_name: z.string(),
      profile_pic_url: z.string().url().optional(),
      profile_pic_url_hd: z.string().url().optional(),
      edge_owner_to_timeline_media: z.object({
        edges: z.array(
          z.object({
            node: mediaNodeSchema,
          }),
        ),
      }),
    }),
  }),
});

export type InstagramFeed = {
  profile: {
    username: string;
    fullName: string;
    profileImageUrl: string | null;
  };
  posts: Array<{
    id: string;
    caption: string;
    imageUrl: string;
    permalink: string;
    publishedAt: string;
    type: "post" | "reel";
  }>;
};

function getPermalink(shortcode: string, type: "post" | "reel") {
  const route = type === "reel" ? "reel" : "p";
  return `https://www.instagram.com/${route}/${shortcode}/`;
}

export async function getInstagramFeed(limit = 3): Promise<InstagramFeed | null> {
  try {
    const response = await fetch(INSTAGRAM_API_URL, {
      headers: {
        Accept: "application/json",
        Referer: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        "x-ig-app-id": INSTAGRAM_APP_ID,
      },
      next: {
        revalidate: 1800,
      },
    });

    if (!response.ok) {
      console.error("Instagram feed request failed", response.status);
      return null;
    }

    const json = await response.json();
    const parsed = instagramResponseSchema.safeParse(json);

    if (!parsed.success) {
      console.error("Instagram feed schema parsing failed", parsed.error.flatten());
      return null;
    }

    const user = parsed.data.data.user;
    const posts = user.edge_owner_to_timeline_media.edges
      .map(({ node }) => {
        const type: "post" | "reel" =
          node.__typename === "GraphVideo" ? "reel" : "post";
        const caption = node.edge_media_to_caption.edges[0]?.node.text ?? "";

        return {
          id: node.id,
          caption,
          imageUrl: node.thumbnail_src ?? node.display_url,
          permalink: getPermalink(node.shortcode, type),
          publishedAt: new Date(node.taken_at_timestamp * 1000).toISOString(),
          type,
        };
      })
      .slice(0, limit);

    if (posts.length === 0) {
      return null;
    }

    return {
      profile: {
        username: user.username,
        fullName: user.full_name,
        profileImageUrl: user.profile_pic_url_hd ?? user.profile_pic_url ?? null,
      },
      posts,
    };
  } catch (error) {
    console.error("Instagram feed unexpected error", error);
    return null;
  }
}

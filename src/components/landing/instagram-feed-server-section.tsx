import { InstagramFeedSection } from "@/components/landing/instagram-feed-section";
import { getInstagramFeed } from "@/lib/instagram";

export async function InstagramFeedServerSection() {
  const feed = await getInstagramFeed(3);

  if (!feed) {
    return null;
  }

  return <InstagramFeedSection feed={feed} />;
}

"use client";

import Image from "next/image";
import { Camera, Play } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { InstagramFeed } from "@/lib/instagram";

const INSTAGRAM_URL = "https://www.instagram.com/ws.inovacoes/";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

type InstagramFeedSectionProps = {
  feed: InstagramFeed;
};

function formatInstagramDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getExcerpt(caption: string) {
  const trimmed = caption.replace(/\s+/g, " ").trim();

  if (!trimmed) {
    return "Confira uma das publicações mais recentes da WS Inovações no Instagram.";
  }

  return trimmed;
}

export function InstagramFeedSection({ feed }: InstagramFeedSectionProps) {
  return (
    <motion.section
      id="instagram"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-6 py-20 md:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase text-brand-blue">
              Instagram
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
              Acompanhe a WS no Instagram
            </h2>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 self-start rounded-lg border border-brand-silver/50 bg-background/80 px-4 py-3 transition-colors hover:border-brand-blue/40"
          >
            {feed.profile.profileImageUrl ? (
              <div className="relative size-12 overflow-hidden rounded-full border border-brand-silver/40">
                <Image
                  src={feed.profile.profileImageUrl}
                  alt={`Perfil do Instagram ${feed.profile.username}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Instagram</span>
              <span className="font-semibold text-brand-dark">
                @{feed.profile.username}
              </span>
            </div>
          </a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {feed.posts.map((post) => (
            <motion.a
              key={post.id}
              variants={itemVariants}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <Card className="h-full overflow-hidden border-brand-silver/50 bg-background/90">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt="Publicação recente da WS Inovações no Instagram"
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,60,0.04),rgba(13,31,60,0.02),rgba(13,31,60,0.72))]" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {post.type === "reel" ? (
                      <Play className="size-3.5 fill-current" />
                    ) : (
                      <Camera className="size-3.5" />
                    )}
                    {post.type === "reel" ? "Reel" : "Post"}
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <span>{feed.profile.fullName}</span>
                    <span>{formatInstagramDate(post.publishedAt)}</span>
                  </div>
                  <p className="[display:-webkit-box] overflow-hidden text-sm leading-7 text-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                    {getExcerpt(post.caption)}
                  </p>
                </div>
              </Card>
            </motion.a>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Camera data-icon="inline-start" />
              Seguir no Instagram
            </a>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

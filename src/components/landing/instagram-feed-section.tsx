"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/ws.inovacoes/";
const INSTAGRAM_POSTS = [
  "https://www.instagram.com/p/DXFrNsSkU0Z/",
  "https://www.instagram.com/p/DXDNPFwjdoF/",
  "https://www.instagram.com/p/DWzq54lDRJ1/",
];

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

function processInstagramEmbeds() {
  window.instgrm?.Embeds?.process?.();
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramFeedSection() {
  useEffect(() => {
    const raf = window.requestAnimationFrame(processInstagramEmbeds);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.section
      id="instagram"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden px-4 py-14 sm:px-6 sm:py-18 md:px-8 md:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase text-brand-blue">
            Instagram
          </p>
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            <h2 className="text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl md:text-5xl">
              Acompanhe a WS no Instagram
            </h2>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="mx-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
            >
              <InstagramGlyph className="size-4" />
              @ws.inovacoes
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          {INSTAGRAM_POSTS.map((postUrl, index) => (
            <motion.div
              key={postUrl}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className="min-w-0"
            >
              <div className="mx-auto flex min-h-[35rem] w-full min-w-0 max-w-[34rem] overflow-hidden rounded-lg border border-brand-silver/35 bg-white p-2 shadow-[0_18px_40px_rgba(13,31,60,0.08)] sm:min-h-[38rem] sm:p-3 md:max-w-none">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={postUrl}
                  data-instgrm-version="14"
                  style={{
                    background: "#ffffff",
                    border: 0,
                    borderRadius: "12px",
                    boxShadow: "none",
                    margin: 0,
                    maxWidth: "100%",
                    minWidth: 0,
                    padding: 0,
                    width: "100%",
                  }}
                >
                  <a href={postUrl} target="_blank" rel="noreferrer">
                    Ver publicação no Instagram
                  </a>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">
              <InstagramGlyph className="size-4" />
              Seguir no Instagram
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processInstagramEmbeds}
        onReady={processInstagramEmbeds}
      />
    </motion.section>
  );
}

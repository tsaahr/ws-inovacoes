"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { ViewportSectionBody } from "@/components/landing/viewport-section-body";
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
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const raf = window.requestAnimationFrame(processInstagramEmbeds);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  function handleMobileScroll() {
    const node = mobileCarouselRef.current;

    if (!node) {
      return;
    }

    const nextIndex = Math.round(node.scrollLeft / node.clientWidth);
    setActiveSlide((current) => (current === nextIndex ? current : nextIndex));
  }

  function scrollToSlide(index: number) {
    const node = mobileCarouselRef.current;

    if (!node) {
      return;
    }

    node.scrollTo({
      left: node.clientWidth * index,
      behavior: "smooth",
    });
    setActiveSlide(index);
  }

  function goToNextSlide() {
    const nextIndex = (activeSlide + 1) % INSTAGRAM_POSTS.length;
    scrollToSlide(nextIndex);
  }

  function goToPreviousSlide() {
    const previousIndex =
      (activeSlide - 1 + INSTAGRAM_POSTS.length) % INSTAGRAM_POSTS.length;
    scrollToSlide(previousIndex);
  }

  return (
    <motion.section
      id="instagram"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden px-4 sm:px-6 md:px-8"
    >
      <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-8">
          <div className="hidden flex-col gap-4 text-center md:flex">
            <p className="text-sm font-semibold uppercase text-brand-blue">
              Instagram
            </p>
            <div className="mx-auto flex max-w-3xl flex-col gap-3">
              <h2 className="text-2xl font-semibold leading-tight text-brand-dark sm:text-3xl md:text-4xl xl:text-5xl">
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

          <div className="flex items-center justify-between gap-3 md:hidden">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
                Instagram
              </p>
              <h2 className="text-[1.35rem] font-semibold leading-[1.05] text-brand-dark">
                Posts recentes
              </h2>
            </div>
            <Button asChild size="sm" className="h-8 shrink-0 px-3 text-xs">
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">
                <InstagramGlyph className="size-3.5" />
                Seguir
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <div
              ref={mobileCarouselRef}
              onScroll={handleMobileScroll}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {INSTAGRAM_POSTS.map((postUrl) => (
                <div
                  key={postUrl}
                  className="w-full shrink-0 snap-center"
                >
                  <div className="flex h-[24rem] items-start justify-center overflow-hidden rounded-lg border border-brand-silver/35 bg-white p-2 shadow-[0_18px_40px_rgba(13,31,60,0.08)]">
                    <div className="origin-top scale-[0.88]">
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
                          maxWidth: "17.5rem",
                          minWidth: "17.5rem",
                          padding: 0,
                          width: "17.5rem",
                        }}
                      >
                        <a href={postUrl} target="_blank" rel="noreferrer">
                          Ver publicação no Instagram
                        </a>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Voltar para o post anterior"
                className="size-8 rounded-full border-brand-silver/50"
                onClick={goToPreviousSlide}
              >
                <ArrowLeft />
              </Button>

              <div className="flex items-center gap-2">
                {INSTAGRAM_POSTS.map((_, index) => (
                  <button
                    key={`instagram-dot-${index}`}
                    type="button"
                    aria-label={`Ir para o post ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === index
                        ? "w-5 bg-brand-blue"
                        : "w-2 bg-brand-silver/65"
                    }`}
                    onClick={() => scrollToSlide(index)}
                  />
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Ir para o próximo post"
                className="size-8 rounded-full border-brand-silver/50"
                onClick={goToNextSlide}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>

          <div className="hidden grid-cols-1 gap-4 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
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
                <div className="mx-auto flex min-h-[26rem] w-full min-w-0 max-w-[34rem] overflow-hidden rounded-lg border border-brand-silver/35 bg-white p-2 shadow-[0_18px_40px_rgba(13,31,60,0.08)] sm:min-h-[30rem] sm:p-3 md:max-w-none lg:min-h-[34rem]">
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

          <div className="hidden justify-center md:flex">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">
                <InstagramGlyph className="size-4" />
                Seguir no Instagram
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </ViewportSectionBody>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processInstagramEmbeds}
        onReady={processInstagramEmbeds}
      />
    </motion.section>
  );
}

"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ViewportSectionBodyProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  mode?: "always" | "auto";
  fallback?: "natural";
  profile?: "hero" | "standard" | "dense";
  mobileFit?: "default" | "strict";
};

type ViewportFitState = "fit" | "natural";

const COMPACT_VIEWPORT_HEIGHT = 720;
const COMPACT_VIEWPORT_WIDTH = 380;
const MOBILE_BREAKPOINT = 768;

function getFitPadding(
  profile: ViewportSectionBodyProps["profile"],
  compact: boolean,
  strictMobile: boolean,
) {
  if (profile === "hero") {
    if (strictMobile) {
      return "h-full justify-center py-2.5 sm:py-6 lg:py-8";
    }

    return compact
      ? "h-full justify-center py-4 sm:py-6 lg:py-8"
      : "h-full justify-center py-6 sm:py-8 lg:py-12";
  }

  if (profile === "dense") {
    if (strictMobile) {
      return "h-full justify-center py-2.5 sm:py-4 lg:py-5";
    }

    return compact
      ? "h-full justify-center py-3 sm:py-4 lg:py-5"
      : "h-full justify-center py-4 sm:py-5 lg:py-6";
  }

  if (strictMobile) {
    return "h-full justify-center py-3 sm:py-5 lg:py-6";
  }

  return compact
    ? "h-full justify-center py-4 sm:py-5 lg:py-6"
    : "h-full justify-center py-5 sm:py-6 lg:py-8";
}

function getNaturalPadding(
  profile: ViewportSectionBodyProps["profile"],
  strictMobile: boolean,
) {
  if (profile === "hero") {
    if (strictMobile) {
      return "py-4 sm:py-8 lg:py-10";
    }

    return "py-6 sm:py-8 lg:py-10";
  }

  if (profile === "dense") {
    if (strictMobile) {
      return "py-5 sm:py-10 lg:py-12";
    }

    return "py-8 sm:py-10 lg:py-12";
  }

  if (strictMobile) {
    return "py-6 sm:py-12 lg:py-16";
  }

  return "py-10 sm:py-12 lg:py-16";
}

export function ViewportSectionBody({
  children,
  className,
  contentClassName,
  mode = "auto",
  fallback = "natural",
  profile = "standard",
  mobileFit = "default",
}: ViewportSectionBodyProps) {
  const viewportMeasureRef = useRef<HTMLDivElement>(null);
  const contentMeasureRef = useRef<HTMLDivElement>(null);
  const [fitState, setFitState] = useState<ViewportFitState>(fallback);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [isStrictMobile, setIsStrictMobile] = useState(false);

  useLayoutEffect(() => {
    const viewportMeasureNode = viewportMeasureRef.current;
    const contentMeasureNode = contentMeasureRef.current;

    if (!viewportMeasureNode || !contentMeasureNode) {
      return undefined;
    }

    let frame = 0;

    const evaluate = () => {
      frame = 0;

      const targetHeight = viewportMeasureNode.clientHeight;

      if (!targetHeight) {
        return;
      }

      const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT;
      const nextStrictMobile = mobileFit === "strict" && isMobileViewport;
      const nextCompact =
        isMobileViewport &&
        (nextStrictMobile ||
          targetHeight <= COMPACT_VIEWPORT_HEIGHT ||
          window.innerWidth <= COMPACT_VIEWPORT_WIDTH);
      const contentHeight = Math.ceil(contentMeasureNode.scrollHeight);
      const nextFitState =
        isMobileViewport && mode === "always" && contentHeight <= targetHeight
          ? "fit"
          : fallback;

      setIsStrictMobile((current) =>
        current === nextStrictMobile ? current : nextStrictMobile,
      );
      setIsCompactViewport((current) =>
        current === nextCompact ? current : nextCompact,
      );
      setFitState((current) =>
        current === nextFitState ? current : nextFitState,
      );
    };

    const scheduleEvaluate = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(evaluate);
    };

    scheduleEvaluate();

    const resizeObserver = new ResizeObserver(scheduleEvaluate);
    resizeObserver.observe(viewportMeasureNode);
    resizeObserver.observe(contentMeasureNode);

    window.addEventListener("resize", scheduleEvaluate);
    window.addEventListener("orientationchange", scheduleEvaluate);
    window.visualViewport?.addEventListener("resize", scheduleEvaluate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleEvaluate);
      window.removeEventListener("orientationchange", scheduleEvaluate);
      window.visualViewport?.removeEventListener("resize", scheduleEvaluate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [fallback, mobileFit, mode]);

  return (
    <div
      data-viewport-fit={fitState}
      data-viewport-profile={profile}
      data-viewport-compact={isCompactViewport ? "true" : "false"}
      data-viewport-mobile-fit={isStrictMobile ? "strict" : "default"}
      className={cn(
        "viewport-section-body",
        fitState === "fit" ? "h-[var(--viewport-section-height)]" : "h-auto",
        className,
      )}
    >
      <div ref={viewportMeasureRef} aria-hidden="true" className="viewport-section-measure" />

      <div
        className={cn(
          "viewport-section-layout flex w-full flex-col",
          fitState === "fit"
            ? getFitPadding(profile, isCompactViewport, isStrictMobile)
            : getNaturalPadding(profile, isStrictMobile),
        )}
      >
        <div ref={contentMeasureRef} className={cn("w-full", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

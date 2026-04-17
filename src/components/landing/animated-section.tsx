"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  type HTMLMotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  direction: "left" | "right";
  disableInitialHide?: boolean;
};

function isElementInitiallyVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08;
}

function isHashTarget(element: HTMLElement) {
  const hash = window.location.hash.slice(1);

  if (!hash) {
    return false;
  }

  const decodedHash = decodeURIComponent(hash);
  const target = document.getElementById(decodedHash);

  return element.id === decodedHash || Boolean(target && element.contains(target));
}

export function AnimatedSection({
  direction,
  disableInitialHide = false,
  className,
  children,
  ...props
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return undefined;
    }

    if (disableInitialHide || isHashTarget(node) || isElementInitiallyVisible(node)) {
      controls.set({ opacity: 1, x: 0 });
      return undefined;
    }

    controls.set({ opacity: 0, x: direction === "left" ? -60 : 60 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          controls.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [controls, direction, disableInitialHide]);

  return (
    <motion.section
      ref={sectionRef}
      initial={false}
      animate={controls}
      className={cn("overflow-x-clip", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}

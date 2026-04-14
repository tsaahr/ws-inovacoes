"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  direction: "left" | "right";
};

export function AnimatedSection({
  direction,
  className,
  children,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}

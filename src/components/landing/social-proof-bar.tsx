"use client";

import { Banknote, CalendarDays, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Users,
    label: "Clientes atendidos",
    value: 500,
    prefix: "+",
    suffix: "",
  },
  {
    icon: Banknote,
    label: "em crédito aprovado",
    value: 20,
    prefix: "R$ ",
    suffix: "M+",
  },
  {
    icon: CalendarDays,
    label: "Anos de experiência",
    value: 4,
    prefix: "",
    suffix: "",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);

      setCounts(stats.map((stat) => Math.round(stat.value * eased)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [hasStarted]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-8 py-12 text-white md:grid-cols-3 md:justify-items-center"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="mx-auto flex w-full max-w-xs flex-col items-center gap-3 text-center"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-white/10 text-white">
                <Icon />
              </div>
              <div className="flex flex-col gap-1">
                <strong className="text-3xl font-semibold tracking-tight">
                  {stat.prefix}
                  {counts[index] ?? 0}
                  {stat.suffix}
                </strong>
                <span className="text-sm leading-6 text-white/74">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

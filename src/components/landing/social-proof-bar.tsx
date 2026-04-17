"use client";

import { Banknote, CalendarDays, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";

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
  return (
    <div className="mx-auto w-full max-w-5xl">
      <motion.div
        variants={containerVariants}
        initial="visible"
        animate="visible"
        className="grid grid-cols-3 gap-1.5 py-2.5 text-white sm:gap-4 sm:py-3 md:justify-items-center md:gap-6 md:py-4 lg:py-5"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="mx-auto flex min-w-0 w-full flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/10 text-white sm:size-9 lg:size-10">
                <Icon className="size-3.5 sm:size-4.5 lg:size-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <strong className="text-lg font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </strong>
                <span className="mx-auto max-w-[4.5rem] text-[9px] leading-[0.875rem] text-white/78 sm:mx-0 sm:max-w-[8rem] sm:text-xs sm:leading-5 lg:text-sm lg:leading-6">
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

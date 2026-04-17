"use client";

import { CalendarDays, CreditCard, FileText, Trophy } from "lucide-react";
import { motion, type Variants } from "motion/react";

const steps = [
  {
    icon: FileText,
    title: "Escolha o plano ideal",
    description:
      "Encontre o consórcio que melhor se adapta às suas necessidades.",
  },
  {
    icon: CreditCard,
    title: "Pague parcelas sem juros",
    description:
      "Contribua mensalmente formando um fundo coletivo.",
  },
  {
    icon: CalendarDays,
    title: "Participe das assembleias",
    description:
      "Sorteios mensais e possibilidade de dar lances para ser contemplado antes.",
  },
  {
    icon: Trophy,
    title: "Seja contemplado",
    description:
      "Receba a carta de crédito e realize seu sonho com poder de compra à vista.",
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

export function HowItWorksTimeline() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-5"
    >
      <div className="absolute left-12 right-12 top-8 hidden h-px bg-brand-silver/45 lg:block" />

      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.15,
            }}
            className="relative flex flex-col gap-2.5 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
          >
            <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white shadow-sm lg:size-14">
              <Icon className="size-4 lg:size-6" />
            </div>
            <div className="rounded-lg bg-background/95 p-3 shadow-sm ring-1 ring-brand-silver/35 lg:min-h-[190px] lg:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-blue sm:text-sm">
                Etapa {index + 1}
              </p>
              <h3 className="mt-1.5 text-sm font-semibold leading-tight text-brand-dark sm:mt-3 sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-[1.125rem] text-muted-foreground sm:mt-3 sm:text-sm sm:leading-7">
                {step.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

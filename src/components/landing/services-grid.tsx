"use client";

import { ArrowRight, Briefcase, House, Tractor, Truck } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    icon: House,
    title: "Imóveis",
    description:
      "Conquiste sua casa própria, invista ou reforme sem pagar juros abusivos.",
  },
  {
    icon: Truck,
    title: "Veículos leves e pesados",
    description:
      "Do carro do dia a dia ao caminhão para o seu negócio, de forma econômica e planejada.",
  },
  {
    icon: Tractor,
    title: "Máquinas Agrícolas",
    description:
      "Renove sua frota de tratores e colheitadeiras sem comprometer o capital de giro.",
  },
  {
    icon: Briefcase,
    title: "Serviços",
    description:
      "Estudos, viagens, cirurgias e reformas com planejamento e sem juros.",
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function ServicesGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-2 xl:grid-cols-4"
    >
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <motion.div key={service.title} variants={cardVariants}>
            <Card className="flex h-full flex-col border-brand-silver/60">
              <CardHeader className="gap-2 p-3 sm:gap-4 sm:p-5">
                <div className="flex size-8 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue sm:size-11">
                  <Icon className="size-4 sm:size-5" />
                </div>
                <CardTitle className="text-sm leading-tight text-brand-dark sm:text-lg">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-[11px] leading-[1.125rem] sm:text-sm sm:leading-7">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto px-3 pb-3 pt-0 sm:px-5 sm:pb-5">
                <Button
                  asChild
                  variant="link"
                  className="h-auto px-0 text-xs text-brand-blue sm:text-sm"
                >
                  <a href="#contato">
                    Simular
                    <ArrowRight data-icon="inline-end" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

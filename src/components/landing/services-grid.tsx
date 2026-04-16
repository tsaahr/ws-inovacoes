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
      "Estudos, viagens, cirurgias, reformas — planeje qualquer serviço sem juros.",
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
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <motion.div key={service.title} variants={cardVariants}>
            <Card className="flex h-full flex-col border-brand-silver/60">
              <CardHeader className="gap-3 p-5 sm:gap-4 sm:p-6">
                <div className="flex size-11 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue sm:size-12">
                  <Icon />
                </div>
                <CardTitle className="text-lg text-brand-dark sm:text-xl">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm leading-6 sm:text-base sm:leading-7">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                <Button asChild variant="link" className="px-0 text-brand-blue">
                  <a href="#contato">
                    Simular consórcio
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

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
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
    >
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <motion.div key={service.title} variants={cardVariants}>
            <Card className="flex h-full flex-col border-brand-silver/60">
              <CardHeader className="gap-4">
                <div className="flex size-12 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue">
                  <Icon />
                </div>
                <CardTitle className="text-xl text-brand-dark">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
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

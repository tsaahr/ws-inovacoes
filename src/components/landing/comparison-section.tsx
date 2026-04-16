"use client";

import { CheckCircle2, Info, XCircle } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const comparisonItems = [
  {
    label: "Juros",
    consortium: "Zero juros",
    financing: "1,5% a 2,5% ao mês",
  },
  {
    label: "Entrada",
    consortium: "Não obrigatória",
    financing: "Geralmente 20%",
  },
  {
    label: "Burocracia",
    consortium: "Mínima",
    financing: "Alta",
  },
  {
    label: "Poder de compra",
    consortium: "Carta de crédito = à vista",
    financing: "Vinculado ao contrato",
  },
  {
    label: "Flexibilidade",
    consortium: "Você escolhe na contemplação",
    financing: "Bem definido na contratação",
  },
] as const;

export function ComparisonSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8"
    >
      <div className="flex max-w-3xl flex-col gap-3 sm:gap-4">
        <Badge
          variant="secondary"
          className="w-fit rounded-full bg-brand-blue/10 px-4 py-1 text-xs text-brand-blue sm:text-sm"
        >
          Entenda a diferença
        </Badge>
        <h2 className="text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl md:text-5xl">
          Consórcio vs Financiamento
        </h2>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Veja na prática por que o consórcio custa muito menos no longo prazo.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative flex h-full pt-4"
        >
          <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-medium text-white">
            Recomendado
          </span>

          <Card className="flex h-full w-full flex-col rounded-xl border-2 border-brand-blue shadow-none">
            <CardHeader className="px-4 pb-4 pt-5 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-brand-blue" />
                <p className="font-medium text-brand-dark">Consórcio WS</p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 sm:gap-4 sm:px-6 sm:pb-6">
              {comparisonItems.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[56px] items-start gap-3 rounded-lg border border-emerald-100/80 bg-emerald-50/70 px-3 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <div className="min-w-0">
                    <p className="text-[11px] leading-4 text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-[13px] font-medium leading-5 text-emerald-800">
                      {item.consortium}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex h-full pt-4"
        >
          <Card className="flex h-full w-full flex-col rounded-xl border border-border shadow-none">
            <CardHeader className="px-4 pb-4 pt-5 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-brand-silver" />
                <p className="font-medium text-muted-foreground">
                  Financiamento bancário
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 sm:gap-4 sm:px-6 sm:pb-6">
              {comparisonItems.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[56px] items-start gap-3 rounded-lg border border-border/70 bg-muted/40 px-3 py-3"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <div className="min-w-0">
                    <p className="text-[11px] leading-4 text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-[13px] leading-5 text-muted-foreground line-through">
                      {item.financing}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="flex items-start gap-3 rounded-xl border border-border bg-muted p-4"
      >
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
        <p className="text-sm leading-6 text-muted-foreground">
          Num financiamento de{" "}
          <span className="font-medium text-foreground">R$ 60.000</span> em{" "}
          <span className="font-medium text-foreground">60 meses</span>, você
          pode pagar até{" "}
          <span className="font-medium text-foreground">R$ 25.000 a mais</span>{" "}
          só em juros. No consórcio, esse valor vai inteiro para o seu crédito.
        </p>
      </motion.div>
    </motion.div>
  );
}

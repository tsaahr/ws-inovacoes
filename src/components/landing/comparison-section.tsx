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
      className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-8"
    >
      <div className="flex max-w-3xl flex-col gap-2 sm:gap-4">
        <Badge
          variant="secondary"
          className="w-fit rounded-full bg-brand-blue/10 px-3 py-1 text-[11px] text-brand-blue sm:px-4 sm:text-sm"
        >
          Entenda a diferença
        </Badge>
        <h2 className="text-[1.55rem] font-semibold leading-[1.05] text-brand-dark sm:text-4xl md:text-5xl">
          Por que consórcio custa menos? Veja a diferença prática
        </h2>
        <p className="text-xs leading-[1.375rem] text-muted-foreground sm:text-lg sm:leading-8">
          No mesmo valor de entrada do financiamento, o consórcio oferece zero
          juros, mais flexibilidade e 95% menos custo total. Veja como:
        </p>
      </div>

      <div className="grid grid-cols-2 items-stretch gap-2.5 sm:gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative flex h-full pt-3 sm:pt-4"
        >
          <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-blue px-2.5 py-0.5 text-[10px] font-medium text-white sm:-top-3 sm:px-4 sm:py-1 sm:text-xs">
            Recomendado
          </span>

          <Card className="flex h-full w-full flex-col rounded-xl border-2 border-brand-blue shadow-none">
            <CardHeader className="px-2.5 pb-2.5 pt-4 sm:px-6 sm:pb-4 sm:pt-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="size-1.5 rounded-full bg-brand-blue sm:size-2" />
                <p className="text-xs font-medium text-brand-dark sm:text-base">
                  Consórcio WS
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-2 px-2.5 pb-2.5 sm:gap-4 sm:px-6 sm:pb-6">
              {comparisonItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2 rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-2 py-2 sm:min-h-[56px] sm:gap-3 sm:px-3 sm:py-3"
                >
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-800 sm:size-4" />
                  <div className="min-w-0">
                    <p className="text-[10px] leading-[0.875rem] text-muted-foreground sm:text-[11px] sm:leading-4">
                      {item.label}
                    </p>
                    <p className="text-[11px] font-medium leading-4 text-emerald-900 sm:text-[13px] sm:leading-5">
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
          className="flex h-full pt-3 sm:pt-4"
        >
          <Card className="flex h-full w-full flex-col rounded-xl border border-border shadow-none">
            <CardHeader className="px-2.5 pb-2.5 pt-4 sm:px-6 sm:pb-4 sm:pt-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="size-1.5 rounded-full bg-brand-silver sm:size-2" />
                <p className="text-xs font-medium text-muted-foreground sm:text-base">
                  Financiamento
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-2 px-2.5 pb-2.5 sm:gap-4 sm:px-6 sm:pb-6">
              {comparisonItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2 rounded-lg border border-border/70 bg-muted/45 px-2 py-2 sm:min-h-[56px] sm:gap-3 sm:px-3 sm:py-3"
                >
                  <XCircle className="mt-0.5 size-3.5 shrink-0 text-red-500 sm:size-4" />
                  <div className="min-w-0">
                    <p className="text-[10px] leading-[0.875rem] text-muted-foreground sm:text-[11px] sm:leading-4">
                      {item.label}
                    </p>
                    <p className="text-[11px] leading-4 text-muted-foreground line-through sm:text-[13px] sm:leading-5">
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
        className="flex items-start gap-2 rounded-xl border border-border bg-muted p-3 sm:gap-3 sm:p-4"
      >
        <Info className="mt-0.5 size-4 shrink-0 text-brand-blue sm:size-5" />
        <p className="text-[11px] leading-[1.125rem] text-muted-foreground sm:text-sm sm:leading-6">
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

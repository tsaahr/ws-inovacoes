"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";

const CREDIT_PLANS = [
  { model: "VW001", credit: 45000, installment: 365.06 },
  { model: "VW002", credit: 50000, installment: 405.63 },
  { model: "VW003", credit: 55000, installment: 446.19 },
  { model: "VW004", credit: 60000, installment: 486.75 },
  { model: "VW005", credit: 65000, installment: 527.31 },
  { model: "VW006", credit: 70000, installment: 567.88 },
  { model: "VW007", credit: 75000, installment: 608.44 },
  { model: "VW008", credit: 80000, installment: 649.0 },
  { model: "VW009", credit: 85000, installment: 689.56 },
  { model: "VW010", credit: 90000, installment: 730.13 },
  { model: "VW011", credit: 120000, installment: 973.5 },
  { model: "VW012", credit: 130000, installment: 1054.63 },
  { model: "VW013", credit: 140000, installment: 1135.75 },
  { model: "VW014", credit: 150000, installment: 1216.88 },
  { model: "VW015", credit: 160000, installment: 1298.0 },
  { model: "VW016", credit: 170000, installment: 1379.13 },
  { model: "VW017", credit: 180000, installment: 1460.25 },
  { model: "VW018", credit: 190000, installment: 1541.38 },
  { model: "VW019", credit: 200000, installment: 1622.5 },
  { model: "VW020", credit: 210000, installment: 1703.63 },
  { model: "VW021", credit: 220000, installment: 1784.75 },
  { model: "VW022", credit: 230000, installment: 1865.88 },
  { model: "VW023", credit: 240000, installment: 1947.0 },
] as const;

const DEFAULT_PLAN_INDEX = CREDIT_PLANS.findIndex(
  (plan) => plan.credit === 80000,
);

export function CreditSimulator() {
  const [selectedIndex, setSelectedIndex] = useState(
    DEFAULT_PLAN_INDEX === -1 ? 0 : DEFAULT_PLAN_INDEX,
  );

  const selectedPlan = CREDIT_PLANS[selectedIndex] ?? CREDIT_PLANS[0];

  return (
    <Card className="border-brand-silver/60">
      <CardHeader className="gap-1.5 p-3 sm:p-5">
        <CardTitle className="text-base sm:text-xl">Simule seu crédito</CardTitle>
        <CardDescription className="text-xs leading-5 sm:text-sm">
          Valores reais da tabela do Plano Acesso Auto.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-3 pt-0 sm:gap-5 sm:p-5 sm:pt-0">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-end justify-between gap-3">
            <span className="text-[11px] text-muted-foreground sm:text-sm">
              Crédito da carta
            </span>
            <strong className="text-base text-brand-dark sm:text-xl">
              {formatCurrency(selectedPlan.credit)}
            </strong>
          </div>
          <Slider
            value={[selectedIndex]}
            min={0}
            max={CREDIT_PLANS.length - 1}
            step={1}
            onValueChange={(value) => setSelectedIndex(value[0] ?? selectedIndex)}
            aria-label="Valor do crédito"
          />
        </div>
        <div className="grid gap-2.5 md:grid-cols-2 sm:gap-3">
          <div className="rounded-lg bg-muted p-3 sm:p-4">
            <p className="text-[11px] text-muted-foreground sm:text-sm">
              Parcela mensal
            </p>
            <p className="mt-1.5 text-sm font-semibold text-brand-navy sm:mt-2 sm:text-lg">
              {formatCurrency(selectedPlan.installment)}
            </p>
          </div>
          <div className="rounded-lg bg-muted p-3 sm:p-4">
            <p className="text-[11px] text-muted-foreground sm:text-sm">Modelo</p>
            <p className="mt-1.5 text-sm font-semibold text-brand-dark sm:mt-2 sm:text-base">
              {selectedPlan.model}
            </p>
          </div>
        </div>
        <p className="text-[11px] leading-[1.125rem] text-muted-foreground sm:text-sm sm:leading-6">
          Tabela usada: Plano Acesso Auto, taxa de 0,22% ao mês. Valores
          sujeitos a atualização da administradora.
        </p>
      </CardContent>
    </Card>
  );
}

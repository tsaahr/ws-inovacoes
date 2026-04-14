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

const DEFAULT_PLAN_INDEX = CREDIT_PLANS.findIndex((plan) => plan.credit === 80000);

export function CreditSimulator() {
  const [selectedIndex, setSelectedIndex] = useState(
    DEFAULT_PLAN_INDEX === -1 ? 0 : DEFAULT_PLAN_INDEX,
  );

  const selectedPlan = CREDIT_PLANS[selectedIndex] ?? CREDIT_PLANS[0];

  return (
    <Card className="border-brand-silver/60">
      <CardHeader>
        <CardTitle>Simule seu crédito</CardTitle>
        <CardDescription>
          Valores reais da tabela do Plano Acesso Auto, com prazo de 100 meses.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Crédito da carta
            </span>
            <strong className="text-2xl text-brand-dark">
              {formatCurrency(selectedPlan.credit)}
            </strong>
          </div>
          <Slider
            value={[selectedIndex]}
            min={0}
            max={CREDIT_PLANS.length - 1}
            step={1}
            onValueChange={(value) =>
              setSelectedIndex(value[0] ?? selectedIndex)
            }
            aria-label="Valor do crédito"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Parcela mensal</p>
            <p className="mt-2 text-xl font-semibold text-brand-navy">
              {formatCurrency(selectedPlan.installment)}
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Prazo</p>
            <p className="mt-2 text-xl font-semibold text-brand-dark">
              100 meses
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Modelo</p>
            <p className="mt-2 text-xl font-semibold text-brand-dark">
              {selectedPlan.model}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Tabela usada: Plano Acesso Auto, taxa de 0,22% ao mês. Valores sujeitos a atualização da administradora.
        </p>
      </CardContent>
    </Card>
  );
}

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { LeadRow } from "@/lib/leads";

const leadsChartConfig = {
  leads: {
    label: "Leads",
    color: "var(--color-brand-blue)",
  },
} satisfies ChartConfig;

const statusColors = [
  "var(--color-brand-blue)",
  "var(--color-brand-navy)",
  "var(--color-brand-silver)",
  "var(--color-brand-dark)",
];

export function AdminDashboard({
  leads,
  error,
}: {
  leads: LeadRow[];
  error?: string;
}) {
  const dailyData = getDailyData(leads);
  const weeklyData = getWeeklyData(leads);
  const statusData = getStatusData(leads);
  const topModality = getTopValue(leads.map((lead) => lead.modality));
  const converted = leads.filter((lead) =>
    lead.status.toLowerCase().includes("convert"),
  ).length;
  const conversionRate = leads.length ? (converted / leads.length) * 100 : 0;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 md:px-8">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-blue">
            WS Inovações
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-brand-dark">
            Dashboard de leads
          </h1>
          <p className="mt-2 text-muted-foreground">
            Dados carregados da planilha conectada ao Apps Script.
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </header>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Total de leads" value={String(leads.length)} />
        <MetricCard title="Principal modalidade" value={topModality || "-"} />
        <MetricCard title="Convertidos" value={String(converted)} />
        <MetricCard
          title="Taxa de conversão"
          value={`${conversionRate.toFixed(1)}%`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leads por dia</CardTitle>
            <CardDescription>Últimos registros agrupados por data.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadsChartConfig} className="h-[280px]">
              <BarChart data={dailyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip
                  content={(props) => <ChartTooltipContent {...props} />}
                />
                <Bar dataKey="leads" fill="var(--color-leads)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads por semana</CardTitle>
            <CardDescription>Volume consolidado por semana.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadsChartConfig} className="h-[280px]">
              <BarChart data={weeklyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip
                  content={(props) => <ChartTooltipContent {...props} />}
                />
                <Bar dataKey="leads" fill="var(--color-leads)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Status de conversão</CardTitle>
            <CardDescription>Resumo baseado na coluna status.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ status: { label: "Status" } }}
              className="h-[260px]"
            >
              <PieChart>
                <Tooltip
                  content={(props) => <ChartTooltipContent {...props} />}
                />
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={54}
                  outerRadius={86}
                  paddingAngle={2}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.label}
                      fill={statusColors[index % statusColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads recentes</CardTitle>
            <CardDescription>Ultimos contatos recebidos da planilha.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Modalidade</TableHead>
                  <TableHead>Crédito</TableHead>
                  <TableHead>Parcela</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length ? (
                  leads.slice(0, 12).map((lead) => (
                    <TableRow key={`${lead.createdAt}-${lead.phone}`}>
                      <TableCell>{formatDateTime(lead.createdAt)}</TableCell>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.modality}</TableCell>
                      <TableCell>{lead.creditValue}</TableCell>
                      <TableCell>{lead.installment}</TableCell>
                      <TableCell>{lead.city}</TableCell>
                      <TableCell>{lead.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Nenhum lead encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function getDailyData(leads: LeadRow[]) {
  const grouped = new Map<string, number>();

  leads.forEach((lead) => {
    const date = normalizeDate(lead.createdAt);
    const key = date.toISOString().slice(0, 10);
    grouped.set(key, (grouped.get(key) || 0) + 1);
  });

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([key, leadsCount]) => ({
      label: formatShortDate(key),
      leads: leadsCount,
    }));
}

function getWeeklyData(leads: LeadRow[]) {
  const grouped = new Map<string, number>();

  leads.forEach((lead) => {
    const key = getWeekKey(normalizeDate(lead.createdAt));
    grouped.set(key, (grouped.get(key) || 0) + 1);
  });

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-10)
    .map(([key, leadsCount]) => ({
      label: formatShortDate(key),
      leads: leadsCount,
    }));
}

function getStatusData(leads: LeadRow[]) {
  const grouped = new Map<string, number>();

  leads.forEach((lead) => {
    const status = lead.status || "Novo";
    grouped.set(status, (grouped.get(status) || 0) + 1);
  });

  const data = Array.from(grouped.entries()).map(([label, value]) => ({
    label,
    value,
  }));

  return data.length ? data : [{ label: "Sem leads", value: 1 }];
}

function getTopValue(values: string[]) {
  const grouped = new Map<string, number>();

  values
    .filter(Boolean)
    .forEach((value) => grouped.set(value, (grouped.get(value) || 0) + 1));

  return Array.from(grouped.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function normalizeDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function getWeekKey(date: Date) {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString().slice(0, 10);
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${value}T00:00:00`));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(normalizeDate(value));
}

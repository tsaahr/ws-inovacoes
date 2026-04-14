import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisonRows = [
  ["Juros", "❌ Sem juros", "✅ 1,5% a 2,5% ao mês"],
  ["Entrada", "❌ Não obrigatória", "✅ Geralmente 20%"],
  ["Burocracia", "✅ Mínima", "❌ Alta"],
  ["Poder de compra", "✅ Carta de crédito = compra à vista", "❌ Financiamento vinculado"],
  ["Flexibilidade", "✅ Você escolhe o bem na contemplação", "❌ Bem definido na contratação"],
] as const;

export function ComparisonSection() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex max-w-3xl flex-col gap-4">
        <Badge
          variant="secondary"
          className="w-fit bg-brand-blue/10 text-brand-dark"
        >
          Entenda por que o consórcio é a escolha inteligente
        </Badge>
        <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
          Consórcio vs Financiamento
        </h2>
        <p className="text-lg leading-8 text-muted-foreground">
          Compare os dois caminhos e veja por que o consórcio entrega mais
          planejamento, menos custo financeiro e mais liberdade na compra.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-brand-silver/50 bg-background">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4">Feature</TableHead>
              <TableHead className="px-4 py-4 text-brand-dark">
                Consórcio WS
              </TableHead>
              <TableHead className="px-4 py-4">Financiamento Bancário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonRows.map((row) => (
              <TableRow key={row[0]}>
                <TableCell className="px-4 py-4 font-medium text-brand-dark">
                  {row[0]}
                </TableCell>
                <TableCell className="px-4 py-4">{row[1]}</TableCell>
                <TableCell className="px-4 py-4">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

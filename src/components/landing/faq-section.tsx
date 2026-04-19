"use client";

import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const faqs = [
  {
    question: "O que é uma administradora de consórcio?",
    answer:
      "A administradora é a empresa que gerencia todo o consórcio. Ela organiza os sorteios, recebe suas contribuições mensais, realiza os lances e libera a carta de crédito quando você é contemplado. Em troca, cobra uma taxa de administração pequena, que varia conforme o plano. Pense nela como um gerente de banco: ela cuida da saúde financeira do grupo.",
  },
  {
    question: "O que é contemplação e como funciona?",
    answer:
      "Contemplação é quando você pode finalmente usar seu crédito. Existem duas formas:\n\n1. Sorteio: Mensalmente, a administradora sorteia nomes de consorciados. Se seu nome sair, você é contemplado e pode usar o dinheiro para comprar.\n\n2. Lance: Você oferece um valor extra para ser contemplado mais rápido. Quem der o maior lance, ou vencer o sorteio entre lances iguais, é contemplado.\n\nQuando contemplado, você recebe uma carta de crédito com o dinheiro para comprar imóvel, veículo ou máquina na hora, como se fosse dinheiro à vista.",
  },
  {
    question: "Como posso ser contemplado?",
    answer:
      "Existem 3 estratégias principais:\n\n1. Esperar o sorteio: Todo mês a administradora sorteia nomes. Todos têm chance igual. É só sorte.\n\n2. Fazer um lance: Você oferece um valor extra para ser contemplado mais rápido. Quem der o maior valor é contemplado. Funciona como um leilão.\n\n3. Lance embutido: Você usa parte do seu próprio crédito para fazer um lance, sem gastar dinheiro do seu bolso. É uma estratégia para quem quer antecipar sem sacrificar a renda.\n\nDica: A melhor estratégia depende da sua urgência e do seu orçamento. Fale com nosso consultor. Ele vai ajudar a escolher!",
  },
  {
    question: "O que é lance?",
    answer:
      "Lance é uma oferta que você faz para ser contemplado mais rápido. Ao invés de esperar o sorteio, você oferece um valor extra à administradora. Quem ofertar o maior lance é contemplado naquele mês.\n\nTipos de lance:\n\n* Lance Livre: Você oferece qualquer valor. Quem der mais, ganha, tipo leilão.\n\n* Lance Fixo: A administradora define um valor fixo. Todos que oferecerem esse valor entram em um sorteio. Só quem ganhar paga.\n\n* Lance Embutido: Você usa parte do seu próprio crédito para fazer o lance, sem gastar dinheiro extra do seu bolso.\n\nImportante: Lance não garante contemplação 100%. Depende da estratégia e das regras da administradora.",
  },
  {
    question: "Como funciona o sorteio?",
    answer:
      "Todo mês, a administradora sorteia nomes usando a Loteria Federal. É totalmente transparente e imparcial. Todos têm chance igual.\n\nComo funciona na prática:\n\nSeu número de cota: Quando você entra no consórcio, recebe um número único, por exemplo 12345.\n\nSorteio mensal: A administradora usa os últimos 5 dígitos da Loteria Federal. Por exemplo, se sair 50345, quem tem cota 0345 é contemplado.\n\nSe já foi contemplado: Pula para o próximo número válido.\n\nResultado: Você recebe notificação e pode usar o crédito imediatamente.\n\nImportante: Sorteios acontecem todo mês. Quanto maior o grupo, mais chances de contemplação mensal.",
  },
  {
    question: "Preciso ter score alto para entrar?",
    answer:
      "Não! Todo mundo pode entrar em consórcio. Diferente do financiamento, consórcio não exige score alto nem análise de crédito rígida.\n\nO que importa:\n\n* Estar em dia com CPF, sem restrições graves.\n\n* Renda comprovada que pague a parcela, mínimo 30% da renda.\n\n* Documentos básicos, como RG, CPF e comprovante de renda.\n\nVantagem: Mesmo com score baixo, você entra no grupo e participa dos sorteios. Só na hora de usar o crédito, quando contemplado, é que pode haver análise mais detalhada.\n\nDica: Se tiver restrições, fale conosco. Temos administradoras mais flexíveis.",
  },
] as const;

export function FaqSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedFaq = useMemo(
    () => (selectedIndex === null ? null : faqs[selectedIndex] ?? null),
    [selectedIndex],
  );

  return (
    <>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-semibold uppercase text-brand-blue">FAQ</p>
            <h2 className="text-[1.55rem] font-semibold leading-[1.05] text-brand-dark">
              Tire as dúvidas principais antes de entrar no consórcio.
            </h2>
            <p className="text-xs leading-[1.375rem] text-muted-foreground">
              Toque em uma pergunta para abrir a resposta completa.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {faqs.map((faq, index) => (
              <button
                key={faq.question}
                type="button"
                className="flex min-h-[5.6rem] flex-col items-start justify-between rounded-lg border border-brand-silver/45 bg-background p-3 text-left shadow-sm transition-colors hover:border-brand-blue/45 hover:bg-secondary/50"
                onClick={() => setSelectedIndex(index)}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-blue">
                  Pergunta {index + 1}
                </span>
                <span className="text-sm font-medium leading-5 text-brand-dark">
                  {faq.question}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-blue">
                  Ler resposta
                  <ChevronRight className="size-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-[0.88fr_1.12fr] md:gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase text-brand-blue">FAQ</p>
            <h2 className="text-2xl font-semibold leading-tight text-brand-dark sm:text-3xl md:text-4xl xl:text-5xl">
              As respostas mais importantes antes de entrar no seu consórcio.
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="w-full rounded-lg border border-brand-silver/45 bg-background px-3 sm:px-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="whitespace-pre-line text-sm leading-6 sm:text-base sm:leading-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <Sheet
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedIndex(null);
          }
        }}
      >
        <SheetContent
          side="bottom"
          className="max-h-[calc(100svh-var(--site-navbar-offset)-0.5rem)] rounded-t-2xl px-0 pb-0"
        >
          <SheetHeader className="gap-2 border-b border-border/80 pb-3">
            <SheetTitle className="text-left text-base text-brand-dark">
              {selectedFaq?.question ?? "Pergunta"}
            </SheetTitle>
            <SheetDescription className="text-left text-xs leading-5">
              Resposta completa da WS Inovações.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto px-4 pb-6 pt-4">
            <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
              {selectedFaq?.answer}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

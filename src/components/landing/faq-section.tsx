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
      "O consórcio tem como prestadora de serviço uma administradora responsável pela gestão dos interesses do grupo de consorciados. A administradora cobra, pela prestação do serviço, uma taxa de administração que varia de acordo com cada empresa, modalidade de consórcio e prazo do plano. Cabe à administradora não apenas administrar como também zelar pela saúde financeira do grupo.",
  },
  {
    question: "O que é contemplação e como funciona?",
    answer:
      "Contemplação é quando o cliente passa a ter o direito de obter o crédito para a compra do objeto do plano. As contemplações ocorrem em assembleias realizadas mensalmente e só participam os clientes com os pagamentos realizados até a data de vencimento.",
  },
  {
    question: "Como posso ser contemplado?",
    answer:
      "As contemplações podem ocorrer das seguintes formas:\n\nSorteio: a apuração da cota sorteada será realizada com base na extração da Loteria Federal.\n\nLance: a oferta de lance deverá ocorrer até um dia antes da assembleia. É considerado como lance vencedor o consorciado que oferecer o maior percentual em relação ao valor do bem objeto do plano.",
  },
  {
    question: "O que é lance?",
    answer:
      "É o direito do consorciado concorrer à contemplação, mediante a antecipação de parcelas oferecidas por ocasião das assembleias dos grupos. Dependendo da disponibilidade de caixa do grupo, será contemplado o maior lance, de acordo com as regras contratuais.",
  },
  {
    question: "Como funciona o sorteio?",
    answer:
      "De acordo com a disponibilidade da caixa, um ou mais participantes do grupo serão sorteados para receber sua Carta de Crédito, no valor do plano a que aderiu, independentemente do número de prestações que tenha pago. O Sorteio serve apenas para definição da ordem de recebimento do crédito, uma vez que todos os participantes do grupo receberão até o final do plano.",
  },
  {
    question: "Preciso ter score alto para entrar?",
    answer:
      "Não necessariamente. Em muitos casos, o consórcio não exige um score alto como acontece em modalidades tradicionais de crédito. Ainda assim, a administradora realiza análise cadastral e documental conforme suas políticas, tanto na adesão quanto na contemplação. O mais importante é manter sua documentação regular e capacidade de seguir com as parcelas em dia.",
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

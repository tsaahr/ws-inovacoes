import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase text-brand-blue">FAQ</p>
        <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
          As respostas mais importantes antes de entrar no seu consórcio.
        </h2>
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="w-full rounded-lg border border-brand-silver/45 bg-background px-5"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="whitespace-pre-line text-base leading-7">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

import Image from "next/image";

import aboutPhoto from "../../Foto2.png";
import heroPhoto from "../../Foto1.jpeg";

import { AboutSection } from "@/components/landing/about-section";
import { AnimatedSection } from "@/components/landing/animated-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { CreditSimulator } from "@/components/landing/credit-simulator";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCtaBanner } from "@/components/landing/final-cta-banner";
import { FloatingWhatsAppButton } from "@/components/landing/floating-whatsapp-button";
import { HowItWorksTimeline } from "@/components/landing/how-it-works-timeline";
import { InstagramFeedSection } from "@/components/landing/instagram-feed-section";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { ServicesGrid } from "@/components/landing/services-grid";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { SmartWhatsAppLink } from "@/components/landing/smart-whatsapp-link";
import { Button } from "@/components/ui/button";
import { getInstagramFeed } from "@/lib/instagram";
import { onlyDigits } from "@/lib/utils";

export default async function Home() {
  const instagramFeedPromise = getInstagramFeed(3);
  const ownerPhone = onlyDigits(process.env.OWNER_PHONE || "") || "5500000000000";
  const whatsappMessage = "Olá, quero fazer uma simulação com a WS Inovações.";
  const instagramFeed = await instagramFeedPromise;

  return (
    <>
      <main id="inicio" className="flex flex-col overflow-x-hidden bg-background">
        <SiteNavbar
          ownerPhone={ownerPhone}
          whatsappMessage={whatsappMessage}
        />
        <FloatingWhatsAppButton
          phone={ownerPhone}
          message={whatsappMessage}
        />

        <AnimatedSection
          direction="left"
          className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-brand-dark pt-20 lg:min-h-[calc(100svh-5rem)]"
        >
          <div className="absolute inset-0 lg:left-[46%] xl:left-[52%] 2xl:left-[56%]">
            <Image
              src={heroPhoto}
              alt="Imagem principal da WS Inovações"
              fill
              sizes="100vw"
              className="object-cover object-[63%_18%] sm:object-[60%_20%] lg:object-[54%_16%] xl:object-[56%_18%] 2xl:object-[58%_20%]"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,60,0.94),rgba(13,31,60,0.82),rgba(13,31,60,0.32))] lg:bg-[linear-gradient(90deg,rgba(13,31,60,0.97)_0%,rgba(13,31,60,0.94)_36%,rgba(13,31,60,0.78)_52%,rgba(13,31,60,0.34)_72%,rgba(13,31,60,0.08)_100%)]" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 text-white md:px-8 md:py-20 lg:py-24 xl:py-28">
            <div className="max-w-[20rem] sm:max-w-2xl lg:max-w-[32rem]">
              <h1 className="break-words text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
                Planejamento e estratégia para sua contemplação acontecer com
                mais previsibilidade.
              </h1>
              <p className="mt-6 max-w-[20rem] text-lg leading-8 text-white/86 sm:max-w-xl lg:max-w-lg">
                Análise, acompanhamento e orientação para quem busca crédito de
                forma inteligente, seja para veículo, imóvel ou investimento.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contato">Simular meu crédito</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/70 bg-white/10 text-white hover:bg-white hover:text-brand-dark"
              >
                <SmartWhatsAppLink
                  phone={ownerPhone}
                  message={whatsappMessage}
                >
                  Falar no WhatsApp
                </SmartWhatsAppLink>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" className="bg-brand-navy px-6 md:px-8">
          <SocialProofBar />
        </AnimatedSection>

        <AnimatedSection
          id="contato"
          direction="left"
          className="relative scroll-mt-24 px-6 py-20 md:px-8"
        >
          <span
            id="lead-form"
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 -translate-y-24"
          />
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold uppercase text-brand-blue">
                Simulação gratuita
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
                Informe seu objetivo e receba um caminho viável.
              </h2>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                A primeira conversa organiza valor de crédito, perfil de parcela
                e melhor forma de acompanhar seu plano.
              </p>
            </div>
            <LeadCaptureForm />
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="sobre"
          direction="right"
          className="scroll-mt-24 bg-secondary/70 px-6 py-20 md:px-8"
        >
          <AboutSection image={aboutPhoto} />
        </AnimatedSection>

        <AnimatedSection
          id="servicos"
          direction="left"
          className="scroll-mt-24 px-6 py-20 md:px-8"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand-blue">
                Nossos serviços
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
                Soluções para cada conquista do seu planejamento.
              </h2>
            </div>
            <ServicesGrid />
          </div>
        </AnimatedSection>

        <AnimatedSection
          direction="right"
          className="bg-muted/70 px-6 py-20 md:px-8"
        >
          <ComparisonSection />
        </AnimatedSection>

        <AnimatedSection
          id="como-funciona"
          direction="left"
          className="scroll-mt-24 px-6 py-20 md:px-8"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand-blue">
                Como funciona
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
                Um processo claro do plano ideal até a carta contemplada.
              </h2>
            </div>
            <HowItWorksTimeline />
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="simulador"
          direction="right"
          className="scroll-mt-24 bg-secondary/70 px-6 py-20 md:px-8"
        >
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-center">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase text-brand-blue">
                Simulador
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
                Veja uma referência real antes da conversa.
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Navegue pelos valores da tabela atual e entenda quanto cada
                faixa de crédito representa em parcela no plano.
              </p>
            </div>
            <CreditSimulator />
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="faq"
          direction="left"
          className="scroll-mt-24 bg-muted/70 px-6 py-20 md:px-8"
        >
          <FaqSection />
        </AnimatedSection>

        {instagramFeed ? <InstagramFeedSection feed={instagramFeed} /> : null}

        <AnimatedSection direction="left" className="px-6 pb-20 md:px-8">
          <FinalCtaBanner
            ownerPhone={ownerPhone}
            whatsappMessage={whatsappMessage}
          />
        </AnimatedSection>
      </main>

      <SiteFooter
        ownerPhone={ownerPhone}
        whatsappMessage={whatsappMessage}
      />
    </>
  );
}

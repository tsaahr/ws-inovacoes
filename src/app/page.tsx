import { Suspense } from "react";
import Image from "next/image";

import aboutPhoto from "../../foto3.jpeg";
import heroPhoto from "../../Foto1.jpeg";

import { AboutSection } from "@/components/landing/about-section";
import { AnimatedSection } from "@/components/landing/animated-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { CreditSimulator } from "@/components/landing/credit-simulator";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCtaBanner } from "@/components/landing/final-cta-banner";
import { FloatingWhatsAppButton } from "@/components/landing/floating-whatsapp-button";
import { HowItWorksTimeline } from "@/components/landing/how-it-works-timeline";
import { InstagramFeedServerSection } from "@/components/landing/instagram-feed-server-section";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { ServicesGrid } from "@/components/landing/services-grid";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { SmartWhatsAppLink } from "@/components/landing/smart-whatsapp-link";
import { ViewportSectionBody } from "@/components/landing/viewport-section-body";
import { Button } from "@/components/ui/button";
import { onlyDigits } from "@/lib/utils";

export default async function Home() {
  const ownerPhone = onlyDigits(process.env.OWNER_PHONE || "") || "5500000000000";
  const whatsappMessage = "Olá, quero fazer uma simulação com a WS Inovações.";

  return (
    <>
      <main className="flex flex-col overflow-x-clip bg-background">
        <SiteNavbar
          ownerPhone={ownerPhone}
          whatsappMessage={whatsappMessage}
        />
        <FloatingWhatsAppButton
          phone={ownerPhone}
          message={whatsappMessage}
        />

        <AnimatedSection
          id="inicio"
          direction="left"
          disableInitialHide
          className="bg-brand-dark"
        >
          <div className="relative min-h-svh bg-brand-dark [--inicio-proof-height:6.5rem] sm:[--inicio-proof-height:6.25rem] md:min-h-[92svh] md:[--inicio-proof-height:7.25rem] lg:min-h-svh lg:[--inicio-proof-height:8rem]">
            <div className="relative min-h-[calc(100svh-var(--inicio-proof-height))] overflow-hidden bg-brand-dark md:min-h-[calc(92svh-var(--inicio-proof-height))] lg:min-h-[calc(100svh-var(--inicio-proof-height))]">
              <div className="absolute inset-0 sm:left-[8%] lg:left-[46%] xl:left-[52%] 2xl:left-[56%]">
                <Image
                  src={heroPhoto}
                  alt="Imagem principal da WS Inovações"
                  fill
                  sizes="(min-width: 1536px) 44vw, (min-width: 1280px) 48vw, (min-width: 1024px) 54vw, 100vw"
                  className="object-cover object-[68%_18%] sm:object-[66%_18%] md:object-[62%_18%] lg:object-[54%_16%] xl:object-[56%_18%] 2xl:object-[58%_20%]"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,60,0.82)_0%,rgba(13,31,60,0.78)_30%,rgba(13,31,60,0.9)_100%)] sm:bg-[linear-gradient(120deg,rgba(13,31,60,0.95)_0%,rgba(13,31,60,0.9)_34%,rgba(13,31,60,0.58)_62%,rgba(13,31,60,0.16)_100%)] lg:bg-[linear-gradient(90deg,rgba(13,31,60,0.97)_0%,rgba(13,31,60,0.94)_36%,rgba(13,31,60,0.78)_52%,rgba(13,31,60,0.34)_72%,rgba(13,31,60,0.08)_100%)]" />

              <div className="relative pt-[var(--site-navbar-offset)] md:flex md:min-h-[calc(92svh-var(--inicio-proof-height))] md:flex-col md:justify-center lg:min-h-[calc(100svh-var(--inicio-proof-height))]">
                <ViewportSectionBody
                  mode="always"
                  profile="hero"
                  mobileFit="strict"
                  className="px-3.5 [--viewport-section-height:calc(100svh-var(--site-navbar-offset)-var(--inicio-proof-height))] sm:px-6 md:px-8"
                >
                  <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-white sm:gap-6 lg:gap-8">
                    <div className="max-w-[16.75rem] sm:max-w-2xl lg:max-w-[38rem] xl:max-w-[41rem]">
                      <h1 className="text-[1.7rem] font-semibold leading-[1.03] text-balance sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.45rem]">
                        Compre seu sonho com inteligência, sem juros.
                      </h1>
                      <p className="mt-2.5 max-w-[16.75rem] text-xs leading-[1.375rem] text-white/86 sm:mt-5 sm:max-w-xl sm:text-base sm:leading-7 lg:max-w-lg lg:text-lg lg:leading-8">
                        Consórcios de imóvel, veículos e investimentos. Parcelas
                        baixas, zero burocracias. Mais de 500 clientes já realizaram
                        seus sonhos. Simule agora!
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
                      <Button
                        asChild
                        size="lg"
                        className="h-10 w-full px-4 text-sm sm:h-12 sm:w-auto sm:px-6"
                      >
                        <a href="#contato">Simular meu crédito</a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-10 w-full border-white/70 bg-white/10 px-4 text-sm text-white hover:bg-white hover:text-brand-dark sm:h-12 sm:w-auto sm:px-6"
                      >
                        <SmartWhatsAppLink phone={ownerPhone} message={whatsappMessage}>
                          Falar no WhatsApp
                        </SmartWhatsAppLink>
                      </Button>
                    </div>
                  </div>
                </ViewportSectionBody>
              </div>
            </div>

            <div className="relative flex min-h-[var(--inicio-proof-height)] items-center bg-brand-navy px-4 sm:px-6 md:px-8">
              <SocialProofBar />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="contato"
          direction="left"
          className="relative bg-secondary/70 px-4 sm:px-6 md:px-8"
        >
          <span
            id="lead-form"
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0"
          />

          <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
            <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-8">
              <div className="flex flex-col gap-2.5 sm:gap-4">
                <p className="text-sm font-semibold uppercase text-brand-blue">
                  Simulação gratuita
                </p>
                <h2 className="text-[1.55rem] font-semibold leading-[1.05] text-brand-dark sm:text-3xl md:text-4xl xl:text-5xl">
                  Descubra seu melhor plano em 3 minutos.
                </h2>
                <p className="max-w-xl text-xs leading-[1.375rem] text-muted-foreground sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                  Informe o que você quer, imóvel, carro ou máquina, e receba uma
                  simulação personalizada com parcelas que cabem no seu bolso. Sem
                  compromisso, sem surpresas.
                </p>
              </div>
              <div className="relative rounded-lg bg-brand-navy p-2 shadow-[0_22px_60px_rgba(13,31,60,0.22)] ring-1 ring-brand-blue/20 sm:p-3 md:p-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 top-3 h-px rounded-full bg-white/20 sm:inset-x-4"
                />
                <div className="relative">
                  <LeadCaptureForm />
                </div>
              </div>
            </div>
          </ViewportSectionBody>
        </AnimatedSection>

        <AnimatedSection
          id="sobre"
          direction="right"
          className="bg-secondary/70 px-4 sm:px-6 md:px-8"
        >
          <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
            <AboutSection image={aboutPhoto} />
          </ViewportSectionBody>
        </AnimatedSection>

        <AnimatedSection
          id="servicos"
          direction="left"
          className="px-4 sm:px-6 md:px-8"
        >
          <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 sm:gap-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-brand-blue">
                  Nossos serviços
                </p>
                <h2 className="mt-2 text-[1.55rem] font-semibold leading-[1.05] text-brand-dark sm:mt-3 sm:text-3xl md:text-4xl xl:text-5xl">
                  Soluções para cada conquista do seu planejamento.
                </h2>
              </div>
              <ServicesGrid />
            </div>
          </ViewportSectionBody>
        </AnimatedSection>

        <AnimatedSection
          direction="right"
          className="bg-muted/70 px-4 sm:px-6 md:px-8"
        >
          <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
            <ComparisonSection />
          </ViewportSectionBody>
        </AnimatedSection>

        <AnimatedSection
          id="como-funciona"
          direction="left"
          className="px-4 sm:px-6 md:px-8"
        >
          <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 sm:gap-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-brand-blue">
                  Como funciona
                </p>
                <h2 className="mt-2 text-[1.55rem] font-semibold leading-[1.05] text-brand-dark sm:mt-3 sm:text-3xl md:text-4xl xl:text-5xl">
                  Um processo claro do plano ideal até a carta contemplada.
                </h2>
              </div>
              <HowItWorksTimeline />
            </div>
          </ViewportSectionBody>
        </AnimatedSection>

        <AnimatedSection
          id="simulador"
          direction="right"
          className="bg-secondary/70 px-4 sm:px-6 md:px-8"
        >
          <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 sm:gap-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-brand-blue">
                  Simulador
                </p>
                <h2 className="mt-2 text-[1.55rem] font-semibold leading-[1.05] text-brand-dark sm:mt-3 sm:text-3xl md:text-4xl xl:text-5xl">
                  Veja uma referência real antes da conversa.
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-[1.375rem] text-muted-foreground sm:mt-3 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                  Navegue pelos valores da tabela atual e entenda quanto cada
                  faixa de crédito representa em parcela no plano.
                </p>
              </div>
              <CreditSimulator />
            </div>
          </ViewportSectionBody>
        </AnimatedSection>

        <AnimatedSection
          id="faq"
          direction="left"
          className="bg-muted/70 px-4 sm:px-6 md:px-8"
        >
          <ViewportSectionBody mode="auto" profile="dense" mobileFit="strict">
            <FaqSection />
          </ViewportSectionBody>
        </AnimatedSection>

        <Suspense fallback={null}>
          <InstagramFeedServerSection />
        </Suspense>

        <AnimatedSection
          direction="left"
          className="bg-brand-dark px-4 pt-5 sm:px-6 sm:pt-7 md:px-8 md:pt-8"
        >
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

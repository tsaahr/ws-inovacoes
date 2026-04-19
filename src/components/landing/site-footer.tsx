import Image from "next/image";
import { Camera, ExternalLink, MapPin, MessageCircle } from "lucide-react";

import logoSymbol from "../../../logo-symbol.png";

import { SmartWhatsAppLink } from "@/components/landing/smart-whatsapp-link";

type SiteFooterProps = {
  ownerPhone: string;
  whatsappMessage: string;
};

const INSTAGRAM_URL = "https://www.instagram.com/ws.inovacoes/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61567650595065";

const quickLinks = [
  { href: "#contato", label: "Simulação" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#faq", label: "FAQ" },
] as const;

export function SiteFooter({
  ownerPhone,
  whatsappMessage,
}: SiteFooterProps) {
  return (
    <footer className="bg-brand-dark px-4 text-white sm:px-6 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 py-8 sm:py-10 md:py-12">
        <div className="grid gap-7 md:grid-cols-[1.15fr_0.85fr_1fr] md:gap-10">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <Image
                src={logoSymbol}
                alt="Símbolo da WS Inovações"
                width={219}
                height={148}
                className="h-10 w-auto brightness-0 invert md:h-12"
              />
              <span className="text-base font-semibold md:text-lg">
                WS Inovações
              </span>
            </div>
            <p className="mx-auto max-w-sm text-sm leading-6 text-white/72 md:mx-0 md:leading-7">
              Consórcios com ética, transparência e credibilidade.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-white/68 md:text-sm">
              Links rápidos
            </h3>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:flex-col md:items-start md:gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/76 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-white/68 md:text-sm">
              Contato
            </h3>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-white/76 md:flex-col md:items-start md:gap-3">
              <SmartWhatsAppLink
                phone={ownerPhone}
                message={whatsappMessage}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </SmartWhatsAppLink>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Camera className="size-4" />
                Instagram
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <ExternalLink className="size-4" />
                Facebook
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" />
                Rio Grande / RS
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 text-center text-[11px] text-white/58 md:text-sm">
          © 2026 WS Inovações. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

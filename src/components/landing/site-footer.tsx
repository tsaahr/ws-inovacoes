import Image from "next/image";
import { Camera, MapPin, MessageCircle } from "lucide-react";

import logoSymbol from "../../../logo-symbol.png";

import { SmartWhatsAppLink } from "@/components/landing/smart-whatsapp-link";

type SiteFooterProps = {
  ownerPhone: string;
  whatsappMessage: string;
};

const INSTAGRAM_URL = "https://www.instagram.com/ws.inovacoes/";

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
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={logoSymbol}
              alt="Símbolo da WS Inovações"
              width={219}
              height={148}
              className="h-12 w-auto brightness-0 invert"
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-semibold">WS Inovações</span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/58">
                Consultoria em Crédito
              </span>
            </div>
          </div>
          <p className="max-w-sm leading-7 text-white/72">
            Consórcios com ética, transparência e credibilidade.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/68">
            Links rápidos
          </h3>
          <div className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/76 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/68">
            Contato
          </h3>
          <div className="flex flex-col gap-3 text-white/76">
            <SmartWhatsAppLink
              phone={ownerPhone}
              message={whatsappMessage}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <MessageCircle />
              WhatsApp
            </SmartWhatsAppLink>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Camera />
              Instagram
            </a>
            <span className="flex items-center gap-2">
              <MapPin />
              Rio Grande / RS
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-white/58 md:px-8">
        © 2025 WS Inovações. Todos os direitos reservados.
      </div>
    </footer>
  );
}

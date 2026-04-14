"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logoSymbol from "../../../logo-symbol.png";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#contato", label: "Simulação" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#simulador", label: "Simulador" },
  { href: "#faq", label: "FAQ" },
] as const;

type SiteNavbarProps = {
  whatsappHref: string;
};

export function SiteNavbar({ whatsappHref }: SiteNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!navbarRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={navbarRef}
      className="fixed inset-x-0 top-0 z-50 bg-brand-dark/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 md:gap-5 md:px-8 xl:px-10 lg:h-20">
        <a
          href="#inicio"
          aria-label="Voltar para o início"
          className="flex shrink-0 items-center gap-2 md:gap-3"
          onClick={closeMenu}
        >
          <Image
            src={logoSymbol}
            alt="Símbolo da WS Inovações"
            width={219}
            height={148}
            priority
            className="h-[42px] w-auto brightness-0 invert md:h-[48px] lg:h-[56px] xl:h-[60px]"
          />
          <span className="hidden flex-col leading-none text-white md:flex">
            <span className="text-base font-semibold tracking-tight lg:text-lg xl:text-[1.2rem]">
              WS Inovações
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/58 lg:text-[11px]">
              Consultoria em Crédito
            </span>
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden flex-1 items-center justify-center gap-3 md:flex lg:gap-5 xl:gap-7"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-white/78 transition-colors hover:text-white lg:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            size="sm"
            className="h-9 px-3 text-xs whitespace-nowrap sm:text-sm lg:h-10 lg:px-4"
          >
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="text-white hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden bg-brand-dark/95 md:hidden"
          >
            <nav
              aria-label="Navegação mobile"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

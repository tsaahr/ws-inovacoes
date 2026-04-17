"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

import logoSymbol from "../../../logo-symbol.png";

import { SmartWhatsAppLink } from "@/components/landing/smart-whatsapp-link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#contato", label: "Simulação" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#simulador", label: "Simulador" },
  { href: "#faq", label: "FAQ" },
] as const;

function getHashTarget(hash = window.location.hash) {
  const id = hash.replace(/^#/, "");

  if (!id) {
    return null;
  }

  try {
    return document.getElementById(decodeURIComponent(id));
  } catch {
    return document.getElementById(id);
  }
}

function isVisibleTarget(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function getSectionScrollTarget(target: HTMLElement) {
  if (target.id === "inicio") {
    return target;
  }

  return (
    Array.from(target.querySelectorAll<HTMLElement>("h2")).find(isVisibleTarget) ??
    target
  );
}

function getCssPixelValue(propertyName: string, fallback = 0) {
  const cssValue = getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
  const numericValue = Number.parseFloat(cssValue);

  if (Number.isFinite(numericValue)) {
    return numericValue;
  }

  return fallback;
}

function getNavbarOffset(navbarBar: HTMLElement | null) {
  const fallbackHeight = getCssPixelValue("--site-navbar-height");
  const navbarHeight =
    navbarBar?.getBoundingClientRect().height || fallbackHeight;

  return navbarHeight + getCssPixelValue("--site-anchor-gap");
}

type SiteNavbarProps = {
  ownerPhone: string;
  whatsappMessage: string;
};

export function SiteNavbar({
  ownerPhone,
  whatsappMessage,
}: SiteNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const navbarBarRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef(0);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const scrollToHash = useCallback((hash: string, behavior: ScrollBehavior) => {
    const target = getHashTarget(hash);

    if (!target) {
      return;
    }

    const scrollTarget = getSectionScrollTarget(target);
    const top =
      scrollTarget.getBoundingClientRect().top +
      window.scrollY -
      getNavbarOffset(navbarBarRef.current);

    window.scrollTo({
      top: Math.max(top, 0),
      behavior,
    });
  }, []);

  const scheduleScroll = useCallback((hash: string, behavior: ScrollBehavior) => {
    if (scrollFrameRef.current) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollToHash(hash, behavior);
      });
    });
  }, [scrollToHash]);

  function handleAnchorClick(
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (!href.startsWith("#")) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    scheduleScroll(href, "smooth");
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

  useEffect(() => {
    if (window.location.hash) {
      scheduleScroll(window.location.hash, "auto");
    }

    function handleHashChange() {
      scheduleScroll(window.location.hash, "smooth");
    }

    function handlePopState() {
      scheduleScroll(window.location.hash || "#inicio", "smooth");
    }

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handlePopState);

      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [scheduleScroll]);

  useEffect(() => {
    function handleDocumentAnchorClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = anchor?.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      event.preventDefault();
      closeMenu();

      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }

      scheduleScroll(href, "smooth");
    }

    document.addEventListener("click", handleDocumentAnchorClick);

    return () => {
      document.removeEventListener("click", handleDocumentAnchorClick);
    };
  }, [scheduleScroll]);

  return (
    <header
      ref={navbarRef}
      className="fixed inset-x-0 top-0 z-50 bg-brand-dark/80 backdrop-blur-md"
    >
      <div
        ref={navbarBarRef}
        className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-2 px-3.5 sm:px-6 md:h-16 md:gap-5 md:px-8 lg:h-20 xl:px-10"
      >
        <a
          href="#inicio"
          aria-label="Voltar para o início"
          className="flex shrink-0 items-center gap-1.5 md:gap-3"
          onClick={(event) => handleAnchorClick(event, "#inicio")}
        >
          <Image
            src={logoSymbol}
            alt="Símbolo da WS Inovações"
            width={219}
            height={148}
            priority
            className="h-[32px] w-auto brightness-0 invert sm:h-[38px] md:h-[44px] lg:h-[56px] xl:h-[60px]"
          />
          <span className="hidden text-sm font-semibold tracking-tight text-white md:block lg:text-lg xl:text-[1.2rem]">
            WS Inovações
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
              onClick={(event) => handleAnchorClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            size="sm"
            className="h-8 px-2.5 text-[10px] whitespace-nowrap sm:h-9 sm:px-3 sm:text-sm lg:h-10 lg:px-4"
          >
            <SmartWhatsAppLink
              phone={ownerPhone}
              message={whatsappMessage}
            >
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Falar no WhatsApp</span>
            </SmartWhatsAppLink>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="size-9 text-white hover:bg-white/10 hover:text-white md:hidden"
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
                  onClick={(event) => handleAnchorClick(event, link.href)}
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

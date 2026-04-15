import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import logoSymbol from "../../logo-symbol.png";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WS Inovações | Consórcio de carro",
  description: "Landing page de captação para consórcio de carro da WS Inovações.",
  icons: {
    icon: [{ url: logoSymbol.src, type: "image/png" }],
    shortcut: [{ url: logoSymbol.src, type: "image/png" }],
    apple: [{ url: logoSymbol.src, type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

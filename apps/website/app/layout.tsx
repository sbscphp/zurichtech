import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Geist,
  Geist_Mono,
  Instrument_Sans,
} from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/query/provider";
import { cn } from "@/lib/utils";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "ZurichTech",
    template: "%s | ZurichTech",
  },
  description:
    "ZurichTech is a product engineering studio building software, cloud, and data platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        instrumentSans.variable,
        dmSans.variable,
        cormorant.variable,
        "font-sans",
      )}
    >
      <body suppressHydrationWarning>
        <svg className="absolute size-0" aria-hidden>
          <filter id="logo-knockout" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1 1 1 0 -0.08"
            />
          </filter>
        </svg>
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <AppShell>{children}</AppShell>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}

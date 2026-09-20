import type { Metadata } from "next";
import { Comfortaa, Quicksand } from "next/font/google";

import LanguageProvider from "@/components/LanguageProvider";
import ThemeProvider, { THEME_INIT_SCRIPT } from "@/components/ThemeProvider";

import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Makato — Mobile money charges in Tanzania",
  description:
    "Compare withdraw and send charges across Tanzanian mobile money operators.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${comfortaa.variable} ${quicksand.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the stored theme before first paint — see ThemeProvider. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

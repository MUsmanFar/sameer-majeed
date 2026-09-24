import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";

const display = localFont({
  src: [
    { path: "../public/fonts/cormorant-regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/cormorant-italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const geist = localFont({
  src: "../public/fonts/geist-latin.woff2",
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sameer Majeed — Architecture of Financial Clarity",
  description:
    "The professional journey of Sameer Majeed, ACA FIPA FFA — from audit foundations to FP&A and fintech in Riyadh.",
  authors: [{ name: "Sameer Majeed" }],
  openGraph: {
    title: "Sameer Majeed — Architecture of Financial Clarity",
    description:
      "A cinematic career journey: audit, accounts, reporting, FP&A, and fintech.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101b33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${geist.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

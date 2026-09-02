import type { Metadata, Viewport } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import { SiteBackground } from "@/components/background/site-background";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { profile } from "@/data/profile";
import { siteUrl, siteName } from "@/lib/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-code", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${profile.role}`,
    template: `%s — ${siteName}`,
  },
  description: profile.positioning,
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Analytics",
    "Python",
    "TensorFlow",
    "Next.js",
    siteName,
  ],
  authors: [{ name: siteName }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} — ${profile.role}`,
    description: profile.positioning,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${profile.role}`,
    description: profile.positioning,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ready')}}catch(e){}",
          }}
        />
        <SkipLink />
        <SiteBackground />
        <SmoothScroll />
        <SiteHeader />
        <main id="main" className="relative">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

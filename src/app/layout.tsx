import type { Metadata, Viewport } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import { SiteBackground } from "@/components/background/site-background";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollStage } from "@/components/providers/scroll-stage";
import { StructuredData } from "@/components/seo/structured-data";
import { profile } from "@/data/profile";
import { ogImage, siteUrl, siteName } from "@/lib/site";
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
  applicationName: siteName,
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Analytics",
    "Python",
    "TensorFlow",
    "Next.js",
    siteName,
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_US",
    title: `${siteName} — ${profile.role}`,
    description: profile.positioning,
    ...(ogImage ? { images: [ogImage] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${profile.role}`,
    description: profile.positioning,
    ...(ogImage ? { images: [ogImage.url] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  // The top of every page is the bright end of the scroll journey.
  themeColor: "#fcfbf8",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-stage="light"
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
        <StructuredData />
        <SkipLink />
        <SiteBackground />
        <SmoothScroll />
        <ScrollStage />
        <SiteHeader />
        <main id="main" className="relative">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

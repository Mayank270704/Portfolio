import type { Metadata } from "next";
import { RootLayoutWrapper } from "@/components/layout/root-layout-wrapper";
import { Providers } from "@/components/layout/providers";
import "./globals.css";
import "@/styles/hologram.css";

export const metadata: Metadata = {
  title: "Mayank Swaroop Nandan | AI/ML Engineer",
  description: "A premium AI/ML portfolio inspired by luxury architecture studio design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth text-white antialiased" suppressHydrationWarning>
      <body className="min-h-full text-white">
        <Providers>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}

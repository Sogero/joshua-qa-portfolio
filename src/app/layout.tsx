import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import { MotionConfig } from "@/components/Motion";
import { profile } from "@/data/content";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-hand-face", subsets: ["latin"], weight: ["500"] });
const display = Inter_Tight({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joshua-qa-portfolio.vercel.app";
const description = `${profile.summary} Test automation with Playwright and TypeScript, plus Robot Framework and Selenium, in fintech QA with a prevention-first quality mindset.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Joshua Mendoza — Software QA Engineer",
    template: "%s | Joshua Mendoza",
  },
  description,
  keywords: [
    "Software QA Engineer",
    "QA Engineer Philippines",
    "Test Automation",
    "Playwright",
    "TypeScript",
    "Robot Framework",
    "Selenium",
    "Fintech QA",
    "UAT",
    "Joshua Mendoza",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Joshua Mendoza — Software QA Engineer",
    description,
    siteName: "Joshua Mendoza",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Mendoza — Software QA Engineer",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0f0c",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressRegion: "Rizal", addressCountry: "PH" },
  sameAs: [profile.linkedin],
  worksFor: { "@type": "Organization", name: "TraxionTech" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${hand.variable} antialiased`}>
      <body className="grain min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionConfig>{children}</MotionConfig>
      </body>
    </html>
  );
}

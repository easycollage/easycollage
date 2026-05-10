import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EasyCollege – Find Telangana Colleges by EAMCET Rank",
    template: "%s | EasyCollege",
  },
  description:
    "Discover eligible engineering colleges in Telangana based on your EAMCET rank. Filter by category, branch, gender, region and get accurate cutoff insights instantly.",
  keywords: [
    "EAMCET rank",
    "Telangana engineering colleges",
    "college finder",
    "EAMCET cutoffs",
    "TS EAMCET",
    "engineering admissions",
    "web options",
  ],
  openGraph: {
    title: "EasyCollege – Find Telangana Colleges by EAMCET Rank",
    description:
      "Discover eligible engineering colleges in Telangana based on your EAMCET rank. Filter by category, branch, and more.",
    type: "website",
    locale: "en_IN",
    siteName: "EasyCollege",
  },
  metadataBase: new URL("https://easycollege.in"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

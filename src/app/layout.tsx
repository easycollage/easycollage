import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
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

const SITE_URL = "https://easycollege.in";
const SITE_NAME = "EasyCollege";
const SITE_DESCRIPTION =
  "Find Telangana engineering colleges by TG EAPCET rank. Check college prediction, web options, cutoffs, category, gender, and branch filters instantly.";

const legacyMetadata: Metadata = {
  title: {
    default: "EasyCollege – Find Telangana Colleges by EAMCET Rank",
    template: "%s | EasyCollege",
  },
  description:
    "Discover eligible engineering colleges in Telangana based on your EAMCET rank. Filter by category, branch, gender and get accurate cutoff insights instantly.",
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
void legacyMetadata;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "EasyCollege - TG EAPCET College Predictor & Web Options",
    template: "%s | EasyCollege",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "TG EAPCET college predictor",
    "TS EAMCET college predictor",
    "EAMCET college predictor",
    "TG EAPCET web options",
    "TS EAMCET web options",
    "EAMCET rank predictor",
    "Telangana engineering colleges",
    "Telangana college predictor",
    "EAMCET cutoff ranks",
    "TG EAPCET cutoffs",
    "TS EAMCET",
    "TG EAPCET",
    "engineering admissions",
    "college finder Telangana",
  ],
  authors: [{ name: SITE_NAME }, { name: "Loynix Studio", url: "https://loynix.in" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "EasyCollege - TG EAPCET College Predictor & Web Options",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "EasyCollege TG EAPCET College Predictor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyCollege - TG EAPCET College Predictor",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/rank-finder?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const educationAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Telangana",
  },
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
        <FloatingWhatsApp />
        <Analytics />
        <Script
          id="website-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="education-app-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationAppJsonLd) }}
        />
        <Script id="cal-com-embed" strategy="afterInteractive">
          {`
            (function (C, A, L) {
              let p = function (a, ar) { a.q.push(ar); };
              let d = C.document;
              C.Cal = C.Cal || function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                  cal.ns = {};
                  cal.q = cal.q || [];
                  d.head.appendChild(d.createElement("script")).src = A;
                  cal.loaded = true;
                }
                if (ar[0] === L) {
                  const api = function () { p(api, arguments); };
                  const namespace = ar[1];
                  api.q = api.q || [];
                  if (typeof namespace === "string") {
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else {
                    p(cal, ar);
                  }
                  return;
                }
                p(cal, ar);
              };
            })(window, "https://app.cal.com/embed/embed.js", "init");

            Cal("init", "10min", { origin: "https://app.cal.com" });
            Cal.ns["10min"]("ui", {
              cssVarsPerTheme: {
                light: {
                  "cal-brand": "#2cba21"
                }
              },
              hideEventTypeDetails: false,
              layout: "month_view"
            });
          `}
        </Script>
      </body>
    </html>
  );
}

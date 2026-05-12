import type { Metadata } from "next";
import Script from "next/script";
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

import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RankFinderClient } from "./client";

export const metadata: Metadata = {
  title: "TS EAMCET College Predictor & Web Options",
  description:
    "Use EasyCollege to predict eligible Telangana engineering colleges by TS EAMCET rank, category, gender, branch, and web options.",
  alternates: {
    canonical: "/rank-finder",
  },
  openGraph: {
    title: "TS EAMCET College Predictor & Web Options",
    description:
      "Predict eligible Telangana engineering colleges and shortlist web options using your TS EAMCET rank.",
    url: "/rank-finder",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "EasyCollege TS EAMCET College Predictor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TS EAMCET College Predictor & Web Options",
    description:
      "Predict eligible Telangana engineering colleges and shortlist web options using your TS EAMCET rank.",
    images: ["/opengraph-image"],
  },
};

export default function RankFinderPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />
      <Suspense fallback={<div className="pt-20 flex items-center justify-center min-h-screen text-gray-400 text-sm">Loading...</div>}>
        <RankFinderClient exam="ts" />
      </Suspense>
      <Footer />
    </div>
  );
}

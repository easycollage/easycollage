import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RankFinderClient } from "@/app/rank-finder/client";
import { EamcetPageLoader } from "@/components/ui/eamcet-page-loader";

export const metadata: Metadata = {
  title: "AP EAMCET College Predictor",
  description:
    "Find Andhra Pradesh colleges that match your AP EAMCET rank, category, gender, and branch preferences.",
  alternates: {
    canonical: "/ap-eamcet",
  },
};

export default function ApEamcetPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />
      <Suspense fallback={<EamcetPageLoader exam="ap" mode="inline" />}>
        <RankFinderClient exam="ap" />
      </Suspense>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RankFinderClient } from "@/app/rank-finder/client";
import { EamcetPageLoader } from "@/components/ui/eamcet-page-loader";

export const metadata: Metadata = {
  title: "TS EAMCET College Predictor",
  description:
    "Find Telangana colleges that match your TS EAMCET rank, category, gender, and branch preferences.",
  alternates: {
    canonical: "/ts-eamcet",
  },
};

export default function TsEamcetPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />
      <Suspense fallback={<EamcetPageLoader exam="ts" mode="inline" />}>
        <RankFinderClient exam="ts" />
      </Suspense>
      <Footer />
    </div>
  );
}

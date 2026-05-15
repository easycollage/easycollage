import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RankFinderClient } from "./client";

export const metadata: Metadata = {
  title: "College Finder",
  description:
    "Search and filter Telangana engineering colleges by your EAMCET rank, category, gender and branch.",
};

export default function RankFinderPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />
      <Suspense fallback={<div className="pt-20 flex items-center justify-center min-h-screen text-gray-400 text-sm">Loading...</div>}>
        <RankFinderClient />
      </Suspense>
      <Footer />
    </div>
  );
}

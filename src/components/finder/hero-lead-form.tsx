"use client";

import { useRouter } from "next/navigation";
import type { Route } from "next";
import { LeadForm, type LeadFormData } from "@/components/finder/lead-form";

const STORAGE_KEY = "ec_lead_submitted_ts";

export function HeroLeadForm() {
  const router = useRouter();

  function handleSuccess(data: LeadFormData) {
    sessionStorage.setItem(STORAGE_KEY, "1");

    const params = new URLSearchParams();
    params.set("exam", "ts");
    params.set("rank", data.rank);
    params.set("category", data.category);
    params.set("gender", data.gender);
    params.set("branch", data.course);

    router.push(`/ts-eamcet?${params.toString()}` as Route);
  }

  return (
    <div id="college-check-form" className="relative animate-fade-up delay-200 scroll-mt-24">
      <LeadForm onSuccess={handleSuccess} compact exam="ts" examLabel="TS EAMCET" />
    
      <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-500 rounded-full opacity-20 blur-xl pointer-events-none" />
      <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-emerald-400 rounded-full opacity-30 blur-xl pointer-events-none" />
    </div>
  );
}

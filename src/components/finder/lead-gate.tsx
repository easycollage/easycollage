"use client";

import { LeadForm, type LeadFormData } from "@/components/finder/lead-form";
import type { Exam } from "@/types";

interface LeadGateProps {
  onUnlock: (data: LeadFormData) => void;
  exam: Exam;
  examLabel: string;
}

export function LeadGate({ onUnlock, exam, examLabel }: LeadGateProps) {
  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto w-full max-w-md">
        <LeadForm
          onSuccess={onUnlock}
          autoFocus
          compact
          exam={exam}
          examLabel={examLabel}
        />
      </div>
    </section>
  );
}

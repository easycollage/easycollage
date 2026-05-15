"use client";

import { LeadForm, type LeadFormData } from "@/components/finder/lead-form";

interface LeadGateProps {
  onUnlock: (data: LeadFormData) => void;
}

export function LeadGate({ onUnlock }: LeadGateProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-50 via-white to-emerald-50/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="max-h-[calc(100vh-2rem)] overflow-y-auto">
          <LeadForm onSuccess={onUnlock} autoFocus />
        </div>

       
      </div>
    </div>
  );
}

"use client";

import { CalendarDays, HelpCircle, MessageCircle, Sparkles, X } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi EasyCollege, I have a doubt in finding colleges. Please help me."
);
const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
  : `https://wa.me/?text=${WHATSAPP_MESSAGE}`;

interface SearchHelpPopupProps {
  mode: "eligible" | "web-options";
  onClose: () => void;
}

export function SearchHelpPopup({ mode, onClose }: SearchHelpPopupProps) {
  const modeLabel = mode === "web-options" ? "web options" : "college prediction";

  return (
    <div className="fixed bottom-24 right-4 z-[55] w-[calc(100vw-2rem)] max-w-sm animate-fade-up sm:right-6">
      <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl shadow-green-900/15">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-200/60 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-emerald-100 blur-2xl" />

        <div className="relative p-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close help popup"
            className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-4 flex items-center gap-3 pr-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/25">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-green-600">
                <Sparkles className="h-3 w-3" />
                Need guidance?
              </div>
              <h3 className="font-display text-lg font-bold text-gray-950">
                Confused with {modeLabel}?
              </h3>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            If you have any doubt in finding colleges, connect with us. We can help you shortlist better choices before counselling.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              data-cal-link="easy-collage/10min"
              data-cal-namespace="10min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-3 py-3 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800"
            >
              <CalendarDays className="h-4 w-4" />
              Call.com
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-3 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

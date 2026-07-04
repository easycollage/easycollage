import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exam } from "@/types";

const LOADER_COPY: Record<
  Exam,
  {
    label: string;
    title: string;
    description: string;
    iconShell: string;
    iconText: string;
    pulse: string;
    bar: string;
  }
> = {
  ts: {
    label: "TS EAMCET",
    title: "Opening TS EAMCET",
    description: "Preparing Telangana college predictions.",
    iconShell: "bg-green-50",
    iconText: "text-green-600",
    pulse: "bg-green-500/10",
    bar: "bg-green-600",
  },
  ap: {
    label: "AP EAMCET",
    title: "Opening AP EAMCET",
    description: "Preparing Andhra Pradesh college predictions.",
    iconShell: "bg-sky-50",
    iconText: "text-sky-600",
    pulse: "bg-sky-500/10",
    bar: "bg-sky-600",
  },
};

type EamcetPageLoaderMode = "page" | "inline" | "overlay";

interface EamcetPageLoaderProps {
  exam: Exam;
  mode?: EamcetPageLoaderMode;
  className?: string;
}

export function EamcetPageLoader({
  exam,
  mode = "page",
  className,
}: EamcetPageLoaderProps) {
  const copy = LOADER_COPY[exam];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center px-4",
        mode === "overlay" &&
          "fixed inset-0 z-[120] bg-white/90 backdrop-blur-md",
        mode === "page" && "min-h-screen bg-gray-50/40",
        mode === "inline" && "min-h-[calc(100vh-4rem)] bg-gray-50/40 pt-20",
        className
      )}
    >
      <div className="w-full max-w-sm rounded-md border border-gray-100 bg-white p-6 text-center shadow-xl shadow-gray-950/5">
        <div
          className={cn(
            "relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-md",
            copy.iconShell,
            copy.iconText
          )}
        >
          <span
            className={cn(
              "absolute h-16 w-16 animate-ping rounded-full opacity-75 motion-reduce:animate-none",
              copy.pulse
            )}
          />
          <span className="absolute h-12 w-12 animate-spin rounded-full border-2 border-current border-r-transparent opacity-80 motion-reduce:animate-none" />
          <GraduationCap className="relative h-6 w-6" aria-hidden="true" />
        </div>

        <p className={cn("text-xs font-semibold", copy.iconText)}>
          {copy.label}
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-gray-900">
          {copy.title}
        </h2>
        <p className="mt-2 text-sm text-gray-500">{copy.description}</p>

        <div className="mt-5 overflow-hidden rounded-full bg-gray-100">
          <div
            className={cn(
              "h-1.5 w-2/3 animate-pulse rounded-full motion-reduce:animate-none",
              copy.bar
            )}
          />
        </div>

        <span className="sr-only">Loading {copy.label}</span>
      </div>
    </div>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFee(fee?: number | null): string {
  if (typeof fee !== "number" || !Number.isFinite(fee) || fee <= 0) {
    return "Not available";
  }

  if (fee >= 100000) {
    return `₹${(fee / 100000).toFixed(1)}L`;
  }
  return `₹${(fee / 1000).toFixed(0)}K`;
}

export function formatRank(rank?: number | null): string {
  if (typeof rank !== "number" || !Number.isFinite(rank)) {
    return "N/A";
  }

  return rank.toLocaleString("en-IN");
}

export function getCutoffRankStart(college: {
  cutoffRank?: number;
  cutoffRankStart?: number;
}): number | undefined {
  return college.cutoffRankStart ?? college.cutoffRank;
}

export function getCutoffRankEnd(college: {
  cutoffRank?: number;
  cutoffRankEnd?: number;
}): number | undefined {
  return college.cutoffRankEnd ?? college.cutoffRank;
}

export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    OC: "OC",
    BC_A: "BC-A",
    BC_B: "BC-B",
    BC_C: "BC-C",
    BC_D: "BC-D",
    BC_E: "BC-E",
    SC: "SC",
    SC_I: "SC-I",
    SC_II: "SC-II",
    SC_III: "SC-III",
    ST: "ST",
    EWS: "EWS",
  };
  return map[category] ?? category;
}

export function getTypeColor(type: string): string {
  switch (type) {
    case "Government":
      return "bg-green-50 text-green-700 border-green-200";
    case "Private":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Deemed":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

import type { College, CollegeFilters } from "@/types";
import { getCutoffRankEnd, getCutoffRankStart } from "@/lib/utils";
import { MOCK_COLLEGES } from "./mockdata";

function matchesCategory(collegeCategory: string, selectedCategory: string): boolean {
  if (selectedCategory === "SC") {
    return collegeCategory === "SC" || collegeCategory.startsWith("SC_");
  }

  return collegeCategory === selectedCategory;
}

export function filterColleges(filters: CollegeFilters): {
  data: College[];
  total: number;
} {
  const {
    rank,
    category,
    gender,
    branch,
    branches = [],
    search,
    mode = "eligible",
    page = 1,
    pageSize = 12,
  } = filters;

  let results = [...MOCK_COLLEGES];

  // Rank filter — core logic
  if (rank !== undefined && rank !== null) {
    const parsedRank = Number(rank);
    if (!isNaN(parsedRank) && parsedRank > 0) {
      results = results.filter((c) => {
        const start = getCutoffRankStart(c);
        const end = getCutoffRankEnd(c);

        if (mode === "web-options") {
          const cutoff = end ?? start;
          const lowerBound = Math.max(1, Math.floor(parsedRank * 0.975));
          const upperBound = Math.ceil(parsedRank * 1.25);

          return (
            c.webOptionsAvailable &&
            typeof cutoff === "number" &&
            cutoff >= lowerBound &&
            cutoff <= upperBound
          );
        }

        if (typeof c.cutoffRank === "number") {
          return parsedRank <= c.cutoffRank;
        }

        return (
          typeof start === "number" &&
          typeof end === "number" &&
          parsedRank >= start &&
          parsedRank <= end
        );
      });
    }
  }

  // Category filter
  if (category && category !== "") {
    results = results.filter((c) => matchesCategory(c.category, category));
  }

  // Gender filter — "Both" entries are always included unless filtering for specific gender
  if (gender && gender !== "") {
    results = results.filter(
      (c) => c.gender === gender || c.gender === "Both"
    );
  }

  // Branch filter
  if (branch && branch !== "") {
    const normalizedBranch = branch.toLowerCase();
    results = results.filter(
      (c) =>
        c.branch.toLowerCase().includes(normalizedBranch) ||
        c.branchCode.toLowerCase().includes(normalizedBranch)
    );
  }

  if (branches.length > 0) {
    const normalizedBranches = branches.map((b) => b.toLowerCase());
    results = results.filter((c) =>
      normalizedBranches.some(
        (b) =>
          c.branchCode.toLowerCase() === b ||
          c.branch.toLowerCase().includes(b)
      )
    );
  }

  // Search filter — case-insensitive partial match across college name, branch, location
  if (search && search.trim() !== "") {
    const query = search.toLowerCase().trim();
    results = results.filter(
      (c) =>
        c.collegeName.toLowerCase().includes(query) ||
        c.branch.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.collegeCode.toLowerCase().includes(query)
    );
  }

  // Sort: by cutoffRankStart ascending (best colleges first)
  results.sort((a, b) => (getCutoffRankStart(a) ?? Infinity) - (getCutoffRankStart(b) ?? Infinity));

  const total = results.length;

  // Pagination
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(Math.max(1, pageSize), 50);
  const start = (safePage - 1) * safePageSize;
  const paginated = results.slice(start, start + safePageSize);

  return { data: paginated, total };
}

export function validateRank(rankStr: string | null): {
  valid: boolean;
  rank?: number;
  error?: string;
} {
  if (!rankStr || rankStr.trim() === "") {
    return { valid: true }; // empty rank = no filter, show all
  }

  const rank = Number(rankStr);

  if (isNaN(rank)) {
    return { valid: false, error: "Rank must be a valid number" };
  }

  if (!Number.isInteger(rank)) {
    return { valid: false, error: "Rank must be a whole number" };
  }

  if (rank < 1) {
    return { valid: false, error: "Rank must be at least 1" };
  }

  if (rank > 200000) {
    return { valid: false, error: "Rank seems too high. Max supported is 2,00,000" };
  }

  return { valid: true, rank };
}

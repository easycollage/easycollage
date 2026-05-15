"use client";

import { useState } from "react";
import { Download, LayoutGrid, Table2, ListFilter } from "lucide-react";
import { useCollegeFinder } from "@/hooks/use-college-finder";
import { FiltersPanel } from "@/components/finder/filters-panel";
import { CollegeCard } from "@/components/finder/college-card";
import { CollegeTable } from "@/components/finder/college-table";
import { Pagination } from "@/components/finder/pagination";
import { EmptyState } from "@/components/finder/empty-state";
import { ErrorState } from "@/components/finder/error-state";
import { LeadGate } from "@/components/finder/lead-gate";
import { CollegeCardSkeleton, CollegeTableRowSkeleton } from "@/components/ui/skeleton";
import type { ViewMode } from "@/types";

const PAGE_SIZE = 12;
const STORAGE_KEY = "ec_lead_submitted";

export function RankFinderClient() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Check if lead was already submitted this session
  const [leadSubmitted, setLeadSubmitted] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  });

  const {
    colleges,
    total,
    totalPages,
    page,
    isLoading,
    isError,
    errorMessage,
    filters,
    updateFilter,
    setPage,
    reset,
  } = useCollegeFinder();

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== "mode" && value !== ""
  );
  const userRank = filters.rank ? parseInt(filters.rank, 10) : undefined;
  const isWebOptionsMode = filters.mode === "web-options";

  function handleLeadUnlock(data: { name: string; phone: string; rank: string; category?: string; gender?: string; course?: string }) {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setLeadSubmitted(true);
    // Pre-fill filters from what they entered in the form
    if (data.rank) updateFilter("rank", data.rank);
    if (data.category) updateFilter("category", data.category);
    if (data.gender) updateFilter("gender", data.gender);
    if (data.course) updateFilter("branch", data.course);
  }

  async function downloadWebOptions() {
    const params = new URLSearchParams();
    params.set("mode", "web-options");
    params.set("pageSize", "500");
    if (filters.rank) params.set("rank", filters.rank);
    if (filters.category) params.set("category", filters.category);
    if (filters.gender) params.set("gender", filters.gender);
    if (filters.branches) params.set("branches", filters.branches);
    if (filters.search) params.set("search", filters.search);

    const res = await fetch(`/api/colleges?${params.toString()}`);
    if (!res.ok) return;

    const data = await res.json();
    const rows: Array<Array<string | number>> = [
      ["College Code", "College", "Branch Code", "Branch", "Category", "Gender", "Cutoff Rank", "Type", "Location"],
      ...data.data.map((college: any) => [
        college.collegeCode,
        college.collegeName,
        college.branchCode,
        college.branch,
        college.category,
        college.gender,
        college.cutoffRank ?? college.cutoffRankEnd ?? "",
        college.type,
        college.location,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell: string | number) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `easycollege-web-options-rank-${filters.rank || "all"}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {!leadSubmitted && <LeadGate onUnlock={handleLeadUnlock} />}
    <main className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="py-8 border-b border-gray-100">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-1">
            College Finder
          </h1>
          <p className="text-sm text-gray-500">
            Filter by rank, category, branch and more to find eligible colleges across Telangana
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileFiltersOpen((v) => !v)}
            >
              <ListFilter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-semibold">
                {Object.entries(filters).filter(([key, value]) => key !== "mode" && Boolean(value)).length}
                </span>
              )}
            </button>

            {!isLoading && total > 0 && (
              <span className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{total}</span>{" "}
                {isWebOptionsMode ? "web option" : "result"}{total !== 1 ? "s" : ""}
                {filters.rank && (
                  <span className="text-green-600 font-medium">
                    {" "}for rank {parseInt(filters.rank).toLocaleString("en-IN")}
                  </span>
                )}
              </span>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5 bg-white">
            {isWebOptionsMode && total > 0 && (
              <button
                onClick={downloadWebOptions}
                className="mr-1 flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
                title="Download web options"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            )}
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "card"
                  ? "bg-green-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-green-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Table view"
            >
              <Table2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters - desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FiltersPanel
              filters={filters}
              onUpdate={updateFilter}
              onReset={reset}
              total={total}
              isLoading={isLoading}
            />
          </aside>

          {/* Mobile filters overlay */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setMobileFiltersOpen(false)}>
              <div
                className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Filters</span>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                  >
                    Done
                  </button>
                </div>
                <FiltersPanel
                  filters={filters}
                  onUpdate={updateFilter}
                  onReset={reset}
                  total={total}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {isError ? (
              <ErrorState
                message={errorMessage}
                onRetry={() => updateFilter("rank", filters.rank)}
              />
            ) : isLoading ? (
              viewMode === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <CollegeCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["College", "Branch", "Category", "Cutoff Rank", "Type", "Fee/yr", "Web"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <CollegeTableRowSkeleton key={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : colleges.length === 0 ? (
              <EmptyState hasFilters={hasActiveFilters} onReset={reset} />
            ) : viewMode === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {colleges.map((college) => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    userRank={userRank && !isNaN(userRank) ? userRank : undefined}
                  />
                ))}
              </div>
            ) : (
              <CollegeTable
                colleges={colleges}
                userRank={userRank && !isNaN(userRank) ? userRank : undefined}
              />
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

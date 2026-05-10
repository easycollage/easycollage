"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { BRANCHES, CATEGORIES, GENDERS, REGIONS } from "@/lib/mock-data";
import type { FilterState } from "@/hooks/use-college-finder";

interface FiltersProps {
  filters: FilterState;
  onUpdate: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  total: number;
  isLoading: boolean;
}

const SELECT_CLS =
  "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

export function FiltersPanel({ filters, onUpdate, onReset, total, isLoading }: FiltersProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-5 sticky top-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-gray-900 text-sm">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-green-600 hover:text-green-800 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="College name, branch..."
            value={filters.search}
            onChange={(e) => onUpdate("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {filters.search && (
            <button
              onClick={() => onUpdate("search", "")}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* Rank */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
          Your EAMCET Rank
        </label>
        <input
          type="number"
          placeholder="e.g. 12000"
          value={filters.rank}
          min={1}
          max={200000}
          onChange={(e) => onUpdate("rank", e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {filters.rank && (
          <p className="text-xs text-green-600 mt-1">
            Showing colleges where your rank {parseInt(filters.rank).toLocaleString("en-IN")} is eligible
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onUpdate("category", e.target.value)}
          className={SELECT_CLS}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.replace("_", "-")}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender</label>
        <select
          value={filters.gender}
          onChange={(e) => onUpdate("gender", e.target.value)}
          className={SELECT_CLS}
        >
          <option value="">All</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Region / Zone</label>
        <select
          value={filters.region}
          onChange={(e) => onUpdate("region", e.target.value)}
          className={SELECT_CLS}
        >
          <option value="">All Regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r} Zone</option>
          ))}
        </select>
      </div>

      {/* Branch */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Branch</label>
        <select
          value={filters.branch}
          onChange={(e) => onUpdate("branch", e.target.value)}
          className={SELECT_CLS}
        >
          <option value="">All Branches</option>
          {BRANCHES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Result count */}
      <div className="pt-2 border-t border-gray-50">
        <p className="text-xs text-gray-500">
          {isLoading ? (
            "Searching..."
          ) : (
            <>
              <span className="font-semibold text-gray-900">{total}</span> result{total !== 1 ? "s" : ""} found
            </>
          )}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Route } from "next";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { College, CollegesApiResponse } from "@/types";

interface UseCollegefinderReturn {
  colleges: College[];
  total: number;
  totalPages: number;
  page: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: string) => void;
  setPage: (page: number) => void;
  reset: () => void;
}

export interface FilterState {
  mode: "eligible" | "web-options";
  rank: string;
  category: string;
  gender: string;
  branch: string;
  branches: string;
  search: string;
}

const DEFAULT_FILTERS: FilterState = {
  mode: "eligible",
  rank: "",
  category: "",
  gender: "",
  branch: "",
  branches: "",
  search: "",
};

function buildQueryString(filters: FilterState, page: number): string {
  const params = new URLSearchParams();
  if (filters.mode !== "eligible") params.set("mode", filters.mode);
  if (filters.rank) params.set("rank", filters.rank);
  if (filters.category) params.set("category", filters.category);
  if (filters.gender) params.set("gender", filters.gender);
  if (filters.branch) params.set("branch", filters.branch);
  if (filters.branches) params.set("branches", filters.branches);
  if (filters.search) params.set("search", filters.search);
  if (page > 1) params.set("page", String(page));
  return params.toString();
}

export function useCollegeFinder(): UseCollegefinderReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Init from URL params
  const [filters, setFilters] = useState<FilterState>({
    mode: searchParams.get("mode") === "web-options" ? "web-options" : "eligible",
    rank: searchParams.get("rank") ?? "",
    category: searchParams.get("category") ?? "",
    gender: searchParams.get("gender") ?? "",
    branch: searchParams.get("branch") ?? "",
    branches: searchParams.get("branches") ?? "",
    search: searchParams.get("search") ?? "",
  });
  const [page, setPageState] = useState(parseInt(searchParams.get("page") ?? "1", 10));
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchColleges = useCallback(async (f: FilterState, p: number) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const qs = buildQueryString(f, p);
      const res = await fetch(`/api/colleges?${qs}`);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to fetch colleges");
      }

      const data: CollegesApiResponse = await res.json();
      setColleges(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setIsError(true);
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setColleges([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce fetch on filter changes
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      // Sync URL
      const qs = buildQueryString(filters, page);
      router.replace(`${pathname}${qs ? `?${qs}` : ""}` as Route, { scroll: false });

      fetchColleges(filters, page);
    }, 350);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [filters, page, fetchColleges, router, pathname]);

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPageState(1);
  }, []);

  const setPage = useCallback((p: number) => {
    setPageState(p);
  }, []);

  const reset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPageState(1);
  }, []);

  return {
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
  };
}

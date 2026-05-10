import { NextRequest, NextResponse } from "next/server";
import { filterColleges, validateRank } from "@/lib/filter";
import type { CollegesApiResponse, ApiError } from "@/types";

export async function GET(req: NextRequest): Promise<NextResponse<CollegesApiResponse | ApiError>> {
  const { searchParams } = req.nextUrl;

  const rankStr = searchParams.get("rank");
  const category = searchParams.get("category") ?? "";
  const gender = searchParams.get("gender") ?? "";
  const region = searchParams.get("region") ?? "";
  const branch = searchParams.get("branch") ?? "";
  const search = searchParams.get("search") ?? "";
  const pageStr = searchParams.get("page") ?? "1";
  const pageSizeStr = searchParams.get("pageSize") ?? "12";

  // Validate rank
  const rankValidation = validateRank(rankStr);
  if (!rankValidation.valid) {
    return NextResponse.json(
      { error: rankValidation.error!, code: "INVALID_RANK" },
      { status: 400 }
    );
  }

  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(pageSizeStr, 10) || 12));

  const filters = {
    rank: rankValidation.rank,
    category: category || undefined,
    gender: gender || undefined,
    region: region || undefined,
    branch: branch || undefined,
    search: search || undefined,
    page,
    pageSize,
  };

  const { data, total } = filterColleges(filters);

  const response: CollegesApiResponse = {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    appliedFilters: filters,
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

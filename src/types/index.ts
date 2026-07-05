export type Category = string;
export type Exam = "ts" | "ap";
export type Gender = string;
export type Region = string;
export type ViewMode = "table" | "card";

export interface College {
  id: string;
  exam?: Exam;
  phase?: string;
  collegeName: string;
  collegeCode: string;
  location: string;
  distCode?: string;
  branch: string;
  branchCode: string;
  category: Category;
  gender: Gender;
  region?: Region;
  cutoffRank?: number;
  cutoffRankStart?: number;
  cutoffRankEnd?: number;
  webOptionsAvailable: boolean;
  type: string;
  tuitionFee: number;
  affiliatedTo?: string;
}

export interface CollegeFilters {
  exam?: Exam;
  rank?: number;
  category?: Category;
  gender?: Gender;
  branch?: string;
  branches?: string[];
  search?: string;
  mode?: "eligible" | "web-options";
  page?: number;
  pageSize?: number;
}

export interface CollegesApiResponse {
  data: College[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  appliedFilters: CollegeFilters;
}

export interface ApiError {
  error: string;
  code: string;
}

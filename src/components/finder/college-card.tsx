import { Building2, MapPin, TrendingUp, Globe, IndianRupee } from "lucide-react";
import type { College } from "@/types";
import {
  cn,
  formatFee,
  formatRank,
  getCategoryLabel,
  getCutoffRankEnd,
  getCutoffRankStart,
  getTypeColor,
} from "@/lib/utils";

interface CollegeCardProps {
  college: College;
  userRank?: number;
}

export function CollegeCard({ college, userRank }: CollegeCardProps) {
  const isWebOption = college.webOptionsAvailable;
  const cutoffRankStart = getCutoffRankStart(college);
  const cutoffRankEnd = getCutoffRankEnd(college);
  const cutoffLabel =
    cutoffRankStart === cutoffRankEnd
      ? formatRank(cutoffRankEnd)
      : `${formatRank(cutoffRankStart)} - ${formatRank(cutoffRankEnd)}`;
  const feeLabel = formatFee(college.tuitionFee);

  return (
    <div className="group border border-gray-100 rounded-xl p-5 hover:border-green-200 hover:shadow-md transition-all duration-200 bg-white">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
            {college.collegeName}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3 shrink-0" />
            <span>{college.location}</span>
            <span className="text-gray-300 mx-1">.</span>
            <span className="font-mono text-xs">{college.collegeCode}</span>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border",
            getTypeColor(college.type)
          )}
        >
          {college.type}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <Building2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
        <span className="text-sm text-gray-700 font-medium">{college.branch}</span>
        <span className="text-xs text-gray-400 font-mono">({college.branchCode})</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          {getCategoryLabel(college.category)}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          {college.gender}
        </span>
        {college.region && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {college.region} Zone
          </span>
        )}
        {isWebOption && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Globe className="w-2.5 h-2.5" />
            Web Option
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <TrendingUp className="w-3.5 h-3.5 text-green-600" />
          <span>
            Cutoff: <span className="font-semibold text-gray-900 font-mono">{cutoffLabel}</span>
          </span>
        </div>
        <div className="flex items-center gap-0.5 text-xs text-gray-500">
          <IndianRupee className="w-3 h-3" />
          <span>{feeLabel === "Not available" ? feeLabel : `${feeLabel}/yr`}</span>
        </div>
      </div>

      {userRank && (
        <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Your rank {formatRank(userRank)} is in range
        </div>
      )}
    </div>
  );
}

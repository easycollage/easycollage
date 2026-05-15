import { Globe } from "lucide-react";
import type { College } from "@/types";
import { cn, formatFee, formatRank, getCategoryLabel, getCutoffRankEnd, getCutoffRankStart, getTypeColor } from "@/lib/utils";

interface CollegeTableProps {
  colleges: College[];
  userRank?: number;
}

export function CollegeTable({ colleges, userRank }: CollegeTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">College</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Branch</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Category</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Cutoff Rank</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Type</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Fee/yr</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">Web</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college) => {
            const cutoffRankStart = getCutoffRankStart(college);
            const cutoffRankEnd = getCutoffRankEnd(college);
            const cutoffLabel =
              cutoffRankStart === cutoffRankEnd
                ? formatRank(cutoffRankEnd)
                : `${formatRank(cutoffRankStart)} – ${formatRank(cutoffRankEnd)}`;

            return (
            <tr
              key={college.id}
              className="border-b border-gray-50 hover:bg-green-50/40 transition-colors"
            >
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900 max-w-xs">{college.collegeName}</div>
                  <div className="text-xs text-gray-500">{college.location} · {college.collegeCode}</div>
                  {userRank && (
                    <div className="text-xs text-green-600 font-medium mt-0.5">✓ Eligible</div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-gray-700 max-w-[180px]">{college.branch}</div>
                <div className="text-xs text-gray-400 font-mono">{college.branchCode}</div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full w-fit">
                    {getCategoryLabel(college.category)}
                  </span>
                  <span className="text-xs text-gray-500">{college.gender}</span>
                </div>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-gray-700 whitespace-nowrap">
                {cutoffLabel}
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full border font-medium",
                    getTypeColor(college.type)
                  )}
                >
                  {college.type}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">
                {formatFee(college.tuitionFee)}
              </td>
              <td className="px-4 py-3">
                {college.webOptionsAvailable ? (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <Globe className="w-3 h-3" />
                    Yes
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">No</span>
                )}
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

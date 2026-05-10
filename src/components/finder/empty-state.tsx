import { SearchX } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
  onReset: () => void;
}

export function EmptyState({ hasFilters, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-display font-semibold text-gray-900 text-lg mb-2">
        {hasFilters ? "No colleges found" : "Start searching"}
      </h3>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
        {hasFilters
          ? "Try adjusting your filters — your rank may be outside the cutoff range for current filters, or no colleges match this combination."
          : "Enter your EAMCET rank and apply filters to discover eligible colleges."}
      </p>
      {hasFilters && (
        <button
          onClick={onReset}
          className="mt-5 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

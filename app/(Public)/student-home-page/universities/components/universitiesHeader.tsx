import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface UniversitiesHeaderProps {
  country: string;
  totalCount: number;
}

export function UniversitiesHeader({
  country,
  totalCount,
}: UniversitiesHeaderProps) {
  return (
    <div className="animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title with count and country highlight */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
            {totalCount} Universities and Colleges in{" "}
            <span className="text-red-600">{country}</span>
          </h1>
        </div>

        {/* Filter section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-200 mb-2 pb-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 h-10 w-fit transition-all duration-300 hover:shadow-lg">
            🔍 Filter University
          </Button>
        </div>
        {/* Active filter chip */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Based on your selection:</span>
          <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
            <span>{country}</span>
            <button
              className="text-slate-500 hover:text-slate-700 transition-colors"
              aria-label="Remove filter"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

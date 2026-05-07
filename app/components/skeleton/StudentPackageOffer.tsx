// loading.tsx
import React from "react";

const SkeletonCard: React.FC<{ index: number }> = ({ index }) => {
  const widths = [
    ["85%", "55%", "60%", "45%", "50%"],
    ["80%", "60%", "75%", "50%", "65%"],
    ["90%", "50%", "65%", "55%", "70%"],
  ];
  const w = widths[index % 3];

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-black/3 to-transparent pointer-events-none" />

      {/* Top row: avatar + badge */}
      <div className="mb-3 flex items-center justify-between">
        <div className="h-9 w-9 rounded-full bg-gray-300 animate-pulse" /> 
        <div className="h-6 w-14 rounded-full bg-gray-300 animate-pulse" />    
      </div>   

      {/* University name */}
      <div className="mb-1.5 h-4 rounded-md bg-gray-300 animate-pulse" style={{ width: w[0] }} />
      {/* Location */}
      <div className="mb-4 h-3 rounded-md bg-gray-300 animate-pulse opacity-60" style={{ width: w[1] }} />

      {/* Divider */}
      <div className="mb-4 h-px w-full bg-gray-300" />   
  
      {/* Detail rows */}
      <div className="mb-2.5 flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse shrink-0" />
        <div className="h-3 rounded-md bg-gray-300 animate-pulse" style={{ width: w[2] }} />
      </div>
      <div className="mb-2.5 flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse shrink-0" />
        <div className="h-3 rounded-md bg-gray-300 animate-pulse" style={{ width: w[3] }} />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse shrink-0" />
        <div className="h-3 rounded-md bg-gray-300 animate-pulse" style={{ width: w[4] }} />
      </div>

      {/* CTA Button */}
      <div className="mt-4 h-9 w-full rounded-lg bg-gray-300 animate-pulse" />
    </div>
  );
};

const StudentPackageOfferLoader: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Page title skeleton */}
        <div className="pb-5">
          <div className="mb-2 h-6 w-40 rounded-lg bg-gray-300 animate-pulse" />
          <div className="h-3.5 w-72 rounded-lg bg-gray-300 animate-pulse opacity-60" />
        </div>

        {/* Filter bar */}
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-3.5 shadow-sm">
          <div className="h-6 w-6 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-4 w-48 rounded-md bg-gray-300 animate-pulse" />
          <div className="flex-1" />
          <div className="h-7 w-20 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-7 w-20 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-7 w-7 rounded-full bg-gray-300 animate-pulse" />
        </div>

        {/* Category badge pills */}
        <div className="mb-5 flex gap-2">
          {[64, 90, 72, 80, 56].map((w, i) => (
            <div
              key={i}
              className="h-7 rounded-full bg-gray-300 animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPackageOfferLoader;
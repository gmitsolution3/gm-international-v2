// SkeletonLoader.tsx
import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section Skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto mb-4 shimmer"></div>
          <div className="h-5 w-96 bg-gray-200 rounded-lg mx-auto max-w-md shimmer"></div>
        </div>

        {/* Service Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Card 1 - Student */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
              </div>
              <div className="pt-4">
                <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
              </div>
            </div>
          </div>

          {/* Card 2 - Medical */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
              </div>
              <div className="pt-4">
                <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
              </div>
            </div>
          </div>

          {/* Card 3 - Tourist */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
              </div>
              <div className="pt-4">
                <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
              </div>
            </div>
          </div>

          {/* Card 4 - Business */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
              </div>
              <div className="pt-4">
                <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Additional loading indicators */}
        <div className="mt-12 flex justify-center">
          <div className="h-12 w-32 bg-gray-200 rounded-full shimmer animate-pulse"></div>
        </div>
      </div>

      
    </div>
  );
};

export default SkeletonLoader;

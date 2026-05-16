import React from "react";

// Individual skeleton components
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="space-y-2">
      <div className="h-7 sm:h-8 bg-gray-200 rounded w-20"></div>
      <div className="h-3 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

const SkeletonChart = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-48 mb-6"></div>
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="h-3 bg-gray-200 rounded w-8"></div>
          <div
            className="bg-gray-200 rounded-t"
            style={{
              height: `${Math.random() * 100 + 40}px`,
              width: "100%",
              maxWidth: "200px",
            }}
          ></div>
        </div>
      ))}
    </div>
    <div className="flex gap-2 mt-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-3 bg-gray-200 rounded w-12"></div>
      ))}
    </div>
  </div>
);

const SkeletonPieChart = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-40 mb-6"></div>
    <div className="flex items-center justify-center">
      <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 rounded-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
      ))}
    </div>
  </div>
);

const SkeletonTable = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="p-4 sm:p-6 border-b border-gray-100">
      <div className="h-5 bg-gray-200 rounded w-40"></div>
    </div>

    {/* Mobile skeleton */}
    <div className="block lg:hidden divide-y divide-gray-100">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-28"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop skeleton */}
    <div className="hidden lg:block overflow-x-auto">
      <div className="p-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-3 border-b border-gray-50"
          >
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-36"></div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkeletonTopUniversities = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-36 mb-4"></div>
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-28 sm:w-36"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      ))}
    </div>
  </div>
);

const SkeletonPaymentOverview = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
        </div>
      ))}
    </div>
  </div>
);

// Main Skeleton Loader Component
const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50/50 via-white to-red-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Skeleton */}
        <div className="mb-6 sm:mb-8 animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg"></div>
            <div>
              <div className="h-7 sm:h-8 bg-gray-200 rounded w-64 sm:w-80 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48 sm:w-96 ml-12"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SkeletonChart />
          <SkeletonPieChart />
        </div>

        {/* Top Universities & Payment Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SkeletonTopUniversities />
          <div className="lg:col-span-2">
            <SkeletonPaymentOverview />
          </div>
        </div>

        {/* Recent Applications Table */}
        <SkeletonTable />
      </div>
    </div>
  );
};

export default SkeletonLoader;

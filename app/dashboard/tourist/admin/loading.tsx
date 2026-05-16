import React from "react";

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5 animate-pulse">
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="h-6 sm:h-7 bg-gray-200 rounded w-12 sm:w-16 mb-2"></div>
    <div className="h-2 sm:h-3 bg-gray-200 rounded w-20 sm:w-24"></div>
  </div>
);

const SkeletonChart = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 animate-pulse">
    <div className="h-4 sm:h-5 bg-gray-200 rounded w-32 sm:w-40 mb-4 sm:mb-6"></div>
    <div className="h-48 sm:h-56 lg:h-72 bg-gray-100 rounded-lg"></div>
  </div>
);

const SkeletonBookingCard = () => (
  <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 animate-pulse">
    <div className="flex gap-3 sm:gap-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-48"></div>
        <div className="h-3 bg-gray-200 rounded w-36"></div>
        <div className="flex gap-2">
          <div className="h-3 bg-gray-200 rounded w-40"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-28"></div>
      </div>
    </div>
  </div>
);

const TouristSkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50/50 via-white to-red-50/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header Skeleton */}
        <div className="mb-4 sm:mb-6 lg:mb-8 animate-pulse">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg"></div>
            <div>
              <div className="h-5 sm:h-6 lg:h-7 bg-gray-200 rounded w-48 sm:w-56 lg:w-64 mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-64 sm:w-80 ml-10 sm:ml-12"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>

        {/* Revenue & Top Packages Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          <SkeletonChart />
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 animate-pulse">
              <div className="h-4 sm:h-5 bg-gray-200 rounded w-32 sm:w-40 mb-4"></div>
              <div className="space-y-2 sm:space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
                    </div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-8 sm:w-12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-28 sm:w-32"></div>
          </div>
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {[...Array(3)].map((_, i) => (
                <SkeletonBookingCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristSkeletonLoader;

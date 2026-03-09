import React from "react";

const ScholarshipPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-linear-to-r from-red-600 to-indigo-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-size-[50px_50px]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="h-14 w-96 bg-white/20 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-2/3 bg-white/20 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="h-12 w-48 bg-white/30 rounded-full mx-auto animate-pulse" />
        </div>
      </section>

      {/* Checklist Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Filter Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="h-8 w-72 bg-gray-200 rounded mb-6 animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Country Filter */}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse" />
            </div>

            {/* Program Filter */}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse" />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <div className="h-12 w-full bg-linear-to-r from-red-400 to-indigo-400 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Offers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 rounded mb-8 animate-pulse" />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
            >
              {/* Card Image Skeleton */}
              <div className="h-48 bg-linear-to-r from-gray-200 to-gray-300 animate-pulse" />

              <div className="p-6">
                {/* University Name */}
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-4 animate-pulse" />

                {/* Details Grid */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-6 h-10 w-full bg-linear-to-r from-red-400 to-rose-400 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-8 border-t border-gray-200 pt-8">
          {["Home", "Services", "Visa Application", "Find Us", "About Us"].map(
            (item) => (
              <div
                key={item}
                className="h-4 w-24 bg-gray-200 rounded animate-pulse"
              />
            ),
          )}
        </div>
      </div>

      {/* Hotline Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="h-6 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
      </div>

      {/* Popular University Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8 mx-auto animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="h-40 bg-linear-to-r from-gray-200 to-gray-300 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Section Skeleton */}
      <section className="bg-linear-to-r from-red-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-4 w-96 bg-gray-200 rounded mb-8 animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-6 animate-pulse" />

              <div className="flex space-x-4">
                <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-24 w-full bg-gray-100 rounded-lg mb-4 animate-pulse" />
              <div className="h-10 w-24 bg-linear-to-r from-red-400 to-rose-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <div className="h-4 w-48 bg-gray-700 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScholarshipPageSkeleton;

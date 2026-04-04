// Modern Skeleton Loader Component
export const PackageSkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 animate-pulse"
        >
          <div className="flex flex-col md:flex-row gap-5">
            {/* Image Skeleton */}
            <div className="md:w-48 h-48 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg bg-size-[200%_100%] animate-shimmer"></div>

            {/* Content Skeleton */}
            <div className="flex-1 space-y-4">
              {/* Title and Badge */}
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </div>
                </div>
                <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="h-8 bg-gray-200 rounded-lg w-28"></div>
                <div className="h-9 bg-gray-200 rounded-lg w-32"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

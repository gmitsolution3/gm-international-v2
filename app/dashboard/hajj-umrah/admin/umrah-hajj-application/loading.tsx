export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="h-8 w-64 rounded-md bg-gray-300 animate-pulse mb-3" />
        <div className="h-4 w-48 rounded-md bg-gray-200 animate-pulse" />
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="h-6 w-56 rounded-md bg-gray-300 animate-pulse" />
            <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-24 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-10 w-28 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="h-11 w-full rounded-lg bg-gray-200 animate-pulse mb-6" />

        {/* Table Header — hidden on mobile */}
        <div className="hidden md:grid grid-cols-[2fr_1.6fr_1fr_1.6fr_1fr_1fr_0.8fr] gap-3 px-4 pb-3 border-b border-gray-100">
          {[
            "APPLICANT",
            "PACKAGE",
            "PRICE",
            "TRAVEL INFO",
            "PAYMENT",
            "STATUS",
            "ACTIONS",
          ].map((col) => (
            <div
              key={col}
              className="h-3 w-4/5 rounded bg-gray-200 animate-pulse"
            />
          ))}
        </div>

        {/* Skeleton Rows */}
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1.6fr_1fr_1.6fr_1fr_1fr_0.8fr] gap-4 md:gap-3 px-4 py-5 items-start md:items-center">
      {/* Applicant */}
      <div className="flex items-center gap-3 w-full">
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
        <div className="space-y-2 flex-1 min-w-0">
          <div className="h-4 w-36 rounded bg-gray-300 animate-pulse" />
          <div className="h-3 w-44 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Package */}
      <div className="space-y-2 w-full md:w-auto">
        <div className="h-5 w-14 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-3 w-40 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Price */}
      <div className="h-4 w-28 rounded bg-gray-300 animate-pulse" />

      {/* Travel Info */}
      <div className="space-y-2 w-full md:w-auto">
        <div className="h-3 w-36 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Payment */}
      <div className="space-y-2 w-full md:w-auto">
        <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-3 w-12 rounded bg-gray-200 animate-pulse" />
        <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Status */}
      <div className="h-7 w-24 rounded-full border border-gray-200 bg-gray-100 animate-pulse" />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
        <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
        <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

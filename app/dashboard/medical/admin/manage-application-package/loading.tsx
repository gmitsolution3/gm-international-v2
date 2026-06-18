export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-white to-rose-50/40 p-6 lg:p-8">
      <div className="mx-auto max-w-400 animate-pulse">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="h-8 w-72 rounded-lg bg-linear-to-r from-rose-200 to-rose-100" />
            <div className="h-4 w-64 rounded-md bg-gray-200" />
          </div>
          <div className="flex shrink-0 gap-3">
            <div className="h-11 w-28 rounded-xl bg-gray-200" />
            <div className="h-11 w-40 rounded-xl bg-linear-to-r from-rose-200 to-rose-100" />
          </div>
        </div>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="h-4 w-20 rounded-md bg-gray-200" />
                <div className="h-9 w-9 rounded-full bg-gray-200" />
              </div>
              <div className="h-8 w-10 rounded-md bg-gray-300" />
            </div>
          ))}
        </div>

        {/* Search & filters */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="h-11 flex-1 rounded-xl bg-gray-100" />
          <div className="flex gap-3">
            <div className="h-11 w-28 rounded-xl bg-gray-100" />
            <div className="h-11 w-32 rounded-xl bg-gray-100" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Table header */}
          <div className="hidden grid-cols-8 gap-4 border-b border-gray-100 bg-gray-50/60 px-6 py-3 md:grid">
            {[
              "w-16",
              "w-20",
              "w-24",
              "w-20",
              "w-16",
              "w-16",
              "w-20",
              "w-12",
            ].map((w, i) => (
              <div key={i} className={`h-3 rounded-md bg-gray-200 ${w}`} />
            ))}
          </div>

          {/* Table rows */}
          <div className="divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, row) => (
              <div
                key={row}
                className="grid grid-cols-1 gap-4 px-6 py-4 md:grid-cols-8 md:items-center"
              >
                {/* Patient */}
                <div className="flex items-center gap-3 md:col-span-1">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-3.5 w-24 rounded-md bg-gray-200" />
                    <div className="h-3 w-16 rounded-md bg-gray-100" />
                  </div>
                </div>

                {/* Hospital */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-100" />
                  <div className="h-3.5 w-28 rounded-md bg-gray-200" />
                </div>

                {/* Department */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-100" />
                  <div className="h-3.5 w-32 rounded-md bg-gray-200" />
                </div>

                {/* Country */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 shrink-0 rounded-full bg-gray-100" />
                  <div className="space-y-2">
                    <div className="h-3.5 w-16 rounded-md bg-gray-200" />
                    <div className="h-3 w-12 rounded-md bg-gray-100" />
                  </div>
                </div>

                {/* Status */}
                <div className="h-7 w-20 rounded-full bg-amber-100" />

                {/* Payment */}
                <div className="h-7 w-16 rounded-full bg-emerald-100" />

                {/* Date */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-100" />
                  <div className="h-3.5 w-20 rounded-md bg-gray-200" />
                </div>

                {/* Actions */}
                <div className="flex md:justify-end">
                  <div className="h-7 w-7 rounded-md bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// app/components/BusinessAccountsSkeleton.tsx
export default function BusinessAccountsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-350 mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="h-9 w-48 bg-gray-200 rounded-lg shimmer animate-pulse mb-3"></div>
          <div className="h-5 w-80 bg-gray-200 rounded-lg shimmer animate-pulse"></div>
        </div>

        {/* Client Details Cards */}
        <div className="mb-8">
          <div className="h-6 w-32 bg-gray-200 rounded-lg shimmer animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="h-5 w-20 bg-gray-200 rounded shimmer animate-pulse mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded shimmer animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded shimmer animate-pulse"></div>
                <div className="h-4 w-44 bg-gray-200 rounded shimmer animate-pulse"></div>
              </div>
            </div>
            {/* Client 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="h-5 w-20 bg-gray-200 rounded shimmer animate-pulse mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded shimmer animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded shimmer animate-pulse"></div>
                <div className="h-4 w-44 bg-gray-200 rounded shimmer animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Office Location",
                    "Country",
                    "Remarks",
                    "Total Amount",
                    "Advance",
                    "Due",
                    "Account Holder",
                    "Actions",
                    
                  ].map((header, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="h-4 w-20 bg-gray-200 rounded shimmer animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Row 1 */}
                {[1, 10].map((row) => (
                  <tr key={row} className="animate-pulse">
                    <td className="px-4 py-3">
                      <div className="h-5 w-24 bg-gray-200 rounded shimmer"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-20 bg-gray-200 rounded shimmer"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-28 bg-gray-200 rounded shimmer"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-24 bg-gray-200 rounded shimmer"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-24 bg-gray-200 rounded shimmer"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-20 bg-gray-200 rounded shimmer"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="h-4 w-32 bg-gray-200 rounded shimmer"></div>
                        <div className="h-4 w-28 bg-gray-200 rounded shimmer"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded shimmer"></div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-6 w-6 bg-gray-200 rounded shimmer"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Total Section */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-wrap justify-end gap-6">
              <div className="text-right">
                <div className="h-4 w-24 bg-gray-200 rounded shimmer animate-pulse mb-1"></div>
                <div className="h-6 w-28 bg-gray-200 rounded shimmer animate-pulse"></div>
              </div>
              <div className="text-right">
                <div className="h-4 w-24 bg-gray-200 rounded shimmer animate-pulse mb-1"></div>
                <div className="h-6 w-28 bg-gray-200 rounded shimmer animate-pulse"></div>
              </div>
              <div className="text-right">
                <div className="h-4 w-24 bg-gray-200 rounded shimmer animate-pulse mb-1"></div>
                <div className="h-6 w-28 bg-gray-200 rounded shimmer animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

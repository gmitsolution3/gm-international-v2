// // SkeletonLoader.tsx
// import React from "react";

// const SkeletonLoader: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section Skeleton */}
//         <div className="text-center mb-12 animate-pulse">
//           <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto mb-4 shimmer"></div>
//           <div className="h-5 w-96 bg-gray-200 rounded-lg mx-auto max-w-md shimmer"></div>
//         </div>

//         {/* Service Cards Grid Skeleton */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//           {/* Card 1 - Student */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
//                 <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
//               </div>
//               <div className="space-y-2">
//                 <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
//                 <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
//               </div>
//               <div className="pt-4">
//                 <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
//               </div>
//             </div>
//           </div>

//           {/* Card 2 - Medical */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
//                 <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
//               </div>
//               <div className="space-y-2">
//                 <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
//                 <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
//               </div>
//               <div className="pt-4">
//                 <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
//               </div>
//             </div>
//           </div>

//           {/* Card 3 - Tourist */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
//                 <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
//               </div>
//               <div className="space-y-2">
//                 <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
//                 <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
//               </div>
//               <div className="pt-4">
//                 <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
//               </div>
//             </div>
//           </div>

//           {/* Card 4 - Business */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div className="h-8 w-24 bg-gray-200 rounded-lg shimmer"></div>
//                 <div className="h-6 w-16 bg-gray-200 rounded-full shimmer"></div>
//               </div>
//               <div className="space-y-2">
//                 <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
//                 <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
//               </div>
//               <div className="pt-4">
//                 <div className="h-10 w-full bg-gray-200 rounded-xl shimmer"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Optional: Additional loading indicators */}
//         <div className="mt-12 flex justify-center">
//           <div className="h-12 w-32 bg-gray-200 rounded-full shimmer animate-pulse"></div>
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default SkeletonLoader;


// components/AnalysisDashboardSkeleton.tsx
"use client";

const AnalysisDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Overview Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-3 w-32 mt-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Distribution & Category Summary Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Summary Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <th key={i} className="px-4 py-3">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      {[1, 2, 3, 4, 5].map((j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Monthly Trend Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="flex items-end gap-4 h-64">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full">
                      <div 
                        className="bg-gray-200 rounded-lg animate-pulse"
                        style={{ height: `${Math.random() * 200 + 50}px` }}
                      ></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-16 mt-1 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Holder & Branch Performance Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Holder Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branch-wise Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Due Analysis & Missing Documents Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Due/Risk Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-32 mx-auto bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-40 mx-auto mt-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-300 h-3 rounded-full w-1/3 animate-pulse"></div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-64 mt-1 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Missing Document Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="h-10 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-48 mx-auto mt-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Destination Analysis Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="text-center py-8">
            <div className="h-4 w-64 mx-auto bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Smart Insights Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboardSkeleton;

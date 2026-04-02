// import { authConfig } from "@/auth.config";
// import { getServerSession } from "next-auth";
// import React from "react";

// const fetchedAnalysisData = async (email: string | undefined | null) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/account/analysis-document?email=${email}`,
//     {
//       cache: "no-store",
//     },
//   );
//   return await res.json();
// };

// const AccountPage = async () => {
//   const session = await getServerSession(authConfig);
//   const analysisData  =await fetchedAnalysisData(session?.user?.email)


//   return <div>AccountPage</div>;
// };

// export default AccountPage;


// app/dashboard/analysis/page.tsx
import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import AnalysisDashboard from "./components/AccountAnalysisDashboard";


const fetchedAnalysisData = async (email: string | undefined | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/account/analysis-document?email=${email}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
  return await res.json();
};

const AnalysisPage = async () => {
  const session = await getServerSession(authConfig);
  const response = await fetchedAnalysisData(session?.user?.email);

  // Extract the analysis data from the response
  const analysisData = response?.data || null;


  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Data Available</h2>
          <p className="text-gray-600">Unable to fetch analysis data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return <AnalysisDashboard data={analysisData} />;
};

export default AnalysisPage;
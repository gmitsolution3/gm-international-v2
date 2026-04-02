// app/dashboard/accounts/medical/page.tsx
import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import Link from "next/link";
import MedicalAccountsTable from "../components/MedicalAccountsTable";


const fetchMedicalAccounts = async (email: string | undefined | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/account/medical-application?email=${email}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
  return res.json();
};

const MedicalAccountPage = async () => {
  const session = await getServerSession(authConfig);
  const response = await fetchMedicalAccounts(session?.user?.email);
  
  // Handle both data structures
  let accountsData: any[] = [];
  let isAdmin = false;
  let userRole = "";
  
  if (response?.data) {
    // Check if the response has adminAccount (admin view) or just array (non-admin view)
    if (response.data.adminAccount) {
      // Admin view structure
      accountsData = response.data.result || [];
      isAdmin = true;
      userRole = response.data.adminAccount.userRole;
    } else if (Array.isArray(response.data)) {
      // Non-admin view structure - data is directly an array
      accountsData = response.data;
      isAdmin = false;
      userRole = "";
    } else if (response.data.result) {
      // Alternative structure where result is an array without adminAccount
      accountsData = response.data.result;
      // Check if any account has accountHolder to determine if admin
      const hasAccountHolder = accountsData.some(
        (account: any) => account.accountHolder
      );
      if (hasAccountHolder && accountsData[0]?.accountHolder) {
        isAdmin = true;
        userRole = accountsData[0].accountHolder.userRole;
      } else {
        isAdmin = false;
        userRole = "";
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Medical Accounts
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage medical patient records and payments
            </p>
          </div>
          <Link href="/dashboard/accounts/medical/create-application">
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
              + Create Medical Application
            </button>
          </Link>
        </div>

        {/* Medical Accounts Table */}
        <MedicalAccountsTable 
          data={accountsData} 
          isAdmin={isAdmin}
          userRole={userRole}
        />
      </div>
    </div>
  );
};

export default MedicalAccountPage;
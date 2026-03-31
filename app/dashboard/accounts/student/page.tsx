// app/dashboard/accounts/student/page.tsx
import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import Link from "next/link";
import AccountsTable from "../components/AccountsTable";

const fetchSAP = async (email: string | undefined | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/accounts/sap?email=${email}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
  return res.json();
};

const AccountStudentPage = async () => {
  const session = await getServerSession(authConfig);
  const sap = await fetchSAP(session?.user?.email);
  const isAdmin = sap?.data?.accountHolder?.userRole === "admin";

  console.log({sap: sap})

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Student Accounts
            </h1>
            {sap?.data?.accountHolder && (
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {sap.data.accountHolder.email}
              </p>
            )}
          </div>
          <Link href="/dashboard/accounts/student/create-application">
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
              + Create Application
            </button>
          </Link>
        </div>

        {/* Accounts Table */}
        <AccountsTable data={isAdmin ? sap?.data?.result || [] :sap?.data || []} isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default AccountStudentPage;

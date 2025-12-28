// "use client";

import { Users, Clock, CheckCircle, XCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplicationTable from "../components/ApplicatoinTable";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import StatCard from "../components/stat_card";
import { getAllScholarshipDocumnetCount } from "../components/fetech";

export default async function DashboardPage() {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  const data = await getAllScholarshipDocumnetCount();

  
  const {totalApplicationCount,totalApprovedApplication,totalPendingApplication,totalRejectCount,totalScholarshipPackage,totalUniversityPackageCount} = data.documentCount
  
  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} avatar={" "}/> */}
      

      <main className="flex-1 flex flex-col overflow-auto">
        {/* <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} /> */}

        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Application"
                value={totalApplicationCount}
                icon={<Users className="w-5 h-5 text-green-500" />}
                trend="up"
              />
              <StatCard
                title="Total Scholarship Package"
                value={totalScholarshipPackage}
                icon={<Clock className="w-5 h-5 text-orange-500" />}
                trend="up"
              />
              <StatCard
                title="Total University Package"
                value={totalUniversityPackageCount}
                icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                trend="up"
              />
              <StatCard
                title="Approved Applications"
                value={totalApprovedApplication}
                icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                trend="up"
              />
              <StatCard
                title="Pending Applications"
                value={totalPendingApplication}
                icon={<XCircle className="w-5 h-5 text-red-500" />}
                trend="down"
              />
              <StatCard
                title="Rejected Applications"
                value={totalRejectCount}
                icon={<XCircle className="w-5 h-5 text-red-500" />}
                trend="down"
              />
            </div>

            {/* Application List */}
            {/* <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  Application List
                </h2>
                <Button variant="outline" size="sm">
                  All <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <ApplicationTable />
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}

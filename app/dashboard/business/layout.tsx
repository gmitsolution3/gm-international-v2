"use client";

import { useEffect, useState } from "react";
import useUserRole from "../../useContext/useUserRole";
import { UserProvider } from "../../useContext/useUserData";
import { useSession } from "next-auth/react";
import Sidebar from "../scholarship/components/sidebar";
import UserSidebar from "../scholarship/user/components/user-sidebar";
import Header from "../scholarship/components/Header";
import { Building2, FileText, LayoutDashboard, Package } from "lucide-react";
import DashboardHeader from "../components/header";
import Loader from "@/components/ui/loader";

type UserAvatar = {
  avatar: string | undefined;
};

const touristMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/business/admin",
  },
  {
    label: "Business package",
    icon: FileText,
    href: "/dashboard/business/admin/business-package",
  },
  {
    label: "Manage company",
    icon: Package,
    href: "/dashboard/business/admin/company-list",
  },
  {
    label: "Manage applications",
    icon: Package,
    href: "/dashboard/business/admin/manage-application",
  },
  {
    label: "Manage business deal",
    icon: Package,
    href: "/dashboard/business/admin/business-deal",
  },
];

const touristUserMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/business/user",
  },
  {
    label: "Application status",
    icon: FileText,
    href: "/dashboard/business/user/application-status",
  },
  {
    label: "Edit Information",
    icon: Package,
    href: "/dashboard/business/user/edit-application",
  },
  {
    label: "Business Deal",
    icon: Package,
    href: "/dashboard/business/user/business-deal",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userAvatar, setUserAvatar] = useState<UserAvatar | undefined>();

  const { userRole, loading } = useUserRole();
  const { data: session } = useSession();

  useEffect(() => {
    const userData = async () => {
      const user = await fetch(
        `https://gm-international-server-gamma.vercel.app/user/get-avatar?email=${session?.user?.email}`,
        {
          cache: "no-store",
        }
      );

      const userUpdateData = await user.json();
      setUserAvatar(userUpdateData);
    };

    userData();
  }, [session]);

  const avatar = userAvatar?.avatar;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen overflow-auto">
      <UserProvider>
        <div className="max-w-64 w-full">
          {/* this sidebar for admin */}

          {userRole === "admin" && (
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              avatar={avatar}
              menuItems={touristMenuItems}
            />
          )}

          {/* this sidebar for user */}
          {userRole === "user" && (
            <UserSidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              avatar={avatar}
              menuItems={touristUserMenuItems}
            />
          )}
        </div>
        <main className="flex-1 p-6 ">
          <div>
            <DashboardHeader
              userRole={userRole}
              avatar={avatar}
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              sidebarOpen={sidebarOpen}
            />
          </div>

          {children}
        </main>
      </UserProvider>
    </div>
  );
}

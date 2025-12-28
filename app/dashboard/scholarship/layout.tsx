"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import useUserRole from "../../useContext/useUserRole";
import UserSidebar from "./user/components/user-sidebar";
import { UserProvider } from "../../useContext/useUserData";
import { useSession } from "next-auth/react";
import { Building2, FileText, LayoutDashboard, Package } from "lucide-react";
import DashboardHeader from "../components/header";
import Loader from "@/components/ui/loader";

type UserAvatar = {
  avatar: string | undefined;
};

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/scholarship/admin",
  },
  {
    label: "Manage Applications",
    icon: FileText,
    href: "/dashboard/scholarship/admin/manage-student-application",
  },
  {
    label: "Manage Packages",
    icon: Package,
    href: "/dashboard/scholarship/admin/manage-student-packages",
  },
  {
    label: "Manage University",
    icon: Building2,
    href: "/dashboard/scholarship/admin/manage-student-university",
  },
];

const userMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/scholarship/user",
  },
  {
    label: "Application Status",
    icon: FileText,
    href: "/dashboard/scholarship/user/application-status",
  },
  {
    label: "Edit Application",
    icon: Package,
    href: "/dashboard/scholarship/user/edit-application",
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
              menuItems={menuItems}
            />
          )}

          {/* this sidebar for user */}
          {userRole === "user" && (
            <UserSidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              avatar={avatar}
              menuItems={userMenuItems}
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

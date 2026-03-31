"use client";

import { useEffect, useState } from "react";
import useUserRole from "../../useContext/useUserRole";
import { UserProvider } from "../../useContext/useUserData";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  Building2,
  FileText,
  Handshake,
  HousePlus,
  LayoutDashboard,
  Package,
  PackagePlus,
  PlaneTakeoff,
  Split,
} from "lucide-react";
import DashboardHeader from "../components/header";
import Loader from "@/components/ui/loader";
import Sidebar from "../scholarship/components/sidebar";
import Header from "../scholarship/components/Header";

type UserAvatar = {
  avatar: string | undefined;
};

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/accounts",
  },
  {
    label: "Assign Package",
    icon: PackagePlus,
    href: "/dashboard/accounts/assign-package",
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
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/get-avatar?email=${session?.user?.email}`,
        {
          cache: "no-store",
        },
      );

      const userUpdateData = await user.json();
      setUserAvatar(userUpdateData);
    };

    userData();
  }, [session]);

  const avatar = userAvatar?.avatar;


  return (
    <div className="flex min-h-screen overflow-auto">
      <UserProvider>
        <div className="max-w-64 w-full">
          {/* this sidebar for admin */}

          {(userRole === "admin" || userRole === "office_admin") && (
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              avatar={avatar}
              menuItems={menuItems}
            />
          )}
        </div>
        <main className="flex-1 p-6 ">
          <div>
            <Header
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              sidebarOpen={sidebarOpen}
              avatar={avatar}
              userRole={userRole}
            />
          </div>

          {children}
        </main>
      </UserProvider>
    </div>
  );
}

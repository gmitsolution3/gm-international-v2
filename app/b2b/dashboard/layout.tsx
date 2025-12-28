"use client";

import { useEffect, useState } from "react";
import useUserRole from "../../useContext/useUserRole";
import { UserProvider } from "../../useContext/useUserData";
import { useSession } from "next-auth/react";
import { Building2, FileText, LayoutDashboard, Package } from "lucide-react";
import Loader from "@/components/ui/loader";
import Sidebar from "@/app/dashboard/scholarship/components/sidebar";
import UserSidebar from "@/app/dashboard/scholarship/user/components/user-sidebar";
import DashboardHeader from "@/app/dashboard/components/header";

type UserAvatar = {
  avatar: string | undefined;
};

const userMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/b2b/dashboard",
  },
  {
    label: "Scholarship Package",
    icon: Package,
    href: "/b2b/dashboard/b2b-scholarship-package",
  },
  {
    label: "Tourist Package",
    icon: Package,
    href: "/b2b/dashboard/b2b-tourist-package",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userAvatar, setUserAvatar] = useState<UserAvatar | undefined>();

  const { data: session } = useSession();
  const {userRole, loading} = useUserRole();

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

//   if (loading) {
//     return <Loader />;
//   }

  return (
    <div className="flex min-h-screen overflow-auto">
      <UserProvider>
        <div className="max-w-64 w-full">
          {/* this sidebar for user */}
          <UserSidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            avatar={avatar}
            menuItems={userMenuItems}
          />
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

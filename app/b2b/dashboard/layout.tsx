"use client";

import { useEffect, useState } from "react";
import useUserRole from "../../useContext/useUserRole";
import { UserProvider } from "../../useContext/useUserData";
import { useSession } from "next-auth/react";
import {
  Award,
  BookUser,
  ClipboardPlus,
  Handshake,
  LayoutDashboard,
  Plane,
} from "lucide-react";
import UserSidebar from "@/app/dashboard/scholarship/user/components/user-sidebar";
import DashboardHeader from "@/app/dashboard/components/header";

type UserAvatar = {
  avatar: string | undefined;
};

const userMenuItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/b2b/dashboard",
  },
  {
    label: "Student Package",
    icon: <BookUser />,
    href: "/b2b/dashboard/b2b-scholarship-package",
  },
  {
    label: "Tourist Package",
    icon: <Plane />,
    href: "/b2b/dashboard/b2b-tourist-package",
  },
  {
    label: "Medical Package",
    icon: <ClipboardPlus />,
    href: "/b2b/dashboard/b2b-medical-package",
  },
  {
    label: "Business Package",
    icon: <Handshake />,
    href: "/b2b/dashboard/b2b-business-package",
  },
  {
    label: "Visa Rate",
    icon: <Award />,
    href: "/b2b/dashboard/visa-rate",
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
  const { userRole, loading } = useUserRole();

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
        {/* this sidebar for user */}
        <UserSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          avatar={avatar}
          menuItems={userMenuItems}
        />

        <main className="flex-1 p-6 ">
          <div >
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

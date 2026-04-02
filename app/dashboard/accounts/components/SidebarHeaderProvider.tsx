"use client";

import useUserRole from "@/app/useContext/useUserRole";
import { useState } from "react";
import Sidebar from "../../scholarship/components/sidebar";
import Header from "../../scholarship/components/Header";
import { LayoutDashboard, PackagePlus } from "lucide-react";

export default function SidebarHeaderProvider({
  children,
  avatar,
}: {
  children: React.ReactNode;
  avatar: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userRole } = useUserRole();

  const isAdminUser = userRole === "admin" || userRole === "office_admin";

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/accounts",
    },
    {
      label: "Create Application",
      icon: PackagePlus,
      href: "/dashboard/accounts/assign-package",
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      {isAdminUser && (
        <>
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside
            className={`
              fixed top-0 left-0 z-50 h-full w-64 bg-white
              transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:static lg:z-auto lg:h-auto lg:translate-x-0
              lg:flex lg:shrink-0
            `}
          >
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              avatar={avatar}
              menuItems={menuItems}
            />
          </aside>
        </>
      )}

      <main className="flex min-h-screen flex-1 flex-col min-w-0 overflow-hidden">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          avatar={avatar}
          userRole={userRole}
        />

        <div className="flex-1 p-4 md:p-6 w-full">{children}</div>
      </main>
    </div>
  );
}

"use client";

import useUserRole from "@/app/useContext/useUserRole";
import React, { useState } from "react";
import Sidebar from "../../scholarship/components/sidebar";
import Header from "../../scholarship/components/Header";
import { LayoutDashboard, LucideIcon, PackagePlus } from "lucide-react";

export type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

interface SidebarHeaderProviderProps {
  children: React.ReactNode;
  avatar: string;
  menuItems: MenuItem[] | [];
}

export default function SidebarHeaderProvider({
  children,
  avatar,
  menuItems,
}: SidebarHeaderProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userRole } = useUserRole();

  const isAdminUser = userRole === "admin" || userRole === "office_admin";

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {isAdminUser && (
        <>
          {sidebarOpen && (
            <div
              className="inset-0 z-40 bg-black/50 lg:hidden sticky top-0"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <aside
            className={`
      fixed top-0 left-0 z-50 h-screen w-64 bg-white
      transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg:static lg:translate-x-0 lg:flex lg:shrink-0
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

      {!isAdminUser && (
        <>
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside
            className={`
      fixed top-0 left-0 z-50 h-screen w-64 bg-white
      transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg:static lg:translate-x-0 lg:flex lg:shrink-0
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

      <div className="custom-scrollbar flex flex-1 flex-col h-screen w-full overflow-y-auto">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          avatar={avatar}
          userRole={userRole}
        />

        <div className="flex-1 w-full">{children}</div>
      </div>
    </div>
  );
}

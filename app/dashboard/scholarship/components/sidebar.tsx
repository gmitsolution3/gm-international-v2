"use client";

import Link from "next/link";
import { X, LogOut, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useUser } from "@/app/useContext/useUserData";
import { useRouter, usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  avatar: string | undefined;
  menuItems: MenuItem[];
}

export default function Sidebar({
  isOpen,
  onToggle,
  avatar,
  menuItems,
}: SidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const { name, email } = user;

  const handleOAuthSignOut = () => {
    setIsLoading(true);

    signOut()
      .then(() => {
        router.push("/auth/signin");
      })
      .catch((err) => {
        console.error("Find the error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* Overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed md:relative w-72 h-screen bg-linear-to-b from-white to-gray-50/50 border-r border-gray-200/60 flex flex-col transition-transform duration-300 ease-in-out z-40 shadow-2xl md:shadow-none",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <Link href="/" className="group">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/0QFKdBLv/Frame-3.png"
                  alt="logo"
                  className="w-32 h-32 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent rounded-full transition-all duration-300" />
              </div>
            </Link>

            <button
              onClick={onToggle}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:rotate-90"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Main Menu
          </div>

          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25"
                    : "text-gray-700 hover:bg-gray-100 hover:shadow-md hover:scale-[1.02]",
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}

                <span
                  className={cn(
                    "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-red-500",
                  )}
                >
                  {item.icon}
                </span>

                <span className="text-sm font-medium flex-1">{item.label}</span>

                {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="space-y-4">
          <div className="bg-gray-200 rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center gap-3"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div className="relative">
                <img
                  src={avatar || "/default-avatar.png"}
                  alt="User"
                  className="h-12 w-12 rounded-xl border-2 border-red-500/20 object-cover transition-transform duration-200 hover:scale-105"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {name || "User Name"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {email || "user@example.com"}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Link
                href={`/profile?email=${email}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-red-600 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-200 hover:shadow-md group"
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold">View Profile</span>
              </Link>

              <button
                onClick={handleOAuthSignOut}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full px-4 bg-white py-2.5 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                    <span className="text-sm font-semibold">
                      Signing out...
                    </span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">Sign Out</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
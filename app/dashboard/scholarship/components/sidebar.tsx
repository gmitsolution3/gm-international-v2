"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Package, Building2, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useUser } from "@/app/useContext/useUserData";
import { useRouter } from "next/navigation";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  avatar: string | undefined;
  menuItems: MenuItem[];
}

export default function Sidebar({ isOpen, onToggle, avatar, menuItems }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const { name, email, photo } = user;


   const handleOAuthSignOut = () => {
      setIsLoading(true);
  
      signOut()
        .then((result) => {
          if (result) {
            
          }
          
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed md:relative w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out z-40",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img
                src="https://i.postimg.cc/0QFKdBLv/Frame-3.png"
                alt=""
                className="w-28 h-28"
              />
            </Link>
          </div>
          <button
            onClick={onToggle}
            className="md:hidden p-1 hover:bg-sidebar-accent rounded transition-colors"
          >
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeItem === item.label;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-red-500 text-white"
                    : "text-sidebar-foreground hover:bg-red-500"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="w-48 mx-auto mb-10 space-y-3">
          <div className="flex items-center gap-3 border-b border-gray-400 pb-4">
            <img
              src={`${avatar}`}
              alt="User"
              className="h-8 w-8 rounded-full border-2 border-red-500"
            />
            <div className="min-w-0 text-black">
              <p className="truncate text-lg font-semibold">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <div className="w-full ">
            <Link
              href={`/profile?email=${email}`}
              className="flex items-center justify-center border-2 bg-red-300 border-gray-300 gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-red-500 hover:text-white font-bold"
            >
              Profile
            </Link>
            <button
              onClick={handleOAuthSignOut}
              className="w-full flex items-center justify-center border-2 my-2 border-red-500 gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-red-500 hover:text-white font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

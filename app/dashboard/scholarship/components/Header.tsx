"use client";

import { useUser } from "@/app/useContext/useUserData";
import useUserRole from "@/app/useContext/useUserRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Menu, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  avatar: string | undefined;
  userRole: string;
}

export default function Header({
  onMenuToggle,
  sidebarOpen,
  avatar,
  userRole,

}: HeaderProps) {
  const { data: session, status } = useSession();
  const { loading } = useUserRole();
  const { setUser } = useUser();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  const b2bUser = pathname.startsWith("/b2b/dashboard");
  const router = useRouter();

  const email = session?.user?.email;
  const name = session?.user?.name;

  // Check screen size for responsive adjustments
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      const loggedInUser = {
        name,
        email,
      };
      setUser(loggedInUser);
    }
  }, [status, setUser, session]);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const signOutFun = async () => {
    try {
      await signOut();

      Swal.fire({
        title: "Logged out successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/b2b");
    } catch (err) {
      console.error("Find the error", err);

      Swal.fire({
        title: "Failed to log out",
        icon: "error",
      });
    }
  };

  return (
    <header className="bg-background border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-30 w-full">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        {/* Menu button - visible on mobile/tablet */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>

        {/* Dashboard title - responsive text sizing */}
        <h1 className="flex gap-1 sm:gap-2 text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">
          {b2bUser ? (
            <span className="truncate">B2B</span>
          ) : (
            <span className="truncate">
              {loading ? (
                <div className="inline-block animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-t-4 border-red-600"></div>
              ) : (
                userRole.toUpperCase()
              )}
            </span>
          )}

          <span className="text-red-600 shrink-0">Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 shrink-0">
        {/* Notification bell - hidden on very small screens if needed */}
        <button
          className="relative p-1.5 sm:p-2 text-foreground hover:bg-muted rounded-lg transition-colors hidden xs:block"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User info - responsive display */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User name - hide on mobile, show on tablet and up */}
          <div className="hidden sm:block text-right">
            <p className="text-xs sm:text-sm font-medium text-foreground truncate max-w-30 md:max-w-50">
              {name || "User"}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                {avatar && <AvatarImage src={avatar} alt={name || "User"} />}
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/profile?email=${email}`)}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOutFun}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useUser } from "@/app/useContext/useUserData";
import useUserRole from "@/app/useContext/useUserRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  LogOut,
  Menu,
  Settings,
  User,
  ChevronDown,
  Search,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

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

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      await signOut({
        redirect: true,
        callbackUrl: "/b2b",
      });

      Swal.fire({
        title: "Logged out successfully!",
        text: "You have been securely logged out.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#EF4444",
        timer: 2000,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      router.push("/b2b");
    } catch (err) {
      console.error("Find the error", err);
      Swal.fire({
        title: "Logout Failed",
        text: "Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <header
      className={cn(
        "bg-white/80 backdrop-blur-md border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-30 w-full transition-all duration-300",
        isScrolled
          ? "border-gray-200/80 shadow-lg shadow-gray-100/50"
          : "border-transparent",
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        {/* Menu Toggle Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 shrink-0 group"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
          <span className="absolute inset-0 bg-red-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200" />
        </button>

        {/* Dashboard Title with Animated Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
            </div>

            <h1 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold">
              {b2bUser ? (
                <span className="bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  B2B
                </span>
              ) : (
                <span className="text-gray-900">
                  {loading ? (
                    <div className="inline-flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent" />
                      <span className="text-sm text-gray-500">Loading...</span>
                    </div>
                  ) : (
                    <span className="font-extrabold tracking-tight">
                      {userRole.toUpperCase()}
                    </span>
                  )}
                </span>
              )}

              <span className="text-red-500 font-bold shrink-0 relative">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-red-500 to-transparent rounded-full" />
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Search Button - Hidden on mobile */}
        <button
          className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm text-gray-400 group-hover:text-gray-600">
            Search...
          </span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-500">
            ⌘K
          </kbd>
        </button>

        {/* Notification Bell with Animation */}
        <button
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          aria-label="Notifications"
          onClick={() => setHasNotifications(!hasNotifications)}
        >
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          {hasNotifications && (
            <>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-200" />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
              {/* User Info - Desktop */}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-red-500 transition-colors">
                  {name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-30 md:max-w-40">
                  {userRole || "Member"}
                </p>
              </div>

              {/* Avatar with Status */}
              <div className="relative">
                <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-transparent group-hover:border-red-500 transition-all duration-200 ring-2 ring-transparent group-hover:ring-red-100">
                  {avatar && <AvatarImage src={avatar} alt={name || "User"} />}
                  <AvatarFallback className="bg-linear-to-br from-red-400 to-red-600 text-white font-bold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>

                {/* Online Status Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>

              {/* Dropdown Indicator */}
              <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-200 group-hover:rotate-180" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 mt-2 p-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50"
          >
            {/* User Info Header */}
            <div className="px-3 py-2.5 mb-1 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold text-gray-900">{name}</p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>

            <DropdownMenuSeparator className="my-1" />

            {/* Menu Items */}
            <DropdownMenuItem
              onClick={() => router.push(`/profile?email=${email}`)}
              className="flex items-center gap-2 px-3 py-2.5 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>My Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="flex items-center gap-2 px-3 py-2.5 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <Settings className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onClick={signOutFun}
              className="flex items-center gap-2 px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// Utility function for className concatenation
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
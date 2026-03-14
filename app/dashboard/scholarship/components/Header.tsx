// "use client";

// import { useUser } from "@/app/useContext/useUserData";
// import useUserRole from "@/app/useContext/useUserRole";
// import { auth } from "@/auth";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Loader from "@/components/ui/loader";
// import { Bell, Divide, Menu } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

// interface HeaderProps {
//   onMenuToggle: () => void;
//   sidebarOpen: boolean;
//   avatar: string | undefined;
//   userRole: string;
// }

// export default function Header({ onMenuToggle, sidebarOpen, avatar, userRole}: HeaderProps) {
  
//   const { data: session, status } = useSession();
//   const {loading } = useUserRole();
//   const { setUser } = useUser();
//   const pathname = usePathname();

//   const b2bUser = pathname.startsWith("/b2b/dashboard");

//   const email = session?.user?.email;
//   const name = session?.user?.name;

//   useEffect(() => {
//     if (status === "authenticated") {
//       const loggedInUser = {
//         name,
//         email,
//       };

//       setUser(loggedInUser);
//     }
//   }, [status, setUser, session]);

//   return (
//     <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
//       <div className="flex items-center gap-4">
//         <button
//           onClick={onMenuToggle}
//           className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
//         >
//           <Menu className="w-5 h-5 text-foreground" />
//         </button>

//         <h1 className="flex gap-2 text-2xl font-bold text-foreground">
//           {b2bUser ? (
//             <div>B2B</div>
//           ) : (
//             <div>
//               {loading ? (
//                 <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-red-600"></div>
//               ) : (
//                 userRole.toUpperCase()
//               )}{" "}
//             </div>
//           )}

//           <span className="text-red-600">Dashboard</span>
//         </h1>
//       </div>

//       <div className="flex items-center gap-6">
//         <button className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors">
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>

//         <div className="flex items-center gap-3">
//           <div className="text-right">
//             <p className="text-sm font-medium text-foreground">{name}</p>
//           </div>
//           <Avatar>
//             {!avatar ? (
//               <span className="absolute inset-0 flex items-center justify-center bg-red-200 text-gray-600 font-semibold">
//                 {name ? name.charAt(0).toUpperCase() : "U"}
//               </span>
//             ) : (
//               <img
//                 src={avatar}
//                 alt="User avatar"
//                 className="h-full w-full object-cover"
//               />
//             )}
//           </Avatar>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import { useUser } from "@/app/useContext/useUserData";
import useUserRole from "@/app/useContext/useUserRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

          {/* Avatar with responsive sizing */}
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0">
            {avatar ? <AvatarImage src={avatar} alt={name || "User"} /> : null}
            <AvatarFallback className="bg-red-100 text-red-600 font-semibold text-xs sm:text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

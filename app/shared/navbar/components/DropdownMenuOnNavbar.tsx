"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUserRole from "@/app/useContext/useUserRole";
import Link from "next/link";
import Loader from "@/components/ui/loader";
import Swal from "sweetalert2";

interface UserDropdownProps {
  email?: string;
  photo?: string;
  name?: string;
}

export function UserDropdown({ email, photo, name }: UserDropdownProps) {
  const router = useRouter();
  const result = useUserRole();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const { userRole, loading } = result;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Handle mouse enter (desktop hover)
  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  // Handle mouse leave (desktop hover)
  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  // Handle click (mobile/tablet)
  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleOAuthSignOut = () => {
    setIsLoading(true);

    signOut()
      .then((result) => {
        if (result) {
          Swal.fire({
            icon: "success",
            title: "Logged out successfully",
          });
        }
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
        });
        router.push("/auth/signin");
      })
      .catch((err) => {
        console.error("Find the error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle menu item click
  const handleMenuItemClick = (action: string) => {
    // Add your action handlers here

    if (action === "Profile") {
      console.log("Profile");
    } else if (action === "Dashboard") {
      console.log("Dashboard");
    } else {
      handleOAuthSignOut();
    }

    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar Button */}
      <button
        onClick={handleClick}
        className="group relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary transition-all duration-300 hover:border-primary/80 focus:outline-none focus:ring-2 focus:ring-ring hover:cursor-pointer"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {!photo ? (
          <span className="absolute inset-0 flex items-center justify-center bg-red-200 text-gray-600 font-semibold">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </span>
        ) : (
          <img
            src={photo}
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        )}

        {/* Hover indicator */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-border bg-card shadow-lg transition-all duration-300 ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        {/* User Info */}
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={photo} alt="User" className="h-8 w-8 rounded-full" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1 ">
          <Link href={`/profile?email=${email}`}>
            <MenuItemWithIcon
              icon={User}
              label="Profile"
              onClick={() => handleMenuItemClick("Profile")}
            />
          </Link>
          <Link href="/dashboard">
            <MenuItemWithIcon
              icon={LayoutDashboard}
              label="Dashboard"
              onClick={() => handleMenuItemClick("Dashboard")}
            />
          </Link>
        </div>

        {/* Logout Button */}
        <div className="border-t border-border py-1">
          <MenuItemWithIcon
            icon={LogOut}
            label="Logout"
            onClick={() => handleMenuItemClick("Logout")}
            isDestructive
          />
        </div>
      </div>
    </div>
  );
}

interface MenuItemWithIconProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  isDestructive?: boolean;
}

function MenuItemWithIcon({
  icon: Icon,
  label,
  onClick,
  isDestructive,
}: MenuItemWithIconProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-left text-sm transition-all duration-200 flex items-center gap-3 hover:bg-red-300 hover:cursor-pointer ${
        isDestructive
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground hover:text-primary"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}

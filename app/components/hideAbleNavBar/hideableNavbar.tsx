"use client";

import { NavBar } from "@/app/shared/navbar/NavBar";
import { usePathname } from "next/navigation";

export default function HidableNavbar() {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/dashboard");
  const hideNavbar1 = pathname.startsWith("/b2b/dashboard");

  if (hideNavbar || hideNavbar1) return null;

  return (
    <div className="sticky top-0 z-50 bg-white">
      <NavBar />
    </div>
  );
}

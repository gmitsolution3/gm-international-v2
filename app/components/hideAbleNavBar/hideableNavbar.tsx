"use client";

import { NavBar } from "@/app/shared/navbar/NavBar";
import { usePathname } from "next/navigation";
// email: "sabbir@gmail.com";
// id: "6a23d5e4ffcc967de9ca2b39";
// name: "sabbir";
// phone: "01817247388";
// userRole: "admin";
// username: "sabbir";

export interface SessionUser{
  email: string;
  id: string;
  name: string;
  phone: string;
  userRole: string;
  username: string;
}

export default function HidableNavbar({ session }: { session: SessionUser }) {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/dashboard");
  const hideNavbar1 = pathname.startsWith("/b2b/dashboard");
  const hideNavbar2 = pathname.startsWith("/main-dashboard");

  if (hideNavbar || hideNavbar1 || hideNavbar2) return null;

  return (
    <div className="sticky top-0 z-50 bg-white">
      <NavBar session={session} />
    </div>
  );
}

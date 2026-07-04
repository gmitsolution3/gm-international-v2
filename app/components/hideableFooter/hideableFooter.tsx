"use client";

import Footer from "@/app/shared/footer/Footer";
import { usePathname } from "next/navigation";

export default function HidableFooter() {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/dashboard");

  if (hideNavbar) return null;

  return (
    <div>
      <Footer />
    </div>
  );
}

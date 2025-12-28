"use client";

import { usePathname } from "next/navigation";

export const useUserSource = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/b2b")) {
    return "b2b";
  }

  if (pathname.startsWith("/student-home-page")) {
    return "student";
  }

  return "unknown";
};

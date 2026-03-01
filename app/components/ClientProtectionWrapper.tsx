// "use client";

// import CopyProtected from "@/app/components/CopyProtected";
// import { useSession } from "next-auth/react";

// export default function ClientProtectionWrapper({ children }) {
//   const { data: session } = useSession();

//   const role = session?.user?.role;

//   return <CopyProtected role={role}>{children}</CopyProtected>;
// }

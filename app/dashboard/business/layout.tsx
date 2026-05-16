// "use client";

// import { useEffect, useState } from "react";
// import useUserRole from "../../useContext/useUserRole";
// import { UserProvider } from "../../useContext/useUserData";
// import { useSession } from "next-auth/react";
// import Sidebar from "../scholarship/components/sidebar";
// import UserSidebar from "../scholarship/user/components/user-sidebar";
// import Header from "../scholarship/components/Header";
// import { Building2, FileText, LayoutDashboard, Package } from "lucide-react";
// import DashboardHeader from "../components/header";
// import Loader from "@/components/ui/loader";

// type UserAvatar = {
//   avatar: string | undefined;
// };

// const businessMenuItems = [
//   {
//     label: "Dashboard",
//     icon: <LayoutDashboard />,
//     href: "/dashboard/business/admin",
//   },
//   {
//     label: "Business package",
//     icon: <FileText />,
//     href: "/dashboard/business/admin/business-package",
//   },
//   {
//     label: "Manage company",
//     icon: <Package />,
//     href: "/dashboard/business/admin/company-list",
//   },
//   {
//     label: "Manage applications",
//     icon: <Package />,
//     href: "/dashboard/business/admin/manage-application",
//   },
//   {
//     label: "Manage business deal",
//     icon: <Package />,
//     href: "/dashboard/business/admin/business-deal",
//   },
// ];

// const businessUserMenuItems = [
//   {
//     label: "Dashboard",
//     icon: <LayoutDashboard />,
//     href: "/dashboard/business/user",
//   },
//   {
//     label: "Application status",
//     icon: <FileText />,
//     href: "/dashboard/business/user/application-status",
//   },
//   {
//     label: "Edit Information",
//     icon: <Package />,
//     href: "/dashboard/business/user/edit-application",
//   },
//   {
//     label: "Business Deal",
//     icon: <Package />,
//     href: "/dashboard/business/user/business-deal",
//   },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [userAvatar, setUserAvatar] = useState<UserAvatar | undefined>();

//   const { userRole, loading } = useUserRole();
//   const { data: session } = useSession();

//   useEffect(() => {
//     const userData = async () => {
//       const user = await fetch(
//         `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/get-avatar?email=${session?.user?.email}`,
//         {
//           cache: "no-store",
//         }
//       );

//       const userUpdateData = await user.json();
//       setUserAvatar(userUpdateData);
//     };

//     userData();
//   }, [session]);

//   const avatar = userAvatar?.avatar;

//   // if (loading) {
//   //   return <Loader />;
//   // }

//   return (
//     <div className="flex min-h-screen overflow-auto">
//       <UserProvider>
//         <div className="max-w-64 w-full">
//           {/* this sidebar for admin */}

//           {(userRole === "admin" || userRole === "office_admin") && (
//             <Sidebar
//               isOpen={sidebarOpen}
//               onToggle={() => setSidebarOpen(!sidebarOpen)}
//               avatar={avatar}
//               menuItems={businessMenuItems}
//             />
//           )}

//           {/* this sidebar for user */}
//           {userRole === "user" && (
//             <UserSidebar
//               isOpen={sidebarOpen}
//               onToggle={() => setSidebarOpen(!sidebarOpen)}
//               avatar={avatar}
//               menuItems={businessUserMenuItems}
//             />
//           )}
//         </div>
//         <main className="flex-1 p-6 ">
//           <div>
//             <DashboardHeader
//               userRole={userRole}
//               avatar={avatar}
//               onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
//               sidebarOpen={sidebarOpen}
//             />
//           </div>

//           {children}
//         </main>
//       </UserProvider>
//     </div>
//   );
// }


import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { UserProvider } from "@/app/useContext/useUserData";
import { FileText, LayoutDashboard, Package, PackagePlus } from "lucide-react";
import SidebarHeaderProvider, { MenuItem } from "../accounts/components/SidebarHeaderProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/get-avatar?email=${session?.user?.email}`,
    { cache: "no-store" },
  );

  const userAvatar = await res.json();
  const avatar = userAvatar?.avatar;
  const user = session?.user as any;


  let menuItems: MenuItem[] | [] = [];

  if (user?.userRole === "admin" || user?.userRole === "office_admin") {
    menuItems = [
      {
        label: "Dashboard",
        icon: <LayoutDashboard />,
        href: "/dashboard/business/admin",
      },
      {
        label: "Business package",
        icon: <FileText />,
        href: "/dashboard/business/admin/business-package",
      },
      {
        label: "Manage company",
        icon: <Package />,
        href: "/dashboard/business/admin/company-list",
      },
      {
        label: "Manage applications",
        icon: <Package />,
        href: "/dashboard/business/admin/manage-application",
      },
      {
        label: "Manage business deal",
        icon: <Package />,
        href: "/dashboard/business/admin/business-deal",
      },
    ];
  }

  if (user?.userRole === "user") {
    menuItems = [
      {
        label: "Dashboard",
        icon: <LayoutDashboard />,
        href: "/dashboard/business/user",
      },
      {
        label: "Application status",
        icon: <FileText />,
        href: "/dashboard/business/user/application-status",
      },
      {
        label: "Edit Information",
        icon: <Package />,
        href: "/dashboard/business/user/edit-application",
      },
      {
        label: "Business Deal",
        icon: <Package />,
        href: "/dashboard/business/user/business-deal",
      },
    ];
  }

  return (
    <div className="flex min-h-screen">
      <UserProvider>
        <SidebarHeaderProvider avatar={avatar} menuItems={menuItems}>
          {children}
        </SidebarHeaderProvider>
      </UserProvider>
    </div>
  );
}

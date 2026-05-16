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
          href: "/dashboard/scholarship/admin",
        },
        {
          label: "Manage Applications",
          icon: <FileText />,
          href: "/dashboard/scholarship/admin/manage-student-application",
        },
        {
          label: "Manage Packages",
          icon: <Package />,
          href: "/dashboard/scholarship/admin/manage-student-packages",
        },
      ];;
    }
  
    if (user?.userRole === "user") {
      menuItems = [
        {
          label: "Dashboard",
          icon: <LayoutDashboard />,
          href: "/dashboard/scholarship/user",
        },
        {
          label: "Application Status",
          icon: <FileText />,
          href: "/dashboard/scholarship/user/application-status",
        },
        {
          label: "Edit Application",
          icon: <Package />,
          href: "/dashboard/scholarship/user/edit-application",
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

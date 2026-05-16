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
        href: "/dashboard/medical/admin",
      },
      {
        label: "Manage Applications",
        icon: <FileText />,
        href: "/dashboard/medical/admin/manage-application-package",
      },
      {
        label: "Manage Medical",
        icon: <Package />,
        href: "/dashboard/medical/admin/manage-medical",
      },
    ];
  }

  if (user?.userRole === "user") {
    menuItems = [
      {
        label: "Dashboard",
        icon: <LayoutDashboard />,
        href: "/dashboard/medical/users",
      },
      {
        label: "Appointment Status",
        icon: <FileText />,
        href: "/dashboard/medical/users/appointment",
      },
      {
        label: "Edit Information",
        icon: <Package />,
        href: "/dashboard/medical/users/edit-info",
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

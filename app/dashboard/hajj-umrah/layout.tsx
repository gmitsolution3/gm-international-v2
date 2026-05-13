import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { UserProvider } from "@/app/useContext/useUserData";
import SidebarHeaderProvider, {
  MenuItem,
} from "../accounts/components/SidebarHeaderProvider";
import { BookCheck, LayoutDashboard, PackagePlus } from "lucide-react";

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
  console.log({ userRole: user?.userRole });

  let menuItems: MenuItem[] | [] = [];

  if (user?.userRole === "admin" || user?.userRole === "office_admin") {
    menuItems = [
      {
        label: "Dashboard",
        icon: <LayoutDashboard />,
        href: "/dashboard/hajj-umrah",
      },
      {
        label: "Umrah Package",
        icon: <PackagePlus />,
        href: "/dashboard/hajj-umrah/admin/umrah-packages",
      },
      {
        label: "Umrah Hajj Application",
        icon: <BookCheck />,
        href: "/dashboard/hajj-umrah/admin/umrah-hajj-application",
      },
    ];
  }

  if (user?.userRole === "user") {
    menuItems = [
      {
        label: "Dashboard",
        icon: <LayoutDashboard />,
        href: "/dashboard/hajj-umrah",
      },
      {
        label: "Booked Package",
        icon: <BookCheck />,
        href: "/dashboard/hajj-umrah/user/booked-application",
      },
      {
        label: "My Applications",
        icon: <PackagePlus />,
        href: "/dashboard/hajj-umrah/user/my-application",
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

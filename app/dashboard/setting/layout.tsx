import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { UserProvider } from "@/app/useContext/useUserData";
import { Airplay, LayoutDashboard, MapPinHouse, PlusCircle, Share2 } from "lucide-react";
import SidebarHeaderProvider from "../accounts/components/SidebarHeaderProvider";

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

   const menuItems = [
     {
       label: "Dashboard",
       icon: <LayoutDashboard />,
       href: "/dashboard/setting",
     },
     {
       label: "Office Address",
       icon: <MapPinHouse />,
       href: "/dashboard/setting/office-address",
     },
     {
       label: "About",
       icon: <Share2 />,
       href: "/dashboard/setting/about",
     },
     {
       label: "Media Manager",
       icon: <Airplay />,
       href: "/dashboard/setting/activities",
     },
     {
       label: "Notice Management",
       icon: <PlusCircle />,
       href: "/dashboard/setting/notice-management",
     },
   ];

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
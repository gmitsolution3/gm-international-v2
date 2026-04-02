
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import SidebarHeaderProvider from "./components/SidebarHeaderProvider";
import { UserProvider } from "@/app/useContext/useUserData";

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

  return (
    <div className="flex min-h-screen">
      <UserProvider>
        <SidebarHeaderProvider avatar={avatar}>
          {children}
        </SidebarHeaderProvider>
      </UserProvider>
    </div>
  );
}

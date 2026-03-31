import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SessionWrapper from "./SessionWrapper";
import HidableNavbar from "./components/hideAbleNavBar/hideableNavbar";
import HidableFooter from "./components/hideableFooter/hideableFooter";
import { Toaster } from "sonner";
import Script from "next/script";
import CopyProtected from "@/app/components/CopyProtected";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { UserProvider } from "./useContext/useUserData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GM International | Bangladesh | China | Malaysia | Australia",
  description: "Develop By GM IT Solution",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  const email = session?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/users/user-role?email=${email}`,
  );

  const result = await res.json();

  const isAdmin = result.userRole === "admin";

  return (
    <html lang="en">
      <head>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <UserProvider>
          <SessionWrapper>
            <HidableNavbar />
            <Toaster
              closeButton
              position="top-right"
              toastOptions={{
                style: {
                  backgroundColor: "#F88379",
                  color: "white",
                },
              }}
            />
            {isAdmin ? children : <CopyProtected>{children}</CopyProtected>}
            <HidableFooter />
          </SessionWrapper>
        </UserProvider>
      </body>
    </html>
  );
}

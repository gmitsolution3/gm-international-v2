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
import FloatingMessage from "./components/floatingCart/FloatingMessage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gminternational.live"),

  title: {
    default:
      "GM International | Bangladesh | China | Thailand | Malaysia | Australia",
    template: "%s | GM International",
  },

  description: "GM International Official Website",

  keywords: ["Bangladesh", "China", "Thailand", "Malaysia"],

  openGraph: {
    title:
      "GM International | Bangladesh | China | Thailand | Malaysia | Australia",
    description: "GM International Official Website",
    siteName: "GM International",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getServerSession(authConfig);
  const isAdmin = session?.user?.userRole === "admin";
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
            <Toaster closeButton position="top-right" />
            {isAdmin ? children : <CopyProtected>{children}</CopyProtected>}
            <FloatingMessage />
            <HidableFooter />
          </SessionWrapper>
        </UserProvider>
      </body>
    </html>
  );
}

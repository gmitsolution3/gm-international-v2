
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SessionWrapper from "./SessionWrapper";
import HidableNavbar from "./components/hideAbleNavBar/hideableNavbar";
import HidableFooter from "./components/hideableFooter/hideableFooter";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <HidableNavbar />
          {children}
          <HidableFooter />
        </SessionWrapper>
      </body>
    </html>
  );
}

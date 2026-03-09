import React from "react";
import MainProfile from "./components/mainProfile";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: { email?: string };
}) {
  const email = (await searchParams)?.email;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/get-profile-info?email=${email}`,
    {
      cache: "no-store",
    }
  );
  const userProfleData = await data.json();

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-background to-slate-50 dark:to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>
      <div>
        <MainProfile userProfleData={userProfleData} />
      </div>
    </main>
  );
}

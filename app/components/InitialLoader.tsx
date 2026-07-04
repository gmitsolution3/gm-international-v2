// components/InitialLoader.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen h-full fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8fafc] p-4 ">
        {/* Custom CSS for Animations */}
        <style jsx global>{`
          @keyframes spinClockwise {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes spinCounterClockwise {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        `}</style>

        {/* Double Spinner Wrapper */}
        <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
          {/* Outer Spinner (Clockwise) */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#008080] border-b-[#008080]"
            style={{ animation: "spinClockwise 1.5s linear infinite" }}
          />

          {/* Inner Spinner (Counter-Clockwise) */}
          <div
            className="absolute inset-3 rounded-full border-4 border-transparent border-l-[#ff4500] border-r-[#ff4500]"
            style={{ animation: "spinCounterClockwise 1s linear infinite" }}
          />

          {/* Logo (Centered inside spinners) */}
          <div className="absolute w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-2 shadow-sm flex items-center justify-center overflow-hidden">
            <Image
              src="https://i.postimg.cc/WbV55LZS/Group-2.png"
              alt="Logo"
              width={80}
              height={80}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Optional Loading Text */}
        <p className="mt-4 text-sm md:text-base font-medium text-gray-500 tracking-wider animate-pulse">
          Please wait...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

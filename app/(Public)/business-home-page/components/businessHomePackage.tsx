import React from "react";
import ShowHomePackage from "./showHomePackage";
import { getHomePackage } from "./fetches";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const BusinessHomePackage = async () => {
  const homePackage = await getHomePackage();

  return (
    <div className="bg-gray-100 p-4 md:p-10">
      <div>
        <ShowHomePackage packages={homePackage} />
      </div>
      <div className="flex justify-center">
        <Link href="/business-home-page/business-packages">
          <Button
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden 
          bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-white transition hover:scale-110 hover:cursor-pointer rounded-full"
          >
            <span className="flex gap-2">
              View More <ArrowRight />
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20"></div>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

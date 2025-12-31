import { Button } from "@headlessui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const PackageCustomize = () => {
  return (
    <div className="min-h-[60vh] max-w-7xl w-full mx-auto flex justify-center items-center">
      <div className="max-w-198.25 w-full text-center space-y-7 mx-auto">
        <h1 className="text-5xl font-bold">
          Customize <span className="text-[#CA2328]">Package</span>
        </h1>
        <p>
          Shape the perfect package with complete freedom—adjust routes, hotels,
          durations, and experiences to create a trip that truly feels like
          yours.
        </p>
        <Link href="/tourist-home-page/custom-package">
          <Button
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden 
          bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer rounded-full"
          >
            <span className="flex gap-2">
              Custom your package <ArrowRight />
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

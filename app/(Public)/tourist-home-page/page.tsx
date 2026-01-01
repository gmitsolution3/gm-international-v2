import React from "react";
import TouristHomeHeader from "./components/home/header";
import { PackageCustomize } from "./components/home/packageCustomize";
import WorkFlow from "./components/workFlow";
import SupportSection from "@/app/components/HSupport/HSupport";
import TouristHomePackages from "./components/home/homePackage";
import { ArrowRight } from "lucide-react";
import { Button } from "@headlessui/react";
import Link from "next/link";

const TouristHomePage = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/tourist-package",
    {
      cache: "no-store",
    }
  );

  const packageOfRes = await res.json();

  if (packageOfRes.length === 0) {
    return (
      <div className="text-2xl min-h-screen flex justify-center items-center">
        No data found
      </div>
    );
  }

  const from = "tourist";

  return (
    <div className="max-w-full">
      <div>
        <TouristHomeHeader />
      </div>
      <div>
        <TouristHomePackages packages={packageOfRes} from={from} />
        {/* View More Button */}
        <div className="flex justify-center mt-8">
          <Link href="/tourist-home-page/package">
            <Button
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden 
          bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer rounded-full"
            >
              <span className="flex gap-2">
                Book Now <ArrowRight />
              </span>
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <PackageCustomize />
      </div>
      <div>
        <WorkFlow />
      </div>
      <div>
        <SupportSection />
      </div>
    </div>
  );
};

export default TouristHomePage;

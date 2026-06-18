import React from "react";
import { PackageCustomize } from "./components/home/packageCustomize";
import WorkFlow from "./components/workFlow";
import SupportSection from "@/app/components/HSupport/HSupport";
import TouristHomePackages from "./components/home/homePackage";
import { ArrowRight } from "lucide-react";
import { Button } from "@headlessui/react";
import Link from "next/link";
import HeroSlider from "../student-home-page/components/HeroSlider";
import generateSEO from "@/lib/seo";


export const metadata = generateSEO(
  "Best Travel & Visa Consultancy for China, Thailand & Malaysia",
  "GM International provides professional tourist visa services, travel planning, holiday packages, flight booking, and international travel assistance for China, Thailand, and Malaysia.",
);


const TouristHomePage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/api/v1/get-home-page/pkg`,
    {
      cache: "no-store",
    },
  );

  const packageOfRes = await res.json();

  console.log({findData: packageOfRes})

  const slides = [
    {
      id: 1,
      title: "Explore The World With Confidence",
      subtitle: "Your Journey Begins Here",
      description:
        "Discover breathtaking destinations, exciting adventures, and unforgettable travel experiences with our expertly planned tour packages.",
      image: "https://i.postimg.cc/8cQqs57y/5-jpg.jpg",
      imageAlt: "International tourist destination",
    },
    {
      id: 2,
      title: "Make Every Trip Memorable",
      subtitle: "Travel Without Worries",
      description:
        "From visa assistance to hotel booking and guided tours, we handle everything so you can enjoy your vacation stress-free.",
      image: "https://i.postimg.cc/GtwZ924g/6-jpg.jpg",
      imageAlt: "Happy tourists traveling",
    },
  ];

  const checklistItems = [
    "Recent photo",
    "Passport scan copy",
    "Invitation letter",
    "Job ID (Job Holder)",
    "NOC (Job Holder)",
    "Business card",
    "Trade license (If any)",
    "Bank statement & solvency",
  ];

  const from = "tourist";
  const label = "Tourist document checklist";

  return (
    <div className="max-w-full">
      <div>
        <HeroSlider
          slides={slides}
          checklistItems={checklistItems}
          label={label}
        />
      </div>
      <div>
        <TouristHomePackages packages={packageOfRes.data} />
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

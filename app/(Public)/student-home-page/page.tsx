import React from "react";
import HeroSection from "./components/HeroSection";
import SupportSection from "@/app/components/HSupport/HSupport";
import PackageOfferSection from "./components/PackageOfferSection";
import { NavBar } from "@/app/shared/navbar/NavBar";
import UniversitySection from "./components/hospitalList";
import { TabsSection } from "./components/tabs";

const StudentHomePage = async () => {
  const fData = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-filtered-data`,
  );

  const filterData = await fData.json();

  return (
    <div>
      <div className="p-4">
        <HeroSection />
      </div>
      <div>
        <TabsSection filterData={filterData} />
      </div>
      <div className="text-2xl font-bold max-w-7xl mx-auto min-h-137.5 flex items-center justify-center">
        <PackageOfferSection />
      </div>
      <div>
        <UniversitySection />
      </div>
      <div className="">
        <SupportSection />
      </div>
    </div>
  );
};

export default StudentHomePage;

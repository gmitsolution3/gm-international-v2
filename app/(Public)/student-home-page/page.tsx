import React from "react";
import SupportSection from "@/app/components/HSupport/HSupport";
import PackageOfferSection from "./components/PackageOfferSection";
import UniversitySection from "./components/hospitalList";
import { TabsSection } from "./components/tabs";
import HeroSlider from "./components/HeroSlider";
import generateSEO from "@/lib/seo";
import ScholarshipUtil from "@/app/util/scholarship/slider/Slider";
import ScholarshipFetch from "@/app/util/scholarship/fetches/fetches";

export const metadata = generateSEO(
  "International Student Scholarships for China, Malaysia & Australia",
  "Apply for fully funded and partial scholarships in China, Malaysia, and Australia. Get expert support for admissions, visa applications, and study abroad programs.",
);

const StudentHomePage = async () => {
  const [scholarshipPkg, filterData] = await Promise.all([
    ScholarshipFetch.getScholarshipPkg(),
    ScholarshipFetch.getFilterData(),
  ]);

  const label = "Student documents checklist";

  return (
    <div className="min-h-screen">
      <div>
        <HeroSlider
          slides={ScholarshipUtil.slides}
          checklistItems={ScholarshipUtil.checklistItems}
          label={label}
        />
      </div>
      <div>
        <TabsSection filterData={filterData.data} />
      </div>
      <div className="text-2xl font-bold max-w-7xl mx-auto min-h-137.5 flex items-center justify-center">
        <PackageOfferSection pkg={scholarshipPkg.data} />
      </div>
      <div>
        <UniversitySection pkg={scholarshipPkg.data} />
      </div>
      <div className="">
        <SupportSection />
      </div>
    </div>
  );
};

export default StudentHomePage;

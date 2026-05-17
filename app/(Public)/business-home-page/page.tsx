import React from "react";
import BusinessHeroSection from "./components/headerSection";
import { PackageWithoutVisa } from "./components/packageWithoutVisa";
import ServicesComponent from "./components/weOffer";
import { BusinessHomePackage } from "./components/businessHomePackage";
import { ServicesSkeleton } from "@/app/components/skeleton/ServicesSkeleton";
import HeroSlider from "../student-home-page/components/HeroSlider";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "China Business Visa & Canton Fair Support Services",
  "Apply for China business visas and get complete Canton Fair support with invitation letters, Z Visa processing, travel planning, interpreter support, hotel booking, and business consultancy.",
);

const BusinessHomePage = () => {
  const slides = [
    {
      id: 1,
      title: "Unlock Global Trade Opportunities",
      subtitle: "Canton Fair Business Tour",
      description:
        "Meet verified suppliers, explore trending products, and build powerful international partnerships at the Canton Fair in China.",
      image: "https://i.postimg.cc/PxhGKJ4d/7-jpg.jpg",
      imageAlt: "Canton Fair exhibition China",
    },
    {
      id: 2,
      title: "Take Your Business Beyond Borders",
      subtitle: "Import Smarter, Grow Faster",
      description:
        "From visa processing to factory sourcing and logistics guidance — we ensure a smooth and successful Canton Fair experience.",
      image: "https://i.postimg.cc/DZFV50gz/8-jpg.jpg",
      imageAlt: "Global business expansion",
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

  const checkLabel = "Business document checklist";

  return (
    <div>
      <div>
        {/* <BusinessHeroSection /> */}
        <HeroSlider
          slides={slides}
          checklistItems={checklistItems}
          label={checkLabel}
        />
      </div>
      <div>
        <BusinessHomePackage />
      </div>
      <div>
        <PackageWithoutVisa />
      </div>
      <div>
        <ServicesComponent />
      </div>
    </div>
  );
};

export default BusinessHomePage;

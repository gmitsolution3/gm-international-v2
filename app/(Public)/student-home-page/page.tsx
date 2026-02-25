import React from "react";
import SupportSection from "@/app/components/HSupport/HSupport";
import PackageOfferSection from "./components/PackageOfferSection";
import { NavBar } from "@/app/shared/navbar/NavBar";
import UniversitySection from "./components/hospitalList";
import { TabsSection } from "./components/tabs";
import HeroSlider from "./components/HeroSlider";

const StudentHomePage = async () => {
  const fData = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-filtered-data`,
  );

  const filterData = await fData.json();

  const slides = [
    {
      id: 1,
      title: "Your Dream University Awaits",
      subtitle: "Study Abroad Made Simple",
      description:
        "Explore top universities worldwide with expert guidance, smooth application support, and complete student assistance.",
      image: "https://i.postimg.cc/D08B2cZV/1-jpg.jpg",
      imageAlt: "Study abroad students",
    },
    {
      id: 2,
      title: "Transform Your Career Globally",
      subtitle: "Opportunities Beyond Borders",
      description:
        "Join thousands of successful students who started their international education journey with us.",
      image: "https://i.postimg.cc/T1pCRcPm/2-jpg.jpg",
      imageAlt: "Global student opportunities",
    },
  ];

  const checklistItems = [
    "Application form",
    "Recent photo",
    "Passport scan copy",
    "Academic Transcript, Certificate and testimonial",
    "English test score (If any)",
    "CSCA score (If any)",
    "Medical report",
    "Police clearance ",
    "Experience Certificates (If any)",
    "Award Certificate (If any)",
  ];

  const label = "Student documents checklist";

  return (
    <div>
      <div>
        <HeroSlider
          slides={slides}
          checklistItems={checklistItems}
          label={label}
        />
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

import React from "react";
import HomePackage from "./components/homePackage";
import HomeMedicalList from "./components/homeMedicalList";
import SupportSection from "@/app/components/HSupport/HSupport";
import HeroSlider from "../student-home-page/components/HeroSlider";

const MedicalHomePage = () => {
  const checklistItems = [
    "Recent photo",
    "Passport scan copy",
    "Last 6 months medical report",
    "Attendance photo",
    "Attendance passport",
    "Bank statement & solvency",
  ];

  const slides = [
    {
      id: 1,
      title: "Advanced Medical Treatment Abroad",
      subtitle: "Your Health, Our Priority",
      description:
        "Get world-class medical treatment from top international hospitals with complete support for travel, visa, and appointments.",
      image: "https://i.postimg.cc/mDGvgk1T/4-jpg.jpg",
      imageAlt: "International medical treatment",
    },
    {
      id: 2,
      title: "Trusted Healthcare Solutions",
      subtitle: "Safe & Hassle-Free Medical Journey",
      description:
        "We connect patients with experienced doctors and modern hospitals to ensure quality treatment and comfortable recovery.",
      image: "https://i.postimg.cc/mDGvgk1T/4-jpg.jpg",
      imageAlt: "Medical tourism services",
    },
  ];

  const label = "Medical document checklist";
  return (
    <div>
      <div>
        <HeroSlider
          slides={slides}
          checklistItems={checklistItems}
          label={label}
        />
      </div>
      {/* <div>
        <HomePackage />
      </div> */}
      <div>
        <HomeMedicalList />
      </div>
      <div>
        <SupportSection />
      </div>
    </div>
  );
};

export default MedicalHomePage;

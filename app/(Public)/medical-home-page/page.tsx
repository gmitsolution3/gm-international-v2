import React from "react";
import MedicalHero from "./components/medicalHero";
import HomePackage from "./components/homePackage";
import HomeMedicalList from "./components/homeMedicalList";
import SupportSection from "@/app/components/HSupport/HSupport";


const MedicalHomePage = () => {
  return (
    <div>
      <div>
        <MedicalHero />
      </div>
      {/* <div>
        <HomePackage />
      </div> */}
      <div>
        <HomeMedicalList/>
      </div>
      <div>
        <SupportSection/>
      </div>
    </div>
  );
};

export default MedicalHomePage;

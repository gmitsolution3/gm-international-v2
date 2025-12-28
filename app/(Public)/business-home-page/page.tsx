import React from "react";
import BusinessHeroSection from "./components/headerSection";
import { Companies } from "./components/companies";
import ServicesComponent from "./components/weOffer";
import { BusinessHomePackage } from "./components/businessHomePackage";

const BusinessHomePage = () => {
  return (
    <div>
      <div>
        <BusinessHeroSection />
      </div>
      <div>
        <BusinessHomePackage/>
      </div>
      <div>
        <Companies/>
      </div>
      <div>
        <ServicesComponent/>
      </div>
    </div>
  );
};

export default BusinessHomePage;

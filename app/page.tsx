import React from "react";
import { NavBar } from "./shared/navbar/NavBar";
import HeroSection from "./components/heroSection/heroSection";
import Hero from "./components/heroSection/hero";
import ServicesSection from "./components/package/serviceCard/ServiceCard";
import HomePageAboutUs from "./components/aboutus/AboutUs";
import { HFAQ } from "./components/HFAQ/HeroFAQ";
import HSupport from "./components/HSupport/HSupport";
import MapWrapper from "./components/MapWrapper/MapWrapper";




const Home = () => {
  return (
    <div>
      <div>
        {/* <HeroSection/> */}
        <Hero />
      </div>
      <div>
        <ServicesSection />
      </div>
      <div className="mb-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl max-w-117 font-bold my-6 text-center">
          We are available{" "}
          <span className="text-red-500">all over the country</span>
        </h1>
        <MapWrapper />
      </div>
      <div id="hero" className="scroll-mt-20">
        <HomePageAboutUs />
      </div>
      <div>
        <HFAQ />
      </div>
      <div>
        <HSupport />
      </div>
    </div>
  );
};

export default Home;

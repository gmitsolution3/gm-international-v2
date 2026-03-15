import React from "react";
import { NavBar } from "./shared/navbar/NavBar";
import HeroSection from "./components/heroSection/heroSection";
import Hero from "./components/heroSection/hero";
import ServicesSection from "./components/package/serviceCard/ServiceCard";
import HomePageAboutUs from "./components/aboutus/AboutUs";
import { HFAQ } from "./components/HFAQ/HeroFAQ";
import HSupport from "./components/HSupport/HSupport";
import MapWrapper from "./components/MapWrapper/MapWrapper";
import VideoGalleryComponent from "./components/video/videoComponent";
import GalleryComponent from "./components/gallery/GalleryComponents";
import GlobalOffices from "./components/GlobalOffices/GlobalOffices";

async function getVideoAndGallery() {
  // Fetch videos from your API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/media-activities/dashboard`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}




const Home = async () => {
  const result = await getVideoAndGallery();
  const { resultGallery, resultVideo } = result.data;
  

  return (
    <div className="min-h-screen">
      <div>
        <Hero />
      </div>
      <div id="offers">
        <ServicesSection />
      </div>
      {/* <div className="mb-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl max-w-117 font-bold my-6 text-center">
          We are available <br />
          <span className="text-red-500">all over the country</span>
        </h1>
        <MapWrapper />
      </div> */}
      <div
        className="mb-10 flex flex-col justify-center bg-black items-center"
        // style={{
        //   background: "linear-gradient(360deg, #CA2328 0%, #301314 0%)",
        // }}
      >
        <GlobalOffices />
      </div>
      <div id="hero" className="scroll-mt-20">
        <HomePageAboutUs />
      </div>
      <div id="faq" className="scroll-mt-20">
        <HFAQ />
      </div>
      <div id="testimonials">
        <VideoGalleryComponent resultVideo={resultVideo} />
      </div>
      <div>
        <GalleryComponent images={resultGallery} />
      </div>
      <div>
        <HSupport />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { NavBar } from "./shared/navbar/NavBar";
import Hero from "./components/heroSection/hero";
import ServicesSection from "./components/package/serviceCard/ServiceCard";
import HomePageAboutUs from "./components/aboutus/AboutUs";
import { HFAQ } from "./components/HFAQ/HeroFAQ";
import HSupport from "./components/HSupport/HSupport";
import VideoGalleryComponent from "./components/video/videoComponent";
import GalleryComponent from "./components/gallery/GalleryComponents";
import GlobalOffices from "./components/GlobalOffices/GlobalOffices";

async function getVideoAndGallery() {
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

export async function getOfficeAddress() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/get-office-address`,
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
  const [result, officeData] = await Promise.all([
    getVideoAndGallery(),
    getOfficeAddress(),
  ]);
  const { resultGallery, resultVideo } = result.data;


  return (
    <div className="min-h-screen">
      <div>
        <Hero />
      </div>
      <div id="offers">
        <ServicesSection />
      </div>
      <div className="mb-10 flex flex-col justify-center bg-black  items-center">
        <GlobalOffices offices={officeData.data} />
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

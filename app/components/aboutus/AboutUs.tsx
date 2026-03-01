import React from "react";
import WaveImage from "./WaveImage";

const HomePageAboutUs = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row max-w-7xl mx-auto justify-center gap-8">
      <div className="p-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          About <span className="text-red-500">Us</span>
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
          GM International is a trusted global service provider based in
          Bangladesh, working at the intersection of international education,
          medical tourism, China business sourcing, and global mobility
          solutions. Our mission is simple — to make international opportunities
          accessible, transparent, and reliable for students, patients, and
          business owners. With physical branches across Dhaka, Bogura,
          Chattogram, Sylhet, Mirpur, and international presence in China, GM
          International has built a strong ecosystem that connects Bangladesh
          with the world — especially China.
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <WaveImage />
      </div>
    </div>
  );
};

export default HomePageAboutUs;

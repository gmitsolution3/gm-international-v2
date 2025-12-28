import React from "react";
import WaveImage from "./WaveImage";

const HomePageAboutUs = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row max-w-7xl mx-auto justify-center gap-8">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-8">
          About <span className="text-red-500">Us</span>
        </h1>
        <p className="max-w-172.5">
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
      <div>
        {/* <img src="https://i.postimg.cc/d3T34bJP/Frame-27.png" alt="About_us_img" className='max-w-[456px] max-h-[456px]' /> */}
        <WaveImage />
      </div>
    </div>
  );
};

export default HomePageAboutUs;

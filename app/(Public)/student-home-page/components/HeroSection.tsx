"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="max-w-[705px] py-10">
        <h1 className="text-6xl font-bold md:leading-18">
          Offering Mind Blowing Opportunity For{" "}
          <span className="text-red-500">STUDENTS</span>
        </h1>
        <p className="text-gray-500">
          Empowering students with advanced training, global exposure, and the
          right resources to build confidence, grow faster, and achieve their
          dreams with clarity and purpose.
        </p>
        <Button className="bg-red-500 hover:bg-red-700 hover:cursor-pointer mt-12 text-xl">
          Explore <ArrowDown />
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://i.postimg.cc/L5PyDtwk/OBJECTS.png"
          alt="std_home"
          className="w-[570px] h-[592px] animate-bounce-subtle"
        />

        <style jsx>
          {`
            @keyframes bounce-subtle {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-20px);
              }
            }

            .animate-bounce-subtle {
              animation: bounce-subtle 2.5s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default HeroSection;

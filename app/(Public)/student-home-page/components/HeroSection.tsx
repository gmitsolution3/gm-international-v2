"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { CheckListModal } from "../../medical-home-page/components/checkListModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


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
    
    return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="max-w-176.25 py-10">
        <h1 className="text-6xl font-bold md:leading-18">
          Offering Mind Blowing Opportunity For{" "}
          <span className="text-red-500">STUDENTS</span>
        </h1>
        <p className="text-gray-500">
          Empowering students with advanced training, global exposure, and the
          right resources to build confidence, grow faster, and achieve their
          dreams with clarity and purpose.
        </p>
        
        <Button
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden 
                      bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer rounded-full mt-10"
        >
          <span className="flex gap-2">
            Check List <ArrowRight />
          </span>
          <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
            <div className="relative h-full w-8 bg-white/20"></div>
          </div>
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://i.postimg.cc/L5PyDtwk/OBJECTS.png"
          alt="std_home"
          className="w-142.5 h-148 animate-bounce-subtle"
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
      <CheckListModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        checklistItems={checklistItems}
      />
    </div>
  );
};

export default HeroSection;

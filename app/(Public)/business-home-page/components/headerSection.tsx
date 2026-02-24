"use client"

import { Button } from "@headlessui/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CheckListModal } from "../../medical-home-page/components/checkListModal";

const BusinessHeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checklistItems = [
    "Recent photo",
    "Passport scan copy",
    "Invitation letter",
    "Job ID (Job Holder)",
    "NOC (Job Holder)",
    "Business card",
    "Trade license (If any)",
    "Bank statement & solvency",
  ];

  return (
    <div className="max-w-full w-full min-h-[80vh] flex justify-center items-center bg-linear-to-r from-red-50 to-white">
      <div className="flex flex-col-reverse md:flex-row max-w-7xl w-full gap-12 p-6">
        <div className="space-y-4 max-w-141.5">
          <h1 className="text-3xl md:text-5xl font-bold">
            Find Best <span className="text-[#CA2328]">Business Deals</span>{" "}
            <br />
            From Us
          </h1>
          <p>
            We help businesses grow with transparent guidance, dependable
            service, and smart solutions. Our focus is on building trust and
            delivering real value—every step of the journey. With us, you get
            support that’s reliable, honest, and built for long-term success.
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
        <div>
          <Image
            src={"https://i.postimg.cc/wTj84Vxp/Business-mission-pana-1.png"}
            alt="medicalHero"
            width={620}
            height={370}
            className="animate-float"
          />
        </div>
      </div>
      <CheckListModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        checklistItems={checklistItems}
      />
    </div>
  );
};

export default BusinessHeroSection;

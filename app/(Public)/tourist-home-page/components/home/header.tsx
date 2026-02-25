"use client"

import { CheckListModal } from "@/app/(Public)/medical-home-page/components/checkListModal";
import { Button } from "@headlessui/react";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const TouristHomeHeader = () => {

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
    <>
      <div className="min-h-[70vh] h-full">
        <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto justify-around items-start px-6 py-20">
          <div className="max-w-132.75 space-y-4">
            <h1 className="text-5xl font-bold">
              Find Best <span className="text-[#CA2328]">Tourist Deals</span>{" "}
              From Us
            </h1>
            <p className="py-4 text-gray-600">
              Discover handpicked travel experiences across China, Malaysia, and
              Australia, backed by trusted guidance, personalized support, and
              exceptional deals that make every trip smooth, enjoyable, and
              truly unforgettable.
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
          <div className="mt-10">
            <Image
              src="https://i.postimg.cc/gcN6QxwF/OBJECTS.png"
              alt="touristHomeHeader"
              width={649}
              height={372}
              className="animate-float"
            />
          </div>
        </div>
        <CheckListModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          checklistItems={checklistItems}
          label="Tourist Package Booking Check List"
        />
      </div>
    </>
  );
};

export default TouristHomeHeader;

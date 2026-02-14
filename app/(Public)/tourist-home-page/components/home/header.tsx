import { Button } from "@headlessui/react";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const TouristHomeHeader = () => {
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
            <Button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-6 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer">
              <span className="flex gap-2">
                Book Now <ArrowRight />
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
        {/* Search bar (bottom) */}
        {/* <div className="absolute max-w-full w-full mx-auto -translate-x-1/2 md:left-auto md:translate-x-0">
          <div className="w-6xl mx-auto shadow-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here"
                className="w-full pl-10 pr-4 py-4 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none shadow-sm"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} color="red" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default TouristHomeHeader;

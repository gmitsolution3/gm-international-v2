"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Country {
  name: string;
}

interface Offer {
  _id: string;
  //   idCard: string;
  //   sl_No: string;
  selectedCountry: Country;
  selectedUniversity: string;
  //   selectUniversitiesProgram: string;
  //   selectStudyLevel: string;
  //   selectDuration: string;
  //   selectLanguage: string;
  //   courseName: string;
  //   startingDate: string;
  deadlineDate: string;
  //   tuitionFree: string;
  packagePrice: string;
  scholarshipDetails: string;
  imgURL: string;
  B2BPrice: string;
  //   universityUrl: string;
  //   universitysDescription: string;
  //   applicationRequirement: string;
  //   createdAt: string;
}

interface OfferCardProps {
  offer: Offer;
  form: string;
}

export default function OfferCard({ offer, form }: OfferCardProps) {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div
      className="group relative h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-full rounded-3xl border-2  bg-gray-100 p-6 md:p-8 transition-all duration-300 ease-in-out flex flex-col ${
          isHovered ? "shadow-2xl shadow-red-200 border-red-600" : "shadow-md"
        }`}
      >
        <div className="flex justify-around">
          {/* University Logo/Avatar */}
          <div className="mb-4 flex justify-center md:justify-start">
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-gray-300 to-gray-400 transition-all duration-300 ${
                isHovered ? "scale-110 shadow-lg" : ""
              }`}
            >
              <img
                src={offer.imgURL}
                alt=""
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-gray-300 to-gray-400 transition-all duration-300 ${
                  isHovered ? "scale-110 shadow-lg" : ""
                }`}
              />
            </div>
          </div>

          {/* University Info */}
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
              {offer.selectedUniversity}
            </h3>
            <p className="text-sm text-gray-600 mb-4 transition-all duration-300">
              {offer.selectedCountry.name}
            </p>
          </div>
        </div>

        {/* Amount and Deadline */}
        <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
          <div className="my-2">
            <p className="text-xs md:text-sm text-gray-600 font-semibold mb-1">
              Amount:
            </p>
            <p className="text-sm md:text-base font-bold text-gray-900">
              {offer.packagePrice}
            </p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 font-semibold mb-1">
              Deadline:
            </p>
            <p className="text-sm md:text-base font-bold text-gray-900">
              {offer.deadlineDate}
            </p>
          </div>
          {offer.B2BPrice && (
            <p className="text-xs md:text-sm text-gray-600 grow line-clamp-3 transition-colors duration-300">
              B2B Price : {offer.B2BPrice}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-600 mb-6 grow line-clamp-3 transition-colors duration-300">
          {offer.scholarshipDetails}
        </p>

        {/* View Details Button */}
        <Link
          href={`/student-home-page/student-package-offer/${offer._id}?from=${form}`}
        >
          <Button
            className={`w-full bg-[#CA2328] hover:bg-red-700 text-white font-semibold py-2 md:py-3 rounded-full transition-all duration-300 ease-in-out transform hover:cursor-pointer ${
              isHovered ? "shadow-lg shadow-red-400 scale-105" : "shadow-md"
            }`}
          >
            View Details
          </Button>
        </Link>
      </div>

      <div
        className={`absolute inset-0 rounded-3xl bg-linear-to-r from-red-400 to-red-600 -z-10 transition-all duration-300 ease-in-out ${
          isHovered ? "opacity-20 blur-xl" : "opacity-0 blur-2xl"
        }`}
      />
    </div>
  );
}

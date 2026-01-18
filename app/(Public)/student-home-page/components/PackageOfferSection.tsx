"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import OfferCard, { ScholarshipCardProps } from "./OfferCard";
import Link from "next/link";

interface Country {
  name: string;
}
interface Offer {
  id: string;
  _id: string;
  selectedCountry: Country;
  selectedUniversity: string;
  deadlineDate: string;
  packagePrice: string;
  scholarshipDetails: string;
  imgURL: string;
  B2BPrice: string;
}

const PackageOfferSection = () => {
  const [displayedOffers, setDisplayedOffers] = useState<
    ScholarshipCardProps[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from your database
    const fetchOffers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package`
        );
        const data = await response.json();
        setDisplayedOffers(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);



  const from = "student";

  return (
    <section className="w-full py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore our popular <span className="text-red-600">offers</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Discover specially curated scholarship offers that open doors to
            your future. Get expert support, essential resources, and
            personalized mentorship all in one place.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {displayedOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} form={from} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/student-home-page/student-package-offer">
            <Button className="bg-[#CA2328] hover:bg-red-700 text-white rounded-full px-6 py-2 md:px-8 md:py-3 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:cursor-pointer">
              View More
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-in;
        }
      `}</style>
    </section>
  );
};

export default PackageOfferSection;

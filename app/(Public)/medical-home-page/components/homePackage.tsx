
import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { fetchMedicalPackage } from "./fetches";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Offer {
  _id: string;
  hospitalName: string;
  appointmentDate: string;
  appointmentFree: string;
  treatmentDescription: string;
  hospitalWebLink: string;
  treatmentDetails: string;
  doctorExpertise: string;
  photo: string;
  country: string;
}

const OfferCard: React.FC<{
  offer: Offer;
}> = ({ offer }) => {
  const dateObj = new Date(offer.appointmentDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full group bg-white rounded-3xl border-2 hover:border-red-500 p-4 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Image Section */}
      <div className="mb-6 flex gap-4">
        <img
          src={offer.photo}
          alt={offer.hospitalName}
          className="w-16 h-16 rounded-full object-cover border-2 border-red-200 group-hover:scale-110 transition-transform duration-300"
        />
        {/* Hospital Name */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 line-clamp-2">
          {offer.hospitalName}
        </h3>
      </div>

      {/* Details Grid */}
      <div className="space-y-3 mb-6 grow">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
              Cost
            </p>
            <p className="text-lg md:text-xl font-bold text-gray-900">
              {offer.appointmentFree}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
              Deadline
            </p>
            <p className="text-lg md:text-xl font-bold text-gray-900">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Treatment Description */}
        <div className="pt-2">
          <p className="text-sm text-gray-600 line-clamp-2">
            {offer.treatmentDescription}
          </p>
        </div>
      </div>

      {/* View Details Button */}
      <Link href={`/medical-home-page/medical-packages/${offer._id}`}>
        <button className="w-full bg-[#CA2328] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:cursor-pointer">
          View Details
          <ChevronRight
            size={20}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </Link>
    </div>
  );
};

export default async function HomePackage() {
  const displayedOffers = await fetchMedicalPackage();

  return (
    <div className="mx-auto min-h-[70vh] bg-linear-to-b from-white via-red-50 to-white py-12 md:py-20 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16 animate-fade-in">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Explore our popular <span className="text-red-600">offers</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Discover world-class medical treatments from leading hospitals. Find
          the perfect healthcare solution tailored to your needs with expert
          doctors and state-of-the-art facilities.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedOffers.map((offer: Offer, index: number) => (
            <div
              key={offer._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>
        <div className="mt-6 w-full flex justify-center">
          <Link href="/medical-home-page/medical-packages">
            <Button
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden 
          bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer rounded-full"
            >
              <span className="flex gap-2">
                View more <ArrowRight />
              </span>
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

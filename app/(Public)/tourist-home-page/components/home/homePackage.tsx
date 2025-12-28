"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import { Button } from "@headlessui/react";

export interface TouristPackage {
  _id: string;
  country: string;
  city: string;
  photos: string[];
  packageName: string;
  price: string;
  duration: string;
  startDate: string;
  endDate: string;
  packageId: string;
  subDestination: string;
  destination: string;
  includes: string[];
  excludes: string[];
  B2BPrice: string;
}

interface TouristHomePackagesProps {
  packages: TouristPackage[];
  from: string;
}

export default function TouristHomePackages({
  packages,
  from,
}: TouristHomePackagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!packages) {
    return <Loader />;
  }

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % Math.ceil(packages.length / itemsToShow)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(packages.length / itemsToShow)) %
        Math.ceil(packages.length / itemsToShow)
    );
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(parseInt(price));
  };

  return (
    <div className="min-h-[60vh] px-4 md:px-6 lg:px-8">
      {/* Cards Container */}
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={pkg._id}
                className="h-full"
                onMouseEnter={() => setHoveredCard(pkg._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative h-full bg-white rounded-2xl border-2 border-red-200 overflow-hidden shadow-lg transition-all duration-500 transform"
                  style={{
                    transform:
                      hoveredCard === pkg._id
                        ? "translateY(-8px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    boxShadow:
                      hoveredCard === pkg._id
                        ? "0 20px 40px rgba(220, 38, 38, 0.2)"
                        : "0 8px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-40 lg:h-48 overflow-hidden bg-gray-200">
                    <img
                      src={pkg.photos[0]}
                      alt={pkg.packageName}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      style={{
                        transform:
                          hoveredCard === pkg._id
                            ? "scale(1.15) rotate(2deg)"
                            : "scale(1) rotate(0deg)",
                      }}
                    />

                    {/* Duration Badge */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg animate-pulse">
                      {pkg.duration}
                    </div>

                    {/* Location Badge */}
                    <div className="absolute top-3 right-3 bg-white text-red-600 px-3 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1 shadow-lg">
                      <MapPin size={14} />
                      {pkg.city}
                    </div>

                    {/* Overlay on Hover */}
                    <div
                      className="absolute inset-0 bg-black transition-opacity duration-500"
                      style={{
                        opacity: hoveredCard === pkg._id ? 0.15 : 0,
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4 md:p-4 lg:p-6">
                    {/* Package Name */}
                    <h3 className="text-lg md:text-base lg:text-lg font-bold text-gray-800 mb-2 line-clamp-2 transition-colors duration-300">
                      {pkg.packageName}
                    </h3>

                    {/* City Info */}
                    <p className="text-gray-500 text-xs md:text-sm mb-4">
                      {pkg.destination}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px bg-linear-to-r from-transparent via-red-200 to-transparent mb-4" />

                    {/* Price Section */}
                    <div className="mb-4 ">
                      <p className="text-gray-600 text-xs md:text-sm mb-1">
                        Starting From:
                      </p>
                      <p className="text-red-600 text-2xl md:text-xl lg:text-2xl font-bold">
                        BDT {parseInt(pkg.price).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-xs md:text-xs">
                        Per Person
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-linear-to-r from-transparent via-red-200 to-transparent mb-4" />
                    {from === "b2b" && (
                      <div>
                        {pkg.B2BPrice && (
                          <div className="mb-4 ">
                            <p className="text-gray-600 text-xs md:text-sm mb-1">
                              Package B2B Price:
                            </p>
                            <p className="text-red-600 text-2xl md:text-xl lg:text-2xl font-bold">
                              BDT {parseInt(pkg.B2BPrice).toLocaleString()}
                            </p>
                            <p className="text-gray-500 text-xs md:text-xs">
                              Per Person
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* View Details Button */}
                    <Link
                      href={`/tourist-home-page/package/${pkg._id}?from=${from}`}
                    >
                      <Button
                        className="w-full group relative flex-1 inline-flex h-12 items-center justify-center overflow-hidden 
          bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-105 hover:cursor-pointer rounded-2xl"
                      >
                        <span className="flex gap-2">
                          View Details <ArrowRight />
                        </span>
                        <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                          <div className="relative h-full w-8 bg-white/20"></div>
                        </div>
                      </Button>
                    </Link>

                    {/* Quick Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar size={14} />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users size={14} />
                        <span>All Inclusive</span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Border Glow on Hover */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
                    style={{
                      boxShadow:
                        hoveredCard === pkg._id
                          ? "inset 0 0 0 2px #dc2626, inset 0 0 20px rgba(220, 38, 38, 0.1)"
                          : "inset 0 0 0 0px transparent",
                      opacity: hoveredCard === pkg._id ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

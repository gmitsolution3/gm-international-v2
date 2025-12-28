"use client";

import { useState, useEffect } from "react";
import { Star, Play, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Company } from "./companyCard";

interface CompanyProps {
  company: Company;
}

export default function CompanyDetails({ company }: CompanyProps) {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [doctorPosition, setDoctorPosition] = useState(0);

  // Marquee animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDoctorPosition((prev) => (prev - 1) % 100);
    }, 1);
    return () => clearInterval(interval);
  }, []);


  const images = company.images.slice(0, 4);
  const count = images.length;

  return (
    <div className="min-h-screen">
      {/* Section 1: Hospital Info & Images */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hospital Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-6">
            {company.companyName}
          </h1>

          <div className="my-10">
            {count === 2 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden shadow-md group"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  </div>
                ))}
              </div>
            )}

            {/* 3 Images → (2 column row) + (1 tall vertical image) */}
            {count === 3 && (
              <div className="grid grid-cols-2 gap-4">
                {/* First Two */}
                {images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden shadow-md group"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  </div>
                ))}

                {/* Last One - Vertical */}
                <div className="relative row-span-2 h-full rounded-xl overflow-hidden shadow-md group">
                  <img
                    src={images[2]}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                </div>
              </div>
            )}

            {/* 4 Images → Perfect 2×2 Grid */}
            {count === 4 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden shadow-md group"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left: Hospital Info */}
            <div className="lg:col-span-2">

              {/* Location & Address */}
              <div className="mb-6">
                <div className="flex items-center gap-10">
                  <p className="text-sm md:text-base font-semibold text-slate-700 mb-2">
                    {company.city}, {company.country}
                  </p>
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-red-600 text-red-600" />
                    <span className="font-bold text-slate-800">
                      {company.rating}
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600">
                  Address: {company.address}
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p
                  className={`text-sm md:text-base text-slate-700 leading-relaxed transition-all duration-300 ${
                    expandedDescription ? "line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {company.description}
                </p>
                <button
                  onClick={() => setExpandedDescription(!expandedDescription)}
                  className="text-red-600 font-semibold text-sm mt-2 inline-flex items-center gap-1 hover:text-red-700 transition-colors"
                >
                  Read more{" "}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedDescription ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              {/* Book Now Button */}
              <div className="flex justify-between">
                <Link href="/business-home-page/business-submit-form">
                  <button className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                    Book now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Popular Doctors (Marquee) */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-8">
            Popular Doctors
          </h2>

          {/* Marquee Container */}
          <div className="relative overflow-hidden bg-gray-100 rounded-2xl p-4 md:p-6">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .marquee-content {
                animation: marquee 30s linear infinite;
              }
              .marquee-content:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="marquee-content flex gap-4 md:gap-6">
              {/* Original employ */}
              {company.employ.map((emp, idx) => (
                <div
                  key={`doc-1-${idx}`}
                  className="shrink-0 w-64 md:w-72 bg-white rounded-xl p-4 md:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {/* Doctor Image */}
                  <div className="w-full h-48 md:h-56 rounded-lg overflow-hidden mb-4 bg-gray-200">
                    <Image
                      placeholder="blur"
                      src={emp.image}
                      alt={emp.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      width={520}
                      height={320}
                      blurDataURL={emp.image}
                    />
                  </div>

                  {/* Doctor Info */}
                  <h3 className="font-bold text-slate-900 mb-1">{emp.name}</h3>
                  <p className="text-xs md:text-sm text-slate-600 mb-3">
                    {emp.expertise}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-red-500 text-red-500" />
                    <span className="font-semibold text-slate-800">
                      {emp.rating}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    Specialist doctor with years of experience in{" "}
                    {emp.expertise.toLowerCase()} treatment.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

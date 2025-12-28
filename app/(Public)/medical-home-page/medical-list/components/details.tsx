"use client";

import { useState, useEffect } from "react";
import { Star, Play, ChevronDown } from "lucide-react";
import { HospitalDetails } from "./type";
import Image from "next/image";
import Link from "next/link";

export default function HospitalDetailPage({ hospital }: HospitalDetails) {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [doctorPosition, setDoctorPosition] = useState(0);

  // Marquee animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDoctorPosition((prev) => (prev - 1) % 100);
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section 1: Hospital Info & Images */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hospital Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-6">
            {hospital.hospitalName}
          </h1>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left: Hospital Info */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="mb-6">
                <img
                  src={hospital.images[0]}
                  alt={hospital.hospitalName}
                  className="w-full h-64 md:h-80 rounded-2xl object-cover shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                />
              </div>

              {/* Location & Address */}
              <div className="mb-6">
                <div className="flex items-center gap-10">
                  <p className="text-sm md:text-base font-semibold text-slate-700 mb-2">
                    {hospital.city}, {hospital.country}
                  </p>
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-red-600 text-red-600" />
                    <span className="font-bold text-slate-800">
                      {hospital.rating}
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600">
                  Address: {hospital.address}
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p
                  className={`text-sm md:text-base text-slate-700 leading-relaxed transition-all duration-300 ${
                    expandedDescription ? "line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {hospital.description}
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
                <Link href="/medical-home-page/user-submit-form">
                  <button className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                    Book now
                  </button>
                </Link>
              </div>
            </div>

            {/* { Right: Image Gallery } */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {hospital.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                ))}
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
              {/* Original doctors */}
              {hospital.doctors.map((doctor, idx) => (
                <div
                  key={`doc-1-${idx}`}
                  className="shrink-0 w-64 md:w-72 bg-white rounded-xl p-4 md:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {/* Doctor Image */}
                  <div className="w-full h-48 md:h-56 rounded-lg overflow-hidden mb-4 bg-gray-200">
                    <Image
                      placeholder="blur"
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      width={520}
                      height={320}
                      blurDataURL={doctor.image}
                    />
                  </div>

                  {/* Doctor Info */}
                  <h3 className="font-bold text-slate-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mb-3">
                    {doctor.expertise}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-red-500 text-red-500" />
                    <span className="font-semibold text-slate-800">
                      {doctor.rating}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    Specialist doctor with years of experience in{" "}
                    {doctor.expertise.toLowerCase()} treatment.
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

"use client"

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Clock1, MapPin, Plane, XCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'


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
}

interface PackageDetailsProps {
  packageData: TouristPackage;
  source: string | undefined;
}

const PackageDetails = ({ packageData, source }: PackageDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

 

  const nights = parseInt(packageData.duration) - 1;

  const openModal = (imgUrl: string) => setSelectedImage(imgUrl);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white">
      {/* Image Gallery */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6"> */}
      {/* If at least 1 image exists → show large main image */}
      {/* {packageData.photos.length > 0 && (
          <div
            className={`col-span-2 ${
              packageData.photos.length > 2 ? "md:col-span-1 md:row-span-3" : ""
            }`}
          >
            <img
              src={packageData.photos[0]}
              alt="Main image"
              className="w-full h-full object-cover rounded-lg hover:cursor-pointer"
            />
          </div>
        )} */}

      {/* Show remaining images depending on count */}
      {/* {packageData.photos.slice(1).map((photo, index) => (
          <div key={index} className="aspect-video md:aspect-auto">
            <img
              src={photo}
              alt={`View ${index + 2}`}
              className="w-full h-full object-cover rounded-lg hover:cursor-pointer"
            />
          </div>
        ))} */}
      {/* </div> */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {packageData.photos.length > 0 && (
          <div
            className={`col-span-2 ${
              packageData.photos.length > 2 ? "md:col-span-1 md:row-span-3" : ""
            }`}
          >
            <img
              src={packageData.photos[0]}
              alt="Main image"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(packageData.photos[0])}
            />
          </div>
        )}

        {packageData.photos.slice(1).map((photo, index) => (
          <div key={index} className="aspect-video md:aspect-auto">
            <img
              src={photo}
              alt={`View ${index + 2}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(photo)}
            />
          </div>
        ))}
      </div>

      {/* modal show  */}

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-md transition-opacity duration-300 ease-in-out"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl max-h-[80vh] transform scale-90 opacity-0 transition-all duration-300 ease-in-out"
            style={{
              transform: "scale(1)",
              opacity: 1,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain rounded-lg shadow-xl"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Package Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        {packageData.country} Tour Package
      </h1>

      {/* Price Section */}
      <div className="max-w-4xl flex items-baseline gap-3 mb-4">
        <span className="text-3xl md:text-4xl font-bold text-red-600">
          BDT {parseInt(packageData.price).toLocaleString()}
        </span>
        <span className="text-gray-600">/ Per Person</span>
        <span className="ml-auto px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
          <Plane className="w-4 h-4" />
          With Air Ticket
        </span>
      </div>

      {/* Duration Info */}
      <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
            <Clock />
          </div>
          <span className="font-medium">
            Duration: {packageData.duration} {nights} Nights
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
          <span className="font-medium">
            Duration: {packageData.duration} {nights} Nights
          </span>
        </div>
      </div>

      {/* Tour Planning Section */}
      <div className="max-w-4xl border-l-4 border-red-600 pl-6 mb-8 bg-gray-200 rounded-2xl py-6 px-4">
        <h2 className="text-xl font-bold mb-4">Tour Planning</h2>

        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Starts From</p>
              <button className="px-4 py-2 border-2 border-red-600 text-red-600 rounded flex items-center gap-2 font-medium hover:bg-red-50">
                <MapPin className="w-4 h-4" />
                Dhaka
              </button>
            </div>

            <div className="text-2xl text-gray-400">→</div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Destination 1</p>
              <button className="px-4 py-2 border-2 border-red-600 text-red-600 rounded flex items-center gap-2 font-medium hover:bg-red-50">
                <MapPin className="w-4 h-4" />
                {packageData.country.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white py-3 px-6 border-l-4 rounded-2xl border-red-600">
          <p className="text-sm font-semibold mb-2">Sub Destinations:</p>
          <div className="flex flex-wrap justify-around gap-2">
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {packageData.city.toUpperCase()}
            </button>
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              PLACE
            </button>
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              PLACE
            </button>
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
              <Plane className="w-3 h-3" />
              AIRPORT
            </button>
          </div>
        </div>
      </div>

      {/* Includes and Excludes */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Includes */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Includes</h2>
          <ul className="space-y-3">
            {packageData.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excludes */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Excludes</h2>
          <ul className="space-y-3">
            {packageData.excludes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* View More Button */}
      <div className="flex justify-center">
        <Link href={`/tourist-home-page/package/booking-form?source=${source}`}>
          <Button
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden 
          bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer rounded-full"
          >
            <span className="flex gap-2">
              Book Now <ArrowRight />
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20"></div>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PackageDetails;

// app/components/UmrahPackageDetailsCom.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Type definitions based on your data schema
interface IncludeExcludeItem {
  value: string;
}

export interface UmrahPackage {
  _id: string;
  createdAt: string;
  title: string;
  slug: string;
  thumbnail: string;
  gallery_image: string[];
  price: number;
  discount_price: number;
  departure_date: string;
  return_date: string;
  seats: number;
  includes: IncludeExcludeItem[];
  excludes: IncludeExcludeItem[];
  package_status: string;
  description: string;
}

export interface UmrahPackageDetailsComProps {
  pkg: UmrahPackage;
}

const UmrahPackageDetailsCom = ({ pkg }: UmrahPackageDetailsComProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(pkg.thumbnail);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: 1,
    specialRequests: "",
  });

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Calculate discount percentage
  const getDiscountPercentage = (price: number, discountPrice: number) => {
    if (!discountPrice || discountPrice >= price) return 0;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  // Calculate duration in days
  const getDuration = (departure: string, returnDate: string) => {
    const start = new Date(departure);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const discountPercentage = getDiscountPercentage(
    pkg.price,
    pkg.discount_price,
  );
  const duration = getDuration(pkg.departure_date, pkg.return_date);
  const departureDate = formatDate(pkg.departure_date);
  const returnDate = formatDate(pkg.return_date);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="bg-linear-to-br from-gray-50 to-emerald-50/30 min-h-screen py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/umrah-hajj"
              className="hover:text-emerald-600 transition-colors"
            >
              Umrah & Hajj
            </Link>
            <span>/</span>
            <span className="text-emerald-600 font-semibold">{pkg.title}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Images & Gallery */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-emerald-100 to-green-100 mb-4 shadow-xl">
                <div className="relative w-full h-64 sm:h-96 md:h-125">
                  <Image
                    src={selectedImage}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {pkg.package_status === "active" ? "Available" : "Limited"}
                  </span>
                </div>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-linear-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    🔥 {discountPercentage}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {pkg.gallery_image && pkg.gallery_image.length > 0 && (
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <button
                    onClick={() => setSelectedImage(pkg.thumbnail)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === pkg.thumbnail
                        ? "border-emerald-500 shadow-lg scale-95"
                        : "border-transparent hover:scale-95"
                    }`}
                  >
                    <Image
                      src={pkg.thumbnail}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </button>
                  {pkg.gallery_image.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? "border-emerald-500 shadow-lg scale-95"
                          : "border-transparent hover:scale-95"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Package Details */}
              <div className="mt-8 md:mt-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {pkg.title}
                </h1>

                {/* Duration & Dates */}
                <div className="bg-white rounded-xl p-4 md:p-6 mb-6 shadow-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">
                          {duration} Days Package
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-semibold text-gray-900">
                          {departureDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l2-2m-2 2h14M5 12l2 2m-2-2l2 2"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Return</p>
                        <p className="font-semibold text-gray-900">
                          {returnDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Available Seats</p>
                        <p className="font-semibold text-gray-900">
                          {pkg.seats} seats left
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl p-4 md:p-6 mb-6 shadow-md">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Package Details
                  </h2>
                  <div
                    className="prose prose-emerald max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ __html: pkg.description }}
                  />
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inclusions */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      What's Included
                    </h2>
                    <ul className="space-y-3">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      What's Excluded
                    </h2>
                    <ul className="space-y-3">
                      {pkg.excludes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="text-gray-700">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Price Section */}
                <div className="bg-linear-to-r from-emerald-600 to-green-600 p-6 text-white">
                  <p className="text-sm opacity-90 mb-2">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    {pkg.discount_price < pkg.price && (
                      <span className="text-2xl line-through opacity-70">
                        ৳{pkg.price.toLocaleString()}
                      </span>
                    )}
                    <span className="text-4xl md:text-5xl font-bold">
                      ৳{pkg.discount_price.toLocaleString()}
                    </span>
                    <span className="text-sm opacity-90">/person</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div className="mt-2">
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-sm">
                        Save {discountPercentage}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="p-6 border-b border-gray-100">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Seats</span>
                      <span
                        className={`font-semibold ${pkg.seats < 10 ? "text-red-600" : "text-emerald-600"}`}
                      >
                        {pkg.seats} seats left
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-900">
                        {duration} Days
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Departure</span>
                      <span className="font-semibold text-gray-900">
                        {departureDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="p-6">
                  <Link href={`/umrah&hajj/applicationBooking?pkgId=${pkg._id}`}>
                    <button className="w-full bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 bg-white rounded-xl p-4 shadow-md">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <svg
                      className="w-6 h-6 text-emerald-600 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <p className="text-xs text-gray-600">Secure Booking</p>
                  </div>
                  <div>
                    <svg
                      className="w-6 h-6 text-emerald-600 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M6 14h12M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                      />
                    </svg>
                    <p className="text-xs text-gray-600">Best Price</p>
                  </div>
                  <div>
                    <svg
                      className="w-6 h-6 text-emerald-600 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs text-gray-600">24/7 Support</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahPackageDetailsCom;

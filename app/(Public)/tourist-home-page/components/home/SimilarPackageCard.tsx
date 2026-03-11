"use client";

import React from "react";
import { MapPin, Clock, Star, Heart } from "lucide-react";
import Link from "next/link";
import { TourPackageFormData } from "@/app/dashboard/tourist/admin/manage-package/components/TourPackageForm";

interface SimilarPackageCardProps {
  packageData: TourPackageFormData;
  source?: { b2bId?: string; form?: string };
}

const SimilarPackageCard = ({
  packageData,
  source,
}: SimilarPackageCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // console.log({source: source})

  return (
    <Link
      href={`/tourist-home-page/package/${packageData._id}?${source && `b2bId=${source.b2bId}&form=${source.form}`}`}
      className="block group"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200">
        <div className="relative h-32 overflow-hidden">
          {/* Image */}
          <img
            src={packageData.thumbnail || "/placeholder-image.jpg"}
            alt={packageData.p_title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Duration Badge */}
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {packageData.duration}
          </div>

          {/* Price Badge */}
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
            {formatPrice(packageData.p_price)}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-3">
          {/* Title */}
          <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-red-600 transition-colors">
            {packageData.p_title}
          </h4>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{packageData.start_form}</span>
          </div>

          {/* Rating and Bookings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">(4.9)</span>
            </div>
            <span className="text-xs text-gray-500">
              {Math.floor(Math.random() * 50) + 20}+ bookings
            </span>
          </div>

          {/* B2B Price (if applicable) */}
          {source?.form === "b2b" &&
            packageData.isB2B &&
            packageData.b2b_price > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-emerald-600 font-semibold">
                  B2B Special
                </p>
                <p className="text-sm font-bold text-emerald-600">
                  {formatPrice(packageData.b2b_price)}
                </p>
              </div>
            )}
        </div>
      </div>
    </Link>
  );
};

export default SimilarPackageCard;

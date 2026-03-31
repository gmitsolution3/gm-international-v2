"use client";

import React, { useState } from "react";
import {
  Calendar,
  Globe,
  Clock,
  ArrowRight,
  BadgeDollarSign,
} from "lucide-react";
import { TbCoinTakaFilled } from "react-icons/tb";
import Link from "next/link";

export interface ScholarshipCardProps {
  programs: any;
  _id: string;
  city: string;
  country: string;
  deadline: string;
  language: string;
  duration: string;
  startingDate: string;
  thumbnail: string;
  applicationFee: string;
  description: string;
  universityDescription: string;
  serviceFee: string;
  universityName: string;
  universityURL: string;
  status: string;
  universityVideoLink?: string;
  b2b?: boolean;
  b2bPrice?: "";
  isCSCARequired?: boolean;
}

interface OfferCardProps {
  offer: ScholarshipCardProps;
  form?: string;
  b2bId?: string;
  from?: string;
}

const OfferCard = ({ offer, form, b2bId, from }: OfferCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  return (
    <div
      className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Image */}
      <div className="relative h-50 overflow-hidden bg-gray-200">
        <img
          src={offer.thumbnail}
          alt={offer.city}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* CSCA Badge */}
        {offer.country.toLowerCase() === "china" && (
          <span
            className={`absolute bottom-3 right-2 text-white text-xs font-semibold px-3 py-1 rounded shadow
      ${offer.isCSCARequired ? "bg-red-700" : "bg-red-700"}
    `}
          >
            {offer.isCSCARequired ? "CSCA Required" : "CSCA Not Required"}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {offer.universityName}
        </h3>
        <p className="text-xs font-medium mb-4" style={{ color: "#CA2328" }}>
          {offer.city}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-4 grid grid-cols-2">
          <DetailRow
            icon={<Globe className="w-4 h-4" />}
            label="Country"
            value={offer.country}
          />
          <DetailRow
            icon={<Clock className="w-4 h-4" />}
            label="Duration"
            value={offer.duration}
          />
          <DetailRow
            icon={<Calendar className="w-4 h-4" />}
            label="Starts"
            value={formatDate(offer.startingDate)}
          />
          <DetailRow
            icon={<Calendar className="w-4 h-4" />}
            label="Deadline"
            value={formatDate(offer.deadline)}
          />
          {form === "b2b" && b2bId && (
            <DetailRow
              icon={<BadgeDollarSign size={22} />}
              label="B2B Price"
              value={offer.b2bPrice as string}
            />
          )}
        </div>
        {b2bId ? (
          <Link
            href={`/student-home-page/student-package-offer/${offer._id}?b2bId=${b2bId}&form=${form}`}
          >
            <button
              // onClick={onApply}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:shadow-md transform hover:scale-105"
              style={{ backgroundColor: "#CA2328" }}
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        ) : (
          <Link href={`/student-home-page/student-package-offer/${offer._id}`}>
            <button
              // onClick={onApply}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:shadow-md transform hover:scale-105"
              style={{ backgroundColor: "#CA2328" }}
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        )}

        {/* Button */}
        {/* <Link href={`/student-home-page/student-package-offer/${offer._id}`}>
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:shadow-md transform hover:scale-105"
            style={{ backgroundColor: "#CA2328" }}
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link> */}
      </div>
    </div>
  );
};

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div style={{ color: "#CA2328" }}>{icon}</div>
    <div className="flex-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default OfferCard;

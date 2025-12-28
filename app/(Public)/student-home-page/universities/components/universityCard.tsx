"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface UniversityCardProps {
  university: {
    _id: string;
    country: string;
    university: string;
    studyLevel: string;
    universityUrl: string;
    introduction: string;
    photo: string;
  };
}

export function UniversityCard({ university }: UniversityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-out hover:border-red-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
        {/* Image Section - Left */}
        <div className="sm:col-span-4 h-48 sm:h-auto relative overflow-hidden bg-slate-100">
          <Image
            src={university.photo || "/placeholder.svg"}
            alt={university.university}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-red-400 to-green-400 transform origin-left transition-transform duration-500" />
        </div>

        {/* Content Section - Right */}
        <div className="sm:col-span-8 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div >
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {university.university}
                </h3>

                {/* Meta info */}
                <p className="text-xs sm:text-sm text-slate-500 mb-4 font-medium uppercase tracking-wide">
                  {university.country} •
                  <span className="text-red-400">{university.studyLevel}</span>
                </p>
              </div>
              <div>
                <Link href={`/student-home-page/universities/${university._id}`}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white text-sm h-9 px-4 rounded-lg transition-all duration-300 hover:shadow-md flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  View Details
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 line-clamp-3 leading-relaxed">
              {university.introduction}
            </p>
          </div>

          {/* Footer with button */}
          <div className="mt-4 flex items-center justify-between">
            <a
              href={university.universityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-700 transition-colors truncate"
            >
              {university.universityUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

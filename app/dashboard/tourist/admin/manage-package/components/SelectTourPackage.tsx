"use client";

import React, { useEffect, useState } from "react";
import { TourPackageFormData } from "./TourPackageForm";
import TourPackagesAdmin from "./packageManagement";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";
import { AddTouristPackage } from "./addTouristpackage";
import { MapIcon, SparklesIcon } from "lucide-react";
import { BiGlobeAlt } from "react-icons/bi";
import { PackageSkeletonLoader } from "./TouristPackageSkeletonLoader";


const SelectTourPackage = ({
  initialPackages,
}: {
  initialPackages: TourPackageFormData[];
}) => {
  const [allPackages, setAllPackages] = useState(initialPackages);
  const [isInternational, setIsInternational] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (isInternational) {
//       fetchesInternationalPackage();
//       console.log({package: "if"})
//     } else {
//       setAllPackages(initialPackages);
//       console.log({package: "else"})
//     }
//   }, [isInternational, initialPackages]);

//   const fetchesInternationalPackage = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/all/tourist-package/int-client`,
//         {
//           cache: "no-store",
//         },
//       );
//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error("Something was wrong!!");
//       }
//       setAllPackages(result);
//     } catch (error) {
//       console.error("Failed to fetch international packages:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const fetchesInternationalPackage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/all/tourist-package/int-client`,
        { cache: "no-store" },
      );
      const result = await res.json();
      if (!res.ok) throw new Error("Something was wrong!!");
      setAllPackages(result);
    } catch (error) {
      console.error("Failed to fetch international packages:", error);
    } finally {
      setIsLoading(false);
    }
  };


   const handleTabChange = (international: boolean) => {
     setIsInternational(international);
     if (international) {
       fetchesInternationalPackage();
     } else {
       setAllPackages(initialPackages); 
     }
   };
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header Section with Red Accent */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-7 w-7 text-red-500" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Tour Packages
              </h1>
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              Manage, review, and organize all your tour packages in one place
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                {allPackages.length} Active Packages
              </span>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <AddTouristPackage />
          </div>
        </div>
      </div>

      {/* Modern Tab System with Red Theme */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex gap-1 sm:gap-2" aria-label="Tabs">
            <button
              onClick={() => handleTabChange(false)}
              className={`
                group relative flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-t-lg
                transition-all duration-200 ease-out
                ${
                  !isInternational
                    ? "text-red-600 bg-white border-b-2 border-red-500 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <MapIcon
                className={`h-5 w-5 ${!isInternational ? "text-red-500" : "text-gray-400 group-hover:text-gray-500"}`}
              />
              Local Packages
              {!isInternational && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => handleTabChange(true)}
              className={`
                group relative flex items-center gap-2 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-t-lg
                transition-all duration-200 ease-out
                ${
                  isInternational
                    ? "text-red-600 bg-white border-b-2 border-red-500 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <BiGlobeAlt
                className={`h-5 w-5 ${isInternational ? "text-red-500" : "text-gray-400 group-hover:text-gray-500"}`}
              />
              International Packages
              {isInternational && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>
          </nav>
        </div>

        {/* Tab Indicator Line Animation */}
        <div className="mt-4">
          {isLoading ? (
            <PackageSkeletonLoader/>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {allPackages.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  <TourPackagesAdmin
                    key={isInternational ? "international" : "local"}
                    initialPackages={allPackages}
                  />
                </div>
              ) : (
                <div className="py-16">
                  <DashboardErrorHandler />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectTourPackage;
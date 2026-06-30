// "use client";

// import React, { useState } from "react";
// import { getPlaceholderByService } from "./QueryTabMain";
// import { searchServiceData } from "./service";
// import QueryScholarship from "./Services/Scholarship";
// import { ScholarshipCardProps } from "@/app/(Public)/student-home-page/components/OfferCard";
// import { MedicalPackage } from "@/app/(Public)/medical-home-page/medical-list/components/type";
// import QueryMedicalSearchMain from "./Services/QueryMedicalPkg";
// import { TourPackageFormData } from "@/app/dashboard/tourist/admin/manage-package/components/TourPackageForm";
// import QueryTouristPkg from "./Services/QueryTouristPkg";
// import { TourPackage } from "@/app/dashboard/business/admin/components/makePackage";
// import QueryBusinessPkg from "./Services/QueryBusinessPkg";
// import { UmrahPackage } from "@/app/(Public)/umrah&hajj/components/UmrahPackageDetailsCom";
// import QueryUmrahPkg from "./Services/QueryUmrahPkg";

// const SearchingMain = ({
//   selectedService,
//   onSelect,
// }: {
//   selectedService: string;
//   onSelect: (service: string | null) => void;
// }) => {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [scholarshipPkg, setScholarshipPkg] = useState<ScholarshipCardProps[]>(
//     [],
//   );
//   const [medicalPkg, setMedicalPkg] = useState<MedicalPackage[]>([]);
//   const [touristPkg, setTouristPkg] = useState<TourPackageFormData[]>([]);
//   const [businessPkg, setBusinessPkg] = useState<TourPackage[]>([]);
//   const [umrahPkg, setUmrahPkg] = useState<UmrahPackage[]>([]);

//   const handleSearch = async () => {
//     if (!query.trim()) return;
//     try {
//       setLoading(true);
//       const result = await searchServiceData(selectedService, query.trim());
//       console.log("Scholarship Pkg:", result);
//       if (selectedService === "Scholarship") {
//         console.log("Scholarship Pkg:", result);
//         setScholarshipPkg(result);
//       }

//       if (selectedService === "Medical") {
//         setMedicalPkg(result);
//       }

//       if (selectedService === "Tourist") {
//         setTouristPkg(result);
//       }

//       if (selectedService === "Business") {
//         setBusinessPkg(result);
//       }

//       if (selectedService === "Umrah Hajj") {
//         setUmrahPkg(result);
//       }
//     } catch (error) {
//       console.error("Search failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-full flex flex-col min-h-0">
//       {/* Top bar - fixed */}
//       <div className="flex items-center justify-between shrink-0">
//         <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full">
//           {selectedService}
//         </span>

//         <button
//           onClick={() => onSelect(null)}
//           className="text-xs text-gray-500 hover:text-red-600 transition-colors"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* Scrollable results area */}
//       <div className="flex-1 min-h-0 overflow-y-auto my-2">
//         {scholarshipPkg.length > 0 && selectedService === "Scholarship" && (
//           <QueryScholarship scholarship={scholarshipPkg} />
//         )}
//       </div>

//       <div className="flex-1 min-h-0 overflow-y-auto my-2">
//         {medicalPkg.length > 0 && selectedService === "Medical" && (
//           <QueryMedicalSearchMain medicalPkg={medicalPkg} />
//         )}
//       </div>

//       <div className="flex-1 min-h-0 overflow-y-auto my-2">
//         {touristPkg.length > 0 && selectedService === "Tourist" && (
//           <QueryTouristPkg touristPkg={touristPkg} />
//         )}
//       </div>

//       <div className="flex-1 min-h-0 overflow-y-auto my-2">
//         {businessPkg.length > 0 && selectedService === "Business" && (
//           <QueryBusinessPkg businessPkg={businessPkg} />
//         )}
//       </div>

//       <div className="flex-1 min-h-0 overflow-y-auto my-2">
//         {umrahPkg.length > 0 && selectedService === "Umrah Hajj" && (
//           <QueryUmrahPkg umrahPkg={umrahPkg} />
//         )}
//       </div>

//       {/* Bottom search bar - sticky/fixed at bottom */}
//       <div className="space-y-1 shrink-0">
//         <label className="text-xs font-medium text-gray-600">
//           Search {selectedService.toLowerCase()} information:
//         </label>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder={getPlaceholderByService(selectedService)}
//           className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-black"
//           autoFocus
//         />
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="w-full bg-linear-to-r from-gray-900 via-red-950 to-red-900 hover:from-gray-800 hover:via-red-900 hover:to-red-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 mt-2 disabled:opacity-50"
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchingMain;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPlaceholderByService } from "./QueryTabMain";
import { searchServiceData } from "./service";
import QueryScholarship from "./Services/Scholarship";
import { ScholarshipCardProps } from "@/app/(Public)/student-home-page/components/OfferCard";
import QueryMedicalSearchMain from "./Services/QueryMedicalPkg";
import { TourPackageFormData } from "@/app/dashboard/tourist/admin/manage-package/components/TourPackageForm";
import QueryTouristPkg from "./Services/QueryTouristPkg";
import { TourPackage } from "@/app/dashboard/business/admin/components/makePackage";
import QueryBusinessPkg from "./Services/QueryBusinessPkg";
import { UmrahPackage } from "@/app/(Public)/umrah&hajj/components/UmrahPackageDetailsCom";
import QueryUmrahPkg from "./Services/QueryUmrahPkg";
import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";

type ServiceDataMap = {
  Scholarship: ScholarshipCardProps[];
  Medical: MedicalFormData[];
  Tourist: TourPackageFormData[];
  Business: TourPackage[];
  "Umrah Hajj": UmrahPackage[];
};

const SearchingMain = ({
  selectedService,
  onSelect,
}: {
  selectedService: string;
  onSelect: (service: string | null) => void;
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState<Record<string, any[]>>({});
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);

      const result = await searchServiceData(selectedService, query.trim());

      setServiceData((prev) => ({
        ...prev,
        [selectedService]: result,
      }));
    } catch (error) {
      console.error("Search failed:", error);
      setServiceData((prev) => ({
        ...prev,
        [selectedService]: [],
      }));
    } finally {
      setLoading(false);
    }
  };

  const currentData = serviceData[selectedService] || [];

  const renderServiceContent = () => {
    if (!hasSearched) return null;

    if (loading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mb-4"
          />
          <p className="text-sm text-gray-500">
            Searching {selectedService.toLowerCase()} packages...
          </p>
        </motion.div>
      );
    }

    if (currentData.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-sm font-medium text-gray-500 mb-2">
            No results found
          </p>
          <p className="text-xs text-gray-400">
            Try adjusting your search terms for {selectedService.toLowerCase()}{" "}
            packages
          </p>
        </motion.div>
      );
    }

    const serviceComponents = {
      Scholarship: QueryScholarship,
      Medical: QueryMedicalSearchMain,
      Tourist: QueryTouristPkg,
      Business: QueryBusinessPkg,
      "Umrah Hajj": QueryUmrahPkg,
    };

    const Component =
      serviceComponents[selectedService as keyof typeof serviceComponents];

    if (!Component) return null;

    const propsMap = {
      Scholarship: { scholarship: currentData },
      Medical: { medicalPkg: currentData },
      Tourist: { touristPkg: currentData },
      Business: { businessPkg: currentData },
      "Umrah Hajj": { umrahPkg: currentData },
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Component
          {...(propsMap[selectedService as keyof typeof propsMap] as any)}
        />
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col min-h-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 mb-4">
        <motion.span
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-xs font-medium text-red-700 bg-red-50 px-3 py-1.5 rounded-full"
        >
          {selectedService}
        </motion.span>

        <button
          onClick={() => onSelect(null)}
          className="text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">{renderServiceContent()}</AnimatePresence>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-3 shrink-0 pt-4 border-t border-gray-100"
      >
        <label className="text-xs font-medium text-gray-600">
          Search {selectedService.toLowerCase()} information:
        </label>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={getPlaceholderByService(selectedService)}
            className="w-full px-3 py-2.5 pl-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-black"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <motion.button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-linear-to-r from-gray-900 via-red-950 to-red-900 hover:from-gray-800 hover:via-red-900 hover:to-red-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
              />
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SearchingMain;

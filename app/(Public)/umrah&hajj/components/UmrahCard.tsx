// // import { AllUmrahPackageProps } from '@/app/dashboard/hajj-umrah/admin/components/AllUmrahPackage';
// // import React from 'react'

// // const UmrahCard = ({ packages }: AllUmrahPackageProps) => {
// //   return <div>UmrahCard</div>;
// // };

// // export default UmrahCard

// // app/components/UmrahCard.tsx
// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { AllUmrahPackageProps, UmrahPackage } from "@/app/dashboard/hajj-umrah/admin/components/AllUmrahPackage";

// // Define the package type based on your existing props
// // interface UmrahPackage {
// //   id: string | number;
// //   title: string;
// //   duration: string;
// //   price: number;
// //   originalPrice?: number;
// //   discount?: number;
// //   startDate: string;
// //   endDate?: string;
// //   inclusions: string[];
// //   exclusions?: string[];
// //   accommodation: string;
// //   transportation: string;
// //   meals: string;
// //   groupSize?: string;
// //   rating?: number;
// //   reviews?: number;
// //   imageUrl?: string;
// //   isFeatured?: boolean;
// //   availableSeats?: number;
// // }

// const UmrahCard = ({ packages }: AllUmrahPackageProps) => {
//   const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
//   const [expandedCard, setExpandedCard] = useState<string | number | null>(
//     null,
//   );

//   // Sample data structure - replace with your actual data
//   const packageList: UmrahPackage[] = Array.isArray(packages)
//     ? packages
//     : [
//         {
//           _id: 1,
//           title: "Premium Umrah Package",
//           duration: "14 Days",
//           price: 2499,
//           originalPrice: 3299,
//           discount: 24,
//           startDate: "December 15, 2024",
//           endDate: "December 29, 2024",
//           inclusions: [
//             "5 Star Hotel in Makkah",
//             "5 Star Hotel in Madinah",
//             "VIP Transport",
//             "Ziyarat Tours",
//             "Group Guide",
//             "Travel Insurance",
//           ],
//           accommodation: "5 Star Hotels (Makkah & Madinah)",
//           transportation: "Private Luxury Bus + Local Transport",
//           meals: "Daily Breakfast & Dinner",
//           groupSize: "15-20 People",
//           rating: 4.9,
//           reviews: 128,
//           isFeatured: true,
//           availableSeats: 12,
//         },
//         {
//           id: 2,
//           title: "Economy Umrah Package",
//           duration: "10 Days",
//           price: 1599,
//           originalPrice: 1999,
//           discount: 20,
//           startDate: "January 5, 2025",
//           endDate: "January 15, 2025",
//           inclusions: [
//             "3 Star Hotel in Makkah",
//             "3 Star Hotel in Madinah",
//             "Shared Transport",
//             "Ziyarat Tours",
//             "Basic Guide",
//           ],
//           accommodation: "3 Star Hotels (Makkah & Madinah)",
//           transportation: "Shared AC Bus",
//           meals: "Daily Breakfast",
//           groupSize: "25-30 People",
//           rating: 4.5,
//           reviews: 89,
//           availableSeats: 25,
//         },
//         {
//           id: 3,
//           title: "Deluxe Umrah Package",
//           duration: "21 Days",
//           price: 3899,
//           originalPrice: 4999,
//           discount: 22,
//           startDate: "February 10, 2025",
//           endDate: "March 3, 2025",
//           inclusions: [
//             "Luxury Hotel near Haram",
//             "Executive Transport",
//             "Private Guide",
//             "Full Board Meals",
//             "Shopping Tours",
//             "Visa Assistance",
//           ],
//           accommodation: "Luxury 5 Star (Walking distance to Haram)",
//           transportation: "Private Luxury Vehicle",
//           meals: "Full Board (Breakfast, Lunch, Dinner)",
//           groupSize: "8-12 People",
//           rating: 5.0,
//           reviews: 56,
//           isFeatured: true,
//           availableSeats: 8,
//         },
//       ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   } as const;

//   return (
//     <div className="bg-linear-to-br from-gray-50 to-emerald-50/30 py-12 md:py-16 lg:py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12 md:mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
//               Blessed Packages
//             </span>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Our{" "}
//               <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
//                 Umrah Packages
//               </span>
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
//               Choose the perfect package for your spiritual journey with
//               flexible options and premium services
//             </p>
//           </motion.div>
//         </div>

//         {/* Cards Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//         >
//           {packageList.map((pkg) => (
//             <motion.div
//               key={pkg.id}
//               variants={cardVariants}
//               whileHover={{ y: -8, transition: { duration: 0.2 } }}
//               onHoverStart={() => setHoveredCard(pkg.id)}
//               onHoverEnd={() => setHoveredCard(null)}
//               className="relative group"
//             >
//               {/* Featured Badge */}
//               {pkg.isFeatured && (
//                 <div className="absolute -top-3 -right-3 z-20">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-60 animate-pulse"></div>
//                     <div className="relative bg-linear-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
//                       🔥 Featured
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Card */}
//               <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
//                 {/* Image Section */}
//                 <div className="relative h-48 md:h-56 overflow-hidden bg-linear-to-br from-emerald-100 to-green-100">
//                   {pkg.imageUrl ? (
//                     <Image
//                       src={pkg.imageUrl}
//                       alt={pkg.title}
//                       fill
//                       className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <svg
//                         className="w-20 h-20 text-emerald-300"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1}
//                           d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                     </div>
//                   )}

//                   {/* Overlay with duration */}
//                   <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-white text-sm font-semibold">
//                       📅 {pkg.duration}
//                     </span>
//                   </div>

//                   {/* Rating */}
//                   {pkg.rating && (
//                     <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
//                       <span className="text-yellow-400">★</span>
//                       <span className="text-white text-sm font-semibold">
//                         {pkg.rating}
//                       </span>
//                       <span className="text-white/70 text-xs">
//                         ({pkg.reviews})
//                       </span>
//                     </div>
//                   )}

//                   {/* Price Tag */}
//                   <div className="absolute bottom-4 right-4 bg-linear-to-r from-emerald-600 to-green-600 rounded-lg px-3 py-1.5 shadow-lg">
//                     <div className="flex items-baseline gap-1">
//                       {pkg.originalPrice && (
//                         <span className="text-white/60 text-xs line-through">
//                           ${pkg.originalPrice}
//                         </span>
//                       )}
//                       <span className="text-white font-bold text-lg">
//                         ${pkg.price}
//                       </span>
//                       <span className="text-white/80 text-xs">/person</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-5 md:p-6 flex-1 flex flex-col">
//                   {/* Title */}
//                   <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
//                     {pkg.title}
//                   </h3>

//                   {/* Date Range */}
//                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <span>{pkg.startDate}</span>
//                     {pkg.endDate && <span>→ {pkg.endDate}</span>}
//                   </div>

//                   {/* Key Inclusions Preview */}
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {pkg.inclusions.slice(0, 3).map((inclusion, idx) => (
//                       <span
//                         key={idx}
//                         className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
//                       >
//                         {inclusion}
//                       </span>
//                     ))}
//                     {pkg.inclusions.length > 3 && (
//                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                         +{pkg.inclusions.length - 3} more
//                       </span>
//                     )}
//                   </div>

//                   {/* Details Grid */}
//                   <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <svg
//                         className="w-4 h-4 text-emerald-500"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                         />
//                       </svg>
//                       <span className="text-xs md:text-sm">
//                         {pkg.accommodation.split("(")[0].trim()}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <svg
//                         className="w-4 h-4 text-emerald-500"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                       <span className="text-xs md:text-sm">
//                         {pkg.groupSize}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <svg
//                         className="w-4 h-4 text-emerald-500"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 17v4"
//                         />
//                       </svg>
//                       <span className="text-xs md:text-sm">{pkg.meals}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <svg
//                         className="w-4 h-4 text-emerald-500"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       <span className="text-xs md:text-sm">
//                         {pkg.availableSeats} seats left
//                       </span>
//                     </div>
//                   </div>

//                   {/* Expand/Collapse Button */}
//                   <button
//                     onClick={() =>
//                       setExpandedCard(expandedCard === pkg.id ? null : pkg.id)
//                     }
//                     className="text-emerald-600 text-sm font-semibold mb-4 flex items-center gap-1 hover:text-emerald-700 transition-colors"
//                   >
//                     {expandedCard === pkg.id ? "Show Less ▲" : "View Details ▼"}
//                   </button>

//                   {/* Expanded Details */}
//                   {expandedCard === pkg.id && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="mb-4 p-4 bg-gray-50 rounded-lg"
//                     >
//                       <h4 className="font-semibold text-gray-900 mb-2">
//                         Complete Inclusions:
//                       </h4>
//                       <ul className="space-y-1 mb-3">
//                         {pkg.inclusions.map((item, idx) => (
//                           <li
//                             key={idx}
//                             className="flex items-center gap-2 text-sm text-gray-600"
//                           >
//                             <svg
//                               className="w-4 h-4 text-emerald-500"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M5 13l4 4L19 7"
//                               />
//                             </svg>
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                       <h4 className="font-semibold text-gray-900 mb-2">
//                         Transportation:
//                       </h4>
//                       <p className="text-sm text-gray-600 mb-2">
//                         {pkg.transportation}
//                       </p>
//                       <div className="mt-3 pt-3 border-t border-gray-200">
//                         <p className="text-sm text-emerald-600 font-semibold">
//                           ✨ Special Offer: Book now and get free travel
//                           insurance!
//                         </p>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Book Now Button */}
//                   <Link
//                     href={`/umrah-hajj/booking/${pkg.id}`}
//                     className="mt-auto w-full bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center group/btn transform hover:scale-105 shadow-md hover:shadow-xl"
//                   >
//                     <span className="flex items-center justify-center gap-2">
//                       Book Now
//                       <svg
//                         className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17 8l4 4m0 0l-4 4m4-4H3"
//                         />
//                       </svg>
//                     </span>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* View All Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.5 }}
//           className="text-center mt-12 md:mt-16"
//         >
//           <Link
//             href="/umrah-hajj/all-packages"
//             className="inline-flex items-center gap-2 bg-white border-2 border-emerald-200 hover:border-emerald-400 text-emerald-700 font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
//           >
//             <span>View All Packages</span>
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 8l4 4m0 0l-4 4m4-4H3"
//               />
//             </svg>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default UmrahCard;




// app/components/UmrahCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Type definitions based on your data schema
interface IncludeExcludeItem {
  value: string;
}

interface UmrahPackage {
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

interface UmrahCardProps {
  packages: UmrahPackage[];
}

const UmrahCard = ({ packages }: UmrahCardProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate discount percentage
  const getDiscountPercentage = (price: number, discountPrice: number) => {
    if (!discountPrice || discountPrice >= price) return 0;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  // Strip HTML tags from description
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="bg-linear-to-br from-gray-50 to-emerald-50/30 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              Blessed Packages
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Umrah Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Choose the perfect package for your spiritual journey with flexible options and premium services
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {packages?.map((pkg) => {
            const discountPercentage = getDiscountPercentage(pkg.price, pkg.discount_price);
            const shortDescription = stripHtml(pkg.description).substring(0, 120);
            const departureDate = formatDate(pkg.departure_date);
            const returnDate = formatDate(pkg.return_date);
            
            return (
              <motion.div
                key={pkg._id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onHoverStart={() => setHoveredCard(pkg._id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute -top-3 -right-3 z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                      <div className="relative bg-linear-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🔥 {discountPercentage}% OFF
                      </div>
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-56 md:h-64 overflow-hidden bg-linear-to-br from-emerald-100 to-green-100">
                    {pkg.thumbnail ? (
                      <Image
                        src={pkg.thumbnail}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-emerald-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Overlay with status */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {pkg.package_status === "active"
                          ? "Available"
                          : "Limited"}
                      </span>
                    </div>

                    {/* Seats Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-semibold">
                        🪑 {pkg.seats} seats left
                      </span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 right-4 bg-linear-to-r from-emerald-600 to-green-600 rounded-lg px-3 py-1.5 shadow-lg">
                      <div className="flex items-baseline gap-1">
                        {pkg.discount_price < pkg.price && (
                          <span className="text-white/60 text-xs line-through">
                            ৳{pkg.price.toLocaleString()}
                          </span>
                        )}
                        <span className="text-white font-bold text-lg">
                          ৳{pkg.discount_price.toLocaleString()}
                        </span>
                        <span className="text-white/80 text-xs">/person</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Date Range */}
                    <div className="flex flex-col gap-1 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-emerald-500"
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
                        <span className="font-semibold">Departure:</span>
                        <span>{departureDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-emerald-500"
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
                        <span className="font-semibold">Return:</span>
                        <span>{returnDate}</span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {shortDescription ||
                        "Experience the spiritual journey of a lifetime with our comprehensive Umrah package."}
                    </p>

                    {/* Includes Preview */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-emerald-500"
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
                        What's Included:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.includes.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
                          >
                            {item.value}
                          </span>
                        ))}
                        {pkg.includes.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{pkg.includes.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <Link
                      href={`/umrah&hajj/umrah-packages/${pkg._id}`}
                      className="mt-auto w-full bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center group/btn transform hover:scale-105 shadow-md hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Details
                        <svg
                          className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Packages Message */}
        {(!packages || packages.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <svg className="w-20 h-20 text-emerald-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Packages Available</h3>
              <p className="text-gray-600">Please check back later for our Umrah packages.</p>
            </div>
          </motion.div>
        )}

        
      </div>
    </div>
  );
};

export default UmrahCard;

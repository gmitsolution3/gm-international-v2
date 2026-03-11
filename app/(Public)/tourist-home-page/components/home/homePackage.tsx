// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   MapPin,
//   Calendar,
//   Users,
//   ArrowRight,
// } from "lucide-react";
// import Loader from "@/components/ui/loader";
// import Link from "next/link";
// import { Button } from "@headlessui/react";
// import { TourPackageFormData } from "@/app/dashboard/tourist/admin/manage-package/components/TourPackageForm";

// interface TouristHomePackagesProps {
//   packages: TourPackageFormData[];
//   from: string;
// }

// export default function TouristHomePackages({
//   packages,
//   from,
// }: TouristHomePackagesProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const itemsPerPage = {
//     mobile: 1,
//     tablet: 2,
//     desktop: 3,
//   };

//   const [itemsToShow, setItemsToShow] = useState(3);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setItemsToShow(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsToShow(2);
//       } else {
//         setItemsToShow(3);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!packages) {
//     return <Loader />;
//   }

//   const nextSlide = () => {
//     setCurrentIndex(
//       (prev) => (prev + 1) % Math.ceil(packages.length / itemsToShow)
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prev) =>
//         (prev - 1 + Math.ceil(packages.length / itemsToShow)) %
//         Math.ceil(packages.length / itemsToShow)
//     );
//   };

//   const formatPrice = (price: string) => {
//     return new Intl.NumberFormat("en-BD", {
//       style: "currency",
//       currency: "BDT",
//       minimumFractionDigits: 0,
//     }).format(parseInt(price));
//   };

//   return (
//     <div className="min-h-[60vh] px-4 md:px-6 lg:px-8">
//       {/* Cards Container */}
//       <div className="max-w-7xl mx-auto">
//         <div className="relative">
//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
//             {packages.map((pkg, idx) => (
//               <div
//                 key={pkg._id}
//                 className="h-full"
//                 onMouseEnter={() => setHoveredCard(pkg._id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div
//                   className="relative h-full bg-white rounded-2xl border-2 border-red-200 overflow-hidden shadow-lg transition-all duration-500 transform"
//                   style={{
//                     transform:
//                       hoveredCard === pkg._id
//                         ? "translateY(-8px) scale(1.02)"
//                         : "translateY(0) scale(1)",
//                     boxShadow:
//                       hoveredCard === pkg._id
//                         ? "0 20px 40px rgba(220, 38, 38, 0.2)"
//                         : "0 8px 16px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   {/* Image Container */}
//                   <div className="relative h-48 md:h-40 lg:h-48 overflow-hidden bg-gray-200">
//                     <img
//                       src={pkg.photos[0]}
//                       alt={pkg.packageName}
//                       className="w-full h-full object-cover transition-transform duration-700 ease-out"
//                       style={{
//                         transform:
//                           hoveredCard === pkg._id
//                             ? "scale(1.15) rotate(2deg)"
//                             : "scale(1) rotate(0deg)",
//                       }}
//                     />

//                     {/* Duration Badge */}
//                     <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg animate-pulse">
//                       {pkg.duration}
//                     </div>

//                     {/* Location Badge */}
//                     <div className="absolute top-3 right-3 bg-white text-red-600 px-3 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1 shadow-lg">
//                       <MapPin size={14} />
//                       {pkg.city}
//                     </div>

//                     {/* Overlay on Hover */}
//                     <div
//                       className="absolute inset-0 bg-black transition-opacity duration-500"
//                       style={{
//                         opacity: hoveredCard === pkg._id ? 0.15 : 0,
//                       }}
//                     />
//                   </div>

//                   {/* Content Container */}
//                   <div className="p-4 md:p-4 lg:p-6">
//                     {/* Package Name */}
//                     <h3 className="text-lg md:text-base lg:text-lg font-bold text-gray-800 mb-2 line-clamp-2 transition-colors duration-300">
//                       {pkg.packageName}
//                     </h3>

//                     {/* City Info */}
//                     <p className="text-gray-500 text-xs md:text-sm mb-4">
//                       {pkg.destination}
//                     </p>

//                     {/* Divider */}
//                     <div className="w-full h-px bg-linear-to-r from-transparent via-red-200 to-transparent mb-4" />

//                     {/* Price Section */}
//                     <div className="mb-4 ">
//                       <p className="text-gray-600 text-xs md:text-sm mb-1">
//                         Starting From:
//                       </p>
//                       <p className="text-red-600 text-2xl md:text-xl lg:text-2xl font-bold">
//                         BDT {parseInt(pkg.price).toLocaleString()}
//                       </p>
//                       <p className="text-gray-500 text-xs md:text-xs">
//                         Per Person
//                       </p>
//                     </div>

//                     {/* Divider */}
//                     <div className="w-full h-px bg-linear-to-r from-transparent via-red-200 to-transparent mb-4" />
//                     {from === "b2b" && (
//                       <div>
//                         {pkg.B2BPrice && (
//                           <div className="mb-4 ">
//                             <p className="text-gray-600 text-xs md:text-sm mb-1">
//                               Package B2B Price:
//                             </p>
//                             <p className="text-red-600 text-2xl md:text-xl lg:text-2xl font-bold">
//                               BDT {parseInt(pkg.B2BPrice).toLocaleString()}
//                             </p>
//                             <p className="text-gray-500 text-xs md:text-xs">
//                               Per Person
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* View Details Button */}
//                     <Link
//                       href={`/tourist-home-page/package/${pkg._id}?from=${from}`}
//                     >
//                       <Button
//                         className="w-full group relative flex-1 inline-flex h-12 items-center justify-center overflow-hidden
//           bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-105 hover:cursor-pointer rounded-2xl"
//                       >
//                         <span className="flex gap-2">
//                           View Details <ArrowRight />
//                         </span>
//                         <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
//                           <div className="relative h-full w-8 bg-white/20"></div>
//                         </div>
//                       </Button>
//                     </Link>

//                     {/* Quick Info */}
//                     <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <Calendar size={14} />
//                         <span>{pkg.duration}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <Users size={14} />
//                         <span>All Inclusive</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Animated Border Glow on Hover */}
//                   <div
//                     className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
//                     style={{
//                       boxShadow:
//                         hoveredCard === pkg._id
//                           ? "inset 0 0 0 2px #dc2626, inset 0 0 20px rgba(220, 38, 38, 0.1)"
//                           : "inset 0 0 0 0px transparent",
//                       opacity: hoveredCard === pkg._id ? 1 : 0,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Clock,
  CheckCircle,
  Globe,
  Plane,
  Star,
  TrendingUp,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import { Button } from "@headlessui/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { TourPackageFormData } from "@/app/dashboard/tourist/admin/manage-package/components/TourPackageForm";

interface TouristHomePackagesProps {
  packages: TourPackageFormData[];
  source?: { b2bId: string; form: string };
}

export default function TouristHomePackages({
  packages,
  source,
}: TouristHomePackagesProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<{
    [key: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const swiperRefs = useRef<{ [key: string]: any }>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getImageSource = (pkg: TourPackageFormData, index: number = 0) => {
    if (index === 0 && pkg.thumbnail) {
      return pkg.thumbnail;
    }
    return pkg.gallery && pkg.gallery[index - 1]
      ? pkg.gallery[index - 1]
      : "/placeholder-image.jpg";
  };

  const getAllImages = (pkg: TourPackageFormData) => {
    const images = [];
    if (pkg.thumbnail) images.push(pkg.thumbnail);
    if (pkg.gallery && pkg.gallery.length > 0) {
      images.push(...pkg.gallery);
    }
    return images;
  };

  const handleSlideChange = (pkgId: string, swiper: any) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [pkgId]: swiper.activeIndex,
    }));
  };

  if (!packages || packages.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No packages available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] px-4 md:px-6 lg:px-8 py-8 bg-linear-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {source?.form === "b2b"
              ? "B2B Travel Packages"
              : "Exclusive Tour Packages"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
            Discover amazing destinations with our carefully curated packages
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 lg:gap-6">
          {packages.map((pkg) => {
            const images = getAllImages(pkg);
            const currentImageIndex = activeImageIndex[pkg._id!] || 0;
            const isHovered = hoveredCard === pkg._id;

            return (
              <div
                key={pkg._id}
                className="group h-full"
                onMouseEnter={() => setHoveredCard(pkg._id!)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 border border-gray-100"
                  style={{
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: isHovered
                      ? "0 25px 50px -12px rgba(220, 38, 38, 0.25)"
                      : "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Image Slider Container */}
                  <div className="relative h-56 md:h-52 lg:h-56 overflow-hidden bg-gray-100">
                    <Swiper
                      onSwiper={(swiper) => {
                        swiperRefs.current[pkg._id!] = swiper;
                      }}
                      onSlideChange={(swiper) =>
                        handleSlideChange(pkg._id!, swiper)
                      }
                      spaceBetween={0}
                      slidesPerView={1}
                      pagination={{
                        clickable: true,
                        dynamicBullets: true,
                      }}
                      autoplay={
                        isHovered
                          ? {
                              delay: 3000,
                              disableOnInteraction: false,
                            }
                          : false
                      }
                      speed={500}
                      modules={[Pagination, Autoplay]}
                      className="w-full h-full"
                      loop={images.length > 1}
                    >
                      {images.map((image, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="relative w-full h-full">
                            <img
                              src={image || "/placeholder-image.jpg"}
                              alt={`${pkg.p_title} - Image ${idx + 1}`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Image Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Image Counter Badge */}
                    {images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium z-10 flex items-center gap-1">
                        <span className="text-white/80">
                          {currentImageIndex + 1}
                        </span>
                        <span className="text-white/40">/</span>
                        <span className="text-white/80">{images.length}</span>
                      </div>
                    )}

                    {/* Duration Badge */}
                    <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg z-10 flex items-center gap-1">
                      <Clock size={14} />
                      {pkg.duration}
                    </div>

                    {/* International Badge */}
                    {pkg.isInternationalPackage && (
                      <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg z-10 flex items-center gap-1">
                        <Globe size={14} />
                        International
                      </div>
                    )}

                    {/* Air Ticket Badge */}
                    {pkg.is_with_air_ticket && (
                      <div className="absolute bottom-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10 flex items-center gap-1">
                        <Plane size={12} />
                        Flights Included
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-5 md:p-5 lg:p-6">
                    {/* Package Title and Location */}
                    <div className="mb-3">
                      <h3 className="text-lg md:text-base lg:text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {pkg.p_title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={16} className="text-red-500 shrink-0" />
                        <span className="truncate">
                          {pkg.start_form}, {pkg.country.join(", ")}
                        </span>
                      </div>
                    </div>

                    {/* Quick Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.tour_plan.slice(0, 2).map((plan, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-rose-50 text-red-600 px-3 py-1 rounded-full border border-rose-200"
                        >
                          {plan.destination}
                        </span>
                      ))}
                      {pkg.tour_plan.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          +{pkg.tour_plan.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-red-500" />
                        <span>Up to {pkg.number_of_member}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span>All Inclusive</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-linear-to-r from-transparent via-red-200 to-transparent my-4" />

                    {/* Price Section */}
                    <div className="grid grid-cols-2 items-center">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">
                          Starting from
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-red-600 text-2xl md:text-xl lg:text-2xl font-bold">
                            {formatPrice(pkg.p_price)}
                          </span>
                          <span className="text-gray-500 text-xs">/person</span>
                        </div>
                      </div>
                      {pkg.isB2B &&
                        pkg.b2b_price > 0 &&
                        source?.form === "b2b" && (
                          <div className="text-right">
                            <p className="text-xs text-emerald-600 font-semibold">
                              B2B Price
                            </p>
                            <p className="text-emerald-600 font-bold">
                              {formatPrice(pkg.b2b_price)}
                            </p>
                          </div>
                        )}
                    </div>

                    {/* View Details Button */}
                    {source?.b2bId && source.form ? (
                      <Link
                        href={`/tourist-home-page/package/${pkg._id}?b2bId=${source?.b2bId}&form=${source?.form}`}
                      >
                        <Button
                          className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden 
                          bg-linear-to-r from-red-600 to-red-500 px-6 font-medium text-white 
                          transition-all hover:from-red-700 hover:to-red-600 hover:scale-[1.02] 
                          hover:cursor-pointer rounded-xl shadow-lg hover:shadow-xl"
                        >
                          <span className="flex items-center gap-2">
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        href={`/tourist-home-page/package/${pkg._id}`}
                      >
                        <Button
                          className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden 
                          bg-linear-to-r from-red-600 to-red-500 px-6 font-medium text-white 
                          transition-all hover:from-red-700 hover:to-red-600 hover:scale-[1.02] 
                          hover:cursor-pointer rounded-xl shadow-lg hover:shadow-xl"
                        >
                          <span className="flex items-center gap-2">
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    )}

                    {/* Rating (Static for now - can be dynamic later) */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          (4.9)
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {pkg.number_of_member}+ bookings
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
                    style={{
                      boxShadow: isHovered
                        ? "inset 0 0 0 2px rgba(220, 38, 38, 0.2)"
                        : "none",
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

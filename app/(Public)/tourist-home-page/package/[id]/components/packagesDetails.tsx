// "use client";

// import { TourPackageFormData } from "@/app/dashboard/tourist/admin/manage-package/components/TourPackageForm";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   CheckCircle,
//   Clock,
//   Clock1,
//   MapPin,
//   Plane,
//   XCircle,
// } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";

// interface PackageDetailsProps {
//   packageData: TourPackageFormData;
//   source: string | undefined;
// }

// const PackageDetails = ({ packageData, source }: PackageDetailsProps) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const nights = parseInt(packageData.duration) - 1;

//   const openModal = (imgUrl: string) => setSelectedImage(imgUrl);
//   const closeModal = () => setSelectedImage(null);

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white">
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
//         {packageData.photos.length > 0 && (
//           <div
//             className={`col-span-2 ${
//               packageData.photos.length > 2 ? "md:col-span-1 md:row-span-3" : ""
//             }`}
//           >
//             <img
//               src={packageData.photos[0]}
//               alt="Main image"
//               className="w-full h-full object-cover rounded-lg cursor-pointer"
//               onClick={() => openModal(packageData.photos[0])}
//             />
//           </div>
//         )}

//         {packageData.photos.slice(1).map((photo, index) => (
//           <div key={index} className="aspect-video md:aspect-auto">
//             <img
//               src={photo}
//               alt={`View ${index + 2}`}
//               className="w-full h-full object-cover rounded-lg cursor-pointer"
//               onClick={() => openModal(photo)}
//             />
//           </div>
//         ))}
//       </div>

//       {/* modal show  */}

//       {selectedImage && (
//         <div
//           className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-md transition-opacity duration-300 ease-in-out"
//           onClick={closeModal}
//         >
//           <div
//             className="relative max-w-3xl max-h-[80vh] transform scale-90 opacity-0 transition-all duration-300 ease-in-out"
//             style={{
//               transform: "scale(1)",
//               opacity: 1,
//             }}
//             onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
//           >
//             <img
//               src={selectedImage}
//               alt="Selected"
//               className="w-full h-full object-contain rounded-lg shadow-xl"
//             />
//             <button
//               className="absolute top-2 right-2 text-white text-2xl font-bold"
//               onClick={closeModal}
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Package Title */}
//       <h1 className="text-2xl md:text-3xl font-bold mb-4">
//         {packageData.country} Tour Package
//       </h1>

//       {/* Price Section */}
//       <div className="max-w-4xl flex items-baseline gap-3 mb-4">
//         <span className="text-3xl md:text-4xl font-bold text-red-600">
//           BDT {parseInt(packageData.price).toLocaleString()}
//         </span>
//         <span className="text-gray-600">/ Per Person</span>
//         <span className="ml-auto px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
//           <Plane className="w-4 h-4" />
//           With Air Ticket
//         </span>
//       </div>

//       {/* Duration Info */}
//       <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
//             <Clock />
//           </div>
//           <span className="font-medium">
//             Duration: {packageData.duration} {nights} Nights
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
//             <svg
//               className="w-4 h-4 text-white"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
//             </svg>
//           </div>
//           <span className="font-medium">
//             Duration: {packageData.duration} {nights} Nights
//           </span>
//         </div>
//       </div>

//       {/* Tour Planning Section */}
//       <div className="max-w-4xl border-l-4 border-red-600 pl-6 mb-8 bg-gray-200 rounded-2xl py-6 px-4">
//         <h2 className="text-xl font-bold mb-4">Tour Planning</h2>

//         <div className="mb-4">
//           <div className="flex flex-wrap items-center gap-3">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Starts From</p>
//               <button className="px-4 py-2 border-2 border-red-600 text-red-600 rounded flex items-center gap-2 font-medium hover:bg-red-50">
//                 <MapPin className="w-4 h-4" />
//                 Dhaka
//               </button>
//             </div>

//             <div className="text-2xl text-gray-400">→</div>

//             <div>
//               <p className="text-sm text-gray-600 mb-1">Destination 1</p>
//               <button className="px-4 py-2 border-2 border-red-600 text-red-600 rounded flex items-center gap-2 font-medium hover:bg-red-50">
//                 <MapPin className="w-4 h-4" />
//                 {packageData.country.toUpperCase()}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white py-3 px-6 border-l-4 rounded-2xl border-red-600">
//           <p className="text-sm font-semibold mb-2">Sub Destinations:</p>
//           <div className="flex flex-wrap justify-around gap-2">
//             <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
//               <MapPin className="w-3 h-3" />
//               {packageData.city.toUpperCase()}
//             </button>
//             <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
//               <MapPin className="w-3 h-3" />
//               PLACE
//             </button>
//             <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
//               <MapPin className="w-3 h-3" />
//               PLACE
//             </button>
//             <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm flex items-center gap-1">
//               <Plane className="w-3 h-3" />
//               AIRPORT
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Includes and Excludes */}
//       <div className="grid md:grid-cols-2 gap-8 mb-8">
//         {/* Includes */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Includes</h2>
//           <ul className="space-y-3">
//             {packageData.includes.map((item, index) => (
//               <li key={index} className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
//                 <span className="text-gray-700">{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Excludes */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Excludes</h2>
//           <ul className="space-y-3">
//             {packageData.excludes.map((item, index) => (
//               <li key={index} className="flex items-start gap-3">
//                 <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
//                 <span className="text-gray-700">{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* View More Button */}
//       <div className="flex justify-center">
//         <Link
//           href={`/tourist-home-page/package/booking-form?id=${packageData._id}&source=${source}`}
//         >
//           <Button
//             className="group relative inline-flex h-12 items-center justify-center overflow-hidden
//           bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer rounded-full"
//           >
//             <span className="flex gap-2">
//               Book Now <ArrowRight />
//             </span>
//             <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
//               <div className="relative h-full w-8 bg-white/20"></div>
//             </div>
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PackageDetails;

"use client";

import { TourPackageFormData } from "@/app/dashboard/tourist/admin/manage-package/components/TourPackageForm";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Plane,
  XCircle,
  Calendar,
  Users,
  Star,
  Globe,
  Home,
  Camera,
  ChevronLeft,
  ChevronRight,
  Info,
  Shield,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import TouristHomePackages from "../../../components/home/homePackage";
import SimilarPackageCard from "../../../components/home/SimilarPackageCard";

interface PackageDetailsProps {
  packageData: TourPackageFormData;
  source?: { b2bId?: string; form?: string };
}

const PackageDetails = ({ packageData, source }: PackageDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"plan" | "overview" | "info">(
    "overview",
  );
  const [isLiked, setIsLiked] = useState(false);
  const [showAllIncludes, setShowAllIncludes] = useState(false);
  const [showAllExcludes, setShowAllExcludes] = useState(false);
  const [loading, setLoading] = useState(false);

  const nights = parseInt(packageData.duration) - 1;
  const allImages = [packageData.thumbnail, ...packageData.gallery].filter(
    Boolean,
  );

  // Add this state and useEffect in your PackageDetails component
  const [similarPackages, setSimilarPackages] = useState<TourPackageFormData[]>(
    [],
  );
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  // Fetch similar packages based on current package
  useEffect(() => {
    const fetchSimilarPackages = async () => {
      try {
        setLoadingSimilar(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package`,
        );
        const data = await response.json();
        setSimilarPackages(data || []);
      } catch (error) {
        console.error("Error fetching similar packages:", error);
        setSimilarPackages([]);
      } finally {
        setLoadingSimilar(false);
      }
    };

    fetchSimilarPackages();
  }, [packageData._id]);

  const openModal = (imgUrl: string) => setSelectedImage(imgUrl);
  const closeModal = () => setSelectedImage(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDestinationCount = () => {
    return packageData.tour_plan.length;
  };

 

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section with Image Gallery */}
      <div className="relative w-full bg-gray-900">
        {/* Main Image Slider */}
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={allImages.length > 1}
            className="w-full h-full"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image || "/placeholder-image.jpg"}
                    alt={`${packageData.p_title} - View ${index + 1}`}
                    fill
                    priority
                    quality={100}
                    onLoadingComplete={() => setLoading(false)}
                    sizes="100vw"
                    className={`w-full h-full object-cover duration-700 ease-in-out ${
                      loading ? "blur-xl scale-105" : "blur-0 scale-100"
                    }`}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          {allImages.length > 1 && (
            <>
              <button className="swiper-button-prev text-white! bg-black/30! w-10! h-10! rounded-full backdrop-blur-sm hover:bg-black/50! transition-all left-4!">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="swiper-button-next text-white! bg-black/30! w-10! h-10! rounded-full backdrop-blur-sm hover:bg-black/50! transition-all right-4!">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Top Action Buttons */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Package Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
            <div className="max-w-7xl mx-auto mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {packageData.isInternationalPackage && (
                  <span className="px-3 py-1 bg-green-800 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Bangladesh
                  </span>
                )}
                {packageData.is_with_air_ticket && (
                  <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
                    <Plane className="w-3 h-3" />
                    Flights Included
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {packageData.p_title}
              </h1>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {packageData.start_form}, {packageData.country.join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9 (120+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Thumbnails Grid */}
        {allImages.length > 1 && (
          <div className="hidden md:block absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white rounded-2xl shadow-xl p-3">
              <div className="flex gap-2">
                {allImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => openModal(image)}
                    className="relative w-20 h-20 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition-all"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {index === 3 && allImages.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                        +{allImages.length - 4}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <Clock className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-sm text-gray-600">Duration</p>
            <p className="text-lg font-bold">{packageData.duration} Days</p>
            <p className="text-xs text-gray-500">{nights} Nights</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <Users className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-sm text-gray-600">Max People</p>
            <p className="text-lg font-bold">{packageData.number_of_member}</p>
            <p className="text-xs text-gray-500">Per Group</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <MapPin className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-sm text-gray-600">Destinations</p>
            <p className="text-lg font-bold">{getDestinationCount()}</p>
            <p className="text-xs text-gray-500">Cities/Places</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <Calendar className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-sm text-gray-600">Start From</p>
            <p className="text-lg font-bold">{packageData.start_form}</p>
            <p className="text-xs text-gray-500">Pickup Point</p>
          </div>
        </div>

        {/* Price & Booking Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Starting from</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold text-red-600">
                  {formatPrice(packageData.p_price)}
                </span>
                <span className="text-gray-500">/ person</span>
              </div>
              {source?.form === "b2b" &&
                packageData.isB2B &&
                packageData.b2b_price > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-emerald-600 font-semibold">
                      B2B Special Price
                    </p>
                    <p className="text-xl font-bold text-emerald-600">
                      {formatPrice(packageData.b2b_price)} / person
                    </p>
                  </div>
                )}
            </div>
            <div className="flex gap-3">
              {source?.b2bId && source.form ? (
                <Link
                  href={`/tourist-home-page/package/booking-form?id=${packageData._id}&b2bId=${source.b2bId}&form=${source.form}`}
                >
                  <Button
                    className="group relative inline-flex h-14 items-center justify-center overflow-hidden 
                    bg-linear-to-r from-red-600 to-red-500 px-8 font-medium text-white 
                    transition-all hover:from-red-700 hover:to-red-600 hover:scale-105 
                    hover:cursor-pointer rounded-xl shadow-lg hover:shadow-xl text-lg"
                  >
                    <span className="flex items-center gap-2">
                      Book Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link
                  href={`/tourist-home-page/package/booking-form?id=${packageData._id}`}
                >
                  <Button
                    className="group relative inline-flex h-14 items-center justify-center overflow-hidden 
                    bg-linear-to-r from-red-600 to-red-500 px-8 font-medium text-white 
                    transition-all hover:from-red-700 hover:to-red-600 hover:scale-105 
                    hover:cursor-pointer rounded-xl shadow-lg hover:shadow-xl text-lg"
                  >
                    <span className="flex items-center gap-2">
                      Book Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              )}
              <Button
                className="h-14 px-8 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
                variant="outline"
              >
                <Info className="w-5 h-5 mr-2" />
                Inquiry
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("plan")}
              className={`pb-4 px-1 font-medium transition-all relative ${
                activeTab === "plan"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tour Plan
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-1 font-medium transition-all relative ${
                activeTab === "overview"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab("info")}
              className={`pb-4 px-1 font-medium transition-all relative ${
                activeTab === "info"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Includes/Excludes
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === "plan" && (
              <div className="space-y-8">
                {/* Tour Plan Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">
                    Detailed Tour Plan
                  </h2>
                  <div className="space-y-6">
                    {packageData.tour_plan.map((plan, index) => (
                      <div
                        key={index}
                        className="relative pl-8 pb-6 border-l-2 border-red-200 last:border-0 last:pb-0"
                      >
                        <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow" />
                        {/* <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                            Day {plan.day}
                          </span>
                        </div> */}
                        <h3 className="text-xl font-bold mb-2">
                          {plan.destination}
                        </h3>
                        {/* <p className="text-gray-600 mb-3">{plan.description}</p> */}
                        {plan.sub_destination &&
                          plan.sub_destination.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {plan.sub_destination.map((sub, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Description */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold mb-4">
                    About This Package
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: packageData.description,
                    }}
                  />
                </div>

                {/* Key Highlights */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold mb-4">Key Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {packageData.includes.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="space-y-8">
                {/* Includes & Excludes */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Includes */}
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                        What's Included
                      </h2>
                      <ul className="space-y-3">
                        {(showAllIncludes
                          ? packageData.includes
                          : packageData.includes.slice(0, 5)
                        ).map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {packageData.includes.length > 5 && (
                        <button
                          onClick={() => setShowAllIncludes(!showAllIncludes)}
                          className="mt-4 text-red-600 font-medium hover:text-red-700"
                        >
                          {showAllIncludes
                            ? "Show Less"
                            : `+${packageData.includes.length - 5} More`}
                        </button>
                      )}
                    </div>

                    {/* Excludes */}
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <XCircle className="w-6 h-6 text-red-500" />
                        What's Excluded
                      </h2>
                      <ul className="space-y-3">
                        {(showAllExcludes
                          ? packageData.excludes
                          : packageData.excludes.slice(0, 5)
                        ).map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {packageData.excludes.length > 5 && (
                        <button
                          onClick={() => setShowAllExcludes(!showAllExcludes)}
                          className="mt-4 text-red-600 font-medium hover:text-red-700"
                        >
                          {showAllExcludes
                            ? "Show Less"
                            : `+${packageData.excludes.length - 5} More`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Why Book With Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-medium">Best Price Guarantee</p>
                    <p className="text-sm text-gray-500">
                      We match any genuine price
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-medium">24/7 Customer Support</p>
                    <p className="text-sm text-gray-500">
                      We're here to help anytime
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-medium">Flexible Booking</p>
                    <p className="text-sm text-gray-500">
                      Free cancellation up to 7 days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* You Might Also Like */}
            {!packageData.isInternationalPackage && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                  You Might Also Like
                </h3>

                {loadingSimilar ? (
                  // Loading skeletons
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded-lg mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : similarPackages.length > 0 ? (
                  <div className="space-y-3">
                    {source?.b2bId && source.form ? (
                      <div>
                        {similarPackages.map((pkg) => (
                          // <Link href={`tourist-home-page/package/${pkg._id}?b2bId=${source.b2bId}&form=${source.form}`}>
                          <SimilarPackageCard
                            key={pkg._id}
                            packageData={pkg}
                            source={source}
                          />
                          //  </Link>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {similarPackages.map((pkg) => (
                          // <Link href={`tourist-home-page/package/${pkg._id}`}>
                          <SimilarPackageCard key={pkg._id} packageData={pkg} />
                          // </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No similar packages found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-xl p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full 
                flex items-center justify-center text-white text-2xl hover:bg-white/30 transition-all"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;

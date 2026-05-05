"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Eye, Trash2, Clock, Calendar, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// First, install framer-motion if you haven't:
// npm install framer-motion

interface IAdminTouristPkgProps {
  pkg: any;
  onView: any;
  onDelete: any;
}

const AdminTouristPackageCard = ({ pkg, onView, onDelete }: IAdminTouristPkgProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-red-100/50 hover:border-red-200 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-linear-to-r from-rose-400/0 via-red-400/0 to-rose-400/0 group-hover:from-rose-400/5 group-hover:via-red-400/10 group-hover:to-rose-400/5 transition-all duration-700 rounded-2xl pointer-events-none" />

      {/* Package Image with Loading Animation */}
      <div className="relative w-full h-56 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
        {pkg.thumbnail && !imageError ? (
          <>
            <Image
              src={pkg.thumbnail}
              alt={pkg.p_title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Image Overlay on Hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2 animate-bounce" />
              <p className="text-gray-400 text-sm">No Image Available</p>
            </div>
          </div>
        )}

        {/* Badge for Duration */}
        {pkg.duration && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5 transform transition-all duration-300 group-hover:scale-105">
            <Clock className="w-3 h-3 text-rose-500" />
            {pkg.duration}
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onView(pkg)}
            className="bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-2.5 rounded-full font-semibold text-sm shadow-2xl flex items-center gap-2 hover:bg-white transition-all"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </motion.button>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-linear-to-r from-rose-500 to-red-500 text-white p-4 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] animate-pulse" />
        </div>

        <h3 className="font-bold text-base mb-2 line-clamp-1 relative z-10">
          {pkg.p_title}
        </h3>
        <p className="text-rose-100 text-xs flex items-center gap-1.5 relative z-10">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">
            {pkg.start_form}, {pkg.country}
          </span>
        </p>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Created Date */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 rounded-xl p-3 transition-all duration-300 hover:bg-rose-50 hover:shadow-md group/item"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-rose-400 group-hover/item:text-rose-500 transition-colors" />
              <p className="text-gray-500 text-xs font-medium">Created</p>
            </div>
            <p className="text-gray-800 font-semibold text-sm">
              {formatDate(pkg.createdAt)}
            </p>
          </motion.div>

          {/* Price */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 rounded-xl p-3 transition-all duration-300 hover:bg-rose-50 hover:shadow-md group/item"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Tag className="w-3.5 h-3.5 text-rose-400 group-hover/item:text-rose-500 transition-colors" />
              <p className="text-gray-500 text-xs font-medium">Price</p>
            </div>
            <p className="text-gray-800 font-bold text-sm flex items-center gap-1">
              <span className="text-rose-500">৳</span>
              {pkg.p_price}
            </p>
          </motion.div>
        </div>

        {/* Duration Display */}
        {pkg.duration && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-3 border border-rose-100"
          >
            <Clock className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-gray-700">
              Duration: {pkg.duration}
            </span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onView(pkg)}
            className="flex-1 py-2.5 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-xl font-semibold text-xs hover:from-rose-600 hover:to-red-600 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            View Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDelete(pkg._id!)}
            className="py-2.5 px-4 bg-white border-2 border-red-200 text-red-500 rounded-xl font-semibold text-xs hover:bg-red-500 hover:text-white hover:border-red-500 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminTouristPackageCard;

// // Main Grid Component
// export default function PackageGrid({
//   packages,
//   setSelectedPackage,
//   setShowDeleteConfirm,
// }) {
//   return (
//     <div className="w-full">
//       {/* Grid Header with Animation */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-6 flex items-center justify-between"
//       >
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Travel Packages</h2>
//           <p className="text-gray-500 text-sm mt-1">
//             {packages.length} packages available
//           </p>
//         </div>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="text-rose-400"
//         >
//           ✈️
//         </motion.div>
//       </motion.div>

//       {/* Grid Container */}
//       <motion.div
//         layout
//         className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//       >
//         <AnimatePresence mode="popLayout">
//           {packages.map((pkg, index) => (
//             <motion.div
//               key={pkg._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//                 transition: { delay: index * 0.1 },
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0.8,
//                 transition: { duration: 0.3 },
//               }}
//               layout
//             >
//               <PackageCard
//                 pkg={pkg}
//                 onView={setSelectedPackage}
//                 onDelete={setShowDeleteConfirm}
//               />
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Empty State with Animation */}
//         {packages.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="col-span-full flex flex-col items-center justify-center py-16"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -10, 0],
//                 rotate: [0, 5, -5, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="text-6xl mb-4"
//             >
//               📦
//             </motion.div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No Packages Found
//             </h3>
//             <p className="text-gray-500 text-center max-w-md">
//               Start by creating your first travel package. Click the "Add
//               Package" button to get started!
//             </p>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// Format date utility (add this if you don't have it)
function formatDate(date: string | Date): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

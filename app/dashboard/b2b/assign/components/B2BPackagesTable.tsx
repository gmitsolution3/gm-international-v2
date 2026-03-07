// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   ChevronDown,
//   ChevronUp,
//   MoreHorizontal,
//   Edit,
//   Trash2,
//   Eye,
//   Users,
//   Check,
//   X,
//   Image as ImageIcon,
//   Calendar,
//   DollarSign,
//   Tag,
//   Globe,
//   User,
//   Plane,
//   Copy,
//   Download,
//   Mail,
//   RefreshCw,
//   AlertCircle,
// } from "lucide-react";

// interface Package {
//   _id: string;
//   p_title: string;
//   p_price: string;
//   number_of_member: string;
//   duration: string;
//   is_with_air_ticket: boolean;
//   start_form: string;
//   country: string[];
//   thumbnail: string;
//   createdBy: string;
//   isB2B: boolean;
//   b2b_price: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface B2BPackagesTableProps {
//   packages: Package[];
//   onAssignToB2B?: (selectedIds: string[]) => void;
//   onEdit?: (pkg: Package) => void;
//   onDelete?: (id: string) => void;
//   onView?: (pkg: Package) => void;
//   isLoading?: boolean;
// }

// const B2BPackagesTable: React.FC<B2BPackagesTableProps> = ({
//   packages,
//   onAssignToB2B,
//   onEdit,
//   onDelete,
//   onView,
//   isLoading = false,
// }) => {
//   const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
//   const [sortConfig, setSortConfig] = useState<{
//     key: keyof Package;
//     direction: "asc" | "desc";
//   } | null>(null);
//   const [expandedRow, setExpandedRow] = useState<string | null>(null);

//   // Handle select all packages
//   const handleSelectAll = () => {
//     if (selectedPackages.length === packages.length) {
//       setSelectedPackages([]);
//     } else {
//       setSelectedPackages(packages.map((pkg) => pkg._id));
//     }
//   };

//   // Handle select single package
//   const handleSelectPackage = (id: string) => {
//     if (selectedPackages.includes(id)) {
//       setSelectedPackages(selectedPackages.filter((pkgId) => pkgId !== id));
//     } else {
//       setSelectedPackages([...selectedPackages, id]);
//     }
//   };

//   // Handle sorting
//   const handleSort = (key: keyof Package) => {
//     let direction: "asc" | "desc" = "asc";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "asc"
//     ) {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   // Get sorted packages
//   const getSortedPackages = () => {
//     if (!sortConfig) return packages;

//     return [...packages].sort((a, b) => {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];

//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return sortConfig.direction === "asc"
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       }

//       if (typeof aValue === "number" && typeof bValue === "number") {
//         return sortConfig.direction === "asc"
//           ? aValue - bValue
//           : bValue - aValue;
//       }

//       return 0;
//     });
//   };

//   // Format price with commas
//   const formatPrice = (price: string) => {
//     return new Intl.NumberFormat("en-BD", {
//       style: "currency",
//       currency: "BDT",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(Number(price));
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-BD", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const sortedPackages = getSortedPackages();

//   // Table header configuration
//   const tableHeaders = [
//     { key: "thumbnail", label: "Thumbnail", sortable: false },
//     { key: "_id", label: "Package ID", sortable: true },
//     { key: "p_title", label: "Title", sortable: true },
//     { key: "p_price", label: "Regular Price", sortable: true },
//     { key: "b2b_price", label: "B2B Price", sortable: true },
//     { key: "duration", label: "Duration", sortable: true },
//     { key: "number_of_member", label: "Members", sortable: true },
//     { key: "is_with_air_ticket", label: "Air Ticket", sortable: false },
//     { key: "createdBy", label: "Created By", sortable: true },
//     { key: "createdAt", label: "Created At", sortable: true },
//     { key: "actions", label: "Actions", sortable: false },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
//       {/* Bulk Actions Bar */}
//       {selectedPackages.length > 0 && (
//         <div className="bg-red-50 px-6 py-4 border-b border-red-200 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-red-700 font-medium">
//               {selectedPackages.length} package
//               {selectedPackages.length > 1 ? "s" : ""} selected
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => onAssignToB2B?.(selectedPackages)}
//               className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
//             >
//               <Users size={16} />
//               Assign to B2B ({selectedPackages.length})
//             </button>
//             <button
//               onClick={() => setSelectedPackages([])}
//               className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
//             >
//               <X size={16} />
//               Clear
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-700">
//           <thead className="bg-red-600 text-white text-xs uppercase">
//             <tr>
//               <th className="px-4 py-3 w-10">
//                 <input
//                   type="checkbox"
//                   checked={
//                     selectedPackages.length === packages.length &&
//                     packages.length > 0
//                   }
//                   onChange={handleSelectAll}
//                   className="rounded border-gray-300 text-red-600 focus:ring-red-500"
//                 />
//               </th>
//               {tableHeaders.map((header) => (
//                 <th
//                   key={header.key}
//                   className={`px-4 py-3 ${header.sortable ? "cursor-pointer hover:bg-red-700" : ""}`}
//                   onClick={() =>
//                     header.sortable && handleSort(header.key as keyof Package)
//                   }
//                 >
//                   <div className="flex items-center gap-1">
//                     {header.label}
//                     {header.sortable &&
//                       sortConfig?.key === header.key &&
//                       (sortConfig.direction === "asc" ? (
//                         <ChevronUp size={14} />
//                       ) : (
//                         <ChevronDown size={14} />
//                       ))}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {isLoading ? (
//               <tr>
//                 <td colSpan={12} className="px-4 py-8 text-center">
//                   <div className="flex items-center justify-center gap-2 text-gray-500">
//                     <RefreshCw size={20} className="animate-spin" />
//                     Loading packages...
//                   </div>
//                 </td>
//               </tr>
//             ) : sortedPackages.length === 0 ? (
//               <tr>
//                 <td colSpan={12} className="px-4 py-8 text-center">
//                   <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
//                     <AlertCircle size={40} className="text-gray-400" />
//                     <p className="text-lg font-medium">No packages found</p>
//                     <p className="text-sm">
//                       Click the "Add New Package" button to create one.
//                     </p>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               sortedPackages.map((pkg) => (
//                 <React.Fragment key={pkg._id}>
//                   <tr
//                     className={`hover:bg-gray-50 transition-colors ${selectedPackages.includes(pkg._id) ? "bg-red-50" : ""}`}
//                   >
//                     <td className="px-4 py-3">
//                       <input
//                         type="checkbox"
//                         checked={selectedPackages.includes(pkg._id)}
//                         onChange={() => handleSelectPackage(pkg._id)}
//                         className="rounded border-gray-300 text-red-600 focus:ring-red-500"
//                       />
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
//                         {pkg.thumbnail ? (
//                           <img
//                             src={pkg.thumbnail}
//                             alt={pkg.p_title}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src =
//                                 "https://via.placeholder.com/48?text=No+Image";
//                             }}
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <ImageIcon size={20} className="text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 font-mono text-xs">
//                       <span className="bg-gray-100 px-2 py-1 rounded">
//                         {pkg._id.slice(-8)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 font-medium">
//                       <div className="max-w-xs truncate" title={pkg.p_title}>
//                         {pkg.p_title}
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">
//                         {pkg.country.join(", ")}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1 text-gray-900 font-medium">
//                         <DollarSign size={14} className="text-gray-500" />
//                         {formatPrice(pkg.p_price)}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1 text-red-600 font-bold">
//                         <DollarSign size={14} />
//                         {formatPrice(pkg.b2b_price)}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1">
//                         <Calendar size={14} className="text-gray-500" />
//                         {pkg.duration}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1">
//                         <Users size={14} className="text-gray-500" />
//                         {pkg.number_of_member} persons
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       {pkg.is_with_air_ticket ? (
//                         <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs w-fit">
//                           <Plane size={12} />
//                           Included
//                         </span>
//                       ) : (
//                         <span className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full text-xs w-fit">
//                           <Plane size={12} />
//                           Not Included
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1">
//                         <User size={14} className="text-gray-500" />
//                         {pkg.createdBy}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-xs text-gray-500">
//                       {formatDate(pkg.createdAt)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => onView?.(pkg)}
//                           className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-red-600"
//                           title="View details"
//                         >
//                           <Eye size={16} />
//                         </button>
//                         <button
//                           onClick={() => onEdit?.(pkg)}
//                           className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-blue-600"
//                           title="Edit package"
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           onClick={() => onDelete?.(pkg._id)}
//                           className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-red-600"
//                           title="Delete package"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                         <button
//                           onClick={() =>
//                             setExpandedRow(
//                               expandedRow === pkg._id ? null : pkg._id,
//                             )
//                           }
//                           className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 lg:hidden"
//                           title="Expand details"
//                         >
//                           <ChevronDown size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                   {/* Mobile expanded view */}
//                   {expandedRow === pkg._id && (
//                     <tr className="lg:hidden bg-gray-50">
//                       <td colSpan={12} className="px-4 py-3">
//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                           <div>
//                             <span className="text-gray-500 text-xs">
//                               Start From:
//                             </span>
//                             <p className="font-medium">{pkg.start_form}</p>
//                           </div>
//                           <div>
//                             <span className="text-gray-500 text-xs">
//                               Country:
//                             </span>
//                             <p className="font-medium">
//                               {pkg.country.join(", ")}
//                             </p>
//                           </div>
//                           <div>
//                             <span className="text-gray-500 text-xs">
//                               Created:
//                             </span>
//                             <p className="font-medium">
//                               {formatDate(pkg.createdAt)}
//                             </p>
//                           </div>
//                           <div>
//                             <span className="text-gray-500 text-xs">
//                               Updated:
//                             </span>
//                             <p className="font-medium">
//                               {formatDate(pkg.updatedAt)}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Table Footer */}
//       <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
//         <div className="text-sm text-gray-600">
//           Showing {sortedPackages.length} of {packages.length} packages
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
//             Previous
//           </button>
//           <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">
//             1
//           </button>
//           <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
//             2
//           </button>
//           <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
//             3
//           </button>
//           <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default B2BPackagesTable;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  Check,
  X,
  Image as ImageIcon,
  Calendar,
  DollarSign,
  Tag,
  Globe,
  User,
  Plane,
  Copy,
  Download,
  Mail,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface Package {
  _id: string;
  p_title: string;
  p_price: string;
  number_of_member: string;
  duration: string;
  is_with_air_ticket: boolean;
  start_form: string;
  country: string[];
  thumbnail: string;
  createdBy: string;
  isB2B: boolean;
  b2b_price: string;
  createdAt: string;
  updatedAt: string;
}

interface B2BPackagesTableProps {
  packages: Package[];
  onAssignToB2B?: (selectedIds: string[]) => void;
  onEdit?: (pkg: Package) => void;
  onDelete?: (id: string) => void;
  onView?: (pkg: Package) => void;
  isLoading?: boolean;
}

const B2BPackagesTable: React.FC<B2BPackagesTableProps> = ({
  packages,
  onAssignToB2B,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}) => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Package;
    direction: "asc" | "desc";
  } | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Handle select all packages
  const handleSelectAll = () => {
    if (selectedPackages.length === packages.length) {
      setSelectedPackages([]);
    } else {
      setSelectedPackages(packages.map((pkg) => pkg._id));
    }
  };

  // Handle select single package
  const handleSelectPackage = (id: string) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter((pkgId) => pkgId !== id));
    } else {
      setSelectedPackages([...selectedPackages, id]);
    }
  };

  // Handle sorting
  const handleSort = (key: keyof Package) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted packages
  const getSortedPackages = () => {
    if (!sortConfig) return packages;

    return [...packages].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  };

  // Format price with commas
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sortedPackages = getSortedPackages();

  // Responsive table headers configuration
  const getVisibleHeaders = () => {
    if (isMobile) {
      return [
        { key: "thumbnail", label: "Package", sortable: false },
        { key: "actions", label: "Actions", sortable: false },
      ];
    } else if (isTablet) {
      return [
        { key: "thumbnail", label: "Package", sortable: false },
        { key: "p_price", label: "Price", sortable: true },
        { key: "b2b_price", label: "B2B Price", sortable: true },
        { key: "duration", label: "Duration", sortable: true },
        { key: "actions", label: "Actions", sortable: false },
      ];
    } else {
      return [
        { key: "thumbnail", label: "Thumbnail", sortable: false },
        { key: "_id", label: "Package ID", sortable: true },
        { key: "p_title", label: "Title", sortable: true },
        { key: "p_price", label: "Regular Price", sortable: true },
        { key: "b2b_price", label: "B2B Price", sortable: true },
        { key: "duration", label: "Duration", sortable: true },
        { key: "number_of_member", label: "Members", sortable: true },
        { key: "is_with_air_ticket", label: "Air Ticket", sortable: false },
        { key: "createdBy", label: "Created By", sortable: true },
        { key: "createdAt", label: "Created At", sortable: true },
        { key: "actions", label: "Actions", sortable: false },
      ];
    }
  };

  const visibleHeaders = getVisibleHeaders();

  // Mobile card view renderer
  const renderMobileCard = (pkg: Package) => (
    <div
      key={pkg._id}
      className={`p-4 border-b border-gray-200 ${selectedPackages.includes(pkg._id) ? "bg-red-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <input
            type="checkbox"
            checked={selectedPackages.includes(pkg._id)}
            onChange={() => handleSelectPackage(pkg._id)}
            className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                {pkg.thumbnail ? (
                  <img
                    src={pkg.thumbnail}
                    alt={pkg.p_title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/48?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 truncate max-w-37.5 sm:max-w-50">
                  {pkg.p_title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {pkg.country.join(", ")}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                setExpandedRow(expandedRow === pkg._id ? null : pkg._id)
              }
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${
                  expandedRow === pkg._id ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Compact view always visible on mobile */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500 text-xs">Regular Price</span>
              <p className="font-medium flex items-center">
                <DollarSign size={12} className="text-gray-500" />
                {formatPrice(pkg.p_price)}
              </p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">B2B Price</span>
              <p className="font-medium text-red-600 flex items-center">
                <DollarSign size={12} />
                {formatPrice(pkg.b2b_price)}
              </p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Duration</span>
              <p className="font-medium flex items-center">
                <Calendar size={12} className="text-gray-500 mr-1" />
                {pkg.duration}
              </p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Members</span>
              <p className="font-medium flex items-center">
                <Users size={12} className="text-gray-500 mr-1" />
                {pkg.number_of_member}
              </p>
            </div>
          </div>

          {/* Air ticket indicator */}
          <div className="mt-2">
            {pkg.is_with_air_ticket ? (
              <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
                <Plane size={12} />
                Air Ticket Included
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full text-xs">
                <Plane size={12} />
                No Air Ticket
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
            <button
              onClick={() => onView?.(pkg)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Eye size={16} />
              View
            </button>
            <button
              onClick={() => onEdit?.(pkg)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => onDelete?.(pkg._id)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 rounded-md text-sm text-red-600 hover:bg-red-100 transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          {/* Expanded details for mobile */}
          {expandedRow === pkg._id && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500 text-xs block">Package ID</span>
                <span className="font-mono text-xs bg-white px-2 py-1 rounded">
                  {pkg._id}
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Created By</span>
                <p className="font-medium flex items-center">
                  <User size={12} className="text-gray-500 mr-1" />
                  {pkg.createdBy}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Start From</span>
                <p className="font-medium">{pkg.start_form}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Created At</span>
                <p className="font-medium text-xs">
                  {formatDate(pkg.createdAt)}
                </p>
              </div>
              {pkg.updatedAt && (
                <div className="col-span-2">
                  <span className="text-gray-500 text-xs block">
                    Last Updated
                  </span>
                  <p className="font-medium text-xs">
                    {formatDate(pkg.updatedAt)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Tablet/Desktop table row renderer
  const renderTableRow = (pkg: Package) => (
    <React.Fragment key={pkg._id}>
      <tr
        className={`hover:bg-gray-50 transition-colors ${
          selectedPackages.includes(pkg._id) ? "bg-red-50" : ""
        }`}
      >
        <td className="px-4 py-3">
          <input
            type="checkbox"
            checked={selectedPackages.includes(pkg._id)}
            onChange={() => handleSelectPackage(pkg._id)}
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
        </td>
        {visibleHeaders.map((header) => {
          if (header.key === "thumbnail") {
            return (
              <td key="thumbnail" className="px-4 py-3">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                  {pkg.thumbnail ? (
                    <img
                      src={pkg.thumbnail}
                      alt={pkg.p_title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/48?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={20} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </td>
            );
          }

          if (header.key === "_id" && !isTablet) {
            return (
              <td key="_id" className="px-4 py-3 font-mono text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {pkg._id.slice(-8)}
                </span>
              </td>
            );
          }

          if (header.key === "p_title" && !isTablet) {
            return (
              <td key="p_title" className="px-4 py-3">
                <div className="max-w-xs" title={pkg.p_title}>
                  <p className="font-medium truncate">{pkg.p_title}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {pkg.country.join(", ")}
                  </p>
                </div>
              </td>
            );
          }

          if (header.key === "p_price") {
            return (
              <td key="p_price" className="px-4 py-3">
                <div className="flex items-center gap-1 text-gray-900 font-medium">
                  <DollarSign size={14} className="text-gray-500" />
                  {formatPrice(pkg.p_price)}
                </div>
              </td>
            );
          }

          if (header.key === "b2b_price") {
            return (
              <td key="b2b_price" className="px-4 py-3">
                <div className="flex items-center gap-1 text-red-600 font-bold">
                  <DollarSign size={14} />
                  {formatPrice(pkg.b2b_price)}
                </div>
              </td>
            );
          }

          if (header.key === "duration") {
            return (
              <td key="duration" className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-500" />
                  {pkg.duration}
                </div>
              </td>
            );
          }

          if (header.key === "number_of_member" && !isTablet) {
            return (
              <td key="number_of_member" className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-gray-500" />
                  {pkg.number_of_member} persons
                </div>
              </td>
            );
          }

          if (header.key === "is_with_air_ticket" && !isTablet) {
            return (
              <td key="is_with_air_ticket" className="px-4 py-3">
                {pkg.is_with_air_ticket ? (
                  <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs w-fit">
                    <Plane size={12} />
                    Included
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full text-xs w-fit">
                    <Plane size={12} />
                    Not Included
                  </span>
                )}
              </td>
            );
          }

          if (header.key === "createdBy" && !isTablet) {
            return (
              <td key="createdBy" className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <User size={14} className="text-gray-500" />
                  {pkg.createdBy}
                </div>
              </td>
            );
          }

          if (header.key === "createdAt" && !isTablet) {
            return (
              <td key="createdAt" className="px-4 py-3 text-xs text-gray-500">
                {formatDate(pkg.createdAt)}
              </td>
            );
          }

          if (header.key === "actions") {
            return (
              <td key="actions" className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView?.(pkg)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-red-600"
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit?.(pkg)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-blue-600"
                    title="Edit package"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete?.(pkg._id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-red-600"
                    title="Delete package"
                  >
                    <Trash2 size={16} />
                  </button>
                  {isTablet && (
                    <button
                      onClick={() =>
                        setExpandedRow(expandedRow === pkg._id ? null : pkg._id)
                      }
                      className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600"
                      title="Expand details"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          expandedRow === pkg._id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              </td>
            );
          }

          return null;
        })}
      </tr>
      {/* Tablet expanded view */}
      {isTablet && expandedRow === pkg._id && (
        <tr className="bg-gray-50">
          <td colSpan={visibleHeaders.length + 1} className="px-4 py-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500 text-xs block">Package ID</span>
                <p className="font-mono text-xs">{pkg._id}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Members</span>
                <p className="font-medium">{pkg.number_of_member} persons</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Air Ticket</span>
                <p className="font-medium">
                  {pkg.is_with_air_ticket ? "Included" : "Not Included"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Start From</span>
                <p className="font-medium">{pkg.start_form}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Created By</span>
                <p className="font-medium">{pkg.createdBy}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Created At</span>
                <p className="font-medium text-xs">
                  {formatDate(pkg.createdAt)}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <span className="text-gray-500 text-xs block">Countries</span>
                <p className="font-medium">{pkg.country.join(", ")}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Bulk Actions Bar - Responsive */}
      {selectedPackages.length > 0 && (
        <div className="bg-red-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-red-700 font-medium text-sm sm:text-base">
              {selectedPackages.length} package
              {selectedPackages.length > 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onAssignToB2B?.(selectedPackages)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <Users size={16} />
              <span className="hidden xs:inline">Assign to B2B</span>
              <span className="xs:hidden">Assign</span>
            </button>
            <button
              onClick={() => setSelectedPackages([])}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
            >
              <X size={16} />
              <span className="hidden xs:inline">Clear</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile View - Cards */}
      {isMobile && (
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <RefreshCw size={20} className="animate-spin" />
                Loading packages...
              </div>
            </div>
          ) : sortedPackages.length === 0 ? (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                <AlertCircle size={40} className="text-gray-400" />
                <p className="text-lg font-medium">No packages found</p>
                <p className="text-sm">
                  Click the "Add New Package" button to create one.
                </p>
              </div>
            </div>
          ) : (
            sortedPackages.map(renderMobileCard)
          )}
        </div>
      )}

      {/* Tablet and Desktop View - Table */}
      {!isMobile && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-red-600 text-white text-xs uppercase">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedPackages.length === packages.length &&
                      packages.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                {visibleHeaders.map((header) => (
                  <th
                    key={header.key}
                    className={`px-4 py-3 ${
                      header.sortable ? "cursor-pointer hover:bg-red-700" : ""
                    }`}
                    onClick={() =>
                      header.sortable && handleSort(header.key as keyof Package)
                    }
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      {header.label}
                      {header.sortable &&
                        sortConfig?.key === header.key &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={visibleHeaders.length + 1}
                    className="px-4 py-8 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <RefreshCw size={20} className="animate-spin" />
                      Loading packages...
                    </div>
                  </td>
                </tr>
              ) : sortedPackages.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleHeaders.length + 1}
                    className="px-4 py-8 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                      <AlertCircle size={40} className="text-gray-400" />
                      <p className="text-lg font-medium">No packages found</p>
                      <p className="text-sm">
                        Click the "Add New Package" button to create one.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedPackages.map(renderTableRow)
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Table Footer - Responsive */}
      <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-600 order-2 sm:order-1">
          Showing {sortedPackages.length} of {packages.length} packages
        </div>
        <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-center">
          <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <div className="flex items-center gap-1">
            <button className="px-2 sm:px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">
              1
            </button>
            <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
              3
            </button>
          </div>
          <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default B2BPackagesTable;
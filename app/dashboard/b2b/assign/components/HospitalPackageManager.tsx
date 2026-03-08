// components/admin/HospitalPackageManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Users,
  Hospital,
  MapPin,
  Building,
  Eye,
  TrendingUp,
  Filter,
  Download,
  Upload,
  CheckSquare,
  Square,
  AlertCircle,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Star,
  Globe,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

// Types based on your data structure
interface HospitalPackage {
  _id: string;
  hospital_name: string;
  country_name: string;
  city_name: string;
  provience: string;
  photo: string;
  hospital_type: "public" | "private";
  department: string[];
  total_view: number;
  total_sell: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  rating: number;
}

interface B2BUser {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: "active" | "inactive";
  assignedPackages: string[];
}

// Mock B2B Users Data
const mockB2BUsers: B2BUser[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@healthcare-india.com",
    company: "Healthcare India Pvt Ltd",
    phone: "+91 98765 43210",
    status: "active",
    assignedPackages: ["699c226f0dbc738fa9f259ce"],
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@medconnect.sg",
    company: "MedConnect Singapore",
    phone: "+65 9123 4567",
    status: "active",
    assignedPackages: [],
  },
  {
    id: "3",
    name: "Mohammed Al-Rashid",
    email: "m.alrashid@dubai-health.ae",
    company: "Dubai Health Authority",
    phone: "+971 50 123 4567",
    status: "active",
    assignedPackages: ["699c27ef0eb84c9ce85476ee", "699d60d355ccf27d20166e81"],
  },
  {
    id: "4",
    name: "Linda Watson",
    email: "l.watson@globalmed.uk",
    company: "Global Medical Solutions UK",
    phone: "+44 7700 900123",
    status: "inactive",
    assignedPackages: [],
  },
  {
    id: "5",
    name: "Dr. Wei Zhang",
    email: "wei.zhang@chinamed.com",
    company: "China Medical International",
    phone: "+86 138 0013 8000",
    status: "active",
    assignedPackages: ["699e9d48db4c2a2adaf49762"],
  },
];

interface HospitalPackageManagerProps {
  initialPackages?: HospitalPackage[];
}

const HospitalPackageManager: React.FC<HospitalPackageManagerProps> = ({
  initialPackages = [],
}) => {
  // State management
  const [packages, setPackages] = useState<HospitalPackage[]>(initialPackages);
  const [filteredPackages, setFilteredPackages] =
    useState<HospitalPackage[]>(initialPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(
    new Set(),
  );
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<B2BUser | null>(null);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState<"all" | "public" | "private">(
    "all",
  );
  const [sortBy, setSortBy] = useState<"name" | "views" | "rating" | "newest">(
    "newest",
  );
  const [showUserDropdown, setShowUserDropdown] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [selectedB2BUsers, setSelectedB2BUsers] = useState<Set<string>>(
    new Set(),
  );
  const [b2bUsers] = useState<B2BUser[]>(mockB2BUsers);

  // Load initial data (in real app, this would be an API call)
  useEffect(() => {
    if (initialPackages.length === 0) {
      // Simulate loading from your JSON data
      const mockPackages: HospitalPackage[] = [
        {
          _id: "699c226f0dbc738fa9f259ce",
          hospital_name:
            "The First Affiliated Hospital of Sun Yat-sen University",
          country_name: "China",
          city_name: "Guangzhou",
          provience: "Guangdong",
          photo:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771839712/c2znw9bwvinmuwzp945e.jpg",
          hospital_type: "public",
          department: [
            "Dermatology",
            "Neurology/Neurosurgery",
            "Surgery",
            "Gynecology & Obstetrics",
          ],
          total_view: 15,
          total_sell: 0,
          createdAt: "2026-02-23T09:39:53.362Z",
          createdBy: "sabbir@gmail.com",
          updatedAt: "2026-02-23T09:39:53.362Z",
          rating: 5,
        },
        {
          _id: "699c27ef0eb84c9ce85476ee",
          hospital_name: "Sun Yat-sen Memorial Hospital",
          country_name: "China",
          city_name: "Guangzhou",
          provience: "Guangdong",
          photo:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771841127/myjvmz6crdppzidkjyfj.jpg",
          hospital_type: "public",
          department: ["Oncology", "Immunology", "Radiology", "Urology"],
          total_view: 29,
          total_sell: 5,
          createdAt: "2026-02-23T10:05:18.482Z",
          createdBy: "sabbir@gmail.com",
          updatedAt: "2026-02-23T10:05:18.482Z",
          rating: 5,
        },
        {
          _id: "699d60d355ccf27d20166e81",
          hospital_name: "Zhongshan Ophthalmic Center",
          country_name: "China",
          city_name: "Guangzhou",
          provience: "Guangdong",
          photo:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771921108/gtodgtts4pavkmqyttlb.png",
          hospital_type: "public",
          department: ["Cataract", "Glaucoma", "Retina", "Corneal Disease"],
          total_view: 6,
          total_sell: 0,
          createdAt: "2026-02-24T08:17:20.672Z",
          createdBy: "sabbir@gmail.com",
          updatedAt: "2026-02-24T08:17:20.672Z",
          rating: 5,
        },
        {
          _id: "699ea2ec5487a7e1fd83c5d0",
          hospital_name: "Shenzhen Hengsheng Hospital",
          country_name: "China",
          city_name: "Guangzhou",
          provience: "Guangdong",
          photo:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1772003742/cwcln5eigjswbootpmyt.jpg",
          hospital_type: "private",
          department: ["Pediatrics", "Obstetrics", "IVF", "Rehabilitation"],
          total_view: 2,
          total_sell: 0,
          createdAt: "2026-02-25T07:14:24.856Z",
          createdBy: "sabbir@gmail.com",
          updatedAt: "2026-02-25T07:14:24.856Z",
          rating: 5,
        },
      ];
      setPackages(mockPackages);
      setFilteredPackages(mockPackages);
    } else {
      setPackages(initialPackages);
      setFilteredPackages(initialPackages);
    }
  }, [initialPackages]);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...packages];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.department.some((dept) =>
            dept.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter((pkg) => pkg.hospital_type === filterType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.hospital_name.localeCompare(b.hospital_name);
        case "views":
          return b.total_view - a.total_view;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredPackages(filtered);
    setCurrentPage(1);
  }, [searchTerm, packages, filterType, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  // Selection handlers
  const togglePackageSelection = (packageId: string) => {
    const newSelection = new Set(selectedPackages);
    if (newSelection.has(packageId)) {
      newSelection.delete(packageId);
    } else {
      newSelection.add(packageId);
    }
    setSelectedPackages(newSelection);
  };

  const toggleAllPackages = () => {
    if (selectedPackages.size === currentPackages.length) {
      setSelectedPackages(new Set());
    } else {
      const newSelection = new Set(currentPackages.map((p) => p._id));
      setSelectedPackages(newSelection);
    }
  };

  const toggleB2BUserSelection = (userId: string) => {
    const newSelection = new Set(selectedB2BUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedB2BUsers(newSelection);
  };

  // Assignment handlers
  const handleSingleAssign = (pkg: HospitalPackage, user: B2BUser) => {
    // In real app, make API call here
    
    setNotification({
      type: "success",
      message: `Successfully assigned "${pkg.hospital_name}" to ${user.name}`,
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBulkAssign =async () => {
    console.log({ handleBulk: "click" });
    // if (selectedB2BUsers.size === 0) {
    //   setNotification({
    //     type: "error",
    //     message: "Please select at least one B2B user",
    //   });
    //   setTimeout(() => setNotification(null), 3000);
    //   return;
    // }

    try {
      if (selectedPackages.size === 0) {
        setNotification({
          type: "error",
          message: "Please select at least one package",
        });
        setTimeout(() => setNotification(null), 3000);
        return;
      }

   

      const assignAblePackages = Array.from(selectedPackages);

  

      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b/created-medical-package`,{
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify(assignAblePackages)
      });

      const result = await res.json();

      if(!result.success){
        toast.error(`find error: ${result.message}`)
      }


   

      toast.success(`Successfully assigned ${selectedPackages.size} package(s)`)
    //   setNotification({
    //     type: "success",
    //     message: `Successfully assigned ${selectedPackages.size} package(s)`,
    //   });
      setTimeout(() => setNotification(null), 3000);
      setShowBulkAssign(false);
      setSelectedPackages(new Set());
      setSelectedB2BUsers(new Set());
    } catch (err) {
      console.log(err);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg animate-slideIn ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <Check size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <p>{notification.message}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Hospital Packages
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and assign packages to B2B users
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {selectedPackages.size > 0 && (
              <button
                onClick={() => setShowBulkAssign(true)}
                className="inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Users size={18} className="mr-2" />
                Bulk Assign ({selectedPackages.size})
              </button>
            )}
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
              <Download size={18} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-2 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search hospitals, departments, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as "all" | "public" | "private")
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
            >
              <option value="all">All Hospitals</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <Filter
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "name" | "views" | "rating" | "newest",
                )
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="name">Name A-Z</option>
              <option value="views">Most Viewed</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Packages</p>
            <p className="text-2xl font-bold text-gray-900">
              {packages.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Public Hospitals</p>
            <p className="text-2xl font-bold text-gray-900">
              {packages.filter((p) => p.hospital_type === "public").length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Private Hospitals</p>
            <p className="text-2xl font-bold text-gray-900">
              {packages.filter((p) => p.hospital_type === "private").length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Views</p>
            <p className="text-2xl font-bold text-gray-900">
              {packages.reduce((sum, p) => sum + p.total_view, 0)}
            </p>
          </div>
        </div>

        {/* Main Table - Desktop View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={toggleAllPackages}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      {selectedPackages.size === currentPackages.length ? (
                        <CheckSquare size={20} className="text-red-600" />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departments
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPackages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePackageSelection(pkg._id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        {selectedPackages.has(pkg._id) ? (
                          <CheckSquare size={20} className="text-red-600" />
                        ) : (
                          <Square size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={pkg.photo}
                            alt={pkg.hospital_name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {pkg.hospital_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {pkg._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {pkg.city_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {pkg.country_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          pkg.hospital_type === "public"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {pkg.hospital_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {pkg.department.slice(0, 2).map((dept, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            {dept.length > 15
                              ? dept.substring(0, 15) + "..."
                              : dept}
                          </span>
                        ))}
                        {pkg.department.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            +{pkg.department.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Eye size={16} className="mr-1" />
                          {pkg.total_view}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <TrendingUp size={16} className="mr-1" />
                          {pkg.total_sell}
                        </div>
                        <div className="flex items-center text-sm text-yellow-500">
                          <Star size={16} className="mr-1 fill-current" />
                          {pkg.rating}
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowUserDropdown(
                              showUserDropdown === pkg._id ? null : pkg._id,
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <UserPlus size={18} className="text-gray-600" />
                        </button>

                        
                        {showUserDropdown === pkg._id && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                            <div className="p-3 border-b border-gray-200">
                              <p className="text-sm font-medium text-gray-900">
                                Assign to B2B User
                              </p>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                              {b2bUsers
                                .filter((u) => u.status === "active")
                                .map((user) => (
                                  <button
                                    key={user.id}
                                    onClick={() => {
                                      handleSingleAssign(pkg, user);
                                      setShowUserDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                                  >
                                    <p className="text-sm font-medium text-gray-900">
                                      {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {user.company}
                                    </p>
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {currentPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => togglePackageSelection(pkg._id)}
                      className="shrink-0"
                    >
                      {selectedPackages.has(pkg._id) ? (
                        <CheckSquare size={20} className="text-red-600" />
                      ) : (
                        <Square size={20} className="text-gray-400" />
                      )}
                    </button>
                    <div className="h-12 w-12 shrink-0">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={pkg.photo}
                        alt={pkg.hospital_name}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {pkg.hospital_name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {pkg._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      pkg.hospital_type === "public"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {pkg.hospital_type}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2 shrink-0" />
                  <span>
                    {pkg.city_name}, {pkg.country_name}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Eye size={16} className="mr-1" />
                    {pkg.total_view}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp size={16} className="mr-1" />
                    {pkg.total_sell}
                  </div>
                  <div className="flex items-center text-sm text-yellow-500">
                    <Star size={16} className="mr-1 fill-current" />
                    {pkg.rating}
                  </div>
                </div>

                {/* Departments Preview */}
                <button
                  onClick={() =>
                    setExpandedPackage(
                      expandedPackage === pkg._id ? null : pkg._id,
                    )
                  }
                  className="w-full flex items-center justify-between text-sm text-gray-700 mb-2"
                >
                  <span className="font-medium">
                    Departments ({pkg.department.length})
                  </span>
                  {expandedPackage === pkg._id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {expandedPackage === pkg._id ? (
                  <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                    {pkg.department.map((dept, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-gray-600 py-1 border-b border-gray-100 last:border-0"
                      >
                        • {dept}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pkg.department.slice(0, 3).map((dept, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        {dept.length > 12
                          ? dept.substring(0, 12) + "..."
                          : dept}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                {/* <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      setSelectedUser(
                        b2bUsers.find((u) => u.status === "active") || null,
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Assign
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors">
                    <Eye size={16} className="mr-2" />
                    Details
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredPackages.length)} of{" "}
            {filteredPackages.length} results
          </div>

          <div className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      currentPage === pageNum
                        ? "bg-red-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Assign Modal */}
      {showBulkAssign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Bulk Assign Packages
              </h2>
              <button
                onClick={() => setShowBulkAssign(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 180px)" }}
            >
              {/* Selected Packages Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Packages ({selectedPackages.size})
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  {packages
                    .filter((p) => selectedPackages.has(p._id))
                    .map((pkg) => (
                      <div key={pkg._id} className="text-sm text-gray-600 py-1">
                        • {pkg.hospital_name}
                      </div>
                    ))}
                </div>
              </div>

              {/* B2B Users Selection */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Select B2B Users
                </h3>
                <div className="border border-gray-200 rounded-lg divide-y">
                  {b2bUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        user.status === "inactive" ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            user.status === "active" &&
                            toggleB2BUserSelection(user.id)
                          }
                          disabled={user.status === "inactive"}
                        >
                          {selectedB2BUsers.has(user.id) ? (
                            <CheckSquare size={20} className="text-red-600" />
                          ) : (
                            <Square
                              size={20}
                              className={
                                user.status === "active"
                                  ? "text-gray-400"
                                  : "text-gray-200"
                              }
                            />
                          )}
                        </button>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.company}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setShowBulkAssign(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAssign}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Users size={18} className="mr-2" />
                Assign to {selectedB2BUsers.size} User
                {selectedB2BUsers.size !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalPackageManager;

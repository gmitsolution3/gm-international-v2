// components/admin/CantonFairPackageManager.tsx
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
  Calendar,
  MapPin,
  DollarSign,
  Eye,
  Filter,
  Download,
  CheckSquare,
  Square,
  AlertCircle,
  UserPlus,
  Mail,
  Phone,
  Building,
  Clock,
  Globe,
  CreditCard,
  Plane,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Package,
  CalendarRange,
  Users2,
  Wallet,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";
import { FaPassport } from "react-icons/fa";
import { toast } from "sonner";

// Types based on your data structure
interface Phase {
  phaseNumber: number | string;
  startDate: string;
  endDate: string;
  returnCity: string;
}

interface CantonFairPackage {
  _id: string;
  packageName: string;
  eventName: string;
  duration: string;
  country: string;
  phases: Phase[];
  maxPrice: number;
  minimumPax: number;
  image: string;
  createdAt: string;
  createdBy: string;
  packageStatus: "active" | "inactive" | "draft";
  paxPrice?: number;
  isWithVisaAndAirTicket: boolean;
}

interface B2BUser {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: "active" | "inactive";
  assignedPackages: string[];
  creditLimit?: number;
  specializations?: string[];
}

// Mock B2B Users Data
const mockB2BUsers: B2BUser[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@travel-india.com",
    company: "Travel India Solutions",
    phone: "+91 98765 43210",
    status: "active",
    assignedPackages: ["698b606fec910099f705852a"],
    creditLimit: 500000,
    specializations: ["Canton Fair", "Business Tours"],
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@asiantravel.sg",
    company: "Asian Travel Singapore",
    phone: "+65 9123 4567",
    status: "active",
    assignedPackages: [],
    creditLimit: 300000,
    specializations: ["Trade Fairs", "Corporate Travel"],
  },
  {
    id: "3",
    name: "Mohammed Al-Rashid",
    email: "m.alrashid@dubaitravel.ae",
    company: "Dubai Travel & Tourism",
    phone: "+971 50 123 4567",
    status: "active",
    assignedPackages: ["698dcc8fa3bfe12170ad1143", "698dcd9a3930d7c5c71f7704"],
    creditLimit: 750000,
    specializations: ["Luxury Travel", "Exhibitions"],
  },
  {
    id: "4",
    name: "Linda Watson",
    email: "l.watson@globaltours.uk",
    company: "Global Tours UK",
    phone: "+44 7700 900123",
    status: "inactive",
    assignedPackages: [],
    creditLimit: 250000,
    specializations: ["Group Tours"],
  },
  {
    id: "5",
    name: "Dr. Wei Zhang",
    email: "wei.zhang@chinatravel.com",
    company: "China Travel International",
    phone: "+86 138 0013 8000",
    status: "active",
    assignedPackages: ["69903601e66f41f9b0648ae6"],
    creditLimit: 1000000,
    specializations: ["Canton Fair", "Medical Tourism", "Business Travel"],
  },
  {
    id: "6",
    name: "Maria Garcia",
    email: "maria@spainbusiness.com",
    company: "Spain Business Travel",
    phone: "+34 612 345 678",
    status: "active",
    assignedPackages: [],
    creditLimit: 400000,
    specializations: ["European Market", "Trade Fairs"],
  },
];

interface CantonFairPackageManagerProps {
  initialPackages?: CantonFairPackage[];
}

const CantonFairPackageManager: React.FC<CantonFairPackageManagerProps> = ({
  initialPackages = [],
}) => {
  // State management
  const [packages, setPackages] =
    useState<CantonFairPackage[]>(initialPackages);
  const [filteredPackages, setFilteredPackages] =
    useState<CantonFairPackage[]>(initialPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(
    new Set(),
  );
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [filterVisa, setFilterVisa] = useState<"all" | "with" | "without">(
    "all",
  );
  const [sortBy, setSortBy] = useState<"name" | "price" | "date" | "pax">(
    "date",
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
  const [showQuickView, setShowQuickView] = useState<CantonFairPackage | null>(
    null,
  );

  // Load initial data
  useEffect(() => {
    if (initialPackages.length === 0) {
      // Use your provided data
      const mockPackages: CantonFairPackage[] = [
        {
          _id: "698b606fec910099f705852a",
          packageName: "Canton Fair Package 01",
          eventName: "China Canton Fair Phase 1",
          duration: "6 Night 7 Days",
          country: "China",
          phases: [
            {
              phaseNumber: 1,
              startDate: "2026-04-15",
              endDate: "2026-04-19",
              returnCity: "Guangzhou",
            },
          ],
          maxPrice: 120000,
          minimumPax: 2,
          image:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1770902910/xvdvw9jed1l6tjvme3u6.jpg",
          createdAt: "2026-02-10T16:37:59.782Z",
          createdBy: "sabbir@gmail.com",
          packageStatus: "active",
          paxPrice: 1289001,
          isWithVisaAndAirTicket: true,
        },
        {
          _id: "698dcc8fa3bfe12170ad1143",
          packageName: "Canton Fair Package 02",
          eventName: "China Canton Fair Phase 2",
          duration: "6 Night 7 Days",
          country: "China",
          phases: [
            {
              phaseNumber: "2",
              startDate: "23 April",
              endDate: "27 April",
              returnCity: "Guangzhou",
            },
          ],
          maxPrice: 120000,
          minimumPax: 2,
          image:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1770900521/ndxrfgskhzovjvltipuh.jpg",
          createdAt: "2026-02-12T12:47:16.436Z",
          createdBy: "sabbir@gmail.com",
          packageStatus: "active",
          isWithVisaAndAirTicket: true,
        },
        {
          _id: "698dcd9a3930d7c5c71f7704",
          packageName: "Canton Fair Package 03",
          eventName: "China Canton Fair Phase 3",
          duration: "6 Night 7 Days",
          country: "China",
          phases: [
            {
              phaseNumber: "3",
              startDate: "1 May",
              endDate: "5 May",
              returnCity: "Guangzhou",
            },
          ],
          maxPrice: 120000,
          minimumPax: 2,
          image:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771411304/dgjor88zp6aslejsrucz.png",
          createdAt: "2026-02-12T12:52:03.592Z",
          createdBy: "sabbir@gmail.com",
          packageStatus: "active",
          isWithVisaAndAirTicket: true,
        },
        {
          _id: "69903601e66f41f9b0648ae6",
          packageName: "Canton Fair Package 1",
          eventName: "Canton Fair Phase 1",
          duration: "6 Night 7 Days",
          country: "China",
          phases: [
            {
              phaseNumber: 1,
              startDate: "15 April",
              endDate: "19 April",
              returnCity: "Dhaka",
            },
          ],
          maxPrice: 57999,
          minimumPax: 2,
          image:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771076750/is5e2lwp9almry2bvefs.jpg",
          createdAt: "2026-02-14T08:43:15.721Z",
          createdBy: "sabbir@gmail.com",
          packageStatus: "active",
          isWithVisaAndAirTicket: false,
        },
        {
          _id: "69907d30cd158f024d7594d2",
          packageName: "Canton Fair Package 2",
          eventName: "China Canton Fair Phase 2",
          duration: "6 Night 7 Days",
          country: "China",
          phases: [
            {
              phaseNumber: "2",
              startDate: "23 April",
              endDate: "27 April",
              returnCity: "Dhaka",
            },
          ],
          maxPrice: 57999,
          minimumPax: 2,
          image:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771076827/swajuehhlutwg4jog8yh.png",
          createdAt: "2026-02-14T13:46:30.567Z",
          createdBy: "sabbir@gmail.com",
          packageStatus: "active",
          isWithVisaAndAirTicket: false,
        },
        {
          _id: "69907dc19c12a6b65220bae4",
          packageName: "Canton Fair Package 3",
          eventName: "China Canton Fair Phase 3",
          duration: "6 Night 7 Days",
          country: "China",
          phases: [
            {
              phaseNumber: "3",
              startDate: "1 May",
              endDate: "5 May",
              returnCity: "Dhaka",
            },
          ],
          maxPrice: 57999,
          minimumPax: 2,
          image:
            "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771076992/wiqzmdvq4luynudzaacg.jpg",
          createdAt: "2026-02-14T13:49:15.225Z",
          createdBy: "sabbir@gmail.com",
          packageStatus: "active",
          isWithVisaAndAirTicket: false,
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
          pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.phases.some((phase) =>
            phase.returnCity.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((pkg) => pkg.packageStatus === filterStatus);
    }

    // Apply visa filter
    if (filterVisa !== "all") {
      filtered = filtered.filter((pkg) =>
        filterVisa === "with"
          ? pkg.isWithVisaAndAirTicket
          : !pkg.isWithVisaAndAirTicket,
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.packageName.localeCompare(b.packageName);
        case "price":
          return b.maxPrice - a.maxPrice;
        case "pax":
          return b.minimumPax - a.minimumPax;
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredPackages(filtered);
    setCurrentPage(1);
  }, [searchTerm, packages, filterStatus, filterVisa, sortBy]);

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
  const handleSingleAssign = (pkg: CantonFairPackage, user: B2BUser) => {
   
    setNotification({
      type: "success",
      message: `Successfully assigned "${pkg.packageName}" to ${user.name}`,
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBulkAssign = async () => {
    if (selectedPackages.size === 0) {
      setNotification({
        type: "error",
        message: "Please select at least one package",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    try {
      const assignAblePackages = Array.from(selectedPackages);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b/created-business-package`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assignAblePackages),
        },
      );

      const result = await res.json();

      if (!result.success) {
        toast.error(`find error: ${result.message}`);
        return
      }

      toast.success(
        result.message ||
          ` Successfully assigned ${selectedPackages.size} package(s)`,
      );
      setTimeout(() => setNotification(null), 3000);
      setShowBulkAssign(false);
      setSelectedPackages(new Set());
      setSelectedB2BUsers(new Set());
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
    <div className="min-h-screen ">
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
              Canton Fair Packages
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and assign trade fair packages to B2B partners
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {packages.length}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <Package size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Packages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {packages.filter((p) => p.packageStatus === "active").length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <BadgeCheck size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Visa/Air</p>
                <p className="text-2xl font-bold text-gray-900">
                  {packages.filter((p) => p.isWithVisaAndAirTicket).length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Plane size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(
                    packages.reduce((sum, p) => sum + p.maxPrice, 0) /
                      packages.length,
                  )}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Wallet size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-2 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search packages, events, cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end gap-8">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value as "all" | "active" | "inactive",
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white mx-4"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Filter
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>

            {/* Visa Filter */}
            <div className="relative">
              <select
                value={filterVisa}
                onChange={(e) =>
                  setFilterVisa(e.target.value as "all" | "with" | "without")
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
              >
                <option value="all">All Packages</option>
                <option value="with">With Visa/Air</option>
                <option value="without">Without Visa/Air</option>
              </select>
              <Globe
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "name" | "price" | "date" | "pax")
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
              >
                <option value="date">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="price">Highest Price</option>
                <option value="pax">Min. Pax</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
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
                    Package
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phases
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
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
                            src={pkg.image}
                            alt={pkg.packageName}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {pkg.packageName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pkg.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {pkg.eventName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin size={14} className="mr-1" />
                        {pkg.country}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {pkg.phases.map((phase, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-xs text-gray-600"
                          >
                            <Calendar size={12} className="mr-1 text-red-500" />
                            <span>
                              Phase {phase.phaseNumber}: {phase.startDate} -{" "}
                              {phase.endDate}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(pkg.maxPrice)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Min. {pkg.minimumPax} pax
                      </div>
                      {pkg.paxPrice && (
                        <div className="text-xs text-green-600">
                          Per pax: {formatPrice(pkg.paxPrice)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span
                          className={`block px-2 py-1 text-xs font-medium rounded-full text-center ${
                            pkg.packageStatus === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {pkg.packageStatus}
                        </span>
                        {pkg.isWithVisaAndAirTicket && (
                          <span className="block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 text-center">
                            Visa + Air
                          </span>
                        )}
                      </div>
                    </td>
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
                        src={pkg.image}
                        alt={pkg.packageName}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {pkg.packageName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {pkg.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full text-center ${
                        pkg.packageStatus === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pkg.packageStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Event Name */}
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Calendar size={16} className="mr-2 text-red-500" />
                  <span className="font-medium">{pkg.eventName}</span>
                </div>

                {/* Phases */}
                <button
                  onClick={() =>
                    setExpandedPackage(
                      expandedPackage === pkg._id ? null : pkg._id,
                    )
                  }
                  className="w-full flex items-center justify-between text-sm text-gray-700 mb-2"
                >
                  <span className="font-medium">
                    Phases ({pkg.phases.length})
                  </span>
                  {expandedPackage === pkg._id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {expandedPackage === pkg._id ? (
                  <div className="mt-2 space-y-2 mb-3">
                    {pkg.phases.map((phase, idx) => (
                      <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                        <p className="font-medium">Phase {phase.phaseNumber}</p>
                        <p className="text-gray-600">
                          {phase.startDate} - {phase.endDate}
                        </p>
                        <p className="text-gray-500">
                          Return: {phase.returnCity}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pkg.phases.map((phase, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded-full"
                      >
                        Phase {phase.phaseNumber}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Pax */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Max Price</p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatPrice(pkg.maxPrice)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Min Pax</p>
                    <p className="text-sm font-bold text-gray-900">
                      {pkg.minimumPax} persons
                    </p>
                  </div>
                </div>

                {/* Visa Badge */}
                {pkg.isWithVisaAndAirTicket && (
                  <div className="flex items-center gap-1 mb-3 text-blue-600 bg-blue-50 p-2 rounded">
                    <Plane size={14} />
                    <FaPassport size={14} />
                    <span className="text-xs font-medium ml-1">
                      Includes Visa & Air Ticket
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                {/* <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setShowBulkAssign(true)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Assign
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
                <div className="rounded-lg p-4 max-h-40 overflow-y-auto">
                  {packages
                    .filter((p) => selectedPackages.has(p._id))
                    .map((pkg) => (
                      <div
                        key={pkg._id}
                        className="text-sm text-gray-600 py-1 flex items-center justify-between"
                      >
                        <span>• {pkg.packageName}</span>
                        <span className="text-xs text-gray-400">
                          {pkg.eventName}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
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
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Package Details
              </h2>
              <button
                onClick={() => setShowQuickView(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <img
                  src={showQuickView.image}
                  alt={showQuickView.packageName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {showQuickView.packageName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {showQuickView.eventName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium">
                      {showQuickView.duration}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-500">Country</p>
                    <p className="text-sm font-medium">
                      {showQuickView.country}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-500">Max Price</p>
                    <p className="text-sm font-medium text-red-600">
                      {formatPrice(showQuickView.maxPrice)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-500">Min Pax</p>
                    <p className="text-sm font-medium">
                      {showQuickView.minimumPax} persons
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Phases
                  </h4>
                  <div className="space-y-2">
                    {showQuickView.phases.map((phase, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <p className="text-sm font-medium">
                          Phase {phase.phaseNumber}
                        </p>
                        <p className="text-xs text-gray-600">
                          Start: {phase.startDate}
                        </p>
                        <p className="text-xs text-gray-600">
                          End: {phase.endDate}
                        </p>
                        <p className="text-xs text-gray-600">
                          Return City: {phase.returnCity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {showQuickView.paxPrice && (
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-blue-800">
                      Per Pax Price: {formatPrice(showQuickView.paxPrice)}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      showQuickView.packageStatus === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {showQuickView.packageStatus}
                  </span>

                  {showQuickView.isWithVisaAndAirTicket && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      Includes Visa & Air Ticket
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400">
                  Created by: {showQuickView.createdBy} on{" "}
                  {formatDate(showQuickView.createdAt)}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowQuickView(null)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CantonFairPackageManager;

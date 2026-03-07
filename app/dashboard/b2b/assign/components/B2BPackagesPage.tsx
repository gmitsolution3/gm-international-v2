"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Download,
  Filter,
  Search,
  Users,
  Package,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import B2BPackagesTable from "./B2BPackagesTable";
import { toast } from "sonner";

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

const B2BPackagesPage = ({ data }: { data: Package[] }) => {
  const [packages, setPackages] = useState<Package[]>(data || []);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // API Endpoint - Update this with your actual backend URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  // Fetch packages from backend
//   const fetchPackages = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // API Endpoint: GET /api/b2b/packages
//       const response = await fetch(`${API_BASE_URL}/b2b/packages`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // Add authentication headers if needed
//           // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.success && result.data) {
//         setPackages(result.data);
//         setFilteredPackages(result.data);
//       } else {
//         throw new Error(result.message || "Failed to fetch packages");
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch packages");
//       console.error("Error fetching packages:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPackages(packages);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = packages.filter(
        (pkg) =>
          pkg.p_title.toLowerCase().includes(term) ||
          pkg._id.toLowerCase().includes(term) ||
          pkg.country.some((c) => c.toLowerCase().includes(term)) ||
          pkg.createdBy.toLowerCase().includes(term),
      );
      setFilteredPackages(filtered);
    }
  }, [searchTerm, packages]);

  // Handle assign to B2B
  const handleAssignToB2B = async (selectedIds: string[]) => {
   
    setSelectedIds(selectedIds);
    setShowAssignModal(true);
  };

  // Confirm B2B assignment
  const confirmAssignToB2B = async () => {
    try {
      // API Endpoint: POST /api/b2b/assign
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-tourist/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            packageIds: selectedIds,
            action: "assign_to_b2b",
            createdAt: new Date(),
            updatedAt: new Date()
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast.success(`Successfully assigned ${selectedIds.length} packages to B2B`);
        setShowAssignModal(false);
        // fetchPackages(); // Refresh the list
      } else {
        throw new Error(result.message || "Failed to assign packages");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to assign packages");
    }
  };

  // Handle edit package
  const handleEdit = (pkg: Package) => {
    // Navigate to edit page or open modal
    console.log("Edit package:", pkg);
    // window.location.href = `/b2b-packages/edit/${pkg._id}`;
  };

  // Handle delete package
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      // API Endpoint: DELETE /api/b2b/packages/:id
      const response = await fetch(`${API_BASE_URL}/b2b/packages/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        alert("Package deleted successfully");
        // fetchPackages(); // Refresh the list
      } else {
        throw new Error(result.message || "Failed to delete package");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete package");
    }
  };

  // Handle view package
  const handleView = (pkg: Package) => {
    console.log("View package:", pkg);
    // Open view modal or navigate to details page
    // window.location.href = `/b2b-packages/${pkg._id}`;
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Title",
      "Regular Price",
      "B2B Price",
      "Duration",
      "Members",
      "Air Ticket",
      "Country",
      "Created By",
    ];
    const csvData = filteredPackages.map((pkg) => [
      pkg._id,
      pkg.p_title,
      pkg.p_price,
      pkg.b2b_price,
      pkg.duration,
      pkg.number_of_member,
      pkg.is_with_air_ticket ? "Yes" : "No",
      pkg.country.join("; "),
      pkg.createdBy,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `b2b-packages-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="text-red-600" />
          B2B Package Management
        </h1>
        <p className="text-gray-600 mt-1">
          Manage and assign tour packages for B2B partners
        </p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title="Export to CSV"
            >
              <Download size={18} className="text-gray-600" />
            </button>
            {/* <button
              onClick={fetchPackages}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} className="text-gray-600" />
            </button> */}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
              <Plus size={18} />
              Add New Package
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {/* {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-600" size={20} />
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchPackages}
            className="ml-auto px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )} */}

      {/* Table */}
      <B2BPackagesTable
        packages={filteredPackages}
        onAssignToB2B={handleAssignToB2B}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        isLoading={isLoading}
      />

      {/* Assign to B2B Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="text-red-600" />
              Assign to B2B
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to assign {selectedIds.length} package(s) to
              B2B partners?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssignToB2B}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2BPackagesPage;

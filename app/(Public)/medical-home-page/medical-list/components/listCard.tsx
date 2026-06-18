// app/medical/list/components/listCard.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, Sliders, X, ChevronDown, Filter } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import HospitalCard from "../../components/HospitalCard";
import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";
import FilterSidebar from "./FilterSidebar";
import { toast } from "sonner";
import { ServicesSkeleton } from "@/app/components/skeleton/ServicesSkeleton";

interface FilterInfo {
  country: string[];
  department: string[];
  areaInfo: {
    provience: string[];
    city: string[];
  };
}

export default function ListCard({
  initialHospitals,
  totalCount,
  filterInfo,
}: {
  initialHospitals: MedicalFormData[];
  totalCount: number;
  filterInfo: FilterInfo;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    country: searchParams.get("country") || "",
    department: searchParams.get("department") || "",
    province: searchParams.get("province") || "",
    city: searchParams.get("city") || "",
  });
  const [tempFilters, setTempFilters] = useState(selectedFilters);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [searchData, setSearchData] = useState<MedicalFormData[] | []>([]);
  const [searchStatus, setSearchStatus] = useState(true);

  // Calculate active filters count
  useEffect(() => {
    const count = Object.values(selectedFilters).filter(
      (value) => value && value !== "",
    ).length;
    setActiveFilterCount(count);
  }, [selectedFilters]);

  // Update URL with filters
  const updateFilters = useCallback(
    (filters: typeof selectedFilters) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.set("page", "1"); // Reset to first page on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  // Apply filters from sidebar
  const applyFilters = async () => {
    setSelectedFilters(tempFilters);

    updateFilters(tempFilters);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-pkg/api/v1/filtered-medical-list?city=${tempFilters.city}&country=${tempFilters.country}&provience=${tempFilters.province}&dept=${tempFilters.department}`,
      );

      const result = await res.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setSearchData(result.data);
      setSearchStatus(result.success);

      setIsFilterOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    const emptyFilters = {
      country: "",
      department: "",
      province: "",
      city: "",
      search: "",
    };
    setSelectedFilters(emptyFilters);
    setTempFilters(emptyFilters);
    updateFilters(emptyFilters);
  };

  // Remove a single filter
  const removeFilter = (key: keyof typeof selectedFilters) => {
    const newFilters = { ...selectedFilters, [key]: "" };
    setSelectedFilters(newFilters);
    setTempFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleSearch = async () => {
    if (!search) return;
    setIsSearching(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-pkg/api/v1/get-search-result?search=${search}`,
      );

      const result = await res.json();
      setSearchData(result.data);
      setSearchStatus(result.success);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Drawer */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterInfo={filterInfo}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        applyFilters={applyFilters}
      />

      <div className="max-w-7xl mx-auto py-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="text-gray-900">Popular </span>
              <span className="text-red-600">Hospitals</span>
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {totalCount} hospitals found
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Input */}

            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Search hospitals name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            <div>
              <button
                onClick={() => window.location.reload()}
                className="p-2 border border-red-700 rounded-lg hover:bg-red-700 hover:text-white hover:cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Desktop Filter Info */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600 text-sm bg-white px-4 py-2 rounded-lg border border-gray-300">
              <Sliders className="w-4 h-4 text-red-500" />
              <span>
                {activeFilterCount > 0
                  ? `${activeFilterCount} filters applied`
                  : "No filters applied"}
              </span>
            </div>
          </div>
        </div>

        {/* Active Filters Tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>
            {Object.entries(selectedFilters).map(
              ([key, value]) =>
                value && (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                  >
                    {key}: {value}
                    <button
                      onClick={() =>
                        removeFilter(key as keyof typeof selectedFilters)
                      }
                      className="hover:text-red-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ),
            )}
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Country Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={tempFilters.country}
                  onChange={(e) =>
                    setTempFilters({ ...tempFilters, country: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Countries</option>
                  {filterInfo?.country?.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Province Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Province
                </label>
                <select
                  value={tempFilters.province}
                  onChange={(e) =>
                    setTempFilters({ ...tempFilters, province: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Provinces</option>
                  {filterInfo?.areaInfo?.provience?.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <select
                  value={tempFilters.city}
                  onChange={(e) =>
                    setTempFilters({ ...tempFilters, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {filterInfo?.areaInfo?.city?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={tempFilters.department}
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      department: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Departments</option>
                  {filterInfo?.department?.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apply Button */}
              <button
                onClick={applyFilters}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Hospital Cards Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {isSearching ? (
                <div className="min-h-screen flex items-start scroll-mt-40 mt-20 justify-center px-6">
                  <div className="w-full">
                    <ServicesSkeleton />
                  </div>
                </div>
              ) : searchStatus ? (
                searchData.length > 0 ? (
                  searchData.map((search, index) => (
                    <HospitalCard key={search._id || index} hospital={search} />
                  ))
                ) : (
                  initialHospitals.map((hospital, index) => (
                    <HospitalCard
                      key={hospital._id || index}
                      hospital={hospital}
                    />
                  ))
                )
              ) : (
                <div className="min-h-screen text-2xl text-red-700">
                  {" "}
                  No Data found in DB
                </div>
              )}
              {/* {initialHospitals.map((hospital, index) => (
                <HospitalCard key={hospital._id || index} hospital={hospital} />
              ))} */}
            </div>

            {/* Empty State */}
            {initialHospitals.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600 text-lg">
                  No hospitals found matching your criteria.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {/* {totalCount > 0 && (
              <Pagination totalCount={totalCount} className="mt-8" />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

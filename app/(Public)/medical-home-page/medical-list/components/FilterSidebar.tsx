// app/medical/list/components/FilterSidebar.tsx
"use client";
import { X } from "lucide-react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filterInfo: any;
  tempFilters: any;
  setTempFilters: (filters: any) => void;
  applyFilters: () => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  filterInfo,
  tempFilters,
  setTempFilters,
  applyFilters,
}: FilterSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Country Filter */}
          <div>
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
              {filterInfo?.country?.map((country: string) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Province Filter */}
          <div>
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
              {filterInfo?.areaInfo?.provience?.map((province: string) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
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
              {filterInfo?.areaInfo?.city?.map((city: string) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={tempFilters.department}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, department: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {filterInfo?.department?.map((dept: string) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={() => {
              setTempFilters({
                country: "",
                department: "",
                province: "",
                city: "",
                search: "",
              });
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={() => {
              applyFilters();
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

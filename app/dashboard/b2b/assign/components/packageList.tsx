"use client"

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Types
interface University {
  _id: string;
  isInternationalStudent: boolean;
  universityName: string;
  country: string;
  city: string;
  thumbnail: string;
  startingDate: string;
  deadline: string;
  duration: string;
  language: string;
  applicationFee: string;
  serviceFee: string;
  universityURL: string;
}

interface SelectedUniversities {
  packageId: string[];
  packageCount: number;
  createdAt: string;
  // b2bUserId: string;
  // b2bUserName: string;
  // b2bUserEmail: string;
}

// Utility Functions
const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (amount: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
  }).format(Number(amount));
};

// Main Component
const UniversityApplications = ({
  universities,
 
}: {
  universities: University[]}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleCheckbox = (id: string): void => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (): void => {
    if (selectedIds.length === universities.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(universities.map((uni) => uni._id));
    }
  };

  const handleSaveToDatabase = async (): Promise<void> => {
    if (selectedIds.length === 0) {
      setMessage("Please select at least one university");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);


    const dataToSave: SelectedUniversities = {
      packageId: selectedIds,
      packageCount: selectedIds.length,
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-student-package`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save selections");
      }

      setMessage(
        `✓ Successfully saved ${selectedIds.length} university selection(s)`,
      );
      toast.success(`${dataToSave.packageCount} assign to b2b user`)

    } catch (error) {
      setMessage("Error saving to database. Check console for details.");
      console.error("Error:", error);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-400 mx-auto">
        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              message.includes("✓")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-red-600 text-white border-b border-gray-200">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === universities.length &&
                      universities.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-5 h-5 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold">
                  UNIVERSITY NAME
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold">CITY</th>
                <th className="px-6 py-4 text-left text-sm font-bold">
                  DEADLINE
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold">
                  DURATION
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold">
                  SERVICE FEE
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold">
                  ACTION
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {universities.map((uni, idx) => (
                <tr
                  key={uni._id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    selectedIds.includes(uni._id) ? "bg-red-50" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-6 py-5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(uni._id)}
                      onChange={() => handleCheckbox(uni._id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>

                  {/* University Name */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={uni.thumbnail}
                        alt={uni.universityName}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {uni.universityName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* City */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin
                        size={16}
                        style={{ color: "#CA2328" }}
                        className="shrink-0"
                      />
                      <span>{uni.city}</span>
                    </div>
                  </td>

                  {/* Deadline */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar
                        size={16}
                        style={{ color: "#CA2328" }}
                        className="shrink-0"
                      />
                      <span>{formatDate(uni.deadline)}</span>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock
                        size={16}
                        style={{ color: "#CA2328" }}
                        className="shrink-0"
                      />
                      <span>{uni.duration}</span>
                    </div>
                  </td>

                  {/* Service Fee */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <DollarSign
                        size={16}
                        style={{ color: "#CA2328" }}
                        className="shrink-0"
                      />
                      <span>{formatCurrency(uni.serviceFee)}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5">
                    <a
                      href={uni.universityURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ color: "#CA2328" }}
                    >
                      Visit
                      <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {/* Select All Button for Mobile */}
          <div className="flex gap-3">
            <button
              onClick={handleSelectAll}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "#CA2328" }}
            >
              {selectedIds.length === universities.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          {universities.map((uni) => (
            <div
              key={uni._id}
              className={`bg-white rounded-lg shadow-md p-4 border-l-4 transition-all ${
                selectedIds.includes(uni._id)
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              {/* Checkbox and Image */}
              <div className="flex gap-3 mb-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(uni._id)}
                  onChange={() => handleCheckbox(uni._id)}
                  className="w-5 h-5 cursor-pointer mt-1 shrink-0"
                />
                <img
                  src={uni.thumbnail}
                  alt={uni.universityName}
                  className="w-16 h-16 rounded object-cover"
                />
              </div>

              {/* University Name */}
              <h3 className="font-bold text-gray-900 mb-3 text-sm">
                {uni.universityName}
              </h3>

              {/* Info Grid */}
              <div className="space-y-2 mb-4">
                {/* City */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin
                    size={16}
                    style={{ color: "#CA2328" }}
                    className="shrink-0"
                  />
                  <span>{uni.city}</span>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar
                    size={16}
                    style={{ color: "#CA2328" }}
                    className="shrink-0"
                  />
                  <span>Deadline: {formatDate(uni.deadline)}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock
                    size={16}
                    style={{ color: "#CA2328" }}
                    className="shrink-0"
                  />
                  <span>Duration: {uni.duration}</span>
                </div>

                {/* Service Fee */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <DollarSign
                    size={16}
                    style={{ color: "#CA2328" }}
                    className="shrink-0"
                  />
                  <span>Fee: {formatCurrency(uni.serviceFee)}</span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={uni.universityURL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold text-white transition-all"
                style={{ backgroundColor: "#CA2328" }}
              >
                Visit University
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex gap-3 justify-end">
          <button
            onClick={handleSaveToDatabase}
            disabled={loading || selectedIds.length === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#CA2328" }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>Save Selection ({selectedIds.length})</>
            )}
          </button>
        </div>

        {/* Selection Summary */}
        {selectedIds.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">{selectedIds.length}</span>{" "}
              university
              {selectedIds.length !== 1 ? "ies" : ""} selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityApplications;

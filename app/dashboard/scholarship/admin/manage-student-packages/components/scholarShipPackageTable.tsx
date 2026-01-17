"use client"

import type React from "react"
import { useState } from "react"
import {
  Eye,
  X,
  FileText,
  Check,
  Trash2,
  MapPin,
  GraduationCap,
  DollarSign,
  Globe,
  Clock,
  BookOpen,
  Languages,
  Award,
} from "lucide-react"
import { PackageDescriptionView } from "./PackageDescriptionView"

// Types
interface Country {
  id: number
  name: string
}

interface Scholarship {
  _id: string;
  packagePrice: string;
  universityURL: string;
  deadlineDate: string;
  startingDate: string;
  tuitionFree: string;
  sl_No: string;
  scholarshipDetails: string;
  universitysDescription: string;
  courseName: string;
  applicationRequirement: string;
  idCard: string;
  thumbnail: string;
  selectedCountry: Country;
  universityName: string;
  selectUniversitiesProgram: string;
  selectStudyLevel: string;
  selectDuration: string;
  language: string;
  createdAt: string;
  status?: string;
  country: string;
  applicationFee: string;
  serviceFee: string;
  duration: string;
  description: string;
  universityDescription: string;
  city: string;
  deadline: string;
  isInternationalStudent: boolean
}

const ScholarshipPackageInAdminDashboard: React.FC<{ scholarshipPackage: Scholarship[] }> = ({ scholarshipPackage }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>(scholarshipPackage)

  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const getStatusColor = (status?: string): string => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Inactive":
        return "bg-red-100 text-red-700 border-red-200"
      case "Expired":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-amber-100 text-amber-700 border-amber-200"
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setScholarships((prev) => prev.map((sch) => (sch._id === id ? { ...sch, status: newStatus } : sch)))
      setSelectedScholarship(null)
    } catch (error) {
      console.error("Error updating scholarship status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this scholarship?")) {
      try {
        setScholarships((prev) => prev.filter((sch) => sch._id !== id))
        setSelectedScholarship(null)
      } catch (error) {
        console.error("Error deleting scholarship:", error)
      }
    }
  }

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(Number(amount))
  }



  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4 animate-slide-up">
          {scholarships.map((scholarship, idx) => (
            <div
              key={scholarship._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100 hover:shadow-xl transition-all duration-200"
            >
              <div className="relative h-48">
                <img
                  src={scholarship.thumbnail || "/placeholder.svg"}
                  alt={scholarship.universityName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      scholarship.status
                    )}`}
                  >
                    {scholarship.status || "Active"}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {scholarship.universityName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>{scholarship.country}-</span>
                    <span>{scholarship.city} </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Starting Date</p>
                    <p className="font-semibold text-gray-800 truncate">
                      {scholarship.startingDate}
                    </p>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Deadline</p>
                    <p className="font-semibold text-gray-800">
                      {scholarship.deadline}
                    </p>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Service Fee</p>
                    <p className="font-semibold text-gray-800">
                      {formatCurrency(scholarship.serviceFee)}
                    </p>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Application Fee</p>
                    <p className="font-semibold text-gray-800">
                      {formatCurrency(scholarship.applicationFee)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedScholarship(scholarship)}
                  className="w-full py-2.5 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100 animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Country
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Application Price(NRF)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Service Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {scholarships.map((scholarship, idx) => (
                  <tr
                    key={scholarship._id}
                    className="hover:bg-rose-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={scholarship.thumbnail || "/placeholder.svg"}
                          alt={scholarship.universityName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {scholarship.universityName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700">
                          {scholarship.country}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700 font-semibold">
                      {formatCurrency(scholarship.applicationFee)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">
                      {formatCurrency(scholarship.serviceFee)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          scholarship.status
                        )}`}
                      >
                        {scholarship.status?.toUpperCase() || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-rose-500 to-red-500 text-white hover:shadow-lg hover:scale-110 transition-all duration-200"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-scale-in my-4">
            <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-4 sm:p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Scholarship Details
                </h2>
                <p className="text-rose-100 text-xs sm:text-sm mt-1">
                  ID: {selectedScholarship._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedScholarship(null)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* University Image */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={selectedScholarship.thumbnail || "/placeholder.svg"}
                  alt={selectedScholarship.universityName}
                  className="w-full h-48 sm:h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() =>
                    setSelectedImage(selectedScholarship.thumbnail)
                  }
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4 sm:p-6">
                  <h3 className="text-white text-xl sm:text-2xl font-bold">
                    {selectedScholarship.universityName}
                  </h3>
                  <p className="text-white text-sm sm:text-base opacity-90">
                    {selectedScholarship.country}
                  </p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    <p className="text-xs text-gray-500">Package</p>
                  </div>
                  <p className="font-bold text-base sm:text-lg text-gray-800">
                    {formatCurrency(selectedScholarship.applicationFee)}
                  </p>
                </div>

                <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    <p className="text-xs text-gray-500">Service Fee</p>
                  </div>
                  <p className="font-bold text-base sm:text-lg text-gray-800">
                    {formatCurrency(selectedScholarship.serviceFee)}
                  </p>
                </div>

                <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                  <p className="font-bold text-base sm:text-lg text-gray-800">
                    {selectedScholarship.duration}
                  </p>
                </div>

                <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    <p className="text-xs text-gray-500">Language</p>
                  </div>
                  <p className="font-bold text-base sm:text-lg text-gray-800">
                    {selectedScholarship.language}
                  </p>
                </div>
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    <p className="text-xs text-gray-500">
                      Application Starting Date
                    </p>
                  </div>
                  <p className="font-bold text-base sm:text-lg text-gray-800">
                    {selectedScholarship.startingDate}
                  </p>
                </div>
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    <p className="text-xs text-gray-500">
                      Application Ending Date
                    </p>
                  </div>
                  <p className="font-bold text-base sm:text-lg text-gray-800">
                    {selectedScholarship.deadline}
                  </p>
                </div>
                {selectedScholarship.isInternationalStudent && (
                  <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                      <p className="text-xs text-gray-500">
                        International Student
                      </p>
                    </div>
                    <p className="font-bold text-base sm:text-lg text-gray-800">
                      This Package for international student
                    </p>
                  </div>
                )}
              </div>

              {/* Academic Information */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-4 sm:p-6 border border-red-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  Academic Information
                </h3>
                <div className="">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                    <PackageDescriptionView
                      html={selectedScholarship?.description}
                    />
                  </div>
                </div>
              </section>
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-4 sm:p-6 border border-red-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  University Information
                </h3>
                <div className="w-full">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                    <PackageDescriptionView
                      html={selectedScholarship?.universityDescription}
                    />
                  </div>
                </div>
              </section>

              {/* University URL */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-4 sm:p-6 border border-red-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  University Website
                </h3>
                <a
                  href={selectedScholarship.universityURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-800 underline break-all text-sm sm:text-base font-medium"
                >
                  {selectedScholarship.universityURL}
                </a>
              </section>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() =>
                    handleStatusChange(
                      selectedScholarship._id,
                      selectedScholarship.status === "Active"
                        ? "Inactive"
                        : "Active"
                    )
                  }
                  className="px-4 py-2.5 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {selectedScholarship.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(selectedScholarship._id)}
                  className="px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Full size"
            className="max-w-3xl max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default ScholarshipPackageInAdminDashboard

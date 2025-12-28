
"use client"

import { useState } from "react"
import { Eye, MapPin, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ScholarshipData {
  _id: string
  country: string
  university: string
  studyLevel: string
  universityUrl: string
  introduction: string
  photo: string
}

interface ScholarshipListProps {
  data: ScholarshipData[]
}

export default function ScholarshipUniversityList({ data }: ScholarshipListProps) {
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipData | null>(null)

  const getStudyLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "partial":
        return "bg-rose-100 text-rose-700"
      case "merit":
        return "bg-red-100 text-red-700"
      case "full":
        return "bg-rose-600 text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const StudyLevelBadge = ({ level }: { level: string }) => {
  const styles: Record<string, string> = {
    Partial: "bg-amber-100 text-amber-700 border border-amber-200",
    Merit: "bg-blue-100 text-blue-700 border border-blue-200",
    Full: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  }
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${styles[level] || styles["Partial"]}`}
    >
      {level}
    </span>
  )
}

  
  return (
    <div className="min-h-screen p-3 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden space-y-4">
          {data.map((scholarship, idx) => (
            <div
              key={scholarship._id}
              className="bg-white rounded-lg shadow-md border border-red-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <img
                  src={scholarship.photo || "/placeholder.svg"}
                  alt={scholarship.university}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <StudyLevelBadge level={scholarship.studyLevel} />
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{scholarship.university}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    {scholarship.country}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedScholarship(scholarship)}
                  className="w-full py-2 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet View - Compact Table */}
        <div className="hidden md:block lg:hidden bg-white rounded-lg shadow-md border border-red-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">University</th>
                  <th className="px-4 py-3 text-left font-semibold">Country</th>
                  <th className="px-4 py-3 text-left font-semibold">Level</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((scholarship) => (
                  <tr key={scholarship._id} className="hover:bg-rose-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={scholarship.photo || "/placeholder.svg"}
                          alt={scholarship.university}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className="font-medium text-gray-800 truncate">{scholarship.university}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{scholarship.country}</td>
                    <td className="px-4 py-3">
                      <StudyLevelBadge level={scholarship.studyLevel} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-flex"
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

        {/* Desktop View - Full Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">No.</th>
                  <th className="px-6 py-4 text-left font-semibold">University</th>
                  <th className="px-6 py-4 text-left font-semibold">Country</th>
                  <th className="px-6 py-4 text-left font-semibold">Study Level</th>
                  <th className="px-6 py-4 text-left font-semibold">Website</th>
                  <th className="px-6 py-4 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((scholarship, idx) => (
                  <tr key={scholarship._id} className="hover:bg-rose-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-700 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={scholarship.photo || "/placeholder.svg"}
                          alt={scholarship.university}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className="font-medium text-gray-900">{scholarship.university}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-rose-500" />
                        <span className="text-gray-700">{scholarship.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StudyLevelBadge level={scholarship.studyLevel} />
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={scholarship.universityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-700 font-medium truncate max-w-xs block underline"
                      >
                        Visit
                      </a>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-flex"
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

        {/* Details Modal */}
        {selectedScholarship && (
          <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-4 sm:p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{selectedScholarship.university}</h2>
                  <p className="text-rose-100 text-xs sm:text-sm mt-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {selectedScholarship.country}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* University Image */}
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedScholarship.photo || "/placeholder.svg"}
                    alt={selectedScholarship.university}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                </div>

                {/* Study Level Badge */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-600">Study Level:</label>
                  <StudyLevelBadge level={selectedScholarship.studyLevel} />
                </div>

                {/* Introduction */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {selectedScholarship.introduction}
                  </p>
                </div>

                {/* Website Link */}
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-sm text-gray-600 mb-2">University Website</p>
                  <a
                    href={selectedScholarship.universityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:text-rose-700 font-semibold break-all hover:underline"
                  >
                    {selectedScholarship.universityUrl}
                  </a>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="w-full py-3 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

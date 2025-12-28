"use client"

import { useState } from "react"
import { Eye, MapPin, X, Calendar, DollarSign, User, LinkIcon } from "lucide-react"

interface HospitalTreatment {
  _id: string
  hospitalName: string
  appointmentDate: string
  appointmentFree: string
  treatmentDescription: string
  hospitalWebLink: string
  treatmentDetails: string
  doctorExpertise: string
  photo: string
  country: string
  createdAt: string
  createdBy: string
}


const TreatmentBadge = ({ fee }: { fee: string }) => {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-rose-100 text-rose-700 border border-rose-200">
      {fee}
    </span>
  )
}

export default function AdminMedicalPackage({treatments}: {treatments: HospitalTreatment[]}) {
  const [selectedTreatment, setSelectedTreatment] = useState<HospitalTreatment | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen p-3 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden space-y-4">
          {treatments.map((treatment, idx) => (
            <div
              key={treatment._id}
              className="bg-white rounded-lg shadow-md border border-red-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <img
                  src={treatment.photo || "/placeholder.svg"}
                  alt={treatment.hospitalName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <TreatmentBadge fee={treatment.appointmentFree} />
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{treatment.hospitalName}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    {treatment.country.charAt(0).toUpperCase() + treatment.country.slice(1)}
                  </p>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  {formatDate(treatment.appointmentDate)}
                </div>
                <button
                  onClick={() => setSelectedTreatment(treatment)}
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
                  <th className="px-4 py-3 text-left font-semibold">Hospital</th>
                  <th className="px-4 py-3 text-left font-semibold">Country</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Fee</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {treatments.map((treatment) => (
                  <tr key={treatment._id} className="hover:bg-rose-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={treatment.photo || "/placeholder.svg"}
                          alt={treatment.hospitalName}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className="font-medium text-gray-800 truncate">{treatment.hospitalName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 capitalize">{treatment.country}</td>
                    <td className="px-4 py-3 text-gray-700">{formatDate(treatment.appointmentDate)}</td>
                    <td className="px-4 py-3">
                      <TreatmentBadge fee={treatment.appointmentFree} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedTreatment(treatment)}
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
                  <th className="px-6 py-4 text-left font-semibold">Hospital</th>
                  <th className="px-6 py-4 text-left font-semibold">Country</th>
                  <th className="px-6 py-4 text-left font-semibold">Treatment</th>
                  <th className="px-6 py-4 text-left font-semibold">Appointment</th>
                  <th className="px-6 py-4 text-left font-semibold">Fee</th>
                  <th className="px-6 py-4 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {treatments.map((treatment, idx) => (
                  <tr key={treatment._id} className="hover:bg-rose-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-700 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={treatment.photo || "/placeholder.svg"}
                          alt={treatment.hospitalName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className="font-medium text-gray-900">{treatment.hospitalName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-700">{treatment.country}</td>
                    <td className="px-6 py-4 text-gray-700 truncate max-w-xs">{treatment.treatmentDescription}</td>
                    <td className="px-6 py-4 text-gray-700">{formatDate(treatment.appointmentDate)}</td>
                    <td className="px-6 py-4">
                      <TreatmentBadge fee={treatment.appointmentFree} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedTreatment(treatment)}
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
        {selectedTreatment && (
          <div className="fixed inset-0 backdrop-blur-xl bg-white/10 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-4 sm:p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{selectedTreatment.hospitalName}</h2>
                  <p className="text-rose-100 text-xs sm:text-sm mt-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {selectedTreatment.country.charAt(0).toUpperCase() + selectedTreatment.country.slice(1)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Hospital Image */}
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedTreatment.photo || "/placeholder.svg"}
                    alt={selectedTreatment.hospitalName}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                </div>

                {/* Treatment Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Treatment</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-medium">
                    {selectedTreatment.treatmentDescription}
                  </p>
                </div>

                {/* Key Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">Appointment Date</p>
                    <p className="text-gray-900 font-bold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      {formatDate(selectedTreatment.appointmentDate)}
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">Appointment Fee</p>
                    <p className="text-gray-900 font-bold flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-rose-500" />
                      {selectedTreatment.appointmentFree}
                    </p>
                  </div>
                </div>

                {/* Treatment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Treatment Details</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {selectedTreatment.treatmentDetails}
                  </p>
                </div>

                {/* Doctor Expertise */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Medical Team
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                    {selectedTreatment.doctorExpertise}
                  </p>
                </div>

                {/* Hospital Website Link */}
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-sm text-gray-600 mb-2 font-semibold flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-rose-500" />
                    Hospital Website
                  </p>
                  <a
                    href={selectedTreatment.hospitalWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:text-rose-700 font-semibold break-all hover:underline"
                  >
                    {selectedTreatment.hospitalWebLink}
                  </a>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedTreatment(null)}
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

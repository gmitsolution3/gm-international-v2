"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Calendar,
  Clock,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Eye,
  MapPin,
  CreditCard,
  X,
  User,
  Building2,
  Stethoscope,
  Globe,
  FileText,
  Image,
  Activity,
  Heart,
  Timer,
  BadgeCheck,
  Package,
  Banknote,
} from "lucide-react";
import Link from "next/link";

// Updated TypeScript Interface based on new schema
export interface Appointment {
  _id: string;
  country: string;
  hospital_name: string;
  department: string;
  patientName: string;
  patient_age: string;
  patient_gender: string;
  patient_disease: string;
  disease_duration: string;
  contactNumber: string;
  email: string;
  medical_report: string[];
  recent_photo: string;
  passport_copy: string;
  destinationCountry: string;
  destinationCity: string;
  createdBy: string;
  paymentStatus: string;
  appointmentStatus: "pending" | "confirmed" | "cancelled";
  package_id: string;
  paymentMethod: string;
  createdAt: string;
  paidAt?: string;
  updatedAt?: string;
}

interface ExpandedRowsState {
  [key: string]: boolean;
}

interface AppointmentTableProps {
  appointments?: Appointment[];
  form: string;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments = [],
  form,
}) => {
  const [expandedRows, setExpandedRows] = useState<ExpandedRowsState>({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<Appointment>();
  const [previewAppointment, setPreviewAppointment] =
    useState<Appointment | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const toggleRow = (id: string): void => {
    setExpandedRows((prev: ExpandedRowsState) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmed: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: CheckCircle,
        linear: "from-emerald-400 to-emerald-500",
      },
      Delivered: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: BadgeCheck,
        linear: "from-emerald-400 to-emerald-500",
      },
      paid: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: BadgeCheck,
        linear: "from-emerald-400 to-emerald-500",
      },
      pending: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: AlertCircle,
        linear: "from-amber-400 to-amber-500",
      },
      cancelled: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: X,
        linear: "from-red-400 to-red-500",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDuration = (duration: string): string => {
    if (!duration) return "N/A";
    return duration.replace(/_/g, " ");
  };

  const openPreview = (appointment: Appointment) => {
    setPreviewAppointment(appointment);
    setIsPreviewOpen(true);
  };

  if (appointments.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <FileText className="w-24 h-24 text-red-400 relative" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-rose-600">
          No Appointments Yet
        </h1>
        <p className="text-gray-500 text-center max-w-md">
          There are no appointment submissions at the moment. Please submit a
          form to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-br from-gray-50 via-white to-red-50">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-700 mb-2">
              Medical Applications
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              Manage patient medical applications and appointments
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-red-100">
            <div className="bg-linear-to-br from-red-500 to-rose-600 rounded-xl p-2.5">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-800">
                {appointments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-red-100 animate-slide-up">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-red-500 via-red-600 to-rose-700">
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Patient
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Hospital
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Disease
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Destination
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Payment
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      Status
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt: Appointment, idx: number) => (
                    <tr
                      key={apt._id}
                      className="border-b border-gray-100 hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 animate-row-appear group"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {apt.recent_photo ? (
                            <img
                              src={apt.recent_photo}
                              alt={apt.patientName}
                              className="w-10 h-10 rounded-xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {apt.patientName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <span className="text-sm font-semibold text-gray-800 block">
                              {apt.patientName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {apt.patient_age}y, {apt.patient_gender}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-800 font-medium">
                            {apt.hospital_name}
                          </p>
                          <span className="px-2 py-1 bg-linear-to-r from-red-50 to-rose-50 text-red-700 rounded-lg text-xs font-medium border border-red-200 inline-block">
                            {apt.department}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-800 font-medium">
                            {apt.patient_disease}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {formatDuration(apt.disease_duration)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-800 font-medium flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-gray-400" />
                            {apt.destinationCountry}
                          </p>
                          <p className="text-xs text-gray-500">
                            {apt.destinationCity}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <span
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                              getStatusConfig(apt.paymentStatus).bg
                            } ${getStatusConfig(apt.paymentStatus).text} ${
                              getStatusConfig(apt.paymentStatus).border
                            }`}
                          >
                            {apt.paymentStatus}
                          </span>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Banknote className="w-3 h-3" />
                            {apt.paymentMethod}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 w-fit ${
                            getStatusConfig(apt.appointmentStatus).bg
                          } ${getStatusConfig(apt.appointmentStatus).text} ${
                            getStatusConfig(apt.appointmentStatus).border
                          }`}
                        >
                          {React.createElement(
                            getStatusConfig(apt.appointmentStatus).icon,
                            { size: 14 },
                          )}
                          {apt.appointmentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openPreview(apt)}
                            className="group relative p-2.5 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            title="Preview Details"
                          >
                            <Eye className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                          </button>
                          {form === "edit" && (
                            <Link
                              href={`/dashboard/medical/actions/${apt._id}/edit`}
                            >
                              <button
                                className="group relative p-2.5 rounded-xl bg-linear-to-br from-red-50 to-rose-50 hover:from-red-500 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                title="Edit Application"
                              >
                                <svg
                                  className="w-4 h-4 text-red-600 group-hover:text-white transition-colors"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {appointments.map((apt: Appointment, idx: number) => (
            <div
              key={apt._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up border border-red-100 hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleRow(apt._id)}
                className="bg-linear-to-r from-red-500 via-red-600 to-rose-600 p-4 cursor-pointer relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    {apt.recent_photo ? (
                      <img
                        src={apt.recent_photo}
                        alt={apt.patientName}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white/30 shadow-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg border border-white/30 shadow-lg">
                        {apt.patientName.charAt(0)}
                      </div>
                    )}
                    <div className="text-white">
                      <p className="font-semibold text-lg">{apt.patientName}</p>
                      <p className="text-red-100 text-sm">
                        {apt.patient_age}y, {apt.patient_gender} •{" "}
                        {apt.destinationCity}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-white transition-transform duration-300 ${
                      expandedRows[apt._id] ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="p-4 bg-linear-to-r from-gray-50 to-red-50 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-700 bg-white rounded-xl p-3 shadow-md">
                  <Building2 size={18} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">Hospital</p>
                    <p className="font-semibold text-sm truncate">
                      {apt.hospital_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-white rounded-xl p-3 shadow-md">
                  <Activity size={18} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">Disease</p>
                    <p className="font-semibold text-sm">
                      {apt.patient_disease}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-white rounded-xl p-3 shadow-md">
                  <MapPin size={18} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="font-semibold text-sm">
                      {apt.destinationCountry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-white rounded-xl p-3 shadow-md">
                  <Timer size={18} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold text-sm">
                      {formatDuration(apt.disease_duration)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="px-4 py-3 flex gap-2 flex-wrap">
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 ${
                    getStatusConfig(apt.paymentStatus).bg
                  } ${getStatusConfig(apt.paymentStatus).text} ${
                    getStatusConfig(apt.paymentStatus).border
                  }`}
                >
                  {React.createElement(
                    getStatusConfig(apt.paymentStatus).icon,
                    { size: 14 },
                  )}
                  Payment: {apt.paymentStatus}
                </span>
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 ${
                    getStatusConfig(apt.appointmentStatus).bg
                  } ${getStatusConfig(apt.appointmentStatus).text} ${
                    getStatusConfig(apt.appointmentStatus).border
                  }`}
                >
                  {React.createElement(
                    getStatusConfig(apt.appointmentStatus).icon,
                    { size: 14 },
                  )}
                  Status: {apt.appointmentStatus}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => openPreview(apt)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-linear-to-r from-blue-50 to-cyan-50 hover:from-blue-500 hover:to-cyan-500 text-blue-700 hover:text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                {form === "edit" && (
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectId(apt._id);
                      setModalData(apt);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-linear-to-r from-red-50 to-rose-50 hover:from-red-500 hover:to-rose-600 text-red-700 hover:text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                )}
              </div>

              {/* Expandable Details */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedRows[apt._id]
                    ? "max-h-200 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 space-y-4 bg-linear-to-b from-white to-gray-50">
                  <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-red-500" />
                      Hospital Details
                    </p>
                    <div className="ml-6 space-y-1">
                      <p className="text-gray-600 text-sm">
                        {apt.hospital_name}
                      </p>
                      <p className="text-gray-500 text-xs">{apt.department}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Medical Information
                    </p>
                    <div className="ml-6 space-y-1">
                      <p className="text-gray-600 text-sm">
                        Disease: {apt.patient_disease}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Duration: {formatDuration(apt.disease_duration)}
                      </p>
                      {apt.medical_report && apt.medical_report.length > 0 && (
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <Image className="w-3 h-3" />
                          Medical Reports: {apt.medical_report.length}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-red-500" />
                      Contact Information
                    </p>
                    <div className="space-y-2 ml-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-600">{apt.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-600">
                          {apt.contactNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-red-500" />
                      Destination
                    </p>
                    <div className="ml-6 space-y-1">
                      <p className="text-gray-600 text-sm">
                        {apt.destinationCity}, {apt.destinationCountry}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Country: {apt.country}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <Package className="w-4 h-4 text-red-500" />
                      Additional Details
                    </p>
                    <div className="ml-6 space-y-1 text-sm text-gray-600">
                      <p>Payment: {apt.paymentMethod}</p>
                      <p>Created: {formatDate(apt.createdAt)}</p>
                      {apt.paidAt && <p>Paid: {formatDate(apt.paidAt)}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        {isPreviewOpen && previewAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-up">
              {/* Modal Header */}
              <div className="sticky top-0 bg-linear-to-r from-red-500 via-red-600 to-rose-600 p-6 rounded-t-2xl z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {previewAppointment.recent_photo ? (
                      <img
                        src={previewAppointment.recent_photo}
                        alt={previewAppointment.patientName}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl border border-white/30 shadow-lg">
                        {previewAppointment.patientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {previewAppointment.patientName}
                      </h2>
                      <p className="text-red-100 text-sm">
                        {previewAppointment.patient_age} years •{" "}
                        {previewAppointment.patient_gender}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Status Badges */}
                <div className="flex gap-3 flex-wrap">
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border flex items-center gap-2 ${
                      getStatusConfig(previewAppointment.paymentStatus).bg
                    } ${getStatusConfig(previewAppointment.paymentStatus).text} ${
                      getStatusConfig(previewAppointment.paymentStatus).border
                    }`}
                  >
                    {React.createElement(
                      getStatusConfig(previewAppointment.paymentStatus).icon,
                      { size: 16 },
                    )}
                    Payment: {previewAppointment.paymentStatus}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border flex items-center gap-2 ${
                      getStatusConfig(previewAppointment.appointmentStatus).bg
                    } ${getStatusConfig(previewAppointment.appointmentStatus).text} ${
                      getStatusConfig(previewAppointment.appointmentStatus)
                        .border
                    }`}
                  >
                    {React.createElement(
                      getStatusConfig(previewAppointment.appointmentStatus)
                        .icon,
                      { size: 16 },
                    )}
                    Status: {previewAppointment.appointmentStatus}
                  </span>
                </div>

                {/* Medical Information Section */}
                <div className="bg-linear-to-br from-red-50 to-rose-50 rounded-xl p-6 shadow-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Medical Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">Disease</p>
                      <p className="text-gray-800 font-semibold text-lg">
                        {previewAppointment.patient_disease}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="text-gray-800 font-semibold text-lg">
                        {formatDuration(previewAppointment.disease_duration)}
                      </p>
                    </div>
                  </div>

                  {/* Medical Reports */}
                  {previewAppointment.medical_report &&
                    previewAppointment.medical_report.length > 0 && (
                      <div className="mt-4 bg-white rounded-lg p-4 shadow">
                        <p className="text-xs text-gray-500 mb-3">
                          Medical Reports
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {previewAppointment.medical_report.map(
                            (report, index) => (
                              <a
                                key={index}
                                href={report}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-lg overflow-hidden border-2 border-gray-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl"
                              >
                                <img
                                  src={report}
                                  alt={`Medical Report ${index + 1}`}
                                  className="w-full h-32 object-cover"
                                />
                                <p className="p-2 text-xs text-center text-gray-600 bg-gray-50">
                                  Report {index + 1}
                                </p>
                              </a>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Hospital & Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-gray-50 to-red-50 rounded-xl p-4 shadow-lg border border-red-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Hospital
                    </p>
                    <p className="text-gray-800 font-semibold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-red-500" />
                      {previewAppointment.hospital_name}
                    </p>
                  </div>

                  <div className="bg-linear-to-br from-gray-50 to-red-50 rounded-xl p-4 shadow-lg border border-red-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Department
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {previewAppointment.department}
                    </p>
                  </div>
                </div>

                {/* Destination Information */}
                <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Destination Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">
                        Destination Country
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {previewAppointment.destinationCountry}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">
                        Destination City
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {previewAppointment.destinationCity}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">Country</p>
                      <p className="text-gray-800 font-semibold">
                        {previewAppointment.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">
                        Payment Status
                      </p>
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          getStatusConfig(previewAppointment.paymentStatus).bg
                        } ${getStatusConfig(previewAppointment.paymentStatus).text}`}
                      >
                        {previewAppointment.paymentStatus}
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">
                        Payment Method
                      </p>
                      <p className="text-gray-800 font-semibold flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-green-500" />
                        {previewAppointment.paymentMethod}
                      </p>
                    </div>
                    {previewAppointment.paidAt && (
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-xs text-gray-500 mb-1">Paid At</p>
                        <p className="text-gray-800 font-semibold flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-500" />
                          {formatDate(previewAppointment.paidAt)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents Section */}
                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Image className="w-5 h-5 text-purple-600" />
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previewAppointment.passport_copy && (
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-xs text-gray-500 mb-2">
                          Passport Copy
                        </p>
                        <a
                          href={previewAppointment.passport_copy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all duration-300"
                        >
                          <img
                            src={previewAppointment.passport_copy}
                            alt="Passport Copy"
                            className="w-full h-40 object-cover"
                          />
                        </a>
                      </div>
                    )}
                    {previewAppointment.recent_photo && (
                      <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-xs text-gray-500 mb-2">
                          Recent Photo
                        </p>
                        <div className="rounded-lg overflow-hidden border-2 border-gray-200">
                          <img
                            src={previewAppointment.recent_photo}
                            alt="Recent Photo"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-gray-800 font-medium text-sm flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        {previewAppointment.email}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="text-gray-800 font-medium text-sm flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        {previewAppointment.contactNumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Created By & Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Created By</p>
                    <p className="text-gray-800 font-semibold text-sm">
                      {previewAppointment.createdBy}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Created At</p>
                    <p className="text-gray-800 font-semibold text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(previewAppointment.createdAt)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Package ID</p>
                    <p className="text-gray-800 font-semibold text-sm font-mono">
                      {previewAppointment.package_id?.slice(-8)}...
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-linear-to-r from-gray-50 to-red-50 p-6 rounded-b-2xl border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-white text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-300 border border-gray-300 shadow-lg"
                  >
                    Close
                  </button>
                  {form === "edit" && (
                    <button
                      onClick={() => {
                        setIsPreviewOpen(false);
                        setIsOpen(true);
                        setSelectId(previewAppointment._id);
                        setModalData(previewAppointment);
                      }}
                      className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-red-500 to-rose-600 text-white font-semibold hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Edit Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes row-appear {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-row-appear {
          animation: row-appear 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-up {
          animation: scale-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AppointmentTable;

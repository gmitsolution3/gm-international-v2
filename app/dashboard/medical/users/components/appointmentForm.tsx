import React, { useState } from "react";
import {
  ChevronDown,
  Calendar,
  Clock,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { EditApplication } from "./editApplication";

// TypeScript Interfaces
export interface Appointment {
  _id: string;
  patientName: string;
  doctor: string;
  hospital: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  paymentStatus: "paid" | "pending";
  appointmentStatus: "confirmed" | "pending";
  payment: string;
  email: string;
  contactNumber: string;
  country: string;
  createdAt?: string;
  createdBy?: string;
  document?: string;
}

interface ExpandedRowsState {
  [key: string]: boolean;
}

interface StatusColorProps {
  status: string;
}

// Component Props Interface
interface AppointmentTableProps {
  appointments?: Appointment[];
  form: string;
}

// Component
const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments = [],
  form,
}) => {
  const [expandedRows, setExpandedRows] = useState<ExpandedRowsState>({});
  const [isOpen, setIsOpen] = useState(false);
    const [selectId, setSelectId] = useState<string | null>(null)
    const [modalData, setModalData] = useState<Appointment>()

  const toggleRow = (id: string): void => {
    setExpandedRows((prev: ExpandedRowsState) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const getStatusBgColor = (status: string): string => {
    return status === "confirmed" || status === "paid"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen text-red-200 flex justify-center items-center">
        <h1 className="text-2xl text-red-200">
          have not any appoint form. please submit the form
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
          Appointments form
        </h1>
        <p className="text-gray-600">Manage your medical appointments</p>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-red-500 to-[#CA2328] text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Doctor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Hospital
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  {form === "edit" && (
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt: Appointment, idx: number) => (
                  <tr
                    key={apt._id}
                    className={`border-b border-gray-200 hover:bg-blue-50 transition-all duration-300 animate-row-appear`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {apt.patientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {apt.doctor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {apt.hospital}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {apt.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div>{formatDate(apt.appointmentDate)}</div>
                      <div className="text-gray-500 text-xs">
                        {apt.appointmentTime}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(
                          apt.paymentStatus
                        )}`}
                      >
                        {apt.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getStatusBgColor(
                          apt.appointmentStatus
                        )}`}
                      >
                        {apt.appointmentStatus === "confirmed" ? (
                          <CheckCircle size={14} />
                        ) : (
                          <AlertCircle size={14} />
                        )}
                        {apt.appointmentStatus}
                      </span>
                    </td>
                    {form === "edit" && (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            setSelectId(apt._id);
                            setModalData(apt);
                          }}
                          className="px-3 py-2 rounded-lg border-2 border-red-700 hover:bg-red-700 hover:text-white cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="md:hidden space-y-4">
          {appointments.map((apt: Appointment, idx: number) => (
            <div
              key={apt._id}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleRow(apt._id)}
                className="bg-linear-to-r from-red-500 to-[#CA2328] p-4 cursor-pointer hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <p className="font-semibold text-lg">{apt.patientName}</p>
                    <p className="text-blue-100 text-sm">{apt.doctor}</p>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-white transition-transform duration-300 ${
                      expandedRows[apt._id] ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Quick Info */}
              <div className="p-4 bg-gray-50 border-b border-gray-200 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} className="text-red-600" />
                  <div>
                    <p className="font-semibold">
                      {formatDate(apt.appointmentDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={16} className="text-red-600" />
                  <div>
                    <p className="font-semibold">{apt.appointmentTime}</p>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="p-4 flex gap-2 flex-wrap border-b border-gray-200">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBgColor(
                    apt.paymentStatus
                  )}`}
                >
                  Payment: {apt.paymentStatus}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBgColor(
                    apt.appointmentStatus
                  )}`}
                >
                  {apt.appointmentStatus === "confirmed" ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  {apt.appointmentStatus}
                </span>
              </div>

              {/* Expandable Details */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedRows[apt._id] ? "min-h-30" : "max-h-0"
                }`}
              >
                <div className="p-4 space-y-3 text-sm bg-white">
                  <div className="border-b pb-3">
                    <p className="font-semibold text-gray-700 mb-1">Hospital</p>
                    <p className="text-gray-600">{apt.hospital}</p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="font-semibold text-gray-700 mb-1">
                      Department
                    </p>
                    <p className="text-gray-600">{apt.department}</p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="font-semibold text-gray-700 mb-1">
                      Payment Method
                    </p>
                    <p className="text-gray-600">{apt.payment}</p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="font-semibold text-gray-700 mb-2">
                      Contact Information
                    </p>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-red-600" />
                        <span>{apt.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-red-600" />
                        <span>{apt.contactNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="border-b pb-3">
                      <p className="font-semibold text-gray-700 mb-1">
                        Country
                      </p>
                      <p className="text-gray-600">{apt.country}</p>
                    </div>
                    {form === "edit" && (
                      <div className="w-full flex m-2">
                        <button className="w-full px-3 py-2 rounded-lg border-2 border-red-700 hover:bg-red-700 hover:text-white cursor-pointer">
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <EditApplication
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            selectId={selectId}
            modalData={modalData}
          />
        </div>
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes row-appear {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default AppointmentTable;

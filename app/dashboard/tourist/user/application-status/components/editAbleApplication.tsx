"use client";

import type React from "react";
import { useState } from "react";
import {
  FaEdit,
  FaSave,
  FaCheckCircle,
  FaTimes,
  FaUser,
  FaGlobe,
  FaUsers,
  FaMoneyBillWave,
  FaPlane,
} from "react-icons/fa";
import type { TravelApplication } from "./type";

interface EditableApplicationCardProps {
  dataValue: TravelApplication;
  onClose: () => void;
}

const EditableApplicationCard: React.FC<EditableApplicationCardProps> = ({
  dataValue,
  onClose,
}) => {
  const [data, setData] = useState<TravelApplication>(dataValue);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  // Format date for UI display
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Start editing
  const handleEditClick = (
    field: keyof TravelApplication,
    currentValue: any
  ) => {
    setEditingField(field);

    if (Array.isArray(currentValue)) {
      setInputValue(currentValue.join(", "));
    } else if (typeof currentValue === "object" && currentValue !== null) {
      setInputValue(JSON.stringify(currentValue));
    } else {
      setInputValue(String(currentValue));
    }
  };

  // Save edited value
  const handleSaveClick = (field: keyof TravelApplication) => {
    let newValue: any = inputValue;

    if (Array.isArray(data[field])) {
      newValue = inputValue
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }

    setData({
      ...data,
      [field]: newValue,
    });

    setEditingField(null);
    setInputValue("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingField(null);
    setInputValue("");
  };

  const StatusBadge = ({
    status,
    label,
  }: {
    status: string;
    label: string;
  }) => {
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-amber-50 text-amber-700 border-amber-200 ring-amber-100";
        case "approved":
        case "paid":
          return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-100";
        case "rejected":
        case "failed":
          return "bg-red-50 text-red-700 border-red-200 ring-red-100";
        default:
          return "bg-slate-50 text-slate-700 border-slate-200 ring-slate-100";
      }
    };

    return (
      <div className="animate-in zoom-in-95 duration-300">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          {label}
        </p>
        <span
          className={`inline-flex px-4 py-2 text-sm font-bold rounded-lg border ring-4 ring-opacity-0 hover:ring-opacity-30 transition-all duration-300 ease-in-out ${getStatusColor(
            status
          )}`}
        >
          {status.toUpperCase()}
        </span>
      </div>
    );
  };

  const DetailItem = ({
    label,
    field,
    value,
    editable = true,
    icon: Icon,
  }: {
    label: string;
    field: keyof TravelApplication;
    value: any;
    editable?: boolean;
    icon?: React.ComponentType<{ size: number }>;
  }) => {
    const isEditing = editingField === field;

    // Format display value
    let displayValue = "";
    if (field === "dateFrom" || field === "dateTo") {
      displayValue = formatDate(value);
    } else if (field === "duration") {
      displayValue = `${value.days} Days / ${value.nights} Nights`;
    } else if (field === "guests") {
      displayValue = `Adults: ${value.adults}, Children: ${value.children}, Infants: ${value.infants}`;
    } else if (field === "travelCost") {
      displayValue = `BDT ${Number.parseInt(value).toLocaleString("en-IN")}`;
    } else if (Array.isArray(value)) {
      displayValue = value.join(", ");
    } else {
      displayValue = String(value);
    }

    return (
      <div className="bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all ease-in-out group p-5 animate-in slide-in-from-bottom-3 duration-500">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {Icon && (
                <Icon size={16} />
              )}
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {label}
              </label>
            </div>

            {isEditing ? (
              <div className="animate-in zoom-in-95 duration-300 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out flex-1"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveClick(field)}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300 ease-in-out shrink-0"
                  title="Save"
                >
                  <FaSave size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 ease-in-out shrink-0"
                  title="Cancel"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            ) : (
              <p className="text-base font-semibold text-gray-900 truncate">
                {displayValue}
              </p>
            )}
          </div>

          {editable && !isEditing && (
            <button
              onClick={() => handleEditClick(field, value)}
              className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out shrink-0"
              title="Edit"
            >
              <FaEdit size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const Section = ({
    title,
    icon: Icon,
    children,
  }: {
    title: string;
    icon: React.ComponentType<{ size: number }>;
    children: React.ReactNode;
  }) => (
    <section className="animate-in slide-in-from-bottom-3 duration-500">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
        <div className="p-3 bg-linear-to-br from-red-500 to-red-600 rounded-lg text-white shadow-md">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="animate-in fade-in duration-300 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 transition-all duration-300 ease-in-out shadow-xl overflow-hidden">
            {/* Header Background */}
            <div className="relative bg-linear-to-r from-[#CA2328] via-[#e22128] to-red-700 p-8 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <FaPlane
                        size={28}
                        className="animate-bounce"
                        style={{ animationDuration: "2s" }}
                      />
                      <h1 className="text-3xl font-black">
                        Travel Application
                      </h1>
                    </div>
                    <p className="text-blue-100 text-sm">
                      Review and manage your travel application details
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <StatusBadge
                    status={data.applicationStatus}
                    label="Application"
                  />
                  <StatusBadge status={data.paymentStatus} label="Payment" />
                  <div className="animate-in zoom-in-95 duration-300">
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-2">
                      Application ID
                    </p>
                    <p className="text-sm font-mono font-bold text-white break-all">
                      {data._id}
                    </p>
                  </div>
                  <div className="animate-in zoom-in-95 duration-300">
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-2">
                      Last Updated
                    </p>
                    <p className="text-sm font-medium text-white">
                      {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-emerald-50 to-teal-50 p-4 border-l-4 border-emerald-500">
              <div className="flex items-center gap-3">
                <FaCheckCircle
                  className="text-emerald-600 shrink-0"
                  size={18}
                />
                <p className="text-sm text-emerald-900">
                  <span className="font-semibold">Tip:</span> Hover over any
                  field and click the edit icon to update information
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Personal Details Section */}
          <Section title="Personal Information" icon={FaUser}>
            <div className="grid md:grid-cols-2 gap-4">
              <DetailItem
                label="Full Name"
                field="fullName"
                value={data.fullName}
                icon={FaUser}
              />
              <DetailItem
                label="Email Address"
                field="email"
                value={data.email}
              />
              <DetailItem
                label="Phone Number"
                field="phoneNumber"
                value={data.phoneNumber}
              />
              <DetailItem
                label="Passport Number"
                field="passportNumber"
                value={data.passportNumber}
              />
              <DetailItem label="Gender" field="gender" value={data.gender} />
              <DetailItem
                label="Visa Status"
                field="visaStatus"
                value={data.visaStatus}
              />
            </div>
          </Section>

          {/* Trip Details Section */}
          <Section title="Trip & Destination Details" icon={FaGlobe}>
            <div className="grid md:grid-cols-2 gap-4">
              <DetailItem
                label="Destination Country"
                field="destinationCountry"
                value={data.destinationCountry}
                icon={FaGlobe}
              />
              <DetailItem
                label="Places to Visit"
                field="destinationPlace"
                value={data.destinationPlace}
              />
              <DetailItem
                label="Departure Date"
                field="dateFrom"
                value={data.dateFrom}
              />
              <DetailItem
                label="Return Date"
                field="dateTo"
                value={data.dateTo}
              />
              <DetailItem
                label="Trip Duration"
                field="duration"
                value={data.duration}
                editable={false}
              />
              <DetailItem
                label="Air Ticket Class"
                field="airTicket"
                value={data.airTicket}
              />
              <DetailItem
                label="Hotel Category"
                field="hotelCategory"
                value={data.hotelCategory}
              />
            </div>
          </Section>

          {/* Travelers Section */}
          <Section title="Travelers & Arrangements" icon={FaUsers}>
            <div className="grid md:grid-cols-2 gap-4">
              <DetailItem
                label="Guest Composition"
                field="guests"
                value={data.guests}
                editable={false}
                icon={FaUsers}
              />
              <DetailItem
                label="Transportation"
                field="transportation"
                value={data.transportation}
              />
              <DetailItem
                label="Food Plan"
                field="foodPlan"
                value={data.foodPlan}
              />
            </div>
          </Section>

          {/* Financial Section */}
          <Section title="Financial Details" icon={FaMoneyBillWave}>
            <div className="grid md:grid-cols-2 gap-4">
              <DetailItem
                label="Travel Cost"
                field="travelCost"
                value={data.travelCost}
                icon={FaMoneyBillWave}
              />
              <DetailItem
                label="Payment Method"
                field="paymentMethod"
                value={data.paymentMethod}
              />
            </div>
          </Section>
        </div>

        <div className="mt-12 animate-in slide-in-from-bottom-3 duration-500">
          <div className="bg-white rounded-xl border border-gray-100 transition-all duration-300 ease-in-out shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-900">Ready to proceed?</p>
                <p className="text-gray-500 mt-1">
                  Last updated: {formatDate(new Date().toISOString())}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 ease-in-out font-semibold text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-linear-to-r from-[#CA2328] to-[#e22128] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out font-semibold text-sm"
                >
                  Print Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableApplicationCard;


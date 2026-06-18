"use client"

import React from "react";
import {
  Download,
  User,
  Phone,
  Mail,
  FileText,
  MapPin,
  Calendar,
  CreditCard,
  Plane,
  Utensils,
  Car,
  Hotel,
  Users,
  Globe,
} from "lucide-react";

interface GuestInfo {
  adults: number;
  children: number;
  infants: number;
}

interface PackageInfo {
  title: string;
  thumbnail: string;
  packageName: string;
}

interface Location {
  country: string;
  destinationPlace: string;
  subDestination?: string;
}

interface DurationAndDates {
  duration: string;
  dateFrom: string;
  startForm: string;
}

interface IncludesAndExcludes {
  includes: string[];
  excludes: string[];
}

export interface ApplicationData {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  passportNumber: string;
  visaStatus: string;
  gender: string;
  guests: GuestInfo;
  airTicket: string;
  foodPlan: string[];
  transportation: string[];
  hotelCategory: string[];
  paymentMethod: string;
  passportVisaImage: string;
  createdBy: string;
  packageInfo: PackageInfo;
  location: Location;
  durationAndDates: DurationAndDates;
  totalCost: string;
  isInternationalPackage: boolean;
  includesAndExcludes: IncludesAndExcludes;
  createdAt: string;
  updatedAt: string;
  client?: {
    b2bId: string;
    form: string;
  };
}

interface ViewApplicationDetailsProps {
  data: ApplicationData;
}

const InfoCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}> = ({ icon, label, children }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
    <div className="flex items-center gap-2 mb-2">
      <div className="text-red-600">{icon}</div>
      <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
    </div>
    <div className="text-gray-600">{children}</div>
  </div>
);

const DownloadButton: React.FC<{ url: string; label: string }> = ({
  url,
  label,
}) => {
  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button
      onClick={() => handleDownload(url, `${label}-${Date.now()}.jpg`)}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
    >
      <Download size={16} />
      <span>{label}</span>
    </button>
  );
};

const ListSection: React.FC<{
  items: string[];
  type: "includes" | "excludes";
}> = ({ items, type }) => (
  <div className="space-y-2">
    <h4
      className={`text-sm font-semibold ${type === "includes" ? "text-green-600" : "text-red-500"}`}
    >
      {type === "includes" ? "✓ Includes" : "✗ Excludes"}
    </h4>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li
          key={index}
          className={`text-sm flex items-start gap-2 ${type === "includes" ? "text-gray-600" : "text-gray-500"}`}
        >
          <span className="mt-1">{type === "includes" ? "•" : "•"}</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ViewApplicationDetails: React.FC<ViewApplicationDetailsProps> = ({
  data,
}) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-gray-500">No application data available</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-red-600 to-red-800 rounded-xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {data.packageInfo.title}
              </h1>
              <p className="text-red-100">
                Application #{data._id.slice(-8).toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  data.isInternationalPackage ? "bg-purple-500" : "bg-green-500"
                }`}
              >
                {data.isInternationalPackage ? "International" : "Domestic"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Personal Information */}
          <InfoCard icon={<User size={18} />} label="Personal Information">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Name:</span> {data.fullName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Gender:</span>{" "}
                {data.gender?.charAt(0).toUpperCase() + data.gender?.slice(1)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Passport:</span>{" "}
                {data.passportNumber}
              </p>
              <p className="text-sm">
                <span className="font-medium">Visa:</span>{" "}
                {data.visaStatus
                  ?.replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </p>
            </div>
          </InfoCard>

          {/* Contact Information */}
          <InfoCard icon={<Phone size={18} />} label="Contact Information">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {data.phoneNumber}
              </p>
              <p className="text-sm">
                <span className="font-medium">Email:</span> {data.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Created By:</span>{" "}
                {data.createdBy}
              </p>
            </div>
          </InfoCard>

          {/* Location Details */}
          <InfoCard icon={<MapPin size={18} />} label="Location">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Country:</span>{" "}
                {data.location.country}
              </p>
              <p className="text-sm">
                <span className="font-medium">Destination:</span>{" "}
                {data.location.destinationPlace}
              </p>
              {data.location.subDestination && (
                <p className="text-sm">
                  <span className="font-medium">Sub Destination:</span>{" "}
                  {data.location.subDestination}
                </p>
              )}
              <p className="text-sm">
                <span className="font-medium">Starting From:</span>{" "}
                {data.durationAndDates.startForm}
              </p>
            </div>
          </InfoCard>

          {/* Duration & Dates */}
          <InfoCard icon={<Calendar size={18} />} label="Duration & Dates">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Duration:</span>{" "}
                {data.durationAndDates.duration}
              </p>
              <p className="text-sm">
                <span className="font-medium">Travel Date:</span>{" "}
                {formatDate(data.durationAndDates.dateFrom)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Created:</span>{" "}
                {formatDate(data.createdAt)}
              </p>
            </div>
          </InfoCard>

          {/* Guests Information */}
          <InfoCard icon={<Users size={18} />} label="Guests">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Adults:</span>{" "}
                {data.guests.adults}
              </p>
              <p className="text-sm">
                <span className="font-medium">Children:</span>{" "}
                {data.guests.children}
              </p>
              <p className="text-sm">
                <span className="font-medium">Infants:</span>{" "}
                {data.guests.infants}
              </p>
            </div>
          </InfoCard>

          {/* Package & Payment */}
          <InfoCard icon={<CreditCard size={18} />} label="Package & Payment">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Package:</span>{" "}
                {data.packageInfo.packageName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Total Cost:</span>{" "}
                <span className="font-bold text-red-600">
                  {data.totalCost} BDT
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Payment:</span>{" "}
                {data.paymentMethod?.toUpperCase()}
              </p>
            </div>
          </InfoCard>

          {/* Travel Preferences */}
          <InfoCard icon={<Plane size={18} />} label="Air Ticket">
            <div className="space-y-2">
              <p className="text-sm capitalize">
                <span className="font-medium">Class:</span> {data.airTicket}
              </p>
            </div>
          </InfoCard>

          {/* Food Plan */}
          <InfoCard icon={<Utensils size={18} />} label="Food Plan">
            <div className="space-y-1">
              {data.foodPlan.map((plan, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                >
                  {plan}
                </span>
              ))}
            </div>
          </InfoCard>

          {/* Transportation */}
          <InfoCard icon={<Car size={18} />} label="Transportation">
            <div className="space-y-1">
              {data.transportation.map((transport, index) => (
                <span
                  key={index}
                  className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                >
                  {transport}
                </span>
              ))}
            </div>
          </InfoCard>

          {/* Hotel Category */}
          <InfoCard icon={<Hotel size={18} />} label="Hotel Category">
            <div className="space-y-1">
              {data.hotelCategory.map((hotel, index) => (
                <span
                  key={index}
                  className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                >
                  {hotel}
                </span>
              ))}
            </div>
          </InfoCard>

          {/* Client Information (Optional) */}
          {data.client && (
            <InfoCard icon={<Globe size={18} />} label="Client Information">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">B2B ID:</span>{" "}
                  {data.client.b2bId}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Form:</span> {data.client.form}
                </p>
              </div>
            </InfoCard>
          )}
        </div>

        {/* Documents Section */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} className="text-red-600" />
            Documents
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {data.passportVisaImage && (
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Passport/Visa Image
                </h3>
                <div className="flex flex-col gap-3">
                  <img
                    src={data.passportVisaImage}
                    alt="Passport/Visa"
                    className="w-full max-w-md rounded-lg border border-gray-200"
                  />
                  <DownloadButton
                    url={data.passportVisaImage}
                    label="Download Passport/Visa"
                  />
                </div>
              </div>
            )}
            {data.packageInfo.thumbnail && (
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Package Thumbnail
                </h3>
                <div className="flex flex-col gap-3">
                  <img
                    src={data.packageInfo.thumbnail}
                    alt="Package"
                    className="w-full max-w-md rounded-lg border border-gray-200"
                  />
                  <DownloadButton
                    url={data.packageInfo.thumbnail}
                    label="Download Thumbnail"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Includes & Excludes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <ListSection
              items={data.includesAndExcludes.includes}
              type="includes"
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <ListSection
              items={data.includesAndExcludes.excludes}
              type="excludes"
            />
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500">
            <p>Created: {formatDate(data.createdAt)}</p>
            <p>Last Updated: {formatDate(data.updatedAt)}</p>
            <p>Application ID: {data._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationDetails;

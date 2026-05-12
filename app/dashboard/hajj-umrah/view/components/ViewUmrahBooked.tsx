// components/ViewUmrahBooked.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Activity,
  AlertCircle,
  Stethoscope,
  Plane,
  Hotel,
  Users,
  CreditCard,
  FileText,
  Image as ImageIcon,
  Shield,
  Syringe,
  UserPlus,
  Download,
  Printer,
  Check,
  Clock,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Building,
  Globe,
  Briefcase,
  HeartPulse,
  Accessibility,
  Star,
  CalendarDays,
  PlaneTakeoff,
  PlaneLanding,
  FileCheck,
  FileBadge,
  Camera,
  Badge,
  UserCheck,
  Contact2,
  Siren,
  PackageOpen,
  FolderDown,
  Loader2,
} from "lucide-react";
import { FormData } from "@/app/types/UmrahHazz-form-types";

interface ViewUmrahBookedProps {
  bookedData: {
    success: boolean;
    message: string;
    data: FormData & { _id: string; pkgInfo?: any };
  };
}

// ─── Download helpers ──────────────────────────────────────────────────────────

const getFilenameFromUrl = (url: string, fallback: string): string => {
  try {
    const parts = new URL(url).pathname.split("/");
    const last = parts[parts.length - 1];
    return last && last.includes(".") ? last : `${fallback}.jpg`;
  } catch {
    return `${fallback}.jpg`;
  }
};

const downloadImage = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    // Fallback: open in new tab if CORS fails
    window.open(url, "_blank");
  }
};

interface ImageEntry {
  url: string;
  label: string;
}

const collectAllImages = (data: any): ImageEntry[] => {
  const images: ImageEntry[] = [];

  if (data.documents?.passportImage)
    images.push({ url: data.documents.passportImage, label: "passport" });

  (data.documents?.passportSizePhoto || []).forEach((p: string, i: number) =>
    images.push({ url: p, label: `passport-size-photo-${i + 1}` })
  );

  if (data.documents?.nid?.frontSide)
    images.push({ url: data.documents.nid.frontSide, label: "nid-front" });
  if (data.documents?.nid?.backSide)
    images.push({ url: data.documents.nid.backSide, label: "nid-back" });

  if (data.documents?.visaImage)
    images.push({ url: data.documents.visaImage, label: "visa" });
  if (data.documents?.vaccinationCertificate)
    images.push({
      url: data.documents.vaccinationCertificate,
      label: "vaccination-certificate",
    });
  if (data.documents?.covidCertificate)
    images.push({ url: data.documents.covidCertificate, label: "covid-certificate" });

  if (data.payment?.image)
    images.push({ url: data.payment.image, label: "payment-screenshot" });

  (data.companions || []).forEach((c: any, i: number) => {
    if (c.passportImage)
      images.push({
        url: c.passportImage,
        label: `companion-${i + 1}-${(c.fullName || "companion").replace(/\s+/g, "-").toLowerCase()}`,
      });
  });

  return images;
};

// ─── Sub-components ────────────────────────────────────────────────────────────

interface DownloadButtonProps {
  url: string;
  filename: string;
  size?: "sm" | "md";
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  filename,
  size = "sm",
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    await downloadImage(url, filename);
    setLoading(false);
  };

  if (size === "md") {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        title={`Download ${filename}`}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 rounded-lg text-xs font-medium shadow transition-all border border-gray-200 hover:border-red-200 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        Download
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      title={`Download ${filename}`}
      className="w-7 h-7 flex items-center justify-center bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow transition-all border border-gray-200 hover:border-red-200 disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Download className="w-3.5 h-3.5" />
      )}
    </button>
  );
};

// Bulk download button
interface BulkDownloadButtonProps {
  images: ImageEntry[];
  label?: string;
  className?: string;
}

const BulkDownloadButton: React.FC<BulkDownloadButtonProps> = ({
  images,
  label = "Download All",
  className = "",
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBulkDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images.length) return;
    setLoading(true);
    setProgress(0);
    for (let i = 0; i < images.length; i++) {
      const { url, label } = images[i];
      const filename = getFilenameFromUrl(url, label);
      await downloadImage(url, filename);
      setProgress(i + 1);
      // Small delay to avoid browser throttling
      await new Promise((r) => setTimeout(r, 400));
    }
    setLoading(false);
    setProgress(0);
  };

  return (
    <button
      onClick={handleBulkDownload}
      disabled={loading || !images.length}
      className={`flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-lg text-sm font-medium transition-all shadow-sm ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>
            {progress}/{images.length}
          </span>
        </>
      ) : (
        <>
          <FolderDown className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
};

// Image card with download overlay
interface ImageWithDownloadProps {
  url: string;
  label: string;
  filename: string;
  className?: string;
  height?: string;
  onClick?: () => void;
}

const ImageWithDownload: React.FC<ImageWithDownloadProps> = ({
  url,
  label,
  filename,
  className = "",
  height = "h-32",
  onClick,
}) => (
  <div className={`relative group ${className}`}>
    <img
      src={url}
      alt={label}
      className={`w-full ${height} object-cover rounded-lg cursor-pointer`}
      onClick={onClick}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://via.placeholder.com/400x300?text=Image+Not+Found";
      }}
    />
    {/* Hover overlay */}
    <div
      className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <ImageIcon className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all" />
    </div>
    {/* Download button - always accessible, top-right */}
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
      <DownloadButton url={url} filename={filename} />
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const ViewUmrahBooked: React.FC<ViewUmrahBookedProps> = ({ bookedData }) => {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeImageLabel, setActiveImageLabel] = useState<string>("");

  const data = bookedData?.data;

  const openImage = (url: string, label: string = "document") => {
    setActiveImage(url);
    setActiveImageLabel(label);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Data Found
          </h2>
          <p className="text-gray-600 mb-4">
            The application data could not be loaded.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partial":
        return "bg-orange-100 text-orange-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPackageTypeColor = (type: string) =>
    type === "hajj"
      ? "bg-purple-100 text-purple-800"
      : "bg-blue-100 text-blue-800";

  const getHotelStars = (category: string) => {
    const stars = parseInt(category);
    return Array.from({ length: stars }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  const InfoCard = ({ icon: Icon, label, value, className = "" }: any) => (
    <div
      className={`flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors ${className}`}
    >
      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-red-600" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5 wrap-break-word">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, subtitle, actions }: any) => (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );

  const DocumentCard = ({ icon: Icon, label, url, filename }: any) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-red-600" />
          <p className="text-sm font-medium text-gray-700">{label}</p>
        </div>
        {url && (
          <DownloadButton
            url={url}
            filename={filename || getFilenameFromUrl(url, label.toLowerCase().replace(/\s+/g, "-"))}
          />
        )}
      </div>
      <div className="p-2">
        {url ? (
          <ImageWithDownload
            url={url}
            label={label}
            filename={filename || getFilenameFromUrl(url, label.toLowerCase().replace(/\s+/g, "-"))}
            height="h-32"
            onClick={() => openImage(url, label)}
          />
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Download className="w-8 h-8 text-gray-300 mx-auto mb-1" />
              <span className="text-xs text-gray-400">No document</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Collect all images for bulk download
  const allImages = collectAllImages(data);

  // Document-specific bulk images
  const documentImages: ImageEntry[] = [
    data.documents?.passportImage && {
      url: data.documents.passportImage,
      label: "passport",
    },
    ...(data.documents?.passportSizePhoto || []).map(
      (p: string, i: number) => ({ url: p, label: `passport-size-photo-${i + 1}` })
    ),
    data.documents?.nid?.frontSide && {
      url: data.documents.nid.frontSide,
      label: "nid-front",
    },
    data.documents?.nid?.backSide && {
      url: data.documents.nid.backSide,
      label: "nid-back",
    },
    data.documents?.visaImage && {
      url: data.documents.visaImage,
      label: "visa",
    },
    data.documents?.vaccinationCertificate && {
      url: data.documents.vaccinationCertificate,
      label: "vaccination-certificate",
    },
    data.documents?.covidCertificate && {
      url: data.documents.covidCertificate,
      label: "covid-certificate",
    },
  ].filter(Boolean) as ImageEntry[];

  const companionImages: ImageEntry[] = (data.companions || [])
    .filter((c: any) => c.passportImage)
    .map((c: any, i: number) => ({
      url: c.passportImage,
      label: `companion-${i + 1}-${(c.fullName || "companion")
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    }));

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Applications</span>
            </button>

            <div className="flex items-center gap-3">
              {/* ── Bulk Download All ── */}
              <BulkDownloadButton
                images={allImages}
                label={`Download All (${allImages.length})`}
                className="hidden sm:flex"
              />

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/dashboard/hajj-umrah/edit/${data._id}`
                  )
                }
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Application</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Application Status Banner */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {data.applicantInfo.fullName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(data.applicationStatus || "pending")}`}
                    >
                      {data.applicationStatus === "approved" && (
                        <Check className="w-3 h-3 mr-1" />
                      )}
                      {data.applicationStatus === "pending" && (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {data.applicationStatus === "rejected" && (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {(data.applicationStatus || "pending")
                        .charAt(0)
                        .toUpperCase() +
                        (data.applicationStatus || "pending").slice(1)}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPackageTypeColor(data.travelInfo.packageType)}`}
                    >
                      {data.travelInfo.packageType.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Applied: {formatDate(data.createdAt || "")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  ID: {data._id?.slice(-8).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={User}
                  title="Personal Information"
                  subtitle="Applicant details and contact information"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoCard icon={User} label="Full Name" value={data.applicantInfo.fullName} />
                  <InfoCard icon={UserCheck} label="Father's Name" value={data.applicantInfo.fatherName} />
                  <InfoCard icon={UserCheck} label="Mother's Name" value={data.applicantInfo.motherName} />
                  <InfoCard icon={Calendar} label="Date of Birth" value={formatDate(data.applicantInfo.dateOfBirth)} />
                  <InfoCard icon={Globe} label="Nationality" value={data.applicantInfo.nationality} />
                  <InfoCard icon={Badge} label="NID Number" value={data.applicantInfo.nidNumber} />
                  <InfoCard icon={Briefcase} label="Profession" value={data.applicantInfo.profession} />
                  <InfoCard icon={Users} label="Marital Status" value={data.applicantInfo.maritalStatus} />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={Contact2}
                  title="Contact Information"
                  subtitle="How to reach the applicant"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoCard icon={Phone} label="Phone" value={data.applicantInfo.phone} />
                  <InfoCard icon={Phone} label="WhatsApp" value={data.applicantInfo.whatsapp} />
                  <InfoCard icon={Mail} label="Email" value={data.applicantInfo.email} />
                  <InfoCard icon={MapPin} label="Present Address" value={data.applicantInfo.presentAddress} />
                  <InfoCard icon={MapPin} label="Permanent Address" value={data.applicantInfo.permanentAddress} className="sm:col-span-2" />
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={HeartPulse}
                  title="Medical Information"
                  subtitle="Health conditions and requirements"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoCard icon={Activity} label="Blood Group" value={data.medicalInfo.bloodGroup} />
                  <InfoCard icon={AlertTriangle} label="Diabetes" value={data.medicalInfo.hasDiabetes ? "Yes" : "No"} />
                  <InfoCard icon={Activity} label="High Blood Pressure" value={data.medicalInfo.hasHighBloodPressure ? "Yes" : "No"} />
                  <InfoCard icon={Heart} label="Heart Disease" value={data.medicalInfo.hasHeartDisease ? "Yes" : "No"} />
                  <InfoCard icon={Accessibility} label="Uses Wheelchair" value={data.medicalInfo.usesWheelchair ? "Yes" : "No"} />
                  <InfoCard icon={AlertCircle} label="Allergies" value={data.medicalInfo.allergies} />
                  <InfoCard icon={Stethoscope} label="Other Medical Issues" value={data.medicalInfo.otherMedicalIssues} className="sm:col-span-2" />
                </div>
              </div>
            </div>

            {/* Travel Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={Plane}
                  title="Travel Information"
                  subtitle="Package and accommodation details"
                />
                <div className="bg-linear-to-r from-red-50 to-red-100 rounded-xl p-4 mb-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-red-800 font-medium">Selected Package</p>
                      <p className="text-lg font-bold text-red-900">{data.pkgInfo?.pkgName || "N/A"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-800">Package Price</p>
                      <p className="text-2xl font-bold text-red-900">{formatCurrency(data.pkgInfo?.pkgPrice || 0)}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoCard icon={CalendarDays} label="Travel Month" value={data.travelInfo.travelMonth} />
                  <InfoCard icon={Users} label="Room Sharing" value={data.travelInfo.roomSharing} />
                  <InfoCard icon={PlaneTakeoff} label="Departure Date" value={formatDate(data.travelInfo.departureDate || "")} />
                  <InfoCard icon={PlaneLanding} label="Return Date" value={formatDate(data.travelInfo.returnDate || "")} />
                  <InfoCard icon={Building} label="Departure Airport" value={data.travelInfo.departureAirport} />
                  <InfoCard icon={Plane} label="Air Ticket" value={data.travelInfo.airTicketIncluded ? "Included" : "Not Included"} />
                  <InfoCard icon={Accessibility} label="Transportation" value={data.travelInfo.transportationIncluded ? "Included" : "Not Included"} />
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Hotel className="w-5 h-5 text-yellow-700" />
                      <h4 className="font-semibold text-gray-900">Makkah Hotel</h4>
                    </div>
                    <div className="flex items-center gap-1">{getHotelStars(data.travelInfo.makkahHotelCategory)}</div>
                    <p className="text-sm text-gray-600 mt-1">{data.travelInfo.makkahHotelCategory} Hotel</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Hotel className="w-5 h-5 text-emerald-700" />
                      <h4 className="font-semibold text-gray-900">Madinah Hotel</h4>
                    </div>
                    <div className="flex items-center gap-1">{getHotelStars(data.travelInfo.madinahHotelCategory)}</div>
                    <p className="text-sm text-gray-600 mt-1">{data.travelInfo.madinahHotelCategory} Hotel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Companions ── */}
            {data.companions && data.companions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <SectionHeader
                    icon={UserPlus}
                    title="Companions"
                    subtitle={`${data.companions.length} companion(s) traveling together`}
                    actions={
                      companionImages.length > 0 && (
                        <BulkDownloadButton
                          images={companionImages}
                          label={`Download All (${companionImages.length})`}
                        />
                      )
                    }
                  />

                  <div className="space-y-4">
                    {data.companions.map((companion: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{companion.fullName}</h4>
                              <p className="text-sm text-gray-500">{companion.relation}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <InfoCard icon={Badge} label="Passport Number" value={companion.passportNumber} />
                          <InfoCard icon={Phone} label="Phone" value={companion.phone} />
                        </div>
                        {companion.passportImage && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-medium text-gray-500">Passport Photo</p>
                              <DownloadButton
                                url={companion.passportImage}
                                filename={`companion-${index + 1}-${(companion.fullName || "companion").replace(/\s+/g, "-").toLowerCase()}.jpg`}
                                size="md"
                              />
                            </div>
                            <ImageWithDownload
                              url={companion.passportImage}
                              label={`${companion.fullName} passport`}
                              filename={`companion-${index + 1}-${(companion.fullName || "companion").replace(/\s+/g, "-").toLowerCase()}.jpg`}
                              height="h-40"
                              onClick={() => openImage(companion.passportImage, `${companion.fullName} - Passport`)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={CreditCard}
                  title="Payment Details"
                  subtitle="Transaction and payment status"
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Method</span>
                    <span className="font-semibold text-gray-900 capitalize">{data.payment.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(data.payment.paymentStatus)}`}>
                      {data.payment.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                  {data.payment.trxId && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Transaction ID</span>
                      <span className="font-mono text-sm text-gray-900">{data.payment.trxId}</span>
                    </div>
                  )}
                  {(data.payment as any).paymentPay !== undefined && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Amount Paid</span>
                      <span className="font-bold text-green-600">{formatCurrency((data.payment as any).paymentPay)}</span>
                    </div>
                  )}
                  {(data.payment as any).paymentDue !== undefined && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Amount Due</span>
                      <span className="font-bold text-red-600">{formatCurrency((data.payment as any).paymentDue)}</span>
                    </div>
                  )}
                  {data.payment.image && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-500">Payment Screenshot</p>
                        <DownloadButton
                          url={data.payment.image}
                          filename="payment-screenshot.jpg"
                          size="md"
                        />
                      </div>
                      <ImageWithDownload
                        url={data.payment.image}
                        label="Payment proof"
                        filename="payment-screenshot.jpg"
                        height="h-40"
                        onClick={() => openImage(data.payment.image!, "Payment Screenshot")}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={Siren}
                  title="Emergency Contact"
                  subtitle="Contact in case of emergency"
                />
                <div className="space-y-3">
                  <InfoCard icon={User} label="Name" value={data.emergencyContact.name} />
                  <InfoCard icon={Users} label="Relation" value={data.emergencyContact.relation} />
                  <InfoCard icon={Phone} label="Phone" value={data.emergencyContact.phone} />
                  <InfoCard icon={MapPin} label="Address" value={data.emergencyContact.address || "N/A"} />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={FileCheck}
                  title="Documents"
                  subtitle="All submitted documents"
                  actions={
                    documentImages.length > 0 && (
                      <BulkDownloadButton
                        images={documentImages}
                        label={`All (${documentImages.length})`}
                      />
                    )
                  }
                />

                <div className="space-y-4">
                  {/* Passport */}
                  <DocumentCard
                    icon={FileBadge}
                    label="Passport"
                    url={data.documents.passportImage}
                    filename="passport.jpg"
                  />

                  {/* Passport Size Photos */}
                  {data.documents.passportSizePhoto &&
                    data.documents.passportSizePhoto.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-gray-500">Passport Size Photos</p>
                          <BulkDownloadButton
                            images={(data.documents.passportSizePhoto as string[]).map(
                              (p, i) => ({ url: p, label: `passport-size-photo-${i + 1}` })
                            )}
                            label="Download All"
                            className="px-2! py-1! text-xs!"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {(data.documents.passportSizePhoto as string[]).map(
                            (photo, index) => (
                              <div key={index} className="relative group">
                                <ImageWithDownload
                                  url={photo}
                                  label={`Passport photo ${index + 1}`}
                                  filename={`passport-size-photo-${index + 1}.jpg`}
                                  height="h-24"
                                  onClick={() => openImage(photo, `Passport Size Photo ${index + 1}`)}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* NID */}
                  {data.documents.nid && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-500">National ID</p>
                        <BulkDownloadButton
                          images={[
                            data.documents.nid.frontSide && { url: data.documents.nid.frontSide, label: "nid-front" },
                            data.documents.nid.backSide && { url: data.documents.nid.backSide, label: "nid-back" },
                          ].filter(Boolean) as ImageEntry[]}
                          label="Download All"
                          className="px-2! py-1! text-xs!"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <DocumentCard icon={FileCheck} label="Front Side" url={data.documents.nid.frontSide} filename="nid-front.jpg" />
                        <DocumentCard icon={FileCheck} label="Back Side" url={data.documents.nid.backSide} filename="nid-back.jpg" />
                      </div>
                    </div>
                  )}

                  {/* Other Documents */}
                  <div className="space-y-2">
                    {data.documents.visaImage && (
                      <DocumentCard icon={FileBadge} label="Visa" url={data.documents.visaImage} filename="visa.jpg" />
                    )}
                    {data.documents.vaccinationCertificate && (
                      <DocumentCard icon={Syringe} label="Vaccination Certificate" url={data.documents.vaccinationCertificate} filename="vaccination-certificate.jpg" />
                    )}
                    {data.documents.covidCertificate && (
                      <DocumentCard icon={Shield} label="COVID Certificate" url={data.documents.covidCertificate} filename="covid-certificate.jpg" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Passport Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <SectionHeader
                  icon={FileText}
                  title="Passport Details"
                  subtitle="Passport information"
                />
                <div className="space-y-3">
                  <InfoCard icon={Badge} label="Passport Number" value={data.documents.passportNumber} />
                  <InfoCard icon={Calendar} label="Issue Date" value={formatDate(data.documents.passportIssueDate)} />
                  <InfoCard icon={Calendar} label="Expiry Date" value={formatDate(data.documents.passportExpiryDate)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="absolute -top-12 left-0 right-0 flex items-center justify-between px-2">
              <span className="text-white text-sm font-medium truncate max-w-xs">
                {activeImageLabel}
              </span>
              <div className="flex items-center gap-2">
                <DownloadButton
                  url={activeImage}
                  filename={getFilenameFromUrl(
                    activeImage,
                    activeImageLabel.toLowerCase().replace(/\s+/g, "-")
                  )}
                  size="md"
                />
                <button
                  onClick={() => setActiveImage(null)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <img
              src={activeImage}
              alt="Document preview"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Found";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUmrahBooked;
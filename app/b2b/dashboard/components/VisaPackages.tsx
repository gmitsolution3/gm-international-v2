// components/VisaPackages.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Calendar,
  FileText,
  Info,
  Briefcase,
  User,
  Users,
  GraduationCap,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Download,
  Copy,
  ExternalLink,
} from "lucide-react";

interface VisaPackage {
  _id: string;
  country: string;
  visaType: string;
  processingTime: string;
  pricing: {
    b2b: string | number;
    b2c: string | number;
  };
  validity: string;
  basicDocuments: string[];
  businessDocuments?: string[];
  jobHolderDocuments?: string[];
  studentDocuments?: string[];
  coupleDocuments?: string[];
  otherInformation?: string;
  createdAt: string;
}

interface VisaPackagesProps {
  data: {
    success: boolean;
    message: string;
    data: VisaPackage[];
  };
}

// Document category icons mapping
const categoryIcons = {
  basic: FileText,
  business: Briefcase,
  jobHolder: User,
  student: GraduationCap,
  couple: Users,
};

// Document category labels
const categoryLabels = {
  basic: "Basic Documents",
  business: "Business Documents",
  jobHolder: "Job Holder Documents",
  student: "Student Documents",
  couple: "Couple Documents",
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BusinessVisaB2BRate = [
  "Single Entry: 9500 BDT
"Single Entry Fresh: 10500 BDT"
"Double Entry: 14500 BDT"
"2 Year Multiple Entry: 16500 BDT",
]

export default function VisaPackages({ data }: VisaPackagesProps) {
  const [activeCountry, setActiveCountry] = useState<string>("all");
  const [activeDocumentSection, setActiveDocumentSection] = useState<
    Record<string, string>
  >({});
  const [expandedInfo, setExpandedInfo] = useState<Record<string, boolean>>({});

  // Get unique countries and sort them
  const countries = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(data.data.map((pkg) => pkg.country.trim())),
    ).sort();
    return ["all", ...uniqueCountries];
  }, [data.data]);

  // Filter packages based on active country
  const filteredPackages = useMemo(() => {
    if (activeCountry === "all") {
      return data.data;
    }
    return data.data.filter((pkg) => pkg.country.trim() === activeCountry);
  }, [activeCountry, data.data]);

  // Toggle document section
  const toggleDocumentSection = useCallback(
    (packageId: string, section: string) => {
      setActiveDocumentSection((prev) => ({
        ...prev,
        [packageId]: prev[packageId] === section ? "" : section,
      }));
    },
    [],
  );

  // Toggle additional info
  const toggleInfo = useCallback((packageId: string) => {
    setExpandedInfo((prev) => ({
      ...prev,
      [packageId]: !prev[packageId],
    }));
  }, []);

  // Handle apply button click
  const handleApply = useCallback((country: string, visaType: string) => {
    // Implement your apply logic here
    console.log(`Applying for ${country} - ${visaType}`);
    // You can redirect to application form or open modal
  }, []);

  // Handle contact action
  const handleContact = useCallback((type: "phone" | "email") => {
    if (type === "phone") {
      window.location.href = "tel:+1234567890";
    } else {
      window.location.href = "mailto:visa@example.com";
    }
  }, []);

  // Format price
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseInt(price) : price;
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className="min-h-screen ">
      {/* Header with actions */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Visa Packages</h1>

            {/* Quick actions */}
            {/* <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleContact("phone")}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="sm:sr-only">Call</span>
              </button>
              <button
                onClick={() => handleContact("email")}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="sm:sr-only">Email</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country Tabs - Responsive Design */}
        <div className="mb-8">
          {/* Mobile Dropdown */}
          <div className="sm:hidden">
            <label
              htmlFor="country-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Country
            </label>
            <select
              id="country-select"
              value={activeCountry}
              onChange={(e) => setActiveCountry(e.target.value)}
              className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-lg shadow-sm"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country === "all" ? "All Countries" : country}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav
                className="-mb-px flex space-x-8 overflow-x-auto pb-1 scrollbar-hide"
                aria-label="Tabs"
              >
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setActiveCountry(country)}
                    className={`
                      whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
                      ${
                        activeCountry === country
                          ? "border-red-500 text-red-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    {country === "all" ? "All Countries" : country}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-gray-600">
          Showing {filteredPackages.length} package
          {filteredPackages.length !== 1 ? "s" : ""}
        </div>

        {/* Visa Packages Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg._id}
                layout
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Package Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {pkg.country}
                      </h2>
                      <p className="text-sm text-red-600 font-medium">
                        {pkg.visaType}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Starting from</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(pkg.pricing.b2c)}
                      </div>
                      <div className="text-xs text-gray-500">
                        B2B: {formatPrice(pkg.pricing.b2b)}
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Tags */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{pkg.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{pkg.validity}</span>
                    </div>
                  </div>
                </div>

                {/* Document Sections */}
                <div className="p-6 space-y-3">
                  {/* Basic Documents - Always visible */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDocumentSection(pkg._id, "basic")}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-gray-900">
                          Basic Documents
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {pkg.basicDocuments.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          activeDocumentSection[pkg._id] === "basic"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDocumentSection[pkg._id] === "basic" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 space-y-2 bg-white">
                            {pkg.basicDocuments.map((doc, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-600"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{doc}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Additional Document Sections */}
                  {[
                    {
                      key: "businessDocuments",
                      label: "Business Documents",
                      icon: Briefcase,
                    },
                    {
                      key: "jobHolderDocuments",
                      label: "Job Holder Documents",
                      icon: User,
                    },
                    {
                      key: "studentDocuments",
                      label: "Student Documents",
                      icon: GraduationCap,
                    },
                    {
                      key: "coupleDocuments",
                      label: "Couple Documents",
                      icon: Users,
                    },
                  ].map((section) => {
                    const documents = pkg[section.key as keyof VisaPackage];
                    if (
                      !documents ||
                      (Array.isArray(documents) && documents.length === 0) ||
                      (documents as string[])[0] === ""
                    ) {
                      return null;
                    }

                    return (
                      <div
                        key={section.key}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            toggleDocumentSection(pkg._id, section.key)
                          }
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <section.icon className="w-5 h-5 text-red-600" />
                            <span className="font-medium text-gray-900">
                              {section.label}
                            </span>
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              {(documents as string[]).length}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              activeDocumentSection[pkg._id] === section.key
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDocumentSection[pkg._id] === section.key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 space-y-2 bg-white">
                                {(documents as string[]).map((doc, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2 text-sm text-gray-600"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>{doc}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Additional Information */}
                  {pkg.otherInformation && (
                    <>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleInfo(pkg._id)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Info className="w-5 h-5 text-red-600" />
                            <span className="font-medium text-gray-900">
                              {pkg.country.toLocaleLowerCase() === "china"
                                ? "Tourist visa B2B Rate"
                                : "Additional Information"}
                            </span>
                          </div>

                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              expandedInfo[pkg._id] ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedInfo[pkg._id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div
                                className="p-4 bg-white prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                  __html: pkg.otherInformation,
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {pkg.country.toLowerCase() === "china" && (
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleInfo(pkg._id + "business")}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Info className="w-5 h-5 text-red-600" />
                              <span className="font-medium text-gray-900">
                                Business Visa B2B Rate
                              </span>
                            </div>

                            <ChevronDown
                              className={`w-5 h-5 text-gray-500 transition-transform ${
                                expandedInfo[pkg._id + "business"]
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {expandedInfo[pkg._id + "business"] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 bg-white space-y-2">
                                  {BusinessVisaB2BRate.map((rate, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                      <span>{rate}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredPackages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No visa packages found
            </h3>
            <p className="text-gray-600">Try selecting a different country</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

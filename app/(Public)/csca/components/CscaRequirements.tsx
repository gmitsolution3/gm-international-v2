// components/CscaRequirements.tsx
"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  GraduationCap,
  FlaskConical,
  Atom,
  Calculator,
  Languages,
  ExternalLink,
  CheckCircle,
  X,
} from "lucide-react";
import Link from "next/link";

interface ExamCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  bgIcon: React.ReactNode;
  pdfs: {
    name: string;
    url: string;
    type: string;
    driveFileId: string;
  }[];
}

// Helper function to get direct download URL from Google Drive
const getDirectDownloadUrl = (driveUrl: string): string => {
  // Extract file ID from various Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = driveUrl.match(pattern);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return driveUrl;
};

// Helper to get embed/view URL
const getEmbedUrl = (driveUrl: string): string => {
  const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return driveUrl;
};

const professionalCategory: ExamCategory[] = [
  {
    id: "humanities-chinese",
    title: "CSCA - Humanities",
    icon: <Languages className="w-8 h-8" />,
    description: "Chinese Humanities and Cultural Studies",
    pdfs: [
      {
        name: "Syllabus & Guidelines",
        url: "/pdf/csca-humanities-chinese.pdf",
        type: "Syllabus",
        driveFileId: "1G8lcZ8aU4QoX9pDMfM-3ah8c4pyFHzAE",
      },
    ],
    bgIcon: <Languages size={110} strokeWidth={1} />,
  },
  {
    id: "stem-chinese",
    title: "CSCA - STEM",
    icon: <GraduationCap className="w-8 h-8" />,
    description: "STEM Education in Chinese Context",
    pdfs: [
      {
        name: "STEM Curriculum Guide",
        url: "/pdf/CSCA-Stem-chinese.pdf",
        type: "Guide",
        driveFileId: "16L1xO2jbSDzSDEHxHfUqAtB__JxHvU6M",
      },
    ],
    bgIcon: <GraduationCap size={110} strokeWidth={1} />,
  },
];

const examCategories: ExamCategory[] = [
  {
    id: "chemistry",
    title: "CSCA - Chemistry",
    icon: <FlaskConical className="w-8 h-8" />,
    description: "Chemistry Syllabus & Study Materials",
    pdfs: [
      {
        name: "Chemistry Syllabus",
        url: "/pdf/CSCA-Chemistry.pdf",
        type: "Syllabus",
        driveFileId: "1rUu2eKS3KzD2GDeg_jNgMSTOuYkLDO_B",
      },
    ],
    bgIcon: <FlaskConical size={110} strokeWidth={1} />,
  },
  {
    id: "physics",
    title: "CSCA - Physics",
    icon: <Atom className="w-8 h-8" />,
    description: "Physics Syllabus & Study Materials",
    pdfs: [
      {
        name: "Physics Syllabus",
        url: "/pdf/CSCA-Physics.pdf",
        type: "Syllabus",
        driveFileId: "1DGerUcQbr0NX7EVrclBwEgTPWBwhc0ko",
      },
    ],
    bgIcon: <Atom size={110} strokeWidth={1} />,
  },
  {
    id: "mathematics",
    title: "CSCA - Mathematics",
    icon: <Calculator className="w-8 h-8" />,
    description: "Mathematics Syllabus & Study Materials",
    pdfs: [
      {
        name: "Mathematics Syllabus",
        url: "/pdf/CSCA-Mathematics.pdf",
        type: "Syllabus",
        driveFileId: "1KTSlLnhlkpJYVtkwni1ElQmzOUj02Dg7",
      },
    ],
    bgIcon: <Calculator size={110} strokeWidth={1} />,
  },
];

const CscaRequirements: React.FC = () => {
  const [viewingPdf, setViewingPdf] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showNotification = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "success" }),
      2500,
    );
  };

  const handleDownload = (pdfName: string, fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = pdfName + ".pdf";
    link.click();
  };

  const handleView = (pdfName: string, driveUrl: string) => {
    const embedUrl = getEmbedUrl(driveUrl);
    setViewingPdf({ name: pdfName, url: embedUrl });
  };

  const handleApplyNow = () => {
    showNotification("Redirecting to application portal...", "success");
    // Add your application URL here
    // window.open("https://your-application-url.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-6 right-6 z-50 animate-slide-down">
          <div
            className={`${
              notification.type === "success" ? "bg-red-700" : "bg-red-800"
            } text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 min-w-50`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div
        className="relative text-white overflow-hidden"
        style={{
          // background: "linear-gradient(360deg, #CA2328 0%, #301314 70%)",
          backgroundImage: `linear-gradient(
        to bottom, 
        rgba(0, 0, 0, 0.65) 0%, 
        rgba(0, 0, 0, 0.65) 70%,   
        rgba(0, 0, 0, 0.65) 100%  
      ), url('https://i.postimg.cc/QMLVzjyc/pexels-clmcdk-fejcn-2057437867-29646491.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium">
                CSCA Examination Resources
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Exam Requirements
            </h1>
            <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
              Access comprehensive exam materials, syllabi, and resources for
              all CSCA subject areas
            </p>
            <Link href={"/csca/csca-application"}>
              <button
                onClick={handleApplyNow}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-red-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6"
              >
                <span>Apply Now </span>
                <ExternalLink className="w-4 h-4" />
                <span>(3500 BDT)</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 "></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Fundamental Subjects
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Explore the different subject areas covered in the CSCA exams and
            access relevant study materials and syllabi for each category.
          </p>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {examCategories.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
              >
                {/* Card Header */}
                <div
                  className="relative h-32 p-6 flex items-center justify-between overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
                  }}
                >
                  <div className="text-white">
                    <div className="mb-2">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-red-100 text-sm mt-1">
                      {category.description}
                    </p>
                  </div>
                  <div className="card-header-bg-icon">{category.bgIcon}</div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {category.pdfs.map((pdf, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <FileText className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {pdf.name}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                              {pdf.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleView(pdf.name, pdf.url)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDownload(pdf.name, pdf.url)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Professional Chinese
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            For candidates opting for the Chinese language track, access
            specialized materials and syllabi tailored to the humanities and
            STEM subjects in the Chinese context.
          </p>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {professionalCategory.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
              >
                {/* Card Header */}
                <div
                  className="relative h-32 p-6 flex items-center justify-between overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
                  }}
                >
                  <div className="text-white">
                    <div className="mb-2">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-red-100 text-sm mt-1">
                      {category.description}
                    </p>
                  </div>
                  <div className="card-header-bg-icon">{category.bgIcon}</div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {category.pdfs.map((pdf, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <FileText className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {pdf.name}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                              {pdf.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleView(pdf.name, pdf.url)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDownload(pdf.name, pdf.url)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Now CTA Section */}
        <div className="relative mt-8 md:mt-12">
          <div
            className=" rounded-2xl shadow-xl overflow-hidden"
            style={{
              background: "linear-gradient(360deg, #CA2328 0%, #301314 70%)",
            }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative px-6 py-10 md:py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Begin Your CSCA Journey?
              </h2>
              <p className="text-red-100 mb-6 max-w-md mx-auto">
                Submit your application and take the first step toward
                certification
              </p>
              <Link href={"/csca/csca-application"}>
                <button
                  onClick={handleApplyNow}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-red-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4" />
                  <span>(3500 BDT)</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-2xl">
              <h3 className="font-semibold text-gray-800 truncate">
                {viewingPdf.name}
              </h3>
              <button
                onClick={() => setViewingPdf(null)}
                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <iframe
              src={viewingPdf.url}
              className="w-full flex-1 rounded-b-2xl"
              title={viewingPdf.name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CscaRequirements;

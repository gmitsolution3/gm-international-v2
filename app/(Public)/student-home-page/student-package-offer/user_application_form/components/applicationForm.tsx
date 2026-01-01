"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  Loader2,
  X,
  CheckCircle,
  AlertCircle,
  ReceiptText,
  BookOpen,
  ShieldCheck,
  BookMarked,
  BadgeTurkishLira,
  GraduationCap,
  School,
  SquareUserRound,
} from "lucide-react";
import Swal from "sweetalert2";
import Dropdown from "../components/dropDown";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface DocumentUpload {
  name: string;
  file: File | null;
  url: string;
  type: string;
  required: boolean;
}

interface FormData {
  // Personal Info
  applicantId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  nidNumber: string;

  // Academic Info
  country: string;
  university: string;
  admissionSemester: string;
  courseName: string;
  language: string;
  category: string;

  // Application Info
  coverage: string;
  paymentMethod: string;
  paymentStatus: string;
  applicationStatus: string;

  // Additional Info
  workExperience: string;
  jobLetterAvailable: boolean;
  studyPurpose: string;
  additionalInfo: string;

  createdAt: string | Date;
  createdBy: string | null | undefined;

  highestQualification: string;
  passingYear: string;
  instituteName: string;
  gradeOrGPA: string;
  majorSubject: string;
  source: string | null;
}

interface EducationDetails {
  ssc: DocumentUpload;
  hsc: DocumentUpload;
  diploma: DocumentUpload;
  honours: DocumentUpload;
  transcript: DocumentUpload;
  testimonial: DocumentUpload;
}

interface CertificateDetails {
  englishProfficiency: DocumentUpload;
  extraSkills: DocumentUpload;
  jobLetter: DocumentUpload;
}

interface DocumentDetails {
  passport: DocumentUpload;
  nidFront: DocumentUpload;
  nidBack: DocumentUpload;
  cv: DocumentUpload;
  studentSignature: DocumentUpload;
}

const DOCUMENT_CATEGORIES = [
  {
    title: "Personal Documents",
    icon: <ReceiptText />,
    documents: [
      {
        key: "profilePicture",
        label: "Profile Picture",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "passport",
        label: "Passport",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "nidFront",
        label: "NID (Front Side)",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "nidBack",
        label: "NID (Back Side)",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "studentSignature",
        label: "Student Signature",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
    ],
  },
  {
    title: "Educational Documents",
    icon: <BookOpen />,
    documents: [
      {
        key: "ssc",
        label: "SSC Certificate",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "hsc",
        label: "HSC Certificate",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "diploma",
        label: "Diploma (If Available)",
        required: false,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "honours",
        label: "Honours/Degree (If Available)",
        required: false,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "transcript",
        label: "Transcript",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "testimonial",
        label: "Testimonial",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
    ],
  },
  {
    title: "Certificates & Proficiency",
    icon: <ShieldCheck />,
    documents: [
      {
        key: "englishProfficiency",
        label: "English Proficiency Test Certificate",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "extraSkills",
        label: "Extra Skills/Certificates",
        required: false,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "jobLetter",
        label: "Present Job Letter (If Available)",
        required: false,
        accept: ".pdf,.jpg,.jpeg,.png",
      },
    ],
  },
  {
    title: "Professional Documents",
    icon: <CheckCircle />,
    documents: [
      {
        key: "cv",
        label: "CV/Resume",
        required: true,
        accept: ".pdf,.doc,.docx",
      },
    ],
  },
];

interface Package {
  course: { value: string };
  location: string;
  packagePrice: string;
  selectDuration: string;
  selectedCountry: string;
  tuitionFree: string;
  university: string;
  semester: { value: string }[];
  languages: { value: string }[];
  coverages: { value: string }[];
  scholarshipPackageId: string;
}

interface PackageProps {
  packageData: Package;
}

export default function ScholarshipApplicationForm({
  packageData,
}: PackageProps) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const [formData, setFormData] = useState<FormData>({
    applicantId: `APP-${Date.now()}`,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "Male",
    dateOfBirth: "",
    nidNumber: "",
    country: "All",
    university: "University name",
    admissionSemester: "All",
    courseName: "BBA",
    language: "English",
    category: "Full",
    coverage: "Tuition",
    paymentMethod: "Bkash",
    paymentStatus: "Pending",
    applicationStatus: "Pending",
    workExperience: "",
    jobLetterAvailable: false,
    studyPurpose: "",
    additionalInfo: "",

    highestQualification: "",
    passingYear: "",
    instituteName: "",
    gradeOrGPA: "",
    majorSubject: "",

    createdAt: new Date(),
    createdBy: session?.user?.email,
    source: source,
  });

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        createdBy: session.user?.email,
      }));
    }
  }, [session]);

  const [documentDetails, setDocumentDetails] = useState<{
    [key: string]: DocumentUpload;
  }>({
    profilePicture: {
      name: "profilePicture",
      file: null,
      url: "",
      type: "image",
      required: true,
    },
    passport: {
      name: "Passport",
      file: null,
      url: "",
      type: "pdf",
      required: true,
    },
    nidFront: {
      name: "NID Front",
      file: null,
      url: "",
      type: "image",
      required: true,
    },
    nidBack: {
      name: "NID Back",
      file: null,
      url: "",
      type: "image",
      required: true,
    },
    studentSignature: {
      name: "Student Signature",
      file: null,
      url: "",
      type: "image",
      required: true,
    },
    ssc: { name: "SSC", file: null, url: "", type: "pdf", required: true },
    hsc: { name: "HSC", file: null, url: "", type: "pdf", required: true },
    diploma: {
      name: "Diploma",
      file: null,
      url: "",
      type: "pdf",
      required: false,
    },
    honours: {
      name: "Honours",
      file: null,
      url: "",
      type: "pdf",
      required: false,
    },
    transcript: {
      name: "Transcript",
      file: null,
      url: "",
      type: "pdf",
      required: true,
    },
    testimonial: {
      name: "Testimonial",
      file: null,
      url: "",
      type: "pdf",
      required: true,
    },
    englishProfficiency: {
      name: "English Proficiency",
      file: null,
      url: "",
      type: "pdf",
      required: true,
    },
    extraSkills: {
      name: "Extra Skills",
      file: null,
      url: "",
      type: "pdf",
      required: false,
    },
    jobLetter: {
      name: "Job Letter",
      file: null,
      url: "",
      type: "pdf",
      required: false,
    },
    cv: { name: "CV", file: null, url: "", type: "pdf", required: true },
  });

  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDocumentChange = async (
    docKey: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDocId(docKey);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pcakge_img_uploade");
      formData.append("cloud_name", "dqyfwfeed");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        throw new Error("Upload failed");
      }

      setDocumentDetails((prev) => ({
        ...prev,
        [docKey]: {
          ...prev[docKey],
          file: file,
          url: result.secure_url,
        },
      }));

      setUploadingDocId(null);

      Swal.fire({
        title: "Success!",
        text: `${documentDetails[docKey].name} uploaded successfully`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadingDocId(null);

      Swal.fire({
        title: "Upload Failed!",
        text: "Please try again or use a different file",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const removeDocument = (docKey: string) => {
    setDocumentDetails((prev) => ({
      ...prev,
      [docKey]: {
        ...prev[docKey],
        file: null,
        url: "",
      },
    }));
  };

  const packageSemesters: string[] = packageData.semester.map((s) => s.value);
  const language: string[] = packageData.languages.map((l) => l.value);
  const coverage: string[] = packageData.coverages.map((c) => c.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      return alert("You must be logged in to submit the application.");
    }
    // Validate required fields
    const requiredDocs = Object.entries(documentDetails)
      .filter(([, doc]) => doc.required && !doc.file)
      .map(([, doc]) => doc.name);

    if (requiredDocs.length > 0) {
      Swal.fire({
        title: "Missing Documents!",
        text: `Please upload: ${requiredDocs.join(", ")}`,
        icon: "warning",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email) {
      Swal.fire({
        title: "Required Fields",
        text: "Please fill in all required personal information",
        icon: "warning",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    try {
      // Prepare documents with URLs only (files are already on Cloudinary)
      const uploadedDocuments: { [key: string]: string } = {};
      Object.entries(documentDetails).forEach(([key, doc]) => {
        if (doc.file) {
          uploadedDocuments[key] = doc.url; // Store Cloudinary URL
        }
      });

      // Submit form data
      const submissionData = {
        ...formData,
        country: packageData.selectedCountry,
        university: packageData.university,
        courseName: packageData.course.value,
        packagePrice: packageData.packagePrice,
        tuitionFree: packageData.tuitionFree,
        location: packageData.location,
        documents: uploadedDocuments,
        submittedAt: new Date().toISOString(),
        packageId: packageData.scholarshipPackageId,
      };

      

      const addApplicationForm = await fetch(
        "https://gm-international-server-gamma.vercel.app/student-home-page/student-package-offer/user-application-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const resultOfApplicationForm = await addApplicationForm.json();

      if (!resultOfApplicationForm.insertedId) {
        Swal.fire({
          title: "Something was wrong!! try again",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (resultOfApplicationForm.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application has been successfully submitted.",
          icon: "success",
          confirmButtonColor: "#dc2626",
          timer: 2000,
        });
      }
      // Reset form
      handleReset();
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      applicantId: `APP-${Date.now()}`,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "Male",
      dateOfBirth: "",
      nidNumber: "",
      country: "All",
      university: "University name",
      admissionSemester: "All",
      courseName: "BBA",
      language: "English",
      category: "Full",
      coverage: "Tuition",
      paymentMethod: "Bkash",
      paymentStatus: "Pending",
      applicationStatus: "Pending",
      workExperience: "",
      jobLetterAvailable: false,
      studyPurpose: "",
      additionalInfo: "",

      highestQualification: "",
      passingYear: "",
      instituteName: "",
      gradeOrGPA: "",
      majorSubject: "",

      createdAt: new Date(),
      createdBy: session?.user?.email,
      source: source,
    });

    Object.keys(documentDetails).forEach((key) => {
      removeDocument(key);
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">
            Complete Admission Application
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Submit all required documents and information for your scholarship
            application. Please ensure all files are clear and properly scanned.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <SquareUserRound /> Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="+880 1XXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NID Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nidNumber}
                  onChange={(e) =>
                    handleInputChange("nidNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Enter your NID number"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <GraduationCap /> Scholarship Academic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-600">*</span>
                </label>
                {/* <Dropdown
                  options={[packageData.selectedCountry]}
                  value={formData.country}
                  onChange={(value) => handleInputChange("country", value)}
                /> */}
                <input
                  type="text"
                  required
                  readOnly
                  value={packageData.selectedCountry}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                {/* <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>All</option>
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>Malaysia</option>
                  <option>USA</option>
                  <option>UK</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University <span className="text-red-600">*</span>
                </label>
                {/* <Dropdown
                  options={[packageData.university]}
                  value={formData.university}
                  onChange={(value) => handleInputChange("university", value)}
                /> */}
                <input
                  type="text"
                  required
                  readOnly
                  value={packageData.university}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                {/* <select
                  value={formData.university}
                  onChange={(e) =>
                    handleInputChange("university", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>University name</option>
                  <option>Harvard</option>
                  <option>MIT</option>
                  <option>Oxford</option>
                  <option>Cambridge</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course <span className="text-red-600">*</span>
                </label>
                {/* <Dropdown
                  options={[packageData.course.value]}
                  value={formData.courseName}
                  onChange={(value) => handleInputChange("courseName", value)}
                /> */}
                <input
                  type="text"
                  required
                  readOnly
                  value={packageData.course.value}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                {/* <select
                  value={formData.courseName}
                  onChange={(e) =>
                    handleInputChange("courseName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>BBA</option>
                  <option>Engineering</option>
                  <option>Medicine</option>
                  <option>Law</option>
                  <option>Science</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admission Semester <span className="text-red-600">*</span>
                </label>
                <Dropdown
                  options={[...packageSemesters]}
                  value={formData.admissionSemester}
                  onChange={(value) =>
                    handleInputChange("admissionSemester", value)
                  }
                />
                {/* <select
                  value={formData.admissionSemester}
                  onChange={(e) =>
                    handleInputChange("admissionSemester", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>All</option>
                  <option>Fall</option>
                  <option>Spring</option>
                  <option>Summer</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language <span className="text-red-600">*</span>
                </label>
                <Dropdown
                  options={[...language]}
                  value={formData.language}
                  onChange={(value) => handleInputChange("language", value)}
                />
                {/* <select
                  value={formData.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage <span className="text-red-600">*</span>
                </label>
                <Dropdown
                  options={[...coverage]}
                  value={formData.coverage}
                  onChange={(value) => handleInputChange("coverage", value)}
                />
                {/* <select
                  value={formData.coverage}
                  onChange={(e) =>
                    handleInputChange("coverage", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>Tuition</option>
                  <option>Full Scholarship</option>
                  <option>Partial Scholarship</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Price <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  readOnly
                  value={packageData.packagePrice}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuition Free <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  readOnly
                  value={packageData.tuitionFree}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University Location <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  readOnly
                  value={packageData.location}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <School /> Academic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>All</option>
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>Malaysia</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hightest Qualification <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.highestQualification}
                  onChange={(e) =>
                    handleInputChange("highestQualification", e.target.value)
                  }
                  placeholder="Enter your Qualification"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Year <span className="text-red-600">*</span>
                </label>
                <input
                  value={formData.passingYear}
                  type="date"
                  onChange={(e) =>
                    handleInputChange("passingYear", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute Name <span className="text-red-600">*</span>
                </label>
                <input
                  value={formData.instituteName}
                  type="text"
                  onChange={(e) =>
                    handleInputChange("instituteName", e.target.value)
                  }
                  placeholder="Enter your institute name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Or GPA <span className="text-red-600">*</span>
                </label>
                <input
                  value={formData.gradeOrGPA}
                  placeholder="Enter your grade"
                  onChange={(e) =>
                    handleInputChange("gradeOrGPA", e.target.value)
                  }
                  required
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major Subject <span className="text-red-600">*</span>
                </label>
                <input
                  value={formData.majorSubject}
                  onChange={(e) =>
                    handleInputChange("majorSubject", e.target.value)
                  }
                  type="text"
                  placeholder="Enter your Major Subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Document Upload Sections */}
          {DOCUMENT_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-lg shadow-md p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-3xl">{category.icon}</span>
                {category.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.documents.map((doc) => {
                  const docData = documentDetails[doc.key];
                  const isUploading = uploadingDocId === doc.key;

                  return (
                    <div
                      key={doc.key}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            {doc.label}
                            {doc.required && (
                              <span className="text-red-600 ml-1">*</span>
                            )}
                          </label>
                        </div>
                        {docData.file && (
                          <button
                            type="button"
                            onClick={() => removeDocument(doc.key)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {docData.file ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-700 truncate">
                            {docData.file.name}
                          </span>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 hover:bg-red-50 transition">
                            {isUploading ? (
                              <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin text-red-600" />
                                <span className="text-sm text-red-600">
                                  Uploading...
                                </span>
                              </div>
                            ) : (
                              <div>
                                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                  Click to upload
                                </p>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            accept={doc.accept}
                            onChange={(e) => handleDocumentChange(doc.key, e)}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookMarked /> Additional Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Work Experience
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.workExperience}
                  onChange={(e) =>
                    handleInputChange("workExperience", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Enter years of experience"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.jobLetterAvailable}
                    onChange={(e) =>
                      handleInputChange("jobLetterAvailable", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    I have a present job letter
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Study Purpose/Motivation
                </label>
                <textarea
                  value={formData.studyPurpose}
                  onChange={(e) =>
                    handleInputChange("studyPurpose", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Explain your study purpose and career goals..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("additionalInfo", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Any additional information you'd like to share..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BadgeTurkishLira /> Payment Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method <span className="text-red-600">*</span>
                </label>
                <Dropdown
                  options={[
                    "Bkash",
                    "Nagad",
                    "Rocket",
                    "Credit Card",
                    "Bank Transfer",
                  ]}
                  value={formData.paymentMethod}
                  onChange={(value) =>
                    handleInputChange("paymentMethod", value)
                  }
                />
                {/* <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    handleInputChange("paymentMethod", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>Bkash</option>
                  <option>Nagad</option>
                  <option>Rocket</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-600">*</span>
                </label>
                <Dropdown
                  options={["Full", "Partial", "Merit"]}
                  value={formData.category}
                  onChange={(value) => handleInputChange("category", value)}
                />
                {/* <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                >
                  <option>Full</option>
                  <option>Partial</option>
                  <option>Merit</option>
                </select> */}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition transform hover:scale-105 active:scale-95"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition transform hover:scale-105 active:scale-95"
              >
                Submit Application
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

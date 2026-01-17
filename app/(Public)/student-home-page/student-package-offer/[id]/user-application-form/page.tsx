"use client";

import { useEffect, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import Dropdown from "./components/dropDown";
import { useParams, useRouter } from "next/navigation";
import { spawn } from "child_process";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface FormData {
  applicantId: string;
  country: string;
  university: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  admissionSemester: string;
  language: string;
  courseName: string;
  coverage: string;
  email: string;
  category: string;
  paymentMethod: string;
  createdAt: string | Date;
  createdBy: string | null | undefined;
}

interface ImgFormData {
  secure_url?: string;
}

export default function AdmissionForm() {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    applicantId: "",
    country: "All",
    university: "University name",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "Male",
    dateOfBirth: "",
    admissionSemester: "All",
    language: "English",
    courseName: "BBA",
    coverage: "Tuition",
    email: "",
    category: "Full",
    paymentMethod: "Bkash",
    createdAt: new Date(),
    createdBy: session?.user?.email,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [imgformData, setImgFormData] = useState<ImgFormData>({
    secure_url: "",
  });
  const [uploaded, setUploaded] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { secure_url } = imgformData;

  const handleClear = () => {
    setFormData({
      applicantId: "",
      country: "All",
      university: "University name",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "Male",
      dateOfBirth: "",
      admissionSemester: "All",
      language: "English",
      courseName: "BBA",
      coverage: "Tuition",
      email: "",
      category: "Full",
      paymentMethod: "Bkash",
      createdAt: new Date(),
      createdBy: session?.user?.email,
    });
  };

  useEffect(() => {
    const packagePreFieldData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management/${id}`,
          {
            cache: "no-store",
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    packagePreFieldData();
  }, []);

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    setUploaded(false);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        return;
      }
      setImgFormData((prev) => ({
        ...prev,
        secure_url: result.secure_url,
      }));
      setIsUploading(false);
      setUploaded(true);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleApplicationSubmit = async (e: any) => {
    e.preventDefault();

    const addApplicationForm = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/student-home-page/student-package-offer/user-application-form`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, imgUrl: secure_url }),
      }
    );

    const resultOfApplicationForm = await addApplicationForm.json();

    if (!resultOfApplicationForm) {
      Swal.fire({
        title: "Something was worng!! try again",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (resultOfApplicationForm.insertedId) {
      Swal.fire({
        title: "Your Form has been submited",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }

    setFormData({
      applicantId: "",
      country: "All",
      university: "University name",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "Male",
      dateOfBirth: "",
      admissionSemester: "All",
      language: "English",
      courseName: "BBA",
      coverage: "Tuition",
      email: "",
      category: "Full",
      paymentMethod: "Bkash",
      createdAt: new Date(),
      createdBy: session?.user?.email,
    });
    setUploaded(false);
    router.push(`/student-home-page/student-package-offer/${id}`);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-3 sm:mb-4">
            Application Form For Admission
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
            doloroi egestas morbi sem vulputate etiam facilisis pellentesque ut
            quis.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-lg animate-slide-up">
          {/* Form Header */}

          <form
            onSubmit={(e) => handleApplicationSubmit(e)}
            className="space-y-8"
          >
            {/* Row 1: Country, University, Upload */}
            <div className="mb-8 bg-[#F3F3F3] p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
              <div className="mb-4">
                <p className="text-gray-700 font-semibold text-sm sm:text-base">
                  * Fill up the form to apply
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "100ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Country
                  </label>
                  <Dropdown
                    options={["All", "Australia", "Chaina", "Malaysia"]}
                    value={formData.country}
                    onChange={(value) => handleInputChange("country", value)}
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "150ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    University<span className="text-red-600">*</span>
                  </label>
                  <Dropdown
                    options={[
                      "University name",
                      "Harvard",
                      "MIT",
                      "Oxford",
                      "Cambridge",
                    ]}
                    value={formData.university}
                    onChange={(value) => handleInputChange("university", value)}
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "200ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Photo of the Student
                  </label>
                  <label
                    htmlFor="fileUpload"
                    className={`cursor-pointer w-full py-3 px-4 border-2 ${
                      uploaded
                        ? "border-green-600 text-green-600"
                        : "border-red-600 text-red-600"
                    } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Upload PDF/Doc
                      </>
                    )}
                  </label>

                  <input
                    id="fileUpload"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                    className="hidden"
                  />
                  {uploaded && (
                    <span className="text-sm text-green-500">
                      Image uploaded successfully
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8 bg-[#F3F3F3] p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg space-y-8">
              {/* Row 2: First Name, Last Name, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "250ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Mr."
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "300ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Josaf"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "350ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+880 193454 3544522"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Row 3: Gender, Date of Birth, Admission Semester */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "400ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Gender
                  </label>
                  <Dropdown
                    options={["Male", "Female", "Other"]}
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "450ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "500ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Admission To Semester
                  </label>
                  <Dropdown
                    options={["All", "Fall", "Spring", "Summer"]}
                    value={formData.admissionSemester}
                    onChange={(value) =>
                      handleInputChange("admissionSemester", value)
                    }
                  />
                </div>
              </div>

              {/* Row 4: Language, Course Name, Coverage */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "550ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Language
                  </label>
                  <Dropdown
                    options={[
                      "English",
                      "Spanish",
                      "French",
                      "German",
                      "Arabic",
                    ]}
                    value={formData.language}
                    onChange={(value) => handleInputChange("language", value)}
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "600ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Course name
                  </label>
                  <Dropdown
                    options={[
                      "BBA",
                      "Engineering",
                      "Medicine",
                      "Law",
                      "Science",
                    ]}
                    value={formData.courseName}
                    onChange={(value) => handleInputChange("courseName", value)}
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "650ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Coverage
                  </label>
                  <Dropdown
                    options={[
                      "Tuition",
                      "Full Scholarship",
                      "Partial Scholarship",
                    ]}
                    value={formData.coverage}
                    onChange={(value) => handleInputChange("coverage", value)}
                  />
                </div>
              </div>

              {/* Row 5: Email, Category, Payment Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "700ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Example@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "750ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Category
                  </label>
                  <Dropdown
                    options={["Full", "Partial", "Merit"]}
                    value={formData.category}
                    onChange={(value) => handleInputChange("category", value)}
                  />
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "800ms" }}
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                    Payment method
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
                </div>
              </div>
              {/* Buttons */}
              <div
                className="flex justify-between sm:flex-row gap-4 sm:gap-6 pt-6 animate-fade-in"
                style={{ animationDelay: "850ms" }}
              >
                <button
                  type="submit"
                  className="py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base hover:cursor-pointer"
                >
                  Submit
                </button>

                <div className="flex gap-8">
                  <button
                    type="button"
                    className="py-3 px-8 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base hover:cursor-pointer"
                  >
                    Scan your passport
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex-1 py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base hover:cursor-pointer"
                  >
                    Clear form
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              *Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
              doloroi egestas morbi sem vulputate etiam facilisis pellentesque
              ut quis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

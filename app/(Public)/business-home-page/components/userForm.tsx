"use client";

import { useState } from "react";
import { Upload, Loader, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function RegistrationForm() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    country: "",
    companyName: "",
    passport: "",
    visitingCard: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "Male",
    dateOfBirth: "",
    designation: "",
    companyType: "",
    officeLocation: "",
    travelPurpose: "",
    email: "",
    travelPlan: "",
    paymentMethod: "",
    createdAt: new Date(),
    createdBy: session?.user?.email,
    paymentStatus: "pending",
    applicationStatus: "pending",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [cardUploaded, setCardUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const passport = "passport";
  const card = "card";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e: any, value: string) => {
    const file = e.target.files[0];
    
    if (!file) return;
    setIsUploading(true);
    setUploaded(false);
    setCardUploaded(false);

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
        
      }
      if (value === passport) {
        setFormData((prev) => ({
          ...prev,

          passport: result.secure_url,
        }));
        setUploaded(true);
      }

      if (value === card) {
        setFormData((prev) => ({
          ...prev,

          visitingCard: result.secure_url,
        }));
        setCardUploaded(true);
      }

      setIsUploading(false);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      

      const res = await fetch(
        "https://gm-international-server-gamma.vercel.app/business-submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
     

      if (!result.insertedId) {
        Swal.fire({
          title: "Something was wrong!! try again",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (result.insertedId) {
        Swal.fire({
          title: "Your Form has been submitted",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        handleClear();
      }
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      country: "All",
      companyName: "",
      passport: "",
      visitingCard: "",
      firstName: "",
      lastName: "",
      phone: "",
      gender: "Male",
      dateOfBirth: "",
      designation: "",
      companyType: "",
      officeLocation: "",
      travelPurpose: "",
      email: "info@gmail.com",
      travelPlan: "",
      paymentMethod: "",
      createdAt: new Date(),
      createdBy: session?.user?.email,
      paymentStatus: "pending",
      applicationStatus: "pending",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="form-header text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">
            Registration form
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We help businesses grow with transparent guidance, dependable
            service, and smart solutions. Our focus is on building trust and
            delivering real value—every step of the journey. With us, you get
            support that’s reliable, honest, and built for long-term success.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Section 1: Upload Documents */}
          <div className="form-section bg-gray-100 rounded-lg p-6 sm:p-8 border border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-6 sm:mb-8">
              * Fill up the form to register
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Country */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2 ">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="select-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option>Select country</option>
                  <option>China</option>
                  <option>Malaysia</option>
                  <option>Australia</option>
                </select>
              </div>

              {/* Company Name */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name*
                </label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="select-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Passport Upload */}
              <div
                className="animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                  Photo of the passport
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
                      Photo/PDF
                    </>
                  )}
                </label>

                <input
                  id="fileUpload"
                  type="file"
                  onChange={(e) => handleFileUpload(e, passport)}
                  className="hidden"
                />
                {uploaded && (
                  <span className="text-sm text-green-500">
                    Image uploaded successfully
                  </span>
                )}
              </div>
              {/* <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110 z-10">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, passport)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <div className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 bg-white cursor-pointer flex items-center">
                    <span
                      className={
                        formData.passport
                          ? "text-slate-700 truncate"
                          : "text-gray-400"
                      }
                    >
                      {formData.passport
                        ? formData.passport
                        : "Upload Document"}
                    </span>
                  </div>
                </div>
                {uploaded && (
                  <span className="text-sm text-green-500">
                    Image uploaded successfully
                  </span>
                )}
              </div> */}
            </div>

            {/* Visiting Card */}
            <div
              className="animate-fade-in my-4"
              style={{ animationDelay: "200ms" }}
            >
              <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Photo of the visitingCard
              </label>
              <label
                htmlFor="visitingCard"
                className={`cursor-pointer py-3 px-4 border-2 ${
                  cardUploaded
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
                    Photo/PDF
                  </>
                )}
              </label>

              <input
                id="visitingCard"
                type="file"
                onChange={(e) => handleFileUpload(e, card)}
                className="hidden"
              />
              {cardUploaded && (
                <span className="text-sm text-green-500">
                  Image uploaded successfully
                </span>
              )}
            </div>

            {/* <div className="form-group mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visiting card
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, card)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
                <div className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 bg-white cursor-pointer flex items-center">
                  <span
                    className={
                      formData.visitingCard
                        ? "text-slate-700 truncate"
                        : "text-gray-400"
                    }
                  >
                    {formData.visitingCard
                      ? formData.visitingCard
                      : "Upload Document"}
                  </span>
                </div>
              </div>
              {uploaded && (
                <span className="text-sm text-green-500">
                  Image uploaded successfully
                </span>
              )}
            </div> */}
          </div>
        </div>

        {/* Section 2: Personal Information */}
        <div className="form-section bg-gray-100 rounded-lg p-6 sm:p-8 border border-gray-200 space-y-6">
          {/* Row 1: Name and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 2: Gender, DOB, Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="select-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                type="date"
                className="select-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your designation
              </label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 3: Company Type, Office, Travel Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Type
              </label>
              <input
                name="companyType"
                value={formData.companyType}
                onChange={handleInputChange}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office Location
              </label>
              <input
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleInputChange}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel purpose
              </label>
              <select
                name="travelPurpose"
                value={formData.travelPurpose}
                onChange={handleInputChange}
                className="select-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option>Select</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          {/* Row 4: Email, Travel Plan, Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Plan
              </label>
              <select
                name="travelPlan"
                value={formData.travelPlan}
                onChange={handleInputChange}
                className="select-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option>Full</option>
                <option>Partial</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="select-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option>Select method</option>
                <option>Bkash</option>
                <option>Nagad</option>
                <option>Card</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between pt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="submit-button bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>

          <div className="flex gap-4 w-full sm:w-auto">
            <button className="action-button bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg flex-1 sm:flex-none">
              Scan your passport
            </button>

            <button
              onClick={handleClear}
              className="action-button bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg flex-1 sm:flex-none"
            >
              Clear form
            </button>
          </div>
        </div>

        {/* Help Link */}
        <div className="text-center pt-4">
          <p className="text-gray-700 text-sm">
            Want us to assist you for a hotel package?{" "}
            <span className="link-button text-red-500 font-semibold">
              Click here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Upload, Loader, Loader2, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { fbEvent } from "@/lib/fbPixel";

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
    officeLocation: "",
    email: "",
    paymentMethod: "",
    tradeLicense: "",
    passportFile: "",
    photo: "",
    createdAt: new Date(),
    createdBy: session?.user?.email,
    paymentStatus: "pending",
    applicationStatus: "pending",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [cardUploaded, setCardUploaded] = useState(false);
  const [uploading, setUploading] = useState({
    passport: false,
    card: false,
    trade: false,
    photo: false,
  });

  const [passportUploaded, setPassportUploaded] = useState(false);
  const [tradeUploaded, setTradeUploaded] = useState(false);
  const [visitingUploaded, setVisitingUploaded] = useState(false);
  const [photo, setPhoto] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (
    e: any,
    value: "passport" | "card" | "trade" | "photo",
  ) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading((p) => ({ ...p, [value]: true }));

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
        },
      );

      const result = await res.json();

      if (!result.secure_url) return;

      if (value === "passport") {
        setFormData((p) => ({ ...p, passport: result.secure_url }));
        setPassportUploaded(true);
      }

      if (value === "card") {
        setFormData((p) => ({ ...p, visitingCard: result.secure_url }));
        setVisitingUploaded(true);
      }

      if (value === "trade") {
        setFormData((p) => ({ ...p, tradeLicense: result.secure_url }));
        setTradeUploaded(true);
      }
      if (value === "photo") {
        setFormData((p) => ({ ...p, photo: result.secure_url }));
        setPhoto(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading((p) => ({ ...p, [value]: false }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/business-submit-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();

      if (!result.success) {
        Swal.fire({
          title: "Something was wrong!! try again",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      fbEvent("BusinessForm", {
        content_company: [formData.companyName],
        content_type: "business",
        email: formData.email,
        currency: "BDT",
      });
      

      if (result.success) {
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
      officeLocation: "",
      email: "info@gmail.com",
      paymentMethod: "",
      tradeLicense: "",
      passportFile: "",
      photo: "",
      createdAt: new Date(),
      createdBy: session?.user?.email,
      paymentStatus: "pending",
      applicationStatus: "pending",
    });
    setVisitingUploaded(false);
    setPassportUploaded(false);
    setTradeUploaded(false);
    setPhoto(false);
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

              {/* visiting card */}
              <div
                className="animate-fade-in my-4"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                  Visiting Card <span className="text-red-400">*</span>
                </label>
                <label
                  htmlFor="card"
                  className={`cursor-pointer py-3 px-4 border-2 ${
                    visitingUploaded
                      ? "border-green-600 text-green-600"
                      : "border-red-600 text-red-600"
                  } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
                >
                  {uploading.card ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Visiting/PDF
                    </>
                  )}
                </label>

                <input
                  id="card"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "card")}
                  className="hidden"
                />

                {visitingUploaded && (
                  <span>Card is uploaded uploaded successfully</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="animate-fade-in my-4"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                  Passport <span className="text-red-400">*</span>
                </label>
                <label
                  htmlFor="passport"
                  className={`cursor-pointer py-3 px-4 border-2 ${
                    passportUploaded
                      ? "border-green-600 text-green-600"
                      : "border-red-600 text-red-600"
                  } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
                >
                  {uploading.passport ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Passport/PDF
                    </>
                  )}
                </label>

                <input
                  id="passport"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "passport")}
                  className="hidden"
                />

                {passportUploaded && (
                  <span>Passport uploaded successfully</span>
                )}
              </div>

              <div
                className="animate-fade-in my-4"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                  Trade License
                </label>
                <label
                  htmlFor="tradeLicense"
                  className={`cursor-pointer py-3 px-4 border-2 ${
                    tradeUploaded
                      ? "border-green-600 text-green-600"
                      : "border-red-600 text-red-600"
                  } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
                >
                  {uploading.trade ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Trade/PDF
                    </>
                  )}
                </label>

                <input
                  id="tradeLicense"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "trade")}
                  className="hidden"
                />
                {tradeUploaded && (
                  <span>Trade License uploaded successfully</span>
                )}
              </div>
              <div
                className="animate-fade-in my-4"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                  Passport Size Photo<span className="text-red-400">*</span>
                </label>
                <label
                  htmlFor="photo"
                  className={`cursor-pointer py-3 px-4 border-2 ${
                    photo
                      ? "border-green-600 text-green-600"
                      : "border-red-600 text-red-600"
                  } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
                >
                  {uploading.photo ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Photo
                    </>
                  )}
                </label>

                <input
                  id="photo"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "photo")}
                  className="hidden"
                />
                {photo && <span>Photo uploaded successfully</span>}
              </div>
            </div>
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
                Company Email Address
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

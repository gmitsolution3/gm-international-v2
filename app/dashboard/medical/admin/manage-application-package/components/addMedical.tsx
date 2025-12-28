import { useState, ChangeEvent, FormEvent } from "react";
import {
  Plus,
  Trash2,
  CheckCircle,
  Loader2,
  Upload,
  ImagePlus,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

interface DoctorInfo {
  name: string;
  rating: string;
  expertise: string;
  image: string | null;
  uploaded?: boolean;
  uploading?: boolean;
}

interface FormDataType {
  hospitalName: string;
  images: File[];
  country: string;
  city: string;
  address: string;
  description: string;
  doctors: DoctorInfo[];
  createdAt: string;
  createdBy: string | null | undefined;
  // video: File | null;
}

interface OnClose {
  onClose: () => void;
  email: string | null | undefined;
}

export default function HospitalForm({ onClose, email }: OnClose) {
  const [formData, setFormData] = useState<FormDataType>({
    hospitalName: "",
    images: [],
    country: "",
    city: "",
    address: "",
    description: "",
    doctors: [
      {
        name: "",
        rating: "",
        expertise: "",
        image: null,
        uploaded: false,
        uploading: false,
      },
    ],
    createdAt: new Date().toLocaleString(),
    createdBy: email,
    // video: null,
  });

  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: any) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (formData.images.length + files.length > 4) {
      alert("You can upload maximum 4 photos");
      return;
    }

    setIsUploading(true);

    const uploadPromises = files.map(async (file: any) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "pcakge_img_uploade");
      data.append("cloud_name", "dqyfwfeed");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        { method: "POST", body: data }
      );
      const result = await res.json();
      return result.secure_url;
    });

    try {
      const newPhotos = await Promise.all(uploadPromises);
      
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newPhotos],
      }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleDoctorChange = (
    index: number,
    field: keyof DoctorInfo,
    value: string
  ): void => {
    const newDoctors = [...formData.doctors];
    if (field !== "image") {
      (newDoctors[index][field] as string) = value;
    }
    setFormData((prev) => ({ ...prev, doctors: newDoctors }));
  };

  const handleDoctorImageChange = async (index: number, file: File | null) => {
    if (!file) return;

    // set uploading=true for specific doctor
    const doctorList = [...formData.doctors];
    doctorList[index].uploading = true;
    doctorList[index].uploaded = false;
    setFormData({ ...formData, doctors: doctorList });

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
      { method: "POST", body: data }
    );
    const result = await res.json();
    const preview = result.secure_url;

    doctorList[index].image = preview;
    doctorList[index].uploading = false;
    doctorList[index].uploaded = true;

    setFormData({ ...formData, doctors: doctorList });
  };

  const addDoctor = (): void => {
    setFormData((prev) => ({
      ...prev,
      doctors: [
        ...prev.doctors,
        { name: "", rating: "", expertise: "", image: null },
      ],
    }));
  };

  const removeDoctor = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      doctors: prev.doctors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.hospitalName ||
      !formData.country ||
      !formData.city ||
      !formData.address
    ) {
      alert("Please fill all required fields!");
      return;
    }

   
    // setTimeout(() => setSubmitted(false), 4000);

    const res = await fetch(
      "https://gm-international-server-gamma.vercel.app/medical-list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await res.json();

    if (!result) {
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
      setSubmitted(true);
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      hospitalName: "",
      images: [],
      country: "",
      city: "",
      address: "",
      description: "",
      doctors: [{ name: "", rating: "", expertise: "", image: null }],
      createdAt: new Date().toLocaleString(),
      createdBy: email,
    });
  };

  return (
    <div className="min-h-screen px-3 py-6 sm:px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 animate-slide-in-down">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-red-600 via-red-700 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            Hospital Information Form
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Fill in complete hospital details and doctor information
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-6 md:p-8">
          <div className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            {/* Hospital Name */}
            <div className="section-card">
              <label className="block text-base sm:text-lg font-bold text-gray-800 mb-2">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("hospitalName")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg input-focus text-sm sm:text-base"
                placeholder="Enter hospital name"
              />
            </div>

            {/* Hospital Images */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                <ImagePlus size={16} className="inline mr-1 text-red-500" />
                Add medical photo (Max-4)
                <span className="text-red-500">*</span>
              </label>
              <label
                htmlFor="fileUpload"
                className={`cursor-pointer w-full py-3 px-4 border-2 ${
                  uploaded
                    ? "border-green-600 text-green-600"
                    : "border-red-700 text-red-700"
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

              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative group w-full">
                      <img
                        src={url}
                        alt={`uploaded-${index}`}
                        className="h-full w-full object-cover rounded-lg border border-gray-300"
                      />

                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Info */}
            <div className="section-card">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
                Location Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg input-focus text-sm sm:text-base"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg input-focus text-sm sm:text-base"
                    placeholder="City"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg input-focus text-sm sm:text-base"
                    placeholder="Full address"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="section-card">
              <label className="block text-base sm:text-lg font-bold text-gray-800 mb-2">
                Hospital Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg input-focus h-24 sm:h-28 resize-none text-sm sm:text-base"
                placeholder="Enter hospital description..."
              />
            </div>

            {/* Doctors Section */}
            <div className="section-card p-4 sm:p-6 rounded-lg border-2 border-indigo-200">
              <h2 className="text-lg sm:text-2xl font-bold text-red-700 mb-4 sm:mb-6">
                Doctor Information
              </h2>

              {formData.doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="doctor-card bg-white p-3 sm:p-5 rounded-lg mb-4 border-2 border-indigo-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-red-700">
                      Doctor #{index + 1}
                    </h3>
                    {formData.doctors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDoctor(index)}
                        className="btn-hover text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                        Doctor Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={doctor.name}
                        onChange={(e) =>
                          handleDoctorChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg input-focus text-xs sm:text-sm"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                        Rating (out of 5){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={doctor.rating}
                        onChange={(e) =>
                          handleDoctorChange(index, "rating", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg input-focus text-xs sm:text-sm"
                        placeholder="Rating"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      Expertise/Specialization{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={doctor.expertise}
                      onChange={(e) =>
                        handleDoctorChange(index, "expertise", e.target.value)
                      }
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg input-focus text-xs sm:text-sm"
                      placeholder="e.g., Cardiologist"
                    />
                  </div>

                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                      <ImagePlus
                        size={16}
                        className="inline mr-1 text-red-500"
                      />
                      Doctor Photo
                      <span className="text-red-500">*</span>
                    </label>
                    <label
                      htmlFor={`docFileUpload-${index}`}
                      className={`cursor-pointer w-full py-3 px-4 border-2 ${
                        doctor.uploaded
                          ? "border-green-700 text-green-700"
                          : "border-red-700 text-red-700"
                      } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
                    >
                      {doctor.uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" /> Upload Photo
                        </>
                      )}
                    </label>

                    <input
                      id={`docFileUpload-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleDoctorImageChange(
                          index,
                          e.currentTarget.files?.[0] || null
                        )
                      }
                      className="hidden"
                    />
                    {doctor.uploaded && (
                      <span className="text-green-500">
                        Image uploaded successfully
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addDoctor}
                className="flex items-center gap-2 flex-1 bg-[#CA2328] hover:bg-[#e21219] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 hover:cursor-pointer"
              >
                <Plus size={20} /> Add New Doctor
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex gap-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-[#CA2328] hover:bg-[#e21219] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 hover:cursor-pointer"
              >
                Submit Form
              </button>
              <button
                onClick={handleReset}
                className="flex-1 border-2 border-[#CA2328] hover:bg-[#CA2328] hover:text-white hover:cursor-pointer text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 active:scale-95"
              >
                Clear Form
              </button>
            </div>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="success-message mt-6 p-4 sm:p-6 bg-green-50 border-2 border-green-500 rounded-lg flex items-center gap-3">
              <CheckCircle
                size={24}
                className="text-green-600 animate-pulse-scale"
              />
              <div>
                <p className="font-bold text-green-800 text-base sm:text-lg">
                  Success!
                </p>
                <p className="text-green-700 text-xs sm:text-sm">
                  Your form has been submitted successfully.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Eye,
  X,
  FileText,
  Check,
  Trash2,
  MapPin,
  GraduationCap,
  DollarSign,
  Globe,
  Clock,
  BookOpen,
  Languages,
  Award,
  Save,
  Edit2,
} from "lucide-react";
import { PackageDescriptionView } from "./PackageDescriptionView";
// Quill imports
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "sonner";
import Swal from "sweetalert2";

// --- Quill Editor Component ---
const QuillEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, false] }],
            ["link", "clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        const html = quillRef.current?.root.innerHTML || "";
        onChange(html === "<p><br></p>" ? "" : html);
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return <div ref={editorRef} className="bg-white min-h-37.5" />;
};

// Types (Same as before)
interface Country {
  id: number;
  name: string;
}

interface Scholarship {
  _id: string;
  packagePrice: string;
  universityURL: string;
  deadlineDate: string;
  startingDate: string;
  tuitionFree: string;
  sl_No: string;
  scholarshipDetails: string;
  universitysDescription: string;
  courseName: string;
  applicationRequirement: string;
  idCard: string;
  thumbnail: string;
  selectedCountry: Country;
  universityName: string;
  selectUniversitiesProgram: string;
  selectStudyLevel: string;
  selectDuration: string;
  language: string;
  createdAt: string;
  status?: string;
  country: string;
  applicationFee: string;
  serviceFee: string;
  duration: string;
  description: string;
  universityDescription: string;
  city: string;
  deadline: string;
  isInternationalStudent: boolean;
  programs?: string[];
}

const ScholarshipPackageInAdminDashboard: React.FC<{
  scholarshipPackage: Scholarship[];
}> = ({ scholarshipPackage }) => {
  const [scholarships, setScholarships] =
    useState<Scholarship[]>(scholarshipPackage);
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Edit logic states
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status?: string): string => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Inactive":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const startEditing = () => {
    setEditData(selectedScholarship);
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (editData) {
      setEditData({
        ...editData,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  const handleProgramEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (!editData) return;

    const updated = [...(editData.programs || [])];
    updated[index] = e.target.value;

    setEditData({
      ...editData,
      programs: updated,
    });
  };

  const addProgram = () => {
    if (!editData) return;

    setEditData({
      ...editData,
      programs: [...(editData.programs || []), ""],
    });
  };

  const removeProgram = (index: number) => {
    if (!editData) return;

    const updated = (editData.programs || []).filter((_, i) => i !== index);

    setEditData({
      ...editData,
      programs: updated.length ? updated : [""],
    });
  };

  const handleDescriptionChange = (field: string, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleUpdate = async () => {
    if (!editData) return;
    setLoading(true);

    console.log({ editData: editData });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management/${editData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        },
      );

      if (!res.ok) toast.error("Update failed");

      const updatedData = await res.json();

      setScholarships((prev) =>
        prev.map((s) => (s._id === editData._id ? editData : s)),
      );
      setSelectedScholarship(editData);
      setIsEditing(false);
      toast.success("Updated successfully!");
      setSelectedScholarship(null);
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await res.json();
      if (!data.success) return toast.error(data.message);

      // UI update
      setScholarships((prev) =>
        prev.map((sch) =>
          sch._id === id ? { ...sch, status: newStatus } : sch,
        ),
      );

      if (selectedScholarship?._id === id) {
        setSelectedScholarship({
          ...selectedScholarship,
          status: newStatus,
        });
      }
      toast.success("Status updated successfully");
      setSelectedScholarship(null);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CA2328",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management/${id}`,
            { method: "DELETE" },
          );
          const result: any = res.json();

          if (!res.ok) {
            toast.error("Something was wrong! Try again letter");
          }

          setScholarships((prev) => prev.filter((s) => s._id !== id));
          setSelectedScholarship(null);
          toast.success("Package deleted successfully");
        } catch (err) {
          alert("Deletion failed");
        }
      }
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(Number(amount));
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4 animate-slide-up">
          {scholarships.map((scholarship, idx) => (
            <div
              key={scholarship._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100 hover:shadow-xl transition-all duration-200"
            >
              <div className="relative h-48">
                <img
                  src={scholarship.thumbnail || "/placeholder.svg"}
                  alt={scholarship.universityName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      scholarship.status,
                    )}`}
                  >
                    {scholarship.status || "Active"}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {scholarship.universityName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>{scholarship.country}-</span>
                    <span>{scholarship.city} </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Starting Date</p>
                    <p className="font-semibold text-gray-800 truncate">
                      {scholarship.startingDate}
                    </p>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Deadline</p>
                    <p className="font-semibold text-gray-800">
                      {scholarship.deadline}
                    </p>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Service Fee</p>
                    <p className="font-semibold text-gray-800">
                      {formatCurrency(scholarship.serviceFee)}
                    </p>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Application Fee</p>
                    <p className="font-semibold text-gray-800">
                      {formatCurrency(scholarship.applicationFee)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedScholarship(scholarship)}
                  className="w-full py-2.5 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100 animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Country
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Application Price(NRF)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Service Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {scholarships.map((scholarship, idx) => (
                  <tr
                    key={scholarship._id}
                    className="hover:bg-rose-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={scholarship.thumbnail || "/placeholder.svg"}
                          alt={scholarship.universityName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {scholarship.universityName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700">
                          {scholarship.country}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700 font-semibold">
                      {formatCurrency(scholarship.applicationFee)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">
                      {formatCurrency(scholarship.serviceFee)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          scholarship.status,
                        )}`}
                      >
                        {scholarship.status?.toUpperCase() || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-rose-500 to-red-500 text-white hover:shadow-lg hover:scale-110 transition-all duration-200"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details / Edit Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div>
              {isEditing && editData ? (
                /* --- EDIT MODE --- */
                <div>
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-linear-to-r from-rose-600 to-red-600 text-white p-5 flex justify-between items-center z-20">
                    <h2 className="text-xl font-bold">
                      {isEditing ? "Edit Scholarship" : "Scholarship Details"}
                    </h2>
                    <button
                      onClick={() => {
                        setSelectedScholarship(null);
                        setIsEditing(false);
                      }}
                      className="p-2 hover:bg-white/20 rounded-full "
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-6 p-6">
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={
                          selectedScholarship.thumbnail || "/placeholder.svg"
                        }
                        alt={selectedScholarship.universityName}
                        className="w-full h-48 sm:h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() =>
                          setSelectedImage(selectedScholarship.thumbnail)
                        }
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4 sm:p-6">
                        <h3 className="text-white text-xl sm:text-2xl font-bold">
                          {selectedScholarship.universityName}
                        </h3>
                        <p className="text-white text-sm sm:text-base opacity-90">
                          {selectedScholarship.country}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University Name
                        </label>
                        <input
                          name="universityName"
                          value={editData.universityName}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg focus:ring-2 ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          name="country"
                          value={editData.country}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg focus:ring-2 ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Application Fee ($)
                        </label>
                        <input
                          name="applicationFee"
                          type="number"
                          value={editData.applicationFee}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg focus:ring-2 ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Fee ($)
                        </label>
                        <input
                          name="serviceFee"
                          type="number"
                          value={editData.serviceFee}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg focus:ring-2 ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <input
                          name="duration"
                          value={editData.duration}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg focus:ring-2 ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <input
                          name="language"
                          value={editData.language}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg focus:ring-2 ring-rose-500 outline-none"
                        />
                      </div>
                      {/* <div>
                        {editData.programs && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Programs
                            </label>
                            <div className="flex gap-4">
                              {editData.programs.map((p, index) => (
                                <input
                                  key={index}
                                  name="programs"
                                  value={p}
                                  onChange={(e) => handleProgramEdit(e, index)}
                                  className="w-full p-2 border rounded-lg focus:ring-2 ring-rose-500 outline-none"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div> */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Programs
                        </label>

                        <div>
                          <div className="flex gap-3">
                            {(editData.programs?.length
                              ? editData.programs
                              : [""]
                            ).map((p, index) => (
                              <div
                                key={index}
                                className="flex gap-2 items-center"
                              >
                                <input
                                  value={p}
                                  onChange={(e) => handleProgramEdit(e, index)}
                                  className="p-2 border rounded-lg focus:ring-2 ring-red-700 outline-none"
                                  placeholder={`Program ${index + 1}`}
                                />

                                {(editData.programs?.length || 1) > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeProgram(index)}
                                    className="px-2 py-1 bg-red-700 text-white rounded-lg hover:cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={addProgram}
                            className="w-fit px-4 py-2 bg-red-700 text-white rounded-lg mt-4"
                          >
                            + Add Program
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* HTML Editors */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Academic Description
                      </label>
                      <QuillEditor
                        value={editData.description}
                        onChange={(val) =>
                          handleDescriptionChange("description", val)
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        University Description
                      </label>
                      <QuillEditor
                        value={editData.universityDescription}
                        onChange={(val) =>
                          handleDescriptionChange("universityDescription", val)
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-gray-200 rounded-lg font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2"
                      >
                        {loading ? (
                          "Saving..."
                        ) : (
                          <>
                            <Save className="w-4 h-4" /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* --- VIEW MODE --- */
                <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
                  <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-scale-in my-4">
                    <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-4 sm:p-6 flex justify-between items-center z-10">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold">
                          Scholarship Details
                        </h2>
                        <p className="text-rose-100 text-xs sm:text-sm mt-1">
                          ID: {selectedScholarship._id}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedScholarship(null)}
                        className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors hover:cursor-pointer"
                      >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                      {/* University Image */}
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={
                            selectedScholarship.thumbnail || "/placeholder.svg"
                          }
                          alt={selectedScholarship.universityName}
                          className="w-full h-48 sm:h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() =>
                            setSelectedImage(selectedScholarship.thumbnail)
                          }
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4 sm:p-6">
                          <h3 className="text-white text-xl sm:text-2xl font-bold">
                            {selectedScholarship.universityName}
                          </h3>
                          <p className="text-white text-sm sm:text-base opacity-90">
                            {selectedScholarship.country}
                          </p>
                        </div>
                      </div>

                      {/* Quick Info Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                            <p className="text-xs text-gray-500">Package</p>
                          </div>
                          <p className="font-bold text-base sm:text-lg text-gray-800">
                            {formatCurrency(selectedScholarship.applicationFee)}
                          </p>
                        </div>

                        <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                            <p className="text-xs text-gray-500">Service Fee</p>
                          </div>
                          <p className="font-bold text-base sm:text-lg text-gray-800">
                            {formatCurrency(selectedScholarship.serviceFee)}
                          </p>
                        </div>

                        <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                            <p className="text-xs text-gray-500">Duration</p>
                          </div>
                          <p className="font-bold text-base sm:text-lg text-gray-800">
                            {selectedScholarship.duration}
                          </p>
                        </div>

                        <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                            <p className="text-xs text-gray-500">Language</p>
                          </div>
                          <p className="font-bold text-base sm:text-lg text-gray-800">
                            {selectedScholarship.language}
                          </p>
                        </div>
                        <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                            <p className="text-xs text-gray-500">
                              Application Starting Date
                            </p>
                          </div>
                          <p className="font-bold text-base sm:text-lg text-gray-800">
                            {selectedScholarship.startingDate}
                          </p>
                        </div>
                        <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                            <p className="text-xs text-gray-500">
                              Application Ending Date
                            </p>
                          </div>
                          <p className="font-bold text-base sm:text-lg text-gray-800">
                            {selectedScholarship.deadline}
                          </p>
                        </div>
                        <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                            <p className="text-xs text-gray-500">programs</p>
                          </div>
                          <div className="font-bold text-base sm:text-lg text-gray-800">
                            {selectedScholarship.programs?.join(", ")}
                          </div>
                        </div>
                        {selectedScholarship.isInternationalStudent && (
                          <div className="bg-linear-to-br from-rose-50 to-red-50 p-3 sm:p-4 rounded-lg border border-red-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                              <p className="text-xs text-gray-500">
                                International Student
                              </p>
                            </div>
                            <p className="font-bold text-base sm:text-lg text-gray-800">
                              This Package for international student
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Academic Information */}
                      <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-4 sm:p-6 border border-red-100">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          Academic Information
                        </h3>
                        <div className="">
                          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                            <PackageDescriptionView
                              html={selectedScholarship?.description}
                            />
                          </div>
                        </div>
                      </section>
                      <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-4 sm:p-6 border border-red-100">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          University Information
                        </h3>
                        <div className="w-full">
                          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                            <PackageDescriptionView
                              html={selectedScholarship?.universityDescription}
                            />
                          </div>
                        </div>
                      </section>

                      {/* University URL */}
                      <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-4 sm:p-6 border border-red-100">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-white" />
                          </div>
                          University Website
                        </h3>
                        <a
                          href={selectedScholarship.universityURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose-600 hover:text-rose-800 underline break-all text-sm sm:text-base font-medium"
                        >
                          {selectedScholarship.universityURL}
                        </a>
                      </section>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              selectedScholarship._id,
                              selectedScholarship.status === "Active"
                                ? "Inactive"
                                : "Active",
                            )
                          }
                          className="px-4 py-2.5 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          {selectedScholarship.status === "Active"
                            ? "Inactive"
                            : "Active"}
                        </button>
                        <button
                          onClick={() => handleDelete(selectedScholarship._id)}
                          className="px-4 py-2.5 border hover:bg-red-700 hover:text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                        <button
                          onClick={startEditing}
                          className="px-4 py-2.5 border hover:bg-red-700 hover:text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipPackageInAdminDashboard;

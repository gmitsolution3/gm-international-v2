import React, { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface PackageItem {
  id: string;
  title: string;
}

interface TourPackage {
  packageName: string;
  eventName: string;
  duration: string;
  country: string;
  phases: Array<{
    phaseNumber: number;
    startDate: string;
    endDate: string;
    returnCity: string;
  }>;
  includes: PackageItem[];
  hotelName: string;
  hotelRating: string;
  customerPrice: number;
  paxPrice: number;
  minimumPax: number;
  description: string;
  createdAt: string | Date;
  createdBy: string | null | undefined;
}

const MakePackage = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<TourPackage>({
    packageName: "",
    eventName: "",
    duration: "",
    country: "",
    phases: [
      {
        phaseNumber: 1,
        startDate: "14 October",
        endDate: "20 October",
        returnCity: "Dhaka",
      },
    ],
    includes: [
      { id: "1", title: "Air ticket" },
      { id: "2", title: "Business Visa China" },
      { id: "3", title: "4 Star Hotel with Breakfast (100+ items)" },
      { id: "4", title: "Everyday Dinner" },
      { id: "5", title: "Airport Pick & Drop" },
    ],
    hotelName: "",
    hotelRating: "",
    customerPrice: 128900,
    paxPrice: 128900,
    minimumPax: 2,
    description: "",
    createdAt: new Date(),
    createdBy: session?.user?.email,
  });

  const [newIncludeTitle, setNewIncludeTitle] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "customerPrice" || name === "paxPrice" || name === "minimumPax"
          ? Number(value)
          : value,
    }));
  };

  const handlePhaseChange = (index: number, field: string, value: string) => {
    const newPhases = [...formData.phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    setFormData((prev) => ({ ...prev, phases: newPhases }));
  };

  const addPhase = () => {
    setFormData((prev) => ({
      ...prev,
      phases: [
        ...prev.phases,
        {
          phaseNumber: prev.phases.length + 1,
          startDate: "",
          endDate: "",
          returnCity: "",
        },
      ],
    }));
  };

  const deletePhase = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index),
    }));
  };

  const addInclude = () => {
    if (newIncludeTitle.trim()) {
      setFormData((prev) => ({
        ...prev,
        includes: [
          ...prev.includes,
          {
            id: Date.now().toString(),
            title: newIncludeTitle,
          },
        ],
      }));
      setNewIncludeTitle("");
    }
  };

  const deleteInclude = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      includes: prev.includes.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/post-business-package`,
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
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            Business Tour Package Creator
          </h1>
          <p className="text-red-700">
            Create and manage your business tour packages
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-2xl p-8 border-t-4 border-red-600">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-900 mb-6 pb-4 border-b-2 border-red-200">
                📋 Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    required
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="e.g., CANTON FAIR 2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    required
                    value={formData.eventName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="e.g., Canton Fair"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="e.g., 5 Night 6 Days"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="e.g., 5 Night 6 Days"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                    rows={3}
                    placeholder="Add any additional details about the package"
                  />
                </div>
              </div>
            </div>

            {/* Phases */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-red-200">
                <h2 className="text-2xl font-bold text-red-900">
                  📅 Tour Phases
                </h2>
                <button
                  onClick={addPhase}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                >
                  <Plus size={18} />
                  Add Phase
                </button>
              </div>

              <div className="space-y-4">
                {formData.phases.map((phase, index) => (
                  <div
                    key={index}
                    className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-red-700 mb-1">
                          Phase Number
                        </label>
                        <input
                          type="number"
                          value={phase.phaseNumber}
                          onChange={(e) =>
                            handlePhaseChange(
                              index,
                              "phaseNumber",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-red-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={phase.startDate}
                          onChange={(e) =>
                            handlePhaseChange(
                              index,
                              "startDate",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                          placeholder="14 October"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-red-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          value={phase.endDate}
                          required
                          onChange={(e) =>
                            handlePhaseChange(index, "endDate", e.target.value)
                          }
                          className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                          placeholder="20 October"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-red-700 mb-1">
                          Return City
                        </label>
                        <input
                          type="text"
                          required
                          value={phase.returnCity}
                          onChange={(e) =>
                            handlePhaseChange(
                              index,
                              "returnCity",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                          placeholder="Dhaka"
                        />
                      </div>
                      {formData.phases.length > 1 && (
                        <div className="flex items-end">
                          <button
                            onClick={() => deletePhase(index)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Includes */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-900 mb-6 pb-4 border-b-2 border-red-200">
                ✅ Package Includes
              </h2>
              <div className="space-y-3 mb-4">
                {formData.includes.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-600"
                  >
                    <span className="text-black font-medium">{item.title}</span>
                    <button
                      onClick={() => deleteInclude(item.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIncludeTitle}
                  onChange={(e) => setNewIncludeTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addInclude()}
                  className="flex-1 px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                  placeholder="Enter a package item..."
                />
                <button
                  onClick={addInclude}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md font-semibold"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
            </div>

            {/* Hotel Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-900 mb-6 pb-4 border-b-2 border-red-200">
                🏨 Hotel Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Hotel Name
                  </label>
                  <input
                    type="text"
                    name="hotelName"
                    required
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="e.g., Rezen Selete Hotel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Hotel Rating
                  </label>
                  <input
                    type="text"
                    name="hotelRating"
                    required
                    value={formData.hotelRating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="e.g., 4★"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-900 mb-6 pb-4 border-b-2 border-red-200">
                💰 Pricing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Customer Price (BDT)
                  </label>
                  <input
                    type="number"
                    name="customerPrice"
                    required
                    value={formData.customerPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Pax Price (BDT)
                  </label>
                  <input
                    type="number"
                    name="paxPrice"
                    required
                    value={formData.paxPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Minimum Participants
                  </label>
                  <input
                    type="number"
                    name="minimumPax"
                    required
                    value={formData.minimumPax}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                // onSubmit={handleSubmit}
                type="submit"
                className="flex-1 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Create Package
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePackage;

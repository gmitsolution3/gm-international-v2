import React, { useState } from "react";
import { X, Edit2, Save } from "lucide-react";
import { ApplicationForm } from "./type";
import Swal from "sweetalert2";

interface ApplicationDataProps {
  defaultData: ApplicationForm;
}

export default function FinalBusinessModal({
  defaultData,
}: ApplicationDataProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>(defaultData);
  const [editData, setEditData] = useState<ApplicationForm>(defaultData);

  const handleEditClick = () => {
    setEditData(formData);
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setFormData(editData);

    const updatedData = {
      ...formData,
      updatedAt: new Date().toLocaleString(),
    };

    const res = await fetch(
      `https://gm-international-server-gamma.vercel.app/update-business-form/${formData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const result = await res.json();
  

    if (!result.ok) {
      Swal.fire({
        title: "Something was wrong!! try again",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    Swal.fire({
      title: updatedData._id ? result.message : "Your Form has been submitted",
      icon: "success",
      draggable: false,
      showConfirmButton: false,
      timer: 2000,
    });

    setIsEditing(false);
    
    // alert("Data updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg w-full">
      {/* Header */}
      <div className="rounded-2xl bg-linear-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg md:text-2xl font-bold">
            Visa Application Details
          </h2>
          <p className="text-blue-100 text-sm mt-1">ID: {formData._id}</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="rounded-lg bg-white text-black hover:text-white hover:cursor-pointer p-2 transition flex items-center gap-2 hover:bg-red-500 px-4"
            >
              <Edit2 size={20} />
              Edit
            </button>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Personal Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.lastName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.phone}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formatDate(formData.dateOfBirth)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              {isEditing ? (
                <select
                  name="gender"
                  value={editData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.gender}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Passport
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="passport"
                  readOnly
                  value={editData.passport}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium truncate">
                  {formData.passport}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Country
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={editData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.country}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="companyName"
                  value={editData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.companyName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Designation
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="designation"
                  value={editData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.designation}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Company Type
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="companyType"
                  value={editData.companyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.companyType}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Office Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="officeLocation"
                  value={editData.officeLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.officeLocation}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Visiting Card
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="visitingCard"
                  readOnly
                  value={editData.visitingCard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium truncate">
                  {formData.visitingCard}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Travel Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Travel Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Travel Purpose
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="travelPurpose"
                  value={editData.travelPurpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.travelPurpose}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Travel Plan
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="travelPlan"
                  value={editData.travelPlan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.travelPlan}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Payment Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Payment Method
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="paymentMethod"
                  value={editData.paymentMethod}
                  readOnly
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium">
                  {formData.paymentMethod}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Payment Status
              </label>
              {isEditing ? (
                <div>
                  <p className="px-4 py-2 text-gray-800 font-medium">
                    {formData.paymentStatus}
                  </p>
                </div>
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium capitalize">
                  {formData.paymentStatus}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Application Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              {isEditing ? (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Application Status
                  </label>
                  <p className="px-4 py-2 text-gray-800 font-medium">
                    {formData.applicationStatus}
                  </p>
                </div>
              ) : (
                <p className="px-4 py-2 text-gray-800 font-medium capitalize">
                  {formData.applicationStatus}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Created By
              </label>
              <p className="px-4 py-2 text-gray-800 font-medium">
                {formData.createdBy}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Created At
              </label>
              <p className="px-4 py-2 text-gray-800 font-medium">
                {formatDate(formData.createdAt as any)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

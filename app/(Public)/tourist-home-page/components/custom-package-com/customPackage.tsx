"use client";

import React, { useState } from "react";
import { Upload, ChevronDown } from "lucide-react";
import { Checkbox, Label } from "@headlessui/react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  visaStatus: string;
  gender: string;
  airTicket: string;
  destinationCountry: string;
  destinationPlace: string;
  days: string;
  nights: string;
  food: string[];
  transportation: string;
  dateFrom: string;
  dateTo: string;
  hotelCategory : string;
}

const CustomPackage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    visaStatus: "Already have",
    gender: "Male",
    airTicket: "",
    destinationCountry: "",
    destinationPlace: "",
    days: "",
    nights: "",
    food: ["breakfast", "lunch", "dinner"],
    transportation: "",
    dateFrom: "",
    dateTo: "",
    hotelCategory: "",
  });

  const [uploadedFile, setUploadedFile] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleFoodChange = (meal: string) => {
    setFormData((prev) => {
      if (prev.food.includes(meal)) {
        return { ...prev, food: prev.food.filter((f) => f !== meal) };
      } else {
        return { ...prev, food: [...prev.food, meal] };
      }
    });
  };

  const handleSubmit = () => {
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Personal Information Section */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span>
              Personal Information
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Full Name */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone Number */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Email */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                {/* Visa Status */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Visa Status
                  </label>
                  <div className="relative">
                    <select
                      name="visaStatus"
                      value={formData.visaStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                    >
                      <option>Already have</option>
                      <option>Need Visa Support</option>
                      <option>Exempt</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Upload PDF/Doc */}
                <div className="md:col-span-1 flex flex-col">
                  <label className="w-full mb-1">
                    <span>Upload passport & visa</span>
                  </label>
                  <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-400 rounded-lg cursor-pointer hover:bg-red-50 transition-colors duration-200 transform hover:scale-105">
                    <Upload className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 font-medium text-sm">
                      Upload PDF/Doc
                    </span>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                {/* Gender */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Travel Arrangement Section */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span>
              Travel Arrangement
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Air Ticket */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Air Ticket
                  </label>
                  <div className="relative">
                    <select
                      name="airTicket"
                      value={formData.airTicket}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                    >
                      <option value="">Select air ticket</option>
                      <option>Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Destination Country */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Destination Country
                  </label>
                  <div className="relative">
                    <select
                      name="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                    >
                      <option value="">Select country</option>
                      <option>China</option>
                      <option>Malaysia</option>
                      <option>Thailand</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Destination Place */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Destination Place
                  </label>
                  <input
                    type="text"
                    name="destinationPlace"
                    value={formData.destinationPlace}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter destination place"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Travel Duration Section */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span>
              Travel Duration
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Days */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Days
                  </label>
                  <input
                    type="number"
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter number of days"
                    min="0"
                  />
                </div>

                {/* Nights */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nights
                  </label>
                  <input
                    type="number"
                    name="nights"
                    value={formData.nights}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter number of nights"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Food Plan Section */}
          {/* <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span>
              Food Plan
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Food
                </label>
                <div className="relative">
                  <select
                    name="food"
                    value={formData.food}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select food plan</option>
                    <option>
                      <Checkbox id="breakfast">
                        <Label htmlFor="terms">
                          Accept terms and conditions
                        </Label>
                      </Checkbox>
                    </option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section> */}

          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span>
              Food Plan
            </h2>

            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Select Food Options
              </label>

              <div className="space-x-3 flex">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.food.includes("breakfast")}
                    onChange={() => handleFoodChange("breakfast")}
                  />
                  <label className="text-slate-700">Breakfast</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.food.includes("lunch")}
                    onChange={() => handleFoodChange("lunch")}
                  />
                  <label className="text-slate-700">Lunch</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.food.includes("dinner")}
                    onChange={() => handleFoodChange("dinner")}
                  />
                  <label className="text-slate-700">Dinner</label>
                </div>
              </div>
            </div>
          </section>

          {/* Transportation Section */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span>
              Transportation
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Transportation
                </label>
                <div className="relative">
                  <select
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select transportation</option>
                    <option>Flight</option>
                    <option>Train</option>
                    <option>Bus</option>
                    <option>Car Rental</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Date Section */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span>
              Date
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* From Date */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    From
                  </label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={formData.dateFrom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* To Date */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    To
                  </label>
                  <input
                    type="date"
                    name="dateTo"
                    value={formData.dateTo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="text-red-500 mr-2">*</span> Hotel Booking
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hotel Category
                </label>
                <div className="relative">
                  <select
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select transportation</option>
                    <option>3 Star</option>
                    <option>4 Star</option>
                    <option>5 Star</option>
                    <option>7 Star</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div
            className="flex justify-center animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transform transition-all duration-200 active:scale-95"
            >
              Submit Travel Form
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CustomPackage;

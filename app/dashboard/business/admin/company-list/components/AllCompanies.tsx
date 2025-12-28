"use client";

import React, { useState } from "react";
import { Trash2, Eye, X, MapPin, Users, Building } from "lucide-react";
import Swal from "sweetalert2";

interface Employee {
  name: string;
  rating: string;
  expertise: string;
  image: string;
  uploaded: boolean;
  uploading: boolean;
}

interface Company {
  _id: string;
  companyName: string;
  country: string;
  city: string;
  address: string;
  description: string;
  employ: Employee[];
  rating: string;
  images?: string[];
  createdAt?: string;
  createdBy?: string;
}

interface AllCompaniesProps {
  initialData: Company[];
}

const AllCompanies = ({ initialData }: AllCompaniesProps) => {
  const [companies, setCompanies] = useState<Company[]>(initialData);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = (id: string): void => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://gm-international-server-gamma.vercel.app/delete-company/${id}`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();
        

        if (res.status !== 200) {
          Swal.fire({
            title: data.message || "Something went wrong",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }
        Swal.fire({
          title: "Deleted Successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setCompanies(companies.filter((company) => company._id !== id));
      }
    });
  };

  const handleView = (company: Company): void => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-scree p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Table for Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-red-600 to-red-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Company Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Employees
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {companies.map((company) => (
                  <tr
                    key={company._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {company.companyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      Technology
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {company.city}, {company.country}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {company.employ.length}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleView(company)}
                          className="p-2 text-red-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(company._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards for Mobile & Tablet */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {companies.map((company) => (
            <div
              key={company._id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border-2 border-gray-200"
            >
              <h3 className="font-bold text-slate-800 mb-3 text-base line-clamp-2">
                {company.companyName}
              </h3>

              <div className="space-y-2 mb-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-slate-500" />
                  <span>Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-slate-500" />
                  <span>
                    {company.city}, {company.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-500" />
                  <span>{company.employ.length} employees</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(company)}
                  className="flex-1 border-2 border-red-700 text-black hover:bg-red-700 hover:text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => handleDelete(company._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-slate-600 text-lg">No companies found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedCompany && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-5xl overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center sticky top-0">
              <h2 className="text-2xl font-bold">
                {selectedCompany.companyName}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-red-800 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Company Info */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Company Name</p>
                    <p className="font-medium text-slate-800">
                      {selectedCompany.companyName}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Location</p>
                    <p className="font-medium text-slate-800">
                      {selectedCompany.city}, {selectedCompany.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Address</p>
                    <p className="font-medium text-slate-800">
                      {selectedCompany.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Rating</p>
                    <p className="font-medium text-slate-800">
                      ⭐ {selectedCompany.rating}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Description
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedCompany.description}
                </p>
              </div>

              {/* Employees */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Team Members ({selectedCompany.employ.length})
                </h3>
                <div className="space-y-4">
                  {selectedCompany.employ.map((employee, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-slate-50 rounded-lg"
                    >
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">
                          {employee.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {employee.expertise}
                        </p>
                        <p className="text-sm text-yellow-600 font-medium">
                          ⭐ {employee.rating}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCompanies;

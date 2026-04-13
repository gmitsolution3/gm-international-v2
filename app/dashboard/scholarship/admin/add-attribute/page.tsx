import Link from "next/link";
import React from "react";
import { PlusCircle, Bell, Calendar, FileText } from "lucide-react";
import ManagedNotice from "./components/ManagedNotice";

const AddAttributes = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/get-notice`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();
  const notices = result?.data || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Notice Management
                </h1>
                <p className="text-red-100 mt-1 text-sm md:text-base">
                  Create, manage, and publish important announcements
                </p>
              </div>
            </div>

            <Link href="/dashboard/scholarship/admin/add-attribute/notice">
              <button className="group bg-white text-red-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105">
                <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Add New Notice
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Notices</p>
                <p className="text-2xl font-bold text-gray-800">
                  {notices.length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Recent Updates</p>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    notices.filter((n: any) => {
                      const date = new Date(n.createdAt);
                      const now = new Date();
                      const diffTime = Math.abs(now.getTime() - date.getTime());
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24),
                      );
                      return diffDays <= 7;
                    }).length
                  }
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Student Notices</p>
                <p className="text-2xl font-bold text-gray-800">
                  {notices.filter((n: any) => n.noticeFor === "student").length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with filters */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  All Notices
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and organize your announcements
                </p>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>All Categories</option>
                  <option>Student</option>
                  <option>Tourist</option>
                  <option>Medical</option>
                  <option>Business</option>
                </select>
                <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>Sort by Date</option>
                  <option>Latest First</option>
                  <option>Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notice List Component */}
          <div className="p-6">
            {notices.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notices yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating your first notice
                </p>
                <Link href="/dashboard/scholarship/admin/add-attribute/notice">
                  <button className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <PlusCircle className="w-4 h-4" />
                    Create Notice
                  </button>
                </Link>
              </div>
            ) : (
              <ManagedNotice data={notices} />
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Notices will be visible to users based on their selected category
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddAttributes;
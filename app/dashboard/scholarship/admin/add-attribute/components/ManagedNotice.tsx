"use client"

import React, { useState } from "react";
import { Pencil, Trash2, Eye, X } from "lucide-react";

// Types based on your data schema
interface Notice {
  _id: string;
  title: string;
  description: string;
  noticeFor: string;
  createdAt: string;
}

interface ManagedNoticeProps {
  data: Notice[];
}

const ManagedNotice: React.FC<ManagedNoticeProps> = ({ data }) => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Notice | null>(null);

  // Handle view notice
  const handleView = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  // Handle edit notice
  const handleEdit = (notice: Notice) => {
    setEditFormData(notice);
    setIsEditModalOpen(true);
  };

  // Handle delete notice
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      console.log("Delete notice with id:", id);
      // Add your delete API call here
    }
  };

  // Handle edit form submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData) {
      console.log("Update notice:", editFormData);
      // Add your update API call here
      setIsEditModalOpen(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Strip HTML tags for preview
  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-700 border-l-4 border-red-600 pl-4">
          Manage Notices
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Total {data?.length || 0} notice{data?.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Notice Cards - Responsive Grid */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((notice) => (
            <div
              key={notice._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-red-600 to-red-700 px-4 py-3">
                <h3 className="text-white font-bold text-lg truncate">
                  {notice.title}
                </h3>
                <p className="text-red-100 text-xs mt-1">
                  For: <span className="capitalize">{notice.noticeFor}</span>
                </p>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1">
                <div className="text-gray-600 text-sm mb-3">
                  <span className="font-medium">Posted:</span>{" "}
                  {formatDate(notice.createdAt)}
                </div>
                <div className="text-gray-700 text-sm line-clamp-3">
                  {stripHtml(notice.description)}
                </div>
              </div>

              {/* Card Footer - Action Buttons */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => handleView(notice)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Notice"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleEdit(notice)}
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Edit Notice"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Notice"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No notices available.</p>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-red-700">Notice Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedNotice.title}
                </h3>
                <div className="flex flex-wrap gap-3 mt-2 text-sm">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full capitalize">
                    For: {selectedNotice.noticeFor}
                  </span>
                  <span className="text-gray-500">
                    Posted: {formatDate(selectedNotice.createdAt)}
                  </span>
                </div>
              </div>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedNotice.description }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-red-700">Edit Notice</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Notice For
                </label>
                <select
                  value={editFormData.noticeFor}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      noticeFor: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                >
                  <option value="student">Student</option>
                  <option value="tourist">Tourist</option>
                  <option value="medical">Medical</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Description (HTML supported)
                </label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition font-mono text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can use HTML tags like &lt;p&gt;, &lt;strong&gt;,
                  &lt;br&gt; etc.
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagedNotice;

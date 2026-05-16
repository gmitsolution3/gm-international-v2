"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "sonner";
import Swal from "sweetalert2";

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

interface NoticeFormData {
  title: string;
  noticeFor: string;
  description: string;
}

const ManagedNotice: React.FC<ManagedNoticeProps> = ({ data }) => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Quill editor refs
  const editEditorRef = useRef<HTMLDivElement>(null);
  const editQuillRef = useRef<Quill | null>(null);
  const viewEditorRef = useRef<HTMLDivElement>(null);
  const viewQuillRef = useRef<Quill | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<NoticeFormData>({
    defaultValues: {
      title: "",
      noticeFor: "student",
      description: "",
    },
  });

  const watchDescription = watch("description");
  // Initialize Quill editor for edit modal
  useEffect(() => {
    if (editEditorRef.current && !editQuillRef.current && isEditModalOpen) {
      editQuillRef.current = new Quill(editEditorRef.current, {
        theme: "snow",
        placeholder: "Write notice description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, false] }],
            ["link"],
            ["clean"],
          ],
        },
        formats: ["bold", "italic", "underline", "list", "header", "link"],
      });

      // Set initial content if editing
      const currentDescription = getValues("description");
      if (currentDescription) {
        editQuillRef.current.root.innerHTML = currentDescription;
      }

      editQuillRef.current.on("text-change", () => {
        const html = editQuillRef.current?.root.innerHTML ?? "";
        setValue("description", html === "<p><br></p>" ? "" : html, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });
    }

    // Cleanup
    return () => {
      if (editQuillRef.current && !isEditModalOpen) {
        editQuillRef.current = null;
      }
    };
  }, [isEditModalOpen, setValue, getValues]);

  // Handle view notice
  const handleView = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  // Handle edit notice - populate form with notice data
  const handleEdit = (notice: Notice) => {
    reset({
      title: notice.title,
      noticeFor: notice.noticeFor,
      description: notice.description,
    });
    setIsEditModalOpen(true);
    setSelectedNotice(notice);
  };

  // Handle delete notice
  const handleDelete = (id: string) => {
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
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/notice/delete/${id}`,
          {
            method: "DELETE",
          },
        );

        const resResult = await res.json()

        if(!resResult.success) {
          toast.error("Failed to delete notice");
          return;
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Handle edit form submission
  const onEditSubmit = async (formData: NoticeFormData) => {
    if (editQuillRef.current) {
      const description = editQuillRef.current.root.innerHTML;
      const updatedData = {
        ...formData,
        description: description === "<p><br></p>" ? "" : description,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/notice/update/${selectedNotice?._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Notice updated successfully");
       
        // Add your update API call here
        setIsEditModalOpen(false);
        reset();
      } else {
        toast.error("Failed to update notice");
      }
    } else {
      
      // Add your update API call here
      setIsEditModalOpen(false);
      reset();
    }
  };

  // Close edit modal and reset form
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    reset();
    if (editQuillRef.current) {
      editQuillRef.current = null;
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

      {/* Edit Modal with React Hook Form and Quill */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-red-700">Edit Notice</h2>
              <button
                onClick={closeEditModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onEditSubmit)} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Notice For <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("noticeFor", {
                    required: "Notice for is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                >
                  <option value="student">Student</option>
                  <option value="tourist">Tourist</option>
                  <option value="medical">Medical</option>
                  <option value="business">Business</option>
                </select>
                {errors.noticeFor && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.noticeFor.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <div
                  ref={editEditorRef}
                  className="border border-gray-300 rounded-lg bg-white"
                  style={{ minHeight: "200px" }}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Use the toolbar to format your notice content. You can add
                  bold, italic, lists, headers, and links.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
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

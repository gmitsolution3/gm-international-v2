// components/MediaManager.tsx
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Video as VideoIcon,
  Image as ImageIcon,
  Upload,
  X,
  Trash2,
  Link,
  Loader2,
  CheckCircle,
  AlertCircle,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { handleFileUpload } from "@/app/components/uploadPdf/uploadToCloudinary";
import Swal from "sweetalert2";
import { GalleryImage, TabType, Video } from "./types/media";

interface MediaManagerProps {
  initialVideos?: Video[];
  initialGallery?: GalleryImage[];
}

const MediaManager: React.FC<MediaManagerProps> = ({
  initialVideos = [],
  initialGallery = [],
}) => {
  // State
  const [activeTab, setActiveTab] = useState<TabType>("video");
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [thumbnailUploading, setThumbnailUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoThumbnail, setVideoThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: TabType;
    id: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Refs
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Filter videos based on search
  const filteredVideos = videos?.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      [],
  );

  // Filter gallery based on search
  const filteredGallery = gallery.filter(
    (image) =>
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (image.title &&
        image.title.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // Pagination
  const currentItems =
    activeTab === "video"
      ? filteredVideos.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        )
      : filteredGallery.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        );

  const totalPages = Math.ceil(
    (activeTab === "video" ? filteredVideos.length : filteredGallery.length) /
      itemsPerPage,
  );

  // Handle video URL submission
  const handleVideoUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl || !videoTitle) return;

    setIsUploading(true);
    try {
      // Simulate API call - replace with actual API
      //   await new Promise((resolve) => setTimeout(resolve, 2000));

      const newVideo: Video = {
        id: Date.now().toString(),
        title: videoTitle,
        url: videoUrl,
        thumbnail: thumbnailPreview || "/placeholder-video.jpg",
        createdAt: new Date().toISOString(),
        status: "published",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/video-gallery/api/v1/create-video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        },
      );

      const result = await res.json();

      if (!result.success) {
        return toast.error(
          result.message || "Something was wrong Try again letter!!",
        );
      }

      setVideos((prev) => [...prev, newVideo]);

      // Reset form
      setVideoUrl("");
      setVideoTitle("");
      setVideoThumbnail(null);
      setThumbnailPreview(null);

      toast.success("Video Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setThumbnailUploading(true);
    try {
      const result = await handleFileUpload(file);

      setVideoThumbnail(file);
      setThumbnailPreview(result);
    } catch (err: any) {
      toast.error(err?.message || "Something was wrong! Try again");
    } finally {
      setThumbnailUploading(false);
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileArray = Array.from(files);
      const total = fileArray.length;
      let completed = 0;

      const uploadPromises = fileArray.map(async (file, index) => {
        const url = await handleFileUpload(file);

        // progress calculation
        completed++;
        setUploadProgress(Math.round((completed / total) * 100));

        const newImage: GalleryImage = {
          id: `${Date.now()}-${index}`,
          url: url as string,
          alt: file.name,
          title: file.name,
          createdAt: new Date().toISOString(),
          size: file.size,
        };

        return newImage;
      });

      const uploadedImages = await Promise.all(uploadPromises);

      //  parallel upload
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/image-gallery/api/v1/create/image-gallery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadedImages),
        },
      );

      console.log({ uploadedImages });

      const result = await response.json();

      console.log({ result });

      if (result.success) {
        // single state update (important for performance)
        setGallery((prev) => [...prev, ...uploadedImages]);
        toast.success("Image uploade successful");
        return;
      }

      toast.error("Problem is: ", result.message);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(100);

      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    }
  };

  // Handle delete
  const handleDelete = (type: TabType, id: string) => {
    setItemToDelete({ type, id });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "video") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/video-gallery/api/v1/del-video/${itemToDelete.id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (!data.success) {
        Swal.fire({
          title: data.message || "Something went wrong",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
      setVideos((prev) => prev.filter((v) => v.id !== itemToDelete.id));
      toast.success(`${data.message}`);
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/image-gallery/api/v1/del-single-image/${itemToDelete.id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (!data.success) {
        Swal.fire({
          title: data.message || "Something went wrong",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
      setGallery((prev) => prev.filter((g) => g.id !== itemToDelete.id));
      setSelectedImages((prev) => prev.filter((id) => id !== itemToDelete.id));
      toast.success(`${data.message}`);
    }
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedImages.length === 0) return;
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
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/image-gallery/api/v1/del-images`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ids: selectedImages,
            }),
            // body: JSON.stringify(selectedImages),
          },
        );
        const data = await res.json();

        if (!data.success) {
          Swal.fire({
            title: data.message || "Something went wrong",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }

        toast.success(`${data.message}`);

        setGallery((prev) =>
          prev.filter((g) => !selectedImages.includes(g._id!)),
        );
        setSelectedImages([]);
      }
    });
  };

  // Toggle image selection
  const toggleImageSelection = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Get video embed URL
  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    );
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return url;
  };

  // Delete Confirmation Modal
  const DeleteConfirmModal = () => (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 className="font-semibold">Confirm Delete</h3>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="hover:bg-red-700 p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            Media Manager
          </h1>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors relative ${
                activeTab === "video"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              <VideoIcon size={20} />
              <span>Video Gallery</span>
              <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {videos.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors relative ${
                activeTab === "gallery"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              <ImageIcon size={20} />
              <span>Image Gallery</span>
              <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {gallery.length}
              </span>
            </button>
          </div>
        </div>

        {/* Video Tab Content */}
        {activeTab === "video" && (
          <div className="space-y-6">
            {/* Video Upload Form */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Video</h2>
              <form onSubmit={handleVideoUrlSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Video URL Input */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL (YouTube, Vimeo, etc.)
                    </label>
                    <div className="relative">
                      <Link
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Video Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Enter video title"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail Image
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => thumbnailInputRef.current?.click()}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                      >
                        {" "}
                        {thumbnailUploading ? (
                          <span className="flex gap-2">
                            <Loader2 className="animate-spin text-red-700" />
                            Uploading...
                          </span>
                        ) : (
                          <span className="flex gap-2">
                            <Upload size={18} />
                            Choose Image
                          </span>
                        )}
                      </button>
                      {thumbnailPreview && (
                        <div className="relative w-16 h-16">
                          <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            fill
                            className="object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setVideoThumbnail(null);
                              setThumbnailPreview(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isUploading || !videoUrl || !videoTitle}
                  className="w-full md:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Add Video
                    </>
                  )}
                </button>

                {/* Upload Progress */}
                {isUploading && uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </form>
            </div>

            {/* Videos Grid */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold">Existing Videos</h2>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <VideoIcon
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              {/* Video Cards */}
              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {currentItems.map((video: any) => (
                    <div
                      key={video.id}
                      className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-video bg-gray-200">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <button
                              onClick={() => window.open(video.url, "_blank")}
                              className="p-2 bg-white rounded-full hover:bg-gray-100"
                              title="Play Video"
                            >
                              <VideoIcon size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete("video", video._id)}
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                              video.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {video.status === "published" ? (
                              <Eye size={12} />
                            ) : (
                              <EyeOff size={12} />
                            )}
                            {video.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-3">
                        <h3
                          className="font-medium text-sm truncate"
                          title={video.title}
                        >
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar size={12} />
                          {new Date(video.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <VideoIcon size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500">No videos found</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="px-4 py-2 border rounded">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery Tab Content */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            {/* Gallery Upload */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Upload Images</h2>

              {/* Upload Area */}
              <div
                onClick={() => galleryInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer"
              >
                <input
                  ref={galleryInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
                <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Image Gallery</h2>
                  {selectedImages.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete Selected ({selectedImages.length})
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:flex-initial">
                    <input
                      type="text"
                      placeholder="Search images..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <ImageIcon
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      title="Grid view"
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      title="List view"
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery Content */}
              {currentItems.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {currentItems.map((image: any) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="absolute top-2 left-2 z-10">
                          <input
                            type="checkbox"
                            checked={selectedImages.includes(image._id)}
                            onChange={() => toggleImageSelection(image._id)}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                        </div>

                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => handleDelete("gallery", image._id)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs truncate">
                            {image.title || image.alt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentItems.map((image: any) => (
                      <div
                        key={image.id}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(image.id)}
                          onChange={() => toggleImageSelection(image.id)}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                        />

                        <div className="relative w-16 h-16 bg-gray-200 rounded overflow-hidden shrink-0">
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {image.title || image.alt}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Added:{" "}
                            {new Date(image.createdAt).toLocaleDateString()}
                          </p>
                          {image.size && (
                            <p className="text-xs text-gray-400">
                              Size: {(image.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleDelete("gallery", image.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <ImageIcon size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500">No images found</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="px-4 py-2 border rounded">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <DeleteConfirmModal />}
    </div>
  );
};

export default MediaManager;

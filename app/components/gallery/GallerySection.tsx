// components/GallerySection.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Download,
  Maximize2,
  X,
  Calendar,
  HardDrive,
  Tag,
  Filter,
  Grid,
  Layers,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { GalleryImage, GallerySectionProps } from "./type/type";


// --- SVG Icons for hover effects ---
const HeartIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const DownloadIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ExpandIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 3h6v6M14 10l6-6M9 21H3v-6M10 14l-6 6" />
  </svg>
);

// --- Image Card Component ---
interface ImageCardProps {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
  onLike?: (id: string) => void;
  onDownload?: (url: string, title: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onClick,
  onLike,
  onDownload,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onLike) onLike(image.id);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(image.url, image.title || image.alt);
    } else {
      // Default download behavior
      const link = document.createElement("a");
      link.href = image.url;
      link.download = image.title || image.alt || "image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format file size
  const formatSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      className="mb-4 sm:mb-6 break-inside-avoid relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onClick(image)}
    >
      {/* Image Container */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {!imageError ? (
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full aspect-square bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image not available</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Actions Bar */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-4 right-4 flex justify-between items-center"
            >
              {/* Left Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className="p-2 bg-black/40 backdrop-blur-sm rounded-lg hover:bg-red-600/80 transition-colors group/btn"
                >
                  <HeartIcon
                    className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${
                      isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-white group-hover/btn:text-white"
                    }`}
                  />
                </motion.button>

                {/* <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="p-2 bg-black/40 backdrop-blur-sm rounded-lg hover:bg-blue-600/80 transition-colors"
                >
                  <DownloadIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </motion.button> */}
              </div>

              {/* Right Action */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(image);
                }}
                className="p-2 bg-black/40 backdrop-blur-sm rounded-lg hover:bg-green-600/80 transition-colors"
              >
                <ExpandIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Info Bar */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 via-black/40 to-transparent"
            >
              <h3 className="text-white font-semibold text-sm md:text-base truncate mb-1">
                {image.title || image.alt}
              </h3>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                {image.createdAt && (
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {formatDate(image.createdAt)}
                  </span>
                )}
                {image.size && (
                  <span className="flex items-center gap-1">
                    <HardDrive size={12} />
                    {formatSize(image.size)}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Badge (if available) */}
        {image.category && (
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full shadow-lg">
              {image.category}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Lightbox Modal Component ---
interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({
  image,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  if (!image) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-90 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-300"
        >
          <X size={24} />
        </motion.button>

        {/* Navigation Arrows */}
        {hasPrev && (
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-300"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}

        {hasNext && (
          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-300"
          >
            <ChevronRight size={24} />
          </motion.button>
        )}

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            className="relative max-w-full max-h-full"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </motion.div>
        </div>

        {/* Image Details */}
        
      </div>
    </motion.div>
  );
};

// --- Filter Component ---
interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: "masonry" | "grid";
  onViewModeChange: (mode: "masonry" | "grid") => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === "all"
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => onViewModeChange("masonry")}
          className={`p-2 rounded transition-colors ${
            viewMode === "masonry"
              ? "bg-white text-red-600 shadow"
              : "text-gray-600 hover:text-red-600"
          }`}
          title="Masonry View"
        >
          <Layers size={20} />
        </button>
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 rounded transition-colors ${
            viewMode === "grid"
              ? "bg-white text-red-600 shadow"
              : "text-gray-600 hover:text-red-600"
          }`}
          title="Grid View"
        >
          <Grid size={20} />
        </button>
      </div>
    </div>
  );
};

// --- Main Gallery Section Component ---
const GallerySection: React.FC<GallerySectionProps> = ({
  images,
  title = "Photo Gallery",
  subtitle = "Explore our collection of beautiful moments",
  showFilters = true,
  columns = { default: 1, sm: 2, md: 3, lg: 4, xl: 4 },
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");
  const [likedImages, setLikedImages] = useState<string[]>([]);

  // Extract unique categories from images
  const categories = useMemo(() => {
    const cats = images
      .map((img) => img.category)
      .filter((cat): cat is string => !!cat);
    return [...new Set(cats)];
  }, [images]);

  // Filter images by category
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Handle like
  const handleLike = (id: string) => {
    setLikedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Handle navigation in lightbox
  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handleNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  // Get column classes for grid view
  const getGridCols = () => {
    return `grid grid-cols-1 gap-4 sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`;
  };

  return (
    <section className="gallery-section py-12 md:py-20 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Filters */}
        {showFilters && categories.length > 0 && (
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          viewMode === "masonry" ? (
            // Masonry Layout
            <div
              className="columns-2 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
              style={{ columnWidth: "180px" }}
            >
              {filteredImages.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onClick={setSelectedImage}
                  onLike={handleLike}
                />
              ))}
            </div>
          ) : (
            // Grid Layout
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="aspect-square">
                  <ImageCard
                    image={image}
                    onClick={setSelectedImage}
                    onLike={handleLike}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-50 rounded-2xl"
          >
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Images Found
            </h3>
            <p className="text-gray-500">
              {selectedCategory !== "all"
                ? `No images in category "${selectedCategory}"`
                : "Check back later for updates"}
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredImages.length > 0 && filteredImages.length >= 12 && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-red-600 to-red-500 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Load More
              <ChevronRight size={20} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={currentIndex < filteredImages.length - 1}
            hasPrev={currentIndex > 0}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;

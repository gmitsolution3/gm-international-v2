// components/VideoGallery.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Calendar,
  Maximize2,
  X,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Pagination, Navigation, FreeMode, Autoplay } from "swiper/modules";
import YouTubeVideoPlayer from "./YouTubeVideoPlayer";
import "@/app/components/video/video-gallery.css";
import { VideoGalleryProps } from "./type/type";

const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  title = "Video Gallery",
  subtitle = "Watch our latest videos and tutorials",
  autoplay = false,
  showPagination = true,
  showNavigation = true,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);


  if (videos.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl">
        <Play size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">
          No Videos Available
        </h3>
        <p className="text-gray-500 mt-2">Check back later for updates</p>
      </div>
    );
  }

  const handleVideoClick = (video: (typeof videos)[0]) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // Format views count
  const formatViews = (views?: number) => {
    if (!views) return "0 views";
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
    return `${views} views`;
  };

  return (
    <section className="video-gallery-section py-12 md:py-20 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Main Video Slider */}
        <div className="relative">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={20}
            freeMode={true}
            pagination={
              showPagination
                ? {
                    clickable: true,
                    dynamicBullets: true,
                  }
                : false
            }
            navigation={
              showNavigation
                ? {
                    prevEl: ".video-gallery-prev",
                    nextEl: ".video-gallery-next",
                  }
                : false
            }
            autoplay={
              autoplay
                ? {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Navigation, FreeMode, Autoplay]}
            className="video-gallery-swiper"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id}>
                <div
                  className="group cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-75">
                        <div className="relative">
                          {/* Ripple Effect */}
                          <div className="absolute inset-0 rounded-full bg-red-600/40 animate-ping" />
                          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl transform transition-transform group-hover:rotate-12">
                            <Play className="text-white w-8 h-8 ml-1" />
                          </div>
                        </div>
                      </div>

                  
                    </div>

                    {/* Video Info */}
                    <div className="p-4 bg-white min-h-30 h-full">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {video.title}
                      </h3>

                      {/* Metadata */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {video.views !== undefined && (
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {formatViews(video.views)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(video.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                    
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          {showNavigation && videos.length > 4 && (
            <>
              <button
                className="video-gallery-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-800 hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="video-gallery-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-800 hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* View All Button */}
        {/* <div className="text-center mt-12">
          <button
            onClick={() => (window.location.href = "/videos")}
            className="px-8 py-4 bg-linear-to-r from-red-600 to-red-500 text-white rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 group"
          >
            <Play size={20} />
            Watch All Videos
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div> */}
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-300"
            >
              <X size={24} />
            </button>

            {/* Video Player */}
            <YouTubeVideoPlayer
              videoUrl={selectedVideo.url}
              thumbnail={selectedVideo.thumbnail}
              title={selectedVideo.title}
              autoPlay={true}
            />

            {/* Video Details */}
            <div className="p-6 bg-white min-h-40 h-full border-2 border-red-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {selectedVideo.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                {selectedVideo.views !== undefined && (
                  <span className="flex items-center gap-1 text-gray-600">
                    <Eye size={18} />
                    {formatViews(selectedVideo.views)}
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-600">
                  <Calendar size={18} />
                  {new Date(selectedVideo.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </span>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;

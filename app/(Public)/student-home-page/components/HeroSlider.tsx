"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@headlessui/react";
import { ArrowRight } from "lucide-react";
import { CheckListModal } from "../../medical-home-page/components/checkListModal";
import { usePathname } from "next/navigation";
import { NoticeModal } from "../../medical-home-page/components/NoticeModal";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

const HeroSlider = ({
  slides,
  checklistItems,
  label,
  from,
}: {
  slides: SlideData[];
  checklistItems: string[];
  label: string;
  from?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCheckNotice, setIsCheckNotice] = useState(false);
  const [isNoticeLoading, setIsNoticeLoading] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeData, setNoticeData] = useState(null);
  const path = usePathname();

  const query = path.split("-")[0].replace("/","")

  useEffect(() => {
    if (isCheckNotice) {
      fetchNotice();
    }
  }, [isCheckNotice]);

  const fetchNotice = async () => {
    setIsNoticeLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/notice-management/api/v1/get-notice?query=${query}`,
        { cache: "no-store" },
      );

      const result = await res.json();
      setNoticeData(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsNoticeLoading(false);
    }
  };


  // Text animation classes based on active slide
  const getAnimationClasses = (index: number) => {
    return activeIndex === index
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-8 transition-all duration-300 ease-in";
  };

  return (
    <div className="relative max-w-full w-full h-screen max-h-70 md:max-h-200 md:min-h-150 overflow-hidden">
      <Swiper
        pagination={{
          type: "progressbar",
          progressbarOpposite: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full"
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image with Zoom Animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className={`w-full h-full transition-transform duration-10000 ease-out ${
                    activeIndex === index ? "scale-110" : "scale-100"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                  />
                </div>
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent md:bg-linear-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
              </div>

              {/* Content with improved mobile positioning */}
              <div
                className={`relative z-10 flex ${from === "international-home" ? `justify-start` : `justify-end`} items-end md:items-center h-full px-4 sm:px-6 lg:px-8 pb-16 md:pb-0`}
              >
                <div
                  className={`text-white max-w-2xl ${getAnimationClasses(
                    index,
                  )}`}
                >
                  {/* Subtitle with slide-up animation */}
                  <p
                    className={`text-xs sm:text-sm md:text-lg font-semibold mb-2 tracking-wide uppercase transform transition-all duration-700 delay-200 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {slide.subtitle}
                  </p>

                  {/* Title with responsive font sizes */}
                  <h1
                    className={`text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 leading-tight transform transition-all duration-700 delay-300 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {slide.title}
                  </h1>

                  {/* Description with improved mobile text size */}
                  <p
                    className={`text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-gray-200 max-w-xl transform transition-all duration-700 delay-400 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* Button with hover animation */}
                  <div
                    className={`transform transition-all duration-700 delay-500 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="group relative inline-flex h-10 sm:h-12 items-center justify-center overflow-hidden
                        bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-8 sm:px-15 font-medium text-sm sm:text-base text-white hover:scale-110 hover:cursor-pointer rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 active:scale-105"
                    >
                      <span className="flex gap-2 items-center">
                        Check List{" "}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                        <div className="relative h-full w-8 bg-white/20"></div>
                      </div>
                    </Button>
                    <Button
                      onClick={() => {
                        setIsNoticeModalOpen(true);
                        fetchNotice();
                      }}
                      className="group ml-4 relative inline-flex h-10 sm:h-12 items-center justify-center overflow-hidden
                        bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-8 sm:px-15 font-medium text-sm sm:text-base text-white hover:scale-110 hover:cursor-pointer rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 active:scale-105"
                    >
                      <span className="flex gap-2 items-center">
                        Check Notice{" "}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                        <div className="relative h-full w-8 bg-white/20"></div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <CheckListModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          checklistItems={checklistItems}
          label={label}
        />
        <NoticeModal
          isOpen={isNoticeModalOpen}
          setIsOpen={setIsNoticeModalOpen}
          noticeData={noticeData}
          loading={isNoticeLoading}
        />
      </Swiper>

      {/* Custom styles for Swiper navigation and pagination */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.2);
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
        }

        .swiper-pagination-progressbar {
          background: rgba(255, 255, 255, 0.3) !important;
        }

        .swiper-pagination-progressbar-fill {
          background: white !important;
        }

        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }

          .swiper-pagination-progressbar {
            bottom: 60px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;

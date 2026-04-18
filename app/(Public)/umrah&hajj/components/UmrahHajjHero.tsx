

// app/components/UmrahHajjHero.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const UmrahHajjHero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const progressCircle = useRef<SVGCircleElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const sliderImages = [
    {
      url: "https://i.postimg.cc/LXqH4ZQy/afif-ramdhasuma-6XT5Tpoo-P0g-unsplash.jpg",
      alt: "Beautiful view of Kaaba during Hajj pilgrimage",
      caption: "The Sacred Kaaba",
    },
    {
      url: "https://i.postimg.cc/FRf9FJnr/haidan-IAwnp88Fz8Y-unsplash.jpg",
      alt: "Spiritual moment during Umrah at night",
      caption: "Night Prayers at Haram",
    },
    {
      url: "https://i.postimg.cc/TwyR2WH2/mahdiya-aqila-vs9M2P9K328-unsplash.jpg",
      alt: "Pilgrims performing Tawaf around Kaaba",
      caption: "Tawaf - The Circumambulation",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-green-50 py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-emerald-200/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 md:mb-6 border border-emerald-200/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-sm font-medium text-emerald-800">Blessed Journey</span>
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6">
              <span className="bg-linear-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                Umrah & Hajj
              </span>
              <br />
              <span className="text-gray-800">Your Sacred Journey Begins Here</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Embark on a spiritual journey of a lifetime. We provide comprehensive packages 
              and guidance for your Umrah and Hajj pilgrimage, ensuring a blessed and 
              hassle-free experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link
                href="/umrah-hajj/packages"
                className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm md:text-base"
              >
                <span>Explore Packages</span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/umrah-hajj/guide"
                className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400 text-emerald-700 font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm md:text-base"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>Read Guide</span>
              </Link>
            </div>

            {/* Trust indicators - hidden on very small screens */}
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start mt-8 md:mt-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-sm md:text-base">15+ Years</p>
                  <p className="text-xs text-gray-500">of Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-sm md:text-base">50K+ Pilgrims</p>
                  <p className="text-xs text-gray-500">Served Worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-sm md:text-base">4.9 Rating</p>
                  <p className="text-xs text-gray-500">from 5000+ Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Swiper Image Slider */}
          <div className="flex-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Swiper Slider */}
              <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Swiper
                  modules={[Autoplay, Pagination, Navigation, EffectFade]}
                  effect="fade"
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  navigation={isHovered}
                  loop={true}
                  className="umrah-hajj-swiper"
                  onAutoplayTimeLeft={(s, time, progress) => {
                    if (progressCircle.current && progressContent.current) {
                      const circle = progressCircle.current;
                      const content = progressContent.current;
                      circle.style.setProperty("--progress", String(1 - progress));
                      content.textContent = `${Math.ceil(time / 1000)}s`;
                    }
                  }}
                >
                  {sliderImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112.5 bg-linear-to-br from-emerald-100 to-green-100">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 45vw"
                        />
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/70 to-transparent">
                          <p className="text-white text-sm md:text-base lg:text-lg font-semibold text-center">
                            {image.caption}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Autoplay Progress Indicator */}
                <div className="absolute bottom-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-1.5 md:p-2">
                  <svg className="w-6 h-6 md:w-8 md:h-8 -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-white/30"
                      strokeWidth="2"
                    />
                    <circle
                      ref={progressCircle}
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-emerald-400 transition-all duration-100 ease-linear"
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset="calc(100 * var(--progress, 0))"
                      style={{ "--progress": "0" } as React.CSSProperties}
                    />
                  </svg>
                  <span ref={progressContent} className="sr-only">Timer</span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 rounded-xl shadow-xl p-3 md:p-4 max-w-45 md:max-w-50 backdrop-blur-sm bg-white/90">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Next Departure</p>
                  <p className="font-bold text-gray-900 text-sm md:text-base">December 2024</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-8 sm:h-12 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* Custom CSS for Swiper customization */}
      <style jsx>{`
        :global(.umrah-hajj-swiper) {
          --swiper-pagination-color: #10b981;
          --swiper-pagination-bullet-inactive-color: #fff;
          --swiper-pagination-bullet-inactive-opacity: 0.5;
          --swiper-pagination-bullet-size: 8px;
          --swiper-pagination-bullet-horizontal-gap: 6px;
          --swiper-navigation-color: #fff;
          --swiper-navigation-size: 30px;
        }
        
        :global(.umrah-hajj-swiper .swiper-button-next),
        :global(.umrah-hajj-swiper .swiper-button-prev) {
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          transition: all 0.3s ease;
        }
        
        :global(.umrah-hajj-swiper .swiper-button-next:hover),
        :global(.umrah-hajj-swiper .swiper-button-prev:hover) {
          background-color: rgba(16, 185, 129, 0.8);
        }
        
        :global(.umrah-hajj-swiper .swiper-button-next:after),
        :global(.umrah-hajj-swiper .swiper-button-prev:after) {
          font-size: 18px;
        }
        
        :global(.umrah-hajj-swiper .swiper-pagination-bullet) {
          transition: all 0.3s ease;
        }
        
        :global(.umrah-hajj-swiper .swiper-pagination-bullet-active) {
          transform: scale(1.2);
        }
        
        @media (min-width: 768px) {
          :global(.umrah-hajj-swiper .swiper-button-next),
          :global(.umrah-hajj-swiper .swiper-button-prev) {
            width: 44px;
            height: 44px;
          }
          
          :global(.umrah-hajj-swiper .swiper-button-next:after),
          :global(.umrah-hajj-swiper .swiper-button-prev:after) {
            font-size: 22px;
          }
          
          :global(.umrah-hajj-swiper .swiper-pagination-bullet) {
            --swiper-pagination-bullet-size: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default UmrahHajjHero;
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

interface HeroSlide {
  title: string;
  highlight: string;
  description: string;
  bgGradient: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides: HeroSlide[] = [
    {
      title: "We Provide You Best",
      highlight: "INTERNATIONAL",
      description: "Discover amazing destinations worldwide with unbeatable deals. Experience luxury travel at affordable prices with our curated international packages.",
      bgGradient: "from-blue-50 to-pink-50"
    },
    {
      title: "Explore Amazing",
      highlight: "DESTINATIONS",
      description: "From tropical paradises to historic cities, we bring you the world's most beautiful locations. Start your journey with exclusive travel packages.",
      bgGradient: "from-purple-50 to-blue-50"
    },
    {
      title: "Unforgettable",
      highlight: "ADVENTURES",
      description: "Create memories that last a lifetime. Our expertly crafted tours ensure every moment of your journey is extraordinary and hassle-free.",
      bgGradient: "from-pink-50 to-orange-50"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`relative min-h-screen bg-hero-pattern bg-cover bg-center transition-all duration-1000 overflow-hidden`}>
      {/* Animated Background Hexagons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 30}%`,
              animation: `float ${5 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              <polygon
                points="60,10 100,35 100,75 60,100 20,75 20,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-400"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Airplane Icon with Animation */}
        <div 
          className={`mb-8 transform transition-all duration-700 ${
            isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" className="airplane-icon">
              <defs>
                <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <path
                d="M100 45 L90 50 L50 35 L35 40 L55 55 L40 60 L35 55 L25 58 L30 65 L35 70 L45 67 L50 75 L65 70 L60 55 L95 60 Z"
                fill="url(#planeGradient)"
                className="animate-pulse"
              />
              <path
                d="M40 45 Q60 30, 80 45"
                stroke="url(#planeGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                className="trail"
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className={`text-center max-w-4xl transition-all duration-700 ${
          isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
        }`}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
            {currentSlideData.title}
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
            {currentSlideData.highlight} <span className="text-gray-800">Deals</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            {currentSlideData.description}
          </p>

          {/* CTA Button */}
          <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <span className="relative z-10">About Us</span>
            <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-12 bg-gradient-to-r from-red-500 to-orange-500'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-4 md:right-8 bottom-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col gap-4 z-30">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Contact via WhatsApp"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
        <a
          href="mailto:info@example.com"
          className="group bg-red-500 hover:bg-red-600 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Send Email"
        >
          <Mail className="w-6 h-6 text-white" />
        </a>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .airplane-icon {
          filter: drop-shadow(0 4px 6px rgba(239, 68, 68, 0.3));
        }

        .trail {
          animation: dash 2s linear infinite;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
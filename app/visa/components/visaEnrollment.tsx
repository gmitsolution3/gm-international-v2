'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const VisaEnrollment = () => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden px-4 py-12 md:px-6 lg:px-8 lg:py-20"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-5 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div
          className={`text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3">
            Enroll for your desired visa
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-500 mb-4 md:mb-6">
            with us now
          </p>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From document preparation to final approval, we stand by you at
            every stage, making your visa journey simple, secure, and completely
            stress-free.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-12 items-end">
          {/* Left Card */}
          <div
            className={`w-full lg:w-auto transition-all duration-700 transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative w-full rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Placeholder for image - User will add their image here */}
              <img
                src="https://i.postimg.cc/d3ZKCzv6/Group-225.png"
                alt="Business growth illustration"
                className="w-full h-full object-cover animate-float-left"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </div>
          </div>

          {/* Center Card - Main Focus */}
          <div
            className={`w-full lg:w-auto transition-all duration-700 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative w-[700px] rounded-3xl  overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-3">
              {/* Placeholder for center image - User will add their main image here */}
              <img
                src="https://i.postimg.cc/NjgzqWS0/Group-223.png"
                alt="Visa applicant with passport"
                className="w-full h-full object-cover animate-float-center"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </div>
          </div>

          {/* Right Card */}
          <div
            className={`w-full lg:w-auto transition-all duration-700 transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="relative w-full rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Placeholder for image - User will add their image here */}
              <img
                src="https://i.postimg.cc/QMDx3xsL/Group-224.png"
                alt="Travel destination illustration"
                className="w-full object-cover animate-float-right"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`flex justify-center transition-all duration-700 transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <Link
            href="/visa/visa_apply"
            className="group relative px-6 md:px-8 py-2.5 md:py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <span>Apply now</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Floating animation elements */}
        <style jsx>{`
          @keyframes float-up {
            0% {
              transform: translateY(100px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes float-plane {
            0% {
              transform: translateX(-20px) translateY(10px);
            }
            50% {
              transform: translateX(20px) translateY(-10px);
            }
            100% {
              transform: translateX(-20px) translateY(10px);
            }
          }

          @keyframes pulse-glow {
            0%,
            100% {
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes float-left {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-12px) translateX(-4px);
            }
          }

          @keyframes float-center {
            0%,
            100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-16px) scale(1.02);
            }
          }

          @keyframes float-right {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-12px) translateX(4px);
            }
          }

          .animate-float-left {
            animation: float-left 4s ease-in-out infinite;
          }

          .animate-float-center {
            animation: float-center 5s ease-in-out infinite;
          }

          .animate-float-right {
            animation: float-right 4s ease-in-out infinite;
          }

          .animate-bounce {
            animation: bounce 2s infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

export default VisaEnrollment

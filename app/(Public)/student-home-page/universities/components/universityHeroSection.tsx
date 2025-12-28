"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

interface UniversityHeroSectionProps {
  university: {
    university: string
    photo: string
    universityUrl: string
  }
}

export default function UniversityHeroSection({ university }: UniversityHeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative">
      {/* Main container */}
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* University Name - Animated */}
        <h1
          className={`text-3xl sm:text-4xl font-bold text-red-600 mb-6 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          {university.university}
        </h1>

        {/* Hero Image Section with Logo Badge */}
        <div
          className={`relative mb-6 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Image Container */}
          <div className="relative w-full aspect-video sm:aspect-auto sm:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 group">
            <Image
              src={university.photo || "/placeholder.svg"}
              alt={university.university}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20"></div>
          </div>

          {/* Logo Badge - Top Right */}
          <div className="absolute top-4 right-4 bg-white rounded-lg p-1 shadow-lg animate-fade-in">
            <div className="w-12 h-12 rounded flex items-center justify-center">
              {/* <span className="text-red-600 font-bold text-xs">LOGO</span> */}
              <img src="https://i.postimg.cc/WbV55LZS/Group-2.png" alt="com_logo" className="w-full" />
            </div>
          </div>

          {/* Floating Action Buttons - Right Side */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-3 hidden sm:flex">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: "200ms" }}
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle size={20} />
            </a>

            {/* Email Button */}
            <a
              href="mailto:info@university.com"
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: "300ms" }}
              aria-label="Contact via email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Visit Website Link - Bottom Left */}
          <a
            href={university.universityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 text-red-200 hover:text-red-300 font-semibold transition-colors duration-300 hover:underline animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            Visit Website
          </a>
        </div>

        {/* Apply Now Button - Right Aligned */}
        <div
          className={`flex justify-end transition-all duration-700 delay-400 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
        >
          <Link
            href='/student-home-page/student-package-offer/user_application_form'
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block"
          >
            Apply now
          </Link>
        </div>
      </div>
    </div>
  )
}

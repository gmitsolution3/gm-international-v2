"use client"

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Heart, Plane, Briefcase, Globe, Compass, Star } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
  page_link: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  gradient,
  page_link,
  delay,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={page_link}>
        <div className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center text-center cursor-pointer overflow-hidden">
          {/* Gradient Background on Hover */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`} />
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-opacity-20 transition-all duration-500" />
          
          {/* Icon Container */}
          <motion.div
            className={`relative z-10 w-20 h-20 rounded-2xl  bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            transition={{ duration: 0.6 }}
          >
            <div className="text-3xl text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
              {/* {icon} */}
              <img src={`${icon}`} alt={`${title}`} />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors duration-300 relative z-10">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-4 relative z-10 line-clamp-3">
            {description}
          </p>

          {/* Learn More Link */}
          <motion.div
            className="relative z-10 flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-300"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Decorative Element */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: "https://i.postimg.cc/y84YY3ng/famicons-school-sharp.png",
      title: "Student Visa",
      description: "Your Global Education Starts Here. Expert guidance for studying abroad at top universities worldwide.",
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
      page_link: "/student-home-page",
    },
    {
      icon: "https://i.postimg.cc/TPQR97xj/streamline-ultimate-favorite-medical-bold.png",
      title: "Medical Visa",
      description: "Advanced Medical Treatment Abroad. Access world-class healthcare facilities and specialist doctors.",
      gradient: "bg-gradient-to-br from-red-400 to-red-600",
      page_link: "/medical-home-page",
    },
    {
      icon: "https://i.postimg.cc/bYZtZb0B/majesticons-airplane.png",
      title: "Tourist Visa",
      description: "Travel the World with Confidence. Hassle-free visa processing for your dream destinations.",
      gradient: "bg-gradient-to-br from-sky-400 to-sky-600",
      page_link: "/tourist-home-page",
    },
    {
      icon: "https://i.postimg.cc/5tPX0N6m/solar-pie-chart-3-bold.png",
      title: "Business Visa",
      description: "Expand Your Business Globally. Connect with international markets and opportunities.",
      gradient: "bg-gradient-to-br from-gray-600 to-gray-800",
      page_link: "/business-home-page",
    },
    {
      icon: "https://i.postimg.cc/L8253ZfF/9023992-student-fill-icon-1.png",
      title: "International Student",
      description: "Bangladesh hosts over 50,000 international students annually, offering affordable, high-quality education.",
      gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
      page_link: "/international-student",
    },
    {
      icon: "https://i.postimg.cc/sDRg3ZTr/3383446-airport-departure-luggage-passenger-tourist-icon-1.png",
      title: "International Tourist",
      description: "Discover authentic culture, natural beauty, and unforgettable experiences in Bangladesh.",
      gradient: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      page_link: "/international-tourist",
    },
    {
      icon: "https://i.postimg.cc/PxV3nHPT/825-removebg-preview.png",
      title: "Umrah & Hajj",
      description: "Experience a spiritually transformative journey. Complete guidance for your sacred pilgrimage.",
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
      page_link: "/umrah&hajj",
    },
  ];

  return (
    <section className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100 opacity-20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-100 opacity-10 blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-red-100 to-red-50 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-red-600">Trusted Worldwide</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Explore Your Journey
          </h1>
          
          {/* Subtitle with Animation */}
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              We Provide You The
              <span className="relative ml-3">
                <span className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 blur-xl opacity-30 animate-pulse" />
                <span className="relative bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Best
                </span>
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            No matter your goal — studying, traveling, receiving medical care,
            or growing your business abroad — we are here to provide expert
            assistance, simplify your visa process, and make your dream journey
            a reality.
          </p>

        </motion.div>

        {/* Services Grid - First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {services.slice(0, 4).map((service, index) => (
            <ServiceCard color={""} key={index} {...service} delay={index * 0.1} />
          ))}
        </div>

        {/* Services Grid - Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.slice(4).map((service, index) => (
            <ServiceCard color={""} key={index + 4} {...service} delay={(index + 4) * 0.1} />
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default ServicesSection;
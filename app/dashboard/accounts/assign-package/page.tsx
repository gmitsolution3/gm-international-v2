import Link from "next/link";
import React from "react";
import {
  GraduationCap,
  Stethoscope,
  Plane,
  Briefcase,
  TicketsPlane,
} from "lucide-react";

const AssignPackage = () => {
  const services = [
    {
      name: "Student",
      href: "/dashboard/accounts/student",
      icon: GraduationCap,
      color: "from-red-600 to-red-700",
      bgHover: "hover:bg-red-50",
      description: "Education visa & study abroad packages",
    },
    {
      name: "Medical",
      href: "/dashboard/accounts/medical",
      icon: Stethoscope,
      color: "from-green-500 to-green-600",
      bgHover: "hover:bg-green-50",
      description: "Medical treatment & healthcare visas",
    },
    {
      name: "Tourist",
      href: "/dashboard/accounts/tourist",
      icon: Plane,
      color: "from-purple-500 to-purple-600",
      bgHover: "hover:bg-purple-50",
      description: "Travel & tourism packages",
    },
    {
      name: "Business",
      href: "/dashboard/accounts/business",
      icon: Briefcase,
      color: "from-orange-500 to-orange-600",
      bgHover: "hover:bg-orange-50",
      description: "Business & investment visas",
    },
    {
      name: "Visa",
      href: "/dashboard/accounts/visa",
      icon: TicketsPlane,
      color: "from-red-500 to-red-600",
      bgHover: "hover:bg-red-50",
      description: "All visa processing services",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-12">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            Select Service
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
            Choose from our comprehensive range of visa and immigration services
            tailored to your needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={index} href={service.href} className="group">
                <div
                  className={`
                  relative overflow-hidden
                  bg-white rounded-2xl shadow-lg
                  transition-all duration-300 ease-in-out
                  transform group-hover:scale-105 group-hover:shadow-2xl
                  cursor-pointer
                  ${service.bgHover}
                `}
                >
                  {/* Gradient Border Effect */}
                  <div
                    className={`
                    absolute top-0 left-0 w-full h-1 
                    bg-linear-to-r ${service.color}
                    transform origin-left scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300
                  `}
                  ></div>

                  <div className="p-6 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <div
                      className={`
                      mb-4 p-3 rounded-full
                      bg-linear-to-br ${service.color}
                      text-white shadow-lg
                      transition-all duration-300
                      group-hover:shadow-xl group-hover:scale-110
                    `}
                    >
                      <Icon className="w-8 h-8 md:w-10 md:h-10" />
                    </div>

                    {/* Service Name */}
                    <h3
                      className={`
                      text-xl md:text-2xl font-bold mb-2
                      bg-linear-to-r ${service.color} bg-clip-text text-transparent
                      transition-all duration-300
                    `}
                    >
                      {service.name}
                    </h3>

                    {/* Description - Hidden on mobile, visible on larger screens */}
                    <p className="text-gray-600 text-sm hidden md:block mt-2">
                      {service.description}
                    </p>

                    {/* Arrow Indicator */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Background Element */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <Icon className="w-full h-full text-gray-900" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Optional: Additional Information Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help choosing? Contact our support team for personalized
            assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignPackage;

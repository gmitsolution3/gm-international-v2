"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import useUserRole from "@/app/useContext/useUserRole";
import Loader from "@/components/ui/loader";
import { ChartBarIcon, User2Icon } from "lucide-react";
import { IoDocumentTextSharp } from "react-icons/io5";

interface ServiceCardProps {
  iconUrl: string;
  title: string;
  description: string;
  color: string;
  titleColor: string;
  page_link: string;
  icon?: React.ReactNode;
}

// Enhanced Service Card with better visual hierarchy and interactions
const ServiceCard: React.FC<ServiceCardProps> = ({
  iconUrl,
  title,
  description,
  titleColor,
  page_link,
}) => {
  // Helper to get gradient background based on title
  const getGradientBg = (title: string) => {
    const gradients: Record<string, string> = {
      Student:
        "from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100",
      Medical: "from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100",
      Tourism: "from-cyan-50 to-sky-50 hover:from-cyan-100 hover:to-sky-100",
      Business:
        "from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100",
      Visa: "from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100",
      B2B: "from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100",
      User: "from-green-50 to-lime-50 hover:from-green-100 hover:to-lime-100",
      Accounts:
        "from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100",
    };
    return (
      gradients[title] ||
      "from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200"
    );
  };

  // Helper to get icon color based on title
  const getIconColor = (title: string) => {
    const colors: Record<string, string> = {
      Student: "text-blue-600",
      Medical: "text-red-600",
      Tourism: "text-cyan-600",
      Business: "text-gray-700",
      Visa: "text-emerald-600",
      B2B: "text-purple-600",
      User: "text-green-600",
      Accounts: "text-amber-600",
    };
    return colors[title] || "text-gray-600";
  };

  return (
    <Link href={page_link} className="block group">
      <div
        className={`
        h-full
    relative bg-linear-to-br ${getGradientBg(title)}
    rounded-2xl shadow-md hover:shadow-xl 
    transition-all duration-300 ease-out
    p-6 flex flex-col items-center text-center
    hover:-translate-y-2 active:translate-y-0
    border border-white/50 backdrop-blur-sm
    overflow-hidden
      `}
      >
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

        {/* Icon Container */}
        <div
          className={`
          mb-4 p-3 rounded-2xl bg-white/60 backdrop-blur-sm
          shadow-sm group-hover:shadow-md transition-all duration-300
          ${getIconColor(title)}
        `}
        >
          <img
            src={iconUrl}
            alt={title}
            className="w-10 h-10 object-contain"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h3
          className={`
          text-xl font-bold mb-2 transition-colors duration-300
          ${titleColor} group-hover:text-gray-900
        `}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-15">
          {description}
        </p>

        {/* Hover indicator */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
            Access Portal
            <svg
              className="w-3 h-3 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

// Welcome Banner Component
const WelcomeBanner: React.FC<{ userName?: string; userRole: string }> = ({
  userName,
  userRole,
}) => {
  const getRoleDisplay = (role: string) => {
    const roles: Record<string, string> = {
      admin: "Administrator",
      user: "Student / Client",
      office_admin: "Office Manager",
    };
    return roles[role] || role;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div
      className="relative mb-8 overflow-hidden rounded-2xl p-6 md:p-8"
      style={{
        background: "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {getGreeting()}
            {userName ? `, ${userName}` : "!"}
          </h2>
          <p className="text-gray-300 mt-1">
            Welcome to your {getRoleDisplay(userRole)} Dashboard
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-white capitalize">
            {userRole} Access
          </span>
        </div>
      </div>
    </div>
  );
};

// Quick Stats Component
const QuickStats: React.FC<{ userRole: string }> = ({ userRole }) => {
  const stats = [
    {
      label: "Active Services",
      value:
        userRole === "admin" ? "8" : userRole === "office_admin" ? "6" : "5",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      label: "Recent Updates",
      value: "12",
      icon: <IoDocumentTextSharp className="w-5 h-5" />,
    },
    {
      label: "Support Available",
      value: "24/7",
      icon: <User2Icon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
            {stat.icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const MainDashboard: React.FC = () => {
  const { userRole, loading } = useUserRole();
  const [services, setServices] = useState<ServiceCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    if (!userRole) return;
    setServices([
      {
        iconUrl: "https://i.postimg.cc/y84YY3ng/famicons-school-sharp.png",
        title: "Student",
        description:
          "Empowering students with the skills, exposure, and resources to grow confidently and achieve their dreams.",
        color: "bg-gray-100",
        titleColor: "text-blue-700",
        page_link: `/dashboard/scholarship/${userRole === "user" ? userRole : "admin"}`,
      },
      {
        iconUrl:
          "https://i.postimg.cc/TPQR97xj/streamline-ultimate-favorite-medical-bold.png",
        title: "Medical",
        description:
          "World-class medical care abroad, with trusted guidance and stress-free support.",
        color: "bg-red-500",
        titleColor: "text-red-500",
        page_link: `/dashboard/medical/${userRole === "user" ? userRole + "s" : "admin"}`,
      },
      {
        iconUrl: "https://i.postimg.cc/bYZtZb0B/majesticons-airplane.png",
        title: "Tourism",
        description:
          "Explore China, Malaysia, and Australia with trusted guidance, personalized support.",
        color: "bg-sky-400",
        titleColor: "text-sky-300",
        page_link: `/dashboard/tourist/${userRole === "user" ? userRole : "admin"}`,
      },
      {
        iconUrl: "https://i.postimg.cc/5tPX0N6m/solar-pie-chart-3-bold.png",
        title: "Business",
        description:
          "Helping businesses grow with trusted guidance, smart solutions, and reliable support for long-term success.",
        color: "bg-gray-800",
        titleColor: "text-black",
        page_link: `/dashboard/business/${userRole === "user" ? userRole : "admin"}`,
      },
      {
        iconUrl: "https://i.postimg.cc/5tPX0N6m/solar-pie-chart-3-bold.png",
        title: "Visa",
        description:
          "Simplifying your visa journey with support at every step—secure, stress-free.",
        color: "bg-green-800",
        titleColor: "text-black",
        page_link: `/dashboard/visa/${userRole === "user" ? userRole : "admin"}`,
      },
      {
        iconUrl: "https://i.postimg.cc/DZPZYqMY/6472772-1.png",
        title: "B2B",
        description:
          "Guiding international students to succeed globally with confidence and support.",
        color: "bg-red-500",
        titleColor: "text-red-600",
        page_link: "/dashboard/b2b",
      },
      {
        iconUrl: "https://i.postimg.cc/43JZ7Qym/user.png",
        title: "User",
        description: "Manage your user and employ",
        color: "bg-green-500",
        titleColor: "text-red-600",
        page_link: `/dashboard/users/${userRole !== "admin" ? userRole : "admin"}`,
      },
      {
        iconUrl: "https://i.postimg.cc/KYZXNxdW/fund.png",
        title: "Accounts",
        description: "Manage your user and employee accounts",
        color: "bg-green-500",
        titleColor: "text-black",
        page_link: `/dashboard/accounts`,
      },
    ]);
  }, [userRole]);

  const filteredServices = useMemo(() => {
    if (!userRole) return [];

    let roleFiltered: ServiceCardProps[] = [];

    if (userRole === "admin") {
      roleFiltered = services;
    } else if (userRole === "user") {
      roleFiltered = services.slice(0, 5);
    } else if (userRole === "office_admin") {
      roleFiltered = services.filter(
        (service) => service.title !== "B2B" && service.title !== "User",
      );
    } else {
      roleFiltered = [];
    }

    // Apply search filter
    if (searchTerm.trim()) {
      return roleFiltered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return roleFiltered;
  }, [services, userRole, searchTerm]);

  if (loading) return <Loader />;
  if (!userRole) return null;

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="https://i.postimg.cc/WbV55LZS/Group-2.png"
                alt="Company Logo"
                className="max-w-36 md:max-w-40"
                width={180}
                height={90}
                priority
              />
            </Link>
            <div className="hidden md:block h-10 w-px bg-gray-300" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Administration <span className="text-red-600">Portal</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-red-300 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white/80 backdrop-blur-sm"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Welcome Banner */}
        <WelcomeBanner userRole={userRole} />

        {/* Quick Stats - Only for admin/office_admin */}
        {(userRole === "admin" || userRole === "office_admin") && (
          <QuickStats userRole={userRole} />
        )}

        {/* Main Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Select Portal You Want to Access
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-red-500 to-red-600 mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 mt-3 text-sm">
            {filteredServices.length} service
            {filteredServices.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filteredServices.map((service, index) => (
              <ServiceCard key={`${service.title}-${index}`} {...service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No services found
            </h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainDashboard;

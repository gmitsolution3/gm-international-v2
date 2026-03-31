"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import useUserRole from "@/app/useContext/useUserRole";
import Loader from "@/components/ui/loader";

interface ServiceCardProps {
  iconUrl: string;
  title: string;
  description: string;
  color: string;
  titleColor: string;
  page_link: string;
}

const MainDashboard: React.FC = () => {
  const { userRole, loading } = useUserRole();
  const [services, setServices] = useState<ServiceCardProps[]>([]);

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
        page_link: `/dashboard/scholarship/${userRole !== "admin" ? userRole : "admin"}`,
      },
      {
        iconUrl:
          "https://i.postimg.cc/TPQR97xj/streamline-ultimate-favorite-medical-bold.png",
        title: "Medical",
        description:
          "World-class medical care abroad, with trusted guidance and stress-free support.",
        color: "bg-red-500",
        titleColor: "text-red-500",
        page_link: `/dashboard/medical/${
          userRole === "admin" ? userRole : userRole + `s`
        }`,
      },
      {
        iconUrl: "https://i.postimg.cc/bYZtZb0B/majesticons-airplane.png",
        title: "Tourism",
        description:
          "Explore China, Malaysia, and Australia with trusted guidance, personalized support",
        color: "bg-sky-400",
        titleColor: "text-sky-300",
        page_link: `/dashboard/tourist/${userRole !== "admin" ? userRole : "admin"}`,
      },
      {
        iconUrl: "https://i.postimg.cc/5tPX0N6m/solar-pie-chart-3-bold.png",
        title: "Business",
        description:
          "Helping businesses grow with trusted guidance, smart solutions, and reliable support for long-term success.",
        color: "bg-gray-800",
        titleColor: "text-black",
        page_link: `/dashboard/business/${userRole !== "admin" ? userRole : "admin"}`,
      },
      {
        iconUrl: "https://i.postimg.cc/5tPX0N6m/solar-pie-chart-3-bold.png",
        title: "Visa",
        description:
          "Simplifying your visa journey with support at every step—secure, stress-free",
        color: "bg-green-800",
        titleColor: "text-black",
        page_link: `/dashboard/visa/${userRole !== "admin" ? userRole : "admin"}`,
      },
      {
        iconUrl:
          "https://i.postimg.cc/L8253ZfF/9023992-student-fill-icon-1.png",
        title: "International Student",
        description:
          "Guiding international students to succeed globally with confidence and support. ",
        color: "bg-red-500",
        titleColor: "text-red-600",
        page_link: "/",
      },
      {
        iconUrl: "https://i.postimg.cc/DZPZYqMY/6472772-1.png",
        title: "B2B",
        description:
          "Guiding international students to succeed globally with confidence and support. ",
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

  if (loading) return <Loader />;
  if (!userRole) return null;
  if (!services.length) return null;

  return (
    <section className="min-h-screen flex mx-auto items-center max-w-7xl w-full py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-center mb-12 space-y-4 md:space-y-0 md:space-x-6">
          {/* Logo Mockup - recreating the feel of the GM logo */}

          <div className="relative">
            <Link href="/">
              <Image
                src="https://i.postimg.cc/WbV55LZS/Group-2.png"
                alt="company_logo"
                className="max-w-40"
                width={220}
                height={120}
              />
            </Link>
          </div>

          <div className="hidden md:block h-12 w-px bg-gray-300 mx-6"></div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
            Administration <span className="text-red-600">Portal</span>{" "}
          </h2>
        </div>
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Select portal you want to access
          </h3>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover:cursor-pointer">
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Bottom Row - Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 lg:max-w-7xl lg:mx-auto hover:cursor-pointer">
            {services.slice(4, 6).map((service, index) => (
              <ServiceCard key={index + 4} {...service} />
            ))}
          </div>
          {(userRole === "admin" || userRole === "office_admin") && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 lg:max-w-7xl lg:mx-auto hover:cursor-pointer">
              {userRole === "admin" ? services.slice(6, 9).map((service, index) => (
                <ServiceCard key={index + 6} {...service} />
              )) : services.slice(8, 9).map((service, index) => (
                <ServiceCard key={index + 6} {...service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainDashboard;

const ServiceCard: React.FC<ServiceCardProps> = ({
  iconUrl,
  title,
  description,
  titleColor,
  page_link,
}) => {
  return (
    <Link href={page_link}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center text-center group animate-fadeInUp">
        <div>
          <img src={iconUrl} alt={title} className="w-8 h-8" />
        </div>
        <h3
          className={`${titleColor} text-3xl font-bold mb-3 text-gray-800 group-hover:text-red-500 transition-colors duration-300`}
        >
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

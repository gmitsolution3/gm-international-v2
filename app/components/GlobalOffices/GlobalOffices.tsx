// components/GlobalOffices.tsx
import React from "react";
import Image from "next/image";
import { IOfficeAddress } from "@/app/dashboard/setting/office-address/create-address/page";


const GlobalOffices = ({ offices }: { offices: IOfficeAddress[] }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Global Offices
        </h2>
        <div className="w-20 h-1 bg-red-800 mx-auto"></div>
      </div>

      {/* Offices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {offices.map((office) => (
          <div
            key={office._id}
            className="h-full flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-hidden transition-shadow duration-300 p-2 rounded-2xl bg-white/5 hover:bg-white/10"
          >
            {/* Image Container - Left Side */}
            <div className="relative w-full sm:w-28 h-28 shrink-0 self-start sm:self-center">
              <Image
                src={office.address[0]?.image || "/placeholder.png"}
                alt={office.country}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 112px"
              />
            </div>

            {/* Content Container - Right Side */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-start">
              {/* Country */}
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                {office.country}
              </h3>

              {/* Address */}
              <div className="text-sm text-gray-200 mb-3 space-y-1">
                <p>{office.address[0]?.add}</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5">
                {/* Email */}
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-200 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${office.address[0]?.email}`}
                    className="text-white hover:text-red-400 hover:underline break-all"
                  >
                    {office.address[0]?.email}
                  </a>
                </div>

                {/* Phone */}
                {office.address[0]?.phone && office.address[0].phone.length > 0 && (
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                    {office.address[0].phone.map((phoneNumber, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <svg
                          className="w-4 h-4 text-gray-200 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <a
                          href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                          className="text-gray-200 hover:text-red-400"
                        >
                          {phoneNumber}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GlobalOffices;
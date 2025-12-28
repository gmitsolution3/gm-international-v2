import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Employ {
  name: string;
  rating: string;
  expertise: string;
  image: string;
  uploaded?: boolean;
  uploading?: boolean;
}

export interface Company {
  _id: string;
  companyName: string;
  images: string[];
  country: string;
  city: string;
  address: string;
  description: string;
  employ: Employ[];
  rating: string
}

export interface CompaniesProps {
  defaultCompanies: Company[];
}

export default async function CompanyCard({ defaultCompanies }:CompaniesProps) {


  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="header-title text-3xl md:text-5xl font-bold mb-4">
            Explore our <span className="text-red-500">partnership</span>{" "}
            business holders
          </h1>
          <p className="header-desc text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover our network of premium business facilities offering
            specialized with international standards and modern facilities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {defaultCompanies.map((company, index) => (
            <div
              key={company._id}
              className="hospital-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-full flex flex-col">
                {/* Image Section */}
                <div className="h-48 md:h-56 overflow-hidden bg-gray-200">
                  <div className="hospital-image-container w-full h-full">
                    <img
                      src={
                        company.images?.[0] ||
                        "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop"
                      }
                      alt={company.companyName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col grow">
                  {/* Hospital Name */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {company.companyName}
                  </h3>

                  {/* Location */}
                  <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2">
                    {company.city}, {company.country}
                  </p>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-700 mb-4 grow line-clamp-2">
                    {company.description}
                  </p>

                  {/* Doctors Section */}
                  {company.employ && company.employ.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        Top Doctors
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {company.employ.slice(0, 2).map((emp, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-10 h-10 shrink-0 rounded-full border-2 border-red-200 overflow-hidden bg-gray-200">
                              <img
                                src={emp.image}
                                alt={emp.name}
                                className="doctor-avatar w-full h-full object-cover"
                                title={`${emp.name} - ${emp.expertise}`}
                              />
                            </div>
                            <div className="hidden sm:block text-xs min-w-0">
                              <p className="font-semibold text-gray-800 truncate">
                                {emp.name}
                              </p>
                              <p className="text-yellow-500">★ {emp.rating}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Button */}
                  <Link href={`/business-home-page/companies/${company._id}`}>
                    <button className="view-details-btn w-full py-3 border-2 rounded-full font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:shadow-lg">
                      View Details
                      <ChevronRight size={18} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link href="/business-home-page/companies">
            <button
              // onClick={handleViewMore}
              className="view-more-btn px-8 md:px-12 py-3 md:py-4 bg-linear-to-r from-[#CA2328] to-red-600 text-white font-bold rounded-full text-base md:text-lg shadow-lg hover:shadow-xl hover:cursor-pointer"
            >
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

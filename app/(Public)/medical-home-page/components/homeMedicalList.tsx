import React from "react";
import { ChevronRight } from "lucide-react";
import { fetchMedicalList } from "./fetches";
import Link from "next/link";

interface Doctor {
  name: string;
  rating: string;
  expertise: string;
  image: string;
  uploaded?: boolean;
  uploading?: boolean;
}

interface Hospital {
  _id: string;
  hospitalName: string;
  images: string[];
  country: string;
  city: string;
  address: string;
  description: string;
  doctors: Doctor[];
}

export default async function HomeMedicalList() {
  const defaultHospitals: Hospital[] = await fetchMedicalList();

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="header-title text-3xl md:text-5xl font-bold mb-4">
            Some Hospitals Are{" "}
            <span className="text-red-500">Available Here!</span>
          </h1>
          <p className="header-desc text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover our network of premium healthcare facilities offering
            specialized medical care with international standards and modern
            facilities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {defaultHospitals.map((hospital, index) => (
            <div
              key={hospital._id}
              className="hospital-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-full flex flex-col">
                {/* Image Section */}
                <div className="h-48 md:h-56 overflow-hidden bg-gray-200">
                  <div className="hospital-image-container w-full h-full">
                    <img
                      src={
                        hospital.images?.[0] ||
                        "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop"
                      }
                      alt={hospital.hospitalName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col grow">
                  {/* Hospital Name */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {hospital.hospitalName}
                  </h3>

                  {/* Location */}
                  <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2">
                    {hospital.city}, {hospital.country}
                  </p>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-700 mb-4 grow line-clamp-2">
                    {hospital.description}
                  </p>

                  {/* Doctors Section */}
                  {hospital.doctors && hospital.doctors.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        Top Doctors
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {hospital.doctors.slice(0, 2).map((doctor, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-10 h-10 shrink-0 rounded-full border-2 border-red-200 overflow-hidden bg-gray-200">
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="doctor-avatar w-full h-full object-cover"
                                title={`${doctor.name} - ${doctor.expertise}`}
                              />
                            </div>
                            <div className="hidden sm:block text-xs min-w-0">
                              <p className="font-semibold text-gray-800 truncate">
                                {doctor.name}
                              </p>
                              <p className="text-yellow-500">
                                ★ {doctor.rating}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Button */}
                  <Link
                    href={`/medical-home-page/medical-list/${hospital._id}`}
                  >
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
          <Link href="/medical-home-page/medical-list">
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

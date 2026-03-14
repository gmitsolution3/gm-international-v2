import { TourPackage } from "@/app/dashboard/business/admin/components/makePackage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Calendar, MapPin, TimerIcon, Users } from "lucide-react";

interface TourPackageCardsProps {
  packages: TourPackage[];
  from?: string;
  id?: string;
}

const ShowHomePackage: React.FC<TourPackageCardsProps> = ({
  packages = [],
  from,
  id,
}) => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Modernized */}
        <div className="mb-16 text-center">
          {from === "withVisa" && (
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-1 bg-red-700 rounded-full"></div>
              <span className="text-red-700 font-semibold tracking-wider uppercase text-sm">
                Premium Business Tours
              </span>
              <div className="w-12 h-1 bg-red-700 rounded-full"></div>
            </div>
          )}

          {from === "withVisa" && (
            <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Business Tour <span className="text-red-700">Packages</span>{" "}
              <span className="text-red-700">With</span> <br />
              Visa <span className="text-red-700">&</span> Air Ticket
            </h1>
          )}
          {from === "withoutVisa" && (
            <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Business Tour <span className="text-red-700">Packages</span>{" "}
              <span className="text-red-700">Without</span> <br />
              Visa <span className="text-red-700">&</span> Air Ticket
            </h1>
          )}

          {from === "withoutVisa" ||
            (from === "withVisa" && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Curated business experiences designed to expand your
                professional network and accelerate global growth opportunities.
              </p>
            ))}
        </div>

        {/* Cards Grid - Modernized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg: TourPackage) => (
            <div
              key={pkg._id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-100 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div className="h-65 overflow-hidden rounded-b-2xl">
                  <Image
                    src={pkg.image}
                    alt={pkg.eventName}
                    width={680}
                    height={320}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Floating Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <p className="text-xs text-gray-600 font-medium">
                    Starting from
                  </p>
                  <p className="text-lg font-bold text-red-700">
                    BDT {pkg.maxPrice} BDT
                  </p>
                  {pkg.isWithVisaAndAirTicket ? (
                    <p className="text-xs font-bold text-green-800">
                      Include visa and air ticket
                    </p>
                  ) : (
                    <p className="text-xs font-bold text-green-800">
                      Without visa and air ticket
                    </p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Package Name */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {pkg.packageName}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Multiple Destinations
                    </span>
                  </div>
                </div>

                {/* Event Dates */}
                <div className="mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-red-700" />
                    <h4 className="font-bold text-gray-900">Event Schedule</h4>
                  </div>

                  <div className="space-y-3">
                    {pkg.phases.map((p, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between pb-3 border-b border-gray-200 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">
                              Phase {p.phaseNumber}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {p.startDate} - {p.endDate}
                          </p>
                        </div>
                        <div className="bg-green-200 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                          Active
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        Minimum Group Size :
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {pkg.minimumPax} People
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <TimerIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Duration</span>
                    </div>
                    <span className="text-sm font-bold text-red-900">
                      {pkg.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Limited slots available</span>
                  </div>
                  {pkg.B2BPrice && from === "b2b" && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 p-3 border rounded-xl my-4 bg-red-100">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-bold">
                        B2bPrice:{" "}
                        <span className="px-2 py-1 bg-red-700 text-white rounded-lg">
                          {pkg.B2BPrice} BDT
                        </span>
                      </span>
                    </div>
                  )}

                  {pkg.sold && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Sold : {pkg.sold}</span>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                {id ? (
                  <Link
                    href={`/business-home-page/business-packages/${pkg._id}?b2bid=${id}`}
                  >
                    <button className="w-full bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl group-hover:shadow-red-200 active:scale-[0.98]">
                      View Package Details
                      <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </Link>
                ) : (
                  <Link
                    href={`/business-home-page/business-packages/${pkg._id}`}
                  >
                    <button className="w-full bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl group-hover:shadow-red-200 active:scale-[0.98]">
                      View Package Details
                      <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="text-center py-24">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Packages Available
              </h3>
              <p className="text-gray-600 mb-8">
                New business tour packages are coming soon. Stay tuned for
                exciting opportunities!
              </p>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {packages.length === 0 && (
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for?
            </p>
            <button className="px-8 py-3 border-2 border-red-700 text-red-700 hover:bg-red-50 font-bold rounded-xl transition-all duration-300">
              Request Custom Package
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowHomePackage;

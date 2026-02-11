import React from "react";
import { getBusinessDetails } from "../../components/fetches";
import Link from "next/link";
import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import Image from "next/image";
import { Calendar, Users, MapPin, DollarSign, Clock } from "lucide-react";

interface BusinessDetailsProps {
  params: { id: string };
}

const BusinessPackageDetails = async ({ params }: BusinessDetailsProps) => {
  const { id } = await params;
  const packageDetails = await getBusinessDetails(id);

  if (!packageDetails) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Package Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The business tour package you're looking for is currently
            unavailable.
          </p>
          <Link href="/business-home-page">
            <button className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-xl transition-all">
              Browse Other Packages
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/business-home-page" className="hover:text-red-700">
            Business Packages
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {packageDetails.packageName}
          </span>
        </nav>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {packageDetails.packageName}
        </h1>
        <p className="text-gray-600 text-lg">{packageDetails.eventName}</p>
      </div>

      {/* Image and Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Image */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <div className="aspect-video">
              <Image
                src={packageDetails.image}
                alt={packageDetails.eventName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
            {/* Image Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
              <p className="text-sm font-bold text-red-700">Business Tour</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            Tour Summary
          </h3>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Price per person
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{packageDetails.maxPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Duration</p>
                <p className="text-xl font-bold text-gray-900">
                  {packageDetails.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Minimum Group Size
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {packageDetails.minimumPax} People
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Destination</p>
                <p className="text-xl font-bold text-gray-900">
                  {packageDetails.country}
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <Link
              href={`/business-home-page/business-submit-form?id=${id}`}
              className="block mt-8"
            >
              <button className="w-full bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]">
                Book This Package
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tour Schedule Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-red-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Tour Schedule</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageDetails.phases.map((phase: any) => (
            <div
              key={phase.phaseNumber}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-700 font-bold">
                      {phase.phaseNumber}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Phase {phase.phaseNumber}
                  </h3>
                </div>
                <span className="text-xs font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Available
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="font-semibold text-gray-900">
                      {phase.startDate}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">End Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="font-semibold text-gray-900">
                      {phase.endDate}
                    </p>
                  </div>
                </div>

                {phase.returnCity && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Return City</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="font-semibold text-gray-900">
                        {phase.returnCity}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      {packageDetails.description && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <span className="text-red-700 font-bold">i</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Package Details
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="prose prose-lg max-w-none">
              <PackageDescriptionView html={packageDetails.description} />
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <div className="bg-linear-to-r from-red-50 to-white border border-red-100 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Join This Business Tour?
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Secure your spot now and take the next step in expanding your business
          network globally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/business-home-page/business-submit-form?id=${id}`}
            className="flex-1 sm:flex-none"
          >
            <button className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Book Now →
            </button>
          </Link>
          <Link
            href="/business-home-page/business-packages"
            className="flex-1 sm:flex-none"
          >
            <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
              View Other Packages
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessPackageDetails;

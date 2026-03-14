import React from "react";
import { getB2BScholarshipPackage } from "../components/fetches";
import OfferCard, {
  ScholarshipCardProps,
} from "@/app/(Public)/student-home-page/components/OfferCard";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import Link from "next/link";
import { DollarSign } from "lucide-react";

const B2BScholarshipPackage = async () => {
  const session = await getServerSession(authConfig);

  const userId = (session?.user as any)?.id;

  const data = await getB2BScholarshipPackage(userId);

  if (!data.success) {
    return <div>No Data found</div>;
  }

  return (
    <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <h1 className="text-xl md:text-2xl lg:text-4xl mb-6 font-bold text-red-800">
          B2B scholarship package
        </h1>

        <Link href="/b2b/dashboard/services-pricing">
          {" "}
          <button className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3 font-semibold text-white bg-linear-to-r from-red-600 to-red-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 hover:from-red-700 hover:to-red-800">
            {" "}
            {/* Shine effect */}{" "}
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition duration-700"></span>{" "}
            <DollarSign className="w-5 h-5 relative z-10" />{" "}
            <span className="relative z-10 text-xs md:text-lg">
              {" "}
              B2B Service Charge{" "}
            </span>{" "}
          </button>{" "}
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {data.data.packageInfo.map(
            (offer: ScholarshipCardProps, index: number) => (
              <OfferCard
                key={index}
                offer={offer}
                form={"b2b"}
                b2bId={userId}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default B2BScholarshipPackage;

import React from "react";
import { getB2BScholarshipPackage } from "../components/fetches";
import OfferCard, {
  ScholarshipCardProps,
} from "@/app/(Public)/student-home-page/components/OfferCard";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import Link from "next/link";

const B2BScholarshipPackage = async () => {
  const session = await getServerSession(authConfig);

  const userId = (session?.user as any)?.id;


  const data = await getB2BScholarshipPackage(userId);


  if (!data.success) {
    return <div>No Data found</div>;
  }

  return (
    <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-bold text-red-800">
          B2B scholarship package
        </h1>
        <Link href={"/b2b/dashboard/services-pricing"}>
          <button className="text-2xl px-3 py-2 rounded-xl border border-red-700 bg-red-700 text-white font-bold">
            Service Charge
          </button>
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

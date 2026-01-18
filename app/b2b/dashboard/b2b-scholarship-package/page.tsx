import React from "react";
import { getB2BScholarshipPackage } from "../components/fetches";
import OfferCard from "@/app/(Public)/student-home-page/components/OfferCard";
import { getServerSession } from "next-auth";


const B2BScholarshipPackage = async () => {
  const session = await getServerSession();

  const data = await getB2BScholarshipPackage(session?.user?.email!);
  const form = "b2b";

  if(!data.success){
    return <div>No Data found</div>
  }



  return (
    <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-bold text-red-700">
        Explore all B2B scholarship Package
      </h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* {data.map((offer: any, index: number) => (
            <div
              key={offer.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-card-appear"
            >
              <OfferCard offer={offer} form={form} />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default B2BScholarshipPackage;

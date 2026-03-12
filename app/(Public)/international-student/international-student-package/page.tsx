import { Filter } from "lucide-react";
import React from "react";
import OfferCard from "../../student-home-page/components/OfferCard";

const InternationalStudentPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/international-all-student-package`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  const from = "internationalDetails";


  if (result.length === 0) {
    return (
      <div className="text-2xl text-red-600 min-h-screen flex justify-center items-center">
        no data found
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="border-b border-gray-200 px-4 py-8 sm:px-6 md:px-8 lg:px-12">
        
        <div>
          <h1 className="text-2xl font-bold">Get All International Student Package</h1>
        </div>
      </div>
      <div className="min-h-[60vh] mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {result.map((offer: any, index: number) => (
            <OfferCard key={index} offer={offer} form={from} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternationalStudentPackage;

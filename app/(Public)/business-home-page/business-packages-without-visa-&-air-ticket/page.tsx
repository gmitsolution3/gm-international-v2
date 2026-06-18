import React from 'react'
import { getAllPackageWithoutVisa } from '../components/fetches';
import ShowHomePackage from '../components/showHomePackage';
import generateSEO from '@/lib/seo';

export const metadata = generateSEO(
  "China Business Visa & Canton Fair Support Services",
  "Apply for China business visas and get complete Canton Fair support with invitation letters, Z Visa processing, travel planning, interpreter support, hotel booking, and business consultancy.",
);

const WithoutVisaAndAirTicket =async () => {

    const packageData = await getAllPackageWithoutVisa()

  return (
    <div className="p-4 md:p-10">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Business Tour <span className="text-red-700">Packages</span>
          <br />
          <span className="text-red-700">Without</span> Visa{" "}
          <span className="text-red-700">&</span> Air Ticket
        </h1>
      </div>
      <div className="max-w-7xl mx-auto">
        <ShowHomePackage packages={packageData.data}  />
      </div>
    </div>
  );
}

export default WithoutVisaAndAirTicket;

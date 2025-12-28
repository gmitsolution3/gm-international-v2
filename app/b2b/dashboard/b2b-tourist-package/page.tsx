import React from 'react'
import { getB2BTouristPackage } from '../components/fetches';
import TouristHomePackages from '@/app/(Public)/tourist-home-page/components/home/homePackage';

const B2BTouristPackage = async() => {


  const data = await getB2BTouristPackage();

  
  const from = "b2b"

  return (
    <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-bold text-red-700">
        Explore all B2B tourist Package
      </h1>
      <div className="max-w-7xl mx-auto">
        <TouristHomePackages packages={data} from={from} />
      </div>
    </div>
  );
}

export default B2BTouristPackage;

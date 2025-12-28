import React from 'react'
import { getBusinessPackages } from '../components/fetches'
import ShowHomePackage from '../components/showHomePackage';

const BusinessPackages = async() => {

    const packages = await getBusinessPackages();

  return (
    <div className='p-4 md:p-10'>
      <ShowHomePackage packages={packages} />
    </div>
  );
}

export default BusinessPackages

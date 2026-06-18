import React from 'react'
import { AddBusinessComponents } from '../components/addBusinessComponents'
import ShowAllTourPackages from '../components/showAllBusinessPackage';
import { getAllBusinessPackage } from '../../components/fetches';

const BusinessPackage = async() => {
  const value = "businessPackage"
  const allData = await getAllBusinessPackage()


  return (
    <div>
      <div className="flex flex-col md:flex-row justify-start md:items-center md:justify-between">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Business Package
          </h1>
          <p className="text-red-600">Manage your Package information</p>
        </div>
        <div>
          <AddBusinessComponents value={value} />
        </div>
      </div>
      <div>
        <ShowAllTourPackages initialData={allData.data} />
      </div>
    </div>
  );
}

export default BusinessPackage

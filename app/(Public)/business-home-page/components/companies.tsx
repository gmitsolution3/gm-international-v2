import React from 'react'
import { getHomeCompany } from './fetches'
import CompanyCard from './companyCard';

export const Companies = async() => {


  const companyData = await getHomeCompany();

  return (
    <div>
      <CompanyCard defaultCompanies={companyData} />
    </div>
  );
}

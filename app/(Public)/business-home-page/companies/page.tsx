import React from 'react'
import { getAllCompanies } from '../components/fetches';
import CompanyCard from '../components/companyCard';
import Companies from '../components/allCompanies';

const CompanyList = async() => {


    const allCompanies = await getAllCompanies();

  return (
    <div>
      <div>
        <Companies defaultCompanies={allCompanies} />
      </div>
    </div>
  );
}

export default CompanyList;

import React from "react";
import { AddBusinessComponents } from "../components/addBusinessComponents";

const CompanyList = () => {
  const value = "companyList";

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-start md:items-center md:justify-between">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Companies
          </h1>
          <p className="text-red-600">Manage your company information</p>
        </div>
        <div>
          <AddBusinessComponents value={value} />
        </div>
      </div>
      {/* <div>
        <ShowAllCompanies />
      </div> */}
    </div>
  );
};

export default CompanyList;

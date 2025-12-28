import React from "react";
import { getCompany } from "../../components/fetches";
import CompanyDetails from "../../components/companyDetails";

interface CompaniesParams {
  params: { id: string };
}

const CompaniesDetails = async ({ params }: CompaniesParams) => {
  const { id } = await params;

  const data = await getCompany(id);

  return (
    <div>
      <CompanyDetails company={data} />
    </div>
  );
};

export default CompaniesDetails;

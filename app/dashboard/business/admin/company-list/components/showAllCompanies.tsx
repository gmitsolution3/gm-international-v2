import { getAllCompanies } from "@/app/(Public)/business-home-page/components/fetches";
import React from "react";
import AllCompanies from "./AllCompanies";

export const ShowAllCompanies = async () => {
  const allComp = await getAllCompanies();

  return (
    <div>
      <AllCompanies initialData={allComp} />
    </div>
  );
};

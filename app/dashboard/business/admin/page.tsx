import React from "react";
import { getBusinessAnalysis } from "../../components/fetches";
import BusinessAnalysisSteps from "./components/BusinessAnalysisSteps";

const BusinessAnalysisPage = async () => {
  const result = await getBusinessAnalysis();

  console.log({result})

  return (
    <div>
      <BusinessAnalysisSteps data={result} />
    </div>
  );
};

export default BusinessAnalysisPage;

import React from "react";
import { getTouristAnalysis } from "../../components/fetches";
import TouristAnalysisState from "./components/TouristAnalysisState";

const TouristMainAnalysis = async () => {
  const result = await getTouristAnalysis();
  return (
    <div>
      <TouristAnalysisState data={result.data} />
    </div>
  );
};

export default TouristMainAnalysis;

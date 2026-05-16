import React from "react";
import { getUmrahHajjAnalysis } from "../../components/fetches";
import UmrahHajjAnalysisState from "./components/UmrahHajjAnalysisState";

const AdminMainPage = async () => {
  const result = await getUmrahHajjAnalysis();

  return (
    <div>
      <UmrahHajjAnalysisState data={result} />
    </div>
  );
};

export default AdminMainPage;

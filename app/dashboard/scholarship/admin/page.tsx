import React from "react";
import { getScholarshipsAnalysis } from "../components/fetech";
import StudentDashboardStats from "./Components/DashboardStats";

const ScholarshipAnalysisMainPage = async () => {
  const res = await getScholarshipsAnalysis();

  console.log({ data: res });

  return (
    <div>
      <StudentDashboardStats data={res.data} />
    </div>
  );
};

export default ScholarshipAnalysisMainPage;

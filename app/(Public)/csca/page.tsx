import React from "react";
import CscaRequirements from "./components/CscaRequirements";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "CSCA Exam Application & Consultancy for China",
  "GM International provides reliable CSCA exam application support, consultation, and end-to-end assistance for candidates preparing for certification exams.",
);

const CscaMainPage = () => {
  return (
    <div className="min-h-screen">
      <CscaRequirements />
    </div>
  );
};

export default CscaMainPage;

import React from "react";
import BusinessDealForm from "../components/businessDealForm";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "China Business Visa & Canton Fair Support Services",
  "Apply for China business visas and get complete Canton Fair support with invitation letters, Z Visa processing, travel planning, interpreter support, hotel booking, and business consultancy.",
);

const BusinessDeal = () => {
  return (
    <div>
      <BusinessDealForm />
    </div>
  );
};

export default BusinessDeal;

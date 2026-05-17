import React from "react";
import VisaEnrollment from "./components/visaEnrollment";
import VisaFlow from "./components/visaFlow";
import SupportSection from "../components/HSupport/HSupport";
import VisaProcessFlow from "./components/visaTree";
import FlowChart from "./components/flowChart";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Best Visa Consultancy for China, Malaysia, Australia & Thailand",
  "Trusted visa consultancy services for China, Malaysia, Australia and Thailand with complete support for documentation, application processing, interview preparation, and approvals.",
);
const Visa = () => {
  return (
    <div>
      <div>
        <VisaEnrollment />
      </div>
      <div>
        <FlowChart />
      </div>
      <div>
        <SupportSection />
      </div>
    </div>
  );
};

export default Visa;

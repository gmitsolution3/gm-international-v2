import React from "react";
import FlowChartNode from "./flowChartNode";
import { ChevronRight, Globe } from "lucide-react";
import Link from "next/link";

// Define the data for your visa application process
const visaProcessSteps = [
  {
    id: "1",
    label: "Select country",
    icon: "https://i.postimg.cc/y865MkrG/Layer-1-(1).png",
  },
  {
    id: "2",
    label: "Select Visa Type",
    icon: "https://i.postimg.cc/XqJBMKdY/Frame-1618871798.png",
  },
  {
    id: "3",
    label: "Fill up form",
    icon: "https://i.postimg.cc/hG1XfZ1w/Layer-1.png",
  },
  {
    id: "4",
    label: "Upload Required Document",
    icon: "https://i.postimg.cc/4ymy2fRZ/Frame.png",
  },
  {
    id: "5",
    label: "Make your payment",
    icon: "https://i.postimg.cc/dtZD8V9z/Frame-1618871801.png",
  },
  {
    id: "6",
    label: "Track your visa status",
    icon: "https://i.postimg.cc/fLbRkzLY/svg2.png",
  },
];

const FlowChart: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
          <span className="text-red-500">Easy steps</span>{" "}
          <span className="text-slate-900 dark:text-white">
            to apply for visa
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto text-balance">
          Follow our simple and streamlined process to get your visa approved in
          just a few easy steps
        </p>

      </div>
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
        {/* --- Row 1: Select Country -> Select Visa Type (Left to Right) --- */}
        <div className="flex justify-between items-center w-full my-10 relative">
          <FlowChartNode data={visaProcessSteps[0]} />
          <div className="horizontal-connector dashed-connector grow h-0 mx-4 relative" />
          <FlowChartNode data={visaProcessSteps[1]} />
        </div>

        {/* --- Vertical Connector 1 (R1-C2 to R2-C2) --- */}
        <div className="h-30 relative w-full">
          {/* The 'right' value is calculated to align with the center of the right node (Node width 160px/2 + padding/gap) */}
          <div className="vertical-connector dashed-connector-vertical absolute h-full right-[calc(18%-100px)]" />
        </div>

        {/* --- Row 2: Upload Docs <- Fill up form (Right to Left) --- */}
        <div className="flex justify-between items-center w-full my-10 relative reverse-flow">
          <FlowChartNode data={visaProcessSteps[3]} />
          <div className="horizontal-connector dashed-connector grow h-0 mx-4 relative" />
          <FlowChartNode data={visaProcessSteps[2]} />
        </div>

        {/* --- Vertical Connector 2 (R2-C1 to R3-C1) --- */}
        <div className="h-30 relative w-full">
          {/* The 'left' value is calculated to align with the center of the left node */}
          <div className="vertical-connector dashed-connector-vertical absolute h-full left-[calc(10%)]" />
        </div>

        {/* --- Row 3: Make Payment -> Track Status (Left to Right) --- */}
        <div className="flex justify-between items-center w-full my-10 relative">
          <FlowChartNode data={visaProcessSteps[4]} />
          <div className="horizontal-connector dashed-connector grow h-0 mx-4 relative" />
          <FlowChartNode data={visaProcessSteps[5]} />
        </div>
      </div>
      <div
        className={`flex justify-center transition-all duration-700 transform scale-95`}
        style={{ transitionDelay: "800ms" }}
      >
        <Link href="/visa/visa_apply" className="group relative px-6 md:px-8 py-2.5 md:py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 hover:cursor-pointer">
          <span>Apply now</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default FlowChart;

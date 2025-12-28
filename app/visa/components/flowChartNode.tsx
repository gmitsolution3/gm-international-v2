import { Icon, Link } from "lucide-react";
import Image from "next/image";
import React from "react";

interface NodeData {
  id: string;
  label: string;
  icon: string; // Placeholder for an icon
}

interface FlowChartNodeProps {
  data: NodeData;
}





const FlowChartNode: React.FC<FlowChartNodeProps> = ({ data }) => {

   
  return (
    // <div className="w-40 h-28 bg-gray-50 rounded-lg shadow-md flex flex-col justify-center items-center p-3 text-center transition duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
    //   {/* Icon Wrapper (Red background) */}
    //   <div className="bg-red-600 rounded p-2 mb-2 leading-none">
    //     {/* Replace the emoji with a proper icon library component (e.g., Lucide or Heroicons) */}
    //     <span className="text-xl text-white">{data.icon}</span>
    //   </div>

    //   {/* Label */}
    //   <div className="text-sm font-semibold text-gray-800">
    //     {data.label}
    //   </div>
    // </div>

    <div
      className={`transition-all duration-500 ease-out `}
    //   style={{ transitionDelay: `${delay * 150}ms` }}
    >
      <div className="group relative">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Card Content */}
        <div className="relative bg-slate-50 dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
          {/* Icon Container */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-blue-100 to-red-100 dark:from-blue-900/30 dark:to-red-900/30 rounded-lg p-3 md:p-4">
                {/* <Icon className="w-6 h-6 md:w-8 md:h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" /> */}
                <Image src={data.icon} fill alt="icon" className="text-2xl w-20"/>
                {/* <span className="text-xl text-white">{data.icon}</span> */}
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h3 className="text-center font-semibold text-slate-900 dark:text-white text-sm md:text-base leading-tight mb-1 whitespace-pre-line">
            {data.label}
          </h3>
          <p className="text-center text-xs md:text-sm text-slate-600 dark:text-slate-400">
            {/* {step.description} */}
          </p>

          {/* Hover Indicator Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FlowChartNode;


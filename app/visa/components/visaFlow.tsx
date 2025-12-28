"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  Dessert as Passport,
  FileText,
  Worm as Form,
  CreditCard,
  MapPin,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    icon: Globe,
    title: "Select country",
    description: "Choose your destination country",
    position: "top-left",
  },
  {
    id: 2,
    icon: Passport,
    title: "Select Visa Type",
    description: "Pick the right visa category",
    position: "top-right",
  },
  {
    id: 3,
    icon: FileText,
    title: "Upload Required\nDocument",
    description: "Provide necessary documents",
    position: "middle-left",
  },
  {
    id: 4,
    icon: Form,
    title: "Fill up form",
    description: "Complete the application form",
    position: "middle-right",
  },
  {
    id: 5,
    icon: CreditCard,
    title: "Make your\npayment",
    description: "Process your payment",
    position: "bottom-left",
  },
  {
    id: 6,
    icon: MapPin,
    title: "Track your visa\nstatus",
    description: "Monitor your application",
    position: "bottom-right",
  },
];

export default function VisaFlow() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  

  useEffect(() => {
    steps.forEach((step) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, step.id]);
      }, step.id * 150);
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
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

      {/* Main Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 animate-fade-in">
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 relative">
          {/* Horizontal Connector Lines */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          <div className="hidden md:block absolute bottom-16 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          <div className="absolute left-1 top-1/4 w-0.5 h-12 bg-linear-to-b from-red-500 to-transparent md:hidden"></div>

          {/* Vertical Connectors for Mobile */}
          <div className="absolute left-1/2 top-1/4 w-0.5 h-12 bg-linear-to-b from-red-500 to-transparent md:hidden"></div>
          <div className="absolute left-1/2 top-1/2 w-0.5 h-12 bg-linear-to-b from-red-500 to-transparent md:hidden"></div>
          <div className="absolute left-1/2 bottom-1/4 w-0.5 h-12 bg-linear-to-b from-red-500 to-transparent md:hidden"></div>

          {/* Step 1 */}
          <StepCard
            step={steps[0]}
            isVisible={visibleSteps.includes(steps[0].id)}
            delay={0}
          />

          {/* Step 2 */}
          <StepCard
            step={steps[1]}
            isVisible={visibleSteps.includes(steps[1].id)}
            delay={1}
          />

          {/* Step 3 */}
          <StepCard
            step={steps[2]}
            isVisible={visibleSteps.includes(steps[2].id)}
            delay={2}
          />

          {/* Step 4 */}
          <StepCard
            step={steps[3]}
            isVisible={visibleSteps.includes(steps[3].id)}
            delay={3}
          />

          {/* Step 5 */}
          <StepCard
            step={steps[4]}
            isVisible={visibleSteps.includes(steps[4].id)}
            delay={4}
          />

          {/* Step 6 */}
          <StepCard
            step={steps[5]}
            isVisible={visibleSteps.includes(steps[5].id)}
            delay={5}
          />
        </div>

        {/* CTA Button */}
        <div
          className=" mt-10 flex justify-center transition-all duration-700 transform opacity-100 scale-100"
          
        >
          <button className="group relative px-6 md:px-8 py-2.5 md:py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 hover:cursor-pointer">
            <span>Apply now</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface StepCardProps {
  step: (typeof steps)[0];
  isVisible: boolean;
  delay: number;
}

function StepCard({ step, isVisible, delay }: StepCardProps) {
  const Icon = step.icon;
  const animationClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8";

  return (
    <div
      className={`transition-all duration-500 ease-out ${animationClass}`}
      style={{ transitionDelay: `${delay * 150}ms` }}
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
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h3 className="text-center font-semibold text-slate-900 dark:text-white text-sm md:text-base leading-tight mb-1 whitespace-pre-line">
            {step.title}
          </h3>
          <p className="text-center text-xs md:text-sm text-slate-600 dark:text-slate-400">
            {step.description}
          </p>

          {/* Hover Indicator Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

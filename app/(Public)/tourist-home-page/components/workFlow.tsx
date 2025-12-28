"use client";

import React, { useEffect, useState, useRef } from "react";

// Define the structure for each step
const stepsData = [
  {
    id: 1,
    title: "1. Customer book hotel through app or web",
    delay: 0,
    // Placeholder to visually represent the icon/illustration from the original image
    placeholderText: "🎁 Booking App",
  },
  {
    id: 2,
    title: "2. Hotel accepts the order and",
    delay: 200,
    placeholderText: "🏨 Hotel Acceptance",
  },
  {
    id: 3,
    title: "3. Customer finished the payment process",
    delay: 400,
    placeholderText: "💳 Payment Terminal",
  },
  {
    id: 4,
    title: "4. Customer receives the confirmation messege from the hotel",
    delay: 600,
    placeholderText: "✅ Confirmation Phone",
  },
];

/**
 * Reusable component for a single process step (Left or Right Aligned).
 * @param {object} props
 * @param {number} props.id
 * @param {string} props.title
 * @param {string} props.placeholderText - Text to represent the visual in the circle
 * @param {string} props.alignment - 'left' or 'right'
 * @param {number} props.delay - delay for staggered animation
 */
const ProcessStep = ({ id, title, placeholderText, alignment, delay }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered reveal animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Determine alignment classes based on the desktop layout (lg and up)
  // On mobile (default), all elements are centered horizontally
  const alignClasses =
    alignment === "right"
      ? "lg:justify-end lg:text-right"
      : "lg:justify-start lg:text-left";

  return (
    <div
      className={`relative flex flex-col items-center p-4 transition-all duration-700 ${alignClasses} group`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Visual Placeholder Circle (Mimics Illustration Area) */}
      <div
        className={`
        relative z-10 flex h-32 w-32 items-center justify-center 
        rounded-full border-2 border-dashed border-red-500 bg-white 
        shadow-lg transition-all duration-300 hover:shadow-xl
        ${
          alignment === "right"
            ? "lg:order-2 lg:ml-8 lg:mr-0"
            : "lg:order-1 lg:mr-8 lg:ml-0"
        }
      `}
      >
        {/* Inner solid red circle border */}
        <div className="h-28 w-28 rounded-full border border-red-300 flex items-center justify-center text-center text-xs font-semibold text-red-600 p-2">
          {placeholderText}
        </div>
      </div>

      {/* Text Content */}
      <div
        className={`mt-4 max-w-xs text-center text-sm font-medium text-gray-700 lg:text-base ${
          alignment === "right" ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <p className="font-bold text-gray-900">{title}</p>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Mobile Connector (Vertical Dashed Line) */}
      {id < 4 && (
        <div className="absolute top-36 h-8 w-0 border-l-2 border-dashed border-red-300 lg:hidden"></div>
      )}
    </div>
  );
};

// SVG component to draw the complex diagonal/vertical connectors for desktop
const DesktopConnectors = () => {
  const connectorPath = `
    M 25 110 L 25 110 
    C 25 110, 75 110, 75 110 
    C 75 110, 75 350, 75 350
    C 75 350, 25 350, 25 350
    C 25 350, 25 590, 25 590
    C 25 590, 75 590, 75 590
  `;

  // The coordinates are normalized (0-1000) for the viewBox, but the alignment
  // needs to target the center of the elements accurately.
  // The path sequence is:
  // 1. Step 1 Center (Left) to Step 2 Center (Right) [Diagonal down right]
  // 2. Step 2 Center (Right) to Step 3 Center (Left) [Diagonal down left]
  // 3. Step 3 Center (Left) to Step 4 Center (Right) [Diagonal down right]

  // Adjusted for the visual flow of the image (Horizontal, Down, Horizontal, Down, Horizontal)
  const pathData = `
    M 25% 15% 
    L 75% 40%
    M 75% 40%
    L 25% 65%
    M 25% 65%
    L 75% 90%
  `;

  // Re-evaluating the image flow: It's a series of points connected by dashed lines.
  // Point 1 (L) -> Point 2 (R) [Diagonal Down]
  // Point 2 (R) -> Point 3 (L) [Diagonal Down]
  // Point 3 (L) -> Point 4 (R) [Diagonal Down]
  const pathDataAccurate = `
    M 25% 15% 
    L 75% 35%
    M 75% 35%
    L 25% 65%
    M 25% 65%
    L 75% 85%
  `;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathDataAccurate}
        fill="none"
        stroke="#f87171"
        strokeDasharray="1 1"
        strokeWidth="0.5"
      />
    </svg>
  );
};

// The main application component
const WorkFlow = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <header className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          How Does it <span className="text-red-600">Work? </span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          Gorem ipsum dolor sit amet, consectetur adipiscing elit. Gorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
      </header>

      {/* Process Flow Container */}
      <div className="mx-auto max-w-4xl">
        <div className="relative grid grid-cols-1 items-start gap-y-6 lg:grid-cols-2 lg:gap-x-12">
          {/* DOTTED LINE CONNECTORS (Desktop Only) */}
          <div className="hidden lg:block absolute inset-0">
            <DesktopConnectors />
          </div>

          {/* STEP 1: Left Aligned */}
          <div className="lg:col-span-1 lg:mt-0">
            <ProcessStep
              id={stepsData[0].id}
              title={stepsData[0].title}
              placeholderText={stepsData[0].placeholderText}
              alignment="left"
              delay={stepsData[0].delay}
            />
          </div>

          {/* STEP 2: Right Aligned (Next column) */}
          <div className="lg:col-span-1 lg:mt-16">
            <ProcessStep
              id={stepsData[1].id}
              title={stepsData[1].title}
              placeholderText={stepsData[1].placeholderText}
              alignment="right"
              delay={stepsData[1].delay}
            />
          </div>

          {/* STEP 3: Left Aligned (Shifted down in the first column) */}
          <div className="lg:col-span-1 lg:mt-8">
            <ProcessStep
              id={stepsData[2].id}
              title={stepsData[2].title}
              placeholderText={stepsData[2].placeholderText}
              alignment="left"
              delay={stepsData[2].delay}
            />
          </div>

          {/* STEP 4: Right Aligned (Shifted down in the second column) */}
          <div className="lg:col-span-1 lg:mt-24">
            <ProcessStep
              id={stepsData[3].id}
              title={stepsData[3].title}
              placeholderText={stepsData[3].placeholderText}
              alignment="right"
              delay={stepsData[3].delay}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;

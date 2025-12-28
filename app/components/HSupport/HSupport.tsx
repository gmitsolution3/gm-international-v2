"use client";

import React from "react";

const SupportSection = () => {
  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      {/* Left Hex Background */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <img
          src="https://i.postimg.cc/qqzwFSQX/Union-1.png"
          alt="Left Background"
          className="w-full h-60 sm:w-48 hidden md:block"
        />
      </div>

      {/* Right Hex Background */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <img
          src="https://i.postimg.cc/rFhcxrRb/Union.png"
          alt="Right Background"
          className="w-full h-60 sm:w-48 hidden md:block"
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4">
          Supporting Your Success <br />
          We're Here to Help and{" "}
          <span className="text-red-500">Support You!</span>
        </h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          We're here for you every step of the way. So count on us as we ensure
          your success and satisfaction.
        </p>

        {/* Input + Button */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="How can we help?"
            className="border border-red-500 rounded-2xl px-4 py-2 w-64 sm:w-96 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-500 text-white rounded-2xl px-6 py-2 ml-2 hover:bg-red-600 transition-colors">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;

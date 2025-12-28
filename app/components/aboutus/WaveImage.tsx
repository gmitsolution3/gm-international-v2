"use client";



import React from 'react';

export default function WaveLogoSection() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
        
        {/* Single Smooth Moving Wave */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3, 4, 5, 6].map((ring) => {
            const size = 20 + ring * 12;
            const opacity = 0.9 - ring * 0.13;
            
            return (
              <div
                key={ring}
                className="absolute rounded-full border-2"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  borderColor: `rgba(220, 38, 38, ${opacity})`,
                  animation: `waveExpand 3s ease-out infinite`,
                  animationDelay: `${ring * 0.4}s`,
                  opacity: 0,
                }}
              />
            );
          })}
        </div>

        {/* Center Logo Container */}
        <div className="relative z-10 rounded-full p-6 flex items-center justify-center w-72 h-72">
          <img
            src="https://i.postimg.cc/WbV55LZS/Group-2.png"
            alt="Company Logo"
            className="w-12 h-12 object-contain"
          />
        </div>

      </div>

      {/* Wave Expansion Animation */}
      <style jsx>{`
        @keyframes waveExpand {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
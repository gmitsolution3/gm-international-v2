
// "use client";

// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { useState, useEffect } from "react";

// const slides = [
//   {
//     heading: "We Provide You Best",
//     highlight: "INTERNATIONAL",
//     span: "Deals",
//     description:
//       "Get access to the best international deals and opportunities tailored just for you. Our expert team ensures seamless processing.",
//   },
//   {
//     heading: "Journey Starts Here",
//     highlight: "PREMIUM",
//     span: "Services",
//     description:
//       "Experience world-class service with our dedicated professionals. We handle everything from documentation to final approval.",
//   },
//   {
//     heading: "Trust & Excellence",
//     highlight: "GUARANTEED",
//     span: "Results",
//     description:
//       "With years of experience, we guarantee the best outcomes. Your success is our mission and commitment.",
//   },
// ];

// export default function Hero() {
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState<"left" | "right">("right");
//   const [autoPlay, setAutoPlay] = useState(true);

//   useEffect(() => {
//     if (!autoPlay) return;

//     const timer = setInterval(() => {
//       setDirection("right");
//       setIndex((p) => (p + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [autoPlay]);

//   const next = () => {
//     setDirection("right");
//     setIndex((p) => (p + 1) % slides.length);
//     setAutoPlay(false);
//   };

//   const prev = () => {
//     setDirection("left");
//     setIndex((p) => (p - 1 + slides.length) % slides.length);
//     setAutoPlay(false);
//   };

//   return (
//     <section
//       className="min-h-[80vh] relative bg-cover bg-center bg-no-repeat py-10 md:my-0"
//       style={{
//         backgroundImage: `url("https://i.postimg.cc/NFxJtpTB/Group-308.png")`,
//       }}
//     >
//       <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/75 to-white/40 pointer-events-none"></div>

//       <div className="relative container mx-auto px-6 lg:px-12">
//         <div className="flex flex-col text-center items-center">
//           {/* LEFT IMAGE */}
//           <div className="relative -left-35 top-3 md:-left-63.75 md:top-15">
//             <img
//               key={index + "_img"}
//               src="https://i.postimg.cc/3RTFw2Ys/Union-1.png"
//               className={`w-30 md:w-72 lg:w-80 object-contain drop-shadow-xl transition-all duration-700 ${
//                 direction === "right" ? "animate-imgRight" : "animate-imgLeft"
//               }`}
//               alt="Hero"
//             />
//           </div>

//           {/* RIGHT TEXT */}
//           <div
//             key={index + "_text"}
//             className={`w-full lg:w-[55%] text-center transition-all duration-700 ${
//               direction === "right" ? "animate-slideLeft" : "animate-slideRight"
//             }`}
//           >
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
//               {slides[index].heading}
//             </h1>

//             <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-extrabold">
//               <span className="text-red-600">{slides[index].highlight}</span>{" "}
//               <span className="text-gray-900">{slides[index].span}</span>
//             </h2>

//             <p className="mt-4 text-gray-600 max-w-xl mx-auto">
//               {slides[index].description}
//             </p>

//             <button className="mt-6 group inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition">
//               About Us
//               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
//             </button>

//             {/* Indicators */}
//             <div className="mt-6 flex gap-3 justify-center">
//               {slides.map((_, i) => (
//                 <div
//                   key={i}
//                   onClick={() => {
//                     setDirection(i > index ? "right" : "left");
//                     setIndex(i);
//                     setAutoPlay(false);
//                   }}
//                   className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
//                     i === index ? "bg-red-600 w-8" : "bg-gray-300 w-3"
//                   }`}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Arrows */}
//         {/* <div className="flex justify-center gap-5 mt-10">
//           <button
//             onClick={prev}
//             className="w-12 h-12 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center shadow-lg"
//           >
//             <ArrowLeft />
//           </button>

//           <button
//             onClick={next}
//             className="w-12 h-12 rounded-full bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center shadow-lg"
//           >
//             <ArrowRight />
//           </button>
//         </div> */}

//         {/* Counter */}
//         <p className="mt-4 text-center text-gray-600 font-semibold">
//           <span className="text-red-600">{index + 1}</span> / {slides.length}
//         </p>
//       </div>

//       {/* Animations */}
//       <style>{`
//         @keyframes slideLeft {
//           from { opacity: 0; transform: translateX(60px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes slideRight {
//           from { opacity: 0; transform: translateX(-60px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes imgRight {
//           from { opacity: 0; transform: translateX(-80px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes imgLeft {
//           from { opacity: 0; transform: translateX(80px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         .animate-slideLeft { animation: slideLeft 0.6s ease-out; }
//         .animate-slideRight { animation: slideRight 0.6s ease-out; }
//         .animate-imgRight { animation: imgRight 0.6s ease-out; }
//         .animate-imgLeft { animation: imgLeft 0.6s ease-out; }
//       `}</style>
//     </section>
//   );
// }

"use client"


import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://i.postimg.cc/Mp42y5Ry/Student-visa.jpg',
    title: 'Student Visa',
    // subtitle: 'Pursue Your Dreams Abroad',
    // description: 'Get expert guidance for your student visa application'
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/MZYCsqVW/Business-visa.jpg',
    title: 'Business Visa',
    // subtitle: 'Expand Your Business Globally',
    // description: 'Professional assistance for business visa processing'
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/y6TMfscB/Medical-visa.jpg',
    title: 'Medical Visa',
    // subtitle: 'Access World-Class Healthcare',
    // description: 'Fast-track medical visa services for urgent needs'
  },
  {
    id: 4,
    image: 'https://i.postimg.cc/h40kCcTK/Tourist-visa.jpg',
    title: 'Tourist Visa',
    // subtitle: 'Explore The World',
    // description: 'Hassle-free tourist visa solutions for your vacation'
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index:number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-50 md:h-[40vh] lg:h-[80vh] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-50 md:h-full object-cover"
              />
              <div className="absolute inset-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? 'bg-red-600 w-8 sm:w-10 md:w-12 h-2 sm:h-2.5'
                : 'bg-white/50 hover:bg-white/70 w-2 sm:w-2.5 h-2 sm:h-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-red-600 transition-all duration-300 ease-linear"
          style={{
            width: isAutoPlaying ? `${((current + 1) / slides.length) * 100}%` : '0%'
          }}
        />
      </div>
    </div>
  );
}
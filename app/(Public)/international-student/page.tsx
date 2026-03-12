import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import OfferCard from "../student-home-page/components/OfferCard";
import HeroSlider from "../student-home-page/components/HeroSlider";

const InternationalStudent = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/international-student-package`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  const from = "international-home";

  const slides = [
    {
      id: 1,
      title: "Your Dream University Awaits",
      subtitle: "Study Abroad Made Simple",
      description:
        "Explore top universities worldwide with expert guidance, smooth application support, and complete student assistance.",
      image: "https://i.postimg.cc/D08B2cZV/1-jpg.jpg",
      imageAlt: "Study abroad students",
    },
    {
      id: 2,
      title: "Transform Your Career Globally",
      subtitle: "Opportunities Beyond Borders",
      description:
        "Join thousands of successful students who started their international education journey with us.",
      image: "https://i.postimg.cc/T1pCRcPm/2-jpg.jpg",
      imageAlt: "Global student opportunities",
    },
  ];

  const checklistItems = [
    "Application form",
    "Recent photo",
    "Passport scan copy",
    "Academic Transcript, Certificate and testimonial",
    "English test score (If any)",
    "CSCA score (If any)",
    "Medical report",
    "Police clearance ",
    "Experience Certificates (If any)",
    "Award Certificate (If any)",
  ];

  const label = "Student documents checklist";

  return (
    <div>
      <div>
        <HeroSlider
          slides={slides}
          checklistItems={checklistItems}
          label={label}
        />
      </div>
      <div className="max-w-7xl mx-auto my-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore our international{" "}
            <span className="text-red-600">offers</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Discover specially curated scholarship offers that open doors to
            your future. Get expert support, essential resources, and
            personalized mentorship all in one place.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {result.map((offer: any, index: number) => (
            <OfferCard key={index} offer={offer} from={from} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/international-student/international-student-package">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 md:px-8 md:py-3 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternationalStudent;

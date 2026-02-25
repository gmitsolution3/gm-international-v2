import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import TouristHomePackages from "../tourist-home-page/components/home/homePackage";
import HeroSlider from "../student-home-page/components/HeroSlider";

const InternationalTourist = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-international-tourist-package`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  if (result.length === 0) {
    <div className="min-h-screen flex justify-center items-center text-red-700">
      no data fuound
    </div>;
  }

  const slides = [
    {
      id: 1,
      title: "Explore The World With Confidence",
      subtitle: "Your Journey Begins Here",
      description:
        "Discover breathtaking destinations, exciting adventures, and unforgettable travel experiences with our expertly planned tour packages.",
      image: "https://i.postimg.cc/8cQqs57y/5-jpg.jpg",
      imageAlt: "International tourist destination",
    },
    {
      id: 2,
      title: "Make Every Trip Memorable",
      subtitle: "Travel Without Worries",
      description:
        "From visa assistance to hotel booking and guided tours, we handle everything so you can enjoy your vacation stress-free.",
      image: "https://i.postimg.cc/GtwZ924g/6-jpg.jpg",
      imageAlt: "Happy tourists traveling",
    },
  ];

  const checklistItems = [
    "Recent photo",
    "Passport scan copy",
    "Invitation letter",
    "Job ID (Job Holder)",
    "NOC (Job Holder)",
    "Business card",
    "Trade license (If any)",
    "Bank statement & solvency",
  ];
  const label = "Tourist document checklist";

  const from = "international";
  return (
    <div>
      <div>
        <HeroSlider
          slides={slides}
          checklistItems={checklistItems}
          label={label}
        />
      </div>
      <div>
        <TouristHomePackages packages={result} from={from} />
        <div className="flex justify-center">
          <Link href="/international-tourist/international-tourist-package">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 md:px-8 md:py-3 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternationalTourist;

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
      title: "Explore Wildlife Adventures",
      subtitle: "Feel The Wild Nature",
      description:
        "Experience the thrill of wildlife safaris and get closer to nature with our exclusive jungle tour packages.",
      image:
        "https://i.postimg.cc/8Ch38WBm/amazing-tiger-nature-habitat-tiger-pose-golden-light-time-jpg.jpg",
      imageAlt: "International tourist destination",
    },
    {
      id: 2,
      title: "Discover Peaceful Countryside",
      subtitle: "Escape The City Life",
      description:
        "Relax in beautiful countryside destinations filled with greenery, fresh air, and peaceful surroundings.",
      image: "https://i.postimg.cc/dVCNddfW/dreamy-rainbow-countryside-jpg.jpg",
      imageAlt: "Happy tourists traveling",
    },
    {
      id: 3,
      title: "Enjoy Lakeside Serenity",
      subtitle: "Nature At Its Best",
      description:
        "Witness calm lakes, wildlife, and serene environments perfect for a refreshing getaway.",
      image:
        "https://i.postimg.cc/2SW9vvJR/herd-wild-deer-middle-lake-surrounded-by-greenery-jpg.jpg",
      imageAlt: "Happy tourists traveling",
    },
    {
      id: 4,
      title: "Tropical Beach Paradise",
      subtitle: "Sun, Sand & Sea",
      description:
        "Unwind in breathtaking beach destinations with crystal clear water and lush green surroundings.",
      image: "https://i.postimg.cc/PJqF87Gf/lush-beach-forest-paradise-jpg.jpg",
      imageAlt: "Happy tourists traveling",
    },
    {
      id: 5,
      title: "Explore Cultural Streets",
      subtitle: "Tradition Meets Beauty",
      description:
        "Walk through historic streets and discover rich culture, heritage, and unique architecture.",
      image:
        "https://i.postimg.cc/QCnYgqhL/may-courtyard-narrow-city-china-jpg.jpg",
      imageAlt: "Happy tourists traveling",
    },
    {
      id: 6,
      title: "Relax In Green Parks",
      subtitle: "Breathe Fresh Air",
      description:
        "Spend quality time in beautiful parks surrounded by greenery and peaceful nature.",
      image: "https://i.postimg.cc/J4G2rS57/park-jpg.jpg",
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

  const from = "international-home";
  return (
    <div>
      <div>
        <HeroSlider
          slides={slides}
          checklistItems={checklistItems}
          label={label}
          from={from}
        />
      </div>
      <div>
        <TouristHomePackages packages={result} />
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

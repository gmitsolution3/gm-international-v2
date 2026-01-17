import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import TouristHomeHeader from "../tourist-home-page/components/home/header";
import { ArrowRight, Calendar } from "lucide-react";
import TouristHomePackages from "../tourist-home-page/components/home/homePackage";

const InternationalTourist = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-international-tourist-package`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (result.length === 0) {
    <div className="min-h-screen flex justify-center items-center text-red-700">
      no data fuound
    </div>;
  }

  const from = "international";
  return (
    <div>
      <div>
        <TouristHomeHeader />
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

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import TouristHomeHeader from "../tourist-home-page/components/home/header";
import { ArrowRight, Calendar } from "lucide-react";
import TouristHomePackages from "../tourist-home-page/components/home/homePackage";

const InternationalTourist = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-international-tourist-package",
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

  const from = "international"
  return (
    <div>
      <div>
        <TouristHomeHeader />
      </div>
      <div>
        <TouristHomePackages packages={result} from={from}/>
      </div>
    </div>
  );
};

export default InternationalTourist;

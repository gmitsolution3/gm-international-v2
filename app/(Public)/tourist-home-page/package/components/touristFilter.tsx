"use client";

import React, { useEffect, useState } from "react";
import TouristASide from "./aSide";
import Loader from "@/components/ui/loader";

const TouristFilter = ({ allPackage }: any) => {
  const [packages, setPackages] = useState<any[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<any[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(50000);


  useEffect(() => {
    setPackages(allPackage);
    setFilteredPackages(allPackage);
  }, []);

  // filter logic based on slider price
  useEffect(() => {
    const result = packages.filter(
      (pkg) => Number(pkg?.price) >= selectedPrice
    );
    setFilteredPackages(result);
  }, [selectedPrice, packages]);


  const highestPrice = Math.max(...packages.map((pkg) => Number(pkg.price)));
  const lowestPrice = Math.min(...packages.map((pkg) => Number(pkg.price)));

 

  if (!packages || !allPackage) {
    return <Loader />;
  }

  return (
    <div>
      {/* Sidebar */}
      <TouristASide
        onPriceChange={setSelectedPrice}
        lowestPrice={lowestPrice}
        highestPrice={highestPrice}
        packages={packages}
      />
    </div>
  );
};

export default TouristFilter;

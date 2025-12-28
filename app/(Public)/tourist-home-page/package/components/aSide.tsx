
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface TouristAsideProps {
  onPriceChange: (price: number) => void;
  highestPrice: number;
  lowestPrice: number;
  packages: any[];
}

const TouristASide = ({
  onPriceChange,
  highestPrice,
  lowestPrice,
  packages,
}: TouristAsideProps) => {
  const [price, setPrice] = useState<number[]>([50000]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handlePriceChange = (value: number[]) => {
    setPrice(value);
    onPriceChange(value[0]);
  };

  const uniqueCountries: string[] = Array.from(
    new Set(packages.map((pkg) => pkg.country))
  );

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };


  return (
    <div className="space-y-6">
      {/* SEARCH */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search here"
          className="w-full pl-10 pr-4 py-4 rounded-lg border border-gray-300 
          focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none shadow-sm"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} color="red" />
        </div>
      </div>

      {/* PRICE FILTER */}
      <div>
        <h3 className="font-semibold mb-2">Price Filter</h3>

        <Slider
          defaultValue={[50000]}
          max={highestPrice}
          step={1000}
          value={price}
          onValueChange={handlePriceChange}
        />

        <div className="flex justify-between text-sm mt-1">
          <span>{lowestPrice}</span>
          <span>{highestPrice}</span>
        </div>

        <div className="mt-3 text-center">
          <div className="inline-block bg-red-100 text-red-600 px-3 py-1 text-sm rounded-full shadow-sm">
            Selected: {price[0].toLocaleString()} ৳
          </div>
        </div>
      </div>

      {/* COUNTRY FILTER */}
      <div>
        {uniqueCountries.map((country) => {
          const count = packages.filter((p) => p.country === country).length;

          return (
            <div
              key={country}
              className="flex justify-between items-center py-1"
            >
              <div className="flex gap-3 items-center">
                <Checkbox
                  id={country}
                  checked={selectedCountries.includes(country)}
                  onCheckedChange={() => toggleCountry(country)}
                />
                <label htmlFor={country}>{country}</label>
              </div>

              <span className="text-sm text-red-400 border px-2 rounded-sm border-[#CA2328]">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TouristASide;


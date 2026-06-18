import React from "react";
import { ShowFindResult } from "../components/ShowFindResult";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Result of your search for Medical Treatment Services in China & Malaysia",
  "Get complete medical treatment support in China and Malaysia including hospital appointments, medical visa processing, travel assistance, accommodation, and recovery support.",
);

interface PageProps {
  searchParams: {
    country?: string;
    city?: string;
    department?: string;
    provience?: string;
  };
}

const SearchResult = async ({ searchParams }: PageProps) => {
  const { country, city, department, provience } = await searchParams;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-pkg/api/v1/filtered-medical-list?city=${city}&country=${country}&provience=${provience}&dept=${department}`,
  );
  const hospitalData = await res.json();

  return (
    <div>
      <ShowFindResult hospitalData={hospitalData.data} />
    </div>
  );
};

export default SearchResult;

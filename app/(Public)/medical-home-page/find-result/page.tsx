import React from "react";
import { ShowFindResult } from "../components/ShowFindResult";

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
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/filtered-medical-list?city=${city}&country=${country}&provience=${provience}&dept=${department}`,
  );

  const hospitalData = await res.json();

  return (
    <div>
      <ShowFindResult hospitalData={hospitalData.data} />
    </div>
  );
};

export default SearchResult;

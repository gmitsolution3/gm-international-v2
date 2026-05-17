


// app/medical/list/page.tsx
import React from "react";
import { getAllMedicalData, getFilterInfo } from "../components/fetches";
import ListCard from "./components/listCard";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Medical Treatment Services in China & Malaysia",
  "Get complete medical treatment support in China and Malaysia including hospital appointments, medical visa processing, travel assistance, accommodation, and recovery support.",
);

const MedicalList = async ({  
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [getAllMedicalList, filterInfo] = await Promise.all([
    getAllMedicalData(),
    getFilterInfo(),
  ]);

  return (
    <div>
      {getAllMedicalList?.length > 0 ? (
        <div>
          <ListCard
            initialHospitals={getAllMedicalList}
            totalCount={getAllMedicalList.totalCount}
            filterInfo={filterInfo}
          />
        </div>
      ) : (
        <div className="min-h-screen max-w-7xl mx-auto flex justify-center items-center text-2xl font-bold text-red-700">
          No data found in db
        </div>
      )}
    </div>
  );
};

export default MedicalList;
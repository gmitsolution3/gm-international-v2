import React from "react";
import { getAllMedicalData } from "../components/fetches";
import ListCard from "./components/listCard";

const MedicalList = async () => {
  const getAllMedicalList = await getAllMedicalData();

  return (
    <div>
      {getAllMedicalList.length > 0 ? (
        <div>
          <ListCard hospitals={getAllMedicalList} />
        </div>
      ) : (
        <div className="min-h-screen max-w-7xl mx-auto flex justify-center items-center text-2xl font-bold text-red-700">
          {" "}
          No data found in db
        </div>
      )}
    </div>
  );
};

export default MedicalList;

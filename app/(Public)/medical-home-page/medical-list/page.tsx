// import React from "react";
// import { getAllMedicalData, getFilterInfo } from "../components/fetches";
// import ListCard from "./components/listCard";

// const MedicalList = async () => {

//   const [getAllMedicalList, getFilterInfoFind] = await Promise.all([
//     getAllMedicalData(),
//     getFilterInfo(),
//   ]);

//   console.log({getFilterInfo: getFilterInfoFind})

//   return (
//     <div>
//       {getAllMedicalList.length > 0 ? (
//         <div>
//           <ListCard initialHospitals={getAllMedicalList}/>
//         </div>
//       ) : (
//         <div className="min-h-screen max-w-7xl mx-auto flex justify-center items-center text-2xl font-bold text-red-700">
//           {" "}
//           No data found in db
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicalList;


// app/medical/list/page.tsx
import React from "react";
import { getAllMedicalData, getFilterInfo } from "../components/fetches";
import ListCard from "./components/listCard";

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
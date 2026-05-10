// import React from "react";
// import { getUmrahDataBySlug } from "../umrah-packages/[id]/page";
// import UmrahHajjApplicationForm from "../components/applicationForm/umrahHajjApplicationForm";

// interface Props {
//   searchParams: Promise<{
//     pkgId?: string;
//   }>;
// }

// const UmrahHajjApplication = async ({ searchParams }: Props) => {
//   const { pkgId } = await searchParams;
//   const pkgDetails = await getUmrahDataBySlug(pkgId as string);
//   console.log(pkgDetails);

//   return <div className="min-h-screen">
//     <h1 className="text-3xl font-bold mb-6">Umrah & Hajj Application Form</h1>
//     <p className="mb-4">You are applying for the package: <strong>{pkgDetails.data.name}</strong></p>
//     <div><UmrahHajjApplicationForm pkg={pkgDetails.data} /></div>
//   </div>;
// };

// export default UmrahHajjApplication;



// app/umrah-hajj-application/page.tsx
import React from "react";
import { getUmrahDataBySlug } from "../umrah-packages/[id]/page";
import UmrahHajjApplicationForm from "../components/applicationForm/umrahHajjApplicationForm";


interface Props {
  searchParams: Promise<{
    pkgId?: string;
  }>;
}

const UmrahHajjApplication = async ({ searchParams }: Props) => {
  const { pkgId } = await searchParams;
  const pkgDetails = await getUmrahDataBySlug(pkgId as string);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Umrah & Hajj Application Form
        </h1>
        <p className="text-gray-600 mb-8">
          You are applying for:{" "}
          <strong className="text-red-600">{pkgDetails.data.title}</strong>
        </p>
        <UmrahHajjApplicationForm pkg={pkgDetails.data} />
      </div>
    </div>
  );
};

export default UmrahHajjApplication;
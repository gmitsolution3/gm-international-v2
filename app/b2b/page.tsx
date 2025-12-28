import React from "react";
import { B2bSide } from "./components/b2b";

const B2BPartner = () => {
  return (
    <div className="min-h-[50vh]">
      <div
        className="min-h-[30vh] text-white "
        style={{
          background: "linear-gradient(360deg, #CA2328 70%, #301314 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-6">
          <div className="border-5 border-red-400 max-w-[10vh] rounded-xl"></div>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold py-3">
            Become A Proud B2B Partner
          </h1>
          <p className="text-green-200 py-5">
            Home &gt;&gt; Become B2B Partner
          </p>
        </div>
      </div>
      <div className="text-center flex flex-col items-center my-10">
        <h3 className="text-xl text-red-700 font-bold">Partner</h3>
        <h1 className="text-2xl font-bold mb-4">Become A B2B Partner</h1>
        <div className="max-w-[10vh] w-full border-2 border-red-400 rounded-xl"></div>
      </div>
      <div>
        <B2bSide />
      </div>
    </div>
  );
};

export default B2BPartner;

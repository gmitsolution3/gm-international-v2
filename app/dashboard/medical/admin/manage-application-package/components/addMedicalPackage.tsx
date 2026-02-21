"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import ManagePackageForm from "./packageForm";
import HospitalForm from "./addMedical";
import { useSession } from "next-auth/react";
import MedicalForm from "./MedicalForm";

interface Value {
  value: string
}

export const AddMedicalPackage = ({value}:Value) => {

  const { data: session } = useSession();

  const email = session?.user?.email


 

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {value === "medicalPackage" && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 rounded-2xl border-2 border-red-500 flex gap-2 items-center hover:bg-red-500 hover:text-white transition hover:cursor-pointer"
        >
          Add Package <Plus className="text-current" />
        </button>
      )}
      {value === "medicalList" && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 rounded-2xl border-2 border-red-500 flex gap-2 items-center hover:bg-red-500 hover:text-white transition hover:cursor-pointer"
        >
          Add Medical <Plus className="text-current" />
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black/20 backdrop-blur-md p-4">
          <div className="max-h-[80vh] bg-white shadow-xl mg:p-4 lg:p-8 w-full md:max-w-5xl text-center relative flex flex-col items-center overflow-auto rounded-2xl">
            <div className="w-full text-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Close
              </button>
            </div>

            <div className="w-full">
              {value === "medicalPackage" && (
                <ManagePackageForm
                  onClose={() => setIsOpen(false)}
                  email={email}
                />
              )}
              {value === "medicalList" && (
                <div>
                  {/* <HospitalForm
                    onClose={() => setIsOpen(false)}
                    email={email}
                  /> */}
                  <MedicalForm onClose={() => setIsOpen(false)} email={email}/>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

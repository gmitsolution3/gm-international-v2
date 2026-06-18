"use client";

import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import HospitalForm from "./addMedical";
import { useSession } from "next-auth/react";
import MedicalForm from "./MedicalForm";

interface Value {
  value: string;
}

export const AddMedicalPackage = ({ value }: Value) => {
  const { data: session } = useSession();

  const email = session?.user?.email;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {value === "medicalList" && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transform hover:-translate-y-0.5"
        >
          Add Package <Plus className="text-current" />
        </button>
      )}
      {/* {value === "medicalPackage" && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 rounded-2xl border-2 border-red-500 flex gap-2 items-center hover:bg-red-500 hover:text-white transition hover:cursor-pointer"
        >
          Add Medical <Plus className="text-current" />
        </button>
      )} */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black/20 backdrop-blur-md p-4">
          <div className="max-h-[80vh] bg-white shadow-xl mg:p-4 lg:p-8 w-full md:max-w-5xl text-center relative flex flex-col items-center overflow-auto rounded-2xl">
            <div className="w-full flex justify-end text-end">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full">
              {value === "medicalList" && (
                <div>
                  <MedicalForm onClose={() => setIsOpen(false)} email={email} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

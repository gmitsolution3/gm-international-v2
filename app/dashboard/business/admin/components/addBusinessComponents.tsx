"use client";

import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import CompanyForm from "./addCompany";
import MakePackage from "./makePackage";

interface Value {
  value: string;
}

export const AddBusinessComponents = ({ value }: Value) => {
  const { data: session } = useSession();

  const email = session?.user?.email;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {value === "businessPackage" && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 rounded-2xl border-2 border-red-500 flex gap-2 items-center hover:bg-red-500 hover:text-white transition hover:cursor-pointer"
        >
          Add Package <Plus className="text-current" />
        </button>
      )}

      {value === "companyList" && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 rounded-2xl border-2 border-red-500 flex gap-2 items-center hover:bg-red-500 hover:text-white transition hover:cursor-pointer"
        >
          Add Company <Plus className="text-current" />
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black/20 backdrop-blur-md p-4">
          <div className="max-h-[80vh] bg-white shadow-xl mg:p-4 lg:p-8 w-full md:max-w-5xl text-center relative flex flex-col items-center overflow-auto rounded-2xl">
            <div className="w-full text-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-2 py-2 hover:bg-red-500 text-black hover:text-white rounded-full hover:cursor-pointer"
              >
                <X />
              </button>
            </div>

            <div className="w-full">
              {value === "companyList" && (
                <div>
                  <CompanyForm onClose={() => setIsOpen(false)} email={email} />
                </div>
              )}
              {value === "businessPackage" && (
                <div>
                  <MakePackage closeModal={() => setIsOpen(false)} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

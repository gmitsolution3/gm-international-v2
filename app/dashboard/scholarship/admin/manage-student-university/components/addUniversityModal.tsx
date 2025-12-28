"use client";

import React from "react";
import AddUniversityForm from "./addUniversityForm";
import { X } from "lucide-react";

interface UniversityPackageModal {
  isOpen: boolean;
  onClose: () => void;
}

const AddUniversityModal: React.FC<UniversityPackageModal> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black/20 backdrop-blur-md p-4">
      <div className="max-h-[80vh] bg-white shadow-xl p-8 w-full max-w-5xl text-center relative flex flex-col items-center overflow-auto rounded-2xl">
        <div className="w-full text-end">
          <button
            onClick={onClose}
            className="p-2 bg-red-700 text-white hover:bg-red-800 rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="w-full">
          <AddUniversityForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AddUniversityModal;

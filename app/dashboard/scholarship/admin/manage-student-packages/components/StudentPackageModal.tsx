import React from "react";
import { X } from "lucide-react";
import { EducationMasterFormData } from "../../add-university/components/EducationMasterForm";
import AddPackagePage from "./addPackage";

interface StudentPackageModal {
  isOpen: boolean;
  onClose: () => void;
  universityData: EducationMasterFormData[];
}

const StudentPackageModal: React.FC<StudentPackageModal> = ({
  isOpen,
  onClose,
  universityData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black/20 backdrop-blur-md p-4">
      <div className="max-h-[80vh] bg-white shadow-xl p-6 w-full max-w-5xl text-center relative flex flex-col items-center overflow-auto rounded-2xl">
        <div className="w-full text-end sticky top-0 bg-red-700 px-4 py-2 rounded-2xl z-50">
          <button
            onClick={onClose}
            className="p-2 bg-red-700 text-white hover:text-black hover:bg-white rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="w-full">
          <AddPackagePage />
        </div>
      </div>
    </div>
  );
};

export default StudentPackageModal;

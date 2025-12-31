"use client";

import React, { useState } from "react";
import StudentPackageModal from "./StudentPackageModal";
import { EducationMasterFormData } from "../../add-university/components/EducationMasterForm";

export interface UniversityProps{
  universityData:EducationMasterFormData[]
}



const AddScholarshipPackage = ({universityData}:UniversityProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center px-4 py-2 hover:bg-red-600 rounded-lg font-medium whitespace-nowrap hover:cursor-pointer w-full sm:w-auto bg-white text-foreground border-2 border-red-500 hover:text-white transition-all duration-300"
      >
        <span className="mr-2">+</span>
        Create Package
      </button>
      

      {/* Modal */}
      <StudentPackageModal isOpen={isOpen} onClose={() => setIsOpen(false)} universityData={universityData}/>
    </div>
  );
};

export default AddScholarshipPackage;

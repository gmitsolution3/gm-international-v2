"use client";

import React, { useState } from "react";
import StudentPackageModal from "./StudentPackageModal";

const AddScholarshipPackage = () => {
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
      <StudentPackageModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default AddScholarshipPackage;

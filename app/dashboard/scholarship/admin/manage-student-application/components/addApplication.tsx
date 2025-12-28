"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddApplicationModal from "./addApplicationModal";

const AddApplication = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
      onClick={()=>setIsOpen(true)}
        className="px-6 py-2 rounded-2xl border-2 border-red-500 flex gap-2 items-center hover:bg-red-500 hover:text-white transition hover:cursor-pointer">
        <span className="mr-2">+</span>
        Add Application
      </button>

      {/* Modal */}
      <AddApplicationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default AddApplication;

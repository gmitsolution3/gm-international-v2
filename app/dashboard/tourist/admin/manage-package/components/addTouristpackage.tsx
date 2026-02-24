"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddTouristPackageModal from "./addTouristPackageModal";
import Link from "next/link";

export const AddTouristPackage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Link href={"/dashboard/tourist/admin/add-package"}>
        <button
          // onClick={() => setIsOpen(true)}
          className="px-6 py-2 rounded-2xl border-2 border-red-500 flex gap-2 items-center hover:bg-red-500 hover:text-white transition hover:cursor-pointer"
        >
          Add Package <Plus className="text-current" />
        </button>
      </Link>

      {/* Modal */}
      {/* <AddTouristPackageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      /> */}
    </div>
  );
};

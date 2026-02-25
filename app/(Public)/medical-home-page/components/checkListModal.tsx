"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checklistItems: string[];
  label: string
}

export const CheckListModal = ({
  isOpen,
  setIsOpen,
  checklistItems,
  label,
}: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-2xl font-bold text-red-600">
              {label}
            </DialogTitle>

            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] text-white py-3 rounded-lg font-medium hover:scale-105 transition mt-6"
          >
            Got it, Thanks!
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

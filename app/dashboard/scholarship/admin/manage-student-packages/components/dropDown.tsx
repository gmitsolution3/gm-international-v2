"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Option {
  id: number;
  name: string;
}

const options: Option[] = [
  { id: 0, name: "All" },
  { id: 1, name: "Health & Medicine" },
  { id: 2, name: "Business" },
  { id: 3, name: "Engineering" },
  { id: 4, name: "Language & Culture" },
  { id: 5, name: "Computing & IT" },
  { id: 6, name: "Teaching & Education" },
];

const DropDown: React.FC = () => {
  const [selected, setSelected] = useState<Option | null>(options[0]);
  // absolute inset-y-0 right-0 flex items-center pr-3
  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          {/* Input field (readOnly so user can't type) */}
          <ComboboxButton className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:ring-red-500 cursor-pointer flex justify-around">
            <ComboboxInput
              className="cursor-pointer bg-white focus:outline-none focus:ring-0 focus:border-0 "
              displayValue={(opt: Option | null) => opt?.name ?? ""}
              readOnly
            />
            <ChevronDown className="h-4 w-4 text-gray-500" />

            {/* Dropdown toggle button */}
          </ComboboxButton>

          {/* Dropdown options */}
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none z-10">
            {options.map((opt) => (
              <ComboboxOption
                key={opt.id}
                value={opt}
                className={({ active }) =>
                  `cursor-pointer select-none px-3 py-2 text-sm ${
                    active
                      ? "bg-red-50 text-red-500 border border-red-500"
                      : "text-gray-700"
                  }`
                }
              >
                {opt.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default DropDown;

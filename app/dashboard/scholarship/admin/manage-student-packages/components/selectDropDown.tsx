"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { BadgePlus, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface SelectDropdownProps<T> {
  label: string;
  options: T[];
  selected: T | null;
  onChange: ((value: T | null) => void) | undefined;
  displayKey?: keyof T; // Optional, for object arrays like countries
}

const SelectDropdown = <T extends string | object>({
  label,
  options,
  selected,
  onChange,
  displayKey,
}: SelectDropdownProps<T>) => {
  // Handle display value for object or string
  const getDisplayValue = (item: T | null): string => {
    if (!item) return "select";
    if (typeof item === "string") return item;
    if (displayKey && typeof item === "object") return String(item[displayKey]);
    return "";
  };

  const [addItems, setAddItems] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    alert(`New item added: ${newItem}`);
    setNewItem("");
    setAddItems(false);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Combobox value={selected} onChange={onChange}>
        <div className="relative">
          {/* Input field (readOnly so user can't type) */}
          <ComboboxButton className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:ring-red-500 cursor-pointer flex justify-around">
            <ComboboxInput
              className="cursor-pointer bg-white focus:outline-none focus:ring-0 focus:border-0 "
              displayValue={(opt: T | null) => getDisplayValue(opt)}
              readOnly
            />
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </ComboboxButton>

          {/* Dropdown options */}
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none z-10">
            {options.map((opt,idx) => (
              <ComboboxOption
                key={`${getDisplayValue(opt)}-${idx}`}
                value={opt}
                className={({ active }) =>
                  `cursor-pointer select-none px-3 py-2 text-sm ${
                    active
                      ? "bg-red-50 text-red-500 border border-red-500"
                      : "text-gray-700"
                  }`
                }
              >
                {getDisplayValue(opt)}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default SelectDropdown;

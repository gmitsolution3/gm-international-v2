import { Trash2 } from "lucide-react";
import React from "react";

export const DashboardErrorHandler = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Trash2 className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800">
        No Appointments Found
      </h2>
      <p className="text-gray-600 mt-2">
        There are currently no medical appointment applications to display.
      </p>
    </div>
  );
};

"use client"

import React from "react";
import DealForm from "./DealForm";
import { ServiceConfig } from "../types/form.types";

interface DynamicFormProps {
  serviceConfig: ServiceConfig;
}
// onSubmit = { handleFormSubmit };
const DealController: React.FC<DynamicFormProps> = ({ serviceConfig }) => {
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <DealForm serviceConfig={serviceConfig} />
    </div>
  );
};

export default DealController;

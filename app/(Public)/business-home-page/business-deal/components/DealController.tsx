"use client"

import React from "react";
import DealForm from "./DealForm";
import { ServiceConfig } from "../types/form.types";

interface DynamicFormProps {
  serviceConfig: ServiceConfig;
  service: string;
  userEmail: string |null | undefined;
}
// onSubmit = { handleFormSubmit };
const DealController: React.FC<DynamicFormProps> = ({
  serviceConfig,
  service,
  userEmail,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <DealForm
        serviceConfig={serviceConfig}
        service={service}
        userEmail={userEmail}
      />
    </div>
  );
};

export default DealController;

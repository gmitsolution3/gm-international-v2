import React from "react";
import { useFormContext } from "react-hook-form";

export const ContainAllData = () => {
  const { watch } = useFormContext();

  const allData = watch();


  return <div>ContainAllData</div>;
};

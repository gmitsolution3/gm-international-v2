
import React, { Suspense } from "react";
import { TouristUserForm } from "./components/touristUserForm";
import Loader from "@/components/ui/loader";

const BookingForm = () => {
  return (
    <div>
      <Suspense fallback={<div><Loader/></div>}>
        <TouristUserForm />
      </Suspense>
    </div>
  );
};

export default BookingForm;

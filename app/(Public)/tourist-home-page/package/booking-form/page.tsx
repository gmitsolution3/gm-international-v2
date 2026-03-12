import React, { Suspense } from "react";
import { TouristUserForm } from "./components/touristUserForm";
import Loader from "@/components/ui/loader";

interface ParamsProps {
  searchParams: { id: string; b2bId: string; form: string };
}

const BookingForm = async ({ searchParams }: ParamsProps) => {
  const { id, b2bId, form } = await searchParams;

  const source = { b2bId, form };



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/details/${id}`,
    {
      next: { revalidate: 300 },
    },
  );

  const result = await res.json();

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <TouristUserForm touristPackage={result} source={source} />
      </Suspense>
    </div>
  );
};

export default BookingForm;

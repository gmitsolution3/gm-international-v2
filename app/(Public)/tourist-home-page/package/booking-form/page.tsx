import React, { Suspense } from "react";
import { TouristUserForm } from "./components/touristUserForm";
import Loader from "@/components/ui/loader";

interface Params {
  id: string;
  source: string;
}

interface ParamsProps {
  searchParams: Params;
}

const BookingForm = async ({ searchParams }: ParamsProps) => {
  const params = await searchParams;

  const id = params.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/details/${id}`,
    {
      next: { revalidate: 300 },
    }
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
        <TouristUserForm touristPackage={result} />
      </Suspense>
    </div>
  );
};

export default BookingForm;

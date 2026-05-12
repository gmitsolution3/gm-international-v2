// app/admin/umrah-hajj-applications/[id]/page.tsx
import React from "react";
import ViewUmrahBooked from "../components/ViewUmrahBooked";

interface ViewUmrahBookedDataProps {
  params: {
    id: string;
  };
}

const getUmrahBookedData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/umrah-booked-data/${id}`,
      {
        cache: "no-store",
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch booked data:", error);
    return {
      success: false,
      message: "Failed to fetch data",
      data: null
    };
  }
};

const ViewUmrahBookedData = async ({ params }: ViewUmrahBookedDataProps) => {
  const { id } = await params;
  const umrahBookedData = await getUmrahBookedData(id);

  return (
    <div>
      <ViewUmrahBooked bookedData={umrahBookedData} />
    </div>
  );
};

export default ViewUmrahBookedData;
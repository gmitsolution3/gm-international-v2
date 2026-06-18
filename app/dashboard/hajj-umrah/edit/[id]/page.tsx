// app/admin/umrah-hajj-applications/[id]/page.tsx
import React from "react";
import EditUmrahHajjBookedApplication from "../components/EditUmrahHajjBookedApplication";

interface ViewUmrahBookedDataProps {
  params: {
    id: string;
  };
}

const getUmrahBookedData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/umrah-application/api/v1/find-single-application/${id}`,
      {
        cache: "no-store",
      },
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
      <EditUmrahHajjBookedApplication data={umrahBookedData} />
    </div>
  );
};

export default ViewUmrahBookedData;
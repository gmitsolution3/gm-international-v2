"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getUserBusinessDeal } from "../../../components/fetches";
import DealTable from "../../../admin/business-deal/components/dealTable";
import Loader from "@/components/ui/loader";

export const BusinessDeal = () => {
  const { data: session } = useSession();
  const [initialData, setInitialData] = useState([]);
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    const businessDeal = async () => {
      try {
        const data = await getUserBusinessDeal(email);
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching business deal:", error);
      }
    };

    businessDeal();
  }, [session]);

  if (initialData.length === 0) {
    return (
      <div>
        <div className="flex justify-center items-center h-64">
          <h1>No business deals found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <DealTable initialData={initialData} /> */}
      No data found right now
    </div>
  );
};

import React from "react";
import { getB2BTouristPackage } from "../components/fetches";
import TouristHomePackages from "@/app/(Public)/tourist-home-page/components/home/homePackage";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

const B2BTouristPackage = async () => {
  const session = await getServerSession(authConfig);
  const userId = (session?.user as any)?.id;
  const data = await getB2BTouristPackage(userId);
  const source = { b2bId: userId, form: "b2b" };

  return (
    <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
      {data.data.packageIds.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <TouristHomePackages
            packages={data.data.packageIds}
            source={source}
          />
        </div>
      ) : (
        <div>No data found in db</div>
      )}
    </div>
  );
};

export default B2BTouristPackage;

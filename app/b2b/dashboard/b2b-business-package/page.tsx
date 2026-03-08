import ShowHomePackage from "@/app/(Public)/business-home-page/components/showHomePackage";
import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import React from "react";

const B2BBusinessPackage = async () => {
  const session = await getServerSession(authConfig);

  const id = (session?.user as any).id;

 

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b/get-b2b-business-package/${id}`,
    { cache: "no-cache" },
  );

  const result = await res.json();

 
  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Canton Fair Packages
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Choice your package
        </p>
      </div>
      <div>
        <ShowHomePackage packages={result.data} from={"b2b"} id={id}/>
      </div>
    </div>
  );
};

export default B2BBusinessPackage;

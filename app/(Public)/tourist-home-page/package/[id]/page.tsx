import React from "react";
import { MapPin, Plane, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import PackageDetails from "./components/packagesDetails";

interface Params {
  params: Promise<{ id: string }>;
  searchParams: { from?: string };
}

export default async function TouristPackageDetails({
  params,
  searchParams,
}: Params) {
  const { id } = await params;
  const sParams = await searchParams;
  const source = sParams.from;

  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/tourist-package/details/${id}`,
    { next: { revalidate: 300 } }
  );

  const resOfResult = await res.json();

  return <PackageDetails packageData={resOfResult} source={source} />;
}

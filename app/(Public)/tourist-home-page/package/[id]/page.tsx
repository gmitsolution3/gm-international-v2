import React from "react";
import { MapPin, Plane, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import PackageDetails from "./components/packagesDetails";

interface Params {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ b2bId?: string; form?: string }>;
}

export default async function TouristPackageDetails({ params, searchParams }: Params) {
  const { id } = await params;
  const { form, b2bId } = await searchParams;
  const source = { form, b2bId };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/api/v1/get/single-package/${id}`,
    { next: { revalidate: 300 } },
  );

  const resOfResult = await res.json();


  return <PackageDetails packageData={resOfResult.data} source={source} />;
}

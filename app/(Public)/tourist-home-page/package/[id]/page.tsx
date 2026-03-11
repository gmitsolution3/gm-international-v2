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

  console.log({ source: source });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/details/${id}`,
    { next: { revalidate: 300 } },
  );

  const resOfResult = await res.json();

  return <PackageDetails packageData={resOfResult} source={source} />;
}

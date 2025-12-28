"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/ui/loader";

const MapComponent = dynamic(() => import("../myMap/myMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "700px" }}
      className="w-full bg-gray-100 animate-pulse flex items-center justify-center"
    >
      <Loader />
    </div>
  ),
});

export default function MapWrapper() {
  return <MapComponent />;
}

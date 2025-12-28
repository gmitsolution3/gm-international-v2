"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const branches = [
  { id: 1, name: "Dhaka Branch (Mirpur 11)", position: [23.815778, 90.365278] },
  { id: 1, name: "Dhaka Branch (Dhanmondi)", position: [23.75322872990579, 90.37736195582238] },
  { id: 2, name: "Bogura Branch", position: [24.8445, 89.375278] },
  { id: 3, name: "Sylhet Branch", position: [24.919082662146202, 91.87435028273175] },
  { id: 4, name: "Chattogram Branch", position: [22.335631, 91.826227] },
  { id: 6, name: "China Branch", position: [23.19998348110424, 113.29902196708882] },
];

function ZoomHandler({ activePos }: { activePos: [number, number] | null }) {
  const map = useMap();
  if (activePos) {
    map.flyTo(activePos, 14, { duration: 1.5 }); // Zoom in effect
  }
  return null;
}

export default function MyMap() {
  const [activeBranch, setActiveBranch] = useState<[number, number] | null>(
    null
  );

  return (
    <div className="h-150 w-full z-10 px-5 rounded-2xl">
      <MapContainer
        center={[23.685, 90.3563] as any}
        zoom={7}
        // scrollWheelZoom={true}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {branches.map((branch) => (
          <Marker
            key={branch.id}
            position={branch.position as any}
            icon={markerIcon}
            eventHandlers={{
              click: () => setActiveBranch(branch.position as [number, number]),
            }}
          >
            <Popup>{branch.name}</Popup>
          </Marker>
        ))}

        <ZoomHandler activePos={activeBranch} />
      </MapContainer>
    </div>
  );
}

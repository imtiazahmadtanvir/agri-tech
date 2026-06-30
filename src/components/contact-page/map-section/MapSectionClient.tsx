"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

// Define the position (Dhaka, Bangladesh)
const position: [number, number] = [23.8041, 90.4152];

// Custom marker icon using FaMapMarkerAlt and Tailwind inline styles
const customIcon = L.divIcon({
  html: renderToString(
    <FaMapMarkerAlt className="drop-shadow-md text-red-600 text-3xl" />
  ),
  className: "",
  iconSize: [30, 30], // Adjust size as needed
  iconAnchor: [15, 30], // Centers the icon correctly
});

const MapSectionClient = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      className="rounded-lg w-full h-96"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon}>
        <Popup>📍 Our Farm Location - Dhaka, Bangladesh</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapSectionClient;

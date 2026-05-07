"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

interface MapProps {
  position: any;
  center: any;
  onClick: (latlng: any) => void; // New prop to handle map click
}

const UpdateMapCenter = ({ center }: { center: any }) => {
  const map = useMap();
  useEffect(() => {
    map?.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapClickHandler = ({ onClick }: { onClick: (latlng: any) => void }) => {
  useMapEvent("click", (e) => {
    onClick(e.latlng);
  });
  return null;
};

export default function LeafletMap({ position, center, onClick }: MapProps) {
  const customIcon = new L.Icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  return (
    <>
      <MapContainer
        className="w-full h-[300px]"
        center={center}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <span className="font-peyda-700 text-base text-black">
              مختصات انتخاب شده
            </span>
          </Popup>
        </Marker>
        <UpdateMapCenter center={center} />
        <MapClickHandler onClick={onClick} />
      </MapContainer>
    </>
  );
}

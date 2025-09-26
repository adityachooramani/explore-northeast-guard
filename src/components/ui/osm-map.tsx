import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];

export interface OSMMarker {
  id: string;
  position: LatLng;
  label?: string;
  details?: string;
  radiusMeters?: number;
}

export interface OSMMapProps {
  center: LatLng;
  zoom?: number;
  className?: string;
  markers?: OSMMarker[];
}

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon as any;

export function OSMMap({ center, zoom = 6, className, markers = [] }: OSMMapProps) {
  useEffect(() => {
    // Ensure Leaflet CSS is present (Vite/SPA). No-op if already loaded.
    const id = "leaflet-css";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={m.position}>
            <Popup>
              <div>
                {m.label && <div style={{ fontWeight: 600 }}>{m.label}</div>}
                {m.details && <div style={{ opacity: 0.8 }}>{m.details}</div>}
              </div>
            </Popup>
          </Marker>
        ))}

        {markers
          .filter((m) => !!m.radiusMeters)
          .map((m) => (
            <Circle
              key={`${m.id}-radius`}
              center={m.position}
              radius={m.radiusMeters as number}
              pathOptions={{ color: "#e53935", opacity: 0.6 }}
            />
          ))}
      </MapContainer>
    </div>
  );
}

export default OSMMap;



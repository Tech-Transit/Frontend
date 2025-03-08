import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    const [waypoints, setWaypoints] = useState([
        [51.505, -0.09], // Default starting location (London)
    ]);

    const handleMapClick = (e) => {
        const newWaypoint = [e.latlng.lat, e.latlng.lng];
        setWaypoints([...waypoints, newWaypoint]);
    };

    return (
        <div className="h-screen w-full">
            <MapContainer center={[51.505, -0.09]} zoom={5} className="h-full w-full" onClick={handleMapClick}>
                {/* Map Tiles */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Markers for Waypoints */}
                {waypoints.map((position, index) => (
                    <Marker key={index} position={position}>
                        <Popup>Waypoint {index + 1}</Popup>
                    </Marker>
                ))}

                {/* Route Line */}
                {waypoints.length > 1 && (
                    <Polyline positions={waypoints} color="blue" />
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;

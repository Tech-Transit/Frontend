import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    const [waypoints, setWaypoints] = useState([
        [19.0760, 72.8777], // Default starting location (Mumbai)
    ]);

    // Handle map clicks to add waypoints
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const newWaypoint = [e.latlng.lat, e.latlng.lng];
                setWaypoints([...waypoints, newWaypoint]);
            },
        });
        return null;
    };

    return (
        <div className="h-screen w-full">
            <MapContainer center={[19.0760, 72.8777]} zoom={5} className="h-full w-full">
                
                {/* Google Maps Tile Layer in English */}
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                />

                {/* Handle Clicks to Add Waypoints */}
                <MapClickHandler />

                {/* Markers for Waypoints */}
                {waypoints.map((position, index) => (
                    <Marker key={index} position={position} draggable={true}>
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

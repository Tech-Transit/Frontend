import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icons for different types of locations
const icons = {
    Seaport: new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075933.png",
        iconSize: [30, 30],
    }),
    Default: new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30],
    }),
};

const MapComponent = () => {
    const [waypoints, setWaypoints] = useState([]);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        fetch("/routes.csv") // Ensure routes.csv is in the public folder
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const locations = result.data
                            .map((row) => ({
                                name: row["Facility Name"] || "Unknown",
                                lat: parseFloat(row.Latitude),
                                lng: parseFloat(row.Longitude),
                                type: row.Type || "Default",
                            }))
                            .filter((loc) => loc.type === "Seaport"); // Only Seaports

                        console.log("Seaports Found:", locations.length, locations); // Debugging

                        setWaypoints(locations);
                        setRoutes(locations.map((loc) => [loc.lat, loc.lng])); // Extract coordinates
                    },
                });
            })
            .catch((error) => console.error("Error loading CSV:", error));
    }, []);

    return (
        <div className="h-screen w-full">
            <MapContainer center={[20.0, 80.0]} zoom={4} className="h-full w-full">
                
                {/* Google Maps Tile Layer */}
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                />

                {/* Plot Seaports */}
                {waypoints.map((loc, index) => (
                    <Marker
                        key={index}
                        position={[loc.lat, loc.lng]}
                        icon={icons.Seaport}
                    >
                        <Popup>
                            <strong>{loc.name}</strong> <br />
                            Type: {loc.type}
                        </Popup>
                    </Marker>
                ))}

                {/* Draw Route Between Seaports */}
                {routes.length > 1 && <Polyline positions={routes} color="blue" weight={4} />}
            </MapContainer>
        </div>
    );
};

export default MapComponent;

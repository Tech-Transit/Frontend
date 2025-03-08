import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Single Blue Location Marker Icon
const blueMarkerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Blue marker icon
    iconSize: [30, 30],
});

const MapComponent = () => {
    const [waypoints, setWaypoints] = useState([]);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        // Fetch and parse the CSV file
        fetch("public/portData.csv") // Ensure the CSV file is in the public folder
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const validLocations = result.data
                            .map((row) => {
                                const lat = parseFloat(row.Latitude);
                                const lng = parseFloat(row.Longitude);

                                // Validate latitude & longitude
                                if (!isNaN(lat) && !isNaN(lng)) {
                                    return { lat, lng };
                                } else {
                                    console.warn("Skipping invalid location:", row);
                                    return null;
                                }
                            })
                            .filter((loc) => loc !== null); // Remove null values

                        setWaypoints(validLocations);
                        setRoutes(validLocations.map((loc) => [loc.lat, loc.lng]));
                    },
                    error: (err) => console.error("CSV Parsing Error:", err),
                });
            })
            .catch((err) => console.error("CSV Fetch Error:", err));
    }, []);

    return (
        <div className="h-screen w-full">
            <MapContainer center={[20.0, 80.0]} zoom={4} className="h-full w-full">
                
                {/* Google Maps Tile Layer */}
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                />

                {/* Plot Waypoints with a Single Blue Marker */}
                {waypoints.map((loc, index) => (
                    <Marker
                        key={index}
                        position={[loc.lat, loc.lng]}
                        icon={blueMarkerIcon} // Uses the single blue icon
                    >
                        <Popup>
                            <strong>Location {index + 1}</strong>
                        </Popup>
                    </Marker>
                ))}

                {/* Draw Route (if multiple points exist) */}
                {routes.length > 1 && <Polyline positions={routes} color="blue" weight={4} />}
            </MapContainer>
        </div>
    );
};

export default MapComponent;

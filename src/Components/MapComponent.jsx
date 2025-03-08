// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import { useState, useEffect } from "react";
// import Papa from "papaparse";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Single Blue Location Marker Icon
// const blueMarkerIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Blue marker icon
//     iconSize: [30, 30],
// });

// const MapComponent = () => {
//     const [waypoints, setWaypoints] = useState([]);
//     const [routes, setRoutes] = useState([]);

//     useEffect(() => {
//         // Fetch and parse the CSV file
//         fetch("public/portData.csv") // Ensure the CSV file is in the public folder
//             .then((response) => response.text())
//             .then((csvText) => {
//                 Papa.parse(csvText, {
//                     header: true,
//                     skipEmptyLines: true,
//                     complete: (result) => {
//                         const validLocations = result.data
//                             .map((row) => {
//                                 const lat = parseFloat(row.Latitude);
//                                 const lng = parseFloat(row.Longitude);

//                                 // Validate latitude & longitude
//                                 if (!isNaN(lat) && !isNaN(lng)) {
//                                     return { lat, lng };
//                                 } else {
//                                     console.warn("Skipping invalid location:", row);
//                                     return null;
//                                 }
//                             })
//                             .filter((loc) => loc !== null); // Remove null values

//                         setWaypoints(validLocations);
//                         setRoutes(validLocations.map((loc) => [loc.lat, loc.lng]));
//                     },
//                     error: (err) => console.error("CSV Parsing Error:", err),
//                 });
//             })
//             .catch((err) => console.error("CSV Fetch Error:", err));
//     }, []);

//     return (
//         <div className="h-screen w-full">
//             <MapContainer center={[20.0, 80.0]} zoom={4} className="h-full w-full">

//                 {/* Google Maps Tile Layer */}
//                 <TileLayer
//                     url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en"
//                     attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
//                 />

//                 {/* Plot Waypoints with a Single Blue Marker */}
//                 {waypoints.map((loc, index) => (
//                     <Marker
//                         key={index}
//                         position={[loc.lat, loc.lng]}
//                         icon={blueMarkerIcon} // Uses the single blue icon
//                     >
//                         <Popup>
//                             <strong>Location {index + 1}</strong>
//                         </Popup>
//                     </Marker>
//                 ))}

//                 {/* Draw Route (if multiple points exist) */}
//                 {routes.length > 1 && <Polyline positions={routes} color="blue" weight={4} />}
//             </MapContainer>
//         </div>
//     );
// };

// export default MapComponent;




import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
const MapComponent = () => {
    const [source, setSource] = useState("");  // Source port
    const [destination, setDestination] = useState("");  // Destination port
    const [mode, setMode] = useState("sea");  // Transport mode (default: sea)
    const [routeCoords, setRouteCoords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Function to fetch route from backend
    const fetchRouteFromBackend = async () => {
        setLoading(true);
        try {
            // console.log("API called with:", { source, target, mode });

            const response = await axios.post("http://127.0.0.1:5000/api/calculate_routes", {
                source,
                target: destination,  // Backend expects "target"
                preferred_mode: mode
            });

            if (response.data && response.data.route) {
                setRouteCoords(response.data.route);  // Expecting an array of { lat, lng }
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error("Error fetching route from backend:", err);
            setError("Failed to load route");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ height: "90vh", width: "100%" }}>
            {loading ? <p>Loading map...</p> : error ? <p>{error}</p> : (
                <MapContainer center={[19.0760, 72.8777]} zoom={6} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" />

                    {/* Start Marker */}
                    {routeCoords.length > 0 && (
                        <Marker position={routeCoords[0]} icon={new L.Icon({
                            iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075933.png",
                            iconSize: [30, 30],
                        })} />
                    )}

                    {/* Route Polyline */}
                    {routeCoords.length > 1 && (
                        <>
                            <Polyline positions={routeCoords} color="blue" weight={4} />

                            {/* End Marker */}
                            <Marker position={routeCoords[routeCoords.length - 1]} icon={new L.Icon({
                                iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075933.png",
                                iconSize: [30, 30],
                            })} />
                        </>
                    )}
                </MapContainer>
            )}
        </div>
    );
};

export default MapComponent;


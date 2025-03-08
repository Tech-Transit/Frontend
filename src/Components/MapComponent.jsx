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




// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import axios from "axios";
// import L from "leaflet";
// const MapComponent = () => {
//     const [source, setSource] = useState("");  // Source port
//     const [destination, setDestination] = useState("");  // Destination port
//     const [mode, setMode] = useState("sea");  // Transport mode (default: sea)
//     const [routeCoords, setRouteCoords] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     // Function to fetch route from backend
//     const fetchRouteFromBackend = async () => {
//         setLoading(true);
//         try {
//             // console.log("API called with:", { source, target, mode });

//             const response = await axios.post("http://127.0.0.1:5000/api/calculate_routes", {
//                 source,
//                 target: destination,  // Backend expects "target"
//                 preferred_mode: mode
//             });

//             if (response.data && response.data.route) {
//                 setRouteCoords(response.data.route);  // Expecting an array of { lat, lng }
//             } else {
//                 throw new Error("Invalid response format");
//             }
//         } catch (err) {
//             console.error("Error fetching route from backend:", err);
//             setError("Failed to load route");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <div style={{ height: "90vh", width: "100%" }}>
//             {loading ? <p>Loading map...</p> : error ? <p>{error}</p> : (
//                 <MapContainer center={[19.0760, 72.8777]} zoom={6} style={{ height: "100%", width: "100%" }}>
//                     <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" />

//                     {/* Start Marker */}
//                     {routeCoords.length > 0 && (
//                         <Marker position={routeCoords[0]} icon={new L.Icon({
//                             iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075933.png",
//                             iconSize: [30, 30],
//                         })} />
//                     )}

//                     {/* Route Polyline */}
//                     {routeCoords.length > 1 && (
//                         <>
//                             <Polyline positions={routeCoords} color="blue" weight={4} />

//                             {/* End Marker */}
//                             <Marker position={routeCoords[routeCoords.length - 1]} icon={new L.Icon({
//                                 iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075933.png",
//                                 iconSize: [30, 30],
//                             })} />
//                         </>
//                     )}
//                 </MapContainer>
//             )}
//         </div>
//     );
// };

// export default MapComponent;



import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = ({ source, destination, mode }) => {
    const [coordinatesData, setCoordinatesData] = useState([]);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    // Function to fetch coordinates dynamically
    const fetchCoordinates = async () => {
        console.log("Fetching coordinates from the API..."); // Debugging log
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/calculate_routes", {
                source: source,
                target: destination,
                preferred_mode: mode,
            });

            console.log("API Response:", response.data); // Log API response
            if (response.data && response.data.length > 0) {
                setCoordinatesData(response.data);
            } else {
                console.error("No coordinates found in API response.");
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    };

    // Effect to fetch coordinates when source, destination, or mode changes
    useEffect(() => {
        if (source && destination && mode) {
            console.log(`Source: ${source}, Destination: ${destination}, Mode: ${mode}`); // Debugging log
            fetchCoordinates();
        }
    }, [source, destination, mode]);

    // Effect to handle map updates
    useEffect(() => {
        // Check if coordinates data is valid and contains valid coordinates
        if (!coordinatesData || coordinatesData.length === 0 || !coordinatesData[0].coordinates) {
            console.error("No coordinates data available");  // Debugging log
            return;
        }

        const coordinates = coordinatesData[0].coordinates;  // Get the coordinates from the first route
        console.log("Coordinates:", coordinates);  // Debugging log

        if (!mapInstanceRef.current) {
            // Initialize the map only once
            mapInstanceRef.current = L.map(mapRef.current).setView([coordinates[0][0], coordinates[0][1]], 5); // Set initial view

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstanceRef.current);
        }

        // Clear previous layers
        mapInstanceRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                mapInstanceRef.current.removeLayer(layer);
            }
        });

        // Add markers and polyline
        const latLngs = coordinates.map(([lat, lng]) => [lat, lng]);

        latLngs.forEach(([lat, lng], index) => {
            // Place a marker for each point in the route
            L.marker([lat, lng])
                .addTo(mapInstanceRef.current)
                .bindPopup(`Point ${index + 1}: ${lat}, ${lng}`); // Display the point index and coordinates
        });

        // Draw a polyline between the coordinates
        L.polyline(latLngs, { color: 'red' }).addTo(mapInstanceRef.current);

        // Adjust map view to fit the route
        const bounds = L.latLngBounds(latLngs);
        mapInstanceRef.current.fitBounds(bounds);

    }, [coordinatesData]);

    return (
        <div>
            {/* Map Display */}
            <div 
                ref={mapRef} 
                style={{ height: '500px', width: '100%', border: '1px solid black' }} 
            />
        </div>
    );
};

export default MapComponent;




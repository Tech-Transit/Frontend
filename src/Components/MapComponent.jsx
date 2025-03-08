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
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchGoogleRoute = async () => {
            const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
            const origin = "Mumbai, India";
            const destination = "Chennai, India";

            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
                );
                if (response.data.routes.length > 0) {
                    const points = response.data.routes[0].legs[0].steps.map(step => ({
                        lat: step.start_location.lat,
                        lng: step.start_location.lng
                    }));
                    setRoutes(points);
                }
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        };

        fetchGoogleRoute();
    }, []);

    return (
        <div style={{ height: "90vh", width: "100%" }}>
            <MapContainer center={[20.0, 80.0]} zoom={4} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" />
                {routes.map((point, index) => (
                    <Marker key={index} position={[point.lat, point.lng]} icon={new L.Icon({
                        iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075933.png",
                        iconSize: [30, 30],
                    })} />
                ))}
                {routes.length > 1 && <Polyline positions={routes} color="blue" weight={4} />}
            </MapContainer>
        </div>
    );
};

export default MapComponent;

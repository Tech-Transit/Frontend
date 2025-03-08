// import React, { useState } from "react";
// import MapComponent from "../components/MapComponent";
// import Sidebar from "../components/Sidebar";
// import WeatherOverlay from "../components/WeatherOverlay";

// const Home = () => {
//     const [selectedMode, setSelectedMode] = useState(null);
//     const [selectedRouteInfo, setSelectedRouteInfo] = useState(null);

//     const handleAddWaypoint = (waypoint) => {
//         console.log("New Waypoint:", waypoint);
//     };

//     return (
//         <div className="flex">
//             <div className="w-3/4">
//                 <MapComponent />
//             </div>
//             <Sidebar
//                 onSelectMode={setSelectedMode}
//                 onAddWaypoint={handleAddWaypoint}
//                 selectedRouteInfo={selectedRouteInfo}
//             />
//             <WeatherOverlay location={"Some City"} />
//         </div>
//     );
// };

// export default Home;





import React from "react";
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Home = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4">Welcome to Shipment Tracker</Typography>
            <Typography mb={2}>Track your shipment in real-time.</Typography>

            {/* Google Maps Tile in Leaflet */}
            <Box sx={{ height: "800px", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
                <MapContainer center={[37.7749, -122.4194]} zoom={10} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                    />
                    <Marker position={[37.7749, -122.4194]}>
                        <Popup>Shipment is here!</Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </Box>
    );
};

export default Home;

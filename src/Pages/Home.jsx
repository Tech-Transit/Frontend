import React, { useState } from "react";
import MapComponent from "../components/MapComponent";
import Sidebar from "../components/Sidebar";
import WeatherOverlay from "../components/WeatherOverlay";

const Home = () => {
    const [selectedMode, setSelectedMode] = useState(null);
    const [selectedRouteInfo, setSelectedRouteInfo] = useState(null);

    const handleAddWaypoint = (waypoint) => {
        console.log("New Waypoint:", waypoint);
    };

    return (
        <div className="flex">
            <div className="w-3/4">
                <MapComponent />
            </div>
            <Sidebar
                onSelectMode={setSelectedMode}
                onAddWaypoint={handleAddWaypoint}
                selectedRouteInfo={selectedRouteInfo}
            />
            <WeatherOverlay location={"Some City"} />
        </div>
    );
};

export default Home;

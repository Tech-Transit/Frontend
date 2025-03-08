import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapComponent from "./components/MapComponent";
import WeatherOverlay from "./components/WeatherOverlay";
import "./App.css";

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedRouteInfo, setSelectedRouteInfo] = useState(null);

  const handleAddWaypoint = (waypoint) => {
    console.log("New Waypoint:", waypoint);
  };

  return (
    <div className="flex">
      {/* Map Section */}
      <div className="w-3/4">
        <MapComponent />
      </div>

      {/* Sidebar Section */}
      <Sidebar
        onSelectMode={setSelectedMode}
        onAddWaypoint={handleAddWaypoint}
        selectedRouteInfo={selectedRouteInfo}
      />

      {/* Weather Overlay */}
      <WeatherOverlay location={"Some City"} />
    </div>
  );
}

export default App;

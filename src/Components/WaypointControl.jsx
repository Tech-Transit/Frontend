import React, { useState } from "react";

const WaypointControl = ({ onAddWaypoint }) => {
  const [waypoint, setWaypoint] = useState("");

  const handleAddWaypoint = () => {
    if (waypoint.trim() !== "") {
      onAddWaypoint(waypoint);
      setWaypoint("");
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Waypoints</h3>
      <input
        type="text"
        placeholder="Enter a location"
        className="border p-2 w-full rounded"
        value={waypoint}
        onChange={(e) => setWaypoint(e.target.value)}
      />
      <button
        onClick={handleAddWaypoint}
        className="mt-2 p-2 bg-green-500 text-white rounded w-full"
      >
        Add Waypoint
      </button>
    </div>
  );
};

export default WaypointControl;

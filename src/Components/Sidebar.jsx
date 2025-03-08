import React, { useState } from "react";
import TransportModes from "./TransportModes";
import WaypointControl from "./WaypointControl";
import RouteDetails from "./RouteDetails";

const Sidebar = ({ onSelectMode, onAddWaypoint, selectedRouteInfo }) => {
  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold">Route Selector</h2>
      <TransportModes onSelectMode={onSelectMode} />
      <WaypointControl onAddWaypoint={onAddWaypoint} />
      <RouteDetails routeInfo={selectedRouteInfo} />
    </div>
  );
};

export default Sidebar;

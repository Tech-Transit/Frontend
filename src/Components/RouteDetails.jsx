import React from "react";

const RouteDetails = ({ routeInfo }) => {
  if (!routeInfo) return null;

  return (
    <div className="p-4 bg-gray-200 rounded">
      <h3 className="text-lg font-bold">Route Details</h3>
      <p>Estimated Cost: <strong>${routeInfo.cost}</strong></p>
      <p>Estimated Time: <strong>{routeInfo.time} hours</strong></p>
      <p>Border Constraints: <strong>{routeInfo.constraints}</strong></p>
    </div>
  );
};

export default RouteDetails;

import React, { useState } from "react";

const TransportModes = ({ onSelectMode }) => {
  const [selectedMode, setSelectedMode] = useState("");

  const modes = [
    { name: "Land", emoji: "🚗" },
    { name: "Air", emoji: "✈️" },
    { name: "Sea", emoji: "🚢" },
  ];

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    onSelectMode(mode);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Select Transport Mode</h3>
      <div className="flex gap-2 mt-2">
        {modes.map((mode) => (
          <button
            key={mode.name}
            className={`p-2 rounded-lg border ${
              selectedMode === mode.name ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleModeSelect(mode.name)}
          >
            {mode.emoji} {mode.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransportModes;

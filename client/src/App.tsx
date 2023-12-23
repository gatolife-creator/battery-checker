import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch battery level from the API
function useBatteryLevel() {
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    axios
      .get("/api/battery")
      .then((response) => {
        setBatteryLevel(response.data.batteryLevel);
      })
      .catch((error) => {
        console.error("Failed to fetch battery level:", error);
      });
  }, []);

  return batteryLevel;
}

// Component to display the battery level
function BatteryLevel() {
  const batteryLevel = useBatteryLevel();

  return (
    <div className="w-[calc(100%-50px)]">
      <div className="flex flex-col items-center">
        <div className="text-2xl leading-7 font-semibold mb-2">
          {batteryLevel}%
        </div>
        <div className="w-full">
          <div className="relative pt-1">
            <div className="overflow-hidden h-4 text-xs flex rounded bg-pink-200">
              <div
                style={{ width: `${batteryLevel}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <BatteryLevel />
    </div>
  );
}

export default App;

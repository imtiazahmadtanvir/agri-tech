"use client";

import { useState } from "react";
import dayjs from "dayjs";

const cropDatabase = {
  ধান: 120,
  গম: 100,
  ভুট্টা: 90,
  পেঁয়াজ: 80,
  আলু: 75,
};

const CropPlanner = () => {
  const [crop, setCrop] = useState("ধান");
  const [startDate, setStartDate] = useState("");
  const [harvestDate, setHarvestDate] = useState("");

  const handleCalculate = () => {
    const duration = cropDatabase[crop];
    if (startDate && duration) {
      const harvest = dayjs(startDate)
        .add(duration, "day")
        .format("YYYY-MM-DD");
      setHarvestDate(harvest);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Crop Planner</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Crop</label>
        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {Object.keys(cropDatabase).map((cropName) => (
            <option key={cropName} value={cropName}>
              {cropName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Land Preparation Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Plan Crop
      </button>

      {harvestDate && (
        <div className="mt-4 text-green-700 font-medium">
          Estimated Harvest Date:{" "}
          <span className="font-bold">{harvestDate}</span>
        </div>
      )}
    </div>
  );
};

export default CropPlanner;

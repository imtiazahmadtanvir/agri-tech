"use client";

import { useState } from "react";

const YieldCalculator = () => {
  const [crop, setCrop] = useState("");
  const [landArea, setLandArea] = useState("");
  const [unit, setUnit] = useState("acre");
  const [yieldPerUnit, setYieldPerUnit] = useState("");
  const [totalYield, setTotalYield] = useState<number | null>(null);

  const handleCalculate = () => {
    const area = parseFloat(landArea);
    const yieldPer = parseFloat(yieldPerUnit);
    if (!isNaN(area) && !isNaN(yieldPer)) {
      setTotalYield(area * yieldPer);
    } else {
      setTotalYield(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Yield Calculator</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Crop Type</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          placeholder="e.g. ধান, গম, ভুট্টা"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Land Area</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={landArea}
          onChange={(e) => setLandArea(e.target.value)}
          placeholder="e.g. 2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Unit</label>
        <select
          className="w-full border p-2 rounded"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="acre">Acre</option>
          <option value="bigha">Bigha</option>
          <option value="hectare">Hectare</option>
          <option value="decimal">Decimal</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">
          Average Yield per {unit}
        </label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={yieldPerUnit}
          onChange={(e) => setYieldPerUnit(e.target.value)}
          placeholder="e.g. 500"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Calculate Yield
      </button>

      {totalYield !== null && (
        <div className="mt-4 text-lg font-medium text-green-700">
          Estimated Total Yield: <span className="font-bold">{totalYield}</span>{" "}
          kg
        </div>
      )}
    </div>
  );
};

export default YieldCalculator;

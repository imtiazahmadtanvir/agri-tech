"use client";
import { useState } from "react";

export default function YieldCalculator() {
  const [cropType, setCropType] = useState<keyof typeof baseYields>("corn");
  const [area, setArea] = useState(10);
  const [soilQuality, setSoilQuality] =
    useState<keyof typeof soilMultipliers>("good");
  const [irrigationLevel, setIrrigationLevel] =
    useState<keyof typeof irrigationMultipliers>("adequate");
  const [fertilizer, setFertilizer] = useState(true);
  const [pestControl, setPestControl] = useState(true);
  const [estimatedYield, setEstimatedYield] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Baseline yields in tons per hectare
  const baseYields = {
    corn: 8.5,
    wheat: 3.5,
    rice: 4.5,
    soybean: 2.8,
    potato: 25,
    cotton: 2.2,
  };

  // Multipliers for different factors
  const soilMultipliers = {
    poor: 0.7,
    average: 0.9,
    good: 1.0,
    excellent: 1.2,
  };

  const irrigationMultipliers = {
    minimal: 0.6,
    limited: 0.8,
    adequate: 1.0,
    optimal: 1.15,
  };

  const calculateYield = () => {
    const baseYield = baseYields[cropType];
    const soilFactor = soilMultipliers[soilQuality];
    const irrigationFactor = irrigationMultipliers[irrigationLevel];
    const fertilizerFactor = fertilizer ? 1.2 : 1.0;
    const pestControlFactor = pestControl ? 1.1 : 0.9;

    const calculatedYield =
      baseYield *
      soilFactor *
      irrigationFactor *
      fertilizerFactor *
      pestControlFactor *
      area;
    setEstimatedYield(parseFloat(calculatedYield.toFixed(2)));
    setShowResult(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-green-200">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Crop Yield Calculator
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crop Type
          </label>
          <select
            value={cropType}
            onChange={(e) =>
              setCropType(e.target.value as keyof typeof baseYields)
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="corn">Corn (Maize)</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="soybean">Soybean</option>
            <option value="potato">Potato</option>
            <option value="cotton">Cotton</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area (hectares)
          </label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            min="0.1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Soil Quality
          </label>
          <select
            value={soilQuality}
            onChange={(e) =>
              setSoilQuality(e.target.value as keyof typeof soilMultipliers)
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="poor">Poor</option>
            <option value="average">Average</option>
            <option value="good">Good</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Irrigation Level
          </label>
          <select
            value={irrigationLevel}
            onChange={(e) => setIrrigationLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="minimal">Minimal</option>
            <option value="limited">Limited</option>
            <option value="adequate">Adequate</option>
            <option value="optimal">Optimal</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="fertilizer"
            checked={fertilizer}
            onChange={(e) => setFertilizer(e.target.checked)}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="fertilizer" className="ml-2 text-sm text-gray-700">
            Using Fertilizer
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pestControl"
            checked={pestControl}
            onChange={(e) => setPestControl(e.target.checked)}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="pestControl" className="ml-2 text-sm text-gray-700">
            Using Pest Control
          </label>
        </div>

        <button
          onClick={calculateYield}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Calculate Yield
        </button>

        {showResult && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800">
              Estimated Yield
            </h3>
            <div className="mt-2 text-3xl font-bold text-green-700">
              {estimatedYield} tons
            </div>
            <p className="mt-1 text-sm text-gray-600">
              This is an estimate based on the provided factors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

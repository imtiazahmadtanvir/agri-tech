import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import useCurrentLocationName from "@/Hook/useCurrentLocationName";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setLocation: (Location: string) => void;
}

export default function LocationModal({
  isOpen,
  onClose,
  setLocation,
}: ModalProps) {
  const [mode, setMode] = useState<"all" | "current" | "manual">("all");
  const [manualLocation, setManualLocation] = useState("");

  const {
    data: locationData,
    isLoading,
    error,
    refetch,
  } = useCurrentLocationName();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    if (mode === "current") {
      refetch();
    }
  }, [mode, refetch]);

  const handleApply = () => {
    if (mode === "manual") {
      setLocation(manualLocation);
    } else if (mode === "current" && locationData) {
      setLocation(locationData?.city || "");
    } else if (mode === "all") {
      setLocation("All locations");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md relative px-4 py-6">
        <button
          className="absolute top-2 right-2 size-6 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 flex items-center justify-center"
          onClick={onClose}
        >
          <IoMdClose size={20} />
        </button>

        <p className="text-center text-lg font-semibold mb-4">
          Select Location
        </p>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="locationMode"
              checked={mode === "all"}
              onChange={() => setMode("all")}
            />
            All Locations
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="locationMode"
              checked={mode === "current"}
              onChange={() => setMode("current")}
            />
            Use Current Location
          </label>

          {mode === "current" && (
            <div className="ml-6 text-sm text-gray-600">
              {isLoading && <p>Fetching current location...</p>}
              {error && <p className="text-red-500">Error: {String(error)}</p>}
              {typeof locationData === "object" && locationData && (
                <p>
                  {locationData?.city ||
                    locationData?.town ||
                    locationData?.village}
                  , {locationData?.state || locationData?.country}
                </p>
              )}
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="locationMode"
              checked={mode === "manual"}
              onChange={() => setMode("manual")}
            />
            Enter Manually
          </label>

          {mode === "manual" && (
            <div className="ml-2  flex flex-col gap-2">
              <label
                htmlFor="manualLocation"
                className="flex items-center gap-1 text-gray-700"
              >
                <IoLocationSharp /> Location
              </label>
              <input
                type="text"
                id="manualLocation"
                className="border px-2 py-1 rounded-md w-3/4"
                placeholder="Enter your city"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
              />
            </div>
          )}
        </div>

        {
          <div className="mt-6 text-center">
            <button
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        }
      </div>
    </div>
  );
}

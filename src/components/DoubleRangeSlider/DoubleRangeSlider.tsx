"use client";
// components/PriceRangeSlider.tsx
import React, { useState, useRef, useEffect } from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
  currencyText?: string;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  onChange,
  currencyText = "$",
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Convert value to percentage for positioning
  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  // Update the visual range when minVal or maxVal changes
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  // Handle changes to min and max values
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    onChange({ min: minVal, max: value });
  };

  return (
    <div className="price-range-slider">
      {/* Price Display */}
      <div className="price-display">
        <span>
          {currencyText}
          {minVal}
        </span>
        <div className="separator"></div>
        <span>
          {currencyText}
          {maxVal}
        </span>
      </div>

      {/* Slider Container */}
      <div className="slider-container">
        {/* Background Track */}
        <div className="track"></div>
        {/* Selected Range */}
        <div ref={rangeRef} className="range"></div>
        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="thumb thumb-min"
        />
        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb thumb-max"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;

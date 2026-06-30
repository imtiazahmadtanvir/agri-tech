"use client";
import { FadeLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <FadeLoader
        height={15}
        width={5}
        color="#008236"
        loading={true}
        speedMultiplier={0.8}
      />
    </div>
  );
};

export default LoadingSpinner;

import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FadeLoader
        height={15}
        width={5}
        color="#008236"
        loading={loading}
        // speedMultiplier={0.8}
      />
    </div>
  );
};

export default LoadingSpinner;

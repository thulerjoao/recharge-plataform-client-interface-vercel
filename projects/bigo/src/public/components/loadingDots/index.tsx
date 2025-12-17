import { useEffect, useState } from "react";

const LoadingDots = () => {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        minWidth: "10px",
        display: "inline-block",
        textAlign: "start",
      }}
    >
      {dots}
    </span>
  );
};

export default LoadingDots;

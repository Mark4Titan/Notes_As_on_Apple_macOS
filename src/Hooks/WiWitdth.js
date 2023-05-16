import { useState, useEffect } from "react";

export function useWiWidth(thresholdWidth = null) {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth < thresholdWidth
  );

  useEffect(() => {
    const handleResize = () => {
      if (thresholdWidth === null) {
        setWindowWidth(window.innerWidth);
      } else {
        const width = window.innerWidth;
        setWindowWidth(width < thresholdWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [thresholdWidth]);

  return windowWidth;
}

export default useWiWidth;

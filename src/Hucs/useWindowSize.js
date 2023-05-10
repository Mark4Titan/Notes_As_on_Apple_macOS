import { useState, useEffect } from "react";

export default function useWindowSize(ref, patter=[100, 1000, 0, 10]) {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
    range: patter,
    inW: null,
  });

  useEffect(() => {
    const handleResize = () => { 
      const width= Math.round(ref.current.getBoundingClientRect().width)
      const height= Math.round(ref.current.getBoundingClientRect().height)
      const result1 = Math.min(((width - size.range[0]) / (size.range[1] - size.range[0])) * 100, 100);
    const result2 = (result1/100)*(size.range[3] - size.range[2]) + size.range[2];   
      setSize((prevState) => ({
        ...prevState,
        width: width,
        height: height,
        inW: Math.round(result2)
      }));
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref, size.range]);
  return size;
}

import { useState, useEffect } from "react";

export default function useWindowSize(ref, patter = [100, 1000, 0, 10]) {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
    range: patter,
    inW: null,
    refs: ref
  });

  useEffect(() => {
    const handleResize = () => {
      const width = Math.round(size.refs.current?.getBoundingClientRect().width);
      const height = Math.round(size.refs.current?.getBoundingClientRect().height);
      const result1 = Math.max(Math.min(((width - size.range[0]) / (size.range[1] - size.range[0])) * 100, 100), 0);
      const result2 = (result1 / 100) * (size.range[3] - size.range[2]) + size.range[2];
      setSize((prevState) => ({
        ...prevState,
        width: width,
        height: height,
        inW: Math.round(result2)
      }));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [size.range, size.refs]);

  return size;
}
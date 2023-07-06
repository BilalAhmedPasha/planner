import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = (): WindowSize => {
  const [screenSize, setScreenSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useWindowSize;

import { useEffect, useState } from "react";

export const useWindowWidthAndHeight = (): number[] => {
  const getWindowInnerSize = () => [window.innerWidth, window.innerHeight];

  const [windowSize, setWindowSize] = useState(getWindowInnerSize);

  useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize(getWindowInnerSize());
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);
  return windowSize;
};

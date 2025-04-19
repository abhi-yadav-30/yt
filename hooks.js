import { useEffect, useState } from "react";

export const useIsMobile = (width) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

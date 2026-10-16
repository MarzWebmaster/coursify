import { useState, useEffect } from "react";
const useWindowWidth = () => {
  const initialWidth = typeof window !== "undefined" ? window == null ? void 0 : window.innerWidth : 0;
  const [width, setWidth] = useState(initialWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window == null ? void 0 : window.innerWidth);
    };
    const debouncedHandleResize = debounce(handleResize, 100);
    window == null ? void 0 : window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window == null ? void 0 : window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);
  return width;
};
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
export {
  useWindowWidth as u
};

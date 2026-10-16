import { jsx, Fragment } from "react/jsx-runtime";
import { u as useWindowWidth } from "./useWindowWidth-CvsXQp3R.js";
const breakpoints = {
  md: 768
};
const ShowForDesktop = ({
  children
}) => {
  const width = useWindowWidth();
  return width > breakpoints.md ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};
const ShowForMobile = ({
  children
}) => {
  const width = useWindowWidth();
  return width <= breakpoints.md ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};
export {
  ShowForMobile as S,
  ShowForDesktop as a
};

import { jsx, Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router";
const WelcomeLayout = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Outlet, {}) });
};
export {
  WelcomeLayout as default
};

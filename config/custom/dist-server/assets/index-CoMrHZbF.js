import { jsxs, jsx } from "react/jsx-runtime";
import { Popover as Popover$1 } from "@mantine/core";
const Popover = ({
  children,
  title,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(Popover$1, { ...props, children: [
    /* @__PURE__ */ jsx(Popover$1.Target, { children: /* @__PURE__ */ jsx("div", { style: {
      cursor: "pointer",
      display: "inline-flex"
    }, children }) }),
    /* @__PURE__ */ jsx(Popover$1.Dropdown, { children: title })
  ] });
};
export {
  Popover as P
};

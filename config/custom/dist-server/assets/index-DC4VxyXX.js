import { jsx, Fragment } from "react/jsx-runtime";
import { Tooltip } from "@mantine/core";
const Truncate = ({
  text = "",
  length = 35,
  showTooltip = true
}) => {
  if ((text == null ? void 0 : text.length) <= length) {
    return /* @__PURE__ */ jsx(Fragment, { children: text });
  }
  const truncated = text.length > length ? text.substring(0, length) + "..." : text;
  if (!showTooltip) {
    return /* @__PURE__ */ jsx("span", { title: text, children: truncated });
  }
  return /* @__PURE__ */ jsx(Tooltip, { withArrow: true, label: text, children: /* @__PURE__ */ jsx("span", { children: truncated }) });
};
export {
  Truncate as T
};

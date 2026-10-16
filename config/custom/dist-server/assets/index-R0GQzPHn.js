import { jsxs, jsx } from "react/jsx-runtime";
import { P as Popover } from "./index-CoMrHZbF.js";
import { IconInfoCircle } from "@tabler/icons-react";
const labelWrapper = "_labelWrapper_hp9yh_1";
const helpIcon = "_helpIcon_hp9yh_7";
const classes = {
  labelWrapper,
  helpIcon
};
const InputLabelWithHelp = ({
  label,
  helpText
}) => {
  return /* @__PURE__ */ jsxs("div", { className: classes.labelWrapper, children: [
    /* @__PURE__ */ jsx("label", { children: label }),
    /* @__PURE__ */ jsx("div", { className: classes.helpIcon, children: /* @__PURE__ */ jsx(Popover, { title: helpText, children: /* @__PURE__ */ jsx(IconInfoCircle, { size: 14 }) }) })
  ] });
};
export {
  InputLabelWithHelp as I
};

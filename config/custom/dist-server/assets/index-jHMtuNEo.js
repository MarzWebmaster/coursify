import { jsx } from "react/jsx-runtime";
const card = "_card_hdpo3_1";
const lightGray = "_lightGray_hdpo3_7";
const classes = {
  card,
  lightGray,
  "default": "_default_hdpo3_11"
};
const Card = ({
  children,
  className = "",
  style = {},
  variant = "default",
  ref = null
}) => {
  return /* @__PURE__ */ jsx("div", { className: `card ${variant} ${className} ${classes.card} ${classes[variant]}`, style, ref, children });
};
export {
  Card as C
};

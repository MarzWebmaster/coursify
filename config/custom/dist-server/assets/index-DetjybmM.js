import { jsx } from "react/jsx-runtime";
import { Fieldset as Fieldset$1 } from "@mantine/core";
const legend = "_legend_l31s2_1";
const classNames = {
  legend
};
const Fieldset = (props) => {
  return /* @__PURE__ */ jsx(Fieldset$1, { ...props, variant: "filled", legend: /* @__PURE__ */ jsx("span", { className: classNames.legend, children: props.legend }), children: props.children });
};
export {
  Fieldset as F
};

import { jsxs, jsx } from "react/jsx-runtime";
const wrapper = "_wrapper_1su52_1";
const heading = "_heading_1su52_9";
const description = "_description_1su52_13";
const classes = {
  wrapper,
  heading,
  description
};
const HeadingWithDescription = ({
  heading: heading2,
  description: description2
}) => {
  return /* @__PURE__ */ jsxs("div", { className: classes.wrapper, children: [
    /* @__PURE__ */ jsx("h2", { className: classes.heading, children: heading2 }),
    /* @__PURE__ */ jsx("p", { className: classes.description, children: description2 })
  ] });
};
export {
  HeadingWithDescription as H
};

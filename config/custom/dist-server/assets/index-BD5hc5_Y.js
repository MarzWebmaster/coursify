import { jsxs, jsx } from "react/jsx-runtime";
const container = "_container_184mh_1";
const title = "_title_184mh_5";
const subheading = "_subheading_184mh_15";
const classes = {
  container,
  title,
  subheading
};
const PageTitle = (props) => {
  const {
    children,
    subheading: subheading2,
    ...rest
  } = props;
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsx("h1", { className: classes.title, ...rest, children }),
    subheading2 && /* @__PURE__ */ jsx("div", { className: classes.subheading, children: subheading2 })
  ] });
};
export {
  PageTitle as P
};

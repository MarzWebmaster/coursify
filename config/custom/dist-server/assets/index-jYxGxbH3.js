import { jsx } from "react/jsx-runtime";
import { Container } from "@mantine/core";
const PageBody = ({
  children,
  isFluid = true
}) => {
  return /* @__PURE__ */ jsx(Container, { style: {
    position: "relative"
  }, fluid: isFluid, p: 0, children });
};
export {
  PageBody as P
};

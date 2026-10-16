import { jsx } from "react/jsx-runtime";
import { SimpleGrid } from "@mantine/core";
const InputGroup = ({
  children
}) => {
  return /* @__PURE__ */ jsx(SimpleGrid, { verticalSpacing: 0, cols: {
    base: 1,
    xs: 2
  }, children });
};
export {
  InputGroup as I
};

import { jsx } from "react/jsx-runtime";
import { Box, Pagination as Pagination$1 } from "@mantine/core";
const Pagination = (props) => {
  const {
    marginTop,
    ...rest
  } = props;
  return /* @__PURE__ */ jsx(Box, { mt: props.marginTop === void 0 ? 20 : props.marginTop, children: /* @__PURE__ */ jsx(Pagination$1, { hideWithOnePage: true, ...rest }) });
};
export {
  Pagination as P
};

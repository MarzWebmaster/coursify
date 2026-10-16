import { jsx } from "react/jsx-runtime";
import { useIsFetching } from "@tanstack/react-query";
import { LoadingOverlay } from "@mantine/core";
const LoadingMask = ({
  margin = "5px"
}) => {
  const isFetching = useIsFetching();
  return /* @__PURE__ */ jsx("div", { style: {
    margin
  }, children: /* @__PURE__ */ jsx(LoadingOverlay, { loaderProps: {
    size: 30,
    type: "dots"
  }, visible: isFetching > 0 }) });
};
export {
  LoadingMask as L
};

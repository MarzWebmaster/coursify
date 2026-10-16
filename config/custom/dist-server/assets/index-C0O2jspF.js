import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Skeleton } from "@mantine/core";
const TableSkeleton = ({
  isVisible,
  numRows = 15
}) => {
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Skeleton, { height: 45, mb: "md", radius: "10px" }),
    [...Array(numRows)].map((_, index) => /* @__PURE__ */ jsx(Skeleton, { mb: 20, height: 20 }, index))
  ] });
};
export {
  TableSkeleton as T
};

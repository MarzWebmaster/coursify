import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useSearchParams } from "react-router";
const container = "_container_47ji8_1";
const classes = {
  container
};
const NoResultsSplash = ({
  heading = i18n._(
    /*i18n*/
    {
      id: "f8qS7T"
    }
  ),
  children,
  subHeading,
  imageHref = "/no-results-empty-boxes.svg"
}) => {
  const [searchParams] = useSearchParams();
  const hasSearchQuery = !!searchParams.get("query");
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsx("img", { alt: i18n._(
      /*i18n*/
      {
        id: "Ev2r9A"
      }
    ), width: 300, src: imageHref }),
    heading && !hasSearchQuery && /* @__PURE__ */ jsx("h2", { children: heading }),
    hasSearchQuery && /* @__PURE__ */ jsx("h2", { children: i18n._(
      /*i18n*/
      {
        id: "RHyZUL"
      }
    ) }),
    subHeading && !hasSearchQuery && subHeading,
    children && children
  ] });
};
export {
  NoResultsSplash as N
};

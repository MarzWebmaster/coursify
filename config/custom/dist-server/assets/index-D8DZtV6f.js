import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { C as Card } from "./index-jHMtuNEo.js";
import { Button } from "@mantine/core";
const heading = "_heading_1kz70_1";
const subHeading = "_subHeading_1kz70_7";
const card = "_card_1kz70_11";
const button = "_button_1kz70_16";
const classes = {
  heading,
  subHeading,
  card,
  button
};
const HeadingCard = ({
  className = "",
  subHeading: subHeading2,
  heading: heading2,
  buttonAction,
  buttonText,
  buttonDataTestId
}) => {
  return /* @__PURE__ */ jsxs(Card, { className: `${className} ${classes.card}`, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: classes.heading, children: heading2 }),
      /* @__PURE__ */ jsx("div", { className: classes.subHeading, children: subHeading2 })
    ] }),
    buttonAction && /* @__PURE__ */ jsx("div", { className: classes.button, children: /* @__PURE__ */ jsx(Button, { size: "xs", onClick: buttonAction, variant: "light", "data-testid": buttonDataTestId, children: buttonText || i18n._(
      /*i18n*/
      {
        id: "ApsD9J"
      }
    ) }) })
  ] });
};
export {
  HeadingCard as H
};

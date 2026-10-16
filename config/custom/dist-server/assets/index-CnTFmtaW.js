import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Collapse } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
const advancedToggle = "_advancedToggle_whljm_1";
const chevron = "_chevron_whljm_24";
const chevronOpen = "_chevronOpen_whljm_27";
const classes = {
  advancedToggle,
  chevron,
  chevronOpen
};
const AdvancedOptions = ({
  opened,
  onToggle,
  dataTestId,
  children
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: classes.advancedToggle, onClick: onToggle, "aria-expanded": opened, "data-testid": dataTestId, children: [
      /* @__PURE__ */ jsx(IconChevronRight, { size: 14, className: `${classes.chevron} ${opened ? classes.chevronOpen : ""}` }),
      opened ? i18n._(
        /*i18n*/
        {
          id: "NNnsM0"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "WwlM8F"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Collapse, { expanded: opened, children })
  ] });
};
export {
  AdvancedOptions as A
};

import { jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { CopyButton as CopyButton$1, Tooltip, ActionIcon, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
const CopyButton = ({
  value
}) => {
  return /* @__PURE__ */ jsx(CopyButton$1, { value, timeout: 2e3, children: ({
    copied,
    copy
  }) => /* @__PURE__ */ jsx(Tooltip, { label: copied ? i18n._(
    /*i18n*/
    {
      id: "6V3Ea3"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "he3ygx"
    }
  ), withArrow: true, position: "right", children: /* @__PURE__ */ jsx(ActionIcon, { color: copied ? "teal" : "gray", variant: "subtle", onClick: copy, children: copied ? /* @__PURE__ */ jsx(IconCheck, { style: {
    width: rem(16)
  } }) : /* @__PURE__ */ jsx(IconCopy, { style: {
    width: rem(16)
  } }) }) }) });
};
export {
  CopyButton as C
};

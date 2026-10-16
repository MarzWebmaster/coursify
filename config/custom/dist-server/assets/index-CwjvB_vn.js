import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { IconX, IconCheck, IconAlertTriangle, IconBulb, IconInfoCircle } from "@tabler/icons-react";
const callout = "_callout_159u4_1";
const info = "_info_159u4_14";
const tip = "_tip_159u4_19";
const warning = "_warning_159u4_24";
const success = "_success_159u4_29";
const iconWrap = "_iconWrap_159u4_34";
const iconWrap_info = "_iconWrap_info_159u4_45";
const iconWrap_tip = "_iconWrap_tip_159u4_49";
const iconWrap_warning = "_iconWrap_warning_159u4_53";
const iconWrap_success = "_iconWrap_success_159u4_57";
const body = "_body_159u4_61";
const title = "_title_159u4_67";
const text = "_text_159u4_76";
const dismissBtn = "_dismissBtn_159u4_90";
const classes = {
  callout,
  info,
  tip,
  warning,
  success,
  iconWrap,
  iconWrap_info,
  iconWrap_tip,
  iconWrap_warning,
  iconWrap_success,
  body,
  title,
  text,
  dismissBtn
};
const defaultIcon = {
  info: /* @__PURE__ */ jsx(IconInfoCircle, { size: 18, stroke: 2 }),
  tip: /* @__PURE__ */ jsx(IconBulb, { size: 18, stroke: 2 }),
  warning: /* @__PURE__ */ jsx(IconAlertTriangle, { size: 18, stroke: 2 }),
  success: /* @__PURE__ */ jsx(IconCheck, { size: 18, stroke: 2.4 })
};
const Callout = ({
  variant = "info",
  title: title2,
  children,
  icon,
  onDismiss,
  className,
  style
}) => {
  return /* @__PURE__ */ jsxs("aside", { className: `${classes.callout} ${classes[variant]} ${className ?? ""}`, style, children: [
    /* @__PURE__ */ jsx("div", { className: `${classes.iconWrap} ${classes[`iconWrap_${variant}`]}`, "aria-hidden": "true", children: icon ?? defaultIcon[variant] }),
    /* @__PURE__ */ jsxs("div", { className: classes.body, children: [
      title2 && /* @__PURE__ */ jsx("div", { className: classes.title, children: title2 }),
      children && /* @__PURE__ */ jsx("div", { className: classes.text, children })
    ] }),
    onDismiss && /* @__PURE__ */ jsx("button", { type: "button", onClick: onDismiss, className: classes.dismissBtn, "aria-label": i18n._(
      /*i18n*/
      {
        id: "1QfxQT"
      }
    ), children: /* @__PURE__ */ jsx(IconX, { size: 14 }) })
  ] });
};
export {
  Callout as C
};

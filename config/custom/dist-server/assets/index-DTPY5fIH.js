import { jsx, jsxs } from "react/jsx-runtime";
import { Button, CloseButton } from "@mantine/core";
import { forwardRef, useState, useEffect } from "react";
const topBarButton = "_topBarButton_1sljz_1";
const classes$1 = {
  topBarButton
};
const TopBarButton = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return /* @__PURE__ */ jsx(Button, { ref, className: `${classes$1.topBarButton} ${className || ""}`, ...props, children });
});
TopBarButton.displayName = "TopBarButton";
const calloutBox = "_calloutBox_1vb7h_1";
const closeButton = "_closeButton_1vb7h_32";
const calloutIcon = "_calloutIcon_1vb7h_45";
const calloutTitle = "_calloutTitle_1vb7h_62";
const calloutText = "_calloutText_1vb7h_71";
const calloutButton = "_calloutButton_1vb7h_80";
const classes = {
  calloutBox,
  closeButton,
  calloutIcon,
  calloutTitle,
  calloutText,
  calloutButton
};
const SidebarCallout = ({
  icon,
  heading,
  description,
  buttonIcon,
  buttonText,
  onClick,
  onClose,
  storageKey = "sidebar-callout-dismissed",
  customButton,
  isDismissible = true
}) => {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    if (!storageKey || storageKey.includes("undefined") || storageKey.includes("[object Object]")) {
      return;
    }
    const isDismissed = localStorage.getItem(storageKey) === "true";
    setIsVisible(!isDismissed);
  }, [storageKey]);
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, "true");
    onClose == null ? void 0 : onClose();
  };
  if (isVisible === null || !isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: classes.calloutBox, children: [
    isDismissible && /* @__PURE__ */ jsx(CloseButton, { className: classes.closeButton, onClick: handleClose, size: "sm", iconSize: 16 }),
    /* @__PURE__ */ jsx("div", { className: classes.calloutIcon, children: icon }),
    /* @__PURE__ */ jsx("h4", { className: classes.calloutTitle, children: heading }),
    /* @__PURE__ */ jsx("p", { className: classes.calloutText, children: description }),
    customButton ? customButton : /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "white", size: "sm", leftSection: buttonIcon, onClick, className: classes.calloutButton, children: buttonText })
  ] });
};
export {
  SidebarCallout as S,
  TopBarButton as T
};

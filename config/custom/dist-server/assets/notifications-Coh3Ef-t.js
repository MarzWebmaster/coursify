import { jsx, jsxs } from "react/jsx-runtime";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck, IconInfoSmall } from "@tabler/icons-react";
const showSuccess = (message, icon = /* @__PURE__ */ jsx(IconCheck, {})) => {
  notifications.show({
    message,
    color: "green",
    icon,
    position: "top-center"
  });
};
const showInfo = (message, icon = /* @__PURE__ */ jsx(IconInfoSmall, {})) => {
  notifications.show({
    message,
    color: "blue",
    icon,
    position: "top-center"
  });
};
const showError = (message, icon = /* @__PURE__ */ jsx(IconX, {})) => {
  notifications.show({
    message,
    color: "red",
    icon,
    position: "top-center"
  });
};
const showSuccessWithUndo = (message, onUndo, options = {}) => {
  const {
    undoLabel = "Undo",
    autoClose = 5e3
  } = options;
  const id = `undo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const handleUndo = () => {
    notifications.hide(id);
    onUndo();
  };
  notifications.show({
    id,
    color: "green",
    icon: /* @__PURE__ */ jsx(IconCheck, {}),
    position: "top-center",
    autoClose,
    message: /* @__PURE__ */ jsxs("span", { style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        flex: 1
      }, children: message }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleUndo, onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleUndo();
        }
      }, style: {
        background: "transparent",
        border: "none",
        padding: "2px 8px",
        color: "var(--mantine-color-green-8)",
        fontWeight: 700,
        cursor: "pointer",
        textTransform: "uppercase",
        fontSize: 12,
        letterSpacing: "0.05em",
        flexShrink: 0
      }, children: undoLabel })
    ] })
  });
};
export {
  showError as a,
  showSuccess as b,
  showSuccessWithUndo as c,
  showInfo as s
};

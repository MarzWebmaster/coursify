import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
const container = "_container_12ig0_1";
const card = "_card_12ig0_10";
const emojiContainer = "_emojiContainer_12ig0_26";
const emoji = "_emoji_12ig0_26";
const title = "_title_12ig0_53";
const subtitle = "_subtitle_12ig0_67";
const button = "_button_12ig0_74";
const classes = {
  container,
  card,
  emojiContainer,
  emoji,
  title,
  subtitle,
  button
};
const getStatusEmoji = (status) => {
  const emojis = {
    info: "💬",
    processing: "⏳",
    success: "🎉",
    warning: "⚠️",
    error: "❌",
    expired: "⏰",
    cancelled: "😔",
    not_found: "🔍",
    awaiting_payment: "💳",
    offline_payment: "🏦"
  };
  return emojis[status] || emojis.info;
};
const HomepageInfoMessage = ({
  message,
  subtitle: subtitle2,
  link,
  linkText,
  status = "info"
}) => {
  const emoji2 = getStatusEmoji(status);
  return /* @__PURE__ */ jsx("div", { className: classes.container, children: /* @__PURE__ */ jsxs("div", { className: classes.card, children: [
    /* @__PURE__ */ jsx("div", { className: classes.emojiContainer, children: /* @__PURE__ */ jsx("span", { className: classes.emoji, children: emoji2 }) }),
    /* @__PURE__ */ jsx("h2", { className: classes.title, children: message }),
    subtitle2 && /* @__PURE__ */ jsx("p", { className: classes.subtitle, children: subtitle2 }),
    link && linkText && /* @__PURE__ */ jsx(Button, { component: "a", href: link, rightSection: /* @__PURE__ */ jsx(IconArrowRight, { size: 16 }), className: classes.button, children: linkText })
  ] }) });
};
export {
  HomepageInfoMessage as H
};

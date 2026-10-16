import { jsx } from "react/jsx-runtime";
const wrapper = "_wrapper_cmu9i_1";
const emoji = "_emoji_cmu9i_6";
const classes = {
  wrapper,
  emoji
};
const BouncingEmoji = ({
  emoji: emoji2,
  size = 48
}) => /* @__PURE__ */ jsx("div", { className: classes.wrapper, style: {
  fontSize: size
}, children: /* @__PURE__ */ jsx("span", { className: classes.emoji, children: emoji2 }) });
export {
  BouncingEmoji as B
};

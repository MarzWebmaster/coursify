import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Box, Container, Stack, Image, rem, Title, Text, Button } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { L as Helmet, a as getConfig, P as PoweredByFooter } from "../entry.server.js";
const wrapper = "_wrapper_1iwfk_1";
const backgroundOrb1 = "_backgroundOrb1_1iwfk_18";
const backgroundOrb2 = "_backgroundOrb2_1iwfk_49";
const root = "_root_1iwfk_80";
const logo = "_logo_1iwfk_101";
const content = "_content_1iwfk_119";
const title = "_title_1iwfk_147";
const description = "_description_1iwfk_170";
const button = "_button_1iwfk_192";
const classes = {
  wrapper,
  backgroundOrb1,
  backgroundOrb2,
  root,
  logo,
  content,
  title,
  description,
  button
};
const GenericErrorPage = ({
  title: title2,
  description: description2,
  pageTitle,
  metaDescription,
  buttonText,
  buttonUrl,
  buttonIcon = /* @__PURE__ */ jsx(IconHome, { size: 18 }),
  children
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { title: pageTitle || title2, meta: [{
      name: "description",
      content: metaDescription || description2
    }] }),
    /* @__PURE__ */ jsxs(Box, { className: classes.wrapper, children: [
      /* @__PURE__ */ jsx("div", { className: classes.backgroundOrb1 }),
      /* @__PURE__ */ jsx("div", { className: classes.backgroundOrb2 }),
      /* @__PURE__ */ jsx(Container, { size: "md", className: classes.root, children: /* @__PURE__ */ jsxs(Stack, { gap: "xl", align: "center", children: [
        /* @__PURE__ */ jsx(Image, { src: getConfig("VITE_APP_LOGO_DARK", "/logos/coursify-stacked-light.svg"), alt: getConfig("VITE_APP_NAME", "Coursify") + " Logo", w: rem(140), h: "auto", fit: "contain", className: classes.logo }),
        /* @__PURE__ */ jsxs(Stack, { gap: "lg", align: "center", className: classes.content, children: [
          /* @__PURE__ */ jsx(Title, { order: 1, className: classes.title, children: title2 }),
          /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", className: classes.description, children: description2 }),
          children,
          buttonText && buttonUrl && /* @__PURE__ */ jsx(Button, { component: "a", href: buttonUrl, leftSection: buttonIcon, variant: "gradient", gradient: {
            from: "purple",
            to: "pink"
          }, className: classes.button, children: buttonText })
        ] }),
        /* @__PURE__ */ jsx(PoweredByFooter, {})
      ] }) })
    ] })
  ] });
};
export {
  GenericErrorPage as G
};

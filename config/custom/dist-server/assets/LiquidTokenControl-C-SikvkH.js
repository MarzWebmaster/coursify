import { jsx, jsxs } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { Menu, ScrollArea, Badge, Text } from "@mantine/core";
import { IconBraces } from "@tabler/icons-react";
import { useRichTextEditorContext, RichTextEditor } from "@mantine/tiptap";
import { useQuery } from "@tanstack/react-query";
import { l as emailTemplateClient } from "./index-i3GvAOHd.js";
import "../entry.server.js";
import "react-dom/server";
import "react-router";
import "react";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./index-CwjvB_vn.js";
import "@mantine/hooks";
import "@mantine/form";
import "./index-D4cOjjnu.js";
import "./confirmationDialog-I-HMojnx.js";
import "./notifications-Coh3Ef-t.js";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./types-CqPWB-a5.js";
import "./index-jHMtuNEo.js";
import "./index-encY-Si0.js";
import "./useGetAccount-CGfwRfDK.js";
import "./useGetEvent-DyvalBPE.js";
import "./currency-Br7a8J7F.js";
const GET_EMAIL_TEMPLATE_TOKENS_QUERY_KEY = "getEmailTemplateTokens";
const useGetEmailTemplateTokens = (templateType, enabled = true) => {
  return useQuery({
    queryKey: [GET_EMAIL_TEMPLATE_TOKENS_QUERY_KEY, templateType],
    queryFn: () => emailTemplateClient.getAvailableTokens(templateType),
    enabled: !!templateType && enabled,
    staleTime: 1e3 * 60 * 30
    // Tokens don't change often, cache for 30 minutes
  });
};
const LiquidTokenControl = ({
  templateType,
  excludeTokens = []
}) => {
  const {
    editor
  } = useRichTextEditorContext();
  const {
    data: tokensData,
    isLoading
  } = useGetEmailTemplateTokens(templateType);
  const insertToken = (token) => {
    if (editor) {
      editor.chain().focus().insertContent(token.token).run();
    }
  };
  if (isLoading || !(tokensData == null ? void 0 : tokensData.tokens)) {
    return /* @__PURE__ */ jsx(RichTextEditor.Control, { title: i18n._(
      /*i18n*/
      {
        id: "IoDI2o"
      }
    ), "aria-label": i18n._(
      /*i18n*/
      {
        id: "IoDI2o"
      }
    ), disabled: true, children: /* @__PURE__ */ jsx(IconBraces, { size: 16 }) });
  }
  const tokens = tokensData.tokens.filter((token) => !token.token.startsWith("{% if") && !excludeTokens.includes(token.token));
  return /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 380, position: "bottom-start", withinPortal: true, children: [
    /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(RichTextEditor.Control, { title: i18n._(
      /*i18n*/
      {
        id: "85e6zs"
      }
    ), "aria-label": i18n._(
      /*i18n*/
      {
        id: "85e6zs"
      }
    ), children: /* @__PURE__ */ jsx(IconBraces, { size: 16 }) }) }),
    /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
      /* @__PURE__ */ jsx(Menu.Label, { children: /* @__PURE__ */ jsx(Trans, { id: "NB5+UG" }) }),
      /* @__PURE__ */ jsx(ScrollArea, { h: 400, children: tokens.map((token, index) => /* @__PURE__ */ jsx(Menu.Item, { onClick: () => insertToken(token), p: "sm", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Badge, { size: "xs", variant: "light", color: "blue", style: {
          fontFamily: "monospace",
          marginBottom: "4px"
        }, children: token.token }),
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", style: {
          lineHeight: 1.3
        }, children: token.description }),
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fs: "italic", style: {
          marginTop: "2px"
        }, children: token.example })
      ] }) }, index)) })
    ] })
  ] });
};
export {
  LiquidTokenControl
};

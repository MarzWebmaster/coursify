import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { S as SelectProducts } from "./index-B4_wM3sm.js";
import { Text, Accordion, Stack, ColorInput, TextInput, NumberInput, Switch, Tabs, Textarea, Group } from "@mantine/core";
import { useForm, matches } from "@mantine/form";
import { useState, useEffect } from "react";
import { C as CopyButton } from "./index-CxL5Ax7s.js";
import { useParams } from "react-router";
import { IconPalette, IconSettings, IconCode } from "@tabler/icons-react";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import "@tanstack/react-query";
import "./order.client-BmBVeAyF.js";
import "../entry.server.js";
import "react-dom/server";
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
import "@mantine/hooks";
import "./notifications-Coh3Ef-t.js";
import "./index-IzdRcWBR.js";
import "./currency-Br7a8J7F.js";
import "./types-CqPWB-a5.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./waitlist.client-Dm8api1T.js";
import "./index-CwAoF9NO.js";
import "./CheckoutThemeProvider-D0cdZ-GY.js";
import "./themeUtils-B--ztbrW.js";
import "./index-Bhmm_OXR.js";
import "./useWaitlistJoined-D2Jn2EfP.js";
import "./iframeResize-DUQclS7o.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./useCheckoutPrefill-DziFYvxr.js";
const container = "_container_1ph2g_6";
const sidebar = "_sidebar_1ph2g_19";
const sticky = "_sticky_1ph2g_42";
const header = "_header_1ph2g_46";
const accordion = "_accordion_1ph2g_57";
const accordionItem = "_accordionItem_1ph2g_60";
const previewContainer = "_previewContainer_1ph2g_92";
const stickyContainer = "_stickyContainer_1ph2g_114";
const browserChrome = "_browserChrome_1ph2g_124";
const browserActionButtons = "_browserActionButtons_1ph2g_133";
const browserAddressBar = "_browserAddressBar_1ph2g_149";
const websitePlaceholder = "_websitePlaceholder_1ph2g_168";
const widgetWrapper = "_widgetWrapper_1ph2g_185";
const lorem = "_lorem_1ph2g_189";
const classes = {
  container,
  sidebar,
  sticky,
  header,
  accordion,
  accordionItem,
  previewContainer,
  stickyContainer,
  browserChrome,
  browserActionButtons,
  browserAddressBar,
  websitePlaceholder,
  widgetWrapper,
  lorem
};
const WidgetEditor = () => {
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const colorMessage = i18n._(
    /*i18n*/
    {
      id: "Vd+LC3"
    }
  );
  const colorRegex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
  const {
    data: eventSettings,
    isFetched: isEventSettingsFetched
  } = useGetEventSettings(eventId);
  const form = useForm({
    initialValues: {
      background_color: "#ffffff",
      primary_color: "#828282",
      primary_text_color: "#ffffff",
      secondary_color: "#f5f5f5",
      secondary_text_color: "#828282",
      continue_button_text: i18n._(
        /*i18n*/
        {
          id: "xGVfLh"
        }
      ),
      padding: 20,
      autoResize: true
    },
    validate: {
      background_color: matches(colorRegex, colorMessage),
      primary_color: matches(colorRegex, colorMessage),
      primary_text_color: matches(colorRegex, colorMessage),
      secondary_color: matches(colorRegex, colorMessage),
      secondary_text_color: matches(colorRegex, colorMessage)
    }
  });
  const [htmlEmbedCode, setHtmlEmbedCode] = useState("");
  const [reactComponentCode, setReactComponentCode] = useState("");
  const [reactUsageCode, setReactUsageCode] = useState("");
  const [accordionValue, setAccordionValue] = useState(["colors", "appearance", "embedding"]);
  const currentLocation = typeof window !== "undefined" ? window == null ? void 0 : window.location : void 0;
  const embedUrl = `${currentLocation == null ? void 0 : currentLocation.protocol}//${currentLocation == null ? void 0 : currentLocation.host}/widget.js`;
  const embedScript = `<script async src="${embedUrl}"><\/script>`;
  useEffect(() => {
    setHtmlEmbedCode('<div data-hievents-id="' + eventId + '" data-hievents-primary-color="' + form.values.primary_color + '" data-hievents-primary-text-color="' + form.values.primary_text_color + '" data-hievents-secondary-color="' + form.values.secondary_color + '" data-hievents-secondary-text-color="' + form.values.secondary_text_color + '" data-hievents-background-color="' + form.values.background_color + '" data-hievents-widget-type="widget" data-hievents-widget-version="1.0" data-hievents-locale="en" data-hievents-padding="' + form.values.padding + 'px" data-hievents-autoresize="' + form.values.autoResize + '" data-hievents-continue-button-text="' + form.values.continue_button_text + '" class="hievents-widget"></div>');
    setReactComponentCode(`
import React, { useEffect } from 'react';

const HiEventsWidget = ({
  eventId,
  primaryColor = "${form.values.primary_color}",
  primaryTextColor = "${form.values.primary_text_color}",
  secondaryColor = "${form.values.secondary_color}",
  secondaryTextColor = "${form.values.secondary_text_color}",
  backgroundColor = "${form.values.background_color}",
  widgetType = "widget",
  widgetVersion = "1.0",
  locale = "en"
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "${embedUrl}";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      data-hievents-id={eventId}
      data-hievents-primary-color={primaryColor}
      data-hievents-primary-text-color={primaryTextColor}
      data-hievents-secondary-color={secondaryColor}
      data-hievents-secondary-text-color={secondaryTextColor}
      data-hievents-background-color={backgroundColor}
      data-hievents-widget-type={widgetType}
      data-hievents-widget-version={widgetVersion}
      data-hievents-locale={locale}
      className="hievents-widget"
    />
  );
};

export default HiEventsWidget;
        `);
    setReactUsageCode(`
import React from 'react';
import HiEventsWidget from './HiEventsWidget';

const App = () => {
  return (
    <div>
      <h1>My Website</h1>
      <HiEventsWidget 
        eventId="${eventId}"
        primaryColor="${form.values.primary_color}"
        primaryTextColor="${form.values.primary_text_color}"
        secondaryColor="${form.values.secondary_color}"
        secondaryTextColor="${form.values.secondary_text_color}"
        backgroundColor="${form.values.background_color}"
        widgetType="widget"
        widgetVersion="1.0"
        locale="en"
      />
    </div>
  );
};

export default App;
        `);
    form.validate();
  }, [form.values, eventId]);
  useEffect(() => {
    if (eventSettings) {
      form.setValues({
        background_color: eventSettings.homepage_background_color,
        primary_color: eventSettings.homepage_primary_color,
        primary_text_color: eventSettings.homepage_primary_text_color,
        secondary_color: eventSettings.homepage_secondary_color,
        secondary_text_color: eventSettings.homepage_secondary_text_color,
        continue_button_text: eventSettings.continue_button_text
      });
    }
  }, [isEventSettingsFetched, eventSettings]);
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsx("div", { className: classes.sidebar, children: /* @__PURE__ */ jsxs("div", { className: classes.sticky, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.header, children: [
        /* @__PURE__ */ jsx("h2", { children: i18n._(
          /*i18n*/
          {
            id: "v1P7Gm"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: i18n._(
          /*i18n*/
          {
            id: "RKKhnW"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Accordion, { multiple: true, value: accordionValue, onChange: setAccordionValue, variant: "contained", className: classes.accordion, children: [
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "colors", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconPalette, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "1HfW/F"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsxs(Stack, { gap: "sm", children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "QP3gP+"
              }
            ) }),
            /* @__PURE__ */ jsx(ColorInput, { label: i18n._(
              /*i18n*/
              {
                id: "k1bLf+"
              }
            ), placeholder: "#RRGGBB", ...form.getInputProps("background_color"), size: "sm" }),
            /* @__PURE__ */ jsx(ColorInput, { label: i18n._(
              /*i18n*/
              {
                id: "6RmHKN"
              }
            ), placeholder: "#RRGGBB", ...form.getInputProps("primary_color"), size: "sm" }),
            /* @__PURE__ */ jsx(ColorInput, { label: i18n._(
              /*i18n*/
              {
                id: "8cBtvm"
              }
            ), placeholder: "#RRGGBB", ...form.getInputProps("primary_text_color"), size: "sm" }),
            /* @__PURE__ */ jsx(ColorInput, { label: i18n._(
              /*i18n*/
              {
                id: "DnXcDK"
              }
            ), placeholder: "#RRGGBB", ...form.getInputProps("secondary_color"), size: "sm" }),
            /* @__PURE__ */ jsx(ColorInput, { label: i18n._(
              /*i18n*/
              {
                id: "ZIgYeg"
              }
            ), placeholder: "#RRGGBB", ...form.getInputProps("secondary_text_color"), size: "sm" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "appearance", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconSettings, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "aAIQg2"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsxs(Stack, { gap: "sm", children: [
            /* @__PURE__ */ jsx(TextInput, { label: i18n._(
              /*i18n*/
              {
                id: "AfNRFG"
              }
            ), placeholder: i18n._(
              /*i18n*/
              {
                id: "xGVfLh"
              }
            ), ...form.getInputProps("continue_button_text"), size: "sm" }),
            /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
              /*i18n*/
              {
                id: "fdjq4c"
              }
            ), min: 0, max: 500, placeholder: i18n._(
              /*i18n*/
              {
                id: "IoRZzD"
              }
            ), rightSection: `px`, ...form.getInputProps("padding"), size: "sm" }),
            /* @__PURE__ */ jsx(Switch, { label: i18n._(
              /*i18n*/
              {
                id: "IMJ6rh"
              }
            ), ...form.getInputProps("autoResize", {
              type: "checkbox"
            }), description: i18n._(
              /*i18n*/
              {
                id: "vZ5qKF"
              }
            ) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "embedding", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconCode, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "NTZ/NX"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "html", children: [
            /* @__PURE__ */ jsxs(Tabs.List, { children: [
              /* @__PURE__ */ jsx(Tabs.Tab, { value: "html", children: "HTML" }),
              /* @__PURE__ */ jsx(Tabs.Tab, { value: "react", children: "React" })
            ] }),
            /* @__PURE__ */ jsx(Tabs.Panel, { value: "html", pt: "sm", children: /* @__PURE__ */ jsxs(Stack, { gap: "sm", children: [
              /* @__PURE__ */ jsx(Textarea, { onChange: void 0, description: i18n._(
                /*i18n*/
                {
                  id: "xdA9ud"
                }
              ), label: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
                i18n._(
                  /*i18n*/
                  {
                    id: "4rnJq4"
                  }
                ),
                /* @__PURE__ */ jsx(CopyButton, { value: embedScript })
              ] }), rows: 3, value: embedScript, size: "sm" }),
              /* @__PURE__ */ jsx(Textarea, { onChange: void 0, description: i18n._(
                /*i18n*/
                {
                  id: "aEDp5C"
                }
              ), label: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
                i18n._(
                  /*i18n*/
                  {
                    id: "NTZ/NX"
                  }
                ),
                /* @__PURE__ */ jsx(CopyButton, { value: htmlEmbedCode })
              ] }), rows: 6, value: htmlEmbedCode, size: "sm" })
            ] }) }),
            /* @__PURE__ */ jsx(Tabs.Panel, { value: "react", pt: "sm", children: /* @__PURE__ */ jsxs(Stack, { gap: "sm", children: [
              /* @__PURE__ */ jsx(Textarea, { onChange: void 0, description: i18n._(
                /*i18n*/
                {
                  id: "Y1SSqh"
                }
              ), label: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
                i18n._(
                  /*i18n*/
                  {
                    id: "DwF9eH"
                  }
                ),
                /* @__PURE__ */ jsx(CopyButton, { value: reactComponentCode })
              ] }), rows: 6, value: reactComponentCode, size: "sm" }),
              /* @__PURE__ */ jsx(Textarea, { onChange: void 0, description: i18n._(
                /*i18n*/
                {
                  id: "6K/IHl"
                }
              ), label: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
                i18n._(
                  /*i18n*/
                  {
                    id: "e5lF64"
                  }
                ),
                /* @__PURE__ */ jsx(CopyButton, { value: reactUsageCode })
              ] }), rows: 6, value: reactUsageCode, size: "sm" })
            ] }) })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: classes.previewContainer, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "uchB0M"
        }
      ) }),
      /* @__PURE__ */ jsxs("section", { className: classes.stickyContainer, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.browserChrome, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.browserActionButtons, children: [
            /* @__PURE__ */ jsx("div", {}),
            /* @__PURE__ */ jsx("div", {}),
            /* @__PURE__ */ jsx("div", {})
          ] }),
          /* @__PURE__ */ jsx("div", { className: classes.browserAddressBar, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { id: "OXku3b", components: {
            0: /* @__PURE__ */ jsx("span", {})
          } }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.websitePlaceholder, children: [
          /* @__PURE__ */ jsx("h1", { children: i18n._(
            /*i18n*/
            {
              id: "Eh5Wrd"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: classes.lorem, children: i18n._(
            /*i18n*/
            {
              id: "F2jAFv"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: classes.widgetWrapper, children: !eventQuery.isFetched ? /* @__PURE__ */ jsx(LoadingMask, {}) : /* @__PURE__ */ jsx(SelectProducts, { event: eventQuery.data, widgetMode: "preview", colors: {
            primary: form.values.primary_color,
            primaryText: form.values.primary_text_color,
            secondary: form.values.secondary_color,
            secondaryText: form.values.secondary_text_color,
            background: form.values.background_color
          }, continueButtonText: form.values.continue_button_text, padding: form.values.padding + "px" }) }),
          /* @__PURE__ */ jsx("p", { className: classes.lorem, children: i18n._(
            /*i18n*/
            {
              id: "pRjx4L"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
};
const Widget = () => {
  return /* @__PURE__ */ jsx(PageBody, { children: /* @__PURE__ */ jsx(WidgetEditor, {}) });
};
export {
  Widget,
  Widget as default
};

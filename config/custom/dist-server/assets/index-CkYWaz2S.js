import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { u as useUpdateEventSettings } from "./useUpdateEventSettings-BRZqoL7m.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useForm } from "@mantine/form";
import { Text, Accordion, Stack, Group, TextInput, Button } from "@mantine/core";
import { IconPhoto, IconHelp, IconPalette, IconColorPicker, IconTypography } from "@tabler/icons-react";
import { T as Tooltip, I as ImageUploadDropzone } from "./index-BnDV7mmR.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { u as useGetEventImages, G as GET_EVENT_IMAGES_QUERY_KEY } from "./useGetEventImages-BmsHxpY1.js";
import { d as eventPreviewPath } from "./urlHelper-CsaWRwIV.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { p as queryClient, k as GET_EVENT_PUBLIC_QUERY_KEY } from "../entry.server.js";
import { T as ThemeColorControls, a as ThemeFontControl } from "./index-mS2e8oLW.js";
import { D as DEFAULT_HOMEPAGE_FONT, v as validateThemeSettings } from "./themeUtils-B--ztbrW.js";
import "@tanstack/react-query";
import "@mantine/notifications";
import "@mantine/dropzone";
import "./imageUploadValidation-B-7zi9vz.js";
import "./confirmationDialog-I-HMojnx.js";
import "@mantine/modals";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@lingui/react";
import "@mantine/dates";
import "@mantine/colors-generator";
const container = "_container_1ff6c_6";
const sidebar = "_sidebar_1ff6c_19";
const sticky = "_sticky_1ff6c_42";
const header = "_header_1ff6c_46";
const accordion = "_accordion_1ff6c_57";
const accordionItem = "_accordionItem_1ff6c_60";
const fieldset = "_fieldset_1ff6c_85";
const previewContainer = "_previewContainer_1ff6c_109";
const iframeContainer = "_iframeContainer_1ff6c_125";
const classes = {
  container,
  sidebar,
  sticky,
  header,
  accordion,
  accordionItem,
  fieldset,
  previewContainer,
  iframeContainer
};
const HomepageDesigner = () => {
  var _a;
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const eventImagesQuery = useGetEventImages(eventId);
  const updateMutation = useUpdateEventSettings();
  const iframeRef = useRef(null);
  const lastSentSettings = useRef(null);
  const [iframeSrc, setIframeSrc] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [lastCoverId, setLastCoverId] = useState(null);
  const [accordionValue, setAccordionValue] = useState(["images", "colors", "typography", "button"]);
  const existingCover = (_a = eventImagesQuery.data) == null ? void 0 : _a.find((image) => image.type === "EVENT_COVER");
  const form = useForm({
    initialValues: {
      homepage_theme_settings: {
        accent: "#8b5cf6",
        background: "#f5f3ff",
        mode: "light",
        background_type: "COLOR",
        font_family: DEFAULT_HOMEPAGE_FONT
      },
      continue_button_text: "",
      get_tickets_button_text: ""
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      const settings = eventSettingsQuery.data;
      const themeSettings = validateThemeSettings(settings.homepage_theme_settings);
      form.setValues({
        homepage_theme_settings: themeSettings,
        continue_button_text: settings.continue_button_text,
        get_tickets_button_text: settings.get_tickets_button_text || ""
      });
    }
  }, [eventSettingsQuery.isFetched]);
  useEffect(() => {
    if (eventSettingsQuery.isFetched && eventImagesQuery.isFetched && !iframeSrc) {
      setIframeSrc(eventPreviewPath(eventId));
    }
  }, [eventSettingsQuery.isFetched, eventImagesQuery.isFetched]);
  useEffect(() => {
    if ((existingCover == null ? void 0 : existingCover.id) !== lastCoverId && iframeSrc) {
      setLastCoverId(existingCover == null ? void 0 : existingCover.id);
      setIframeSrc(eventPreviewPath(eventId) + `?cover_image_id=${existingCover == null ? void 0 : existingCover.id}`);
      setIframeLoaded(false);
    }
  }, [existingCover == null ? void 0 : existingCover.id]);
  const handleSubmit = (values) => {
    const validatedTheme = validateThemeSettings(values.homepage_theme_settings);
    const eventSettings = {
      homepage_theme_settings: validatedTheme,
      continue_button_text: values.continue_button_text,
      get_tickets_button_text: values.get_tickets_button_text,
      // Also update legacy fields for backward compatibility during transition
      homepage_primary_color: validatedTheme.accent,
      homepage_body_background_color: validatedTheme.background,
      homepage_background_type: validatedTheme.background_type
    };
    updateMutation.mutate({
      eventSettings,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "G0KW+e"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  const handleImageChange = () => {
    queryClient.invalidateQueries({
      queryKey: [GET_EVENT_IMAGES_QUERY_KEY, eventId]
    });
    queryClient.invalidateQueries({
      queryKey: [GET_EVENT_PUBLIC_QUERY_KEY, eventId]
    });
  };
  const sendSettingsToIframe = () => {
    var _a2;
    if (((_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow) && iframeLoaded) {
      const themeSettings = validateThemeSettings(form.values.homepage_theme_settings);
      const settingsToSend = {
        homepage_theme_settings: themeSettings,
        continue_button_text: form.values.continue_button_text,
        get_tickets_button_text: form.values.get_tickets_button_text
      };
      const settingsJson = JSON.stringify(settingsToSend);
      if (settingsJson !== lastSentSettings.current) {
        iframeRef.current.contentWindow.postMessage({
          type: "UPDATE_SETTINGS",
          settings: settingsToSend
        }, "*");
        lastSentSettings.current = settingsJson;
      }
    }
  };
  useEffect(() => {
    sendSettingsToIframe();
  }, [iframeLoaded, form.values]);
  const handleThemeChange = (themeSettings) => {
    form.setFieldValue("homepage_theme_settings", themeSettings);
  };
  const handleBackgroundTypeChange = (backgroundType) => {
    const value = Array.isArray(backgroundType) ? backgroundType[0] : backgroundType;
    form.setFieldValue("homepage_theme_settings", {
      ...form.values.homepage_theme_settings,
      background_type: value
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsx("div", { className: classes.sidebar, children: /* @__PURE__ */ jsxs("div", { className: classes.sticky, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.header, children: [
        /* @__PURE__ */ jsx("h2", { children: i18n._(
          /*i18n*/
          {
            id: "ZOBwQn"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: i18n._(
          /*i18n*/
          {
            id: "xJaTUK"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Accordion, { multiple: true, value: accordionValue, onChange: setAccordionValue, variant: "contained", className: classes.accordion, children: [
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "images", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconPhoto, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "an5hVd"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsx(Stack, { gap: "lg", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Group, { justify: "space-between", mb: "xs", children: [
              /* @__PURE__ */ jsx(Text, { fw: 500, size: "sm", children: i18n._(
                /*i18n*/
                {
                  id: "P0rbCt"
                }
              ) }),
              /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
                /*i18n*/
                {
                  id: "BJtMTd"
                }
              ), children: /* @__PURE__ */ jsx(IconHelp, { size: 16, style: {
                color: "var(--mantine-color-gray-6)"
              } }) })
            ] }),
            /* @__PURE__ */ jsx(ImageUploadDropzone, { imageType: "EVENT_COVER", entityId: eventId, onUploadSuccess: handleImageChange, onDeleteSuccess: handleImageChange, existingImageData: {
              url: existingCover == null ? void 0 : existingCover.url,
              id: existingCover == null ? void 0 : existingCover.id
            }, helpText: i18n._(
              /*i18n*/
              {
                id: "60u+dQ"
              }
            ), displayMode: "compact" })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "colors", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconPalette, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "tDwYhx"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsx("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, className: classes.fieldset, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
            /* @__PURE__ */ jsx(CustomSelect, { optionList: [{
              icon: /* @__PURE__ */ jsx(IconColorPicker, {}),
              label: i18n._(
                /*i18n*/
                {
                  id: "jZlrte"
                }
              ),
              value: "COLOR",
              description: i18n._(
                /*i18n*/
                {
                  id: "JjkX4+"
                }
              )
            }, {
              icon: /* @__PURE__ */ jsx(IconPhoto, {}),
              label: i18n._(
                /*i18n*/
                {
                  id: "OadMRm"
                }
              ),
              value: "MIRROR_COVER_IMAGE",
              description: i18n._(
                /*i18n*/
                {
                  id: "sGEOe4"
                }
              ),
              disabled: !existingCover
            }], label: i18n._(
              /*i18n*/
              {
                id: "I7xjqg"
              }
            ), name: "homepage_theme_settings.background_type", value: form.values.homepage_theme_settings.background_type || "COLOR", onChange: handleBackgroundTypeChange }),
            /* @__PURE__ */ jsx(ThemeColorControls, { values: form.values.homepage_theme_settings, onChange: handleThemeChange, disabled: eventSettingsQuery.isLoading || updateMutation.isPending })
          ] }) }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "typography", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconTypography, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "nWRfmt"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsx("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, className: classes.fieldset, children: /* @__PURE__ */ jsx(ThemeFontControl, { value: form.values.homepage_theme_settings.font_family, onChange: (fontFamily) => form.setFieldValue("homepage_theme_settings", {
            ...form.values.homepage_theme_settings,
            font_family: fontFamily
          }), disabled: eventSettingsQuery.isLoading || updateMutation.isPending }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "button", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconTypography, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "ChDLlO"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsx("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, className: classes.fieldset, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
            /* @__PURE__ */ jsx(TextInput, { label: i18n._(
              /*i18n*/
              {
                id: "AfNRFG"
              }
            ), description: i18n._(
              /*i18n*/
              {
                id: "iX6SLo"
              }
            ), placeholder: i18n._(
              /*i18n*/
              {
                id: "SPKbfM"
              }
            ), size: "sm", ...form.getInputProps("continue_button_text") }),
            /* @__PURE__ */ jsx(TextInput, { label: i18n._(
              /*i18n*/
              {
                id: "2ohvu7"
              }
            ), description: i18n._(
              /*i18n*/
              {
                id: "R8H7yL"
              }
            ), placeholder: i18n._(
              /*i18n*/
              {
                id: "u6FPxT"
              }
            ), size: "sm", ...form.getInputProps("get_tickets_button_text") })
          ] }) }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", fullWidth: true, mt: "md", onClick: () => form.onSubmit(handleSubmit)(), children: i18n._(
        /*i18n*/
        {
          id: "IUwGEM"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: classes.previewContainer, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "YjVNGZ"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes.iframeContainer, children: iframeSrc ? /* @__PURE__ */ jsx("iframe", { ref: iframeRef, src: iframeSrc, title: "Event Preview", onLoad: () => setIframeLoaded(true) }) : /* @__PURE__ */ jsx(LoadingMask, {}) })
    ] })
  ] });
};
export {
  HomepageDesigner as default
};

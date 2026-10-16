import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { u as useGetOrganizerSettings } from "./useGetOrganizerSettings-oZkWKvDt.js";
import { u as useUpdateOrganizerSettings } from "./useUpdateOrganizerSettings-kVr2AheM.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useForm } from "@mantine/form";
import { Text, Accordion, Stack, Group, Button } from "@mantine/core";
import { IconPhoto, IconHelp, IconPalette, IconColorPicker, IconTypography } from "@tabler/icons-react";
import { T as Tooltip, I as ImageUploadDropzone } from "./index-BnDV7mmR.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { u as useGetOrganizer, G as GET_ORGANIZER_QUERY_KEY } from "./useGetOrganizer-DMDsW5DW.js";
import { b as organizerPreviewPath } from "./urlHelper-CsaWRwIV.js";
import { p as queryClient, m as GET_ORGANIZER_PUBLIC_QUERY_KEY } from "../entry.server.js";
import { T as ThemeColorControls, a as ThemeFontControl } from "./index-mS2e8oLW.js";
import { D as DEFAULT_HOMEPAGE_FONT, v as validateThemeSettings, c as computeThemeVariables } from "./themeUtils-B--ztbrW.js";
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
const container = "_container_19274_6";
const sidebar = "_sidebar_19274_19";
const sticky = "_sticky_19274_42";
const header = "_header_19274_46";
const accordion = "_accordion_19274_57";
const accordionItem = "_accordionItem_19274_60";
const fieldset = "_fieldset_19274_85";
const previewContainer = "_previewContainer_19274_173";
const iframeContainer = "_iframeContainer_19274_192";
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
const OrganizerHomepageDesigner = () => {
  var _a, _b;
  const {
    organizerId
  } = useParams();
  const organizerSettingsQuery = useGetOrganizerSettings(organizerId);
  const organizerQuery = useGetOrganizer(organizerId);
  const updateMutation = useUpdateOrganizerSettings();
  const organizerData = organizerQuery.data;
  const iframeRef = useRef(null);
  const lastSentSettings = useRef(null);
  const [iframeSrc, setIframeSrc] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [accordionValue, setAccordionValue] = useState(["images", "theme", "typography"]);
  const [lastCoverId, setLastCoverId] = useState(null);
  const [lastLogoId, setLastLogoId] = useState(null);
  const existingLogo = (_a = organizerData == null ? void 0 : organizerData.images) == null ? void 0 : _a.find((image) => image.type === "ORGANIZER_LOGO");
  const existingCover = (_b = organizerData == null ? void 0 : organizerData.images) == null ? void 0 : _b.find((image) => image.type === "ORGANIZER_COVER");
  const form = useForm({
    initialValues: {
      homepage_theme_settings: {
        accent: "#8b5cf6",
        background: "#f5f3ff",
        mode: "light",
        background_type: "COLOR",
        font_family: DEFAULT_HOMEPAGE_FONT
      }
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.isFetched) && (organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.data)) {
      const settings = organizerSettingsQuery.data;
      const themeSettings = validateThemeSettings(settings.homepage_theme_settings);
      form.setValues({
        homepage_theme_settings: themeSettings
      });
    }
  }, [organizerSettingsQuery.isFetched, organizerSettingsQuery.data]);
  useEffect(() => {
    if (organizerSettingsQuery.isFetched && organizerQuery.isFetched && !iframeSrc) {
      setIframeSrc(organizerPreviewPath(organizerId));
    }
  }, [organizerSettingsQuery.isFetched, organizerQuery.isFetched, organizerId]);
  const handleSubmit = (values) => {
    const validatedTheme = validateThemeSettings(values.homepage_theme_settings);
    const organizerSettings = {
      homepage_theme_settings: validatedTheme
    };
    updateMutation.mutate({
      organizerSettings,
      organizerId
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
  const sendSettingsToIframe = () => {
    var _a2;
    if (((_a2 = iframeRef.current) == null ? void 0 : _a2.contentWindow) && iframeLoaded) {
      const themeSettings = validateThemeSettings(form.values.homepage_theme_settings);
      const cssVars = computeThemeVariables(themeSettings);
      const settingsToSend = {
        homepage_theme_settings: themeSettings,
        logoUrl: existingLogo == null ? void 0 : existingLogo.url,
        coverUrl: existingCover == null ? void 0 : existingCover.url,
        // Include legacy fields for backward compatibility with preview
        homepage_background_color: themeSettings.background,
        homepage_content_background_color: cssVars["--theme-surface"],
        homepage_primary_color: themeSettings.accent,
        homepage_primary_text_color: cssVars["--theme-text-primary"],
        homepage_secondary_color: cssVars["--theme-text-secondary"],
        homepage_secondary_text_color: cssVars["--theme-text-tertiary"],
        homepage_background_type: themeSettings.background_type
      };
      const settingsJson = JSON.stringify(settingsToSend);
      if (settingsJson !== lastSentSettings.current) {
        iframeRef.current.contentWindow.postMessage({
          type: "UPDATE_ORGANIZER_SETTINGS",
          settings: settingsToSend
        }, "*");
        lastSentSettings.current = settingsJson;
      }
    }
  };
  useEffect(() => {
    sendSettingsToIframe();
  }, [iframeLoaded, form.values, existingLogo == null ? void 0 : existingLogo.url, existingCover == null ? void 0 : existingCover.url]);
  useEffect(() => {
    if (((existingCover == null ? void 0 : existingCover.id) !== lastCoverId || (existingLogo == null ? void 0 : existingLogo.id) !== lastLogoId) && iframeSrc) {
      setLastCoverId(existingCover == null ? void 0 : existingCover.id);
      setLastLogoId(existingLogo == null ? void 0 : existingLogo.id);
      setIframeSrc(organizerPreviewPath(organizerId) + `?cover_image_id=${existingCover == null ? void 0 : existingCover.id}&logo_image_id=${existingLogo == null ? void 0 : existingLogo.id}`);
      setIframeLoaded(false);
    }
  }, [existingCover == null ? void 0 : existingCover.id, existingLogo == null ? void 0 : existingLogo.id]);
  const handleImageChange = () => {
    queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_PUBLIC_QUERY_KEY, organizerId]
    });
    queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_QUERY_KEY, organizerId]
    });
  };
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
            id: "3trPKm"
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
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
            /* @__PURE__ */ jsxs("div", { children: [
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
              /* @__PURE__ */ jsx(ImageUploadDropzone, { imageType: "ORGANIZER_COVER", entityId: organizerId, onUploadSuccess: handleImageChange, onDeleteSuccess: handleImageChange, existingImageData: {
                url: existingCover == null ? void 0 : existingCover.url,
                id: existingCover == null ? void 0 : existingCover.id
              }, helpText: i18n._(
                /*i18n*/
                {
                  id: "2NLjA6"
                }
              ), displayMode: "compact" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(Group, { justify: "space-between", mb: "xs", children: [
                /* @__PURE__ */ jsx(Text, { fw: 500, size: "sm", children: i18n._(
                  /*i18n*/
                  {
                    id: "iG7KNr"
                  }
                ) }),
                /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
                  /*i18n*/
                  {
                    id: "wJzo/w"
                  }
                ), children: /* @__PURE__ */ jsx(IconHelp, { size: 16, style: {
                  color: "var(--mantine-color-gray-6)"
                } }) })
              ] }),
              /* @__PURE__ */ jsx(ImageUploadDropzone, { imageType: "ORGANIZER_LOGO", entityId: organizerId, onUploadSuccess: handleImageChange, onDeleteSuccess: handleImageChange, existingImageData: {
                url: existingLogo == null ? void 0 : existingLogo.url,
                id: existingLogo == null ? void 0 : existingLogo.id
              }, helpText: i18n._(
                /*i18n*/
                {
                  id: "TBEnp1"
                }
              ), displayMode: "compact" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "theme", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconPalette, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "tDwYhx"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsx("fieldset", { disabled: organizerSettingsQuery.isLoading || updateMutation.isPending, className: classes.fieldset, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
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
            /* @__PURE__ */ jsx(ThemeColorControls, { values: form.values.homepage_theme_settings, onChange: handleThemeChange, disabled: organizerSettingsQuery.isLoading || updateMutation.isPending })
          ] }) }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion.Item, { value: "typography", className: classes.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconTypography, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "nWRfmt"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsx("fieldset", { disabled: organizerSettingsQuery.isLoading || updateMutation.isPending, className: classes.fieldset, children: /* @__PURE__ */ jsx(ThemeFontControl, { value: form.values.homepage_theme_settings.font_family, onChange: (fontFamily) => form.setFieldValue("homepage_theme_settings", {
            ...form.values.homepage_theme_settings,
            font_family: fontFamily
          }), disabled: organizerSettingsQuery.isLoading || updateMutation.isPending }) }) })
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
      /* @__PURE__ */ jsx("div", { className: classes.iframeContainer, children: iframeSrc ? /* @__PURE__ */ jsx("iframe", { ref: iframeRef, src: iframeSrc, title: "Organizer Homepage Preview", onLoad: () => setIframeLoaded(true) }) : /* @__PURE__ */ jsx(LoadingMask, {}) })
    ] })
  ] });
};
export {
  OrganizerHomepageDesigner as default
};

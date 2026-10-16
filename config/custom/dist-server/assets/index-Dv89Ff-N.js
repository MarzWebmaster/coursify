import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { u as useUpdateEventSettings } from "./useUpdateEventSettings-BRZqoL7m.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useForm } from "@mantine/form";
import { Text, Accordion, Stack, ColorInput, Group, Textarea, Select, Button } from "@mantine/core";
import { IconColorSwatch, IconHelp, IconPrinter } from "@tabler/icons-react";
import { T as Tooltip, I as ImageUploadDropzone } from "./index-BnDV7mmR.js";
import { u as useGetMe, p as queryClient } from "../entry.server.js";
import { u as useGetEventImages, G as GET_EVENT_IMAGES_QUERY_KEY } from "./useGetEventImages-BmsHxpY1.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { A as AttendeeTicket } from "./index-BXVupOij.js";
import { r as resolveEventLocation } from "./effectiveLocation-BzDgAlu_.js";
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
import "./products-BLTGbPdF.js";
import "./currency-Br7a8J7F.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-qr-code";
import "./urlHelper-CsaWRwIV.js";
import "./addressUtilities-7xIQim0X.js";
import "./index-BfWJHinS.js";
const container = "_container_naj0c_1";
const sidebar = "_sidebar_naj0c_18";
const sticky = "_sticky_naj0c_43";
const header = "_header_naj0c_48";
const accordion = "_accordion_naj0c_60";
const accordionItem = "_accordionItem_naj0c_63";
const fieldset = "_fieldset_naj0c_89";
const preview = "_preview_naj0c_118";
const previewHeader = "_previewHeader_naj0c_142";
const previewContent = "_previewContent_naj0c_156";
const classes$1 = {
  container,
  sidebar,
  sticky,
  header,
  accordion,
  accordionItem,
  fieldset,
  preview,
  previewHeader,
  previewContent
};
const previewWrapper = "_previewWrapper_1hytx_1";
const loadingState = "_loadingState_1hytx_32";
const classes = {
  previewWrapper,
  loadingState
};
const TicketPreview = ({
  settings,
  eventId,
  logoUrl
}) => {
  const eventQuery = useGetEvent(eventId);
  const meQuery = useGetMe();
  const event = eventQuery.data;
  const user = meQuery.data;
  if (!event || !user) {
    return /* @__PURE__ */ jsx("div", { className: classes.loadingState, children: /* @__PURE__ */ jsx("p", { children: i18n._(
      /*i18n*/
      {
        id: "WdmJIX"
      }
    ) }) });
  }
  const mockProduct = {
    id: 1,
    title: i18n._(
      /*i18n*/
      {
        id: "T02gNN"
      }
    ),
    price: 2500,
    type: "TICKET",
    sale_start_date: null,
    sale_end_date: null,
    max_per_order: null,
    min_per_order: null,
    quantity_available: null,
    is_hidden: false,
    sort_order: 1,
    description: "",
    is_hidden_without_promo_code: false
  };
  const mockAttendee = {
    id: 1,
    public_id: "PREVIEW12345",
    short_id: "P1234",
    first_name: user.first_name || "John",
    last_name: user.last_name || "Doe",
    email: user.email || "john.doe@example.com",
    status: "ACTIVE",
    checked_in_at: null,
    product_id: mockProduct.id,
    product: mockProduct,
    product_price_id: 1,
    order_id: 1,
    order: {
      id: 1,
      short_id: "ORD123",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      total_gross: 2500,
      currency: event.currency || "USD"
    }
  };
  const fallbackLocationDetails = {
    venue_name: i18n._(
      /*i18n*/
      {
        id: "8BRPoH"
      }
    ),
    address_line_1: i18n._(
      /*i18n*/
      {
        id: "HR/cvw"
      }
    )
  };
  const resolved = resolveEventLocation(event, null);
  const resolvedEventLocation = (resolved == null ? void 0 : resolved.type) === LocationType.InPerson && resolved.location ? resolved : {
    id: 0,
    type: LocationType.InPerson,
    location: {
      name: fallbackLocationDetails.venue_name,
      structured_address: fallbackLocationDetails
    }
  };
  const eventWithDesignSettings = {
    ...event,
    event_location: resolvedEventLocation,
    settings: {
      ...event.settings,
      ticket_design_settings: {
        accent_color: settings.accent_color,
        logo_image_id: settings.logo_image_id,
        footer_text: settings.footer_text,
        date_display_mode: settings.date_display_mode,
        enabled: settings.enabled
      }
    },
    images: logoUrl && settings.logo_image_id ? [...(event.images || []).filter((img) => img.type !== "TICKET_LOGO"), {
      id: settings.logo_image_id,
      type: "TICKET_LOGO",
      url: logoUrl,
      size_bytes: 0,
      filename: ""
    }] : (event.images || []).filter((img) => img.type !== "TICKET_LOGO")
  };
  return /* @__PURE__ */ jsx("div", { className: classes.previewWrapper, children: /* @__PURE__ */ jsx(AttendeeTicket, { event: eventWithDesignSettings, attendee: mockAttendee, product: mockProduct, hideButtons: true }) });
};
const TicketDesigner = () => {
  var _a, _b;
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const eventImagesQuery = useGetEventImages(eventId);
  const updateMutation = useUpdateEventSettings();
  const [accordionValue, setAccordionValue] = useState(["design"]);
  const existingLogo = (_a = eventImagesQuery.data) == null ? void 0 : _a.find((image) => image.type === "TICKET_LOGO");
  const form = useForm({
    initialValues: {
      accent_color: "#333333",
      logo_image_id: void 0,
      footer_text: "",
      date_display_mode: "START_DATE_TIME",
      enabled: true
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    var _a2;
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && ((_a2 = eventSettingsQuery == null ? void 0 : eventSettingsQuery.data) == null ? void 0 : _a2.ticket_design_settings)) {
      const settings = eventSettingsQuery.data.ticket_design_settings;
      form.setValues({
        accent_color: settings.accent_color || "#333333",
        logo_image_id: settings.logo_image_id || void 0,
        footer_text: settings.footer_text || "",
        date_display_mode: settings.date_display_mode || "START_DATE_TIME",
        enabled: settings.enabled !== false
      });
    }
  }, [eventSettingsQuery.isFetched]);
  useEffect(() => {
    if (existingLogo == null ? void 0 : existingLogo.id) {
      form.setFieldValue("logo_image_id", existingLogo.id);
    } else {
      form.setFieldValue("logo_image_id", null);
    }
  }, [existingLogo == null ? void 0 : existingLogo.id]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: {
        ticket_design_settings: {
          accent_color: values.accent_color,
          logo_image_id: values.logo_image_id,
          footer_text: values.footer_text || void 0,
          date_display_mode: values.date_display_mode,
          enabled: values.enabled
        }
      },
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "EZC/Cu"
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
  };
  if (eventSettingsQuery.isLoading || eventImagesQuery.isLoading) {
    return /* @__PURE__ */ jsx(LoadingMask, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: classes$1.container, children: [
    /* @__PURE__ */ jsx("div", { className: classes$1.sidebar, children: /* @__PURE__ */ jsxs("div", { className: classes$1.sticky, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.header, children: [
        /* @__PURE__ */ jsx("h2", { children: i18n._(
          /*i18n*/
          {
            id: "0GSPnc"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: i18n._(
          /*i18n*/
          {
            id: "CUKVDt"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: updateMutation.isPending, className: classes$1.fieldset, children: [
        /* @__PURE__ */ jsx(Accordion, { multiple: true, value: accordionValue, onChange: setAccordionValue, variant: "contained", className: classes$1.accordion, children: /* @__PURE__ */ jsxs(Accordion.Item, { value: "design", className: classes$1.accordionItem, children: [
          /* @__PURE__ */ jsx(Accordion.Control, { icon: /* @__PURE__ */ jsx(IconColorSwatch, { size: 20 }), children: /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "NvuEhl"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ColorInput, { format: "hexa", label: i18n._(
              /*i18n*/
              {
                id: "1uJlG9"
              }
            ), description: i18n._(
              /*i18n*/
              {
                id: "rnoQsz"
              }
            ), size: "sm", ...form.getInputProps("accent_color") }) }),
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
                    id: "IfN2Qo"
                  }
                ), children: /* @__PURE__ */ jsx(IconHelp, { size: 16, style: {
                  color: "var(--mantine-color-gray-6)"
                } }) })
              ] }),
              /* @__PURE__ */ jsx(ImageUploadDropzone, { imageType: "TICKET_LOGO", entityId: eventId, onUploadSuccess: handleImageChange, onDeleteSuccess: handleImageChange, existingImageData: {
                url: existingLogo == null ? void 0 : existingLogo.url,
                id: existingLogo == null ? void 0 : existingLogo.id
              }, helpText: i18n._(
                /*i18n*/
                {
                  id: "Jzu30R"
                }
              ), displayMode: "compact" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Textarea, { label: i18n._(
                /*i18n*/
                {
                  id: "nFm+5u"
                }
              ), description: i18n._(
                /*i18n*/
                {
                  id: "HXMJxH"
                }
              ), placeholder: i18n._(
                /*i18n*/
                {
                  id: "nm3Iz/"
                }
              ), rows: 2, maxLength: 500, ...form.getInputProps("footer_text"), onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }, onChange: (e) => {
                const value = e.currentTarget.value.replace(/\n/g, " ");
                form.setFieldValue("footer_text", value);
              } }),
              /* @__PURE__ */ jsxs(Text, { size: "xs", c: "dimmed", ta: "right", mt: 4, children: [
                ((_b = form.values.footer_text) == null ? void 0 : _b.length) || 0,
                " / 500"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Select, { label: i18n._(
              /*i18n*/
              {
                id: "+v+GW0"
              }
            ), description: i18n._(
              /*i18n*/
              {
                id: "Z38ZJu"
              }
            ), size: "sm", allowDeselect: false, data: [{
              value: "START_DATE_TIME",
              label: i18n._(
                /*i18n*/
                {
                  id: "wkpaqp"
                }
              )
            }, {
              value: "DATE_RANGE",
              label: i18n._(
                /*i18n*/
                {
                  id: "4LZFir"
                }
              )
            }, {
              value: "HIDDEN",
              label: i18n._(
                /*i18n*/
                {
                  id: "g9RcYX"
                }
              )
            }], ...form.getInputProps("date_display_mode") }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx(Stack, { gap: "sm", mt: "xl", children: /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, disabled: !form.isDirty(), children: i18n._(
          /*i18n*/
          {
            id: "C8ne4X"
          }
        ) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.preview, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.previewHeader, children: [
        /* @__PURE__ */ jsx("h3", { children: i18n._(
          /*i18n*/
          {
            id: "rdUucN"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", leftSection: /* @__PURE__ */ jsx(IconPrinter, { size: 14 }), onClick: () => window == null ? void 0 : window.open(`/manage/event/${eventId}/ticket-designer/print`, "_blank"), children: i18n._(
          /*i18n*/
          {
            id: "ReihZ7"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes$1.previewContent, children: /* @__PURE__ */ jsx(TicketPreview, { settings: form.values, eventId, logoUrl: existingLogo == null ? void 0 : existingLogo.url }) })
    ] })
  ] });
};
export {
  TicketDesigner as default
};

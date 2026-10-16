import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { TextInput, Select, Button, Switch, NumberInput, Stack, Paper, Text, Checkbox, Card as Card$1, NavLink as NavLink$1, Group, Box } from "@mantine/core";
import { IconCalendarRepeat, IconUsers, IconUser, IconCoins, IconCoin, IconTrash, IconArrowBackUp, IconArchive, IconBuildingStore, IconMapPin, IconHome, IconRepeat, IconBrandGoogleAnalytics, IconAt, IconAdjustments, IconListCheck, IconCreditCard, IconAlertTriangle, IconPercentage } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useParams, NavLink, useNavigate } from "react-router";
import { G as GET_EVENT_QUERY_KEY, u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { useEffect, useState, useMemo } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { h as eventsClient, K as isEmptyHtml } from "../entry.server.js";
import { E as EventType, L as LocationType, b as EventStatus } from "./types-CqPWB-a5.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { u as utcToTz } from "./dates-CbVpwZeX.js";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { c as currenciesMap } from "./currencies-wzczGcKi.js";
import { t as timezones } from "./timezones-CsvfI1Rm.js";
import { H as HeadingWithDescription } from "./index-encY-Si0.js";
import { g as getEventCategories } from "./eventCategories-BcVMR4Oy.js";
import { u as useUpdateEventSettings } from "./useUpdateEventSettings-BRZqoL7m.js";
import { u as useGetEventSettings, e as eventsSettingsClient } from "./useGetEventSettings-DQ44UzoW.js";
import { i as isAddressSet, s as sameAddress } from "./addressUtilities-7xIQim0X.js";
import { L as LocationPicker } from "./index-iW6667X7.js";
import { u as useCreateLocation } from "./useCreateLocation-DZ93UmD2.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { g as useGetEmailTemplatesForEvent, a as useGetDefaultEmailTemplates, h as useCreateEmailTemplateForEvent, i as useUpdateEmailTemplateForEvent, j as useDeleteEmailTemplateForEvent, k as usePreviewEmailTemplateForEvent, E as EmailTemplateSettingsBase, S as SelfServiceSettings, L as LiquidTokenControl, P as PlatformFeesSettings$1, D as DangerZone, f as DangerZoneSection } from "./index-i3GvAOHd.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { useMediaQuery } from "@mantine/hooks";
import { I as InputLabelWithHelp } from "./index-R0GQzPHn.js";
import { u as useGetOrganizer } from "./useGetOrganizer-DMDsW5DW.js";
import { G as GET_EVENTS_QUERY_KEY } from "./useGetEvents-CRE3yVbY.js";
import { u as useUpdateEventStatus } from "./useUpdateEventStatus-Ck9Vcq_R.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { u as useIsCurrentUserAdmin } from "./useIsCurrentUserAdmin-DKXhmYit.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./countries-C8-MXWCy.js";
import "./useGeoStatus-GfcfS0IW.js";
import "./currency-Br7a8J7F.js";
import "./index-CoMrHZbF.js";
const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventData,
      eventId
    }) => eventsClient.update(eventId, eventData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const EventDetailsForm = () => {
  var _a, _b;
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const updateMutation = useUpdateEvent();
  const isRecurring = ((_a = eventQuery.data) == null ? void 0 : _a.type) === EventType.RECURRING;
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      timezone: "",
      currency: "",
      category: ""
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if (eventQuery == null ? void 0 : eventQuery.data) {
      form.setValues({
        title: eventQuery.data.title,
        description: eventQuery.data.description,
        start_date: utcToTz(eventQuery.data.start_date, eventQuery.data.timezone),
        end_date: utcToTz(eventQuery.data.end_date, eventQuery.data.timezone),
        timezone: eventQuery.data.timezone,
        currency: eventQuery.data.currency,
        category: eventQuery.data.category
      });
    }
  }, [eventQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventData: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "7kOMfV"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "QcCPs8"
      }
    ), description: isRecurring ? i18n._(
      /*i18n*/
      {
        id: "Gaem9v"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "+qqX74"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("title"), label: i18n._(
        /*i18n*/
        {
          id: "6YtxFj"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "/RfJXt",
          values: {
            0: (/* @__PURE__ */ new Date()).getFullYear()
          }
        }
      ), required: true }),
      /* @__PURE__ */ jsx(Select, { ...form.getInputProps("category"), label: i18n._(
        /*i18n*/
        {
          id: "K7tIrx"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "p7xUrt"
        }
      ), data: getEventCategories().map((category) => ({
        value: category.id,
        label: `${category.emoji} ${category.name}`
      })), searchable: true, clearable: true }),
      /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "Nu4oKW"
        }
      ), value: form.values.description || "", onChange: (value) => form.setFieldValue("description", value), error: (_b = form.errors) == null ? void 0 : _b.description }),
      isRecurring ? /* @__PURE__ */ jsxs(Callout, { variant: "info", title: i18n._(
        /*i18n*/
        {
          id: "Te33mU"
        }
      ), children: [
        i18n._(
          /*i18n*/
          {
            id: "pIwDhS"
          }
        ),
        /* @__PURE__ */ jsx("div", { style: {
          marginTop: "0.75rem"
        }, children: /* @__PURE__ */ jsx(Button, { component: NavLink, to: "/manage/event/" + eventId + "/occurrences", leftSection: /* @__PURE__ */ jsx(IconCalendarRepeat, { size: 16 }), variant: "light", children: i18n._(
          /*i18n*/
          {
            id: "sjoDuh"
          }
        ) }) })
      ] }) : /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("start_date"), label: i18n._(
          /*i18n*/
          {
            id: "D3iCkb"
          }
        ), required: true }),
        /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("end_date"), label: i18n._(
          /*i18n*/
          {
            id: "VFv2ZC"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(Select, { searchable: true, data: currenciesMap, ...form.getInputProps("currency"), label: i18n._(
          /*i18n*/
          {
            id: "Q2lUR2"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "5/63nR"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "k3LFkM"
          }
        ) }),
        /* @__PURE__ */ jsx(Select, { searchable: true, data: timezones, ...form.getInputProps("timezone"), label: i18n._(
          /*i18n*/
          {
            id: "40Gx0U"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "vgwVkd"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "qpmtdK"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const useUpdateEventLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      eventLocation,
      clearEventLocation
    }) => eventsClient.updateEventLocation(eventId, {
      event_location: eventLocation ?? null,
      clear_event_location: clearEventLocation ?? false
    }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const LocationSettings = () => {
  var _a;
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateSettingsMutation = useUpdateEventSettings();
  const updateEventLocationMutation = useUpdateEventLocation();
  const createLocationMutation = useCreateLocation();
  const event = eventQuery.data;
  const organizerId = ((_a = event == null ? void 0 : event.organizer) == null ? void 0 : _a.id) ?? (event == null ? void 0 : event.organizer_id);
  const form = useForm({
    initialValues: {
      location: null,
      is_online_event: false,
      online_event_connection_details: "",
      maps_url: ""
    },
    validate: {
      online_event_connection_details: (value, values) => {
        if (values.is_online_event && (!value || isEmptyHtml(value))) {
          return i18n._(
            /*i18n*/
            {
              id: "fjfBOm"
            }
          );
        }
        return null;
      },
      location: (value, values) => {
        if (values.is_online_event) {
          return null;
        }
        if (!value || value.kind === "new" && !isAddressSet(value.address)) {
          return i18n._(
            /*i18n*/
            {
              id: "ppwojw"
            }
          );
        }
        return null;
      }
    },
    transformValues: (values) => ({
      ...values,
      online_event_connection_details: isEmptyHtml(values.online_event_connection_details) ? null : values.online_event_connection_details
    })
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && eventSettingsQuery.data && eventQuery.isFetched && eventQuery.data) {
      const eventLocation = event == null ? void 0 : event.event_location;
      form.setValues({
        location: (eventLocation == null ? void 0 : eventLocation.location_id) && eventLocation.location ? {
          kind: "saved",
          location: eventLocation.location
        } : null,
        is_online_event: (eventLocation == null ? void 0 : eventLocation.type) === LocationType.Online,
        online_event_connection_details: (eventLocation == null ? void 0 : eventLocation.online_event_connection_details) ?? "",
        maps_url: eventSettingsQuery.data.maps_url || ""
      });
    }
  }, [eventSettingsQuery.isFetched, eventQuery.isFetched]);
  const resolveLocationId = async (value) => {
    var _a2, _b, _c;
    if (value.kind === "saved") {
      return value.location.id ? Number(value.location.id) : null;
    }
    if (!organizerId || !isAddressSet(value.address)) {
      return null;
    }
    const existingLocationId = ((_a2 = event == null ? void 0 : event.event_location) == null ? void 0 : _a2.location_id) ?? null;
    const existingAddress = ((_c = (_b = event == null ? void 0 : event.event_location) == null ? void 0 : _b.location) == null ? void 0 : _c.structured_address) ?? null;
    if (existingLocationId !== null && existingAddress !== null && sameAddress(existingAddress, value.address)) {
      return existingLocationId;
    }
    const created = await createLocationMutation.mutateAsync({
      organizerId,
      payload: {
        name: value.address.venue_name || null,
        structured_address: value.address,
        latitude: value.latitude,
        longitude: value.longitude,
        provider: value.provider,
        provider_place_id: value.providerPlaceId
      }
    });
    return created.data.id ?? null;
  };
  const handleSubmit = async (values) => {
    if (!eventId || !event) return;
    try {
      if (values.is_online_event) {
        await updateEventLocationMutation.mutateAsync({
          eventId,
          eventLocation: {
            type: LocationType.Online,
            online_event_connection_details: values.online_event_connection_details ?? null
          }
        });
      } else {
        const locationIdForEvent = values.location ? await resolveLocationId(values.location) : null;
        if (locationIdForEvent === null) {
          showError(i18n._(
            /*i18n*/
            {
              id: "ppwojw"
            }
          ));
          return;
        }
        await updateEventLocationMutation.mutateAsync({
          eventId,
          eventLocation: {
            type: LocationType.InPerson,
            location_id: locationIdForEvent
          }
        });
      }
      await updateSettingsMutation.mutateAsync({
        eventSettings: {
          maps_url: values.maps_url
        },
        eventId
      });
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "y/NR6s"
        }
      ));
    } catch (error) {
      formErrorHandle(form, error);
    }
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "wJijgU"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "ClwUUD"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventSettingsQuery.isLoading || updateSettingsMutation.isPending || createLocationMutation.isPending || updateEventLocationMutation.isPending, children: [
      /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("is_online_event", {
        type: "checkbox"
      }), label: i18n._(
        /*i18n*/
        {
          id: "CNk/ro"
        }
      ) }),
      form.values.is_online_event && /* @__PURE__ */ jsx(Editor, { value: form.values.online_event_connection_details || "", error: form.errors.online_event_connection_details, label: i18n._(
        /*i18n*/
        {
          id: "5lcVkL"
        }
      ), description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: i18n._(
          /*i18n*/
          {
            id: "kO44sp"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { children: i18n._(
          /*i18n*/
          {
            id: "5Eu+tn"
          }
        ) })
      ] }), onChange: (value) => form.setFieldValue("online_event_connection_details", value) }),
      !form.values.is_online_event && organizerId && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(LocationPicker, { organizerId, value: form.values.location, onChange: (value) => form.setFieldValue("location", value), error: form.errors.location }),
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("maps_url"), description: i18n._(
          /*i18n*/
          {
            id: "W/eN+G"
          }
        ), label: i18n._(
          /*i18n*/
          {
            id: "uIElGP"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "fYyXCd"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Button, { loading: updateSettingsMutation.isPending || createLocationMutation.isPending || updateEventLocationMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const HomepageAndCheckoutSettings = () => {
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateMutation = useUpdateEventSettings();
  const form = useForm({
    initialValues: {
      pre_checkout_message: "",
      post_checkout_message: "",
      order_timeout_in_minutes: 15,
      attendee_details_collection_method: "PER_TICKET",
      show_marketing_opt_in: true,
      allow_copy_details_to_all_attendees: true
    },
    transformValues: (values) => ({
      ...values,
      pre_checkout_message: isEmptyHtml(values.pre_checkout_message) ? null : values.pre_checkout_message,
      post_checkout_message: isEmptyHtml(values.post_checkout_message) ? null : values.post_checkout_message
    })
  });
  const attendeeCollectionOptions = [{
    icon: /* @__PURE__ */ jsx(IconUsers, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "hauDFf"
      }
    ),
    value: "PER_TICKET",
    description: i18n._(
      /*i18n*/
      {
        id: "4bUH9i"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconUser, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "VlXNyK"
      }
    ),
    value: "PER_ORDER",
    description: i18n._(
      /*i18n*/
      {
        id: "0k4cdb"
      }
    )
  }];
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      form.setValues({
        pre_checkout_message: eventSettingsQuery.data.pre_checkout_message,
        post_checkout_message: eventSettingsQuery.data.post_checkout_message,
        order_timeout_in_minutes: eventSettingsQuery.data.order_timeout_in_minutes,
        attendee_details_collection_method: eventSettingsQuery.data.attendee_details_collection_method || "PER_TICKET",
        show_marketing_opt_in: eventSettingsQuery.data.show_marketing_opt_in ?? true,
        allow_copy_details_to_all_attendees: eventSettingsQuery.data.allow_copy_details_to_all_attendees ?? true
      });
    }
  }, [eventSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "k9m6/E"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "1WnhCL"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "Y9Z/vP"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "Rs7IQv"
        }
      ), value: form.values.pre_checkout_message || "", description: i18n._(
        /*i18n*/
        {
          id: "YfHZv0"
        }
      ), onChange: (value) => form.setFieldValue("pre_checkout_message", value) }),
      /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "qCJyMx"
        }
      ), value: form.values.post_checkout_message || "", description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: i18n._(
          /*i18n*/
          {
            id: "1SbbH8"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { children: i18n._(
          /*i18n*/
          {
            id: "55i7Fa"
          }
        ) })
      ] }), onChange: (value) => form.setFieldValue("post_checkout_message", value) }),
      /* @__PURE__ */ jsx(CustomSelect, { optionList: attendeeCollectionOptions, form, name: "attendee_details_collection_method", label: i18n._(
        /*i18n*/
        {
          id: "KkrBiR"
        }
      ), required: true }),
      /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
        /*i18n*/
        {
          id: "tDTq0D"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "8k8Njd"
        }
      ), ...form.getInputProps("order_timeout_in_minutes") }),
      /* @__PURE__ */ jsx(Switch, { mt: "md", label: i18n._(
        /*i18n*/
        {
          id: "Eu/N/d"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "BREO0S"
        }
      ), ...form.getInputProps("show_marketing_opt_in", {
        type: "checkbox"
      }) }),
      /* @__PURE__ */ jsx(Switch, { mt: "md", label: i18n._(
        /*i18n*/
        {
          id: "VZdky1"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "pm9tpn"
        }
      ), ...form.getInputProps("allow_copy_details_to_all_attendees", {
        type: "checkbox"
      }) }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const GeneralEmailSettings = () => {
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateMutation = useUpdateEventSettings();
  const form = useForm({
    initialValues: {
      support_email: "",
      email_footer_message: "",
      notify_organizer_of_new_orders: true
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      form.setValues({
        support_email: eventSettingsQuery.data.support_email,
        email_footer_message: eventSettingsQuery.data.email_footer_message,
        notify_organizer_of_new_orders: eventSettingsQuery.data.notify_organizer_of_new_orders
      });
    }
  }, [eventSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "vzJenu"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "VxYKoK"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "QOg2Sf"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("support_email"), description: i18n._(
        /*i18n*/
        {
          id: "ubdMGz"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "GNcfRk"
        }
      ) }),
      /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "jyt+cx"
        }
      ), value: form.values.email_footer_message || "", description: i18n._(
        /*i18n*/
        {
          id: "cHO4ec"
        }
      ), onChange: (value) => form.setFieldValue("email_footer_message", value) }),
      /* @__PURE__ */ jsx("h3", { children: i18n._(
        /*i18n*/
        {
          id: "hFwWnI"
        }
      ) }),
      /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("notify_organizer_of_new_orders", {
        type: "checkbox"
      }), label: i18n._(
        /*i18n*/
        {
          id: "YpN29s"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "muXhGi"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const TemplateSettings = () => {
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const [shouldFetchDefaults, setShouldFetchDefaults] = useState(false);
  const {
    data: templatesData,
    isLoading
  } = useGetEmailTemplatesForEvent(eventId, {
    include_inactive: true
  });
  const {
    data: defaultTemplatesData
  } = useGetDefaultEmailTemplates(shouldFetchDefaults);
  const createMutation = useCreateEmailTemplateForEvent();
  const updateMutation = useUpdateEmailTemplateForEvent();
  const deleteMutation = useDeleteEmailTemplateForEvent();
  const previewMutation = usePreviewEmailTemplateForEvent();
  const templates = (templatesData == null ? void 0 : templatesData.data) || [];
  const handleCreateTemplate = () => {
    if (!defaultTemplatesData) {
      setShouldFetchDefaults(true);
    }
  };
  return /* @__PURE__ */ jsx(EmailTemplateSettingsBase, { contextId: eventId, contextType: "event", templates, defaultTemplates: defaultTemplatesData, isLoading, createMutation, updateMutation, deleteMutation, previewMutation, onCreateTemplate: handleCreateTemplate, eventType: event == null ? void 0 : event.type });
};
const EmailSettings = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(GeneralEmailSettings, {}),
    /* @__PURE__ */ jsx(TemplateSettings, {})
  ] });
};
const SeoSettings = () => {
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateMutation = useUpdateEventSettings();
  const form = useForm({
    initialValues: {
      allow_search_engine_indexing: true,
      seo_title: "",
      seo_description: "",
      seo_keywords: ""
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      form.setValues({
        allow_search_engine_indexing: eventSettingsQuery.data.allow_search_engine_indexing,
        seo_title: eventSettingsQuery.data.seo_title,
        seo_description: eventSettingsQuery.data.seo_description,
        seo_keywords: eventSettingsQuery.data.seo_keywords
      });
    }
  }, [eventSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "F+pJnL"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "GfWoKv"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "iJhSxe"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("seo_title"), description: i18n._(
        /*i18n*/
        {
          id: "esY5SG"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "rXngLf"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "vX8/tc"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("seo_description"), description: i18n._(
        /*i18n*/
        {
          id: "h179TP"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "j1VfcT"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "/bhMdO"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("seo_keywords"), description: i18n._(
        /*i18n*/
        {
          id: "yPI7n9"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "/SIY6o"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "ApOYO8"
        }
      ) }),
      /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("allow_search_engine_indexing", {
        type: "checkbox"
      }), description: i18n._(
        /*i18n*/
        {
          id: "LRbt6D"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "ipYKgM"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const MiscSettings = () => {
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateMutation = useUpdateEventSettings();
  const form = useForm({
    initialValues: {
      price_display_mode: "EXCLUSIVE",
      allow_attendee_self_edit: false
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      form.setValues({
        price_display_mode: eventSettingsQuery.data.price_display_mode,
        allow_attendee_self_edit: eventSettingsQuery.data.allow_attendee_self_edit ?? false
      });
    }
  }, [eventSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "73nxDO"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  const priceOptions = [{
    icon: /* @__PURE__ */ jsx(IconCoins, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "FlQKnG"
      }
    ),
    value: "INCLUSIVE",
    description: i18n._(
      /*i18n*/
      {
        id: "MSmKHn"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconCoin, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "izwOOD"
      }
    ),
    value: "EXCLUSIVE",
    description: i18n._(
      /*i18n*/
      {
        id: "6zQOg1"
      }
    )
  }];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "mYLhkl"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "2E2O5H"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(CustomSelect, { optionList: priceOptions, form, name: "price_display_mode", label: i18n._(
        /*i18n*/
        {
          id: "CmoB9j"
        }
      ), required: true }),
      form.errors["price_display_mode"] && /* @__PURE__ */ jsx("div", { style: {
        color: "red"
      }, children: form.errors["price_display_mode"] }),
      /* @__PURE__ */ jsx(SelfServiceSettings, { value: form.values.allow_attendee_self_edit, onChange: (value) => form.setFieldValue("allow_attendee_self_edit", value) }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const PaymentAndInvoicingSettings = () => {
  var _a;
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateMutation = useUpdateEventSettings();
  const form = useForm({
    initialValues: {
      require_billing_address: true,
      payment_providers: [],
      offline_payment_instructions: "",
      allow_orders_awaiting_offline_payment_to_check_in: false,
      enable_invoicing: false,
      invoice_label: "",
      invoice_prefix: "",
      invoice_start_number: 1,
      organization_name: "",
      organization_address: "",
      invoice_tax_details: "",
      invoice_payment_terms_days: null,
      invoice_notes: ""
    },
    transformValues: (values) => ({
      ...values,
      payment_providers: Array.isArray(values.payment_providers) ? values.payment_providers : [],
      offline_payment_instructions: isEmptyHtml(values.offline_payment_instructions) ? null : values.offline_payment_instructions,
      invoice_notes: isEmptyHtml(values.invoice_notes) ? null : values.invoice_notes,
      invoice_tax_details: isEmptyHtml(values.invoice_tax_details) ? null : values.invoice_tax_details
    })
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      form.setValues({
        payment_providers: eventSettingsQuery.data.payment_providers || [],
        offline_payment_instructions: eventSettingsQuery.data.offline_payment_instructions || "",
        allow_orders_awaiting_offline_payment_to_check_in: eventSettingsQuery.data.allow_orders_awaiting_offline_payment_to_check_in || false,
        enable_invoicing: eventSettingsQuery.data.enable_invoicing || false,
        invoice_label: eventSettingsQuery.data.invoice_label || "",
        invoice_prefix: eventSettingsQuery.data.invoice_prefix || "",
        invoice_payment_terms_days: eventSettingsQuery.data.invoice_payment_terms_days || null,
        invoice_notes: eventSettingsQuery.data.invoice_notes || "",
        invoice_start_number: eventSettingsQuery.data.invoice_start_number || 1,
        require_billing_address: eventSettingsQuery.data.require_billing_address ?? true,
        organization_name: eventSettingsQuery.data.organization_name || "",
        organization_address: eventSettingsQuery.data.organization_address || "",
        invoice_tax_details: eventSettingsQuery.data.invoice_tax_details || ""
      });
    }
  }, [eventSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "6xCBVN"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  const paymentOptions = [{
    value: "STRIPE",
    label: i18n._(
      /*i18n*/
      {
        id: "4HXezG"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "hrvLf4"
      }
    )
  }, {
    value: "OFFLINE",
    label: i18n._(
      /*i18n*/
      {
        id: "+eZ7dp"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "3pykXZ"
      }
    )
  }];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "DZjk8u"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "1MAvUY"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsx("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, children: /* @__PURE__ */ jsxs(Stack, { gap: "xl", children: [
      /* @__PURE__ */ jsxs(Paper, { withBorder: true, p: "md", radius: "md", children: [
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 500, mb: "md", children: i18n._(
          /*i18n*/
          {
            id: "bLB3MJ"
          }
        ) }),
        paymentOptions.map((option) => {
          var _a2;
          return /* @__PURE__ */ jsx(Checkbox, { label: option.label, description: option.description, checked: (_a2 = form.values.payment_providers) == null ? void 0 : _a2.includes(option.value), onChange: (event) => {
            const checked = event.currentTarget.checked;
            const currentValues = form.values.payment_providers || [];
            form.setFieldValue("payment_providers", checked ? [...currentValues, option.value] : currentValues.filter((v) => v !== option.value));
          }, mb: "sm" }, option.value);
        }),
        form.errors["payment_providers"] && /* @__PURE__ */ jsx(Text, { c: "red", children: form.errors["payment_providers"] }),
        ((_a = form.values.payment_providers) == null ? void 0 : _a.includes("OFFLINE")) && /* @__PURE__ */ jsxs(Card, { style: {
          boxShadow: "none",
          marginTop: "20px"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            marginTop: "5px",
            marginBottom: "10px"
          }, children: i18n._(
            /*i18n*/
            {
              id: "u5oO/W"
            }
          ) }),
          /* @__PURE__ */ jsxs(Card$1, { shadow: "sm", padding: "lg", radius: "md", withBorder: true, mb: "md", children: [
            /* @__PURE__ */ jsx("h4", { style: {
              margin: 0,
              fontWeight: "normal"
            }, children: i18n._(
              /*i18n*/
              {
                id: "ojDQlR"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { size: "sm", mt: "xs", children: i18n._(
              /*i18n*/
              {
                id: "D3opg4"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { size: "sm", mt: "xs", children: i18n._(
              /*i18n*/
              {
                id: "Egnj9d"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { size: "sm", mt: "xs", children: i18n._(
              /*i18n*/
              {
                id: "mwe+2z"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Editor, { editorType: "simple", value: form.values.offline_payment_instructions, error: form.errors.offline_payment_instructions, label: /* @__PURE__ */ jsx(InputLabelWithHelp, { label: i18n._(
            /*i18n*/
            {
              id: "fcnqjw"
            }
          ), helpText: i18n._(
            /*i18n*/
            {
              id: "MMd2TJ"
            }
          ) }), description: i18n._(
            /*i18n*/
            {
              id: "OveehC"
            }
          ), onChange: (value) => form.setFieldValue("offline_payment_instructions", value), additionalToolbarControls: /* @__PURE__ */ jsx(LiquidTokenControl, { templateType: "order_confirmation", excludeTokens: ["{{ settings.offline_payment_instructions }}", "{{ settings.post_checkout_message }}"] }) }),
          /* @__PURE__ */ jsx(Switch, { label: i18n._(
            /*i18n*/
            {
              id: "5CQ+r0"
            }
          ), description: i18n._(
            /*i18n*/
            {
              id: "UYT+c8"
            }
          ), checked: form.values.allow_orders_awaiting_offline_payment_to_check_in, ...form.getInputProps("allow_orders_awaiting_offline_payment_to_check_in", {
            type: "checkbox"
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Paper, { withBorder: true, p: "md", radius: "md", children: [
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 500, mb: "md", children: i18n._(
          /*i18n*/
          {
            id: "/xC/im"
          }
        ) }),
        /* @__PURE__ */ jsx(Switch, { label: i18n._(
          /*i18n*/
          {
            id: "prZGMe"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "NJahlc"
          }
        ), checked: form.values.require_billing_address, onChange: (event) => form.setFieldValue("require_billing_address", event.currentTarget.checked) })
      ] }),
      /* @__PURE__ */ jsxs(Paper, { withBorder: true, p: "md", radius: "md", children: [
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 500, mb: "md", children: i18n._(
          /*i18n*/
          {
            id: "UZ2GSZ"
          }
        ) }),
        /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsx(Switch, { label: i18n._(
            /*i18n*/
            {
              id: "8oPbg1"
            }
          ), description: i18n._(
            /*i18n*/
            {
              id: "gyLUYU"
            }
          ), checked: form.values.enable_invoicing, onChange: (event) => form.setFieldValue("enable_invoicing", event.currentTarget.checked) }),
          form.values.enable_invoicing && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(TextInput, { label: i18n._(
              /*i18n*/
              {
                id: "DZlSLn"
              }
            ), description: i18n._(
              /*i18n*/
              {
                id: "enV0g0"
              }
            ), placeholder: "Invoice", ...form.getInputProps("invoice_label") }),
            /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
              /* @__PURE__ */ jsx("h4", { style: {
                margin: 0
              }, children: i18n._(
                /*i18n*/
                {
                  id: "kOtCs2"
                }
              ) }),
              /* @__PURE__ */ jsx(TextInput, { label: i18n._(
                /*i18n*/
                {
                  id: "n86jmj"
                }
              ), description: i18n._(
                /*i18n*/
                {
                  id: "OrXJBY"
                }
              ), placeholder: "INV-", ...form.getInputProps("invoice_prefix") }),
              /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
                /*i18n*/
                {
                  id: "wPmXlA"
                }
              ), description: i18n._(
                /*i18n*/
                {
                  id: "L0pJmz"
                }
              ), min: 1, ...form.getInputProps("invoice_start_number") })
            ] }),
            /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
              /* @__PURE__ */ jsx("h4", { style: {
                margin: 0
              }, children: i18n._(
                /*i18n*/
                {
                  id: "R29lO5"
                }
              ) }),
              /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
                /*i18n*/
                {
                  id: "lflimf"
                }
              ), description: i18n._(
                /*i18n*/
                {
                  id: "omyBS0"
                }
              ), placeholder: "30", min: 0, max: 365, ...form.getInputProps("invoice_payment_terms_days") })
            ] }),
            /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
              /* @__PURE__ */ jsx("h4", { style: {
                margin: 0
              }, children: i18n._(
                /*i18n*/
                {
                  id: "GVcaW6"
                }
              ) }),
              /* @__PURE__ */ jsx(TextInput, { label: i18n._(
                /*i18n*/
                {
                  id: "nfnm9D"
                }
              ), placeholder: "Your Company Ltd", ...form.getInputProps("organization_name") }),
              /* @__PURE__ */ jsx(Editor, { value: form.values.organization_address, label: i18n._(
                /*i18n*/
                {
                  id: "3y+V4p"
                }
              ), onChange: (value) => form.setFieldValue("organization_address", value), error: form.errors.organization_address, editorType: "simple" }),
              /* @__PURE__ */ jsx(Editor, { value: form.values.invoice_tax_details, label: i18n._(
                /*i18n*/
                {
                  id: "dFHcIn"
                }
              ), description: i18n._(
                /*i18n*/
                {
                  id: "wQzCPX"
                }
              ), onChange: (value) => form.setFieldValue("invoice_tax_details", value), error: form.errors.invoice_tax_details, editorType: "simple" }),
              /* @__PURE__ */ jsx(Editor, { value: form.values.invoice_notes, label: i18n._(
                /*i18n*/
                {
                  id: "alD1+n"
                }
              ), description: i18n._(
                /*i18n*/
                {
                  id: "oPknTP"
                }
              ), onChange: (value) => form.setFieldValue("invoice_notes", value), error: form.errors.invoice_notes, editorType: "simple" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) }) })
  ] });
};
const GET_PLATFORM_FEE_PREVIEW_QUERY_KEY = "getPlatformFeePreview";
const useGetPlatformFeePreview = (eventId, price) => {
  return useQuery({
    queryKey: [GET_PLATFORM_FEE_PREVIEW_QUERY_KEY, eventId, price],
    queryFn: async () => {
      return eventsSettingsClient.getPlatformFeePreview(eventId, price);
    },
    enabled: !!eventId && price > 0
  });
};
const PlatformFeesSettings = () => {
  var _a, _b;
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const eventQuery = useGetEvent(eventId);
  const organizerQuery = useGetOrganizer((_a = eventQuery.data) == null ? void 0 : _a.organizer_id);
  const updateMutation = useUpdateEventSettings();
  const [currentValue, setCurrentValue] = useState(false);
  const [previewPrice, setPreviewPrice] = useState(50);
  const feePreviewQuery = useGetPlatformFeePreview(eventId, previewPrice);
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      setCurrentValue(eventSettingsQuery.data.pass_platform_fee_to_buyer ?? false);
    }
  }, [eventSettingsQuery.isFetched, eventSettingsQuery.data]);
  const handleSave = (passToBuyer) => {
    updateMutation.mutate({
      eventSettings: {
        pass_platform_fee_to_buyer: passToBuyer
      },
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "URUYHc"
          }
        ));
        setCurrentValue(passToBuyer);
      }
    });
  };
  return /* @__PURE__ */ jsx(PlatformFeesSettings$1, { configuration: (_b = organizerQuery.data) == null ? void 0 : _b.configuration, currentValue, onSave: handleSave, isLoading: eventSettingsQuery.isLoading, isSaving: updateMutation.isPending, heading: i18n._(
    /*i18n*/
    {
      id: "br3Y/y"
    }
  ), description: i18n._(
    /*i18n*/
    {
      id: "p2FRHj"
    }
  ), feeHandlingLabel: i18n._(
    /*i18n*/
    {
      id: "/sV91a"
    }
  ), feeHandlingDescription: i18n._(
    /*i18n*/
    {
      id: "pjp2n5"
    }
  ), feePreview: feePreviewQuery.data, onPriceChange: setPreviewPrice });
};
const WaitlistSettings = () => {
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateMutation = useUpdateEventSettings();
  const form = useForm({
    initialValues: {
      waitlist_auto_process: false,
      waitlist_offer_timeout_minutes: null
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      form.setValues({
        waitlist_auto_process: eventSettingsQuery.data.waitlist_auto_process ?? false,
        waitlist_offer_timeout_minutes: eventSettingsQuery.data.waitlist_offer_timeout_minutes ?? null
      });
    }
  }, [eventSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "S8Tua9"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "u0n+wz"
      }
    ), description: isRecurring ? i18n._(
      /*i18n*/
      {
        id: "OIkHj+"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "9L9/28"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("waitlist_auto_process", {
        type: "checkbox"
      }), label: i18n._(
        /*i18n*/
        {
          id: "V7Tejz"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "zlnTuI"
        }
      ) }),
      /* @__PURE__ */ jsx(NumberInput, { ...form.getInputProps("waitlist_offer_timeout_minutes"), label: i18n._(
        /*i18n*/
        {
          id: "2O7Ybb"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "sy9anN"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "22xieU"
        }
      ), min: 1, max: 10080, suffix: ` ${i18n._(
        /*i18n*/
        {
          id: "H9HlDe"
        }
      )}`, mt: "md" }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", mt: "xl", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const RecurringEventSettings = () => {
  const {
    eventId
  } = useParams();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateMutation = useUpdateEventSettings();
  const form = useForm({
    initialValues: {
      show_available_occurrence_capacity: false,
      hide_sold_out_occurrences: false
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((eventSettingsQuery == null ? void 0 : eventSettingsQuery.isFetched) && (eventSettingsQuery == null ? void 0 : eventSettingsQuery.data)) {
      form.setValues({
        show_available_occurrence_capacity: eventSettingsQuery.data.show_available_occurrence_capacity ?? false,
        hide_sold_out_occurrences: eventSettingsQuery.data.hide_sold_out_occurrences ?? false
      });
    }
  }, [eventSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      eventSettings: values,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "kRWc2g"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "s3uzsK"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "s30OcA"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: eventSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(Switch, { mt: "md", label: i18n._(
        /*i18n*/
        {
          id: "jbcx6L"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "HtaSQp"
        }
      ), ...form.getInputProps("show_available_occurrence_capacity", {
        type: "checkbox"
      }) }),
      /* @__PURE__ */ jsx(Switch, { mt: "md", label: i18n._(
        /*i18n*/
        {
          id: "uXNYjR"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "IVZaEo"
        }
      ), ...form.getInputProps("hide_sold_out_occurrences", {
        type: "checkbox"
      }) }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const GET_EVENT_DELETION_STATUS_QUERY_KEY = "getEventDeletionStatus";
const useGetEventDeletionStatus = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_DELETION_STATUS_QUERY_KEY, eventId],
    staleTime: 0,
    queryFn: async () => {
      const {
        data
      } = await eventsClient.getDeletionStatus(eventId);
      return data;
    }
  });
};
const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId
    }) => eventsClient.delete(eventId),
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENTS_QUERY_KEY]
      })]);
    }
  });
};
const DangerZoneSettings = () => {
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const isAdmin = useIsCurrentUserAdmin();
  const {
    data: deletionStatus,
    isLoading: isDeletionStatusLoading
  } = useGetEventDeletionStatus(eventId);
  const {
    data: event
  } = useGetEvent(eventId);
  const deleteMutation = useDeleteEvent();
  const statusMutation = useUpdateEventStatus();
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const isArchived = (event == null ? void 0 : event.status) === EventStatus.ARCHIVED;
  const deleteConfirmationPhrase = i18n._(
    /*i18n*/
    {
      id: "HNlEFZ"
    }
  );
  const isDeleteConfirmed = deleteConfirmation.trim().toLocaleLowerCase() === deleteConfirmationPhrase.toLocaleLowerCase();
  const handleDelete = () => {
    var _a;
    const organizerId = (_a = event == null ? void 0 : event.organizer) == null ? void 0 : _a.id;
    deleteMutation.mutate({
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "7u9/DO"
          }
        ));
        navigate(`/manage/organizer/${organizerId}/events`);
      },
      onError: (error) => {
        var _a2, _b;
        showError(((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "rgoBnv"
          }
        ));
      }
    });
  };
  const handleArchiveToggle = () => {
    const newStatus = isArchived ? EventStatus.LIVE : EventStatus.ARCHIVED;
    const message = isArchived ? i18n._(
      /*i18n*/
      {
        id: "BjbocR"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "9cQBd6"
      }
    );
    confirmationDialog(message, () => {
      statusMutation.mutate({
        eventId,
        status: newStatus
      }, {
        onSuccess: () => {
          showSuccess(isArchived ? i18n._(
            /*i18n*/
            {
              id: "Hk9Ki/"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "ZD0XSb"
            }
          ));
        },
        onError: (error) => {
          var _a, _b;
          showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
            /*i18n*/
            {
              id: "i2PFQJ"
            }
          ));
        }
      });
    }, {
      confirm: isArchived ? i18n._(
        /*i18n*/
        {
          id: "yKu/3Y"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "B495Gs"
        }
      ),
      cancel: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      )
    });
  };
  if (!isAdmin) {
    return /* @__PURE__ */ jsx(DangerZone, { children: /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      padding: "20px 0"
    }, children: [
      /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "✋" }),
      /* @__PURE__ */ jsx("h3", { children: i18n._(
        /*i18n*/
        {
          id: "MKqSg4"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
        /*i18n*/
        {
          id: "NdOxqr"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(DangerZone, { children: [
    /* @__PURE__ */ jsx(DangerZoneSection, { title: i18n._(
      /*i18n*/
      {
        id: "io0G93"
      }
    ), description: (deletionStatus == null ? void 0 : deletionStatus.can_delete) ? i18n._(
      /*i18n*/
      {
        id: "fIp56F"
      }
    ) : (deletionStatus == null ? void 0 : deletionStatus.reason) || i18n._(
      /*i18n*/
      {
        id: "Z3FXyt"
      }
    ), action: /* @__PURE__ */ jsxs(Fragment, { children: [
      !isDeletionStatusLoading && !(deletionStatus == null ? void 0 : deletionStatus.can_delete) && /* @__PURE__ */ jsx(Callout, { variant: "info", style: {
        marginBottom: 8
      }, children: deletionStatus == null ? void 0 : deletionStatus.reason }),
      (deletionStatus == null ? void 0 : deletionStatus.can_delete) && /* @__PURE__ */ jsxs(Stack, { gap: "xs", maw: 400, children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "QytzQr"
          }
        ) }),
        /* @__PURE__ */ jsx(TextInput, { placeholder: deleteConfirmationPhrase, value: deleteConfirmation, onChange: (e) => setDeleteConfirmation(e.currentTarget.value) })
      ] }),
      /* @__PURE__ */ jsx(Button, { mt: "sm", color: "red", variant: "outline", "data-testid": "event-delete-button", onClick: handleDelete, loading: deleteMutation.isPending, disabled: !(deletionStatus == null ? void 0 : deletionStatus.can_delete) || isDeletionStatusLoading || !isDeleteConfirmed, leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 16 }), children: i18n._(
        /*i18n*/
        {
          id: "io0G93"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(DangerZoneSection, { title: isArchived ? i18n._(
      /*i18n*/
      {
        id: "RokrZf"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "5sNliy"
      }
    ), description: isArchived ? i18n._(
      /*i18n*/
      {
        id: "HFvFRb"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "E5eghW"
      }
    ), action: /* @__PURE__ */ jsx(Button, { color: isArchived ? "blue" : "orange", variant: "outline", onClick: handleArchiveToggle, loading: statusMutation.isPending, leftSection: isArchived ? /* @__PURE__ */ jsx(IconArrowBackUp, { size: 16 }) : /* @__PURE__ */ jsx(IconArchive, { size: 16 }), children: isArchived ? i18n._(
      /*i18n*/
      {
        id: "RokrZf"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "5sNliy"
      }
    ) }) })
  ] });
};
const Settings = () => {
  const {
    data: account
  } = useGetAccount();
  const isSaasMode = account == null ? void 0 : account.is_saas_mode_enabled;
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const SECTIONS = useMemo(() => {
    const baseSections = [{
      id: "event-details",
      label: i18n._(
        /*i18n*/
        {
          id: "QcCPs8"
        }
      ),
      icon: IconBuildingStore,
      component: EventDetailsForm
    }, {
      id: "location-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "wJijgU"
        }
      ),
      icon: IconMapPin,
      component: LocationSettings
    }, {
      id: "homepage-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "znIg+z"
        }
      ),
      icon: IconHome,
      component: HomepageAndCheckoutSettings
    }, ...isRecurring ? [{
      id: "recurring-event-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "asLqwt"
        }
      ),
      icon: IconRepeat,
      component: RecurringEventSettings
    }] : [], {
      id: "seo-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "4Ml90q"
        }
      ),
      icon: IconBrandGoogleAnalytics,
      component: SeoSettings
    }, {
      id: "email-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "V2sk3H"
        }
      ),
      icon: IconAt,
      component: EmailSettings
    }, {
      id: "misc-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "RDie0n"
        }
      ),
      icon: IconAdjustments,
      component: MiscSettings
    }, {
      id: "waitlist-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "u0n+wz"
        }
      ),
      icon: IconListCheck,
      component: WaitlistSettings
    }, {
      id: "payment-settings",
      label: i18n._(
        /*i18n*/
        {
          id: "Lg+ewC"
        }
      ),
      icon: IconCreditCard,
      component: PaymentAndInvoicingSettings
    }, {
      id: "danger-zone",
      label: i18n._(
        /*i18n*/
        {
          id: "ZQKLI1"
        }
      ),
      icon: IconAlertTriangle,
      component: DangerZoneSettings,
      color: "red"
    }];
    if (isSaasMode) {
      baseSections.splice(baseSections.length - 1, 0, {
        id: "platform-fees",
        label: i18n._(
          /*i18n*/
          {
            id: "br3Y/y"
          }
        ),
        icon: IconPercentage,
        component: PlatformFeesSettings
      });
    }
    return baseSections;
  }, [isSaasMode, isRecurring]);
  const isLargeScreen = useMediaQuery("(min-width: 1200px)", true);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === "undefined") return "event-details";
    const hash = window.location.hash.replace("#", "");
    return hash || "event-details";
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveSection(hash);
      setTimeout(() => {
        var _a;
        (_a = document.getElementById(hash)) == null ? void 0 : _a.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    }
  }, []);
  const handleClick = (sectionId) => {
    var _a;
    setActiveSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
    (_a = document.getElementById(sectionId)) == null ? void 0 : _a.scrollIntoView({
      behavior: "smooth"
    });
  };
  const sideMenu = /* @__PURE__ */ jsx(Card, { style: {
    padding: "15px",
    marginBottom: 0
  }, children: /* @__PURE__ */ jsx(Stack, { gap: "xs", children: SECTIONS.map((section) => /* @__PURE__ */ jsx(NavLink$1, { style: {
    borderRadius: "5px"
  }, active: activeSection === section.id, label: section.label, color: "color" in section ? section.color : void 0, leftSection: /* @__PURE__ */ jsx(section.icon, { size: 16, stroke: 1.5 }), onClick: () => handleClick(section.id) }, section.id)) }) });
  const content = SECTIONS.map(({
    id,
    component: Component
  }) => /* @__PURE__ */ jsx("div", { id, style: {
    scrollMarginTop: "20px"
  }, children: /* @__PURE__ */ jsx(Component, {}) }, id));
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "8v2LRU"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "JyD0LH"
      }
    ) }),
    isLargeScreen ? /* @__PURE__ */ jsxs(Group, { align: "flex-start", gap: "md", children: [
      /* @__PURE__ */ jsx(Box, { w: 240, style: {
        position: "sticky",
        top: 20
      }, children: sideMenu }),
      /* @__PURE__ */ jsx(Box, { style: {
        flex: 1
      }, children: content })
    ] }) : /* @__PURE__ */ jsxs(Stack, { children: [
      sideMenu,
      content
    ] })
  ] });
};
export {
  Settings,
  Settings as default
};

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { E as EventType, M as MessageType, f as ProductType } from "./types-CqPWB-a5.js";
import { useParams, NavLink } from "react-router";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { o as orderClient } from "./order.client-BmBVeAyF.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { LoadingOverlay, Button, Alert, Text, Select, MultiSelect, TextInput, Checkbox, Group, Menu } from "@mantine/core";
import { IconBrandStripe, IconAlertCircle, IconSend, IconClock, IconChevronDown, IconCheck, IconTestPipe, IconCopy } from "@tabler/icons-react";
import { C as Callout } from "./index-CwjvB_vn.js";
import { f as api, q as queryParamsHelper, u as useGetMe, a as getConfig } from "../entry.server.js";
import { useForm } from "@mantine/form";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import { useMemo, useState, useEffect } from "react";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { p as prettyDate, u as utcToTz } from "./dates-CbVpwZeX.js";
import { u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import dayjs from "dayjs";
const GET_ORDER_QUERY_KEY = "getEventOrder";
const useGetOrder = (eventId, orderId) => {
  return useQuery({
    queryKey: [GET_ORDER_QUERY_KEY, orderId],
    queryFn: async () => {
      const {
        data
      } = await orderClient.findByID(Number(eventId), Number(orderId));
      return data;
    },
    enabled: !!eventId && !!orderId
  });
};
const messagesClient = {
  send: async (eventId, messagesRequest) => {
    return await api.post(`events/${eventId}/messages`, messagesRequest);
  },
  all: async (eventId, pagination) => {
    const response = await api.get(`events/${eventId}/messages` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  cancel: async (eventId, messageId) => {
    return await api.post(`events/${eventId}/messages/${messageId}/cancel`);
  },
  recipients: async (eventId, messageId, pagination) => {
    const response = await api.get(`events/${eventId}/messages/${messageId}/recipients` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  }
};
const GET_EVENT_MESSAGES_QUERY_KEY = "getEventMessages";
const useGetEventMessages = (eventId, pagination) => {
  return useQuery({
    queryKey: [GET_EVENT_MESSAGES_QUERY_KEY, eventId, pagination],
    queryFn: async () => await messagesClient.all(eventId, pagination)
  });
};
const useSendEventMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      messageData,
      eventId
    }) => messagesClient.send(eventId, messageData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_MESSAGES_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const formSection = "_formSection_6lapb_1";
const footerSection = "_footerSection_6lapb_13";
const sendButton = "_sendButton_6lapb_20";
const menuButton = "_menuButton_6lapb_26";
const warningText = "_warningText_6lapb_34";
const loadingContainer = "_loadingContainer_6lapb_41";
const verificationAlert = "_verificationAlert_6lapb_46";
const stripeConnectButton = "_stripeConnectButton_6lapb_50";
const scheduleSection = "_scheduleSection_6lapb_54";
const sendToggle = "_sendToggle_6lapb_60";
const toggleOption = "_toggleOption_6lapb_69";
const toggleActive = "_toggleActive_6lapb_84";
const scheduleBody = "_scheduleBody_6lapb_98";
const presetChips = "_presetChips_6lapb_104";
const presetChip = "_presetChip_6lapb_104";
const presetChipActive = "_presetChipActive_6lapb_124";
const scheduledConfirmation = "_scheduledConfirmation_6lapb_137";
const scheduledConfirmationIcon = "_scheduledConfirmationIcon_6lapb_147";
const scheduledConfirmationText = "_scheduledConfirmationText_6lapb_159";
const scheduledConfirmationDate = "_scheduledConfirmationDate_6lapb_165";
const scheduledConfirmationTime = "_scheduledConfirmationTime_6lapb_171";
const scheduledConfirmationTz = "_scheduledConfirmationTz_6lapb_176";
const occurrenceList = "_occurrenceList_6lapb_181";
const occurrenceChip = "_occurrenceChip_6lapb_190";
const occurrenceChipLabel = "_occurrenceChipLabel_6lapb_197";
const classes = {
  formSection,
  footerSection,
  sendButton,
  menuButton,
  warningText,
  loadingContainer,
  verificationAlert,
  stripeConnectButton,
  scheduleSection,
  sendToggle,
  toggleOption,
  toggleActive,
  scheduleBody,
  presetChips,
  presetChip,
  presetChipActive,
  scheduledConfirmation,
  scheduledConfirmationIcon,
  scheduledConfirmationText,
  scheduledConfirmationDate,
  scheduledConfirmationTime,
  scheduledConfirmationTz,
  occurrenceList,
  occurrenceChip,
  occurrenceChipLabel
};
const OrderField = ({
  orderId,
  eventId
}) => {
  const {
    data: order
  } = useGetOrder(eventId, orderId);
  if (!order) {
    return null;
  }
  return /* @__PURE__ */ jsx(TextInput, { label: i18n._(
    /*i18n*/
    {
      id: "I3QpvQ"
    }
  ), disabled: true, placeholder: `${order.first_name} ${order.last_name} <${order.email}>` });
};
const AttendeeField = ({
  orderId,
  eventId,
  attendeeId,
  form
}) => {
  const {
    data: order
  } = useGetOrder(eventId, orderId);
  const {
    data: {
      products
    } = {}
  } = useGetEvent(eventId);
  if (!order || !products || !attendeeId) {
    return null;
  }
  const groups = products.map((product) => {
    var _a;
    return {
      group: product.title,
      items: ((_a = order.attendees) == null ? void 0 : _a.filter((a) => a.product_id === product.id).map((attendee) => {
        return {
          value: String(attendee.id),
          label: attendee.first_name + " " + attendee.last_name
        };
      })) || []
    };
  });
  return /* @__PURE__ */ jsx(MultiSelect, { label: i18n._(
    /*i18n*/
    {
      id: "lYDV/s"
    }
  ), searchable: true, data: groups, ...form.getInputProps("attendee_ids") });
};
const CUSTOM_PRESET = "custom";
const getSchedulePresets = (event, occurrence) => {
  const now = dayjs.utc();
  const startDate = occurrence ? dayjs.utc(occurrence.start_date) : dayjs.utc(event.start_date);
  const endDate = (occurrence == null ? void 0 : occurrence.end_date) ? dayjs.utc(occurrence.end_date) : event.end_date ? dayjs.utc(event.end_date) : null;
  const presets = [{
    value: "1_week_before",
    label: i18n._(
      /*i18n*/
      {
        id: "cGtUz6"
      }
    ),
    utcDate: startDate.subtract(1, "week")
  }, {
    value: "1_day_before",
    label: i18n._(
      /*i18n*/
      {
        id: "Z3etYG"
      }
    ),
    utcDate: startDate.subtract(1, "day")
  }, {
    value: "1_hour_before",
    label: i18n._(
      /*i18n*/
      {
        id: "szSnlj"
      }
    ),
    utcDate: startDate.subtract(1, "hour")
  }, {
    value: "1_day_after_start",
    label: i18n._(
      /*i18n*/
      {
        id: "yj3N+g"
      }
    ),
    utcDate: startDate.add(1, "day")
  }];
  if (endDate) {
    presets.push({
      value: "1_day_after_end",
      label: i18n._(
        /*i18n*/
        {
          id: "943BwI"
        }
      ),
      utcDate: endDate.add(1, "day")
    });
  }
  return presets.filter((p) => p.utcDate.isAfter(now));
};
const SendMessageModal = (props) => {
  const {
    onClose,
    orderId,
    productId,
    messageType,
    attendeeId,
    eventOccurrenceId: rawEventOccurrenceId,
    eventOccurrenceIds,
    initialSubject,
    initialMessage
  } = props;
  const isMultiOccurrence = !!eventOccurrenceIds && eventOccurrenceIds.length > 1;
  const eventOccurrenceId = rawEventOccurrenceId ?? ((eventOccurrenceIds == null ? void 0 : eventOccurrenceIds.length) === 1 ? eventOccurrenceIds[0] : void 0);
  const {
    eventId
  } = useParams();
  const {
    data: event,
    data: {
      product_categories
    } = {}
  } = useGetEvent(eventId);
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const {
    data: occurrencesData
  } = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 100
  });
  const occurrenceOptions = useMemo(() => {
    if (!isRecurring || !(occurrencesData == null ? void 0 : occurrencesData.data)) return [];
    return occurrencesData.data.filter((occ) => occ.status !== "CANCELLED").map((occ) => ({
      label: prettyDate(occ.start_date, (event == null ? void 0 : event.timezone) || "UTC") + (occ.label ? ` (${occ.label})` : ""),
      value: String(occ.id)
    }));
  }, [isRecurring, occurrencesData, event == null ? void 0 : event.timezone]);
  const targetedOccurrences = useMemo(() => {
    if (!isMultiOccurrence || !(occurrencesData == null ? void 0 : occurrencesData.data) || !eventOccurrenceIds) return [];
    const ids = new Set(eventOccurrenceIds.map((id) => Number(id)));
    return occurrencesData.data.filter((occ) => ids.has(Number(occ.id))).sort((a, b) => a.start_date.localeCompare(b.start_date));
  }, [isMultiOccurrence, eventOccurrenceIds, occurrencesData]);
  const {
    data: me
  } = useGetMe();
  const errorHandler = useFormErrorResponseHandler();
  const isPreselectedRecipient = !!(orderId || attendeeId || productId);
  const {
    data: account,
    isFetched: isAccountFetched
  } = useGetAccount();
  const isAccountVerified = isAccountFetched && (account == null ? void 0 : account.is_account_email_confirmed);
  const accountRequiresManualVerification = isAccountFetched && (account == null ? void 0 : account.requires_manual_verification);
  const formIsDisabled = !isAccountVerified || accountRequiresManualVerification;
  const supportEmail = getConfig("VITE_PLATFORM_SUPPORT_EMAIL");
  const [tierLimitError, setTierLimitError] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const sendMessageMutation = useSendEventMessage();
  const form = useForm({
    initialValues: {
      subject: initialSubject ?? "",
      message: initialMessage ?? "",
      message_type: messageType,
      attendee_ids: attendeeId ? [String(attendeeId)] : [],
      product_ids: productId ? [String(productId)] : [],
      order_id: orderId,
      is_test: false,
      send_copy_to_current_user: false,
      type: "EVENT",
      acknowledgement: false,
      order_statuses: ["COMPLETED"],
      scheduled_at: "",
      event_occurrence_id: eventOccurrenceId ? Number(eventOccurrenceId) : null,
      event_occurrence_ids: isMultiOccurrence ? eventOccurrenceIds.map((id) => Number(id)) : null
    },
    validate: {
      acknowledgement: (value) => value === true ? null : i18n._(
        /*i18n*/
        {
          id: "R6i9o9"
        }
      ),
      scheduled_at: (value) => {
        if (!isScheduled) return null;
        if (selectedPreset && selectedPreset !== CUSTOM_PRESET) return null;
        if (!value) return i18n._(
          /*i18n*/
          {
            id: "z0KrIG"
          }
        );
        if (event && dayjs.tz(value, event.timezone).isBefore(dayjs())) return i18n._(
          /*i18n*/
          {
            id: "EWErQh"
          }
        );
        return null;
      }
    }
  });
  const selectedOccurrence = useMemo(() => {
    if (!form.values.event_occurrence_id || !(occurrencesData == null ? void 0 : occurrencesData.data)) return void 0;
    return occurrencesData.data.find((occ) => occ.id === form.values.event_occurrence_id);
  }, [form.values.event_occurrence_id, occurrencesData]);
  const presets = useMemo(() => event ? getSchedulePresets(event, selectedOccurrence) : [], [event, selectedOccurrence]);
  const resolvedPreset = useMemo(() => {
    if (!selectedPreset || selectedPreset === CUSTOM_PRESET) return null;
    return presets.find((p) => p.value === selectedPreset) ?? null;
  }, [selectedPreset, presets]);
  const handleSend = (values) => {
    setTierLimitError(null);
    const submitData = {
      ...values
    };
    if (isScheduled) {
      if (selectedPreset && selectedPreset !== CUSTOM_PRESET && resolvedPreset && event) {
        submitData.scheduled_at = resolvedPreset.utcDate.tz(event.timezone).format("YYYY-MM-DDTHH:mm");
      }
    } else {
      delete submitData.scheduled_at;
    }
    sendMessageMutation.mutate({
      eventId,
      messageData: submitData
    }, {
      onSuccess: () => {
        showSuccess(isScheduled ? i18n._(
          /*i18n*/
          {
            id: "saG4At"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "V7DYWd"
          }
        ));
        form.reset();
        onClose();
      },
      onError: (error) => {
        var _a, _b, _c;
        if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 429) {
          const message = ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || i18n._(
            /*i18n*/
            {
              id: "5VGIlq"
            }
          );
          setTierLimitError(message);
        } else {
          errorHandler(form, error);
        }
      }
    });
  };
  useEffect(() => {
    form.setFieldValue("product_ids", []);
  }, [form.values.message_type]);
  if (!event || !me || !product_categories) {
    return /* @__PURE__ */ jsx(LoadingOverlay, { visible: true });
  }
  return /* @__PURE__ */ jsxs(Modal, { withCloseButton: true, opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "RktTWf"
    }
  ), children: [
    !isAccountFetched && /* @__PURE__ */ jsx("div", { className: classes.loadingContainer, children: /* @__PURE__ */ jsx(LoadingOverlay, { visible: true }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSend), children: [
      !isAccountVerified && isAccountFetched && /* @__PURE__ */ jsx(Callout, { variant: "info", className: classes.verificationAlert, children: i18n._(
        /*i18n*/
        {
          id: "FRl8Jv"
        }
      ) }),
      accountRequiresManualVerification && /* @__PURE__ */ jsxs(Callout, { variant: "info", className: classes.verificationAlert, title: i18n._(
        /*i18n*/
        {
          id: "LmvZ+E"
        }
      ), children: [
        i18n._(
          /*i18n*/
          {
            id: "TnzbL+"
          }
        ),
        (event == null ? void 0 : event.organizer_id) && /* @__PURE__ */ jsx("div", { className: classes.stripeConnectButton, children: /* @__PURE__ */ jsx(Button, { component: NavLink, to: `/manage/organizer/${event.organizer_id}/settings#payouts`, leftSection: /* @__PURE__ */ jsx(IconBrandStripe, { size: 16 }), variant: "light", children: i18n._(
          /*i18n*/
          {
            id: "pbAk7a"
          }
        ) }) })
      ] }),
      tierLimitError && /* @__PURE__ */ jsxs(Alert, { variant: "light", color: "red", icon: /* @__PURE__ */ jsx(IconAlertCircle, { size: "1rem" }), mb: "md", children: [
        tierLimitError,
        supportEmail && /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          i18n._(
            /*i18n*/
            {
              id: "tiI71C"
            }
          ),
          " ",
          /* @__PURE__ */ jsx("a", { href: `mailto:${supportEmail}`, children: supportEmail })
        ] })
      ] }),
      !formIsDisabled && !tierLimitError && supportEmail && /* @__PURE__ */ jsxs(Callout, { variant: "info", children: [
        i18n._(
          /*i18n*/
          {
            id: "p/Sa0j"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("a", { href: `mailto:${supportEmail}`, children: supportEmail })
      ] }),
      !formIsDisabled && /* @__PURE__ */ jsxs("fieldset", { disabled: formIsDisabled, style: {
        border: "none",
        padding: 0,
        margin: 0
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.formSection, children: [
          isMultiOccurrence && /* @__PURE__ */ jsxs(Callout, { variant: "info", children: [
            /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: targetedOccurrences.length ? "xs" : 0, children: i18n._(
              /*i18n*/
              {
                id: "TJUrME",
                values: {
                  0: eventOccurrenceIds.length
                }
              }
            ) }),
            targetedOccurrences.length > 0 && /* @__PURE__ */ jsx("div", { className: classes.occurrenceList, children: targetedOccurrences.map((occ) => /* @__PURE__ */ jsxs("div", { className: classes.occurrenceChip, children: [
              prettyDate(occ.start_date, (event == null ? void 0 : event.timezone) || "UTC"),
              occ.label && /* @__PURE__ */ jsxs("span", { className: classes.occurrenceChipLabel, children: [
                " · ",
                occ.label
              ] })
            ] }, occ.id)) }),
            eventOccurrenceIds.length > targetedOccurrences.length && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mt: "xs", children: i18n._(
              /*i18n*/
              {
                id: "WSt3op",
                values: {
                  0: targetedOccurrences.length,
                  1: eventOccurrenceIds.length - targetedOccurrences.length
                }
              }
            ) })
          ] }),
          isRecurring && !isPreselectedRecipient && !isMultiOccurrence && occurrenceOptions.length > 0 && /* @__PURE__ */ jsx(Select, { label: i18n._(
            /*i18n*/
            {
              id: "6u1B3O"
            }
          ), description: i18n._(
            /*i18n*/
            {
              id: "5cV4PY"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "F1/VgK"
            }
          ), data: occurrenceOptions, value: form.values.event_occurrence_id ? String(form.values.event_occurrence_id) : null, onChange: (val) => form.setFieldValue("event_occurrence_id", val ? Number(val) : null), clearable: !eventOccurrenceId, disabled: !!eventOccurrenceId }),
          !isPreselectedRecipient && /* @__PURE__ */ jsx(Select, { data: [{
            value: "TICKET_HOLDERS",
            label: i18n._(
              /*i18n*/
              {
                id: "5UbY+B"
              }
            )
          }, {
            value: "ALL_ATTENDEES",
            label: isMultiOccurrence ? i18n._(
              /*i18n*/
              {
                id: "63gRoO"
              }
            ) : form.values.event_occurrence_id ? i18n._(
              /*i18n*/
              {
                id: "uWxIoH"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "W7AfhC"
              }
            )
          }, {
            value: "ORDER_OWNERS_WITH_PRODUCT",
            label: i18n._(
              /*i18n*/
              {
                id: "eB5vce"
              }
            )
          }], label: i18n._(
            /*i18n*/
            {
              id: "yPrbsy"
            }
          ), description: i18n._(
            /*i18n*/
            {
              id: "TxfvH2"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "CFbaPk"
            }
          ), ...form.getInputProps("message_type") }),
          form.values.message_type === MessageType.IndividualAttendees && attendeeId && orderId && /* @__PURE__ */ jsx(AttendeeField, { eventId, orderId, attendeeId, form }),
          form.values.message_type === MessageType.TicketHolders && event.product_categories && /* @__PURE__ */ jsx(ProductSelector, { label: i18n._(
            /*i18n*/
            {
              id: "1jRD0v"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "OMX4tH"
            }
          ), productCategories: event.product_categories, form, productFieldName: "product_ids", includedProductTypes: [ProductType.Ticket] }),
          form.values.message_type === MessageType.OrderOwnersWithProduct && event.product_categories && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(ProductSelector, { label: i18n._(
              /*i18n*/
              {
                id: "0/yJtP"
              }
            ), placeholder: i18n._(
              /*i18n*/
              {
                id: "C4Y1hA"
              }
            ), productCategories: event.product_categories, form, productFieldName: "product_ids", includedProductTypes: [ProductType.Ticket, ProductType.General] }),
            /* @__PURE__ */ jsx(MultiSelect, { description: i18n._(
              /*i18n*/
              {
                id: "bU7oUm"
              }
            ), label: i18n._(
              /*i18n*/
              {
                id: "6eSHqs"
              }
            ), data: [{
              value: "COMPLETED",
              label: i18n._(
                /*i18n*/
                {
                  id: "qqWcBV"
                }
              )
            }, {
              value: "AWAITING_OFFLINE_PAYMENT",
              label: i18n._(
                /*i18n*/
                {
                  id: "4lVaWA"
                }
              )
            }], ...form.getInputProps("order_statuses") })
          ] }),
          form.values.message_type === MessageType.OrderOwner && orderId && /* @__PURE__ */ jsx(OrderField, { orderId, eventId }),
          /* @__PURE__ */ jsx(TextInput, { required: true, label: i18n._(
            /*i18n*/
            {
              id: "UJmAAK"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "fc7wGW"
            }
          ), ...form.getInputProps("subject") }),
          /* @__PURE__ */ jsx(Editor, { label: i18n._(
            /*i18n*/
            {
              id: "xDAtGP"
            }
          ), value: form.values.message || "", onChange: (value) => form.setFieldValue("message", value), error: form.errors.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.footerSection, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.scheduleSection, children: [
            /* @__PURE__ */ jsxs("div", { className: classes.sendToggle, children: [
              /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes.toggleOption} ${!isScheduled ? classes.toggleActive : ""}`, onClick: () => {
                setIsScheduled(false);
                form.setFieldValue("scheduled_at", "");
                setSelectedPreset(null);
              }, children: [
                /* @__PURE__ */ jsx(IconSend, { size: 15 }),
                i18n._(
                  /*i18n*/
                  {
                    id: "NpEm3p"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes.toggleOption} ${isScheduled ? classes.toggleActive : ""}`, onClick: () => setIsScheduled(true), children: [
                /* @__PURE__ */ jsx(IconClock, { size: 15 }),
                i18n._(
                  /*i18n*/
                  {
                    id: "QS1Nla"
                  }
                )
              ] })
            ] }),
            isScheduled && /* @__PURE__ */ jsxs("div", { className: classes.scheduleBody, children: [
              /* @__PURE__ */ jsxs("div", { className: classes.presetChips, children: [
                presets.map((p) => /* @__PURE__ */ jsx("button", { type: "button", className: `${classes.presetChip} ${selectedPreset === p.value ? classes.presetChipActive : ""}`, onClick: () => {
                  setSelectedPreset(p.value);
                  form.setFieldValue("scheduled_at", "");
                }, children: p.label }, p.value)),
                /* @__PURE__ */ jsx("button", { type: "button", className: `${classes.presetChip} ${selectedPreset === CUSTOM_PRESET ? classes.presetChipActive : ""}`, onClick: () => setSelectedPreset(CUSTOM_PRESET), children: i18n._(
                  /*i18n*/
                  {
                    id: "Guo0lU"
                  }
                ) })
              ] }),
              selectedPreset === CUSTOM_PRESET && /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", label: i18n._(
                /*i18n*/
                {
                  id: "qcP/8K"
                }
              ), description: event.timezone, min: utcToTz(dayjs.utc().toISOString(), event.timezone), ...form.getInputProps("scheduled_at") }),
              resolvedPreset && event && /* @__PURE__ */ jsxs("div", { className: classes.scheduledConfirmation, children: [
                /* @__PURE__ */ jsx("div", { className: classes.scheduledConfirmationIcon, children: /* @__PURE__ */ jsx(IconClock, { size: 20 }) }),
                /* @__PURE__ */ jsxs("div", { className: classes.scheduledConfirmationText, children: [
                  /* @__PURE__ */ jsx("span", { className: classes.scheduledConfirmationDate, children: resolvedPreset.utcDate.tz(event.timezone).format("dddd, MMMM D, YYYY") }),
                  /* @__PURE__ */ jsxs("span", { className: classes.scheduledConfirmationTime, children: [
                    resolvedPreset.utcDate.tz(event.timezone).format("h:mm A"),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: classes.scheduledConfirmationTz, children: event.timezone })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Checkbox, { ...form.getInputProps("acknowledgement", {
            type: "checkbox"
          }), label: i18n._(
            /*i18n*/
            {
              id: "YLgdk5"
            }
          ) }),
          /* @__PURE__ */ jsxs(Group, { gap: 0, children: [
            /* @__PURE__ */ jsx(Button, { className: classes.sendButton, loading: sendMessageMutation.isPending, type: "submit", leftSection: isScheduled ? /* @__PURE__ */ jsx(IconClock, { size: 16 }) : /* @__PURE__ */ jsx(IconSend, { size: 16 }), disabled: !form.values.acknowledgement || !isAccountVerified || accountRequiresManualVerification, "data-testid": "message-send-button", children: isScheduled ? i18n._(
              /*i18n*/
              {
                id: "NAzVVw"
              }
            ) : form.values.is_test ? i18n._(
              /*i18n*/
              {
                id: "v1rRtW"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "M/WIer"
              }
            ) }),
            /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 220, position: "bottom-end", children: [
              /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { type: "button", className: classes.menuButton, disabled: !form.values.acknowledgement || !isAccountVerified || accountRequiresManualVerification, children: /* @__PURE__ */ jsx(IconChevronDown, { size: 16 }) }) }),
              /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
                /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconTestPipe, { size: 16 }), rightSection: form.values.is_test ? /* @__PURE__ */ jsx(IconCheck, { size: 14 }) : null, onClick: () => form.setFieldValue("is_test", !form.values.is_test), children: i18n._(
                  /*i18n*/
                  {
                    id: "73qYgo"
                  }
                ) }),
                /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconCopy, { size: 16 }), rightSection: form.values.send_copy_to_current_user ? /* @__PURE__ */ jsx(IconCheck, { size: 14 }) : null, onClick: () => form.setFieldValue("send_copy_to_current_user", !form.values.send_copy_to_current_user), children: i18n._(
                  /*i18n*/
                  {
                    id: "22Itl6"
                  }
                ) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: classes.warningText, children: i18n._(
            /*i18n*/
            {
              id: "dLm8V5"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
};
export {
  GET_ORDER_QUERY_KEY as G,
  SendMessageModal as S,
  GET_EVENT_MESSAGES_QUERY_KEY as a,
  useGetEventMessages as b,
  messagesClient as m,
  useGetOrder as u
};

import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, NavLink } from "react-router";
import { Text, Button, TextInput, SimpleGrid, Group, Badge } from "@mantine/core";
import { IconAlertCircle, IconMail, IconTicket, IconCalendarEvent, IconMapPin, IconCalendar, IconExternalLink, IconPrinter } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { t as ticketLookupClient, u as useSendTicketLookupEmail } from "./useSendTicketLookupEmail-DzId01R5.js";
import { d as dateToBrowserTz } from "./dates-CbVpwZeX.js";
import { r as resolveEventLocation } from "./effectiveLocation-BzDgAlu_.js";
import { f as formatAddress } from "./addressUtilities-7xIQim0X.js";
import { a as showError } from "./notifications-Coh3Ef-t.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { P as PoweredByFooter } from "../entry.server.js";
import { E as EventDateRange } from "./index-BfWJHinS.js";
import { C as CheckoutContent } from "./index-Cu99v0OR.js";
import { L as LocationType } from "./types-CqPWB-a5.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "@mantine/notifications";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const GET_ORDERS_BY_LOOKUP_TOKEN_QUERY_KEY = "getOrdersByLookupToken";
const useGetOrdersByLookupToken = (token) => {
  return useQuery({
    queryKey: [GET_ORDERS_BY_LOOKUP_TOKEN_QUERY_KEY, token],
    queryFn: async () => {
      var _a, _b;
      if (!token) {
        throw new Error("Token is required");
      }
      try {
        const {
          data
        } = await ticketLookupClient.getOrdersByToken(token);
        return data;
      } catch (e) {
        const axiosError = e;
        const message = (_b = (_a = axiosError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message;
        throw new Error(message || "An error occurred");
      }
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false
  });
};
const container = "_container_1q0or_1";
const header = "_header_1q0or_12";
const headerIcon = "_headerIcon_1q0or_32";
const subtitle = "_subtitle_1q0or_46";
const ordersList = "_ordersList_1q0or_58";
const orderCard = "_orderCard_1q0or_69";
const orderHeader = "_orderHeader_1q0or_99";
const eventInfo = "_eventInfo_1q0or_113";
const eventTitle = "_eventTitle_1q0or_120";
const orderDetails = "_orderDetails_1q0or_132";
const detailItem = "_detailItem_1q0or_142";
const headerIconError = "_headerIconError_1q0or_151";
const requestCard = "_requestCard_1q0or_165";
const requestHeader = "_requestHeader_1q0or_169";
const requestForm = "_requestForm_1q0or_180";
const emailInput = "_emailInput_1q0or_192";
const successMessage = "_successMessage_1q0or_196";
const classes = {
  container,
  header,
  headerIcon,
  subtitle,
  ordersList,
  orderCard,
  orderHeader,
  eventInfo,
  eventTitle,
  orderDetails,
  detailItem,
  headerIconError,
  requestCard,
  requestHeader,
  requestForm,
  emailInput,
  successMessage
};
const OrderStatusBadge = () => /* @__PURE__ */ jsx(Badge, { variant: "light", color: "green", size: "sm", children: i18n._(
  /*i18n*/
  {
    id: "qqWcBV"
  }
) });
const OrderCard = ({
  order
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const event = order.event;
  const occurrenceId = ((_b = (_a = order.attendees) == null ? void 0 : _a[0]) == null ? void 0 : _b.event_occurrence_id) ?? ((_d = (_c = order.order_items) == null ? void 0 : _c[0]) == null ? void 0 : _d.event_occurrence_id);
  const occurrence = occurrenceId != null ? ((_e = event == null ? void 0 : event.occurrences) == null ? void 0 : _e.find((o) => o.id === occurrenceId)) ?? null : null;
  const effective = resolveEventLocation(event, occurrence);
  const venueName = (effective == null ? void 0 : effective.type) === LocationType.InPerson ? ((_f = effective.location) == null ? void 0 : _f.name) || ((_h = (_g = effective.location) == null ? void 0 : _g.structured_address) == null ? void 0 : _h.venue_name) || null : null;
  const formattedAddress = (effective == null ? void 0 : effective.type) === LocationType.InPerson && ((_i = effective.location) == null ? void 0 : _i.structured_address) ? formatAddress(effective.location.structured_address) : "";
  const locationLabel = (effective == null ? void 0 : effective.type) === LocationType.InPerson ? [venueName, formattedAddress].filter(Boolean).join(", ") || null : (effective == null ? void 0 : effective.type) === LocationType.Online ? i18n._(
    /*i18n*/
    {
      id: "oXOSPE"
    }
  ) : null;
  const ticketCount = ((_j = order.attendees) == null ? void 0 : _j.length) || 0;
  const orderUrl = `/checkout/${event == null ? void 0 : event.id}/${order.short_id}/summary`;
  const printUrl = `/order/${event == null ? void 0 : event.id}/${order.short_id}/print`;
  return /* @__PURE__ */ jsxs(Card, { className: classes.orderCard, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.orderHeader, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.eventInfo, children: [
        /* @__PURE__ */ jsx("h3", { className: classes.eventTitle, children: event == null ? void 0 : event.title }),
        /* @__PURE__ */ jsx(OrderStatusBadge, {})
      ] }),
      /* @__PURE__ */ jsxs(Text, { size: "xs", c: "dimmed", children: [
        i18n._(
          /*i18n*/
          {
            id: "UYUgdb"
          }
        ),
        " #",
        order.public_id
      ] })
    ] }),
    /* @__PURE__ */ jsxs(SimpleGrid, { cols: {
      base: 1,
      sm: 2
    }, spacing: "md", className: classes.orderDetails, children: [
      /* @__PURE__ */ jsx("div", { className: classes.detailItem, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(IconCalendarEvent, { size: 18, style: {
          color: "var(--mantine-color-gray-6)"
        } }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "/dgc8E"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", children: /* @__PURE__ */ jsx(EventDateRange, { event, occurrence: occurrence ?? void 0 }) })
        ] })
      ] }) }),
      locationLabel && /* @__PURE__ */ jsx("div", { className: classes.detailItem, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(IconMapPin, { size: 18, style: {
          color: "var(--mantine-color-gray-6)"
        } }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "wJijgU"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", lineClamp: 1, children: locationLabel })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: classes.detailItem, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(IconTicket, { size: 18, style: {
          color: "var(--mantine-color-gray-6)"
        } }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "6GQNLE"
            }
          ) }),
          /* @__PURE__ */ jsxs(Text, { size: "sm", children: [
            ticketCount,
            " ",
            ticketCount === 1 ? i18n._(
              /*i18n*/
              {
                id: "5AnPaO"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "zNECqg"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: classes.detailItem, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(IconCalendar, { size: 18, style: {
          color: "var(--mantine-color-gray-6)"
        } }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "dsFmM+"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", children: event && dateToBrowserTz(order.created_at, event.timezone) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Group, { gap: "sm", mt: "md", wrap: "wrap", children: [
      /* @__PURE__ */ jsx(Button, { component: NavLink, to: orderUrl, variant: "gradient", gradient: {
        from: "grape",
        to: "pink",
        deg: 90
      }, size: "sm", leftSection: /* @__PURE__ */ jsx(IconExternalLink, { size: 16 }), children: i18n._(
        /*i18n*/
        {
          id: "67OJ7t"
        }
      ) }),
      ticketCount > 0 && /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "sm", leftSection: /* @__PURE__ */ jsx(IconPrinter, { size: 16 }), onClick: () => window == null ? void 0 : window.open(printUrl, "_blank"), children: i18n._(
        /*i18n*/
        {
          id: "DKwDdj"
        }
      ) })
    ] })
  ] });
};
const MyTickets = () => {
  const {
    token
  } = useParams();
  const {
    data: orders,
    isLoading,
    isError,
    error
  } = useGetOrdersByLookupToken(token);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const ticketLookupMutation = useSendTicketLookupEmail();
  const form = useForm({
    initialValues: {
      email: ""
    }
  });
  const handleRequestNewLink = (values) => {
    ticketLookupMutation.mutate(values.email, {
      onSuccess: () => {
        setRequestSuccess(true);
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "fWsBTs"
          }
        ));
      }
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingMask, {});
  }
  if (isError) {
    return /* @__PURE__ */ jsxs(CheckoutContent, { children: [
      /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.header, children: [
          /* @__PURE__ */ jsx(IconAlertCircle, { size: 48, className: classes.headerIconError }),
          /* @__PURE__ */ jsx("h1", { children: i18n._(
            /*i18n*/
            {
              id: "1qY5Ue"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: classes.subtitle, children: (error == null ? void 0 : error.message) || i18n._(
            /*i18n*/
            {
              id: "L7dIM7"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: classes.requestCard, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.requestHeader, children: [
            /* @__PURE__ */ jsx(IconMail, { size: 20 }),
            /* @__PURE__ */ jsx(Text, { fw: 500, children: i18n._(
              /*i18n*/
              {
                id: "JEPMXN"
              }
            ) })
          ] }),
          requestSuccess ? /* @__PURE__ */ jsxs("div", { className: classes.successMessage, children: [
            /* @__PURE__ */ jsx("p", { children: i18n._(
              /*i18n*/
              {
                id: "51AsAN"
              }
            ) }),
            /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "sm", onClick: () => {
              setRequestSuccess(false);
              form.reset();
            }, children: i18n._(
              /*i18n*/
              {
                id: "ouM5IM"
              }
            ) })
          ] }) : /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleRequestNewLink), children: /* @__PURE__ */ jsxs("div", { className: classes.requestForm, children: [
            /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("email"), type: "email", placeholder: i18n._(
              /*i18n*/
              {
                id: "C3nD/1"
              }
            ), required: true, className: classes.emailInput }),
            /* @__PURE__ */ jsx(Button, { type: "submit", color: "secondary.5", loading: ticketLookupMutation.isPending, disabled: ticketLookupMutation.isPending, children: i18n._(
              /*i18n*/
              {
                id: "JlFcis"
              }
            ) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(PoweredByFooter, {})
    ] });
  }
  if (!orders || orders.length === 0) {
    return /* @__PURE__ */ jsxs(CheckoutContent, { children: [
      /* @__PURE__ */ jsx("div", { className: classes.container, children: /* @__PURE__ */ jsxs("div", { className: classes.header, children: [
        /* @__PURE__ */ jsx(IconTicket, { size: 48, className: classes.headerIcon }),
        /* @__PURE__ */ jsx("h1", { children: i18n._(
          /*i18n*/
          {
            id: "3sRuiW"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: classes.subtitle, children: i18n._(
          /*i18n*/
          {
            id: "RRZDED"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(PoweredByFooter, {})
    ] });
  }
  return /* @__PURE__ */ jsxs(CheckoutContent, { children: [
    /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.header, children: [
        /* @__PURE__ */ jsx(IconTicket, { size: 48, className: classes.headerIcon }),
        /* @__PURE__ */ jsx("h1", { children: i18n._(
          /*i18n*/
          {
            id: "oVGCGh"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: classes.subtitle, children: i18n._(
          /*i18n*/
          {
            id: "dORAcs"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.ordersList, children: orders.map((order) => /* @__PURE__ */ jsx(OrderCard, { order }, order.short_id)) })
    ] }),
    /* @__PURE__ */ jsx(PoweredByFooter, {})
  ] });
};
export {
  MyTickets,
  MyTickets as default
};

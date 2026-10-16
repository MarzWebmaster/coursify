import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useLocation, useNavigate, NavLink } from "react-router";
import { Button, Modal, TextInput, Group, Alert, Text, SimpleGrid, Tooltip, ActionIcon } from "@mantine/core";
import { IconCalendar, IconCheck, IconTicket, IconPrinter, IconUser, IconEdit, IconId, IconMail, IconSend, IconMenuOrder, IconCash, IconMapPin, IconCalendarEvent, IconClock, IconBuilding, IconExternalLink } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { u as useGetOrderPublic, G as GET_ORDER_PUBLIC_QUERY_KEY } from "./useGetOrderPublic-Ck7WTgJ2.js";
import { j as eventCheckoutPath } from "./urlHelper-CsaWRwIV.js";
import { d as dateToBrowserTz } from "./dates-CbVpwZeX.js";
import { f as formatAddress } from "./addressUtilities-7xIQim0X.js";
import { r as resolveEventLocation, g as getEventLocationDisplay } from "./effectiveLocation-BzDgAlu_.js";
import { g as getAttendeeProductTitle } from "./products-BLTGbPdF.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { H as HomepageInfoMessage } from "./index-DlbMZZb-.js";
import { t as publicApi, P as PoweredByFooter } from "../entry.server.js";
import { E as EventDateRange } from "./index-BfWJHinS.js";
import { O as OnlineEventDetails } from "./index-CicViJRN.js";
import { C as CalendarOptionsPopover } from "./index-44oVSCbn.js";
import { C as CheckoutStepTitle, I as InlineOrderSummary } from "./index-Bbi8HwGR.js";
import { C as CheckoutContent } from "./index-Cu99v0OR.js";
import { useForm } from "@mantine/form";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { c as clearWaitlistJoinedForEvent } from "./useWaitlistJoined-D2Jn2EfP.js";
import "./order.client-BmBVeAyF.js";
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
import "./currency-Br7a8J7F.js";
const container = "_container_12t3x_1";
const iconContainer = "_iconContainer_12t3x_19";
const content = "_content_12t3x_31";
const title = "_title_12t3x_43";
const subtitle = "_subtitle_12t3x_49";
const classes$3 = {
  container,
  iconContainer,
  content,
  title,
  subtitle
};
const AddToCalendarCTA = ({
  event,
  occurrence
}) => {
  return /* @__PURE__ */ jsxs("div", { className: classes$3.container, children: [
    /* @__PURE__ */ jsx("div", { className: classes$3.iconContainer, children: /* @__PURE__ */ jsx(IconCalendar, { size: 24 }) }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.content, children: [
      /* @__PURE__ */ jsx("span", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "Kdpf90"
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: classes$3.subtitle, children: i18n._(
        /*i18n*/
        {
          id: "6PNlRV"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(CalendarOptionsPopover, { event, occurrence, children: /* @__PURE__ */ jsx(Button, { variant: "filled", size: "sm", children: i18n._(
      /*i18n*/
      {
        id: "oZW/gT"
      }
    ) }) })
  ] });
};
const modal$1 = "_modal_nhhgd_1";
const classes$2 = {
  modal: modal$1
};
const EditAttendeeModal = ({
  opened,
  onClose,
  attendee,
  onSuccess
}) => {
  const form = useForm({
    initialValues: {
      first_name: attendee.first_name,
      last_name: attendee.last_name,
      email: attendee.email
    },
    validate: {
      first_name: (value2) => !value2 ? i18n._(
        /*i18n*/
        {
          id: "4pwejF"
        }
      ) : null,
      last_name: (value2) => !value2 ? i18n._(
        /*i18n*/
        {
          id: "ve9JTU"
        }
      ) : null,
      email: (value2) => {
        if (!value2) return i18n._(
          /*i18n*/
          {
            id: "ZsZeV2"
          }
        );
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value2)) return i18n._(
          /*i18n*/
          {
            id: "B2Tpo0"
          }
        );
        return null;
      }
    }
  });
  const emailChanged = form.values.email !== attendee.email;
  return /* @__PURE__ */ jsx(Modal, { opened, onClose, title: i18n._(
    /*i18n*/
    {
      id: "etaWtB"
    }
  ), size: "md", className: classes$2.modal, children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(onSuccess), children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "kODvZJ"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "xUgUTh"
        }
      ), required: true, ...form.getInputProps("first_name") }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "UXBCwc"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "9/1YKL"
        }
      ), required: true, ...form.getInputProps("last_name") })
    ] }),
    /* @__PURE__ */ jsx(TextInput, { label: i18n._(
      /*i18n*/
      {
        id: "O3oNi5"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "6KnyG0"
      }
    ), required: true, type: "email", ...form.getInputProps("email") }),
    emailChanged && /* @__PURE__ */ jsx(Callout, { variant: "info", children: i18n._(
      /*i18n*/
      {
        id: "cDHM1d"
      }
    ) }),
    /* @__PURE__ */ jsxs(Group, { justify: "flex-end", gap: "sm", mt: "md", children: [
      /* @__PURE__ */ jsx(Button, { variant: "default", onClick: onClose, children: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] })
  ] }) }) });
};
const modal = "_modal_nhhgd_1";
const classes$1 = {
  modal
};
const EditOrderModal = ({
  opened,
  onClose,
  order,
  onSuccess
}) => {
  const form = useForm({
    initialValues: {
      first_name: order.first_name,
      last_name: order.last_name,
      email: order.email
    },
    validate: {
      first_name: (value2) => !value2 ? i18n._(
        /*i18n*/
        {
          id: "4pwejF"
        }
      ) : null,
      last_name: (value2) => !value2 ? i18n._(
        /*i18n*/
        {
          id: "ve9JTU"
        }
      ) : null,
      email: (value2) => {
        if (!value2) return i18n._(
          /*i18n*/
          {
            id: "ZsZeV2"
          }
        );
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value2)) return i18n._(
          /*i18n*/
          {
            id: "B2Tpo0"
          }
        );
        return null;
      }
    }
  });
  const emailChanged = form.values.email !== order.email;
  return /* @__PURE__ */ jsx(Modal, { opened, onClose, title: i18n._(
    /*i18n*/
    {
      id: "vRWOrM"
    }
  ), size: "md", className: classes$1.modal, children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(onSuccess), children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "kODvZJ"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "xUgUTh"
        }
      ), required: true, ...form.getInputProps("first_name") }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "UXBCwc"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "9/1YKL"
        }
      ), required: true, ...form.getInputProps("last_name") })
    ] }),
    /* @__PURE__ */ jsx(TextInput, { label: i18n._(
      /*i18n*/
      {
        id: "O3oNi5"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "6KnyG0"
      }
    ), required: true, type: "email", ...form.getInputProps("email") }),
    emailChanged && /* @__PURE__ */ jsx(Callout, { variant: "tip", children: i18n._(
      /*i18n*/
      {
        id: "yD3avI"
      }
    ) }),
    /* @__PURE__ */ jsxs(Group, { justify: "flex-end", gap: "sm", mt: "md", children: [
      /* @__PURE__ */ jsx(Button, { variant: "default", onClick: onClose, children: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] })
  ] }) }) });
};
const selfServiceClient = {
  editAttendee: async (eventId, orderShortId, attendeeShortId, data) => {
    const response = await publicApi.patch(`/events/${eventId}/order/${orderShortId}/attendees/${attendeeShortId}`, data);
    return response.data;
  },
  editOrder: async (eventId, orderShortId, data) => {
    const response = await publicApi.patch(`/events/${eventId}/order/${orderShortId}`, data);
    return response.data;
  },
  resendAttendeeTicket: async (eventId, orderShortId, attendeeShortId) => {
    const response = await publicApi.post(`/events/${eventId}/order/${orderShortId}/attendees/${attendeeShortId}/resend-ticket`);
    return response.data;
  },
  resendOrderConfirmation: async (eventId, orderShortId) => {
    const response = await publicApi.post(`/events/${eventId}/order/${orderShortId}/resend-confirmation`);
    return response.data;
  }
};
const useEditAttendeePublic = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderShortId,
      attendeeShortId,
      data
    }) => selfServiceClient.editAttendee(eventId, orderShortId, attendeeShortId, data)
  });
};
const useEditOrderPublic = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderShortId,
      data
    }) => selfServiceClient.editOrder(eventId, orderShortId, data)
  });
};
const useResendAttendeeTicketPublic = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderShortId,
      attendeeShortId
    }) => selfServiceClient.resendAttendeeTicket(eventId, orderShortId, attendeeShortId)
  });
};
const useResendOrderConfirmationPublic = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderShortId
    }) => selfServiceClient.resendOrderConfirmation(eventId, orderShortId)
  });
};
const welcomeHeader = "_welcomeHeader_7n3aw_2";
const confettiIcon = "_confettiIcon_7n3aw_12";
const welcomeMessage = "_welcomeMessage_7n3aw_46";
const confirmationText = "_confirmationText_7n3aw_54";
const selfServiceHint = "_selfServiceHint_7n3aw_63";
const heading = "_heading_7n3aw_69";
const detailItem = "_detailItem_7n3aw_78";
const detailContent = "_detailContent_7n3aw_82";
const label = "_label_7n3aw_86";
const value = "_value_7n3aw_90";
const guestList = "_guestList_7n3aw_97";
const guestItem = "_guestItem_7n3aw_102";
const guestItemCancelled = "_guestItemCancelled_7n3aw_118";
const guestName = "_guestName_7n3aw_121";
const guestInfo = "_guestInfo_7n3aw_125";
const cancelledBadge = "_cancelledBadge_7n3aw_140";
const guestDetails = "_guestDetails_7n3aw_150";
const guestEmail = "_guestEmail_7n3aw_158";
const guestProduct = "_guestProduct_7n3aw_162";
const guestActions = "_guestActions_7n3aw_177";
const classes = {
  welcomeHeader,
  confettiIcon,
  welcomeMessage,
  confirmationText,
  selfServiceHint,
  heading,
  detailItem,
  detailContent,
  label,
  value,
  guestList,
  guestItem,
  guestItemCancelled,
  guestName,
  guestInfo,
  cancelledBadge,
  guestDetails,
  guestEmail,
  guestProduct,
  guestActions
};
const PaymentStatus = ({
  order
}) => {
  const paymentStatuses = {
    "NO_PAYMENT_REQUIRED": i18n._(
      /*i18n*/
      {
        id: "ZWEfBE"
      }
    ),
    "AWAITING_PAYMENT": i18n._(
      /*i18n*/
      {
        id: "ioG+xt"
      }
    ),
    "PAYMENT_FAILED": i18n._(
      /*i18n*/
      {
        id: "JhtZAK"
      }
    ),
    "PAYMENT_RECEIVED": i18n._(
      /*i18n*/
      {
        id: "lsxOPC"
      }
    ),
    "AWAITING_OFFLINE_PAYMENT": i18n._(
      /*i18n*/
      {
        id: "2rHwhl"
      }
    )
  };
  return (order == null ? void 0 : order.payment_status) ? /* @__PURE__ */ jsx("span", { children: paymentStatuses[order.payment_status] || "" }) : null;
};
const RefundStatusType = ({
  order
}) => {
  const refundStatuses = {
    "REFUND_PENDING": i18n._(
      /*i18n*/
      {
        id: "RpwiYC"
      }
    ),
    "REFUND_FAILED": i18n._(
      /*i18n*/
      {
        id: "WZbCR3"
      }
    ),
    "REFUNDED": i18n._(
      /*i18n*/
      {
        id: "/BI0y9"
      }
    ),
    "PARTIALLY_REFUNDED": i18n._(
      /*i18n*/
      {
        id: "ZfxaB4"
      }
    )
  };
  return (order == null ? void 0 : order.refund_status) ? /* @__PURE__ */ jsx("span", { children: refundStatuses[order.refund_status] || "" }) : null;
};
const GuestListItem = ({
  attendee,
  event,
  allowSelfEdit,
  onEditClick,
  onResendClick
}) => {
  const productTitle = getAttendeeProductTitle(attendee, attendee.product);
  const isCancelled = attendee.status === "CANCELLED";
  return /* @__PURE__ */ jsxs("div", { className: `${classes.guestItem} ${isCancelled ? classes.guestItemCancelled : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.guestInfo, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.guestName, children: [
        attendee.first_name,
        " ",
        attendee.last_name,
        isCancelled && /* @__PURE__ */ jsx("span", { className: classes.cancelledBadge, children: i18n._(
          /*i18n*/
          {
            id: "vv7kpg"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.guestDetails, children: [
        /* @__PURE__ */ jsx("span", { className: classes.guestEmail, children: attendee.email }),
        /* @__PURE__ */ jsx("span", { className: classes.guestProduct, children: productTitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.guestActions, children: [
      /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
        /*i18n*/
        {
          id: "1J/AWD"
        }
      ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", onClick: () => window == null ? void 0 : window.open(`/product/${event.id}/${attendee.short_id}`, "_blank"), children: /* @__PURE__ */ jsx(IconExternalLink, { size: 18 }) }) }),
      /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
        /*i18n*/
        {
          id: "JnuPvH"
        }
      ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", onClick: () => window == null ? void 0 : window.open(`/product/${event.id}/${attendee.short_id}/print`, "_blank"), children: /* @__PURE__ */ jsx(IconPrinter, { size: 18 }) }) }),
      allowSelfEdit && !isCancelled && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
          /*i18n*/
          {
            id: "t2bbp8"
          }
        ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", "data-testid": "attendee-edit-button", onClick: onEditClick, children: /* @__PURE__ */ jsx(IconEdit, { size: 18 }) }) }),
        /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
          /*i18n*/
          {
            id: "5CiNPm"
          }
        ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", "data-testid": "resend-ticket-button", onClick: onResendClick, children: /* @__PURE__ */ jsx(IconSend, { size: 18 }) }) })
      ] })
    ] })
  ] });
};
const DetailItem = ({
  icon: Icon,
  label: label2,
  value: value2
}) => /* @__PURE__ */ jsx("div", { className: classes.detailItem, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
  /* @__PURE__ */ jsx(Icon, { size: 20, style: {
    color: "var(--checkout-accent, var(--mantine-color-gray-6))",
    flexShrink: 0
  } }),
  /* @__PURE__ */ jsxs("div", { className: classes.detailContent, children: [
    /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", className: classes.label, children: label2 }),
    /* @__PURE__ */ jsx(Text, { className: classes.value, children: value2 })
  ] })
] }) });
const WelcomeHeader = ({
  order,
  event,
  allowSelfEdit
}) => {
  const isCompleted = order.status === "COMPLETED";
  const isAwaitingPayment = order.status === "AWAITING_OFFLINE_PAYMENT";
  const isCancelled = order.status === "CANCELLED";
  const message = {
    "COMPLETED": i18n._(
      /*i18n*/
      {
        id: "MNFIxz",
        values: {
          0: event.title
        }
      }
    ),
    "CANCELLED": i18n._(
      /*i18n*/
      {
        id: "Jwiilf"
      }
    ),
    "RESERVED": null,
    "AWAITING_OFFLINE_PAYMENT": i18n._(
      /*i18n*/
      {
        id: "bhlHm/"
      }
    ),
    "ABANDONED": null
  }[order.status];
  if (!message) return null;
  return /* @__PURE__ */ jsxs("div", { className: classes.welcomeHeader, children: [
    isCompleted && /* @__PURE__ */ jsx("div", { className: classes.confettiIcon, children: /* @__PURE__ */ jsx("span", { children: "🎉" }) }),
    isAwaitingPayment && /* @__PURE__ */ jsx("div", { className: classes.confettiIcon, children: /* @__PURE__ */ jsx("span", { children: "⏳" }) }),
    isCancelled && /* @__PURE__ */ jsx("div", { className: classes.confettiIcon, children: /* @__PURE__ */ jsx("span", { children: "😔" }) }),
    /* @__PURE__ */ jsx("div", { className: classes.welcomeMessage, children: message }),
    isCompleted && /* @__PURE__ */ jsxs("div", { className: classes.confirmationText, children: [
      i18n._(
        /*i18n*/
        {
          id: "n/7+7Q"
        }
      ),
      " ",
      /* @__PURE__ */ jsx("strong", { children: order.email })
    ] }),
    isCompleted && allowSelfEdit && /* @__PURE__ */ jsx("div", { className: classes.selfServiceHint, children: i18n._(
      /*i18n*/
      {
        id: "HWXuQK"
      }
    ) }),
    isCancelled && /* @__PURE__ */ jsxs("div", { className: classes.confirmationText, children: [
      i18n._(
        /*i18n*/
        {
          id: "kMU5aM"
        }
      ),
      " ",
      /* @__PURE__ */ jsx("strong", { children: order.email })
    ] })
  ] });
};
const OrderDetails = ({
  order,
  event,
  allowSelfEdit,
  onEditClick,
  onResendClick
}) => /* @__PURE__ */ jsx(Card, { style: {
  marginBottom: "40px"
}, children: /* @__PURE__ */ jsxs(SimpleGrid, { cols: {
  base: 1,
  sm: 2
}, spacing: "md", children: [
  /* @__PURE__ */ jsx(DetailItem, { icon: IconUser, label: i18n._(
    /*i18n*/
    {
      id: "6YtxFj"
    }
  ), value: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
    /* @__PURE__ */ jsxs("span", { children: [
      order.first_name,
      " ",
      order.last_name
    ] }),
    allowSelfEdit && order.status !== "CANCELLED" && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
      /*i18n*/
      {
        id: "ePK91l"
      }
    ), children: /* @__PURE__ */ jsx(ActionIcon, { size: "xs", variant: "subtle", "data-testid": "order-edit-button", onClick: onEditClick, children: /* @__PURE__ */ jsx(IconEdit, { size: 14 }) }) })
  ] }) }),
  /* @__PURE__ */ jsx(DetailItem, { icon: IconId, label: i18n._(
    /*i18n*/
    {
      id: "TPoYsF"
    }
  ), value: order.public_id }),
  /* @__PURE__ */ jsx(DetailItem, { icon: IconMail, label: i18n._(
    /*i18n*/
    {
      id: "O3oNi5"
    }
  ), value: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
    /* @__PURE__ */ jsx("span", { style: {
      wordBreak: "break-all"
    }, children: order.email }),
    allowSelfEdit && order.status !== "CANCELLED" && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
      /*i18n*/
      {
        id: "sQxe68"
      }
    ), children: /* @__PURE__ */ jsx(ActionIcon, { size: "xs", variant: "subtle", "data-testid": "resend-confirmation-button", onClick: onResendClick, children: /* @__PURE__ */ jsx(IconSend, { size: 14 }) }) })
  ] }) }),
  /* @__PURE__ */ jsx(DetailItem, { icon: IconCalendar, label: i18n._(
    /*i18n*/
    {
      id: "q/CcwE"
    }
  ), value: dateToBrowserTz(order.created_at, event.timezone) }),
  !!order.refund_status && /* @__PURE__ */ jsx(DetailItem, { icon: IconMenuOrder, label: i18n._(
    /*i18n*/
    {
      id: "xHpVRl"
    }
  ), value: /* @__PURE__ */ jsx(RefundStatusType, { order }) }),
  order.payment_status !== "PAYMENT_RECEIVED" && order.payment_status !== "NO_PAYMENT_REQUIRED" && /* @__PURE__ */ jsx(DetailItem, { icon: IconCash, label: i18n._(
    /*i18n*/
    {
      id: "wJTzyi"
    }
  ), value: /* @__PURE__ */ jsx(PaymentStatus, { order }) }),
  order.address && /* @__PURE__ */ jsx(DetailItem, { icon: IconMapPin, label: i18n._(
    /*i18n*/
    {
      id: "8rE61T"
    }
  ), value: formatAddress(order.address) })
] }) });
const EventDetails = ({
  event,
  order
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const orderOccurrence = (_b = (_a = order.order_items) == null ? void 0 : _a[0]) == null ? void 0 : _b.event_occurrence;
  const effective = resolveEventLocation(event, orderOccurrence);
  const isInPerson = (effective == null ? void 0 : effective.type) === LocationType.InPerson;
  const venueName = isInPerson ? ((_c = effective.location) == null ? void 0 : _c.name) || ((_e = (_d = effective.location) == null ? void 0 : _d.structured_address) == null ? void 0 : _e.venue_name) || null : null;
  const formattedAddress = isInPerson && ((_f = effective.location) == null ? void 0 : _f.structured_address) ? formatAddress(effective.location.structured_address) : "";
  const venueDetails = isInPerson ? venueName ? `${venueName}${formattedAddress ? `, ${formattedAddress}` : ""}` : formattedAddress || null : null;
  const mapsUrl = ((_g = getEventLocationDisplay(event, orderOccurrence)) == null ? void 0 : _g.mapsUrl) ?? "";
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(SimpleGrid, { cols: {
    base: 1,
    sm: 2
  }, spacing: "md", children: [
    /* @__PURE__ */ jsx(DetailItem, { icon: IconCalendarEvent, label: i18n._(
      /*i18n*/
      {
        id: "/dgc8E"
      }
    ), value: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(EventDateRange, { event, occurrence: orderOccurrence }),
      (orderOccurrence == null ? void 0 : orderOccurrence.label) && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mt: 2, children: orderOccurrence.label })
    ] }) }),
    venueDetails && /* @__PURE__ */ jsx(DetailItem, { icon: IconMapPin, label: i18n._(
      /*i18n*/
      {
        id: "wJijgU"
      }
    ), value: /* @__PURE__ */ jsx(NavLink, { to: mapsUrl, target: "_blank", children: venueDetails }) }),
    /* @__PURE__ */ jsx(DetailItem, { icon: IconClock, label: i18n._(
      /*i18n*/
      {
        id: "40Gx0U"
      }
    ), value: event.timezone }),
    /* @__PURE__ */ jsx(DetailItem, { icon: IconBuilding, label: i18n._(
      /*i18n*/
      {
        id: "G5RhpL"
      }
    ), value: /* @__PURE__ */ jsxs(Fragment, { children: [
      ((_h = event.organizer) == null ? void 0 : _h.email) && /* @__PURE__ */ jsx(NavLink, { to: ((_i = event.organizer) == null ? void 0 : _i.email) ? `mailto:${event.organizer.email}` : "#", children: (_j = event.organizer) == null ? void 0 : _j.name }),
      !((_k = event.organizer) == null ? void 0 : _k.email) && ((_l = event.organizer) == null ? void 0 : _l.name)
    ] }) })
  ] }) });
};
const OrderStatus = ({
  order
}) => {
  if ((order == null ? void 0 : order.status) === "CANCELLED") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "cancelled", message: i18n._(
      /*i18n*/
      {
        id: "H5qWhm"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "YyEJij"
      }
    ) });
  }
  if ((order == null ? void 0 : order.status) === "COMPLETED") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "success", message: i18n._(
      /*i18n*/
      {
        id: "b6+Y+n"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "e3uMJH"
      }
    ) });
  }
  return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "processing", message: i18n._(
    /*i18n*/
    {
      id: "JcejNJ"
    }
  ), subtitle: i18n._(
    /*i18n*/
    {
      id: "j5FdeA"
    }
  ) });
};
const PostCheckoutMessage = ({
  message
}) => /* @__PURE__ */ jsxs("div", { style: {
  marginTop: "20px",
  marginBottom: "40px"
}, children: [
  /* @__PURE__ */ jsx("h1", { className: classes.heading, children: i18n._(
    /*i18n*/
    {
      id: "pn5qSs"
    }
  ) }),
  /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
    __html: message
  } }) })
] });
const OfflinePaymentInstructions = ({
  event
}) => {
  var _a;
  return /* @__PURE__ */ jsxs("div", { style: {
    marginTop: "20px",
    marginBottom: "40px"
  }, children: [
    /* @__PURE__ */ jsx("h2", { children: i18n._(
      /*i18n*/
      {
        id: "JEdsvQ"
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
      __html: ((_a = event == null ? void 0 : event.settings) == null ? void 0 : _a.offline_payment_instructions) || ""
    } }) })
  ] });
};
const OrderSummaryAndProducts = () => {
  var _a, _b, _c, _d, _e, _f, _g;
  const {
    eventId,
    orderShortId
  } = useParams();
  const location = useLocation();
  const {
    data: order,
    isFetched: orderIsFetched,
    isError
  } = useGetOrderPublic(eventId, orderShortId, ["event"]);
  const event = order == null ? void 0 : order.event;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const emailUpdated = ((_a = location.state) == null ? void 0 : _a.emailUpdated) === true;
  const [editingAttendee, setEditingAttendee] = useState(null);
  const [editOrderModalOpened, setEditOrderModalOpened] = useState(false);
  useEffect(() => {
    if (eventId && order && (order.status === "COMPLETED" || order.status === "AWAITING_OFFLINE_PAYMENT")) {
      clearWaitlistJoinedForEvent(eventId);
    }
  }, [eventId, order == null ? void 0 : order.status]);
  const editAttendeeMutation = useEditAttendeePublic();
  const editOrderMutation = useEditOrderPublic();
  const resendAttendeeTicketMutation = useResendAttendeeTicketPublic();
  const resendOrderConfirmationMutation = useResendOrderConfirmationPublic();
  const allowSelfEdit = ((_b = event == null ? void 0 : event.settings) == null ? void 0 : _b.allow_attendee_self_edit) ?? false;
  const handleEditAttendee = (attendee, data) => {
    editAttendeeMutation.mutate({
      eventId,
      orderShortId,
      attendeeShortId: attendee.short_id,
      data
    }, {
      onSuccess: (result) => {
        queryClient.invalidateQueries({
          queryKey: [GET_ORDER_PUBLIC_QUERY_KEY]
        });
        setEditingAttendee(null);
        showSuccess(result.message || i18n._(
          /*i18n*/
          {
            id: "22BOve"
          }
        ));
        if (result.warning) {
          showError(result.warning);
        }
      },
      onError: (error) => {
        var _a2, _b2, _c2;
        if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 429) {
          showError(i18n._(
            /*i18n*/
            {
              id: "mnUGVC"
            }
          ));
        } else {
          showError(((_c2 = (_b2 = error == null ? void 0 : error.response) == null ? void 0 : _b2.data) == null ? void 0 : _c2.message) || i18n._(
            /*i18n*/
            {
              id: "E9jY+o"
            }
          ));
        }
      }
    });
  };
  const handleEditOrder = (data) => {
    editOrderMutation.mutate({
      eventId,
      orderShortId,
      data
    }, {
      onSuccess: (result) => {
        setEditOrderModalOpened(false);
        showSuccess(result.message || i18n._(
          /*i18n*/
          {
            id: "1SQRYo"
          }
        ));
        if (result.new_short_id) {
          navigate(`/checkout/${eventId}/${result.new_short_id}/summary`, {
            state: {
              emailUpdated: true
            }
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: [GET_ORDER_PUBLIC_QUERY_KEY]
          });
        }
        if (result.warning) {
          showError(result.warning);
        }
      },
      onError: (error) => {
        var _a2, _b2, _c2;
        if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 429) {
          showError(i18n._(
            /*i18n*/
            {
              id: "mnUGVC"
            }
          ));
        } else {
          showError(((_c2 = (_b2 = error == null ? void 0 : error.response) == null ? void 0 : _b2.data) == null ? void 0 : _c2.message) || i18n._(
            /*i18n*/
            {
              id: "rpGMzC"
            }
          ));
        }
      }
    });
  };
  const handleResendAttendeeTicket = (attendee) => {
    if (!window.confirm(i18n._(
      /*i18n*/
      {
        id: "xeIaKw",
        values: {
          0: attendee.email
        }
      }
    ))) {
      return;
    }
    resendAttendeeTicketMutation.mutate({
      eventId,
      orderShortId,
      attendeeShortId: attendee.short_id
    }, {
      onSuccess: (result) => {
        showSuccess(result.message || i18n._(
          /*i18n*/
          {
            id: "pGZOcL"
          }
        ));
      },
      onError: (error) => {
        var _a2, _b2, _c2;
        if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 429) {
          showError(i18n._(
            /*i18n*/
            {
              id: "mnUGVC"
            }
          ));
        } else {
          showError(((_c2 = (_b2 = error == null ? void 0 : error.response) == null ? void 0 : _b2.data) == null ? void 0 : _c2.message) || i18n._(
            /*i18n*/
            {
              id: "DjSbj3"
            }
          ));
        }
      }
    });
  };
  const handleResendOrderConfirmation = () => {
    if (!window.confirm(i18n._(
      /*i18n*/
      {
        id: "cDtoWq",
        values: {
          0: order == null ? void 0 : order.email
        }
      }
    ))) {
      return;
    }
    resendOrderConfirmationMutation.mutate({
      eventId,
      orderShortId
    }, {
      onSuccess: (result) => {
        showSuccess(result.message || i18n._(
          /*i18n*/
          {
            id: "CsTTH0"
          }
        ));
      },
      onError: (error) => {
        var _a2, _b2, _c2;
        if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 429) {
          showError(i18n._(
            /*i18n*/
            {
              id: "mnUGVC"
            }
          ));
        } else {
          showError(((_c2 = (_b2 = error == null ? void 0 : error.response) == null ? void 0 : _b2.data) == null ? void 0 : _c2.message) || i18n._(
            /*i18n*/
            {
              id: "EJPAcd"
            }
          ));
        }
      }
    });
  };
  if (isError) {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "not_found", message: i18n._(
      /*i18n*/
      {
        id: "kvYpYu"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "2RZK9x"
      }
    ) });
  }
  if (!orderIsFetched || !order || !event) {
    return /* @__PURE__ */ jsx(LoadingMask, {});
  }
  if (typeof window !== "undefined" && window.location.search.includes("failed") || (order == null ? void 0 : order.payment_status) === "PAYMENT_FAILED") {
    navigate(eventCheckoutPath(eventId, orderShortId, "payment") + "?payment_failed=true");
    return;
  }
  if ((order == null ? void 0 : order.status) !== "COMPLETED" && (order == null ? void 0 : order.status) !== "CANCELLED" && (order == null ? void 0 : order.status) !== "AWAITING_OFFLINE_PAYMENT") {
    return /* @__PURE__ */ jsx(OrderStatus, { order });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(CheckoutContent, { children: [
      /* @__PURE__ */ jsx(CheckoutStepTitle, { title: i18n._(
        /*i18n*/
        {
          id: "dXoieq"
        }
      ) }),
      /* @__PURE__ */ jsx(WelcomeHeader, { order, event, allowSelfEdit }),
      emailUpdated && /* @__PURE__ */ jsx(Alert, { icon: /* @__PURE__ */ jsx(IconCheck, { size: 16 }), color: "green", mb: "lg", radius: "lg", style: {
        backgroundColor: "var(--checkout-surface, #ECFDF5)",
        borderColor: "var(--checkout-border, #D1FAE5)"
      }, children: /* @__PURE__ */ jsx(Text, { size: "sm", style: {
        color: "var(--checkout-text-primary, #065F46)"
      }, children: i18n._(
        /*i18n*/
        {
          id: "gzrCuN"
        }
      ) }) }),
      /* @__PURE__ */ jsx(InlineOrderSummary, { event, order, showBuyerProtection: false, defaultExpanded: false }),
      (order == null ? void 0 : order.status) === "AWAITING_OFFLINE_PAYMENT" && /* @__PURE__ */ jsx(OfflinePaymentInstructions, { event }),
      /* @__PURE__ */ jsx("h1", { className: classes.heading, children: i18n._(
        /*i18n*/
        {
          id: "Tol4BF"
        }
      ) }),
      /* @__PURE__ */ jsx(OrderDetails, { order, event, allowSelfEdit, onEditClick: () => setEditOrderModalOpened(true), onResendClick: handleResendOrderConfirmation }),
      /* @__PURE__ */ jsx(OnlineEventDetails, { event, occurrence: ((_d = (_c = order.order_items) == null ? void 0 : _c[0]) == null ? void 0 : _d.event_occurrence) ?? null }),
      !!((_e = event == null ? void 0 : event.settings) == null ? void 0 : _e.post_checkout_message) && /* @__PURE__ */ jsx(PostCheckoutMessage, { message: event.settings.post_checkout_message }),
      /* @__PURE__ */ jsx("h1", { className: classes.heading, children: i18n._(
        /*i18n*/
        {
          id: "QcCPs8"
        }
      ) }),
      /* @__PURE__ */ jsx(EventDetails, { event, order }),
      order.status === "COMPLETED" && /* @__PURE__ */ jsx(AddToCalendarCTA, { event, occurrence: (_g = (_f = order.order_items) == null ? void 0 : _f[0]) == null ? void 0 : _g.event_occurrence }),
      (order == null ? void 0 : order.attendees) && order.attendees.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "center", children: [
          /* @__PURE__ */ jsx("h1", { className: classes.heading, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsx(IconTicket, { size: 20 }),
            i18n._(
              /*i18n*/
              {
                id: "R4r4XO"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "subtle", leftSection: /* @__PURE__ */ jsx(IconPrinter, { size: 16 }), onClick: () => window == null ? void 0 : window.open(`/order/${eventId}/${orderShortId}/print`, "_blank"), children: i18n._(
            /*i18n*/
            {
              id: "MT7dxz"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx("div", { className: classes.guestList, children: order.attendees.map((attendee) => /* @__PURE__ */ jsx(GuestListItem, { attendee, event, allowSelfEdit, onEditClick: () => setEditingAttendee(attendee), onResendClick: () => handleResendAttendeeTicket(attendee) }, attendee.id)) }) })
      ] }),
      /* @__PURE__ */ jsx(PoweredByFooter, {})
    ] }),
    editingAttendee && /* @__PURE__ */ jsx(EditAttendeeModal, { opened: !!editingAttendee, onClose: () => setEditingAttendee(null), attendee: editingAttendee, onSuccess: (values) => {
      handleEditAttendee(editingAttendee, values);
    } }),
    order && /* @__PURE__ */ jsx(EditOrderModal, { opened: editOrderModalOpened, onClose: () => setEditOrderModalOpened(false), order, onSuccess: (values) => {
      handleEditOrder(values);
    } })
  ] });
};
export {
  OrderSummaryAndProducts,
  OrderSummaryAndProducts as default
};

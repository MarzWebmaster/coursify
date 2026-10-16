import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Anchor, Text, Popover, Group, Button, Tooltip, Menu } from "@mantine/core";
import { IconSend, IconCopy, IconCalendarEvent, IconFileInvoice, IconFileOff, IconClock, IconTicket, IconCreditCard, IconCash, IconHelp, IconCheck, IconClockPause, IconX, IconAlertCircle, IconDotsVertical } from "@tabler/icons-react";
import { f as formatDateWithLocale, r as relativeDate } from "./dates-CbVpwZeX.js";
import { e as useOrderActions, M as ManageOrderModal, f as EntityActionMenuItems } from "./index-DTsqBh8c.js";
import { useDisclosure, useClipboard } from "@mantine/hooks";
import { useState, useMemo } from "react";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { j as formatNumber } from "../entry.server.js";
import { u as useUrlHash } from "./useUrlHash-BZci-yZ8.js";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { T as TanStackTable } from "./index-D0pbWAZK.js";
import { C as ColumnVisibilityToggle } from "./index-DuG5BVAJ.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
const customerDetails = "_customerDetails_z6b84_1";
const nameRow = "_nameRow_z6b84_9";
const customerName = "_customerName_z6b84_16";
const companyName = "_companyName_z6b84_27";
const customerEmail = "_customerEmail_z6b84_33";
const orderDetails = "_orderDetails_z6b84_43";
const orderId = "_orderId_z6b84_49";
const orderMeta = "_orderMeta_z6b84_61";
const createdDate = "_createdDate_z6b84_68";
const invoiceLink = "_invoiceLink_z6b84_74";
const noInvoice = "_noInvoice_z6b84_88";
const reservedUntil = "_reservedUntil_z6b84_97";
const occurrenceChip = "_occurrenceChip_z6b84_106";
const itemsBadge = "_itemsBadge_z6b84_116";
const amountDetails = "_amountDetails_z6b84_128";
const amountGross = "_amountGross_z6b84_134";
const amountBreakdown = "_amountBreakdown_z6b84_141";
const refundedAmount = "_refundedAmount_z6b84_147";
const paymentStatus = "_paymentStatus_z6b84_164";
const statusBadge = "_statusBadge_z6b84_172";
const actionsMenu = "_actionsMenu_z6b84_203";
const action = "_action_z6b84_203";
const classes = {
  customerDetails,
  nameRow,
  customerName,
  companyName,
  customerEmail,
  orderDetails,
  orderId,
  orderMeta,
  createdDate,
  invoiceLink,
  noInvoice,
  reservedUntil,
  occurrenceChip,
  itemsBadge,
  amountDetails,
  amountGross,
  amountBreakdown,
  refundedAmount,
  paymentStatus,
  statusBadge,
  actionsMenu,
  action
};
const OrdersTable = ({
  orders,
  event,
  compact
}) => {
  const [isViewModalOpen, viewModal] = useDisclosure(false);
  const [orderId2, setOrderId] = useState();
  const [emailPopoverId, setEmailPopoverId] = useState(null);
  const clipboard = useClipboard({
    timeout: 2e3
  });
  const {
    getOrderActions,
    orderActionModals,
    openMessageModal,
    downloadInvoice
  } = useOrderActions({
    eventId: event.id,
    onManage: (order) => handleModalClick(order.id, viewModal)
  });
  useUrlHash(/^#order-(\d+)$/, (matches) => {
    const orderId22 = matches[1];
    setOrderId(orderId22);
    viewModal.open();
  });
  const handleModalClick = (orderId22, modal) => {
    setOrderId(orderId22);
    modal.open();
  };
  const handleCopyEmail = (email) => {
    clipboard.copy(email);
    showSuccess(i18n._(
      /*i18n*/
      {
        id: "hbwCKE"
      }
    ));
    setEmailPopoverId(null);
  };
  const handleMessageFromEmail = (order) => {
    setEmailPopoverId(null);
    openMessageModal(order);
  };
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  const ActionMenu = ({
    order
  }) => {
    return /* @__PURE__ */ jsx(Group, { wrap: "nowrap", gap: 0, justify: "flex-end", children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx("div", { className: classes.action, children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "transparent", "data-testid": "order-actions-trigger", children: /* @__PURE__ */ jsx(IconDotsVertical, {}) }) }) }),
      /* @__PURE__ */ jsx(Menu.Dropdown, { children: /* @__PURE__ */ jsx(EntityActionMenuItems, { actions: getOrderActions(order) }) })
    ] }) });
  };
  const columns = useMemo(() => [{
    id: "customer",
    header: i18n._(
      /*i18n*/
      {
        id: "876pfE"
      }
    ),
    enableHiding: false,
    cell: (info) => {
      const order = info.row.original;
      return /* @__PURE__ */ jsxs("div", { className: classes.customerDetails, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.nameRow, children: [
          /* @__PURE__ */ jsxs(Anchor, { onClick: () => handleModalClick(order.id, viewModal), className: classes.customerName, style: {
            cursor: "pointer"
          }, children: [
            order.first_name,
            " ",
            order.last_name
          ] }),
          order.company_name && /* @__PURE__ */ jsx(Text, { className: classes.companyName, children: order.company_name })
        ] }),
        /* @__PURE__ */ jsxs(Popover, { opened: emailPopoverId === order.id, onChange: (opened) => {
          if (!opened) setEmailPopoverId(null);
        }, width: 200, position: "bottom", withArrow: true, shadow: "md", children: [
          /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsx(Anchor, { onClick: () => setEmailPopoverId(order.id), className: classes.customerEmail, style: {
            cursor: "pointer"
          }, children: order.email }) }),
          /* @__PURE__ */ jsx(Popover.Dropdown, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", style: {
            flexDirection: "column",
            width: "100%"
          }, children: [
            /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "light", leftSection: /* @__PURE__ */ jsx(IconSend, { size: 16 }), onClick: () => handleMessageFromEmail(order), children: i18n._(
              /*i18n*/
              {
                id: "xDAtGP"
              }
            ) }),
            /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "light", color: "gray", leftSection: /* @__PURE__ */ jsx(IconCopy, { size: 16 }), onClick: () => handleCopyEmail(order.email), children: i18n._(
              /*i18n*/
              {
                id: "ZN1WLO"
              }
            ) })
          ] }) })
        ] })
      ] });
    },
    meta: {
      headerStyle: {
        minWidth: 280
      }
    }
  }, {
    id: "orderDetails",
    header: i18n._(
      /*i18n*/
      {
        id: "Tol4BF"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      var _a, _b;
      const order = info.row.original;
      const occurrence = (_b = (_a = order.order_items) == null ? void 0 : _a[0]) == null ? void 0 : _b.event_occurrence;
      return /* @__PURE__ */ jsxs("div", { className: classes.orderDetails, children: [
        /* @__PURE__ */ jsx(Anchor, { onClick: () => handleModalClick(order.id, viewModal), className: classes.orderId, style: {
          cursor: "pointer"
        }, children: order.public_id }),
        occurrence && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsxs("span", { className: classes.occurrenceChip, children: [
          /* @__PURE__ */ jsx(IconCalendarEvent, { size: 12 }),
          formatDateWithLocale(occurrence.start_date, "shortDate", event.timezone),
          " ",
          formatDateWithLocale(occurrence.start_date, "timeOnly", event.timezone),
          occurrence.label && ` · ${occurrence.label}`
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.orderMeta, children: [
          /* @__PURE__ */ jsx(Text, { className: classes.createdDate, children: relativeDate(order.created_at) }),
          order.latest_invoice ? /* @__PURE__ */ jsxs(Anchor, { onClick: () => downloadInvoice(order.latest_invoice), className: classes.invoiceLink, style: {
            cursor: "pointer"
          }, children: [
            /* @__PURE__ */ jsx(IconFileInvoice, { size: 14 }),
            i18n._(
              /*i18n*/
              {
                id: "IuMGvq"
              }
            ),
            " #",
            order.latest_invoice.invoice_number
          ] }) : /* @__PURE__ */ jsxs(Text, { className: classes.noInvoice, children: [
            /* @__PURE__ */ jsx(IconFileOff, { size: 14 }),
            i18n._(
              /*i18n*/
              {
                id: "EpvBAp"
              }
            )
          ] }),
          order.status === "RESERVED" && order.reserved_until && /* @__PURE__ */ jsxs(Text, { className: classes.reservedUntil, children: [
            /* @__PURE__ */ jsx(IconClock, { size: 14 }),
            i18n._(
              /*i18n*/
              {
                id: "8wUjGl"
              }
            ),
            " ",
            formatTime(order.reserved_until)
          ] })
        ] })
      ] });
    }
  }, {
    id: "items",
    header: i18n._(
      /*i18n*/
      {
        id: "BzfzPK"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      var _a, _b;
      const order = info.row.original;
      const totalQuantity = ((_a = order.order_items) == null ? void 0 : _a.reduce((sum, item) => sum + item.quantity, 0)) || 0;
      const itemBreakdown = ((_b = order.order_items) == null ? void 0 : _b.map((item) => `${item.quantity}x ${item.item_name}`).join("\n")) || "";
      return /* @__PURE__ */ jsx(Tooltip, { label: itemBreakdown, multiline: true, withArrow: true, disabled: !itemBreakdown, children: /* @__PURE__ */ jsxs("div", { className: classes.itemsBadge, children: [
        /* @__PURE__ */ jsx(IconTicket, { size: 14 }),
        formatNumber(totalQuantity),
        " ",
        i18n._(
          /*i18n*/
          {
            id: "F5/CBH"
          }
        )
      ] }) });
    }
  }, {
    id: "amount",
    header: i18n._(
      /*i18n*/
      {
        id: "hehnjM"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      const order = info.row.original;
      return /* @__PURE__ */ jsxs("div", { className: classes.amountDetails, children: [
        /* @__PURE__ */ jsx(Text, { className: classes.amountGross, children: formatCurrency(order.total_gross, order.currency) }),
        /* @__PURE__ */ jsxs(Text, { className: classes.amountBreakdown, children: [
          i18n._(
            /*i18n*/
            {
              id: "JpohL9"
            }
          ),
          ": ",
          formatCurrency(order.total_tax, order.currency),
          " •",
          " ",
          i18n._(
            /*i18n*/
            {
              id: "/mfICu"
            }
          ),
          ": ",
          formatCurrency(order.total_fee, order.currency)
        ] }),
        order.refund_status && /* @__PURE__ */ jsxs(Text, { className: classes.refundedAmount, "data-refund-status": order.refund_status, children: [
          order.refund_status === "REFUNDED" && i18n._(
            /*i18n*/
            {
              id: "BDSRuX",
              values: {
                0: formatCurrency(order.total_refunded, order.currency)
              }
            }
          ),
          order.refund_status === "PARTIALLY_REFUNDED" && i18n._(
            /*i18n*/
            {
              id: "fFYotW",
              values: {
                0: formatCurrency(order.total_refunded, order.currency)
              }
            }
          ),
          order.refund_status === "REFUND_PENDING" && i18n._(
            /*i18n*/
            {
              id: "MGbi9P"
            }
          ),
          order.refund_status === "REFUND_FAILED" && i18n._(
            /*i18n*/
            {
              id: "qY4rpA"
            }
          )
        ] })
      ] });
    }
  }, {
    id: "payment",
    header: i18n._(
      /*i18n*/
      {
        id: "621rYf"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      const order = info.row.original;
      return /* @__PURE__ */ jsx("div", { className: classes.paymentStatus, children: order.payment_provider === "STRIPE" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(IconCreditCard, { size: 16 }),
        /* @__PURE__ */ jsx(Text, { children: i18n._(
          /*i18n*/
          {
            id: "4HXezG"
          }
        ) })
      ] }) : order.payment_provider === "OFFLINE" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(IconCash, { size: 16 }),
        /* @__PURE__ */ jsx(Text, { children: i18n._(
          /*i18n*/
          {
            id: "6Aih4U"
          }
        ) })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(IconHelp, { size: 16 }),
        /* @__PURE__ */ jsx(Text, { children: i18n._(
          /*i18n*/
          {
            id: "/IX/7x"
          }
        ) })
      ] }) });
    }
  }, {
    id: "status",
    header: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      const order = info.row.original;
      return /* @__PURE__ */ jsxs("div", { className: classes.statusBadge, "data-status": order.status, children: [
        order.status === "COMPLETED" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconCheck, { size: 14 }),
          i18n._(
            /*i18n*/
            {
              id: "qqWcBV"
            }
          )
        ] }),
        order.status === "RESERVED" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconClock, { size: 14 }),
          i18n._(
            /*i18n*/
            {
              id: "Uwsg2F"
            }
          )
        ] }),
        order.status === "AWAITING_OFFLINE_PAYMENT" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconClockPause, { size: 14 }),
          i18n._(
            /*i18n*/
            {
              id: "ioG+xt"
            }
          )
        ] }),
        order.status === "CANCELLED" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconX, { size: 14 }),
          i18n._(
            /*i18n*/
            {
              id: "vv7kpg"
            }
          )
        ] }),
        order.status === "ABANDONED" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconAlertCircle, { size: 14 }),
          i18n._(
            /*i18n*/
            {
              id: "aS0jtz"
            }
          )
        ] })
      ] });
    }
  }, {
    id: "actions",
    header: i18n._(
      /*i18n*/
      {
        id: "7L01XJ"
      }
    ),
    enableHiding: false,
    cell: (info) => {
      const order = info.row.original;
      return /* @__PURE__ */ jsx("div", { className: classes.actionsMenu, children: /* @__PURE__ */ jsx(ActionMenu, { order }) });
    },
    meta: {
      sticky: "right"
    }
  }], [event.id, emailPopoverId]);
  if (orders.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { imageHref: "/blank-slate/orders.svg", heading: i18n._(
      /*i18n*/
      {
        id: "J2LkP8"
      }
    ), subHeading: /* @__PURE__ */ jsx("p", { children: i18n._(
      /*i18n*/
      {
        id: "7YJdgG"
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TanStackTable, { data: orders, columns, storageKey: "orders-table", enableColumnVisibility: !compact, renderColumnVisibilityToggle: !compact ? (table) => /* @__PURE__ */ jsx(ColumnVisibilityToggle, { table }) : void 0, hideHeader: compact, noCard: compact }),
    orderId2 && isViewModalOpen && /* @__PURE__ */ jsx(ManageOrderModal, { onClose: viewModal.close, orderId: orderId2 }),
    orderActionModals
  ] });
};
export {
  OrdersTable as O
};

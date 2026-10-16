import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { A as AttendeeTicket } from "./index-BXVupOij.js";
import { P as PoweredByFooter } from "../entry.server.js";
import { useParams } from "react-router";
import { u as useGetOrderPublic } from "./useGetOrderPublic-Ck7WTgJ2.js";
import { useEffect } from "react";
import { c as classes } from "./PrintOrder.module-C-oM9aIG.js";
import "./products-BLTGbPdF.js";
import "./types-CqPWB-a5.js";
import "@mantine/core";
import "./currency-Br7a8J7F.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-qr-code";
import "@tabler/icons-react";
import "./urlHelper-CsaWRwIV.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./index-BfWJHinS.js";
import "react-dom/server";
import "@tanstack/react-query";
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
import "./order.client-BmBVeAyF.js";
const PrintOrder = () => {
  var _a;
  const {
    eventId,
    orderShortId
  } = useParams();
  const {
    data: order
  } = useGetOrderPublic(eventId, orderShortId, ["event"]);
  const event = order == null ? void 0 : order.event;
  useEffect(() => {
    if (order && event) {
      setTimeout(() => window == null ? void 0 : window.print(), 500);
    }
  }, [order, event]);
  if (!order || !event) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsxs("h2", { className: classes.title, children: [
      i18n._(
        /*i18n*/
        {
          id: "54q0zp"
        }
      ),
      " ",
      event.title
    ] }),
    (_a = order.attendees) == null ? void 0 : _a.map((attendee) => {
      return /* @__PURE__ */ jsx("div", { className: classes.ticketPage, children: /* @__PURE__ */ jsx(AttendeeTicket, { attendee, product: attendee.product, event, hideButtons: true, showPoweredBy: true }) }, attendee.id);
    }),
    /* @__PURE__ */ jsx("div", { className: classes.webOnlyFooter, children: /* @__PURE__ */ jsx(PoweredByFooter, {}) })
  ] });
};
export {
  PrintOrder,
  PrintOrder as default
};

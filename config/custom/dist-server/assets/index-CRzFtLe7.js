import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams } from "react-router";
import { T as useGetEventPublic, P as PoweredByFooter } from "../entry.server.js";
import { u as useGetAttendeePublic } from "./useGetAttendeePublic-BysFq0vV.js";
import { A as AttendeeTicket } from "./index-BXVupOij.js";
import { useEffect } from "react";
import { O as OnlineEventDetails } from "./index-CicViJRN.js";
import { c as classes } from "./PrintOrder.module-C-oM9aIG.js";
import "react-dom/server";
import "@tanstack/react-query";
import "@mantine/core";
import "@tabler/icons-react";
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
import "./attendee.client-CeeZ2TBj.js";
import "./products-BLTGbPdF.js";
import "./types-CqPWB-a5.js";
import "./currency-Br7a8J7F.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-qr-code";
import "./urlHelper-CsaWRwIV.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./index-BfWJHinS.js";
import "./index-jHMtuNEo.js";
const PrintProduct = () => {
  const {
    eventId,
    attendeeShortId
  } = useParams();
  const {
    data: event
  } = useGetEventPublic(eventId);
  const {
    data: attendee
  } = useGetAttendeePublic(eventId, String(attendeeShortId));
  useEffect(() => {
    if (attendee && event) {
      setTimeout(() => window == null ? void 0 : window.print(), 500);
    }
  }, [attendee, event]);
  if (!event || !attendee) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsxs("h2", { className: classes.title, children: [
      i18n._(
        /*i18n*/
        {
          id: "1BPctx"
        }
      ),
      " ",
      event.title
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.ticketPage, children: [
      /* @__PURE__ */ jsx(AttendeeTicket, { attendee, product: attendee.product, event, hideButtons: true }),
      /* @__PURE__ */ jsx("div", { style: {
        marginTop: "32px",
        maxWidth: "900px",
        width: "100%"
      }, children: /* @__PURE__ */ jsx(OnlineEventDetails, { event, occurrence: attendee.event_occurrence ?? null }) }),
      /* @__PURE__ */ jsx("div", { className: classes.poweredBy, children: /* @__PURE__ */ jsx(PoweredByFooter, {}) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes.webOnlyFooter, children: /* @__PURE__ */ jsx(PoweredByFooter, {}) })
  ] });
};
export {
  PrintProduct as default
};

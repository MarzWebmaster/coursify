import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams } from "react-router";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { u as useGetMe, P as PoweredByFooter } from "../entry.server.js";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { u as useGetEventImages } from "./useGetEventImages-BmsHxpY1.js";
import { A as AttendeeTicket } from "./index-BXVupOij.js";
import { useEffect } from "react";
import { r as resolveEventLocation } from "./effectiveLocation-BzDgAlu_.js";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { c as classes } from "./PrintOrder.module-C-oM9aIG.js";
import "@tanstack/react-query";
import "react-dom/server";
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
const TicketDesignerPrint = () => {
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const meQuery = useGetMe();
  const settingsQuery = useGetEventSettings(eventId);
  const imagesQuery = useGetEventImages(eventId);
  const event = eventQuery.data;
  const user = meQuery.data;
  const settings = settingsQuery.data;
  const images = imagesQuery.data;
  useEffect(() => {
    if (event && user && settings) {
      setTimeout(() => window == null ? void 0 : window.print(), 500);
    }
  }, [event, user, settings]);
  if (!event || !user || !settings) {
    return null;
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
      public_id: "ORD123",
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
      ticket_design_settings: settings.ticket_design_settings
    },
    images: images || []
  };
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsxs("h2", { className: classes.title, children: [
      i18n._(
        /*i18n*/
        {
          id: "1tfWrD"
        }
      ),
      " ",
      event.title
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.ticketPage, children: [
      /* @__PURE__ */ jsx(AttendeeTicket, { attendee: mockAttendee, product: mockProduct, event: eventWithDesignSettings, hideButtons: true }),
      /* @__PURE__ */ jsx("div", { className: classes.poweredBy, children: /* @__PURE__ */ jsx(PoweredByFooter, {}) })
    ] })
  ] });
};
export {
  TicketDesignerPrint as default
};

import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { a as getAttendeeProductPrice, g as getAttendeeProductTitle } from "./products-BLTGbPdF.js";
import { Button, CopyButton } from "@mantine/core";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { p as prettyDate } from "./dates-CbVpwZeX.js";
import QRCode from "react-qr-code";
import { IconX, IconLock, IconPrinter, IconCopy } from "@tabler/icons-react";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { i as imageUrl } from "./urlHelper-CsaWRwIV.js";
import { r as resolveEventLocation } from "./effectiveLocation-BzDgAlu_.js";
import { f as formatAddress } from "./addressUtilities-7xIQim0X.js";
import { P as PoweredByFooter } from "../entry.server.js";
import { E as EventDateRange } from "./index-BfWJHinS.js";
const ticketWrapper = "_ticketWrapper_1q6og_13";
const ticket = "_ticket_1q6og_13";
const header = "_header_1q6og_54";
const logo = "_logo_1q6og_61";
const headline = "_headline_1q6og_69";
const organizer = "_organizer_1q6og_74";
const eventTitle = "_eventTitle_1q6og_84";
const status = "_status_1q6og_94";
const statusCancelled = "_statusCancelled_1q6og_106";
const statusPending = "_statusPending_1q6og_110";
const main = "_main_1q6og_114";
const info = "_info_1q6og_120";
const fields = "_fields_1q6og_129";
const field = "_field_1q6og_129";
const fieldSpan = "_fieldSpan_1q6og_141";
const fieldLabel = "_fieldLabel_1q6og_145";
const fieldValue = "_fieldValue_1q6og_154";
const fieldMeta = "_fieldMeta_1q6og_162";
const fieldEmphasis = "_fieldEmphasis_1q6og_170";
const note = "_note_1q6og_176";
const stub = "_stub_1q6og_187";
const code = "_code_1q6og_201";
const codeInner = "_codeInner_1q6og_209";
const codeVoid = "_codeVoid_1q6og_250";
const codeMessage = "_codeMessage_1q6og_254";
const ticketId = "_ticketId_1q6og_268";
const ticketIdValue = "_ticketIdValue_1q6og_273";
const actions = "_actions_1q6og_283";
const poweredBy = "_poweredBy_1q6og_289";
const classes = {
  ticketWrapper,
  ticket,
  header,
  logo,
  headline,
  organizer,
  eventTitle,
  status,
  statusCancelled,
  statusPending,
  main,
  info,
  fields,
  field,
  fieldSpan,
  fieldLabel,
  fieldValue,
  fieldMeta,
  fieldEmphasis,
  note,
  stub,
  code,
  codeInner,
  codeVoid,
  codeMessage,
  ticketId,
  ticketIdValue,
  actions,
  poweredBy
};
const DEFAULT_ACCENT_COLOR = "#6B46C1";
const TicketField = ({
  label,
  value,
  meta,
  span,
  emphasis
}) => /* @__PURE__ */ jsxs("div", { className: [classes.field, span && classes.fieldSpan, emphasis && classes.fieldEmphasis].filter(Boolean).join(" "), children: [
  /* @__PURE__ */ jsx("dt", { className: classes.fieldLabel, children: label }),
  /* @__PURE__ */ jsx("dd", { className: classes.fieldValue, children: value }),
  meta && /* @__PURE__ */ jsx("dd", { className: classes.fieldMeta, children: meta })
] });
const AttendeeTicket = ({
  attendee,
  product,
  event,
  occurrence,
  hideButtons = false,
  showPoweredBy = false
}) => {
  var _a, _b, _c, _d, _e, _f;
  const ticketOccurrence = attendee.event_occurrence ?? occurrence;
  const productPrice = getAttendeeProductPrice(attendee, product);
  const eventLocation = resolveEventLocation(event, ticketOccurrence);
  const venueName = (eventLocation == null ? void 0 : eventLocation.type) === LocationType.InPerson ? ((_a = eventLocation.location) == null ? void 0 : _a.name) || ((_c = (_b = eventLocation.location) == null ? void 0 : _b.structured_address) == null ? void 0 : _c.venue_name) || null : null;
  const formattedAddress = (eventLocation == null ? void 0 : eventLocation.type) === LocationType.InPerson && ((_d = eventLocation.location) == null ? void 0 : _d.structured_address) ? formatAddress(eventLocation.location.structured_address) : "";
  const isInPerson = (eventLocation == null ? void 0 : eventLocation.type) === LocationType.InPerson && Boolean(venueName || formattedAddress);
  const isOnline = (eventLocation == null ? void 0 : eventLocation.type) === LocationType.Online;
  const ticketDesignSettings = (_e = event == null ? void 0 : event.settings) == null ? void 0 : _e.ticket_design_settings;
  const accentColor = (ticketDesignSettings == null ? void 0 : ticketDesignSettings.accent_color) || DEFAULT_ACCENT_COLOR;
  const footerText = ticketDesignSettings == null ? void 0 : ticketDesignSettings.footer_text;
  const dateDisplayMode = (ticketDesignSettings == null ? void 0 : ticketDesignSettings.date_display_mode) || "START_DATE_TIME";
  const logoUrl = imageUrl("TICKET_LOGO", event == null ? void 0 : event.images);
  const isCancelled = attendee.status === "CANCELLED";
  const isAwaitingPayment = attendee.status === "AWAITING_PAYMENT";
  const isVoid = isCancelled || isAwaitingPayment;
  const attendeeName = [attendee.first_name, attendee.last_name].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: classes.ticketWrapper, style: {
    "--accent": accentColor
  }, children: [
    /* @__PURE__ */ jsxs("article", { className: `${classes.ticket} ${isVoid ? classes.ticketVoid : ""}`, children: [
      /* @__PURE__ */ jsxs("header", { className: classes.header, children: [
        logoUrl && /* @__PURE__ */ jsx("img", { src: logoUrl, alt: "", className: classes.logo }),
        /* @__PURE__ */ jsxs("div", { className: classes.headline, children: [
          ((_f = event == null ? void 0 : event.organizer) == null ? void 0 : _f.name) && /* @__PURE__ */ jsx("p", { className: classes.organizer, children: event.organizer.name }),
          /* @__PURE__ */ jsx("h2", { className: classes.eventTitle, children: event == null ? void 0 : event.title })
        ] }),
        isVoid && /* @__PURE__ */ jsx("span", { className: `${classes.status} ${isCancelled ? classes.statusCancelled : classes.statusPending}`, children: isCancelled ? i18n._(
          /*i18n*/
          {
            id: "vv7kpg"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "7yiFvZ"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.main, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.info, children: [
          /* @__PURE__ */ jsxs("dl", { className: classes.fields, children: [
            /* @__PURE__ */ jsx(TicketField, { label: i18n._(
              /*i18n*/
              {
                id: "ss9PbX"
              }
            ), value: attendeeName, meta: attendee.email, span: true, emphasis: true }),
            dateDisplayMode !== "HIDDEN" && /* @__PURE__ */ jsx(TicketField, { label: i18n._(
              /*i18n*/
              {
                id: "JvUngl"
              }
            ), value: dateDisplayMode === "DATE_RANGE" ? /* @__PURE__ */ jsx(EventDateRange, { event, occurrence: ticketOccurrence }) : prettyDate((ticketOccurrence == null ? void 0 : ticketOccurrence.start_date) ?? event.start_date, event.timezone, true), meta: ticketOccurrence == null ? void 0 : ticketOccurrence.label }),
            isInPerson && /* @__PURE__ */ jsx(TicketField, { label: i18n._(
              /*i18n*/
              {
                id: "wJijgU"
              }
            ), value: venueName || formattedAddress, meta: venueName ? formattedAddress : void 0 }),
            isOnline && /* @__PURE__ */ jsx(TicketField, { label: i18n._(
              /*i18n*/
              {
                id: "wJijgU"
              }
            ), value: i18n._(
              /*i18n*/
              {
                id: "z+nuVJ"
              }
            ) }),
            /* @__PURE__ */ jsx(TicketField, { label: i18n._(
              /*i18n*/
              {
                id: "kjAL4v"
              }
            ), value: getAttendeeProductTitle(attendee, product) }),
            /* @__PURE__ */ jsx(TicketField, { label: i18n._(
              /*i18n*/
              {
                id: "a7u1N9"
              }
            ), value: productPrice > 0 ? formatCurrency(productPrice, event == null ? void 0 : event.currency) : i18n._(
              /*i18n*/
              {
                id: "2POOFK"
              }
            ) })
          ] }),
          footerText && /* @__PURE__ */ jsx("p", { className: classes.note, children: footerText })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: classes.stub, children: [
          /* @__PURE__ */ jsx("div", { className: `${classes.code} ${isVoid ? classes.codeVoid : ""}`, children: /* @__PURE__ */ jsx("div", { className: classes.codeInner, children: isVoid ? /* @__PURE__ */ jsxs("div", { className: classes.codeMessage, children: [
            isCancelled ? /* @__PURE__ */ jsx(IconX, { size: 22, stroke: 1.75 }) : /* @__PURE__ */ jsx(IconLock, { size: 22, stroke: 1.75 }),
            /* @__PURE__ */ jsx("span", { children: isCancelled ? i18n._(
              /*i18n*/
              {
                id: "1LuJNw"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "Xp+ywP"
              }
            ) })
          ] }) : /* @__PURE__ */ jsx(QRCode, { value: String(attendee.public_id), size: 200, level: "M", style: {
            height: "auto",
            width: "100%",
            display: "block"
          } }) }) }),
          /* @__PURE__ */ jsxs("div", { className: classes.ticketId, children: [
            /* @__PURE__ */ jsx("span", { className: classes.fieldLabel, children: i18n._(
              /*i18n*/
              {
                id: "awHmAT"
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: classes.ticketIdValue, children: attendee.public_id })
          ] })
        ] })
      ] })
    ] }),
    !hideButtons && /* @__PURE__ */ jsxs("div", { className: classes.actions, children: [
      /* @__PURE__ */ jsx(Button, { variant: "default", size: "sm", onClick: () => window == null ? void 0 : window.open(`/product/${event.id}/${attendee.short_id}/print`, "_blank"), leftSection: /* @__PURE__ */ jsx(IconPrinter, { size: 16 }), children: i18n._(
        /*i18n*/
        {
          id: "tYF4Zq"
        }
      ) }),
      /* @__PURE__ */ jsx(CopyButton, { value: `${window == null ? void 0 : window.location.origin}/product/${event.id}/${attendee.short_id}`, children: ({
        copied,
        copy
      }) => /* @__PURE__ */ jsx(Button, { variant: "default", size: "sm", onClick: copy, leftSection: /* @__PURE__ */ jsx(IconCopy, { size: 16 }), children: copied ? i18n._(
        /*i18n*/
        {
          id: "6V3Ea3"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "ENCIQz"
        }
      ) }) })
    ] }),
    showPoweredBy && /* @__PURE__ */ jsx("div", { className: classes.poweredBy, children: /* @__PURE__ */ jsx(PoweredByFooter, {}) })
  ] });
};
export {
  AttendeeTicket as A
};

import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Popover, Stack, Text, Button } from "@mantine/core";
import { IconBrandGoogle, IconDownload } from "@tabler/icons-react";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { r as resolveEventLocation } from "./effectiveLocation-BzDgAlu_.js";
import { f as formatAddress } from "./addressUtilities-7xIQim0X.js";
const getEventLocation = (event, occurrence) => {
  var _a, _b, _c, _d;
  const effective = resolveEventLocation(event, occurrence ?? null);
  if ((effective == null ? void 0 : effective.type) === LocationType.Online) {
    return effective.online_event_connection_details ? `Online — ${effective.online_event_connection_details.replace(/<[^>]+>/g, "").trim()}`.slice(0, 240) : "Online";
  }
  if ((effective == null ? void 0 : effective.type) !== LocationType.InPerson) return "";
  const venue = ((_a = effective.location) == null ? void 0 : _a.name) || ((_c = (_b = effective.location) == null ? void 0 : _b.structured_address) == null ? void 0 : _c.venue_name) || "";
  const address = ((_d = effective.location) == null ? void 0 : _d.structured_address) ? formatAddress(effective.location.structured_address) : "";
  if (venue && address) return `${venue}, ${address}`;
  return venue || address;
};
const formatICSDate = (date) => {
  return new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
};
const stripHtml = (html) => {
  if (typeof document === "undefined") return (html == null ? void 0 : html.replace(/<[^>]*>/g, "")) || "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  return tmp.textContent || tmp.innerText || "";
};
const escapeICSText = (value) => {
  return (value ?? "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");
};
const foldICSLine = (line) => {
  const encoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
  if (!encoder) {
    return line;
  }
  const bytes = encoder.encode(line);
  if (bytes.length <= 75) {
    return line;
  }
  const decoder = new TextDecoder();
  const chunks = [];
  let cursor = 0;
  let limit = 75;
  while (cursor < bytes.length) {
    let end = Math.min(cursor + limit, bytes.length);
    while (end < bytes.length && (bytes[end] & 192) === 128) {
      end--;
    }
    chunks.push(decoder.decode(bytes.subarray(cursor, end)));
    cursor = end;
    limit = 74;
  }
  return chunks.join("\r\n ");
};
const getCalendarEntryDetails = (event, occurrence) => {
  const startDate = (occurrence == null ? void 0 : occurrence.start_date) || event.start_date;
  const endDate = occurrence ? occurrence.end_date || occurrence.start_date : event.end_date || startDate;
  const title = (occurrence == null ? void 0 : occurrence.label) ? `${event.title} - ${occurrence.label}` : event.title;
  return {
    startDate,
    endDate,
    title
  };
};
const createICSContent = (event, occurrence) => {
  const {
    startDate,
    endDate,
    title
  } = getCalendarEntryDetails(event, occurrence);
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Coursify//NONSGML Event Calendar//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `DTSTART:${formatICSDate(startDate)}`, `DTEND:${formatICSDate(endDate)}`, foldICSLine(`SUMMARY:${escapeICSText(title)}`), foldICSLine(`DESCRIPTION:${escapeICSText(stripHtml(event.description_preview || ""))}`), foldICSLine(`LOCATION:${escapeICSText(getEventLocation(event, occurrence))}`), `DTSTAMP:${formatICSDate((/* @__PURE__ */ new Date()).toISOString())}`, `UID:${crypto.randomUUID()}@coursify.guru`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
};
const downloadICSFile = (event, occurrence) => {
  const content = createICSContent(event, occurrence);
  const blob = new Blob([content], {
    type: "text/calendar;charset=utf-8"
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${event.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const createGoogleCalendarUrl = (event, occurrence) => {
  const formatGoogleDate = (date) => {
    return new Date(date).toISOString().replace(/-|:|\.\d{3}/g, "");
  };
  const {
    startDate,
    endDate,
    title
  } = getCalendarEntryDetails(event, occurrence);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: event.description_preview || "",
    location: getEventLocation(event, occurrence),
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
const CalendarOptionsPopover = ({
  event,
  occurrence,
  children
}) => {
  return /* @__PURE__ */ jsxs(Popover, { width: 200, position: "bottom", withArrow: true, shadow: "md", children: [
    /* @__PURE__ */ jsx(Popover.Target, { children }),
    /* @__PURE__ */ jsx(Popover.Dropdown, { children: /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: i18n._(
        /*i18n*/
        {
          id: "Crr3pG"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { variant: "light", size: "xs", leftSection: /* @__PURE__ */ jsx(IconBrandGoogle, { size: 16 }), onClick: () => window == null ? void 0 : window.open(createGoogleCalendarUrl(event, occurrence), "_blank"), fullWidth: true, children: i18n._(
        /*i18n*/
        {
          id: "ebIDwV"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { variant: "light", size: "xs", leftSection: /* @__PURE__ */ jsx(IconDownload, { size: 16 }), onClick: () => downloadICSFile(event, occurrence), fullWidth: true, children: i18n._(
        /*i18n*/
        {
          id: "OvNbls"
        }
      ) })
    ] }) })
  ] });
};
export {
  CalendarOptionsPopover as C
};

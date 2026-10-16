import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { E as EventType, d as EventOccurrenceStatus } from "./types-CqPWB-a5.js";
import { f as formatDateWithLocale, c as isSameDayInTimezone } from "./dates-CbVpwZeX.js";
const formatRange = (startDate, endDate, tz) => {
  const isSameDay = !!endDate && isSameDayInTimezone(startDate, endDate, tz);
  const timezone = formatDateWithLocale(startDate, "timezone", tz);
  if (isSameDay) {
    const dayFormatted = formatDateWithLocale(startDate, "dayName", tz);
    const startTime = formatDateWithLocale(startDate, "timeOnly", tz);
    const endTime = formatDateWithLocale(endDate, "timeOnly", tz);
    return /* @__PURE__ */ jsxs("span", { children: [
      dayFormatted,
      " · ",
      startTime,
      " - ",
      endTime,
      " ",
      timezone
    ] });
  }
  const startDateFormatted = formatDateWithLocale(startDate, "fullDateTime", tz);
  const endDateFormatted = endDate ? formatDateWithLocale(endDate, "fullDateTime", tz) : null;
  return /* @__PURE__ */ jsxs("span", { children: [
    startDateFormatted,
    endDateFormatted && ` - ${endDateFormatted}`,
    " ",
    timezone
  ] });
};
const EventDateRange = ({
  event,
  occurrence
}) => {
  var _a;
  if (occurrence) {
    return formatRange(occurrence.start_date, occurrence.end_date, event.timezone);
  }
  if (event.type === EventType.RECURRING) {
    const upcomingOccurrences = (event.occurrences || []).filter((o) => o.status !== EventOccurrenceStatus.CANCELLED && !o.is_past).sort((a, b) => a.start_date.localeCompare(b.start_date));
    const nextStartDate = event.next_occurrence_start_date || ((_a = upcomingOccurrences[0]) == null ? void 0 : _a.start_date);
    if (nextStartDate) {
      const isSingleRemaining = upcomingOccurrences.length === 1 && (!event.last_occurrence_date || event.last_occurrence_date === nextStartDate);
      if (isSingleRemaining) {
        const next = upcomingOccurrences[0];
        return formatRange(next.start_date, next.end_date, event.timezone);
      }
      const nextFormatted = formatDateWithLocale(nextStartDate, "shortDateTime", event.timezone);
      return /* @__PURE__ */ jsx("span", { children: i18n._(
        /*i18n*/
        {
          id: "WXtl5X",
          values: {
            nextFormatted
          }
        }
      ) });
    }
    if (event.upcoming_occurrences_sold_out) {
      return /* @__PURE__ */ jsx("span", { children: i18n._(
        /*i18n*/
        {
          id: "lgFfeO"
        }
      ) });
    }
    return /* @__PURE__ */ jsx("span", { children: i18n._(
      /*i18n*/
      {
        id: "k2C0ZR"
      }
    ) });
  }
  return formatRange(event.start_date, event.end_date, event.timezone);
};
export {
  EventDateRange as E
};

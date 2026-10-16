import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import advanced from "dayjs/plugin/advancedFormat.js";
import { g as getClientLocale } from "../entry.server.js";
const localeFormats = {
  "en": {
    fullDateTime: "ddd, MMM D, YYYY h:mm A",
    shortDateTime: "MMM D, YYYY h:mma",
    shortDate: "MMM D, YYYY",
    chartDate: "MMM D",
    dayMonthTime: "MMM D, h:mm A",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, MMMM D",
    timeOnly: "h:mm A",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "de": {
    fullDateTime: "ddd, D. MMM YYYY HH:mm",
    shortDateTime: "D. MMM YYYY HH:mm",
    shortDate: "D. MMM YYYY",
    chartDate: "D. MMM",
    dayMonthTime: "D. MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, D. MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "fr": {
    fullDateTime: "ddd D MMM YYYY HH:mm",
    shortDateTime: "D MMM YYYY HH:mm",
    shortDate: "D MMM YYYY",
    chartDate: "D MMM",
    dayMonthTime: "D MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd D MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "it": {
    fullDateTime: "ddd D MMM YYYY HH:mm",
    shortDateTime: "D MMM YYYY HH:mm",
    shortDate: "D MMM YYYY",
    chartDate: "D MMM",
    dayMonthTime: "D MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd D MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "nl": {
    fullDateTime: "ddd D MMM YYYY HH:mm",
    shortDateTime: "D MMM YYYY HH:mm",
    shortDate: "D MMM YYYY",
    chartDate: "D MMM",
    dayMonthTime: "D MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd D MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "pt": {
    fullDateTime: "ddd, D [de] MMM [de] YYYY HH:mm",
    shortDateTime: "D [de] MMM [de] YYYY HH:mm",
    shortDate: "D [de] MMM [de] YYYY",
    chartDate: "D [de] MMM",
    dayMonthTime: "D [de] MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, D [de] MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "es": {
    fullDateTime: "ddd, D [de] MMM [de] YYYY HH:mm",
    shortDateTime: "D [de] MMM [de] YYYY HH:mm",
    shortDate: "D [de] MMM [de] YYYY",
    chartDate: "D [de] MMM",
    dayMonthTime: "D [de] MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, D [de] MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "D [de] MMM [de] YYYY, HH:mm"
  },
  "zh-cn": {
    fullDateTime: "YYYY年M月D日 ddd HH:mm",
    shortDateTime: "YYYY年M月D日 HH:mm",
    shortDate: "YYYY年M月D日",
    chartDate: "M月D日",
    dayMonthTime: "M月D日 HH:mm",
    monthShort: "M月",
    dayOfMonth: "D日",
    dayName: "M月D日 dddd",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "pt-br": {
    fullDateTime: "ddd, D [de] MMM [de] YYYY HH:mm",
    shortDateTime: "D [de] MMM [de] YYYY HH:mm",
    shortDate: "D [de] MMM [de] YYYY",
    chartDate: "D [de] MMM",
    dayMonthTime: "D [de] MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, D [de] MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "vi": {
    fullDateTime: "ddd, [ngày] D [tháng] M [năm] YYYY HH:mm",
    shortDateTime: "[ngày] D [tháng] M [năm] YYYY HH:mm",
    shortDate: "D [tháng] M, YYYY",
    chartDate: "D [tháng] M",
    dayMonthTime: "D [tháng] M HH:mm",
    monthShort: "[Th]M",
    dayOfMonth: "D",
    dayName: "[ngày] D [tháng] M",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "zh-hk": {
    fullDateTime: "YYYY年M月D日 ddd HH:mm",
    shortDateTime: "YYYY年M月D日 HH:mm",
    shortDate: "YYYY年M月D日",
    chartDate: "M月D日",
    dayMonthTime: "M月D日 HH:mm",
    monthShort: "M月",
    dayOfMonth: "D日",
    dayName: "M月D日 dddd",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "tr": {
    fullDateTime: "ddd, D MMM YYYY HH:mm",
    shortDateTime: "D MMM YYYY HH:mm",
    shortDate: "D MMM YYYY",
    chartDate: "D MMM",
    dayMonthTime: "D MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, D MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "hu": {
    fullDateTime: "YYYY. MMM D., ddd HH:mm",
    shortDateTime: "YYYY. MMM D. HH:mm",
    shortDate: "YYYY. MMM D.",
    chartDate: "MMM D.",
    dayMonthTime: "MMM D. HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D.",
    dayName: "dddd, MMMM D.",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "pl": {
    fullDateTime: "ddd, D MMM YYYY HH:mm",
    shortDateTime: "D MMM YYYY HH:mm",
    shortDate: "D MMM YYYY",
    chartDate: "D MMM",
    dayMonthTime: "D MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, D MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "se": {
    fullDateTime: "ddd D MMM YYYY HH:mm",
    shortDateTime: "D MMM YYYY HH:mm",
    shortDate: "D MMM YYYY",
    chartDate: "D MMM",
    dayMonthTime: "D MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd D MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "MMM DD, YYYY [at] h:mm A"
  },
  "sk": {
    fullDateTime: "ddd D. MMM YYYY HH:mm",
    shortDateTime: "D. MMM YYYY HH:mm",
    shortDate: "D. MMM YYYY",
    chartDate: "D. MMM",
    dayMonthTime: "D. MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D.",
    dayName: "dddd D. MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "D. MMM YYYY HH:mm"
  },
  "el": {
    fullDateTime: "ddd, D MMM YYYY HH:mm",
    shortDateTime: "D MMM YYYY HH:mm",
    shortDate: "D MMM YYYY",
    chartDate: "D MMM",
    dayMonthTime: "D MMM HH:mm",
    monthShort: "MMM",
    dayOfMonth: "D",
    dayName: "dddd, D MMMM",
    timeOnly: "HH:mm",
    timezone: "z",
    dateTimePicker: "D MMM YYYY HH:mm"
  }
};
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(advanced);
const getSafeLocale = (locale) => {
  if (locale && locale in localeFormats) {
    return locale;
  }
  return "en";
};
const formatDateWithLocale = (date, formatType, tz, locale) => {
  const resolvedLocale = locale || getClientLocale();
  const safeLocale = getSafeLocale(resolvedLocale);
  const format = localeFormats[safeLocale][formatType];
  return dayjs.utc(date).tz(tz).locale(safeLocale).format(format);
};
const isSameDayInTimezone = (a, b, tz) => dayjs.utc(a).tz(tz).isSame(dayjs.utc(b).tz(tz), "day");
const formatOccurrenceEnd = (endDate, startDate, tz, locale) => {
  return formatDateWithLocale(endDate, isSameDayInTimezone(startDate, endDate, tz) ? "timeOnly" : "dayMonthTime", tz, locale);
};
const prettyDate = (date, tz, showTimezoneOffset = false, locale) => {
  const formatted = formatDateWithLocale(date, "shortDateTime", tz, locale);
  if (showTimezoneOffset) {
    const tzAbbr = formatDateWithLocale(date, "timezone", tz, locale);
    return `${formatted} (${tzAbbr})`;
  }
  return formatted;
};
const relativeDate = (date) => {
  const dateInUTC = dayjs.utc(date);
  const locale = getClientLocale();
  return dayjs().locale(locale).to(dateInUTC);
};
const getDateTimePickerFormat = () => {
  const locale = getClientLocale();
  const safeLocale = getSafeLocale(locale);
  return localeFormats[safeLocale].dateTimePicker;
};
const isValidDate = (date) => {
  return !!date && dayjs(date).isValid();
};
const utcToTz = (date, tz) => {
  if (!date) {
    return void 0;
  }
  return dayjs.utc(date).tz(tz).format("YYYY-MM-DDTHH:mm");
};
const nowInTimezone = (tz) => {
  return dayjs().tz(tz).format("YYYY-MM-DDTHH:mm");
};
const dateToBrowserTz = (date, fallbackTz, locale) => {
  const userTimezone = fallbackTz;
  const formatted = formatDateWithLocale(date, "shortDateTime", userTimezone, locale);
  const tzAbbr = formatDateWithLocale(date, "timezone", userTimezone, locale);
  return `${formatted} ${tzAbbr}`;
};
const isDateInFuture = (date) => {
  return dayjs.utc(date).diff(dayjs()) > 0;
};
const utcDateToEpochMs = (date) => {
  return dayjs.utc(date).valueOf();
};
const isDateInPast = (date) => {
  return dayjs.utc(date).diff(dayjs()) < 0;
};
export {
  formatOccurrenceEnd as a,
  getSafeLocale as b,
  isSameDayInTimezone as c,
  dateToBrowserTz as d,
  isDateInPast as e,
  formatDateWithLocale as f,
  getDateTimePickerFormat as g,
  isDateInFuture as h,
  isValidDate as i,
  utcDateToEpochMs as j,
  localeFormats as l,
  nowInTimezone as n,
  prettyDate as p,
  relativeDate as r,
  utcToTz as u
};

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
dayjs.extend(utc);
dayjs.extend(timezone);
const formatOccurrenceLabel = (occ, tz) => {
  const date = formatDateWithLocale(occ.start_date, "shortDate", tz);
  const time = formatDateWithLocale(occ.start_date, "timeOnly", tz);
  return date + " " + time + (occ.label ? ` — ${occ.label}` : "");
};
const getMonthKey = (occ, tz) => dayjs.utc(occ.start_date).tz(tz).format("YYYY-MM");
const getMonthLabel = (monthKey) => dayjs(monthKey + "-01").format("MMMM YYYY");
const isToday = (occ, tz) => {
  const occDate = dayjs.utc(occ.start_date).tz(tz).format("YYYY-MM-DD");
  const today = dayjs().tz(tz).format("YYYY-MM-DD");
  return occDate === today;
};
const filterAndGroupOccurrences = (occurrences, {
  search,
  tz,
  filterCancelled = true,
  filterPast = false,
  maxVisible = 50
}) => {
  let items = occurrences;
  if (filterCancelled) {
    items = items.filter((o) => o.status !== "CANCELLED");
  }
  if (filterPast) {
    items = items.filter((o) => !o.is_past);
  }
  const totalAvailable = items.length;
  const q = search == null ? void 0 : search.trim().toLowerCase();
  if (q) {
    items = items.filter((occ) => formatOccurrenceLabel(occ, tz).toLowerCase().includes(q));
  }
  const totalFiltered = items.length;
  const truncated = items.length > maxVisible;
  const visible = items.slice(0, maxVisible);
  const map = /* @__PURE__ */ new Map();
  for (const occ of visible) {
    const key = getMonthKey(occ, tz);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(occ);
  }
  const grouped = [];
  for (const [key, items2] of map) {
    grouped.push({
      key,
      label: getMonthLabel(key),
      items: items2
    });
  }
  return {
    grouped,
    totalAvailable,
    totalFiltered,
    truncated
  };
};
export {
  formatOccurrenceLabel as a,
  filterAndGroupOccurrences as f,
  isToday as i
};

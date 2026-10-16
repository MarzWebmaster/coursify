import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Skeleton } from "@mantine/core";
import { Sparkline } from "@mantine/charts";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
const grid = "_grid_emsb5_1";
const cell = "_cell_emsb5_21";
const label = "_label_emsb5_28";
const middleRow = "_middleRow_emsb5_37";
const value = "_value_emsb5_44";
const sparkline = "_sparkline_emsb5_52";
const sparklineSpacer = "_sparklineSpacer_emsb5_58";
const delta = "_delta_emsb5_64";
const deltaUp = "_deltaUp_emsb5_73";
const deltaDown = "_deltaDown_emsb5_77";
const deltaFlat = "_deltaFlat_emsb5_81";
const deltaPlaceholder = "_deltaPlaceholder_emsb5_89";
const skeletonRow = "_skeletonRow_emsb5_95";
const classes = {
  grid,
  cell,
  label,
  middleRow,
  value,
  sparkline,
  sparklineSpacer,
  delta,
  deltaUp,
  deltaDown,
  deltaFlat,
  deltaPlaceholder,
  skeletonRow
};
const KpiGrid = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx("div", { className: `${classes.grid} ${className}`, children });
};
const formatPercent = (percent, sign) => {
  const abs = Math.abs(percent).toFixed(1);
  return `${sign}${abs}%`;
};
const KpiCell = ({
  label: label2,
  value: value2,
  sparkline: sparkline2,
  delta: delta2,
  isLoading = false,
  testId
}) => {
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: classes.cell, "data-testid": testId, children: [
      /* @__PURE__ */ jsx("div", { className: classes.label, children: label2 }),
      /* @__PURE__ */ jsxs("div", { className: classes.skeletonRow, children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 20, width: 80, radius: "sm" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 20, width: 56, radius: "sm" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { height: 12, width: 60, radius: "sm", mt: 8 })
    ] });
  }
  let deltaContent;
  if (delta2 == null) {
    deltaContent = /* @__PURE__ */ jsx("span", { className: classes.deltaPlaceholder, "aria-hidden": "true" });
  } else if (delta2.trend === "flat") {
    deltaContent = /* @__PURE__ */ jsx("span", { className: `${classes.delta} ${classes.deltaFlat}`, children: i18n._(
      /*i18n*/
      {
        id: "d2Jf1f"
      }
    ) });
  } else if (delta2.trend === "up") {
    deltaContent = /* @__PURE__ */ jsxs("span", { className: `${classes.delta} ${classes.deltaUp}`, children: [
      /* @__PURE__ */ jsx(IconArrowUpRight, { size: 12, stroke: 2 }),
      formatPercent(delta2.percent, "+")
    ] });
  } else {
    deltaContent = /* @__PURE__ */ jsxs("span", { className: `${classes.delta} ${classes.deltaDown}`, children: [
      /* @__PURE__ */ jsx(IconArrowDownRight, { size: 12, stroke: 2 }),
      formatPercent(delta2.percent, "-")
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes.cell, "data-testid": testId, children: [
    /* @__PURE__ */ jsx("div", { className: classes.label, children: label2 }),
    /* @__PURE__ */ jsxs("div", { className: classes.middleRow, children: [
      /* @__PURE__ */ jsx("div", { className: classes.value, "data-testid": testId ? `${testId}-value` : void 0, children: value2 }),
      sparkline2 && sparkline2.length > 0 ? /* @__PURE__ */ jsx(Sparkline, { className: classes.sparkline, w: 56, h: 20, data: sparkline2, color: "primary.5", fillOpacity: 0, strokeWidth: 1.2, curveType: "linear", areaProps: {
        opacity: 0.6
      } }) : /* @__PURE__ */ jsx("div", { className: classes.sparklineSpacer })
    ] }),
    deltaContent
  ] });
};
const formatDate = (d) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
const parseEventDate = (raw) => {
  if (!raw) return null;
  const normalized = raw.includes("T") ? raw : raw.replace(" ", "T");
  const date = new Date(normalized);
  return isNaN(date.getTime()) ? null : date;
};
const EVENT_RELATIVE_PRESETS = /* @__PURE__ */ new Set(["event_first_week", "event_first_month", "event_first_quarter", "event_full"]);
const isEventRelativePreset = (preset) => EVENT_RELATIVE_PRESETS.has(preset);
const periodPresetToDateRange = (preset, event) => {
  const now = /* @__PURE__ */ new Date();
  if (isEventRelativePreset(preset)) {
    const eventStart = parseEventDate(event == null ? void 0 : event.start_date) ?? now;
    const eventEnd = parseEventDate(event == null ? void 0 : event.end_date);
    let start2;
    let end2;
    switch (preset) {
      case "event_first_week":
        start2 = eventStart;
        end2 = new Date(eventStart);
        end2.setDate(end2.getDate() + 7);
        break;
      case "event_first_month":
        start2 = eventStart;
        end2 = new Date(eventStart);
        end2.setDate(end2.getDate() + 30);
        break;
      case "event_first_quarter":
        start2 = eventStart;
        end2 = new Date(eventStart);
        end2.setDate(end2.getDate() + 90);
        break;
      case "event_full":
      default: {
        end2 = eventEnd && eventEnd.getTime() < now.getTime() ? eventEnd : now;
        const desiredStart = new Date(eventStart);
        desiredStart.setDate(desiredStart.getDate() - 365);
        const floorStart = new Date(end2);
        floorStart.setDate(floorStart.getDate() - 369);
        start2 = desiredStart.getTime() > floorStart.getTime() ? desiredStart : floorStart;
        break;
      }
    }
    return {
      startDate: formatDate(startOfDay(start2)),
      endDate: formatDate(endOfDay(end2))
    };
  }
  const end = new Date(now);
  let start;
  switch (preset) {
    case "today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      break;
    case "last_7_days":
      start = new Date(now);
      start.setDate(start.getDate() - 7);
      break;
    case "last_30_days":
      start = new Date(now);
      start.setDate(start.getDate() - 30);
      break;
    case "last_90_days":
      start = new Date(now);
      start.setDate(start.getDate() - 90);
      break;
    case "year_to_date":
      start = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      break;
    default:
      start = new Date(now);
      start.setDate(start.getDate() - 30);
  }
  return {
    startDate: formatDate(startOfDay(start)),
    endDate: formatDate(endOfDay(end))
  };
};
const previousPeriodRange = (current) => {
  const start = new Date(current.startDate.replace(" ", "T"));
  const end = new Date(current.endDate.replace(" ", "T"));
  const lengthMs = end.getTime() - start.getTime();
  const prevEnd = new Date(start.getTime() - 1e3);
  const prevStart = new Date(prevEnd.getTime() - lengthMs);
  return {
    startDate: formatDate(prevStart),
    endDate: formatDate(prevEnd)
  };
};
const computeDelta = (current, previous) => {
  if (current == null || previous == null) {
    return null;
  }
  if (previous === 0) {
    return null;
  }
  const percent = (current - previous) / previous * 100;
  if (Math.abs(percent) < 0.05) {
    if (current === 0) {
      return null;
    }
    return {
      percent: 0,
      trend: "flat"
    };
  }
  return {
    percent,
    trend: percent > 0 ? "up" : "down"
  };
};
export {
  KpiGrid as K,
  previousPeriodRange as a,
  KpiCell as b,
  computeDelta as c,
  isEventRelativePreset as i,
  periodPresetToDateRange as p
};

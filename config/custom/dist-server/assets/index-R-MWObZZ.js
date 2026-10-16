import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useMemo } from "react";
import { useParams } from "react-router";
import { i as isEventRelativePreset, p as periodPresetToDateRange, a as previousPeriodRange, K as KpiGrid, b as KpiCell, c as computeDelta } from "./periodPreset-yPBfrqeg.js";
import { useQuery } from "@tanstack/react-query";
import { h as eventsClient, j as formatNumber } from "../entry.server.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { AreaChart } from "@mantine/charts";
import { C as Card } from "./index-jHMtuNEo.js";
import { f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
const GET_EVENT_STATS_QUERY_KEY = "getEventStats";
const useGetEventStats = (eventId, options = {}) => {
  const {
    occurrenceId,
    dateRange: dateRange2,
    startDate,
    endDate,
    enabled = true
  } = options;
  return useQuery({
    queryKey: [GET_EVENT_STATS_QUERY_KEY, eventId, occurrenceId, dateRange2, startDate, endDate],
    queryFn: async () => {
      const {
        data
      } = await eventsClient.getEventStats(eventId, {
        occurrenceId,
        dateRange: dateRange2,
        startDate,
        endDate
      });
      return data;
    },
    enabled
  });
};
const sparkFrom = (stats, key) => {
  if (!(stats == null ? void 0 : stats.daily_stats)) return [];
  return stats.daily_stats.map((d) => Number(d[key] ?? 0));
};
const StatBoxes = ({
  occurrenceId,
  dateRange: dateRange2,
  event
} = {}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const currency = (event == null ? void 0 : event.currency) ?? ((_a = eventQuery == null ? void 0 : eventQuery.data) == null ? void 0 : _a.currency);
  const resolvedEvent = event ?? (eventQuery == null ? void 0 : eventQuery.data);
  const preset = dateRange2 ?? "last_30_days";
  const compareToPrevious = !isEventRelativePreset(preset);
  const currentRange = useMemo(() => periodPresetToDateRange(preset, resolvedEvent), [preset, resolvedEvent]);
  const previousRange = useMemo(() => compareToPrevious ? previousPeriodRange(currentRange) : null, [compareToPrevious, currentRange]);
  const currentStatsQuery = useGetEventStats(eventId, {
    occurrenceId,
    startDate: currentRange.startDate,
    endDate: currentRange.endDate
  });
  const previousStatsQuery = useGetEventStats(eventId, {
    occurrenceId,
    startDate: previousRange == null ? void 0 : previousRange.startDate,
    endDate: previousRange == null ? void 0 : previousRange.endDate,
    enabled: compareToPrevious
  });
  const isLoading = currentStatsQuery.isLoading || compareToPrevious && previousStatsQuery.isLoading;
  const current = currentStatsQuery.data;
  const previous = compareToPrevious ? previousStatsQuery.data : void 0;
  const delta = (key) => {
    if (!compareToPrevious) return null;
    return computeDelta(current == null ? void 0 : current[key], previous == null ? void 0 : previous[key]);
  };
  const cells = [{
    key: "attendees",
    label: i18n._(
      /*i18n*/
      {
        id: "9SZT4E"
      }
    ),
    value: formatNumber((current == null ? void 0 : current.total_attendees_registered) ?? 0),
    sparkline: sparkFrom(current, "attendees_registered"),
    delta: delta("total_attendees_registered")
  }, {
    key: "products_sold",
    label: i18n._(
      /*i18n*/
      {
        id: "Vla0Bo"
      }
    ),
    value: formatNumber((current == null ? void 0 : current.total_products_sold) ?? 0),
    sparkline: sparkFrom(current, "products_sold"),
    delta: delta("total_products_sold")
  }, {
    key: "refunded",
    label: i18n._(
      /*i18n*/
      {
        id: "/BI0y9"
      }
    ),
    value: formatCurrency((current == null ? void 0 : current.total_refunded) ?? 0, currency),
    sparkline: sparkFrom(current, "total_refunded"),
    delta: delta("total_refunded")
  }, {
    key: "gross_sales",
    label: i18n._(
      /*i18n*/
      {
        id: "IgcAGN"
      }
    ),
    value: formatCurrency((current == null ? void 0 : current.total_gross_sales) ?? 0, currency),
    sparkline: sparkFrom(current, "total_sales_gross"),
    delta: delta("total_gross_sales")
  }, {
    key: "page_views",
    label: i18n._(
      /*i18n*/
      {
        id: "QbrUIo"
      }
    ),
    value: formatNumber((current == null ? void 0 : current.total_views) ?? 0),
    sparkline: void 0,
    delta: delta("total_views")
  }, {
    key: "orders",
    label: i18n._(
      /*i18n*/
      {
        id: "6HK5Ct"
      }
    ),
    value: formatNumber((current == null ? void 0 : current.total_orders) ?? 0),
    sparkline: sparkFrom(current, "orders_created"),
    delta: delta("total_orders")
  }];
  const visibleCells = occurrenceId ? cells.filter((cell) => cell.key !== "page_views") : cells;
  return /* @__PURE__ */ jsx(KpiGrid, { children: visibleCells.map((cell) => /* @__PURE__ */ jsx(KpiCell, { testId: `event-stat-${cell.key}`, label: cell.label, value: cell.value, sparkline: cell.sparkline, delta: cell.delta, isLoading }, cell.key)) });
};
const chartCard = "_chartCard_1v77w_1";
const chartCardTitle = "_chartCardTitle_1v77w_6";
const dateRange = "_dateRange_1v77w_18";
const chart = "_chart_1v77w_1";
const classes = {
  chartCard,
  chartCardTitle,
  dateRange,
  chart
};
const responsiveChartProps = {
  className: classes.chart,
  dataKey: "date",
  withLegend: true,
  legendProps: {
    verticalAlign: "bottom"
  },
  styles: {
    legend: {
      justifyContent: "center",
      rowGap: 4,
      paddingTop: 24
    }
  },
  xAxisProps: {
    minTickGap: 24
  },
  yAxisProps: {
    width: "auto",
    tickMargin: 10,
    tick: {
      fontSize: 12,
      fill: "currentColor"
    }
  },
  tickLine: "none"
};
const ChartCard = ({
  title,
  dateRangeLabel,
  children
}) => /* @__PURE__ */ jsxs(Card, { className: classes.chartCard, children: [
  /* @__PURE__ */ jsxs("div", { className: classes.chartCardTitle, children: [
    /* @__PURE__ */ jsx("h2", { children: title }),
    dateRangeLabel && /* @__PURE__ */ jsx("span", { className: classes.dateRange, children: dateRangeLabel })
  ] }),
  children
] });
const ProductSalesChartCard = ({
  dailyStats,
  timezone,
  dateRangeLabel,
  syncId
}) => /* @__PURE__ */ jsx(ChartCard, { title: i18n._(
  /*i18n*/
  {
    id: "Lu+kBU"
  }
), dateRangeLabel, children: /* @__PURE__ */ jsx(AreaChart, { ...responsiveChartProps, data: (dailyStats == null ? void 0 : dailyStats.map((stat) => ({
  date: formatDateWithLocale(stat.date, "chartDate", timezone),
  orders_created: stat.orders_created,
  products_sold: stat.products_sold,
  attendees_registered: stat.attendees_registered
}))) || [], series: [{
  name: "orders_created",
  color: "blue.6",
  label: i18n._(
    /*i18n*/
    {
      id: "NWVRtl"
    }
  )
}, {
  name: "products_sold",
  color: "blue.2",
  label: i18n._(
    /*i18n*/
    {
      id: "/u4DIx"
    }
  )
}, {
  name: "attendees_registered",
  color: "blue.4",
  label: i18n._(
    /*i18n*/
    {
      id: "iPBfZP"
    }
  )
}], curveType: "bump", areaChartProps: {
  syncId
} }) });
const RevenueChartCard = ({
  dailyStats,
  timezone,
  dateRangeLabel,
  syncId,
  currency
}) => /* @__PURE__ */ jsx(ChartCard, { title: i18n._(
  /*i18n*/
  {
    id: "8YBH95"
  }
), dateRangeLabel, children: /* @__PURE__ */ jsx(AreaChart, { ...responsiveChartProps, data: (dailyStats == null ? void 0 : dailyStats.map((stat) => ({
  date: formatDateWithLocale(stat.date, "chartDate", timezone),
  total_fees: stat.total_fees,
  total_sales_gross: stat.total_sales_gross,
  total_tax: stat.total_tax,
  total_refunded: stat.total_refunded
}))) || [], valueFormatter: (value) => formatCurrency(value, currency), series: [{
  name: "total_fees",
  label: i18n._(
    /*i18n*/
    {
      id: "BxsfMK"
    }
  ),
  color: "primary.3"
}, {
  name: "total_sales_gross",
  label: i18n._(
    /*i18n*/
    {
      id: "yRg26W"
    }
  ),
  color: "grape.5"
}, {
  name: "total_tax",
  label: i18n._(
    /*i18n*/
    {
      id: "/SgoNA"
    }
  ),
  color: "grape.7"
}, {
  name: "total_refunded",
  label: i18n._(
    /*i18n*/
    {
      id: "jEbkcB"
    }
  ),
  color: "red.6"
}], curveType: "natural", areaChartProps: {
  syncId
} }) });
export {
  ProductSalesChartCard as P,
  RevenueChartCard as R,
  StatBoxes as S,
  useGetEventStats as u
};

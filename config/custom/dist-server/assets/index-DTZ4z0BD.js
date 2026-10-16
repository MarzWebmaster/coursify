import { jsx, jsxs } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useState, useEffect, useMemo } from "react";
import { useParams, NavLink } from "react-router";
import { Menu, UnstyledButton, Skeleton, SegmentedControl, Button } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { IconChevronDown, IconArrowUpRight, IconArrowDownRight, IconReceipt, IconChevronRight } from "@tabler/icons-react";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { u as useGetOrganizerStats } from "./useGetOrganizerStats-DKCCR5Rs.js";
import { u as useGetEvents } from "./useGetEvents-CRE3yVbY.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { r as relativeDate } from "./dates-CbVpwZeX.js";
import { o as organizerClient, j as formatNumber } from "../entry.server.js";
import { useQuery } from "@tanstack/react-query";
import { p as periodPresetToDateRange, a as previousPeriodRange, c as computeDelta, K as KpiGrid, b as KpiCell } from "./periodPreset-yPBfrqeg.js";
import { P as PeriodSelector } from "./index-DqP6bUOf.js";
import { u as useGetOrganizer } from "./useGetOrganizer-DMDsW5DW.js";
import { c as currenciesMap } from "./currencies-wzczGcKi.js";
import { C as CreateEventModal } from "./index-QPHzYTb4.js";
import { g as getEventQueryFilters, E as EventCard } from "./eventsPageFiltersHelper-CklOJn7k.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./notifications-Coh3Ef-t.js";
import "./useGetAccount-CGfwRfDK.js";
import "./types-CqPWB-a5.js";
import "@mantine/form";
import "./useCreateEvent-_hCh3y7f.js";
import "./index-D4cOjjnu.js";
import "./useGetOrganizers-AXXYibKP.js";
import "./index-t-LfUV0_.js";
import "./index-CYsdl7UG.js";
import "./timezones-CsvfI1Rm.js";
import "./analytics-Cd4RPKa9.js";
import "./eventCategories-BcVMR4Oy.js";
import "./index-CwjvB_vn.js";
import "./urlHelper-CsaWRwIV.js";
import "@mantine/hooks";
import "./index-AhXgh6Nz.js";
import "./index-CwAoF9NO.js";
import "./useGetEvent-DyvalBPE.js";
import "./index-jHMtuNEo.js";
import "./index-ChciN8SC.js";
import "./confirmationDialog-I-HMojnx.js";
import "./useUpdateEventStatus-Ck9Vcq_R.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
const GET_ORGANIZER_ORDERS_QUERY_KEY = "getOrganizerOrders";
const useGetOrganizerOrders = (organizerId, pagination) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_ORDERS_QUERY_KEY, organizerId, pagination],
    queryFn: async () => await organizerClient.getOrganizerOrders(organizerId, pagination)
  });
};
const headerSection = "_headerSection_56b6t_1";
const pageTitle = "_pageTitle_56b6t_15";
const headerControls = "_headerControls_56b6t_20";
const currencySelector = "_currencySelector_56b6t_31";
const currencyText = "_currencyText_56b6t_54";
const currencyIcon = "_currencyIcon_56b6t_59";
const currencyOption = "_currencyOption_56b6t_68";
const currencyCode = "_currencyCode_56b6t_76";
const currencyLabel = "_currencyLabel_56b6t_85";
const selectedCurrency = "_selectedCurrency_56b6t_95";
const currencyDropdown = "_currencyDropdown_56b6t_102";
const currencyScrollArea = "_currencyScrollArea_56b6t_108";
const heroChart = "_heroChart_56b6t_131";
const heroChartHeader = "_heroChartHeader_56b6t_139";
const heroChartLabel = "_heroChartLabel_56b6t_148";
const heroChartValue = "_heroChartValue_56b6t_157";
const heroChartDelta = "_heroChartDelta_56b6t_166";
const heroChartDeltaUp = "_heroChartDeltaUp_56b6t_175";
const heroChartDeltaDown = "_heroChartDeltaDown_56b6t_179";
const heroChartDeltaNone = "_heroChartDeltaNone_56b6t_183";
const heroChartTabs = "_heroChartTabs_56b6t_187";
const heroChartArea = "_heroChartArea_56b6t_191";
const recentLists = "_recentLists_56b6t_196";
const listCard = "_listCard_56b6t_208";
const eventsListCard = "_eventsListCard_56b6t_217";
const eventCardList = "_eventCardList_56b6t_221";
const eventsEmptyState = "_eventsEmptyState_56b6t_227";
const eventsEmptyEmoji = "_eventsEmptyEmoji_56b6t_236";
const eventsEmptyTitle = "_eventsEmptyTitle_56b6t_241";
const eventsEmptyCopy = "_eventsEmptyCopy_56b6t_249";
const listCardHeader = "_listCardHeader_56b6t_257";
const listCardTitle = "_listCardTitle_56b6t_264";
const listCardLink = "_listCardLink_56b6t_271";
const ordersListCard = "_ordersListCard_56b6t_281";
const orderCardList = "_orderCardList_56b6t_285";
const orderCardLink = "_orderCardLink_56b6t_291";
const orderCard = "_orderCard_56b6t_285";
const orderName = "_orderName_56b6t_312";
const orderChevron = "_orderChevron_56b6t_315";
const orderAvatar = "_orderAvatar_56b6t_326";
const orderContent = "_orderContent_56b6t_350";
const orderPrimary = "_orderPrimary_56b6t_358";
const orderId = "_orderId_56b6t_377";
const orderMeta = "_orderMeta_56b6t_385";
const orderDot = "_orderDot_56b6t_395";
const orderMuted = "_orderMuted_56b6t_399";
const orderStat = "_orderStat_56b6t_405";
const orderStatValue = "_orderStatValue_56b6t_418";
const orderStatLabel = "_orderStatLabel_56b6t_427";
const statusPill = "_statusPill_56b6t_453";
const classes = {
  headerSection,
  pageTitle,
  headerControls,
  currencySelector,
  currencyText,
  currencyIcon,
  currencyOption,
  currencyCode,
  currencyLabel,
  selectedCurrency,
  currencyDropdown,
  currencyScrollArea,
  heroChart,
  heroChartHeader,
  heroChartLabel,
  heroChartValue,
  heroChartDelta,
  heroChartDeltaUp,
  heroChartDeltaDown,
  heroChartDeltaNone,
  heroChartTabs,
  heroChartArea,
  recentLists,
  listCard,
  eventsListCard,
  eventCardList,
  eventsEmptyState,
  eventsEmptyEmoji,
  eventsEmptyTitle,
  eventsEmptyCopy,
  listCardHeader,
  listCardTitle,
  listCardLink,
  ordersListCard,
  orderCardList,
  orderCardLink,
  orderCard,
  orderName,
  orderChevron,
  orderAvatar,
  orderContent,
  orderPrimary,
  orderId,
  orderMeta,
  orderDot,
  orderMuted,
  orderStat,
  orderStatValue,
  orderStatLabel,
  statusPill,
  "statusPill-success": "_statusPill-success_56b6t_461",
  "statusPill-warning": "_statusPill-warning_56b6t_465",
  "statusPill-danger": "_statusPill-danger_56b6t_469",
  "statusPill-muted": "_statusPill-muted_56b6t_473"
};
const DashboardSkeleton = () => {
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 16
    }, children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 40, radius: "md", width: "60%" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 36, radius: "md", width: "220px" })
    ] }),
    /* @__PURE__ */ jsx(Skeleton, { height: 140, radius: "md", mb: 12 }),
    /* @__PURE__ */ jsx(Skeleton, { height: 210, radius: "md", mb: 12 }),
    /* @__PURE__ */ jsxs("div", { className: classes.recentLists, children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" })
    ] })
  ] });
};
const OrganizerDashboard = () => {
  var _a, _b;
  const {
    organizerId
  } = useParams();
  const {
    data: organizer
  } = useGetOrganizer(organizerId);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [heroTab, setHeroTab] = useState("sales");
  const [periodPreset, setPeriodPreset] = useState("last_30_days");
  const [selectedCurrency2, setSelectedCurrency] = useState((organizer == null ? void 0 : organizer.currency) || "USD");
  useEffect(() => {
    if ((organizer == null ? void 0 : organizer.currency) && selectedCurrency2 !== organizer.currency) {
      setSelectedCurrency(organizer.currency);
    }
  }, [organizer == null ? void 0 : organizer.currency]);
  const currentRange = useMemo(() => periodPresetToDateRange(periodPreset), [periodPreset]);
  const previousRange = useMemo(() => previousPeriodRange(currentRange), [currentRange]);
  const organizerStatsQuery = useGetOrganizerStats(organizerId, selectedCurrency2, {
    startDate: currentRange.startDate,
    endDate: currentRange.endDate
  });
  const previousStatsQuery = useGetOrganizerStats(organizerId, selectedCurrency2, {
    startDate: previousRange.startDate,
    endDate: previousRange.endDate
  });
  const stats = organizerStatsQuery.data;
  const previousStats = previousStatsQuery.data;
  const allOrganizersCurrencies = stats == null ? void 0 : stats.all_organizers_currencies;
  const currencies = currenciesMap.filter((currency) => allOrganizersCurrencies == null ? void 0 : allOrganizersCurrencies.includes(currency.value));
  const ordersQuery = useGetOrganizerOrders(organizerId, {
    perPage: 10,
    sortBy: "created_at",
    sortDirection: "desc"
  });
  const recentOrders = (_a = ordersQuery.data) == null ? void 0 : _a.data;
  const {
    data: eventsResponse
  } = useGetEvents(getEventQueryFilters({}));
  const recentEvents = (_b = eventsResponse == null ? void 0 : eventsResponse.data) == null ? void 0 : _b.slice(0, 10);
  const isStatsLoading = organizerStatsQuery.isLoading;
  const isPreviousLoading = previousStatsQuery.isLoading;
  if (!organizer) {
    return /* @__PURE__ */ jsx(DashboardSkeleton, {});
  }
  const dailyStats = (stats == null ? void 0 : stats.daily_stats) ?? [];
  const heroValueRaw = (() => {
    if (!stats) return 0;
    if (heroTab === "sales") return stats.total_gross_sales;
    if (heroTab === "orders") return stats.total_orders;
    return stats.total_attendees_registered;
  })();
  const heroPreviousRaw = (() => {
    if (!previousStats) return null;
    if (heroTab === "sales") return previousStats.total_gross_sales;
    if (heroTab === "orders") return previousStats.total_orders;
    return previousStats.total_attendees_registered;
  })();
  const heroLabel = heroTab === "sales" ? i18n._(
    /*i18n*/
    {
      id: "IgcAGN"
    }
  ) : heroTab === "orders" ? i18n._(
    /*i18n*/
    {
      id: "1h+RBg"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "9SZT4E"
    }
  );
  const heroFormattedValue = heroTab === "sales" ? formatCurrency(heroValueRaw, selectedCurrency2) : formatNumber(heroValueRaw);
  const heroDelta = computeDelta(stats ? heroValueRaw : null, previousStats ? heroPreviousRaw : null);
  const heroChartData = dailyStats.map((d) => ({
    date: d.date,
    value: heroTab === "sales" ? d.total_sales_gross : heroTab === "orders" ? d.orders_created : d.attendees_registered
  }));
  const sparkline = (key) => dailyStats.map((d) => Number(d[key] ?? 0));
  const tabOptions = [{
    value: "sales",
    label: i18n._(
      /*i18n*/
      {
        id: "mUv9U4"
      }
    )
  }, {
    value: "orders",
    label: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    )
  }, {
    value: "attendees",
    label: i18n._(
      /*i18n*/
      {
        id: "9SZT4E"
      }
    )
  }];
  const heroValueFormatter = (value) => String(heroTab === "sales" ? formatCurrency(value, selectedCurrency2) : formatNumber(value));
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsxs("div", { className: classes.headerSection, children: [
      /* @__PURE__ */ jsx(PageTitle, { className: classes.pageTitle, children: organizer ? `${organizer.name} - ${i18n._(
        /*i18n*/
        {
          id: "7p5kLi"
        }
      )}` : i18n._(
        /*i18n*/
        {
          id: "S3CZ5M"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: classes.headerControls, children: [
        /* @__PURE__ */ jsx(PeriodSelector, { value: periodPreset, onChange: setPeriodPreset, storageKey: `organizerDashboard.dateRange.${organizerId}` }),
        (currencies == null ? void 0 : currencies.length) > 1 && /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 240, position: "bottom-end", disabled: isStatsLoading, withinPortal: true, children: [
          /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsxs(UnstyledButton, { className: classes.currencySelector, disabled: isStatsLoading, children: [
            /* @__PURE__ */ jsx("span", { className: classes.currencyText, children: selectedCurrency2 }),
            /* @__PURE__ */ jsx(IconChevronDown, { size: 14, className: classes.currencyIcon })
          ] }) }),
          /* @__PURE__ */ jsx(Menu.Dropdown, { className: classes.currencyDropdown, children: /* @__PURE__ */ jsx("div", { className: classes.currencyScrollArea, children: currencies.map((currency) => /* @__PURE__ */ jsx(Menu.Item, { onClick: () => setSelectedCurrency(currency.value), className: selectedCurrency2 === currency.value ? classes.selectedCurrency : "", children: /* @__PURE__ */ jsxs("span", { className: classes.currencyOption, children: [
            /* @__PURE__ */ jsx("span", { className: classes.currencyCode, children: currency.value }),
            /* @__PURE__ */ jsx("span", { className: classes.currencyLabel, children: currency.label })
          ] }) }, currency.value)) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.heroChart, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.heroChartHeader, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: classes.heroChartLabel, children: heroLabel }),
          /* @__PURE__ */ jsx("div", { className: classes.heroChartValue, children: isStatsLoading ? /* @__PURE__ */ jsx(Skeleton, { height: 24, width: 140 }) : heroFormattedValue }),
          !isStatsLoading && !isPreviousLoading && heroDelta != null && /* @__PURE__ */ jsx("div", { children: heroDelta.trend === "flat" ? /* @__PURE__ */ jsx("span", { className: `${classes.heroChartDelta} ${classes.heroChartDeltaNone}`, children: i18n._(
            /*i18n*/
            {
              id: "d2Jf1f"
            }
          ) }) : heroDelta.trend === "up" ? /* @__PURE__ */ jsxs("span", { className: `${classes.heroChartDelta} ${classes.heroChartDeltaUp}`, children: [
            /* @__PURE__ */ jsx(IconArrowUpRight, { size: 12, stroke: 2 }),
            `+${Math.abs(heroDelta.percent).toFixed(1)}%`
          ] }) : /* @__PURE__ */ jsxs("span", { className: `${classes.heroChartDelta} ${classes.heroChartDeltaDown}`, children: [
            /* @__PURE__ */ jsx(IconArrowDownRight, { size: 12, stroke: 2 }),
            `-${Math.abs(heroDelta.percent).toFixed(1)}%`
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(SegmentedControl, { size: "xs", radius: "md", value: heroTab, onChange: (v) => setHeroTab(v), data: tabOptions, className: classes.heroChartTabs, styles: {
          root: {
            background: "var(--mantine-color-gray-0)",
            padding: 2
          }
        } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.heroChartArea, children: heroChartData.length > 0 ? /* @__PURE__ */ jsx(AreaChart, { h: 64, data: heroChartData, dataKey: "date", series: [{
        name: "value",
        color: "primary.5",
        label: ""
      }], withGradient: true, withXAxis: false, withYAxis: false, gridAxis: "none", withDots: false, withLegend: false, curveType: "natural", withTooltip: true, valueFormatter: heroValueFormatter }) : /* @__PURE__ */ jsx(Skeleton, { height: 64, radius: "sm" }) })
    ] }),
    /* @__PURE__ */ jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsx(KpiCell, { label: i18n._(
        /*i18n*/
        {
          id: "IgcAGN"
        }
      ), value: stats ? formatCurrency(stats.total_gross_sales, selectedCurrency2) : "", sparkline: sparkline("total_sales_gross"), delta: computeDelta(stats == null ? void 0 : stats.total_gross_sales, previousStats == null ? void 0 : previousStats.total_gross_sales), isLoading: isStatsLoading || isPreviousLoading }),
      /* @__PURE__ */ jsx(KpiCell, { label: i18n._(
        /*i18n*/
        {
          id: "Vla0Bo"
        }
      ), value: stats ? formatNumber(stats.total_products_sold) : "", sparkline: sparkline("products_sold"), delta: computeDelta(stats == null ? void 0 : stats.total_products_sold, previousStats == null ? void 0 : previousStats.total_products_sold), isLoading: isStatsLoading || isPreviousLoading }),
      /* @__PURE__ */ jsx(KpiCell, { label: i18n._(
        /*i18n*/
        {
          id: "9SZT4E"
        }
      ), value: stats ? formatNumber(stats.total_attendees_registered) : "", sparkline: sparkline("attendees_registered"), delta: computeDelta(stats == null ? void 0 : stats.total_attendees_registered, previousStats == null ? void 0 : previousStats.total_attendees_registered), isLoading: isStatsLoading || isPreviousLoading }),
      /* @__PURE__ */ jsx(KpiCell, { label: i18n._(
        /*i18n*/
        {
          id: "mlvCEl"
        }
      ), value: stats ? formatNumber(stats.total_orders) : "", sparkline: sparkline("orders_created"), delta: computeDelta(stats == null ? void 0 : stats.total_orders, previousStats == null ? void 0 : previousStats.total_orders), isLoading: isStatsLoading || isPreviousLoading }),
      /* @__PURE__ */ jsx(KpiCell, { label: i18n._(
        /*i18n*/
        {
          id: "dp8BCb"
        }
      ), value: stats ? formatCurrency(stats.total_tax, selectedCurrency2) : "", delta: computeDelta(stats == null ? void 0 : stats.total_tax, previousStats == null ? void 0 : previousStats.total_tax), isLoading: isStatsLoading || isPreviousLoading }),
      /* @__PURE__ */ jsx(KpiCell, { label: i18n._(
        /*i18n*/
        {
          id: "sMMlTX"
        }
      ), value: stats ? formatCurrency(stats.total_fees, selectedCurrency2) : "", delta: computeDelta(stats == null ? void 0 : stats.total_fees, previousStats == null ? void 0 : previousStats.total_fees), isLoading: isStatsLoading || isPreviousLoading })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.recentLists, children: [
      /* @__PURE__ */ jsxs("div", { className: `${classes.listCard} ${classes.ordersListCard}`, children: [
        /* @__PURE__ */ jsx("div", { className: classes.listCardHeader, children: /* @__PURE__ */ jsx("div", { className: classes.listCardTitle, children: i18n._(
          /*i18n*/
          {
            id: "S+0XMX"
          }
        ) }) }),
        recentOrders && recentOrders.length > 0 ? /* @__PURE__ */ jsx("div", { className: classes.orderCardList, children: recentOrders.map((order) => {
          const customerName = [order.first_name, order.last_name].filter(Boolean).join(" ");
          const orderStatus = formatOrderStatus(order);
          const initials = orderInitials(order.first_name, order.last_name);
          const gradient = orderGradient(order.id);
          return /* @__PURE__ */ jsx(NavLink, { to: `/manage/event/${order.event_id}/orders#order-${order.id}`, className: classes.orderCardLink, children: /* @__PURE__ */ jsxs("div", { className: classes.orderCard, children: [
            /* @__PURE__ */ jsx("div", { className: classes.orderAvatar, style: {
              background: gradient
            }, children: initials || /* @__PURE__ */ jsx(IconReceipt, { size: 20 }) }),
            /* @__PURE__ */ jsxs("div", { className: classes.orderContent, children: [
              /* @__PURE__ */ jsxs("div", { className: classes.orderPrimary, children: [
                /* @__PURE__ */ jsx("span", { className: classes.orderName, children: customerName || i18n._(
                  /*i18n*/
                  {
                    id: "O1wAlQ"
                  }
                ) }),
                /* @__PURE__ */ jsxs("span", { className: classes.orderId, children: [
                  "#",
                  order.public_id
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: classes.orderMeta, children: [
                /* @__PURE__ */ jsx("span", { className: `${classes.statusPill} ${classes[`statusPill-${orderStatus.tone}`]}`, children: orderStatus.label }),
                /* @__PURE__ */ jsx("span", { className: classes.orderDot, children: "·" }),
                /* @__PURE__ */ jsx("span", { className: classes.orderMuted, children: relativeDate(order.created_at) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: classes.orderStat, children: [
              /* @__PURE__ */ jsx("span", { className: classes.orderStatValue, children: formatCurrency(order.total_gross, order.currency) }),
              /* @__PURE__ */ jsx("span", { className: classes.orderStatLabel, children: i18n._(
                /*i18n*/
                {
                  id: "72c5Qo"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(IconChevronRight, { size: 16, className: classes.orderChevron })
          ] }) }, order.id);
        }) }) : /* @__PURE__ */ jsxs("div", { className: classes.eventsEmptyState, children: [
          /* @__PURE__ */ jsx("div", { className: classes.eventsEmptyEmoji, children: "📦" }),
          /* @__PURE__ */ jsx("h4", { className: classes.eventsEmptyTitle, children: /* @__PURE__ */ jsx(Trans, { id: "NEmyqy" }) }),
          /* @__PURE__ */ jsx("p", { className: classes.eventsEmptyCopy, children: /* @__PURE__ */ jsx(Trans, { id: "de6HLN" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `${classes.listCard} ${classes.eventsListCard}`, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.listCardHeader, children: [
          /* @__PURE__ */ jsx("div", { className: classes.listCardTitle, children: i18n._(
            /*i18n*/
            {
              id: "gyXpQN"
            }
          ) }),
          /* @__PURE__ */ jsx(NavLink, { to: `/manage/organizer/${organizerId}/events`, className: classes.listCardLink, children: i18n._(
            /*i18n*/
            {
              id: "yA/6BX"
            }
          ) })
        ] }),
        recentEvents && recentEvents.length > 0 ? /* @__PURE__ */ jsx("div", { className: classes.eventCardList, children: recentEvents.map((event) => /* @__PURE__ */ jsx(EventCard, { event, compact: true }, event.id)) }) : /* @__PURE__ */ jsxs("div", { className: classes.eventsEmptyState, children: [
          /* @__PURE__ */ jsx("div", { className: classes.eventsEmptyEmoji, children: "🎉" }),
          /* @__PURE__ */ jsx("h4", { className: classes.eventsEmptyTitle, children: /* @__PURE__ */ jsx(Trans, { id: "8zCZQf" }) }),
          /* @__PURE__ */ jsx("p", { className: classes.eventsEmptyCopy, children: /* @__PURE__ */ jsx(Trans, { id: "CCjxOC" }) }),
          /* @__PURE__ */ jsx(Button, { onClick: () => setShowCreateEventModal(true), variant: "light", size: "sm", mt: "xs", children: /* @__PURE__ */ jsx(Trans, { id: "PybJS2" }) })
        ] })
      ] })
    ] }),
    showCreateEventModal && /* @__PURE__ */ jsx(CreateEventModal, { onClose: () => setShowCreateEventModal(false), organizerId })
  ] });
};
const formatOrderStatus = (order) => {
  if (order.status === "CANCELLED" || order.payment_status === "PAYMENT_FAILED") {
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "vv7kpg"
        }
      ),
      tone: "danger"
    };
  }
  if (order.refund_status === "REFUNDED") {
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "/BI0y9"
        }
      ),
      tone: "muted"
    };
  }
  if (order.status === "COMPLETED" || order.payment_status === "PAYMENT_RECEIVED") {
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "v4nCHK"
        }
      ),
      tone: "success"
    };
  }
  if (order.status === "AWAITING_OFFLINE_PAYMENT" || order.payment_status === "AWAITING_OFFLINE_PAYMENT") {
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "3wF4Q/"
        }
      ),
      tone: "warning"
    };
  }
  if (order.payment_status === "AWAITING_PAYMENT" || order.status === "RESERVED") {
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "UbRKMZ"
        }
      ),
      tone: "warning"
    };
  }
  return {
    label: order.status ?? i18n._(
      /*i18n*/
      {
        id: "Ef7StM"
      }
    ),
    tone: "muted"
  };
};
const orderAvatarGradients = ["linear-gradient(135deg, var(--mantine-color-violet-5) 0%, var(--mantine-color-indigo-5) 100%)", "linear-gradient(135deg, var(--mantine-color-pink-5) 0%, var(--mantine-color-grape-5) 100%)", "linear-gradient(135deg, var(--mantine-color-blue-5) 0%, var(--mantine-color-cyan-5) 100%)", "linear-gradient(135deg, var(--mantine-color-teal-5) 0%, var(--mantine-color-green-5) 100%)", "linear-gradient(135deg, var(--mantine-color-orange-5) 0%, var(--mantine-color-yellow-5) 100%)", "linear-gradient(135deg, var(--mantine-color-indigo-5) 0%, var(--mantine-color-blue-5) 100%)", "linear-gradient(135deg, var(--mantine-color-grape-5) 0%, var(--mantine-color-violet-5) 100%)", "linear-gradient(135deg, var(--mantine-color-cyan-5) 0%, var(--mantine-color-teal-5) 100%)"];
const orderGradient = (orderId2) => {
  const idNum = typeof orderId2 === "number" ? orderId2 : Number(orderId2 ?? 0);
  return orderAvatarGradients[Math.abs(idNum) % orderAvatarGradients.length];
};
const orderInitials = (firstName, lastName) => {
  var _a, _b;
  const f = ((_a = firstName == null ? void 0 : firstName.trim()) == null ? void 0 : _a[0]) ?? "";
  const l = ((_b = lastName == null ? void 0 : lastName.trim()) == null ? void 0 : _b[0]) ?? "";
  return (f + l).toUpperCase();
};
export {
  DashboardSkeleton,
  OrganizerDashboard,
  OrganizerDashboard as default
};

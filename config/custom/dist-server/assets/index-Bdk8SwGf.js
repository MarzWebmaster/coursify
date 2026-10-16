import { jsx, jsxs } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { Container, Stack, Title, Text, SimpleGrid, Paper, Group, Skeleton, Table, Badge, Anchor } from "@mantine/core";
import { IconUsers, IconBuildingBank, IconCalendarEvent, IconTicket, IconTrendingUp, IconCurrencyDollar, IconShoppingCart, IconUserPlus, IconEye, IconClock } from "@tabler/icons-react";
import { u as useGetMe } from "../entry.server.js";
import { useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { e as eventHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "react-dom/server";
import "react-router";
import "react";
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
const useGetAdminStats = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminClient.getStats()
  });
};
const useGetUpcomingEvents = (perPage = 10) => {
  return useQuery({
    queryKey: ["admin", "events", "upcoming", perPage],
    queryFn: () => adminClient.getUpcomingEvents(perPage)
  });
};
const useGetAdminDashboardData = (params = {}) => {
  return useQuery({
    queryKey: ["admin", "dashboard", params.days, params.limit],
    queryFn: () => adminClient.getDashboardData(params)
  });
};
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
const AdminDashboard = () => {
  var _a, _b, _c, _d;
  const {
    data: user
  } = useGetMe();
  const {
    data: stats,
    isLoading
  } = useGetAdminStats();
  const {
    data: upcomingEvents,
    isLoading: isLoadingEvents
  } = useGetUpcomingEvents(10);
  const {
    data: dashboardData,
    isLoading: isLoadingDashboard
  } = useGetAdminDashboardData({
    days: 14,
    limit: 10
  });
  const formatEventDate = (dateString, eventTimezone) => {
    const eventDate = dayjs.utc(dateString);
    const now = dayjs();
    const diffMinutes = eventDate.diff(now, "minute");
    const diffHours = eventDate.diff(now, "hour");
    if (diffMinutes < 60) {
      return i18n._(
        /*i18n*/
        {
          id: "OoSyqO",
          values: {
            diffMinutes
          }
        }
      );
    } else if (diffHours < 24) {
      return i18n._(
        /*i18n*/
        {
          id: "jT142F",
          values: {
            diffHours
          }
        }
      );
    }
    return eventTimezone ? eventDate.tz(eventTimezone).format("MMM D, h:mma") : eventDate.format("MMM D, h:mma");
  };
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };
  return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 1, mb: "xs", children: /* @__PURE__ */ jsx(Trans, { id: "0Zypnp" }) }),
      user && /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "kTSQej", values: {
        0: user.full_name
      } }) })
    ] }),
    /* @__PURE__ */ jsxs(SimpleGrid, { cols: {
      base: 1,
      sm: 2,
      md: 4
    }, spacing: "md", children: [
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconUsers, { size: 32, color: "var(--mantine-color-blue-6)" }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "vb0Q0/"
            }
          ) }),
          isLoading ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 60, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: ((_a = stats == null ? void 0 : stats.total_users) == null ? void 0 : _a.toLocaleString()) || 0 })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconBuildingBank, { size: 32, color: "var(--mantine-color-green-6)" }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "3sZ0xx"
            }
          ) }),
          isLoading ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 60, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: ((_b = stats == null ? void 0 : stats.total_accounts) == null ? void 0 : _b.toLocaleString()) || 0 })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconCalendarEvent, { size: 32, color: "var(--mantine-color-orange-6)" }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "D9zTjx"
            }
          ) }),
          isLoading ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 60, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: ((_c = stats == null ? void 0 : stats.total_live_events) == null ? void 0 : _c.toLocaleString()) || 0 })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconTicket, { size: 32, color: "var(--mantine-color-violet-6)" }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "AGRilS"
            }
          ) }),
          isLoading ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 60, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: ((_d = stats == null ? void 0 : stats.total_tickets_sold) == null ? void 0 : _d.toLocaleString()) || 0 })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 2, mb: "xs", children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconTrendingUp, { size: 24 }),
        /* @__PURE__ */ jsx(Trans, { id: "DruLRc" })
      ] }) }),
      /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mb: "md", children: /* @__PURE__ */ jsx(Trans, { id: "JbIgPz" }) }),
      /* @__PURE__ */ jsxs(SimpleGrid, { cols: {
        base: 1,
        sm: 2,
        md: 4
      }, spacing: "md", children: [
        /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(IconCurrencyDollar, { size: 32, color: "var(--mantine-color-teal-6)" }),
          /* @__PURE__ */ jsxs("div", { style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
              /*i18n*/
              {
                id: "kv9dM4"
              }
            ) }),
            isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 80, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: formatCurrency((dashboardData == null ? void 0 : dashboardData.recent_revenue) || 0) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(IconShoppingCart, { size: 32, color: "var(--mantine-color-cyan-6)" }),
          /* @__PURE__ */ jsxs("div", { style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
              /*i18n*/
              {
                id: "sd5IMt"
              }
            ) }),
            isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 60, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: formatNumber((dashboardData == null ? void 0 : dashboardData.recent_orders_count) || 0) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(IconCurrencyDollar, { size: 32, color: "var(--mantine-color-lime-6)" }),
          /* @__PURE__ */ jsxs("div", { style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
              /*i18n*/
              {
                id: "UQ0ACV"
              }
            ) }),
            isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 80, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: formatCurrency((dashboardData == null ? void 0 : dashboardData.recent_orders_total) || 0) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(IconUserPlus, { size: 32, color: "var(--mantine-color-pink-6)" }),
          /* @__PURE__ */ jsxs("div", { style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
              /*i18n*/
              {
                id: "ArHT/C"
              }
            ) }),
            isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 28, width: 60, mt: 4 }) : /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, children: formatNumber((dashboardData == null ? void 0 : dashboardData.recent_signups_count) || 0) })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 2, mb: "md", children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconTrendingUp, { size: 24 }),
        /* @__PURE__ */ jsx(Trans, { id: "luHAJY" })
      ] }) }),
      isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 200, radius: "md" }) : (dashboardData == null ? void 0 : dashboardData.popular_events) && dashboardData.popular_events.length > 0 ? /* @__PURE__ */ jsx(Paper, { shadow: "sm", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Table, { striped: true, highlightOnHover: true, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "0pC/y6"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "G5RhpL"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { ta: "right", children: i18n._(
            /*i18n*/
            {
              id: "/u4DIx"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { ta: "right", children: i18n._(
            /*i18n*/
            {
              id: "yRg26W"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: dashboardData.popular_events.map((event) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxs(Table.Td, { children: [
            /* @__PURE__ */ jsx(Text, { fw: 500, children: event.title }),
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: event.account_name || "-" })
          ] }),
          /* @__PURE__ */ jsx(Table.Td, { children: event.organizer_name || "-" }),
          /* @__PURE__ */ jsx(Table.Td, { ta: "right", children: formatNumber(event.products_sold) }),
          /* @__PURE__ */ jsx(Table.Td, { ta: "right", children: formatCurrency(event.sales_total_gross, event.currency) })
        ] }, event.id)) })
      ] }) }) : /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsx(IconTrendingUp, { size: 48, color: "var(--mantine-color-dimmed)" }),
        /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "CHzaTD" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 2, mb: "md", children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconEye, { size: 24 }),
        /* @__PURE__ */ jsx(Trans, { id: "w36OkR" })
      ] }) }),
      isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 200, radius: "md" }) : (dashboardData == null ? void 0 : dashboardData.most_viewed_events) && dashboardData.most_viewed_events.length > 0 ? /* @__PURE__ */ jsx(Paper, { shadow: "sm", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Table, { striped: true, highlightOnHover: true, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "0pC/y6"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "G5RhpL"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { ta: "right", children: i18n._(
            /*i18n*/
            {
              id: "oJjplO"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: dashboardData.most_viewed_events.map((event) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxs(Table.Td, { children: [
            /* @__PURE__ */ jsx(Text, { fw: 500, children: event.title }),
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: event.account_name || "-" })
          ] }),
          /* @__PURE__ */ jsx(Table.Td, { children: event.organizer_name || "-" }),
          /* @__PURE__ */ jsx(Table.Td, { ta: "right", children: formatNumber(event.total_views) })
        ] }, event.id)) })
      ] }) }) : /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsx(IconEye, { size: 48, color: "var(--mantine-color-dimmed)" }),
        /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "8wgkoi" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 2, mb: "md", children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconBuildingBank, { size: 24 }),
        /* @__PURE__ */ jsx(Trans, { id: "UBSG1X" })
      ] }) }),
      isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 200, radius: "md" }) : (dashboardData == null ? void 0 : dashboardData.top_organizers) && dashboardData.top_organizers.length > 0 ? /* @__PURE__ */ jsx(Paper, { shadow: "sm", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Table, { striped: true, highlightOnHover: true, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "G5RhpL"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "AeXO77"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { ta: "right", children: i18n._(
            /*i18n*/
            {
              id: "APyAR/"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { ta: "right", children: i18n._(
            /*i18n*/
            {
              id: "/u4DIx"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: dashboardData.top_organizers.map((organizer) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { fw: 500, children: organizer.name }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: organizer.account_name || "-" }),
          /* @__PURE__ */ jsx(Table.Td, { ta: "right", children: formatNumber(organizer.events_count) }),
          /* @__PURE__ */ jsx(Table.Td, { ta: "right", children: formatNumber(organizer.total_products_sold) })
        ] }, organizer.id)) })
      ] }) }) : /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsx(IconBuildingBank, { size: 48, color: "var(--mantine-color-dimmed)" }),
        /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "wUv5xQ" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 2, mb: "md", children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconUserPlus, { size: 24 }),
        /* @__PURE__ */ jsx(Trans, { id: "pLXbi8" })
      ] }) }),
      isLoadingDashboard ? /* @__PURE__ */ jsx(Skeleton, { height: 200, radius: "md" }) : (dashboardData == null ? void 0 : dashboardData.recent_accounts) && dashboardData.recent_accounts.length > 0 ? /* @__PURE__ */ jsx(Paper, { shadow: "sm", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Table, { striped: true, highlightOnHover: true, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "AeXO77"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "O3oNi5"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "jVRHeq"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { ta: "right", children: i18n._(
            /*i18n*/
            {
              id: "tst44n"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { ta: "right", children: i18n._(
            /*i18n*/
            {
              id: "Sxm8rQ"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "uAQUqI"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: dashboardData.recent_accounts.map((account) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { fw: 500, children: account.name }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: account.email }),
          /* @__PURE__ */ jsx(Table.Td, { children: dayjs(account.created_at).fromNow() }),
          /* @__PURE__ */ jsx(Table.Td, { ta: "right", children: formatNumber(account.events_count) }),
          /* @__PURE__ */ jsx(Table.Td, { ta: "right", children: formatNumber(account.users_count) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
            account.account_verified_at && /* @__PURE__ */ jsx(Badge, { size: "xs", color: "green", variant: "light", children: i18n._(
              /*i18n*/
              {
                id: "QDEWii"
              }
            ) }),
            account.stripe_connect_setup_complete && /* @__PURE__ */ jsx(Badge, { size: "xs", color: "blue", variant: "light", children: i18n._(
              /*i18n*/
              {
                id: "4HXezG"
              }
            ) })
          ] }) })
        ] }, account.id)) })
      ] }) }) : /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsx(IconUserPlus, { size: 48, color: "var(--mantine-color-dimmed)" }),
        /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "wYiAtV" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 2, mb: "md", children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconClock, { size: 24 }),
        /* @__PURE__ */ jsx(Trans, { id: "PC3/fk" })
      ] }) }),
      isLoadingEvents ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "md" })
      ] }) : (upcomingEvents == null ? void 0 : upcomingEvents.data) && upcomingEvents.data.length > 0 ? /* @__PURE__ */ jsx(Stack, { gap: "md", children: upcomingEvents.data.map((event) => /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ jsx("div", { style: {
          flex: 1
        }, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(Text, { fw: 600, size: "lg", children: event.title }),
          /* @__PURE__ */ jsx(Badge, { color: "orange", variant: "light", children: formatEventDate(event.start_date, event.timezone) })
        ] }) }),
        /* @__PURE__ */ jsx(Anchor, { href: eventHomepageUrl(event), target: "_blank", size: "sm", children: /* @__PURE__ */ jsx(Trans, { id: "FCVmuU" }) })
      ] }) }, event.id)) }) : /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsx(IconCalendarEvent, { size: 48, color: "var(--mantine-color-dimmed)" }),
        /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "8pQ3NJ" }) })
      ] }) })
    ] })
  ] }) });
};
export {
  AdminDashboard as default
};

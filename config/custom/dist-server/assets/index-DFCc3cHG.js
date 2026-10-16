import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Text, Table, Button, Group, Badge, Container, Stack, Title, TextInput, Skeleton, Pagination } from "@mantine/core";
import { IconChevronUp, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { p as prettyDate } from "./dates-CbVpwZeX.js";
import { t as tableStyles } from "./admin-table.module-CfJrGaI_.js";
import "../entry.server.js";
import "react-dom/server";
import "react-router";
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
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
const GET_ALL_ORDERS_QUERY_KEY = "getAllOrders";
const useGetAllAdminOrders = (params = {}) => {
  return useQuery({
    queryKey: [GET_ALL_ORDERS_QUERY_KEY, params],
    queryFn: async () => await adminClient.getAllOrders(params)
  });
};
const AdminOrdersTable = ({
  orders,
  onSort,
  sortBy,
  sortDirection
}) => {
  if (!orders || orders.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: tableStyles.emptyState, children: /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: i18n._(
      /*i18n*/
      {
        id: "EJ7bVz"
      }
    ) }) });
  }
  const handleSort = (column) => {
    if (onSort) {
      onSort(column);
    }
  };
  const SortIcon = ({
    column
  }) => {
    if (sortBy !== column) return null;
    return sortDirection === "asc" ? /* @__PURE__ */ jsx(IconChevronUp, { size: 14 }) : /* @__PURE__ */ jsx(IconChevronDown, { size: 14 });
  };
  const getStatusBadgeColor = (status) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return "green";
      case "PENDING":
      case "RESERVED":
        return "yellow";
      case "CANCELLED":
        return "red";
      case "REFUNDED":
      case "PARTIALLY_REFUNDED":
        return "blue";
      default:
        return "gray";
    }
  };
  return /* @__PURE__ */ jsx("div", { className: tableStyles.tableWrapper, children: /* @__PURE__ */ jsx("div", { className: tableStyles.tableScroll, children: /* @__PURE__ */ jsxs(Table, { className: tableStyles.table, highlightOnHover: true, children: [
    /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
      /* @__PURE__ */ jsx(Table.Th, { children: /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", onClick: () => handleSort("short_id"), rightSection: /* @__PURE__ */ jsx(SortIcon, { column: "short_id" }), className: tableStyles.sortButton, children: i18n._(
        /*i18n*/
        {
          id: "oI/hGR"
        }
      ) }) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "AeXO77"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "876pfE"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "0pC/y6"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", onClick: () => handleSort("total_gross"), rightSection: /* @__PURE__ */ jsx(SortIcon, { column: "total_gross" }), className: tableStyles.sortButton, children: i18n._(
        /*i18n*/
        {
          id: "72c5Qo"
        }
      ) }) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "JpohL9"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "uAQUqI"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", onClick: () => handleSort("created_at"), rightSection: /* @__PURE__ */ jsx(SortIcon, { column: "created_at" }), className: tableStyles.sortButton, children: i18n._(
        /*i18n*/
        {
          id: "mYGY3B"
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Table.Tbody, { children: orders.map((order) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Text, { fw: 500, size: "sm", children: [
        "#",
        order.short_id
      ] }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: order.account_name }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Text, { size: "sm", fw: 500, children: [
          order.first_name,
          " ",
          order.last_name
        ] }),
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: order.email })
      ] }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: order.event_title }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, children: formatCurrency(order.total_gross, order.currency) }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: formatCurrency(order.total_tax, order.currency) }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Group, { gap: "xs", children: /* @__PURE__ */ jsx(Badge, { color: getStatusBadgeColor(order.status), size: "sm", variant: "light", children: order.status }) }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: prettyDate(order.created_at, "UTC") }) })
    ] }, order.id)) })
  ] }) }) });
};
const Orders = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const {
    data: ordersData,
    isLoading
  } = useGetAllAdminOrders({
    page,
    per_page: 20,
    search: debouncedSearch,
    sort_by: sortBy,
    sort_direction: sortDirection
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };
  return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
    /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ) }),
    /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
      /*i18n*/
      {
        id: "20ce0U"
      }
    ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value) }),
    isLoading ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 50, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 400, radius: "md" })
    ] }) : /* @__PURE__ */ jsx(AdminOrdersTable, { orders: (ordersData == null ? void 0 : ordersData.data) || [], onSort: handleSort, sortBy, sortDirection }),
    (ordersData == null ? void 0 : ordersData.meta) && ordersData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: ordersData.meta.last_page, value: page, onChange: setPage, mt: "md" })
  ] }) });
};
export {
  Orders as default
};

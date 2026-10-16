import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Text, Table, Button, Stack, Group, Badge, Tooltip, ActionIcon, Container, Title, TextInput, Skeleton, Pagination } from "@mantine/core";
import { IconEye, IconUserCheck, IconChevronUp, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { u as useStartImpersonation } from "./useStartImpersonation-CU8BGgZu.js";
import { t as tableStyles } from "./admin-table.module-CfJrGaI_.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { a as getConfig } from "../entry.server.js";
import "@mantine/notifications";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const GET_ALL_EVENTS_QUERY_KEY = "getAllEvents";
const useGetAllAdminEvents = (params = {}) => {
  return useQuery({
    queryKey: [GET_ALL_EVENTS_QUERY_KEY, params],
    queryFn: async () => await adminClient.getAllEvents(params)
  });
};
const AdminEventsTable = ({
  events,
  onSort,
  sortBy,
  sortDirection,
  onViewEvent,
  onImpersonate,
  isImpersonating
}) => {
  if (!events || events.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: tableStyles.emptyState, children: /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: i18n._(
      /*i18n*/
      {
        id: "dW40Uz"
      }
    ) }) });
  }
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };
  const getStatusBadgeColor = (status) => {
    switch (status.toUpperCase()) {
      case "LIVE":
        return "green";
      case "DRAFT":
        return "yellow";
      case "ARCHIVED":
        return "gray";
      default:
        return "blue";
    }
  };
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
  return /* @__PURE__ */ jsx("div", { className: tableStyles.tableWrapper, children: /* @__PURE__ */ jsx("div", { className: tableStyles.tableScroll, children: /* @__PURE__ */ jsxs(Table, { className: tableStyles.table, highlightOnHover: true, children: [
    /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
      /* @__PURE__ */ jsx(Table.Th, { children: /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", onClick: () => handleSort("title"), rightSection: /* @__PURE__ */ jsx(SortIcon, { column: "title" }), className: tableStyles.sortButton, children: i18n._(
        /*i18n*/
        {
          id: "XVLu2v"
        }
      ) }) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "G5RhpL"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", onClick: () => handleSort("start_date"), rightSection: /* @__PURE__ */ jsx(SortIcon, { column: "start_date" }), className: tableStyles.sortButton, children: i18n._(
        /*i18n*/
        {
          id: "D3iCkb"
        }
      ) }) }),
      /* @__PURE__ */ jsx(Table.Th, { children: /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", onClick: () => handleSort("end_date"), rightSection: /* @__PURE__ */ jsx(SortIcon, { column: "end_date" }), className: tableStyles.sortButton, children: i18n._(
        /*i18n*/
        {
          id: "VFv2ZC"
        }
      ) }) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "2NbyY/"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "uAQUqI"
        }
      ) }),
      /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
        /*i18n*/
        {
          id: "7L01XJ"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Table.Tbody, { children: events.map((event) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { fw: 500, children: event.title }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: event.organizer_name }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: formatDate(event.start_date) }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: formatDate(event.end_date) }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: event.statistics ? /* @__PURE__ */ jsxs(Stack, { gap: 4, children: [
        /* @__PURE__ */ jsxs(Group, { gap: 6, children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "3Q1AWe"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "xs", fw: 600, children: formatCurrency(event.statistics.total_gross_sales) })
        ] }),
        /* @__PURE__ */ jsxs(Group, { gap: 6, children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "4HVzhV"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "xs", fw: 500, children: formatNumber(event.statistics.attendees_registered) })
        ] }),
        /* @__PURE__ */ jsxs(Group, { gap: 6, children: [
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "B/EBQv"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "xs", fw: 500, children: formatNumber(event.statistics.orders_created) })
        ] })
      ] }) : /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: "-" }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { color: getStatusBadgeColor(event.status), variant: "light", children: event.status }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
          /*i18n*/
          {
            id: "FCVmuU"
          }
        ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "blue", onClick: () => onViewEvent == null ? void 0 : onViewEvent(event), children: /* @__PURE__ */ jsx(IconEye, { size: 18 }) }) }),
        /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
          /*i18n*/
          {
            id: "TWXU0c"
          }
        ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "grape", onClick: () => onImpersonate == null ? void 0 : onImpersonate(event.user_id, event.account_id), disabled: isImpersonating, children: /* @__PURE__ */ jsx(IconUserCheck, { size: 18 }) }) })
      ] }) })
    ] }, event.id)) })
  ] }) }) });
};
const Events = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("start_date");
  const [sortDirection, setSortDirection] = useState("desc");
  const {
    data: eventsData,
    isLoading
  } = useGetAllAdminEvents({
    page,
    per_page: 20,
    search: debouncedSearch,
    sort_by: sortBy,
    sort_direction: sortDirection
  });
  const startImpersonationMutation = useStartImpersonation();
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
  const handleViewEvent = (event) => {
    const publicEventUrl = `${getConfig("VITE_FRONTEND_URL")}/event/${event.id}/${event.slug}`;
    window.open(publicEventUrl, "_blank");
  };
  const handleImpersonate = (userId, accountId) => {
    startImpersonationMutation.mutate({
      userId,
      accountId
    }, {
      onSuccess: (response) => {
        showSuccess(response.message || i18n._(
          /*i18n*/
          {
            id: "5LAZwq"
          }
        ));
        if (response.redirect_url) {
          window.location.href = response.redirect_url;
        } else {
          navigate("/manage/events");
        }
      },
      onError: (error) => {
        var _a, _b;
        showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "t/KVOk"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
    /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
      /*i18n*/
      {
        id: "tst44n"
      }
    ) }),
    /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
      /*i18n*/
      {
        id: "VX+B3I"
      }
    ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value) }),
    isLoading ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 50, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 400, radius: "md" })
    ] }) : /* @__PURE__ */ jsx(AdminEventsTable, { events: (eventsData == null ? void 0 : eventsData.data) || [], onSort: handleSort, sortBy, sortDirection, onViewEvent: handleViewEvent, onImpersonate: handleImpersonate, isImpersonating: startImpersonationMutation.isPending }),
    (eventsData == null ? void 0 : eventsData.meta) && eventsData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: eventsData.meta.last_page, value: page, onChange: setPage, mt: "md" })
  ] }) });
};
export {
  Events as default
};

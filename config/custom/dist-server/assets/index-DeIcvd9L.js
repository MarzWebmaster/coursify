import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { Container, Stack, Title, Text, SimpleGrid, Skeleton, Paper, Group, SegmentedControl, Table, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { useState } from "react";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { t as tableStyles } from "./admin-table.module-CfJrGaI_.js";
import "../entry.server.js";
import "react-dom/server";
import "react-router";
import "@tabler/icons-react";
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
const useGetUtmAttributionStats = (params = {}) => {
  return useQuery({
    queryKey: ["admin", "attribution", "stats", params],
    queryFn: () => adminClient.getUtmAttributionStats(params)
  });
};
const Attribution = () => {
  const [groupBy, setGroupBy] = useState("source");
  const [page, setPage] = useState(1);
  const perPage = 20;
  const {
    data,
    isLoading
  } = useGetUtmAttributionStats({
    group_by: groupBy,
    page,
    per_page: perPage
  });
  const summary = data == null ? void 0 : data.summary;
  const paginatedData = data == null ? void 0 : data.data;
  const stats = (paginatedData == null ? void 0 : paginatedData.data) || [];
  const totalPages = (paginatedData == null ? void 0 : paginatedData.last_page) || 1;
  return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { order: 1, mb: "xs", children: /* @__PURE__ */ jsx(Trans, { id: "HVkhy2" }) }),
      /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "orluER" }) }),
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mt: "xs", children: /* @__PURE__ */ jsx(Trans, { id: "GVUxAX" }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxs(SimpleGrid, { cols: {
      base: 1,
      sm: 2,
      md: 4
    }, spacing: "md", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "md" })
    ] }) : summary && /* @__PURE__ */ jsxs(SimpleGrid, { cols: {
      base: 1,
      sm: 2,
      md: 4
    }, spacing: "md", children: [
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
          /*i18n*/
          {
            id: "c+suC6"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, mt: 4, children: summary.paid_accounts.toLocaleString() })
      ] }) }),
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
          /*i18n*/
          {
            id: "qtGTNu"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, mt: 4, children: summary.organic_accounts.toLocaleString() })
      ] }) }),
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
          /*i18n*/
          {
            id: "pnoTN5"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, mt: 4, children: summary.referral_accounts.toLocaleString() })
      ] }) }),
      /* @__PURE__ */ jsx(Paper, { shadow: "sm", p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fw: 500, children: i18n._(
          /*i18n*/
          {
            id: "n57zCW"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, mt: 4, children: summary.unattributed_accounts.toLocaleString() })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsx(Title, { order: 2, children: /* @__PURE__ */ jsx(Trans, { id: "dMMjeD" }) }),
        /* @__PURE__ */ jsx(SegmentedControl, { value: groupBy, onChange: (value) => {
          setGroupBy(value);
          setPage(1);
        }, data: [{
          label: i18n._(
            /*i18n*/
            {
              id: "wdxz7K"
            }
          ),
          value: "source"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "D02dD9"
            }
          ),
          value: "campaign"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "agPptk"
            }
          ),
          value: "medium"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "+zy2Nq"
            }
          ),
          value: "source_type"
        }] })
      ] }),
      isLoading ? /* @__PURE__ */ jsx(Stack, { gap: "md", children: /* @__PURE__ */ jsx(Skeleton, { height: 400, radius: "md" }) }) : stats.length === 0 ? /* @__PURE__ */ jsx("div", { className: tableStyles.emptyState, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "lg", children: /* @__PURE__ */ jsx(Trans, { id: "/UC6qk" }) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: tableStyles.tableWrapper, children: /* @__PURE__ */ jsx("div", { className: tableStyles.tableScroll, children: /* @__PURE__ */ jsxs(Table, { className: tableStyles.table, highlightOnHover: true, children: [
          /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "1oPDuj"
              }
            ) }),
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "bPwFdf"
              }
            ) }),
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "tst44n"
              }
            ) }),
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "D9zTjx"
              }
            ) }),
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "Bk06QI"
              }
            ) }),
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "QDEWii"
              }
            ) }),
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "8YBH95"
              }
            ) }),
            /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
              /*i18n*/
              {
                id: "1h+RBg"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(Table.Tbody, { children: stats.map((stat, index) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { fw: 600, size: "sm", children: stat.attribution_value || i18n._(
              /*i18n*/
              {
                id: "ncwQad"
              }
            ) }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: stat.total_accounts.toLocaleString() }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: stat.total_events.toLocaleString() }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: stat.live_events.toLocaleString() }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: stat.stripe_connected.toLocaleString() }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: stat.verified_accounts.toLocaleString() }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, children: formatCurrency(stat.total_revenue, "USD") }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: stat.total_orders.toLocaleString() }) })
          ] }, index)) })
        ] }) }) }),
        totalPages > 1 && /* @__PURE__ */ jsx(Group, { justify: "center", mt: "lg", children: /* @__PURE__ */ jsx(Pagination, { total: totalPages, value: page, onChange: setPage }) })
      ] })
    ] })
  ] }) });
};
export {
  Attribution as default
};

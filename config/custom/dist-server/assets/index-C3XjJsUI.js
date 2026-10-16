import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, Link } from "react-router";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { Group, Skeleton, Select, Button, Text, Table as Table$1, Badge } from "@mantine/core";
import { IconCalendar, IconDownload, IconArrowsSort, IconArrowUp, IconArrowDown, IconChevronLeft } from "@tabler/icons-react";
import { c as OrganizerReportTypes } from "./types-CqPWB-a5.js";
import { u as useGetOrganizer } from "./useGetOrganizer-DMDsW5DW.js";
import { u as useGetOrganizerStats } from "./useGetOrganizerStats-DKCCR5Rs.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
import { DatePickerInput } from "@mantine/dates";
import { useState, useMemo } from "react";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { T as Table, a as TableHead } from "./index-XJu-jVVm.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { o as organizerClient } from "../entry.server.js";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { d as downloadBinary } from "./download-DP3M_6Yt.js";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/advancedFormat.js";
import "./index-jHMtuNEo.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/colors-generator";
const GET_ORGANIZER_REPORT_QUERY_KEY = "getOrganizerReport";
const useGetOrganizerReport = (organizerId, reportType, startDate, endDate, currency, eventId, page = 1, perPage = 1e3) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_REPORT_QUERY_KEY, organizerId, reportType, startDate == null ? void 0 : startDate.toISOString(), endDate == null ? void 0 : endDate.toISOString(), currency, eventId, page, perPage],
    queryFn: async () => {
      const startDateString = startDate == null ? void 0 : startDate.toISOString();
      const endDateString = endDate == null ? void 0 : endDate.toISOString();
      const response = await organizerClient.getOrganizerReport(organizerId, reportType, startDateString, endDateString, currency, eventId, page, perPage);
      if (response.data && response.pagination) {
        return response;
      }
      return {
        data: response.data || response,
        pagination: {
          total: Array.isArray(response.data || response) ? (response.data || response).length : 0,
          page: 1,
          per_page: 1e3,
          last_page: 1
        }
      };
    },
    enabled: !!organizerId && !!reportType && (!!startDate && !!endDate || !startDate && !endDate)
  });
};
const periodSelect = "_periodSelect_bfyjb_2";
const datePicker = "_datePicker_bfyjb_3";
const downloadButton = "_downloadButton_bfyjb_4";
const currencySelect = "_currencySelect_bfyjb_5";
const classes$1 = {
  periodSelect,
  datePicker,
  downloadButton,
  currencySelect
};
dayjs.extend(utc);
dayjs.extend(timezone);
const TIME_PERIODS = [{
  value: "24h",
  label: i18n._(
    /*i18n*/
    {
      id: "aK4uBd"
    }
  )
}, {
  value: "48h",
  label: i18n._(
    /*i18n*/
    {
      id: "bB6Ram"
    }
  )
}, {
  value: "7d",
  label: i18n._(
    /*i18n*/
    {
      id: "ct2SYD"
    }
  )
}, {
  value: "14d",
  label: i18n._(
    /*i18n*/
    {
      id: "vfe90m"
    }
  )
}, {
  value: "30d",
  label: i18n._(
    /*i18n*/
    {
      id: "uq2BmQ"
    }
  )
}, {
  value: "90d",
  label: i18n._(
    /*i18n*/
    {
      id: "XgOuA7"
    }
  )
}, {
  value: "6m",
  label: i18n._(
    /*i18n*/
    {
      id: "VlnB7s"
    }
  )
}, {
  value: "ytd",
  label: i18n._(
    /*i18n*/
    {
      id: "+G/XiQ"
    }
  )
}, {
  value: "12m",
  label: i18n._(
    /*i18n*/
    {
      id: "2LMsOq"
    }
  )
}, {
  value: "custom",
  label: i18n._(
    /*i18n*/
    {
      id: "UEqXyt"
    }
  )
}];
const ROWS_PER_PAGE = 1e3;
const OrganizerReportTable = ({
  title,
  columns,
  showDateFilter = true,
  defaultStartDate = new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() - 3)),
  defaultEndDate = /* @__PURE__ */ new Date(),
  onDateRangeChange,
  enableDownload = true,
  organizer,
  showCurrencyFilter = true,
  availableCurrencies = [],
  eventId
}) => {
  const tz = organizer.timezone || "UTC";
  const [dateRange, setDateRange] = useState([dayjs(defaultStartDate).tz(tz).toDate(), dayjs(defaultEndDate).tz(tz).toDate()]);
  const [selectedPeriod, setSelectedPeriod] = useState("90d");
  const [showDatePickerInput, setShowDatePickerInput] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    reportType,
    organizerId
  } = useParams();
  const reportQuery = useGetOrganizerReport(organizerId, reportType || "", dateRange[0], dateRange[1], selectedCurrency, eventId, currentPage, ROWS_PER_PAGE);
  const reportData = reportQuery.data;
  const data = (reportData == null ? void 0 : reportData.data) || [];
  const pagination = reportData == null ? void 0 : reportData.pagination;
  const calculateDateRange = (period) => {
    if (period === "custom") {
      setShowDatePickerInput(true);
      return dateRange;
    }
    setShowDatePickerInput(false);
    let end = dayjs().tz(tz).endOf("day");
    let start = dayjs().tz(tz);
    switch (period) {
      case "24h":
        start = start.startOf("day");
        end = start.endOf("day");
        break;
      case "48h":
        start = start.subtract(1, "day").startOf("day");
        end = start.endOf("day").add(1, "day");
        break;
      case "7d":
        start = start.subtract(6, "day").startOf("day");
        break;
      case "14d":
        start = start.subtract(13, "day").startOf("day");
        break;
      case "30d":
        start = start.subtract(29, "day").startOf("day");
        break;
      case "90d":
        start = start.subtract(89, "day").startOf("day");
        break;
      case "6m":
        start = start.subtract(6, "month").startOf("day");
        break;
      case "ytd":
        start = start.startOf("year");
        break;
      case "12m":
        start = start.subtract(12, "month").startOf("day");
        break;
      default:
        return [null, null];
    }
    return [start.toDate(), end.toDate()];
  };
  const handlePeriodChange = (value, _) => {
    if (!value) return;
    setSelectedPeriod(value);
    const newRange = calculateDateRange(value);
    setDateRange(newRange);
    setCurrentPage(1);
    onDateRangeChange == null ? void 0 : onDateRangeChange(newRange);
  };
  const handleDateRangeChange = (newRange) => {
    const [start, end] = newRange;
    const tzStart = start ? dayjs(start).tz(tz) : null;
    const tzEnd = end ? dayjs(end).tz(tz) : null;
    const tzRange = [(tzStart == null ? void 0 : tzStart.toDate()) || null, (tzEnd == null ? void 0 : tzEnd.toDate()) || null];
    setDateRange(tzRange);
    setCurrentPage(1);
    onDateRangeChange == null ? void 0 : onDateRangeChange(tzRange);
  };
  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value === "" ? null : value);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = async () => {
    var _a, _b;
    if (!organizerId || !reportType) return;
    setIsExporting(true);
    try {
      const blob = await organizerClient.exportOrganizerReport(organizerId, reportType, (_a = dateRange[0]) == null ? void 0 : _a.toISOString(), (_b = dateRange[1]) == null ? void 0 : _b.toISOString(), selectedCurrency, eventId);
      const filename = `${reportType}_${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.csv`;
      downloadBinary(blob, filename);
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "wuyaZh"
        }
      ));
    } catch {
      showError(i18n._(
        /*i18n*/
        {
          id: "zGE3CH"
        }
      ));
    } finally {
      setIsExporting(false);
    }
  };
  const handleSort = (field) => {
    if (sortField === field) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else setSortDirection("asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const getSortIcon = (field) => {
    if (sortField !== field) return /* @__PURE__ */ jsx(IconArrowsSort, { size: 16 });
    if (sortDirection === "asc") return /* @__PURE__ */ jsx(IconArrowUp, { size: 16 });
    if (sortDirection === "desc") return /* @__PURE__ */ jsx(IconArrowDown, { size: 16 });
    return /* @__PURE__ */ jsx(IconArrowsSort, { size: 16, className: "ml-2 text-gray-400" });
  };
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortField || !sortDirection) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.toLowerCase().localeCompare(bValue.toLowerCase()) : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
      }
      return 0;
    });
  }, [data, sortField, sortDirection]);
  const emptyStateMessage = () => {
    const wrapper = (message) => /* @__PURE__ */ jsx(Table$1.Tr, { children: /* @__PURE__ */ jsx(Table$1.Td, { colSpan: columns.length, align: "center", py: "xl", children: message }) });
    if (reportQuery.isLoading) {
      return wrapper(i18n._(
        /*i18n*/
        {
          id: "Z3FXyt"
        }
      ));
    }
    if (showDateFilter && (!dateRange[0] || !dateRange[1])) {
      return wrapper(i18n._(
        /*i18n*/
        {
          id: "8KmsFa"
        }
      ));
    }
    return wrapper(i18n._(
      /*i18n*/
      {
        id: "eb47T5"
      }
    ));
  };
  if (reportQuery.isLoading) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Group, { justify: "space-between", mb: "xl", children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 32, width: 200 }),
        /* @__PURE__ */ jsxs(Group, { gap: "sm", children: [
          /* @__PURE__ */ jsx(Skeleton, { height: 32, width: 200 }),
          /* @__PURE__ */ jsx(Skeleton, { height: 32, width: 130 })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { height: 300, radius: "md" })
    ] });
  }
  const currencyOptions = [{
    value: "",
    label: i18n._(
      /*i18n*/
      {
        id: "pMLul+"
      }
    )
  }, ...availableCurrencies.map((curr) => ({
    value: curr,
    label: curr
  }))];
  const totalPages = (pagination == null ? void 0 : pagination.last_page) || 1;
  const totalRows = (pagination == null ? void 0 : pagination.total) || 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Group, { justify: "space-between", mb: "md", children: [
      /* @__PURE__ */ jsx(PageTitle, { children: title }),
      /* @__PURE__ */ jsxs(Group, { justify: "flex-end", align: "center", gap: "sm", children: [
        showCurrencyFilter && availableCurrencies.length > 0 && /* @__PURE__ */ jsx(Select, { style: {
          minWidth: "140px"
        }, placeholder: i18n._(
          /*i18n*/
          {
            id: "Q2lUR2"
          }
        ), data: currencyOptions, value: selectedCurrency ?? "", onChange: handleCurrencyChange, mb: "0", className: classes$1.currencySelect }),
        showDateFilter && /* @__PURE__ */ jsx(Select, { style: {
          minWidth: "200px"
        }, placeholder: i18n._(
          /*i18n*/
          {
            id: "DrwwNd"
          }
        ), data: TIME_PERIODS, value: selectedPeriod, onChange: handlePeriodChange, leftSection: /* @__PURE__ */ jsx(IconCalendar, { stroke: 1.5, size: 20 }), mb: "0", className: classes$1.periodSelect }),
        showDateFilter && showDatePickerInput && /* @__PURE__ */ jsx(DatePickerInput, { style: {
          minWidth: "305px",
          marginBottom: "0"
        }, leftSection: /* @__PURE__ */ jsx(IconCalendar, { stroke: 1.5, size: 20 }), type: "range", placeholder: "Pick dates range", value: dateRange, onChange: handleDateRangeChange, minDate: dayjs().subtract(1, "year").tz(tz).toDate(), maxDate: dayjs().tz(tz).toDate(), className: classes$1.datePicker }),
        enableDownload && /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconDownload, { size: 16 }), variant: "light", onClick: handleExport, loading: isExporting, className: classes$1.downloadButton, children: i18n._(
          /*i18n*/
          {
            id: "2KAI4N"
          }
        ) })
      ] })
    ] }),
    totalRows > 0 && /* @__PURE__ */ jsxs(Text, { size: "sm", c: "dimmed", mb: "sm", children: [
      i18n._(
        /*i18n*/
        {
          id: "t1LIQW",
          values: {
            0: sortedData.length,
            totalRows
          }
        }
      ),
      totalPages > 1 && ` (${i18n._(
        /*i18n*/
        {
          id: "6WdDG7"
        }
      )} ${currentPage} ${i18n._(
        /*i18n*/
        {
          id: "BwJKBw"
        }
      )} ${totalPages})`
    ] }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(Table$1.Tr, { children: columns.map((column) => /* @__PURE__ */ jsx(Table$1.Th, { onClick: column.sortable ? () => handleSort(column.key) : void 0, style: {
        cursor: column.sortable ? "pointer" : "default",
        minWidth: "180px"
      }, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
        column.label,
        column.sortable && getSortIcon(column.key)
      ] }) }, String(column.key))) }) }),
      /* @__PURE__ */ jsxs(Table$1.Tbody, { children: [
        !sortedData.length && emptyStateMessage(),
        sortedData.map((row, index) => /* @__PURE__ */ jsx(Table$1.Tr, { children: columns.map((column) => /* @__PURE__ */ jsx(Table$1.Td, { children: column.render ? column.render(row[column.key], row, {
          currency: selectedCurrency || organizer.currency || "USD"
        }) : row[column.key] }, String(column.key))) }, index))
      ] })
    ] }),
    totalPages > 1 && /* @__PURE__ */ jsx(Pagination, { value: currentPage, onChange: handlePageChange, total: totalPages })
  ] });
};
const RevenueSummaryReport = () => {
  var _a;
  const {
    organizerId
  } = useParams();
  const organizerQuery = useGetOrganizer(organizerId);
  const organizer = organizerQuery.data;
  const statsQuery = useGetOrganizerStats(organizerId, organizer == null ? void 0 : organizer.currency);
  const allCurrencies = ((_a = statsQuery.data) == null ? void 0 : _a.all_organizers_currencies) || [];
  if (!organizer) {
    return null;
  }
  const columns = [{
    key: "date",
    label: i18n._(
      /*i18n*/
      {
        id: "mYGY3B"
      }
    ),
    sortable: true,
    render: (value) => formatDateWithLocale(value, "shortDate", (organizer == null ? void 0 : organizer.timezone) || "UTC")
  }, {
    key: "gross_sales",
    label: i18n._(
      /*i18n*/
      {
        id: "yRg26W"
      }
    ),
    sortable: true,
    render: (value, _row, context) => formatCurrency(value, context.currency)
  }, {
    key: "net_revenue",
    label: i18n._(
      /*i18n*/
      {
        id: "xxU3NX"
      }
    ),
    sortable: true,
    render: (value, _row, context) => formatCurrency(value, context.currency)
  }, {
    key: "total_refunded",
    label: i18n._(
      /*i18n*/
      {
        id: "bU4bS1"
      }
    ),
    sortable: true,
    render: (value, _row, context) => formatCurrency(value, context.currency)
  }, {
    key: "total_tax",
    label: i18n._(
      /*i18n*/
      {
        id: "ZowkxF"
      }
    ),
    sortable: true,
    render: (value, _row, context) => formatCurrency(value, context.currency)
  }, {
    key: "total_fee",
    label: i18n._(
      /*i18n*/
      {
        id: "/mfICu"
      }
    ),
    sortable: true,
    render: (value, _row, context) => formatCurrency(value, context.currency)
  }, {
    key: "order_count",
    label: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ),
    sortable: true
  }];
  return /* @__PURE__ */ jsx(OrganizerReportTable, { title: i18n._(
    /*i18n*/
    {
      id: "Oo/PLb"
    }
  ), columns, isLoading: organizerQuery.isLoading, downloadFileName: "revenue_summary_report.csv", showDateFilter: true, organizer, showCurrencyFilter: true, availableCurrencies: allCurrencies });
};
const EventsPerformanceReport = () => {
  var _a;
  const {
    organizerId
  } = useParams();
  const organizerQuery = useGetOrganizer(organizerId);
  const organizer = organizerQuery.data;
  const statsQuery = useGetOrganizerStats(organizerId, organizer == null ? void 0 : organizer.currency);
  const allCurrencies = ((_a = statsQuery.data) == null ? void 0 : _a.all_organizers_currencies) || [];
  if (!organizer) {
    return null;
  }
  const getStatusBadge = (eventState) => {
    const colors = {
      "past": "gray",
      "ongoing": "green",
      "on_sale": "blue",
      "upcoming": "orange"
    };
    const labels = {
      "past": i18n._(
        /*i18n*/
        {
          id: "Ff0Dor"
        }
      ),
      "ongoing": i18n._(
        /*i18n*/
        {
          id: "J6n7sl"
        }
      ),
      "on_sale": i18n._(
        /*i18n*/
        {
          id: "Ldu/RI"
        }
      ),
      "upcoming": i18n._(
        /*i18n*/
        {
          id: "ia8YsC"
        }
      )
    };
    return /* @__PURE__ */ jsx(Badge, { color: colors[eventState] || "gray", children: labels[eventState] || eventState });
  };
  const columns = [{
    key: "event_name",
    label: i18n._(
      /*i18n*/
      {
        id: "0pC/y6"
      }
    ),
    sortable: true,
    render: (value, row) => /* @__PURE__ */ jsx(Link, { to: `/manage/event/${row.event_id}/dashboard`, style: {
      textDecoration: "none",
      color: "inherit"
    }, children: value })
  }, {
    key: "event_currency",
    label: i18n._(
      /*i18n*/
      {
        id: "Q2lUR2"
      }
    ),
    sortable: true
  }, {
    key: "start_date",
    label: i18n._(
      /*i18n*/
      {
        id: "mYGY3B"
      }
    ),
    sortable: true,
    render: (value) => value ? formatDateWithLocale(value, "shortDate", (organizer == null ? void 0 : organizer.timezone) || "UTC") : "-"
  }, {
    key: "event_state",
    label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    sortable: true,
    render: (value) => getStatusBadge(value)
  }, {
    key: "products_sold",
    label: i18n._(
      /*i18n*/
      {
        id: "/u4DIx"
      }
    ),
    sortable: true
  }, {
    key: "gross_revenue",
    label: i18n._(
      /*i18n*/
      {
        id: "n8IUs7"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.event_currency)
  }, {
    key: "total_refunded",
    label: i18n._(
      /*i18n*/
      {
        id: "bU4bS1"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.event_currency)
  }, {
    key: "net_revenue",
    label: i18n._(
      /*i18n*/
      {
        id: "xxU3NX"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.event_currency)
  }, {
    key: "total_tax",
    label: i18n._(
      /*i18n*/
      {
        id: "/SgoNA"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.event_currency)
  }, {
    key: "total_fee",
    label: i18n._(
      /*i18n*/
      {
        id: "BxsfMK"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.event_currency)
  }, {
    key: "total_orders",
    label: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ),
    sortable: true
  }, {
    key: "unique_customers",
    label: i18n._(
      /*i18n*/
      {
        id: "NihQNk"
      }
    ),
    sortable: true
  }, {
    key: "page_views",
    label: i18n._(
      /*i18n*/
      {
        id: "sF+Xp9"
      }
    ),
    sortable: true
  }];
  return /* @__PURE__ */ jsx(OrganizerReportTable, { title: i18n._(
    /*i18n*/
    {
      id: "19j6uh"
    }
  ), columns, isLoading: organizerQuery.isLoading, downloadFileName: "events_performance_report.csv", showDateFilter: false, organizer, showCurrencyFilter: true, availableCurrencies: allCurrencies });
};
const TaxSummaryReport = () => {
  var _a;
  const {
    organizerId
  } = useParams();
  const organizerQuery = useGetOrganizer(organizerId);
  const organizer = organizerQuery.data;
  const statsQuery = useGetOrganizerStats(organizerId, organizer == null ? void 0 : organizer.currency);
  const allCurrencies = ((_a = statsQuery.data) == null ? void 0 : _a.all_organizers_currencies) || [];
  if (!organizer) {
    return null;
  }
  const columns = [{
    key: "event_name",
    label: i18n._(
      /*i18n*/
      {
        id: "0pC/y6"
      }
    ),
    sortable: true,
    render: (value, row) => /* @__PURE__ */ jsx(Link, { to: `/manage/event/${row.event_id}/dashboard`, style: {
      textDecoration: "none",
      color: "inherit"
    }, children: value })
  }, {
    key: "event_currency",
    label: i18n._(
      /*i18n*/
      {
        id: "Q2lUR2"
      }
    ),
    sortable: true
  }, {
    key: "tax_name",
    label: i18n._(
      /*i18n*/
      {
        id: "Ye321X"
      }
    ),
    sortable: true
  }, {
    key: "tax_rate",
    label: i18n._(
      /*i18n*/
      {
        id: "fqDzSu"
      }
    ),
    sortable: true,
    render: (value) => `${value}%`
  }, {
    key: "total_collected",
    label: i18n._(
      /*i18n*/
      {
        id: "orBECM"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.event_currency)
  }, {
    key: "order_count",
    label: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ),
    sortable: true
  }];
  return /* @__PURE__ */ jsx(OrganizerReportTable, { title: i18n._(
    /*i18n*/
    {
      id: "WyCBRt"
    }
  ), columns, isLoading: organizerQuery.isLoading, downloadFileName: "tax_summary_report.csv", showDateFilter: true, organizer, showCurrencyFilter: true, availableCurrencies: allCurrencies });
};
const CheckInSummaryReport = () => {
  const {
    organizerId
  } = useParams();
  const organizerQuery = useGetOrganizer(organizerId);
  const organizer = organizerQuery.data;
  if (!organizer) {
    return null;
  }
  const columns = [{
    key: "event_name",
    label: i18n._(
      /*i18n*/
      {
        id: "0pC/y6"
      }
    ),
    sortable: true,
    render: (value, row) => /* @__PURE__ */ jsx(Link, { to: `/manage/event/${row.event_id}/dashboard`, style: {
      textDecoration: "none",
      color: "inherit"
    }, children: value })
  }, {
    key: "start_date",
    label: i18n._(
      /*i18n*/
      {
        id: "/dgc8E"
      }
    ),
    sortable: true,
    render: (value) => value ? formatDateWithLocale(value, "shortDate", (organizer == null ? void 0 : organizer.timezone) || "UTC") : "-"
  }, {
    key: "total_attendees",
    label: i18n._(
      /*i18n*/
      {
        id: "SMDzqJ"
      }
    ),
    sortable: true
  }, {
    key: "total_checked_in",
    label: i18n._(
      /*i18n*/
      {
        id: "CRu4lK"
      }
    ),
    sortable: true
  }, {
    key: "check_in_rate",
    label: i18n._(
      /*i18n*/
      {
        id: "SHJwyq"
      }
    ),
    sortable: true,
    render: (value) => `${value}%`
  }, {
    key: "check_in_lists_count",
    label: i18n._(
      /*i18n*/
      {
        id: "f2vU9t"
      }
    ),
    sortable: true
  }];
  return /* @__PURE__ */ jsx(OrganizerReportTable, { title: i18n._(
    /*i18n*/
    {
      id: "cKj6OE"
    }
  ), columns, isLoading: organizerQuery.isLoading, downloadFileName: "check_in_summary_report.csv", showDateFilter: false, organizer, showCurrencyFilter: false });
};
const GET_ORGANIZER_EVENTS_QUERY = "getOrganizerEvents";
const useGetOrganizerEvents = (organizerId, pagination) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_EVENTS_QUERY, organizerId, pagination],
    queryFn: async () => {
      return await organizerClient.findEventsByOrganizerId(organizerId, pagination);
    }
  });
};
const eventFilter = "_eventFilter_15ndi_1";
const classes = {
  eventFilter
};
const PlatformFeesReport = () => {
  var _a, _b;
  const {
    organizerId
  } = useParams();
  const organizerQuery = useGetOrganizer(organizerId);
  const organizer = organizerQuery.data;
  const [selectedEventId, setSelectedEventId] = useState(null);
  const statsQuery = useGetOrganizerStats(organizerId, organizer == null ? void 0 : organizer.currency);
  const allCurrencies = ((_a = statsQuery.data) == null ? void 0 : _a.all_organizers_currencies) || [];
  const eventsQuery = useGetOrganizerEvents(organizerId, {
    pageNumber: 1,
    perPage: 100
  });
  const events = ((_b = eventsQuery.data) == null ? void 0 : _b.data) || [];
  if (!organizer) {
    return null;
  }
  const eventOptions = [{
    value: "",
    label: i18n._(
      /*i18n*/
      {
        id: "QsYjci"
      }
    )
  }, ...events.map((event) => ({
    value: String(event.id),
    label: event.title || ""
  }))];
  const columns = [{
    key: "event_name",
    label: i18n._(
      /*i18n*/
      {
        id: "0pC/y6"
      }
    ),
    sortable: true,
    render: (value, row) => /* @__PURE__ */ jsx(Link, { to: `/manage/event/${row.event_id}/dashboard`, style: {
      textDecoration: "none",
      color: "inherit"
    }, children: value })
  }, {
    key: "payment_date",
    label: i18n._(
      /*i18n*/
      {
        id: "5cxUwd"
      }
    ),
    sortable: true,
    render: (value) => value ? new Date(value).toLocaleDateString() : "-"
  }, {
    key: "order_reference",
    label: i18n._(
      /*i18n*/
      {
        id: "UkHo4c"
      }
    ),
    sortable: false,
    render: (value, row) => /* @__PURE__ */ jsx(Link, { to: `/manage/event/${row.event_id}/orders/${row.order_id}`, style: {
      textDecoration: "none",
      color: "inherit"
    }, children: value })
  }, {
    key: "amount_paid",
    label: i18n._(
      /*i18n*/
      {
        id: "Wvrz79"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.currency)
  }, {
    key: "fee_amount",
    label: i18n._(
      /*i18n*/
      {
        id: "/iE8xx"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.currency)
  }, {
    key: "vat_rate",
    label: i18n._(
      /*i18n*/
      {
        id: "ZutOKU"
      }
    ),
    sortable: false,
    render: (value) => value ? `${(value * 100).toFixed(0)}%` : "-"
  }, {
    key: "vat_amount",
    label: i18n._(
      /*i18n*/
      {
        id: "8dENF9"
      }
    ),
    sortable: true,
    render: (value, row) => value ? formatCurrency(value, row.currency) : "-"
  }, {
    key: "total_fee",
    label: i18n._(
      /*i18n*/
      {
        id: "4B7oCp"
      }
    ),
    sortable: true,
    render: (value, row) => formatCurrency(value, row.currency)
  }, {
    key: "currency",
    label: i18n._(
      /*i18n*/
      {
        id: "Q2lUR2"
      }
    ),
    sortable: false
  }, {
    key: "payment_intent_id",
    label: i18n._(
      /*i18n*/
      {
        id: "9i0++A"
      }
    ),
    sortable: false,
    render: (value) => value || "-"
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Callout, { variant: "tip", title: i18n._(
      /*i18n*/
      {
        id: "0I0Hac"
      }
    ), style: {
      marginBottom: 24
    }, children: i18n._(
      /*i18n*/
      {
        id: "W12OdJ"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: classes.eventFilter, children: /* @__PURE__ */ jsx(Select, { label: i18n._(
      /*i18n*/
      {
        id: "mvrlBO"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "a6+167"
      }
    ), data: eventOptions, value: selectedEventId, onChange: setSelectedEventId, clearable: true, searchable: true }) }),
    /* @__PURE__ */ jsx(OrganizerReportTable, { title: i18n._(
      /*i18n*/
      {
        id: "3buiaw"
      }
    ), columns, isLoading: organizerQuery.isLoading, showDateFilter: true, organizer, showCurrencyFilter: true, availableCurrencies: allCurrencies, eventId: selectedEventId ? parseInt(selectedEventId) : null })
  ] });
};
const renderReport = (reportType) => {
  switch (reportType) {
    case OrganizerReportTypes.RevenueSummary:
      return /* @__PURE__ */ jsx(RevenueSummaryReport, {});
    case OrganizerReportTypes.EventsPerformance:
      return /* @__PURE__ */ jsx(EventsPerformanceReport, {});
    case OrganizerReportTypes.TaxSummary:
      return /* @__PURE__ */ jsx(TaxSummaryReport, {});
    case OrganizerReportTypes.CheckInSummary:
      return /* @__PURE__ */ jsx(CheckInSummaryReport, {});
    case OrganizerReportTypes.PlatformFees:
      return /* @__PURE__ */ jsx(PlatformFeesReport, {});
    default:
      return /* @__PURE__ */ jsx("div", { children: i18n._(
        /*i18n*/
        {
          id: "CQeZT8"
        }
      ) });
  }
};
const OrganizerReportLayout = () => {
  const {
    organizerId,
    reportType
  } = useParams();
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(Button, { mb: 20, leftSection: /* @__PURE__ */ jsx(IconChevronLeft, {}), variant: "transparent", component: Link, to: `/manage/organizer/${organizerId}/reports`, pl: 0, children: i18n._(
      /*i18n*/
      {
        id: "td/bh+"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: renderReport(reportType) })
  ] });
};
export {
  OrganizerReportLayout as default
};

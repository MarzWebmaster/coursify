import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useParams, Link } from "react-router";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { Button, Group, Skeleton, Select, Table as Table$1, Badge } from "@mantine/core";
import { IconDownload, IconCalendar, IconArrowsSort, IconArrowUp, IconArrowDown, IconChevronLeft } from "@tabler/icons-react";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { i18n } from "@lingui/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useMemo } from "react";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { T as Table, a as TableHead } from "./index-XJu-jVVm.js";
import { h as eventsClient } from "../entry.server.js";
import { useQuery } from "@tanstack/react-query";
import { E as EventType, R as ReportTypes } from "./types-CqPWB-a5.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { O as OccurrenceSelect } from "./index-DWXPH3HO.js";
import { u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
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
import "./occurrenceSelectUtils-sehyBEho.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/advancedFormat.js";
const DownloadCsvButton = ({
  headers,
  data,
  filename = "download.csv",
  ...buttonProps
}) => {
  const handleDownloadCSV = () => {
    const csvData = data.map((row) => row.map((cell) => typeof cell === "string" ? `"${cell}"` : cell).join(","));
    const csvContent = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconDownload, { size: 16 }), onClick: handleDownloadCSV, variant: "light", ...buttonProps, children: i18n._(
    /*i18n*/
    {
      id: "kodV18"
    }
  ) });
};
const GET_EVENT_REPORT_QUERY_KEY = "getEventReport";
const useGetEventReport = (eventId, reportType, startDate, endDate, occurrenceId) => {
  return useQuery({
    queryKey: [GET_EVENT_REPORT_QUERY_KEY, eventId, reportType, startDate == null ? void 0 : startDate.toISOString(), endDate == null ? void 0 : endDate.toISOString(), occurrenceId],
    queryFn: async () => {
      const startDateString = startDate == null ? void 0 : startDate.toISOString();
      const endDateString = endDate == null ? void 0 : endDate.toISOString();
      return await eventsClient.getEventReport(eventId, reportType, startDateString, endDateString, occurrenceId);
    },
    enabled: !!eventId && !!reportType && !!startDate && !!endDate || !startDate && !endDate
  });
};
const periodSelect = "_periodSelect_wt2c2_2";
const datePicker = "_datePicker_wt2c2_3";
const downloadButton = "_downloadButton_wt2c2_4";
const classes = {
  periodSelect,
  datePicker,
  downloadButton
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
const ReportTable = ({
  title,
  columns,
  showDateFilter = true,
  showOccurrenceFilter = true,
  defaultStartDate = new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() - 3)),
  defaultEndDate = /* @__PURE__ */ new Date(),
  onDateRangeChange,
  enableDownload = true,
  downloadFileName = "report.csv",
  showCustomDatePicker = false,
  event
}) => {
  var _a;
  const [dateRange, setDateRange] = useState(() => [dayjs(defaultStartDate).tz(event.timezone).startOf("day").toDate(), dayjs(defaultEndDate).tz(event.timezone).endOf("day").toDate()]);
  const [selectedPeriod, setSelectedPeriod] = useState("90d");
  const [showDatePickerInput, setShowDatePickerInput] = useState(showCustomDatePicker);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState(void 0);
  const {
    reportType,
    eventId
  } = useParams();
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const occurrencesQuery = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 500
  }, isRecurring && showOccurrenceFilter, {
    includeStats: false
  });
  const occurrences = ((_a = occurrencesQuery == null ? void 0 : occurrencesQuery.data) == null ? void 0 : _a.data) || [];
  const reportQuery = useGetEventReport(eventId, reportType, dateRange[0], dateRange[1], selectedOccurrenceId);
  const data = reportQuery.data || [];
  const calculateDateRange = (period) => {
    if (period === "custom") {
      setShowDatePickerInput(true);
      return dateRange;
    }
    setShowDatePickerInput(false);
    let end = dayjs().tz(event.timezone).endOf("day");
    let start = dayjs().tz(event.timezone);
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
    onDateRangeChange == null ? void 0 : onDateRangeChange(newRange);
  };
  const handleDateRangeChange = (newRange) => {
    const [start, end] = newRange;
    const tzStart = start ? dayjs(start).tz(event.timezone) : null;
    const tzEnd = end ? dayjs(end).tz(event.timezone) : null;
    const tzRange = [(tzStart == null ? void 0 : tzStart.toDate()) || null, (tzEnd == null ? void 0 : tzEnd.toDate()) || null];
    setDateRange(tzRange);
    onDateRangeChange == null ? void 0 : onDateRangeChange(tzRange);
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
  const csvHeaders = columns.map((col) => col.label);
  const csvData = sortedData.map((row) => columns.map((col) => {
    const value = row[col.key];
    return typeof value === "number" ? value.toString() : value;
  }));
  const loadingMessage = () => {
    const wrapper = (message) => /* @__PURE__ */ jsx(Table$1.Tr, { children: /* @__PURE__ */ jsx(Table$1.Td, { colSpan: columns.length, align: "center", children: message }) });
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
          id: "6Z/F61"
        }
      ));
    }
    if (!showDateFilter && dateRange[0] && dateRange[1]) {
      return wrapper(i18n._(
        /*i18n*/
        {
          id: "tMFDem"
        }
      ));
    }
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
  if (reportQuery.isFetched && !reportQuery.isLoading && !data.length) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "jtrY3S"
      }
    ), imageHref: "/blank-slate/reports.svg", subHeading: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: i18n._(
      /*i18n*/
      {
        id: "ZxnK5C"
      }
    ) }) }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Group, { justify: "space-between", mb: "md", children: [
      /* @__PURE__ */ jsx(PageTitle, { children: title }),
      /* @__PURE__ */ jsxs(Group, { justify: "flex-end", align: "center", gap: "sm", children: [
        isRecurring && showOccurrenceFilter && occurrences.length > 0 && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsx(OccurrenceSelect, { occurrences, timezone: event.timezone, value: selectedOccurrenceId ? String(selectedOccurrenceId) : null, onChange: (value) => setSelectedOccurrenceId(value ? Number(value) : void 0), placeholder: i18n._(
          /*i18n*/
          {
            id: "OpWjMq"
          }
        ), clearable: true }),
        showDateFilter && /* @__PURE__ */ jsx(Select, { style: {
          minWidth: "200px"
        }, placeholder: i18n._(
          /*i18n*/
          {
            id: "DrwwNd"
          }
        ), data: TIME_PERIODS, value: selectedPeriod, onChange: handlePeriodChange, leftSection: /* @__PURE__ */ jsx(IconCalendar, { stroke: 1.5, size: 20 }), mb: "0", className: classes.periodSelect }),
        showDateFilter && showDatePickerInput && /* @__PURE__ */ jsx(DatePickerInput, { style: {
          minWidth: "305px",
          marginBottom: "0"
        }, leftSection: /* @__PURE__ */ jsx(IconCalendar, { stroke: 1.5, size: 20 }), type: "range", placeholder: "Pick dates range", value: dateRange, onChange: handleDateRangeChange, minDate: dayjs().subtract(1, "year").tz(event.timezone).toDate(), maxDate: dayjs().tz(event.timezone).toDate(), className: classes.datePicker }),
        enableDownload && /* @__PURE__ */ jsx(DownloadCsvButton, { headers: csvHeaders, data: csvData, filename: downloadFileName, className: classes.downloadButton })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(Table$1.Tr, { children: columns.map((column) => /* @__PURE__ */ jsx(Table$1.Th, { onClick: column.sortable ? () => handleSort(column.key) : void 0, style: {
        cursor: column.sortable ? "pointer" : "default",
        minWidth: "180px"
      }, children: /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
        i18n._(
          /*i18n*/
          {
            id: "J/hVSQ",
            values: {
              0: column.label
            }
          }
        ),
        column.sortable && getSortIcon(column.key)
      ] }) }, String(column.key))) }) }),
      /* @__PURE__ */ jsxs(Table$1.Tbody, { children: [
        !sortedData.length && loadingMessage(),
        sortedData.map((row, index) => /* @__PURE__ */ jsx(Table$1.Tr, { children: columns.map((column) => /* @__PURE__ */ jsx(Table$1.Td, { children: column.render ? column.render(row[column.key], row) : row[column.key] }, String(column.key))) }, index))
      ] })
    ] })
  ] });
};
const ProductSalesReport = () => {
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const event = eventQuery.data;
  if (!event) {
    return null;
  }
  const columns = [{
    key: "product_title",
    label: "Product Title",
    sortable: true
  }, {
    key: "number_sold",
    label: "Units Sold",
    sortable: true
  }, {
    key: "total_gross",
    label: "Gross Sales",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "total_tax",
    label: "Tax",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "total_service_fees",
    label: "Service Fees",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }];
  return /* @__PURE__ */ jsx(ReportTable, { title: "Product Sales Report", columns, isLoading: eventQuery.isLoading, downloadFileName: "product_sales_report.csv", event });
};
const DailySalesReport = () => {
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const event = eventQuery.data;
  if (!event) {
    return null;
  }
  const columns = [{
    key: "date",
    label: "Date",
    sortable: true,
    render: (value) => formatDateWithLocale(value, "shortDate", event == null ? void 0 : event.timezone)
  }, {
    key: "sales_total_gross",
    label: "Sales Total Gross",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "total_tax",
    label: "Total Tax",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "sales_total_before_additions",
    label: "Net Sales",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "products_sold",
    label: "Products Sold",
    sortable: true
  }, {
    key: "orders_created",
    label: "Completed Orders",
    sortable: true
  }, {
    key: "total_fee",
    label: "Total Fee",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "total_refunded",
    label: "Total Refunded",
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "total_views",
    label: "Total Views",
    sortable: true
  }];
  return /* @__PURE__ */ jsx(ReportTable, { title: "Daily Sales Report", columns, isLoading: eventQuery.isLoading, downloadFileName: "daily_sales_report.csv", showDateFilter: true, event });
};
const PromoCodesReport = () => {
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const event = eventQuery.data;
  if (!event) {
    return null;
  }
  const columns = [{
    key: "promo_code",
    label: i18n._(
      /*i18n*/
      {
        id: "P5sgAk"
      }
    ),
    sortable: true
  }, {
    key: "times_used",
    label: i18n._(
      /*i18n*/
      {
        id: "y55eMd"
      }
    ),
    sortable: true
  }, {
    key: "unique_customers",
    label: i18n._(
      /*i18n*/
      {
        id: "nnfSdK"
      }
    ),
    sortable: true
  }, {
    key: "configured_discount",
    label: i18n._(
      /*i18n*/
      {
        id: "Tf55h7"
      }
    ),
    sortable: true,
    render: (value, row) => {
      if (row.discount_type === "percentage") {
        return `${value}%`;
      }
      return formatCurrency(value, event == null ? void 0 : event.currency);
    }
  }, {
    key: "total_gross_sales",
    label: i18n._(
      /*i18n*/
      {
        id: "2bR+8v"
      }
    ),
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "total_before_discounts",
    label: i18n._(
      /*i18n*/
      {
        id: "YXx+fG"
      }
    ),
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "total_discount_amount",
    label: i18n._(
      /*i18n*/
      {
        id: "NRWNfv"
      }
    ),
    sortable: true,
    render: (value) => formatCurrency(value, event == null ? void 0 : event.currency)
  }, {
    key: "first_used_at",
    label: i18n._(
      /*i18n*/
      {
        id: "Rs/IcB"
      }
    ),
    sortable: true,
    render: (value) => value ? formatDateWithLocale(value, "shortDate", event.timezone) : "-"
  }, {
    key: "last_used_at",
    label: i18n._(
      /*i18n*/
      {
        id: "tKCBU0"
      }
    ),
    sortable: true,
    render: (value) => value ? formatDateWithLocale(value, "shortDate", event.timezone) : "-"
  }, {
    key: "max_allowed_usages",
    label: i18n._(
      /*i18n*/
      {
        id: "fiV0xj"
      }
    ),
    sortable: true,
    render: (value) => value || i18n._(
      /*i18n*/
      {
        id: "NIuIk1"
      }
    )
  }, {
    key: "remaining_uses",
    label: i18n._(
      /*i18n*/
      {
        id: "9+8Vez"
      }
    ),
    sortable: true,
    render: (value) => value || i18n._(
      /*i18n*/
      {
        id: "NIuIk1"
      }
    )
  }, {
    key: "status",
    label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    sortable: true
  }];
  return /* @__PURE__ */ jsx(ReportTable, { title: i18n._(
    /*i18n*/
    {
      id: "OP094m"
    }
  ), columns, isLoading: eventQuery.isLoading, downloadFileName: "promo_codes_report.csv", event });
};
const statusColor = (status) => {
  switch (status) {
    case "ACTIVE":
      return "green";
    case "CANCELLED":
      return "red";
    case "SOLD_OUT":
      return "orange";
    default:
      return "gray";
  }
};
const statusLabel = (status) => {
  switch (status) {
    case "ACTIVE":
      return i18n._(
        /*i18n*/
        {
          id: "F6pfE9"
        }
      );
    case "CANCELLED":
      return i18n._(
        /*i18n*/
        {
          id: "vv7kpg"
        }
      );
    case "SOLD_OUT":
      return i18n._(
        /*i18n*/
        {
          id: "Mi1rVn"
        }
      );
    default:
      return status;
  }
};
const OccurrenceSummaryReport = () => {
  const {
    eventId
  } = useParams();
  const eventQuery = useGetEvent(eventId);
  const event = eventQuery.data;
  if (!event) {
    return null;
  }
  const columns = [{
    key: "start_date",
    label: i18n._(
      /*i18n*/
      {
        id: "mYGY3B"
      }
    ),
    sortable: true,
    render: (value) => formatDateWithLocale(value, "fullDateTime", event.timezone)
  }, {
    key: "label",
    label: i18n._(
      /*i18n*/
      {
        id: "87a/t/"
      }
    ),
    sortable: true,
    render: (value) => value || "—"
  }, {
    key: "status",
    label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    sortable: true,
    render: (value) => /* @__PURE__ */ jsx(Badge, { variant: "light", color: statusColor(value), size: "sm", children: statusLabel(value) })
  }, {
    key: "attendees_registered",
    label: i18n._(
      /*i18n*/
      {
        id: "9SZT4E"
      }
    ),
    sortable: true
  }, {
    key: "used_capacity",
    label: i18n._(
      /*i18n*/
      {
        id: "4cp9NP"
      }
    ),
    sortable: true,
    render: (value, row) => row.capacity ? `${value}/${row.capacity}` : String(value)
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
    key: "orders_created",
    label: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ),
    sortable: true
  }, {
    key: "total_gross",
    label: i18n._(
      /*i18n*/
      {
        id: "yRg26W"
      }
    ),
    sortable: true,
    render: (value) => formatCurrency(value, event.currency)
  }, {
    key: "total_tax",
    label: i18n._(
      /*i18n*/
      {
        id: "JpohL9"
      }
    ),
    sortable: true,
    render: (value) => formatCurrency(value, event.currency)
  }, {
    key: "checked_in",
    label: i18n._(
      /*i18n*/
      {
        id: "CRu4lK"
      }
    ),
    sortable: true
  }];
  return /* @__PURE__ */ jsx(ReportTable, { title: i18n._(
    /*i18n*/
    {
      id: "Kh3WO8"
    }
  ), columns, isLoading: eventQuery.isLoading, downloadFileName: "occurrence_summary_report.csv", event, showDateFilter: false, showOccurrenceFilter: false });
};
const renderReport = (reportType) => {
  switch (reportType) {
    case ReportTypes.ProductSales:
      return /* @__PURE__ */ jsx(ProductSalesReport, {});
    case ReportTypes.DailySales:
      return /* @__PURE__ */ jsx(DailySalesReport, {});
    case ReportTypes.PromoCodes:
      return /* @__PURE__ */ jsx(PromoCodesReport, {});
    case ReportTypes.OccurrenceSummary:
      return /* @__PURE__ */ jsx(OccurrenceSummaryReport, {});
    default:
      return /* @__PURE__ */ jsx("div", { children: "Report not found" });
  }
};
const ReportLayout = () => {
  const {
    eventId,
    reportType
  } = useParams();
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(Button, { mb: 20, leftSection: /* @__PURE__ */ jsx(IconChevronLeft, {}), variant: "transparent", component: Link, to: `/manage/event/${eventId}/reports`, pl: 0, children: "Back to Reports" }),
    /* @__PURE__ */ jsx("div", { children: renderReport(reportType) })
  ] });
};
export {
  ReportLayout as default
};

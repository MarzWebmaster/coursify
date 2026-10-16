import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState } from "react";
import { useParams } from "react-router";
import { Button, Group } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { u as useGetEventOrders } from "./index-DTsqBh8c.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { O as OrdersTable } from "./index-BAJxP518.js";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { E as EventType, Q as QueryFilterOperator } from "./types-CqPWB-a5.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { o as orderClient } from "./order.client-BmBVeAyF.js";
import { d as downloadBinary } from "./download-DP3M_6Yt.js";
import { F as FilterModal } from "./index-BDgeCAfq.js";
import { w as withLoadingNotification } from "./withLoadingNotification-6oRbhBHA.js";
import { u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { O as OccurrenceSelect } from "./index-DWXPH3HO.js";
import "@tanstack/react-query";
import "../entry.server.js";
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
import "@mantine/dates";
import "@mantine/colors-generator";
import "./index-7RPUkRz0.js";
import "./index-AhXgh6Nz.js";
import "./index-CwjvB_vn.js";
import "@mantine/form";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./notifications-Coh3Ef-t.js";
import "./index-D4cOjjnu.js";
import "./index-gUnclHYL.js";
import "./useGetAccount-CGfwRfDK.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./index-IzdRcWBR.js";
import "./currency-Br7a8J7F.js";
import "./index-wMxbqESV.js";
import "./countries-C8-MXWCy.js";
import "./index-CwAoF9NO.js";
import "./addressUtilities-7xIQim0X.js";
import "@mantine/hooks";
import "./index-jHMtuNEo.js";
import "./useGetEventCounts-BudQN_tQ.js";
import "./urlHelper-CsaWRwIV.js";
import "./index-R0GQzPHn.js";
import "./index-CoMrHZbF.js";
import "./index-DAgXC5_F.js";
import "./useUrlHash-BZci-yZ8.js";
import "./index-D0pbWAZK.js";
import "@tanstack/react-table";
import "./index-DuG5BVAJ.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./occurrenceSelectUtils-sehyBEho.js";
const orderStatuses = [{
  label: i18n._(
    /*i18n*/
    {
      id: "qqWcBV"
    }
  ),
  value: "COMPLETED"
}, {
  label: i18n._(
    /*i18n*/
    {
      id: "vv7kpg"
    }
  ),
  value: "CANCELLED"
}, {
  label: i18n._(
    /*i18n*/
    {
      id: "2rHwhl"
    }
  ),
  value: "AWAITING_OFFLINE_PAYMENT"
}];
const refundStatuses = [{
  label: i18n._(
    /*i18n*/
    {
      id: "/BI0y9"
    }
  ),
  value: "REFUNDED"
}, {
  label: i18n._(
    /*i18n*/
    {
      id: "ZfxaB4"
    }
  ),
  value: "PARTIALLY_REFUNDED"
}];
const Orders = () => {
  var _a, _b, _c, _d, _e;
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const ordersQuery = useGetEventOrders(eventId, searchParams);
  const {
    data: occurrencesData
  } = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 100
  }, isRecurring);
  const orders = (_a = ordersQuery == null ? void 0 : ordersQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = ordersQuery == null ? void 0 : ordersQuery.data) == null ? void 0 : _b.meta;
  const [downloadPending, setDownloadPending] = useState(false);
  const occurrences = (occurrencesData == null ? void 0 : occurrencesData.data) || [];
  const occurrenceFilter = (_c = searchParams.filterFields) == null ? void 0 : _c.event_occurrence_id;
  const selectedOccurrenceId = occurrenceFilter && !Array.isArray(occurrenceFilter) ? String(occurrenceFilter.value) : null;
  const filterOptions = [{
    field: "status",
    label: i18n._(
      /*i18n*/
      {
        id: "acIJ41"
      }
    ),
    type: "multi-select",
    options: orderStatuses
  }, {
    field: "refund_status",
    label: i18n._(
      /*i18n*/
      {
        id: "xHpVRl"
      }
    ),
    type: "multi-select",
    options: refundStatuses
  }];
  const handleOccurrenceChange = (value) => {
    const filterFields = {
      ...searchParams.filterFields || {}
    };
    if (value) {
      filterFields.event_occurrence_id = {
        operator: QueryFilterOperator.Equals,
        value
      };
    } else {
      delete filterFields.event_occurrence_id;
    }
    setSearchParams({
      ...searchParams,
      filterFields,
      pageNumber: 1
    }, true);
  };
  const handleFilterChange = (values) => {
    var _a2, _b2;
    const filterFields = {};
    if (selectedOccurrenceId) {
      filterFields.event_occurrence_id = {
        operator: QueryFilterOperator.Equals,
        value: selectedOccurrenceId
      };
    }
    if (((_a2 = values.status) == null ? void 0 : _a2.length) > 0) {
      filterFields.status = {
        operator: QueryFilterOperator.In,
        value: values.status
      };
    }
    if (((_b2 = values.refund_status) == null ? void 0 : _b2.length) > 0) {
      filterFields.refund_status = {
        operator: QueryFilterOperator.In,
        value: values.refund_status
      };
    }
    setSearchParams({
      ...searchParams,
      filterFields,
      pageNumber: 1
    }, true);
  };
  const handleResetFilters = () => {
    const filterFields = {};
    if (selectedOccurrenceId) {
      filterFields.event_occurrence_id = {
        operator: QueryFilterOperator.Equals,
        value: selectedOccurrenceId
      };
    }
    setSearchParams({
      ...searchParams,
      filterFields,
      pageNumber: 1
    }, true);
  };
  const handleExport = async (eventId2) => {
    const occurrenceId = selectedOccurrenceId ? Number(selectedOccurrenceId) : null;
    await withLoadingNotification(async () => {
      setDownloadPending(true);
      const blob = await orderClient.exportOrders(eventId2, occurrenceId);
      downloadBinary(blob, "orders.xlsx");
    }, {
      loading: {
        title: i18n._(
          /*i18n*/
          {
            id: "UlAK8E"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "+5Mlle"
          }
        )
      },
      success: {
        title: i18n._(
          /*i18n*/
          {
            id: "5It1cQ"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "XeNum6"
          }
        ),
        onRun: () => setDownloadPending(false)
      },
      error: {
        title: i18n._(
          /*i18n*/
          {
            id: "ZPwFnN"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "fuwKpE"
          }
        ),
        onRun: () => setDownloadPending(false)
      }
    });
  };
  const getFilterValue = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (Array.isArray(field.value)) return field.value;
    return field.value ? [field.value] : [];
  };
  const currentFilters = {
    status: getFilterValue((_d = searchParams.filterFields) == null ? void 0 : _d.status),
    refund_status: getFilterValue((_e = searchParams.filterFields) == null ? void 0 : _e.refund_status)
  };
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "KeCXJu"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ) }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "3zRbWw"
      }
    ), setSearchParams, searchParams }), filterComponent: /* @__PURE__ */ jsxs(Group, { gap: "sm", wrap: "wrap", children: [
      (pagination == null ? void 0 : pagination.allowed_sorts) && /* @__PURE__ */ jsx(SortSelector, { selected: searchParams.sortBy && searchParams.sortDirection ? searchParams.sortBy + ":" + searchParams.sortDirection : pagination.default_sort + ":" + pagination.default_sort_direction, options: pagination.allowed_sorts, onSortSelect: (key, sortDirection) => {
        setSearchParams({
          sortBy: key,
          sortDirection
        });
      } }),
      isRecurring && occurrences.length > 0 && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsx(OccurrenceSelect, { occurrences, timezone: event.timezone, value: selectedOccurrenceId, onChange: handleOccurrenceChange, placeholder: i18n._(
        /*i18n*/
        {
          id: "e4q4uO"
        }
      ), clearable: true, size: "sm" }),
      /* @__PURE__ */ jsx(FilterModal, { filters: filterOptions, activeFilters: currentFilters, onChange: handleFilterChange, onReset: handleResetFilters, title: i18n._(
        /*i18n*/
        {
          id: "LyFC7X"
        }
      ) })
    ] }), resultCount: pagination == null ? void 0 : pagination.total, resultLabel: i18n._(
      /*i18n*/
      {
        id: "V5khLm"
      }
    ), children: /* @__PURE__ */ jsx(Button, { onClick: () => handleExport(eventId), rightSection: /* @__PURE__ */ jsx(IconDownload, { size: 14 }), color: "green", loading: downloadPending, size: "sm", children: i18n._(
      /*i18n*/
      {
        id: "GS+Mus"
      }
    ) }) }),
    /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !orders || ordersQuery.isFetching }),
    orders && event && /* @__PURE__ */ jsx(OrdersTable, { event, orders }),
    !!(orders == null ? void 0 : orders.length) && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) })
  ] });
};
export {
  Orders,
  Orders as default
};

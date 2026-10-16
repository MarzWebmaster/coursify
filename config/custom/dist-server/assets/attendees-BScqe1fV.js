import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useNavigate } from "react-router";
import { G as GET_ATTENDEES_QUERY_KEY, u as useGetPriceOverrides, a as useGetAttendees, A as AttendeeTable } from "./useGetPriceOverrides-DcysoAcA.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { LoadingOverlay, Stack, Text, TextInput, Select, Switch, NumberInput, Button as Button$1, Group } from "@mantine/core";
import { IconPlus, IconDownload } from "@tabler/icons-react";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { E as EventType, d as EventOccurrenceStatus, f as ProductType, Q as QueryFilterOperator } from "./types-CqPWB-a5.js";
import { useDisclosure } from "@mantine/hooks";
import { Trans } from "@lingui/react";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { B as Button } from "./index-hLKQavXc.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useForm } from "@mantine/form";
import { C as Callout } from "./index-CwjvB_vn.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { a as attendeesClient } from "./attendee.client-CeeZ2TBj.js";
import { G as GET_EVENT_ORDERS_QUERY_KEY } from "./index-DTsqBh8c.js";
import { G as GET_EVENT_COUNTS_QUERY_KEY } from "./useGetEventCounts-BudQN_tQ.js";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useMemo, useEffect, useState } from "react";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { E as getProductsFromEvent, g as getClientLocale, l as localeToNameMap, c as localeToFlagEmojiMap, F as getLocaleName } from "../entry.server.js";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import { u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { p as prettyDate } from "./dates-CbVpwZeX.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { d as downloadBinary } from "./download-DP3M_6Yt.js";
import { w as withLoadingNotification } from "./withLoadingNotification-6oRbhBHA.js";
import { F as FilterModal } from "./index-BDgeCAfq.js";
import { O as OccurrenceSelect } from "./index-DWXPH3HO.js";
import "./index-DAgXC5_F.js";
import "./useGetCheckInLists-DZb0QIwp.js";
import "./index-DC4VxyXX.js";
import "./index-7RPUkRz0.js";
import "./order.client-BmBVeAyF.js";
import "./index-D4cOjjnu.js";
import "classnames";
import "./useGetAccount-CGfwRfDK.js";
import "dayjs";
import "@mantine/notifications";
import "./confirmationDialog-I-HMojnx.js";
import "@mantine/modals";
import "./index-BXVupOij.js";
import "./products-BLTGbPdF.js";
import "./currency-Br7a8J7F.js";
import "react-qr-code";
import "./urlHelper-CsaWRwIV.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./index-BfWJHinS.js";
import "./index-R0GQzPHn.js";
import "./index-CoMrHZbF.js";
import "./index-ChciN8SC.js";
import "./index-CYsdl7UG.js";
import "./index-D0pbWAZK.js";
import "@tanstack/react-table";
import "./index-jHMtuNEo.js";
import "./index-DuG5BVAJ.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./index-IzdRcWBR.js";
import "./index-wMxbqESV.js";
import "./countries-C8-MXWCy.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/dates";
import "@mantine/colors-generator";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./occurrenceSelectUtils-sehyBEho.js";
const useCreateAttendee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      attendeeData
    }) => attendeesClient.create(eventId, attendeeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_ORDERS_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_ATTENDEES_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_COUNTS_QUERY_KEY]
      });
    }
  });
};
const CreateAttendeeModal = ({
  onClose
}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: event,
    isFetched: isEventFetched
  } = useGetEvent(eventId);
  const mutation = useCreateAttendee();
  const navigate = useNavigate();
  const eventProducts = getProductsFromEvent(event);
  const eventHasProducts = eventProducts && (eventProducts == null ? void 0 : eventProducts.length) > 0;
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const {
    data: occurrencesData
  } = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 1200
  });
  const occurrenceOptions = useMemo(() => {
    if (!isRecurring || !(occurrencesData == null ? void 0 : occurrencesData.data)) return [];
    return occurrencesData.data.filter((occ) => occ.status !== "CANCELLED").map((occ) => ({
      label: prettyDate(occ.start_date, (event == null ? void 0 : event.timezone) || "UTC") + (occ.label ? ` (${occ.label})` : ""),
      value: String(occ.id)
    }));
  }, [isRecurring, occurrencesData, event == null ? void 0 : event.timezone]);
  const form = useForm({
    initialValues: {
      product_id: void 0,
      email: "",
      first_name: "",
      last_name: "",
      amount_paid: 0,
      send_confirmation_email: true,
      taxes_and_fees: [],
      locale: getClientLocale(),
      event_occurrence_id: null,
      override_capacity: false
    }
  });
  const selectedOccurrence = useMemo(() => {
    if (!isRecurring || !(occurrencesData == null ? void 0 : occurrencesData.data) || form.values.event_occurrence_id == null) return void 0;
    const targetId = Number(form.values.event_occurrence_id);
    return occurrencesData.data.find((occ) => Number(occ.id) === targetId);
  }, [isRecurring, occurrencesData, form.values.event_occurrence_id]);
  const occurrenceIsFull = useMemo(() => {
    if (!selectedOccurrence) return false;
    if (selectedOccurrence.status === EventOccurrenceStatus.SOLD_OUT) return true;
    if (selectedOccurrence.capacity == null) return false;
    return (selectedOccurrence.used_capacity ?? 0) >= selectedOccurrence.capacity;
  }, [selectedOccurrence]);
  useEffect(() => {
    if (form.values.override_capacity && !occurrenceIsFull) {
      form.setFieldValue("override_capacity", false);
    }
  }, [occurrenceIsFull]);
  const {
    data: priceOverrides
  } = useGetPriceOverrides(eventId, isRecurring ? form.values.event_occurrence_id ?? void 0 : void 0);
  useEffect(() => {
    var _a2, _b, _c, _d;
    if (event == null ? void 0 : event.product_categories) {
      form.setFieldValue("product_price_id", String((_c = (_b = (_a2 = eventProducts == null ? void 0 : eventProducts.find((product) => product.id == form.values.product_id)) == null ? void 0 : _a2.prices) == null ? void 0 : _b[0]) == null ? void 0 : _c.id));
      const taxesAndFees = (_d = eventProducts == null ? void 0 : eventProducts.find((product) => product.id == form.values.product_id)) == null ? void 0 : _d.taxes_and_fees;
      if ((taxesAndFees == null ? void 0 : taxesAndFees.length) === 0) {
        form.setFieldValue("taxes_and_fees", []);
      }
      taxesAndFees == null ? void 0 : taxesAndFees.forEach((tax, index) => {
        form.setFieldValue(`taxes_and_fees.${index}`, {
          tax_or_fee_id: tax.id,
          amount: 0,
          name: tax.name
        });
      });
    }
  }, [form.values.product_id]);
  useEffect(() => {
    var _a2, _b, _c;
    if (form.values.product_price_id) {
      const override = priceOverrides == null ? void 0 : priceOverrides.find((o) => String(o.product_price_id) === String(form.values.product_price_id));
      if (override) {
        form.setFieldValue("amount_paid", Number(override.price));
      } else {
        const basePrice = (_c = (_b = (_a2 = eventProducts == null ? void 0 : eventProducts.find((product) => product.id == form.values.product_id)) == null ? void 0 : _a2.prices) == null ? void 0 : _b.find((productPrice) => String(productPrice.id) === String(form.values.product_price_id))) == null ? void 0 : _c.price;
        form.setFieldValue("amount_paid", Number(basePrice) || 0);
      }
    }
  }, [form.values.product_price_id, priceOverrides]);
  const handleSubmit = (values) => {
    mutation.mutate({
      eventId,
      attendeeData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "zLmvhE"
          }
        ));
        onClose();
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  if (!(event == null ? void 0 : event.product_categories)) {
    return /* @__PURE__ */ jsx(LoadingOverlay, { visible: true });
  }
  if (isEventFetched && !eventHasProducts) {
    return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
      /*i18n*/
      {
        id: "e4KdjJ"
      }
    ), children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "H35u3n"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "light", onClick: () => {
        navigate(`/manage/event/${eventId}/products`);
      }, children: i18n._(
        /*i18n*/
        {
          id: "ophZVW"
        }
      ) })
    ] });
  }
  if (isEventFetched && isRecurring && occurrencesData && occurrenceOptions.length === 0) {
    return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
      /*i18n*/
      {
        id: "e4KdjJ"
      }
    ), children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "md", py: "lg", children: [
      /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "📅" }),
      /* @__PURE__ */ jsx(Text, { fw: 600, size: "lg", ta: "center", children: i18n._(
        /*i18n*/
        {
          id: "Rj99yx"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", ta: "center", maw: 320, children: i18n._(
        /*i18n*/
        {
          id: "ze4bi/"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "light", onClick: () => {
        onClose();
        navigate(`/manage/event/${eventId}/occurrences`);
      }, children: i18n._(
        /*i18n*/
        {
          id: "8+Cj55"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "e4KdjJ"
    }
  ), children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("first_name"), label: i18n._(
        /*i18n*/
        {
          id: "V1EGGU"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "+23bI/"
        }
      ), required: true }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("last_name"), label: i18n._(
        /*i18n*/
        {
          id: "1ZaQUH"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "XcgRvb"
        }
      ), required: true })
    ] }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("email"), label: i18n._(
      /*i18n*/
      {
        id: "ATGYL1"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "iAS9f2"
      }
    ), required: true }),
    /* @__PURE__ */ jsx(Select, { required: true, data: Object.keys(localeToNameMap).map((locale) => ({
      value: locale,
      label: localeToFlagEmojiMap[locale] + " " + getLocaleName(locale)
    })), ...form.getInputProps("locale"), label: i18n._(
      /*i18n*/
      {
        id: "vXIe7J"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "lYGfRP"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "o7s5FA"
      }
    ) }),
    /* @__PURE__ */ jsx(ProductSelector, { placeholder: i18n._(
      /*i18n*/
      {
        id: "QYARw/"
      }
    ), label: i18n._(
      /*i18n*/
      {
        id: "kjAL4v"
      }
    ), productCategories: event.product_categories, form, productFieldName: "product_id", multiSelect: false, showTierSelector: true, includedProductTypes: [ProductType.Ticket] }),
    isRecurring && occurrenceOptions.length > 0 && /* @__PURE__ */ jsx(Select, { label: i18n._(
      /*i18n*/
      {
        id: "6u1B3O"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "ypTjHL"
      }
    ), data: occurrenceOptions, required: true, value: form.values.event_occurrence_id ? String(form.values.event_occurrence_id) : null, onChange: (val) => form.setFieldValue("event_occurrence_id", val ? Number(val) : null), ...form.errors.event_occurrence_id ? {
      error: form.errors.event_occurrence_id
    } : {} }),
    occurrenceIsFull && /* @__PURE__ */ jsx(Callout, { variant: "tip", style: {
      marginTop: 16
    }, title: i18n._(
      /*i18n*/
      {
        id: "QdUMM9"
      }
    ), children: /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", children: (selectedOccurrence == null ? void 0 : selectedOccurrence.capacity) != null ? i18n._(
        /*i18n*/
        {
          id: "xG9N0H",
          values: {
            0: selectedOccurrence.used_capacity ?? 0,
            1: selectedOccurrence.capacity
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "7IIY0z"
        }
      ) }),
      /* @__PURE__ */ jsx(Switch, { label: i18n._(
        /*i18n*/
        {
          id: "NLbIb6"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "PCr4zw"
        }
      ), ...form.getInputProps("override_capacity", {
        type: "checkbox"
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(NumberInput, { required: true, mt: 20, fixedDecimalScale: true, ...form.getInputProps("amount_paid"), label: /* @__PURE__ */ jsx(Trans, { id: "R2O9Rg", values: {
      0: event == null ? void 0 : event.currency
    } }), placeholder: "0.00", decimalScale: 2, step: 1, min: 0, description: i18n._(
      /*i18n*/
      {
        id: "MhVoma"
      }
    ) }),
    (_a = form.values.taxes_and_fees) == null ? void 0 : _a.map((tax, index) => {
      return /* @__PURE__ */ jsx(NumberInput, { required: true, mt: 20, fixedDecimalScale: true, ...form.getInputProps(`taxes_and_fees.${index}.amount`), label: tax.name + " " + i18n._(
        /*i18n*/
        {
          id: "IkGIz8"
        }
      ) + " (" + (event == null ? void 0 : event.currency) + ")", placeholder: "0.00", decimalScale: 2, step: 1, min: 0 });
    }),
    /* @__PURE__ */ jsx(Switch, { mt: 20, label: i18n._(
      /*i18n*/
      {
        id: "D7ZemV"
      }
    ), ...form.getInputProps("send_confirmation_email", {
      type: "checkbox"
    }) }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "xl", disabled: mutation.isPending, children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "b4itZn"
      }
    ) + "..." : i18n._(
      /*i18n*/
      {
        id: "ipP6Ue"
      }
    ) })
  ] }) });
};
const attendeeStatuses = [{
  label: i18n._(
    /*i18n*/
    {
      id: "F6pfE9"
    }
  ),
  value: "ACTIVE"
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
      id: "ioG+xt"
    }
  ),
  value: "AWAITING_PAYMENT"
}];
const Attendees = () => {
  var _a, _b, _c, _d, _e, _f;
  const {
    eventId
  } = useParams();
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const attendeesQuery = useGetAttendees(eventId, searchParams);
  const attendees = (_a = attendeesQuery == null ? void 0 : attendeesQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = attendeesQuery == null ? void 0 : attendeesQuery.data) == null ? void 0 : _b.meta;
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const [downloadPending, setDownloadPending] = useState(false);
  const {
    data: event
  } = useGetEvent(eventId);
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const {
    data: occurrencesData
  } = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 100
  }, isRecurring);
  const occurrences = (occurrencesData == null ? void 0 : occurrencesData.data) || [];
  const occurrenceFilter = (_c = searchParams.filterFields) == null ? void 0 : _c.event_occurrence_id;
  const selectedOccurrenceId = occurrenceFilter && !Array.isArray(occurrenceFilter) ? String(occurrenceFilter.value) : null;
  const productOptions = ((_e = (_d = getProductsFromEvent(event)) == null ? void 0 : _d.filter((product) => product.product_type === ProductType.Ticket)) == null ? void 0 : _e.flatMap((product) => {
    const options = [];
    options.push({
      label: product.title,
      value: `product:${product.id}`
    });
    if (product.type === "TIERED" && product.prices) {
      product.prices.forEach((price) => {
        options.push({
          label: `${product.title} - ${price.label}`,
          value: `tier:${price.id}`
        });
      });
    }
    return options;
  })) || [];
  const filterOptions = [{
    field: "product_id",
    label: i18n._(
      /*i18n*/
      {
        id: "8jLPgH"
      }
    ),
    type: "multi-select",
    options: productOptions
  }, {
    field: "status",
    label: i18n._(
      /*i18n*/
      {
        id: "cosfD8"
      }
    ),
    type: "multi-select",
    options: attendeeStatuses
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
    if (((_a2 = values.product_id) == null ? void 0 : _a2.length) > 0) {
      const productIds = [];
      const tierIds = [];
      values.product_id.forEach((value) => {
        if (value.startsWith("product:")) {
          productIds.push(value.replace("product:", ""));
        } else if (value.startsWith("tier:")) {
          tierIds.push(value.replace("tier:", ""));
        }
      });
      if (productIds.length > 0) {
        filterFields.product_id = {
          operator: QueryFilterOperator.In,
          value: productIds
        };
      }
      if (tierIds.length > 0) {
        filterFields.product_price_id = {
          operator: QueryFilterOperator.In,
          value: tierIds
        };
      }
    }
    if (((_b2 = values.status) == null ? void 0 : _b2.length) > 0) {
      filterFields.status = {
        operator: QueryFilterOperator.In,
        value: values.status
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
      const blob = await attendeesClient.export(eventId2, occurrenceId);
      downloadBinary(blob, "attendees.xlsx");
    }, {
      loading: {
        title: i18n._(
          /*i18n*/
          {
            id: "jtrqH9"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "o+tJN/"
          }
        )
      },
      success: {
        title: i18n._(
          /*i18n*/
          {
            id: "k3Tngl"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "TF37u6"
          }
        ),
        onRun: () => setDownloadPending(false)
      },
      error: {
        title: i18n._(
          /*i18n*/
          {
            id: "Jjw03p"
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
  const getProductFilterValues = () => {
    var _a2, _b2;
    const values = [];
    const productIds = getFilterValue((_a2 = searchParams.filterFields) == null ? void 0 : _a2.product_id);
    const tierIds = getFilterValue((_b2 = searchParams.filterFields) == null ? void 0 : _b2.product_price_id);
    productIds.forEach((id) => values.push(`product:${id}`));
    tierIds.forEach((id) => values.push(`tier:${id}`));
    return values;
  };
  const currentFilters = {
    product_id: getProductFilterValues(),
    status: getFilterValue((_f = searchParams.filterFields) == null ? void 0 : _f.status)
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(PageBody, { children: [
      /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
        /*i18n*/
        {
          id: "N9FyyW"
        }
      ), children: i18n._(
        /*i18n*/
        {
          id: "9SZT4E"
        }
      ) }),
      /* @__PURE__ */ jsxs(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
        /*i18n*/
        {
          id: "W4kWXJ"
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
            id: "8OvVZZ"
          }
        ) })
      ] }), resultCount: pagination == null ? void 0 : pagination.total, resultLabel: i18n._(
        /*i18n*/
        {
          id: "/Ywywr"
        }
      ), children: [
        /* @__PURE__ */ jsx(Button$1, { color: "green", size: "sm", "data-testid": "attendee-create-button", onClick: openCreateModal, rightSection: /* @__PURE__ */ jsx(IconPlus, {}), children: i18n._(
          /*i18n*/
          {
            id: "hYgDIe"
          }
        ) }),
        /* @__PURE__ */ jsx(Button$1, { color: "green", size: "sm", loading: downloadPending, onClick: () => handleExport(eventId), rightSection: /* @__PURE__ */ jsx(IconDownload, {}), children: i18n._(
          /*i18n*/
          {
            id: "GS+Mus"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !attendees || attendeesQuery.isFetching }),
      !!attendees && /* @__PURE__ */ jsx(AttendeeTable, { openCreateModal, attendees, occurrenceId: selectedOccurrenceId ?? void 0 }),
      !!(attendees == null ? void 0 : attendees.length) && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
        pageNumber: value
      }), total: Number(pagination == null ? void 0 : pagination.last_page) })
    ] }),
    createModalOpen && /* @__PURE__ */ jsx(CreateAttendeeModal, { onClose: closeCreateModal, isOpen: createModalOpen })
  ] });
};
export {
  Attendees as default
};

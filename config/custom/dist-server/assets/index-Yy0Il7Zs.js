import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { Text, Switch, NumberInput, Tooltip, ActionIcon, Button, Tabs, TextInput, Radio, Anchor, SegmentedControl, UnstyledButton, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import dayjs from "dayjs";
import { IconInfoCircle, IconX, IconEdit, IconShoppingCart, IconCalendar, IconTag, IconAlertTriangle, IconMapPin, IconUsers, IconTrash, IconReceipt } from "@tabler/icons-react";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { d as EventOccurrenceStatus, M as MessageType, L as LocationType, Q as QueryFilterOperator } from "./types-CqPWB-a5.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { L as LocationPicker } from "./index-iW6667X7.js";
import { u as useCreateLocation } from "./useCreateLocation-DZ93UmD2.js";
import { G as GET_EVENT_OCCURRENCE_QUERY_KEY, u as useGetEventOccurrence } from "./useGetEventOccurrence-Csyd2oEM.js";
import { i as isAddressSet, s as sameAddress } from "./addressUtilities-7xIQim0X.js";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { G as GET_EVENT_OCCURRENCES_QUERY_KEY } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { e as eventOccurrenceClient } from "./event-occurrence.client-xqTaU2Nv.js";
import { G as GET_EVENT_QUERY_KEY, u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { f as formatDateWithLocale, u as utcToTz } from "./dates-CbVpwZeX.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { E as getProductsFromEvent, K as isEmptyHtml } from "../entry.server.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { b as GET_PRICE_OVERRIDES_QUERY_KEY, u as useGetPriceOverrides, a as useGetAttendees, A as AttendeeTable } from "./useGetPriceOverrides-DcysoAcA.js";
import { S as SendMessageModal } from "./index-7RPUkRz0.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { O as OrdersTable } from "./index-BAJxP518.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { u as useGetEventOrders } from "./index-DTsqBh8c.js";
const useCreateEventOccurrence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      data
    }) => eventOccurrenceClient.create(eventId, data),
    onSuccess: () => Promise.all([queryClient.invalidateQueries({
      queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
    }), queryClient.invalidateQueries({
      queryKey: [GET_EVENT_QUERY_KEY]
    })])
  });
};
const useUpdateEventOccurrence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      occurrenceId,
      data
    }) => eventOccurrenceClient.update(eventId, occurrenceId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_OCCURRENCE_QUERY_KEY, variables.eventId, variables.occurrenceId]
      });
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
      }), queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      })]);
    }
  });
};
const useCancelOccurrence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      occurrenceId,
      refundOrders = false
    }) => eventOccurrenceClient.cancel(eventId, occurrenceId, refundOrders),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_OCCURRENCE_QUERY_KEY, variables.eventId, variables.occurrenceId]
      });
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
      }), queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      })]);
    }
  });
};
const useDeleteEventOccurrence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      occurrenceId
    }) => eventOccurrenceClient.delete(eventId, occurrenceId),
    onSuccess: () => Promise.all([queryClient.invalidateQueries({
      queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
    }), queryClient.invalidateQueries({
      queryKey: [GET_EVENT_QUERY_KEY]
    })])
  });
};
const GET_PRODUCT_VISIBILITY_QUERY_KEY = "getProductVisibility";
const useGetProductVisibility = (eventId, occurrenceId) => {
  return useQuery({
    queryKey: [GET_PRODUCT_VISIBILITY_QUERY_KEY, eventId, occurrenceId],
    queryFn: async () => {
      const {
        data
      } = await eventOccurrenceClient.getProductVisibility(eventId, occurrenceId);
      return data;
    },
    staleTime: 3e4,
    enabled: !!occurrenceId
  });
};
const useUpsertPriceOverride = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      occurrenceId,
      data
    }) => eventOccurrenceClient.upsertPriceOverride(eventId, occurrenceId, data),
    onSuccess: (_, variables) => queryClient.invalidateQueries({
      queryKey: [GET_PRICE_OVERRIDES_QUERY_KEY, variables.eventId, variables.occurrenceId]
    })
  });
};
const useDeletePriceOverride = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      occurrenceId,
      overrideId
    }) => eventOccurrenceClient.deletePriceOverride(eventId, occurrenceId, overrideId),
    onSuccess: (_, variables) => queryClient.invalidateQueries({
      queryKey: [GET_PRICE_OVERRIDES_QUERY_KEY, variables.eventId, variables.occurrenceId]
    })
  });
};
const useUpdateProductVisibility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      occurrenceId,
      productIds
    }) => eventOccurrenceClient.updateProductVisibility(eventId, occurrenceId, productIds),
    onSuccess: (_, variables) => queryClient.invalidateQueries({
      queryKey: [GET_PRODUCT_VISIBILITY_QUERY_KEY, variables.eventId, variables.occurrenceId]
    })
  });
};
const infoText = "_infoText_1l6dz_1";
const productCard = "_productCard_1l6dz_14";
const disabled = "_disabled_1l6dz_23";
const productHeader = "_productHeader_1l6dz_27";
const productName = "_productName_1l6dz_41";
const priceTable = "_priceTable_1l6dz_48";
const priceHeaderRow = "_priceHeaderRow_1l6dz_53";
const priceRow = "_priceRow_1l6dz_54";
const priceLabel = "_priceLabel_1l6dz_78";
const basePrice = "_basePrice_1l6dz_83";
const overrideInput = "_overrideInput_1l6dz_87";
const priceRowAction = "_priceRowAction_1l6dz_92";
const saveButton = "_saveButton_1l6dz_98";
const classes$2 = {
  infoText,
  productCard,
  disabled,
  productHeader,
  productName,
  priceTable,
  priceHeaderRow,
  priceRow,
  priceLabel,
  basePrice,
  overrideInput,
  priceRowAction,
  saveButton
};
const OccurrenceProductSettings = ({
  occurrenceId
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: overrides
  } = useGetPriceOverrides(eventId, occurrenceId);
  const {
    data: visibilityData
  } = useGetProductVisibility(eventId, occurrenceId);
  const upsertMutation = useUpsertPriceOverride();
  const deleteMutation = useDeletePriceOverride();
  const visibilityMutation = useUpdateProductVisibility();
  const [pendingOverrides, setPendingOverrides] = useState({});
  const [enabledProductIds, setEnabledProductIds] = useState(/* @__PURE__ */ new Set());
  const [visibilityInitialized, setVisibilityInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const products = getProductsFromEvent(event);
  useEffect(() => {
    if (!products || visibilityInitialized) return;
    if (visibilityData && visibilityData.length > 0) {
      setEnabledProductIds(new Set(visibilityData.map((v) => Number(v.product_id))));
    } else if (visibilityData) {
      setEnabledProductIds(new Set(products.map((p) => p.id)));
    }
    if (visibilityData !== void 0) {
      setVisibilityInitialized(true);
    }
  }, [visibilityData, products, visibilityInitialized]);
  const getExistingOverride = useCallback((priceId) => {
    return overrides == null ? void 0 : overrides.find((o) => o.product_price_id === priceId);
  }, [overrides]);
  const handleToggleProduct = (productId, enabled) => {
    if (!enabled) {
      const liveEnabledCount = (products == null ? void 0 : products.filter((p) => enabledProductIds.has(p.id)).length) ?? 0;
      if (liveEnabledCount <= 1 && enabledProductIds.has(productId)) {
        showError(i18n._(
          /*i18n*/
          {
            id: "Z44eZS"
          }
        ));
        return;
      }
    }
    setEnabledProductIds((prev) => {
      const next = new Set(prev);
      if (enabled) {
        next.add(productId);
      } else {
        next.delete(productId);
      }
      return next;
    });
  };
  const handlePriceChange = (priceId, value) => {
    setPendingOverrides((prev) => ({
      ...prev,
      [priceId]: value === "" ? void 0 : Number(value)
    }));
  };
  const handleResetOverride = (priceId) => {
    const existing = getExistingOverride(priceId);
    if (!(existing == null ? void 0 : existing.id)) return;
    deleteMutation.mutate({
      eventId,
      occurrenceId,
      overrideId: existing.id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "cnVIpl"
          }
        ));
        setPendingOverrides((prev) => {
          const next = {
            ...prev
          };
          delete next[priceId];
          return next;
        });
      },
      onError: (error) => {
        var _a, _b;
        showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "A/P7PX"
          }
        ));
      }
    });
  };
  const handleSave = async () => {
    var _a, _b, _c, _d;
    if (!products) return;
    setIsSaving(true);
    const liveEnabledProductIds = Array.from(enabledProductIds).filter((id) => products.some((p) => p.id === id));
    if (liveEnabledProductIds.length === 0) {
      showError(i18n._(
        /*i18n*/
        {
          id: "Z44eZS"
        }
      ));
      setIsSaving(false);
      return;
    }
    try {
      await visibilityMutation.mutateAsync({
        eventId,
        occurrenceId,
        productIds: liveEnabledProductIds
      });
      const disabledProductIds = new Set(products.filter((p) => !enabledProductIds.has(p.id)).map((p) => p.id));
      const overridesToDelete = (overrides || []).filter((o) => {
        const product = products.find((p) => {
          var _a2;
          return (_a2 = p.prices) == null ? void 0 : _a2.some((pr) => pr.id === Number(o.product_price_id));
        });
        return product && disabledProductIds.has(product.id);
      });
      for (const override of overridesToDelete) {
        if (override.id) {
          await deleteMutation.mutateAsync({
            eventId,
            occurrenceId,
            overrideId: override.id
          });
        }
      }
      const priceEntries = Object.entries(pendingOverrides).filter(([, val]) => val !== void 0);
      for (const [priceId, price] of priceEntries) {
        const priceProduct = products.find((p) => {
          var _a2;
          return (_a2 = p.prices) == null ? void 0 : _a2.some((pr) => pr.id === Number(priceId));
        });
        if (priceProduct && !enabledProductIds.has(priceProduct.id)) continue;
        try {
          await upsertMutation.mutateAsync({
            eventId,
            occurrenceId,
            data: {
              product_price_id: Number(priceId),
              price
            }
          });
        } catch (error) {
          showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
            /*i18n*/
            {
              id: "sj/eZA"
            }
          ));
        }
      }
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "2339ej"
        }
      ));
      setPendingOverrides({});
    } catch (error) {
      showError(((_d = (_c = error == null ? void 0 : error.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message) || i18n._(
        /*i18n*/
        {
          id: "780n8A"
        }
      ));
    } finally {
      setIsSaving(false);
    }
  };
  if (!products || products.length === 0) {
    return /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
      /*i18n*/
      {
        id: "M1/lXs"
      }
    ) });
  }
  if (!visibilityInitialized) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: classes$2.infoText, children: [
      /* @__PURE__ */ jsx(IconInfoCircle, { size: 14 }),
      /* @__PURE__ */ jsx("span", { children: i18n._(
        /*i18n*/
        {
          id: "av6ukY"
        }
      ) })
    ] }),
    products.map((product) => {
      const isEnabled = enabledProductIds.has(product.id);
      const hasPrices = isEnabled && product.prices && product.prices.length > 0;
      return /* @__PURE__ */ jsxs("div", { className: `${classes$2.productCard} ${!isEnabled ? classes$2.disabled : ""}`, style: {
        marginBottom: 12
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$2.productHeader, children: [
          /* @__PURE__ */ jsx("span", { className: classes$2.productName, children: product.title }),
          /* @__PURE__ */ jsx(Switch, { checked: isEnabled, onChange: (e) => handleToggleProduct(product.id, e.currentTarget.checked), size: "sm" })
        ] }),
        hasPrices && /* @__PURE__ */ jsxs("div", { className: classes$2.priceTable, children: [
          /* @__PURE__ */ jsxs("div", { className: classes$2.priceHeaderRow, children: [
            /* @__PURE__ */ jsx("span", { children: i18n._(
              /*i18n*/
              {
                id: "Jm2AC3"
              }
            ) }),
            /* @__PURE__ */ jsx("span", { children: i18n._(
              /*i18n*/
              {
                id: "D9LTCH"
              }
            ) }),
            /* @__PURE__ */ jsx("span", { children: i18n._(
              /*i18n*/
              {
                id: "iCOVQO"
              }
            ) }),
            /* @__PURE__ */ jsx("span", {})
          ] }),
          product.prices.map((price) => {
            var _a;
            const existing = getExistingOverride(price.id);
            const pendingValue = pendingOverrides[price.id];
            const displayPrice = pendingValue !== void 0 ? pendingValue : existing == null ? void 0 : existing.price;
            return /* @__PURE__ */ jsxs("div", { className: classes$2.priceRow, children: [
              /* @__PURE__ */ jsx("span", { className: classes$2.priceLabel, children: price.label || i18n._(
                /*i18n*/
                {
                  id: "ovBPCi"
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: classes$2.basePrice, children: (_a = price.price) == null ? void 0 : _a.toFixed(2) }),
              /* @__PURE__ */ jsx(NumberInput, { size: "xs", placeholder: i18n._(
                /*i18n*/
                {
                  id: "M9ZhMP"
                }
              ), value: displayPrice ?? "", onChange: (val) => handlePriceChange(price.id, val), min: 0, decimalScale: 2, fixedDecimalScale: true, className: classes$2.overrideInput }),
              /* @__PURE__ */ jsx("span", { className: classes$2.priceRowAction, children: existing && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
                /*i18n*/
                {
                  id: "a5z8mb"
                }
              ), children: /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "subtle", color: "gray", loading: deleteMutation.isPending, onClick: () => handleResetOverride(price.id), children: /* @__PURE__ */ jsx(IconX, { size: 14 }) }) }) })
            ] }, price.id);
          })
        ] })
      ] }, product.id);
    }),
    /* @__PURE__ */ jsx(Button, { loading: isSaving, onClick: handleSave, fullWidth: true, className: classes$2.saveButton, children: i18n._(
      /*i18n*/
      {
        id: "IUwGEM"
      }
    ) })
  ] });
};
dayjs.extend(utc);
dayjs.extend(timezone);
const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clipForSubject = (title, maxTitleLength = 55) => title.length <= maxTitleLength ? title : title.slice(0, maxTitleLength - 1).trimEnd() + "…";
const formatLocal = (localString, tz) => dayjs.tz(localString, tz).format("MMM D, YYYY · h:mm A");
const formatLocalTime = (localString, tz) => dayjs.tz(localString, tz).format("h:mm A");
const buildSingleRescheduleTemplate = (event, oldOccurrence, newStartDate, newEndDate) => {
  var _a;
  const tz = event.timezone;
  const oldStart = formatDateWithLocale(oldOccurrence.start_date, "shortDateTime", tz);
  const newStart = formatLocal(newStartDate, tz);
  const newEnd = newEndDate ? newEndDate.substring(0, 10) === newStartDate.substring(0, 10) ? formatLocalTime(newEndDate, tz) : formatLocal(newEndDate, tz) : null;
  const newWhen = newEnd ? `${newStart} – ${newEnd}` : newStart;
  const title = escape(event.title);
  const organizer = escape(((_a = event.organizer) == null ? void 0 : _a.name) ?? "");
  const subjectTitle = clipForSubject(event.title);
  const subject = i18n._(
    /*i18n*/
    {
      id: "UOGHdA",
      values: {
        subjectTitle
      }
    }
  );
  const message = [`<p>${i18n._(
    /*i18n*/
    {
      id: "bVsnqU"
    }
  )}</p>`, `<p>${i18n._(
    /*i18n*/
    {
      id: "UNd0OU",
      values: {
        0: escape(oldStart),
        title
      }
    }
  )}</p>`, `<p><strong>${i18n._(
    /*i18n*/
    {
      id: "uK7xWf"
    }
  )}</strong> ${escape(newWhen)}</p>`, `<p>${i18n._(
    /*i18n*/
    {
      id: "FNO5uZ"
    }
  )}</p>`, `<p>${i18n._(
    /*i18n*/
    {
      id: "pYwj0k"
    }
  )}<br>${organizer}</p>`].join("");
  return {
    subject,
    message
  };
};
const buildBulkRescheduleTemplate = (event, affectedCount, actionDescription) => {
  var _a;
  const title = escape(event.title);
  const organizer = escape(((_a = event.organizer) == null ? void 0 : _a.name) ?? "");
  const description = escape(actionDescription);
  const subjectTitle = clipForSubject(event.title);
  const subject = i18n._(
    /*i18n*/
    {
      id: "75+lpR",
      values: {
        subjectTitle
      }
    }
  );
  const message = [`<p>${i18n._(
    /*i18n*/
    {
      id: "bVsnqU"
    }
  )}</p>`, `<p>${i18n._(
    /*i18n*/
    {
      id: "LKjHr4",
      values: {
        title,
        description,
        affectedCount
      }
    }
  )}</p>`, `<p>${i18n._(
    /*i18n*/
    {
      id: "PJ3Ykr"
    }
  )}</p>`, `<p>${i18n._(
    /*i18n*/
    {
      id: "pYwj0k"
    }
  )}<br>${organizer}</p>`].join("");
  return {
    subject,
    message
  };
};
const section = "_section_1lj8v_1";
const sectionHeader = "_sectionHeader_1lj8v_12";
const sectionIcon = "_sectionIcon_1lj8v_19";
const sectionTitle = "_sectionTitle_1lj8v_31";
const cancelledBanner = "_cancelledBanner_1lj8v_37";
const cancelledIcon = "_cancelledIcon_1lj8v_48";
const cancelledText = "_cancelledText_1lj8v_60";
const pastDateWarning = "_pastDateWarning_1lj8v_66";
const dangerZone = "_dangerZone_1lj8v_85";
const dangerHeader = "_dangerHeader_1lj8v_92";
const dangerIcon = "_dangerIcon_1lj8v_99";
const dangerTitle = "_dangerTitle_1lj8v_111";
const dangerActions = "_dangerActions_1lj8v_117";
const dangerAction = "_dangerAction_1lj8v_117";
const dangerActionIcon = "_dangerActionIcon_1lj8v_143";
const dangerActionLabel = "_dangerActionLabel_1lj8v_155";
const dangerActionDesc = "_dangerActionDesc_1lj8v_161";
const classes$1 = {
  section,
  sectionHeader,
  sectionIcon,
  sectionTitle,
  cancelledBanner,
  cancelledIcon,
  cancelledText,
  pastDateWarning,
  dangerZone,
  dangerHeader,
  dangerIcon,
  dangerTitle,
  dangerActions,
  dangerAction,
  dangerActionIcon,
  dangerActionLabel,
  dangerActionDesc
};
const capacityVisibilityToForm = (value) => value === true ? "show" : value === false ? "hide" : "inherit";
const capacityVisibilityToPayload = (value) => value === "show" ? true : value === "hide" ? false : null;
const OccurrenceEditModal = ({
  onClose,
  occurrenceId,
  duplicateFrom,
  defaultDate
}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const isEditing = !!occurrenceId;
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: occurrence
  } = useGetEventOccurrence(eventId, occurrenceId);
  const createMutation = useCreateEventOccurrence();
  const updateMutation = useUpdateEventOccurrence();
  const cancelMutation = useCancelOccurrence();
  const deleteMutation = useDeleteEventOccurrence();
  const createLocationMutation = useCreateLocation();
  const organizerId = ((_a = event == null ? void 0 : event.organizer) == null ? void 0 : _a.id) ?? (event == null ? void 0 : event.organizer_id);
  const form = useForm({
    initialValues: {
      start_date: "",
      end_date: "",
      capacity: null,
      label: "",
      show_available_capacity: "inherit",
      online_event_connection_details: "",
      location_mode: "inherit",
      location: null
    },
    validate: {
      start_date: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "izRfYP"
        }
      ) : null,
      end_date: (value, values) => {
        if (value && values.start_date && value < values.start_date) {
          return i18n._(
            /*i18n*/
            {
              id: "PKXt9R"
            }
          );
        }
        return null;
      },
      capacity: (value) => {
        if (value !== null && value !== void 0 && value < 0) {
          return i18n._(
            /*i18n*/
            {
              id: "H7K8og"
            }
          );
        }
        return null;
      },
      online_event_connection_details: (value, values) => {
        if (values.location_mode === "online" && (!value || isEmptyHtml(value))) {
          return i18n._(
            /*i18n*/
            {
              id: "X1y8JF"
            }
          );
        }
        return null;
      },
      location: (value, values) => {
        if (values.location_mode !== "override") {
          return null;
        }
        if (!value || value.kind === "new" && !isAddressSet(value.address)) {
          return i18n._(
            /*i18n*/
            {
              id: "ppwojw"
            }
          );
        }
        return null;
      }
    }
  });
  useEffect(() => {
    if (occurrence && event) {
      const eventLocation = occurrence.event_location;
      const occType = eventLocation == null ? void 0 : eventLocation.type;
      const mode = (() => {
        if (occType === LocationType.Online) return "online";
        if (occType === LocationType.InPerson) return "override";
        return "inherit";
      })();
      const occLocation = eventLocation == null ? void 0 : eventLocation.location;
      const occLocationId = (eventLocation == null ? void 0 : eventLocation.location_id) ?? null;
      form.setValues({
        start_date: utcToTz(occurrence.start_date, event.timezone) || "",
        end_date: utcToTz(occurrence.end_date, event.timezone) || "",
        capacity: occurrence.capacity ?? null,
        label: occurrence.label || "",
        show_available_capacity: capacityVisibilityToForm(occurrence.show_available_capacity),
        online_event_connection_details: (eventLocation == null ? void 0 : eventLocation.online_event_connection_details) ?? "",
        location_mode: mode,
        location: occLocationId && occLocation ? {
          kind: "saved",
          location: {
            ...occLocation,
            id: occLocation.id ?? occLocationId
          }
        } : null
      });
    }
  }, [occurrence, event]);
  useEffect(() => {
    if (duplicateFrom && event && !isEditing) {
      form.setValues({
        start_date: utcToTz(duplicateFrom.start_date, event.timezone) || "",
        end_date: utcToTz(duplicateFrom.end_date, event.timezone) || "",
        capacity: duplicateFrom.capacity ?? null,
        label: duplicateFrom.label || "",
        show_available_capacity: capacityVisibilityToForm(duplicateFrom.show_available_capacity)
      });
    }
  }, [duplicateFrom, event]);
  useEffect(() => {
    if (defaultDate && !isEditing && !duplicateFrom) {
      form.setFieldValue("start_date", defaultDate + "T09:00");
    }
  }, [defaultDate]);
  const [pendingNotification, setPendingNotification] = useState(null);
  const resolveLocationId = async (value) => {
    var _a2, _b, _c;
    if (value.kind === "saved") {
      return value.location.id ? Number(value.location.id) : null;
    }
    if (!organizerId || !isAddressSet(value.address)) {
      return null;
    }
    const existingLocationId = ((_a2 = occurrence == null ? void 0 : occurrence.event_location) == null ? void 0 : _a2.location_id) ?? null;
    const existingAddress = ((_c = (_b = occurrence == null ? void 0 : occurrence.event_location) == null ? void 0 : _b.location) == null ? void 0 : _c.structured_address) ?? null;
    if (existingLocationId !== null && existingAddress !== null && sameAddress(existingAddress, value.address)) {
      return existingLocationId;
    }
    const created = await createLocationMutation.mutateAsync({
      organizerId,
      payload: {
        name: value.address.venue_name || null,
        structured_address: value.address,
        latitude: value.latitude,
        longitude: value.longitude,
        provider: value.provider,
        provider_place_id: value.providerPlaceId
      }
    });
    return created.data.id ?? null;
  };
  const submit = async (values, notifyAfterSave) => {
    try {
      let eventLocationPayload = void 0;
      let clearEventLocation = false;
      if (values.location_mode === "inherit") {
        clearEventLocation = true;
      } else if (values.location_mode === "online") {
        eventLocationPayload = {
          type: LocationType.Online,
          online_event_connection_details: values.online_event_connection_details || null
        };
      } else if (values.location_mode === "override") {
        const locationIdForOccurrence = values.location ? await resolveLocationId(values.location) : null;
        if (locationIdForOccurrence === null) {
          throw new Error(i18n._(
            /*i18n*/
            {
              id: "ppwojw"
            }
          ));
        }
        eventLocationPayload = {
          type: LocationType.InPerson,
          location_id: locationIdForOccurrence
        };
      }
      const normalisedEnd = values.end_date && values.end_date > values.start_date ? values.end_date : void 0;
      const payload = {
        start_date: values.start_date,
        end_date: normalisedEnd,
        capacity: values.capacity,
        label: values.label,
        show_available_capacity: capacityVisibilityToPayload(values.show_available_capacity),
        ...eventLocationPayload ? {
          event_location: eventLocationPayload
        } : {},
        ...clearEventLocation ? {
          clear_event_location: true
        } : {}
      };
      const onSuccess = () => {
        showSuccess(isEditing ? i18n._(
          /*i18n*/
          {
            id: "Ez0YsD"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "a/C/6R"
          }
        ));
        if (notifyAfterSave && isEditing && occurrence) {
          setPendingNotification({
            occurrence,
            newStartDate: values.start_date,
            newEndDate: values.end_date
          });
          return;
        }
        onClose();
      };
      const onError = (error) => errorHandler(form, error);
      if (isEditing) {
        updateMutation.mutate({
          eventId,
          occurrenceId,
          data: payload
        }, {
          onSuccess,
          onError
        });
      } else {
        createMutation.mutate({
          eventId,
          data: payload
        }, {
          onSuccess,
          onError
        });
      }
    } catch (error) {
      showError((error == null ? void 0 : error.message) || i18n._(
        /*i18n*/
        {
          id: "/lq4oO"
        }
      ));
      errorHandler(form, error);
    }
  };
  const handleSubmit = (values) => {
    var _a2;
    const attendeeCount = ((_a2 = occurrence == null ? void 0 : occurrence.statistics) == null ? void 0 : _a2.attendees_registered) ?? 0;
    const originalStart = occurrence && event ? utcToTz(occurrence.start_date, event.timezone) : "";
    const originalEnd = occurrence && event ? utcToTz(occurrence.end_date, event.timezone) : "";
    const dateChanged = isEditing && (values.start_date !== originalStart || (values.end_date || "") !== (originalEnd || ""));
    if (dateChanged && attendeeCount > 0) {
      const notifyRef = {
        current: true
      };
      modals.openConfirmModal({
        title: i18n._(
          /*i18n*/
          {
            id: "gbjFFH"
          }
        ),
        children: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", mb: "md", children: attendeeCount === 1 ? i18n._(
            /*i18n*/
            {
              id: "qOyE2U"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "gbJOk9",
              values: {
                attendeeCount
              }
            }
          ) }),
          /* @__PURE__ */ jsx(Checkbox, { defaultChecked: true, label: i18n._(
            /*i18n*/
            {
              id: "Hq2BzX"
            }
          ), description: i18n._(
            /*i18n*/
            {
              id: "McuGND"
            }
          ), onChange: (e) => {
            notifyRef.current = e.currentTarget.checked;
          } })
        ] }),
        labels: {
          confirm: i18n._(
            /*i18n*/
            {
              id: "tfDRzk"
            }
          ),
          cancel: i18n._(
            /*i18n*/
            {
              id: "dEgA5A"
            }
          )
        },
        onConfirm: () => submit(values, notifyRef.current)
      });
      return;
    }
    submit(values, false);
  };
  const refundRef = useRef(false);
  const handleCancel = () => {
    var _a2;
    refundRef.current = false;
    const orderCount = ((_a2 = occurrence == null ? void 0 : occurrence.statistics) == null ? void 0 : _a2.orders_created) ?? 0;
    modals.openConfirmModal({
      title: i18n._(
        /*i18n*/
        {
          id: "Py78q9"
        }
      ),
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", mb: "md", children: i18n._(
          /*i18n*/
          {
            id: "GTxE0U"
          }
        ) }),
        orderCount > 0 && /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, c: "red", mb: "md", children: i18n._(
          /*i18n*/
          {
            id: "o1phK/",
            values: {
              orderCount
            }
          }
        ) }),
        /* @__PURE__ */ jsx(Checkbox, { label: i18n._(
          /*i18n*/
          {
            id: "4cRUK3"
          }
        ), onChange: (e) => {
          refundRef.current = e.currentTarget.checked;
        } })
      ] }),
      labels: {
        confirm: i18n._(
          /*i18n*/
          {
            id: "Py78q9"
          }
        ),
        cancel: i18n._(
          /*i18n*/
          {
            id: "sr0UJD"
          }
        )
      },
      confirmProps: {
        color: "red"
      },
      onConfirm: () => {
        cancelMutation.mutate({
          eventId,
          occurrenceId,
          refundOrders: refundRef.current
        }, {
          onSuccess: () => {
            showSuccess(i18n._(
              /*i18n*/
              {
                id: "81jBnC"
              }
            ));
            onClose();
          },
          onError: (error) => {
            var _a3, _b;
            showError(((_b = (_a3 = error == null ? void 0 : error.response) == null ? void 0 : _a3.data) == null ? void 0 : _b.message) || i18n._(
              /*i18n*/
              {
                id: "PO0cfn"
              }
            ));
          }
        });
      }
    });
  };
  const handleDelete = () => {
    modals.openConfirmModal({
      title: i18n._(
        /*i18n*/
        {
          id: "6EkaOO"
        }
      ),
      children: /* @__PURE__ */ jsx(Text, { size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "yAXqWW"
        }
      ) }),
      labels: {
        confirm: i18n._(
          /*i18n*/
          {
            id: "UBv8UK"
          }
        ),
        cancel: i18n._(
          /*i18n*/
          {
            id: "sr0UJD"
          }
        )
      },
      confirmProps: {
        color: "red"
      },
      onConfirm: () => {
        deleteMutation.mutate({
          eventId,
          occurrenceId
        }, {
          onSuccess: () => {
            showSuccess(i18n._(
              /*i18n*/
              {
                id: "rngCAz"
              }
            ));
            onClose();
          },
          onError: (error) => {
            var _a2, _b;
            showError(((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || i18n._(
              /*i18n*/
              {
                id: "KXv+Qn"
              }
            ));
          }
        });
      }
    });
  };
  const isCancelled = (occurrence == null ? void 0 : occurrence.status) === EventOccurrenceStatus.CANCELLED;
  const isPending = createMutation.isPending || updateMutation.isPending;
  const isStartDateInPast = useMemo(() => {
    if (!form.values.start_date) return false;
    return dayjs(form.values.start_date).isBefore(dayjs());
  }, [form.values.start_date]);
  const notificationTemplate = useMemo(() => {
    if (!pendingNotification || !event) return null;
    return buildSingleRescheduleTemplate(event, pendingNotification.occurrence, pendingNotification.newStartDate, pendingNotification.newEndDate);
  }, [pendingNotification, event]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Modal, { opened: !pendingNotification, onClose, heading: isEditing ? i18n._(
      /*i18n*/
      {
        id: "1Mp/A4"
      }
    ) : duplicateFrom ? i18n._(
      /*i18n*/
      {
        id: "YueC+F"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "Z/dcxc"
      }
    ), size: "lg", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "details", children: [
      /* @__PURE__ */ jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsx(Tabs.Tab, { value: "details", leftSection: /* @__PURE__ */ jsx(IconEdit, { size: 14 }), children: i18n._(
          /*i18n*/
          {
            id: "URmyfc"
          }
        ) }),
        isEditing && /* @__PURE__ */ jsx(Tabs.Tab, { value: "products", leftSection: /* @__PURE__ */ jsx(IconShoppingCart, { size: 14 }), children: i18n._(
          /*i18n*/
          {
            id: "N0qXpE"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Tabs.Panel, { value: "details", pt: "md", children: [
        isCancelled && /* @__PURE__ */ jsxs("div", { className: classes$1.cancelledBanner, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.cancelledIcon, children: /* @__PURE__ */ jsx(IconX, { size: 14 }) }),
          /* @__PURE__ */ jsx("span", { className: classes$1.cancelledText, children: i18n._(
            /*i18n*/
            {
              id: "F/UtGt"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: isCancelled || isPending, style: {
          border: "none",
          padding: 0,
          margin: 0
        }, children: [
          /* @__PURE__ */ jsxs("div", { className: classes$1.section, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$1.sectionHeader, children: [
              /* @__PURE__ */ jsx("div", { className: classes$1.sectionIcon, children: /* @__PURE__ */ jsx(IconCalendar, { size: 16 }) }),
              /* @__PURE__ */ jsx("span", { className: classes$1.sectionTitle, children: i18n._(
                /*i18n*/
                {
                  id: "JvUngl"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs(InputGroup, { children: [
              /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("start_date"), label: i18n._(
                /*i18n*/
                {
                  id: "D3iCkb"
                }
              ), required: true }),
              /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("end_date"), label: i18n._(
                /*i18n*/
                {
                  id: "VFv2ZC"
                }
              ) }),
              /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("label"), label: i18n._(
                /*i18n*/
                {
                  id: "87a/t/"
                }
              ), placeholder: i18n._(
                /*i18n*/
                {
                  id: "/zajIE"
                }
              ), leftSection: /* @__PURE__ */ jsx(IconTag, { size: 14 }) })
            ] }),
            isStartDateInPast && !isEditing && /* @__PURE__ */ jsxs("div", { className: classes$1.pastDateWarning, children: [
              /* @__PURE__ */ jsx(IconAlertTriangle, { size: 14 }),
              /* @__PURE__ */ jsx("span", { children: i18n._(
                /*i18n*/
                {
                  id: "BLZ7pX"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$1.section, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$1.sectionHeader, children: [
              /* @__PURE__ */ jsx("div", { className: classes$1.sectionIcon, children: /* @__PURE__ */ jsx(IconMapPin, { size: 16 }) }),
              /* @__PURE__ */ jsx("span", { className: classes$1.sectionTitle, children: i18n._(
                /*i18n*/
                {
                  id: "wJijgU"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs(Radio.Group, { value: form.values.location_mode, onChange: (value) => form.setFieldValue("location_mode", value), children: [
              /* @__PURE__ */ jsx(Radio, { value: "inherit", label: i18n._(
                /*i18n*/
                {
                  id: "LeuERW"
                }
              ), mb: 6 }),
              /* @__PURE__ */ jsx(Radio, { value: "override", label: i18n._(
                /*i18n*/
                {
                  id: "G8KNgd"
                }
              ), mb: 6 }),
              /* @__PURE__ */ jsx(Radio, { value: "online", label: i18n._(
                /*i18n*/
                {
                  id: "oXOSPE"
                }
              ) })
            ] }),
            form.values.location_mode === "override" && organizerId && /* @__PURE__ */ jsx("div", { style: {
              marginTop: 12
            }, children: /* @__PURE__ */ jsx(LocationPicker, { organizerId, value: form.values.location, onChange: (value) => form.setFieldValue("location", value), error: form.errors.location }) }),
            form.values.location_mode === "online" && /* @__PURE__ */ jsx("div", { style: {
              marginTop: 12
            }, children: /* @__PURE__ */ jsx(Editor, { value: form.values.online_event_connection_details || "", error: form.errors.online_event_connection_details, label: i18n._(
              /*i18n*/
              {
                id: "5lcVkL"
              }
            ), description: i18n._(
              /*i18n*/
              {
                id: "062KsE"
              }
            ), onChange: (value) => form.setFieldValue("online_event_connection_details", value) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$1.section, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$1.sectionHeader, children: [
              /* @__PURE__ */ jsx("div", { className: classes$1.sectionIcon, children: /* @__PURE__ */ jsx(IconUsers, { size: 16 }) }),
              /* @__PURE__ */ jsx("span", { className: classes$1.sectionTitle, children: i18n._(
                /*i18n*/
                {
                  id: "QyjCeq"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(NumberInput, { ...form.getInputProps("capacity"), placeholder: i18n._(
              /*i18n*/
              {
                id: "N5TErv"
              }
            ), min: 0, allowNegative: false }),
            /* @__PURE__ */ jsx(Callout, { variant: "info", title: i18n._(
              /*i18n*/
              {
                id: "DMk8F0"
              }
            ), style: {
              marginTop: 12
            }, children: /* @__PURE__ */ jsx(Trans, { id: "oBXbO4", components: {
              0: /* @__PURE__ */ jsx(Anchor, { component: Link, to: `/manage/event/${eventId}/products`, target: "_blank", inherit: true })
            } }) }),
            /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mt: "md", mb: 6, children: i18n._(
              /*i18n*/
              {
                id: "rXxBOx"
              }
            ) }),
            /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, size: "sm", data: [{
              label: i18n._(
                /*i18n*/
                {
                  id: "/rsy72"
                }
              ),
              value: "inherit"
            }, {
              label: i18n._(
                /*i18n*/
                {
                  id: "8vETh9"
                }
              ),
              value: "show"
            }, {
              label: i18n._(
                /*i18n*/
                {
                  id: "vLyv1R"
                }
              ),
              value: "hide"
            }], value: form.values.show_available_capacity, onChange: (value) => form.setFieldValue("show_available_capacity", value) })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, size: "md", loading: isPending, children: isEditing ? i18n._(
            /*i18n*/
            {
              id: "IUwGEM"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "tsGqx5"
            }
          ) })
        ] }) }),
        isEditing && /* @__PURE__ */ jsxs("div", { className: classes$1.dangerZone, children: [
          /* @__PURE__ */ jsxs("div", { className: classes$1.dangerHeader, children: [
            /* @__PURE__ */ jsx("div", { className: classes$1.dangerIcon, children: /* @__PURE__ */ jsx(IconAlertTriangle, { size: 16 }) }),
            /* @__PURE__ */ jsx("span", { className: classes$1.dangerTitle, children: i18n._(
              /*i18n*/
              {
                id: "ZQKLI1"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$1.dangerActions, children: [
            !isCancelled && /* @__PURE__ */ jsxs(UnstyledButton, { className: classes$1.dangerAction, onClick: handleCancel, "data-loading": cancelMutation.isPending, children: [
              /* @__PURE__ */ jsx("div", { className: classes$1.dangerActionIcon, children: /* @__PURE__ */ jsx(IconInfoCircle, { size: 16 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: classes$1.dangerActionLabel, children: i18n._(
                  /*i18n*/
                  {
                    id: "Py78q9"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: classes$1.dangerActionDesc, children: i18n._(
                  /*i18n*/
                  {
                    id: "kLvU3F"
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(UnstyledButton, { className: classes$1.dangerAction, onClick: handleDelete, "data-loading": deleteMutation.isPending, children: [
              /* @__PURE__ */ jsx("div", { className: classes$1.dangerActionIcon, children: /* @__PURE__ */ jsx(IconTrash, { size: 16 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: classes$1.dangerActionLabel, children: i18n._(
                  /*i18n*/
                  {
                    id: "6EkaOO"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: classes$1.dangerActionDesc, children: i18n._(
                  /*i18n*/
                  {
                    id: "wfCTgK"
                  }
                ) })
              ] })
            ] })
          ] })
        ] })
      ] }),
      isEditing && /* @__PURE__ */ jsx(Tabs.Panel, { value: "products", pt: "md", children: isCancelled ? /* @__PURE__ */ jsxs("div", { className: classes$1.cancelledBanner, children: [
        /* @__PURE__ */ jsx("div", { className: classes$1.cancelledIcon, children: /* @__PURE__ */ jsx(IconX, { size: 14 }) }),
        /* @__PURE__ */ jsx("span", { className: classes$1.cancelledText, children: i18n._(
          /*i18n*/
          {
            id: "ls0mTC"
          }
        ) })
      ] }) : /* @__PURE__ */ jsx(OccurrenceProductSettings, { occurrenceId }) })
    ] }) }),
    pendingNotification && notificationTemplate && /* @__PURE__ */ jsx(SendMessageModal, { onClose: () => {
      setPendingNotification(null);
      onClose();
    }, messageType: MessageType.AllAttendees, eventOccurrenceId: pendingNotification.occurrence.id, initialSubject: notificationTemplate.subject, initialMessage: notificationTemplate.message })
  ] });
};
const useReactivateOccurrence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      occurrenceId
    }) => eventOccurrenceClient.reactivate(eventId, occurrenceId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_OCCURRENCE_QUERY_KEY, variables.eventId, variables.occurrenceId]
      });
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
      }), queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      })]);
    }
  });
};
const tabsCard = "_tabsCard_pivk9_1";
const tabLabelShort = "_tabLabelShort_pivk9_11";
const tabCount = "_tabCount_pivk9_15";
const viewAllLink = "_viewAllLink_pivk9_30";
const tabLabelFull = "_tabLabelFull_pivk9_51";
const classes = {
  tabsCard,
  tabLabelShort,
  tabCount,
  viewAllLink,
  tabLabelFull
};
const OccurrenceAttendeesAndOrders = ({
  occurrenceId,
  perPage = 10,
  onNavigateAway
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const {
    data: event
  } = useGetEvent(eventId);
  const [activeTab, setActiveTab] = useState("attendees");
  const filters = {
    pageNumber: 1,
    perPage,
    sortBy: "created_at",
    sortDirection: "desc",
    filterFields: {
      event_occurrence_id: {
        operator: QueryFilterOperator.Equals,
        value: String(occurrenceId)
      }
    }
  };
  const attendeesQuery = useGetAttendees(eventId, filters);
  const ordersQuery = useGetEventOrders(eventId, filters);
  const attendeeCount = ((_b = (_a = attendeesQuery.data) == null ? void 0 : _a.meta) == null ? void 0 : _b.total) ?? 0;
  const orderCount = ((_d = (_c = ordersQuery.data) == null ? void 0 : _c.meta) == null ? void 0 : _d.total) ?? 0;
  const handleNavigate = (path) => {
    onNavigateAway == null ? void 0 : onNavigateAway();
    navigate(path);
  };
  const viewAllPath = activeTab === "orders" ? `/manage/event/${eventId}/orders?filterFields[event_occurrence_id][eq]=${occurrenceId}` : `/manage/event/${eventId}/attendees?filterFields[event_occurrence_id][eq]=${occurrenceId}`;
  if (!event) return null;
  return /* @__PURE__ */ jsx(Card, { className: classes.tabsCard, children: /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onChange: setActiveTab, children: [
    /* @__PURE__ */ jsxs(Tabs.List, { children: [
      /* @__PURE__ */ jsxs(Tabs.Tab, { value: "attendees", leftSection: /* @__PURE__ */ jsx(IconUsers, { size: 14 }), children: [
        /* @__PURE__ */ jsx("span", { className: classes.tabLabelFull, children: i18n._(
          /*i18n*/
          {
            id: "3kJ0gv"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: classes.tabLabelShort, children: i18n._(
          /*i18n*/
          {
            id: "9SZT4E"
          }
        ) }),
        attendeeCount > 0 && /* @__PURE__ */ jsx("span", { className: classes.tabCount, children: attendeeCount })
      ] }),
      /* @__PURE__ */ jsxs(Tabs.Tab, { value: "orders", leftSection: /* @__PURE__ */ jsx(IconReceipt, { size: 14 }), children: [
        /* @__PURE__ */ jsx("span", { className: classes.tabLabelFull, children: i18n._(
          /*i18n*/
          {
            id: "Fi3b48"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: classes.tabLabelShort, children: i18n._(
          /*i18n*/
          {
            id: "1h+RBg"
          }
        ) }),
        orderCount > 0 && /* @__PURE__ */ jsx("span", { className: classes.tabCount, children: orderCount })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.viewAllLink, children: /* @__PURE__ */ jsx(Anchor, { size: "sm", onClick: () => handleNavigate(viewAllPath), children: i18n._(
        /*i18n*/
        {
          id: "p5nYkr"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Panel, { value: "attendees", children: [
      ((_e = attendeesQuery.data) == null ? void 0 : _e.data) && attendeeCount > 0 && /* @__PURE__ */ jsx(AttendeeTable, { attendees: attendeesQuery.data.data, compact: true, occurrenceId }),
      ((_f = attendeesQuery.data) == null ? void 0 : _f.data) && attendeeCount === 0 && /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", py: "xl", ta: "center", children: i18n._(
        /*i18n*/
        {
          id: "PKySlW"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Panel, { value: "orders", children: [
      ((_g = ordersQuery.data) == null ? void 0 : _g.data) && orderCount > 0 && /* @__PURE__ */ jsx(OrdersTable, { event, orders: ordersQuery.data.data, compact: true }),
      ((_h = ordersQuery.data) == null ? void 0 : _h.data) && orderCount === 0 && /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", py: "xl", ta: "center", children: i18n._(
        /*i18n*/
        {
          id: "a77B6w"
        }
      ) })
    ] })
  ] }) });
};
export {
  OccurrenceAttendeesAndOrders as O,
  useDeleteEventOccurrence as a,
  buildBulkRescheduleTemplate as b,
  useReactivateOccurrence as c,
  OccurrenceEditModal as d,
  useCancelOccurrence as u
};

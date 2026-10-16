import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { NavLink, useParams } from "react-router";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { NumberInput, TextInput, Switch, ActionIcon, Collapse, Alert, Select, SegmentedControl, Button, MultiSelect, Drawer, CloseButton, Text, Skeleton, Badge, Tooltip, Progress, Group, Menu, Popover } from "@mantine/core";
import { IconTrash, IconTrashOff, IconChevronDown, IconTicket, IconShirt, IconPlus, IconAlignLeft, IconCalendar, IconEye, IconUsers, IconReceipt, IconShoppingCart, IconPuzzle, IconFlame, IconWorld, IconCaretUpFilled, IconCaretDownFilled, IconPackage, IconClock, IconLock, IconEyeOff, IconSparkles, IconCalendarEvent, IconDotsVertical, IconSend, IconPencil, IconCopyPlus, IconCategory } from "@tabler/icons-react";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { E as EventType, T as TaxAndFeeCalculationType, P as ProductPriceType, f as ProductType, a as TaxAndFeeType, M as MessageType } from "./types-CqPWB-a5.js";
import { useForm } from "@mantine/form";
import { Trans } from "@lingui/react";
import { C as Callout } from "./index-CwjvB_vn.js";
import { useState, useEffect, useMemo, useId } from "react";
import { a as getCurrencySymbol, f as formatCurrency } from "./currency-Br7a8J7F.js";
import { u as useGetEvent, G as GET_EVENT_QUERY_KEY } from "./useGetEvent-DyvalBPE.js";
import { u as useGetTaxesAndFees, C as CreateTaxOrFeeModal } from "./index-CRDLFx3A.js";
import { F as Fieldset } from "./index-DetjybmM.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import classNames from "classnames";
import { I as InputLabelWithHelp } from "./index-R0GQzPHn.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import dayjs from "dayjs";
import { b as getSafeLocale, l as localeFormats, n as nowInTimezone, u as utcToTz, r as relativeDate } from "./dates-CbVpwZeX.js";
import { g as getClientLocale, f as api, q as queryParamsHelper, p as queryClient } from "../entry.server.js";
import { modals } from "@mantine/modals";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { v as validateThemeSettings, c as computeThemeVariables } from "./themeUtils-B--ztbrW.js";
import { C as Constants, S as SelectProducts } from "./index-B4_wM3sm.js";
import { G as GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY, p as productCategoryClient, u as useGetEventProductCategories } from "./useGetProductCategories-BfShm84T.js";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { S as SendMessageModal } from "./index-7RPUkRz0.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { B as Button$1 } from "./index-hLKQavXc.js";
import { T as ToolBar, b as SearchBar } from "./index-D_nIRDTN.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { u as useUrlHash } from "./useUrlHash-BZci-yZ8.js";
import "./index-CV5KyLiQ.js";
import "./index-CoMrHZbF.js";
import "@mantine/notifications";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./order.client-BmBVeAyF.js";
import "./index-IzdRcWBR.js";
import "./waitlist.client-Dm8api1T.js";
import "./CheckoutThemeProvider-D0cdZ-GY.js";
import "./index-Bhmm_OXR.js";
import "./useWaitlistJoined-D2Jn2EfP.js";
import "./iframeResize-DUQclS7o.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./useCheckoutPrefill-DziFYvxr.js";
import "./useGetAccount-CGfwRfDK.js";
import "./useGetEventOccurrences-Ch0XNQBq.js";
const priceTierCard = "_priceTierCard_7gi76_1";
const removeTier = "_removeTier_7gi76_14";
const disabled = "_disabled_7gi76_21";
const priceTiers = "_priceTiers_7gi76_25";
const addTierButton = "_addTierButton_7gi76_25";
const typeCards = "_typeCards_7gi76_29";
const typeCard = "_typeCard_7gi76_29";
const selected = "_selected_7gi76_53";
const typeCardIcon = "_typeCardIcon_7gi76_57";
const typeCardText = "_typeCardText_7gi76_71";
const typeCardLabel = "_typeCardLabel_7gi76_77";
const typeCardDescription = "_typeCardDescription_7gi76_82";
const priceBlock = "_priceBlock_7gi76_87";
const priceBlockHeader = "_priceBlockHeader_7gi76_91";
const priceBlockLabel = "_priceBlockLabel_7gi76_100";
const ledger = "_ledger_7gi76_105";
const ledgerHeading = "_ledgerHeading_7gi76_109";
const ledgerRow = "_ledgerRow_7gi76_118";
const ledgerRowButton = "_ledgerRowButton_7gi76_125";
const ledgerRowIcon = "_ledgerRowIcon_7gi76_147";
const ledgerRowLabel = "_ledgerRowLabel_7gi76_153";
const ledgerRowSummary = "_ledgerRowSummary_7gi76_159";
const emphasized = "_emphasized_7gi76_170";
const ledgerRowChevron = "_ledgerRowChevron_7gi76_175";
const open = "_open_7gi76_181";
const ledgerRowContent = "_ledgerRowContent_7gi76_185";
const switchStack = "_switchStack_7gi76_189";
const fieldHint = "_fieldHint_7gi76_195";
const addTaxFeeButton = "_addTaxFeeButton_7gi76_201";
const classes$3 = {
  priceTierCard,
  removeTier,
  disabled,
  priceTiers,
  addTierButton,
  typeCards,
  typeCard,
  selected,
  typeCardIcon,
  typeCardText,
  typeCardLabel,
  typeCardDescription,
  priceBlock,
  priceBlockHeader,
  priceBlockLabel,
  ledger,
  ledgerHeading,
  ledgerRow,
  ledgerRowButton,
  ledgerRowIcon,
  ledgerRowLabel,
  ledgerRowSummary,
  emphasized,
  ledgerRowChevron,
  open,
  ledgerRowContent,
  switchStack,
  fieldHint,
  addTaxFeeButton
};
const hasQuantityValue = (value) => value !== void 0 && value !== null && value !== "";
const SeriesQuantityWarning = ({
  eventId
}) => /* @__PURE__ */ jsx(Callout, { variant: "warning", style: {
  marginBottom: 20
}, children: /* @__PURE__ */ jsx(Trans, { id: "5DpZrC", components: {
  0: /* @__PURE__ */ jsx(NavLink, { to: `/manage/event/${eventId}/occurrences` })
} }) });
const ProductPriceTierForm = ({
  form,
  product,
  event
}) => {
  var _a, _b;
  const isRecurringTicket = (event == null ? void 0 : event.type) === EventType.RECURRING && form.values.product_type === "TICKET";
  return (_b = (_a = form == null ? void 0 : form.values) == null ? void 0 : _a.prices) == null ? void 0 : _b.map((price, index) => {
    var _a2, _b2, _c;
    const existingPrice = (_a2 = product == null ? void 0 : product.prices) == null ? void 0 : _a2.find((p) => Number(p.id) === Number(price.id));
    const deleteDisabled = ((_c = (_b2 = form == null ? void 0 : form.values) == null ? void 0 : _b2.prices) == null ? void 0 : _c.length) === 1 || existingPrice && Number(existingPrice == null ? void 0 : existingPrice.quantity_sold) > 0;
    const cannotDeleteTitle = (() => {
      var _a3, _b3;
      if (existingPrice && Number(existingPrice == null ? void 0 : existingPrice.quantity_sold) > 0) {
        return i18n._(
          /*i18n*/
          {
            id: "6uwAvx"
          }
        );
      }
      if (((_b3 = (_a3 = form == null ? void 0 : form.values) == null ? void 0 : _a3.prices) == null ? void 0 : _b3.length) === 1) {
        return i18n._(
          /*i18n*/
          {
            id: "jE4Z8R"
          }
        );
      }
      return "";
    })();
    return /* @__PURE__ */ jsxs(Card, { className: classes$3.priceTierCard, children: [
      /* @__PURE__ */ jsx("h3", { children: price.label || /* @__PURE__ */ jsx(Trans, { id: "xN9AhL", values: {
        0: index + 1
      } }) }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(NumberInput, { decimalScale: 2, min: 0, fixedDecimalScale: true, leftSection: (event == null ? void 0 : event.currency) ? getCurrencySymbol(event.currency) : "", ...form.getInputProps(`prices.${index}.price`), label: i18n._(
          /*i18n*/
          {
            id: "a7u1N9"
          }
        ), placeholder: "19.99" }),
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps(`prices.${index}.label`), label: i18n._(
          /*i18n*/
          {
            id: "87a/t/"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "7Cx5It"
          }
        ), required: true })
      ] }),
      /* @__PURE__ */ jsx(NumberInput, { placeholder: i18n._(
        /*i18n*/
        {
          id: "NIuIk1"
        }
      ), ...form.getInputProps(`prices.${index}.initial_quantity_available`), label: isRecurringTicket ? i18n._(
        /*i18n*/
        {
          id: "2AW/k5"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "LkMOWF"
        }
      ) }),
      !product && isRecurringTicket && hasQuantityValue(price.initial_quantity_available) && /* @__PURE__ */ jsx(SeriesQuantityWarning, { eventId: event == null ? void 0 : event.id }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps(`prices.${index}.sale_start_date`), label: i18n._(
          /*i18n*/
          {
            id: "Qm5XkZ"
          }
        ) }),
        /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps(`prices.${index}.sale_end_date`), label: i18n._(
          /*i18n*/
          {
            id: "ELa4O9"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Switch, { mt: 10, description: i18n._(
        /*i18n*/
        {
          id: "lNipG+"
        }
      ), ...form.getInputProps(`prices.${index}.is_hidden`, {
        type: "checkbox"
      }), label: i18n._(
        /*i18n*/
        {
          id: "fvDQhr"
        }
      ) }),
      /* @__PURE__ */ jsxs(ActionIcon, { variant: "light", className: classNames([classes$3.removeTier, deleteDisabled && classes$3.disabled]), title: cannotDeleteTitle, onClick: () => {
        if (deleteDisabled) {
          showError(cannotDeleteTitle);
          return;
        }
        form.removeListItem("prices", index);
      }, children: [
        !deleteDisabled && /* @__PURE__ */ jsx(IconTrash, { size: "1rem" }),
        deleteDisabled && /* @__PURE__ */ jsx(IconTrashOff, { size: "1rem" })
      ] })
    ] }, `price-${index}`);
  });
};
const LedgerRow = ({
  id,
  icon,
  label,
  summary,
  opened,
  onToggle,
  children
}) => {
  const contentId = `product-ledger-content-${id}`;
  return /* @__PURE__ */ jsxs("div", { className: classes$3.ledgerRow, id: `product-ledger-row-${id}`, children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: classes$3.ledgerRowButton, "aria-expanded": opened, "aria-controls": contentId, "data-testid": `product-ledger-${id}`, onClick: () => onToggle(id), children: [
      /* @__PURE__ */ jsx("span", { className: classes$3.ledgerRowIcon, children: icon }),
      /* @__PURE__ */ jsx("span", { className: classes$3.ledgerRowLabel, children: label }),
      !opened && /* @__PURE__ */ jsx("span", { className: classNames(classes$3.ledgerRowSummary, summary.emphasized && classes$3.emphasized), children: summary.text }),
      /* @__PURE__ */ jsx(IconChevronDown, { size: 16, className: classNames(classes$3.ledgerRowChevron, opened && classes$3.open) })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { expanded: opened, children: /* @__PURE__ */ jsx("div", { id: contentId, className: classes$3.ledgerRowContent, children }) })
  ] });
};
const hasValue$1 = (value) => value !== void 0 && value !== null && value !== "";
const formatLocalDateTime = (value) => {
  const locale = getSafeLocale(getClientLocale());
  return dayjs(value).locale(locale).format(localeFormats[locale].dayMonthTime);
};
const descriptionSummary = (values) => {
  const plainText = (values.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!plainText) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "ACaDVQ"
        }
      ),
      emphasized: false
    };
  }
  return {
    text: plainText.length > 40 ? plainText.slice(0, 40) + "…" : plainText,
    emphasized: true
  };
};
const saleWindowSummary = (values) => {
  const start = hasValue$1(values.sale_start_date) ? formatLocalDateTime(values.sale_start_date) : void 0;
  const end = hasValue$1(values.sale_end_date) ? formatLocalDateTime(values.sale_end_date) : void 0;
  if (start && end) {
    return {
      text: `${start} → ${end}`,
      emphasized: true
    };
  }
  if (start) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "+dBe1R",
          values: {
            start
          }
        }
      ),
      emphasized: true
    };
  }
  if (end) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "NaeLn8",
          values: {
            end
          }
        }
      ),
      emphasized: true
    };
  }
  return {
    text: i18n._(
      /*i18n*/
      {
        id: "rrepBD"
      }
    ),
    emphasized: !!values.hide_before_sale_start_date || !!values.hide_after_sale_end_date
  };
};
const eventPageSummary = (values) => {
  const parts = [values.show_quantity_remaining && i18n._(
    /*i18n*/
    {
      id: "lbfXEJ"
    }
  ), values.hide_when_sold_out && i18n._(
    /*i18n*/
    {
      id: "LLt2UT"
    }
  ), values.start_collapsed && i18n._(
    /*i18n*/
    {
      id: "DACR+e"
    }
  )].filter(Boolean);
  if (parts.length === 0) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "3Biswm"
        }
      ),
      emphasized: false
    };
  }
  return {
    text: parts.join(" · "),
    emphasized: true
  };
};
const waitlistSummary = (values) => {
  if (values.waitlist_enabled) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "Z5HWHd"
        }
      ),
      emphasized: true
    };
  }
  return {
    text: i18n._(
      /*i18n*/
      {
        id: "az8lvo"
      }
    ),
    emphasized: false
  };
};
const taxAndFeeLabel = (item, currency) => {
  return item.name + " - " + (item.calculation_type === TaxAndFeeCalculationType.Percentage ? item.rate + "%" : formatCurrency(Number(item.rate), currency || "USD"));
};
const taxesSummary = (values, taxesAndFees, currency) => {
  const selected2 = (taxesAndFees || []).filter((item) => (values.tax_and_fee_ids || []).map(String).includes(String(item.id)));
  if (selected2.length === 0) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "EdQY6l"
        }
      ),
      emphasized: false
    };
  }
  const first = taxAndFeeLabel(selected2[0], currency);
  if (selected2.length === 1) {
    return {
      text: first,
      emphasized: true
    };
  }
  const additionalCount = selected2.length - 1;
  return {
    text: i18n._(
      /*i18n*/
      {
        id: "SqGPxF",
        values: {
          first,
          additionalCount
        }
      }
    ),
    emphasized: true
  };
};
const orderLimitsSummary = (values) => {
  const min = hasValue$1(values.min_per_order) ? Number(values.min_per_order) : void 0;
  const max = hasValue$1(values.max_per_order) ? Number(values.max_per_order) : void 0;
  const emphasized2 = min !== void 0 && min !== 1 || max !== void 0 && max !== 100;
  if (min !== void 0 && max !== void 0) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "LJE+5t",
          values: {
            min,
            max
          }
        }
      ),
      emphasized: emphasized2
    };
  }
  if (min !== void 0) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "/VRn+9",
          values: {
            min
          }
        }
      ),
      emphasized: emphasized2
    };
  }
  if (max !== void 0) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "0bT1FT",
          values: {
            max
          }
        }
      ),
      emphasized: emphasized2
    };
  }
  return {
    text: i18n._(
      /*i18n*/
      {
        id: "N+9Onb"
      }
    ),
    emphasized: false
  };
};
const addonsSummary = (values) => {
  var _a;
  const count = ((_a = values.addon_product_ids) == null ? void 0 : _a.length) || 0;
  const parts = [count === 1 ? i18n._(
    /*i18n*/
    {
      id: "hMefp0"
    }
  ) : count > 1 ? i18n._(
    /*i18n*/
    {
      id: "wYzVwE",
      values: {
        count
      }
    }
  ) : void 0, values.is_addon_only ? i18n._(
    /*i18n*/
    {
      id: "6JzKEV"
    }
  ) : void 0].filter(Boolean);
  if (parts.length === 0) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "EdQY6l"
        }
      ),
      emphasized: false
    };
  }
  return {
    text: parts.join(" · "),
    emphasized: true
  };
};
const highlightSummary = (values) => {
  if (!values.is_highlighted) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "az8lvo"
        }
      ),
      emphasized: false
    };
  }
  return {
    text: values.highlight_message ? `“${values.highlight_message}”` : i18n._(
      /*i18n*/
      {
        id: "7ER2sc"
      }
    ),
    emphasized: true
  };
};
const accessSummary = (values) => {
  if (values.is_hidden) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "9zfvsx"
        }
      ),
      emphasized: true
    };
  }
  if (values.is_hidden_without_promo_code) {
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "dIodJL"
        }
      ),
      emphasized: true
    };
  }
  return {
    text: i18n._(
      /*i18n*/
      {
        id: "7d1a0d"
      }
    ),
    emphasized: false
  };
};
const LEDGER_ROW_ORDER = ["description", "sale-window", "event-page", "waitlist", "taxes", "order-limits", "addons", "highlight", "access"];
const FIELD_TO_LEDGER_ROW = [[/^description$/, "description"], [/^(sale_start_date|sale_end_date|hide_before_sale_start_date|hide_after_sale_end_date)$/, "sale-window"], [/^(show_quantity_remaining|hide_when_sold_out|start_collapsed)$/, "event-page"], [/^waitlist_enabled$/, "waitlist"], [/^tax_and_fee_ids/, "taxes"], [/^(min_per_order|max_per_order)$/, "order-limits"], [/^(addon_product_ids|is_addon_only)$/, "addons"], [/^(is_highlighted|highlight_message)$/, "highlight"], [/^(is_hidden|is_hidden_without_promo_code)$/, "access"]];
const ProductForm = ({
  form,
  product
}) => {
  var _a, _b, _c, _d, _e;
  const {
    eventId
  } = useParams();
  const [openRows, setOpenRows] = useState(/* @__PURE__ */ new Set());
  const [taxFeeModalOpen, {
    open: openTaxFeeModal,
    close: closeTaxFeeModal
  }] = useDisclosure(false);
  const isFreeProduct = form.values.type === "FREE";
  const isDonationProduct = form.values.type === "DONATION";
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: taxesAndFees
  } = useGetTaxesAndFees();
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const isRecurringTicket = isRecurring && form.values.product_type === "TICKET";
  const typeLocked = Number(product == null ? void 0 : product.quantity_sold) > 0;
  const handleTaxOrFeeCreated = (taxOrFee) => {
    const currentIds = form.values.tax_and_fee_ids || [];
    form.setFieldValue("tax_and_fee_ids", [...currentIds, String(taxOrFee.id)]);
  };
  const taxAndFeeOptions = (type) => {
    var _a2;
    return ((_a2 = taxesAndFees == null ? void 0 : taxesAndFees.data) == null ? void 0 : _a2.filter((item) => item.type === type).map((item) => ({
      label: taxAndFeeLabel(item, event == null ? void 0 : event.currency),
      value: String(item.id)
    }))) || [];
  };
  useEffect(() => {
    if (form.values.type === ProductPriceType.Free && form.values.price !== 0) {
      form.setFieldValue("price", 0);
    }
  }, [form.values.type, form.values.price]);
  useEffect(() => {
    if ((event == null ? void 0 : event.product_categories) && event.product_categories.length === 1) {
      const categoryId = String(event.product_categories[0].id);
      if (form.values.product_category_id !== categoryId) {
        form.setFieldValue("product_category_id", categoryId);
        form.resetDirty();
      }
    }
  }, [event == null ? void 0 : event.product_categories]);
  useEffect(() => {
    const errorRows = /* @__PURE__ */ new Set();
    Object.keys(form.errors).forEach((field) => {
      const match = FIELD_TO_LEDGER_ROW.find(([pattern]) => pattern.test(field));
      if (match) {
        errorRows.add(match[1]);
      }
    });
    if (errorRows.size === 0) {
      return;
    }
    setOpenRows((previous) => /* @__PURE__ */ new Set([...previous, ...errorRows]));
    const firstErrorRow = LEDGER_ROW_ORDER.find((rowId) => errorRows.has(rowId));
    if (firstErrorRow) {
      requestAnimationFrame(() => {
        var _a2;
        (_a2 = document.getElementById(`product-ledger-row-${firstErrorRow}`)) == null ? void 0 : _a2.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      });
    }
  }, [form.errors]);
  const toggleRow = (rowId) => {
    setOpenRows((previous) => {
      const next = new Set(previous);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };
  const removeTaxesAndFees = () => {
    form.setFieldValue("tax_and_fee_ids", []);
  };
  const showCategorySelect = (((_a = event == null ? void 0 : event.product_categories) == null ? void 0 : _a.length) ?? 0) >= 2;
  const nameInput = /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("title"), label: i18n._(
    /*i18n*/
    {
      id: "6YtxFj"
    }
  ), placeholder: form.values.product_type === "TICKET" ? i18n._(
    /*i18n*/
    {
      id: "tF+VVr"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "uRfugr"
    }
  ), required: true });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    typeLocked && /* @__PURE__ */ jsx(Callout, { variant: "info", children: i18n._(
      /*i18n*/
      {
        id: "Gnjf3o"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { role: "radiogroup", "aria-label": i18n._(
      /*i18n*/
      {
        id: "sJsr1h"
      }
    ), "aria-required": true, className: classes$3.typeCards, children: [{
      value: ProductType.Ticket,
      icon: /* @__PURE__ */ jsx(IconTicket, { size: 20 }),
      label: i18n._(
        /*i18n*/
        {
          id: "kjAL4v"
        }
      ),
      description: i18n._(
        /*i18n*/
        {
          id: "tlFYEo"
        }
      ),
      testId: "product-type-ticket"
    }, {
      value: ProductType.General,
      icon: /* @__PURE__ */ jsx(IconShirt, { size: 20 }),
      label: i18n._(
        /*i18n*/
        {
          id: "K47k8R"
        }
      ),
      description: i18n._(
        /*i18n*/
        {
          id: "jGR53C"
        }
      ),
      testId: "product-type-general"
    }].map((option) => /* @__PURE__ */ jsxs("button", { type: "button", role: "radio", "aria-checked": form.values.product_type === option.value, className: classNames(classes$3.typeCard, form.values.product_type === option.value && classes$3.selected), disabled: typeLocked, "data-testid": option.testId, onClick: () => form.setFieldValue("product_type", option.value), children: [
      /* @__PURE__ */ jsx("span", { className: classes$3.typeCardIcon, children: option.icon }),
      /* @__PURE__ */ jsxs("span", { className: classes$3.typeCardText, children: [
        /* @__PURE__ */ jsx("span", { className: classes$3.typeCardLabel, children: option.label }),
        /* @__PURE__ */ jsx("span", { className: classes$3.typeCardDescription, children: option.description })
      ] })
    ] }, option.value)) }),
    form.errors.product_type && /* @__PURE__ */ jsx(Alert, { title: i18n._(
      /*i18n*/
      {
        id: "sJsr1h"
      }
    ), mb: 20, color: "red", children: form.errors.product_type }),
    showCategorySelect ? /* @__PURE__ */ jsxs(InputGroup, { children: [
      nameInput,
      /* @__PURE__ */ jsx(Select, { ...form.getInputProps("product_category_id"), label: /* @__PURE__ */ jsx(InputLabelWithHelp, { label: i18n._(
        /*i18n*/
        {
          id: "1JwlHk"
        }
      ), helpText: i18n._(
        /*i18n*/
        {
          id: "iS0wAT"
        }
      ) }), placeholder: i18n._(
        /*i18n*/
        {
          id: "9FQEn8"
        }
      ), data: (_b = event == null ? void 0 : event.product_categories) == null ? void 0 : _b.map((category) => ({
        value: String(category.id),
        label: category.name
      })) })
    ] }) : nameInput,
    /* @__PURE__ */ jsxs("div", { className: classes$3.priceBlock, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$3.priceBlockHeader, children: [
        /* @__PURE__ */ jsx("span", { className: classes$3.priceBlockLabel, children: i18n._(
          /*i18n*/
          {
            id: "aHCEmh"
          }
        ) }),
        /* @__PURE__ */ jsx(SegmentedControl, { size: "xs", value: form.values.type, onChange: (value) => form.setFieldValue("type", value), disabled: typeLocked, "data-testid": "product-price-type", data: [{
          label: i18n._(
            /*i18n*/
            {
              id: "v4nCHK"
            }
          ),
          value: ProductPriceType.Paid
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "2POOFK"
            }
          ),
          value: ProductPriceType.Free
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "AXXqG+"
            }
          ),
          value: ProductPriceType.Donation
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "4/dG8J"
            }
          ),
          value: ProductPriceType.Tiered
        }] })
      ] }),
      form.errors.type && /* @__PURE__ */ jsx(Alert, { title: i18n._(
        /*i18n*/
        {
          id: "4Y2FZT"
        }
      ), mb: 20, color: "red", children: form.errors.type }),
      form.values.type !== ProductPriceType.Tiered && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(NumberInput, { decimalScale: 2, min: 0, fixedDecimalScale: true, disabled: isFreeProduct, leftSection: (event == null ? void 0 : event.currency) ? getCurrencySymbol(event.currency) : "", ...form.getInputProps("prices.0.price"), label: /* @__PURE__ */ jsx(InputLabelWithHelp, { label: isDonationProduct ? i18n._(
            /*i18n*/
            {
              id: "QYcUEf"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "a7u1N9"
            }
          ), helpText: /* @__PURE__ */ jsx(Trans, { id: "qnSLLW", components: {
            0: /* @__PURE__ */ jsx("p", {}),
            1: /* @__PURE__ */ jsx("p", {})
          } }) }), placeholder: "19.99" }),
          /* @__PURE__ */ jsx(NumberInput, { min: 0, placeholder: i18n._(
            /*i18n*/
            {
              id: "NIuIk1"
            }
          ), ...form.getInputProps("prices.0.initial_quantity_available"), label: /* @__PURE__ */ jsx(InputLabelWithHelp, { label: isRecurringTicket ? i18n._(
            /*i18n*/
            {
              id: "2AW/k5"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "LkMOWF"
            }
          ), helpText: isRecurringTicket ? /* @__PURE__ */ jsx(Trans, { id: "Il5Uid", components: {
            0: /* @__PURE__ */ jsx("p", {}),
            1: /* @__PURE__ */ jsx(NavLink, { to: `/manage/event/${eventId}/occurrences` })
          } }) : /* @__PURE__ */ jsx(Trans, { id: "ZjMs6e", components: {
            0: /* @__PURE__ */ jsx("p", {}),
            1: /* @__PURE__ */ jsx("p", {}),
            2: /* @__PURE__ */ jsx("a", { target: "__blank", href: "capacity-assignments" })
          } }) }) })
        ] }),
        !product && isRecurringTicket && hasQuantityValue((_d = (_c = form.values.prices) == null ? void 0 : _c[0]) == null ? void 0 : _d.initial_quantity_available) && /* @__PURE__ */ jsx(SeriesQuantityWarning, { eventId })
      ] }),
      form.values.type === ProductPriceType.Tiered && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Callout, { variant: "info", title: i18n._(
          /*i18n*/
          {
            id: "xgL50q"
          }
        ), children: /* @__PURE__ */ jsx(Trans, { id: "8wITQA" }) }),
        /* @__PURE__ */ jsxs(Fieldset, { legend: i18n._(
          /*i18n*/
          {
            id: "a5jvSX"
          }
        ), mt: 20, mb: 20, children: [
          isRecurring && /* @__PURE__ */ jsx(Callout, { variant: "info", style: {
            marginBottom: 10
          }, children: /* @__PURE__ */ jsx(Trans, { id: "6eaLu/", components: {
            0: /* @__PURE__ */ jsx(NavLink, { to: `/manage/event/${eventId}/occurrences` })
          } }) }),
          /* @__PURE__ */ jsxs("div", { className: classes$3.priceTiers, children: [
            /* @__PURE__ */ jsx(ProductPriceTierForm, { product, form, event }),
            /* @__PURE__ */ jsx(Button, { className: classes$3.addTierButton, size: "xs", variant: "light", "data-testid": "product-add-tier-button", leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 14 }), onClick: () => form.insertListItem("prices", {
              price: 0,
              label: void 0,
              sale_end_date: void 0,
              sale_start_date: void 0
            }), children: i18n._(
              /*i18n*/
              {
                id: "goOKRY"
              }
            ) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.ledger, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.ledgerHeading, children: i18n._(
        /*i18n*/
        {
          id: "hHTPiT"
        }
      ) }),
      /* @__PURE__ */ jsx(LedgerRow, { id: "description", icon: /* @__PURE__ */ jsx(IconAlignLeft, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "Nu4oKW"
        }
      ), summary: descriptionSummary(form.values), opened: openRows.has("description"), onToggle: toggleRow, children: /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "Nu4oKW"
        }
      ), value: form.values.description || "", onChange: (value) => form.setFieldValue("description", value), error: form.errors.description }) }),
      /* @__PURE__ */ jsxs(LedgerRow, { id: "sale-window", icon: /* @__PURE__ */ jsx(IconCalendar, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "7s8z0X"
        }
      ), summary: saleWindowSummary(form.values), opened: openRows.has("sale-window"), onToggle: toggleRow, children: [
        isRecurring && /* @__PURE__ */ jsx(Callout, { variant: "info", style: {
          marginBottom: 10
        }, children: /* @__PURE__ */ jsx(Trans, { id: "qi81Jg", components: {
          0: /* @__PURE__ */ jsx(NavLink, { to: `/manage/event/${eventId}/occurrences` })
        } }) }),
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("sale_start_date"), label: i18n._(
            /*i18n*/
            {
              id: "Qm5XkZ"
            }
          ) }),
          /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("sale_end_date"), label: i18n._(
            /*i18n*/
            {
              id: "ELa4O9"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("hide_before_sale_start_date", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "06s3w3"
          }
        ), description: isRecurring ? i18n._(
          /*i18n*/
          {
            id: "hviJef"
          }
        ) : void 0 }),
        /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("hide_after_sale_end_date", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "YHsF9c"
          }
        ), description: isRecurring ? i18n._(
          /*i18n*/
          {
            id: "hviJef"
          }
        ) : void 0 })
      ] }),
      /* @__PURE__ */ jsx(LedgerRow, { id: "event-page", icon: /* @__PURE__ */ jsx(IconEye, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "2eFltz"
        }
      ), summary: eventPageSummary(form.values), opened: openRows.has("event-page"), onToggle: toggleRow, children: /* @__PURE__ */ jsxs("div", { className: classes$3.switchStack, children: [
        /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("show_quantity_remaining", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "V0SbFp"
          }
        ) }),
        /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("hide_when_sold_out", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "ySQGHV"
          }
        ) }),
        /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("start_collapsed", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "oqr9HB"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(LedgerRow, { id: "waitlist", icon: /* @__PURE__ */ jsx(IconUsers, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "u0n+wz"
        }
      ), summary: waitlistSummary(form.values), opened: openRows.has("waitlist"), onToggle: toggleRow, children: /* @__PURE__ */ jsx(Switch, { description: isRecurring ? i18n._(
        /*i18n*/
        {
          id: "4CMO/q"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "F3mW5G"
        }
      ), ...form.getInputProps(`waitlist_enabled`, {
        type: "checkbox"
      }), label: i18n._(
        /*i18n*/
        {
          id: "7dSOhU"
        }
      ) }) }),
      /* @__PURE__ */ jsxs(LedgerRow, { id: "taxes", icon: /* @__PURE__ */ jsx(IconReceipt, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "QC3FVX"
        }
      ), summary: taxesSummary(form.values, taxesAndFees == null ? void 0 : taxesAndFees.data, event == null ? void 0 : event.currency), opened: openRows.has("taxes"), onToggle: toggleRow, children: [
        /* @__PURE__ */ jsx(MultiSelect, { ...form.getInputProps("tax_and_fee_ids"), label: i18n._(
          /*i18n*/
          {
            id: "qu6/03"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "O/7I0o"
          }
        ), data: [{
          group: i18n._(
            /*i18n*/
            {
              id: "ZowkxF"
            }
          ),
          items: taxAndFeeOptions(TaxAndFeeType.Tax)
        }, {
          group: i18n._(
            /*i18n*/
            {
              id: "/mfICu"
            }
          ),
          items: taxAndFeeOptions(TaxAndFeeType.Fee)
        }] }),
        /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 14 }), onClick: openTaxFeeModal, className: classes$3.addTaxFeeButton, children: i18n._(
          /*i18n*/
          {
            id: "UKfi21"
          }
        ) }),
        form.values.type === ProductPriceType.Free && !!((_e = form.values.tax_and_fee_ids) == null ? void 0 : _e.length) && /* @__PURE__ */ jsxs(Callout, { variant: "info", style: {
          marginTop: 15
        }, children: [
          /* @__PURE__ */ jsx("p", { children: i18n._(
            /*i18n*/
            {
              id: "casL1O"
            }
          ) }),
          /* @__PURE__ */ jsx(Button, { onClick: removeTaxesAndFees, size: "xs", children: i18n._(
            /*i18n*/
            {
              id: "QcwyCh"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(LedgerRow, { id: "order-limits", icon: /* @__PURE__ */ jsx(IconShoppingCart, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "m8vQEP"
        }
      ), summary: orderLimitsSummary(form.values), opened: openRows.has("order-limits"), onToggle: toggleRow, children: /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(NumberInput, { ...form.getInputProps("min_per_order"), label: i18n._(
          /*i18n*/
          {
            id: "xFRMlO"
          }
        ), placeholder: "1" }),
        /* @__PURE__ */ jsx(NumberInput, { ...form.getInputProps("max_per_order"), label: i18n._(
          /*i18n*/
          {
            id: "g9dPPQ"
          }
        ), placeholder: "10" })
      ] }) }),
      /* @__PURE__ */ jsxs(LedgerRow, { id: "addons", icon: /* @__PURE__ */ jsx(IconPuzzle, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "Y2K3rp"
        }
      ), summary: addonsSummary(form.values), opened: openRows.has("addons"), onToggle: toggleRow, children: [
        /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("is_addon_only", {
          type: "checkbox"
        }), onChange: (changeEvent) => {
          form.setFieldValue("is_addon_only", changeEvent.currentTarget.checked);
          if (changeEvent.currentTarget.checked) {
            form.setFieldValue("addon_product_ids", []);
          }
        }, label: i18n._(
          /*i18n*/
          {
            id: "tnx0u1"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "4PDH+K"
          }
        ) }),
        !form.values.is_addon_only && /* @__PURE__ */ jsxs("div", { style: {
          marginTop: 15
        }, children: [
          /* @__PURE__ */ jsx(ProductSelector, { label: i18n._(
            /*i18n*/
            {
              id: "VkQex5"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "DHBGUX"
            }
          ), icon: /* @__PURE__ */ jsx(IconPuzzle, { size: 16 }), productCategories: (event == null ? void 0 : event.product_categories) || [], form, productFieldName: "addon_product_ids", excludedProductIds: (product == null ? void 0 : product.id) ? [product.id] : [], noProductsMessage: i18n._(
            /*i18n*/
            {
              id: "abGAgf"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: classes$3.fieldHint, children: i18n._(
            /*i18n*/
            {
              id: "DkL8mp"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(LedgerRow, { id: "highlight", icon: /* @__PURE__ */ jsx(IconFlame, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "gtEbeW"
        }
      ), summary: highlightSummary(form.values), opened: openRows.has("highlight"), onToggle: toggleRow, children: [
        /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("is_highlighted", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "MXSqmS"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "sq7vjE"
          }
        ) }),
        form.values.is_highlighted && /* @__PURE__ */ jsx(TextInput, { mt: 15, ...form.getInputProps("highlight_message"), label: i18n._(
          /*i18n*/
          {
            id: "NF8sdv"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "eusccx"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "j9b/iy"
          }
        ), maxLength: 255 })
      ] }),
      /* @__PURE__ */ jsx(LedgerRow, { id: "access", icon: /* @__PURE__ */ jsx(IconWorld, { size: 16 }), label: i18n._(
        /*i18n*/
        {
          id: "LuXP9q"
        }
      ), summary: accessSummary(form.values), opened: openRows.has("access"), onToggle: toggleRow, children: /* @__PURE__ */ jsxs("div", { className: classes$3.switchStack, children: [
        /* @__PURE__ */ jsx(Switch, { description: /* @__PURE__ */ jsxs(Fragment, { children: [
          i18n._(
            /*i18n*/
            {
              id: "sdB7+6"
            }
          ),
          /* @__PURE__ */ jsx(NavLink, { target: "_blank", to: "../promo-codes", children: i18n._(
            /*i18n*/
            {
              id: "yKWfjC"
            }
          ) })
        ] }), ...form.getInputProps("is_hidden_without_promo_code", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "axVMjA"
          }
        ) }),
        /* @__PURE__ */ jsx(Switch, { description: i18n._(
          /*i18n*/
          {
            id: "i0TtkR"
          }
        ), ...form.getInputProps(`is_hidden`, {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "5xR17G"
          }
        ) })
      ] }) })
    ] }),
    taxFeeModalOpen && /* @__PURE__ */ jsx(CreateTaxOrFeeModal, { onClose: closeTaxFeeModal, onCreated: handleTaxOrFeeCreated })
  ] });
};
const sumForType = (taxesAndFees, type, basePrice) => {
  return taxesAndFees.filter((item) => item.type === type).reduce((total, item) => {
    if (item.calculation_type === TaxAndFeeCalculationType.Percentage) {
      return total + basePrice * Number(item.rate || 0) / 100;
    }
    return total + Number(item.rate || 0);
  }, 0);
};
const buildPreviewPrice = (id, price, selectedTaxesAndFees, overrides = {}) => ({
  id,
  price,
  is_available: true,
  is_sold_out: false,
  quantity_remaining: 100,
  tax_total: Number(sumForType(selectedTaxesAndFees, TaxAndFeeType.Tax, price).toFixed(2)),
  fee_total: Number(sumForType(selectedTaxesAndFees, TaxAndFeeType.Fee, price).toFixed(2)),
  ...overrides
});
const buildPreviewPrices = (values, selectedTaxesAndFees, nowInEventTz) => {
  var _a, _b;
  if (values.type === ProductPriceType.Tiered) {
    const tiers = values.prices || [];
    const visibleTiers = tiers.filter((tier) => !tier.is_hidden);
    return (visibleTiers.length > 0 ? visibleTiers : tiers).map((tier, index) => {
      const isBeforeSaleStart = !!tier.sale_start_date && String(tier.sale_start_date) > nowInEventTz;
      const isAfterSaleEnd = !!tier.sale_end_date && String(tier.sale_end_date) < nowInEventTz;
      return buildPreviewPrice(index + 1, Number(tier.price || 0), selectedTaxesAndFees, {
        label: tier.label || i18n._(
          /*i18n*/
          {
            id: "xN9AhL",
            values: {
              0: index + 1
            }
          }
        ),
        is_available: !isBeforeSaleStart && !isAfterSaleEnd,
        is_before_sale_start_date: isBeforeSaleStart,
        is_after_sale_end_date: isAfterSaleEnd
      });
    });
  }
  const basePrice = values.type === ProductPriceType.Free ? 0 : Number(((_b = (_a = values.prices) == null ? void 0 : _a[0]) == null ? void 0 : _b.price) || 0);
  return [buildPreviewPrice(1, basePrice, selectedTaxesAndFees)];
};
const previewQuantityAvailable = (values) => {
  var _a;
  if (!values.show_quantity_remaining) {
    return void 0;
  }
  const quantities = (values.type === ProductPriceType.Tiered ? values.prices || [] : [(_a = values.prices) == null ? void 0 : _a[0]]).map((price) => price == null ? void 0 : price.initial_quantity_available).filter((quantity) => quantity !== void 0 && quantity !== null && String(quantity) !== "");
  if (quantities.length === 0) {
    return Constants.INFINITE_TICKETS;
  }
  return quantities.reduce((total, quantity) => total + Number(quantity), 0);
};
const buildPreviewEvent = (event, values, nowInEventTz, taxesAndFees, settings) => {
  var _a, _b, _c, _d;
  const selectedTaxesAndFees = (taxesAndFees || []).filter((item) => (values.tax_and_fee_ids || []).map(String).includes(String(item.id)));
  const prices = buildPreviewPrices(values, selectedTaxesAndFees, nowInEventTz);
  const previewProduct = {
    id: -1,
    title: ((_a = values.title) == null ? void 0 : _a.trim()) || (values.product_type === ProductType.General ? i18n._(
      /*i18n*/
      {
        id: "ZIb6rJ"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "crJM8s"
      }
    )),
    description: values.description,
    type: values.type,
    product_type: values.product_type,
    price: (_b = prices[0]) == null ? void 0 : _b.price,
    prices,
    min_per_order: values.min_per_order ? Number(values.min_per_order) : void 0,
    max_per_order: values.max_per_order ? Number(values.max_per_order) : void 0,
    start_collapsed: values.start_collapsed,
    show_quantity_remaining: values.show_quantity_remaining,
    quantity_available: previewQuantityAvailable(values),
    is_highlighted: values.is_highlighted,
    highlight_message: values.highlight_message,
    waitlist_enabled: false,
    is_available: true,
    is_sold_out: false,
    taxes: selectedTaxesAndFees
  };
  const categoryName = (_d = (_c = event.product_categories) == null ? void 0 : _c.find((category) => String(category.id) === String(values.product_category_id))) == null ? void 0 : _d.name;
  return {
    ...event,
    type: EventType.SINGLE,
    occurrences: [],
    settings: settings || event.settings,
    product_categories: [{
      id: -1,
      name: categoryName || i18n._(
        /*i18n*/
        {
          id: "6GQNLE"
        }
      ),
      products: [previewProduct]
    }]
  };
};
const hasValue = (value) => value !== void 0 && value !== null && value !== "";
const computeVisibilityStatus = (values, nowInEventTz) => {
  if (values.is_hidden) {
    return {
      level: "hidden",
      message: i18n._(
        /*i18n*/
        {
          id: "nMfkJW"
        }
      )
    };
  }
  if (values.is_addon_only) {
    return {
      level: "conditional",
      message: i18n._(
        /*i18n*/
        {
          id: "Y4HHYW"
        }
      )
    };
  }
  if (values.is_hidden_without_promo_code) {
    return {
      level: "conditional",
      message: i18n._(
        /*i18n*/
        {
          id: "+/Z3yr"
        }
      )
    };
  }
  if (values.hide_before_sale_start_date && hasValue(values.sale_start_date) && String(values.sale_start_date) > nowInEventTz) {
    const start = formatLocalDateTime(values.sale_start_date);
    return {
      level: "conditional",
      message: i18n._(
        /*i18n*/
        {
          id: "CWWpVx",
          values: {
            start
          }
        }
      )
    };
  }
  if (values.hide_after_sale_end_date && hasValue(values.sale_end_date) && String(values.sale_end_date) < nowInEventTz) {
    const end = formatLocalDateTime(values.sale_end_date);
    return {
      level: "conditional",
      message: i18n._(
        /*i18n*/
        {
          id: "cZO505",
          values: {
            end
          }
        }
      )
    };
  }
  return {
    level: "visible",
    message: i18n._(
      /*i18n*/
      {
        id: "EkiKJK"
      }
    )
  };
};
const preview = "_preview_h4ksx_1";
const eyebrow = "_eyebrow_h4ksx_7";
const widgetWrap = "_widgetWrap_h4ksx_15";
const statusLine = "_statusLine_h4ksx_37";
const statusDot = "_statusDot_h4ksx_47";
const visible = "_visible_h4ksx_55";
const conditional = "_conditional_h4ksx_63";
const hidden = "_hidden_h4ksx_71";
const footnote = "_footnote_h4ksx_79";
const classes$2 = {
  preview,
  eyebrow,
  widgetWrap,
  statusLine,
  statusDot,
  visible,
  conditional,
  hidden,
  footnote
};
const ProductVisibilityStatusLine = ({
  form,
  event,
  dataTestId
}) => {
  if (!event) {
    return null;
  }
  const status = computeVisibilityStatus(form.values, nowInTimezone(event.timezone));
  return /* @__PURE__ */ jsxs("div", { className: classNames(classes$2.statusLine, classes$2[status.level]), "aria-live": "polite", "data-testid": dataTestId, children: [
    /* @__PURE__ */ jsx("span", { className: classes$2.statusDot }),
    /* @__PURE__ */ jsx("span", { children: status.message })
  ] });
};
const ProductPreview = ({
  form,
  event
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: eventSettings
  } = useGetEventSettings(eventId);
  const {
    data: taxesAndFees
  } = useGetTaxesAndFees();
  const [debouncedValues] = useDebouncedValue(form.values, 200);
  const previewEvent = useMemo(() => {
    if (!event) {
      return void 0;
    }
    return buildPreviewEvent(event, debouncedValues, nowInTimezone(event.timezone), taxesAndFees == null ? void 0 : taxesAndFees.data, eventSettings ?? event.settings);
  }, [event, debouncedValues, taxesAndFees, eventSettings]);
  const themeSettings = useMemo(() => {
    var _a;
    return validateThemeSettings((_a = eventSettings ?? (event == null ? void 0 : event.settings)) == null ? void 0 : _a.homepage_theme_settings);
  }, [eventSettings, event]);
  const themeVariables = useMemo(() => computeThemeVariables(themeSettings), [themeSettings]);
  if (!event || !previewEvent) {
    return null;
  }
  const isHiddenFromEveryone = computeVisibilityStatus(form.values, nowInTimezone(event.timezone)).level === "hidden";
  return /* @__PURE__ */ jsxs("div", { className: classes$2.preview, children: [
    /* @__PURE__ */ jsx("div", { className: classes$2.eyebrow, children: i18n._(
      /*i18n*/
      {
        id: "a37vfH"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: classes$2.widgetWrap, "data-hidden": isHiddenFromEveryone || void 0, "aria-hidden": true, children: /* @__PURE__ */ jsx(SelectProducts, { event: previewEvent, widgetMode: "preview", showPoweredBy: false, colors: {
      background: "#ffffff",
      primary: themeSettings.accent,
      primaryText: "#1a1a1a",
      secondary: themeSettings.accent,
      secondaryText: themeVariables["--theme-accent-contrast"]
    } }, JSON.stringify(debouncedValues)) }),
    /* @__PURE__ */ jsx(ProductVisibilityStatusLine, { form, event, dataTestId: "product-visibility-status" }),
    /* @__PURE__ */ jsx("div", { className: classes$2.footnote, children: i18n._(
      /*i18n*/
      {
        id: "/XlQr2"
      }
    ) })
  ] });
};
const content = "_content_4hqup_1";
const body = "_body_4hqup_7";
const header = "_header_4hqup_15";
const headerText = "_headerText_4hqup_25";
const headerTitle = "_headerTitle_4hqup_32";
const headerSubtitle = "_headerSubtitle_4hqup_40";
const headerActions = "_headerActions_4hqup_49";
const escHint = "_escHint_4hqup_57";
const main = "_main_4hqup_67";
const formColumn = "_formColumn_4hqup_74";
const previewColumn = "_previewColumn_4hqup_80";
const footer = "_footer_4hqup_87";
const footerHint = "_footerHint_4hqup_97";
const footerActions = "_footerActions_4hqup_103";
const placeholder = "_placeholder_4hqup_110";
const statusBelowForm = "_statusBelowForm_4hqup_116";
const classes$1 = {
  content,
  body,
  header,
  headerText,
  headerTitle,
  headerSubtitle,
  headerActions,
  escHint,
  main,
  formColumn,
  previewColumn,
  footer,
  footerHint,
  footerActions,
  placeholder,
  statusBelowForm
};
const FormPlaceholder = () => /* @__PURE__ */ jsxs("div", { className: classes$1.placeholder, children: [
  /* @__PURE__ */ jsx(Skeleton, { height: 74, radius: "md" }),
  [45, 70, 55, 65].map((width, index) => /* @__PURE__ */ jsx(Skeleton, { height: 12, width: `${width}%`, radius: "sm" }, index))
] });
const ProductDrawer = ({
  onClose,
  title,
  event,
  form,
  loading,
  submitLabel,
  submitLoading,
  submitTestId,
  onSubmit,
  children
}) => {
  const headingId = useId();
  const formId = useId();
  const handleClose = () => {
    if (!form.isDirty()) {
      onClose();
      return;
    }
    modals.openConfirmModal({
      title: i18n._(
        /*i18n*/
        {
          id: "0EcUWz"
        }
      ),
      children: /* @__PURE__ */ jsx(Text, { size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "5SgD0L"
        }
      ) }),
      labels: {
        confirm: i18n._(
          /*i18n*/
          {
            id: "bzSI52"
          }
        ),
        cancel: i18n._(
          /*i18n*/
          {
            id: "4OjqAQ"
          }
        )
      },
      confirmProps: {
        color: "red"
      },
      zIndex: 400,
      onConfirm: onClose
    });
  };
  const handleKeyDown = (keyboardEvent) => {
    var _a;
    if ((keyboardEvent.metaKey || keyboardEvent.ctrlKey) && keyboardEvent.key === "Enter") {
      keyboardEvent.preventDefault();
      (_a = document.getElementById(formId)) == null ? void 0 : _a.requestSubmit();
    }
  };
  return /* @__PURE__ */ jsxs(Drawer, { opened: true, onClose: handleClose, position: "right", size: 900, withCloseButton: false, closeOnClickOutside: false, overlayProps: {
    opacity: 0.55,
    blur: 3
  }, "aria-labelledby": headingId, classNames: {
    content: classes$1.content,
    body: classes$1.body
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$1.header, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.headerText, id: headingId, children: [
        /* @__PURE__ */ jsx("h2", { className: classes$1.headerTitle, children: title }),
        (event == null ? void 0 : event.title) && /* @__PURE__ */ jsx("span", { className: classes$1.headerSubtitle, children: event.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.headerActions, children: [
        /* @__PURE__ */ jsx("span", { className: classes$1.escHint, children: i18n._(
          /*i18n*/
          {
            id: "BkEWfd"
          }
        ) }),
        /* @__PURE__ */ jsx(CloseButton, { "aria-label": i18n._(
          /*i18n*/
          {
            id: "yz7wBu"
          }
        ), onClick: handleClose, size: "lg", radius: "xl" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.main, onKeyDown: handleKeyDown, children: [
      /* @__PURE__ */ jsx("div", { className: classes$1.formColumn, "data-testid": "product-form-column", "data-autofocus": true, tabIndex: -1, children: loading ? /* @__PURE__ */ jsx(FormPlaceholder, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("form", { id: formId, onSubmit: form.onSubmit(onSubmit), children }),
        /* @__PURE__ */ jsx("div", { className: classes$1.statusBelowForm, children: /* @__PURE__ */ jsx(ProductVisibilityStatusLine, { form, event }) })
      ] }) }),
      /* @__PURE__ */ jsx("aside", { className: classes$1.previewColumn, children: /* @__PURE__ */ jsx(ProductPreview, { form, event }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.footer, children: [
      /* @__PURE__ */ jsx("span", { className: classes$1.footerHint, children: i18n._(
        /*i18n*/
        {
          id: "Gk0+G6"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.footerActions, children: [
        /* @__PURE__ */ jsx(Button, { variant: "default", onClick: handleClose, children: i18n._(
          /*i18n*/
          {
            id: "dEgA5A"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", form: formId, disabled: submitLoading || loading, "data-testid": submitTestId, children: submitLoading ? i18n._(
          /*i18n*/
          {
            id: "hqmXmc"
          }
        ) : submitLabel })
      ] })
    ] })
  ] });
};
const productClient = {
  findById: async (eventId, productId) => {
    const response = await api.get(`/events/${eventId}/products/${productId}`);
    return response.data;
  },
  all: async (eventId, pagination) => {
    const response = await api.get(`/events/${eventId}/products` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  create: async (eventId, product) => {
    const response = await api.post(`events/${eventId}/products`, product);
    return response.data;
  },
  update: async (eventId, productId, product) => {
    const response = await api.put(`events/${eventId}/products/${productId}`, product);
    return response.data;
  },
  delete: async (eventId, productId) => {
    const response = await api.delete(`/events/${eventId}/products/${productId}`);
    return response.data;
  },
  sortAllProducts: async (eventId, sortedCategories) => {
    return await api.post(`/events/${eventId}/products/sort`, {
      "sorted_categories": sortedCategories
    });
  }
};
const useCreateProduct = () => {
  return useMutation({
    mutationFn: ({
      productData,
      eventId
    }) => productClient.create(eventId, productData),
    onSuccess: (_, variables) => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY, variables.eventId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      })]);
    }
  });
};
const CreateProductModal = ({
  onClose,
  selectedCategoryId = void 0
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: taxesAndFees,
    isFetched: taxesAndFeesLoaded
  } = useGetTaxesAndFees();
  const createProductMutation = useCreateProduct();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      max_per_order: 100,
      min_per_order: 1,
      sale_start_date: "",
      sale_end_date: "",
      start_collapsed: false,
      hide_before_sale_start_date: false,
      hide_after_sale_end_date: false,
      show_quantity_remaining: false,
      hide_when_sold_out: false,
      is_hidden_without_promo_code: false,
      is_highlighted: false,
      highlight_message: void 0,
      waitlist_enabled: null,
      type: ProductPriceType.Paid,
      product_type: ProductType.Ticket,
      tax_and_fee_ids: void 0,
      addon_product_ids: [],
      is_addon_only: false,
      product_category_id: selectedCategoryId ? String(selectedCategoryId) : void 0,
      prices: [{
        price: 0,
        label: void 0,
        sale_end_date: void 0,
        sale_start_date: void 0,
        initial_quantity_available: void 0
      }]
    }
  });
  const handleCreateProduct = (values) => {
    createProductMutation.mutate({
      eventId,
      productData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "gP22tw"
          }
        ));
        form.reset();
        onClose();
      },
      onError: (error) => {
        var _a, _b;
        if ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors) {
          form.setErrors(error.response.data.errors);
        }
        showError(i18n._(
          /*i18n*/
          {
            id: "9+P7zk"
          }
        ));
      }
    });
  };
  useEffect(() => {
    var _a;
    form.setFieldValue("tax_and_fee_ids", ((_a = taxesAndFees == null ? void 0 : taxesAndFees.data) == null ? void 0 : _a.filter((item) => item.is_default).map((item) => {
      return String(item.id);
    })) || []);
    form.resetDirty();
  }, [taxesAndFeesLoaded]);
  return /* @__PURE__ */ jsx(ProductDrawer, { onClose, title: i18n._(
    /*i18n*/
    {
      id: "8AiKIu"
    }
  ), event, form, submitLabel: i18n._(
    /*i18n*/
    {
      id: "a0EjD+"
    }
  ), submitLoading: createProductMutation.isPending, submitTestId: "product-create-submit-button", onSubmit: handleCreateProduct, children: /* @__PURE__ */ jsx(ProductForm, { form }) });
};
const sortableCategory = "_sortableCategory_w5axj_1";
const categoryHeader = "_categoryHeader_w5axj_14";
const categoryActions = "_categoryActions_w5axj_22";
const categoryAction = "_categoryAction_w5axj_22";
const categoryTitle = "_categoryTitle_w5axj_31";
const categoryContent = "_categoryContent_w5axj_62";
const productCard = "_productCard_w5axj_76";
const cards = "_cards_w5axj_81";
const actionButton = "_actionButton_w5axj_104";
const sortControls = "_sortControls_w5axj_118";
const soldOut = "_soldOut_w5axj_122";
const productContent = "_productContent_w5axj_143";
const productHeader = "_productHeader_w5axj_158";
const badgeRow = "_badgeRow_w5axj_164";
const typeBadges = "_typeBadges_w5axj_172";
const productTitle = "_productTitle_w5axj_179";
const statusBadge = "_statusBadge_w5axj_192";
const detailsGrid = "_detailsGrid_w5axj_200";
const detailItem = "_detailItem_w5axj_224";
const detailLabel = "_detailLabel_w5axj_231";
const priceValue = "_priceValue_w5axj_239";
const priceAmount = "_priceAmount_w5axj_246";
const freePrice = "_freePrice_w5axj_258";
const taxIndicator = "_taxIndicator_w5axj_262";
const salesValue = "_salesValue_w5axj_282";
const salesWithProgress = "_salesWithProgress_w5axj_288";
const salesCount = "_salesCount_w5axj_294";
const salesTotal = "_salesTotal_w5axj_308";
const unlimited = "_unlimited_w5axj_314";
const salesProgress = "_salesProgress_w5axj_321";
const lowStock = "_lowStock_w5axj_330";
const dateValue = "_dateValue_w5axj_355";
const dateRange = "_dateRange_w5axj_360";
const dateItem = "_dateItem_w5axj_366";
const alwaysAvailable = "_alwaysAvailable_w5axj_379";
const noEndDate = "_noEndDate_w5axj_380";
const actionSection = "_actionSection_w5axj_386";
const actionButtonText = "_actionButtonText_w5axj_419";
const actionButtonIcon = "_actionButtonIcon_w5axj_425";
const classes = {
  sortableCategory,
  categoryHeader,
  categoryActions,
  categoryAction,
  categoryTitle,
  categoryContent,
  productCard,
  cards,
  actionButton,
  sortControls,
  soldOut,
  productContent,
  productHeader,
  badgeRow,
  typeBadges,
  productTitle,
  statusBadge,
  detailsGrid,
  detailItem,
  detailLabel,
  priceValue,
  priceAmount,
  freePrice,
  taxIndicator,
  salesValue,
  salesWithProgress,
  salesCount,
  salesTotal,
  unlimited,
  salesProgress,
  lowStock,
  dateValue,
  dateRange,
  dateItem,
  alwaysAvailable,
  noEndDate,
  actionSection,
  actionButtonText,
  actionButtonIcon
};
const useDeleteProduct = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      eventId
    }) => productClient.delete(eventId, productId),
    onSuccess: () => Promise.all([queryClient2.invalidateQueries({
      queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY]
    }), queryClient2.invalidateQueries({
      queryKey: [GET_EVENT_QUERY_KEY]
    })])
  });
};
const useUpdateProduct = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      productData,
      productId,
      eventId
    }) => productClient.update(eventId, productId, productData),
    onSuccess: () => {
      queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY]
      });
      queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      });
    }
  });
};
const GET_PRODUCTS_QUERY_KEY = "getProducts";
const useGetProduct = (eventId, productId) => {
  return useQuery({
    queryKey: [GET_PRODUCTS_QUERY_KEY, eventId, productId],
    queryFn: async () => {
      const {
        data
      } = await productClient.findById(eventId, productId);
      return data;
    }
  });
};
const EditProductModal = ({
  onClose,
  productId
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: product
  } = useGetProduct(eventId, productId);
  const {
    data: event
  } = useGetEvent(eventId);
  const errorHandler = useFormErrorResponseHandler();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      max_per_order: 100,
      min_per_order: 1,
      sale_start_date: void 0,
      sale_end_date: void 0,
      hide_before_sale_start_date: void 0,
      hide_after_sale_end_date: void 0,
      start_collapsed: void 0,
      show_quantity_remaining: void 0,
      hide_when_sold_out: void 0,
      is_hidden_without_promo_code: void 0,
      is_highlighted: false,
      highlight_message: void 0,
      waitlist_enabled: null,
      type: ProductPriceType.Paid,
      tax_and_fee_ids: [],
      addon_product_ids: [],
      is_addon_only: false,
      prices: [],
      product_type: ProductType.Ticket,
      product_category_id: void 0
    }
  });
  const mutation = useUpdateProduct();
  useEffect(() => {
    var _a, _b, _c;
    if (!product || !event) {
      return;
    }
    form.setValues({
      id: product.id,
      title: product.title,
      description: product.description,
      max_per_order: product.max_per_order ?? 0,
      min_per_order: product.min_per_order ?? 0,
      sale_start_date: utcToTz(product.sale_start_date, event.timezone),
      sale_end_date: utcToTz(product.sale_end_date, event.timezone),
      hide_before_sale_start_date: product.hide_before_sale_start_date,
      hide_after_sale_end_date: product.hide_after_sale_end_date,
      show_quantity_remaining: product.show_quantity_remaining,
      start_collapsed: product.start_collapsed,
      hide_when_sold_out: product.hide_when_sold_out,
      is_hidden_without_promo_code: product.is_hidden_without_promo_code,
      type: product.type,
      tax_and_fee_ids: ((_a = product.taxes_and_fees) == null ? void 0 : _a.map((t) => String(t.id))) ?? [],
      addon_product_ids: ((_b = product.addon_product_ids) == null ? void 0 : _b.map(String)) ?? [],
      is_addon_only: product.is_addon_only ?? false,
      is_hidden: product.is_hidden,
      is_highlighted: product.is_highlighted,
      highlight_message: product.highlight_message,
      waitlist_enabled: product.waitlist_enabled ?? null,
      product_type: product.product_type,
      product_category_id: String(product.product_category_id),
      price: product.type === ProductPriceType.Free ? 0 : void 0,
      prices: ((_c = product.prices) == null ? void 0 : _c.map((p) => ({
        price: p.price ?? 0,
        label: p.label,
        sale_start_date: utcToTz(p.sale_start_date, event.timezone),
        sale_end_date: utcToTz(p.sale_end_date, event.timezone),
        initial_quantity_available: p.initial_quantity_available ?? void 0,
        id: p.id,
        is_hidden: p.is_hidden
      }))) ?? []
    });
    form.resetDirty();
  }, [product, event]);
  const handleEditProduct = (product2) => {
    mutation.mutate({
      productData: product2,
      eventId,
      productId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "1Ycaad"
          }
        ) + product2.title);
        form.reset();
        onClose();
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  return /* @__PURE__ */ jsx(ProductDrawer, { onClose, title: i18n._(
    /*i18n*/
    {
      id: "tdD/QN"
    }
  ), event, form, loading: !product || !event, submitLabel: i18n._(
    /*i18n*/
    {
      id: "tdD/QN"
    }
  ), submitLoading: mutation.isPending, submitTestId: "product-edit-submit-button", onSubmit: handleEditProduct, children: /* @__PURE__ */ jsx(ProductForm, { product, form }) });
};
const SortArrows = ({
  upArrowEnabled,
  downArrowEnabled,
  onSortUp,
  onSortDown,
  flexDirection = "row"
}) => {
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    flexDirection,
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ jsx(ActionIcon, { onClick: upArrowEnabled ? onSortUp : void 0, variant: "transparent", "aria-label": "Sort Up", color: upArrowEnabled ? "currentColor" : "#ddd", children: /* @__PURE__ */ jsx(IconCaretUpFilled, { size: 18 }) }),
    /* @__PURE__ */ jsx(ActionIcon, { onClick: downArrowEnabled ? onSortDown : void 0, variant: "transparent", "aria-label": "Sort Down", color: downArrowEnabled ? "currentColor" : "#ddd", children: /* @__PURE__ */ jsx(IconCaretDownFilled, { size: 18 }) })
  ] });
};
const useSortProducts = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      sortedCategories
    }) => productClient.sortAllProducts(eventId, sortedCategories),
    onSuccess: () => {
      return Promise.all([queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY]
      }), queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      })]);
    }
  });
};
const DuplicateProductModal = ({
  onClose,
  originalProductId
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: taxesAndFees,
    isFetched: taxesAndFeesLoaded
  } = useGetTaxesAndFees();
  const {
    data: originalProduct
  } = useGetProduct(eventId, originalProductId);
  const createProductMutation = useCreateProduct();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      max_per_order: 100,
      min_per_order: 1,
      sale_start_date: "",
      sale_end_date: "",
      start_collapsed: false,
      hide_before_sale_start_date: false,
      hide_after_sale_end_date: false,
      show_quantity_remaining: false,
      hide_when_sold_out: false,
      is_hidden_without_promo_code: false,
      is_highlighted: false,
      highlight_message: void 0,
      type: ProductPriceType.Paid,
      product_type: ProductType.Ticket,
      tax_and_fee_ids: void 0,
      addon_product_ids: [],
      is_addon_only: false,
      product_category_id: void 0,
      prices: [{
        price: 0,
        label: void 0,
        sale_end_date: void 0,
        sale_start_date: void 0,
        initial_quantity_available: void 0
      }]
    }
  });
  useEffect(() => {
    var _a, _b, _c;
    if (!originalProduct) {
      return;
    }
    form.setValues({
      title: `${originalProduct.title} (Copy)`,
      description: originalProduct.description,
      max_per_order: originalProduct.max_per_order,
      min_per_order: originalProduct.min_per_order,
      sale_start_date: originalProduct.sale_start_date,
      sale_end_date: originalProduct.sale_end_date,
      start_collapsed: originalProduct.start_collapsed,
      hide_before_sale_start_date: originalProduct.hide_before_sale_start_date,
      hide_after_sale_end_date: originalProduct.hide_after_sale_end_date,
      show_quantity_remaining: originalProduct.show_quantity_remaining,
      hide_when_sold_out: originalProduct.hide_when_sold_out,
      is_hidden_without_promo_code: originalProduct.is_hidden_without_promo_code,
      is_hidden: originalProduct.is_hidden,
      is_highlighted: originalProduct.is_highlighted,
      highlight_message: originalProduct.highlight_message,
      type: originalProduct.type,
      tax_and_fee_ids: ((_a = originalProduct.taxes_and_fees) == null ? void 0 : _a.map((t) => String(t.id))) ?? [],
      addon_product_ids: ((_b = originalProduct.addon_product_ids) == null ? void 0 : _b.map(String)) ?? [],
      is_addon_only: originalProduct.is_addon_only ?? false,
      product_type: originalProduct.product_type,
      product_category_id: originalProduct.product_category_id,
      price: originalProduct.type === ProductPriceType.Free ? 0 : void 0,
      prices: (_c = originalProduct.prices) == null ? void 0 : _c.map((price) => ({
        price: price.price,
        label: price.label,
        sale_start_date: price.sale_start_date,
        sale_end_date: price.sale_end_date,
        initial_quantity_available: price.initial_quantity_available,
        is_hidden: price.is_hidden
      }))
    });
    form.resetDirty();
  }, [originalProduct]);
  useEffect(() => {
    var _a;
    if (taxesAndFeesLoaded) {
      form.setFieldValue("tax_and_fee_ids", ((_a = taxesAndFees == null ? void 0 : taxesAndFees.data) == null ? void 0 : _a.filter((item) => item.is_default).map((item) => String(item.id))) || []);
      form.resetDirty();
    }
  }, [taxesAndFeesLoaded]);
  const handleDuplicateProduct = (values) => {
    createProductMutation.mutate({
      eventId,
      productData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "JwTmB6"
          }
        ));
        form.reset();
        onClose();
      },
      onError: (error) => {
        var _a, _b;
        if ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors) {
          form.setErrors(error.response.data.errors);
        }
        showError(i18n._(
          /*i18n*/
          {
            id: "IrVSu+"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsx(ProductDrawer, { onClose, title: i18n._(
    /*i18n*/
    {
      id: "KRmTkx"
    }
  ), event, form, loading: !originalProduct, submitLabel: i18n._(
    /*i18n*/
    {
      id: "KRmTkx"
    }
  ), submitLoading: createProductMutation.isPending, submitTestId: "product-duplicate-submit-button", onSubmit: handleDuplicateProduct, children: /* @__PURE__ */ jsx(ProductForm, { form }) });
};
const addonBadgeLabel = (count) => count === 1 ? i18n._(
  /*i18n*/
  {
    id: "hMefp0"
  }
) : i18n._(
  /*i18n*/
  {
    id: "wYzVwE",
    values: {
      count
    }
  }
);
const SortableProduct = ({
  product,
  currencyCode,
  category,
  categories
}) => {
  var _a;
  const [isEditModalOpen, editModal] = useDisclosure(false);
  const [isDuplicateModalOpen, duplicateModal] = useDisclosure(false);
  const [isMessageModalOpen, messageModal] = useDisclosure(false);
  const [productId, setProductId] = useState();
  const deleteMutation = useDeleteProduct();
  const sortMutation = useSortProducts();
  if (!(product == null ? void 0 : product.id) || !(category == null ? void 0 : category.id) || !Array.isArray(category.products)) {
    return null;
  }
  const handleModalClick = (productId2, modal) => {
    setProductId(productId2);
    modal.open();
  };
  const handleDeleteProduct = (productId2, eventId) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "/1wMxk"
      }
    ), () => {
      deleteMutation.mutate({
        productId: productId2,
        eventId
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "1USFWA"
            }
          ));
        },
        onError: (error) => {
          var _a2, _b, _c;
          if (((_a2 = error.response) == null ? void 0 : _a2.status) === 409) {
            showError(error.response.data.message || i18n._(
              /*i18n*/
              {
                id: "cRRc+F"
              }
            ));
          } else {
            showError(((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || i18n._(
              /*i18n*/
              {
                id: "5E23qd"
              }
            ));
          }
        }
      });
    });
  };
  const getStatusInfo = (product2) => {
    if (product2.is_sold_out) {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "Mi1rVn"
          }
        ),
        color: "red",
        variant: "filled"
      };
    }
    if (product2.is_before_sale_start_date) {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "4ba0NE"
          }
        ),
        color: "blue",
        variant: "light"
      };
    }
    if (product2.is_after_sale_end_date) {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "237hSL"
          }
        ),
        color: "gray",
        variant: "light"
      };
    }
    if (product2.is_hidden) {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "D+zLDD"
          }
        ),
        color: "gray",
        variant: "outline"
      };
    }
    return product2.is_available ? {
      label: i18n._(
        /*i18n*/
        {
          id: "Ldu/RI"
        }
      ),
      color: "green",
      variant: "light"
    } : {
      label: i18n._(
        /*i18n*/
        {
          id: "URAE3q"
        }
      ),
      color: "orange",
      variant: "light"
    };
  };
  const getStatusTooltip = (product2) => {
    if (product2.is_sold_out) return i18n._(
      /*i18n*/
      {
        id: "RqSKdX"
      }
    );
    if (product2.is_before_sale_start_date) return i18n._(
      /*i18n*/
      {
        id: "nO3VbP",
        values: {
          0: relativeDate(product2.sale_start_date)
        }
      }
    );
    if (product2.is_after_sale_end_date) return i18n._(
      /*i18n*/
      {
        id: "dFFW9L",
        values: {
          0: relativeDate(product2.sale_end_date)
        }
      }
    );
    if (product2.is_hidden) return i18n._(
      /*i18n*/
      {
        id: "C4qOW8"
      }
    );
    return product2.is_available ? i18n._(
      /*i18n*/
      {
        id: "iTvh6I"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "9KnRdL"
      }
    );
  };
  const getPriceRange = (product2) => {
    const productPrices = product2.prices;
    if (!Array.isArray(productPrices) || productPrices.length === 0) {
      return {
        display: i18n._(
          /*i18n*/
          {
            id: "BI7D9d"
          }
        ),
        isFree: false
      };
    }
    if (product2.type !== ProductPriceType.Tiered) {
      if (productPrices[0].price <= 0) {
        return {
          display: i18n._(
            /*i18n*/
            {
              id: "2POOFK"
            }
          ),
          isFree: true
        };
      }
      return {
        display: formatCurrency(productPrices[0].price, currencyCode),
        isFree: false
      };
    }
    const prices = productPrices.map((productPrice) => productPrice.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice <= 0 && maxPrice <= 0) {
      return {
        display: i18n._(
          /*i18n*/
          {
            id: "2POOFK"
          }
        ),
        isFree: true
      };
    }
    if (minPrice === maxPrice) {
      return {
        display: formatCurrency(minPrice, currencyCode),
        isFree: false
      };
    }
    return {
      display: `${formatCurrency(minPrice, currencyCode)} – ${formatCurrency(maxPrice, currencyCode)}`,
      isFree: false
    };
  };
  const hasTaxesOrFees = () => {
    return product.taxes_and_fees && product.taxes_and_fees.length > 0 || product.tax_and_fee_ids && product.tax_and_fee_ids.length > 0;
  };
  const getTaxFeeTooltip = () => {
    if (!product.taxes_and_fees || product.taxes_and_fees.length === 0) {
      return i18n._(
        /*i18n*/
        {
          id: "GkH0Pq"
        }
      );
    }
    return product.taxes_and_fees.map((tf) => tf.name).join(", ");
  };
  const getSalesProgress = () => {
    const sold = Number(product.quantity_sold) || 0;
    const initial = product.initial_quantity_available;
    if (!initial || initial <= 0) {
      return null;
    }
    const percentage = Math.min(sold / initial * 100, 100);
    const remaining = initial - sold;
    return {
      sold,
      total: initial,
      remaining,
      percentage,
      isLow: remaining > 0 && remaining <= 10
    };
  };
  const handleSort = (productId2, direction) => {
    var _a2;
    if (!((_a2 = category == null ? void 0 : category.products) == null ? void 0 : _a2.length) || !product.event_id) return;
    const categoryIndex = categories.findIndex((cat) => cat.id === category.id);
    const currentIndex2 = category.products.findIndex((p) => p.id === productId2);
    if (categoryIndex === -1 || currentIndex2 === -1) return;
    let updatedCategories = [...categories];
    if (direction === "up" && currentIndex2 === 0 || direction === "down" && currentIndex2 === category.products.length - 1) {
      const targetCategoryIndex = direction === "up" ? categoryIndex - 1 : categoryIndex + 1;
      if (targetCategoryIndex < 0 || targetCategoryIndex >= categories.length) return;
      const sourceProducts = [...category.products];
      const [movedProduct] = sourceProducts.splice(currentIndex2, 1);
      const targetCategory = categories[targetCategoryIndex];
      const targetProducts = [...targetCategory.products || []];
      const targetPosition = direction === "up" ? targetProducts.length : 0;
      targetProducts.splice(targetPosition, 0, movedProduct);
      updatedCategories = categories.map((cat, index) => {
        if (index === categoryIndex) {
          return {
            ...cat,
            products: sourceProducts
          };
        }
        if (index === targetCategoryIndex) {
          return {
            ...cat,
            products: targetProducts
          };
        }
        return cat;
      });
    } else {
      const newIndex = direction === "up" ? currentIndex2 - 1 : currentIndex2 + 1;
      if (newIndex < 0 || newIndex >= category.products.length) return;
      const updatedProducts = [...category.products];
      [updatedProducts[currentIndex2], updatedProducts[newIndex]] = [updatedProducts[newIndex], updatedProducts[currentIndex2]];
      updatedCategories = categories.map((cat) => cat.id === category.id ? {
        ...cat,
        products: updatedProducts
      } : cat);
    }
    const sortedCategories = updatedCategories.map((cat) => ({
      product_category_id: cat.id,
      sorted_products: (cat.products || []).map((prod, index) => ({
        id: prod.id,
        order: index + 1
      }))
    }));
    sortMutation.mutate({
      sortedCategories,
      eventId: product.event_id
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "DJQEZc"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "ejXy+D"
        }
      ))
    });
  };
  const currentCategoryIndex = categories.findIndex((cat) => cat.id === category.id);
  const currentProducts = category.products || [];
  const currentIndex = currentProducts.findIndex((p) => p.id === product.id);
  const canMoveUp = currentIndex > 0 || currentCategoryIndex > 0;
  const canMoveDown = currentIndex < currentProducts.length - 1 || currentCategoryIndex < categories.length - 1;
  const isTicket = product.product_type === ProductType.Ticket;
  const statusInfo = getStatusInfo(product);
  const priceInfo = getPriceRange(product);
  const salesProgress2 = getSalesProgress();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: classNames(classes.productCard, {
      [classes.soldOut]: product.is_sold_out
    }), children: [
      /* @__PURE__ */ jsx("div", { className: classes.sortControls, children: /* @__PURE__ */ jsx(SortArrows, { upArrowEnabled: canMoveUp, downArrowEnabled: canMoveDown, onSortUp: () => handleSort(product.id, "up"), onSortDown: () => handleSort(product.id, "down"), flexDirection: "column" }) }),
      /* @__PURE__ */ jsxs("div", { className: classes.productContent, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.productHeader, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.badgeRow, children: [
            /* @__PURE__ */ jsxs("div", { className: classes.typeBadges, children: [
              isTicket ? /* @__PURE__ */ jsx(Badge, { leftSection: /* @__PURE__ */ jsx(IconTicket, { size: 12 }), variant: "light", color: "violet", size: "sm", children: i18n._(
                /*i18n*/
                {
                  id: "kjAL4v"
                }
              ) }) : /* @__PURE__ */ jsx(Badge, { leftSection: /* @__PURE__ */ jsx(IconPackage, { size: 12 }), variant: "light", color: "cyan", size: "sm", children: i18n._(
                /*i18n*/
                {
                  id: "K47k8R"
                }
              ) }),
              product.waitlist_enabled && /* @__PURE__ */ jsx(Badge, { variant: "light", color: "secondary", size: "sm", leftSection: /* @__PURE__ */ jsx(IconClock, { size: 12 }), children: i18n._(
                /*i18n*/
                {
                  id: "3RXFtE"
                }
              ) }),
              product.type === ProductPriceType.Donation && /* @__PURE__ */ jsx(Badge, { variant: "outline", color: "pink", size: "sm", children: i18n._(
                /*i18n*/
                {
                  id: "AXXqG+"
                }
              ) }),
              (product.is_hidden_without_promo_code || product.is_hidden) && /* @__PURE__ */ jsx(Tooltip, { label: product.is_hidden ? i18n._(
                /*i18n*/
                {
                  id: "C4qOW8"
                }
              ) : i18n._(
                /*i18n*/
                {
                  id: "M2w1ni"
                }
              ), withArrow: true, children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: "gray", size: "sm", leftSection: product.is_hidden_without_promo_code ? /* @__PURE__ */ jsx(IconLock, { size: 12 }) : /* @__PURE__ */ jsx(IconEyeOff, { size: 12 }), children: product.is_hidden_without_promo_code ? i18n._(
                /*i18n*/
                {
                  id: "uEhdRh"
                }
              ) : i18n._(
                /*i18n*/
                {
                  id: "D+zLDD"
                }
              ) }) }),
              product.is_addon_only && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
                /*i18n*/
                {
                  id: "chktt5"
                }
              ), withArrow: true, children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: "teal", size: "sm", leftSection: /* @__PURE__ */ jsx(IconPuzzle, { size: 12 }), children: i18n._(
                /*i18n*/
                {
                  id: "6JzKEV"
                }
              ) }) }),
              !!((_a = product.addons) == null ? void 0 : _a.length) && /* @__PURE__ */ jsx(Tooltip, { label: product.addons.map((addon) => addon.title).join(", "), withArrow: true, children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: "grape", size: "sm", leftSection: /* @__PURE__ */ jsx(IconPuzzle, { size: 12 }), children: addonBadgeLabel(product.addons.length) }) }),
              product.is_highlighted && /* @__PURE__ */ jsx(Tooltip, { label: product.highlight_message || i18n._(
                /*i18n*/
                {
                  id: "uM9Alj"
                }
              ), withArrow: true, children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: "yellow", size: "sm", leftSection: /* @__PURE__ */ jsx(IconSparkles, { size: 12 }), children: i18n._(
                /*i18n*/
                {
                  id: "7ER2sc"
                }
              ) }) })
            ] }),
            /* @__PURE__ */ jsx(Tooltip, { label: getStatusTooltip(product), withArrow: true, children: /* @__PURE__ */ jsx(Badge, { color: statusInfo.color, variant: statusInfo.variant, className: classes.statusBadge, children: statusInfo.label }) })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: classes.productTitle, children: /* @__PURE__ */ jsx(Truncate, { text: product.title, length: 80 }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.detailsGrid, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.detailItem, children: [
            /* @__PURE__ */ jsx("span", { className: classes.detailLabel, children: i18n._(
              /*i18n*/
              {
                id: "a7u1N9"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: classes.priceValue, children: [
              /* @__PURE__ */ jsx("span", { className: classNames(classes.priceAmount, {
                [classes.freePrice]: priceInfo.isFree
              }), children: priceInfo.display }),
              hasTaxesOrFees() && /* @__PURE__ */ jsx(Tooltip, { label: getTaxFeeTooltip(), withArrow: true, children: /* @__PURE__ */ jsxs("div", { className: classes.taxIndicator, children: [
                /* @__PURE__ */ jsx(IconReceipt, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: i18n._(
                  /*i18n*/
                  {
                    id: "1d6kks"
                  }
                ) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.detailItem, children: [
            /* @__PURE__ */ jsx("span", { className: classes.detailLabel, children: isTicket ? i18n._(
              /*i18n*/
              {
                id: "9SZT4E"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "s9KGXU"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: classes.salesValue, children: salesProgress2 ? /* @__PURE__ */ jsxs("div", { className: classes.salesWithProgress, children: [
              /* @__PURE__ */ jsxs("span", { className: classes.salesCount, children: [
                salesProgress2.sold,
                /* @__PURE__ */ jsxs("span", { className: classes.salesTotal, children: [
                  "/ ",
                  salesProgress2.total
                ] })
              ] }),
              /* @__PURE__ */ jsx(Progress, { value: salesProgress2.percentage, size: "xs", color: salesProgress2.percentage >= 100 ? "red" : salesProgress2.isLow ? "orange" : "green", className: classes.salesProgress }),
              salesProgress2.isLow && salesProgress2.remaining > 0 && /* @__PURE__ */ jsx("span", { className: classes.lowStock, children: i18n._(
                /*i18n*/
                {
                  id: "6MIiOI",
                  values: {
                    0: salesProgress2.remaining
                  }
                }
              ) })
            ] }) : /* @__PURE__ */ jsxs("span", { className: classes.salesCount, children: [
              Number(product.quantity_sold),
              /* @__PURE__ */ jsx("span", { className: classes.unlimited, children: i18n._(
                /*i18n*/
                {
                  id: "NIuIk1"
                }
              ) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.detailItem, children: [
            /* @__PURE__ */ jsx("span", { className: classes.detailLabel, children: i18n._(
              /*i18n*/
              {
                id: "wlfBad"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: classes.dateValue, children: product.sale_start_date || product.sale_end_date ? /* @__PURE__ */ jsxs("div", { className: classes.dateRange, children: [
              product.is_before_sale_start_date && product.sale_start_date && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
                /*i18n*/
                {
                  id: "zpekWp",
                  values: {
                    0: relativeDate(product.sale_start_date)
                  }
                }
              ), withArrow: true, children: /* @__PURE__ */ jsxs("div", { className: classes.dateItem, children: [
                /* @__PURE__ */ jsx(IconClock, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: relativeDate(product.sale_start_date) })
              ] }) }),
              !product.is_before_sale_start_date && product.sale_end_date && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
                /*i18n*/
                {
                  id: "loCKGB",
                  values: {
                    0: relativeDate(product.sale_end_date)
                  }
                }
              ), withArrow: true, children: /* @__PURE__ */ jsxs("div", { className: classes.dateItem, children: [
                /* @__PURE__ */ jsx(IconCalendarEvent, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: product.is_after_sale_end_date ? i18n._(
                  /*i18n*/
                  {
                    id: "237hSL"
                  }
                ) : relativeDate(product.sale_end_date) })
              ] }) }),
              !product.is_before_sale_start_date && !product.sale_end_date && /* @__PURE__ */ jsx("span", { className: classes.noEndDate, children: i18n._(
                /*i18n*/
                {
                  id: "pZNOT9"
                }
              ) })
            ] }) : /* @__PURE__ */ jsx("span", { className: classes.alwaysAvailable, children: i18n._(
              /*i18n*/
              {
                id: "xYqsHg"
              }
            ) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.actionSection, children: /* @__PURE__ */ jsx(Group, { wrap: "nowrap", gap: 0, children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, position: "bottom-end", children: [
        /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Button, { size: "xs", variant: "subtle", className: classes.actionButton, "data-testid": "product-manage-button", children: [
          /* @__PURE__ */ jsx("span", { className: classes.actionButtonText, children: i18n._(
            /*i18n*/
            {
              id: "wckWOP"
            }
          ) }),
          /* @__PURE__ */ jsx(IconDotsVertical, { size: 16, className: classes.actionButtonIcon })
        ] }) }) }),
        /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
          /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
            /*i18n*/
            {
              id: "7L01XJ"
            }
          ) }),
          isTicket && /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleModalClick(product.id, messageModal), leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), children: i18n._(
            /*i18n*/
            {
              id: "Gv5AMu"
            }
          ) }),
          /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleModalClick(product.id, editModal), leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), "data-testid": "product-edit-menu-item", children: /* @__PURE__ */ jsx(Trans, { id: "N6j2JH", values: {
            0: isTicket ? i18n._(
              /*i18n*/
              {
                id: "kjAL4v"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "K47k8R"
              }
            )
          } }) }),
          /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleModalClick(product.id, duplicateModal), leftSection: /* @__PURE__ */ jsx(IconCopyPlus, { size: 14 }), children: i18n._(
            /*i18n*/
            {
              id: "euc6Ns"
            }
          ) }),
          /* @__PURE__ */ jsx(Menu.Divider, {}),
          /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
            /*i18n*/
            {
              id: "Zz6Cxn"
            }
          ) }),
          /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleDeleteProduct(product.id, product.event_id), color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), children: i18n._(
            /*i18n*/
            {
              id: "cnGeoo"
            }
          ) })
        ] })
      ] }) }) })
    ] }),
    isDuplicateModalOpen && /* @__PURE__ */ jsx(DuplicateProductModal, { originalProductId: productId, onClose: duplicateModal.close }),
    isEditModalOpen && /* @__PURE__ */ jsx(EditProductModal, { productId, onClose: editModal.close }),
    isMessageModalOpen && /* @__PURE__ */ jsx(SendMessageModal, { onClose: messageModal.close, productId, messageType: MessageType.TicketHolders })
  ] });
};
const GET_EVENT_PRODUCT_CATEGORY_QUERY_KEY = "getEventProductCategory";
const useGetEventProductCategory = (productCategoryId, eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_PRODUCT_CATEGORY_QUERY_KEY, eventId, productCategoryId],
    queryFn: async () => {
      const {
        data
      } = await productCategoryClient.get(eventId, productCategoryId);
      return data;
    }
  });
};
const useEditProductCategory = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      productCategoryData,
      eventId,
      productCategoryId
    }) => productCategoryClient.update(eventId, productCategoryId, productCategoryData),
    onSuccess: (_, variables) => {
      queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_PRODUCT_CATEGORY_QUERY_KEY, variables.eventId, variables.productCategoryId]
      });
      return Promise.all([queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY]
      }), queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      })]);
    }
  });
};
const ProductCategoryForm = ({
  form
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TextInput, { label: i18n._(
      /*i18n*/
      {
        id: "6YtxFj"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "6YtxFj"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "tc64Zz"
      }
    ), required: true, ...form.getInputProps("name") }),
    /* @__PURE__ */ jsx(TextInput, { label: i18n._(
      /*i18n*/
      {
        id: "8mw4tm"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "RQ5kDd"
      }
    ), ...form.getInputProps("no_products_message") }),
    /* @__PURE__ */ jsx(Editor, { label: i18n._(
      /*i18n*/
      {
        id: "Nu4oKW"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "OPFdAM"
      }
    ), onChange: (value) => form.setFieldValue("description", value), value: form.values.description || "", maxLength: 5e3 }),
    /* @__PURE__ */ jsx(Switch, { label: i18n._(
      /*i18n*/
      {
        id: "uMwTx7"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "CY3yHL"
      }
    ), ...form.getInputProps("is_hidden", {
      type: "checkbox"
    }) })
  ] });
};
const EditProductCategoryModal = ({
  onClose,
  productCategoryId
}) => {
  const errorHandler = useFormErrorResponseHandler();
  const {
    eventId
  } = useParams();
  const {
    data: productCategory,
    isFetched
  } = useGetEventProductCategory(productCategoryId, eventId);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      is_hidden: false
    }
  });
  const mutation = useEditProductCategory();
  useEffect(() => {
    if (!productCategory) {
      return;
    }
    form.setValues({
      id: productCategory.id,
      name: productCategory.name,
      description: productCategory.description,
      is_hidden: productCategory.is_hidden,
      no_products_message: productCategory.no_products_message
    });
  }, [isFetched]);
  const handleEditProduct = () => {
    mutation.mutate({
      eventId,
      productCategoryId,
      productCategoryData: form.values
    }, {
      onError: (error) => errorHandler(form, error),
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "U61sAj"
          }
        ));
        onClose();
      }
    });
  };
  return /* @__PURE__ */ jsx(Modal, { onClose, heading: i18n._(
    /*i18n*/
    {
      id: "n143Tq"
    }
  ), opened: true, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleEditProduct), children: [
    /* @__PURE__ */ jsx(ProductCategoryForm, { form }),
    /* @__PURE__ */ jsx(LoadingMask, {}),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "xl", disabled: mutation.isPending, children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "hqmXmc"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "n143Tq"
      }
    ) })
  ] }) });
};
const useDeleteProductCategory = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      productCategoryId,
      eventId
    }) => productCategoryClient.delete(eventId, productCategoryId),
    onSuccess: () => Promise.all([queryClient2.invalidateQueries({
      queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY]
    }), queryClient2.invalidateQueries({
      queryKey: [GET_EVENT_QUERY_KEY]
    })])
  });
};
const SortableCategory = ({
  category,
  children,
  isLastCategory,
  openCreateModal,
  categories
}) => {
  const [isEditModalOpen, editModal] = useDisclosure(false);
  const {
    eventId
  } = useParams();
  const deleteMutation = useDeleteProductCategory();
  const sortMutation = useSortProducts();
  const upSortEnabled = categories.findIndex((cat) => cat.id === category.id) > 0;
  const downSortEnabled = categories.findIndex((cat) => cat.id === category.id) < categories.length - 1;
  const handleDelete = () => {
    if (isLastCategory) {
      showError(i18n._(
        /*i18n*/
        {
          id: "c9Evkd"
        }
      ));
      return;
    }
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "IQTR34"
      }
    ), () => {
      deleteMutation.mutate({
        productCategoryId: category.id,
        eventId
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "DRK3Bq"
            }
          ));
          editModal.close();
        },
        onError: (error) => {
          var _a, _b, _c, _d;
          if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) && error.response.status === 409 && ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message)) {
            showError((_d = error == null ? void 0 : error.response) == null ? void 0 : _d.data.message);
            return;
          } else {
            showError(i18n._(
              /*i18n*/
              {
                id: "45Srzt"
              }
            ));
          }
        }
      });
    });
  };
  const handleSort = (direction) => {
    if (!eventId || !category.id) return;
    const currentIndex = categories.findIndex((cat) => cat.id === category.id);
    if (currentIndex === -1) return;
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const newCategories = [...categories];
    const [movedCategory] = newCategories.splice(currentIndex, 1);
    newCategories.splice(targetIndex, 0, movedCategory);
    const sortedCategories = newCategories.map((cat) => ({
      product_category_id: cat.id,
      sorted_products: (cat.products || []).map((product, index) => ({
        id: product.id,
        sort_order: index
      }))
    }));
    sortMutation.mutate({
      eventId,
      sortedCategories
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "eorM7z"
          }
        ));
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "NmpGKr"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: classNames(classes.sortableCategory), children: [
      /* @__PURE__ */ jsxs("div", { className: classes.categoryHeader, children: [
        /* @__PURE__ */ jsxs("h2", { className: classes.categoryTitle, children: [
          category.name,
          category.is_hidden && /* @__PURE__ */ jsxs(Popover, { children: [
            /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsx(IconEyeOff, { style: {
              cursor: "pointer"
            }, size: 14 }) }),
            /* @__PURE__ */ jsx(Popover.Dropdown, { children: i18n._(
              /*i18n*/
              {
                id: "8QH2Il"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.categoryActions, children: [
          /* @__PURE__ */ jsx(SortArrows, { upArrowEnabled: upSortEnabled, downArrowEnabled: downSortEnabled, onSortUp: () => handleSort("up"), onSortDown: () => handleSort("down") }),
          /* @__PURE__ */ jsx(ActionIcon, { className: classes.categoryAction, onClick: openCreateModal, title: i18n._(
            /*i18n*/
            {
              id: "EwoMtl"
            }
          ), "aria-label": i18n._(
            /*i18n*/
            {
              id: "EwoMtl"
            }
          ), variant: "transparent", children: /* @__PURE__ */ jsx(IconPlus, { size: 20 }) }),
          /* @__PURE__ */ jsx(ActionIcon, { className: classes.categoryAction, onClick: editModal.open, title: i18n._(
            /*i18n*/
            {
              id: "j1Jl7s"
            }
          ), "aria-label": i18n._(
            /*i18n*/
            {
              id: "j1Jl7s"
            }
          ), variant: "transparent", children: /* @__PURE__ */ jsx(IconPencil, { size: 20 }) }),
          /* @__PURE__ */ jsx(ActionIcon, { className: classes.categoryAction, onClick: handleDelete, title: i18n._(
            /*i18n*/
            {
              id: "VskHIx"
            }
          ), "aria-label": i18n._(
            /*i18n*/
            {
              id: "VskHIx"
            }
          ), variant: "transparent", children: isLastCategory ? /* @__PURE__ */ jsx(IconTrashOff, { size: 20 }) : /* @__PURE__ */ jsx(IconTrash, { size: 20 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.categoryContent, children })
    ] }),
    isEditModalOpen && /* @__PURE__ */ jsx(EditProductCategoryModal, { productCategoryId: category.id, onClose: editModal.close })
  ] });
};
const ProductsBlankSlate = ({
  openCreateModal,
  productCategories,
  searchTerm
}) => {
  const showLargeBlankSlate = productCategories.every((category) => category.products.length === 0) && productCategories.length === 1;
  if (searchTerm) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { imageHref: "/blank-slate/tickets.svg", heading: i18n._(
      /*i18n*/
      {
        id: "gk5uwN"
      }
    ), subHeading: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "/DNy62", values: {
      0: searchTerm ? /* @__PURE__ */ jsx("strong", { children: searchTerm }) : "your search"
    } }) }) }) });
  }
  if (showLargeBlankSlate) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { imageHref: "/blank-slate/tickets.svg", heading: i18n._(
      /*i18n*/
      {
        id: "FTfObB"
      }
    ), subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "y3qNri"
        }
      ) }),
      /* @__PURE__ */ jsx(Button$1, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
        /*i18n*/
        {
          id: "8q0EdE"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { style: {
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx("p", { style: {
      marginBottom: 20,
      marginTop: 0
    }, children: i18n._(
      /*i18n*/
      {
        id: "mf3FrP"
      }
    ) }),
    /* @__PURE__ */ jsx(Button$1, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
      /*i18n*/
      {
        id: "24l4x6"
      }
    ) })
  ] });
};
const ProductCategoryList = ({
  initialCategories,
  event,
  onCreateOpen,
  searchTerm
}) => {
  const [categories, setCategories] = useState(initialCategories);
  const [filteredCategories, setFilteredCategories] = useState(initialCategories);
  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);
  if (!categories || categories.length === 0 || !event) {
    return /* @__PURE__ */ jsx(Fragment, { children: "no categories or event" });
  }
  useEffect(() => {
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = categories.map((category) => {
        var _a;
        const categoryMatchesSearch = category.name.toLowerCase().includes(lowercaseSearch);
        const filteredProducts = (_a = category.products) == null ? void 0 : _a.filter((product) => product.title.toLowerCase().includes(lowercaseSearch));
        return {
          ...category,
          products: categoryMatchesSearch ? category.products : filteredProducts
        };
      }).filter((category) => {
        const hasMatchingProducts = category.products ? category.products.length > 0 : false;
        const categoryNameMatches = category.name.toLowerCase().includes(lowercaseSearch);
        return hasMatchingProducts || categoryNameMatches;
      });
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);
  return /* @__PURE__ */ jsx("div", { children: filteredCategories.length > 0 ? /* @__PURE__ */ jsx("div", { className: classes.categories, children: filteredCategories.map((category) => {
    if (!(category == null ? void 0 : category.products)) return /* @__PURE__ */ jsx(Fragment, {});
    return /* @__PURE__ */ jsxs(SortableCategory, { category, openCreateModal: () => onCreateOpen(category.id), isLastCategory: filteredCategories.length === 1, categories, children: [
      category.products.length === 0 && /* @__PURE__ */ jsx(ProductsBlankSlate, { productCategories: categories, searchTerm, openCreateModal: () => onCreateOpen(category.id) }),
      category.products.length > 0 && /* @__PURE__ */ jsx("div", { className: classes.cards, children: category.products.map((product) => /* @__PURE__ */ jsx(SortableProduct, { product, currencyCode: event.currency, categories, category }, product.id)) })
    ] }, category.id);
  }) }) : /* @__PURE__ */ jsx(ProductsBlankSlate, { productCategories: categories, searchTerm, openCreateModal: onCreateOpen }) });
};
const useCreateProductCategory = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      productCategoryData,
      eventId
    }) => productCategoryClient.create(eventId, productCategoryData),
    onSuccess: (_, variables) => {
      return Promise.all([queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY, variables.eventId]
      }), queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY]
      })]);
    }
  });
};
const CreateProductCategoryModal = ({
  onClose
}) => {
  const errorHandler = useFormErrorResponseHandler();
  const {
    eventId
  } = useParams();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      is_hidden: false,
      no_products_message: i18n._(
        /*i18n*/
        {
          id: "Ya1JhR"
        }
      )
    }
  });
  const mutation = useCreateProductCategory();
  const handleCreate = (values) => {
    mutation.mutateAsync({
      eventId,
      productCategoryData: values
    }).then(() => {
      onClose();
      form.reset();
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "3EXqwa"
        }
      ));
    }).catch((error) => errorHandler(form, error));
  };
  return /* @__PURE__ */ jsx(Modal, { onClose, heading: i18n._(
    /*i18n*/
    {
      id: "XletzW"
    }
  ), opened: true, size: "lg", withCloseButton: true, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => handleCreate(values)), children: [
    /* @__PURE__ */ jsx(Callout, { variant: "info", title: i18n._(
      /*i18n*/
      {
        id: "4ueloy"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "ddha3c"
      }
    ) }),
    /* @__PURE__ */ jsx(ProductCategoryForm, { form }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, disabled: mutation.isPending, children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "hqmXmc"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "XletzW"
      }
    ) })
  ] }) });
};
const Products = () => {
  var _a;
  const [createProductModalOpen, {
    open: openCreateProductModal,
    close: closeCreateProductModal
  }] = useDisclosure(false);
  const [createProductCategoryModalOpen, {
    open: openCreateProductCategoryModal,
    close: closeCreateProductCategoryModal
  }] = useDisclosure(false);
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const productCategoriesQuery = useGetEventProductCategories(eventId);
  const productCategories = (_a = productCategoriesQuery == null ? void 0 : productCategoriesQuery.data) == null ? void 0 : _a.data;
  useUrlHash("create-product", () => openCreateProductModal());
  const openCreateProduct = (categoryId) => {
    setSelectedCategoryId(() => categoryId);
    openCreateProductModal();
  };
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "tudG8q"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "NRhrIB"
      }
    ) }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBar, { onClear: () => setSearchTerm(""), placeholder: i18n._(
      /*i18n*/
      {
        id: "+0Yy2U"
      }
    ), rightSection: /* @__PURE__ */ jsx(IconChevronDown, {}), value: searchTerm, onChange: (event2) => setSearchTerm(event2.target.value) }), children: /* @__PURE__ */ jsxs(Menu, { transitionProps: {
      transition: "pop-top-right"
    }, position: "bottom", width: 220, withinPortal: true, children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", "data-testid": "product-create-button", rightSection: /* @__PURE__ */ jsx(IconChevronDown, { stroke: 1.5 }), pr: 12, children: i18n._(
        /*i18n*/
        {
          id: "hYgDIe"
        }
      ) }) }),
      /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
        /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconShoppingCart, { stroke: 1.5 }), onClick: () => openCreateProduct(void 0), children: i18n._(
          /*i18n*/
          {
            id: "6tmWch"
          }
        ) }),
        /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconCategory, { stroke: 1.5 }), onClick: openCreateProductCategoryModal, children: i18n._(
          /*i18n*/
          {
            id: "K7tIrx"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !productCategories || !event }),
    event && productCategories && /* @__PURE__ */ jsx(ProductCategoryList, { initialCategories: productCategories, event, searchTerm, onCreateOpen: openCreateProduct }),
    createProductModalOpen && /* @__PURE__ */ jsx(CreateProductModal, { selectedCategoryId, onClose: closeCreateProductModal, isOpen: createProductModalOpen }),
    createProductCategoryModalOpen && /* @__PURE__ */ jsx(CreateProductCategoryModal, { onClose: closeCreateProductCategoryModal, isOpen: createProductCategoryModalOpen })
  ] });
};
export {
  Products,
  Products as default
};

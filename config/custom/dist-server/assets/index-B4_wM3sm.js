var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { ActionIcon, NumberInput, Modal, Text, Button, TextInput, Checkbox, Tooltip, Collapse, Loader, UnstyledButton, Spoiler, Anchor, Group, Input } from "@mantine/core";
import { useParams, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { a as orderClientPublic } from "./order.client-BmBVeAyF.js";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useDisclosure, useInputState, useResizeObserver } from "@mantine/hooks";
import { useRef, useState, useEffect, useMemo } from "react";
import { a as showError, b as showSuccess, s as showInfo } from "./notifications-Coh3Ef-t.js";
import { g as getClientLocale, v as safeLocalStorageSet, w as safeLocalStorageGet, x as safeLocalStorageRemove, y as removeQueryStringFromUrl, z as setCheckoutSessionIdentifier, A as promoCodeClientPublic, B as eventsClientPublic, C as addQueryStringToUrl, D as isObjectEmpty, P as PoweredByFooter } from "../entry.server.js";
import { P as ProductPriceDisplay, C as Currency, g as getInclusiveFeeNote, a as getExclusiveFeeNote, b as getDisplayPrice } from "./index-IzdRcWBR.js";
import { E as EventType, a as TaxAndFeeType, d as EventOccurrenceStatus, f as ProductType, g as PromoCodeDiscountType, h as PromoCodeDiscountAppliesTo } from "./types-CqPWB-a5.js";
import { IconMinus, IconPlus, IconCheck, IconInfoCircle, IconChevronDown, IconClock, IconMapPin, IconX } from "@tabler/icons-react";
import classNames from "classnames";
import { f as formatDateWithLocale, b as getSafeLocale, p as prettyDate, r as relativeDate, a as formatOccurrenceEnd, l as localeFormats } from "./dates-CbVpwZeX.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { w as waitlistClientPublic } from "./waitlist.client-Dm8api1T.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { C as CheckoutThemeProvider } from "./CheckoutThemeProvider-D0cdZ-GY.js";
import { d as detectMode } from "./themeUtils-B--ztbrW.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { u as useWaitlistJoined, c as clearWaitlistJoinedForEvent } from "./useWaitlistJoined-D2Jn2EfP.js";
import { f as formatCurrency, a as getCurrencySymbol } from "./currency-Br7a8J7F.js";
import { g as getEmbedParentUrl, a as getParentOrigin } from "./iframeResize-DUQclS7o.js";
import { DatesProvider, DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { a as eventOccurrenceClientPublic } from "./event-occurrence.client-xqTaU2Nv.js";
import { g as getEventLocationDisplay } from "./effectiveLocation-BzDgAlu_.js";
import { C as CHECKOUT_PREFILL_PARAM_KEYS } from "./useCheckoutPrefill-DziFYvxr.js";
const Constants = {
  // An arbitrary to represent an infinite number of tickets
  INFINITE_TICKETS: 999999999
};
const wrapper = "_wrapper_oscrn_1";
const control = "_control_oscrn_20";
const decrement = "_decrement_oscrn_38";
const increment = "_increment_oscrn_46";
const input = "_input_oscrn_58";
const compact = "_compact_oscrn_73";
const classes = {
  wrapper,
  control,
  decrement,
  increment,
  input,
  compact
};
const getFormValue = (values, fieldName) => Number(fieldName.split(".").reduce((acc, key) => acc == null ? void 0 : acc[key], values) ?? 0);
const NumberSelector = ({
  formInstance,
  fieldName,
  min,
  max,
  sharedValues,
  selectorSize = "default",
  onLimitReached
}) => {
  const handlers = useRef(null);
  const [value, setValue] = useState(() => getFormValue(formInstance.values, fieldName));
  const minValue = min || 0;
  const maxValue = max || 100;
  const [sharedVals] = useState(() => {
    const shared = sharedValues ?? new SharedValues(maxValue);
    shared.changeValue(getFormValue(formInstance.values, fieldName));
    return shared;
  });
  useEffect(() => {
    formInstance.setFieldValue(fieldName, value);
  }, [value]);
  useEffect(() => {
    const formValue = getFormValue(formInstance.values, fieldName);
    if (formValue !== value) {
      const adjustedDifference = sharedVals.changeValue(formValue - value);
      setValue(value + adjustedDifference);
    }
  }, [formInstance.values]);
  const increment2 = () => {
    if (value === 0 && minValue > 1) {
      let adjustedMinimum = Math.max(1, minValue - sharedVals.currentValue);
      setValue(sharedVals.changeValue(Math.min(adjustedMinimum, maxValue, sharedVals.quantityRemaining)));
    } else if (sharedVals.currentValue < minValue) {
      const adjustedDifference = sharedVals.changeValue(minValue - sharedVals.currentValue);
      setValue((prevValue) => prevValue + adjustedDifference);
    } else if (value < maxValue) {
      const adjustedDifference = sharedVals.changeValue(1);
      setValue((prevValue) => prevValue + adjustedDifference);
    }
  };
  const decrement2 = () => {
    if (sharedVals.currentValue > minValue) {
      const adjustedDifference = sharedVals.changeValue(-1);
      setValue((prevValue) => prevValue + adjustedDifference);
    } else {
      sharedVals.changeValue(-value);
      setValue(0);
    }
  };
  const changeValue = (newValue) => {
    let adjustedDifference = sharedVals.changeValue(newValue - value);
    setValue(value + adjustedDifference);
  };
  const atMax = value >= maxValue || sharedVals.quantityRemaining == 0;
  const handleIncrement = () => {
    if (atMax) {
      onLimitReached == null ? void 0 : onLimitReached();
      return;
    }
    increment2();
  };
  const isEmpty = value === 0;
  const buttonSize = selectorSize === "compact" ? isEmpty ? 30 : 26 : isEmpty ? 38 : 30;
  const iconSize = selectorSize === "compact" ? isEmpty ? 14 : 13 : isEmpty ? 16 : 15;
  return /* @__PURE__ */ jsxs("div", { className: classNames(classes.wrapper, "button-input", selectorSize === "compact" && classes.compact), "data-empty": value === 0 || void 0, children: [
    value > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ActionIcon, { size: buttonSize, radius: 999, variant: "transparent", onClick: decrement2, "aria-label": i18n._(
        /*i18n*/
        {
          id: "gJY4YL"
        }
      ), onMouseDown: (event) => event.preventDefault(), className: classNames(classes.control, classes.decrement), children: /* @__PURE__ */ jsx(IconMinus, { size: iconSize, stroke: 2 }) }),
      /* @__PURE__ */ jsx(NumberInput, { mb: 0, variant: "unstyled", min: minValue, max: maxValue, handlersRef: handlers, value, hideControls: true, onChange: (newValue) => changeValue(Number(newValue) || 0), "aria-label": i18n._(
        /*i18n*/
        {
          id: "VbWX2u"
        }
      ), classNames: {
        input: classes.input
      } })
    ] }),
    /* @__PURE__ */ jsx(ActionIcon, { size: buttonSize, radius: 999, variant: "transparent", onClick: handleIncrement, "aria-label": i18n._(
      /*i18n*/
      {
        id: "nQMUIO"
      }
    ), "aria-disabled": atMax, "data-limit": atMax || void 0, onMouseDown: (event) => event.preventDefault(), className: classNames(classes.control, classes.increment), children: /* @__PURE__ */ jsx(IconPlus, { size: iconSize, stroke: 2 }) })
  ] });
};
class SharedValues {
  constructor(sharedMax) {
    __publicField(this, "sharedMax");
    __publicField(this, "currentValue");
    this.sharedMax = sharedMax;
    this.currentValue = 0;
  }
  get quantityRemaining() {
    return this.sharedMax - this.currentValue;
  }
  changeValue(difference) {
    let adjustedDifference = Math.min(difference, this.sharedMax - this.currentValue);
    this.currentValue += adjustedDifference;
    return adjustedDifference;
  }
}
const useJoinWaitlist = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      data
    }) => waitlistClientPublic.join(eventId, data)
  });
};
const DEFAULT_ACCENT = "#8b5cf6";
const JoinWaitlistModal = ({
  onClose,
  product,
  event,
  productPriceId,
  eventOccurrenceId,
  priceLabel,
  onSuccess
}) => {
  var _a, _b;
  const errorHandler = useFormErrorResponseHandler();
  const mutation = useJoinWaitlist();
  const [status, setStatus] = useState("form");
  const [errorMessage, setErrorMessage] = useState("");
  const productDisplayName = priceLabel ? `${product == null ? void 0 : product.title} - ${priceLabel}` : product == null ? void 0 : product.title;
  const occurrence = (event == null ? void 0 : event.type) === EventType.RECURRING && eventOccurrenceId ? (_a = event == null ? void 0 : event.occurrences) == null ? void 0 : _a.find((o) => Number(o.id) === Number(eventOccurrenceId)) : void 0;
  const occurrenceDate = occurrence ? formatDateWithLocale(occurrence.start_date, "shortDateTime", event.timezone, getSafeLocale(getClientLocale())) : null;
  const homepageSettings = (_b = event == null ? void 0 : event.settings) == null ? void 0 : _b.homepage_theme_settings;
  const accentColor = (homepageSettings == null ? void 0 : homepageSettings.accent) || DEFAULT_ACCENT;
  const mode = useMemo(() => (homepageSettings == null ? void 0 : homepageSettings.mode) || detectMode((homepageSettings == null ? void 0 : homepageSettings.background) || "#ffffff"), [homepageSettings == null ? void 0 : homepageSettings.mode, homepageSettings == null ? void 0 : homepageSettings.background]);
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      consent: false
    },
    validate: {
      first_name: hasLength({
        min: 1
      }, i18n._(
        /*i18n*/
        {
          id: "4pwejF"
        }
      )),
      email: isEmail(i18n._(
        /*i18n*/
        {
          id: "OtjenF"
        }
      )),
      consent: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "pCLes8"
        }
      ) : null
    },
    validateInputOnBlur: true
  });
  const handleSubmit = ({
    consent: _,
    ...values
  }) => {
    mutation.mutate({
      eventId: event.id,
      data: {
        ...values,
        product_price_id: Number(productPriceId),
        event_occurrence_id: eventOccurrenceId ? Number(eventOccurrenceId) : void 0
      }
    }, {
      onSuccess: () => {
        setStatus("success");
        form.reset();
      },
      onError: (error) => {
        var _a2, _b2;
        const message = (_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message;
        if (message) {
          setErrorMessage(message);
          setStatus("error");
        } else {
          errorHandler(form, error);
        }
      }
    });
  };
  const handleClose = () => {
    if (status === "success") {
      onSuccess();
    }
    onClose();
  };
  if (status === "success") {
    return /* @__PURE__ */ jsx(CheckoutThemeProvider, { accentColor, mode, children: /* @__PURE__ */ jsx(Modal, { opened: true, onClose: handleClose, size: "lg", overlayProps: {
      opacity: 0.55,
      blur: 3
    }, withCloseButton: false, children: /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      padding: "30px 20px"
    }, children: [
      /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "🎉" }),
      /* @__PURE__ */ jsx(Text, { size: "xl", fw: 600, mb: "xs", children: i18n._(
        /*i18n*/
        {
          id: "qGZz0m"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "xl", children: occurrenceDate ? i18n._(
        /*i18n*/
        {
          id: "mfM/HJ",
          values: {
            productDisplayName,
            occurrenceDate
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "iy+M+c",
          values: {
            productDisplayName
          }
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, onClick: handleClose, children: i18n._(
        /*i18n*/
        {
          id: "yz7wBu"
        }
      ) })
    ] }) }) });
  }
  if (status === "error") {
    return /* @__PURE__ */ jsx(CheckoutThemeProvider, { accentColor, mode, children: /* @__PURE__ */ jsx(Modal, { opened: true, onClose: handleClose, size: "lg", overlayProps: {
      opacity: 0.55,
      blur: 3
    }, withCloseButton: false, children: /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      padding: "30px 20px"
    }, children: [
      /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "😕" }),
      /* @__PURE__ */ jsx(Text, { size: "xl", fw: 600, mb: "xs", children: i18n._(
        /*i18n*/
        {
          id: "h0dx5e"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "xl", children: errorMessage || i18n._(
        /*i18n*/
        {
          id: "lkE00/"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, onClick: handleClose, children: i18n._(
        /*i18n*/
        {
          id: "yz7wBu"
        }
      ) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx(CheckoutThemeProvider, { accentColor, mode, children: /* @__PURE__ */ jsx(Modal, { opened: true, onClose, title: i18n._(
    /*i18n*/
    {
      id: "dLouFI",
      values: {
        productDisplayName
      }
    }
  ), size: "lg", overlayProps: {
    opacity: 0.55,
    blur: 3
  }, closeOnClickOutside: false, styles: {
    title: {
      fontWeight: 600,
      fontSize: "1.25rem"
    }
  }, children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.stopPropagation();
    form.onSubmit(handleSubmit)(e);
  }, style: {
    padding: "0 15px 15px"
  }, children: [
    occurrenceDate && /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "md", children: i18n._(
      /*i18n*/
      {
        id: "ZlLcht",
        values: {
          occurrenceDate
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("first_name"), label: i18n._(
        /*i18n*/
        {
          id: "kODvZJ"
        }
      ), required: true }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("last_name"), label: i18n._(
        /*i18n*/
        {
          id: "UXBCwc"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("email"), label: i18n._(
      /*i18n*/
      {
        id: "O3oNi5"
      }
    ), type: "email", required: true }),
    /* @__PURE__ */ jsx(Checkbox, { ...form.getInputProps("consent", {
      type: "checkbox"
    }), label: i18n._(
      /*i18n*/
      {
        id: "O8m7VA"
      }
    ), mt: "md", error: form.errors.consent }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "xl", disabled: mutation.isPending, children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "hqmXmc"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "SNzppu"
      }
    ) })
  ] }) }) });
};
const JoinWaitlistButton = ({
  product,
  event,
  productPriceId,
  priceLabel,
  eventOccurrenceId
}) => {
  const [modalOpen, {
    open: openModal,
    close: closeModal
  }] = useDisclosure(false);
  const {
    joined: hasJoined,
    markJoined
  } = useWaitlistJoined(event.id, productPriceId, eventOccurrenceId);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    hasJoined ? /* @__PURE__ */ jsxs("span", { className: "hi-waitlist-joined", "data-testid": "join-waitlist-button", children: [
      /* @__PURE__ */ jsx(IconCheck, { size: 14, stroke: 2.5 }),
      i18n._(
        /*i18n*/
        {
          id: "H7stQC"
        }
      )
    ] }) : /* @__PURE__ */ jsx("button", { type: "button", className: "hi-waitlist-button", "data-testid": "join-waitlist-button", onClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    }, children: i18n._(
      /*i18n*/
      {
        id: "SNzppu"
      }
    ) }),
    modalOpen && /* @__PURE__ */ jsx(JoinWaitlistModal, { onClose: closeModal, isOpen: true, product, event, productPriceId, priceLabel, eventOccurrenceId, onSuccess: () => {
      markJoined();
      closeModal();
    } })
  ] });
};
const ProductPriceSaleDateMessage = ({
  price,
  event,
  product,
  eventOccurrenceId
}) => {
  if (price.is_sold_out) {
    if (product.waitlist_enabled && (event.type !== EventType.RECURRING || eventOccurrenceId)) {
      return /* @__PURE__ */ jsx(JoinWaitlistButton, { product, event, productPriceId: price.id, priceLabel: price.label, eventOccurrenceId });
    }
    return i18n._(
      /*i18n*/
      {
        id: "lgFfeO"
      }
    );
  }
  if (price.is_after_sale_end_date) {
    return i18n._(
      /*i18n*/
      {
        id: "hBsw5C"
      }
    );
  }
  if (price.is_before_sale_start_date) {
    return /* @__PURE__ */ jsxs("span", { children: [
      i18n._(
        /*i18n*/
        {
          id: "kpAzPe"
        }
      ),
      " ",
      /* @__PURE__ */ jsx(Tooltip, { label: prettyDate(String(price.sale_start_date), event.timezone), children: /* @__PURE__ */ jsxs("span", { children: [
        relativeDate(String(price.sale_start_date)),
        " ",
        /* @__PURE__ */ jsx(IconInfoCircle, { size: 12 })
      ] }) })
    ] });
  }
  return i18n._(
    /*i18n*/
    {
      id: "OJx3wK"
    }
  );
};
const ProductAvailabilityMessage = ({
  product,
  event,
  eventOccurrenceId
}) => {
  var _a, _b;
  if (product.is_sold_out) {
    if (product.waitlist_enabled && (event.type !== EventType.RECURRING || eventOccurrenceId) && product.type !== "TIERED") {
      return /* @__PURE__ */ jsx(JoinWaitlistButton, { product, event, productPriceId: (_b = (_a = product.prices) == null ? void 0 : _a[0]) == null ? void 0 : _b.id, eventOccurrenceId });
    }
    return i18n._(
      /*i18n*/
      {
        id: "lgFfeO"
      }
    );
  }
  if (product.is_after_sale_end_date) {
    return i18n._(
      /*i18n*/
      {
        id: "hBsw5C"
      }
    );
  }
  if (product.is_before_sale_start_date) {
    return /* @__PURE__ */ jsxs("span", { children: [
      i18n._(
        /*i18n*/
        {
          id: "kpAzPe"
        }
      ),
      " ",
      /* @__PURE__ */ jsx(Tooltip, { label: prettyDate(String(product.sale_start_date), event.timezone), children: /* @__PURE__ */ jsxs("span", { children: [
        relativeDate(String(product.sale_start_date)),
        " ",
        /* @__PURE__ */ jsx(IconInfoCircle, { size: 12 })
      ] }) })
    ] });
  }
  return i18n._(
    /*i18n*/
    {
      id: "OJx3wK"
    }
  );
};
const ProductPriceAvailability = ({
  product,
  price,
  event,
  eventOccurrenceId
}) => {
  if (product.type === "TIERED") {
    return /* @__PURE__ */ jsx(ProductPriceSaleDateMessage, { price, event, product, eventOccurrenceId });
  }
  return /* @__PURE__ */ jsx(ProductAvailabilityMessage, { product, event, eventOccurrenceId });
};
const FeeBreakdown = ({
  toggleLabel,
  rows,
  currency,
  footnote
}) => {
  const [opened, setOpened] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: classNames("hi-fee-toggle", opened && "open"), "aria-expanded": opened, onClick: () => setOpened((current) => !current), children: [
      toggleLabel,
      /* @__PURE__ */ jsx(IconChevronDown, { size: 13, stroke: 2, className: opened ? "open" : "" })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { expanded: opened, transitionDuration: 250, className: "hi-fee-breakdown-wrapper", children: /* @__PURE__ */ jsxs("div", { className: "hi-fee-breakdown", children: [
      rows.map((row, index) => /* @__PURE__ */ jsxs("div", { className: classNames("hi-fee-breakdown-row", row.isTotal && "hi-fee-breakdown-row-total"), children: [
        /* @__PURE__ */ jsx("span", { className: "hi-fee-breakdown-label", children: row.label }),
        /* @__PURE__ */ jsx("span", { className: "hi-fee-breakdown-amount", children: formatCurrency(row.amount, currency) })
      ] }, index)),
      footnote && /* @__PURE__ */ jsx("div", { className: "hi-fee-breakdown-footnote", children: footnote })
    ] }) })
  ] });
};
const LIMIT_MESSAGE_TIMEOUT_MS = 4e3;
const getFeesAndTaxTotal = (price) => (price.tax_total || 0) + (price.fee_total || 0);
const getAvailabilityReason = (price) => {
  if (price.is_sold_out) {
    return "sold-out";
  }
  if (price.is_after_sale_end_date) {
    return "ended";
  }
  if (price.is_before_sale_start_date) {
    return "upcoming";
  }
  return "unavailable";
};
const TieredPricing = ({
  product,
  event,
  form,
  productIndex,
  eventOccurrenceId,
  displayMode = "list",
  showStepper = true
}) => {
  var _a, _b, _c;
  const [limitMessages, setLimitMessages] = useState({});
  const limitTimeoutsRef = useRef({});
  useEffect(() => () => {
    Object.values(limitTimeoutsRef.current).forEach(clearTimeout);
  }, []);
  const priceDisplayMode = (_a = event == null ? void 0 : event.settings) == null ? void 0 : _a.price_display_mode;
  const isInclusive = priceDisplayMode === "INCLUSIVE";
  const getQuantityCap = (price) => Math.min(price.quantity_remaining ?? 50, product.max_per_order ?? 50);
  const flashLimitMessage = (price, index) => {
    const cap = getQuantityCap(price);
    const limitedByStock = (price.quantity_remaining ?? Infinity) < (product.max_per_order ?? 50);
    const message = limitedByStock ? i18n._(
      /*i18n*/
      {
        id: "wCRLS9",
        values: {
          cap
        }
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "7qu2YV",
        values: {
          cap
        }
      }
    );
    setLimitMessages((previous) => ({
      ...previous,
      [index]: message
    }));
    clearTimeout(limitTimeoutsRef.current[index]);
    limitTimeoutsRef.current[index] = setTimeout(() => {
      setLimitMessages((previous) => {
        const next = {
          ...previous
        };
        delete next[index];
        return next;
      });
    }, LIMIT_MESSAGE_TIMEOUT_MS);
  };
  const exclusiveFootnote = isInclusive ? void 0 : i18n._(
    /*i18n*/
    {
      id: "Z/ZU8N"
    }
  );
  const buildSinglePriceRows = (price) => {
    const feeNames = (product.taxes || []).filter((item) => item.type === TaxAndFeeType.Fee).map((item) => item.name).join(", ");
    const taxNames = (product.taxes || []).filter((item) => item.type === TaxAndFeeType.Tax).map((item) => item.name).join(", ");
    const rows = [{
      label: i18n._(
        /*i18n*/
        {
          id: "p2OLF3"
        }
      ),
      amount: Number(price.price)
    }];
    if ((price.fee_total || 0) > 0) {
      rows.push({
        label: feeNames || i18n._(
          /*i18n*/
          {
            id: "/mfICu"
          }
        ),
        amount: price.fee_total || 0
      });
    }
    if ((price.tax_total || 0) > 0) {
      rows.push({
        label: taxNames || i18n._(
          /*i18n*/
          {
            id: "JpohL9"
          }
        ),
        amount: price.tax_total || 0
      });
    }
    rows.push({
      label: i18n._(
        /*i18n*/
        {
          id: "72c5Qo"
        }
      ),
      amount: Number(price.price) + getFeesAndTaxTotal(price),
      isTotal: true
    });
    return rows;
  };
  const renderQuantityControl = (price, index) => /* @__PURE__ */ jsxs("div", { className: "hi-product-quantity-selector", children: [
    product.is_available && price.is_available && showStepper && /* @__PURE__ */ jsx(NumberSelector, { min: product.min_per_order ?? 0, max: getQuantityCap(price), fieldName: `products.${productIndex}.quantities.${index}.quantity`, formInstance: form, selectorSize: displayMode === "list" ? "compact" : "default", onLimitReached: () => flashLimitMessage(price, index) }),
    (!product.is_available || !price.is_available) && /* @__PURE__ */ jsxs("div", { className: "hi-product-availability", "data-reason": getAvailabilityReason(price), children: [
      (price.is_before_sale_start_date || price.is_after_sale_end_date) && !price.is_sold_out && /* @__PURE__ */ jsx(IconClock, { size: 14, stroke: 2 }),
      /* @__PURE__ */ jsx(ProductPriceAvailability, { product, price, event, eventOccurrenceId })
    ] })
  ] });
  const renderRowMessages = (index) => /* @__PURE__ */ jsxs(Fragment, { children: [
    form.errors[`products.${productIndex}.quantities.${index}.quantity`] && /* @__PURE__ */ jsx("div", { className: "hi-product-quantity-error", children: form.errors[`products.${productIndex}.quantities.${index}.quantity`] }),
    limitMessages[index] && /* @__PURE__ */ jsx("div", { className: "hi-product-quantity-error", children: limitMessages[index] })
  ] });
  if (displayMode === "header") {
    const price = (_b = product.prices) == null ? void 0 : _b[0];
    if (!price) {
      return null;
    }
    const feesAndTax = getFeesAndTaxTotal(price);
    const isPriceAvailable = product.is_available && price.is_available;
    return /* @__PURE__ */ jsxs("div", { className: "hi-product-header-pricing", "data-unavailable": !isPriceAvailable ? getAvailabilityReason(price) : void 0, children: [
      /* @__PURE__ */ jsxs("div", { className: "hi-price-tier-row", children: [
        /* @__PURE__ */ jsx("div", { className: "hi-price-tier", children: /* @__PURE__ */ jsxs("div", { className: "hi-price-tier-price", children: [
          /* @__PURE__ */ jsx(ProductPriceDisplay, { price, product, currency: event == null ? void 0 : event.currency, className: "hi-price-tier-price-amount", freeLabel: i18n._(
            /*i18n*/
            {
              id: "2POOFK"
            }
          ), taxAndServiceFeeDisplayType: priceDisplayMode, feeDisplay: "none" }),
          price.is_discounted && /* @__PURE__ */ jsx("div", { className: "hi-price-strike", children: /* @__PURE__ */ jsx(Currency, { price: price.price_before_discount, currency: event == null ? void 0 : event.currency, className: "hi-price-tier-price-amount" }) })
        ] }) }),
        renderQuantityControl(price, 0)
      ] }),
      feesAndTax > 0 && isPriceAvailable && /* @__PURE__ */ jsx(FeeBreakdown, { toggleLabel: isInclusive ? getInclusiveFeeNote((price.fee_total || 0) > 0, (price.tax_total || 0) > 0) : getExclusiveFeeNote(formatCurrency(feesAndTax, event == null ? void 0 : event.currency), (price.fee_total || 0) > 0, (price.tax_total || 0) > 0), rows: buildSinglePriceRows(price), currency: event == null ? void 0 : event.currency, footnote: exclusiveFootnote }),
      renderRowMessages(0)
    ] });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: (_c = product == null ? void 0 : product.prices) == null ? void 0 : _c.map((price, index) => {
    const feesAndTax = getFeesAndTaxTotal(price);
    const isPriceAvailable = product.is_available && price.is_available;
    return /* @__PURE__ */ jsxs("div", { className: "hi-price-tier-row", "data-unavailable": !isPriceAvailable ? getAvailabilityReason(price) : void 0, children: [
      /* @__PURE__ */ jsxs("div", { className: "hi-price-tier-main", children: [
        /* @__PURE__ */ jsxs("div", { className: "hi-price-tier", children: [
          price.label && /* @__PURE__ */ jsx("div", { className: "hi-price-tier-label", children: price.label }),
          /* @__PURE__ */ jsxs("div", { className: "hi-price-tier-price", children: [
            product.type === "DONATION" && /* @__PURE__ */ jsx("div", { className: "hi-donation-input-wrapper", children: /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps(`products.${productIndex}.quantities.${index}.price`), type: "number", min: product.price, step: 0.01, placeholder: i18n._(
              /*i18n*/
              {
                id: "W5l9HD"
              }
            ), "aria-label": i18n._(
              /*i18n*/
              {
                id: "hehnjM"
              }
            ), required: true, mb: 0, leftSection: getCurrencySymbol(event == null ? void 0 : event.currency), classNames: {
              input: "hi-donation-input"
            } }) }),
            product.type !== "DONATION" && /* @__PURE__ */ jsx(ProductPriceDisplay, { price, product, currency: event == null ? void 0 : event.currency, className: "hi-price-tier-price-amount", freeLabel: i18n._(
              /*i18n*/
              {
                id: "2POOFK"
              }
            ), taxAndServiceFeeDisplayType: priceDisplayMode, feeDisplay: "none" })
          ] })
        ] }),
        renderQuantityControl(price, index)
      ] }),
      product.type !== "DONATION" && feesAndTax > 0 && isPriceAvailable && /* @__PURE__ */ jsx(FeeBreakdown, { toggleLabel: isInclusive ? getInclusiveFeeNote((price.fee_total || 0) > 0, (price.tax_total || 0) > 0) : getExclusiveFeeNote(formatCurrency(feesAndTax, event == null ? void 0 : event.currency), (price.fee_total || 0) > 0, (price.tax_total || 0) > 0), rows: buildSinglePriceRows(price), currency: event == null ? void 0 : event.currency, footnote: exclusiveFootnote }),
      price.is_discounted && /* @__PURE__ */ jsx("div", { className: "hi-price-strike", children: /* @__PURE__ */ jsx(Currency, { price: price.price_before_discount, currency: event == null ? void 0 : event.currency, className: "hi-price-tier-price-amount" }) }),
      renderRowMessages(index)
    ] }, index);
  }) });
};
const getSessionIdentifier = () => {
  const hashString = (str) => {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    let hexHash = (hash >>> 0).toString(16);
    while (hexHash.length < 8) {
      hexHash = "0" + hexHash;
    }
    return hexHash.slice(0, 12);
  };
  const getFingerprint = () => {
    const fingerprint = {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezoneOffset: (/* @__PURE__ */ new Date()).getTimezoneOffset(),
      language: navigator.language || navigator.userLanguage || "unknown",
      platform: navigator.platform || "unknown",
      canvas: getCanvasFingerprint(),
      hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
      deviceMemory: navigator.deviceMemory || "unknown",
      maxTouchPoints: navigator.maxTouchPoints || "unknown",
      vendor: navigator.vendor || "unknown"
    };
    const fingerprintString = JSON.stringify(fingerprint);
    return hashString(fingerprintString);
  };
  const getCanvasFingerprint = () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const text = "Session ID";
      if (!ctx) {
        return "unsupported";
      }
      ctx.textBaseline = "top";
      ctx.font = "16px Arial";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText(text, 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText(text, 4, 17);
      return canvas.toDataURL();
    } catch (e) {
      return "unsupported";
    }
  };
  try {
    return getFingerprint();
  } catch (e) {
    const fallback = {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezoneOffset: (/* @__PURE__ */ new Date()).getTimezoneOffset()
    };
    const fallbackString = JSON.stringify(fallback);
    return hashString(fallbackString);
  }
};
dayjs.extend(utc);
dayjs.extend(timezone);
const GET_EVENT_OCCURRENCES_PUBLIC_QUERY_KEY = "getEventOccurrencesPublic";
const useGetEventOccurrencesPublic = (eventId, monthKey, eventTimezone, enabled) => {
  return useQuery({
    queryKey: [GET_EVENT_OCCURRENCES_PUBLIC_QUERY_KEY, eventId, monthKey],
    queryFn: async () => {
      const monthStart = dayjs.tz(`${monthKey}-01`, eventTimezone).startOf("month");
      const monthEnd = monthStart.endOf("month");
      const {
        data
      } = await eventOccurrenceClientPublic.all(eventId, monthStart.utc().format("YYYY-MM-DD HH:mm:ss"), monthEnd.utc().format("YYYY-MM-DD HH:mm:ss"));
      return data;
    },
    staleTime: 60 * 1e3,
    refetchOnWindowFocus: false,
    enabled: enabled && !!eventId && !!monthKey
  });
};
dayjs.extend(utc);
dayjs.extend(timezone);
const LOW_AVAILABILITY_THRESHOLD = 10;
const buildRecurrenceSummary = (rule) => {
  if (!rule) return null;
  const dayLabels = {
    monday: i18n._(
      /*i18n*/
      {
        id: "hty0d5"
      }
    ),
    tuesday: i18n._(
      /*i18n*/
      {
        id: "G3myU+"
      }
    ),
    wednesday: i18n._(
      /*i18n*/
      {
        id: "VAcXNz"
      }
    ),
    thursday: i18n._(
      /*i18n*/
      {
        id: "kkDQ8m"
      }
    ),
    friday: i18n._(
      /*i18n*/
      {
        id: "39y5bn"
      }
    ),
    saturday: i18n._(
      /*i18n*/
      {
        id: "+5kO8P"
      }
    ),
    sunday: i18n._(
      /*i18n*/
      {
        id: "DBC3t5"
      }
    )
  };
  switch (rule.frequency) {
    case "daily":
      return rule.interval > 1 ? i18n._(
        /*i18n*/
        {
          id: "2LJU4o",
          values: {
            0: rule.interval
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "U0sC6H"
        }
      );
    case "weekly": {
      const days = (rule.days_of_week || []).map((d) => dayLabels[d] || d);
      if (days.length === 0) return rule.interval > 1 ? i18n._(
        /*i18n*/
        {
          id: "nn9ice",
          values: {
            0: rule.interval
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "4XSc4l"
        }
      );
      return days.length === 1 ? rule.interval > 1 ? i18n._(
        /*i18n*/
        {
          id: "Cdr8f9",
          values: {
            0: rule.interval,
            1: days[0]
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "nwiZdc",
          values: {
            0: days[0]
          }
        }
      ) : rule.interval > 1 ? i18n._(
        /*i18n*/
        {
          id: "Cdr8f9",
          values: {
            0: rule.interval,
            1: days.join(", ")
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "nwiZdc",
          values: {
            0: days.join(", ")
          }
        }
      );
    }
    case "monthly":
      return rule.interval > 1 ? i18n._(
        /*i18n*/
        {
          id: "yLiYx+",
          values: {
            0: rule.interval
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "+8Nek/"
        }
      );
    case "yearly":
      return rule.interval > 1 ? i18n._(
        /*i18n*/
        {
          id: "GVEHRk",
          values: {
            0: rule.interval
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "zkWmBh"
        }
      );
    default:
      return null;
  }
};
const dateKey = (occ, tz) => dayjs.utc(occ.start_date).tz(tz).format("YYYY-MM-DD");
const byStartDate = (a, b) => a.start_date < b.start_date ? -1 : a.start_date > b.start_date ? 1 : 0;
const isBookable = (occ) => occ.status === EventOccurrenceStatus.ACTIVE && !occ.is_past;
const isSelectable = (occ, waitlistAvailable) => isBookable(occ) || occ.status === EventOccurrenceStatus.SOLD_OUT && !!waitlistAvailable;
const sameId = (a, b) => a !== void 0 && a !== null && b !== void 0 && b !== null && Number(a) === Number(b);
const getActiveOccurrences = (occurrences) => occurrences.filter((occ) => (occ.status === EventOccurrenceStatus.ACTIVE || occ.status === EventOccurrenceStatus.SOLD_OUT) && !occ.is_past);
const capacityInfo = (occ) => {
  if (!isBookable(occ)) return null;
  const capacity = occ.available_capacity;
  if (capacity === null || capacity === void 0 || capacity <= 0) return null;
  const low = capacity <= LOW_AVAILABILITY_THRESHOLD;
  return {
    label: low ? i18n._(
      /*i18n*/
      {
        id: "scPxI/",
        values: {
          capacity
        }
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "PSChHo",
        values: {
          capacity
        }
      }
    ),
    low
  };
};
const SlotRow = ({
  occ,
  tz,
  locale,
  selected,
  onSelect,
  waitlistAvailable,
  locationDisplay
}) => {
  const soldOut = occ.status === EventOccurrenceStatus.SOLD_OUT;
  const cancelled = occ.status === EventOccurrenceStatus.CANCELLED;
  const selectable = isSelectable(occ, waitlistAvailable);
  const inProgress = !cancelled && !occ.is_past && dayjs.utc(occ.start_date).isBefore(dayjs());
  const startTime = formatDateWithLocale(occ.start_date, "timeOnly", tz, locale);
  const endTime = occ.end_date ? formatOccurrenceEnd(occ.end_date, occ.start_date, tz, locale) : null;
  const timeLabel = `${startTime}${endTime ? ` – ${endTime}` : ""}`;
  const spots = capacityInfo(occ);
  const locationLabel = locationDisplay ? locationDisplay.isOnline ? i18n._(
    /*i18n*/
    {
      id: "oXOSPE"
    }
  ) : locationDisplay.short : null;
  const statusLabel = cancelled ? i18n._(
    /*i18n*/
    {
      id: "vv7kpg"
    }
  ) : soldOut ? selectable ? i18n._(
    /*i18n*/
    {
      id: "1hupow"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "Mi1rVn"
    }
  ) : (spots == null ? void 0 : spots.label) ?? null;
  const ariaLabel = [timeLabel, inProgress ? i18n._(
    /*i18n*/
    {
      id: "/LCAwL"
    }
  ) : null, occ.label, locationLabel, statusLabel, selected ? i18n._(
    /*i18n*/
    {
      id: "ylXj1N"
    }
  ) : null].filter(Boolean).join(", ");
  return /* @__PURE__ */ jsxs(UnstyledButton, { className: ["hi-time-slot", selected ? "hi-time-slot-selected" : "", !selectable ? "hi-time-slot-disabled" : ""].filter(Boolean).join(" "), disabled: !selectable, "aria-pressed": selectable ? selected : void 0, "aria-label": ariaLabel, onClick: () => {
    if (selectable && occ.id) onSelect(occ.id, occ);
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "hi-time-slot-main", children: [
      /* @__PURE__ */ jsxs("div", { className: "hi-time-slot-time", children: [
        selected ? /* @__PURE__ */ jsx(IconCheck, { size: 15 }) : /* @__PURE__ */ jsx(IconClock, { size: 15 }),
        /* @__PURE__ */ jsx("span", { className: "hi-time-slot-time-text", children: timeLabel }),
        occ.label && /* @__PURE__ */ jsx("span", { className: "hi-time-slot-label", children: occ.label })
      ] }),
      locationLabel && /* @__PURE__ */ jsxs("div", { className: "hi-time-slot-location", children: [
        /* @__PURE__ */ jsx(IconMapPin, { size: 12 }),
        /* @__PURE__ */ jsx("span", { children: locationLabel })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hi-time-slot-meta", children: [
      inProgress && /* @__PURE__ */ jsx("span", { className: "hi-time-slot-in-progress", children: i18n._(
        /*i18n*/
        {
          id: "/LCAwL"
        }
      ) }),
      cancelled && /* @__PURE__ */ jsx("span", { className: "hi-time-slot-cancelled", children: i18n._(
        /*i18n*/
        {
          id: "vv7kpg"
        }
      ) }),
      soldOut && /* @__PURE__ */ jsx("span", { className: "hi-time-slot-sold-out", children: i18n._(
        /*i18n*/
        {
          id: "Mi1rVn"
        }
      ) }),
      soldOut && selectable && /* @__PURE__ */ jsx("span", { className: "hi-time-slot-waitlist", children: i18n._(
        /*i18n*/
        {
          id: "u0n+wz"
        }
      ) }),
      spots && /* @__PURE__ */ jsx("span", { className: `hi-time-slot-spots${spots.low ? " hi-time-slot-spots-low" : ""}`, children: spots.label })
    ] })
  ] });
};
const locationDisplayKey = (display) => {
  if (!display) return "none";
  if (display.isOnline) return "online";
  return `${display.short ?? ""}|${display.full ?? ""}`;
};
const TimeSlotList = ({
  event,
  slots,
  tz,
  locale,
  selectedOccurrenceId,
  onSelect,
  waitlistAvailable
}) => {
  if (slots.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "hi-slot-empty", children: i18n._(
      /*i18n*/
      {
        id: "Ps6Xtf"
      }
    ) });
  }
  const first = slots[0];
  const slotCount = slots.filter(isBookable).length;
  const dayName = formatDateWithLocale(first.start_date, "dayName", tz, locale);
  const monthShort = formatDateWithLocale(first.start_date, "monthShort", tz, locale);
  const dayOfMonth = formatDateWithLocale(first.start_date, "dayOfMonth", tz, locale);
  const slotDisplays = slots.map((occ) => getEventLocationDisplay(event, occ));
  const locationsVary = new Set(slotDisplays.map(locationDisplayKey)).size > 1;
  const sharedDisplay = locationsVary ? null : slotDisplays[0];
  return /* @__PURE__ */ jsxs("div", { className: "hi-slot-panel-inner", children: [
    /* @__PURE__ */ jsxs("div", { className: "hi-slot-header", "aria-live": "polite", children: [
      /* @__PURE__ */ jsxs("div", { className: "hi-slot-date-badge", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("span", { className: "hi-slot-badge-month", children: monthShort }),
        /* @__PURE__ */ jsx("span", { className: "hi-slot-badge-day", children: dayOfMonth })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hi-slot-header-text", children: [
        /* @__PURE__ */ jsx("div", { className: "hi-slot-header-day", children: dayName }),
        /* @__PURE__ */ jsx("div", { className: "hi-slot-header-count", children: slotCount === 0 ? i18n._(
          /*i18n*/
          {
            id: "lgFfeO"
          }
        ) : slotCount === 1 ? i18n._(
          /*i18n*/
          {
            id: "y2Jh0m"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "VFLd0I",
            values: {
              slotCount
            }
          }
        ) }),
        sharedDisplay && /* @__PURE__ */ jsxs("div", { className: "hi-slot-header-location", children: [
          /* @__PURE__ */ jsx(IconMapPin, { size: 13 }),
          sharedDisplay.isOnline ? /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "oXOSPE"
            }
          ) }) : sharedDisplay.mapsUrl ? /* @__PURE__ */ jsx("a", { href: sharedDisplay.mapsUrl, target: "_blank", rel: "noopener noreferrer", className: "hi-slot-header-location-link", children: sharedDisplay.short }) : /* @__PURE__ */ jsx("span", { children: sharedDisplay.short })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hi-slot-list", role: "group", "aria-label": i18n._(
      /*i18n*/
      {
        id: "dwDH1K",
        values: {
          dayName
        }
      }
    ), children: slots.map((occ, index) => /* @__PURE__ */ jsx(SlotRow, { occ, tz, locale, selected: sameId(selectedOccurrenceId, occ.id), onSelect, waitlistAvailable, locationDisplay: locationsVary ? slotDisplays[index] : null }, occ.id)) })
  ] });
};
const ProductsPane = ({
  event,
  daySlots,
  selectedOccurrence,
  tz,
  locale,
  onSelect,
  isLoading,
  waitlistAvailable,
  children
}) => {
  const switcherSlots = daySlots.filter((occ) => isBookable(occ) || occ.status === EventOccurrenceStatus.SOLD_OUT);
  const dayName = formatDateWithLocale(selectedOccurrence.start_date, "dayName", tz, locale);
  const monthShort = formatDateWithLocale(selectedOccurrence.start_date, "monthShort", tz, locale);
  const dayOfMonth = formatDateWithLocale(selectedOccurrence.start_date, "dayOfMonth", tz, locale);
  const startTime = formatDateWithLocale(selectedOccurrence.start_date, "timeOnly", tz, locale);
  const endTime = selectedOccurrence.end_date ? formatOccurrenceEnd(selectedOccurrence.end_date, selectedOccurrence.start_date, tz, locale) : null;
  const timeLabel = `${startTime}${endTime ? ` – ${endTime}` : ""}`;
  const spots = capacityInfo(selectedOccurrence);
  const locationDisplay = getEventLocationDisplay(event, selectedOccurrence);
  return /* @__PURE__ */ jsxs("div", { className: "hi-products-pane", children: [
    /* @__PURE__ */ jsxs("div", { className: "hi-slot-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "hi-slot-date-badge", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("span", { className: "hi-slot-badge-month", children: monthShort }),
        /* @__PURE__ */ jsx("span", { className: "hi-slot-badge-day", children: dayOfMonth })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hi-slot-header-text", children: [
        /* @__PURE__ */ jsx("div", { className: "hi-slot-header-day", children: dayName }),
        /* @__PURE__ */ jsxs("div", { className: "hi-slot-header-time", children: [
          /* @__PURE__ */ jsx(IconClock, { size: 13 }),
          /* @__PURE__ */ jsx("span", { children: timeLabel }),
          selectedOccurrence.label && /* @__PURE__ */ jsx("span", { className: "hi-time-slot-label", children: selectedOccurrence.label }),
          spots && /* @__PURE__ */ jsx("span", { className: `hi-slot-header-spots${spots.low ? " hi-slot-header-spots-low" : ""}`, children: spots.label }),
          selectedOccurrence.status === EventOccurrenceStatus.SOLD_OUT && /* @__PURE__ */ jsx("span", { className: "hi-slot-header-sold-out", children: i18n._(
            /*i18n*/
            {
              id: "Mi1rVn"
            }
          ) })
        ] }),
        locationDisplay && /* @__PURE__ */ jsxs("div", { className: "hi-slot-header-location", children: [
          /* @__PURE__ */ jsx(IconMapPin, { size: 13 }),
          locationDisplay.isOnline ? /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "oXOSPE"
            }
          ) }) : locationDisplay.mapsUrl ? /* @__PURE__ */ jsx("a", { href: locationDisplay.mapsUrl, target: "_blank", rel: "noopener noreferrer", className: "hi-slot-header-location-link", children: locationDisplay.short }) : /* @__PURE__ */ jsx("span", { children: locationDisplay.short })
        ] })
      ] })
    ] }),
    switcherSlots.length > 1 && /* @__PURE__ */ jsx("div", { className: "hi-time-switcher", role: "group", "aria-label": i18n._(
      /*i18n*/
      {
        id: "ssospy"
      }
    ), children: switcherSlots.map((occ) => {
      const isSelected = sameId(occ.id, selectedOccurrence.id);
      const soldOut = occ.status === EventOccurrenceStatus.SOLD_OUT;
      const chipDisabled = soldOut && !waitlistAvailable;
      const chipTime = formatDateWithLocale(occ.start_date, "timeOnly", tz, locale);
      return /* @__PURE__ */ jsxs(UnstyledButton, { className: `hi-time-chip${isSelected ? " hi-time-chip-active" : ""}${soldOut ? " hi-time-chip-sold-out" : ""}`, disabled: chipDisabled, "aria-pressed": chipDisabled ? void 0 : isSelected, "aria-label": soldOut ? chipDisabled ? i18n._(
        /*i18n*/
        {
          id: "RZ0JX3",
          values: {
            chipTime
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "M4KnFs",
          values: {
            chipTime
          }
        }
      ) : void 0, onClick: () => occ.id && onSelect(occ.id, occ), children: [
        chipTime,
        soldOut && /* @__PURE__ */ jsx("span", { className: "hi-time-chip-sold-out-label", children: i18n._(
          /*i18n*/
          {
            id: "Mi1rVn"
          }
        ) })
      ] }, occ.id);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: `hi-products-slot${isLoading ? " hi-products-slot-loading" : ""}`, children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "hi-occurrence-loading-overlay", children: /* @__PURE__ */ jsx(Loader, { size: "sm", color: "var(--widget-primary-color, #228be6)" }) }),
      children
    ] })
  ] });
};
const OccurrencePicker = ({
  event,
  selectedOccurrenceId,
  pendingInitialOccurrenceId,
  onSelect,
  activeOccurrences,
  productSlot,
  isProductsLoading,
  waitlistAvailable
}) => {
  const tz = event.timezone;
  const locale = getSafeLocale(getClientLocale());
  const embeddedOccurrences = event.occurrences || [];
  const defaultFocusedDate = () => {
    if (selectedOccurrenceId) {
      const occ = embeddedOccurrences.find((o) => sameId(o.id, selectedOccurrenceId));
      if (occ) return dateKey(occ, tz);
    }
    return dateKey(activeOccurrences[0], tz);
  };
  const [focusedDate, setFocusedDate] = useState(defaultFocusedDate);
  const [displayedMonth, setDisplayedMonth] = useState(() => dayjs(defaultFocusedDate()).startOf("month").format("YYYY-MM-DD"));
  const displayedYearMonth = displayedMonth.slice(0, 7);
  const prevMonthKey = dayjs(displayedMonth).subtract(1, "month").format("YYYY-MM");
  const nextMonthKey = dayjs(displayedMonth).add(1, "month").format("YYYY-MM");
  const isMonthEmbedded = (monthKey) => event.occurrences_month === monthKey;
  const prevMonthQuery = useGetEventOccurrencesPublic(event.id, prevMonthKey, tz, false);
  const displayedMonthQuery = useGetEventOccurrencesPublic(event.id, displayedYearMonth, tz, !isMonthEmbedded(displayedYearMonth));
  const nextMonthQuery = useGetEventOccurrencesPublic(event.id, nextMonthKey, tz, false);
  const displayedMonthLoading = !isMonthEmbedded(displayedYearMonth) && displayedMonthQuery.isLoading;
  const occurrences = useMemo(() => {
    const merged = /* @__PURE__ */ new Map();
    for (const monthData of [embeddedOccurrences, prevMonthQuery.data, displayedMonthQuery.data, nextMonthQuery.data]) {
      for (const occ of monthData || []) {
        if (occ.id !== void 0 && occ.id !== null) {
          merged.set(Number(occ.id), occ);
        }
      }
    }
    return Array.from(merged.values());
  }, [embeddedOccurrences, prevMonthQuery.data, displayedMonthQuery.data, nextMonthQuery.data]);
  const {
    occurrencesByDate,
    calendarDays,
    soldOutOnlyDays
  } = useMemo(() => {
    const byDate = {};
    for (const occ of occurrences) {
      if (occ.is_past) continue;
      if (occ.status !== EventOccurrenceStatus.ACTIVE && occ.status !== EventOccurrenceStatus.SOLD_OUT && occ.status !== EventOccurrenceStatus.CANCELLED) continue;
      const key = dateKey(occ, tz);
      (byDate[key] || (byDate[key] = [])).push(occ);
    }
    const shown = /* @__PURE__ */ new Set();
    const soldOutOnly = /* @__PURE__ */ new Set();
    for (const key of Object.keys(byDate)) {
      byDate[key].sort(byStartDate);
      const bookable = byDate[key].some(isBookable);
      const anyBookableOrSoldOut = byDate[key].some((o) => o.status === EventOccurrenceStatus.ACTIVE || o.status === EventOccurrenceStatus.SOLD_OUT);
      if (anyBookableOrSoldOut) shown.add(key);
      if (anyBookableOrSoldOut && !bookable) soldOutOnly.add(key);
    }
    return {
      occurrencesByDate: byDate,
      calendarDays: shown,
      soldOutOnlyDays: soldOutOnly
    };
  }, [occurrences, tz]);
  useEffect(() => {
    if (!selectedOccurrenceId) return;
    const occ = occurrences.find((o) => sameId(o.id, selectedOccurrenceId));
    if (!occ) return;
    const key = dateKey(occ, tz);
    setFocusedDate(key);
    setDisplayedMonth(dayjs(key).startOf("month").format("YYYY-MM-DD"));
  }, [selectedOccurrenceId]);
  const clearedOccurrenceRef = useRef(void 0);
  const previousSelectedRef = useRef(selectedOccurrenceId);
  useEffect(() => {
    if (previousSelectedRef.current && !selectedOccurrenceId) {
      clearedOccurrenceRef.current = previousSelectedRef.current;
    }
    previousSelectedRef.current = selectedOccurrenceId;
  }, [selectedOccurrenceId]);
  useEffect(() => {
    clearedOccurrenceRef.current = void 0;
  }, [focusedDate]);
  useEffect(() => {
    if (selectedOccurrenceId || pendingInitialOccurrenceId) {
      return;
    }
    const bookable = (occurrencesByDate[focusedDate] || []).filter(isBookable);
    if (bookable.length === 1 && bookable[0].id && !sameId(bookable[0].id, clearedOccurrenceRef.current)) {
      onSelect(bookable[0].id, bookable[0]);
    }
  }, [focusedDate, occurrencesByDate, selectedOccurrenceId, pendingInitialOccurrenceId]);
  const focusDay = (day) => {
    setFocusedDate(day);
    const daySlots = occurrencesByDate[day] || [];
    const currentSelection = daySlots.find((o) => sameId(o.id, selectedOccurrenceId));
    if (currentSelection && isSelectable(currentSelection, waitlistAvailable)) {
      return;
    }
    const bookable = daySlots.filter(isBookable);
    if (bookable.length === 1 && bookable[0].id) {
      onSelect(bookable[0].id, bookable[0]);
    }
  };
  const slotPanelRef = useRef(null);
  const skipFirstScroll = useRef(true);
  useEffect(() => {
    if (skipFirstScroll.current) {
      skipFirstScroll.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const node = slotPanelRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top >= 0 && rect.bottom <= viewportHeight) return;
    const handle = window.requestAnimationFrame(() => {
      node.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
    return () => window.cancelAnimationFrame(handle);
  }, [focusedDate]);
  const todayKey = dayjs().tz(tz).format("YYYY-MM-DD");
  const minDateKey = [todayKey, ...calendarDays].reduce((min, key) => key < min ? key : min);
  const maxDateKey = event.last_occurrence_date ? dayjs.utc(event.last_occurrence_date).tz(tz).format("YYYY-MM-DD") : void 0;
  const focusedSlots = occurrencesByDate[focusedDate] || [];
  const selectedOccurrence = selectedOccurrenceId ? occurrences.find((o) => sameId(o.id, selectedOccurrenceId)) : null;
  const showingProducts = !!(productSlot && selectedOccurrence && dateKey(selectedOccurrence, tz) === focusedDate);
  const pendingAutoSelect = !!(productSlot && !showingProducts && focusedSlots.filter(isBookable).length === 1);
  const monthHasDates = useMemo(() => Array.from(calendarDays).some((key) => key.startsWith(displayedYearMonth)), [calendarDays, displayedYearMonth]);
  const dayAvailabilityLabel = (key) => {
    const daySlots = occurrencesByDate[key];
    const baseLabel = daySlots && daySlots.length > 0 ? formatDateWithLocale(daySlots[0].start_date, "dayName", tz, locale) : dayjs(key).locale(locale).format(localeFormats[locale].dayName);
    if (!calendarDays.has(key)) return baseLabel;
    if (soldOutOnlyDays.has(key)) return `${baseLabel}, ${i18n._(
      /*i18n*/
      {
        id: "yp+0jj"
      }
    )}`;
    const slotCount = (daySlots || []).filter(isBookable).length;
    return `${baseLabel}, ${slotCount === 1 ? i18n._(
      /*i18n*/
      {
        id: "y2Jh0m"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "VFLd0I",
        values: {
          slotCount
        }
      }
    )}`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "hi-occurrence-body", children: [
    /* @__PURE__ */ jsx("div", { className: "hi-slot-panel", ref: slotPanelRef, children: showingProducts ? /* @__PURE__ */ jsx(ProductsPane, { event, daySlots: focusedSlots, selectedOccurrence, tz, locale, onSelect, isLoading: isProductsLoading, waitlistAvailable, children: productSlot }) : pendingAutoSelect ? /* @__PURE__ */ jsx("div", { className: "hi-slot-loading", children: /* @__PURE__ */ jsx(Loader, { size: "sm", color: "var(--widget-primary-color, #228be6)" }) }) : /* @__PURE__ */ jsx(TimeSlotList, { event, slots: focusedSlots, tz, locale, selectedOccurrenceId, onSelect, waitlistAvailable }) }),
    /* @__PURE__ */ jsxs("div", { className: "hi-calendar-panel", "aria-busy": displayedMonthLoading || void 0, children: [
      displayedMonthLoading && /* @__PURE__ */ jsx("div", { className: "hi-calendar-month-loading", children: /* @__PURE__ */ jsx(Loader, { size: "sm", color: "var(--widget-primary-color, #228be6)" }) }),
      /* @__PURE__ */ jsx(DatesProvider, { settings: {
        locale,
        firstDayOfWeek: 1,
        consistentWeeks: true
      }, children: /* @__PURE__ */ jsx(DatePicker, { className: "hi-occurrence-datepicker", size: "md", value: focusedDate, onChange: (value) => {
        if (value) focusDay(value);
      }, date: displayedMonth, onDateChange: setDisplayedMonth, minDate: minDateKey, maxDate: maxDateKey, allowDeselect: false, highlightToday: true, hideOutsideDates: true, excludeDate: (date) => !calendarDays.has(date), getDayProps: (date) => soldOutOnlyDays.has(date) ? {
        "data-sold-out": "true"
      } : {}, getDayAriaLabel: dayAvailabilityLabel, renderDay: (date) => {
        const daySlots = occurrencesByDate[date] || [];
        const bookableCount = daySlots.filter(isBookable).length;
        const soldOut = calendarDays.has(date) && bookableCount === 0;
        return /* @__PURE__ */ jsxs("span", { className: "hi-day", children: [
          /* @__PURE__ */ jsx("span", { className: "hi-day-number", children: dayjs(date).date() }),
          bookableCount === 1 && /* @__PURE__ */ jsx("span", { className: "hi-day-dot" }),
          bookableCount > 1 && /* @__PURE__ */ jsx("span", { className: "hi-day-count", children: bookableCount }),
          soldOut && /* @__PURE__ */ jsx("span", { className: "hi-day-sold-out-dot" })
        ] });
      }, classNames: {
        calendarHeader: "hi-dp-header",
        calendarHeaderControl: "hi-dp-nav",
        calendarHeaderLevel: "hi-dp-level",
        weekday: "hi-dp-weekday",
        day: "hi-dp-day",
        monthsListControl: "hi-dp-picker-control",
        yearsListControl: "hi-dp-picker-control"
      } }) }),
      !monthHasDates && !displayedMonthLoading && /* @__PURE__ */ jsx("div", { className: "hi-calendar-no-dates", children: i18n._(
        /*i18n*/
        {
          id: "I8mtzP"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hi-calendar-legend", children: [
        /* @__PURE__ */ jsx("span", { className: "hi-calendar-legend-dot", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { children: i18n._(
          /*i18n*/
          {
            id: "91zCxb"
          }
        ) })
      ] })
    ] })
  ] });
};
const OccurrenceSelector = ({
  event,
  selectedOccurrenceId,
  pendingInitialOccurrenceId,
  onSelect,
  colors,
  productSlot,
  isProductsLoading,
  waitlistAvailable
}) => {
  const occurrences = event.occurrences || [];
  const activeOccurrences = getActiveOccurrences(occurrences).sort(byStartDate);
  if (event.type !== EventType.RECURRING || activeOccurrences.length === 0) {
    return null;
  }
  const tz = event.timezone;
  const locale = getSafeLocale(getClientLocale());
  const timezoneAbbr = formatDateWithLocale(activeOccurrences[0].start_date, "timezone", tz, locale);
  const recurrenceSummary = buildRecurrenceSummary(event.recurrence_rule);
  return /* @__PURE__ */ jsxs("div", { className: "hi-occurrence-selector", style: {
    "--widget-primary-color": colors == null ? void 0 : colors.primary,
    "--widget-primary-text-color": colors == null ? void 0 : colors.primaryText,
    "--widget-secondary-color": colors == null ? void 0 : colors.secondary,
    "--widget-secondary-text-color": colors == null ? void 0 : colors.secondaryText,
    "--widget-background-color": colors == null ? void 0 : colors.background
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "hi-occurrence-selector-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "hi-occurrence-selector-heading", children: [
        /* @__PURE__ */ jsx("h2", { className: "hi-occurrence-selector-title", children: i18n._(
          /*i18n*/
          {
            id: "hTKQwS"
          }
        ) }),
        recurrenceSummary && /* @__PURE__ */ jsx("span", { className: "hi-occurrence-selector-summary", children: recurrenceSummary })
      ] }),
      timezoneAbbr && /* @__PURE__ */ jsx("span", { className: "hi-occurrence-timezone", title: tz, children: i18n._(
        /*i18n*/
        {
          id: "fXf2r5",
          values: {
            timezoneAbbr
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(OccurrencePicker, { event, selectedOccurrenceId, pendingInitialOccurrenceId, onSelect, activeOccurrences, productSlot, isProductsLoading, waitlistAvailable })
  ] });
};
const AFFILIATE_EXPIRY_DAYS = 30;
const buildCheckoutPath = (eventId, orderShortId, sessionId, extraParams = {}) => {
  const params = new URLSearchParams();
  if (sessionId) {
    params.set("session_identifier", sessionId);
  }
  Object.entries(extraParams).forEach(([key, value]) => params.set(key, value));
  const query = params.toString();
  return `/checkout/${eventId}/${orderShortId}/details${query ? `?${query}` : ""}`;
};
const sendHeightToIframeWidgets = () => {
  var _a;
  document.documentElement.scrollHeight;
  ((_a = document.querySelector(".hi-product-widget-container")) == null ? void 0 : _a.getBoundingClientRect().height) || 0;
};
const SelectProducts = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const {
    eventId
  } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const promoRef = useRef(null);
  const [showPromoCodeInput, setShowPromoCodeInput] = useInputState(false);
  const [event, setEvent] = useState(props.event);
  const [orderInProcessOverlayVisible, setOrderInProcessOverlayVisible] = useState(false);
  const [resizeRef, resizeObserverRect] = useResizeObserver();
  const [collapsedProducts, setCollapsedProducts] = useState({});
  const [expandedDetails, setExpandedDetails] = useState({});
  const [affiliateCode, setAffiliateCode] = useState(null);
  const [appliedPromoDetails, setAppliedPromoDetails] = useState(null);
  useEffect(() => sendHeightToIframeWidgets(), [resizeObserverRect.height]);
  useEffect(() => {
    const storageKey = "affiliate_code_" + eventId;
    const now = Date.now();
    const affiliateCodeFromUrl = new URLSearchParams(window.location.search).get("aff");
    if (affiliateCodeFromUrl) {
      const data = {
        code: affiliateCodeFromUrl,
        timestamp: now
      };
      safeLocalStorageSet(storageKey, JSON.stringify(data));
      setAffiliateCode(affiliateCodeFromUrl);
      return;
    }
    const storedData = safeLocalStorageGet();
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const ageInDays = (now - parsed.timestamp) / (1e3 * 60 * 60 * 24);
        if (ageInDays <= AFFILIATE_EXPIRY_DAYS) {
          setAffiliateCode(parsed.code);
        } else {
          safeLocalStorageRemove(storageKey);
        }
      } catch {
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || !eventId) return;
    const clearWaitlist = new URLSearchParams(window.location.search).get("clear_waitlist");
    if (clearWaitlist === "true") {
      clearWaitlistJoinedForEvent(eventId);
      removeQueryStringFromUrl("clear_waitlist");
    }
  }, [eventId]);
  useEffect(() => {
    form.setFieldValue("affiliate_code", affiliateCode || null);
  }, [affiliateCode]);
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState(void 0);
  const selectedOccurrenceIdRef = useRef(void 0);
  const lastSelectedOccurrenceRef = useRef(void 0);
  const [pendingInitialOccurrenceId, setPendingInitialOccurrenceId] = useState(() => {
    if (props.initialOccurrenceId) {
      return props.initialOccurrenceId;
    }
    if (typeof window === "undefined") {
      return void 0;
    }
    const occurrenceIdFromUrl = new URLSearchParams(window.location.search).get("occurrence_id");
    return occurrenceIdFromUrl ? Number(occurrenceIdFromUrl) : void 0;
  });
  const {
    onSelectedOccurrenceChange
  } = props;
  useEffect(() => {
    const lastSelected = lastSelectedOccurrenceRef.current;
    onSelectedOccurrenceChange == null ? void 0 : onSelectedOccurrenceChange(((event == null ? void 0 : event.occurrences) || []).find((o) => Number(o.id) === selectedOccurrenceId) ?? (lastSelected && Number(lastSelected.id) === selectedOccurrenceId ? lastSelected : void 0));
  }, [selectedOccurrenceId, event == null ? void 0 : event.occurrences, onSelectedOccurrenceChange]);
  const form = useForm({
    initialValues: {
      products: void 0,
      promo_code: props.promoCodeValid ? props.promoCode || null : null,
      affiliate_code: affiliateCode || null,
      session_identifier: void 0
    }
  });
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const activeOccurrences = useMemo(() => {
    return ((event == null ? void 0 : event.occurrences) || []).filter((occ) => (occ.status === EventOccurrenceStatus.ACTIVE || occ.status === EventOccurrenceStatus.SOLD_OUT) && !occ.is_past);
  }, [event == null ? void 0 : event.occurrences]);
  const needsOccurrenceSelection = isRecurring && activeOccurrences.length >= 1;
  const occurrenceSelected = !!selectedOccurrenceId;
  const eventHasEnded = useMemo(() => {
    const occurrences = (event == null ? void 0 : event.occurrences) ?? [];
    return occurrences.length > 0 && !occurrences.some((occ) => !occ.is_past);
  }, [event == null ? void 0 : event.occurrences]);
  const productMutation = useMutation({
    mutationFn: (orderData) => orderClientPublic.create(Number(eventId), orderData),
    onSuccess: (data) => queryClient.invalidateQueries().then(() => {
      const sessionId = data.data.session_identifier;
      const sourceParams = new URLSearchParams(window.location.search);
      const prefillParams = {};
      CHECKOUT_PREFILL_PARAM_KEYS.forEach((key) => {
        const value = sourceParams.get(key);
        if (value !== null) {
          prefillParams[key] = value;
        }
      });
      const pathWithSession = buildCheckoutPath(eventId, data.data.short_id, sessionId, prefillParams);
      if (sessionId) {
        setCheckoutSessionIdentifier(String(data.data.short_id));
      }
      if (props.widgetMode === "embedded") {
        const parentSupportsModal = props.checkoutMode !== "new-tab" && !!getEmbedParentUrl();
        if (!parentSupportsModal) {
          window.open(buildCheckoutPath(eventId, data.data.short_id, sessionId, {
            ...prefillParams,
            utm_source: "embedded_widget"
          }), "_blank", "noopener,noreferrer");
          setOrderInProcessOverlayVisible(true);
          return;
        }
        window.parent.postMessage({
          type: "hievents:open-checkout",
          path: pathWithSession
        }, getParentOrigin() || "*");
        return;
      }
      return navigate(pathWithSession);
    }),
    onError: (error) => {
      var _a2, _b2, _c2, _d2;
      const errors = (_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.errors;
      if (errors) {
        form.setErrors(errors);
      }
      const firstError = errors ? Object.values(errors).flat().find((message) => typeof message === "string") : void 0;
      showError(firstError || ((_d2 = (_c2 = error == null ? void 0 : error.response) == null ? void 0 : _c2.data) == null ? void 0 : _d2.message) || i18n._(
        /*i18n*/
        {
          id: "WLxtFC"
        }
      ));
    }
  });
  const promoCodeEventRefetchMutation = useMutation({
    mutationFn: async (promoCode) => {
      if (promoCode) {
        const validPromoCode = await promoCodeClientPublic.validateCode(eventId, promoCode);
        if (!validPromoCode.valid) {
          showError(i18n._(
            /*i18n*/
            {
              id: "gypigA"
            }
          ));
          return;
        }
        setAppliedPromoDetails({
          code: promoCode,
          response: validPromoCode
        });
      }
      const eventWithPromoCodeApplied = await eventsClientPublic.findByID(eventId, promoCode, selectedOccurrenceId);
      setEvent(eventWithPromoCodeApplied.data);
      if (promoCode) {
        form.setFieldValue("promo_code", promoCode);
      } else {
        form.setFieldValue("promo_code", null);
        setShowPromoCodeInput(false);
        removeQueryStringFromUrl("promo_code");
      }
    }
  });
  const occurrenceEventRefetchMutation = useMutation({
    mutationFn: async (occurrenceId) => {
      const eventWithOccurrenceApplied = await eventsClientPublic.findByID(eventId, form.values.promo_code, occurrenceId);
      if (selectedOccurrenceIdRef.current === occurrenceId) {
        setEvent(eventWithOccurrenceApplied.data);
      }
    },
    onError: (_error, occurrenceId) => {
      if (selectedOccurrenceIdRef.current === occurrenceId) {
        showError(i18n._(
          /*i18n*/
          {
            id: "GlnD5Y"
          }
        ));
      }
    }
  });
  const selectOccurrence = (occId, occurrence) => {
    if (selectedOccurrenceIdRef.current === occId) {
      return;
    }
    selectedOccurrenceIdRef.current = occId;
    lastSelectedOccurrenceRef.current = occurrence;
    setSelectedOccurrenceId(occId);
    occurrenceEventRefetchMutation.mutate(occId);
  };
  const clearSelectedOccurrence = () => {
    selectedOccurrenceIdRef.current = void 0;
    setSelectedOccurrenceId(void 0);
  };
  const initialOccurrenceAppliedRef = useRef(false);
  useEffect(() => {
    if (initialOccurrenceAppliedRef.current) {
      return;
    }
    initialOccurrenceAppliedRef.current = true;
    let autoSelectedOccId = null;
    const selectableOccurrences = activeOccurrences;
    if (selectableOccurrences.length === 1 && selectableOccurrences[0].id) {
      autoSelectedOccId = Number(selectableOccurrences[0].id);
    }
    if (pendingInitialOccurrenceId) {
      const valid = selectableOccurrences.some((o) => Number(o.id) === pendingInitialOccurrenceId);
      if (valid) {
        autoSelectedOccId = pendingInitialOccurrenceId;
      }
    }
    if (autoSelectedOccId !== null && autoSelectedOccId !== selectedOccurrenceId) {
      if (isRecurring) {
        selectOccurrence(autoSelectedOccId);
      } else {
        selectedOccurrenceIdRef.current = autoSelectedOccId;
        setSelectedOccurrenceId(autoSelectedOccId);
      }
    }
    setPendingInitialOccurrenceId(void 0);
  }, [event == null ? void 0 : event.occurrences]);
  const productCategories = (event == null ? void 0 : event.product_categories) || [];
  const productAreAvailable = productCategories && productCategories.some((category) => {
    var _a2;
    return !!((_a2 = category == null ? void 0 : category.products) == null ? void 0 : _a2.length);
  });
  const products = productCategories.reduce((acc, category) => acc.concat(category.products ?? []), []);
  const topLevelProducts = products.filter((product) => !product.is_addon_only);
  const waitlistAvailable = products.some((product) => product.waitlist_enabled);
  const productsById = useMemo(() => new Map(products.map((product) => [Number(product.id), product])), [productCategories]);
  const getProductFormIndex = (productId) => {
    var _a2;
    return ((_a2 = form.values.products) == null ? void 0 : _a2.findIndex((product) => product.product_id === productId)) ?? -1;
  };
  const getProductQuantity = (productId) => {
    var _a2, _b2, _c2;
    return ((_c2 = (_b2 = (_a2 = form.values.products) == null ? void 0 : _a2.find((product) => product.product_id === productId)) == null ? void 0 : _b2.quantities) == null ? void 0 : _c2.reduce((acc, {
      quantity
    }) => acc + Number(quantity), 0)) || 0;
  };
  const getResolvableAddonIds = (product) => (product.addon_product_ids || []).map(Number).filter((addonId) => addonId !== Number(product.id) && productsById.has(addonId));
  const renderProductDetails = (productId, description, className) => {
    const isExpanded = expandedDetails[productId] ?? false;
    return /* @__PURE__ */ jsxs("div", { className, children: [
      /* @__PURE__ */ jsxs("button", { type: "button", className: classNames("hi-details-toggle", isExpanded && "open"), "aria-expanded": isExpanded, onClick: () => setExpandedDetails((prev) => ({
        ...prev,
        [productId]: !isExpanded
      })), children: [
        i18n._(
          /*i18n*/
          {
            id: "URmyfc"
          }
        ),
        /* @__PURE__ */ jsx(IconChevronDown, { size: 14, stroke: 2, className: isExpanded ? "open" : "" })
      ] }),
      /* @__PURE__ */ jsx(Collapse, { expanded: isExpanded, transitionDuration: 250, children: /* @__PURE__ */ jsx("div", { className: "hi-product-description", dangerouslySetInnerHTML: {
        __html: description
      } }) })
    ] });
  };
  useEffect(() => {
    const formProducts = form.values.products;
    if (!formProducts) {
      return;
    }
    products.filter((product) => product.is_addon_only).forEach((addon) => {
      const addonId = Number(addon.id);
      const formIndex = formProducts.findIndex((formProduct) => formProduct.product_id === addonId);
      if (formIndex === -1 || getProductQuantity(addonId) === 0) {
        return;
      }
      const hasSelectedParent = topLevelProducts.some((parent) => getProductQuantity(Number(parent.id)) > 0 && getResolvableAddonIds(parent).includes(addonId));
      if (!hasSelectedParent) {
        form.setFieldValue(`products.${formIndex}.quantities`, formProducts[formIndex].quantities.map((quantity) => ({
          ...quantity,
          quantity: 0
        })));
      }
    });
  }, [form.values.products]);
  const selectedProductQuantitySum = useMemo(() => {
    var _a2;
    let total = 0;
    (_a2 = form.values.products) == null ? void 0 : _a2.forEach(({
      quantities
    }) => {
      quantities == null ? void 0 : quantities.forEach(({
        quantity
      }) => {
        total += Number(quantity);
      });
    });
    return total;
  }, [form.values.products]);
  const selectedProductsTotal = useMemo(() => {
    var _a2;
    let total = 0;
    (_a2 = form.values.products) == null ? void 0 : _a2.forEach(({
      product_id,
      quantities
    }) => {
      const product = productsById.get(product_id);
      if (!product) {
        return;
      }
      quantities == null ? void 0 : quantities.forEach(({
        quantity,
        price_id,
        price
      }) => {
        var _a3, _b2;
        const selectedQuantity = Number(quantity);
        if (!selectedQuantity) {
          return;
        }
        if (product.type === "DONATION") {
          total += selectedQuantity * Number(price || 0);
          return;
        }
        const productPrice = (_a3 = product.prices) == null ? void 0 : _a3.find((p) => Number(p.id) === price_id);
        if (productPrice) {
          total += selectedQuantity * getDisplayPrice(productPrice, (_b2 = event == null ? void 0 : event.settings) == null ? void 0 : _b2.price_display_mode);
        }
      });
    });
    return total;
  }, [form.values.products, productsById, (_a = event == null ? void 0 : event.settings) == null ? void 0 : _a.price_display_mode]);
  const {
    onCartChange
  } = props;
  useEffect(() => {
    onCartChange == null ? void 0 : onCartChange({
      quantity: selectedProductQuantitySum,
      total: selectedProductsTotal
    });
  }, [selectedProductQuantitySum, selectedProductsTotal, onCartChange]);
  useEffect(() => {
    if (form.values.promo_code) {
      const promo_code = form.values.promo_code;
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "cl5WYc",
          values: {
            promo_code
          }
        }
      ));
      addQueryStringToUrl("promo_code", promo_code);
    }
  }, [form.values.promo_code]);
  useEffect(() => {
    const promoCode = form.values.promo_code;
    if (!promoCode) {
      setAppliedPromoDetails(null);
      return;
    }
    if ((appliedPromoDetails == null ? void 0 : appliedPromoDetails.code) === promoCode) {
      return;
    }
    let cancelled = false;
    promoCodeClientPublic.validateCode(eventId, promoCode).then((response) => {
      if (!cancelled) {
        setAppliedPromoDetails(response.valid ? {
          code: promoCode,
          response
        } : null);
      }
    }).catch(() => {
      if (!cancelled) {
        setAppliedPromoDetails(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [form.values.promo_code]);
  useEffect(() => {
    if (typeof props.promoCodeValid !== "undefined") {
      if (!props.promoCodeValid) {
        showError(i18n._(
          /*i18n*/
          {
            id: "gypigA"
          }
        ));
        removeQueryStringFromUrl("promo_code");
      }
    }
  }, [props.promoCodeValid]);
  const populateFormValue = () => {
    const productValues = [];
    products == null ? void 0 : products.forEach((product) => {
      var _a2, _b2;
      const quantitiesValues = [];
      const existingProduct = (_a2 = form.values.products) == null ? void 0 : _a2.find((p) => p.product_id === product.id);
      (_b2 = product.prices) == null ? void 0 : _b2.forEach((priceQuantity) => {
        var _a3, _b3;
        const existingQuantity = ((_b3 = (_a3 = existingProduct == null ? void 0 : existingProduct.quantities) == null ? void 0 : _a3.find((q) => q.price_id === priceQuantity.id)) == null ? void 0 : _b3.quantity) || 0;
        quantitiesValues.push({
          quantity: existingQuantity,
          price_id: Number(priceQuantity.id),
          price: product.type === "DONATION" ? Number(priceQuantity.price) : void 0
        });
      });
      if (quantitiesValues.length === 0) {
        quantitiesValues.push({
          quantity: 0,
          price_id: 0,
          price: 0
        });
      }
      productValues.push({
        product_id: Number(product.id),
        quantities: quantitiesValues
      });
    });
    if (JSON.stringify(form.values.products) !== JSON.stringify(productValues)) {
      form.setFieldValue("products", productValues);
    }
  };
  useEffect(populateFormValue, [productCategories]);
  const handleProductSelection = (values) => {
    var _a2;
    if (isRecurring && !selectedOccurrenceId) {
      showInfo(i18n._(
        /*i18n*/
        {
          id: "GoXxOA"
        }
      ));
      return;
    }
    if (isRecurring && selectedOccurrenceId) {
      const lastSelected = lastSelectedOccurrenceRef.current;
      const selectedOcc = activeOccurrences.find((o) => Number(o.id) === selectedOccurrenceId) ?? (lastSelected && Number(lastSelected.id) === selectedOccurrenceId ? lastSelected : void 0);
      if (!selectedOcc || selectedOcc.status !== EventOccurrenceStatus.ACTIVE) {
        showError(i18n._(
          /*i18n*/
          {
            id: "bddWMP"
          }
        ));
        selectedOccurrenceIdRef.current = void 0;
        setSelectedOccurrenceId(void 0);
        return;
      }
    }
    if (values && selectedProductQuantitySum > 0) {
      const productsWithOccurrence = (_a2 = values.products) == null ? void 0 : _a2.map((product) => ({
        ...product,
        event_occurrence_id: selectedOccurrenceId
      }));
      productMutation.mutate({
        ...values,
        products: productsWithOccurrence,
        session_identifier: getSessionIdentifier()
      });
    } else {
      showInfo(i18n._(
        /*i18n*/
        {
          id: "Ewir4O"
        }
      ));
    }
  };
  const handleApplyPromoCode = () => {
    var _a2;
    const promoCode = (_a2 = promoRef.current) == null ? void 0 : _a2.value;
    if (promoCode && promoCode.length >= 3) {
      promoCodeEventRefetchMutation.mutate(promoCode);
    } else {
      showError(i18n._(
        /*i18n*/
        {
          id: "6a/UJE"
        }
      ));
    }
  };
  const isButtonDisabled = productMutation.isPending || !productAreAvailable || selectedProductQuantitySum === 0 || props.widgetMode === "preview" || topLevelProducts.every((product) => product.is_sold_out) || needsOccurrenceSelection && !occurrenceSelected;
  const unavailableMessage = (() => {
    if (eventHasEnded) {
      return i18n._(
        /*i18n*/
        {
          id: "o02GZM"
        }
      );
    }
    if (isRecurring && activeOccurrences.length === 0) {
      return (event == null ? void 0 : event.upcoming_occurrences_sold_out) ? i18n._(
        /*i18n*/
        {
          id: "GL6z+k"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "O7g4eR"
        }
      );
    }
    if (!productAreAvailable && !(isRecurring && activeOccurrences.length > 0)) {
      return i18n._(
        /*i18n*/
        {
          id: "wDx3FF"
        }
      );
    }
    return null;
  })();
  const productFormSection = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hi-product-category-rows", children: productCategories && productCategories.map((category) => {
      var _a2, _b2;
      const visibleProducts = (category.products || []).filter((product) => !product.is_addon_only);
      if ((((_a2 = category.products) == null ? void 0 : _a2.length) ?? 0) > 0 && visibleProducts.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsxs("div", { className: "hi-product-category-row", children: [
        /* @__PURE__ */ jsx("h2", { className: "hi-product-category-title", style: category.description ? {
          marginBottom: "0px"
        } : {}, children: category.name }),
        category.description && /* @__PURE__ */ jsx("div", { className: "hi-product-category-description", children: /* @__PURE__ */ jsx(Spoiler, { maxHeight: 500, showLabel: i18n._(
          /*i18n*/
          {
            id: "fMPkxb"
          }
        ), hideLabel: i18n._(
          /*i18n*/
          {
            id: "vLyv1R"
          }
        ), children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
          __html: category.description
        } }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "hi-product-rows", children: [
          ((_b2 = category.products) == null ? void 0 : _b2.length) === 0 && /* @__PURE__ */ jsx("div", { className: "hi-no-products", children: /* @__PURE__ */ jsx("p", { className: "hi-no-products-message", children: category.no_products_message || i18n._(
            /*i18n*/
            {
              id: "pNgdBv"
            }
          ) }) }),
          visibleProducts.map((product) => {
            var _a3, _b3;
            const currentProductIndex = getProductFormIndex(Number(product.id));
            const parentQuantity = getProductQuantity(Number(product.id));
            const addonIds = getResolvableAddonIds(product);
            const isProductCollapsed = collapsedProducts[Number(product.id)] ?? product.start_collapsed;
            const toggleCollapse = () => {
              setCollapsedProducts((prev) => ({
                ...prev,
                [Number(product.id)]: !isProductCollapsed
              }));
            };
            const isSimpleProduct = product.type !== "TIERED" && product.type !== "DONATION" && (((_a3 = product.prices) == null ? void 0 : _a3.length) ?? 0) === 1;
            const availabilityState = product.is_sold_out ? "sold-out" : product.is_before_sale_start_date ? "upcoming" : product.is_after_sale_end_date ? "ended" : void 0;
            const collapsedFromPrice = (() => {
              if (!isProductCollapsed || product.type !== "TIERED") {
                return null;
              }
              const availablePrices = (product.prices || []).filter((price) => price.is_available);
              if (availablePrices.length === 0) {
                return null;
              }
              return Math.min(...availablePrices.map((price) => {
                var _a4;
                return getDisplayPrice(price, (_a4 = event == null ? void 0 : event.settings) == null ? void 0 : _a4.price_display_mode);
              }));
            })();
            return /* @__PURE__ */ jsxs("div", { className: `hi-product-row ${product.is_highlighted ? "hi-product-highlighted" : ""}`, "data-availability": availabilityState, children: [
              product.is_highlighted && product.highlight_message && /* @__PURE__ */ jsx("div", { className: "hi-product-highlight-message", children: product.highlight_message }),
              /* @__PURE__ */ jsx("div", { className: "hi-title-row", children: /* @__PURE__ */ jsxs(UnstyledButton, { className: "hi-product-title", onClick: toggleCollapse, children: [
                /* @__PURE__ */ jsx("h3", { children: product.title }),
                /* @__PURE__ */ jsxs("div", { className: "hi-product-title-metadata", children: [
                  product.is_available && !!product.quantity_available && !(isRecurring && product.product_type === ProductType.Ticket) && /* @__PURE__ */ jsxs(Fragment, { children: [
                    product.quantity_available === Constants.INFINITE_TICKETS && /* @__PURE__ */ jsx("span", { className: "hi-quantity-remaining-note", children: /* @__PURE__ */ jsx(Trans, { id: "/p9Fhq" }) }),
                    product.quantity_available !== Constants.INFINITE_TICKETS && /* @__PURE__ */ jsx("span", { className: "hi-scarcity-pill", children: /* @__PURE__ */ jsx(Trans, { id: "KMgp2+", values: {
                      0: product.quantity_available
                    } }) })
                  ] }),
                  !product.is_available && product.type === "TIERED" && /* @__PURE__ */ jsx("span", { className: "hi-product-availability", "data-reason": availabilityState, children: /* @__PURE__ */ jsx(ProductAvailabilityMessage, { product, event, eventOccurrenceId: selectedOccurrenceId }) }),
                  /* @__PURE__ */ jsx("span", { className: `hi-product-collapse-arrow`, children: /* @__PURE__ */ jsx(IconChevronDown, { className: isProductCollapsed ? "" : "open" }) })
                ] })
              ] }) }),
              isSimpleProduct && /* @__PURE__ */ jsx("div", { className: "hi-product-header-body", children: /* @__PURE__ */ jsx(TieredPricing, { productIndex: currentProductIndex, event, product, form, eventOccurrenceId: selectedOccurrenceId, displayMode: "header", showStepper: !isProductCollapsed }) }),
              collapsedFromPrice !== null && /* @__PURE__ */ jsx("div", { className: "hi-price-from-summary", children: i18n._(
                /*i18n*/
                {
                  id: "hGDVDa",
                  values: {
                    0: formatCurrency(collapsedFromPrice, event == null ? void 0 : event.currency)
                  }
                }
              ) }),
              /* @__PURE__ */ jsxs(Collapse, { transitionDuration: 100, expanded: !isProductCollapsed, className: "hi-product-content", hidden: isProductCollapsed, children: [
                !isSimpleProduct && /* @__PURE__ */ jsx("div", { className: "hi-price-tiers-rows", children: /* @__PURE__ */ jsx(TieredPricing, { productIndex: currentProductIndex, event, product, form, eventOccurrenceId: selectedOccurrenceId }) }),
                product.max_per_order && form.values.products && isObjectEmpty(form.errors) && ((_b3 = form.values.products[currentProductIndex]) == null ? void 0 : _b3.quantities.reduce((acc, {
                  quantity
                }) => acc + Number(quantity), 0)) > product.max_per_order && /* @__PURE__ */ jsx("div", { className: "hi-product-quantity-error", children: /* @__PURE__ */ jsx(Trans, { id: "HsFnrk", values: {
                  0: product.title,
                  1: product.max_per_order
                } }) }),
                form.errors[`products.${currentProductIndex}`] && /* @__PURE__ */ jsx("div", { className: "hi-product-quantity-error", children: form.errors[`products.${currentProductIndex}`] }),
                product.description && renderProductDetails(Number(product.id), product.description, "hi-product-description-row"),
                addonIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "hi-product-addons", "data-inactive": parentQuantity === 0 || void 0, children: [
                  /* @__PURE__ */ jsxs("div", { className: "hi-product-addons-heading", children: [
                    /* @__PURE__ */ jsx(Trans, { id: "Y2K3rp" }),
                    parentQuantity === 0 && /* @__PURE__ */ jsx("span", { className: "hi-product-addons-note", children: /* @__PURE__ */ jsx(Trans, { id: "Eso+01", values: {
                      0: product.title
                    } }) })
                  ] }),
                  addonIds.map((addonId) => {
                    const addon = productsById.get(addonId);
                    if (!addon) {
                      return null;
                    }
                    const addonFormIndex = getProductFormIndex(addonId);
                    return /* @__PURE__ */ jsxs("div", { className: classNames("hi-product-addon", addon.is_highlighted && "hi-product-addon-highlighted"), children: [
                      /* @__PURE__ */ jsxs("div", { className: "hi-product-addon-title", children: [
                        addon.title,
                        addon.is_highlighted && addon.highlight_message && /* @__PURE__ */ jsx("span", { className: "hi-product-addon-highlight-message", children: addon.highlight_message })
                      ] }),
                      /* @__PURE__ */ jsx(TieredPricing, { productIndex: addonFormIndex, event, product: addon, form, eventOccurrenceId: selectedOccurrenceId }),
                      form.errors[`products.${addonFormIndex}`] && /* @__PURE__ */ jsx("div", { className: "hi-product-quantity-error", children: form.errors[`products.${addonFormIndex}`] }),
                      addon.description && renderProductDetails(addonId, addon.description, "hi-product-addon-description")
                    ] }, addonId);
                  })
                ] })
              ] })
            ] }, product.id);
          })
        ] })
      ] }, category.id);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "hi-footer-row", children: [
      ((_b = event == null ? void 0 : event.settings) == null ? void 0 : _b.product_page_message) && /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
        __html: event.settings.product_page_message.replace(/\n/g, "<br/>")
      }, className: "hi-product-page-message" }),
      /* @__PURE__ */ jsx(Button, { disabled: isButtonDisabled, fullWidth: true, className: "hi-continue-button", ref: props.continueButtonRef, type: "submit", "data-testid": "checkout-continue-button", loading: productMutation.isPending, children: props.continueButtonText || ((_c = event == null ? void 0 : event.settings) == null ? void 0 : _c.continue_button_text) || i18n._(
        /*i18n*/
        {
          id: "xGVfLh"
        }
      ) })
    ] })
  ] });
  const promoSection = /* @__PURE__ */ jsxs("div", { className: "hi-promo-code-row", children: [
    !showPromoCodeInput && !form.values.promo_code && /* @__PURE__ */ jsx(Anchor, { className: "hi-have-a-promo-code-link", underline: "always", onClick: () => setShowPromoCodeInput(true), children: i18n._(
      /*i18n*/
      {
        id: "26pGvx"
      }
    ) }),
    form.values.promo_code && /* @__PURE__ */ jsxs("div", { className: "hi-promo-code-applied", children: [
      /* @__PURE__ */ jsx(IconCheck, { size: 16, stroke: 2.5, className: "hi-promo-code-applied-check" }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("b", { children: form.values.promo_code }),
        " ",
        (appliedPromoDetails == null ? void 0 : appliedPromoDetails.response.discount_type) === PromoCodeDiscountType.Fixed && (appliedPromoDetails == null ? void 0 : appliedPromoDetails.response.discount_applies_to) === PromoCodeDiscountAppliesTo.Order && (appliedPromoDetails == null ? void 0 : appliedPromoDetails.response.applies_to_all_products) && (appliedPromoDetails == null ? void 0 : appliedPromoDetails.response.discount) ? i18n._(
          /*i18n*/
          {
            id: "jVoYha",
            values: {
              0: formatCurrency(appliedPromoDetails.response.discount, event == null ? void 0 : event.currency)
            }
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "Ym1gnK"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ActionIcon, { type: "button", className: "hi-promo-code-applied-remove-icon-button", variant: "transparent", "aria-label": i18n._(
        /*i18n*/
        {
          id: "tasfos"
        }
      ), title: i18n._(
        /*i18n*/
        {
          id: "t/YqKh"
        }
      ), onClick: () => {
        promoCodeEventRefetchMutation.mutate(null);
      }, children: /* @__PURE__ */ jsx(IconX, { stroke: 1.5, size: 20 }) })
    ] }),
    showPromoCodeInput && !form.values.promo_code && /* @__PURE__ */ jsxs(Group, { className: "hi-promo-code-input-wrapper", wrap: "nowrap", gap: "10px", children: [
      /* @__PURE__ */ jsx(TextInput, { autoFocus: true, classNames: {
        input: "hi-promo-code-input"
      }, onKeyDown: (event2) => {
        if (event2.key === "Enter") {
          event2.preventDefault();
          handleApplyPromoCode();
        }
      }, mb: 0, ref: promoRef }),
      /* @__PURE__ */ jsx(Button, { type: "button", disabled: promoCodeEventRefetchMutation.isPending, className: "hi-apply-promo-code-button", variant: "outline", "data-testid": "promo-code-apply-button", onClick: handleApplyPromoCode, children: i18n._(
        /*i18n*/
        {
          id: "DB8zMK"
        }
      ) }),
      /* @__PURE__ */ jsx(ActionIcon, { type: "button", className: "hi-close-promo-code-input-button", variant: "transparent", "aria-label": i18n._(
        /*i18n*/
        {
          id: "RG3szS"
        }
      ), title: i18n._(
        /*i18n*/
        {
          id: "yz7wBu"
        }
      ), onClick: () => setShowPromoCodeInput(false), children: /* @__PURE__ */ jsx(IconX, { stroke: 1.5, size: 20 }) })
    ] })
  ] });
  const noProductsForOccurrence = /* @__PURE__ */ jsxs("div", { className: "hi-no-products", children: [
    /* @__PURE__ */ jsx("p", { className: "hi-no-products-message", children: i18n._(
      /*i18n*/
      {
        id: "ybBP2H"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: clearSelectedOccurrence, children: i18n._(
      /*i18n*/
      {
        id: "Ag32+c"
      }
    ) })
  ] });
  const showRecurringSelector = isRecurring && activeOccurrences.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: "hi-product-widget-container", ref: resizeRef, style: {
    "--widget-background-color": (_d = props.colors) == null ? void 0 : _d.background,
    "--widget-primary-color": (_e = props.colors) == null ? void 0 : _e.primary,
    "--widget-primary-text-color": (_f = props.colors) == null ? void 0 : _f.primaryText,
    "--widget-secondary-color": (_g = props.colors) == null ? void 0 : _g.secondary,
    "--widget-secondary-text-color": (_h = props.colors) == null ? void 0 : _h.secondaryText,
    "--widget-padding": props == null ? void 0 : props.padding
  }, children: [
    unavailableMessage && /* @__PURE__ */ jsx("div", { className: classNames(["hi-no-products"]), children: /* @__PURE__ */ jsx("p", { className: classNames(["hi-no-products-message"]), children: unavailableMessage }) }),
    orderInProcessOverlayVisible && /* @__PURE__ */ jsx(Modal, { withCloseButton: false, opened: true, onClose: () => setOrderInProcessOverlayVisible(false), styles: {
      body: {
        padding: "30px 24px"
      },
      content: {
        borderRadius: "8px",
        backgroundColor: ((_i = props.colors) == null ? void 0 : _i.background) || "white"
      }
    }, children: /* @__PURE__ */ jsx("div", { style: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
      color: ((_j = props.colors) == null ? void 0 : _j.primaryText) || "inherit"
    }, children: /* @__PURE__ */ jsxs("div", { style: {
      width: "100%"
    }, children: [
      /* @__PURE__ */ jsx("h3", { style: {
        margin: "0 0 12px 0",
        fontSize: "20px",
        fontWeight: "600",
        color: ((_k = props.colors) == null ? void 0 : _k.primaryText) || "inherit"
      }, children: i18n._(
        /*i18n*/
        {
          id: "b1Jvg+"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "0 0 20px 0",
        fontSize: "15px",
        lineHeight: "1.5",
        color: ((_l = props.colors) == null ? void 0 : _l.primaryText) || "inherit"
      }, children: i18n._(
        /*i18n*/
        {
          id: "4/kP5a"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { component: "a", href: buildCheckoutPath(eventId, (_m = productMutation.data) == null ? void 0 : _m.data.short_id, (_n = productMutation.data) == null ? void 0 : _n.data.session_identifier, {
        utm_source: "embedded_widget"
      }), target: "_blank", rel: "noopener noreferrer", fullWidth: true, size: "md", styles: {
        root: {
          backgroundColor: ((_o = props.colors) == null ? void 0 : _o.secondary) || "var(--primary-color, #228be6)",
          color: ((_p = props.colors) == null ? void 0 : _p.secondaryText) || "var(--accent-contrast, white)",
          fontWeight: 600,
          marginBottom: "12px",
          "&:hover": {
            backgroundColor: ((_q = props.colors) == null ? void 0 : _q.secondary) || "var(--primary-color, #1c7ed6)",
            filter: "brightness(0.95)"
          }
        }
      }, children: i18n._(
        /*i18n*/
        {
          id: "0GwUT4"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { onClick: () => setOrderInProcessOverlayVisible(false), variant: "subtle", size: "sm", styles: {
        root: {
          color: ((_r = props.colors) == null ? void 0 : _r.primaryText) || "var(--primary-color, #228be6)",
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline"
          }
        }
      }, children: i18n._(
        /*i18n*/
        {
          id: "QotGhf"
        }
      ) })
    ] }) }) }),
    event && !eventHasEnded && (showRecurringSelector || !isRecurring && productAreAvailable) && /* @__PURE__ */ jsxs("form", { target: "__blank", onSubmit: form.onSubmit(handleProductSelection), children: [
      /* @__PURE__ */ jsx(Input, { type: "hidden", ...form.getInputProps("promo_code") }),
      /* @__PURE__ */ jsx(Input, { type: "hidden", ...form.getInputProps("affiliate_code") }),
      isRecurring ? /* @__PURE__ */ jsx(OccurrenceSelector, { event, selectedOccurrenceId, pendingInitialOccurrenceId, onSelect: (id, occurrence) => selectOccurrence(Number(id), occurrence), colors: props.colors, isProductsLoading: occurrenceEventRefetchMutation.isPending, productSlot: productAreAvailable ? /* @__PURE__ */ jsxs(Fragment, { children: [
        productFormSection,
        promoSection
      ] }) : noProductsForOccurrence, waitlistAvailable }) : productFormSection
    ] }),
    !isRecurring && !eventHasEnded && promoSection,
    (props.showPoweredBy ?? true) && /* @__PURE__ */ jsx(PoweredByFooter, { style: {
      "color": ((_s = props.colors) == null ? void 0 : _s.primaryText) || "#000"
    } })
  ] });
};
export {
  Constants as C,
  SelectProducts as S
};

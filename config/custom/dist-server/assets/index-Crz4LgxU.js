import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import { a as orderClientPublic } from "./order.client-BmBVeAyF.js";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { TextInput, Tooltip, Checkbox, Text, SegmentedControl, NativeSelect, Button, Skeleton } from "@mantine/core";
import { IconClock, IconCheck, IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { u as useGetOrderPublic } from "./useGetOrderPublic-Ck7WTgJ2.js";
import { T as useGetEventPublic, a as getConfig } from "../entry.server.js";
import { a as questionClientPublic, C as CheckoutOrderQuestions, b as CheckoutProductQuestions } from "./index-wMxbqESV.js";
import { useState, useEffect } from "react";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { C as CheckoutContent } from "./index-Cu99v0OR.js";
import { C as CheckoutStepTitle, I as InlineOrderSummary } from "./index-Bbi8HwGR.js";
import { H as HomepageInfoMessage } from "./index-DlbMZZb-.js";
import { a as eventHomepagePath, j as eventCheckoutPath } from "./urlHelper-CsaWRwIV.js";
import { s as showInfo } from "./notifications-Coh3Ef-t.js";
import { b as getEmbedMode } from "./iframeResize-DUQclS7o.js";
import { c as countries } from "./countries-C8-MXWCy.js";
import { t as trackEvent, A as AnalyticsEvents } from "./analytics-Cd4RPKa9.js";
import { c as clearWaitlistJoinedForEvent } from "./useWaitlistJoined-D2Jn2EfP.js";
import { u as useCheckoutPrefill } from "./useCheckoutPrefill-DziFYvxr.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./types-CqPWB-a5.js";
import "./currency-Br7a8J7F.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
const GET_EVENT_QUESTIONS_PUBLIC_QUERY_KEY = "getEventQuestionsPublic";
const useGetEventQuestionsPublic = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_QUESTIONS_PUBLIC_QUERY_KEY, eventId],
    queryFn: async () => {
      const {
        data
      } = await questionClientPublic.all(eventId);
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
    retryOnMount: false
  });
};
const waitlistBanner = "_waitlistBanner_nf2td_1";
const waitlistBannerIcon = "_waitlistBannerIcon_nf2td_12";
const waitlistBannerTitle = "_waitlistBannerTitle_nf2td_25";
const waitlistBannerText = "_waitlistBannerText_nf2td_33";
const sectionHeading = "_sectionHeading_nf2td_40";
const sectionHelper = "_sectionHelper_nf2td_48";
const copyDetailsSection = "_copyDetailsSection_nf2td_54";
const copyDetailsMultiple = "_copyDetailsMultiple_nf2td_59";
const copyLabel = "_copyLabel_nf2td_66";
const ticketSection = "_ticketSection_nf2td_71";
const ticketTypeHeader = "_ticketTypeHeader_nf2td_75";
const ticketCountBadge = "_ticketCountBadge_nf2td_90";
const attendeeCard = "_attendeeCard_nf2td_99";
const attendeeCardHeader = "_attendeeCardHeader_nf2td_103";
const attendeeHeaderLeft = "_attendeeHeaderLeft_nf2td_110";
const attendeeNumber = "_attendeeNumber_nf2td_116";
const attendeeInfo = "_attendeeInfo_nf2td_130";
const attendeeTicketType = "_attendeeTicketType_nf2td_137";
const copiedBadge = "_copiedBadge_nf2td_142";
const checkoutActions = "_checkoutActions_nf2td_152";
const continueButton = "_continueButton_nf2td_157";
const tosNotice = "_tosNotice_nf2td_175";
const classes = {
  waitlistBanner,
  waitlistBannerIcon,
  waitlistBannerTitle,
  waitlistBannerText,
  sectionHeading,
  sectionHelper,
  copyDetailsSection,
  copyDetailsMultiple,
  copyLabel,
  ticketSection,
  ticketTypeHeader,
  ticketCountBadge,
  attendeeCard,
  attendeeCardHeader,
  attendeeHeaderLeft,
  attendeeNumber,
  attendeeInfo,
  attendeeTicketType,
  copiedBadge,
  checkoutActions,
  continueButton,
  tosNotice
};
const LoadingSkeleton = () => /* @__PURE__ */ jsxs(CheckoutContent, { children: [
  /* @__PURE__ */ jsx(Skeleton, { mb: 20, height: 200 }),
  /* @__PURE__ */ jsx(Skeleton, { mb: 20, height: 200 }),
  /* @__PURE__ */ jsx(Skeleton, { mb: 20, height: 200 })
] });
const CollectInformation = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const {
    eventId,
    orderShortId
  } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFromWaitlist = searchParams.get("waitlist") === "true";
  const {
    prefill,
    lock
  } = useCheckoutPrefill();
  const isLocked = (field) => lock && prefill[field] !== void 0;
  const {
    isFetched: isOrderFetched,
    data: order,
    data: {
      order_items: orderItems
    } = {},
    isError: isOrderError,
    error: orderError
  } = useGetOrderPublic(eventId, orderShortId, ["event"]);
  const orderOccurrenceIds = Array.from(new Set((orderItems ?? []).map((item) => item.event_occurrence_id).filter((id) => id != null)));
  const orderOccurrenceId = orderOccurrenceIds.length === 1 ? orderOccurrenceIds[0] : null;
  const {
    data: event,
    data: {
      product_categories: productCategories
    } = {},
    isFetched: isEventFetched,
    isError: isEventError
  } = useGetEventPublic(eventId, isOrderFetched, !!(order == null ? void 0 : order.promo_code), (order == null ? void 0 : order.promo_code) ?? null, orderOccurrenceId);
  const {
    data: questions,
    isFetched: isQuestionsFetched,
    isError: isQuestionsError
  } = useGetEventQuestionsPublic(eventId);
  const productQuestions = questions == null ? void 0 : questions.filter((question) => question.belongs_to === "PRODUCT");
  const orderQuestions = questions == null ? void 0 : questions.filter((question) => question.belongs_to === "ORDER");
  const products = productCategories == null ? void 0 : productCategories.flatMap((category) => category.products);
  const requireBillingAddress = (_a = event == null ? void 0 : event.settings) == null ? void 0 : _a.require_billing_address;
  const isPerOrderCollection = ((_b = event == null ? void 0 : event.settings) == null ? void 0 : _b.attendee_details_collection_method) === "PER_ORDER";
  const allowCopyToAllAttendees = ((_c = event == null ? void 0 : event.settings) == null ? void 0 : _c.allow_copy_details_to_all_attendees) ?? true;
  const [copyOption, setCopyOption] = useState("none");
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const EmailCheckIcon = () => /* @__PURE__ */ jsx(IconCircleCheck, { size: 18, style: {
    color: "var(--primary-color, #10B981)"
  } });
  let productIndex = 0;
  const form = useForm({
    initialValues: {
      order: {
        first_name: "",
        last_name: "",
        email: "",
        email_confirmation: "",
        address: {},
        questions: {},
        opted_into_marketing: false
      },
      products: [{
        first_name: "",
        last_name: "",
        email: "",
        email_confirmation: "",
        product_price_id: "",
        product_id: "",
        questions: {}
      }]
    },
    validate: {
      order: {
        email_confirmation: (value, values) => value !== values.order.email ? i18n._(
          /*i18n*/
          {
            id: "dSyJj6"
          }
        ) : null
      },
      products: {
        email_confirmation: (value, values, path) => {
          const index = parseInt(path.split(".")[1]);
          const product = values.products[index];
          if (product && product.email !== value) {
            return i18n._(
              /*i18n*/
              {
                id: "dSyJj6"
              }
            );
          }
          return null;
        }
      }
    },
    validateInputOnBlur: true
  });
  const getTicketAttendeeIndices = () => {
    if (!products || !form.values.products) return [];
    const attendeeProductIds = new Set(products.filter((product) => product && product.product_type === "TICKET").map((product) => product.id));
    return form.values.products.map((product, index) => attendeeProductIds.has(product.product_id) ? index : -1).filter((index) => index !== -1);
  };
  const getFirstTicketAttendeeIndex = () => {
    const indices = getTicketAttendeeIndices();
    return indices.length > 0 ? indices[0] : -1;
  };
  const totalTicketAttendees = getTicketAttendeeIndices().length;
  const areOrderDetailsComplete = () => {
    const {
      first_name,
      last_name,
      email
    } = form.values.order;
    return first_name.trim() !== "" && last_name.trim() !== "" && isEmailValid(email);
  };
  const copyDetailsToAttendees = (option) => {
    if (!products) return;
    const ticketIndices = getTicketAttendeeIndices();
    if (ticketIndices.length === 0) return;
    const updatedProducts = form.values.products.map((product, index) => {
      const isTicketAttendee = ticketIndices.includes(index);
      const isFirst = index === ticketIndices[0];
      const shouldCopy = option === "all" ? isTicketAttendee : option === "first" && isFirst;
      if (isTicketAttendee) {
        if (shouldCopy) {
          return {
            ...product,
            first_name: form.values.order.first_name,
            last_name: form.values.order.last_name,
            email: form.values.order.email,
            email_confirmation: form.values.order.email
          };
        } else {
          return {
            ...product,
            first_name: "",
            last_name: "",
            email: "",
            email_confirmation: ""
          };
        }
      }
      return product;
    });
    form.setValues({
      ...form.values,
      products: updatedProducts
    });
  };
  const handleCopyOptionChange = (value) => {
    const option = value;
    if (option !== "none" && !areOrderDetailsComplete()) {
      return;
    }
    setCopyOption(option);
    copyDetailsToAttendees(option);
  };
  useEffect(() => {
    if (copyOption !== "none" && !areOrderDetailsComplete()) {
      setCopyOption("none");
      copyDetailsToAttendees("none");
    }
  }, [form.values.order.first_name, form.values.order.last_name, form.values.order.email]);
  const mutation = useMutation({
    mutationFn: (orderData) => orderClientPublic.finaliseOrder(Number(eventId), String(orderShortId), orderData),
    onSuccess: (data) => {
      const nextPage = (order == null ? void 0 : order.is_payment_required) ? "payment" : "summary";
      if (nextPage === "summary") {
        trackEvent(AnalyticsEvents.PURCHASE_COMPLETED_FREE);
      }
      navigate(eventCheckoutPath(eventId, data.data.short_id, nextPage));
    },
    onError: (error) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
      if (((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.errors) && Object.keys((_d2 = (_c2 = error == null ? void 0 : error.response) == null ? void 0 : _c2.data) == null ? void 0 : _d2.errors).length > 0) {
        form.setErrors(error.response.data.errors);
      } else if ((_f2 = (_e2 = error == null ? void 0 : error.response) == null ? void 0 : _e2.data) == null ? void 0 : _f2.message) {
        notifications.show({
          message: (_h2 = (_g2 = error == null ? void 0 : error.response) == null ? void 0 : _g2.data) == null ? void 0 : _h2.message
        });
        if (error.response.status === 409 && getEmbedMode() !== "modal") {
          navigate(eventHomepagePath(event));
        }
      }
    }
  });
  const createProductIdToQuestionMap = () => {
    const productIdToQuestionMap = /* @__PURE__ */ new Map();
    productQuestions == null ? void 0 : productQuestions.forEach((question) => {
      var _a2;
      (_a2 = question.product_ids) == null ? void 0 : _a2.forEach((id) => {
        const existingQuestions = productIdToQuestionMap.get(id);
        productIdToQuestionMap.set(id, existingQuestions ? [...existingQuestions, question] : [question]);
      });
    });
    return productIdToQuestionMap;
  };
  const createProductsAndQuestions = (productIdToQuestionMap) => {
    const products2 = [];
    orderItems == null ? void 0 : orderItems.forEach((orderItem) => {
      Array.from(Array(orderItem == null ? void 0 : orderItem.quantity)).map(() => {
        var _a2;
        products2.push({
          product_price_id: orderItem == null ? void 0 : orderItem.product_price_id,
          product_id: orderItem == null ? void 0 : orderItem.product_id,
          first_name: "",
          last_name: "",
          email: "",
          email_confirmation: "",
          questions: (_a2 = productIdToQuestionMap.get(orderItem == null ? void 0 : orderItem.product_id)) == null ? void 0 : _a2.map((question) => {
            return {
              question_id: question.id,
              response: {}
            };
          })
        });
      });
    });
    return products2;
  };
  const createFormOrderQuestions = () => {
    const formOrderQuestions = [];
    orderQuestions == null ? void 0 : orderQuestions.forEach((orderQuestion) => {
      formOrderQuestions.push({
        question_id: orderQuestion.id,
        response: {}
      });
    });
    return formOrderQuestions;
  };
  const handleSubmit = (values) => {
    mutation.mutate(values);
  };
  useEffect(() => {
    if (isEventFetched && isOrderFetched && isQuestionsFetched && productQuestions && orderQuestions) {
      const builtProducts = createProductsAndQuestions(createProductIdToQuestionMap());
      const formOrderQuestions = createFormOrderQuestions();
      const orderPrefill = {
        ...prefill.first_name !== void 0 && {
          first_name: prefill.first_name
        },
        ...prefill.last_name !== void 0 && {
          last_name: prefill.last_name
        },
        ...prefill.email !== void 0 && {
          email: prefill.email,
          email_confirmation: prefill.email
        }
      };
      const ticketProductIds = new Set((products ?? []).filter((product) => product && product.product_type === "TICKET").map((product) => product.id));
      const prefilledProducts = builtProducts.map((product) => !isPerOrderCollection && ticketProductIds.has(product.product_id) ? {
        ...product,
        ...orderPrefill
      } : product);
      form.setValues({
        ...form.values,
        products: prefilledProducts,
        order: {
          ...form.values.order,
          ...orderPrefill,
          questions: formOrderQuestions
        }
      });
    }
  }, [isEventFetched, isOrderFetched, isQuestionsFetched]);
  useEffect(() => {
    if (order && event && (order == null ? void 0 : order.is_expired) && getEmbedMode() !== "modal") {
      showInfo(i18n._(
        /*i18n*/
        {
          id: "Q0zd4P"
        }
      ));
      navigate(`/event/${eventId}/${event.slug}`);
    }
  }, [order, event]);
  if (!isEventFetched || !isOrderFetched) {
    return /* @__PURE__ */ jsx(LoadingSkeleton, {});
  }
  if ((order == null ? void 0 : order.status) === "ABANDONED") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "cancelled", message: i18n._(
      /*i18n*/
      {
        id: "3NT0Ck"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "sjNPMw"
      }
    ), link: eventHomepagePath(event), linkText: i18n._(
      /*i18n*/
      {
        id: "kYqM1A"
      }
    ) });
  }
  if ((order == null ? void 0 : order.payment_status) === "AWAITING_PAYMENT") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "awaiting_payment", message: i18n._(
      /*i18n*/
      {
        id: "quR8Qp"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "5YrKW7"
      }
    ), link: eventCheckoutPath(eventId, orderShortId, "payment"), linkText: i18n._(
      /*i18n*/
      {
        id: "C8HNV2"
      }
    ) });
  }
  if ((order == null ? void 0 : order.status) === "COMPLETED") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "success", message: i18n._(
      /*i18n*/
      {
        id: "b6+Y+n"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "CnZ3Ou"
      }
    ), link: eventCheckoutPath(eventId, orderShortId, "summary"), linkText: i18n._(
      /*i18n*/
      {
        id: "tKKZn0"
      }
    ) });
  }
  if ((order == null ? void 0 : order.status) === "CANCELLED") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "cancelled", message: i18n._(
      /*i18n*/
      {
        id: "H5qWhm"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "OhCesD"
      }
    ), link: eventHomepagePath(event), linkText: i18n._(
      /*i18n*/
      {
        id: "kYqM1A"
      }
    ) });
  }
  if (isOrderError && ((_d = orderError == null ? void 0 : orderError.response) == null ? void 0 : _d.status) === 404) {
    if (isFromWaitlist && eventId) {
      clearWaitlistJoinedForEvent(eventId);
    }
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "not_found", message: isFromWaitlist ? i18n._(
      /*i18n*/
      {
        id: "TwnTPy"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "sLbJQz"
      }
    ), subtitle: isFromWaitlist ? i18n._(
      /*i18n*/
      {
        id: "fT9VLt"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "miysJh"
      }
    ), link: eventHomepagePath(event), linkText: i18n._(
      /*i18n*/
      {
        id: "oNL5vN"
      }
    ) });
  }
  if (isOrderError || isEventError || isQuestionsError) {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "error", message: i18n._(
      /*i18n*/
      {
        id: "nwtY4N"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "HJKdzP"
      }
    ), link: eventHomepagePath(event), linkText: i18n._(
      /*i18n*/
      {
        id: "kYqM1A"
      }
    ) });
  }
  const orderRequiresAttendeeDetails = orderItems == null ? void 0 : orderItems.some((orderItem) => {
    const product = products == null ? void 0 : products.find((product2) => product2.id === orderItem.product_id);
    return (product == null ? void 0 : product.product_type) === "TICKET";
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs(CheckoutContent, { children: [
    /* @__PURE__ */ jsx(CheckoutStepTitle, { title: i18n._(
      /*i18n*/
      {
        id: "URmyfc"
      }
    ), subtitle: (order == null ? void 0 : order.is_payment_required) ? i18n._(
      /*i18n*/
      {
        id: "6WaIfx"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "qij1Ip"
      }
    ) }),
    isFromWaitlist && /* @__PURE__ */ jsxs("div", { className: classes.waitlistBanner, children: [
      /* @__PURE__ */ jsx("div", { className: classes.waitlistBannerIcon, children: /* @__PURE__ */ jsx(IconClock, { size: 22 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: classes.waitlistBannerTitle, children: i18n._(
          /*i18n*/
          {
            id: "/5HL6k"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: classes.waitlistBannerText, children: i18n._(
          /*i18n*/
          {
            id: "744BMm"
          }
        ) })
      ] })
    ] }),
    event && order && /* @__PURE__ */ jsx(InlineOrderSummary, { event, order, defaultExpanded: true }),
    /* @__PURE__ */ jsx("h2", { className: classes.sectionHeading, children: i18n._(
      /*i18n*/
      {
        id: "lkMK2r"
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: classes.sectionHelper, children: i18n._(
      /*i18n*/
      {
        id: "q1BizZ"
      }
    ) }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, label: i18n._(
          /*i18n*/
          {
            id: "kODvZJ"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "V1EGGU"
          }
        ), disabled: isLocked("first_name"), ...form.getInputProps("order.first_name") }),
        /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, label: i18n._(
          /*i18n*/
          {
            id: "UXBCwc"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "UXBCwc"
          }
        ), disabled: isLocked("last_name"), ...form.getInputProps("order.last_name") })
      ] }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, type: "email", label: i18n._(
          /*i18n*/
          {
            id: "hzKQCy"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "hzKQCy"
          }
        ), disabled: isLocked("email"), rightSection: isEmailValid(form.values.order.email) ? /* @__PURE__ */ jsx(EmailCheckIcon, {}) : null, ...form.getInputProps("order.email") }),
        /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, type: "email", label: i18n._(
          /*i18n*/
          {
            id: "NGXKG/"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "NGXKG/"
          }
        ), disabled: isLocked("email"), rightSection: isEmailValid(form.values.order.email_confirmation) ? /* @__PURE__ */ jsx(EmailCheckIcon, {}) : null, ...form.getInputProps("order.email_confirmation") })
      ] }),
      orderRequiresAttendeeDetails && !isPerOrderCollection && totalTicketAttendees > 0 && !lock && /* @__PURE__ */ jsx("div", { className: classes.copyDetailsSection, children: totalTicketAttendees === 1 ? /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
        /*i18n*/
        {
          id: "VejKUM"
        }
      ), disabled: areOrderDetailsComplete(), position: "right", withArrow: true, children: /* @__PURE__ */ jsx("div", { style: {
        display: "inline-block"
      }, children: /* @__PURE__ */ jsx(Checkbox, { size: "sm", label: i18n._(
        /*i18n*/
        {
          id: "+2ZJ7N"
        }
      ), checked: copyOption === "first", disabled: !areOrderDetailsComplete(), onChange: (e) => handleCopyOptionChange(e.currentTarget.checked ? "first" : "none") }) }) }) : /* @__PURE__ */ jsxs("div", { className: classes.copyDetailsMultiple, children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", className: classes.copyLabel, children: i18n._(
          /*i18n*/
          {
            id: "tUGbi8"
          }
        ) }),
        /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
          /*i18n*/
          {
            id: "VejKUM"
          }
        ), disabled: areOrderDetailsComplete(), withArrow: true, children: /* @__PURE__ */ jsx(SegmentedControl, { size: "xs", value: copyOption, onChange: handleCopyOptionChange, disabled: !areOrderDetailsComplete(), data: [{
          label: i18n._(
            /*i18n*/
            {
              id: "EdQY6l"
            }
          ),
          value: "none"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "1vBhpG"
            }
          ),
          value: "first"
        }, ...allowCopyToAllAttendees ? [{
          label: i18n._(
            /*i18n*/
            {
              id: "gKq1fa"
            }
          ),
          value: "all"
        }] : []] }) })
      ] }) }),
      requireBillingAddress && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h3", { style: {
          marginBottom: 5
        }, children: i18n._(
          /*i18n*/
          {
            id: "8rE61T"
          }
        ) }),
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, label: i18n._(
            /*i18n*/
            {
              id: "POdIrN"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "POdIrN"
            }
          ), ...form.getInputProps("order.address.address_line_1") }),
          /* @__PURE__ */ jsx(TextInput, { label: i18n._(
            /*i18n*/
            {
              id: "gwk5gg"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "gwk5gg"
            }
          ), ...form.getInputProps("order.address.address_line_2") })
        ] }),
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, label: i18n._(
            /*i18n*/
            {
              id: "3wV73y"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "3wV73y"
            }
          ), ...form.getInputProps("order.address.city") }),
          /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, label: i18n._(
            /*i18n*/
            {
              id: "/2by1f"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "/2by1f"
            }
          ), ...form.getInputProps("order.address.state_or_region") })
        ] }),
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(TextInput, { label: i18n._(
            /*i18n*/
            {
              id: "x1PPdr"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "+LtVBt"
            }
          ), ...form.getInputProps("order.address.zip_or_postal_code") }),
          /* @__PURE__ */ jsx(NativeSelect, { withAsterisk: true, label: i18n._(
            /*i18n*/
            {
              id: "JNCzPW"
            }
          ), data: countries, ...form.getInputProps("order.address.country") })
        ] })
      ] }),
      orderQuestions && /* @__PURE__ */ jsx(CheckoutOrderQuestions, { form, questions: orderQuestions }),
      ((_e = event == null ? void 0 : event.settings) == null ? void 0 : _e.show_marketing_opt_in) && /* @__PURE__ */ jsx(Checkbox, { mt: "md", label: i18n._(
        /*i18n*/
        {
          id: "lB2hSG",
          values: {
            0: ((_f = event == null ? void 0 : event.organizer) == null ? void 0 : _f.name) || t`this organizer`
          }
        }
      ), ...form.getInputProps("order.opted_into_marketing", {
        type: "checkbox"
      }) })
    ] }),
    orderItems == null ? void 0 : orderItems.map((orderItem) => {
      const product = products == null ? void 0 : products.find((product2) => product2.id === orderItem.product_id);
      const productRequiresDetails = (product == null ? void 0 : product.product_type) === "TICKET" && !isPerOrderCollection;
      const productHasQuestions = productQuestions == null ? void 0 : productQuestions.some((question) => {
        var _a2;
        return (_a2 = question.product_ids) == null ? void 0 : _a2.includes(orderItem.product_id);
      });
      if (!product) {
        return null;
      }
      if (!productRequiresDetails && !productHasQuestions) {
        productIndex += orderItem.quantity ?? 0;
        return null;
      }
      return /* @__PURE__ */ jsxs("div", { className: classes.ticketSection, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.ticketTypeHeader, children: [
          /* @__PURE__ */ jsx("h3", { children: orderItem == null ? void 0 : orderItem.item_name }),
          /* @__PURE__ */ jsx("span", { className: classes.ticketCountBadge, children: orderItem.quantity === 1 ? i18n._(
            /*i18n*/
            {
              id: "yTsaLw"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "/HkCs4",
              values: {
                0: orderItem.quantity
              }
            }
          ) })
        ] }),
        Array.from(Array(orderItem == null ? void 0 : orderItem.quantity)).map((_, index) => {
          var _a2, _b2;
          const currentProductIndex = productIndex;
          const ticketIndices = getTicketAttendeeIndices();
          const isTicketAttendee = ticketIndices.includes(currentProductIndex);
          const isFirstTicketAttendee = currentProductIndex === getFirstTicketAttendeeIndex();
          const isCopied = isTicketAttendee && (copyOption === "all" || copyOption === "first" && isFirstTicketAttendee);
          const currentProduct = form.values.products[currentProductIndex];
          const valuesMatchOrder = currentProduct && currentProduct.first_name === form.values.order.first_name && currentProduct.last_name === form.values.order.last_name && currentProduct.email === form.values.order.email;
          const showCopiedBadge = isCopied && productRequiresDetails && valuesMatchOrder;
          const productInputs = /* @__PURE__ */ jsxs(Card, { className: classes.attendeeCard, children: [
            /* @__PURE__ */ jsxs("div", { className: classes.attendeeCardHeader, children: [
              /* @__PURE__ */ jsxs("div", { className: classes.attendeeHeaderLeft, children: [
                /* @__PURE__ */ jsx("div", { className: classes.attendeeNumber, children: index + 1 }),
                /* @__PURE__ */ jsxs("div", { className: classes.attendeeInfo, children: [
                  /* @__PURE__ */ jsxs("h4", { children: [
                    product.product_type === "TICKET" ? i18n._(
                      /*i18n*/
                      {
                        id: "ss9PbX"
                      }
                    ) : i18n._(
                      /*i18n*/
                      {
                        id: "HX5SVx"
                      }
                    ),
                    " ",
                    index + 1
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: classes.attendeeTicketType, children: orderItem == null ? void 0 : orderItem.item_name })
                ] })
              ] }),
              showCopiedBadge && /* @__PURE__ */ jsx("span", { className: classes.copiedBadge, children: i18n._(
                /*i18n*/
                {
                  id: "1JnTgU"
                }
              ) })
            ] }),
            productRequiresDetails && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(InputGroup, { children: [
                /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, label: i18n._(
                  /*i18n*/
                  {
                    id: "kODvZJ"
                  }
                ), placeholder: i18n._(
                  /*i18n*/
                  {
                    id: "V1EGGU"
                  }
                ), disabled: isLocked("first_name"), ...form.getInputProps(`products.${currentProductIndex}.first_name`) }),
                /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, label: i18n._(
                  /*i18n*/
                  {
                    id: "UXBCwc"
                  }
                ), placeholder: i18n._(
                  /*i18n*/
                  {
                    id: "UXBCwc"
                  }
                ), disabled: isLocked("last_name"), ...form.getInputProps(`products.${currentProductIndex}.last_name`) })
              ] }),
              /* @__PURE__ */ jsxs(InputGroup, { children: [
                /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, type: "email", label: i18n._(
                  /*i18n*/
                  {
                    id: "hzKQCy"
                  }
                ), placeholder: i18n._(
                  /*i18n*/
                  {
                    id: "hzKQCy"
                  }
                ), disabled: isLocked("email"), rightSection: isEmailValid(((_a2 = form.values.products[currentProductIndex]) == null ? void 0 : _a2.email) || "") ? /* @__PURE__ */ jsx(EmailCheckIcon, {}) : null, ...form.getInputProps(`products.${currentProductIndex}.email`) }),
                /* @__PURE__ */ jsx(TextInput, { withAsterisk: true, type: "email", label: i18n._(
                  /*i18n*/
                  {
                    id: "NGXKG/"
                  }
                ), placeholder: i18n._(
                  /*i18n*/
                  {
                    id: "NGXKG/"
                  }
                ), disabled: isLocked("email"), rightSection: isEmailValid(((_b2 = form.values.products[currentProductIndex]) == null ? void 0 : _b2.email_confirmation) || "") ? /* @__PURE__ */ jsx(EmailCheckIcon, {}) : null, ...form.getInputProps(`products.${currentProductIndex}.email_confirmation`) })
              ] })
            ] }),
            productQuestions && /* @__PURE__ */ jsx(CheckoutProductQuestions, { index: currentProductIndex, product, form, questions: productQuestions })
          ] }, `${orderItem.id} ${index}`);
          productIndex++;
          return productInputs;
        })
      ] }, orderItem.product_id + orderItem.id);
    }),
    !!((_g = event == null ? void 0 : event.settings) == null ? void 0 : _g.pre_checkout_message) && /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
      __html: (_h = event == null ? void 0 : event.settings) == null ? void 0 : _h.pre_checkout_message
    } }) }),
    /* @__PURE__ */ jsxs("div", { className: classes.checkoutActions, children: [
      /* @__PURE__ */ jsx(Button, { className: classes.continueButton, loading: mutation.isPending, type: "submit", rightSection: (order == null ? void 0 : order.is_payment_required) ? /* @__PURE__ */ jsx(IconArrowRight, { size: 18 }) : void 0, leftSection: !(order == null ? void 0 : order.is_payment_required) ? /* @__PURE__ */ jsx(IconCheck, { size: 18 }) : void 0, children: (order == null ? void 0 : order.is_payment_required) ? i18n._(
        /*i18n*/
        {
          id: "F3/nus"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "NPZqBL"
        }
      ) }),
      !!getConfig("VITE_TOS_URL") && /* @__PURE__ */ jsx("p", { className: classes.tosNotice, children: /* @__PURE__ */ jsx(Trans, { id: "DFqasq", values: {
        0: getConfig("VITE_APP_NAME", "Coursify")
      }, components: {
        0: /* @__PURE__ */ jsx("a", { href: getConfig("VITE_TOS_URL", "https://coursify.guru/terms-of-service"), target: "_blank", rel: "noopener noreferrer" })
      } }) })
    ] })
  ] }) });
};
export {
  CollectInformation,
  CollectInformation as default
};

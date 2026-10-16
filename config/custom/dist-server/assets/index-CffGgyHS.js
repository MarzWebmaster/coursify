import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { U as getCheckoutSessionIdentifier, T as useGetEventPublic, a as getConfig } from "../entry.server.js";
import { C as CheckoutContent } from "./index-Cu99v0OR.js";
import { C as CheckoutStepTitle, I as InlineOrderSummary } from "./index-Bbi8HwGR.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { a as orderClientPublic } from "./order.client-BmBVeAyF.js";
import { loadStripe } from "@stripe/stripe-js";
import { H as HomepageInfoMessage } from "./index-DlbMZZb-.js";
import { j as eventCheckoutPath, a as eventHomepagePath } from "./urlHelper-CsaWRwIV.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { Skeleton, Alert, Text, Button, Group } from "@mantine/core";
import { u as useGetOrderPublic } from "./useGetOrderPublic-Ck7WTgJ2.js";
import { g as getEmbedParentUrl } from "./iframeResize-DUQclS7o.js";
import { v as validateThemeSettings } from "./themeUtils-B--ztbrW.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { IconWallet, IconBuildingBank, IconLock } from "@tabler/icons-react";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { a as showError } from "./notifications-Coh3Ef-t.js";
import { t as trackEvent, A as AnalyticsEvents } from "./analytics-Cd4RPKa9.js";
import "react-dom/server";
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
import "./types-CqPWB-a5.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
const GET_INITIATE_STRIPE_SESSION_PUBLIC_QUERY_KEY = "getStripSessionPublic";
const useCreateStripePaymentIntent = (eventId, orderShortId) => {
  return useQuery({
    queryKey: [GET_INITIATE_STRIPE_SESSION_PUBLIC_QUERY_KEY],
    queryFn: async () => {
      const {
        client_secret,
        account_id,
        public_key,
        stripe_platform
      } = await orderClientPublic.createStripePaymentIntent(Number(eventId), String(orderShortId));
      return {
        client_secret,
        account_id,
        public_key,
        stripe_platform
      };
    },
    retry: false,
    staleTime: 0,
    gcTime: 0
  });
};
const stripeForElement = "_stripeForElement_3zd9k_1";
const classes$1 = {
  stripeForElement
};
const buildReturnUrl = (eventId, orderShortId, sessionId) => {
  const parentUrl = getEmbedParentUrl();
  if (parentUrl) {
    try {
      const url = new URL(parentUrl);
      if (url.protocol === "https:" || url.protocol === "http:") {
        url.searchParams.set("hievents_event", eventId);
        url.searchParams.set("hievents_order", orderShortId);
        if (sessionId) {
          url.searchParams.set("hievents_session", sessionId);
        }
        return url.toString();
      }
    } catch (e) {
      return window.location.origin + `/checkout/${eventId}/${orderShortId}/payment_return` + (sessionId ? `?session_identifier=${sessionId}` : "");
    }
  }
  const fallback = window.location.origin + `/checkout/${eventId}/${orderShortId}/payment_return`;
  return sessionId ? `${fallback}?session_identifier=${sessionId}` : fallback;
};
function StripeCheckoutForm({
  setSubmitHandler
}) {
  const {
    eventId,
    orderShortId
  } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    data: order,
    isFetched: isOrderFetched
  } = useGetOrderPublic(eventId, orderShortId, ["event"]);
  const event = order == null ? void 0 : order.event;
  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }
    const sessionId = getCheckoutSessionIdentifier();
    const {
      error
    } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: buildReturnUrl(String(eventId), String(orderShortId), sessionId)
      },
      redirect: "if_required"
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage(i18n._(
          /*i18n*/
          {
            id: "W5A0Ly"
          }
        ));
      }
      return;
    }
    navigate(eventCheckoutPath(eventId, orderShortId, "payment_return") + (sessionId ? `?session_identifier=${sessionId}` : ""));
  };
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window == null ? void 0 : window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({
      paymentIntent
    }) => {
      switch (paymentIntent == null ? void 0 : paymentIntent.status) {
        case "succeeded":
          setMessage(i18n._(
            /*i18n*/
            {
              id: "xgav5v"
            }
          ));
          break;
        case "processing":
          setMessage(i18n._(
            /*i18n*/
            {
              id: "P8hBau"
            }
          ));
          break;
        case "requires_payment_method":
          setMessage(i18n._(
            /*i18n*/
            {
              id: "UdY1lL"
            }
          ));
          break;
        default:
          setMessage(i18n._(
            /*i18n*/
            {
              id: "kf83Ld"
            }
          ));
          break;
      }
    });
  }, [stripe]);
  useEffect(() => {
    if (setSubmitHandler) {
      setSubmitHandler(() => handleSubmit);
    }
  }, [setSubmitHandler, stripe, elements]);
  if (!isOrderFetched || !(order == null ? void 0 : order.payment_status)) {
    return /* @__PURE__ */ jsx(CheckoutContent, { children: /* @__PURE__ */ jsx(Skeleton, { height: 300, mb: 20 }) });
  }
  if ((order == null ? void 0 : order.payment_status) === "PAYMENT_RECEIVED") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "success", message: i18n._(
      /*i18n*/
      {
        id: "8Lx2X7"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "RjwlZt"
      }
    ), linkText: i18n._(
      /*i18n*/
      {
        id: "tKKZn0"
      }
    ), link: eventCheckoutPath(eventId, orderShortId, "summary") });
  }
  if ((order == null ? void 0 : order.payment_status) !== "AWAITING_PAYMENT" && (order == null ? void 0 : order.payment_status) !== "PAYMENT_FAILED") {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "expired", message: i18n._(
      /*i18n*/
      {
        id: "8uqsE5"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "yPZN4i"
      }
    ), linkText: i18n._(
      /*i18n*/
      {
        id: "kYqM1A"
      }
    ), link: eventHomepagePath(event) });
  }
  const paymentElementOptions = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };
  return /* @__PURE__ */ jsx("form", { id: "payment-form", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    ((order == null ? void 0 : order.payment_status) === "PAYMENT_FAILED" || (window == null ? void 0 : window.location.search.includes("payment_failed"))) && /* @__PURE__ */ jsx(Alert, { mb: 20, color: "red", children: i18n._(
      /*i18n*/
      {
        id: "fzuM26"
      }
    ) }),
    message !== "" && /* @__PURE__ */ jsx(Alert, { mb: 20, children: message }),
    /* @__PURE__ */ jsx(LoadingMask, {}),
    /* @__PURE__ */ jsx(PaymentElement, { className: classes$1.stripeForElement, id: "payment-element", options: paymentElementOptions })
  ] }) });
}
const StripePaymentMethod = ({
  enabled,
  setSubmitHandler
}) => {
  var _a, _b, _c;
  const {
    eventId,
    orderShortId
  } = useParams();
  const {
    data: stripeData,
    isFetched: isStripeFetched,
    error: stripePaymentIntentError
  } = useCreateStripePaymentIntent(eventId, orderShortId);
  const [stripePromise, setStripePromise] = useState();
  const {
    data: event
  } = useGetEventPublic(eventId);
  useEffect(() => {
    if (!(stripeData == null ? void 0 : stripeData.client_secret) || !(stripeData == null ? void 0 : stripeData.public_key)) {
      return;
    }
    const stripeAccount = stripeData == null ? void 0 : stripeData.account_id;
    const options = stripeAccount ? {
      stripeAccount
    } : {};
    setStripePromise(loadStripe(stripeData.public_key, options));
  }, [stripeData]);
  if (!enabled) {
    return /* @__PURE__ */ jsx(CheckoutContent, { children: /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "warning", message: i18n._(
      /*i18n*/
      {
        id: "fx8BTd"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "WbopAG"
      }
    ), link: eventHomepagePath(event), linkText: i18n._(
      /*i18n*/
      {
        id: "CbnrWb"
      }
    ) }) });
  }
  if (stripePaymentIntentError && event) {
    return /* @__PURE__ */ jsx(CheckoutContent, { children: /* @__PURE__ */ jsx(
      HomepageInfoMessage,
      {
        status: "error",
        message: ((_b = (_a = stripePaymentIntentError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "nwtY4N"
          }
        ),
        subtitle: i18n._(
          /*i18n*/
          {
            id: "2cUopP"
          }
        ),
        link: eventHomepagePath(event),
        linkText: i18n._(
          /*i18n*/
          {
            id: "CbnrWb"
          }
        )
      }
    ) });
  }
  if (!isStripeFetched) {
    return /* @__PURE__ */ jsx(LoadingMask, {});
  }
  const themeSettings = validateThemeSettings((_c = event == null ? void 0 : event.settings) == null ? void 0 : _c.homepage_theme_settings);
  const stripeTheme = themeSettings.mode === "dark" ? "night" : "stripe";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !stripePromise && /* @__PURE__ */ jsx(LoadingMask, {}),
    isStripeFetched && (stripeData == null ? void 0 : stripeData.client_secret) && stripePromise && /* @__PURE__ */ jsx(Elements, { options: {
      clientSecret: stripeData == null ? void 0 : stripeData.client_secret,
      loader: "always",
      appearance: {
        theme: stripeTheme,
        variables: {
          colorPrimary: themeSettings.accent
        }
      }
    }, stripe: stripePromise, children: /* @__PURE__ */ jsx(StripeCheckoutForm, { setSubmitHandler }) })
  ] });
};
const OfflinePaymentMethod = ({
  event
}) => {
  const eventSettings = event == null ? void 0 : event.settings;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { children: i18n._(
      /*i18n*/
      {
        id: "JEdsvQ"
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
      __html: (eventSettings == null ? void 0 : eventSettings.offline_payment_instructions) || ""
    } }) })
  ] });
};
const useTransitionOrderToOfflinePaymentPublic = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderShortId
    }) => {
      return orderClientPublic.transitionToOfflinePayment(eventId, orderShortId);
    }
  });
};
const paymentMethodSelector = "_paymentMethodSelector_91zyz_7";
const paymentMethodLabel = "_paymentMethodLabel_91zyz_12";
const paymentMethodTabs = "_paymentMethodTabs_91zyz_17";
const paymentMethodTab = "_paymentMethodTab_91zyz_17";
const active = "_active_91zyz_40";
const checkoutActions = "_checkoutActions_91zyz_46";
const continueButton = "_continueButton_91zyz_51";
const tosNotice = "_tosNotice_91zyz_69";
const classes = {
  paymentMethodSelector,
  paymentMethodLabel,
  paymentMethodTabs,
  paymentMethodTab,
  active,
  checkoutActions,
  continueButton,
  tosNotice
};
const Payment = () => {
  var _a, _b, _c, _d;
  const navigate = useNavigate();
  const {
    eventId,
    orderShortId
  } = useParams();
  const {
    data: event,
    isFetched: isEventFetched
  } = useGetEventPublic(eventId);
  const {
    data: order,
    isFetched: isOrderFetched
  } = useGetOrderPublic(eventId, orderShortId, ["event"]);
  const isLoading = !isOrderFetched;
  const checkoutEvent = (order == null ? void 0 : order.event) || event;
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState(null);
  const [submitHandler, setSubmitHandler] = useState(null);
  const transitionOrderToOfflinePaymentMutation = useTransitionOrderToOfflinePaymentPublic();
  const isStripeEnabled = (_b = (_a = event == null ? void 0 : event.settings) == null ? void 0 : _a.payment_providers) == null ? void 0 : _b.includes("STRIPE");
  const isOfflineEnabled = (_d = (_c = event == null ? void 0 : event.settings) == null ? void 0 : _c.payment_providers) == null ? void 0 : _d.includes("OFFLINE");
  React.useEffect(() => {
    if (isStripeEnabled) {
      setActivePaymentMethod("STRIPE");
    } else if (isOfflineEnabled) {
      setActivePaymentMethod("OFFLINE");
    } else {
      setActivePaymentMethod(null);
    }
  }, [isStripeEnabled, isOfflineEnabled]);
  React.useEffect(() => {
    window == null ? void 0 : window.scrollTo(0, 0);
  }, []);
  const handleParentSubmit = () => {
    if (submitHandler) {
      setIsPaymentLoading(true);
      submitHandler().finally(() => setIsPaymentLoading(false));
    }
  };
  const handleSubmit = async () => {
    if (activePaymentMethod === "STRIPE") {
      handleParentSubmit();
    } else if (activePaymentMethod === "OFFLINE") {
      setIsPaymentLoading(true);
      await transitionOrderToOfflinePaymentMutation.mutateAsync({
        eventId,
        orderShortId
      }, {
        onSuccess: () => {
          const totalCents = Math.round(((order == null ? void 0 : order.total_gross) || 0) * 100);
          trackEvent(AnalyticsEvents.PURCHASE_COMPLETED_OFFLINE, {
            value: totalCents
          });
          navigate(`/checkout/${eventId}/${orderShortId}/summary`);
        },
        onError: (error) => {
          var _a2, _b2;
          setIsPaymentLoading(false);
          showError(((_b2 = (_a2 = error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "dWBrJX"
            }
          ));
        }
      });
    }
  };
  if (!isStripeEnabled && !isOfflineEnabled && isOrderFetched && isEventFetched) {
    return /* @__PURE__ */ jsx(CheckoutContent, { children: /* @__PURE__ */ jsx(Card, { children: i18n._(
      /*i18n*/
      {
        id: "RBXXtB"
      }
    ) }) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(CheckoutContent, { children: [
    /* @__PURE__ */ jsx(CheckoutStepTitle, { title: i18n._(
      /*i18n*/
      {
        id: "621rYf"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "qij1Ip"
      }
    ) }),
    checkoutEvent && order && /* @__PURE__ */ jsx(InlineOrderSummary, { event: checkoutEvent, order, defaultExpanded: false }),
    isStripeEnabled && /* @__PURE__ */ jsx("div", { style: {
      display: activePaymentMethod === "STRIPE" ? "block" : "none"
    }, children: /* @__PURE__ */ jsx(StripePaymentMethod, { enabled: true, setSubmitHandler }) }),
    isOfflineEnabled && /* @__PURE__ */ jsx("div", { style: {
      display: activePaymentMethod === "OFFLINE" ? "block" : "none"
    }, children: /* @__PURE__ */ jsx(OfflinePaymentMethod, { event: checkoutEvent }) }),
    isStripeEnabled && isOfflineEnabled && /* @__PURE__ */ jsxs("div", { className: classes.paymentMethodSelector, children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", className: classes.paymentMethodLabel, children: i18n._(
        /*i18n*/
        {
          id: "ENEPLY"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: classes.paymentMethodTabs, children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes.paymentMethodTab} ${activePaymentMethod === "STRIPE" ? classes.active : ""}`, onClick: () => setActivePaymentMethod("STRIPE"), children: [
          /* @__PURE__ */ jsx(IconWallet, { size: 18 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "oXOSPE"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes.paymentMethodTab} ${activePaymentMethod === "OFFLINE" ? classes.active : ""}`, onClick: () => setActivePaymentMethod("OFFLINE"), children: [
          /* @__PURE__ */ jsx(IconBuildingBank, { size: 18 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "6Aih4U"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.checkoutActions, children: [
      /* @__PURE__ */ jsx(Button, { className: classes.continueButton, loading: isLoading || isPaymentLoading, onClick: handleSubmit, "data-testid": activePaymentMethod === "OFFLINE" ? "offline-payment-button" : void 0, children: (order == null ? void 0 : order.is_payment_required) ? /* @__PURE__ */ jsxs(Group, { gap: 8, wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(IconLock, { size: 16 }),
        /* @__PURE__ */ jsxs(Text, { fw: 600, children: [
          i18n._(
            /*i18n*/
            {
              id: "4fL/V7"
            }
          ),
          " ",
          formatCurrency(order.total_gross, order.currency)
        ] })
      ] }) : i18n._(
        /*i18n*/
        {
          id: "C8HNV2"
        }
      ) }),
      getConfig("VITE_TOS_URL") && /* @__PURE__ */ jsx("p", { className: classes.tosNotice, children: /* @__PURE__ */ jsx(Trans, { id: "DFqasq", values: {
        0: getConfig("VITE_APP_NAME", "Coursify")
      }, components: {
        0: /* @__PURE__ */ jsx("a", { href: getConfig("VITE_TOS_URL", "https://coursify.guru/terms-of-service"), target: "_blank", rel: "noopener noreferrer" })
      } }) })
    ] })
  ] }) });
};
export {
  Payment as default
};

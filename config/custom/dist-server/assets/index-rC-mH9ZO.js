import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useQuery } from "@tanstack/react-query";
import { a as orderClientPublic } from "./order.client-BmBVeAyF.js";
import { G as GET_ORDER_PUBLIC_QUERY_KEY } from "./useGetOrderPublic-Ck7WTgJ2.js";
import { useParams, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { C as CheckoutContent } from "./index-Cu99v0OR.js";
import { j as eventCheckoutPath } from "./urlHelper-CsaWRwIV.js";
import { H as HomepageInfoMessage } from "./index-DlbMZZb-.js";
import { t as trackEvent, A as AnalyticsEvents } from "./analytics-Cd4RPKa9.js";
import "../entry.server.js";
import "react-dom/server";
import "@mantine/core";
import "@tabler/icons-react";
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
const usePollGetOrderPublic = (eventId, orderShortId, enabled, includes = []) => {
  return useQuery({
    queryKey: [GET_ORDER_PUBLIC_QUERY_KEY, eventId, orderShortId],
    queryFn: async () => {
      const {
        data
      } = await orderClientPublic.findByShortId(Number(eventId), String(orderShortId), includes);
      return data;
    },
    refetchInterval: 5e3,
    enabled
  });
};
const container = "_container_1ng2o_1";
const classes = {
  container
};
const GET_ORDER_STRIPE_PAYMENT_INTENT_PUBLIC_QUERY_KEY = "getOrderStripePaymentIntentPublic";
const useGetOrderStripePaymentIntentPublic = (eventId, orderShortId, enabled) => {
  return useQuery({
    queryKey: [GET_ORDER_STRIPE_PAYMENT_INTENT_PUBLIC_QUERY_KEY, eventId, orderShortId],
    queryFn: async () => {
      const {
        data
      } = await orderClientPublic.findOrderStripePaymentIntent(Number(eventId), String(orderShortId));
      return data;
    },
    enabled
  });
};
const PaymentReturn = () => {
  const [shouldPoll, setShouldPoll] = useState(true);
  const {
    eventId,
    orderShortId
  } = useParams();
  const {
    data: order
  } = usePollGetOrderPublic(eventId, orderShortId, shouldPoll, ["event"]);
  const navigate = useNavigate();
  const [attemptManualConfirmation, setAttemptManualConfirmation] = useState(false);
  const paymentIntentQuery = useGetOrderStripePaymentIntentPublic(eventId, orderShortId, attemptManualConfirmation);
  const [cannotConfirmPayment, setCannotConfirmPayment] = useState(false);
  const hasTrackedPurchase = useRef(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldPoll(false);
      setAttemptManualConfirmation(true);
    }, 1e4);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  useEffect(() => {
    var _a;
    if (!paymentIntentQuery.isFetched) {
      return;
    }
    if (((_a = paymentIntentQuery.data) == null ? void 0 : _a.status) === "succeeded") {
      if (!hasTrackedPurchase.current && order) {
        hasTrackedPurchase.current = true;
        const totalCents = Math.round((order.total_gross || 0) * 100);
        trackEvent(AnalyticsEvents.PURCHASE_COMPLETED_PAID, {
          value: totalCents
        });
      }
      navigate(eventCheckoutPath(eventId, orderShortId, "summary"));
    } else {
      setCannotConfirmPayment(true);
    }
  }, [paymentIntentQuery.isFetched]);
  useEffect(() => {
    {
      return;
    }
  }, [order]);
  return /* @__PURE__ */ jsx(CheckoutContent, { children: /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    !cannotConfirmPayment && /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "processing", message: /* @__PURE__ */ jsxs(Fragment, { children: [
      !shouldPoll && paymentIntentQuery.isFetched && i18n._(
        /*i18n*/
        {
          id: "vmOFL/"
        }
      ),
      !shouldPoll && !paymentIntentQuery.isFetched && i18n._(
        /*i18n*/
        {
          id: "c4uJfc"
        }
      ),
      shouldPoll && i18n._(
        /*i18n*/
        {
          id: "Gspam9"
        }
      )
    ] }) }),
    cannotConfirmPayment && /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "error", message: i18n._(
      /*i18n*/
      {
        id: "01WH0a"
      }
    ) })
  ] }) });
};
export {
  PaymentReturn,
  PaymentReturn as default
};

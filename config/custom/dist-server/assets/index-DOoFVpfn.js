import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useNavigate, useLocation, useSearchParams, useBlocker, Outlet } from "react-router";
import { u as useGetOrderPublic } from "./useGetOrderPublic-Ck7WTgJ2.js";
import { C as Countdown } from "./index-CixzP3jj.js";
import { Tooltip, ActionIcon, Modal, Button, Group } from "@mantine/core";
import { IconCalendarPlus, IconArrowLeft, IconClock, IconPrinter, IconReceipt } from "@tabler/icons-react";
import { e as eventHomepageUrl, a as eventHomepagePath } from "./urlHelper-CsaWRwIV.js";
import { u as useOrganizerTrackingPixels, h as hasActivePixels, t as trackPixelEvent, S as ShareComponent, C as CookieConsentBanner } from "./useOrganizerTrackingPixels-DLUPSyWr.js";
import { C as CalendarOptionsPopover } from "./index-44oVSCbn.js";
import classNames from "classnames";
import { useMemo, useState, useCallback, useEffect } from "react";
import { a as getParentOrigin, b as getEmbedMode } from "./iframeResize-DUQclS7o.js";
import { a as orderClientPublic } from "./order.client-BmBVeAyF.js";
import { d as downloadBinary } from "./download-DP3M_6Yt.js";
import { w as withLoadingNotification } from "./withLoadingNotification-6oRbhBHA.js";
import { useMutation } from "@tanstack/react-query";
import { a as showError, s as showInfo } from "./notifications-Coh3Ef-t.js";
import { h as isDateInFuture, j as utcDateToEpochMs } from "./dates-CbVpwZeX.js";
import { T as useGetEventPublic, U as getCheckoutSessionIdentifier, P as PoweredByFooter } from "../entry.server.js";
import { d as detectMode } from "./themeUtils-B--ztbrW.js";
import { C as CheckoutThemeProvider } from "./CheckoutThemeProvider-D0cdZ-GY.js";
import "dayjs";
import "dayjs/plugin/utc.js";
import "./types-CqPWB-a5.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "@mantine/notifications";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const container = "_container_12v6m_1";
const countdown = "_countdown_12v6m_9";
const countdownCloseToExpiry = "_countdownCloseToExpiry_12v6m_15";
const mainContent = "_mainContent_12v6m_18";
const header = "_header_12v6m_22";
const headerRow = "_headerRow_12v6m_26";
const backButton = "_backButton_12v6m_35";
const headerDivider = "_headerDivider_12v6m_40";
const titleBlock = "_titleBlock_12v6m_46";
const eventName = "_eventName_12v6m_52";
const headerRowComplete = "_headerRowComplete_12v6m_61";
const eyebrow = "_eyebrow_12v6m_64";
const eyebrowComplete = "_eyebrowComplete_12v6m_72";
const eyebrowAwaiting = "_eyebrowAwaiting_12v6m_75";
const headerSpacer = "_headerSpacer_12v6m_78";
const timerCaption = "_timerCaption_12v6m_81";
const timerChip = "_timerChip_12v6m_94";
const headerActions = "_headerActions_12v6m_108";
const progressTrack = "_progressTrack_12v6m_118";
const progressFill = "_progressFill_12v6m_122";
const classes = {
  container,
  countdown,
  countdownCloseToExpiry,
  mainContent,
  header,
  headerRow,
  backButton,
  headerDivider,
  titleBlock,
  eventName,
  headerRowComplete,
  eyebrow,
  eyebrowComplete,
  eyebrowAwaiting,
  headerSpacer,
  timerCaption,
  timerChip,
  headerActions,
  progressTrack,
  progressFill
};
const AddToEventCalendarButton = ({
  event,
  occurrence
}) => {
  return /* @__PURE__ */ jsx(CalendarOptionsPopover, { event, occurrence, children: /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
    /*i18n*/
    {
      id: "oZW/gT"
    }
  ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", children: /* @__PURE__ */ jsx(IconCalendarPlus, { size: 20 }) }) }) });
};
const useAbandonOrderPublic = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderShortId
    }) => {
      return orderClientPublic.abandonOrder(eventId, orderShortId);
    }
  });
};
const DEFAULT_ACCENT = "#8b5cf6";
const Checkout = () => {
  var _a, _b, _c, _d, _e;
  const {
    eventId,
    orderShortId
  } = useParams();
  const {
    data: order,
    isError: isOrderError
  } = useGetOrderPublic(eventId, orderShortId, ["event"]);
  const event = order == null ? void 0 : order.event;
  const orderOccurrenceIds = Array.from(new Set(((order == null ? void 0 : order.order_items) ?? []).map((item) => item.event_occurrence_id).filter((id) => id != null)));
  const orderOccurrenceId = orderOccurrenceIds.length === 1 ? orderOccurrenceIds[0] : null;
  const {
    data: publicEvent
  } = useGetEventPublic(eventId, !!eventId, false, null, orderOccurrenceId);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isModal = useMemo(() => {
    const fromUrl = searchParams.get("embed") === "modal";
    const cached = getEmbedMode() === "modal";
    return fromUrl || cached;
  }, [searchParams]);
  const orderIsCompleted = (order == null ? void 0 : order.status) === "COMPLETED";
  const orderIsReserved = (order == null ? void 0 : order.status) === "RESERVED";
  const orderIsAwaitingOfflinePayment = (order == null ? void 0 : order.status) === "AWAITING_OFFLINE_PAYMENT";
  const [isExpired, setIsExpired] = useState(false);
  const orderHasAttendees = (order == null ? void 0 : order.attendees) && order.attendees.length > 0;
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [isAbandoning, setIsAbandoning] = useState(false);
  const [pendingClose, setPendingClose] = useState(false);
  const abandonOrderMutation = useAbandonOrderPublic();
  const postToParent = useCallback((type, data) => {
    if (typeof window === "undefined") return;
    try {
      window.parent.postMessage({
        type,
        ...data ?? {}
      }, getParentOrigin() || "*");
    } catch (e) {
    }
  }, []);
  const closeModal = useCallback(() => postToParent("hievents:close-checkout"), [postToParent]);
  const getCurrentStep = () => {
    const pathname = location.pathname;
    if (pathname.includes("/payment")) return "payment";
    if (pathname.includes("/summary")) return "summary";
    return "details";
  };
  const currentStep = getCurrentStep();
  const progressPercent = (order == null ? void 0 : order.is_payment_required) ? {
    details: 33,
    payment: 66,
    summary: 100
  }[currentStep] : {
    details: 50,
    payment: 100,
    summary: 100
  }[currentStep];
  const stepCount = (order == null ? void 0 : order.is_payment_required) ? 3 : 2;
  const stepNumber = (order == null ? void 0 : order.is_payment_required) ? {
    details: 1,
    payment: 2,
    summary: 3
  }[currentStep] : {
    details: 1,
    payment: 2,
    summary: 2
  }[currentStep];
  const isOrderReservedAndNotExpired = orderIsReserved && (order == null ? void 0 : order.reserved_until) && isDateInFuture(order.reserved_until);
  const blocker = useBlocker(({
    currentLocation,
    nextLocation
  }) => {
    const isLeavingCheckout = !nextLocation.pathname.startsWith("/checkout/");
    return !isAbandoning && !!isOrderReservedAndNotExpired && currentLocation.pathname !== nextLocation.pathname && isLeavingCheckout;
  });
  const handleExpiry = () => {
    setIsExpired(true);
  };
  const handleReturn = () => {
    if (isModal) {
      closeModal();
      return;
    }
    navigate(`/event/${event == null ? void 0 : event.id}/${event == null ? void 0 : event.slug}`);
  };
  const handleRequestClose = useCallback(() => {
    postToParent("hievents:close-pending");
    if (isOrderReservedAndNotExpired) {
      setPendingClose(true);
      setShowAbandonDialog(true);
    } else {
      closeModal();
    }
  }, [postToParent, closeModal, isOrderReservedAndNotExpired]);
  useEffect(() => {
    if (!isModal) return;
    const parentOrigin = getParentOrigin();
    const onMessage = (event2) => {
      var _a2;
      if (parentOrigin && event2.origin !== parentOrigin) return;
      if (((_a2 = event2.data) == null ? void 0 : _a2.type) === "hievents:request-close") {
        handleRequestClose();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [isModal, handleRequestClose]);
  useEffect(() => {
    if (isModal && isOrderError) {
      postToParent("hievents:checkout-cleared");
      closeModal();
    }
  }, [isModal, isOrderError, postToParent, closeModal]);
  useEffect(() => {
    if (!isModal) return;
    if (isOrderReservedAndNotExpired) {
      const parentOrigin = getParentOrigin();
      postToParent("hievents:checkout-progress", {
        eventId,
        orderShortId,
        ...parentOrigin ? {
          sessionId: getCheckoutSessionIdentifier()
        } : {},
        step: currentStep,
        reservedUntil: (order == null ? void 0 : order.reserved_until) ? utcDateToEpochMs(order.reserved_until) : null
      });
    } else if (orderIsCompleted || orderIsAwaitingOfflinePayment) {
      postToParent("hievents:checkout-cleared");
    }
  }, [isModal, isOrderReservedAndNotExpired, orderIsCompleted, orderIsAwaitingOfflinePayment, order == null ? void 0 : order.reserved_until, currentStep, eventId, orderShortId, postToParent]);
  useEffect(() => {
    if (!isModal) return;
    const onKeydown = (event2) => {
      if (event2.key === "Escape" && !showAbandonDialog && !isExpired) {
        handleRequestClose();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [isModal, showAbandonDialog, isExpired, handleRequestClose]);
  useEffect(() => {
    if (isModal && (order == null ? void 0 : order.is_expired)) {
      setIsExpired(true);
    }
  }, [isModal, order == null ? void 0 : order.is_expired]);
  const handleInvoiceDownload = async (invoice) => {
    await withLoadingNotification(async () => {
      const blob = await orderClientPublic.downloadInvoice(eventId, orderShortId);
      downloadBinary(blob, invoice.invoice_number + ".pdf");
    }, {
      loading: {
        title: i18n._(
          /*i18n*/
          {
            id: "yhjU+j"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "/IzmnP"
          }
        )
      },
      success: {
        title: i18n._(
          /*i18n*/
          {
            id: "zzDlyQ"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "bKOYkd"
          }
        )
      },
      error: {
        title: i18n._(
          /*i18n*/
          {
            id: "SlfejT"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "xDzTh7"
          }
        )
      }
    });
  };
  const handleAbandonConfirm = async () => {
    setIsAbandoning(true);
    try {
      await abandonOrderMutation.mutateAsync({
        eventId: Number(eventId),
        orderShortId: String(orderShortId)
      });
    } catch (error) {
      showError(i18n._(
        /*i18n*/
        {
          id: "SsI9v/"
        }
      ));
    } finally {
      setShowAbandonDialog(false);
      showInfo(i18n._(
        /*i18n*/
        {
          id: "naQW82"
        }
      ));
      if (pendingClose) {
        setPendingClose(false);
        closeModal();
      } else if (blocker.state === "blocked") {
        blocker.proceed();
      } else if (pendingNavigation) {
        navigate(pendingNavigation);
      }
      setPendingNavigation(null);
      setIsAbandoning(false);
    }
  };
  const handleAbandonCancel = () => {
    if (blocker.state === "blocked") {
      blocker.reset();
    }
    setShowAbandonDialog(false);
    setPendingNavigation(null);
    setPendingClose(false);
  };
  const handleEventHomepageClick = (e) => {
    if (isOrderReservedAndNotExpired && event) {
      e.preventDefault();
      setPendingNavigation(eventHomepagePath(event));
      setShowAbandonDialog(true);
    } else if (event) {
      navigate(eventHomepagePath(event));
    }
  };
  useEffect(() => {
    if (blocker.state === "blocked") {
      setShowAbandonDialog(true);
    }
  }, [blocker.state]);
  const {
    consentPending,
    consentGranted,
    onConsent
  } = useOrganizerTrackingPixels((_b = (_a = publicEvent == null ? void 0 : publicEvent.organizer) == null ? void 0 : _a.settings) == null ? void 0 : _b.tracking_pixels);
  useEffect(() => {
    if (event && orderIsReserved && consentGranted && hasActivePixels()) {
      trackPixelEvent({
        eventName: "InitiateCheckout",
        contentName: event.title,
        contentId: event.id
      });
    }
  }, [event == null ? void 0 : event.id, orderIsReserved, consentGranted]);
  useEffect(() => {
    if (!event || !order || !consentGranted || !hasActivePixels()) return;
    if (!orderIsCompleted && !orderIsAwaitingOfflinePayment) return;
    const key = `purchase_tracked_${order.short_id}`;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) return;
    trackPixelEvent({
      eventName: "Purchase",
      value: Number(order.total_gross) || 0,
      currency: order.currency || "USD",
      contentName: event.title,
      contentId: event.id,
      transactionId: order.short_id
    });
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(key, "1");
    }
  }, [order == null ? void 0 : order.status, order == null ? void 0 : order.short_id, consentGranted]);
  const homepageSettings = (_c = event == null ? void 0 : event.settings) == null ? void 0 : _c.homepage_theme_settings;
  const accentColor = (homepageSettings == null ? void 0 : homepageSettings.accent) || DEFAULT_ACCENT;
  const checkoutMode = (homepageSettings == null ? void 0 : homepageSettings.mode) || detectMode((homepageSettings == null ? void 0 : homepageSettings.background) || "#ffffff");
  return /* @__PURE__ */ jsxs(CheckoutThemeProvider, { accentColor, mode: checkoutMode, children: [
    /* @__PURE__ */ jsx("div", { className: classes.container, "data-mode": checkoutMode, children: /* @__PURE__ */ jsxs("div", { className: classes.mainContent, children: [
      /* @__PURE__ */ jsx("header", { className: classes.header, children: event && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: classNames(classes.headerRow, (orderIsCompleted || orderIsAwaitingOfflinePayment) && classes.headerRowComplete), style: isModal ? {
          paddingRight: "44px"
        } : void 0, children: [
          !isModal && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(ActionIcon, { className: classes.backButton, variant: "subtle", title: i18n._(
              /*i18n*/
              {
                id: "A302fe"
              }
            ), "aria-label": i18n._(
              /*i18n*/
              {
                id: "A302fe"
              }
            ), onClick: handleEventHomepageClick, children: /* @__PURE__ */ jsx(IconArrowLeft, { size: 19 }) }),
            /* @__PURE__ */ jsx("span", { className: classes.headerDivider })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.titleBlock, children: [
            (orderIsCompleted || orderIsAwaitingOfflinePayment) && /* @__PURE__ */ jsx("span", { className: classNames(classes.eyebrow, orderIsAwaitingOfflinePayment ? classes.eyebrowAwaiting : classes.eyebrowComplete), children: orderIsAwaitingOfflinePayment ? i18n._(
              /*i18n*/
              {
                id: "3wF4Q/"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "b6+Y+n"
              }
            ) }),
            orderIsReserved && /* @__PURE__ */ jsx("span", { className: classes.eyebrow, children: i18n._(
              /*i18n*/
              {
                id: "JSbtZf",
                values: {
                  stepNumber,
                  stepCount
                }
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: classes.eventName, children: event.title })
          ] }),
          /* @__PURE__ */ jsx("div", { className: classes.headerSpacer }),
          orderIsReserved && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: classes.timerCaption, children: i18n._(
              /*i18n*/
              {
                id: "D5eEKP"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: classes.timerChip, "data-testid": "checkout-timer", children: [
              /* @__PURE__ */ jsx(IconClock, { size: 14 }),
              /* @__PURE__ */ jsx(Countdown, { displayType: "short", className: classes.countdown, closeToExpiryClassName: classes.countdownCloseToExpiry, targetDate: order.reserved_until, onExpiry: handleExpiry })
            ] })
          ] }),
          (orderIsCompleted || orderIsAwaitingOfflinePayment) && /* @__PURE__ */ jsxs("div", { className: classes.headerActions, children: [
            /* @__PURE__ */ jsx(ShareComponent, { title: event.title, text: i18n._(
              /*i18n*/
              {
                id: "5LDT6f"
              }
            ), url: eventHomepageUrl(event), hideShareButtonText: true }),
            /* @__PURE__ */ jsx(AddToEventCalendarButton, { event, occurrence: (_e = (_d = order == null ? void 0 : order.order_items) == null ? void 0 : _d[0]) == null ? void 0 : _e.event_occurrence }),
            orderHasAttendees && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "DKwDdj"
              }
            ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", onClick: () => window == null ? void 0 : window.open(`/order/${eventId}/${orderShortId}/print`, "_blank"), children: /* @__PURE__ */ jsx(IconPrinter, { size: 20 }) }) }),
            order.latest_invoice && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "LQrXcu"
              }
            ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", "data-testid": "download-invoice-button", onClick: () => handleInvoiceDownload(order.latest_invoice), children: /* @__PURE__ */ jsx(IconReceipt, { size: 20 }) }) })
          ] })
        ] }),
        orderIsReserved && /* @__PURE__ */ jsx("div", { className: classes.progressTrack, children: /* @__PURE__ */ jsx("div", { className: classes.progressFill, style: {
          width: `${progressPercent}%`
        } }) })
      ] }) }),
      /* @__PURE__ */ jsx(Outlet, {}),
      isModal && currentStep !== "summary" && /* @__PURE__ */ jsx(PoweredByFooter, { style: {
        marginTop: "12px",
        paddingBottom: "16px"
      } })
    ] }) }),
    /* @__PURE__ */ jsx(Modal, { opened: isExpired, onClose: handleReturn, withCloseButton: false, centered: true, size: "m", children: /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      padding: "20px 0"
    }, children: [
      /* @__PURE__ */ jsx("h3", { style: {
        color: "var(--checkout-text-primary)",
        margin: "0 0 8px 0"
      }, children: i18n._(
        /*i18n*/
        {
          id: "+FWjhR"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "var(--checkout-text-secondary)",
        margin: "0"
      }, children: i18n._(
        /*i18n*/
        {
          id: "C63rRe"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleReturn, variant: "filled", mt: "xl", children: i18n._(
        /*i18n*/
        {
          id: "s8v9hq"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Modal, { opened: showAbandonDialog, onClose: handleAbandonCancel, withCloseButton: false, centered: true, size: "m", children: /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      padding: "20px 0"
    }, children: [
      /* @__PURE__ */ jsx("h3", { style: {
        color: "var(--checkout-text-primary)",
        margin: "0 0 8px 0"
      }, children: i18n._(
        /*i18n*/
        {
          id: "147G4h"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "var(--checkout-text-secondary)",
        margin: "0"
      }, children: i18n._(
        /*i18n*/
        {
          id: "BnlG9U"
        }
      ) }),
      /* @__PURE__ */ jsxs(Group, { justify: "center", gap: "md", mt: "xl", children: [
        /* @__PURE__ */ jsx(Button, { onClick: handleAbandonCancel, variant: "subtle", children: i18n._(
          /*i18n*/
          {
            id: "4+am6b"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { onClick: handleAbandonConfirm, variant: "outline", color: "gray", loading: abandonOrderMutation.isPending, children: i18n._(
          /*i18n*/
          {
            id: "Tz5oXG"
          }
        ) })
      ] })
    ] }) }),
    consentPending && /* @__PURE__ */ jsx(CookieConsentBanner, { onConsent })
  ] });
};
export {
  Checkout as default
};

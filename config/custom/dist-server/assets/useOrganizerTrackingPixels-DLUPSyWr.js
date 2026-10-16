import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { a as getConfig, N as getConsentState, O as initGoogleConsentMode, Q as setConsentState, R as updateGoogleConsentMode, S as isConsentPending } from "../entry.server.js";
import { IconX, IconCookie, IconShare, IconBrandTwitter, IconBrandFacebook, IconBrandLinkedin, IconBrandWhatsapp, IconMail, IconCheck, IconCopy } from "@tabler/icons-react";
import { Popover, ActionIcon, Button, Group, Input, CopyButton } from "@mantine/core";
const banner = "_banner_5xqso_1";
const closeButton = "_closeButton_5xqso_34";
const content = "_content_5xqso_55";
const iconWrapper = "_iconWrapper_5xqso_63";
const text = "_text_5xqso_69";
const privacyLink = "_privacyLink_5xqso_76";
const actions = "_actions_5xqso_84";
const acceptButton = "_acceptButton_5xqso_90";
const declineButton = "_declineButton_5xqso_91";
const classes = {
  banner,
  closeButton,
  content,
  iconWrapper,
  text,
  privacyLink,
  actions,
  acceptButton,
  declineButton
};
const CookieConsentBanner = ({
  onConsent
}) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const text2 = getConfig("VITE_COOKIE_CONSENT_TEXT", i18n._(
    /*i18n*/
    {
      id: "KRCDqH"
    }
  ));
  const privacyUrl = getConfig("VITE_PRIVACY_URL", "https://coursify.guru/privacy-policy?utm_source=app-cookie-banner");
  const handleAccept = () => {
    onConsent(true);
    setDismissed(true);
  };
  const handleDecline = () => {
    onConsent(false);
    setDismissed(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: classes.banner, children: [
    /* @__PURE__ */ jsx("button", { className: classes.closeButton, onClick: handleDecline, "aria-label": i18n._(
      /*i18n*/
      {
        id: "yz7wBu"
      }
    ), children: /* @__PURE__ */ jsx(IconX, { size: 14 }) }),
    /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
      /* @__PURE__ */ jsx("div", { className: classes.iconWrapper, children: /* @__PURE__ */ jsx(IconCookie, { size: 20 }) }),
      /* @__PURE__ */ jsxs("p", { className: classes.text, children: [
        text2,
        privacyUrl && /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx("a", { href: privacyUrl, target: "_blank", rel: "noopener noreferrer", className: classes.privacyLink, children: i18n._(
            /*i18n*/
            {
              id: "LcET2C"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.actions, children: [
      /* @__PURE__ */ jsx("button", { className: classes.declineButton, onClick: handleDecline, children: i18n._(
        /*i18n*/
        {
          id: "jbq7j2"
        }
      ) }),
      /* @__PURE__ */ jsx("button", { className: classes.acceptButton, onClick: handleAccept, children: i18n._(
        /*i18n*/
        {
          id: "g3UF2V"
        }
      ) })
    ] })
  ] });
};
const ShareComponent = ({
  title,
  text: text2,
  url,
  shareButtonText = i18n._(
    /*i18n*/
    {
      id: "Z8lGw6"
    }
  ),
  hideShareButtonText = false,
  className,
  children
}) => {
  var _a;
  const [opened, setOpened] = useState(false);
  let shareText = text2;
  const shareData = {
    title,
    text: shareText,
    url
  };
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      setOpened(!opened);
    }
  };
  return /* @__PURE__ */ jsxs(Popover, { opened, onClose: () => setOpened(false), position: "bottom", withArrow: true, children: [
    /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsx("div", { style: {
      display: "flex"
    }, onClick: handleShareClick, children: children ? children : hideShareButtonText ? /* @__PURE__ */ jsx(ActionIcon, { variant: "transparent", className, children: /* @__PURE__ */ jsx(IconShare, { size: 20 }) }) : /* @__PURE__ */ jsx(Button, { variant: "transparent", leftSection: /* @__PURE__ */ jsx(IconShare, { size: 20 }), className, children: shareButtonText }) }) }),
    /* @__PURE__ */ jsxs(Popover.Dropdown, { style: {
      display: "flex"
    }, children: [
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsx(ActionIcon, { variant: "transparent", component: "a", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(IconBrandTwitter, { size: 24 }) }),
        /* @__PURE__ */ jsx(ActionIcon, { variant: "transparent", component: "a", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(IconBrandFacebook, { size: 24 }) }),
        /* @__PURE__ */ jsx(ActionIcon, { variant: "transparent", component: "a", href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(shareText)}&source=${encodeURIComponent(typeof window !== "undefined" ? (_a = window == null ? void 0 : window.location) == null ? void 0 : _a.hostname : "")}`, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(IconBrandLinkedin, { size: 24 }) }),
        /* @__PURE__ */ jsx(ActionIcon, { variant: "transparent", component: "a", href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(IconBrandWhatsapp, { size: 24 }) }),
        /* @__PURE__ */ jsx(ActionIcon, { variant: "transparent", component: "a", href: `mailto:?subject=${encodeURIComponent(title)}&body=${url}`, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(IconMail, { size: 24 }) })
      ] }),
      /* @__PURE__ */ jsx(Input, { rightSectionPointerEvents: "all", mt: 10, value: url, rightSection: /* @__PURE__ */ jsx(CopyButton, { value: url, children: ({
        copied,
        copy
      }) => /* @__PURE__ */ jsx(ActionIcon, { variant: "transparent", onClick: copy, children: copied ? /* @__PURE__ */ jsx(IconCheck, {}) : /* @__PURE__ */ jsx(IconCopy, {}) }) }) })
    ] })
  ] });
};
function fbq(...args) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
}
const facebookPixelPlugin = {
  name: "facebook_pixel",
  initialize(pixelId) {
    if (typeof window === "undefined" || window.fbq) return;
    const f = window;
    const n = f.fbq = function(...args) {
      if (n.callMethod) {
        n.callMethod(...args);
      } else {
        n.queue.push(args);
      }
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    n.callMethod = void 0;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.trackingPixel = "facebook";
    document.head.appendChild(script);
    fbq("init", pixelId);
  },
  pageView(_data) {
    fbq("track", "PageView");
  },
  trackEvent(data) {
    const eventMap = {
      "ViewContent": "ViewContent",
      "InitiateCheckout": "InitiateCheckout",
      "Purchase": "Purchase"
    };
    const fbEvent = eventMap[data.eventName] || data.eventName;
    fbq("track", fbEvent, {
      value: data.value || 0,
      currency: data.currency || "USD",
      content_name: data.contentName,
      content_ids: data.contentId ? [String(data.contentId)] : void 0
    });
  },
  cleanup() {
    document.querySelectorAll('script[data-tracking-pixel="facebook"]').forEach((el) => el.remove());
    delete window.fbq;
    delete window._fbq;
  }
};
const googleAnalytics4Plugin = {
  name: "google_analytics_4",
  initialize(measurementId) {
    if (typeof window === "undefined") return;
    if (document.querySelector('script[data-tracking-pixel="ga4"]')) return;
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
    }
    window.gtag("js", /* @__PURE__ */ new Date());
    window.gtag("config", measurementId, {
      send_page_view: false
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.trackingPixel = "ga4";
    document.head.appendChild(script);
  },
  pageView(data) {
    var _a;
    (_a = window.gtag) == null ? void 0 : _a.call(window, "event", "page_view", {
      page_location: data.url,
      page_title: data.title,
      page_referrer: data.referrer
    });
  },
  trackEvent(data) {
    var _a;
    const eventMap = {
      "ViewContent": "view_item",
      "InitiateCheckout": "begin_checkout",
      "Purchase": "purchase"
    };
    const gaEvent = eventMap[data.eventName] || data.eventName;
    (_a = window.gtag) == null ? void 0 : _a.call(window, "event", gaEvent, {
      value: data.value,
      currency: data.currency,
      transaction_id: data.transactionId ? String(data.transactionId) : void 0,
      items: data.contentId ? [{
        item_id: String(data.contentId),
        item_name: data.contentName
      }] : void 0
    });
  },
  cleanup() {
    document.querySelectorAll('script[data-tracking-pixel="ga4"]').forEach((el) => el.remove());
    delete window.gtag;
  }
};
const googleTagManagerPlugin = {
  name: "google_tag_manager",
  initialize(containerId) {
    if (typeof window === "undefined") return;
    if (document.querySelector('script[data-tracking-pixel="gtm"]')) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": (/* @__PURE__ */ new Date()).getTime(),
      event: "gtm.js"
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
    script.dataset.trackingPixel = "gtm";
    document.head.appendChild(script);
  },
  pageView(data) {
    var _a;
    (_a = window.dataLayer) == null ? void 0 : _a.push({
      event: "page_view",
      page_location: data.url,
      page_title: data.title,
      page_referrer: data.referrer
    });
  },
  trackEvent(data) {
    var _a;
    const eventMap = {
      "ViewContent": "view_item",
      "InitiateCheckout": "begin_checkout",
      "Purchase": "purchase"
    };
    (_a = window.dataLayer) == null ? void 0 : _a.push({
      event: eventMap[data.eventName] || data.eventName,
      value: data.value,
      currency: data.currency,
      transaction_id: data.transactionId ? String(data.transactionId) : void 0,
      item_name: data.contentName,
      item_id: data.contentId ? String(data.contentId) : void 0
    });
  },
  cleanup() {
    document.querySelectorAll('script[data-tracking-pixel="gtm"]').forEach((el) => el.remove());
  }
};
const tiktokPixelPlugin = {
  name: "tiktok_pixel",
  initialize(pixelId) {
    if (typeof window === "undefined" || window.ttq) return;
    const ttq = window.ttq = window.ttq || [];
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    ttq.setAndDefer = function(t, e) {
      t[e] = function(...args) {
        t.push([e, ...args]);
      };
    };
    for (const method of ttq.methods) {
      ttq.setAndDefer(ttq, method);
    }
    ttq.instance = function(id) {
      const instance = ttq._i[id] || [];
      for (const method of ttq.methods) {
        ttq.setAndDefer(instance, method);
      }
      return instance;
    };
    ttq.load = function(id) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + encodeURIComponent(id) + "&lib=ttq";
      script.dataset.trackingPixel = "tiktok";
      document.head.appendChild(script);
    };
    ttq._i = ttq._i || {};
    ttq._t = ttq._t || {};
    ttq.load(pixelId);
    ttq.page();
  },
  pageView(_data) {
    var _a;
    (_a = window.ttq) == null ? void 0 : _a.page();
  },
  trackEvent(data) {
    var _a;
    const eventMap = {
      "ViewContent": "ViewContent",
      "InitiateCheckout": "InitiateCheckout",
      "Purchase": "CompletePayment"
    };
    const ttEvent = eventMap[data.eventName] || data.eventName;
    (_a = window.ttq) == null ? void 0 : _a.track(ttEvent, {
      value: data.value,
      currency: data.currency,
      content_name: data.contentName,
      content_id: data.contentId ? String(data.contentId) : void 0
    });
  },
  cleanup() {
    document.querySelectorAll('script[data-tracking-pixel="tiktok"]').forEach((el) => el.remove());
    delete window.ttq;
    delete window.TiktokAnalyticsObject;
  }
};
const pluginRegistry = {
  facebook_pixel: facebookPixelPlugin,
  google_analytics_4: googleAnalytics4Plugin,
  google_tag_manager: googleTagManagerPlugin,
  tiktok_pixel: tiktokPixelPlugin
};
let activePlugins = [];
function initializeTrackingPixels(pixels) {
  if (typeof window === "undefined") return;
  cleanup();
  for (const pixel of pixels) {
    if (!pixel.enabled) continue;
    const plugin = pluginRegistry[pixel.provider];
    if (!plugin) {
      console.warn(`[coursify.guru] Unknown tracking pixel provider: ${pixel.provider}`);
      continue;
    }
    try {
      plugin.initialize(pixel.pixel_id);
      activePlugins.push(plugin);
    } catch (error) {
      console.error(`[coursify.guru] Failed to initialize ${pixel.provider}:`, error);
    }
  }
}
function trackPageView(data) {
  if (typeof window === "undefined") return;
  const fullData = {
    url: window.location.href,
    title: document.title,
    referrer: document.referrer,
    ...data
  };
  for (const plugin of activePlugins) {
    plugin.pageView(fullData);
  }
}
function trackPixelEvent(data) {
  if (typeof window === "undefined") return;
  for (const plugin of activePlugins) {
    plugin.trackEvent(data);
  }
}
function cleanup() {
  var _a;
  if (typeof window === "undefined") return;
  for (const plugin of activePlugins) {
    (_a = plugin.cleanup) == null ? void 0 : _a.call(plugin);
  }
  activePlugins = [];
}
function hasActivePixels() {
  return activePlugins.length > 0;
}
function useOrganizerTrackingPixels(trackingPixels) {
  const hasPixels = !!(trackingPixels == null ? void 0 : trackingPixels.length);
  const pixelsKey = useMemo(() => JSON.stringify(trackingPixels ?? []), [trackingPixels]);
  const [consentGranted, setConsentGranted] = useState(false);
  const consentModeInitialized = useRef(false);
  useEffect(() => {
    const currentConsent = getConsentState() === "granted";
    setConsentGranted(currentConsent);
    if (hasPixels && !consentModeInitialized.current) {
      initGoogleConsentMode(currentConsent);
      consentModeInitialized.current = true;
    }
  }, [hasPixels]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e) => {
      var _a;
      const granted = (_a = e.detail) == null ? void 0 : _a.granted;
      setConsentGranted(granted === true);
    };
    window.addEventListener("hi_consent_change", handler);
    return () => window.removeEventListener("hi_consent_change", handler);
  }, []);
  useEffect(() => {
    if (!hasPixels || !consentGranted) return;
    initializeTrackingPixels(trackingPixels);
    const timer = setTimeout(() => {
      trackPageView();
    }, 100);
    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [pixelsKey, consentGranted]);
  const onConsent = useCallback((granted) => {
    setConsentState(granted ? "granted" : "denied");
    updateGoogleConsentMode(granted);
    setConsentGranted(granted);
  }, []);
  const globalBannerEnabled = getConfig("VITE_COOKIE_CONSENT_ENABLED") === "true";
  const showBanner = hasPixels && !globalBannerEnabled && isConsentPending();
  return {
    consentPending: showBanner,
    consentGranted,
    onConsent
  };
}
export {
  CookieConsentBanner as C,
  ShareComponent as S,
  hasActivePixels as h,
  trackPixelEvent as t,
  useOrganizerTrackingPixels as u
};

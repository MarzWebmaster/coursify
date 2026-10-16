import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Navigate, Outlet } from "react-router";
import { g as getClientLocale, d as dynamicActivateLocale, l as localeToNameMap, u as useGetMe, a as getConfig, i as isHiEvents, P as PoweredByFooter } from "../entry.server.js";
import { Select } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useLingui } from "@lingui/react";
import { useRef, useCallback } from "react";
import { s as showInfo } from "./notifications-Coh3Ef-t.js";
import "react-dom/server";
import "@tanstack/react-query";
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
const authLayout = "_authLayout_q6isq_1";
const splitLayout = "_splitLayout_q6isq_7";
const leftPanel = "_leftPanel_q6isq_14";
const container = "_container_q6isq_39";
const logo = "_logo_q6isq_60";
const formArea = "_formArea_q6isq_73";
const wrapper = "_wrapper_q6isq_86";
const panelFooter = "_panelFooter_q6isq_115";
const languageSwitcher = "_languageSwitcher_q6isq_126";
const rightPanel = "_rightPanel_q6isq_130";
const noise = "_noise_q6isq_153";
const rings = "_rings_q6isq_164";
const panelInner = "_panelInner_q6isq_189";
const heroTitle = "_heroTitle_q6isq_206";
const heroBold = "_heroBold_q6isq_226";
const heroLight = "_heroLight_q6isq_231";
const ticketScene = "_ticketScene_q6isq_238";
const ticketGhost = "_ticketGhost_q6isq_245";
const ticket = "_ticket_q6isq_238";
const ticketInner = "_ticketInner_q6isq_270";
const ticketMain = "_ticketMain_q6isq_281";
const ticketTop = "_ticketTop_q6isq_286";
const ticketTitle = "_ticketTitle_q6isq_299";
const ticketMeta = "_ticketMeta_q6isq_310";
const ticketFields = "_ticketFields_q6isq_316";
const ticketField = "_ticketField_q6isq_316";
const barcode = "_barcode_q6isq_338";
const ticketStub = "_ticketStub_q6isq_346";
const stubLabel = "_stubLabel_q6isq_356";
const stubSeat = "_stubSeat_q6isq_357";
const stubQr = "_stubQr_q6isq_366";
const stamp = "_stamp_q6isq_373";
const ticker = "_ticker_q6isq_407";
const tickerTrack = "_tickerTrack_q6isq_430";
const tickerItem = "_tickerItem_q6isq_459";
const tickerDot = "_tickerDot_q6isq_470";
const classes = {
  authLayout,
  splitLayout,
  leftPanel,
  container,
  logo,
  formArea,
  wrapper,
  panelFooter,
  languageSwitcher,
  rightPanel,
  noise,
  rings,
  panelInner,
  heroTitle,
  heroBold,
  heroLight,
  ticketScene,
  ticketGhost,
  ticket,
  ticketInner,
  ticketMain,
  ticketTop,
  ticketTitle,
  ticketMeta,
  ticketFields,
  ticketField,
  barcode,
  ticketStub,
  stubLabel,
  stubSeat,
  stubQr,
  stamp,
  ticker,
  tickerTrack,
  tickerItem,
  tickerDot
};
const LanguageSwitcher = () => {
  useLingui();
  const getLocaleName = (locale) => {
    switch (locale) {
      case "hu":
        return i18n._(
          /*i18n*/
          {
            id: "mkWad2"
          }
        );
      case "de":
        return i18n._(
          /*i18n*/
          {
            id: "DDcvSo"
          }
        );
      case "en":
        return i18n._(
          /*i18n*/
          {
            id: "lYGfRP"
          }
        );
      case "es":
        return i18n._(
          /*i18n*/
          {
            id: "65A04M"
          }
        );
      case "fr":
        return i18n._(
          /*i18n*/
          {
            id: "nLC6tu"
          }
        );
      case "it":
        return i18n._(
          /*i18n*/
          {
            id: "Lj7sBL"
          }
        );
      case "nl":
        return i18n._(
          /*i18n*/
          {
            id: "KIjvtr"
          }
        );
      case "pt":
        return i18n._(
          /*i18n*/
          {
            id: "MOERNx"
          }
        );
      case "pt-br":
        return i18n._(
          /*i18n*/
          {
            id: "rp/zaT"
          }
        );
      case "zh-cn":
        return i18n._(
          /*i18n*/
          {
            id: "6imsQS"
          }
        );
      case "zh-hk":
        return i18n._(
          /*i18n*/
          {
            id: "DM4gBB"
          }
        );
      case "vi":
        return i18n._(
          /*i18n*/
          {
            id: "fROFIL"
          }
        );
      case "tr":
        return i18n._(
          /*i18n*/
          {
            id: "Kz91g/"
          }
        );
      case "pl":
        return i18n._(
          /*i18n*/
          {
            id: "trnWaw"
          }
        );
      case "se":
        return i18n._(
          /*i18n*/
          {
            id: "UaISq3"
          }
        );
      case "sk":
        return i18n._(
          /*i18n*/
          {
            id: "paESr6"
          }
        );
      case "el":
        return i18n._(
          /*i18n*/
          {
            id: "CZXzs4"
          }
        );
      default:
        return locale;
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Select, { leftSection: /* @__PURE__ */ jsx(IconWorld, { size: 15, color: "#ccc" }), width: 180, size: "xs", required: true, data: Object.keys(localeToNameMap).map((locale) => ({
    value: locale,
    label: getLocaleName(locale)
  })), defaultValue: getClientLocale(), placeholder: i18n._(
    /*i18n*/
    {
      id: "lYGfRP"
    }
  ), onChange: (value) => {
    if (!value) return;
    document.cookie = `locale=${value};path=/;max-age=31536000`;
    dynamicActivateLocale(value).finally(() => {
      window.location.href = window.location.pathname + window.location.search;
    });
  } }) });
};
const tickerFeatures = [i18n._(
  /*i18n*/
  {
    id: "D0tAMe"
  }
), i18n._(
  /*i18n*/
  {
    id: "VopR6B"
  }
), i18n._(
  /*i18n*/
  {
    id: "A42Dqn"
  }
), i18n._(
  /*i18n*/
  {
    id: "ywR4ZL"
  }
), i18n._(
  /*i18n*/
  {
    id: "u0n+wz"
  }
), i18n._(
  /*i18n*/
  {
    id: "oCHiz3"
  }
), i18n._(
  /*i18n*/
  {
    id: "uqoRbb"
  }
), i18n._(
  /*i18n*/
  {
    id: "SiVstt"
  }
), i18n._(
  /*i18n*/
  {
    id: "z9NkYY"
  }
), i18n._(
  /*i18n*/
  {
    id: "ld8I+f"
  }
), i18n._(
  /*i18n*/
  {
    id: "SXvRWU"
  }
), i18n._(
  /*i18n*/
  {
    id: "WDMdn8"
  }
), i18n._(
  /*i18n*/
  {
    id: "ndBv0v"
  }
), i18n._(
  /*i18n*/
  {
    id: "f5UbZ0"
  }
), i18n._(
  /*i18n*/
  {
    id: "g9cQCP"
  }
), i18n._(
  /*i18n*/
  {
    id: "9bIMVF"
  }
)];
const FeaturePanel = () => {
  const tickerLoop = [...tickerFeatures, ...tickerFeatures];
  return /* @__PURE__ */ jsxs("div", { className: classes.rightPanel, children: [
    /* @__PURE__ */ jsx("div", { className: classes.noise }),
    /* @__PURE__ */ jsx("div", { className: classes.rings }),
    /* @__PURE__ */ jsxs("div", { className: classes.panelInner, children: [
      /* @__PURE__ */ jsxs("h1", { className: classes.heroTitle, children: [
        /* @__PURE__ */ jsx("span", { className: classes.heroBold, children: i18n._(
          /*i18n*/
          {
            id: "uq3CXQ"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: classes.heroLight, children: i18n._(
          /*i18n*/
          {
            id: "ioFA9i"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.ticketScene, "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("div", { className: classes.ticketGhost }),
        /* @__PURE__ */ jsx("div", { className: classes.ticket, children: /* @__PURE__ */ jsxs("div", { className: classes.ticketInner, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.ticketMain, children: [
            /* @__PURE__ */ jsxs("div", { className: classes.ticketTop, children: [
              /* @__PURE__ */ jsx("span", { children: "Admit One" }),
              /* @__PURE__ */ jsx("span", { children: "№ 000482" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: classes.ticketTitle, children: "Dublin Jazz Festival" }),
            /* @__PURE__ */ jsx("div", { className: classes.ticketMeta, children: "Sat, Aug 16 · 8:00 PM · Dublin" }),
            /* @__PURE__ */ jsxs("div", { className: classes.ticketFields, children: [
              /* @__PURE__ */ jsxs("div", { className: classes.ticketField, children: [
                /* @__PURE__ */ jsx("span", { children: "Door" }),
                /* @__PURE__ */ jsx("strong", { children: "3" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: classes.ticketField, children: [
                /* @__PURE__ */ jsx("span", { children: "Seat" }),
                /* @__PURE__ */ jsx("strong", { children: "GA" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: classes.ticketField, children: [
                /* @__PURE__ */ jsx("span", { children: "Price" }),
                /* @__PURE__ */ jsx("strong", { children: "€89.00" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: classes.barcode })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.ticketStub, children: [
            /* @__PURE__ */ jsx("span", { className: classes.stubLabel, children: "Admit One" }),
            /* @__PURE__ */ jsxs("svg", { className: classes.stubQr, viewBox: "0 0 25 25", children: [
              /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M0 0h7v7H0zm1 1v5h5V1z" }),
              /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "3", height: "3" }),
              /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 0h7v7h-7zm1 1v5h5V1z" }),
              /* @__PURE__ */ jsx("rect", { x: "20", y: "2", width: "3", height: "3" }),
              /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M0 18h7v7H0zm1 1v5h5v-5z" }),
              /* @__PURE__ */ jsx("rect", { x: "2", y: "20", width: "3", height: "3" }),
              /* @__PURE__ */ jsx("rect", { x: "9", y: "0", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "13", y: "2", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "10", y: "5", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "15", y: "5", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "0", y: "9", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "4", y: "10", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "8", y: "9", width: "3", height: "3" }),
              /* @__PURE__ */ jsx("rect", { x: "13", y: "10", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "17", y: "9", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "21", y: "10", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "2", y: "14", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "7", y: "13", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "11", y: "14", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "15", y: "13", width: "3", height: "3" }),
              /* @__PURE__ */ jsx("rect", { x: "20", y: "14", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "9", y: "18", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "13", y: "19", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "18", y: "18", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "22", y: "19", width: "2", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "10", y: "22", width: "3", height: "2" }),
              /* @__PURE__ */ jsx("rect", { x: "16", y: "22", width: "2", height: "2" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: classes.stubSeat, children: "GA — €89" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: classes.stamp, children: "Sold Out" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes.ticker, "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: classes.tickerTrack, children: tickerLoop.map((item, i) => /* @__PURE__ */ jsxs("span", { className: classes.tickerItem, children: [
      item,
      /* @__PURE__ */ jsx("span", { className: classes.tickerDot })
    ] }, i)) }) })
  ] });
};
const AuthLayout = () => {
  const me = useGetMe();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(void 0);
  const handleLogoClick = useCallback(() => {
    clickCountRef.current += 1;
    clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2e3);
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      showInfo(`HiEvents v${"2.0.0-alpha.1"}`);
    }
  }, []);
  if (me.isSuccess) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/manage/events" });
  }
  return /* @__PURE__ */ jsx("div", { className: classes.authLayout, children: /* @__PURE__ */ jsxs("div", { className: classes.splitLayout, children: [
    /* @__PURE__ */ jsx("div", { className: classes.leftPanel, children: /* @__PURE__ */ jsxs("main", { className: classes.container, children: [
      /* @__PURE__ */ jsx("div", { className: classes.logo, onClick: handleLogoClick, style: {
        cursor: "pointer"
      }, children: /* @__PURE__ */ jsx("img", { src: getConfig("VITE_APP_LOGO_DARK", "/logos/coursify-stacked-light.svg"), alt: i18n._(
        /*i18n*/
        {
          id: "COnw8D",
          values: {
            0: getConfig("VITE_APP_NAME", "Coursify")
          }
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: classes.formArea, children: /* @__PURE__ */ jsx("div", { className: classes.wrapper, children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
      /* @__PURE__ */ jsxs("div", { className: classes.panelFooter, children: [
        !isHiEvents() && /* @__PURE__ */ jsx(PoweredByFooter, {}),
        /* @__PURE__ */ jsx("div", { className: classes.languageSwitcher, children: /* @__PURE__ */ jsx(LanguageSwitcher, {}) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FeaturePanel, {})
  ] }) });
};
export {
  AuthLayout as default
};

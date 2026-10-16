import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useLocation } from "react-router";
import { S as SelectProducts } from "./index-B4_wM3sm.js";
import { T as useGetEventPublic } from "../entry.server.js";
import { useMemo } from "react";
import { Loader } from "@mantine/core";
import "@lingui/react";
import "@tanstack/react-query";
import "./order.client-BmBVeAyF.js";
import "@mantine/form";
import "@mantine/hooks";
import "./notifications-Coh3Ef-t.js";
import "@mantine/notifications";
import "@tabler/icons-react";
import "./index-IzdRcWBR.js";
import "./currency-Br7a8J7F.js";
import "./types-CqPWB-a5.js";
import "classnames";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./waitlist.client-Dm8api1T.js";
import "./index-CwAoF9NO.js";
import "./CheckoutThemeProvider-D0cdZ-GY.js";
import "./themeUtils-B--ztbrW.js";
import "./index-Bhmm_OXR.js";
import "./useWaitlistJoined-D2Jn2EfP.js";
import "./iframeResize-DUQclS7o.js";
import "@mantine/dates";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./useCheckoutPrefill-DziFYvxr.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/modals";
import "@mantine/colors-generator";
const ProductWidget = () => {
  const {
    eventId
  } = useParams();
  const location = useLocation();
  const eventOccurrenceId = useMemo(() => {
    const raw = new URLSearchParams(location.search).get("occurrence_id");
    if (raw === null) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }, [location.search]);
  const checkoutMode = useMemo(() => {
    return new URLSearchParams(location.search).get("Checkout") === "new-tab" ? "new-tab" : "modal";
  }, [location.search]);
  const eventQuery = useGetEventPublic(eventId, true, false, null, eventOccurrenceId);
  const settings = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      colors: {
        background: searchParams.get("BackgroundColor") || "#ffffff",
        primary: searchParams.get("PrimaryColor") || "#7b5db8",
        primaryText: searchParams.get("PrimaryTextColor") || "#000000",
        secondary: searchParams.get("SecondaryColor") || "#7b5eb9",
        secondaryText: searchParams.get("SecondaryTextColor") || "#ffffff",
        bodyBackground: searchParams.get("BackgroundColor") || "#ffffff"
      },
      continueButtonText: searchParams.get("ContinueButtonText") || "Continue",
      padding: searchParams.get("Padding") || "10px"
    };
  }, [location.search]);
  if (eventQuery.isError || eventQuery.isFetched && !eventQuery.data) {
    return /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      padding: "20px",
      textAlign: "center",
      backgroundColor: settings.colors.background,
      color: settings.colors.primaryText
    }, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { style: {
        fontWeight: 600,
        margin: "0 0 4px"
      }, children: i18n._(
        /*i18n*/
        {
          id: "eMaNd0"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: 0,
        opacity: 0.7
      }, children: i18n._(
        /*i18n*/
        {
          id: "d+Oe9r"
        }
      ) })
    ] }) });
  }
  if (!eventQuery.isFetched || !eventQuery.data) {
    return /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: settings.colors.background
    }, children: /* @__PURE__ */ jsx(Loader, { color: settings.colors.primaryText, size: "md", type: "dots" }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "full-height", style: {
    backgroundColor: settings.colors.bodyBackground
  }, children: /* @__PURE__ */ jsx(SelectProducts, { widgetMode: "embedded", checkoutMode, event: eventQuery.data, colors: settings.colors, continueButtonText: settings.continueButtonText, padding: settings.padding }) });
};
export {
  ProductWidget as default
};

import { jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { LoadingOverlay } from "@mantine/core";
import { T as useGetEventPublic } from "../entry.server.js";
import { E as EventNotAvailable, a as EventHomepage } from "./index-Bxtd-eTN.js";
import "react-dom/server";
import "@tanstack/react-query";
import "@lingui/core";
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
import "./index-B4_wM3sm.js";
import "./order.client-BmBVeAyF.js";
import "@mantine/form";
import "@mantine/hooks";
import "./notifications-Coh3Ef-t.js";
import "./index-IzdRcWBR.js";
import "./currency-Br7a8J7F.js";
import "./types-CqPWB-a5.js";
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
import "./event-occurrence.client-xqTaU2Nv.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./useCheckoutPrefill-DziFYvxr.js";
import "./urlHelper-CsaWRwIV.js";
import "./index-DQ4mRrOs.js";
import "./index-LOby0isD.js";
import "./confirmationDialog-I-HMojnx.js";
import "./useUpdateEventStatus-Ck9Vcq_R.js";
import "./useGetEvent-DyvalBPE.js";
import "./useGetEvents-CRE3yVbY.js";
import "./useUpdateOrganizerStatus-CAGj3GlG.js";
import "./useGetOrganizer-DMDsW5DW.js";
import "./useGetOrganizers-AXXYibKP.js";
import "./analytics-Cd4RPKa9.js";
import "./useOrganizerTrackingPixels-DLUPSyWr.js";
import "./index-BfWJHinS.js";
import "./index-44oVSCbn.js";
const EventHomepagePreview = () => {
  const {
    eventId
  } = useParams();
  const {
    data: event,
    isFetched,
    isLoading
  } = useGetEventPublic(eventId);
  const [previewSettings, setPreviewSettings] = useState(null);
  useEffect(() => {
    const handleMessage = (messageEvent) => {
      if (messageEvent.data.type === "UPDATE_SETTINGS") {
        setPreviewSettings(messageEvent.data.settings);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  if (!isFetched || isLoading) {
    return /* @__PURE__ */ jsx(LoadingOverlay, { visible: true });
  }
  if (!event) {
    return /* @__PURE__ */ jsx(EventNotAvailable, {});
  }
  let previewEvent = event;
  if (previewSettings && event.settings) {
    previewEvent = {
      ...event,
      settings: {
        ...event.settings,
        homepage_theme_settings: previewSettings.homepage_theme_settings || event.settings.homepage_theme_settings,
        continue_button_text: previewSettings.continue_button_text ?? event.settings.continue_button_text,
        get_tickets_button_text: previewSettings.get_tickets_button_text ?? event.settings.get_tickets_button_text
      }
    };
  }
  return /* @__PURE__ */ jsx(EventHomepage, { event: previewEvent, promoCodeValid: void 0, promoCode: void 0 });
};
export {
  EventHomepagePreview as default
};

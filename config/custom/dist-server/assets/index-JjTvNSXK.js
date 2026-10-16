import { jsx } from "react/jsx-runtime";
import { useLoaderData } from "react-router";
import { a as EventHomepage } from "./index-Bxtd-eTN.js";
import "@lingui/core";
import "./index-B4_wM3sm.js";
import "@lingui/react";
import "@mantine/core";
import "@tanstack/react-query";
import "./order.client-BmBVeAyF.js";
import "../entry.server.js";
import "react-dom/server";
import "@tabler/icons-react";
import "react";
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
const PublicEvent = () => {
  const loaderData = useLoaderData();
  const {
    event,
    promoCodeValid,
    promoCode,
    occurrenceId
  } = loaderData;
  return /* @__PURE__ */ jsx(EventHomepage, { event, promoCodeValid, promoCode, initialOccurrenceId: occurrenceId });
};
export {
  PublicEvent,
  PublicEvent as default
};

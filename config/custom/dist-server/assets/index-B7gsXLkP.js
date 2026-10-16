import { jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router";
import { u as useGetOrganizerSettings } from "./useGetOrganizerSettings-oZkWKvDt.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { O as OrganizerHomepage } from "./index-DcJTs0wC.js";
import "@tanstack/react-query";
import "../entry.server.js";
import "react-dom/server";
import "@lingui/core";
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
import "./types-CqPWB-a5.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./currency-Br7a8J7F.js";
import "./urlHelper-CsaWRwIV.js";
import "./useOrganizerTrackingPixels-DLUPSyWr.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./index-LOby0isD.js";
import "./themeUtils-B--ztbrW.js";
import "@mantine/form";
import "./notifications-Coh3Ef-t.js";
import "./index-CwAoF9NO.js";
import "./confirmationDialog-I-HMojnx.js";
import "./useUpdateEventStatus-Ck9Vcq_R.js";
import "./useGetEvent-DyvalBPE.js";
import "./useGetEvents-CRE3yVbY.js";
import "./useUpdateOrganizerStatus-CAGj3GlG.js";
import "./useGetOrganizer-DMDsW5DW.js";
import "./useGetOrganizers-AXXYibKP.js";
import "./analytics-Cd4RPKa9.js";
import "./index-CvuK1rzK.js";
const OrganizerHomepagePreview = () => {
  var _a;
  const {
    organizerId
  } = useParams();
  const {
    organizer,
    eventsData
  } = useLoaderData();
  const organizerSettingsQuery = useGetOrganizerSettings(organizerId);
  const [previewSettings, setPreviewSettings] = useState(null);
  useEffect(() => {
    const handleMessage = (event) => {
      var _a2;
      if (((_a2 = event.data) == null ? void 0 : _a2.type) === "UPDATE_ORGANIZER_SETTINGS") {
        setPreviewSettings(event.data.settings);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  if (!organizer || organizerSettingsQuery.isLoading) {
    return /* @__PURE__ */ jsx(LoadingMask, {});
  }
  if (!organizer || !organizerSettingsQuery.data) {
    return null;
  }
  const previewOrganizer = {
    ...organizer,
    images: (_a = organizer.images) == null ? void 0 : _a.map((img) => {
      if (img.type === "ORGANIZER_LOGO" && (previewSettings == null ? void 0 : previewSettings.logoUrl)) {
        return {
          ...img,
          url: previewSettings.logoUrl
        };
      }
      if (img.type === "ORGANIZER_COVER" && (previewSettings == null ? void 0 : previewSettings.coverUrl)) {
        return {
          ...img,
          url: previewSettings.coverUrl
        };
      }
      return img;
    }),
    settings: {
      ...organizerSettingsQuery.data,
      homepage_theme_settings: (previewSettings == null ? void 0 : previewSettings.homepage_theme_settings) || organizerSettingsQuery.data.homepage_theme_settings
    }
  };
  return /* @__PURE__ */ jsx(OrganizerHomepage, { organizer: previewOrganizer, eventsData, isPastEvents: false });
};
export {
  OrganizerHomepagePreview as default
};

import { jsx } from "react/jsx-runtime";
import { O as OrganizerHomepage } from "./index-DcJTs0wC.js";
import { useLoaderData } from "react-router";
import { i18n } from "@lingui/core";
import { IconCalendarPlus } from "@tabler/icons-react";
import { G as GenericErrorPage } from "./index-DQ4mRrOs.js";
import "@mantine/core";
import "./types-CqPWB-a5.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "../entry.server.js";
import "react-dom/server";
import "@tanstack/react-query";
import "react";
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
const OrganizerNotFound = () => {
  return /* @__PURE__ */ jsx(GenericErrorPage, { title: i18n._(
    /*i18n*/
    {
      id: "SQqJd8"
    }
  ), description: i18n._(
    /*i18n*/
    {
      id: "sYLeDq"
    }
  ), pageTitle: i18n._(
    /*i18n*/
    {
      id: "SQqJd8"
    }
  ), metaDescription: i18n._(
    /*i18n*/
    {
      id: "sYLeDq"
    }
  ), buttonText: i18n._(
    /*i18n*/
    {
      id: "ZCSSd+"
    }
  ), buttonUrl: "https://app.coursify.guru/auth/register?utm_source=app.coursify.guru&utm_content=organizer-not-found/create-event", buttonIcon: /* @__PURE__ */ jsx(IconCalendarPlus, { size: 18 }) });
};
const PublicOrganizer = () => {
  const loaderData = useLoaderData();
  if (!(loaderData == null ? void 0 : loaderData.organizer)) {
    return /* @__PURE__ */ jsx(OrganizerNotFound, {});
  }
  return /* @__PURE__ */ jsx(OrganizerHomepage, { organizer: loaderData.organizer, eventsData: loaderData.eventsData, isPastEvents: loaderData.isPastEvents });
};
export {
  PublicOrganizer,
  PublicOrganizer as default
};

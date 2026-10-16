import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { T as useGetEventPublic, P as PoweredByFooter } from "../entry.server.js";
import { useParams } from "react-router";
import { u as useGetAttendeePublic } from "./useGetAttendeePublic-BysFq0vV.js";
import { A as AttendeeTicket } from "./index-BXVupOij.js";
import { Container } from "@mantine/core";
import { O as OnlineEventDetails } from "./index-CicViJRN.js";
import { H as HomepageInfoMessage } from "./index-DlbMZZb-.js";
import "react-dom/server";
import "@tanstack/react-query";
import "@tabler/icons-react";
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
import "./attendee.client-CeeZ2TBj.js";
import "./products-BLTGbPdF.js";
import "./types-CqPWB-a5.js";
import "./currency-Br7a8J7F.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-qr-code";
import "./urlHelper-CsaWRwIV.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./index-BfWJHinS.js";
import "./index-jHMtuNEo.js";
const title = "_title_fh3uo_1";
const classes = {
  title
};
const AttendeeProductAndInformation = () => {
  const {
    eventId,
    attendeeShortId
  } = useParams();
  const {
    data: event,
    isError: eventError
  } = useGetEventPublic(eventId);
  const {
    data: attendee,
    isError: attendeeError
  } = useGetAttendeePublic(eventId, String(attendeeShortId));
  if (eventError || attendeeError) {
    return /* @__PURE__ */ jsx(HomepageInfoMessage, { status: "not_found", message: i18n._(
      /*i18n*/
      {
        id: "t79rDv"
      }
    ), subtitle: i18n._(
      /*i18n*/
      {
        id: "nefMIK"
      }
    ) });
  }
  if (!event || !attendee) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("h2", { className: classes.title, children: [
      i18n._(
        /*i18n*/
        {
          id: "IFHV2p"
        }
      ),
      " ",
      event.title
    ] }),
    /* @__PURE__ */ jsx(AttendeeTicket, { attendee, product: attendee.product, event }),
    /* @__PURE__ */ jsx(OnlineEventDetails, { event, occurrence: (attendee == null ? void 0 : attendee.event_occurrence) ?? null }),
    /* @__PURE__ */ jsx(PoweredByFooter, {})
  ] });
};
export {
  AttendeeProductAndInformation,
  AttendeeProductAndInformation as default
};

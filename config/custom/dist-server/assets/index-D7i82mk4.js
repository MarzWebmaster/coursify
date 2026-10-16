import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { IconReportMoney, IconChartBar, IconCalendarEvent, IconChevronRight } from "@tabler/icons-react";
import { C as Card } from "./index-jHMtuNEo.js";
import { Avatar, UnstyledButton } from "@mantine/core";
import { useParams, Link } from "react-router";
import { R as ReportTypes, E as EventType } from "./types-CqPWB-a5.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import "@tanstack/react-query";
import "../entry.server.js";
import "react-dom/server";
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
const reportType = "_reportType_u1laj_1";
const icon = "_icon_u1laj_7";
const content = "_content_u1laj_14";
const rightCaret = "_rightCaret_u1laj_24";
const classes = {
  reportType,
  icon,
  content,
  rightCaret
};
const Reports = () => {
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const reports = [{
    id: ReportTypes.ProductSales,
    title: i18n._(
      /*i18n*/
      {
        id: "Lu+kBU"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "YMwcbR"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#831781", children: /* @__PURE__ */ jsx(IconReportMoney, {}) })
  }, {
    id: ReportTypes.DailySales,
    title: i18n._(
      /*i18n*/
      {
        id: "zgCHnE"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "nHm0AI"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#00a3e0", children: /* @__PURE__ */ jsx(IconChartBar, {}) })
  }, {
    id: ReportTypes.PromoCodes,
    title: i18n._(
      /*i18n*/
      {
        id: "OP094m"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "k3wH7i"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#634fc0", children: /* @__PURE__ */ jsx(IconReportMoney, {}) })
  }, ...(event == null ? void 0 : event.type) === EventType.RECURRING ? [{
    id: ReportTypes.OccurrenceSummary,
    title: i18n._(
      /*i18n*/
      {
        id: "Kh3WO8"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "JC3J0k"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#e07000", children: /* @__PURE__ */ jsx(IconCalendarEvent, {}) })
  }] : []];
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "2+O9st"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "t9yxlZ"
      }
    ) }),
    reports.map((report) => /* @__PURE__ */ jsx(UnstyledButton, { component: Link, to: `/manage/event/${eventId}/report/${report.id}`, children: /* @__PURE__ */ jsxs(Card, { className: classes.reportType, children: [
      /* @__PURE__ */ jsx("div", { className: classes.icon, children: report.icon }),
      /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
        /* @__PURE__ */ jsx("h3", { children: report.title }),
        /* @__PURE__ */ jsx("p", { children: report.description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.rightCaret, children: /* @__PURE__ */ jsx(IconChevronRight, {}) })
    ] }) }, report.id))
  ] });
};
export {
  Reports as default
};

import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { IconReportMoney, IconChartBar, IconReceiptTax, IconUserCheck, IconReceipt, IconChevronRight } from "@tabler/icons-react";
import { C as Card } from "./index-jHMtuNEo.js";
import { Avatar, UnstyledButton } from "@mantine/core";
import { useParams, Link } from "react-router";
import { c as OrganizerReportTypes } from "./types-CqPWB-a5.js";
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
const OrganizerReports = () => {
  const {
    organizerId
  } = useParams();
  const reports = [{
    id: OrganizerReportTypes.RevenueSummary,
    title: i18n._(
      /*i18n*/
      {
        id: "Oo/PLb"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "/gWrVZ"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#7C63E6", children: /* @__PURE__ */ jsx(IconReportMoney, {}) })
  }, {
    id: OrganizerReportTypes.EventsPerformance,
    title: i18n._(
      /*i18n*/
      {
        id: "19j6uh"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "3VnlS9"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#4B7BE5", children: /* @__PURE__ */ jsx(IconChartBar, {}) })
  }, {
    id: OrganizerReportTypes.TaxSummary,
    title: i18n._(
      /*i18n*/
      {
        id: "WyCBRt"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "yT6dQ8"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#49A6B7", children: /* @__PURE__ */ jsx(IconReceiptTax, {}) })
  }, {
    id: OrganizerReportTypes.CheckInSummary,
    title: i18n._(
      /*i18n*/
      {
        id: "cKj6OE"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "6PecK3"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#5FB98B", children: /* @__PURE__ */ jsx(IconUserCheck, {}) })
  }, {
    id: OrganizerReportTypes.PlatformFees,
    title: i18n._(
      /*i18n*/
      {
        id: "br3Y/y"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "zppscQ"
      }
    ),
    icon: /* @__PURE__ */ jsx(Avatar, { size: 40, color: "#E67C63", children: /* @__PURE__ */ jsx(IconReceipt, {}) })
  }];
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "+WFMis"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "t9yxlZ"
      }
    ) }),
    reports.map((report) => /* @__PURE__ */ jsx(UnstyledButton, { component: Link, to: `/manage/organizer/${organizerId}/report/${report.id}`, children: /* @__PURE__ */ jsxs(Card, { className: classes.reportType, children: [
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
  OrganizerReports as default
};

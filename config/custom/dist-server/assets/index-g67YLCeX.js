import { jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { IconLayoutDashboard, IconBuildingBank, IconUsers, IconCalendar, IconReceipt, IconMail, IconSpeakerphone, IconChartBar, IconTrash, IconAlertTriangle, IconSettings } from "@tabler/icons-react";
import { A as AppLayout } from "./index-CDmouRM7.js";
import { a as useIsCurrentUserSuperAdmin } from "./useIsCurrentUserAdmin-DKXhmYit.js";
import { useNavigate } from "react-router";
import "react";
import "@mantine/core";
import "./index-C9OohqtH.js";
import "../entry.server.js";
import "react-dom/server";
import "@tanstack/react-query";
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
import "./auth.client-Bgg-Rraf.js";
import "@mantine/hooks";
import "./index-AhXgh6Nz.js";
import "./index-BTV1mmSF.js";
import "./index-t-LfUV0_.js";
import "./useGetOrganizers-AXXYibKP.js";
import "./useGetAccount-CGfwRfDK.js";
import "@mantine/form";
import "./index-CYsdl7UG.js";
import "./currencies-wzczGcKi.js";
import "./timezones-CsvfI1Rm.js";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./notifications-Coh3Ef-t.js";
import "./analytics-Cd4RPKa9.js";
import "./index-CwjvB_vn.js";
import "./admin.client-DIpS7H64.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./AnnouncementModal-BnhI_3XO.js";
import "./index-Bhmm_OXR.js";
const AdminLayout = () => {
  const isSuperAdmin = useIsCurrentUserSuperAdmin();
  const navigate = useNavigate();
  const navItems = [{
    label: i18n._(
      /*i18n*/
      {
        id: "U3pytU"
      }
    )
  }, {
    link: "",
    label: i18n._(
      /*i18n*/
      {
        id: "7p5kLi"
      }
    ),
    icon: IconLayoutDashboard
  }, {
    link: "accounts",
    label: i18n._(
      /*i18n*/
      {
        id: "bPwFdf"
      }
    ),
    icon: IconBuildingBank
  }, {
    link: "users",
    label: i18n._(
      /*i18n*/
      {
        id: "Sxm8rQ"
      }
    ),
    icon: IconUsers
  }, {
    link: "events",
    label: i18n._(
      /*i18n*/
      {
        id: "tst44n"
      }
    ),
    icon: IconCalendar
  }, {
    link: "orders",
    label: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ),
    icon: IconReceipt
  }, {
    link: "messages",
    label: i18n._(
      /*i18n*/
      {
        id: "t7TeQU"
      }
    ),
    icon: IconMail
  }, {
    link: "announcements",
    label: i18n._(
      /*i18n*/
      {
        id: "Dzr23X"
      }
    ),
    icon: IconSpeakerphone
  }, {
    link: "attribution",
    label: i18n._(
      /*i18n*/
      {
        id: "BV4L/Q"
      }
    ),
    icon: IconChartBar
  }, {
    link: "deletion-requests",
    label: i18n._(
      /*i18n*/
      {
        id: "PBA62s"
      }
    ),
    icon: IconTrash
  }, {
    link: "failed-jobs",
    label: i18n._(
      /*i18n*/
      {
        id: "tKcbYd"
      }
    ),
    icon: IconAlertTriangle
  }, {
    link: "configurations",
    label: i18n._(
      /*i18n*/
      {
        id: "3cKoxx"
      }
    ),
    icon: IconSettings
  }];
  const breadcrumbItems = [{
    link: "/admin",
    content: i18n._(
      /*i18n*/
      {
        id: "0Zypnp"
      }
    )
  }];
  if (!isSuperAdmin) {
    navigate("/");
    return;
  }
  return /* @__PURE__ */ jsx(AppLayout, { navItems, breadcrumbItems, entityType: "organizer" });
};
export {
  AdminLayout as default
};

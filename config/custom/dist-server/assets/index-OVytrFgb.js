import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { C as Card } from "./index-jHMtuNEo.js";
import { Tabs } from "@mantine/core";
import { a as accountClasses } from "./ManageAccount.module-DbFPjLmV.js";
import { IconAdjustmentsCog, IconReceiptTax, IconUsers, IconAlertTriangle } from "@tabler/icons-react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { u as useIsCurrentUserAdmin } from "./useIsCurrentUserAdmin-DKXhmYit.js";
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
const ManageAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname.split("/").pop() || "settings";
  const isUserAdmin = useIsCurrentUserAdmin();
  return /* @__PURE__ */ jsxs("div", { className: accountClasses.container, children: [
    /* @__PURE__ */ jsx("h1", { children: i18n._(
      /*i18n*/
      {
        id: "Puv7+X"
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { className: accountClasses.tabsCard, children: /* @__PURE__ */ jsx(Tabs, { value: tabValue, onChange: (value) => navigate(`/account/${value}`), children: /* @__PURE__ */ jsxs(Tabs.List, { grow: true, children: [
      /* @__PURE__ */ jsx(Tabs.Tab, { value: "settings", leftSection: /* @__PURE__ */ jsx(IconAdjustmentsCog, {}), children: i18n._(
        /*i18n*/
        {
          id: "AeXO77"
        }
      ) }),
      /* @__PURE__ */ jsx(Tabs.Tab, { value: "taxes-and-fees", leftSection: /* @__PURE__ */ jsx(IconReceiptTax, {}), children: i18n._(
        /*i18n*/
        {
          id: "geUFpZ"
        }
      ) }),
      isUserAdmin && /* @__PURE__ */ jsx(Tabs.Tab, { value: "users", leftSection: /* @__PURE__ */ jsx(IconUsers, {}), children: i18n._(
        /*i18n*/
        {
          id: "Sxm8rQ"
        }
      ) }),
      isUserAdmin && /* @__PURE__ */ jsx(Tabs.Tab, { value: "danger-zone", leftSection: /* @__PURE__ */ jsx(IconAlertTriangle, {}), "data-testid": "danger-zone-tab", children: i18n._(
        /*i18n*/
        {
          id: "ZQKLI1"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: accountClasses.tabWrapper, children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
export {
  ManageAccount,
  ManageAccount as default
};

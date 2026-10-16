import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { NavLink, Outlet } from "react-router";
import { Container } from "@mantine/core";
import { a as getConfig } from "../entry.server.js";
import { I as ImpersonationBanner, P as PendingDeletionBanner, A as AnnouncementDisplay, G as GlobalMenu } from "./index-C9OohqtH.js";
import "react-dom/server";
import "@tanstack/react-query";
import "@lingui/core";
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
const header = "_header_9a1mg_1";
const logo = "_logo_9a1mg_6";
const inner = "_inner_9a1mg_13";
const classes = {
  header,
  logo,
  inner
};
const Header = ({
  rightContent,
  fullWidth = false
}) => {
  return /* @__PURE__ */ jsx("header", { className: classes.header, children: /* @__PURE__ */ jsxs(Container, { size: "md", className: classes.inner, fluid: fullWidth, children: [
    /* @__PURE__ */ jsx(NavLink, { className: classes.logo, to: "/manage/events", children: /* @__PURE__ */ jsx("img", { src: getConfig("VITE_APP_LOGO_LIGHT", "/logos/coursify-stacked-light.svg"), alt: `${getConfig("VITE_APP_NAME", "Coursify")} logo`, className: classes.logo }) }),
    /* @__PURE__ */ jsx("div", { className: classes.rightContent, children: rightContent })
  ] }) });
};
const DefaultLayout = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ImpersonationBanner, {}),
    /* @__PURE__ */ jsx(PendingDeletionBanner, {}),
    /* @__PURE__ */ jsx(AnnouncementDisplay, {}),
    /* @__PURE__ */ jsx(Header, { rightContent: /* @__PURE__ */ jsx(GlobalMenu, {}) }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
export {
  DefaultLayout as default
};

import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import { Burger, Breadcrumbs, UnstyledButton, VisuallyHidden, Badge } from "@mantine/core";
import { G as GlobalMenu, I as ImpersonationBanner, P as PendingDeletionBanner, A as AnnouncementDisplay } from "./index-C9OohqtH.js";
import { a as getConfig } from "../entry.server.js";
import { IconChevronLeft, IconLayoutSidebar } from "@tabler/icons-react";
import classNames from "classnames";
import { useMediaQuery } from "@mantine/hooks";
const container = "_container_yhylh_1";
const closed$1 = "_closed_yhylh_16";
const main = "_main_yhylh_21";
const sidebarOpen = "_sidebarOpen_yhylh_50";
const sidebarClose$1 = "_sidebarClose_yhylh_50";
const overlay = "_overlay_yhylh_76";
const open$1 = "_open_yhylh_87";
const classes$2 = {
  container,
  closed: closed$1,
  main,
  sidebarOpen,
  sidebarClose: sidebarClose$1,
  overlay,
  open: open$1
};
const topBar = "_topBar_11lag_1";
const topBarMain = "_topBarMain_11lag_11";
const breadcrumbsRow = "_breadcrumbsRow_11lag_22";
const breadcrumbContentRight = "_breadcrumbContentRight_11lag_41";
const breadcrumbs = "_breadcrumbs_11lag_22";
const actionGroup = "_actionGroup_11lag_122";
const withShadow = "_withShadow_11lag_128";
const burger = "_burger_11lag_131";
const logo$1 = "_logo_11lag_140";
const menu = "_menu_11lag_166";
const classes$1 = {
  topBar,
  topBarMain,
  breadcrumbsRow,
  breadcrumbContentRight,
  breadcrumbs,
  actionGroup,
  withShadow,
  burger,
  logo: logo$1,
  menu
};
const Topbar = ({
  sidebarOpen: sidebarOpen2,
  setSidebarOpen,
  topBarShadow,
  breadcrumbItems,
  topBarContent = null,
  breadcrumbContentRight: breadcrumbContentRight2 = null,
  actionGroupContent = null
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `${classes$1.topBar} ${topBarShadow ? classes$1.withShadow : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$1.topBarMain, children: [
      /* @__PURE__ */ jsx("div", { className: classes$1.burger, children: /* @__PURE__ */ jsx(Burger, { color: "#fff", opened: sidebarOpen2, onClick: () => setSidebarOpen(!sidebarOpen2), size: "sm" }) }),
      /* @__PURE__ */ jsx("div", { className: classes$1.logo, children: /* @__PURE__ */ jsx(NavLink, { to: `/manage/events`, children: /* @__PURE__ */ jsx("img", { src: getConfig("VITE_APP_LOGO_LIGHT", "/logos/coursify-stacked-light.svg"), alt: `${getConfig("VITE_APP_NAME", "Coursify")} logo`, className: classes$1.logo }) }) }),
      topBarContent,
      /* @__PURE__ */ jsxs("div", { className: classes$1.actionGroup, children: [
        actionGroupContent,
        /* @__PURE__ */ jsx("div", { className: classes$1.menu, children: /* @__PURE__ */ jsx(GlobalMenu, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.breadcrumbsRow, children: [
      /* @__PURE__ */ jsx("div", { className: classes$1.breadcrumbs, children: /* @__PURE__ */ jsx(Breadcrumbs, { separator: /* @__PURE__ */ jsx("span", { style: {
        margin: "0 4px",
        color: "#aaa"
      }, children: "/" }), children: breadcrumbItems.map((item, index) => /* @__PURE__ */ jsx(NavLink, { to: item.link ?? "#", children: item.content }, index)) }) }),
      breadcrumbContentRight2 && /* @__PURE__ */ jsx("div", { className: classes$1.breadcrumbContentRight, children: breadcrumbContentRight2 })
    ] })
  ] });
};
const sidebar = "_sidebar_1vxea_1";
const closed = "_closed_1vxea_11";
const logo = "_logo_1vxea_15";
const nav = "_nav_1vxea_34";
const sectionHeading = "_sectionHeading_1vxea_60";
const link = "_link_1vxea_71";
const navBadge = "_navBadge_1vxea_89";
const navBadgeAlert = "_navBadgeAlert_1vxea_100";
const loading = "_loading_1vxea_107";
const linkActive = "_linkActive_1vxea_121";
const linkIcon = "_linkIcon_1vxea_141";
const sidebarFooter = "_sidebarFooter_1vxea_165";
const open = "_open_1vxea_183";
const sidebarClose = "_sidebarClose_1vxea_187";
const classes = {
  sidebar,
  closed,
  logo,
  nav,
  sectionHeading,
  link,
  navBadge,
  navBadgeAlert,
  loading,
  linkActive,
  linkIcon,
  sidebarFooter,
  open,
  sidebarClose
};
const Sidebar = ({
  sidebarOpen: sidebarOpen2,
  setSidebarOpen,
  navItems,
  sidebarFooter: sidebarFooter2
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const renderLinks = () => {
    return navItems.map((item) => {
      if (!item.link && item.link !== "" && item.onClick === void 0) {
        return /* @__PURE__ */ jsx("div", { className: classes.sectionHeading, children: item.label }, item.label);
      }
      if (item.showWhen && !item.showWhen()) {
        return null;
      }
      if (item.loading) {
        return /* @__PURE__ */ jsx("a", { className: classNames(classes.loading, classes.link), children: " " }, item.label);
      }
      return /* @__PURE__ */ jsxs(NavLink, { to: item.comingSoon ? "#" : item.link ?? "#", onClick: () => {
        if (isMobile) {
          setSidebarOpen(false);
        }
        if (item.onClick) item.onClick();
      }, className: ({
        isActive
      }) => `${(item.isActive ? item.isActive(isActive) : isActive) && !item.comingSoon ? classes.linkActive : ""} ${classes.link}`, children: [
        item.icon && /* @__PURE__ */ jsx(item.icon, { size: 20, className: classes.linkIcon, stroke: 1.5 }),
        /* @__PURE__ */ jsx("span", { children: item.label }),
        item.badge !== void 0 && /* @__PURE__ */ jsx(Badge, { size: "xs", radius: "xl", className: item.badgeColor ? classes.navBadgeAlert : classes.navBadge, children: item.badge }),
        item.comingSoon && /* @__PURE__ */ jsx(Badge, { ml: "4px", size: "xs", className: classes.comingSoonBadge, children: i18n._(
          /*i18n*/
          {
            id: "VZeG/A"
          }
        ) })
      ] }, item.label);
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: classNames(`${classes.sidebar} ${sidebarOpen2 ? classes.open : classes.closed}`), children: [
    /* @__PURE__ */ jsx("div", { className: classes.logo, children: /* @__PURE__ */ jsx(NavLink, { to: `/manage/events`, children: /* @__PURE__ */ jsx("img", { src: getConfig("VITE_APP_LOGO_LIGHT", "/logos/coursify-stacked-light.svg"), alt: i18n._(
      /*i18n*/
      {
        id: "COnw8D",
        values: {
          0: getConfig("VITE_APP_NAME", "Coursify")
        }
      }
    ) }) }) }),
    /* @__PURE__ */ jsx("div", { className: classes.nav, children: renderLinks() }),
    sidebarFooter2 && /* @__PURE__ */ jsx("div", { className: classes.sidebarFooter, children: sidebarFooter2 }),
    sidebarOpen2 && /* @__PURE__ */ jsxs(UnstyledButton, { className: classes.sidebarClose, onClick: () => setSidebarOpen(!sidebarOpen2), children: [
      /* @__PURE__ */ jsx(IconChevronLeft, { size: 20 }),
      /* @__PURE__ */ jsx(VisuallyHidden, { children: i18n._(
        /*i18n*/
        {
          id: "62Ciis"
        }
      ) })
    ] })
  ] });
};
const SidebarToggleButton = ({
  open: open2,
  onClick
}) => {
  const Icon = IconLayoutSidebar;
  const label = i18n._(
    /*i18n*/
    {
      id: "OdnLE4"
    }
  );
  return /* @__PURE__ */ jsxs(UnstyledButton, { className: open2 ? classes$2.sidebarOpen : classes$2.sidebarClose, onClick, children: [
    /* @__PURE__ */ jsx(Icon, { size: 16 }),
    /* @__PURE__ */ jsx(VisuallyHidden, { children: label })
  ] });
};
const AppLayout = ({
  navItems,
  breadcrumbItems,
  entityType,
  topBarContent = null,
  breadcrumbContentRight: breadcrumbContentRight2 = null,
  actionGroupContent = null,
  sidebarFooter: sidebarFooter2 = null
}) => {
  const [sidebarOpen2, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768;
  });
  const [topBarShadow, setTopBarShadow] = useState(false);
  useEffect(() => {
    const mainElement = document.getElementById("app-manage-main");
    if (mainElement) {
      const handleScroll = () => {
        setTopBarShadow(mainElement.scrollTop > 10);
      };
      mainElement.addEventListener("scroll", handleScroll);
      return () => mainElement.removeEventListener("scroll", handleScroll);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ImpersonationBanner, {}),
    /* @__PURE__ */ jsx(PendingDeletionBanner, {}),
    /* @__PURE__ */ jsx(AnnouncementDisplay, {}),
    /* @__PURE__ */ jsxs("div", { id: `${entityType}-manage-container`, className: `${classes$2.container} ${sidebarOpen2 ? classes$2.open : classes$2.closed}`, children: [
      /* @__PURE__ */ jsx(Topbar, { sidebarOpen: sidebarOpen2, setSidebarOpen, topBarShadow, breadcrumbItems, topBarContent, breadcrumbContentRight: breadcrumbContentRight2, actionGroupContent }),
      /* @__PURE__ */ jsx("div", { className: classes$2.main, id: "app-manage-main", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(Sidebar, { sidebarOpen: sidebarOpen2, setSidebarOpen, navItems, sidebarFooter: sidebarFooter2 }),
      sidebarOpen2 && /* @__PURE__ */ jsx("div", { className: `${classes$2.overlay} ${sidebarOpen2 ? classes$2.open : ""}`, onClick: () => setSidebarOpen(false) }),
      !sidebarOpen2 && /* @__PURE__ */ jsx(SidebarToggleButton, { open: false, onClick: () => setSidebarOpen(true) })
    ] })
  ] });
};
export {
  AppLayout as A
};

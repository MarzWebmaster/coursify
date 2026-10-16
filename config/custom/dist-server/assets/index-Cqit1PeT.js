import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Group, Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { IconPlus } from "@tabler/icons-react";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
const EventsDashboardStatusButtons = ({
  baseUrl,
  eventsState
}) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Group, { mt: 10, mb: 15, children: [
    /* @__PURE__ */ jsx(Button, { size: "compact-sm", variant: eventsState === "upcoming" || !eventsState ? "light" : "transparent", onClick: () => navigate(baseUrl + "/upcoming" + window.location.search), children: i18n._(
      /*i18n*/
      {
        id: "ia8YsC"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { size: "compact-sm", variant: eventsState === "ended" ? "light" : "transparent", onClick: () => navigate(baseUrl + "/ended" + window.location.search), children: i18n._(
      /*i18n*/
      {
        id: "237hSL"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { size: "compact-sm", variant: eventsState === "archived" ? "light" : "transparent", onClick: () => navigate(baseUrl + "/archived" + window.location.search), children: i18n._(
      /*i18n*/
      {
        id: "TdfEV7"
      }
    ) })
  ] });
};
const NoEventsBlankSlate = ({
  eventsState,
  openCreateModal
}) => {
  return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
    /*i18n*/
    {
      id: "yAlJXG"
    }
  ), imageHref: "/blank-slate/events.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("p", { children: [
      (eventsState === "upcoming" || !eventsState) && i18n._(
        /*i18n*/
        {
          id: "Ug4SfW"
        }
      ),
      eventsState === "ended" && i18n._(
        /*i18n*/
        {
          id: "HFucK5"
        }
      ),
      eventsState === "archived" && i18n._(
        /*i18n*/
        {
          id: "LNWHXb"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: openCreateModal, children: i18n._(
      /*i18n*/
      {
        id: "uN355O"
      }
    ) })
  ] }) });
};
export {
  EventsDashboardStatusButtons as E,
  NoEventsBlankSlate as N
};

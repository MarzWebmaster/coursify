import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { u as useGetEvents } from "./useGetEvents-CRE3yVbY.js";
import { g as getEventQueryFilters, E as EventCard } from "./eventsPageFiltersHelper-CklOJn7k.js";
import { T as ToolBar, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { Menu, Button, Skeleton } from "@mantine/core";
import { IconBuilding, IconArrowRight, IconChevronDown, IconPlus, IconCalendarPlus, IconUserPlus } from "@tabler/icons-react";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { useDisclosure } from "@mantine/hooks";
import { C as CreateEventModal } from "./index-QPHzYTb4.js";
import { u as useGetOrganizers } from "./useGetOrganizers-AXXYibKP.js";
import { useParams, useNavigate, Navigate } from "react-router";
import { C as CreateOrganizerModal } from "./index-BTV1mmSF.js";
import { S as SwitchOrganizerModal } from "./index-wsjGOl-p.js";
import { E as EventsDashboardStatusButtons, N as NoEventsBlankSlate } from "./index-Cqit1PeT.js";
import { useState } from "react";
import { a as getConfig } from "../entry.server.js";
import "@tanstack/react-query";
import "./types-CqPWB-a5.js";
import "./urlHelper-CsaWRwIV.js";
import "./index-AhXgh6Nz.js";
import "classnames";
import "@mantine/form";
import "./index-D4cOjjnu.js";
import "./index-CwAoF9NO.js";
import "./useGetEvent-DyvalBPE.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./notifications-Coh3Ef-t.js";
import "@mantine/notifications";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./index-jHMtuNEo.js";
import "./index-ChciN8SC.js";
import "./confirmationDialog-I-HMojnx.js";
import "@mantine/modals";
import "./useUpdateEventStatus-Ck9Vcq_R.js";
import "./currency-Br7a8J7F.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./useGetAccount-CGfwRfDK.js";
import "./useCreateEvent-_hCh3y7f.js";
import "./index-t-LfUV0_.js";
import "./index-CYsdl7UG.js";
import "./currencies-wzczGcKi.js";
import "./timezones-CsvfI1Rm.js";
import "./analytics-Cd4RPKa9.js";
import "@mantine/dates";
import "./eventCategories-BcVMR4Oy.js";
import "./index-CwjvB_vn.js";
import "./index-DAgXC5_F.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/colors-generator";
const eventsContainer = "_eventsContainer_gb22w_1";
const pageHeader = "_pageHeader_gb22w_6";
const headerContent = "_headerContent_gb22w_23";
const pageTitle = "_pageTitle_gb22w_27";
const welcomeMessage = "_welcomeMessage_gb22w_40";
const organizerButton = "_organizerButton_gb22w_52";
const arrowIcon = "_arrowIcon_gb22w_76";
const organizerLogo = "_organizerLogo_gb22w_83";
const logoPlaceholder = "_logoPlaceholder_gb22w_97";
const organizerName = "_organizerName_gb22w_107";
const organizerCount = "_organizerCount_gb22w_113";
const organizerLogos = "_organizerLogos_gb22w_125";
const miniLogo = "_miniLogo_gb22w_130";
const classes = {
  eventsContainer,
  pageHeader,
  headerContent,
  pageTitle,
  welcomeMessage,
  organizerButton,
  arrowIcon,
  organizerLogo,
  logoPlaceholder,
  organizerName,
  organizerCount,
  organizerLogos,
  miniLogo
};
const DashboardSkeleton = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "l", mb: "20px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "l", mb: "20px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "l" })
  ] });
};
function Dashboard() {
  var _a, _b, _c;
  const {
    eventsState
  } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const [createOrganizerModalOpen, {
    open: openCreateOrganizerModal,
    close: closeCreateOrganizerModal
  }] = useDisclosure(false);
  const [organizerModalOpen, setOrganizerModalOpen] = useState(false);
  const {
    data: eventData,
    isFetched: isEventsFetched,
    isFetching: isEventsFetching
  } = useGetEvents(getEventQueryFilters(searchParams));
  const organizersQuery = useGetOrganizers();
  const pagination = eventData == null ? void 0 : eventData.meta;
  const events = eventData == null ? void 0 : eventData.data;
  const organizers = (_a = organizersQuery == null ? void 0 : organizersQuery.data) == null ? void 0 : _a.data;
  if (organizersQuery.isFetched && (organizers == null ? void 0 : organizers.length) === 0) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/welcome" });
  }
  if (organizersQuery.isFetched && (organizers == null ? void 0 : organizers.length) === 1) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/manage/organizer/" + organizers[0].id });
  }
  const getHeading = () => {
    if (eventsState === "upcoming" || !eventsState) {
      return i18n._(
        /*i18n*/
        {
          id: "dr7CWq"
        }
      );
    } else if (eventsState === "ended") {
      return i18n._(
        /*i18n*/
        {
          id: "ZS/D7f"
        }
      );
    } else if (eventsState === "archived") {
      return i18n._(
        /*i18n*/
        {
          id: "7rLTkE"
        }
      );
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: classes.eventsContainer, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.pageHeader, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.headerContent, children: [
        /* @__PURE__ */ jsx("h1", { className: classes.pageTitle, children: getHeading() }),
        /* @__PURE__ */ jsx("p", { className: classes.welcomeMessage, children: /* @__PURE__ */ jsx(Trans, { id: "LETnBR", values: {
          0: getConfig("VITE_APP_NAME", "Coursify")
        } }) })
      ] }),
      organizers && organizers.length === 1 ? /* @__PURE__ */ jsxs("button", { className: classes.organizerButton, onClick: () => navigate(`/manage/organizer/${organizers[0].id}`), children: [
        /* @__PURE__ */ jsx("div", { className: classes.organizerLogo, children: ((_b = organizers[0].images) == null ? void 0 : _b.find((image) => image.type === "ORGANIZER_LOGO")) ? /* @__PURE__ */ jsx("img", { src: (_c = organizers[0].images.find((image) => image.type === "ORGANIZER_LOGO")) == null ? void 0 : _c.url, alt: organizers[0].name }) : /* @__PURE__ */ jsx("div", { className: classes.logoPlaceholder, children: /* @__PURE__ */ jsx(IconBuilding, { size: 20 }) }) }),
        /* @__PURE__ */ jsx("span", { className: classes.organizerName, children: organizers[0].name }),
        /* @__PURE__ */ jsx(IconArrowRight, { size: 16, className: classes.arrowIcon })
      ] }) : organizers && organizers.length > 1 ? /* @__PURE__ */ jsxs("button", { className: classes.organizerButton, onClick: () => setOrganizerModalOpen(true), children: [
        /* @__PURE__ */ jsxs("div", { className: classes.organizerLogos, children: [
          organizers.slice(0, 3).map((organizer, index) => {
            var _a2, _b2;
            return /* @__PURE__ */ jsx("div", { className: classes.miniLogo, style: {
              zIndex: 3 - index
            }, children: ((_a2 = organizer.images) == null ? void 0 : _a2.find((image) => image.type === "ORGANIZER_LOGO")) ? /* @__PURE__ */ jsx("img", { src: (_b2 = organizer.images.find((image) => image.type === "ORGANIZER_LOGO")) == null ? void 0 : _b2.url, alt: organizer.name }) : /* @__PURE__ */ jsx(IconBuilding, { size: 12 }) }, organizer.id);
          }),
          organizers.length > 3 && /* @__PURE__ */ jsx("div", { className: classes.miniLogo, style: {
            zIndex: 0
          }, children: /* @__PURE__ */ jsxs("span", { children: [
            "+",
            organizers.length - 3
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("span", { className: classes.organizerCount, children: i18n._(
          /*i18n*/
          {
            id: "B7pZfX",
            values: {
              0: organizers.length
            }
          }
        ) }),
        /* @__PURE__ */ jsx(IconArrowRight, { size: 16, className: classes.arrowIcon })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "+pr/FY"
      }
    ), setSearchParams, searchParams }), children: /* @__PURE__ */ jsxs(Menu, { transitionProps: {
      transition: "pop-top-right"
    }, position: "bottom", width: 220, withinPortal: true, children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", rightSection: /* @__PURE__ */ jsx(IconChevronDown, { stroke: 1.5 }), pr: 12, children: i18n._(
        /*i18n*/
        {
          id: "BOqY23"
        }
      ) }) }),
      /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
        /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconCalendarPlus, { stroke: 1.5 }), onClick: openCreateModal, children: i18n._(
          /*i18n*/
          {
            id: "0pC/y6"
          }
        ) }),
        /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconUserPlus, { stroke: 1.5 }), onClick: openCreateOrganizerModal, children: i18n._(
          /*i18n*/
          {
            id: "G5RhpL"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(EventsDashboardStatusButtons, { baseUrl: `/manage/events`, eventsState }),
    (events == null ? void 0 : events.length) === 0 && isEventsFetched && /* @__PURE__ */ jsx(NoEventsBlankSlate, { openCreateModal, eventsState }),
    /* @__PURE__ */ jsxs("div", { children: [
      isEventsFetching && !events && /* @__PURE__ */ jsx(DashboardSkeleton, {}),
      events == null ? void 0 : events.map((event) => /* @__PURE__ */ jsx(EventCard, { event }, event.id))
    ] }),
    events && events.length > 0 && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) }),
    createModalOpen && /* @__PURE__ */ jsx(CreateEventModal, { onClose: closeCreateModal }),
    createOrganizerModalOpen && /* @__PURE__ */ jsx(CreateOrganizerModal, { onClose: closeCreateOrganizerModal }),
    organizerModalOpen && /* @__PURE__ */ jsx(SwitchOrganizerModal, { opened: organizerModalOpen, onClose: () => setOrganizerModalOpen(false), onCreateOrganizer: () => {
      setOrganizerModalOpen(false);
      openCreateOrganizerModal();
    }, heading: i18n._(
      /*i18n*/
      {
        id: "pkk46Q"
      }
    ), excludeCurrentOrganizer: false })
  ] });
}
export {
  Dashboard,
  Dashboard as default
};

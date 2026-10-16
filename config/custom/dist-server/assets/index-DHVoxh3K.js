import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router";
import { T as ToolBar, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { Button, Skeleton } from "@mantine/core";
import { IconCalendarPlus } from "@tabler/icons-react";
import { g as getEventQueryFilters, E as EventCard } from "./eventsPageFiltersHelper-CklOJn7k.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { C as CreateEventModal } from "./index-QPHzYTb4.js";
import { u as useGetEvents } from "./useGetEvents-CRE3yVbY.js";
import { E as EventsDashboardStatusButtons, N as NoEventsBlankSlate } from "./index-Cqit1PeT.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import "react";
import "classnames";
import "./index-jHMtuNEo.js";
import "./types-CqPWB-a5.js";
import "./urlHelper-CsaWRwIV.js";
import "../entry.server.js";
import "react-dom/server";
import "@tanstack/react-query";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./index-AhXgh6Nz.js";
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
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./index-ChciN8SC.js";
import "./confirmationDialog-I-HMojnx.js";
import "./useUpdateEventStatus-Ck9Vcq_R.js";
import "./currency-Br7a8J7F.js";
import "./effectiveLocation-BzDgAlu_.js";
import "./addressUtilities-7xIQim0X.js";
import "./useGetAccount-CGfwRfDK.js";
import "./useCreateEvent-_hCh3y7f.js";
import "./useGetOrganizers-AXXYibKP.js";
import "./index-t-LfUV0_.js";
import "./index-CYsdl7UG.js";
import "./currencies-wzczGcKi.js";
import "./timezones-CsvfI1Rm.js";
import "./analytics-Cd4RPKa9.js";
import "./eventCategories-BcVMR4Oy.js";
import "./index-CwjvB_vn.js";
import "./index-DAgXC5_F.js";
const Events = () => {
  const {
    organizerId,
    eventsState
  } = useParams();
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const {
    data: eventsData,
    isFetched: isEventsFetched
  } = useGetEvents(getEventQueryFilters(searchParams));
  const pagination = eventsData == null ? void 0 : eventsData.meta;
  const events = eventsData == null ? void 0 : eventsData.data;
  const SkeletonEvents = () => {
    return /* @__PURE__ */ jsx("div", { children: Array.from({
      length: 6
    }).map((_, index) => /* @__PURE__ */ jsx(Skeleton, { height: 190, mb: 10 }, index)) });
  };
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { children: i18n._(
      /*i18n*/
      {
        id: "tst44n"
      }
    ) }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "+pr/FY"
      }
    ), setSearchParams, searchParams }), children: /* @__PURE__ */ jsx(Button, { color: "green", rightSection: /* @__PURE__ */ jsx(IconCalendarPlus, { stroke: 1.5 }), onClick: openCreateModal, pr: 12, children: i18n._(
      /*i18n*/
      {
        id: "uN355O"
      }
    ) }) }),
    /* @__PURE__ */ jsx(EventsDashboardStatusButtons, { baseUrl: `/manage/organizer/${organizerId}/events`, eventsState }),
    (events == null ? void 0 : events.length) === 0 && isEventsFetched && /* @__PURE__ */ jsx(NoEventsBlankSlate, { openCreateModal, eventsState }),
    !isEventsFetched && /* @__PURE__ */ jsx(SkeletonEvents, {}),
    /* @__PURE__ */ jsx("div", { children: events == null ? void 0 : events.map((event) => /* @__PURE__ */ jsx(EventCard, { event }, event.id)) }),
    isEventsFetched && events && (events == null ? void 0 : events.length) > 0 && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) }),
    createModalOpen && /* @__PURE__ */ jsx(CreateEventModal, { organizerId, onClose: closeCreateModal })
  ] });
};
export {
  Events as default
};

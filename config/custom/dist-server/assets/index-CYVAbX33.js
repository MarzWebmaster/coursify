import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { IconArrowLeft, IconDashboard, IconChartPie, IconCalendarRepeat, IconSettings, IconPaint, IconTicket, IconUserQuestion, IconReceipt, IconDiscount2, IconTrendingUp, IconUsers, IconQrcode, IconSend, IconListCheck, IconUsersGroup, IconDeviceTabletCode, IconWebhook, IconMailForward, IconMailCheck, IconExternalLink, IconShare, IconChevronRight, IconEyeOff, IconEye } from "@tabler/icons-react";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { u as useGetEventCounts } from "./useGetEventCounts-BudQN_tQ.js";
import { u as useGeoStatus } from "./useGeoStatus-GfcfS0IW.js";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { A as AppLayout } from "./index-CDmouRM7.js";
import { useLocation, useParams, NavLink } from "react-router";
import { Button } from "@mantine/core";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { u as useUpdateEventStatus } from "./useUpdateEventStatus-Ck9Vcq_R.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { S as ShareModal } from "./index-BwSXzvSP.js";
import { E as EventLiveCelebrationModal, P as PublishEventModal } from "./index-Dz80WDaH.js";
import { useDisclosure } from "@mantine/hooks";
import { S as SidebarCallout, T as TopBarButton } from "./index-DTPY5fIH.js";
import { u as useWindowWidth } from "./useWindowWidth-CvsXQp3R.js";
import { u as useGetMe } from "../entry.server.js";
import { u as useResendEmailConfirmation } from "./useResendEmailConfirmation-DWCgfO2b.js";
import { useState, useMemo } from "react";
import { e as eventHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import { E as EventType } from "./types-CqPWB-a5.js";
import { u as useGetEventOccurrence } from "./useGetEventOccurrence-Csyd2oEM.js";
import { p as prettyDate } from "./dates-CbVpwZeX.js";
import "@tanstack/react-query";
import "./index-C9OohqtH.js";
import "./auth.client-Bgg-Rraf.js";
import "./index-AhXgh6Nz.js";
import "classnames";
import "./index-BTV1mmSF.js";
import "./index-t-LfUV0_.js";
import "./useGetOrganizers-AXXYibKP.js";
import "./useGetAccount-CGfwRfDK.js";
import "@mantine/form";
import "./index-CYsdl7UG.js";
import "./currencies-wzczGcKi.js";
import "./timezones-CsvfI1Rm.js";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./analytics-Cd4RPKa9.js";
import "./index-CwjvB_vn.js";
import "@lingui/react";
import "./admin.client-DIpS7H64.js";
import "./AnnouncementModal-BnhI_3XO.js";
import "./index-Bhmm_OXR.js";
import "@mantine/modals";
import "./useGetEvents-CRE3yVbY.js";
import "@mantine/notifications";
import "react-qr-code";
import "./useGetOrganizer-DMDsW5DW.js";
import "./useGetProductCategories-BfShm84T.js";
import "./useGetEventOccurrences-Ch0XNQBq.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/dates";
import "@mantine/colors-generator";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
const statusToggleContainer = "_statusToggleContainer_9gsti_1";
const statusAction = "_statusAction_9gsti_14";
const eventPageButton = "_eventPageButton_9gsti_26";
const eventPageButtonText = "_eventPageButtonText_9gsti_38";
const mobile = "_mobile_9gsti_38";
const desktop = "_desktop_9gsti_39";
const shareButton = "_shareButton_9gsti_56";
const classes = {
  statusToggleContainer,
  statusAction,
  eventPageButton,
  eventPageButtonText,
  mobile,
  desktop,
  shareButton
};
const EventLayout = () => {
  var _a, _b, _c;
  const location = useLocation();
  const {
    eventId
  } = useParams();
  const [opened, {
    open,
    close
  }] = useDisclosure(false);
  const [celebrationOpened, {
    open: openCelebration,
    close: closeCelebration
  }] = useDisclosure(false);
  const [publishModalOpened, {
    open: openPublishModal,
    close: closePublishModal
  }] = useDisclosure(false);
  const statusToggleMutation = useUpdateEventStatus();
  const {
    data: event,
    isFetched: isEventFetched
  } = useGetEvent(eventId);
  const {
    isFetched: isEventSettingsFetched
  } = useGetEventSettings(eventId);
  const {
    data: eventCounts
  } = useGetEventCounts(eventId);
  const {
    data: me
  } = useGetMe();
  const resendEmailConfirmationMutation = useResendEmailConfirmation();
  const [emailConfirmationResent, setEmailConfirmationResent] = useState(false);
  useGeoStatus();
  const occurrenceIdFromUrl = useMemo(() => {
    const match = location.pathname.match(/\/occurrences\/(\d+)$/);
    return match ? match[1] : void 0;
  }, [location.pathname]);
  const {
    data: occurrence
  } = useGetEventOccurrence(eventId, occurrenceIdFromUrl);
  const handleEmailConfirmationResend = () => {
    resendEmailConfirmationMutation.mutate({
      userId: me == null ? void 0 : me.id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "YaCgdO"
          }
        ));
        setEmailConfirmationResent(true);
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "fWsBTs"
          }
        ));
      }
    });
  };
  const navItems = [
    {
      link: "/manage/organizer/" + ((_a = event == null ? void 0 : event.organizer) == null ? void 0 : _a.id),
      label: i18n._(
        /*i18n*/
        {
          id: "S3CZ5M"
        }
      ),
      icon: IconArrowLeft
    },
    // 1. OVERVIEW
    {
      label: i18n._(
        /*i18n*/
        {
          id: "6/dCYd"
        }
      )
    },
    {
      link: "dashboard",
      label: i18n._(
        /*i18n*/
        {
          id: "7p5kLi"
        }
      ),
      icon: IconDashboard
    },
    {
      link: "reports",
      label: i18n._(
        /*i18n*/
        {
          id: "t9yxlZ"
        }
      ),
      icon: IconChartPie,
      isActive: (isActive) => isActive || location.pathname.includes("/report/")
    },
    // 2. EVENT SETUP
    {
      label: i18n._(
        /*i18n*/
        {
          id: "Ohn74G"
        }
      )
    },
    {
      link: "occurrences",
      label: i18n._(
        /*i18n*/
        {
          id: "V9flmL"
        }
      ),
      icon: IconCalendarRepeat,
      showWhen: () => (event == null ? void 0 : event.type) === EventType.RECURRING
    },
    {
      link: "settings",
      label: i18n._(
        /*i18n*/
        {
          id: "JyD0LH"
        }
      ),
      icon: IconSettings
    },
    {
      link: "homepage-designer",
      label: i18n._(
        /*i18n*/
        {
          id: "PRuBTd"
        }
      ),
      icon: IconPaint
    },
    {
      link: "ticket-designer",
      label: i18n._(
        /*i18n*/
        {
          id: "bbslmb"
        }
      ),
      icon: IconTicket
    },
    {
      link: "questions",
      label: i18n._(
        /*i18n*/
        {
          id: "5tl0Bp"
        }
      ),
      icon: IconUserQuestion
    },
    // 3. Ticketing & Sales
    {
      label: i18n._(
        /*i18n*/
        {
          id: "8qsbZ5"
        }
      )
    },
    {
      link: "products",
      label: i18n._(
        /*i18n*/
        {
          id: "NRhrIB"
        }
      ),
      icon: IconTicket
    },
    {
      link: "orders",
      label: i18n._(
        /*i18n*/
        {
          id: "1h+RBg"
        }
      ),
      icon: IconReceipt,
      badge: eventCounts == null ? void 0 : eventCounts.total_orders
    },
    {
      link: "promo-codes",
      label: i18n._(
        /*i18n*/
        {
          id: "RVb8Fo"
        }
      ),
      icon: IconDiscount2
    },
    {
      link: "affiliates",
      label: i18n._(
        /*i18n*/
        {
          id: "CPXP5Z"
        }
      ),
      icon: IconTrendingUp
    },
    // 4. GUESTS
    {
      label: i18n._(
        /*i18n*/
        {
          id: "LIYoRQ"
        }
      )
    },
    {
      link: "attendees",
      label: i18n._(
        /*i18n*/
        {
          id: "9SZT4E"
        }
      ),
      icon: IconUsers,
      badge: eventCounts == null ? void 0 : eventCounts.total_attendees_registered
    },
    {
      link: "check-in",
      label: i18n._(
        /*i18n*/
        {
          id: "tejfAy"
        }
      ),
      icon: IconQrcode
    },
    {
      link: "messages",
      label: i18n._(
        /*i18n*/
        {
          id: "t7TeQU"
        }
      ),
      icon: IconSend
    },
    {
      link: "sold-out-waitlist",
      label: i18n._(
        /*i18n*/
        {
          id: "u0n+wz"
        }
      ),
      icon: IconListCheck
    },
    {
      link: "capacity-assignments",
      label: i18n._(
        /*i18n*/
        {
          id: "nDBs04"
        }
      ),
      icon: IconUsersGroup,
      showWhen: () => (event == null ? void 0 : event.type) !== EventType.RECURRING
    },
    // 5. INTEGRATIONS
    {
      label: i18n._(
        /*i18n*/
        {
          id: "nbfdhU"
        }
      )
    },
    {
      link: "widget",
      label: i18n._(
        /*i18n*/
        {
          id: "VxFvXQ"
        }
      ),
      icon: IconDeviceTabletCode
    },
    {
      link: "webhooks",
      label: i18n._(
        /*i18n*/
        {
          id: "v1kQyJ"
        }
      ),
      icon: IconWebhook
    }
  ];
  const navItemsWithLoading = !isEventSettingsFetched || !isEventFetched ? navItems.map((item) => item.link ? {
    ...item,
    loading: true
  } : item) : navItems;
  const screenWidth = useWindowWidth();
  const breadcrumbItemsWidth = screenWidth > 1100 ? 60 : 23;
  const breadcrumbItems = isEventFetched ? [{
    link: `/manage/organizer/${(_b = event == null ? void 0 : event.organizer) == null ? void 0 : _b.id}`,
    content: /* @__PURE__ */ jsx(Truncate, { length: breadcrumbItemsWidth, text: (_c = event == null ? void 0 : event.organizer) == null ? void 0 : _c.name, showTooltip: false })
  }, {
    link: `/manage/event/${event == null ? void 0 : event.id}`,
    content: /* @__PURE__ */ jsx(Truncate, { length: breadcrumbItemsWidth, text: event == null ? void 0 : event.title, showTooltip: false })
  }, ...occurrenceIdFromUrl && occurrence ? [{
    link: `/manage/event/${event == null ? void 0 : event.id}/occurrences/${occurrenceIdFromUrl}`,
    content: /* @__PURE__ */ jsx(Truncate, { length: breadcrumbItemsWidth, text: prettyDate(occurrence.start_date, (event == null ? void 0 : event.timezone) || "UTC") + (occurrence.label ? ` (${occurrence.label})` : ""), showTooltip: false })
  }] : []] : [{
    link: "#",
    content: "..."
  }];
  const handleStatusToggle = () => {
    if ((event == null ? void 0 : event.status) !== "LIVE") {
      openPublishModal();
      return;
    }
    const message = i18n._(
      /*i18n*/
      {
        id: "CMyVEK"
      }
    );
    confirmationDialog(message, () => {
      statusToggleMutation.mutate({
        eventId,
        status: "DRAFT"
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "btxLWj"
            }
          ));
        },
        onError: (error) => {
          var _a2, _b2;
          showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "4/If97"
            }
          ));
        }
      });
    });
  };
  return /* @__PURE__ */ jsx(AppLayout, { navItems: navItemsWithLoading, breadcrumbItems, entityType: "event", topBarContent: /* @__PURE__ */ jsx("div", { className: classes.statusToggleContainer, children: isEventFetched && /* @__PURE__ */ jsx(TopBarButton, { onClick: handleStatusToggle, "data-testid": "event-status-toggle", size: "sm", leftSection: (event == null ? void 0 : event.status) === "DRAFT" ? /* @__PURE__ */ jsx(IconEyeOff, { size: 16 }) : /* @__PURE__ */ jsx(IconEye, { size: 16 }), rightSection: /* @__PURE__ */ jsx(IconChevronRight, { size: 14 }), children: (event == null ? void 0 : event.status) === "DRAFT" ? /* @__PURE__ */ jsxs("span", { children: [
    i18n._(
      /*i18n*/
      {
        id: "eneWvv"
      }
    ),
    " ",
    /* @__PURE__ */ jsx("span", { className: classes.statusAction, children: i18n._(
      /*i18n*/
      {
        id: "25QDJ1"
      }
    ) })
  ] }) : /* @__PURE__ */ jsxs("span", { children: [
    i18n._(
      /*i18n*/
      {
        id: "dF6vP6"
      }
    ),
    " ",
    /* @__PURE__ */ jsx("span", { className: classes.statusAction, children: i18n._(
      /*i18n*/
      {
        id: "WOyJmc"
      }
    ) })
  ] }) }) }), breadcrumbContentRight: /* @__PURE__ */ jsx("div", { className: classes.shareButton, children: event && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { onClick: open, variant: "transparent", leftSection: /* @__PURE__ */ jsx(IconShare, { size: 16 }), children: i18n._(
      /*i18n*/
      {
        id: "B2V3cA"
      }
    ) }),
    /* @__PURE__ */ jsx(ShareModal, { url: eventHomepageUrl(event), title: event.title, modalTitle: i18n._(
      /*i18n*/
      {
        id: "B2V3cA"
      }
    ), opened, onClose: close }),
    /* @__PURE__ */ jsx(EventLiveCelebrationModal, { opened: celebrationOpened, onClose: closeCelebration, url: eventHomepageUrl(event), eventTitle: event.title, eventId: String(event.id) }),
    publishModalOpened && /* @__PURE__ */ jsx(PublishEventModal, { opened: publishModalOpened, onClose: closePublishModal, event, onSuccess: () => {
      closePublishModal();
      openCelebration();
    } })
  ] }) }), actionGroupContent: /* @__PURE__ */ jsx(Button, { component: NavLink, to: `/event/${eventId}/${event == null ? void 0 : event.slug}`, target: "_blank", variant: "transparent", leftSection: /* @__PURE__ */ jsx(IconExternalLink, { size: 17 }), className: classes.eventPageButton, title: i18n._(
    /*i18n*/
    {
      id: "cs5muu"
    }
  ), children: /* @__PURE__ */ jsxs("div", { className: classes.eventPageButtonText, children: [
    /* @__PURE__ */ jsx("span", { className: classes.desktop, children: i18n._(
      /*i18n*/
      {
        id: "cs5muu"
      }
    ) }),
    /* @__PURE__ */ jsx("span", { className: classes.mobile, children: i18n._(
      /*i18n*/
      {
        id: "mImacG"
      }
    ) })
  ] }) }), sidebarFooter: me && !me.is_email_verified && !emailConfirmationResent ? /* @__PURE__ */ jsx(SidebarCallout, { icon: /* @__PURE__ */ jsx(IconMailCheck, { size: 20 }), heading: i18n._(
    /*i18n*/
    {
      id: "/IBv6X"
    }
  ), description: i18n._(
    /*i18n*/
    {
      id: "Auz0Mz"
    }
  ), buttonIcon: /* @__PURE__ */ jsx(IconMailForward, { size: 16 }), buttonText: i18n._(
    /*i18n*/
    {
      id: "G42SNI"
    }
  ), onClick: () => handleEmailConfirmationResend() }) : null });
};
export {
  EventLayout as default
};

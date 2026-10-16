import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { IconArrowsHorizontal, IconBrandStripe, IconDashboard, IconChartPie, IconCalendar, IconSettings, IconPaint, IconMapPin, IconWebhook, IconCalendarPlus, IconUsersGroup, IconExternalLink, IconShare, IconChevronRight, IconEyeOff, IconEye } from "@tabler/icons-react";
import { A as AppLayout } from "./index-CDmouRM7.js";
import { useParams, useLocation, NavLink } from "react-router";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { u as useGetOrganizer } from "./useGetOrganizer-DMDsW5DW.js";
import { u as useGeoStatus } from "./useGeoStatus-GfcfS0IW.js";
import { useState, useEffect } from "react";
import { C as CreateEventModal } from "./index-QPHzYTb4.js";
import { S as SidebarCallout, T as TopBarButton } from "./index-DTPY5fIH.js";
import { I as InviteUserModal } from "./index-D8irjR6P.js";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { S as SwitchOrganizerModal } from "./index-wsjGOl-p.js";
import { C as CreateOrganizerModal } from "./index-BTV1mmSF.js";
import { u as useGetOrganizers } from "./useGetOrganizers-AXXYibKP.js";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { S as ShareModal } from "./index-BwSXzvSP.js";
import { o as organizerHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import { u as useUpdateOrganizerStatus } from "./useUpdateOrganizerStatus-CAGj3GlG.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useResendEmailConfirmation } from "./useResendEmailConfirmation-DWCgfO2b.js";
import { u as useGetMe } from "../entry.server.js";
import "./index-C9OohqtH.js";
import "./auth.client-Bgg-Rraf.js";
import "./index-AhXgh6Nz.js";
import "classnames";
import "@lingui/react";
import "@tanstack/react-query";
import "./admin.client-DIpS7H64.js";
import "./dates-CbVpwZeX.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./AnnouncementModal-BnhI_3XO.js";
import "./index-Bhmm_OXR.js";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./types-CqPWB-a5.js";
import "@mantine/form";
import "./useCreateEvent-_hCh3y7f.js";
import "./useGetEvents-CRE3yVbY.js";
import "./index-D4cOjjnu.js";
import "./index-t-LfUV0_.js";
import "./index-CYsdl7UG.js";
import "./currencies-wzczGcKi.js";
import "./timezones-CsvfI1Rm.js";
import "./analytics-Cd4RPKa9.js";
import "@mantine/dates";
import "./eventCategories-BcVMR4Oy.js";
import "./index-CwjvB_vn.js";
import "./index-CV5KyLiQ.js";
import "react-qr-code";
import "@mantine/modals";
import "@mantine/notifications";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/colors-generator";
const viewHomepageButton = "_viewHomepageButton_1xs94_1";
const viewHomepageButtonTextDesktop = "_viewHomepageButtonTextDesktop_1xs94_17";
const statusToggleContainer = "_statusToggleContainer_1xs94_63";
const statusAction = "_statusAction_1xs94_76";
const createEventBreadcrumb = "_createEventBreadcrumb_1xs94_88";
const shareButtonTextDesktop = "_shareButtonTextDesktop_1xs94_101";
const shareButtonTextMobile = "_shareButtonTextMobile_1xs94_110";
const classes = {
  viewHomepageButton,
  viewHomepageButtonTextDesktop,
  statusToggleContainer,
  statusAction,
  createEventBreadcrumb,
  shareButtonTextDesktop,
  shareButtonTextMobile
};
const SidebarCalloutQueue = ({
  callouts
}) => {
  const [activeCalloutIndex, setActiveCalloutIndex] = useState(null);
  useEffect(() => {
    const firstVisibleIndex = callouts.findIndex((callout) => {
      if (!callout.storageKey || callout.storageKey.includes("undefined") || callout.storageKey.includes("[object Object]")) {
        return false;
      }
      const isDismissed = localStorage.getItem(callout.storageKey) === "true";
      return !isDismissed;
    });
    setActiveCalloutIndex(firstVisibleIndex >= 0 ? firstVisibleIndex : null);
  }, [callouts]);
  if (activeCalloutIndex === null || !callouts[activeCalloutIndex]) {
    return null;
  }
  const activeCallout = callouts[activeCalloutIndex];
  return /* @__PURE__ */ jsx(SidebarCallout, { ...activeCallout, onClose: () => {
    const nextIndex = callouts.findIndex((callout, index) => {
      if (index <= activeCalloutIndex) return false;
      if (!callout.storageKey || callout.storageKey.includes("undefined") || callout.storageKey.includes("[object Object]")) {
        return false;
      }
      const isDismissed = localStorage.getItem(callout.storageKey) === "true";
      return !isDismissed;
    });
    setActiveCalloutIndex(nextIndex >= 0 ? nextIndex : null);
  } });
};
const OrganizerLayout = () => {
  const {
    organizerId
  } = useParams();
  const location = useLocation();
  const {
    data: organizer
  } = useGetOrganizer(organizerId);
  useGeoStatus();
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showCreateOrganizerModal, setShowCreateOrganizerModal] = useState(false);
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const [switchOrganizerModalOpen, {
    open: openSwitchModal,
    close: closeSwitchModal
  }] = useDisclosure(false);
  const [shareModalOpen, {
    open: openShareModal,
    close: closeShareModal
  }] = useDisclosure(false);
  const [emailVerificationModalOpen, {
    open: openEmailVerificationModal,
    close: closeEmailVerificationModal
  }] = useDisclosure(false);
  const {
    data: organizerResposne
  } = useGetOrganizers();
  const organizers = organizerResposne == null ? void 0 : organizerResposne.data;
  const {
    data: account
  } = useGetAccount();
  const resendEmailConfirmationMutation = useResendEmailConfirmation();
  const [emailConfirmationResent, setEmailConfirmationResent] = useState(false);
  const {
    data: me
  } = useGetMe();
  const isUserEmailVerfied = me == null ? void 0 : me.is_email_verified;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const statusToggleMutation = useUpdateOrganizerStatus();
  const isStripeConnected = !!(organizer == null ? void 0 : organizer.stripe_connect_setup_complete);
  const showPayoutsSection = !!(account == null ? void 0 : account.is_saas_mode_enabled);
  const navItems = [{
    label: i18n._(
      /*i18n*/
      {
        id: "JZTQI0"
      }
    ),
    icon: IconArrowsHorizontal,
    onClick: openSwitchModal,
    isActive: () => false,
    showWhen: () => organizers && organizers.length > 1
  }, ...showPayoutsSection && !isStripeConnected ? [{
    label: i18n._(
      /*i18n*/
      {
        id: "pjkEcB"
      }
    )
  }, {
    link: "settings#payouts",
    label: i18n._(
      /*i18n*/
      {
        id: "TaWVGe"
      }
    ),
    icon: IconBrandStripe,
    isActive: () => false
  }] : [], {
    label: "Overview"
  }, {
    link: "dashboard",
    label: i18n._(
      /*i18n*/
      {
        id: "S3CZ5M"
      }
    ),
    icon: IconDashboard,
    isActive: (isActive) => isActive || /\/manage\/organizer(\/[^/]+)?\/?$/.test(location.pathname)
  }, {
    link: "reports",
    label: i18n._(
      /*i18n*/
      {
        id: "t9yxlZ"
      }
    ),
    icon: IconChartPie,
    isActive: (isActive) => isActive || location.pathname.includes("/report/")
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "wckWOP"
      }
    )
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
    link: "settings",
    label: i18n._(
      /*i18n*/
      {
        id: "Tz0i8g"
      }
    ),
    icon: IconSettings
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "xdA/+p"
      }
    )
  }, {
    link: "organizer-homepage-designer",
    label: i18n._(
      /*i18n*/
      {
        id: "PRuBTd"
      }
    ),
    icon: IconPaint
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "exYcTF"
      }
    )
  }, {
    link: "locations",
    label: i18n._(
      /*i18n*/
      {
        id: "VppBoU"
      }
    ),
    icon: IconMapPin
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "nbfdhU"
      }
    )
  }, {
    link: "webhooks",
    label: i18n._(
      /*i18n*/
      {
        id: "v1kQyJ"
      }
    ),
    icon: IconWebhook
  }];
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
  const navItemsWithLoading = navItems.map((item) => {
    if (!organizer) {
      return {
        ...item,
        loading: true
      };
    }
    return item;
  });
  const handleStatusToggle = () => {
    if (!isUserEmailVerfied) {
      openEmailVerificationModal();
      return;
    }
    const message = (organizer == null ? void 0 : organizer.status) === "LIVE" ? i18n._(
      /*i18n*/
      {
        id: "VDWChT"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "pWtQJM"
      }
    );
    confirmationDialog(message, () => {
      statusToggleMutation.mutate({
        organizerId,
        status: (organizer == null ? void 0 : organizer.status) === "LIVE" ? "DRAFT" : "LIVE"
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "rLHma1"
            }
          ));
        },
        onError: (error) => {
          var _a, _b;
          showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
            /*i18n*/
            {
              id: "o1my93"
            }
          ));
        }
      });
    });
  };
  const breadcrumbItems = [{
    link: `/manage/organizer/${organizerId}`,
    content: organizer == null ? void 0 : organizer.name
  }, {
    content: /* @__PURE__ */ jsxs("span", { className: classes.createEventBreadcrumb, onClick: () => setShowCreateEventModal(true), children: [
      /* @__PURE__ */ jsx(IconCalendarPlus, { size: 16 }),
      " ",
      i18n._(
        /*i18n*/
        {
          id: "uN355O"
        }
      )
    ] })
  }];
  const callouts = [{
    icon: /* @__PURE__ */ jsx(IconUsersGroup, { size: 20 }),
    heading: i18n._(
      /*i18n*/
      {
        id: "aH6ZIb"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "psqIm5"
      }
    ),
    buttonIcon: /* @__PURE__ */ jsx(IconUsersGroup, { size: 16 }),
    buttonText: i18n._(
      /*i18n*/
      {
        id: "KR0679"
      }
    ),
    onClick: () => {
      openCreateModal();
    },
    storageKey: `organizer-${organizerId}-team-callout-dismissed`
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AppLayout, { navItems: navItemsWithLoading, breadcrumbItems, entityType: "organizer", topBarContent: /* @__PURE__ */ jsx("div", { className: classes.statusToggleContainer, children: organizer && /* @__PURE__ */ jsx(TopBarButton, { onClick: handleStatusToggle, size: "sm", leftSection: (organizer == null ? void 0 : organizer.status) === "DRAFT" ? /* @__PURE__ */ jsx(IconEyeOff, { size: 16 }) : /* @__PURE__ */ jsx(IconEye, { size: 16 }), rightSection: /* @__PURE__ */ jsx(IconChevronRight, { size: 14 }), children: (organizer == null ? void 0 : organizer.status) === "DRAFT" ? /* @__PURE__ */ jsxs("span", { children: [
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
    ] }) }) }), breadcrumbContentRight: /* @__PURE__ */ jsx(Fragment, { children: organizer && !isMobile && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Button, { onClick: openShareModal, variant: "transparent", leftSection: /* @__PURE__ */ jsx(IconShare, { size: 16 }), children: [
      /* @__PURE__ */ jsx("span", { className: classes.shareButtonTextDesktop, children: i18n._(
        /*i18n*/
        {
          id: "hL7sDJ"
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: classes.shareButtonTextMobile, children: i18n._(
        /*i18n*/
        {
          id: "Z8lGw6"
        }
      ) })
    ] }) }) }), actionGroupContent: /* @__PURE__ */ jsx(Button, { component: NavLink, to: `/events/${organizerId}/${(organizer == null ? void 0 : organizer.slug) || ""}`, target: "_blank", variant: "transparent", className: classes.viewHomepageButton, leftSection: /* @__PURE__ */ jsx(IconExternalLink, { size: 17 }), title: i18n._(
      /*i18n*/
      {
        id: "9jnAcN"
      }
    ), children: /* @__PURE__ */ jsx("span", { className: classes.viewHomepageButtonTextDesktop, children: i18n._(
      /*i18n*/
      {
        id: "9jnAcN"
      }
    ) }) }), sidebarFooter: /* @__PURE__ */ jsx(SidebarCalloutQueue, { callouts }) }),
    createModalOpen && /* @__PURE__ */ jsx(InviteUserModal, { onClose: closeCreateModal }),
    switchOrganizerModalOpen && /* @__PURE__ */ jsx(SwitchOrganizerModal, { opened: switchOrganizerModalOpen, onClose: closeSwitchModal, onCreateOrganizer: () => setShowCreateOrganizerModal(true) }),
    showCreateOrganizerModal && /* @__PURE__ */ jsx(CreateOrganizerModal, { onClose: () => setShowCreateOrganizerModal(false) }),
    organizer && shareModalOpen && /* @__PURE__ */ jsx(ShareModal, { url: organizerHomepageUrl(organizer), title: organizer.name, modalTitle: i18n._(
      /*i18n*/
      {
        id: "hL7sDJ"
      }
    ), opened: shareModalOpen, onClose: closeShareModal }),
    showCreateEventModal && /* @__PURE__ */ jsx(CreateEventModal, { onClose: () => setShowCreateEventModal(false), organizerId }),
    /* @__PURE__ */ jsx(Modal, { opened: emailVerificationModalOpen, onClose: closeEmailVerificationModal, title: i18n._(
      /*i18n*/
      {
        id: "H/UMUG"
      }
    ), size: "md", centered: true, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
        /*i18n*/
        {
          id: "FVTVBy"
        }
      ) }),
      !emailConfirmationResent ? /* @__PURE__ */ jsx(Button, { variant: "light", onClick: () => {
        handleEmailConfirmationResend();
      }, loading: resendEmailConfirmationMutation.isPending, children: i18n._(
        /*i18n*/
        {
          id: "bxoWpz"
        }
      ) }) : /* @__PURE__ */ jsx(Text, { size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "7+grte"
        }
      ) })
    ] }) })
  ] });
};
export {
  OrganizerLayout as default
};

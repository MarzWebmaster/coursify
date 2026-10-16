import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Menu, UnstyledButton, Avatar, Button } from "@mantine/core";
import { u as useGetMe, a as getConfig, e as getInitials, s as setAuthToken, G as GET_ME_QUERY_KEY } from "../entry.server.js";
import { IconUser, IconSettingsCog, IconUsers, IconShield, IconLifebuoy, IconPlus, IconLogout, IconUserShield, IconTrash } from "@tabler/icons-react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { a as authClient } from "./auth.client-Bgg-Rraf.js";
import { useDisclosure } from "@mantine/hooks";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { C as CreateOrganizerModal } from "./index-BTV1mmSF.js";
import { Trans } from "@lingui/react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { p as prettyDate } from "./dates-CbVpwZeX.js";
import { useState } from "react";
import { a as announcementClient, A as AnnouncementBanner, b as AnnouncementModal } from "./AnnouncementModal-BnhI_3XO.js";
const aboutIframe = "_aboutIframe_1k71e_1";
const aboutContainer = "_aboutContainer_1k71e_12";
const classes$2 = {
  aboutIframe,
  aboutContainer
};
const AboutModal = ({
  onClose
}) => {
  return /* @__PURE__ */ jsx(Modal, { onClose, opened: true, children: /* @__PURE__ */ jsx("div", { className: classes$2.aboutContainer, children: /* @__PURE__ */ jsx("iframe", { src: "https://coursify.guru/about-embedded", className: classes$2.aboutIframe, title: "About", allowFullScreen: true }) }) });
};
const GlobalMenu = () => {
  const {
    data: me
  } = useGetMe();
  const [aboutModalOpen, {
    open: openAboutModal,
    close: closeAboutModal
  }] = useDisclosure(false);
  const [createOrganizerModalOpen, {
    open: openCreateOrganizerModal,
    close: closeCreateOrganizerModal
  }] = useDisclosure(false);
  const links = [{
    label: i18n._(
      /*i18n*/
      {
        id: "hKtWk2"
      }
    ),
    icon: IconUser,
    link: "/manage/profile"
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "Puv7+X"
      }
    ),
    icon: IconSettingsCog,
    link: `/account/settings`
  }];
  if ((me == null ? void 0 : me.role) === "ADMIN" || (me == null ? void 0 : me.role) === "SUPERADMIN") {
    links.push({
      label: i18n._(
        /*i18n*/
        {
          id: "yDOdwQ"
        }
      ),
      icon: IconUsers,
      link: `/account/users`
    });
  }
  if ((me == null ? void 0 : me.role) === "SUPERADMIN") {
    links.push({
      label: i18n._(
        /*i18n*/
        {
          id: "0Zypnp"
        }
      ),
      icon: IconShield,
      link: `/admin`
    });
  }
  if (!getConfig("VITE_HIDE_ABOUT_LINK")) {
    links.push({
      label: `About & Support`,
      icon: IconLifebuoy,
      onClick: openAboutModal
    });
  }
  links.push({
    label: i18n._(
      /*i18n*/
      {
        id: "kpJAeS"
      }
    ),
    icon: IconPlus,
    onClick: (event) => {
      event.preventDefault();
      openCreateOrganizerModal();
    }
  });
  links.push({
    label: i18n._(
      /*i18n*/
      {
        id: "nOhz3x"
      }
    ),
    icon: IconLogout,
    onClick: async (event) => {
      event.preventDefault();
      await authClient.logout();
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(UnstyledButton, { children: /* @__PURE__ */ jsx(Avatar, { color: "primary.1", radius: "xl", children: me ? getInitials(me.first_name + " " + me.last_name) : ".." }) }) }),
      /* @__PURE__ */ jsx(Menu.Dropdown, { children: links.map((link) => /* @__PURE__ */ jsx(NavLink, { onClick: link.onClick, to: link.link ?? "#", target: link.target ?? "", children: /* @__PURE__ */ jsx(Menu.Item, { component: "div", leftSection: /* @__PURE__ */ jsx(link.icon, {}), children: link.label }) }, link.label)) })
    ] }),
    aboutModalOpen && /* @__PURE__ */ jsx(AboutModal, { onClose: closeAboutModal }),
    createOrganizerModalOpen && /* @__PURE__ */ jsx(CreateOrganizerModal, { onClose: closeCreateOrganizerModal })
  ] });
};
const useStopImpersonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminClient.stopImpersonation(),
    onSuccess: (response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        setAuthToken(response.token);
      }
      queryClient.invalidateQueries({
        queryKey: [GET_ME_QUERY_KEY]
      });
    }
  });
};
const banner$1 = "_banner_4h0ob_1";
const content$1 = "_content_4h0ob_23";
const icon$1 = "_icon_4h0ob_36";
const text$1 = "_text_4h0ob_40";
const userName = "_userName_4h0ob_51";
const button$1 = "_button_4h0ob_55";
const classes$1 = {
  banner: banner$1,
  content: content$1,
  icon: icon$1,
  text: text$1,
  userName,
  button: button$1
};
const ImpersonationBanner = () => {
  const {
    data: user
  } = useGetMe();
  const stopImpersonationMutation = useStopImpersonation();
  const navigate = useNavigate();
  if (!(user == null ? void 0 : user.is_impersonating)) {
    return null;
  }
  const handleStopImpersonation = () => {
    stopImpersonationMutation.mutate(void 0, {
      onSuccess: (response) => {
        showSuccess(response.message || i18n._(
          /*i18n*/
          {
            id: "IMwcdR"
          }
        ));
        navigate(response.redirect_url || "/admin/users");
      },
      onError: (error) => {
        var _a, _b;
        showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "QXgjH0"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: classes$1.banner, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$1.content, children: [
      /* @__PURE__ */ jsx(IconUserShield, { size: 24, className: classes$1.icon }),
      /* @__PURE__ */ jsx("span", { className: classes$1.text, children: /* @__PURE__ */ jsx(Trans, { id: "QlSZU0", values: {
        0: user.full_name,
        1: user.email
      }, components: {
        0: /* @__PURE__ */ jsx("span", { className: classes$1.userName })
      } }) })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "white", color: "orange", size: "sm", onClick: handleStopImpersonation, loading: stopImpersonationMutation.isPending, className: classes$1.button, children: i18n._(
      /*i18n*/
      {
        id: "wuV0bK"
      }
    ) })
  ] });
};
const banner = "_banner_zd9z0_1";
const content = "_content_zd9z0_23";
const icon = "_icon_zd9z0_36";
const text = "_text_zd9z0_40";
const date = "_date_zd9z0_51";
const button = "_button_zd9z0_55";
const classes = {
  banner,
  content,
  icon,
  text,
  date,
  button
};
const PendingDeletionBanner = () => {
  const {
    data: account
  } = useGetAccount();
  const navigate = useNavigate();
  if (!(account == null ? void 0 : account.deletion_request)) {
    return null;
  }
  const scheduledDate = prettyDate(account.deletion_request.scheduled_deletion_at, account.timezone || "UTC");
  return /* @__PURE__ */ jsxs("div", { className: classes.banner, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
      /* @__PURE__ */ jsx(IconTrash, { size: 24, className: classes.icon }),
      /* @__PURE__ */ jsx("span", { className: classes.text, children: /* @__PURE__ */ jsx(Trans, { id: "zfNCE8", values: {
        scheduledDate
      }, components: {
        0: /* @__PURE__ */ jsx("span", { className: classes.date })
      } }) })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "white", color: "red", size: "sm", onClick: () => navigate("/account/danger-zone"), className: classes.button, "data-testid": "pending-deletion-banner-button", children: i18n._(
      /*i18n*/
      {
        id: "lUjTpS"
      }
    ) })
  ] });
};
const GET_ACTIVE_ANNOUNCEMENTS_QUERY_KEY = ["announcements", "active"];
const useGetActiveAnnouncements = (enabled) => {
  const {
    data: me
  } = useGetMe();
  return useQuery({
    queryKey: GET_ACTIVE_ANNOUNCEMENTS_QUERY_KEY,
    queryFn: async () => {
      const {
        data
      } = await announcementClient.active();
      return data;
    },
    enabled: enabled && !!me && !me.is_impersonating,
    staleTime: 5 * 60 * 1e3,
    refetchOnWindowFocus: false,
    retry: false
  });
};
const useDismissAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (announcementId) => announcementClient.dismiss(announcementId),
    onMutate: async (announcementId) => {
      await queryClient.cancelQueries({
        queryKey: GET_ACTIVE_ANNOUNCEMENTS_QUERY_KEY
      });
      queryClient.setQueryData(GET_ACTIVE_ANNOUNCEMENTS_QUERY_KEY, (announcements) => announcements == null ? void 0 : announcements.filter((announcement) => announcement.id !== announcementId));
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ACTIVE_ANNOUNCEMENTS_QUERY_KEY
      });
    }
  });
};
const sessionHiddenIds = /* @__PURE__ */ new Set();
const sessionClosedModalIds = /* @__PURE__ */ new Set();
const AnnouncementDisplay = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const {
    data: announcements
  } = useGetActiveAnnouncements(!isAdminRoute);
  const dismissMutation = useDismissAnnouncement();
  const [, setRenderCount] = useState(0);
  const rerender = () => setRenderCount((count) => count + 1);
  if (isAdminRoute || !(announcements == null ? void 0 : announcements.length)) {
    return null;
  }
  const isPending = (announcement) => !sessionHiddenIds.has(announcement.id);
  const banner2 = announcements.filter(isPending).find((a) => a.display_type === "BANNER");
  const modal = announcements.filter(isPending).find((a) => a.display_type === "MODAL");
  const showModal = !!modal && !sessionClosedModalIds.has(modal.id);
  const dismiss = (announcement) => {
    sessionHiddenIds.add(announcement.id);
    rerender();
    dismissMutation.mutate(announcement.id, {
      onError: () => {
        sessionHiddenIds.delete(announcement.id);
        rerender();
      }
    });
  };
  const closeModal = (announcement) => {
    sessionClosedModalIds.add(announcement.id);
    rerender();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    banner2 && !showModal && /* @__PURE__ */ jsx(AnnouncementBanner, { announcement: banner2, onDismiss: () => dismiss(banner2) }),
    showModal && /* @__PURE__ */ jsx(AnnouncementModal, { announcement: modal, onDismiss: () => dismiss(modal), onClose: () => closeModal(modal) })
  ] });
};
export {
  AnnouncementDisplay as A,
  GlobalMenu as G,
  ImpersonationBanner as I,
  PendingDeletionBanner as P
};

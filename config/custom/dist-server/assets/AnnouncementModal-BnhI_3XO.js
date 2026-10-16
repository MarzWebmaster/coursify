import { f as api } from "../entry.server.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Button, ActionIcon, Modal } from "@mantine/core";
import { IconSpeakerphone, IconX } from "@tabler/icons-react";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
const announcementClient = {
  all: async (params = {}) => {
    const response = await api.get("admin/announcements", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0
      }
    });
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("admin/announcements", data);
    return response.data;
  },
  update: async (announcementId, data) => {
    const response = await api.put(`admin/announcements/${announcementId}`, data);
    return response.data;
  },
  delete: async (announcementId) => {
    const response = await api.delete(`admin/announcements/${announcementId}`);
    return response.data;
  },
  active: async () => {
    const response = await api.get("announcements/active");
    return response.data;
  },
  dismiss: async (announcementId) => {
    const response = await api.post(`announcements/${announcementId}/dismiss`);
    return response.data;
  }
};
const banner = "_banner_lla4m_1";
const bannerIcon = "_bannerIcon_lla4m_31";
const bannerText = "_bannerText_lla4m_36";
const bannerTitle = "_bannerTitle_lla4m_50";
const bannerContent = "_bannerContent_lla4m_56";
const bannerActions = "_bannerActions_lla4m_69";
const modal = "_modal_lla4m_77";
const modalContent = "_modalContent_lla4m_81";
const modalEmoji = "_modalEmoji_lla4m_89";
const modalTitle = "_modalTitle_lla4m_93";
const modalBody = "_modalBody_lla4m_100";
const modalActions = "_modalActions_lla4m_119";
const classes = {
  banner,
  bannerIcon,
  bannerText,
  bannerTitle,
  bannerContent,
  bannerActions,
  modal,
  modalContent,
  modalEmoji,
  modalTitle,
  modalBody,
  modalActions
};
const AnnouncementBanner = ({
  announcement,
  onDismiss
}) => /* @__PURE__ */ jsxs("div", { className: classes.banner, role: "status", "data-testid": "announcement-banner", children: [
  /* @__PURE__ */ jsx(IconSpeakerphone, { size: 22, className: classes.bannerIcon }),
  /* @__PURE__ */ jsxs("div", { className: classes.bannerText, children: [
    /* @__PURE__ */ jsx("span", { className: classes.bannerTitle, children: announcement.title }),
    /* @__PURE__ */ jsx("span", { className: classes.bannerContent, children: announcement.content })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: classes.bannerActions, children: [
    announcement.cta_label && announcement.cta_url && /* @__PURE__ */ jsx(Button, { component: "a", href: announcement.cta_url, target: "_blank", rel: "noopener noreferrer", size: "compact-sm", variant: "white", "data-testid": "announcement-banner-cta", children: announcement.cta_label }),
    /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", onClick: onDismiss, "aria-label": i18n._(
      /*i18n*/
      {
        id: "f15WLC"
      }
    ), "data-testid": "announcement-banner-dismiss", children: /* @__PURE__ */ jsx(IconX, { size: 18 }) })
  ] })
] });
const AnnouncementModal = ({
  announcement,
  onDismiss,
  onClose
}) => /* @__PURE__ */ jsx(Modal, { opened: true, onClose, centered: true, size: "md", withCloseButton: false, className: classes.modal, children: /* @__PURE__ */ jsxs("div", { className: classes.modalContent, "data-testid": "announcement-modal", children: [
  /* @__PURE__ */ jsx("div", { className: classes.modalEmoji, children: /* @__PURE__ */ jsx(BouncingEmoji, { emoji: announcement.emoji || "📣", size: 64 }) }),
  /* @__PURE__ */ jsx("div", { className: classes.modalTitle, children: announcement.title }),
  /* @__PURE__ */ jsx("div", { className: classes.modalBody, dangerouslySetInnerHTML: {
    __html: announcement.content
  } }),
  /* @__PURE__ */ jsxs("div", { className: classes.modalActions, children: [
    announcement.cta_label && announcement.cta_url && /* @__PURE__ */ jsx(Button, { component: "a", href: announcement.cta_url, target: "_blank", rel: "noopener noreferrer", size: "md", "data-testid": "announcement-modal-cta", children: announcement.cta_label }),
    /* @__PURE__ */ jsx(Button, { variant: "light", size: "md", onClick: onDismiss, "data-testid": "announcement-modal-dismiss", children: i18n._(
      /*i18n*/
      {
        id: "76gPWk"
      }
    ) })
  ] })
] }) });
export {
  AnnouncementBanner as A,
  announcementClient as a,
  AnnouncementModal as b
};

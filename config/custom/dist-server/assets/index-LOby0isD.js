import "./themeUtils-B--ztbrW.js";
import { IconBrandGithub, IconBrandVimeo, IconBrandTumblr, IconBrandFlickr, IconBrandWechat, IconBrandWeibo, IconBrandVk, IconBrandTelegram, IconBrandWhatsapp, IconBrandPinterest, IconBrandReddit, IconBrandTwitch, IconBrandSnapchat, IconBrandYoutube, IconBrandTiktok, IconBrandDiscord, IconBrandLinkedin, IconBrandX, IconBrandInstagram, IconBrandFacebook, IconEye } from "@tabler/icons-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Modal, TextInput, Textarea, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { M as organizerPublicClient } from "../entry.server.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { useCallback } from "react";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { u as useUpdateEventStatus } from "./useUpdateEventStatus-Ck9Vcq_R.js";
import { u as useUpdateOrganizerStatus } from "./useUpdateOrganizerStatus-CAGj3GlG.js";
import { t as trackEvent, A as AnalyticsEvents } from "./analytics-Cd4RPKa9.js";
const ensureHomepageFontLoaded = (fontValue) => {
  {
    return;
  }
};
const socialMediaConfig = {
  facebook: {
    icon: IconBrandFacebook,
    baseUrl: "https://facebook.com/"
  },
  instagram: {
    icon: IconBrandInstagram,
    baseUrl: "https://instagram.com/"
  },
  twitter: {
    icon: IconBrandX,
    baseUrl: "https://twitter.com/"
  },
  linkedin: {
    icon: IconBrandLinkedin,
    baseUrl: "https://linkedin.com/company/"
  },
  discord: {
    icon: IconBrandDiscord,
    baseUrl: "https://discord.com/users/"
  },
  tiktok: {
    icon: IconBrandTiktok,
    baseUrl: "https://tiktok.com/@"
  },
  youtube: {
    icon: IconBrandYoutube,
    baseUrl: "https://youtube.com/@"
  },
  snapchat: {
    icon: IconBrandSnapchat,
    baseUrl: "https://snapchat.com/add/"
  },
  twitch: {
    icon: IconBrandTwitch,
    baseUrl: "https://twitch.tv/"
  },
  reddit: {
    icon: IconBrandReddit,
    baseUrl: "https://reddit.com/u/"
  },
  pinterest: {
    icon: IconBrandPinterest,
    baseUrl: "https://pinterest.com/"
  },
  whatsapp: {
    icon: IconBrandWhatsapp,
    baseUrl: "https://wa.me/"
  },
  telegram: {
    icon: IconBrandTelegram,
    baseUrl: "https://t.me/"
  },
  vk: {
    icon: IconBrandVk,
    baseUrl: "https://vk.com/"
  },
  weibo: {
    icon: IconBrandWeibo,
    baseUrl: "https://weibo.com/"
  },
  wechat: {
    icon: IconBrandWechat,
    baseUrl: "#"
  },
  // WeChat doesn't have direct URLs
  flickr: {
    icon: IconBrandFlickr,
    baseUrl: "https://flickr.com/people/"
  },
  tumblr: {
    icon: IconBrandTumblr,
    baseUrl: "https://tumblr.com/blog/"
  },
  vimeo: {
    icon: IconBrandVimeo,
    baseUrl: "https://vimeo.com/"
  },
  github: {
    icon: IconBrandGithub,
    baseUrl: "https://github.com/"
  }
};
const useContactOrganizer = () => {
  return useMutation({
    mutationFn: ({
      organizerId,
      contactData
    }) => organizerPublicClient.contactOrganizer(organizerId, contactData)
  });
};
const submitButton = "_submitButton_uratk_1";
const classes$1 = {
  submitButton
};
const ContactOrganizerModal = ({
  opened,
  onClose,
  organizer
}) => {
  const contactMutation = useContactOrganizer();
  const contactForm = useForm({
    initialValues: {
      name: "",
      email: "",
      message: ""
    },
    validateInputOnBlur: true,
    validate: {
      name: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "8/brI5"
        }
      ) : null,
      email: (value) => {
        if (!value) return i18n._(
          /*i18n*/
          {
            id: "ZsZeV2"
          }
        );
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return i18n._(
          /*i18n*/
          {
            id: "B2Tpo0"
          }
        );
        return null;
      },
      message: (value) => {
        if (value.length > 5e3) return i18n._(
          /*i18n*/
          {
            id: "48rf3i"
          }
        );
        return !value ? i18n._(
          /*i18n*/
          {
            id: "Vjat/X"
          }
        ) : null;
      }
    }
  });
  const handleContactSubmit = (values) => {
    contactMutation.mutate({
      organizerId: organizer.id,
      contactData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "ifRqmm"
          }
        ));
        onClose();
        contactForm.reset();
      },
      onError: (error) => {
        var _a, _b;
        showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "T6B2gk"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsx(Modal, { opened, onClose, title: i18n._(
    /*i18n*/
    {
      id: "LOFgda",
      values: {
        0: (organizer == null ? void 0 : organizer.name) || "Organizer"
      }
    }
  ), size: "md", className: classes$1.contactModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: contactForm.onSubmit(handleContactSubmit), children: [
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "/Rj5P4"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "n9V+ps"
        }
      ), required: true, ...contactForm.getInputProps("name") }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "nBqgQb"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "C3nD/1"
        }
      ), required: true, type: "email", ...contactForm.getInputProps("email") })
    ] }),
    /* @__PURE__ */ jsx(Textarea, { label: i18n._(
      /*i18n*/
      {
        id: "xDAtGP"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "EpknJA"
      }
    ), required: true, minRows: 4, autosize: true, maxLength: 5001, mb: "md", ...contactForm.getInputProps("message") }),
    /* @__PURE__ */ jsxs(Group, { justify: "flex-end", children: [
      /* @__PURE__ */ jsx(Button, { variant: "subtle", onClick: onClose, className: classes$1.cancelButton, children: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: classes$1.submitButton, loading: contactMutation.isPending, disabled: contactMutation.isPending, children: i18n._(
        /*i18n*/
        {
          id: "M/WIer"
        }
      ) })
    ] })
  ] }) });
};
const removeTransparency = (color) => {
  color = color.trim();
  const rgbaMatch = color.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i);
  if (rgbaMatch) {
    const [_, r, g, b, a] = rgbaMatch;
    if (a !== void 0 && parseFloat(a) < 1) {
      return `rgb(${r}, ${g}, ${b})`;
    }
    return color;
  }
  const hex8Match = color.match(/^#([0-9a-f]{8})$/i);
  if (hex8Match) {
    const [_, hex] = hex8Match;
    const alpha = parseInt(hex.slice(6, 8), 16);
    if (alpha < 255) {
      return `#${hex.slice(0, 6)}`;
    }
    return color;
  }
  const hex4Match = color.match(/^#([0-9a-f]{4})$/i);
  if (hex4Match) {
    const [_, hex] = hex4Match;
    const alpha = parseInt(hex[3] + hex[3], 16);
    if (alpha < 255) {
      return `#${hex.slice(0, 3)}`;
    }
    return color;
  }
  return color;
};
const banner = "_banner_13hbr_1";
const content = "_content_13hbr_27";
const message = "_message_13hbr_41";
const publishButton = "_publishButton_13hbr_52";
const classes = {
  banner,
  content,
  message,
  publishButton
};
const StatusToggle = ({
  entityType,
  entityId,
  currentStatus,
  onSuccess
}) => {
  const eventStatusMutation = useUpdateEventStatus();
  const organizerStatusMutation = useUpdateOrganizerStatus();
  const mutation = entityType === "event" ? eventStatusMutation : organizerStatusMutation;
  const handleToggle = useCallback(() => {
    const isDraft = currentStatus === "DRAFT";
    const newStatus = isDraft ? "LIVE" : "DRAFT";
    const confirmMessage = isDraft ? entityType === "event" ? i18n._(
      /*i18n*/
      {
        id: "WFHOlF"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "4TNVdy"
      }
    ) : entityType === "event" ? i18n._(
      /*i18n*/
      {
        id: "ExDt3P"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "5Qmxo/"
      }
    );
    confirmationDialog(confirmMessage, () => {
      const mutationParams = entityType === "event" ? {
        eventId: entityId,
        status: newStatus
      } : {
        organizerId: entityId,
        status: newStatus
      };
      mutation.mutate(mutationParams, {
        onSuccess: () => {
          if (entityType === "event" && newStatus === "LIVE") {
            trackEvent(AnalyticsEvents.EVENT_PUBLISHED);
          }
          const successMessage = entityType === "event" ? i18n._(
            /*i18n*/
            {
              id: "btxLWj"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "rLHma1"
            }
          );
          showSuccess(successMessage);
          onSuccess == null ? void 0 : onSuccess();
        },
        onError: (error) => {
          var _a, _b;
          const errorMessage = ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || (entityType === "event" ? i18n._(
            /*i18n*/
            {
              id: "4/If97"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "o1my93"
            }
          ));
          showError(errorMessage);
        }
      });
    });
  }, [entityType, entityId, currentStatus, mutation]);
  if (currentStatus === "LIVE") {
    return null;
  }
  const message2 = entityType === "event" ? i18n._(
    /*i18n*/
    {
      id: "YClrdK"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "lyD7rQ"
    }
  );
  return /* @__PURE__ */ jsx("div", { className: classes.banner, children: /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
    /* @__PURE__ */ jsx("span", { className: classes.message, children: message2 }),
    /* @__PURE__ */ jsx(Button, { onClick: handleToggle, loading: mutation.isPending, size: "xs", variant: "white", leftSection: /* @__PURE__ */ jsx(IconEye, { size: 14 }), className: classes.publishButton, children: i18n._(
      /*i18n*/
      {
        id: "EEYbdt"
      }
    ) })
  ] }) });
};
export {
  ContactOrganizerModal as C,
  StatusToggle as S,
  ensureHomepageFontLoaded as e,
  removeTransparency as r,
  socialMediaConfig as s
};

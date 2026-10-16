import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState } from "react";
import { Modal, Tabs, Stack, Button, UnstyledButton, Text, Paper, TextInput, CopyButton, Tooltip } from "@mantine/core";
import { IconShare, IconQrcode, IconLink, IconBrandX, IconBrandLinkedin, IconBrandFacebook, IconBrandWhatsapp, IconBrandTelegram, IconBrandReddit, IconBrandPinterest, IconMail, IconDownload, IconCheck, IconCopy } from "@tabler/icons-react";
import QRCode from "react-qr-code";
const modal = "_modal_xynms_1";
const tabsContent = "_tabsContent_xynms_5";
const socialGrid = "_socialGrid_xynms_9";
const socialButton = "_socialButton_xynms_20";
const socialIcon = "_socialIcon_xynms_43";
const socialLabel = "_socialLabel_xynms_54";
const qrContainer = "_qrContainer_xynms_60";
const qrCodeWrapper = "_qrCodeWrapper_xynms_68";
const urlSection = "_urlSection_xynms_76";
const nativeShareButton = "_nativeShareButton_xynms_84";
const helperText = "_helperText_xynms_91";
const classes = {
  modal,
  tabsContent,
  socialGrid,
  socialButton,
  socialIcon,
  socialLabel,
  qrContainer,
  qrCodeWrapper,
  urlSection,
  nativeShareButton,
  helperText
};
const ShareModal = ({
  opened,
  onClose,
  url,
  title,
  modalTitle = i18n._(
    /*i18n*/
    {
      id: "Z8lGw6"
    }
  ),
  shareText
}) => {
  const [activeTab, setActiveTab] = useState("share");
  const shareTextContent = shareText || title;
  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: shareTextContent,
        url
      });
      onClose();
    } catch (error) {
      console.error("Share failed:", error);
    }
  };
  const socialPlatforms = [{
    name: "X",
    icon: IconBrandX,
    color: "#000000",
    shareUrl: (text, shareUrl) => `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`
  }, {
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "#0077b5",
    shareUrl: (_text, shareUrl) => `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
  }, {
    name: "Facebook",
    icon: IconBrandFacebook,
    color: "#1877f2",
    shareUrl: (_text, shareUrl) => `https://www.facebook.com/sharer.php?u=${shareUrl}`
  }, {
    name: "WhatsApp",
    icon: IconBrandWhatsapp,
    color: "#25d366",
    shareUrl: (text, shareUrl) => `https://api.whatsapp.com/send?text=${text}%20${shareUrl}`
  }, {
    name: "Telegram",
    icon: IconBrandTelegram,
    color: "#0088cc",
    shareUrl: (text, shareUrl) => `https://t.me/share/url?url=${shareUrl}&text=${text}`
  }, {
    name: "Reddit",
    icon: IconBrandReddit,
    color: "#ff4500",
    shareUrl: (text, shareUrl) => `https://reddit.com/submit?url=${shareUrl}&title=${text}`
  }, {
    name: "Pinterest",
    icon: IconBrandPinterest,
    color: "#bd081c",
    shareUrl: (_text, shareUrl) => `https://pinterest.com/pin/create/button/?url=${shareUrl}`
  }, {
    name: "Email",
    icon: IconMail,
    color: "#6b7280",
    shareUrl: (text, shareUrl) => `mailto:?subject=${text}&body=${shareUrl}`,
    isEmail: true
  }];
  const handleSocialShare = (platform) => {
    const text = encodeURIComponent(shareTextContent);
    const encodedUrl = encodeURIComponent(url);
    const shareUrl = platform.shareUrl(text, encodedUrl);
    if (platform.isEmail) {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };
  const downloadQR = () => {
    const svg = document.getElementById("share-qr-code");
    if (!svg) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx == null ? void 0 : ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${title}-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    const svgData = new XMLSerializer().serializeToString(svg);
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };
  return /* @__PURE__ */ jsx(Modal, { opened, onClose, title: modalTitle, centered: true, size: "lg", className: classes.modal, children: /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onChange: setActiveTab, children: [
    /* @__PURE__ */ jsxs(Tabs.List, { children: [
      /* @__PURE__ */ jsx(Tabs.Tab, { value: "share", leftSection: /* @__PURE__ */ jsx(IconShare, { size: 16 }), children: i18n._(
        /*i18n*/
        {
          id: "Z8lGw6"
        }
      ) }),
      /* @__PURE__ */ jsx(Tabs.Tab, { value: "qr", leftSection: /* @__PURE__ */ jsx(IconQrcode, { size: 16 }), children: i18n._(
        /*i18n*/
        {
          id: "toutGW"
        }
      ) }),
      /* @__PURE__ */ jsx(Tabs.Tab, { value: "url", leftSection: /* @__PURE__ */ jsx(IconLink, { size: 16 }), children: i18n._(
        /*i18n*/
        {
          id: "ENCIQz"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.tabsContent, children: [
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "share", pt: "lg", children: /* @__PURE__ */ jsxs(Stack, { children: [
        navigator.share && /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", leftSection: /* @__PURE__ */ jsx(IconShare, { size: 20 }), onClick: handleNativeShare, className: classes.nativeShareButton, children: i18n._(
          /*i18n*/
          {
            id: "Z8lGw6"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes.socialGrid, children: socialPlatforms.map((platform) => /* @__PURE__ */ jsxs(UnstyledButton, { onClick: () => handleSocialShare(platform), className: classes.socialButton, children: [
          /* @__PURE__ */ jsx("div", { className: classes.socialIcon, style: {
            color: platform.color
          }, children: /* @__PURE__ */ jsx(platform.icon, { size: 24, stroke: 1.5 }) }),
          /* @__PURE__ */ jsx(Text, { className: classes.socialLabel, children: platform.name })
        ] }, platform.name)) })
      ] }) }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "qr", pt: "lg", children: /* @__PURE__ */ jsxs("div", { className: classes.qrContainer, children: [
        /* @__PURE__ */ jsx(Paper, { className: classes.qrCodeWrapper, children: /* @__PURE__ */ jsx(QRCode, { id: "share-qr-code", value: url, size: 200, level: "H" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "light", leftSection: /* @__PURE__ */ jsx(IconDownload, { size: 16 }), onClick: downloadQR, children: i18n._(
          /*i18n*/
          {
            id: "QIodqd"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "url", pt: "lg", children: /* @__PURE__ */ jsxs("div", { className: classes.urlSection, children: [
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "QkLf4H"
          }
        ), value: url, readOnly: true, styles: {
          input: {
            paddingRight: "120px"
          }
        }, rightSectionWidth: "auto", rightSection: /* @__PURE__ */ jsx(CopyButton, { value: url, timeout: 2e3, children: ({
          copied,
          copy
        }) => /* @__PURE__ */ jsx(Tooltip, { label: copied ? i18n._(
          /*i18n*/
          {
            id: "PiH3UR"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "/4gGIX"
          }
        ), children: /* @__PURE__ */ jsx(Button, { variant: "light", color: copied ? "teal" : "gray", onClick: copy, leftSection: copied ? /* @__PURE__ */ jsx(IconCheck, { size: 16 }) : /* @__PURE__ */ jsx(IconCopy, { size: 16 }), children: copied ? i18n._(
          /*i18n*/
          {
            id: "6V3Ea3"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "he3ygx"
          }
        ) }) }) }) }),
        /* @__PURE__ */ jsx(Text, { className: classes.helperText, mt: "md", children: i18n._(
          /*i18n*/
          {
            id: "y22tv0"
          }
        ) })
      ] }) })
    ] })
  ] }) });
};
export {
  ShareModal as S
};

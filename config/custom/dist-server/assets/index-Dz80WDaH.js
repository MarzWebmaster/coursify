import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Modal, Text, TextInput, CopyButton, Tooltip, Button, Skeleton, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconCopy, IconExternalLink, IconShare, IconCode, IconCreditCardOff, IconTicketOff, IconCalendarOff } from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router";
import { S as ShareModal } from "./index-BwSXzvSP.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { E as EventType, P as ProductPriceType } from "./types-CqPWB-a5.js";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { u as useGetOrganizer } from "./useGetOrganizer-DMDsW5DW.js";
import { u as useGetEventProductCategories } from "./useGetProductCategories-BfShm84T.js";
import { u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { u as useUpdateEventStatus } from "./useUpdateEventStatus-Ck9Vcq_R.js";
import { a as showError } from "./notifications-Coh3Ef-t.js";
const modal$1 = "_modal_1ciha_1";
const content$1 = "_content_1ciha_5";
const celebrationEmoji = "_celebrationEmoji_1ciha_13";
const title$1 = "_title_1ciha_36";
const subtitle$1 = "_subtitle_1ciha_43";
const urlSection = "_urlSection_1ciha_49";
const urlInput = "_urlInput_1ciha_54";
const actions = "_actions_1ciha_60";
const actionButton = "_actionButton_1ciha_68";
const doneButton = "_doneButton_1ciha_72";
const classes$1 = {
  modal: modal$1,
  content: content$1,
  celebrationEmoji,
  title: title$1,
  subtitle: subtitle$1,
  urlSection,
  urlInput,
  actions,
  actionButton,
  doneButton
};
const EventLiveCelebrationModal = ({
  opened,
  onClose,
  url,
  eventTitle,
  eventId
}) => {
  const [shareModalOpened, {
    open: openShareModal,
    close: closeShareModal
  }] = useDisclosure(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Modal, { opened, onClose, centered: true, size: "md", withCloseButton: false, className: classes$1.modal, children: /* @__PURE__ */ jsxs("div", { className: classes$1.content, children: [
      /* @__PURE__ */ jsx("div", { className: classes$1.celebrationEmoji, children: "🎉" }),
      /* @__PURE__ */ jsx(Text, { className: classes$1.title, children: i18n._(
        /*i18n*/
        {
          id: "GG1fRP"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { className: classes$1.subtitle, children: i18n._(
        /*i18n*/
        {
          id: "x3wVFc"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$1.urlSection, children: /* @__PURE__ */ jsx(TextInput, { value: url, readOnly: true, size: "md", classNames: {
        input: classes$1.urlInput
      }, rightSectionWidth: 100, rightSection: /* @__PURE__ */ jsx(CopyButton, { value: url, timeout: 2e3, children: ({
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
          id: "y1eoq1"
        }
      ), children: /* @__PURE__ */ jsx(Button, { variant: "light", color: copied ? "teal" : "gray", onClick: copy, size: "sm", leftSection: copied ? /* @__PURE__ */ jsx(IconCheck, { size: 14 }) : /* @__PURE__ */ jsx(IconCopy, { size: 14 }), children: copied ? i18n._(
        /*i18n*/
        {
          id: "6V3Ea3"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "he3ygx"
        }
      ) }) }) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.actions, children: [
        /* @__PURE__ */ jsx(Button, { component: "a", href: url, target: "_blank", variant: "light", leftSection: /* @__PURE__ */ jsx(IconExternalLink, { size: 16 }), className: classes$1.actionButton, children: i18n._(
          /*i18n*/
          {
            id: "c6SXHN"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { variant: "light", leftSection: /* @__PURE__ */ jsx(IconShare, { size: 16 }), onClick: openShareModal, className: classes$1.actionButton, children: i18n._(
          /*i18n*/
          {
            id: "B2V3cA"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { component: NavLink, to: `/manage/event/${eventId}/widget`, variant: "light", leftSection: /* @__PURE__ */ jsx(IconCode, { size: 16 }), onClick: onClose, className: classes$1.actionButton, children: i18n._(
          /*i18n*/
          {
            id: "FSN4TS"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "filled", size: "md", className: classes$1.doneButton, children: i18n._(
        /*i18n*/
        {
          id: "DPfwMq"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(ShareModal, { url, title: eventTitle, modalTitle: i18n._(
      /*i18n*/
      {
        id: "B2V3cA"
      }
    ), opened: shareModalOpened, onClose: closeShareModal })
  ] });
};
const modal = "_modal_h51lf_1";
const content = "_content_h51lf_5";
const title = "_title_h51lf_13";
const subtitle = "_subtitle_h51lf_20";
const skeleton = "_skeleton_h51lf_26";
const checks = "_checks_h51lf_30";
const check = "_check_h51lf_30";
const checkAction = "_checkAction_h51lf_52";
const blocking = "_blocking_h51lf_61";
const checkIcon = "_checkIcon_h51lf_65";
const warning = "_warning_h51lf_69";
const checkText = "_checkText_h51lf_82";
const checkTitle = "_checkTitle_h51lf_89";
const checkDescription = "_checkDescription_h51lf_95";
const checkSecondaryLink = "_checkSecondaryLink_h51lf_101";
const publishButton = "_publishButton_h51lf_108";
const cancelButton = "_cancelButton_h51lf_112";
const classes = {
  modal,
  content,
  title,
  subtitle,
  skeleton,
  checks,
  check,
  checkAction,
  blocking,
  checkIcon,
  warning,
  checkText,
  checkTitle,
  checkDescription,
  checkSecondaryLink,
  publishButton,
  cancelButton
};
const productRequiresPayment = (product) => {
  if (product.type === ProductPriceType.Free) {
    return false;
  }
  if (product.type === ProductPriceType.Donation) {
    return true;
  }
  return (product.prices ?? []).some((price) => (price.price ?? 0) > 0);
};
const PublishEventModal = ({
  opened,
  onClose,
  event,
  onSuccess
}) => {
  var _a, _b, _c, _d, _e, _f;
  const navigate = useNavigate();
  const eventId = (_a = event.id) == null ? void 0 : _a.toString();
  const organizerId = event.organizer_id ?? ((_b = event.organizer) == null ? void 0 : _b.id);
  const isRecurring = event.type === EventType.RECURRING;
  const {
    data: eventSettings,
    isFetched: isSettingsFetched
  } = useGetEventSettings(eventId);
  const {
    data: organizer,
    isFetched: isOrganizerFetched
  } = useGetOrganizer(organizerId);
  const {
    data: productCategories,
    isFetched: isProductsFetched
  } = useGetEventProductCategories(eventId);
  const occurrencesQuery = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 1
  }, isRecurring);
  const statusMutation = useUpdateEventStatus();
  const products = ((_c = productCategories == null ? void 0 : productCategories.data) == null ? void 0 : _c.flatMap((category) => category.products ?? [])) ?? [];
  const hasProducts = products.length > 0;
  const hasPaidProducts = products.some(productRequiresPayment);
  const isStripeEnabled = !!((_d = eventSettings == null ? void 0 : eventSettings.payment_providers) == null ? void 0 : _d.includes("STRIPE"));
  const isStripeConnected = !!(organizer == null ? void 0 : organizer.stripe_connect_setup_complete);
  const hasOccurrences = (((_f = (_e = occurrencesQuery.data) == null ? void 0 : _e.data) == null ? void 0 : _f.length) ?? 0) > 0;
  const checksLoaded = isSettingsFetched && isOrganizerFetched && isProductsFetched && (!isRecurring || occurrencesQuery.isFetched);
  const checks2 = [];
  if (hasPaidProducts && isStripeEnabled && !isStripeConnected) {
    checks2.push({
      key: "stripe",
      blocking: true,
      icon: /* @__PURE__ */ jsx(IconCreditCardOff, { size: 18 }),
      title: i18n._(
        /*i18n*/
        {
          id: "/K4Vqr"
        }
      ),
      description: i18n._(
        /*i18n*/
        {
          id: "D8baxD"
        }
      ),
      actionLabel: i18n._(
        /*i18n*/
        {
          id: "pbAk7a"
        }
      ),
      actionUrl: `/manage/organizer/${organizerId}/settings#payouts`,
      secondaryActionLabel: i18n._(
        /*i18n*/
        {
          id: "eBskDE"
        }
      ),
      secondaryActionUrl: `/manage/event/${eventId}/settings#payment-settings`
    });
  }
  if (!hasProducts) {
    checks2.push({
      key: "tickets",
      blocking: false,
      icon: /* @__PURE__ */ jsx(IconTicketOff, { size: 18 }),
      title: i18n._(
        /*i18n*/
        {
          id: "debCrL"
        }
      ),
      description: i18n._(
        /*i18n*/
        {
          id: "kc4bIA"
        }
      ),
      actionLabel: i18n._(
        /*i18n*/
        {
          id: "BGD9Yt"
        }
      ),
      actionUrl: `/manage/event/${eventId}/products#create-product`
    });
  }
  if (isRecurring && !hasOccurrences) {
    checks2.push({
      key: "occurrences",
      blocking: false,
      icon: /* @__PURE__ */ jsx(IconCalendarOff, { size: 18 }),
      title: i18n._(
        /*i18n*/
        {
          id: "OtJSnL"
        }
      ),
      description: i18n._(
        /*i18n*/
        {
          id: "qEGn8I"
        }
      ),
      actionLabel: i18n._(
        /*i18n*/
        {
          id: "QeupRg"
        }
      ),
      actionUrl: `/manage/event/${eventId}/occurrences`
    });
  }
  const hasBlocker = checks2.some((check2) => check2.blocking);
  const hasWarning = checks2.some((check2) => !check2.blocking);
  const handleFix = (url) => {
    onClose();
    navigate(url);
  };
  const handlePublish = () => {
    statusMutation.mutate({
      eventId,
      status: "LIVE"
    }, {
      onSuccess,
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
  };
  return /* @__PURE__ */ jsx(Modal, { opened, onClose, centered: true, size: "md", withCloseButton: false, className: classes.modal, children: /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
    /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "🚀", size: 56 }),
    /* @__PURE__ */ jsx(Text, { className: classes.title, children: i18n._(
      /*i18n*/
      {
        id: "RENQ6j"
      }
    ) }),
    /* @__PURE__ */ jsx(Text, { className: classes.subtitle, children: i18n._(
      /*i18n*/
      {
        id: "L7nrC8"
      }
    ) }),
    !checksLoaded && /* @__PURE__ */ jsx(Skeleton, { height: 70, radius: "md", className: classes.skeleton }),
    checksLoaded && checks2.length > 0 && /* @__PURE__ */ jsx("div", { className: classes.checks, children: checks2.map((check2) => /* @__PURE__ */ jsxs("div", { className: `${classes.check} ${check2.blocking ? classes.blocking : classes.warning}`, children: [
      /* @__PURE__ */ jsx("div", { className: classes.checkIcon, children: check2.icon }),
      /* @__PURE__ */ jsxs("div", { className: classes.checkText, children: [
        /* @__PURE__ */ jsx("span", { className: classes.checkTitle, children: check2.title }),
        /* @__PURE__ */ jsx("span", { className: classes.checkDescription, children: check2.description }),
        check2.secondaryActionLabel && check2.secondaryActionUrl && /* @__PURE__ */ jsx(Anchor, { component: "button", type: "button", className: classes.checkSecondaryLink, onClick: () => handleFix(check2.secondaryActionUrl), children: check2.secondaryActionLabel })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", color: check2.blocking ? "red" : "yellow", className: classes.checkAction, onClick: () => handleFix(check2.actionUrl), children: check2.actionLabel })
    ] }, check2.key)) }),
    /* @__PURE__ */ jsxs(Button, { onClick: handlePublish, disabled: !checksLoaded || hasBlocker, loading: statusMutation.isPending, size: "md", className: classes.publishButton, "data-testid": "publish-event-confirm-button", children: [
      hasBlocker && i18n._(
        /*i18n*/
        {
          id: "rVogsf"
        }
      ),
      !hasBlocker && (hasWarning ? i18n._(
        /*i18n*/
        {
          id: "JcgJKc"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "evDBV8"
        }
      ))
    ] }),
    /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "subtle", color: "gray", className: classes.cancelButton, children: i18n._(
      /*i18n*/
      {
        id: "dEgA5A"
      }
    ) })
  ] }) });
};
export {
  EventLiveCelebrationModal as E,
  PublishEventModal as P
};

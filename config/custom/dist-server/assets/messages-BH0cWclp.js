import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams } from "react-router";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { useDisclosure } from "@mantine/hooks";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { Loader, Alert, Text, Badge, Avatar, Button, TextInput, CloseButton, ActionIcon, Tooltip } from "@mantine/core";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { m as messagesClient, a as GET_EVENT_MESSAGES_QUERY_KEY, b as useGetEventMessages, S as SendMessageModal } from "./index-7RPUkRz0.js";
import { r as relativeDate, d as dateToBrowserTz } from "./dates-CbVpwZeX.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { useState, useRef, useEffect, useCallback } from "react";
import { IconSend, IconSearch, IconMail, IconArrowLeft, IconClock, IconX } from "@tabler/icons-react";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { M as MessageType } from "./types-CqPWB-a5.js";
import { e as getInitials } from "../entry.server.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import "classnames";
import "./order.client-BmBVeAyF.js";
import "./index-CwjvB_vn.js";
import "@mantine/form";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./index-D4cOjjnu.js";
import "./index-gUnclHYL.js";
import "./useGetAccount-CGfwRfDK.js";
import "./useGetEventOccurrences-Ch0XNQBq.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "react-dom/server";
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
const GET_MESSAGE_RECIPIENTS_QUERY_KEY = "getMessageRecipients";
const useGetMessageRecipients = (eventId, messageId, pagination) => {
  return useQuery({
    queryKey: [GET_MESSAGE_RECIPIENTS_QUERY_KEY, eventId, messageId, pagination],
    queryFn: async () => await messagesClient.recipients(eventId, messageId, pagination),
    enabled: !!eventId && !!messageId
  });
};
const recipientRow = "_recipientRow_w9v1v_1";
const recipientEmail = "_recipientEmail_w9v1v_13";
const recipientRight = "_recipientRight_w9v1v_23";
const recipientDate = "_recipientDate_w9v1v_30";
const emptyState = "_emptyState_w9v1v_36";
const loadingState$1 = "_loadingState_w9v1v_43";
const headerCount = "_headerCount_w9v1v_50";
const classes$2 = {
  recipientRow,
  recipientEmail,
  recipientRight,
  recipientDate,
  emptyState,
  loadingState: loadingState$1,
  headerCount
};
const statusColor = (status) => {
  switch (status == null ? void 0 : status.toUpperCase()) {
    case "SENT":
      return "green";
    case "FAILED":
      return "red";
    default:
      return "gray";
  }
};
const MessageRecipientsModal = ({
  onClose,
  eventId,
  messageId
}) => {
  var _a, _b;
  const [page, setPage] = useState(1);
  const recipientsQuery = useGetMessageRecipients(eventId, messageId, {
    pageNumber: page,
    perPage: 100
  });
  const recipients = (_a = recipientsQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = recipientsQuery.data) == null ? void 0 : _b.meta;
  const total = pagination == null ? void 0 : pagination.total;
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "yPrbsy"
    }
  ), children: [
    recipientsQuery.isLoading && /* @__PURE__ */ jsx("div", { className: classes$2.loadingState, children: /* @__PURE__ */ jsx(Loader, { size: "sm" }) }),
    !!recipientsQuery.error && /* @__PURE__ */ jsx(Alert, { color: "red", radius: "md", children: i18n._(
      /*i18n*/
      {
        id: "lS9/aZ"
      }
    ) }),
    !recipientsQuery.isLoading && !recipientsQuery.error && recipients && recipients.length === 0 && /* @__PURE__ */ jsx("div", { className: classes$2.emptyState, children: /* @__PURE__ */ jsx(Text, { children: i18n._(
      /*i18n*/
      {
        id: "UW90md"
      }
    ) }) }),
    !recipientsQuery.isLoading && !recipientsQuery.error && recipients && recipients.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      total !== void 0 && /* @__PURE__ */ jsxs("div", { className: classes$2.headerCount, children: [
        total,
        " ",
        total === 1 ? i18n._(
          /*i18n*/
          {
            id: "7hPBBn"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "jp5bq8"
          }
        )
      ] }),
      recipients.map((recipient) => /* @__PURE__ */ jsxs("div", { className: classes$2.recipientRow, children: [
        /* @__PURE__ */ jsx("span", { className: classes$2.recipientEmail, children: recipient.recipient }),
        /* @__PURE__ */ jsxs("div", { className: classes$2.recipientRight, children: [
          /* @__PURE__ */ jsx(Badge, { size: "xs", color: statusColor(recipient.status), variant: "filled", children: recipient.status }),
          recipient.created_at && /* @__PURE__ */ jsx("span", { className: classes$2.recipientDate, children: relativeDate(recipient.created_at) })
        ] })
      ] }, recipient.id)),
      pagination && Number(pagination.last_page) > 1 && /* @__PURE__ */ jsx(Pagination, { value: page, onChange: setPage, total: Number(pagination.last_page), size: "sm" })
    ] })
  ] });
};
const listContainer = "_listContainer_osuhn_1";
const messageItem = "_messageItem_osuhn_7";
const selected = "_selected_osuhn_25";
const cancelled = "_cancelled_osuhn_30";
const itemContent = "_itemContent_osuhn_34";
const itemTopRow = "_itemTopRow_osuhn_42";
const sender = "_sender_osuhn_49";
const date = "_date_osuhn_58";
const subject = "_subject_osuhn_65";
const preview = "_preview_osuhn_74";
const itemBottomRow = "_itemBottomRow_osuhn_83";
const typeLabel$1 = "_typeLabel_osuhn_90";
const classes$1 = {
  listContainer,
  messageItem,
  selected,
  cancelled,
  itemContent,
  itemTopRow,
  sender,
  date,
  subject,
  preview,
  itemBottomRow,
  typeLabel: typeLabel$1
};
const statusBadgeColor = (status) => {
  switch (status) {
    case "SENT":
      return "green";
    case "PROCESSING":
      return "orange";
    case "SCHEDULED":
      return "blue";
    case "CANCELLED":
      return "gray";
    case "FAILED":
      return "red";
    default:
      return "orange";
  }
};
const typeLabel = (type) => {
  const map = {
    [MessageType.OrderOwnersWithProduct]: i18n._(
      /*i18n*/
      {
        id: "CxLoxM"
      }
    ),
    [MessageType.IndividualAttendees]: i18n._(
      /*i18n*/
      {
        id: "F1Xp97"
      }
    ),
    [MessageType.AllAttendees]: i18n._(
      /*i18n*/
      {
        id: "gKq1fa"
      }
    ),
    [MessageType.TicketHolders]: i18n._(
      /*i18n*/
      {
        id: "HGuXjF"
      }
    ),
    [MessageType.OrderOwner]: i18n._(
      /*i18n*/
      {
        id: "FaPYw+"
      }
    )
  };
  return map[type] || type;
};
const MessageItem = ({
  message,
  isSelected,
  onSelect
}) => {
  const isCancelled = message.status === "CANCELLED";
  const senderName = message.sent_by_user ? `${message.sent_by_user.first_name} ${message.sent_by_user.last_name}` : i18n._(
    /*i18n*/
    {
      id: "Ef7StM"
    }
  );
  const displayTimestamp = message.status === "SCHEDULED" || message.status === "CANCELLED" ? message.scheduled_at ?? message.sent_at ?? message.created_at : message.sent_at ?? message.created_at ?? message.scheduled_at;
  const displayDate = displayTimestamp ? relativeDate(displayTimestamp) : i18n._(
    /*i18n*/
    {
      id: "Ef7StM"
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: `${classes$1.messageItem} ${isSelected ? classes$1.selected : ""} ${isCancelled ? classes$1.cancelled : ""}`, onClick: onSelect, role: "option", "aria-selected": isSelected, tabIndex: 0, onKeyDown: (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  }, children: [
    /* @__PURE__ */ jsx(Avatar, { color: "grape", size: 36, radius: "xl", children: getInitials(senderName) }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.itemContent, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.itemTopRow, children: [
        /* @__PURE__ */ jsx("span", { className: classes$1.sender, children: senderName }),
        /* @__PURE__ */ jsx("span", { className: classes$1.date, children: displayDate })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes$1.subject, children: message.subject }),
      /* @__PURE__ */ jsx("div", { className: classes$1.preview, children: message.message_preview }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.itemBottomRow, children: [
        /* @__PURE__ */ jsx(Badge, { size: "xs", color: statusBadgeColor(message.status), variant: "outline", children: message.status }),
        /* @__PURE__ */ jsx("span", { className: classes$1.typeLabel, children: typeLabel(message.type) })
      ] })
    ] })
  ] });
};
const MessageList = ({
  messages,
  selectedId,
  onSelect
}) => {
  return /* @__PURE__ */ jsx("div", { className: classes$1.listContainer, role: "listbox", children: messages.map((message) => /* @__PURE__ */ jsx(MessageItem, { message, isSelected: message.id === selectedId, onSelect: () => onSelect(message) }, message.id)) });
};
const useCancelMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      messageId
    }) => messagesClient.cancel(eventId, messageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_MESSAGES_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const mailLayout = "_mailLayout_1foz3_1";
const listPanel = "_listPanel_1foz3_18";
const listHeader = "_listHeader_1foz3_40";
const listHeaderLeft = "_listHeaderLeft_1foz3_48";
const listHeading = "_listHeading_1foz3_54";
const messageCount = "_messageCount_1foz3_61";
const searchBar = "_searchBar_1foz3_71";
const listBody = "_listBody_1foz3_76";
const listFooter = "_listFooter_1foz3_101";
const previewPanel = "_previewPanel_1foz3_109";
const previewEmpty = "_previewEmpty_1foz3_118";
const previewHeader = "_previewHeader_1foz3_140";
const previewHeaderTop = "_previewHeaderTop_1foz3_147";
const backButton = "_backButton_1foz3_154";
const previewHeaderRight = "_previewHeaderRight_1foz3_163";
const previewSubject = "_previewSubject_1foz3_170";
const previewMeta = "_previewMeta_1foz3_180";
const previewSenderInfo = "_previewSenderInfo_1foz3_186";
const previewSenderName = "_previewSenderName_1foz3_191";
const previewRecipientType = "_previewRecipientType_1foz3_197";
const recipientLink = "_recipientLink_1foz3_203";
const recipientLinkDisabled = "_recipientLinkDisabled_1foz3_212";
const previewDate = "_previewDate_1foz3_218";
const previewBody = "_previewBody_1foz3_224";
const previewCard = "_previewCard_1foz3_247";
const previewContent = "_previewContent_1foz3_255";
const ghostList = "_ghostList_1foz3_276";
const ghostCta = "_ghostCta_1foz3_282";
const ghostRow = "_ghostRow_1foz3_300";
const ghostAvatar = "_ghostAvatar_1foz3_308";
const ghostLines = "_ghostLines_1foz3_316";
const ghostLineShort = "_ghostLineShort_1foz3_324";
const ghostLineLong = "_ghostLineLong_1foz3_331";
const ghostLineMed = "_ghostLineMed_1foz3_338";
const loadingState = "_loadingState_1foz3_345";
const scheduledInfo = "_scheduledInfo_1foz3_353";
const mobilePreviewActive = "_mobilePreviewActive_1foz3_376";
const classes = {
  mailLayout,
  listPanel,
  listHeader,
  listHeaderLeft,
  listHeading,
  messageCount,
  searchBar,
  listBody,
  listFooter,
  previewPanel,
  previewEmpty,
  previewHeader,
  previewHeaderTop,
  backButton,
  previewHeaderRight,
  previewSubject,
  previewMeta,
  previewSenderInfo,
  previewSenderName,
  previewRecipientType,
  recipientLink,
  recipientLinkDisabled,
  previewDate,
  previewBody,
  previewCard,
  previewContent,
  ghostList,
  ghostCta,
  ghostRow,
  ghostAvatar,
  ghostLines,
  ghostLineShort,
  ghostLineLong,
  ghostLineMed,
  loadingState,
  scheduledInfo,
  mobilePreviewActive
};
const MessagePreview = ({
  message,
  eventId,
  onBack,
  eventTimezone
}) => {
  const [recipientsOpen, {
    open: openRecipients,
    close: closeRecipients
  }] = useDisclosure(false);
  const cancelMutation = useCancelMessage();
  const senderName = message.sent_by_user ? `${message.sent_by_user.first_name} ${message.sent_by_user.last_name}` : i18n._(
    /*i18n*/
    {
      id: "Ef7StM"
    }
  );
  const displayTimestamp = message.status === "SCHEDULED" || message.status === "CANCELLED" ? message.scheduled_at ?? message.sent_at ?? message.created_at : message.sent_at ?? message.created_at ?? message.scheduled_at;
  const handleCancel = () => {
    if (!window.confirm(i18n._(
      /*i18n*/
      {
        id: "VkSk/i"
      }
    ))) {
      return;
    }
    cancelMutation.mutate({
      eventId,
      messageId: message.id
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "uQLXbS"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "SIHgVQ"
        }
      ))
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: classes.previewHeader, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.previewHeaderTop, children: [
        /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", className: classes.backButton, onClick: onBack, title: i18n._(
          /*i18n*/
          {
            id: "s5QRF3"
          }
        ), children: /* @__PURE__ */ jsx(IconArrowLeft, { size: 18 }) }),
        /* @__PURE__ */ jsxs("div", { className: classes.previewHeaderRight, children: [
          message.status === "SCHEDULED" && message.scheduled_at ? /* @__PURE__ */ jsxs("div", { className: classes.scheduledInfo, title: dateToBrowserTz(message.scheduled_at, eventTimezone), children: [
            /* @__PURE__ */ jsx(IconClock, { size: 14 }),
            i18n._(
              /*i18n*/
              {
                id: "4ba0NE"
              }
            ),
            " ",
            relativeDate(message.scheduled_at)
          ] }) : /* @__PURE__ */ jsx("span", { className: classes.previewDate, title: displayTimestamp ? dateToBrowserTz(displayTimestamp, eventTimezone) : void 0, children: displayTimestamp ? relativeDate(displayTimestamp) : i18n._(
            /*i18n*/
            {
              id: "Ef7StM"
            }
          ) }),
          /* @__PURE__ */ jsx(Badge, { size: "sm", color: statusBadgeColor(message.status), variant: "outline", children: message.status }),
          message.status === "SCHEDULED" && /* @__PURE__ */ jsxs(Button, { variant: "light", color: "red", size: "compact-xs", onClick: handleCancel, loading: cancelMutation.isPending, children: [
            /* @__PURE__ */ jsx(IconX, { size: 12 }),
            " ",
            i18n._(
              /*i18n*/
              {
                id: "dEgA5A"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.previewSubject, children: message.subject }),
      /* @__PURE__ */ jsxs("div", { className: classes.previewMeta, children: [
        /* @__PURE__ */ jsx(Avatar, { color: "grape", size: 36, radius: "xl", children: getInitials(senderName) }),
        /* @__PURE__ */ jsxs("div", { className: classes.previewSenderInfo, children: [
          /* @__PURE__ */ jsx("div", { className: classes.previewSenderName, children: senderName }),
          /* @__PURE__ */ jsxs("div", { className: classes.previewRecipientType, children: [
            i18n._(
              /*i18n*/
              {
                id: "/jQctM"
              }
            ),
            ": ",
            message.status === "SENT" || message.status === "FAILED" ? /* @__PURE__ */ jsx("span", { className: classes.recipientLink, onClick: openRecipients, role: "button", tabIndex: 0, onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openRecipients();
              }
            }, children: typeLabel(message.type) }) : /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "E1F5Ji"
              }
            ), withArrow: true, children: /* @__PURE__ */ jsx("span", { className: classes.recipientLinkDisabled, children: typeLabel(message.type) }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes.previewBody, children: /* @__PURE__ */ jsx("div", { className: classes.previewCard, children: /* @__PURE__ */ jsx("div", { className: classes.previewContent, dangerouslySetInnerHTML: {
      __html: message.message
    } }) }) }),
    recipientsOpen && /* @__PURE__ */ jsx(MessageRecipientsModal, { eventId, messageId: message.id, onClose: closeRecipients })
  ] });
};
const Messages = () => {
  var _a, _b;
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const [searchParams, setSearchParam] = useFilterQueryParamSync();
  const messagesQuery = useGetEventMessages(eventId, searchParams);
  const messages = (_a = messagesQuery == null ? void 0 : messagesQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = messagesQuery == null ? void 0 : messagesQuery.data) == null ? void 0 : _b.meta;
  const [sendModalOpen, {
    open: openSendModal,
    close: closeSendModal
  }] = useDisclosure(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchValue, setSearchValue] = useState(searchParams.query || "");
  const [mobileShowPreview, setMobileShowPreview] = useState(false);
  const prevMessagesRef = useRef(void 0);
  const listBodyRef = useRef(null);
  const searchTimerRef = useRef(null);
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);
  useEffect(() => {
    if (!messages) return;
    const messagesChanged = messages !== prevMessagesRef.current;
    prevMessagesRef.current = messages;
    if (!messagesChanged) return;
    if (selectedMessage) {
      const updated = messages.find((m) => m.id === selectedMessage.id);
      if (updated) {
        setSelectedMessage(updated);
        return;
      }
    }
    setSelectedMessage(messages.length > 0 ? messages[0] : null);
  }, [messages, selectedMessage]);
  const handleSelectMessage = useCallback((message) => {
    setSelectedMessage(message);
    setMobileShowPreview(true);
  }, []);
  const handleBackToList = useCallback(() => {
    setMobileShowPreview(false);
  }, []);
  const handleSearch = useCallback((value) => {
    setSearchValue(value);
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    searchTimerRef.current = setTimeout(() => {
      setSearchParam({
        query: value,
        pageNumber: 1
      });
    }, 500);
  }, [setSearchParam]);
  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    setSearchParam({
      query: "",
      pageNumber: 1
    });
  }, [setSearchParam]);
  const handleKeyDown = useCallback((e) => {
    var _a2;
    if (!(messages == null ? void 0 : messages.length) || !selectedMessage) return;
    const currentIndex = messages.findIndex((m) => m.id === selectedMessage.id);
    if (currentIndex === -1) return;
    let nextIndex = null;
    if (e.key === "ArrowDown" && currentIndex < messages.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (e.key === "ArrowUp" && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      const nextMessage = messages[nextIndex];
      setSelectedMessage(nextMessage);
      setMobileShowPreview(true);
      const listEl = listBodyRef.current;
      if (listEl) {
        const items = listEl.querySelectorAll('[role="option"]');
        (_a2 = items[nextIndex]) == null ? void 0 : _a2.scrollIntoView({
          block: "nearest"
        });
      }
    }
  }, [messages, selectedMessage]);
  const isLoading = !messages || !event;
  const totalMessages = pagination == null ? void 0 : pagination.total;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `${classes.mailLayout} ${mobileShowPreview ? classes.mobilePreviewActive : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.listPanel, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.listHeader, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.listHeaderLeft, children: [
            /* @__PURE__ */ jsx("h1", { className: classes.listHeading, children: i18n._(
              /*i18n*/
              {
                id: "t7TeQU"
              }
            ) }),
            !isLoading && totalMessages !== void 0 && /* @__PURE__ */ jsx("span", { className: classes.messageCount, children: totalMessages })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "filled", size: "compact-sm", onClick: openSendModal, leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), "data-testid": "message-compose-button", children: i18n._(
            /*i18n*/
            {
              id: "QOhkyl"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes.searchBar, children: /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
          /*i18n*/
          {
            id: "BWF1kC"
          }
        ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), rightSection: searchValue ? /* @__PURE__ */ jsx(CloseButton, { size: "sm", onClick: handleClearSearch }) : null, size: "sm", value: searchValue, onChange: (e) => handleSearch(e.currentTarget.value) }) }),
        /* @__PURE__ */ jsxs("div", { className: classes.listBody, ref: listBodyRef, onKeyDown: handleKeyDown, children: [
          isLoading && /* @__PURE__ */ jsx("div", { className: classes.loadingState, children: /* @__PURE__ */ jsx(Loader, { size: "sm" }) }),
          !isLoading && messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: classes.ghostList, children: [
            [...Array(5)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: classes.ghostRow, children: [
              /* @__PURE__ */ jsx("div", { className: classes.ghostAvatar }),
              /* @__PURE__ */ jsxs("div", { className: classes.ghostLines, children: [
                /* @__PURE__ */ jsx("div", { className: classes.ghostLineShort }),
                /* @__PURE__ */ jsx("div", { className: classes.ghostLineLong }),
                /* @__PURE__ */ jsx("div", { className: classes.ghostLineMed })
              ] })
            ] }, i)),
            /* @__PURE__ */ jsxs("div", { className: classes.ghostCta, children: [
              /* @__PURE__ */ jsx("p", { children: i18n._(
                /*i18n*/
                {
                  id: "0/+Nn9"
                }
              ) }),
              /* @__PURE__ */ jsx(Button, { variant: "light", size: "compact-sm", onClick: openSendModal, leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), children: i18n._(
                /*i18n*/
                {
                  id: "QOhkyl"
                }
              ) })
            ] })
          ] }),
          !isLoading && messages.length > 0 && /* @__PURE__ */ jsx(MessageList, { messages, selectedId: selectedMessage == null ? void 0 : selectedMessage.id, onSelect: handleSelectMessage })
        ] }),
        !!(messages == null ? void 0 : messages.length) && pagination && Number(pagination.last_page) > 1 && /* @__PURE__ */ jsx("div", { className: classes.listFooter, children: /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParam({
          pageNumber: value
        }), total: Number(pagination.last_page), size: "sm", marginTop: 0 }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.previewPanel, children: selectedMessage ? /* @__PURE__ */ jsx(MessagePreview, { message: selectedMessage, eventId, onBack: handleBackToList, eventTimezone: (event == null ? void 0 : event.timezone) ?? "UTC" }) : /* @__PURE__ */ jsx("div", { className: classes.previewEmpty, children: !isLoading && (messages == null ? void 0 : messages.length) === 0 ? /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
        /*i18n*/
        {
          id: "KPWxKD"
        }
      ), imageHref: "/blank-slate/messages.svg", subHeading: /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "HMAqFK"
        }
      ) }), children: /* @__PURE__ */ jsx(Button, { variant: "filled", size: "sm", onClick: openSendModal, leftSection: /* @__PURE__ */ jsx(IconSend, { size: 16 }), mt: 8, children: i18n._(
        /*i18n*/
        {
          id: "QEQlnV"
        }
      ) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(IconMail, { size: 48, stroke: 1.2 }),
        /* @__PURE__ */ jsx("p", { children: i18n._(
          /*i18n*/
          {
            id: "e4L7bF"
          }
        ) })
      ] }) }) })
    ] }),
    sendModalOpen && /* @__PURE__ */ jsx(SendMessageModal, { messageType: MessageType.OrderOwner, onClose: closeSendModal })
  ] });
};
export {
  Messages,
  Messages as default
};

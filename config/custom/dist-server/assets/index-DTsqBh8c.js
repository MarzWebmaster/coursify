import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, NavLink } from "react-router";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { G as GET_ORDER_QUERY_KEY, u as useGetOrder, S as SendMessageModal } from "./index-7RPUkRz0.js";
import { C as Currency } from "./index-IzdRcWBR.js";
import { f as formatDateWithLocale, p as prettyDate, r as relativeDate } from "./dates-CbVpwZeX.js";
import { Button, Menu, Tooltip, ActionIcon, Text, Group, Avatar, Collapse, Badge, Anchor, LoadingOverlay, Checkbox, Title, Stack, Paper, NumberInput, Drawer, CloseButton, Skeleton, CopyButton, TextInput, Textarea } from "@mantine/core";
import { e as getInitials, I as getStatusColor, p as queryClient } from "../entry.server.js";
import { IconDotsVertical, IconEdit, IconUser, IconExternalLink, IconChevronUp, IconMessageCircle2, IconCreditCard, IconCash, IconBasketCog, IconPencil, IconSend, IconRepeat, IconReceiptDollar, IconReceiptRefund, IconCopy, IconReceipt2, IconTrash, IconCheck } from "@tabler/icons-react";
import { useRef, useState, useCallback, useEffect, Fragment, useId } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { q as questionClient, Q as QuestionInput } from "./index-wMxbqESV.js";
import { useForm } from "@mantine/form";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { f as formatAddress } from "./addressUtilities-7xIQim0X.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useIsomorphicEffect, useDisclosure, useClipboard } from "@mantine/hooks";
import { M as MessageType } from "./types-CqPWB-a5.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { o as orderClient } from "./order.client-BmBVeAyF.js";
import { G as GET_EVENT_COUNTS_QUERY_KEY } from "./useGetEventCounts-BudQN_tQ.js";
import { d as downloadBinary } from "./download-DP3M_6Yt.js";
import { w as withLoadingNotification } from "./withLoadingNotification-6oRbhBHA.js";
import { c as eventCheckoutUrl } from "./urlHelper-CsaWRwIV.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { I as InputLabelWithHelp } from "./index-R0GQzPHn.js";
const bar = "_bar_1e9ew_1";
const classes$8 = {
  bar
};
const byGroup = (actions2, group2) => actions2.filter((action) => action.group === group2);
const toActionMenuGroups = (actions2) => {
  const danger = byGroup(actions2, "danger");
  return [{
    label: i18n._(
      /*i18n*/
      {
        id: "7L01XJ"
      }
    ),
    items: [...byGroup(actions2, "primary"), ...byGroup(actions2, "secondary")]
  }, ...danger.length > 0 ? [{
    label: i18n._(
      /*i18n*/
      {
        id: "ZQKLI1"
      }
    ),
    items: danger,
    showDividerAbove: true
  }] : []];
};
const EntityActionMenuItems = ({
  actions: actions2
}) => {
  const danger = byGroup(actions2, "danger");
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
      /*i18n*/
      {
        id: "wckWOP"
      }
    ) }),
    [...byGroup(actions2, "primary"), ...byGroup(actions2, "secondary")].map((action) => /* @__PURE__ */ jsx(Menu.Item, { leftSection: action.icon, onClick: action.onClick, color: action.color, children: action.label }, action.key)),
    danger.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(Menu.Divider, {}),
      /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
        /*i18n*/
        {
          id: "Zz6Cxn"
        }
      ) }),
      danger.map((action) => /* @__PURE__ */ jsx(Menu.Item, { leftSection: action.icon, onClick: action.onClick, color: action.color, children: action.label }, action.key))
    ] })
  ] });
};
const MENU_BUTTON_WIDTH = 34;
const EntityActionBar = ({
  actions: actions2
}) => {
  const primary = byGroup(actions2, "primary");
  const secondary = byGroup(actions2, "secondary");
  const danger = byGroup(actions2, "danger");
  const barRef = useRef(null);
  const buttonWidths = useRef({});
  const [visibleCount, setVisibleCount] = useState(primary.length);
  const primaryKeys = primary.map((action) => action.key).join("|");
  const fitPrimaryActions = useCallback(() => {
    const bar2 = barRef.current;
    if (!bar2) {
      return;
    }
    bar2.querySelectorAll("[data-action-key]").forEach((element) => {
      buttonWidths.current[element.dataset.actionKey] = element.offsetWidth;
    });
    if (primary.some((action) => buttonWidths.current[action.key] === void 0)) {
      setVisibleCount(primary.length);
      return;
    }
    const gap = parseFloat(getComputedStyle(bar2).columnGap) || 0;
    const available = bar2.clientWidth;
    const widthOf = (count2) => primary.slice(0, count2).reduce((total2, action, index) => total2 + buttonWidths.current[action.key] + (index > 0 ? gap : 0), 0);
    let count = primary.length;
    while (count > 0) {
      const hasMenu = count < primary.length || secondary.length > 0 || danger.length > 0;
      const required = widthOf(count) + (hasMenu ? gap + MENU_BUTTON_WIDTH : 0);
      if (required <= available) {
        break;
      }
      count--;
    }
    setVisibleCount(count);
  }, [primaryKeys, secondary.length, danger.length]);
  useIsomorphicEffect(() => {
    fitPrimaryActions();
  }, [fitPrimaryActions, visibleCount]);
  useEffect(() => {
    const bar2 = barRef.current;
    if (!bar2) {
      return;
    }
    const observer = new ResizeObserver(fitPrimaryActions);
    observer.observe(bar2);
    return () => observer.disconnect();
  }, [fitPrimaryActions]);
  const visiblePrimary = primary.slice(0, visibleCount);
  const overflowPrimary = primary.slice(visibleCount);
  const menuSections = [overflowPrimary, secondary, danger].filter((section2) => section2.length > 0);
  return /* @__PURE__ */ jsxs("div", { className: classes$8.bar, ref: barRef, children: [
    visiblePrimary.map((action) => /* @__PURE__ */ jsx(Button, { variant: "default", size: "compact-sm", color: action.color, leftSection: action.icon, onClick: action.onClick, "data-testid": action.dataTestId, "data-action-key": action.key, children: action.label }, action.key)),
    menuSections.length > 0 && /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 210, position: "bottom-end", children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
        /*i18n*/
        {
          id: "JcD7qf"
        }
      ), withArrow: true, position: "bottom", children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", size: "lg", radius: "xl", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 16 }) }) }) }),
      /* @__PURE__ */ jsx(Menu.Dropdown, { children: menuSections.map((section2, sectionIndex) => /* @__PURE__ */ jsxs(Fragment, { children: [
        sectionIndex > 0 && /* @__PURE__ */ jsx(Menu.Divider, {}),
        section2.map((action) => /* @__PURE__ */ jsx(Menu.Item, { leftSection: action.icon, onClick: action.onClick, color: action.color, "data-testid": overflowPrimary.includes(action) ? action.dataTestId : void 0, children: action.label }, action.key))
      ] }, section2[0].key)) })
    ] })
  ] });
};
const container$1 = "_container_1v5p2_1";
const group = "_group_1v5p2_7";
const groupHeader = "_groupHeader_1v5p2_13";
const groupTitle = "_groupTitle_1v5p2_19";
const groupCount = "_groupCount_1v5p2_23";
const questionsList = "_questionsList_1v5p2_38";
const question = "_question_1v5p2_38";
const questionHeader = "_questionHeader_1v5p2_53";
const questionText = "_questionText_1v5p2_61";
const productTitle = "_productTitle_1v5p2_67";
const answerContainer = "_answerContainer_1v5p2_73";
const answer = "_answer_1v5p2_73";
const emptyAnswer = "_emptyAnswer_1v5p2_87";
const editButton = "_editButton_1v5p2_92";
const editContainer = "_editContainer_1v5p2_97";
const editActions = "_editActions_1v5p2_105";
const attendeeGroups = "_attendeeGroups_1v5p2_109";
const attendeeGroup = "_attendeeGroup_1v5p2_109";
const attendeeHeader = "_attendeeHeader_1v5p2_120";
const attendeeIcon = "_attendeeIcon_1v5p2_128";
const attendeeName = "_attendeeName_1v5p2_133";
const classes$7 = {
  container: container$1,
  group,
  groupHeader,
  groupTitle,
  groupCount,
  questionsList,
  question,
  questionHeader,
  questionText,
  productTitle,
  answerContainer,
  answer,
  emptyAnswer,
  editButton,
  editContainer,
  editActions,
  attendeeGroups,
  attendeeGroup,
  attendeeHeader,
  attendeeIcon,
  attendeeName
};
const useEditQuestionAnswer = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      questionId,
      answerId,
      answer: answer2
    }) => questionClient.updateAnswerQuestion(eventId, questionId, answerId, answer2),
    onSuccess: (_, variables) => {
      return;
    }
  });
};
const isAddress = (obj) => {
  if (!obj || typeof obj !== "object") return false;
  const addressFields = ["address_line_1", "address_line_2", "city", "state_or_region", "zip_or_postal_code", "country"];
  return addressFields.some((field2) => field2 in obj);
};
const unwrapAnswer = (answer2) => answer2 && typeof answer2 === "object" && !Array.isArray(answer2) && Object.keys(answer2).length === 1 && "answer" in answer2 ? answer2.answer : answer2;
const formatAnswer = (rawAnswer) => {
  const answer2 = unwrapAnswer(rawAnswer);
  if (answer2 === null || answer2 === void 0 || answer2 === "") return "";
  if (Array.isArray(answer2)) {
    return answer2.join(", ");
  } else if (typeof answer2 === "object") {
    if (isAddress(answer2)) {
      return formatAddress(answer2);
    } else {
      return JSON.stringify(answer2);
    }
  } else {
    return answer2.toString();
  }
};
const useEditingQuestions = () => {
  const [editingQuestionIds, setEditingQuestionIds] = useState([]);
  const toggleEditMode = (questionId) => {
    setEditingQuestionIds((prev) => prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]);
  };
  const isEditing = (questionId) => editingQuestionIds.includes(questionId);
  return {
    toggleEditMode,
    isEditing
  };
};
const QuestionItem = ({
  qa,
  isEditing,
  toggleEditMode,
  onEditAnswer,
  eventId,
  hideProductTitle
}) => {
  const errorHandler = useFormErrorResponseHandler();
  const updateAnswerMutation = useEditQuestionAnswer();
  const questionForm = useForm({
    initialValues: qa.question_type === "ADDRESS" ? {
      answer: qa.answer
    } : {
      answer: {
        answer: qa.answer
      }
    },
    transformValues: (values) => ({
      answer: qa.question_type !== "ADDRESS" && values.answer && typeof values.answer === "object" && "answer" in values.answer ? values.answer.answer : values.answer
    })
  });
  const handleSubmit = (values) => {
    updateAnswerMutation.mutate({
      questionId: qa.question_id,
      answer: values.answer,
      answerId: qa.question_answer_id,
      eventId
    }, {
      onSuccess: () => {
        toggleEditMode(qa.question_id);
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "QNrkms"
          }
        ));
        onEditAnswer == null ? void 0 : onEditAnswer();
      },
      onError: (error) => {
        errorHandler(questionForm, error);
        showError(i18n._(
          /*i18n*/
          {
            id: "NNc33d"
          }
        ));
      }
    });
  };
  const answer2 = formatAnswer(qa.answer);
  return /* @__PURE__ */ jsxs("div", { className: classes$7.question, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$7.questionHeader, children: [
      /* @__PURE__ */ jsx(Text, { size: "xs", className: classes$7.questionText, children: qa.title }),
      qa.product_title && !hideProductTitle && /* @__PURE__ */ jsx(Text, { size: "xs", className: classes$7.productTitle, children: qa.product_title })
    ] }),
    isEditing ? /* @__PURE__ */ jsx("form", { onSubmit: questionForm.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("div", { className: classes$7.editContainer, children: [
      /* @__PURE__ */ jsx(QuestionInput, { question: {
        id: qa.question_id,
        title: qa.title,
        type: qa.question_type,
        options: qa.question_options,
        required: qa.question_required
      }, name: "answer", form: questionForm }),
      /* @__PURE__ */ jsxs(Group, { gap: "xs", className: classes$7.editActions, children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", variant: "light", size: "xs", loading: updateAnswerMutation.isPending, children: i18n._(
          /*i18n*/
          {
            id: "tfDRzk"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "xs", onClick: () => toggleEditMode(qa.question_id), children: i18n._(
          /*i18n*/
          {
            id: "dEgA5A"
          }
        ) })
      ] })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: classes$7.answerContainer, children: [
      answer2 ? /* @__PURE__ */ jsx(Text, { size: "sm", className: classes$7.answer, children: answer2 }) : /* @__PURE__ */ jsx(Text, { size: "sm", className: classes$7.emptyAnswer, children: "—" }),
      /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
        /*i18n*/
        {
          id: "2iZEz7"
        }
      ), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", radius: "xl", size: "sm", className: classes$7.editButton, onClick: () => toggleEditMode(qa.question_id), children: /* @__PURE__ */ jsx(IconEdit, { size: 16 }) }) })
    ] })
  ] });
};
const QuestionList = ({
  questions,
  onEditAnswer,
  hideProductTitle = false
}) => {
  const {
    eventId
  } = useParams();
  const {
    toggleEditMode,
    isEditing
  } = useEditingQuestions();
  if (!questions.length) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: classes$7.questionsList, children: questions.map((qa, index) => /* @__PURE__ */ jsx(QuestionItem, { qa, isEditing: isEditing(qa.question_id), toggleEditMode, onEditAnswer, eventId, hideProductTitle }, `${qa.question_id}-${index}`)) });
};
const AttendeeQuestionsList = ({
  questions,
  onEditAnswer
}) => {
  const {
    eventId
  } = useParams();
  const {
    toggleEditMode,
    isEditing
  } = useEditingQuestions();
  const groupedByAttendee = questions.reduce((groups, qa) => {
    const key = String(qa.attendee_id ?? "unknown");
    (groups[key] ?? (groups[key] = [])).push(qa);
    return groups;
  }, {});
  return /* @__PURE__ */ jsx("div", { className: classes$7.attendeeGroups, children: Object.entries(groupedByAttendee).map(([attendeeId, attendeeQuestions]) => {
    const attendee2 = attendeeQuestions[0];
    const name2 = attendee2.first_name ? `${attendee2.first_name} ${attendee2.last_name}` : i18n._(
      /*i18n*/
      {
        id: "ZBAScj"
      }
    );
    return /* @__PURE__ */ jsxs("div", { className: classes$7.attendeeGroup, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$7.attendeeHeader, children: [
        /* @__PURE__ */ jsx(IconUser, { size: 14, stroke: 1.5, className: classes$7.attendeeIcon }),
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, className: classes$7.attendeeName, children: name2 }),
        attendee2.product_title && /* @__PURE__ */ jsx(Text, { size: "xs", className: classes$7.productTitle, children: attendee2.product_title }),
        attendee2.attendee_public_id && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
          /*i18n*/
          {
            id: "AIUkyF"
          }
        ), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsx(NavLink, { to: `../attendees?query=${attendee2.attendee_public_id}`, children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", radius: "xl", size: "xs", children: /* @__PURE__ */ jsx(IconExternalLink, { size: 14 }) }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes$7.questionsList, children: attendeeQuestions.map((qa, index) => /* @__PURE__ */ jsx(QuestionItem, { qa, isEditing: isEditing(qa.question_id), toggleEditMode, onEditAnswer, eventId, hideProductTitle: true }, `${qa.question_id}-${index}`)) })
    ] }, attendeeId);
  }) });
};
const QuestionAndAnswerList = ({
  questionAnswers,
  belongsToFilter,
  onEditAnswer
}) => {
  const filteredQuestions = (belongsToFilter == null ? void 0 : belongsToFilter.length) ? questionAnswers.filter((qa) => belongsToFilter.includes(qa.belongs_to)) : questionAnswers;
  const orderQuestions = filteredQuestions.filter((qa) => qa.belongs_to === "ORDER");
  const attendeeQuestions = filteredQuestions.filter((qa) => qa.belongs_to === "PRODUCT" && qa.attendee_id);
  const productQuestions = filteredQuestions.filter((qa) => qa.belongs_to === "PRODUCT" && !qa.attendee_id);
  const renderGroup = (title2, questions, content2) => {
    if (questions.length === 0) {
      return null;
    }
    return /* @__PURE__ */ jsxs("div", { className: classes$7.group, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$7.groupHeader, children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", fw: 600, className: classes$7.groupTitle, children: title2 }),
        /* @__PURE__ */ jsx("span", { className: classes$7.groupCount, children: questions.length })
      ] }),
      content2
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: classes$7.container, children: [
    renderGroup(i18n._(
      /*i18n*/
      {
        id: "qxwFM0"
      }
    ), orderQuestions, /* @__PURE__ */ jsx(QuestionList, { questions: orderQuestions, onEditAnswer })),
    renderGroup(i18n._(
      /*i18n*/
      {
        id: "8yRktx"
      }
    ), attendeeQuestions, /* @__PURE__ */ jsx(AttendeeQuestionsList, { questions: attendeeQuestions, onEditAnswer })),
    renderGroup(i18n._(
      /*i18n*/
      {
        id: "njAAJ+"
      }
    ), productQuestions, /* @__PURE__ */ jsx(QuestionList, { questions: productQuestions, onEditAnswer }))
  ] });
};
const summary = "_summary_vaos5_1";
const items = "_items_vaos5_1";
const separator$1 = "_separator_vaos5_1";
const itemRow = "_itemRow_vaos5_7";
const itemName = "_itemName_vaos5_15";
const total = "_total_vaos5_20";
const occurrenceMeta = "_occurrenceMeta_vaos5_24";
const itemValue = "_itemValue_vaos5_29";
const priceBeforeDiscount = "_priceBeforeDiscount_vaos5_41";
const classes$6 = {
  summary,
  items,
  separator: separator$1,
  itemRow,
  itemName,
  total,
  occurrenceMeta,
  itemValue,
  priceBeforeDiscount
};
const OrderSummary = ({
  event,
  order,
  showFreeWhenZeroTotal = true
}) => {
  var _a, _b, _c, _d, _e;
  return /* @__PURE__ */ jsx("div", { className: classes$6.summary, children: /* @__PURE__ */ jsxs("div", { className: classes$6.items, children: [
    (_a = order == null ? void 0 : order.order_items) == null ? void 0 : _a.map((item) => {
      const occurrence = item.event_occurrence;
      return /* @__PURE__ */ jsxs("div", { className: classes$6.itemRow, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$6.itemName, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            item.quantity,
            " x ",
            item.item_name
          ] }),
          occurrence && /* @__PURE__ */ jsxs("div", { className: classes$6.occurrenceMeta, children: [
            formatDateWithLocale(occurrence.start_date, "shortDate", event.timezone),
            " ",
            formatDateWithLocale(occurrence.start_date, "timeOnly", event.timezone),
            occurrence.label && ` · ${occurrence.label}`
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes$6.itemValue, children: [
          !!item.price_before_discount && /* @__PURE__ */ jsx("div", { className: classes$6.priceBeforeDiscount, children: /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: item.price_before_discount * item.quantity, strikeThrough: true }) }),
          /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: item.price * item.quantity })
        ] })
      ] }, item.id);
    }),
    /* @__PURE__ */ jsx("div", { className: classes$6.separator }),
    /* @__PURE__ */ jsxs("div", { className: classes$6.itemRow, children: [
      /* @__PURE__ */ jsx("div", { className: classes$6.itemName, children: /* @__PURE__ */ jsx("b", { className: classes$6.total, children: i18n._(
        /*i18n*/
        {
          id: "X2rrlw"
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: classes$6.itemValue, children: /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: order.total_before_additions, freeLabel: showFreeWhenZeroTotal ? i18n._(
        /*i18n*/
        {
          id: "2POOFK"
        }
      ) : null }) })
    ] }),
    (_c = (_b = order == null ? void 0 : order.taxes_and_fees_rollup) == null ? void 0 : _b.fees) == null ? void 0 : _c.map((fee) => {
      return /* @__PURE__ */ jsxs("div", { className: classes$6.itemRow, children: [
        /* @__PURE__ */ jsx("div", { className: classes$6.itemName, children: fee.name }),
        /* @__PURE__ */ jsx("div", { className: classes$6.itemValue, children: /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: fee.value }) })
      ] }, fee.name);
    }),
    (_e = (_d = order == null ? void 0 : order.taxes_and_fees_rollup) == null ? void 0 : _d.taxes) == null ? void 0 : _e.map((tax) => {
      return /* @__PURE__ */ jsxs("div", { className: classes$6.itemRow, children: [
        /* @__PURE__ */ jsx("div", { className: classes$6.itemName, children: tax.name }),
        /* @__PURE__ */ jsx("div", { className: classes$6.itemValue, children: /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: tax.value }) })
      ] }, tax.name);
    }),
    order.total_refunded > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx("div", { className: classes$6.separator }),
      /* @__PURE__ */ jsxs("div", { className: classes$6.itemRow, children: [
        /* @__PURE__ */ jsx("div", { className: classes$6.itemName, children: i18n._(
          /*i18n*/
          {
            id: "/BI0y9"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: classes$6.itemValue, children: [
          "- ",
          /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: order.total_refunded })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes$6.separator }),
    /* @__PURE__ */ jsxs("div", { className: classes$6.itemRow, children: [
      /* @__PURE__ */ jsx("div", { className: classes$6.itemName, children: /* @__PURE__ */ jsx("b", { className: classes$6.total, children: i18n._(
        /*i18n*/
        {
          id: "72c5Qo"
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: classes$6.itemValue, children: /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: order.total_refunded ? order.total_gross - order.total_refunded : order.total_gross, freeLabel: showFreeWhenZeroTotal ? i18n._(
        /*i18n*/
        {
          id: "2POOFK"
        }
      ) : null }) })
    ] })
  ] }) });
};
const container = "_container_1mypn_1";
const attendeeList = "_attendeeList_1mypn_6";
const attendee = "_attendee_1mypn_6";
const attendeeInfo = "_attendeeInfo_1mypn_23";
const details = "_details_1mypn_31";
const name = "_name_1mypn_36";
const product = "_product_1mypn_40";
const actionButton = "_actionButton_1mypn_45";
const avatar = "_avatar_1mypn_49";
const answersContainer = "_answersContainer_1mypn_55";
const classes$5 = {
  container,
  attendeeList,
  attendee,
  attendeeInfo,
  details,
  name,
  product,
  actionButton,
  avatar,
  answersContainer
};
const AttendeeList = ({
  order,
  products,
  refetchOrder,
  questionAnswers = []
}) => {
  var _a;
  if (!((_a = order.attendees) == null ? void 0 : _a.length)) {
    return /* @__PURE__ */ jsx("div", { className: classes$5.container, children: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", ta: "center", py: "xl", children: i18n._(
      /*i18n*/
      {
        id: "q2LEDV"
      }
    ) }) });
  }
  const [expandedAttendees, setExpandedAttendees] = useState([]);
  const hasQuestions = (attendeeId) => {
    return questionAnswers.some((qa) => qa.attendee_id === attendeeId);
  };
  const getAttendeeQuestions = (attendeeId) => {
    return questionAnswers.filter((qa) => qa.attendee_id === attendeeId);
  };
  const toggleExpanded = (attendeeId) => {
    setExpandedAttendees((prev) => prev.includes(attendeeId) ? prev.filter((id) => id !== attendeeId) : [...prev, attendeeId]);
  };
  const isExpanded = (attendeeId) => {
    return expandedAttendees.includes(attendeeId);
  };
  return /* @__PURE__ */ jsx("div", { className: classes$5.container, children: /* @__PURE__ */ jsx("div", { className: classes$5.attendeeList, children: order.attendees.map((attendee2) => {
    const product2 = products == null ? void 0 : products.find((p) => p.id === attendee2.product_id);
    const fullName = `${attendee2.first_name} ${attendee2.last_name}`;
    const attendeeHasQuestions = hasQuestions(attendee2.id);
    return /* @__PURE__ */ jsxs("div", { className: classes$5.attendee, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$5.attendeeInfo, children: [
        /* @__PURE__ */ jsx(Avatar, { size: 32, radius: "xl", className: classes$5.avatar, children: getInitials(fullName) }),
        /* @__PURE__ */ jsxs("div", { className: classes$5.details, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, className: classes$5.name, children: fullName }),
          (product2 == null ? void 0 : product2.title) && /* @__PURE__ */ jsx(Text, { size: "xs", className: classes$5.product, lineClamp: 1, children: product2.title })
        ] }),
        /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          attendeeHasQuestions && /* @__PURE__ */ jsx(Tooltip, { label: isExpanded(attendee2.id) ? i18n._(
            /*i18n*/
            {
              id: "P+5Pbo"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "c7VN/A"
            }
          ), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", radius: "xl", size: "sm", className: classes$5.actionButton, onClick: () => toggleExpanded(attendee2.id), children: isExpanded(attendee2.id) ? /* @__PURE__ */ jsx(IconChevronUp, { size: 16, stroke: 1.5 }) : /* @__PURE__ */ jsx(IconMessageCircle2, { size: 16, stroke: 1.5 }) }) }),
          /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
            /*i18n*/
            {
              id: "Pte1Hv"
            }
          ), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsx(NavLink, { to: `../attendees?query=${attendee2.public_id}`, children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", radius: "xl", size: "sm", className: classes$5.actionButton, children: /* @__PURE__ */ jsx(IconExternalLink, { size: 16, stroke: 1.5 }) }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Collapse, { expanded: isExpanded(attendee2.id), children: /* @__PURE__ */ jsx("div", { className: classes$5.answersContainer, children: /* @__PURE__ */ jsx(QuestionList, { hideProductTitle: true, questions: getAttendeeQuestions(attendee2.id), onEditAnswer: refetchOrder }) }) })
    ] }, attendee2.id);
  }) }) });
};
const alert = "_alert_33hnk_1";
const classes$4 = {
  alert
};
const getStatusLabel = (status) => {
  const labels = {
    "COMPLETED": i18n._(
      /*i18n*/
      {
        id: "qqWcBV"
      }
    ),
    "CANCELLED": i18n._(
      /*i18n*/
      {
        id: "vv7kpg"
      }
    ),
    "AWAITING_PAYMENT": i18n._(
      /*i18n*/
      {
        id: "ioG+xt"
      }
    ),
    "AWAITING_OFFLINE_PAYMENT": i18n._(
      /*i18n*/
      {
        id: "4lVaWA"
      }
    ),
    "PAYMENT_RECEIVED": i18n._(
      /*i18n*/
      {
        id: "lsxOPC"
      }
    ),
    "NO_PAYMENT_REQUIRED": i18n._(
      /*i18n*/
      {
        id: "ZWEfBE"
      }
    ),
    "PAYMENT_FAILED": i18n._(
      /*i18n*/
      {
        id: "JhtZAK"
      }
    ),
    "REFUNDED": i18n._(
      /*i18n*/
      {
        id: "/BI0y9"
      }
    ),
    "PARTIALLY_REFUNDED": i18n._(
      /*i18n*/
      {
        id: "ZfxaB4"
      }
    ),
    "REFUND_PENDING": i18n._(
      /*i18n*/
      {
        id: "RpwiYC"
      }
    )
  };
  return labels[status] || status.replace("_", " ");
};
const OrderStatusBadge = ({
  order,
  variant = "outline"
}) => {
  let color;
  let title2;
  if (order.status === "CANCELLED") {
    color = getStatusColor(order.status);
    title2 = getStatusLabel(order.status);
  } else if (order.status === "AWAITING_OFFLINE_PAYMENT") {
    color = getStatusColor("AWAITING_PAYMENT");
    title2 = getStatusLabel(order.status);
  } else if (order.refund_status) {
    color = getStatusColor(order.refund_status);
    title2 = getStatusLabel(order.refund_status);
  } else if (order.payment_status && order.payment_status !== "PAYMENT_RECEIVED" && order.payment_status !== "NO_PAYMENT_REQUIRED") {
    color = getStatusColor(order.payment_status);
    title2 = getStatusLabel(order.payment_status);
  } else {
    color = getStatusColor(order.status);
    title2 = getStatusLabel(order.status);
  }
  return /* @__PURE__ */ jsx(Badge, { color, variant, children: title2 });
};
const orderDetails = "_orderDetails_1dwnm_1";
const block = "_block_1dwnm_12";
const title = "_title_1dwnm_15";
const amount = "_amount_1dwnm_21";
const value = "_value_1dwnm_22";
const classes$3 = {
  orderDetails,
  block,
  title,
  amount,
  value
};
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};
const OrderDetails = ({
  order,
  event,
  cardVariant = "lightGray"
}) => {
  var _a;
  const occurrenceItems = ((_a = order.order_items) == null ? void 0 : _a.filter((item) => item.event_occurrence)) ?? [];
  const uniqueOccurrences = Array.from(new Map(occurrenceItems.map((item) => [item.event_occurrence.id, item.event_occurrence])).values());
  return /* @__PURE__ */ jsxs(Card, { className: classes$3.orderDetails, variant: cardVariant, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "6YtxFj"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: classes$3.amount, children: [
        order.first_name,
        " ",
        order.last_name
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "O3oNi5"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.value, children: /* @__PURE__ */ jsx(Anchor, { href: "mailto:" + order.email, target: "_blank", children: order.email }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "mYGY3B"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: /* @__PURE__ */ jsx(Tooltip, { label: prettyDate(order.created_at, event.timezone), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsx("span", { children: relativeDate(order.created_at) }) }) })
    ] }),
    uniqueOccurrences.length > 0 && /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: uniqueOccurrences.length === 1 ? i18n._(
        /*i18n*/
        {
          id: "6u1B3O"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "byXCTu"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: uniqueOccurrences.map((occurrence) => /* @__PURE__ */ jsxs("div", { children: [
        formatDateWithLocale(occurrence.start_date, "shortDate", event.timezone),
        " ",
        formatDateWithLocale(occurrence.start_date, "timeOnly", event.timezone),
        occurrence.label && ` · ${occurrence.label}`
      ] }, occurrence.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "uAQUqI"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: /* @__PURE__ */ jsx(OrderStatusBadge, { order, variant: "outline" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "mpB/d9"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: /* @__PURE__ */ jsx(Currency, { currency: order.currency, price: order.total_gross }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "m3FM1g"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: /* @__PURE__ */ jsx(Currency, { currency: order.currency, price: order.total_refunded }) })
    ] }),
    order.payment_provider && /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "QzmQBG"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: capitalize(order.payment_provider) })
    ] }),
    order.promo_code && /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "JoKGiJ"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: order.promo_code })
    ] }),
    order.address && /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.title, children: i18n._(
        /*i18n*/
        {
          id: "Du6bPw"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$3.amount, children: formatAddress(order.address) })
    ] })
  ] });
};
const GET_EVENT_ORDERS_QUERY_KEY = "getEventOrders";
const useGetEventOrders = (eventId, pagination) => {
  return useQuery({
    queryKey: [GET_EVENT_ORDERS_QUERY_KEY, eventId, pagination],
    queryFn: async () => await orderClient.all(eventId, pagination)
  });
};
const useCancelOrder = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      orderId,
      refund
    }) => orderClient.cancel(eventId, orderId, refund),
    onSuccess: (_, variables) => {
      queryClient2.invalidateQueries({
        queryKey: [GET_ORDER_QUERY_KEY, variables.orderId]
      });
      queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_ORDERS_QUERY_KEY, variables.eventId]
      });
      queryClient2.invalidateQueries({
        queryKey: [GET_EVENT_COUNTS_QUERY_KEY]
      });
    }
  });
};
const isOrderRefundable = (order) => !order.is_free_order && order.status !== "AWAITING_OFFLINE_PAYMENT" && (order.payment_provider === "STRIPE" || order.payment_provider === "OFFLINE") && order.refund_status !== "REFUNDED";
const isOfflineOrder = (order) => order.payment_provider === "OFFLINE";
const CancelOrderModal = ({
  onClose,
  orderId
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: order
  } = useGetOrder(eventId, orderId);
  const {
    data: event,
    data: {
      products
    } = {}
  } = useGetEvent(eventId);
  const cancelOrderMutation = useCancelOrder();
  const [shouldRefund, setShouldRefund] = useState(true);
  const isRefundable = order && isOrderRefundable(order);
  const handleCancelOrder = () => {
    cancelOrderMutation.mutate({
      eventId,
      orderId,
      refund: shouldRefund && isRefundable
    }, {
      onSuccess: () => {
        const message = shouldRefund && isRefundable ? i18n._(
          /*i18n*/
          {
            id: "vrSW9M"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "WbImlQ"
          }
        );
        showSuccess(message);
        onClose();
      },
      onError: (error) => {
        var _a, _b;
        showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "ZpieFv"
          }
        ));
      }
    });
  };
  if (!order || !event) {
    return /* @__PURE__ */ jsx(LoadingOverlay, { visible: true });
  }
  return /* @__PURE__ */ jsxs(Modal, { heading: i18n._(
    /*i18n*/
    {
      id: "Mz7Ygx",
      values: {
        0: order.public_id
      }
    }
  ), opened: true, onClose, children: [
    /* @__PURE__ */ jsx(OrderDetails, { order, event }),
    products && /* @__PURE__ */ jsx(AttendeeList, { order, products }),
    /* @__PURE__ */ jsx(Callout, { variant: "info", className: classes$4.alert, title: i18n._(
      /*i18n*/
      {
        id: "5FSIzj"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "tOXAdc"
      }
    ) }),
    isRefundable && /* @__PURE__ */ jsx(Checkbox, { mt: 20, mb: 20, checked: shouldRefund, onChange: (event2) => setShouldRefund(event2.currentTarget.checked), label: i18n._(
      /*i18n*/
      {
        id: "jkNgQR"
      }
    ), description: isOfflineOrder(order) ? i18n._(
      /*i18n*/
      {
        id: "FGPqvo"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "sxKqBm"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { loading: cancelOrderMutation.isPending, className: "mb20", color: "red", fullWidth: true, onClick: handleCancelOrder, children: i18n._(
      /*i18n*/
      {
        id: "Os6n2a"
      }
    ) })
  ] });
};
const useRefundOrder = () => {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      orderId,
      refundData
    }) => orderClient.refund(eventId, orderId, refundData),
    onSuccess: () => queryClient2.invalidateQueries({
      queryKey: [GET_EVENT_ORDERS_QUERY_KEY]
    })
  });
};
const remainingRow = "_remainingRow_e1rdy_1";
const classes$2 = {
  remainingRow
};
const RefundOrderModal = ({
  onClose,
  orderId
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: order
  } = useGetOrder(eventId, orderId);
  const mutation = useRefundOrder();
  const formErrorResponseHandler = useFormErrorResponseHandler();
  const form2 = useForm({
    initialValues: {
      amount: 0,
      notify_buyer: false,
      cancel_order: false
    }
  });
  const isRefundPending = (order == null ? void 0 : order.refund_status) === "REFUND_PENDING";
  const isRefunded = (order == null ? void 0 : order.refund_status) === "REFUNDED";
  useEffect(() => {
    if (!order) {
      return;
    }
    form2.setFieldValue("amount", order.total_gross - order.total_refunded);
  }, [order]);
  if (!order) {
    return /* @__PURE__ */ jsx(LoadingOverlay, { visible: true });
  }
  const handleSubmit = (values) => mutation.mutate({
    eventId,
    orderId,
    refundData: {
      amount: values.amount,
      notify_buyer: values.notify_buyer,
      cancel_order: values.cancel_order
    }
  }, {
    onSuccess: () => {
      showSuccess(isOfflineOrder(order) ? i18n._(
        /*i18n*/
        {
          id: "7tPofw"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "cJ4Y4R"
        }
      ));
      form2.reset();
      onClose();
    },
    onError: (error) => {
      formErrorResponseHandler(form2, error);
    }
  });
  const modalForm = ({
    order: order2,
    form: form22
  }) => {
    const remainingAmount = order2.total_gross - order2.total_refunded;
    const isPartialRefund = form22.values.amount < remainingAmount;
    const isOffline = isOfflineOrder(order2);
    return /* @__PURE__ */ jsx("form", { onSubmit: form22.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      isOffline && /* @__PURE__ */ jsx(Callout, { variant: "warning", children: i18n._(
        /*i18n*/
        {
          id: "AT8Toa"
        }
      ) }),
      /* @__PURE__ */ jsx(Paper, { radius: "md", p: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { gap: "sm", children: [
        /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "oW5877"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: /* @__PURE__ */ jsx(Currency, { currency: order2.currency, price: order2.total_gross }) })
        ] }),
        order2.total_refunded > 0 && /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "/H326L"
            }
          ) }),
          /* @__PURE__ */ jsxs(Text, { size: "lg", c: "red", children: [
            "-",
            /* @__PURE__ */ jsx(Currency, { currency: order2.currency, price: order2.total_refunded })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Group, { justify: "space-between", className: classes$2.remainingRow, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: i18n._(
            /*i18n*/
            {
              id: "clF06r"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "lg", fw: 700, children: /* @__PURE__ */ jsx(Currency, { currency: order2.currency, price: remainingAmount }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(NumberInput, { size: "md", max: remainingAmount, min: 0.01, decimalScale: 2, fixedDecimalScale: true, ...form22.getInputProps("amount"), label: i18n._(
        /*i18n*/
        {
          id: "fKn/k6"
        }
      ), placeholder: remainingAmount.toFixed(2), description: isPartialRefund ? i18n._(
        /*i18n*/
        {
          id: "5F7SYw"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "MY2SVM"
        }
      ), leftSection: /* @__PURE__ */ jsx(IconCash, { size: 20 }), rightSectionWidth: 50, rightSection: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: order2.currency }), required: true, styles: {
        input: {
          fontWeight: 600,
          fontSize: "1.1rem"
        }
      } }),
      /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsx(Checkbox, { ...form22.getInputProps("notify_buyer", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "1lNPhX"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "QMHSMS"
          }
        ) }),
        order2.status !== "CANCELLED" && /* @__PURE__ */ jsx(Checkbox, { ...form22.getInputProps("cancel_order", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "RtxQTF"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "H4nE+E"
          }
        ) })
      ] }),
      isPartialRefund && Number(form22.values.amount) > 0 && /* @__PURE__ */ jsx(Callout, { variant: "info", children: i18n._(
        /*i18n*/
        {
          id: "s14PLh",
          values: {
            0: Number(form22.values.amount).toFixed(2),
            1: order2.currency
          }
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { loading: mutation.isPending, fullWidth: true, size: "md", type: "submit", leftSection: isOffline ? /* @__PURE__ */ jsx(IconCash, { size: 20 }) : /* @__PURE__ */ jsx(IconCreditCard, { size: 20 }), children: isOffline ? i18n._(
        /*i18n*/
        {
          id: "YbmBQN"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "8z6Y5D"
        }
      ) })
    ] }) });
  };
  const CannotRefund = ({
    message
  }) => {
    return /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(Callout, { variant: "info", children: message }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, onClick: onClose, variant: "light", children: i18n._(
        /*i18n*/
        {
          id: "yz7wBu"
        }
      ) })
    ] });
  };
  const getModalBody = () => {
    if (order.is_manually_created) {
      return /* @__PURE__ */ jsx(CannotRefund, { message: i18n._(
        /*i18n*/
        {
          id: "fHfiEo"
        }
      ) });
    }
    if (isRefundPending) {
      return /* @__PURE__ */ jsx(CannotRefund, { message: i18n._(
        /*i18n*/
        {
          id: "rMcHYt"
        }
      ) });
    }
    if (isRefunded) {
      return /* @__PURE__ */ jsx(CannotRefund, { message: i18n._(
        /*i18n*/
        {
          id: "5K8REg"
        }
      ) });
    }
    return modalForm({
      order,
      form: form2
    });
  };
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
    /* @__PURE__ */ jsx(IconCreditCard, { size: 24 }),
    /* @__PURE__ */ jsx(Title, { order: 4, children: i18n._(
      /*i18n*/
      {
        id: "FaK/8G",
        values: {
          0: (order == null ? void 0 : order.public_id) || ""
        }
      }
    ) })
  ] }), size: "md", padding: "lg", overlayProps: {
    opacity: 0.55,
    blur: 3
  }, children: getModalBody() });
};
const useResendOrderConfirmation = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderId
    }) => orderClient.resendConfirmation(eventId, orderId)
  });
};
const useMarkOrderAsPaid = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderId
    }) => {
      return orderClient.markAsPaid(eventId, orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_ORDERS_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_COUNTS_QUERY_KEY]
      });
    }
  });
};
const useOrderActions = ({
  eventId,
  onManage,
  onEdit
}) => {
  const [isCancelModalOpen, cancelModal] = useDisclosure(false);
  const [isMessageModalOpen, messageModal] = useDisclosure(false);
  const [isRefundModalOpen, refundModal] = useDisclosure(false);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const resendConfirmationMutation = useResendOrderConfirmation();
  const markAsPaidMutation = useMarkOrderAsPaid();
  const clipboard = useClipboard({
    timeout: 2e3
  });
  const openModal = (order, modal) => {
    setSelectedOrderId(order.id);
    modal.open();
  };
  const handleMarkAsPaid = (order) => {
    markAsPaidMutation.mutate({
      eventId,
      orderId: order.id
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "nAn4Oe"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "F89D36"
        }
      ))
    });
  };
  const handleResendConfirmation = (order) => {
    resendConfirmationMutation.mutate({
      eventId,
      orderId: order.id
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "yZfBoy"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "mVKOW6"
        }
      ))
    });
  };
  const handleCopyCustomerLink = (order) => {
    clipboard.copy(eventCheckoutUrl(order.event_id, order.short_id, "summary"));
    showSuccess(i18n._(
      /*i18n*/
      {
        id: "2YeVGY"
      }
    ));
  };
  const handleInvoiceDownload = async (invoice) => {
    await withLoadingNotification(async () => {
      const blob = await orderClient.downloadInvoice(eventId, invoice.order_id);
      downloadBinary(blob, invoice.invoice_number + ".pdf");
    }, {
      loading: {
        title: i18n._(
          /*i18n*/
          {
            id: "yhjU+j"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "/IzmnP"
          }
        )
      },
      success: {
        title: i18n._(
          /*i18n*/
          {
            id: "zzDlyQ"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "bKOYkd"
          }
        )
      },
      error: {
        title: i18n._(
          /*i18n*/
          {
            id: "SlfejT"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "xDzTh7"
          }
        )
      }
    });
  };
  const getOrderActions = (order) => {
    const isRefundable = isOrderRefundable(order);
    const actions2 = [!!onManage && {
      key: "manage",
      label: i18n._(
        /*i18n*/
        {
          id: "WVgSTy"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconBasketCog, { size: 14 }),
      onClick: () => onManage(order),
      group: "primary"
    }, !!onEdit && {
      key: "edit",
      label: i18n._(
        /*i18n*/
        {
          id: "ePK91l"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconPencil, { size: 14 }),
      onClick: () => onEdit(order),
      group: "primary",
      dataTestId: "order-edit-button"
    }, {
      key: "message",
      label: i18n._(
        /*i18n*/
        {
          id: "Lvi+gV"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconSend, { size: 14 }),
      onClick: () => openModal(order, messageModal),
      group: "primary"
    }, order.status === "COMPLETED" && {
      key: "resend",
      label: i18n._(
        /*i18n*/
        {
          id: "VeKsnD"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconRepeat, { size: 14 }),
      onClick: () => handleResendConfirmation(order),
      group: "primary"
    }, order.status === "AWAITING_OFFLINE_PAYMENT" && {
      key: "mark-as-paid",
      label: i18n._(
        /*i18n*/
        {
          id: "vFjEnF"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconReceiptDollar, { size: 14 }),
      onClick: () => handleMarkAsPaid(order),
      group: "primary"
    }, isRefundable && {
      key: "refund",
      label: i18n._(
        /*i18n*/
        {
          id: "n10yGu"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconReceiptRefund, { size: 14 }),
      onClick: () => openModal(order, refundModal),
      group: "secondary"
    }, {
      key: "copy-link",
      label: i18n._(
        /*i18n*/
        {
          id: "cF2ICc"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconCopy, { size: 14 }),
      onClick: () => handleCopyCustomerLink(order),
      group: "secondary"
    }, !!order.latest_invoice && {
      key: "invoice",
      label: i18n._(
        /*i18n*/
        {
          id: "CELKku"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconReceipt2, { size: 14 }),
      onClick: () => handleInvoiceDownload(order.latest_invoice),
      group: "secondary"
    }, order.status !== "CANCELLED" && {
      key: "cancel",
      label: i18n._(
        /*i18n*/
        {
          id: "tVJk4q"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconTrash, { size: 14 }),
      onClick: () => openModal(order, cancelModal),
      group: "danger",
      color: "red"
    }];
    return actions2.filter(Boolean);
  };
  const orderActionModals = selectedOrderId && /* @__PURE__ */ jsxs(Fragment$1, { children: [
    isRefundModalOpen && /* @__PURE__ */ jsx(RefundOrderModal, { onClose: refundModal.close, orderId: selectedOrderId }),
    isCancelModalOpen && /* @__PURE__ */ jsx(CancelOrderModal, { onClose: cancelModal.close, orderId: selectedOrderId }),
    isMessageModalOpen && /* @__PURE__ */ jsx(SendMessageModal, { onClose: messageModal.close, orderId: selectedOrderId, messageType: MessageType.OrderOwner })
  ] });
  return {
    getOrderActions,
    orderActionModals,
    openMessageModal: (order) => openModal(order, messageModal),
    downloadInvoice: handleInvoiceDownload
  };
};
const useEditOrder = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      orderId,
      payload
    }) => orderClient.editOrder(eventId, orderId, payload),
    onSuccess: (_, variables) => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENT_ORDERS_QUERY_KEY, variables.eventId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_ORDER_QUERY_KEY, variables.orderId]
      })]);
    }
  });
};
const reference = "_reference_1xqqw_1";
const separator = "_separator_1xqqw_6";
const email = "_email_1xqqw_12";
const actions = "_actions_1xqqw_17";
const form = "_form_1xqqw_21";
const notes = "_notes_1xqqw_25";
const classes$1 = {
  reference,
  separator,
  email,
  actions,
  form,
  notes
};
const content = "_content_zyq5p_1";
const body = "_body_zyq5p_6";
const header = "_header_zyq5p_14";
const headerActions = "_headerActions_zyq5p_28";
const scrollArea = "_scrollArea_zyq5p_36";
const footer = "_footer_zyq5p_42";
const heading = "_heading_zyq5p_54";
const headingMedia = "_headingMedia_zyq5p_61";
const headingText = "_headingText_zyq5p_65";
const headingTitle = "_headingTitle_zyq5p_69";
const headingSubtitle = "_headingSubtitle_zyq5p_86";
const stats = "_stats_zyq5p_102";
const stat = "_stat_zyq5p_102";
const statLabel = "_statLabel_zyq5p_119";
const statValue = "_statValue_zyq5p_127";
const section = "_section_zyq5p_139";
const sectionHeader = "_sectionHeader_zyq5p_147";
const sectionTitle = "_sectionTitle_zyq5p_154";
const sectionCount = "_sectionCount_zyq5p_163";
const surface = "_surface_zyq5p_178";
const fields = "_fields_zyq5p_185";
const field = "_field_zyq5p_185";
const fieldLabel = "_fieldLabel_zyq5p_196";
const fieldValue = "_fieldValue_zyq5p_202";
const placeholder = "_placeholder_zyq5p_210";
const classes = {
  content,
  body,
  header,
  headerActions,
  scrollArea,
  footer,
  heading,
  headingMedia,
  headingText,
  headingTitle,
  headingSubtitle,
  stats,
  stat,
  statLabel,
  statValue,
  section,
  sectionHeader,
  sectionTitle,
  sectionCount,
  surface,
  fields,
  field,
  fieldLabel,
  fieldValue,
  placeholder
};
const SideDrawerHeading = ({
  media,
  title: title2,
  subtitle
}) => /* @__PURE__ */ jsxs("div", { className: classes.heading, children: [
  media && /* @__PURE__ */ jsx("div", { className: classes.headingMedia, children: media }),
  /* @__PURE__ */ jsxs("div", { className: classes.headingText, children: [
    /* @__PURE__ */ jsx("div", { className: classes.headingTitle, children: title2 }),
    subtitle && /* @__PURE__ */ jsx("div", { className: classes.headingSubtitle, children: subtitle })
  ] })
] });
const SideDrawerStats = ({
  stats: stats2
}) => /* @__PURE__ */ jsx("div", { className: classes.stats, children: stats2.map((stat2) => /* @__PURE__ */ jsxs("div", { className: classes.stat, children: [
  /* @__PURE__ */ jsx("div", { className: classes.statLabel, children: stat2.label }),
  /* @__PURE__ */ jsx("div", { className: classes.statValue, children: stat2.value })
] }, stat2.label)) });
const SideDrawerSection = ({
  title: title2,
  count,
  surface: surface2,
  children
}) => /* @__PURE__ */ jsxs("section", { className: classes.section, children: [
  /* @__PURE__ */ jsxs("div", { className: classes.sectionHeader, children: [
    /* @__PURE__ */ jsx("h3", { className: classes.sectionTitle, children: title2 }),
    count !== void 0 && /* @__PURE__ */ jsx("span", { className: classes.sectionCount, children: count })
  ] }),
  surface2 ? /* @__PURE__ */ jsx("div", { className: classes.surface, children }) : children
] });
const SideDrawerFields = ({
  fields: fields2
}) => /* @__PURE__ */ jsx("div", { className: classes.fields, children: fields2.map((field2) => /* @__PURE__ */ jsxs("div", { className: classes.field, children: [
  /* @__PURE__ */ jsx("div", { className: classes.fieldLabel, children: field2.label }),
  /* @__PURE__ */ jsx("div", { className: classes.fieldValue, children: field2.value })
] }, field2.label)) });
const HeadingPlaceholder = () => /* @__PURE__ */ jsxs("div", { className: classes.heading, children: [
  /* @__PURE__ */ jsx(Skeleton, { height: 42, circle: true }),
  /* @__PURE__ */ jsxs("div", { className: classes.headingText, children: [
    /* @__PURE__ */ jsx(Skeleton, { height: 13, width: "45%", radius: "sm" }),
    /* @__PURE__ */ jsx(Skeleton, { height: 10, width: "70%", radius: "sm", mt: 10 })
  ] })
] });
const ContentPlaceholder = () => /* @__PURE__ */ jsxs("div", { className: classes.placeholder, children: [
  /* @__PURE__ */ jsx(Skeleton, { height: 74, radius: "md" }),
  [45, 70, 55, 65].map((width, index) => /* @__PURE__ */ jsx(Skeleton, { height: 12, width: `${width}%`, radius: "sm" }, index))
] });
const SideDrawer = ({
  header: header2,
  actions: actions2,
  footer: footer2,
  loading,
  children,
  ...props
}) => {
  const headingId = useId();
  return /* @__PURE__ */ jsxs(Drawer, { ...props, "aria-labelledby": headingId, position: "right", size: "xl", withCloseButton: false, closeOnClickOutside: false, overlayProps: {
    opacity: 0.55,
    blur: 3
  }, classNames: {
    content: classes.content,
    body: classes.body
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.header, "data-bordered": header2 || loading ? true : void 0, id: headingId, children: [
      loading ? /* @__PURE__ */ jsx(HeadingPlaceholder, {}) : header2,
      /* @__PURE__ */ jsxs("div", { className: classes.headerActions, children: [
        actions2,
        /* @__PURE__ */ jsx(CloseButton, { "aria-label": i18n._(
          /*i18n*/
          {
            id: "yz7wBu"
          }
        ), onClick: props.onClose, size: "lg", radius: "xl" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes.scrollArea, "data-autofocus": true, tabIndex: -1, children: loading ? /* @__PURE__ */ jsx(ContentPlaceholder, {}) : children }),
    footer2 && /* @__PURE__ */ jsx("div", { className: classes.footer, children: footer2 })
  ] });
};
const FORM_ID = "manage-order-form";
const ManageOrderModal = ({
  onClose,
  orderId
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: order,
    refetch: refetchOrder
  } = useGetOrder(eventId, orderId);
  const {
    data: event,
    data: {
      product_categories: productCategories
    } = {}
  } = useGetEvent(eventId);
  const products = productCategories == null ? void 0 : productCategories.flatMap((category) => category.products);
  const [isEditing, setIsEditing] = useState(false);
  const errorHandler = useFormErrorResponseHandler();
  const mutation = useEditOrder();
  const {
    getOrderActions,
    orderActionModals
  } = useOrderActions({
    eventId,
    onEdit: () => setIsEditing(true)
  });
  const form2 = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      notes: ""
    }
  });
  useEffect(() => {
    if (order) {
      form2.initialize({
        first_name: order.first_name,
        last_name: order.last_name,
        email: order.email,
        notes: order.notes || ""
      });
    }
  }, [order]);
  if (!order || !event) {
    return /* @__PURE__ */ jsx(SideDrawer, { opened: true, onClose, loading: true });
  }
  const handleSubmit = (values) => {
    mutation.mutate({
      eventId,
      orderId,
      payload: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "4H80qv"
          }
        ));
        setIsEditing(false);
      },
      onError: (error) => errorHandler(form2, error)
    });
  };
  const handleCancelEdit = () => {
    form2.reset();
    setIsEditing(false);
  };
  const buyerName = `${order.first_name} ${order.last_name}`;
  const questionAnswers = order.question_answers ?? [];
  const attendees = order.attendees ?? [];
  const occurrences = Array.from(new Map((order.order_items ?? []).filter((item) => item.event_occurrence).map((item) => [item.event_occurrence.id, item.event_occurrence])).values());
  const stats2 = [{
    label: i18n._(
      /*i18n*/
      {
        id: "72c5Qo"
      }
    ),
    value: /* @__PURE__ */ jsx(Currency, { currency: order.currency, price: order.total_gross })
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "BzfzPK"
      }
    ),
    value: (order.order_items ?? []).reduce((total2, item) => total2 + item.quantity, 0)
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    value: /* @__PURE__ */ jsx(OrderStatusBadge, { order, variant: "light" })
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "XqdYDH"
      }
    ),
    value: /* @__PURE__ */ jsx(Tooltip, { label: prettyDate(order.created_at, event.timezone), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsx("span", { children: relativeDate(order.created_at) }) })
  }];
  const fields2 = [{
    label: i18n._(
      /*i18n*/
      {
        id: "O3oNi5"
      }
    ),
    value: /* @__PURE__ */ jsx(Anchor, { href: "mailto:" + order.email, target: "_blank", children: order.email })
  }, ...occurrences.length > 0 ? [{
    label: occurrences.length === 1 ? i18n._(
      /*i18n*/
      {
        id: "6u1B3O"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "byXCTu"
      }
    ),
    value: occurrences.map((occurrence) => /* @__PURE__ */ jsxs("div", { children: [
      formatDateWithLocale(occurrence.start_date, "shortDate", event.timezone),
      " ",
      formatDateWithLocale(occurrence.start_date, "timeOnly", event.timezone),
      occurrence.label && ` · ${occurrence.label}`
    ] }, occurrence.id))
  }] : [], ...order.payment_provider ? [{
    label: i18n._(
      /*i18n*/
      {
        id: "QzmQBG"
      }
    ),
    value: capitalize(order.payment_provider)
  }] : [], ...order.promo_code ? [{
    label: i18n._(
      /*i18n*/
      {
        id: "JoKGiJ"
      }
    ),
    value: order.promo_code
  }] : [], ...order.total_refunded > 0 ? [{
    label: i18n._(
      /*i18n*/
      {
        id: "m3FM1g"
      }
    ),
    value: /* @__PURE__ */ jsx(Currency, { currency: order.currency, price: order.total_refunded })
  }] : [], ...order.address ? [{
    label: i18n._(
      /*i18n*/
      {
        id: "Du6bPw"
      }
    ),
    value: formatAddress(order.address)
  }] : []];
  const header2 = /* @__PURE__ */ jsx(SideDrawerHeading, { media: /* @__PURE__ */ jsx(Avatar, { size: 42, radius: "xl", variant: "light", color: "primary", children: getInitials(buyerName) }), title: /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("span", { className: classes$1.reference, children: order.public_id }),
    /* @__PURE__ */ jsx(CopyButton, { value: String(order.public_id), children: ({
      copied,
      copy
    }) => /* @__PURE__ */ jsx(Tooltip, { label: copied ? i18n._(
      /*i18n*/
      {
        id: "6V3Ea3"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "he3ygx"
      }
    ), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", size: "sm", radius: "xl", "aria-label": i18n._(
      /*i18n*/
      {
        id: "he3ygx"
      }
    ), onClick: copy, children: copied ? /* @__PURE__ */ jsx(IconCheck, { size: 14 }) : /* @__PURE__ */ jsx(IconCopy, { size: 14 }) }) }) })
  ] }), subtitle: /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("span", { children: buyerName }),
    /* @__PURE__ */ jsx("span", { className: classes$1.separator, children: "·" }),
    /* @__PURE__ */ jsx("span", { className: classes$1.email, children: order.email })
  ] }) });
  const footer2 = isEditing && /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(Button, { variant: "default", onClick: handleCancelEdit, children: i18n._(
      /*i18n*/
      {
        id: "dEgA5A"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { type: "submit", form: FORM_ID, loading: mutation.isPending, children: i18n._(
      /*i18n*/
      {
        id: "IUwGEM"
      }
    ) })
  ] });
  return /* @__PURE__ */ jsxs(SideDrawer, { opened: true, onClose, header: header2, footer: footer2, children: [
    isEditing ? /* @__PURE__ */ jsxs("form", { id: FORM_ID, onSubmit: form2.onSubmit(handleSubmit), className: classes$1.form, children: [
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { ...form2.getInputProps("first_name"), label: i18n._(
          /*i18n*/
          {
            id: "V1EGGU"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "c3E/kw"
          }
        ), required: true }),
        /* @__PURE__ */ jsx(TextInput, { ...form2.getInputProps("last_name"), label: i18n._(
          /*i18n*/
          {
            id: "1ZaQUH"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "yTnnYg"
          }
        ), required: true })
      ] }),
      /* @__PURE__ */ jsx(TextInput, { ...form2.getInputProps("email"), label: i18n._(
        /*i18n*/
        {
          id: "ATGYL1"
        }
      ), placeholder: "homer@simpson.com", required: true }),
      /* @__PURE__ */ jsx(Textarea, { label: /* @__PURE__ */ jsx(InputLabelWithHelp, { label: i18n._(
        /*i18n*/
        {
          id: "1DBGsz"
        }
      ), helpText: i18n._(
        /*i18n*/
        {
          id: "l3sZO1"
        }
      ) }), ...form2.getInputProps("notes"), placeholder: i18n._(
        /*i18n*/
        {
          id: "xMekgu"
        }
      ), minRows: 3, maxRows: 6, autosize: true })
    ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(SideDrawerStats, { stats: stats2 }),
      /* @__PURE__ */ jsx("div", { className: classes$1.actions, children: /* @__PURE__ */ jsx(EntityActionBar, { actions: getOrderActions(order) }) }),
      /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "URmyfc"
        }
      ), children: /* @__PURE__ */ jsx(SideDrawerFields, { fields: fields2 }) }),
      /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "GX6dZv"
        }
      ), surface: true, children: /* @__PURE__ */ jsx(OrderSummary, { event, order }) }),
      order.notes && /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "1DBGsz"
        }
      ), children: /* @__PURE__ */ jsx(Text, { size: "sm", className: classes$1.notes, children: order.notes }) }),
      attendees.length > 0 && /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "9SZT4E"
        }
      ), count: attendees.length, children: /* @__PURE__ */ jsx(AttendeeList, { refetchOrder, order, products, questionAnswers }) }),
      questionAnswers.length > 0 && /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "ROv2ZT"
        }
      ), count: questionAnswers.length, children: /* @__PURE__ */ jsx(QuestionAndAnswerList, { onEditAnswer: refetchOrder, questionAnswers }) })
    ] }),
    orderActionModals
  ] });
};
export {
  EntityActionBar as E,
  GET_EVENT_ORDERS_QUERY_KEY as G,
  ManageOrderModal as M,
  QuestionList as Q,
  SideDrawer as S,
  SideDrawerHeading as a,
  SideDrawerStats as b,
  SideDrawerSection as c,
  SideDrawerFields as d,
  useOrderActions as e,
  EntityActionMenuItems as f,
  toActionMenuGroups as t,
  useGetEventOrders as u
};

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Menu, Tooltip, ActionIcon, Stack } from "@mantine/core";
import { IconAlertTriangle, IconX, IconCheck, IconDotsVertical, IconPencil, IconCopy, IconChartBar, IconUsers, IconReceipt, IconSend, IconClipboardList, IconShare, IconPlayerPlay, IconTrash, IconQrcode, IconArrowRight, IconPlus, IconList, IconChevronRight } from "@tabler/icons-react";
import { d as EventOccurrenceStatus } from "./types-CqPWB-a5.js";
import { useState, useCallback, useEffect } from "react";
import { u as useGetEventCheckInLists } from "./useGetCheckInLists-DZb0QIwp.js";
import { C as CreateCheckInListModal } from "./index-BmGsefon.js";
import { useNavigate } from "react-router";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { a as showError } from "./notifications-Coh3Ef-t.js";
const buildActions = (occ, actions) => {
  const isActive = occ.status === EventOccurrenceStatus.ACTIVE;
  const isCancelled = occ.status === EventOccurrenceStatus.CANCELLED;
  const id = occ.id;
  const items = [{
    key: "edit",
    icon: /* @__PURE__ */ jsx(IconPencil, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "ePK91l"
      }
    ),
    onClick: () => actions.onEdit(id),
    group: "primary"
  }, !!actions.onDuplicate && {
    key: "duplicate",
    icon: /* @__PURE__ */ jsx(IconCopy, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "euc6Ns"
      }
    ),
    onClick: () => actions.onDuplicate(occ),
    group: "secondary"
  }, {
    key: "dashboard",
    icon: /* @__PURE__ */ jsx(IconChartBar, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "7p5kLi"
      }
    ),
    onClick: () => actions.onNavigate(`/manage/event/${actions.eventId}/occurrences/${occ.id}`),
    group: "primary"
  }, {
    key: "attendees",
    icon: /* @__PURE__ */ jsx(IconUsers, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "9SZT4E"
      }
    ),
    onClick: () => actions.onNavigate(`/manage/event/${actions.eventId}/attendees?filterFields[event_occurrence_id][eq]=${occ.id}`),
    group: "secondary"
  }, {
    key: "orders",
    icon: /* @__PURE__ */ jsx(IconReceipt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "1h+RBg"
      }
    ),
    onClick: () => actions.onNavigate(`/manage/event/${actions.eventId}/orders?filterFields[event_occurrence_id][eq]=${occ.id}`),
    group: "secondary"
  }, !!actions.onMessage && {
    key: "message",
    icon: /* @__PURE__ */ jsx(IconSend, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "xDAtGP"
      }
    ),
    onClick: () => actions.onMessage(id),
    group: "primary"
  }, !!actions.onCheckIn && !isCancelled && {
    key: "checkin",
    icon: /* @__PURE__ */ jsx(IconClipboardList, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "Y3FYXy"
      }
    ),
    onClick: () => actions.onCheckIn(id),
    group: "primary"
  }, !!actions.onShare && !isCancelled && {
    key: "share",
    icon: /* @__PURE__ */ jsx(IconShare, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "Z8lGw6"
      }
    ),
    onClick: () => actions.onShare(occ),
    group: "primary"
  }, isCancelled && !!actions.onReactivate && {
    key: "reactivate",
    icon: /* @__PURE__ */ jsx(IconPlayerPlay, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "KkJtVK"
      }
    ),
    onClick: () => actions.onReactivate(occ),
    group: "primary",
    color: "green"
  }, isActive && {
    key: "cancel",
    icon: /* @__PURE__ */ jsx(IconX, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "dEgA5A"
      }
    ),
    onClick: () => actions.onCancel(id),
    group: "danger",
    color: "red"
  }, {
    key: "delete",
    icon: /* @__PURE__ */ jsx(IconTrash, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "cnGeoo"
      }
    ),
    onClick: () => actions.onDelete(id),
    group: "danger",
    color: "red"
  }];
  return items.filter(Boolean);
};
const OccurrenceMenuItems = ({
  occurrence,
  actions
}) => {
  const allActions = buildActions(occurrence, actions);
  const primary = allActions.filter((a) => a.group === "primary");
  const secondary = allActions.filter((a) => a.group === "secondary");
  const danger = allActions.filter((a) => a.group === "danger");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
      /*i18n*/
      {
        id: "wckWOP"
      }
    ) }),
    [...primary, ...secondary].map((action) => /* @__PURE__ */ jsx(Menu.Item, { leftSection: action.icon, onClick: action.onClick, color: action.color, children: action.label }, action.key)),
    danger.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
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
const actionButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  padding: "6px 10px",
  borderRadius: "var(--mantine-radius-sm)",
  fontSize: "var(--mantine-font-size-xs)",
  fontWeight: 500,
  cursor: "pointer",
  border: "none",
  background: "var(--mantine-color-gray-1)",
  color: "var(--mantine-color-text)",
  transition: "background 0.1s",
  whiteSpace: "nowrap"
};
const OccurrenceActionBar = ({
  occurrence,
  actions,
  hiddenKeys
}) => {
  const allActions = buildActions(occurrence, actions).filter((a) => !(hiddenKeys == null ? void 0 : hiddenKeys.includes(a.key)));
  const primary = allActions.filter((a) => a.group === "primary");
  const overflow = allActions.filter((a) => a.group === "secondary" || a.group === "danger");
  const overflowSecondary = overflow.filter((a) => a.group === "secondary");
  const overflowDanger = overflow.filter((a) => a.group === "danger");
  const getStyle = (action) => {
    if (action.color === "green") {
      return {
        style: {
          ...actionButtonStyle,
          background: "var(--mantine-color-green-0)",
          color: "var(--mantine-color-green-7)"
        },
        hoverBg: "var(--mantine-color-green-1)",
        restBg: "var(--mantine-color-green-0)"
      };
    }
    return {
      style: actionButtonStyle,
      hoverBg: "var(--mantine-color-gray-2)",
      restBg: "var(--mantine-color-gray-1)"
    };
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center"
  }, children: [
    primary.map((action) => {
      const {
        style,
        hoverBg,
        restBg
      } = getStyle(action);
      return /* @__PURE__ */ jsxs("button", { type: "button", style, onClick: action.onClick, onMouseEnter: (e) => e.currentTarget.style.background = hoverBg, onMouseLeave: (e) => e.currentTarget.style.background = restBg, children: [
        action.icon,
        " ",
        action.label
      ] }, action.key);
    }),
    overflow.length > 0 && /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, position: "bottom-end", children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
        /*i18n*/
        {
          id: "JcD7qf"
        }
      ), withArrow: true, children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", size: "sm", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 16 }) }) }) }),
      /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
        overflowSecondary.map((action) => /* @__PURE__ */ jsx(Menu.Item, { leftSection: action.icon, onClick: action.onClick, children: action.label }, action.key)),
        overflowDanger.length > 0 && overflowSecondary.length > 0 && /* @__PURE__ */ jsx(Menu.Divider, {}),
        overflowDanger.map((action) => /* @__PURE__ */ jsx(Menu.Item, { leftSection: action.icon, onClick: action.onClick, color: action.color, children: action.label }, action.key))
      ] })
    ] })
  ] });
};
const statusLabel = (status) => {
  switch (status) {
    case EventOccurrenceStatus.ACTIVE:
      return i18n._(
        /*i18n*/
        {
          id: "F6pfE9"
        }
      );
    case EventOccurrenceStatus.CANCELLED:
      return i18n._(
        /*i18n*/
        {
          id: "vv7kpg"
        }
      );
    case EventOccurrenceStatus.SOLD_OUT:
      return i18n._(
        /*i18n*/
        {
          id: "Mi1rVn"
        }
      );
    default:
      return status || "";
  }
};
const StatusIcon = ({
  status
}) => {
  switch (status) {
    case EventOccurrenceStatus.ACTIVE:
      return /* @__PURE__ */ jsx(IconCheck, { size: 14 });
    case EventOccurrenceStatus.CANCELLED:
      return /* @__PURE__ */ jsx(IconX, { size: 14 });
    case EventOccurrenceStatus.SOLD_OUT:
      return /* @__PURE__ */ jsx(IconAlertTriangle, { size: 14 });
    default:
      return null;
  }
};
const openCheckInTab = (shortId, occurrenceId) => {
  if (typeof window === "undefined") return;
  const suffix = occurrenceId ? `?occurrence=${occurrenceId}` : "";
  window.open(`/check-in/${shortId}${suffix}`, "_blank");
};
const launchCheckInForOccurrence = ({
  occurrenceId,
  checkInLists,
  onCreateForOccurrence,
  onSelectList
}) => {
  const hasUsableList = checkInLists == null ? void 0 : checkInLists.some((list) => !list.event_occurrence_id || list.event_occurrence_id === occurrenceId);
  if (hasUsableList) {
    onSelectList(occurrenceId);
    return;
  }
  onCreateForOccurrence(occurrenceId);
};
const primaryAction = "_primaryAction_1ltt0_1";
const primaryIcon = "_primaryIcon_1ltt0_26";
const primaryText = "_primaryText_1ltt0_38";
const primaryName = "_primaryName_1ltt0_46";
const primaryMeta = "_primaryMeta_1ltt0_55";
const primaryArrow = "_primaryArrow_1ltt0_60";
const listCard = "_listCard_1ltt0_65";
const listCardIcon = "_listCardIcon_1ltt0_91";
const listCardArrow = "_listCardArrow_1ltt0_103";
const divider = "_divider_1ltt0_108";
const actionRow = "_actionRow_1ltt0_114";
const actionRowIcon = "_actionRowIcon_1ltt0_137";
const actionRowLabel = "_actionRowLabel_1ltt0_143";
const actionRowChevron = "_actionRowChevron_1ltt0_148";
const classes = {
  primaryAction,
  primaryIcon,
  primaryText,
  primaryName,
  primaryMeta,
  primaryArrow,
  listCard,
  listCardIcon,
  listCardArrow,
  divider,
  actionRow,
  actionRowIcon,
  actionRowLabel,
  actionRowChevron
};
const SelectCheckInListModal = ({
  onClose,
  eventId,
  occurrenceId,
  lists,
  onCreateForOccurrence
}) => {
  const navigate = useNavigate();
  const defaultList = lists.find((list) => list.is_system_default) ?? lists.find((list) => !list.event_occurrence_id);
  const scopedLists = lists.filter((list) => list.event_occurrence_id === occurrenceId);
  const orderedLists = [defaultList, ...scopedLists].filter((list) => Boolean(list)).filter((list, index, all) => all.findIndex((other) => other.short_id === list.short_id) === index);
  const startCheckIn = (list) => {
    openCheckInTab(list.short_id, list.event_occurrence_id ? void 0 : occurrenceId);
    onClose();
  };
  const handleCreate = () => {
    onCreateForOccurrence(occurrenceId);
    onClose();
  };
  const handleViewAll = () => {
    onClose();
    navigate(`/manage/event/${eventId}/check-in`);
  };
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "StWUH4"
    }
  ), size: "sm", children: /* @__PURE__ */ jsxs(Stack, { gap: 4, children: [
    /* @__PURE__ */ jsx(Stack, { gap: 8, children: orderedLists.map((list, index) => {
      const isPrimary = index === 0;
      return /* @__PURE__ */ jsxs("button", { type: "button", className: isPrimary ? classes.primaryAction : classes.listCard, onClick: () => startCheckIn(list), children: [
        /* @__PURE__ */ jsx("span", { className: isPrimary ? classes.primaryIcon : classes.listCardIcon, children: /* @__PURE__ */ jsx(IconQrcode, { size: 22 }) }),
        /* @__PURE__ */ jsxs("span", { className: classes.primaryText, children: [
          /* @__PURE__ */ jsx("span", { className: classes.primaryName, children: list.name }),
          /* @__PURE__ */ jsx("span", { className: classes.primaryMeta, children: list.event_occurrence_id ? i18n._(
            /*i18n*/
            {
              id: "E9BqZw"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "WEYdDv"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(IconArrowRight, { size: 18, className: isPrimary ? classes.primaryArrow : classes.listCardArrow })
      ] }, list.short_id);
    }) }),
    /* @__PURE__ */ jsx("div", { className: classes.divider }),
    /* @__PURE__ */ jsxs("button", { type: "button", className: classes.actionRow, onClick: handleCreate, children: [
      /* @__PURE__ */ jsx(IconPlus, { size: 18, className: classes.actionRowIcon }),
      /* @__PURE__ */ jsx("span", { className: classes.actionRowLabel, children: i18n._(
        /*i18n*/
        {
          id: "jqhTmw"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("button", { type: "button", className: classes.actionRow, onClick: handleViewAll, children: [
      /* @__PURE__ */ jsx(IconList, { size: 18, className: classes.actionRowIcon }),
      /* @__PURE__ */ jsx("span", { className: classes.actionRowLabel, children: i18n._(
        /*i18n*/
        {
          id: "YSE15b"
        }
      ) }),
      /* @__PURE__ */ jsx(IconChevronRight, { size: 16, className: classes.actionRowChevron })
    ] })
  ] }) });
};
const useOccurrenceCheckIn = (eventId) => {
  var _a;
  const checkInListsQuery = useGetEventCheckInLists(eventId);
  const checkInLists = (_a = checkInListsQuery == null ? void 0 : checkInListsQuery.data) == null ? void 0 : _a.data;
  const [createForOccurrenceId, setCreateForOccurrenceId] = useState();
  const [selectForOccurrenceId, setSelectForOccurrenceId] = useState(null);
  const [pendingOccurrenceId, setPendingOccurrenceId] = useState(null);
  const launch = useCallback((occurrenceId) => {
    launchCheckInForOccurrence({
      occurrenceId,
      checkInLists,
      onCreateForOccurrence: setCreateForOccurrenceId,
      onSelectList: setSelectForOccurrenceId
    });
  }, [checkInLists]);
  const launchCheckIn = useCallback((occurrenceId) => {
    if (checkInListsQuery.isLoading || checkInListsQuery.isFetching) {
      setPendingOccurrenceId(occurrenceId);
      return;
    }
    launch(occurrenceId);
  }, [checkInListsQuery.isLoading, checkInListsQuery.isFetching, launch]);
  useEffect(() => {
    if (pendingOccurrenceId === null) return;
    if (checkInListsQuery.isLoading || checkInListsQuery.isFetching) return;
    const occurrenceId = pendingOccurrenceId;
    setPendingOccurrenceId(null);
    if (checkInListsQuery.isError) {
      showError(i18n._(
        /*i18n*/
        {
          id: "Fjj/5/"
        }
      ));
      return;
    }
    launch(occurrenceId);
  }, [pendingOccurrenceId, checkInListsQuery.isLoading, checkInListsQuery.isFetching, checkInListsQuery.isError, launch]);
  const checkInModals = /* @__PURE__ */ jsxs(Fragment, { children: [
    selectForOccurrenceId !== null && /* @__PURE__ */ jsx(SelectCheckInListModal, { onClose: () => setSelectForOccurrenceId(null), eventId, occurrenceId: selectForOccurrenceId, lists: (checkInLists ?? []).filter((list) => !list.event_occurrence_id || list.event_occurrence_id === selectForOccurrenceId), onCreateForOccurrence: setCreateForOccurrenceId }),
    createForOccurrenceId && /* @__PURE__ */ jsx(CreateCheckInListModal, { onClose: () => setCreateForOccurrenceId(void 0), initialOccurrenceId: createForOccurrenceId })
  ] });
  return {
    launchCheckIn,
    checkInModals
  };
};
export {
  OccurrenceMenuItems as O,
  StatusIcon as S,
  OccurrenceActionBar as a,
  statusLabel as s,
  useOccurrenceCheckIn as u
};

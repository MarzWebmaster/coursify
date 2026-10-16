import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState, useRef, useMemo } from "react";
import { ActionIcon, Popover, Text, Button, Menu } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconX, IconPlus, IconDotsVertical } from "@tabler/icons-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { f as formatDateWithLocale, a as formatOccurrenceEnd } from "./dates-CbVpwZeX.js";
import { O as OccurrenceMenuItems } from "./useOccurrenceCheckIn-CRXwKNrq.js";
const calendarContainer = "_calendarContainer_130vm_1";
const monthNav = "_monthNav_130vm_8";
const monthLabel = "_monthLabel_130vm_15";
const calendarGrid = "_calendarGrid_130vm_21";
const dayHeader = "_dayHeader_130vm_26";
const dayCell = "_dayCell_130vm_37";
const otherMonth = "_otherMonth_130vm_52";
const selected = "_selected_130vm_56";
const today = "_today_130vm_61";
const dayNumber = "_dayNumber_130vm_61";
const dayDots = "_dayDots_130vm_79";
const occurrenceDot = "_occurrenceDot_130vm_85";
const moreCount = "_moreCount_130vm_111";
const popoverContent = "_popoverContent_130vm_118";
const popoverHeader = "_popoverHeader_130vm_123";
const popoverTitle = "_popoverTitle_130vm_131";
const popoverEmpty = "_popoverEmpty_130vm_137";
const popoverList = "_popoverList_130vm_142";
const popoverRow = "_popoverRow_130vm_147";
const popoverRowInfo = "_popoverRowInfo_130vm_162";
const popoverStatusDot = "_popoverStatusDot_130vm_170";
const popoverRowDetails = "_popoverRowDetails_130vm_187";
const popoverTime = "_popoverTime_130vm_194";
const popoverLabel = "_popoverLabel_130vm_201";
const popoverCapacity = "_popoverCapacity_130vm_210";
const classes = {
  calendarContainer,
  monthNav,
  monthLabel,
  calendarGrid,
  dayHeader,
  dayCell,
  otherMonth,
  selected,
  today,
  dayNumber,
  dayDots,
  occurrenceDot,
  moreCount,
  popoverContent,
  popoverHeader,
  popoverTitle,
  popoverEmpty,
  popoverList,
  popoverRow,
  popoverRowInfo,
  popoverStatusDot,
  popoverRowDetails,
  popoverTime,
  popoverLabel,
  popoverCapacity
};
dayjs.extend(utc);
dayjs.extend(timezone);
const MAX_DOTS = 3;
const CalendarView = ({
  occurrences,
  eventTimezone,
  currentMonth,
  onMonthChange,
  menuActions,
  onOccurrenceClick,
  onCreate
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const cellRefs = useRef({});
  const occurrencesByDate = useMemo(() => {
    const map = {};
    occurrences.forEach((occ) => {
      const dateKey = dayjs.utc(occ.start_date).tz(eventTimezone).format("YYYY-MM-DD");
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(occ);
    });
    return map;
  }, [occurrences, eventTimezone]);
  const calendarDays = useMemo(() => {
    const startOfMonth = currentMonth.startOf("month");
    const startDay = startOfMonth.day();
    const offset = startDay === 0 ? 6 : startDay - 1;
    const gridStart = startOfMonth.subtract(offset, "day");
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = gridStart.add(i, "day");
      days.push({
        date,
        isCurrentMonth: date.month() === currentMonth.month()
      });
    }
    return days;
  }, [currentMonth]);
  const todayStr = dayjs().tz(eventTimezone).format("YYYY-MM-DD");
  const dayNames = useMemo(() => {
    const start = dayjs().startOf("week").add(1, "day");
    return Array.from({
      length: 7
    }, (_, i) => start.add(i, "day").format("ddd"));
  }, []);
  const selectedOccurrences = selectedDate ? occurrencesByDate[selectedDate] || [] : [];
  const handleCellClick = (dateStr) => {
    setSelectedDate((prev) => prev === dateStr ? null : dateStr);
  };
  const closeAndDo = (fn) => {
    setSelectedDate(null);
    fn();
  };
  const popoverMenuActions = useMemo(() => {
    if (!menuActions) return void 0;
    return {
      ...menuActions,
      onEdit: (id) => closeAndDo(() => menuActions.onEdit(id)),
      onCancel: (id) => closeAndDo(() => menuActions.onCancel(id)),
      onDelete: (id) => closeAndDo(() => menuActions.onDelete(id)),
      onNavigate: (path) => closeAndDo(() => menuActions.onNavigate(path)),
      onDuplicate: menuActions.onDuplicate ? (occ) => closeAndDo(() => menuActions.onDuplicate(occ)) : void 0,
      onMessage: menuActions.onMessage ? (id) => closeAndDo(() => menuActions.onMessage(id)) : void 0,
      onCheckIn: menuActions.onCheckIn ? (id) => closeAndDo(() => menuActions.onCheckIn(id)) : void 0,
      onReactivate: menuActions.onReactivate ? (occ) => closeAndDo(() => menuActions.onReactivate(occ)) : void 0,
      onShare: menuActions.onShare ? (occ) => closeAndDo(() => menuActions.onShare(occ)) : void 0
    };
  }, [menuActions]);
  const renderPopoverContent = () => {
    if (!selectedDate) return null;
    return /* @__PURE__ */ jsxs("div", { className: classes.popoverContent, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.popoverHeader, children: [
        /* @__PURE__ */ jsx("span", { className: classes.popoverTitle, children: dayjs(selectedDate).format("dddd, MMMM D") }),
        /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", size: "xs", onClick: () => setSelectedDate(null), children: /* @__PURE__ */ jsx(IconX, { size: 14 }) })
      ] }),
      selectedOccurrences.length === 0 ? /* @__PURE__ */ jsxs("div", { className: classes.popoverEmpty, children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "sm", children: i18n._(
          /*i18n*/
          {
            id: "IFU1IG"
          }
        ) }),
        onCreate && /* @__PURE__ */ jsx(Button, { size: "compact-sm", variant: "light", leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 14 }), onClick: () => closeAndDo(() => onCreate(selectedDate)), children: i18n._(
          /*i18n*/
          {
            id: "0YEoxS"
          }
        ) })
      ] }) : /* @__PURE__ */ jsx("div", { className: classes.popoverList, children: selectedOccurrences.map((occ) => {
        const startTime = formatDateWithLocale(occ.start_date, "timeOnly", eventTimezone);
        const endTime = occ.end_date ? formatOccurrenceEnd(occ.end_date, occ.start_date, eventTimezone) : null;
        return /* @__PURE__ */ jsxs("div", { className: classes.popoverRow, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.popoverRowInfo, onClick: () => closeAndDo(() => onOccurrenceClick == null ? void 0 : onOccurrenceClick(occ.id)), style: onOccurrenceClick ? {
            cursor: "pointer"
          } : void 0, children: [
            /* @__PURE__ */ jsx("div", { className: classes.popoverStatusDot, "data-status": occ.status }),
            /* @__PURE__ */ jsxs("div", { className: classes.popoverRowDetails, children: [
              /* @__PURE__ */ jsxs("span", { className: classes.popoverTime, children: [
                startTime,
                endTime && /* @__PURE__ */ jsxs(Fragment, { children: [
                  " – ",
                  endTime
                ] })
              ] }),
              occ.label && /* @__PURE__ */ jsx("span", { className: classes.popoverLabel, children: occ.label }),
              /* @__PURE__ */ jsx("span", { className: classes.popoverCapacity, children: occ.capacity != null ? /* @__PURE__ */ jsxs(Fragment, { children: [
                occ.used_capacity ?? 0,
                " / ",
                occ.capacity
              ] }) : i18n._(
                /*i18n*/
                {
                  id: "NIuIk1"
                }
              ) })
            ] })
          ] }),
          popoverMenuActions && /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, position: "bottom-end", children: [
            /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", size: "sm", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 14 }) }) }),
            /* @__PURE__ */ jsx(Menu.Dropdown, { children: /* @__PURE__ */ jsx(OccurrenceMenuItems, { occurrence: occ, actions: popoverMenuActions }) })
          ] })
        ] }, occ.id);
      }) })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: classes.calendarContainer, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.monthNav, children: [
      /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", onClick: () => onMonthChange(currentMonth.subtract(1, "month")), children: /* @__PURE__ */ jsx(IconChevronLeft, { size: 18 }) }),
      /* @__PURE__ */ jsx("span", { className: classes.monthLabel, children: currentMonth.format("MMMM YYYY") }),
      /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", onClick: () => onMonthChange(currentMonth.add(1, "month")), children: /* @__PURE__ */ jsx(IconChevronRight, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.calendarGrid, children: [
      dayNames.map((name) => /* @__PURE__ */ jsx("div", { className: classes.dayHeader, children: name }, name)),
      calendarDays.map(({
        date,
        isCurrentMonth
      }) => {
        const dateStr = date.format("YYYY-MM-DD");
        const dayOccs = occurrencesByDate[dateStr] || [];
        const isSelected = selectedDate === dateStr;
        const isToday = dateStr === todayStr;
        const cellClasses = [classes.dayCell, !isCurrentMonth && classes.otherMonth, isSelected && classes.selected, isToday && classes.today].filter(Boolean).join(" ");
        return /* @__PURE__ */ jsxs(Popover, { opened: isSelected && (selectedOccurrences.length > 0 || dayOccs.length === 0), onClose: () => setSelectedDate(null), position: "bottom", withArrow: true, shadow: "lg", width: 320, trapFocus: false, clickOutsideEvents: ["mousedown"], children: [
          /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsxs("div", { ref: (el) => {
            cellRefs.current[dateStr] = el;
          }, className: cellClasses, onClick: () => handleCellClick(dateStr), children: [
            /* @__PURE__ */ jsx("div", { className: classes.dayNumber, children: date.date() }),
            dayOccs.length > 0 && /* @__PURE__ */ jsxs("div", { className: classes.dayDots, children: [
              dayOccs.slice(0, MAX_DOTS).map((occ) => {
                const fillPct = occ.capacity ? Math.min(100, Math.round((occ.used_capacity ?? 0) / occ.capacity * 100)) : 0;
                return /* @__PURE__ */ jsxs("div", { className: classes.occurrenceDot, "data-status": occ.status, style: {
                  "--fill-pct": fillPct
                }, children: [
                  formatDateWithLocale(occ.start_date, "timeOnly", eventTimezone),
                  occ.label && ` · ${occ.label}`
                ] }, occ.id);
              }),
              dayOccs.length > MAX_DOTS && /* @__PURE__ */ jsxs("span", { className: classes.moreCount, children: [
                "+",
                dayOccs.length - MAX_DOTS,
                " ",
                i18n._(
                  /*i18n*/
                  {
                    id: "f8jrkd"
                  }
                )
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Popover.Dropdown, { p: 0, children: renderPopoverContent() })
        ] }, dateStr);
      })
    ] })
  ] });
};
export {
  CalendarView as C
};

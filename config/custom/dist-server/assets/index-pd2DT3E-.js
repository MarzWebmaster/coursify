import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { useNavigate, useParams, useLocation } from "react-router";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { u as useGetEventStats, S as StatBoxes, P as ProductSalesChartCard, R as RevenueChartCard } from "./index-R-MWObZZ.js";
import { u as useGetMe } from "../entry.server.js";
import { f as formatDateWithLocale, a as formatOccurrenceEnd } from "./dates-CbVpwZeX.js";
import { Skeleton, Anchor, Button } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { useState, useMemo, useEffect, useRef } from "react";
import { Q as QueryFilterOperator, d as EventOccurrenceStatus, E as EventType, e as EventLifecycleStatus, b as EventStatus } from "./types-CqPWB-a5.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { C as CalendarView } from "./index-CK3ZfAh1.js";
import { IconBroadcast, IconCalendarEvent, IconUsers, IconArrowRight, IconX, IconCircleCheck, IconCircle, IconCheck } from "@tabler/icons-react";
import { u as useGetEventOccurrence } from "./useGetEventOccurrence-Csyd2oEM.js";
import { u as useOccurrenceCheckIn } from "./useOccurrenceCheckIn-CRXwKNrq.js";
import { t as trackEvent, A as AnalyticsEvents } from "./analytics-Cd4RPKa9.js";
import { u as useGetOrganizer } from "./useGetOrganizer-DMDsW5DW.js";
import { u as useGetEventProductCategories } from "./useGetProductCategories-BfShm84T.js";
import { u as useGetEventImages } from "./useGetEventImages-BmsHxpY1.js";
import { P as PeriodSelector } from "./index-DqP6bUOf.js";
import { p as periodPresetToDateRange } from "./periodPreset-yPBfrqeg.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { u as useResendEmailConfirmation } from "./useResendEmailConfirmation-DWCgfO2b.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { P as PublishEventModal, E as EventLiveCelebrationModal } from "./index-Dz80WDaH.js";
import { e as eventHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import "@tanstack/react-query";
import "./currency-Br7a8J7F.js";
import "@mantine/charts";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/advancedFormat.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./useGetCheckInLists-DZb0QIwp.js";
import "./index-BmGsefon.js";
import "./index-AhXgh6Nz.js";
import "./index-CwAoF9NO.js";
import "./index-gUnclHYL.js";
import "./index-CwjvB_vn.js";
import "./index-CnTFmtaW.js";
import "@mantine/form";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./index-DAgXC5_F.js";
import "./index-BwSXzvSP.js";
import "react-qr-code";
import "./useGetEventSettings-DQ44UzoW.js";
import "./useUpdateEventStatus-Ck9Vcq_R.js";
import "./useGetEvents-CRE3yVbY.js";
const sectionLabel = "_sectionLabel_1pdk9_1";
const sectionLabelRange = "_sectionLabelRange_1pdk9_15";
const sectionLabelSpacer = "_sectionLabelSpacer_1pdk9_22";
const classes$3 = {
  sectionLabel,
  sectionLabelRange,
  sectionLabelSpacer
};
const upcomingCard = "_upcomingCard_1k2rb_1";
const header$1 = "_header_1k2rb_5";
const classes$2 = {
  upcomingCard,
  header: header$1
};
dayjs.extend(utc);
dayjs.extend(timezone);
const UpcomingOccurrences = ({
  eventId,
  event
}) => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(() => dayjs().startOf("month"));
  const calendarRange = useMemo(() => {
    if (!event.timezone) return null;
    const tz = event.timezone;
    const monthStart = dayjs.tz(currentMonth.format("YYYY-MM-01"), tz).startOf("month");
    const startDay = monthStart.day();
    const offset = startDay === 0 ? 6 : startDay - 1;
    const gridStart = monthStart.subtract(offset, "day").startOf("day");
    const gridEnd = gridStart.add(42, "day").endOf("day");
    return {
      start: gridStart.utc().format("YYYY-MM-DD HH:mm:ss"),
      end: gridEnd.utc().format("YYYY-MM-DD HH:mm:ss")
    };
  }, [currentMonth, event.timezone]);
  const queryParams = useMemo(() => {
    if (!calendarRange) return {
      pageNumber: 1,
      perPage: 500,
      filterFields: {}
    };
    return {
      pageNumber: 1,
      perPage: 500,
      filterFields: {
        start_date: [{
          operator: QueryFilterOperator.GreaterThanOrEquals,
          value: calendarRange.start
        }, {
          operator: QueryFilterOperator.LessThanOrEquals,
          value: calendarRange.end
        }]
      }
    };
  }, [calendarRange]);
  const {
    data: occurrencesData,
    isLoading
  } = useGetEventOccurrences(eventId, queryParams, calendarRange !== null);
  const occurrences = (occurrencesData == null ? void 0 : occurrencesData.data) || [];
  if (isLoading) {
    return /* @__PURE__ */ jsx(Card, { className: classes$2.upcomingCard, children: /* @__PURE__ */ jsx(Skeleton, { height: 300, radius: "md" }) });
  }
  return /* @__PURE__ */ jsxs(Card, { className: classes$2.upcomingCard, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$2.header, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "gmB6oO"
        }
      ) }),
      /* @__PURE__ */ jsx(Anchor, { size: "sm", onClick: () => navigate(`/manage/event/${eventId}/occurrences`), children: i18n._(
        /*i18n*/
        {
          id: "6NXJRK"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(CalendarView, { occurrences, eventTimezone: event.timezone, currentMonth, onMonthChange: setCurrentMonth, onOccurrenceClick: (id) => navigate(`/manage/event/${eventId}/occurrences/${id}`) })
  ] });
};
const hero = "_hero_wl8wf_1";
const label = "_label_wl8wf_21";
const labelTop = "_labelTop_wl8wf_29";
const labelIcon = "_labelIcon_wl8wf_40";
const state_future = "_state_future_wl8wf_44";
const state_imminent = "_state_imminent_wl8wf_48";
const state_live = "_state_live_wl8wf_52";
const state_wrapping = "_state_wrapping_wl8wf_56";
const countdown = "_countdown_wl8wf_60";
const pulseDot = "_pulseDot_wl8wf_69";
const hero_pulse = "_hero_pulse_wl8wf_1";
const details = "_details_wl8wf_96";
const dateLine = "_dateLine_wl8wf_104";
const timeLine = "_timeLine_wl8wf_113";
const occurrenceLabel = "_occurrenceLabel_wl8wf_123";
const stats = "_stats_wl8wf_132";
const statLine = "_statLine_wl8wf_144";
const statIcon = "_statIcon_wl8wf_153";
const statSecondary = "_statSecondary_wl8wf_158";
const bar = "_bar_wl8wf_163";
const barFill = "_barFill_wl8wf_171";
const cta = "_cta_wl8wf_193";
const classes$1 = {
  hero,
  label,
  labelTop,
  labelIcon,
  state_future,
  state_imminent,
  state_live,
  state_wrapping,
  countdown,
  pulseDot,
  hero_pulse,
  details,
  dateLine,
  timeLine,
  occurrenceLabel,
  stats,
  statLine,
  statIcon,
  statSecondary,
  bar,
  barFill,
  cta
};
dayjs.extend(utc);
dayjs.extend(timezone);
const computeCountdown = (occurrence, tz, now) => {
  const start = dayjs.utc(occurrence.start_date).tz(tz);
  const end = occurrence.end_date ? dayjs.utc(occurrence.end_date).tz(tz) : null;
  const effectiveEnd = end ?? start.add(8, "hour");
  if (now.isAfter(start) && now.isBefore(effectiveEnd)) {
    return {
      state: "live",
      primary: i18n._(
        /*i18n*/
        {
          id: "NUsTc4"
        }
      ),
      secondary: end ? i18n._(
        /*i18n*/
        {
          id: "CFgwiw",
          values: {
            0: end.from(now)
          }
        }
      ) : void 0,
      tickMs: 6e4
    };
  }
  if (end && now.isAfter(end) && now.diff(end, "hour") < 1) {
    return {
      state: "wrapping",
      primary: i18n._(
        /*i18n*/
        {
          id: "k3IitN"
        }
      ),
      secondary: i18n._(
        /*i18n*/
        {
          id: "TbaYrr",
          values: {
            0: end.from(now)
          }
        }
      ),
      tickMs: 6e4
    };
  }
  const diffMs = start.diff(now);
  const diffMinutes = start.diff(now, "minute");
  const diffHours = start.diff(now, "hour");
  const diffDays = start.diff(now, "day");
  if (diffMs < 60 * 60 * 1e3) {
    if (diffMinutes < 1) {
      const seconds = Math.max(0, Math.floor(diffMs / 1e3));
      return {
        state: "imminent",
        primary: i18n._(
          /*i18n*/
          {
            id: "Lo49in",
            values: {
              seconds
            }
          }
        ),
        tickMs: 1e3
      };
    }
    return {
      state: "imminent",
      primary: i18n._(
        /*i18n*/
        {
          id: "AOqtxN",
          values: {
            diffMinutes
          }
        }
      ),
      tickMs: 1e3
    };
  }
  if (diffHours < 24) {
    const h = Math.floor(diffMs / (1e3 * 60 * 60));
    const m = Math.floor(diffMs % (1e3 * 60 * 60) / (1e3 * 60));
    return {
      state: "imminent",
      primary: i18n._(
        /*i18n*/
        {
          id: "Otg8Oh",
          values: {
            h,
            m
          }
        }
      ),
      tickMs: 6e4
    };
  }
  return {
    state: "future",
    primary: diffDays === 1 ? i18n._(
      /*i18n*/
      {
        id: "NqChgF"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "qeFVhN",
        values: {
          diffDays
        }
      }
    ),
    tickMs: 6e4
  };
};
const pickNextOccurrence = (occurrences) => {
  if (!occurrences || occurrences.length === 0) return null;
  const now = dayjs();
  const live = occurrences.filter((o) => o.status === EventOccurrenceStatus.ACTIVE).find((o) => {
    const s = dayjs.utc(o.start_date);
    const e = o.end_date ? dayjs.utc(o.end_date) : s.add(8, "hour");
    return now.isAfter(s) && now.isBefore(e);
  });
  if (live) return live;
  const upcoming = occurrences.filter((o) => o.status === EventOccurrenceStatus.ACTIVE && !o.is_past).sort((a, b) => a.start_date.localeCompare(b.start_date));
  return upcoming[0] ?? null;
};
const NextOccurrenceHero = ({
  event,
  eventId
}) => {
  const navigate = useNavigate();
  const tz = event.timezone;
  const nextOccurrence = useMemo(() => pickNextOccurrence(event.occurrences), [event.occurrences]);
  const occurrenceQuery = useGetEventOccurrence(eventId, nextOccurrence == null ? void 0 : nextOccurrence.id);
  const occurrence = occurrenceQuery.data ?? nextOccurrence;
  const {
    launchCheckIn,
    checkInModals
  } = useOccurrenceCheckIn(eventId);
  const [now, setNow] = useState(() => dayjs());
  const countdown2 = useMemo(() => occurrence ? computeCountdown(occurrence, tz, now) : null, [occurrence, tz, now]);
  useEffect(() => {
    if (!countdown2) return;
    const id = setInterval(() => setNow(dayjs()), countdown2.tickMs);
    return () => clearInterval(id);
  }, [countdown2 == null ? void 0 : countdown2.tickMs]);
  if (occurrenceQuery.isLoading && nextOccurrence) {
    return /* @__PURE__ */ jsx(Skeleton, { height: 220, radius: "lg", mt: "20px" });
  }
  if (!occurrence || !countdown2) {
    return null;
  }
  const stats2 = occurrence.statistics;
  const registered = (stats2 == null ? void 0 : stats2.attendees_registered) ?? 0;
  const capacity = occurrence.capacity ?? 0;
  const percent = capacity > 0 ? Math.min(100, Math.round(registered / capacity * 100)) : 0;
  const dateLine2 = formatDateWithLocale(occurrence.start_date, "dayName", tz) || formatDateWithLocale(occurrence.start_date, "shortDate", tz);
  const timeLine2 = formatDateWithLocale(occurrence.start_date, "timeOnly", tz) + (occurrence.end_date ? " – " + formatOccurrenceEnd(occurrence.end_date, occurrence.start_date, tz) : "");
  const labelText = countdown2.state === "live" ? i18n._(
    /*i18n*/
    {
      id: "NUsTc4"
    }
  ) : countdown2.state === "wrapping" ? i18n._(
    /*i18n*/
    {
      id: "0RihU9"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "veT5Br"
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: `${classes$1.hero} ${classes$1[`state_${countdown2.state}`]}`, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$1.label, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.labelTop, children: [
        countdown2.state === "live" ? /* @__PURE__ */ jsx(IconBroadcast, { size: 12, className: classes$1.labelIcon }) : /* @__PURE__ */ jsx(IconCalendarEvent, { size: 12, className: classes$1.labelIcon }),
        /* @__PURE__ */ jsx("span", { children: labelText })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.countdown, children: [
        countdown2.state === "live" && /* @__PURE__ */ jsx("span", { className: classes$1.pulseDot }),
        /* @__PURE__ */ jsx("span", { children: countdown2.primary })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.details, children: [
      /* @__PURE__ */ jsx("div", { className: classes$1.dateLine, children: dateLine2 }),
      /* @__PURE__ */ jsx("div", { className: classes$1.timeLine, children: timeLine2 }),
      occurrence.label && /* @__PURE__ */ jsx("div", { className: classes$1.occurrenceLabel, children: occurrence.label })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.stats, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.statLine, children: [
        /* @__PURE__ */ jsx(IconUsers, { size: 14, className: classes$1.statIcon }),
        capacity > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { children: [
            registered,
            " / ",
            capacity
          ] }),
          /* @__PURE__ */ jsxs("span", { className: classes$1.statSecondary, children: [
            "· ",
            percent,
            "%"
          ] })
        ] }) : /* @__PURE__ */ jsxs("span", { children: [
          registered,
          " ",
          registered === 1 ? i18n._(
            /*i18n*/
            {
              id: "K2tp3v"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "/Ywywr"
            }
          )
        ] })
      ] }),
      capacity > 0 && /* @__PURE__ */ jsx("div", { className: classes$1.bar, role: "progressbar", "aria-valuenow": percent, "aria-valuemin": 0, "aria-valuemax": 100, children: /* @__PURE__ */ jsx("div", { className: classes$1.barFill, style: {
        width: `${percent}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "light", rightSection: /* @__PURE__ */ jsx(IconArrowRight, { size: 14 }), onClick: () => {
      if (countdown2.state === "live") {
        launchCheckIn(Number(occurrence.id));
        return;
      }
      navigate(`/manage/event/${eventId}/occurrences/${occurrence.id}`);
    }, size: "sm", classNames: {
      root: classes$1.cta
    }, children: countdown2.state === "live" ? i18n._(
      /*i18n*/
      {
        id: "y8Bm7C"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "RLz7P+"
      }
    ) }),
    checkInModals
  ] });
};
const card = "_card_wr66h_1";
const cardCongrats = "_cardCongrats_wr66h_10";
const dismiss = "_dismiss_wr66h_23";
const dismissCongrats = "_dismissCongrats_wr66h_45";
const congratsHero = "_congratsHero_wr66h_52";
const congratsEmoji = "_congratsEmoji_wr66h_62";
const congratsEyebrow = "_congratsEyebrow_wr66h_71";
const congratsTitle = "_congratsTitle_wr66h_80";
const congratsSubtitle = "_congratsSubtitle_wr66h_94";
const header = "_header_wr66h_102";
const headerCompact = "_headerCompact_wr66h_111";
const headerLeft = "_headerLeft_wr66h_118";
const title = "_title_wr66h_124";
const subtitle = "_subtitle_wr66h_132";
const headerRight = "_headerRight_wr66h_139";
const progressTrack = "_progressTrack_wr66h_145";
const progressFill = "_progressFill_wr66h_153";
const body = "_body_wr66h_160";
const row = "_row_wr66h_169";
const rowLeft = "_rowLeft_wr66h_189";
const rowText = "_rowText_wr66h_196";
const rowTitle = "_rowTitle_wr66h_202";
const rowTitleIncomplete = "_rowTitleIncomplete_wr66h_211";
const rowTitleComplete = "_rowTitleComplete_wr66h_216";
const rowHelper = "_rowHelper_wr66h_221";
const rowHelperIncomplete = "_rowHelperIncomplete_wr66h_231";
const rowHelperComplete = "_rowHelperComplete_wr66h_235";
const rowRight = "_rowRight_wr66h_239";
const iconIncomplete = "_iconIncomplete_wr66h_245";
const iconComplete = "_iconComplete_wr66h_250";
const checkDone = "_checkDone_wr66h_255";
const actionPrimary = "_actionPrimary_wr66h_259";
const actionSecondary = "_actionSecondary_wr66h_270";
const classes = {
  card,
  cardCongrats,
  dismiss,
  dismissCongrats,
  congratsHero,
  congratsEmoji,
  congratsEyebrow,
  congratsTitle,
  congratsSubtitle,
  header,
  headerCompact,
  headerLeft,
  title,
  subtitle,
  headerRight,
  progressTrack,
  progressFill,
  body,
  row,
  rowLeft,
  rowText,
  rowTitle,
  rowTitleIncomplete,
  rowTitleComplete,
  rowHelper,
  rowHelperIncomplete,
  rowHelperComplete,
  rowRight,
  iconIncomplete,
  iconComplete,
  checkDone,
  actionPrimary,
  actionSecondary
};
const hasEventDetails = (event) => {
  var _a;
  const description = ((_a = event.description) == null ? void 0 : _a.trim()) ?? "";
  return description.length > 0 && !!event.event_location;
};
const SetupChecklist = ({
  event,
  organizer,
  isStripeConnected,
  productCount,
  hasOccurrences,
  eventImages,
  account,
  me,
  onPublish,
  onConnectStripe,
  onAddTickets,
  onEditDetails,
  onSetupSchedule,
  onCustomizePage,
  onDismiss,
  isDismissed,
  showCongratsHeader = false
}) => {
  const payoutsButtonLabel = (organizer == null ? void 0 : organizer.stripe_account_id) ? i18n._(
    /*i18n*/
    {
      id: "LHH461"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "0W2NQP"
    }
  );
  const resendEmailConfirmation = useResendEmailConfirmation();
  const handleResendEmail = () => {
    if (!(me == null ? void 0 : me.id)) return;
    resendEmailConfirmation.mutate({
      userId: me.id
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "kUAumu"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "mHu0az"
        }
      ))
    });
  };
  const hasCoverImage = ((eventImages == null ? void 0 : eventImages.length) ?? 0) > 0;
  const isEmailVerified = !!(account == null ? void 0 : account.is_account_email_confirmed);
  const isRecurring = event.type === EventType.RECURRING;
  const isSaasMode = !!(account == null ? void 0 : account.is_saas_mode_enabled);
  const hasTickets = productCount > 0;
  const steps = [{
    key: "tickets",
    title: i18n._(
      /*i18n*/
      {
        id: "BGD9Yt"
      }
    ),
    helperIncomplete: i18n._(
      /*i18n*/
      {
        id: "0Ls9qe"
      }
    ),
    helperComplete: productCount === 1 ? i18n._(
      /*i18n*/
      {
        id: "InX5ad"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "RBuxIl",
        values: {
          productCount
        }
      }
    ),
    complete: productCount > 0,
    actionLabel: i18n._(
      /*i18n*/
      {
        id: "BGD9Yt"
      }
    ),
    actionStyle: "primary",
    onAction: onAddTickets
  }, ...isRecurring ? [{
    key: "schedule",
    title: i18n._(
      /*i18n*/
      {
        id: "5pEFnq"
      }
    ),
    helperIncomplete: i18n._(
      /*i18n*/
      {
        id: "yjB5VC"
      }
    ),
    helperComplete: i18n._(
      /*i18n*/
      {
        id: "qQTaVm"
      }
    ),
    complete: hasOccurrences,
    actionLabel: hasOccurrences ? i18n._(
      /*i18n*/
      {
        id: "sjoDuh"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "JA//e6"
      }
    ),
    actionStyle: "primary",
    onAction: onSetupSchedule
  }] : [], {
    key: "publish",
    title: i18n._(
      /*i18n*/
      {
        id: "2zEfOd"
      }
    ),
    helperIncomplete: i18n._(
      /*i18n*/
      {
        id: "v5nFPh"
      }
    ),
    helperComplete: i18n._(
      /*i18n*/
      {
        id: "dF6vP6"
      }
    ),
    complete: event.status === "LIVE",
    actionLabel: i18n._(
      /*i18n*/
      {
        id: "EEYbdt"
      }
    ),
    actionStyle: isRecurring ? hasOccurrences && hasTickets ? "primary" : "secondary" : !hasTickets ? "secondary" : "primary",
    onAction: onPublish
  }, ...isSaasMode ? [{
    key: "payouts",
    title: i18n._(
      /*i18n*/
      {
        id: "TaWVGe"
      }
    ),
    helperIncomplete: i18n._(
      /*i18n*/
      {
        id: "DNeN8t"
      }
    ),
    helperComplete: i18n._(
      /*i18n*/
      {
        id: "imjKVx"
      }
    ),
    complete: isStripeConnected,
    actionLabel: payoutsButtonLabel,
    actionStyle: "primary",
    onAction: onConnectStripe
  }] : [], {
    key: "details",
    title: i18n._(
      /*i18n*/
      {
        id: "wpirGs"
      }
    ),
    helperIncomplete: i18n._(
      /*i18n*/
      {
        id: "ybegUq"
      }
    ),
    helperComplete: i18n._(
      /*i18n*/
      {
        id: "7w0Wev"
      }
    ),
    complete: hasEventDetails(event),
    actionLabel: i18n._(
      /*i18n*/
      {
        id: "Z8idyM"
      }
    ),
    actionStyle: "secondary",
    onAction: onEditDetails
  }, {
    key: "customize",
    title: i18n._(
      /*i18n*/
      {
        id: "KIhhpi"
      }
    ),
    helperIncomplete: i18n._(
      /*i18n*/
      {
        id: "eJ0IJA"
      }
    ),
    helperComplete: i18n._(
      /*i18n*/
      {
        id: "p4kqHr"
      }
    ),
    complete: hasCoverImage,
    actionLabel: i18n._(
      /*i18n*/
      {
        id: "hINN++"
      }
    ),
    actionStyle: "secondary",
    onAction: onCustomizePage
  }, ...isSaasMode && me ? [{
    key: "verify_email",
    title: i18n._(
      /*i18n*/
      {
        id: "/IBv6X"
      }
    ),
    helperIncomplete: (me == null ? void 0 : me.email) ? i18n._(
      /*i18n*/
      {
        id: "L/KlAh",
        values: {
          0: me.email
        }
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "u8nB38"
      }
    ),
    helperComplete: i18n._(
      /*i18n*/
      {
        id: "PLEl94"
      }
    ),
    complete: isEmailVerified,
    actionLabel: i18n._(
      /*i18n*/
      {
        id: "G42SNI"
      }
    ),
    actionStyle: "secondary",
    onAction: handleResendEmail,
    actionLoading: resendEmailConfirmation.isPending
  }] : []];
  const completedCount = steps.filter((s) => s.complete).length;
  const totalCount = steps.length;
  const allComplete = completedCount === totalCount;
  if (allComplete || isDismissed) {
    return null;
  }
  const sortedSteps = [...steps].sort((a, b) => Number(a.complete) - Number(b.complete));
  const progressPercent = completedCount / totalCount * 100;
  return /* @__PURE__ */ jsxs("div", { className: `${classes.card} ${showCongratsHeader ? classes.cardCongrats : ""}`, children: [
    /* @__PURE__ */ jsx("button", { type: "button", className: `${classes.dismiss} ${showCongratsHeader ? classes.dismissCongrats : ""}`, onClick: onDismiss, "aria-label": i18n._(
      /*i18n*/
      {
        id: "nZJ8tu"
      }
    ), children: /* @__PURE__ */ jsx(IconX, { size: showCongratsHeader ? 18 : 16 }) }),
    showCongratsHeader && /* @__PURE__ */ jsxs("div", { className: classes.congratsHero, children: [
      /* @__PURE__ */ jsx("div", { className: classes.congratsEmoji, children: /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "🎉", size: 72 }) }),
      /* @__PURE__ */ jsx("div", { className: classes.congratsEyebrow, children: i18n._(
        /*i18n*/
        {
          id: "NAUIJ7"
        }
      ) }),
      /* @__PURE__ */ jsx("h2", { className: classes.congratsTitle, children: event.title }),
      /* @__PURE__ */ jsx("p", { className: classes.congratsSubtitle, children: i18n._(
        /*i18n*/
        {
          id: "WuWSX5"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${classes.header} ${showCongratsHeader ? classes.headerCompact : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.headerLeft, children: [
        !showCongratsHeader && /* @__PURE__ */ jsx("div", { className: classes.title, children: i18n._(
          /*i18n*/
          {
            id: "8KDgYV"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes.subtitle, children: i18n._(
          /*i18n*/
          {
            id: "SeyN12",
            values: {
              completedCount,
              totalCount
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.headerRight, children: /* @__PURE__ */ jsx("div", { className: classes.progressTrack, children: /* @__PURE__ */ jsx("div", { className: classes.progressFill, style: {
        width: `${progressPercent}%`
      } }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes.body, children: sortedSteps.map((step) => /* @__PURE__ */ jsxs("div", { className: classes.row, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.rowLeft, children: [
        step.complete ? /* @__PURE__ */ jsx(IconCircleCheck, { size: 18, className: classes.iconComplete }) : /* @__PURE__ */ jsx(IconCircle, { size: 18, className: classes.iconIncomplete }),
        /* @__PURE__ */ jsxs("div", { className: classes.rowText, children: [
          /* @__PURE__ */ jsx("span", { className: `${classes.rowTitle} ${step.complete ? classes.rowTitleComplete : classes.rowTitleIncomplete}`, children: step.title }),
          /* @__PURE__ */ jsx("span", { className: `${classes.rowHelper} ${step.complete ? classes.rowHelperComplete : classes.rowHelperIncomplete}`, children: step.complete ? step.helperComplete : step.helperIncomplete })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.rowRight, children: step.complete ? /* @__PURE__ */ jsx(IconCheck, { size: 15, className: classes.checkDone }) : step.actionLabel && step.onAction ? step.actionStyle === "primary" ? /* @__PURE__ */ jsx(Button, { size: "xs", onClick: step.onAction, loading: step.actionLoading, className: classes.actionPrimary, children: step.actionLabel }) : /* @__PURE__ */ jsx(Button, { size: "xs", variant: "default", onClick: step.onAction, loading: step.actionLoading, className: classes.actionSecondary, children: step.actionLabel }) : null })
    ] }, step.key)) })
  ] });
};
const DashBoardSkeleton = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "l", mb: "20px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: 350, radius: "l", mb: "20px" }),
    /* @__PURE__ */ jsx(Skeleton, { height: 350, radius: "l" })
  ] });
};
const EventDashboard = () => {
  var _a, _b, _c, _d;
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const eventQuery = useGetEvent(eventId);
  const {
    data: me
  } = useGetMe();
  const event = eventQuery == null ? void 0 : eventQuery.data;
  const defaultDateRangeRef = useRef(null);
  if (event && !defaultDateRangeRef.current) {
    defaultDateRangeRef.current = event.lifecycle_status === EventLifecycleStatus.ENDED || event.status === EventStatus.ARCHIVED ? "event_full" : "last_30_days";
  }
  const [dateRangeOverride, setDateRange] = useState(null);
  const effectiveDateRange = dateRangeOverride ?? defaultDateRangeRef.current ?? "last_30_days";
  const {
    startDate,
    endDate
  } = useMemo(() => periodPresetToDateRange(effectiveDateRange, event), [effectiveDateRange, event]);
  const eventStatsQuery = useGetEventStats(eventId, {
    startDate,
    endDate,
    enabled: !!event && !!defaultDateRangeRef.current
  });
  const {
    data: eventStats
  } = eventStatsQuery;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    data: account,
    isFetched: accountIsFetched
  } = useGetAccount();
  const [publishModalOpened, {
    open: openPublishModal,
    close: closePublishModal
  }] = useDisclosure(false);
  const [celebrationOpened, {
    open: openCelebration,
    close: closeCelebration
  }] = useDisclosure(false);
  const [isChecklistDismissed, setIsChecklistDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const organizerId = (event == null ? void 0 : event.organizer_id) ?? ((_a = event == null ? void 0 : event.organizer) == null ? void 0 : _a.id);
  const {
    data: organizer
  } = useGetOrganizer(organizerId);
  const isStripeConnected = !!(organizer == null ? void 0 : organizer.stripe_connect_setup_complete);
  const {
    data: productCategoriesResponse
  } = useGetEventProductCategories(eventId);
  const productCount = ((_b = productCategoriesResponse == null ? void 0 : productCategoriesResponse.data) == null ? void 0 : _b.reduce((sum, category) => {
    var _a2;
    return sum + (((_a2 = category.products) == null ? void 0 : _a2.length) ?? 0);
  }, 0)) ?? 0;
  const {
    data: eventImages
  } = useGetEventImages(eventId);
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const occurrencesQuery = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 1
  }, isRecurring);
  const hasOccurrences = (((_d = (_c = occurrencesQuery == null ? void 0 : occurrencesQuery.data) == null ? void 0 : _c.data) == null ? void 0 : _d.length) ?? 0) > 0;
  const hasCoverImage = ((eventImages == null ? void 0 : eventImages.length) ?? 0) > 0;
  const isNewEvent = new URLSearchParams(location.search).get("new_event") === "true";
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined" || !eventId) {
      return;
    }
    if (isNewEvent) {
      window.localStorage.removeItem("setupChecklistDismissed-" + eventId);
      setIsChecklistDismissed(false);
      return;
    }
    const dismissed = window.localStorage.getItem("setupChecklistDismissed-" + eventId);
    if (dismissed === "true") {
      setIsChecklistDismissed(true);
    }
  }, [eventId, isNewEvent]);
  const dismissChecklist = () => {
    setIsChecklistDismissed(true);
    if (isMounted && typeof window !== "undefined") {
      window.localStorage.setItem("setupChecklistDismissed-" + eventId, "true");
      const params = new URLSearchParams(location.search);
      if (params.has("new_event")) {
        params.delete("new_event");
        navigate({
          pathname: location.pathname,
          search: params.toString()
        }, {
          replace: true
        });
      }
    }
  };
  const handlePublish = () => {
    openPublishModal();
  };
  const handleConnectStripe = () => {
    if (!organizerId) {
      return;
    }
    navigate(`/manage/organizer/${organizerId}/settings#payouts`);
  };
  const handleAddTickets = () => {
    if (!eventId) {
      return;
    }
    navigate(`/manage/event/${eventId}/products#create-product`);
  };
  const handleEditDetails = () => {
    if (!eventId) {
      return;
    }
    navigate(`/manage/event/${eventId}/settings`);
  };
  const handleSetupSchedule = () => {
    if (!eventId) {
      return;
    }
    navigate(`/manage/event/${eventId}/occurrences`);
  };
  const handleCustomizePage = () => {
    if (!eventId) {
      return;
    }
    navigate(`/manage/event/${eventId}/homepage-designer`);
  };
  const isSaasMode = !!(account == null ? void 0 : account.is_saas_mode_enabled);
  const allChecklistComplete = !!event && event.status === "LIVE" && (!isSaasMode || isStripeConnected) && productCount > 0 && hasEventDetails(event) && hasCoverImage && (!isRecurring || hasOccurrences) && (!isSaasMode || !!(account == null ? void 0 : account.is_account_email_confirmed));
  useEffect(() => {
    if (allChecklistComplete && isMounted && typeof window !== "undefined" && eventId) {
      window.localStorage.removeItem("setupChecklistDismissed-" + eventId);
    }
  }, [allChecklistComplete, isMounted, eventId]);
  const dateRangeLabel = (() => {
    if (!event) return "";
    const startYear = new Date(startDate.replace(" ", "T")).getFullYear();
    const endYear = new Date(endDate.replace(" ", "T")).getFullYear();
    const startStr = formatDateWithLocale(startDate, "chartDate", event.timezone);
    const endStr = formatDateWithLocale(endDate, "chartDate", event.timezone);
    if (startYear !== endYear) {
      return `${startStr}, ${startYear} - ${endStr}, ${endYear}`;
    }
    return `${startStr} - ${endStr}`;
  })();
  const shouldShowChecklist = !!(event && accountIsFetched);
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    !isNewEvent && /* @__PURE__ */ jsxs(PageTitle, { style: {
      marginBottom: 0
    }, children: [
      !isMobile && /* @__PURE__ */ jsx(Trans, { id: "dVxpp5", values: {
        0: (me == null ? void 0 : me.first_name) && ", " + (me == null ? void 0 : me.first_name)
      } }),
      isMobile && /* @__PURE__ */ jsx(Trans, { id: "QuhVpV", values: {
        0: (me == null ? void 0 : me.first_name) && (me == null ? void 0 : me.first_name)
      } })
    ] }),
    !event && /* @__PURE__ */ jsx(DashBoardSkeleton, {}),
    event && /* @__PURE__ */ jsxs(Fragment, { children: [
      publishModalOpened && /* @__PURE__ */ jsx(PublishEventModal, { opened: publishModalOpened, onClose: closePublishModal, event, onSuccess: () => {
        trackEvent(AnalyticsEvents.EVENT_PUBLISHED);
        closePublishModal();
        openCelebration();
      } }),
      /* @__PURE__ */ jsx(EventLiveCelebrationModal, { opened: celebrationOpened, onClose: closeCelebration, url: eventHomepageUrl(event), eventTitle: event.title, eventId: String(event.id) }),
      shouldShowChecklist && /* @__PURE__ */ jsx(SetupChecklist, { event, organizer, isStripeConnected, productCount, hasOccurrences, eventImages, account, me, onPublish: handlePublish, onConnectStripe: handleConnectStripe, onAddTickets: handleAddTickets, onEditDetails: handleEditDetails, onSetupSchedule: handleSetupSchedule, onCustomizePage: handleCustomizePage, onDismiss: dismissChecklist, isDismissed: isChecklistDismissed, showCongratsHeader: isNewEvent }),
      (event == null ? void 0 : event.type) === EventType.RECURRING && /* @__PURE__ */ jsx(NextOccurrenceHero, { event, eventId }),
      /* @__PURE__ */ jsxs("div", { className: classes$3.sectionLabel, children: [
        /* @__PURE__ */ jsx("span", { children: i18n._(
          /*i18n*/
          {
            id: "4SILkp"
          }
        ) }),
        dateRangeLabel && /* @__PURE__ */ jsxs("span", { className: classes$3.sectionLabelRange, children: [
          "· ",
          dateRangeLabel
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes$3.sectionLabelSpacer }),
        /* @__PURE__ */ jsx(PeriodSelector, { value: effectiveDateRange, onChange: setDateRange, storageKey: `eventDashboard.dateRange.${eventId}`, event })
      ] }),
      /* @__PURE__ */ jsx(StatBoxes, { dateRange: effectiveDateRange, event }),
      (event == null ? void 0 : event.type) === EventType.RECURRING && /* @__PURE__ */ jsx(UpcomingOccurrences, { eventId, event }),
      /* @__PURE__ */ jsx(ProductSalesChartCard, { dailyStats: eventStats == null ? void 0 : eventStats.daily_stats, timezone: event.timezone, dateRangeLabel, syncId: "events" }),
      /* @__PURE__ */ jsx(RevenueChartCard, { dailyStats: eventStats == null ? void 0 : eventStats.daily_stats, timezone: event.timezone, currency: event.currency, dateRangeLabel, syncId: "events" })
    ] })
  ] });
};
export {
  DashBoardSkeleton,
  EventDashboard,
  EventDashboard as default
};

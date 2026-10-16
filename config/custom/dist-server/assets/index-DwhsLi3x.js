import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useSearchParams, useParams } from "react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { t as publicApi, q as queryParamsHelper, a as getConfig, P as PoweredByFooter, u as useGetMe } from "../entry.server.js";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import { useDebouncedValue, useNetwork, useDisclosure } from "@mantine/hooks";
import { E as EventType, d as EventOccurrenceStatus, Q as QueryFilterOperator } from "./types-CqPWB-a5.js";
import { s as showInfo, a as showError, b as showSuccess, c as showSuccessWithUndo } from "./notifications-Coh3Ef-t.js";
import { AxiosError } from "axios";
import { Modal, Stack, Button, Progress, Anchor, Menu, ActionIcon, Loader, Badge, Drawer, TextInput } from "@mantine/core";
import { IconUserCheck, IconCreditCard, IconInfoCircle, IconQrcode, IconSearch, IconChartBar, IconBulb, IconBulbOff, IconCameraRotate, IconScan, IconCamera, IconVolume, IconVolumeOff, IconCheck, IconX, IconTicket, IconCalendarEvent, IconClock, IconUsers, IconBolt, IconAlertTriangle, IconUser, IconMail, IconClipboardText, IconReceipt2, IconCalendar, IconChevronDown, IconWifiOff } from "@tabler/icons-react";
import { f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { C as Countdown } from "./index-CixzP3jj.js";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import QrScanner from "qr-scanner";
import { f as filterAndGroupOccurrences, a as formatOccurrenceLabel, i as isToday } from "./occurrenceSelectUtils-sehyBEho.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "@mantine/notifications";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
const publicCheckInClient = {
  getCheckInList: async (checkInListShortId) => {
    const response = await publicApi.get(`/check-in-lists/${checkInListShortId}`);
    return response.data;
  },
  getCheckInListStats: async (checkInListShortId, eventOccurrenceId) => {
    const qs = eventOccurrenceId ? `?event_occurrence_id=${eventOccurrenceId}` : "";
    const response = await publicApi.get(`/check-in-lists/${checkInListShortId}/stats${qs}`);
    return response.data;
  },
  getCheckInListAttendees: async (checkInListShortId, pagination) => {
    const response = await publicApi.get(`/check-in-lists/${checkInListShortId}/attendees` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  getCheckInListAttendee: async (checkInListShortId, attendeePublicId) => {
    const response = await publicApi.get(`/check-in-lists/${checkInListShortId}/attendees/${attendeePublicId}`);
    return response.data;
  },
  getCheckInListAttendeeDetail: async (checkInListShortId, attendeePublicId) => {
    const response = await publicApi.get(`/check-in-lists/${checkInListShortId}/attendees/${attendeePublicId}/detail`);
    return response.data;
  },
  createCheckIn: async (checkInListShortId, attendeePublicId, action) => {
    const response = await publicApi.post(`/check-in-lists/${checkInListShortId}/check-ins`, {
      "attendees": [{
        "public_id": attendeePublicId,
        "action": action
      }]
    });
    return response.data;
  },
  deleteCheckIn: async (checkInListShortId, checkInShortId) => {
    const response = await publicApi.delete(`/check-in-lists/${checkInListShortId}/check-ins/${checkInShortId}`);
    return response.data;
  }
};
const GET_CHECK_IN_LIST_PUBLIC_QUERY_KEY = "getCheckInListPublic";
const useGetCheckInListPublic = (checkInListShortId) => {
  return useQuery({
    queryKey: [GET_CHECK_IN_LIST_PUBLIC_QUERY_KEY, checkInListShortId],
    queryFn: async () => {
      const data = await publicCheckInClient.getCheckInList(checkInListShortId);
      return data;
    },
    retry: false
  });
};
const app = "_app_1ld7a_1";
const topBar = "_topBar_1ld7a_10";
const topBarMain = "_topBarMain_1ld7a_23";
const topLabel = "_topLabel_1ld7a_28";
const topTitle = "_topTitle_1ld7a_38";
const topScope = "_topScope_1ld7a_48";
const topRight = "_topRight_1ld7a_66";
const progressChip = "_progressChip_1ld7a_72";
const progressValue = "_progressValue_1ld7a_84";
const progressOf = "_progressOf_1ld7a_89";
const offlineBadge = "_offlineBadge_1ld7a_95";
const infoBtn = "_infoBtn_1ld7a_109";
const content = "_content_1ld7a_113";
const occurrenceFilterBar = "_occurrenceFilterBar_1ld7a_122";
const classes$7 = {
  app,
  topBar,
  topBarMain,
  topLabel,
  topTitle,
  topScope,
  topRight,
  progressChip,
  progressValue,
  progressOf,
  offlineBadge,
  infoBtn,
  content,
  occurrenceFilterBar
};
const useHaptics = () => {
  return useCallback((pattern) => {
    return;
  }, []);
};
const GET_CHECK_IN_LIST_ATTENDEES_PUBLIC_QUERY_KEY = "getCheckInListAttendees";
const useGetCheckInListAttendees = (checkInListShortId, pagination, enabled = true) => {
  return useQuery({
    queryKey: [GET_CHECK_IN_LIST_ATTENDEES_PUBLIC_QUERY_KEY, checkInListShortId, pagination],
    queryFn: async () => {
      return await publicCheckInClient.getCheckInListAttendees(checkInListShortId, pagination);
    },
    enabled
  });
};
const GET_CHECK_IN_LIST_STATS_PUBLIC_QUERY_KEY = "getCheckInListStatsPublic";
const useGetCheckInListStatsPublic = (checkInListShortId, enabled = true, eventOccurrenceId) => {
  return useQuery({
    queryKey: [GET_CHECK_IN_LIST_STATS_PUBLIC_QUERY_KEY, checkInListShortId, eventOccurrenceId ?? null],
    queryFn: () => publicCheckInClient.getCheckInListStats(checkInListShortId, eventOccurrenceId),
    enabled,
    retry: false
  });
};
const GET_CHECK_IN_LIST_ATTENDEE_DETAIL_PUBLIC_QUERY_KEY = "getCheckInListAttendeeDetailPublic";
const useGetCheckInListAttendeeDetailPublic = (checkInListShortId, attendeePublicId) => {
  return useQuery({
    queryKey: [GET_CHECK_IN_LIST_ATTENDEE_DETAIL_PUBLIC_QUERY_KEY, checkInListShortId, attendeePublicId],
    queryFn: () => publicCheckInClient.getCheckInListAttendeeDetail(checkInListShortId, attendeePublicId),
    enabled: !!checkInListShortId && !!attendeePublicId,
    retry: false
  });
};
const useCreateCheckInPublic = (pagination) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      checkInListShortId,
      attendeePublicId,
      action
    }) => publicCheckInClient.createCheckIn(checkInListShortId, attendeePublicId, action),
    onSuccess: (data, {
      checkInListShortId,
      action
    }) => {
      const markedAsPaid = action === "check-in-and-mark-order-as-paid";
      queryClient.setQueryData([GET_CHECK_IN_LIST_ATTENDEES_PUBLIC_QUERY_KEY, checkInListShortId, pagination], (oldData) => {
        var _a;
        if (!(oldData == null ? void 0 : oldData.data)) return oldData;
        const updatedAttendee = (_a = data == null ? void 0 : data.data) == null ? void 0 : _a.find((checkIn) => checkIn.attendee_id);
        if (!updatedAttendee) return oldData;
        const updatedOrderId = updatedAttendee.order_id;
        const newAttendees = oldData.data.map((attendee) => {
          var _a2;
          const attendeeCheckIn = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.find((checkIn) => checkIn.attendee_id === attendee.id);
          const hasError = data.errors && Object.keys(data.errors).some((key) => key === attendee.public_id);
          if (attendeeCheckIn) {
            return {
              ...attendee,
              check_in: attendeeCheckIn,
              status: markedAsPaid && !hasError ? "ACTIVE" : attendee.status
            };
          }
          if (markedAsPaid && attendee.order_id === updatedOrderId) {
            return {
              ...attendee,
              status: "ACTIVE"
            };
          }
          return attendee;
        });
        return {
          ...oldData,
          data: newAttendees
        };
      });
      queryClient.invalidateQueries({
        queryKey: [GET_CHECK_IN_LIST_PUBLIC_QUERY_KEY, checkInListShortId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_CHECK_IN_LIST_STATS_PUBLIC_QUERY_KEY, checkInListShortId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_CHECK_IN_LIST_ATTENDEE_DETAIL_PUBLIC_QUERY_KEY, checkInListShortId]
      });
    }
  });
};
const useDeleteCheckInPublic = (pagination) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      checkInListShortId,
      checkInShortId
    }) => publicCheckInClient.deleteCheckIn(checkInListShortId, checkInShortId),
    onSettled: (_, error, {
      checkInListShortId,
      checkInShortId
    }) => {
      var _a;
      if (error && ((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) !== 409) {
        return;
      }
      queryClient.setQueryData([GET_CHECK_IN_LIST_ATTENDEES_PUBLIC_QUERY_KEY, checkInListShortId, pagination], (oldData) => {
        var _a2;
        const newAttendees = (_a2 = oldData == null ? void 0 : oldData.data) == null ? void 0 : _a2.map((attendee) => {
          var _a3;
          if (((_a3 = attendee.check_in) == null ? void 0 : _a3.short_id) === checkInShortId) {
            return {
              ...attendee,
              check_in: void 0
            };
          }
          return attendee;
        });
        return {
          ...oldData,
          data: newAttendees
        };
      });
      queryClient.invalidateQueries({
        queryKey: [GET_CHECK_IN_LIST_PUBLIC_QUERY_KEY, checkInListShortId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_CHECK_IN_LIST_STATS_PUBLIC_QUERY_KEY, checkInListShortId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_CHECK_IN_LIST_ATTENDEE_DETAIL_PUBLIC_QUERY_KEY, checkInListShortId]
      });
    }
  });
};
const CheckInOptionsModal = ({
  isOpen,
  attendee,
  isPending,
  onClose,
  onCheckIn
}) => {
  if (!attendee) return null;
  return /* @__PURE__ */ jsx(Modal, { opened: isOpen, onClose, title: /* @__PURE__ */ jsx(Trans, { id: "p2WLr3", values: {
    0: attendee.first_name,
    1: attendee.last_name
  } }), size: "md", children: /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(Callout, { variant: "tip", title: i18n._(
      /*i18n*/
      {
        id: "h10Wm5"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "Pc/Wtj"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconUserCheck, { size: 20 }), onClick: () => onCheckIn("check-in"), loading: isPending, fullWidth: true, children: i18n._(
      /*i18n*/
      {
        id: "QYLpB4"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconCreditCard, { size: 20 }), onClick: () => onCheckIn("check-in-and-mark-order-as-paid"), loading: isPending, variant: "filled", fullWidth: true, children: i18n._(
      /*i18n*/
      {
        id: "D6+U20"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "light", fullWidth: true, children: i18n._(
      /*i18n*/
      {
        id: "dEgA5A"
      }
    ) })
  ] }) });
};
const CheckInInfoModal = ({
  isOpen,
  checkInList,
  onClose
}) => {
  if (!checkInList) return null;
  const total = checkInList.total_attendees;
  const checkedIn = checkInList.checked_in_attendees;
  const percent = total > 0 ? checkedIn / total * 100 : 0;
  const appName = getConfig("VITE_APP_NAME", "Coursify");
  const logoSrc = getConfig("VITE_APP_LOGO_LIGHT", "/logos/coursify-stacked-light.svg");
  return /* @__PURE__ */ jsxs(Modal, { opened: isOpen, onClose, title: /* @__PURE__ */ jsx(Truncate, { text: checkInList.name, length: 30 }), size: "md", centered: true, radius: "md", padding: 24, transitionProps: {
    transition: "fade",
    duration: 200
  }, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: {
        fontSize: 13,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--hi-color-gray-dark)",
        marginBottom: 6
      }, children: i18n._(
        /*i18n*/
        {
          id: "CP3D8G"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { style: {
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        marginBottom: 10
      }, children: /* @__PURE__ */ jsx(Trans, { id: "lzQ8/M", values: {
        checkedIn,
        total
      } }) }),
      /* @__PURE__ */ jsx(Progress, { value: percent, color: "teal", size: "lg", radius: "xl" })
    ] }),
    checkInList.description && /* @__PURE__ */ jsxs("div", { style: {
      marginTop: 20,
      padding: "14px 16px",
      background: "var(--hi-color-gray)",
      borderRadius: 10,
      fontSize: 14,
      lineHeight: 1.55,
      whiteSpace: "pre-wrap",
      color: "var(--hi-text)"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--hi-color-gray-dark)",
        marginBottom: 6
      }, children: i18n._(
        /*i18n*/
        {
          id: "/bfV1Y"
        }
      ) }),
      checkInList.description
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      marginTop: 24,
      paddingTop: 16,
      borderTop: "1px solid var(--hi-color-gray-2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }, children: [
      /* @__PURE__ */ jsx("img", { src: logoSrc, alt: i18n._(
        /*i18n*/
        {
          id: "jTs4am",
          values: {
            appName
          }
        }
      ), style: {
        height: 24,
        maxWidth: 160,
        objectFit: "contain",
        opacity: 0.85
      } }),
      /* @__PURE__ */ jsx(PoweredByFooter, {})
    ] })
  ] });
};
const CheckInDescriptionModal = ({
  isOpen,
  description,
  onDismiss
}) => {
  if (!description) return null;
  return /* @__PURE__ */ jsxs(Modal, { opened: isOpen, onClose: onDismiss, title: /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 700
  }, children: [
    /* @__PURE__ */ jsx(IconInfoCircle, { size: 18 }),
    " ",
    i18n._(
      /*i18n*/
      {
        id: "JoPiZ2"
      }
    )
  ] }), size: "md", centered: true, radius: "md", padding: 24, children: [
    /* @__PURE__ */ jsx("div", { style: {
      fontSize: 15,
      lineHeight: 1.55,
      color: "var(--hi-text)",
      whiteSpace: "pre-wrap",
      marginBottom: 20
    }, children: description }),
    /* @__PURE__ */ jsx(Button, { fullWidth: true, size: "md", onClick: onDismiss, children: i18n._(
      /*i18n*/
      {
        id: "76gPWk"
      }
    ) })
  ] });
};
const nav = "_nav_17fom_1";
const pill$1 = "_pill_17fom_13";
const tab = "_tab_17fom_27";
const icon = "_icon_17fom_53";
const label = "_label_17fom_60";
const active = "_active_17fom_65";
const classes$6 = {
  nav,
  pill: pill$1,
  tab,
  icon,
  label,
  active
};
const BottomNav = ({
  active: active2,
  onChange
}) => {
  const tabs = [{
    id: "scan",
    label: i18n._(
      /*i18n*/
      {
        id: "I+FvbD"
      }
    ),
    icon: /* @__PURE__ */ jsx(IconQrcode, { size: 22, stroke: 1.7 })
  }, {
    id: "search",
    label: i18n._(
      /*i18n*/
      {
        id: "A1taO8"
      }
    ),
    icon: /* @__PURE__ */ jsx(IconSearch, { size: 20, stroke: 1.8 })
  }, {
    id: "stats",
    label: i18n._(
      /*i18n*/
      {
        id: "29Hx9U"
      }
    ),
    icon: /* @__PURE__ */ jsx(IconChartBar, { size: 20, stroke: 1.8 })
  }];
  return /* @__PURE__ */ jsx("nav", { className: classes$6.nav, "aria-label": i18n._(
    /*i18n*/
    {
      id: "XprdTn"
    }
  ), children: /* @__PURE__ */ jsx("div", { className: classes$6.pill, children: tabs.map((tab2) => /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes$6.tab} ${active2 === tab2.id ? classes$6.active : ""}`, onClick: () => onChange(tab2.id), "aria-current": active2 === tab2.id ? "page" : void 0, children: [
    /* @__PURE__ */ jsx("span", { className: classes$6.icon, children: tab2.icon }),
    /* @__PURE__ */ jsx("span", { className: classes$6.label, children: tab2.label })
  ] }, tab2.id)) }) });
};
const scanner = "_scanner_16bwr_1";
const video = "_video_16bwr_12";
const reticle = "_reticle_16bwr_18";
const corner = "_corner_16bwr_28";
const tl = "_tl_16bwr_35";
const tr = "_tr_16bwr_43";
const bl = "_bl_16bwr_51";
const br = "_br_16bwr_59";
const controls = "_controls_16bwr_67";
const control = "_control_16bwr_67";
const permissionDenied = "_permissionDenied_16bwr_82";
const classes$5 = {
  scanner,
  video,
  reticle,
  corner,
  tl,
  tr,
  bl,
  br,
  controls,
  control,
  permissionDenied
};
const InlineCameraScanner = ({
  onAttendeeScanned
}) => {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [permissionDenied2, setPermissionDenied] = useState(false);
  const [isFlashAvailable, setIsFlashAvailable] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [cameraList, setCameraList] = useState();
  const [processed, setProcessed] = useState([]);
  const latestProcessedRef = useRef([]);
  const [currentId, setCurrentId] = useState(null);
  const [debouncedId] = useDebouncedValue(currentId, 1e3);
  useEffect(() => {
    latestProcessedRef.current = processed;
  }, [processed]);
  const startScanner = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true
      });
      if (videoRef.current) {
        qrScannerRef.current = new QrScanner(videoRef.current, (result) => {
          setCurrentId(result.data);
        }, {
          maxScansPerSecond: 1,
          highlightScanRegion: false,
          highlightCodeOutline: false
        });
        qrScannerRef.current.start();
      }
    } catch (error) {
      setPermissionDenied(true);
      console.error(error);
    }
  };
  const stopScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
  };
  useEffect(() => {
    startScanner().then(async () => {
      if (qrScannerRef.current) {
        const hasFlash = await qrScannerRef.current.hasFlash();
        setIsFlashAvailable(hasFlash);
      }
      const cameras = await QrScanner.listCameras(true);
      setCameraList(cameras);
    });
    return () => {
      stopScanner();
    };
  }, []);
  useEffect(() => {
    if (!debouncedId) return;
    if (latestProcessedRef.current.includes(debouncedId)) return;
    onAttendeeScanned(debouncedId);
    setProcessed((prev) => [...prev, debouncedId]);
    setCurrentId(null);
  }, [debouncedId]);
  const handleFlashToggle = () => {
    if (!qrScannerRef.current || !isFlashAvailable) return;
    if (isFlashOn) {
      qrScannerRef.current.turnFlashOff();
    } else {
      qrScannerRef.current.turnFlashOn();
    }
    setIsFlashOn(!isFlashOn);
  };
  const handleCameraSelect = (camera) => {
    var _a;
    (_a = qrScannerRef.current) == null ? void 0 : _a.setCamera(camera.id).then(async () => {
      if (qrScannerRef.current) {
        const hasFlash = await qrScannerRef.current.hasFlash();
        setIsFlashAvailable(hasFlash);
      }
    });
  };
  const requestPermission = async () => {
    setPermissionDenied(false);
    await startScanner();
  };
  if (permissionDenied2) {
    return /* @__PURE__ */ jsx("div", { className: classes$5.permissionDenied, children: /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "7hYa9y", components: {
      0: /* @__PURE__ */ jsx(Anchor, { onClick: requestPermission })
    } }) }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes$5.scanner, children: [
    /* @__PURE__ */ jsx("video", { ref: videoRef, className: classes$5.video, playsInline: true }),
    /* @__PURE__ */ jsxs("div", { className: classes$5.reticle, children: [
      /* @__PURE__ */ jsx("span", { className: `${classes$5.corner} ${classes$5.tl}` }),
      /* @__PURE__ */ jsx("span", { className: `${classes$5.corner} ${classes$5.tr}` }),
      /* @__PURE__ */ jsx("span", { className: `${classes$5.corner} ${classes$5.bl}` }),
      /* @__PURE__ */ jsx("span", { className: `${classes$5.corner} ${classes$5.br}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$5.controls, children: [
      isFlashAvailable && /* @__PURE__ */ jsx(Button, { onClick: handleFlashToggle, variant: "default", size: "compact-sm", radius: "xl", className: classes$5.control, leftSection: isFlashOn ? /* @__PURE__ */ jsx(IconBulb, { size: 14 }) : /* @__PURE__ */ jsx(IconBulbOff, { size: 14 }), children: isFlashOn ? i18n._(
        /*i18n*/
        {
          id: "q0923e"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "0RI8m4"
        }
      ) }),
      cameraList && cameraList.length > 1 && /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 220, children: [
        /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { variant: "default", size: "compact-sm", radius: "xl", className: classes$5.control, leftSection: /* @__PURE__ */ jsx(IconCameraRotate, { size: 14 }), children: i18n._(
          /*i18n*/
          {
            id: "rT2cV+"
          }
        ) }) }),
        /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
          /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
            /*i18n*/
            {
              id: "88a49s"
            }
          ) }),
          cameraList.map((camera, index) => /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleCameraSelect(camera), children: camera.label }, index))
        ] })
      ] })
    ] })
  ] });
};
const wrap$2 = "_wrap_1cnak_1";
const scanArea = "_scanArea_1cnak_10";
const usbPane = "_usbPane_1cnak_21";
const usbStatusRow = "_usbStatusRow_1cnak_33";
const statusDot = "_statusDot_1cnak_42";
const dotActive = "_dotActive_1cnak_49";
const dotPaused = "_dotPaused_1cnak_54";
const statusText = "_statusText_1cnak_58";
const usbInstruction = "_usbInstruction_1cnak_65";
const buffer = "_buffer_1cnak_74";
const bufferText = "_bufferText_1cnak_93";
const bufferPlaceholder = "_bufferPlaceholder_1cnak_100";
const toolbar = "_toolbar_1cnak_107";
const modeToggle = "_modeToggle_1cnak_114";
const modeBtn = "_modeBtn_1cnak_123";
const modeActive = "_modeActive_1cnak_142";
const soundBtn = "_soundBtn_1cnak_147";
const recentSection = "_recentSection_1cnak_151";
const sectionHeader = "_sectionHeader_1cnak_159";
const empty$3 = "_empty_1cnak_169";
const recentList$1 = "_recentList_1cnak_180";
const recentItem = "_recentItem_1cnak_207";
const recentDuplicate = "_recentDuplicate_1cnak_246";
const recentError = "_recentError_1cnak_251";
const indicator = "_indicator_1cnak_256";
const indicator_success = "_indicator_success_1cnak_267";
const indicator_duplicate = "_indicator_duplicate_1cnak_271";
const indicator_error = "_indicator_error_1cnak_275";
const recentMain$1 = "_recentMain_1cnak_279";
const recentName$1 = "_recentName_1cnak_284";
const recentMeta = "_recentMeta_1cnak_294";
const recentCode$1 = "_recentCode_1cnak_303";
const dot$2 = "_dot_1cnak_49";
const tagWarn$1 = "_tagWarn_1cnak_313";
const tagError = "_tagError_1cnak_314";
const classes$4 = {
  wrap: wrap$2,
  scanArea,
  usbPane,
  usbStatusRow,
  statusDot,
  dotActive,
  dotPaused,
  statusText,
  usbInstruction,
  buffer,
  bufferText,
  bufferPlaceholder,
  toolbar,
  modeToggle,
  modeBtn,
  modeActive,
  soundBtn,
  recentSection,
  sectionHeader,
  empty: empty$3,
  recentList: recentList$1,
  recentItem,
  "recent-in": "_recent-in_1cnak_1",
  recentDuplicate,
  recentError,
  indicator,
  indicator_success,
  indicator_duplicate,
  indicator_error,
  recentMain: recentMain$1,
  recentName: recentName$1,
  recentMeta,
  recentCode: recentCode$1,
  dot: dot$2,
  tagWarn: tagWarn$1,
  tagError
};
const relativeTime = (timestamp) => {
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1e3));
  if (diffSec < 5) return i18n._(
    /*i18n*/
    {
      id: "xOTzt5"
    }
  );
  if (diffSec < 60) return i18n._(
    /*i18n*/
    {
      id: "iYfwJE",
      values: {
        diffSec
      }
    }
  );
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return i18n._(
    /*i18n*/
    {
      id: "NRSLBe",
      values: {
        diffMin
      }
    }
  );
  const diffHr = Math.floor(diffMin / 60);
  return i18n._(
    /*i18n*/
    {
      id: "f2rhaD",
      values: {
        diffHr
      }
    }
  );
};
const ScanTab = ({
  mode,
  onModeChange,
  hidPageHasFocus,
  hidBuffer,
  isSoundOn,
  onSoundToggle,
  onAttendeeScanned,
  onOpenRecentScan,
  recentScans
}) => {
  return /* @__PURE__ */ jsxs("div", { className: classes$4.wrap, children: [
    /* @__PURE__ */ jsx("div", { className: classes$4.scanArea, children: mode === "camera" ? /* @__PURE__ */ jsx(InlineCameraScanner, { onAttendeeScanned }) : /* @__PURE__ */ jsxs("div", { className: classes$4.usbPane, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$4.usbStatusRow, children: [
        /* @__PURE__ */ jsx("span", { className: `${classes$4.statusDot} ${hidPageHasFocus ? classes$4.dotActive : classes$4.dotPaused}` }),
        /* @__PURE__ */ jsx("span", { className: classes$4.statusText, children: hidPageHasFocus ? i18n._(
          /*i18n*/
          {
            id: "td5pxI"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "dyTklH"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes$4.usbInstruction, children: hidPageHasFocus ? i18n._(
        /*i18n*/
        {
          id: "0zd6Nm"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "lruQkA"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$4.buffer, children: hidBuffer ? /* @__PURE__ */ jsx("span", { className: classes$4.bufferText, children: hidBuffer }) : /* @__PURE__ */ jsx("span", { className: classes$4.bufferPlaceholder, children: i18n._(
        /*i18n*/
        {
          id: "KrurBH"
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: classes$4.toolbar, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$4.modeToggle, role: "tablist", "aria-label": i18n._(
        /*i18n*/
        {
          id: "WDYSLJ"
        }
      ), children: [
        /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": mode === "usb", className: `${classes$4.modeBtn} ${mode === "usb" ? classes$4.modeActive : ""}`, onClick: () => onModeChange("usb"), children: [
          /* @__PURE__ */ jsx(IconScan, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "vzWC39"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": mode === "camera", className: `${classes$4.modeBtn} ${mode === "camera" ? classes$4.modeActive : ""}`, onClick: () => onModeChange("camera"), children: [
          /* @__PURE__ */ jsx(IconCamera, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "rT2cV+"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ActionIcon, { "aria-label": isSoundOn ? i18n._(
        /*i18n*/
        {
          id: "GdOhw6"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "KUOhTy"
        }
      ), variant: "default", size: "lg", radius: "xl", onClick: onSoundToggle, className: classes$4.soundBtn, children: isSoundOn ? /* @__PURE__ */ jsx(IconVolume, { size: 18 }) : /* @__PURE__ */ jsx(IconVolumeOff, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$4.recentSection, children: [
      /* @__PURE__ */ jsx("div", { className: classes$4.sectionHeader, children: i18n._(
        /*i18n*/
        {
          id: "qhfiwV"
        }
      ) }),
      recentScans.length === 0 ? /* @__PURE__ */ jsx("div", { className: classes$4.empty, children: /* @__PURE__ */ jsx(Trans, { id: "bQG7Qk" }) }) : /* @__PURE__ */ jsx("div", { className: classes$4.recentList, children: recentScans.slice(0, 8).map((scan) => /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes$4.recentItem} ${scan.status === "error" ? classes$4.recentError : ""} ${scan.status === "duplicate" ? classes$4.recentDuplicate : ""}`, onClick: () => onOpenRecentScan == null ? void 0 : onOpenRecentScan(scan.code), disabled: !onOpenRecentScan || !scan.code.startsWith("A-"), children: [
        /* @__PURE__ */ jsxs("div", { className: `${classes$4.indicator} ${classes$4[`indicator_${scan.status}`]}`, children: [
          scan.status === "success" && /* @__PURE__ */ jsx(IconCheck, { size: 14, stroke: 3 }),
          scan.status === "duplicate" && /* @__PURE__ */ jsx(IconCheck, { size: 14, stroke: 3 }),
          scan.status === "error" && /* @__PURE__ */ jsx(IconX, { size: 14, stroke: 3 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes$4.recentMain, children: [
          /* @__PURE__ */ jsx("div", { className: classes$4.recentName, children: scan.name }),
          /* @__PURE__ */ jsxs("div", { className: classes$4.recentMeta, children: [
            /* @__PURE__ */ jsx("span", { className: classes$4.recentCode, children: scan.code }),
            /* @__PURE__ */ jsx("span", { className: classes$4.dot, children: "·" }),
            /* @__PURE__ */ jsx("span", { children: relativeTime(scan.timestamp) })
          ] })
        ] }),
        scan.status === "duplicate" && /* @__PURE__ */ jsx("span", { className: classes$4.tagWarn, children: i18n._(
          /*i18n*/
          {
            id: "uCuEqI"
          }
        ) }),
        scan.status === "error" && /* @__PURE__ */ jsx("span", { className: classes$4.tagError, children: i18n._(
          /*i18n*/
          {
            id: "7Bj3x9"
          }
        ) })
      ] }, scan.id)) })
    ] })
  ] });
};
const wrap$1 = "_wrap_p4n3o_1";
const searchField = "_searchField_p4n3o_10";
const clearBtn = "_clearBtn_p4n3o_42";
const statRow = "_statRow_p4n3o_64";
const statCell = "_statCell_p4n3o_70";
const statValue = "_statValue_p4n3o_78";
const statOf = "_statOf_p4n3o_86";
const statLabel = "_statLabel_p4n3o_93";
const chipRow = "_chipRow_p4n3o_102";
const chip = "_chip_p4n3o_102";
const chipActive = "_chipActive_p4n3o_135";
const chipCount = "_chipCount_p4n3o_140";
const list = "_list_p4n3o_156";
const loader = "_loader_p4n3o_179";
const empty$2 = "_empty_p4n3o_186";
const emptySub = "_emptySub_p4n3o_196";
const row = "_row_p4n3o_201";
const rowDone = "_rowDone_p4n3o_227";
const rowCancelled = "_rowCancelled_p4n3o_232";
const avatar$1 = "_avatar_p4n3o_236";
const avatarDone = "_avatarDone_p4n3o_251";
const rowMain = "_rowMain_p4n3o_256";
const rowName = "_rowName_p4n3o_261";
const rowMeta = "_rowMeta_p4n3o_271";
const rowCode = "_rowCode_p4n3o_282";
const rowProduct = "_rowProduct_p4n3o_289";
const rowOccurrence = "_rowOccurrence_p4n3o_298";
const dot$1 = "_dot_p4n3o_319";
const rowTags = "_rowTags_p4n3o_323";
const tagWarn = "_tagWarn_p4n3o_330";
const tagDanger = "_tagDanger_p4n3o_341";
const rowAction = "_rowAction_p4n3o_352";
const classes$3 = {
  wrap: wrap$1,
  searchField,
  clearBtn,
  statRow,
  statCell,
  statValue,
  statOf,
  statLabel,
  chipRow,
  chip,
  chipActive,
  chipCount,
  list,
  loader,
  empty: empty$2,
  emptySub,
  row,
  rowDone,
  rowCancelled,
  avatar: avatar$1,
  avatarDone,
  rowMain,
  rowName,
  rowMeta,
  rowCode,
  rowProduct,
  rowOccurrence,
  dot: dot$1,
  rowTags,
  tagWarn,
  tagDanger,
  rowAction
};
const getInitials = (attendee) => `${(attendee.first_name || "").charAt(0)}${(attendee.last_name || "").charAt(0)}`.toUpperCase() || "?";
const SearchTab = ({
  attendees,
  products,
  searchQuery,
  onSearchChange,
  onCheckInToggle,
  onOpenDetail,
  isLoading,
  isCheckInPending,
  isDeletePending,
  allowOrdersAwaitingOfflinePaymentToCheckIn,
  eventType,
  timezone,
  showRowOccurrences
}) => {
  const showOccurrence = showRowOccurrences && eventType === EventType.RECURRING && !!timezone;
  const [filter, setFilter] = useState("all");
  const stats = useMemo(() => {
    if (!attendees) return {
      total: 0,
      checkedIn: 0,
      pending: 0,
      awaiting: 0
    };
    return attendees.reduce((acc, a) => {
      acc.total += 1;
      if (a.check_in) acc.checkedIn += 1;
      else if (a.status === "AWAITING_PAYMENT") acc.awaiting += 1;
      else if (a.status === "ACTIVE") acc.pending += 1;
      return acc;
    }, {
      total: 0,
      checkedIn: 0,
      pending: 0,
      awaiting: 0
    });
  }, [attendees]);
  const filtered = useMemo(() => {
    if (!attendees) return [];
    return attendees.filter((a) => {
      if (filter === "checked_in") return !!a.check_in;
      if (filter === "pending") return !a.check_in && a.status === "ACTIVE";
      if (filter === "awaiting_payment") return a.status === "AWAITING_PAYMENT";
      return true;
    });
  }, [attendees, filter]);
  const getButtonColor = (attendee) => {
    if (attendee.check_in || attendee.status === "CANCELLED") return "red";
    if (attendee.status === "AWAITING_PAYMENT" && !allowOrdersAwaitingOfflinePaymentToCheckIn) return "gray";
    return "teal";
  };
  const checkInLabel = (attendee) => {
    if (!allowOrdersAwaitingOfflinePaymentToCheckIn && attendee.status === "AWAITING_PAYMENT") return i18n._(
      /*i18n*/
      {
        id: "RRPA79"
      }
    );
    if (attendee.status === "CANCELLED") return i18n._(
      /*i18n*/
      {
        id: "vv7kpg"
      }
    );
    if (attendee.check_in) return i18n._(
      /*i18n*/
      {
        id: "6uFFoY"
      }
    );
    return i18n._(
      /*i18n*/
      {
        id: "BPWGKn"
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: classes$3.wrap, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$3.searchField, children: [
      /* @__PURE__ */ jsx(IconSearch, { size: 20, stroke: 1.8 }),
      /* @__PURE__ */ jsx("input", { type: "text", value: searchQuery, onChange: (e) => onSearchChange(e.target.value), placeholder: i18n._(
        /*i18n*/
        {
          id: "4mBFO7"
        }
      ), "aria-label": i18n._(
        /*i18n*/
        {
          id: "VMU+zM"
        }
      ) }),
      searchQuery && /* @__PURE__ */ jsx("button", { type: "button", className: classes$3.clearBtn, "aria-label": i18n._(
        /*i18n*/
        {
          id: "V8yTm6"
        }
      ), onClick: () => onSearchChange(""), children: /* @__PURE__ */ jsx(IconX, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.statRow, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$3.statCell, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$3.statValue, children: [
          stats.checkedIn,
          /* @__PURE__ */ jsxs("span", { className: classes$3.statOf, children: [
            "/",
            stats.total
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes$3.statLabel, children: i18n._(
          /*i18n*/
          {
            id: "VrmydS"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$3.statCell, children: [
        /* @__PURE__ */ jsx("div", { className: classes$3.statValue, children: stats.pending }),
        /* @__PURE__ */ jsx("div", { className: classes$3.statLabel, children: i18n._(
          /*i18n*/
          {
            id: "ZNo5k1"
          }
        ) })
      ] }),
      stats.awaiting > 0 && /* @__PURE__ */ jsxs("div", { className: classes$3.statCell, children: [
        /* @__PURE__ */ jsx("div", { className: classes$3.statValue, children: stats.awaiting }),
        /* @__PURE__ */ jsx("div", { className: classes$3.statLabel, children: i18n._(
          /*i18n*/
          {
            id: "qcw2OD"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.chipRow, role: "tablist", "aria-label": i18n._(
      /*i18n*/
      {
        id: "L1qbUx"
      }
    ), children: [
      /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": filter === "all", className: `${classes$3.chip} ${filter === "all" ? classes$3.chipActive : ""}`, onClick: () => setFilter("all"), children: [
        i18n._(
          /*i18n*/
          {
            id: "N40H+G"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { className: classes$3.chipCount, children: stats.total })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": filter === "pending", className: `${classes$3.chip} ${filter === "pending" ? classes$3.chipActive : ""}`, onClick: () => setFilter("pending"), children: [
        i18n._(
          /*i18n*/
          {
            id: "ZNo5k1"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { className: classes$3.chipCount, children: stats.pending })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": filter === "checked_in", className: `${classes$3.chip} ${filter === "checked_in" ? classes$3.chipActive : ""}`, onClick: () => setFilter("checked_in"), children: [
        i18n._(
          /*i18n*/
          {
            id: "VrmydS"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { className: classes$3.chipCount, children: stats.checkedIn })
      ] }),
      stats.awaiting > 0 && /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": filter === "awaiting_payment", className: `${classes$3.chip} ${filter === "awaiting_payment" ? classes$3.chipActive : ""}`, onClick: () => setFilter("awaiting_payment"), children: [
        i18n._(
          /*i18n*/
          {
            id: "L+wGOG"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { className: classes$3.chipCount, children: stats.awaiting })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes$3.list, children: isLoading || !attendees || !products ? /* @__PURE__ */ jsx("div", { className: classes$3.loader, children: /* @__PURE__ */ jsx(Loader, { size: 32 }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: classes$3.empty, children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "th7rdT" }) }),
      searchQuery && /* @__PURE__ */ jsx("p", { className: classes$3.emptySub, children: /* @__PURE__ */ jsx(Trans, { id: "GUA0Jy" }) })
    ] }) : filtered.map((attendee) => {
      const product2 = products.find((p) => p.id === attendee.product_id);
      const isCheckedIn = !!attendee.check_in;
      const isAwaiting = attendee.status === "AWAITING_PAYMENT";
      const isCancelled = attendee.status === "CANCELLED";
      return /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes$3.row} ${isCheckedIn ? classes$3.rowDone : ""} ${isCancelled ? classes$3.rowCancelled : ""}`, onClick: () => onOpenDetail(attendee.public_id), "aria-label": i18n._(
        /*i18n*/
        {
          id: "9+84uW",
          values: {
            0: attendee.first_name,
            1: attendee.last_name
          }
        }
      ), children: [
        /* @__PURE__ */ jsx("div", { className: `${classes$3.avatar} ${isCheckedIn ? classes$3.avatarDone : ""}`, children: isCheckedIn ? /* @__PURE__ */ jsx(IconCheck, { size: 20, stroke: 3 }) : getInitials(attendee) }),
        /* @__PURE__ */ jsxs("div", { className: classes$3.rowMain, children: [
          /* @__PURE__ */ jsxs("div", { className: classes$3.rowName, children: [
            attendee.first_name,
            " ",
            attendee.last_name
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$3.rowMeta, children: [
            /* @__PURE__ */ jsx("span", { className: classes$3.rowCode, children: attendee.public_id }),
            product2 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: classes$3.dot, children: "•" }),
              /* @__PURE__ */ jsxs("span", { className: classes$3.rowProduct, children: [
                /* @__PURE__ */ jsx(IconTicket, { size: 12 }),
                " ",
                product2.title
              ] })
            ] })
          ] }),
          showOccurrence && attendee.event_occurrence && /* @__PURE__ */ jsxs("div", { className: classes$3.rowOccurrence, children: [
            /* @__PURE__ */ jsx(IconCalendarEvent, { size: 12 }),
            /* @__PURE__ */ jsxs("span", { children: [
              formatDateWithLocale(attendee.event_occurrence.start_date, "shortDate", timezone),
              " · ",
              formatDateWithLocale(attendee.event_occurrence.start_date, "timeOnly", timezone),
              attendee.event_occurrence.label ? ` · ${attendee.event_occurrence.label}` : ""
            ] })
          ] }),
          (isAwaiting || isCancelled) && /* @__PURE__ */ jsxs("div", { className: classes$3.rowTags, children: [
            isAwaiting && /* @__PURE__ */ jsx("span", { className: classes$3.tagWarn, children: i18n._(
              /*i18n*/
              {
                id: "3wF4Q/"
              }
            ) }),
            isCancelled && /* @__PURE__ */ jsx("span", { className: classes$3.tagDanger, children: i18n._(
              /*i18n*/
              {
                id: "vv7kpg"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { size: "sm", color: getButtonColor(attendee), disabled: isCheckInPending || isDeletePending || isCancelled, loading: isCheckInPending || isDeletePending, onClick: (e) => {
          e.stopPropagation();
          onCheckInToggle(attendee);
        }, className: classes$3.rowAction, children: checkInLabel(attendee) })
      ] }, attendee.public_id);
    }) })
  ] });
};
const wrap = "_wrap_1bysx_1";
const hero = "_hero_1bysx_28";
const heroCount = "_heroCount_1bysx_37";
const heroBig = "_heroBig_1bysx_44";
const heroOf = "_heroOf_1bysx_50";
const heroLabel = "_heroLabel_1bysx_56";
const heroProgress = "_heroProgress_1bysx_63";
const heroPercent = "_heroPercent_1bysx_71";
const grid = "_grid_1bysx_81";
const card = "_card_1bysx_88";
const cardIcon = "_cardIcon_1bysx_95";
const cardIconWarn = "_cardIconWarn_1bysx_107";
const cardIconMuted = "_cardIconMuted_1bysx_112";
const cardLabel = "_cardLabel_1bysx_117";
const cardValue = "_cardValue_1bysx_125";
const throughput = "_throughput_1bysx_133";
const throughputIcon = "_throughputIcon_1bysx_144";
const throughputBody = "_throughputBody_1bysx_156";
const throughputLabel = "_throughputLabel_1bysx_161";
const throughputValue = "_throughputValue_1bysx_169";
const throughputUnit = "_throughputUnit_1bysx_181";
const throughputRate = "_throughputRate_1bysx_186";
const sectionLabel$1 = "_sectionLabel_1bysx_208";
const productList = "_productList_1bysx_218";
const productRow = "_productRow_1bysx_224";
const productTop = "_productTop_1bysx_231";
const productName = "_productName_1bysx_238";
const productCount = "_productCount_1bysx_250";
const productOf = "_productOf_1bysx_258";
const empty$1 = "_empty_1bysx_265";
const recentList = "_recentList_1bysx_275";
const recent = "_recent_1bysx_275";
const recentCheck = "_recentCheck_1bysx_291";
const recentMain = "_recentMain_1bysx_303";
const recentName = "_recentName_1bysx_308";
const recentCode = "_recentCode_1bysx_318";
const recentTime = "_recentTime_1bysx_328";
const classes$2 = {
  wrap,
  hero,
  heroCount,
  heroBig,
  heroOf,
  heroLabel,
  heroProgress,
  heroPercent,
  grid,
  card,
  cardIcon,
  cardIconWarn,
  cardIconMuted,
  cardLabel,
  cardValue,
  throughput,
  throughputIcon,
  throughputBody,
  throughputLabel,
  throughputValue,
  throughputUnit,
  throughputRate,
  sectionLabel: sectionLabel$1,
  productList,
  productRow,
  productTop,
  productName,
  productCount,
  productOf,
  empty: empty$1,
  recentList,
  recent,
  recentCheck,
  recentMain,
  recentName,
  recentCode,
  recentTime
};
const formatTime = (iso) => {
  if (!iso) return "";
  const normalized = iso.includes("T") ? iso : iso.replace(" ", "T") + "Z";
  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
};
const THROUGHPUT_WINDOW_MINUTES = 5;
const parseCheckInTime = (iso) => {
  if (!iso) return null;
  const normalized = iso.includes("T") ? iso : iso.replace(" ", "T") + "Z";
  const t = new Date(normalized).getTime();
  return Number.isNaN(t) ? null : t;
};
const StatsTab = ({
  checkInListShortId,
  enabled,
  eventOccurrenceId
}) => {
  var _a;
  const statsQuery = useGetCheckInListStatsPublic(checkInListShortId, enabled, eventOccurrenceId);
  const stats = (_a = statsQuery.data) == null ? void 0 : _a.data;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15e3);
    return () => clearInterval(id);
  }, []);
  const total = (stats == null ? void 0 : stats.total_attendees) ?? 0;
  const checkedIn = (stats == null ? void 0 : stats.checked_in_attendees) ?? 0;
  const remaining = Math.max(0, total - checkedIn);
  const percent = total > 0 ? Math.round(checkedIn / total * 100) : 0;
  const throughput2 = useMemo(() => {
    var _a2;
    if (!((_a2 = stats == null ? void 0 : stats.recent_check_ins) == null ? void 0 : _a2.length)) {
      return {
        inWindow: 0,
        perMinute: 0,
        windowMinutes: THROUGHPUT_WINDOW_MINUTES
      };
    }
    const windowMs = THROUGHPUT_WINDOW_MINUTES * 6e4;
    const cutoff = now - windowMs;
    const inWindow = stats.recent_check_ins.filter((c) => {
      const ts = parseCheckInTime(c.checked_in_at);
      return ts !== null && ts >= cutoff;
    }).length;
    return {
      inWindow,
      perMinute: +(inWindow / THROUGHPUT_WINDOW_MINUTES).toFixed(1),
      windowMinutes: THROUGHPUT_WINDOW_MINUTES
    };
  }, [stats == null ? void 0 : stats.recent_check_ins, now]);
  return /* @__PURE__ */ jsxs("div", { className: classes$2.wrap, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$2.hero, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$2.heroCount, children: [
        /* @__PURE__ */ jsx("span", { className: classes$2.heroBig, children: checkedIn }),
        /* @__PURE__ */ jsxs("span", { className: classes$2.heroOf, children: [
          "/ ",
          total
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes$2.heroLabel, children: /* @__PURE__ */ jsx(Trans, { id: "zLRobu" }) }),
      /* @__PURE__ */ jsx(Progress, { value: percent, color: "teal", size: "lg", radius: "xl", className: classes$2.heroProgress }),
      /* @__PURE__ */ jsxs("div", { className: classes$2.heroPercent, children: [
        /* @__PURE__ */ jsxs("strong", { children: [
          percent,
          "%"
        ] }),
        " ",
        /* @__PURE__ */ jsx(Trans, { id: "zFT5rr" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$2.grid, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$2.card, children: [
        /* @__PURE__ */ jsx("div", { className: classes$2.cardIcon, children: /* @__PURE__ */ jsx(IconCheck, { size: 16 }) }),
        /* @__PURE__ */ jsx("div", { className: classes$2.cardLabel, children: i18n._(
          /*i18n*/
          {
            id: "VrmydS"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes$2.cardValue, children: checkedIn })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$2.card, children: [
        /* @__PURE__ */ jsx("div", { className: `${classes$2.cardIcon} ${classes$2.cardIconWarn}`, children: /* @__PURE__ */ jsx(IconClock, { size: 16 }) }),
        /* @__PURE__ */ jsx("div", { className: classes$2.cardLabel, children: i18n._(
          /*i18n*/
          {
            id: "ZNo5k1"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes$2.cardValue, children: remaining })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$2.card, children: [
        /* @__PURE__ */ jsx("div", { className: `${classes$2.cardIcon} ${classes$2.cardIconMuted}`, children: /* @__PURE__ */ jsx(IconUsers, { size: 16 }) }),
        /* @__PURE__ */ jsx("div", { className: classes$2.cardLabel, children: i18n._(
          /*i18n*/
          {
            id: "72c5Qo"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes$2.cardValue, children: total })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$2.throughput, children: [
      /* @__PURE__ */ jsx("div", { className: classes$2.throughputIcon, children: /* @__PURE__ */ jsx(IconBolt, { size: 18 }) }),
      /* @__PURE__ */ jsxs("div", { className: classes$2.throughputBody, children: [
        /* @__PURE__ */ jsx("div", { className: classes$2.throughputLabel, children: i18n._(
          /*i18n*/
          {
            id: "hV6FeJ"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: classes$2.throughputValue, children: [
          /* @__PURE__ */ jsx("strong", { children: throughput2.inWindow }),
          " ",
          /* @__PURE__ */ jsx("span", { className: classes$2.throughputUnit, children: /* @__PURE__ */ jsx(Trans, { id: "PdMhEx", values: {
            0: throughput2.windowMinutes
          } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$2.throughputRate, children: [
        /* @__PURE__ */ jsx("strong", { children: throughput2.perMinute }),
        /* @__PURE__ */ jsx("span", { children: i18n._(
          /*i18n*/
          {
            id: "mQV/nJ"
          }
        ) })
      ] })
    ] }),
    stats && stats.per_product.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: classes$2.sectionLabel, children: i18n._(
        /*i18n*/
        {
          id: "CetOZE"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes$2.productList, children: stats.per_product.map((p) => {
        const pct = p.total_attendees > 0 ? Math.round(p.checked_in_attendees / p.total_attendees * 100) : 0;
        return /* @__PURE__ */ jsxs("div", { className: classes$2.productRow, children: [
          /* @__PURE__ */ jsxs("div", { className: classes$2.productTop, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$2.productName, children: [
              /* @__PURE__ */ jsx(IconTicket, { size: 14 }),
              " ",
              p.product_title
            ] }),
            /* @__PURE__ */ jsxs("div", { className: classes$2.productCount, children: [
              p.checked_in_attendees,
              /* @__PURE__ */ jsxs("span", { className: classes$2.productOf, children: [
                "/",
                p.total_attendees
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: pct, color: pct === 100 ? "teal" : "grape", size: "sm", radius: "xl" })
        ] }, p.product_id);
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes$2.sectionLabel, children: i18n._(
      /*i18n*/
      {
        id: "xvnLMP"
      }
    ) }),
    !stats || stats.recent_check_ins.length === 0 ? /* @__PURE__ */ jsx("div", { className: classes$2.empty, children: /* @__PURE__ */ jsx(Trans, { id: "wG+knX" }) }) : /* @__PURE__ */ jsx("div", { className: classes$2.recentList, children: stats.recent_check_ins.map((checkIn) => /* @__PURE__ */ jsxs("div", { className: classes$2.recent, children: [
      /* @__PURE__ */ jsx("div", { className: classes$2.recentCheck, children: /* @__PURE__ */ jsx(IconCheck, { size: 14, stroke: 3 }) }),
      /* @__PURE__ */ jsxs("div", { className: classes$2.recentMain, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$2.recentName, children: [
          checkIn.first_name,
          " ",
          checkIn.last_name
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes$2.recentCode, children: [
          checkIn.attendee_public_id,
          checkIn.product_title && /* @__PURE__ */ jsxs(Fragment, { children: [
            " · ",
            checkIn.product_title
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes$2.recentTime, children: formatTime(checkIn.checked_in_at) })
    ] }, `${checkIn.attendee_public_id}-${checkIn.checked_in_at}`)) })
  ] });
};
const drawer = "_drawer_1lgqm_1";
const body = "_body_1lgqm_7";
const handleHitArea = "_handleHitArea_1lgqm_31";
const handle$1 = "_handle_1lgqm_31";
const loading = "_loading_1lgqm_55";
const errorBlock = "_errorBlock_1lgqm_61";
const header = "_header_1lgqm_71";
const headerMain = "_headerMain_1lgqm_78";
const avatar = "_avatar_1lgqm_85";
const headerText = "_headerText_1lgqm_97";
const name = "_name_1lgqm_102";
const meta = "_meta_1lgqm_112";
const code = "_code_1lgqm_122";
const dot = "_dot_1lgqm_129";
const product = "_product_1lgqm_134";
const occurrenceRow = "_occurrenceRow_1lgqm_144";
const statusRow = "_statusRow_1lgqm_159";
const closeBtn = "_closeBtn_1lgqm_163";
const contactRow = "_contactRow_1lgqm_181";
const contactItem = "_contactItem_1lgqm_188";
const section = "_section_1lgqm_205";
const sectionLabel = "_sectionLabel_1lgqm_209";
const checkInsList = "_checkInsList_1lgqm_221";
const checkInRow = "_checkInRow_1lgqm_227";
const checkInBadge = "_checkInBadge_1lgqm_239";
const notesBox = "_notesBox_1lgqm_250";
const answersList = "_answersList_1lgqm_261";
const answerRow = "_answerRow_1lgqm_267";
const answerQ = "_answerQ_1lgqm_273";
const answerA = "_answerA_1lgqm_281";
const orderGrid = "_orderGrid_1lgqm_288";
const orderCell = "_orderCell_1lgqm_294";
const orderLabel = "_orderLabel_1lgqm_304";
const orderValue = "_orderValue_1lgqm_312";
const hiddenHint = "_hiddenHint_1lgqm_321";
const footer = "_footer_1lgqm_331";
const classes$1 = {
  drawer,
  body,
  handleHitArea,
  handle: handle$1,
  loading,
  errorBlock,
  header,
  headerMain,
  avatar,
  headerText,
  name,
  meta,
  code,
  dot,
  product,
  occurrenceRow,
  statusRow,
  closeBtn,
  contactRow,
  contactItem,
  section,
  sectionLabel,
  checkInsList,
  checkInRow,
  checkInBadge,
  notesBox,
  answersList,
  answerRow,
  answerQ,
  answerA,
  orderGrid,
  orderCell,
  orderLabel,
  orderValue,
  hiddenHint,
  footer
};
const formatDateTime = (iso) => {
  if (!iso) return "";
  const normalized = iso.includes("T") ? iso : iso.replace(" ", "T") + "Z";
  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
};
const answerToString = (answer) => {
  if (answer == null) return "—";
  if (Array.isArray(answer)) return answer.join(", ");
  return answer;
};
const DRAG_DISMISS_THRESHOLD_PX = 90;
const AttendeeDetailSheet = ({
  checkInListShortId,
  attendeePublicId,
  eventType,
  timezone,
  onClose,
  onCheckInToggle,
  isActionPending
}) => {
  var _a, _b, _c;
  const open = attendeePublicId !== null;
  const detailQuery = useGetCheckInListAttendeeDetailPublic(checkInListShortId, attendeePublicId);
  const meQuery = useGetMe();
  const isLoggedIn = !!((_a = meQuery.data) == null ? void 0 : _a.id);
  const dragStartRef = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    if (!open) {
      setDragOffset(0);
      setDragging(false);
      dragStartRef.current = null;
    }
  }, [open]);
  const onHandlePointerDown = useCallback((e) => {
    dragStartRef.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);
  const onHandlePointerMove = useCallback((e) => {
    if (dragStartRef.current === null) return;
    const delta = Math.max(0, e.clientY - dragStartRef.current);
    setDragOffset(delta);
  }, []);
  const onHandlePointerEnd = useCallback((e) => {
    if (dragStartRef.current === null) return;
    const delta = Math.max(0, e.clientY - dragStartRef.current);
    dragStartRef.current = null;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
    }
    if (delta > DRAG_DISMISS_THRESHOLD_PX) {
      onClose();
    } else {
      setDragOffset(0);
    }
  }, [onClose]);
  const detail = (_b = detailQuery.data) == null ? void 0 : _b.data;
  const currentCheckIn = (_c = detail == null ? void 0 : detail.check_ins) == null ? void 0 : _c[0];
  const isCheckedIn = !!currentCheckIn;
  const visibility = detail == null ? void 0 : detail.visibility;
  const showNotes = isLoggedIn || !!(visibility == null ? void 0 : visibility.notes);
  const showQuestions = isLoggedIn || !!(visibility == null ? void 0 : visibility.question_answers);
  const showOrder = isLoggedIn || !!(visibility == null ? void 0 : visibility.order_details);
  const statusBadge = useMemo(() => {
    if (!detail) return null;
    if (detail.status === "CANCELLED") {
      return /* @__PURE__ */ jsx(Badge, { color: "red", variant: "light", size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "vv7kpg"
        }
      ) });
    }
    if (detail.status === "AWAITING_PAYMENT") {
      return /* @__PURE__ */ jsx(Badge, { color: "orange", variant: "light", size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "3wF4Q/"
        }
      ) });
    }
    if (isCheckedIn) {
      return /* @__PURE__ */ jsx(Badge, { color: "teal", variant: "light", size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "VrmydS"
        }
      ) });
    }
    return /* @__PURE__ */ jsx(Badge, { color: "gray", variant: "light", size: "sm", children: i18n._(
      /*i18n*/
      {
        id: "Itw24Q"
      }
    ) });
  }, [detail, isCheckedIn]);
  const canToggle = detail && detail.status !== "CANCELLED";
  return /* @__PURE__ */ jsxs(Drawer, { opened: open, onClose, position: "bottom", size: 640, padding: "0", withCloseButton: false, overlayProps: {
    backgroundOpacity: 0.45,
    blur: 2
  }, classNames: {
    content: classes$1.drawer,
    body: classes$1.body
  }, styles: {
    content: {
      transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : void 0,
      transition: dragging ? "none" : void 0
    }
  }, children: [
    /* @__PURE__ */ jsx("div", { className: classes$1.handleHitArea, onPointerDown: onHandlePointerDown, onPointerMove: onHandlePointerMove, onPointerUp: onHandlePointerEnd, onPointerCancel: onHandlePointerEnd, "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: classes$1.handle }) }),
    detailQuery.isLoading && !detail && /* @__PURE__ */ jsx("div", { className: classes$1.loading, children: /* @__PURE__ */ jsx(Loader, { size: "sm" }) }),
    detailQuery.isError && /* @__PURE__ */ jsxs("div", { className: classes$1.errorBlock, children: [
      /* @__PURE__ */ jsx(IconAlertTriangle, { size: 20 }),
      /* @__PURE__ */ jsx("div", { children: i18n._(
        /*i18n*/
        {
          id: "DaE0Hg"
        }
      ) })
    ] }),
    detail && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("header", { className: classes$1.header, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$1.headerMain, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.avatar, "aria-hidden": "true", children: /* @__PURE__ */ jsx(IconUser, { size: 22 }) }),
          /* @__PURE__ */ jsxs("div", { className: classes$1.headerText, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$1.name, children: [
              detail.first_name,
              " ",
              detail.last_name
            ] }),
            /* @__PURE__ */ jsxs("div", { className: classes$1.meta, children: [
              /* @__PURE__ */ jsx("span", { className: classes$1.code, children: detail.public_id }),
              detail.product_title && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: classes$1.dot, children: "·" }),
                /* @__PURE__ */ jsxs("span", { className: classes$1.product, children: [
                  /* @__PURE__ */ jsx(IconTicket, { size: 12 }),
                  " ",
                  detail.product_title
                ] })
              ] })
            ] }),
            eventType === EventType.RECURRING && detail.event_occurrence && timezone && /* @__PURE__ */ jsxs("div", { className: classes$1.occurrenceRow, children: [
              /* @__PURE__ */ jsx(IconCalendarEvent, { size: 12 }),
              /* @__PURE__ */ jsxs("span", { children: [
                formatDateWithLocale(detail.event_occurrence.start_date, "shortDate", timezone),
                " · ",
                formatDateWithLocale(detail.event_occurrence.start_date, "timeOnly", timezone),
                detail.event_occurrence.label ? ` · ${detail.event_occurrence.label}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: classes$1.statusRow, children: statusBadge })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", className: classes$1.closeBtn, onClick: onClose, "aria-label": i18n._(
          /*i18n*/
          {
            id: "yz7wBu"
          }
        ), children: /* @__PURE__ */ jsx(IconX, { size: 18 }) })
      ] }),
      !!detail.email && /* @__PURE__ */ jsx("div", { className: classes$1.contactRow, children: /* @__PURE__ */ jsxs("div", { className: classes$1.contactItem, children: [
        /* @__PURE__ */ jsx(IconMail, { size: 14 }),
        /* @__PURE__ */ jsx("span", { children: detail.email })
      ] }) }),
      isCheckedIn && currentCheckIn && /* @__PURE__ */ jsxs("div", { className: classes$1.section, children: [
        /* @__PURE__ */ jsx("div", { className: classes$1.sectionLabel, children: i18n._(
          /*i18n*/
          {
            id: "9s/wrQ"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes$1.checkInsList, children: detail.check_ins.map((c) => /* @__PURE__ */ jsxs("div", { className: classes$1.checkInRow, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.checkInBadge, children: /* @__PURE__ */ jsx(IconCheck, { size: 12, stroke: 3 }) }),
          /* @__PURE__ */ jsx("div", { children: formatDateTime(c.checked_in_at) })
        ] }, c.id)) })
      ] }),
      showNotes && detail.notes && /* @__PURE__ */ jsxs("div", { className: classes$1.section, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$1.sectionLabel, children: [
          /* @__PURE__ */ jsx(IconClipboardText, { size: 14 }),
          " ",
          i18n._(
            /*i18n*/
            {
              id: "1DBGsz"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes$1.notesBox, children: detail.notes })
      ] }),
      showQuestions && detail.question_answers && detail.question_answers.length > 0 && /* @__PURE__ */ jsxs("div", { className: classes$1.section, children: [
        /* @__PURE__ */ jsx("div", { className: classes$1.sectionLabel, children: i18n._(
          /*i18n*/
          {
            id: "+qygei"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes$1.answersList, children: detail.question_answers.map((qa, idx) => /* @__PURE__ */ jsxs("div", { className: classes$1.answerRow, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.answerQ, children: qa.title }),
          /* @__PURE__ */ jsx("div", { className: classes$1.answerA, children: answerToString(qa.answer) })
        ] }, `${qa.question_id}-${idx}`)) })
      ] }),
      showOrder && detail.order && /* @__PURE__ */ jsxs("div", { className: classes$1.section, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$1.sectionLabel, children: [
          /* @__PURE__ */ jsx(IconReceipt2, { size: 14 }),
          " ",
          i18n._(
            /*i18n*/
            {
              id: "UYUgdb"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes$1.orderGrid, children: [
          /* @__PURE__ */ jsxs("div", { className: classes$1.orderCell, children: [
            /* @__PURE__ */ jsx("span", { className: classes$1.orderLabel, children: i18n._(
              /*i18n*/
              {
                id: "mm+eaX"
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: classes$1.orderValue, children: detail.order.public_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$1.orderCell, children: [
            /* @__PURE__ */ jsx("span", { className: classes$1.orderLabel, children: i18n._(
              /*i18n*/
              {
                id: "XqdYDH"
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: classes$1.orderValue, children: formatDateTime(detail.order.created_at) })
          ] }),
          detail.order.first_name && /* @__PURE__ */ jsxs("div", { className: classes$1.orderCell, children: [
            /* @__PURE__ */ jsx("span", { className: classes$1.orderLabel, children: i18n._(
              /*i18n*/
              {
                id: "JunetL"
              }
            ) }),
            /* @__PURE__ */ jsxs("span", { className: classes$1.orderValue, children: [
              detail.order.first_name,
              " ",
              detail.order.last_name
            ] })
          ] }),
          detail.order.email && /* @__PURE__ */ jsxs("div", { className: classes$1.orderCell, children: [
            /* @__PURE__ */ jsx("span", { className: classes$1.orderLabel, children: i18n._(
              /*i18n*/
              {
                id: "phmeUH"
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: classes$1.orderValue, children: detail.order.email })
          ] })
        ] })
      ] }),
      !isLoggedIn && visibility && (!visibility.notes || !visibility.question_answers || !visibility.order_details) && /* @__PURE__ */ jsx("div", { className: classes$1.hiddenHint, children: /* @__PURE__ */ jsx(Trans, { id: "iACSrw" }) }),
      /* @__PURE__ */ jsx("div", { className: classes$1.footer, children: /* @__PURE__ */ jsx(Button, { fullWidth: true, size: "lg", color: isCheckedIn ? "red" : "teal", disabled: !canToggle, loading: isActionPending, onClick: () => detail && onCheckInToggle(detail), leftSection: isCheckedIn ? /* @__PURE__ */ jsx(IconX, { size: 18 }) : /* @__PURE__ */ jsx(IconCheck, { size: 18 }), children: isCheckedIn ? i18n._(
        /*i18n*/
        {
          id: "6uFFoY"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "BPWGKn"
        }
      ) }) })
    ] })
  ] });
};
const pill = "_pill_1t4n3_1";
const pillActive = "_pillActive_1t4n3_21";
const pillLabel = "_pillLabel_1t4n3_30";
const sheetContent = "_sheetContent_1t4n3_37";
const sheetBody = "_sheetBody_1t4n3_45";
const handle = "_handle_1t4n3_52";
const sheetHeader = "_sheetHeader_1t4n3_61";
const searchWrap = "_searchWrap_1t4n3_68";
const options = "_options_1t4n3_73";
const group = "_group_1t4n3_79";
const groupLabel = "_groupLabel_1t4n3_83";
const option = "_option_1t4n3_73";
const optionSelected = "_optionSelected_1t4n3_111";
const optionPast = "_optionPast_1t4n3_116";
const optionMain = "_optionMain_1t4n3_120";
const optionToday = "_optionToday_1t4n3_131";
const todayBadge = "_todayBadge_1t4n3_135";
const empty = "_empty_1t4n3_149";
const truncationNote = "_truncationNote_1t4n3_156";
const classes = {
  pill,
  pillActive,
  pillLabel,
  sheetContent,
  sheetBody,
  handle,
  sheetHeader,
  searchWrap,
  options,
  group,
  groupLabel,
  option,
  optionSelected,
  optionPast,
  optionMain,
  optionToday,
  todayBadge,
  empty,
  truncationNote
};
const MAX_VISIBLE = 50;
const OccurrenceFilterPill = ({
  occurrences,
  activeOccurrenceId,
  timezone: tz,
  onSelect
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const activeOccurrence = useMemo(() => activeOccurrenceId ? occurrences.find((o) => o.id === activeOccurrenceId) ?? null : null, [activeOccurrenceId, occurrences]);
  const {
    grouped,
    totalFiltered,
    totalAvailable,
    truncated
  } = useMemo(() => filterAndGroupOccurrences(occurrences, {
    search,
    tz,
    filterCancelled: true,
    maxVisible: MAX_VISIBLE
  }), [occurrences, search, tz]);
  const pillLabel2 = activeOccurrence ? formatOccurrenceLabel(activeOccurrence, tz) : i18n._(
    /*i18n*/
    {
      id: "sgUdRZ"
    }
  );
  const handleSelect = (occurrenceId) => {
    onSelect(occurrenceId);
    setSheetOpen(false);
    setSearch("");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes.pill} ${activeOccurrence ? classes.pillActive : ""}`, onClick: () => setSheetOpen(true), "aria-label": i18n._(
      /*i18n*/
      {
        id: "N/H3++"
      }
    ), "aria-haspopup": "dialog", children: [
      /* @__PURE__ */ jsx(IconCalendar, { size: 14 }),
      /* @__PURE__ */ jsx("span", { className: classes.pillLabel, children: pillLabel2 }),
      /* @__PURE__ */ jsx(IconChevronDown, { size: 14 })
    ] }),
    /* @__PURE__ */ jsxs(Drawer, { opened: sheetOpen, onClose: () => setSheetOpen(false), position: "bottom", size: "auto", padding: 0, withCloseButton: false, zIndex: 400, overlayProps: {
      backgroundOpacity: 0.45,
      blur: 2
    }, classNames: {
      content: classes.sheetContent,
      body: classes.sheetBody
    }, children: [
      /* @__PURE__ */ jsx("div", { className: classes.handle }),
      /* @__PURE__ */ jsx("div", { className: classes.sheetHeader, children: i18n._(
        /*i18n*/
        {
          id: "N/H3++"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: classes.searchWrap, children: /* @__PURE__ */ jsx(TextInput, { value: search, onChange: (e) => setSearch(e.currentTarget.value), placeholder: i18n._(
        /*i18n*/
        {
          id: "iRtEpV"
        }
      ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 14 }), size: "sm", autoFocus: true }) }),
      /* @__PURE__ */ jsxs("div", { className: classes.options, children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes.option} ${activeOccurrenceId === null ? classes.optionSelected : ""}`, onClick: () => handleSelect(null), children: [
          /* @__PURE__ */ jsx("span", { className: classes.optionMain, children: i18n._(
            /*i18n*/
            {
              id: "sgUdRZ"
            }
          ) }),
          activeOccurrenceId === null && /* @__PURE__ */ jsx(IconCheck, { size: 16 })
        ] }),
        grouped.map((group2) => /* @__PURE__ */ jsxs("div", { className: classes.group, children: [
          /* @__PURE__ */ jsx("div", { className: classes.groupLabel, children: group2.label }),
          group2.items.map((occ) => {
            const selected = activeOccurrenceId === occ.id;
            const todayOcc = isToday(occ, tz);
            return /* @__PURE__ */ jsxs("button", { type: "button", className: `${classes.option} ${selected ? classes.optionSelected : ""} ${occ.is_past ? classes.optionPast : ""}`, onClick: () => handleSelect(occ.id), children: [
              /* @__PURE__ */ jsxs("span", { className: `${classes.optionMain} ${todayOcc ? classes.optionToday : ""}`, children: [
                todayOcc && /* @__PURE__ */ jsx("span", { className: classes.todayBadge, children: i18n._(
                  /*i18n*/
                  {
                    id: "ecUA8p"
                  }
                ) }),
                formatOccurrenceLabel(occ, tz)
              ] }),
              selected && /* @__PURE__ */ jsx(IconCheck, { size: 16 })
            ] }, occ.id);
          })
        ] }, group2.key)),
        totalFiltered === 0 && /* @__PURE__ */ jsx("div", { className: classes.empty, children: i18n._(
          /*i18n*/
          {
            id: "/ZB4Um"
          }
        ) }),
        truncated && /* @__PURE__ */ jsx("div", { className: classes.truncationNote, children: i18n._(
          /*i18n*/
          {
            id: "5rzhBQ",
            values: {
              MAX_VISIBLE,
              totalAvailable
            }
          }
        ) })
      ] })
    ] })
  ] });
};
const URL_PARAM = "occurrence";
const STORAGE_KEY_PREFIX = "checkInOccurrenceFilter:";
const storageKey = (checkInListShortId) => checkInListShortId ? `${STORAGE_KEY_PREFIX}${checkInListShortId}` : null;
const useCheckInOccurrenceFilter = (checkInListShortId, occurrences) => {
  const key = storageKey(checkInListShortId);
  const [searchParams, setSearchParams] = useSearchParams();
  const [didClearStale, setDidClearStale] = useState(false);
  const [hasHydratedFromStorage, setHasHydratedFromStorage] = useState(false);
  useEffect(() => {
    return;
  }, [key, searchParams, setSearchParams, hasHydratedFromStorage]);
  const rawParam = searchParams.get(URL_PARAM);
  const occurrenceId = useMemo(() => {
    if (!rawParam) return null;
    const parsed = Number(rawParam);
    return Number.isFinite(parsed) ? parsed : null;
  }, [rawParam]);
  useEffect(() => {
    if (occurrenceId === null) return;
    if (!occurrences || occurrences.length === 0) return;
    const stillExists = occurrences.some((o) => o.id === occurrenceId && o.status !== "CANCELLED");
    if (!stillExists) {
      const next = new URLSearchParams(searchParams);
      next.delete(URL_PARAM);
      setSearchParams(next, {
        replace: true
      });
      setDidClearStale(true);
    }
  }, [occurrenceId, occurrences, key, searchParams, setSearchParams]);
  const setOccurrenceId = useCallback((id) => {
    setDidClearStale(false);
    const next = new URLSearchParams(searchParams);
    if (id === null) {
      next.delete(URL_PARAM);
    } else {
      next.set(URL_PARAM, String(id));
    }
    setSearchParams(next, {
      replace: false
    });
  }, [searchParams, setSearchParams, key]);
  const clear = useCallback(() => setOccurrenceId(null), [setOccurrenceId]);
  const activeOccurrence = useMemo(() => {
    if (occurrenceId === null || !occurrences) return null;
    return occurrences.find((o) => o.id === occurrenceId) ?? null;
  }, [occurrenceId, occurrences]);
  return {
    occurrenceId,
    activeOccurrence,
    setOccurrenceId,
    clear,
    didClearStale
  };
};
const MAX_RECENT_SCANS = 20;
const CheckIn = () => {
  var _a, _b, _c, _d, _e, _f;
  const networkStatus = useNetwork();
  const {
    checkInListShortId
  } = useParams();
  const CheckInListQuery = useGetCheckInListPublic(checkInListShortId);
  const checkInList = (_a = CheckInListQuery == null ? void 0 : CheckInListQuery.data) == null ? void 0 : _a.data;
  const event = checkInList == null ? void 0 : checkInList.event;
  const eventSettings = event == null ? void 0 : event.settings;
  const [activeTab, setActiveTab] = useState(() => {
    return "scan";
  });
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  useEffect(() => {
    return;
  }, [activeTab]);
  useEffect(() => {
    return;
  }, []);
  const [scanMode, setScanMode] = useState(() => {
    return "usb";
  });
  const [recentScans, setRecentScans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced] = useDebouncedValue(searchQuery, 200);
  const [currentBarcode, setCurrentBarcode] = useState("");
  const [pageHasFocus, setPageHasFocus] = useState(true);
  const barcodeTimeoutRef = useRef(null);
  const isProcessingRef = useRef(false);
  const processedBarcodesRef = useRef(/* @__PURE__ */ new Set());
  const lastScanTimeRef = useRef(0);
  const scanSuccessAudioRef = useRef(null);
  const scanErrorAudioRef = useRef(null);
  const [isSoundOn, setIsSoundOn] = useState(() => {
    return true;
  });
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [detailAttendeePublicId, setDetailAttendeePublicId] = useState(null);
  const [checkInModalOpen, checkInModalHandlers] = useDisclosure(false);
  const haptic = useHaptics();
  const [infoModalOpen, infoModalHandlers] = useDisclosure(false, {
    onOpen: () => {
      CheckInListQuery.refetch();
    }
  });
  const products = checkInList == null ? void 0 : checkInList.products;
  const pillOccurrences = (checkInList == null ? void 0 : checkInList.event_occurrences) ?? (event == null ? void 0 : event.occurrences);
  const showOccurrenceFilter = (event == null ? void 0 : event.type) === EventType.RECURRING && !(checkInList == null ? void 0 : checkInList.event_occurrence_id) && ((pillOccurrences == null ? void 0 : pillOccurrences.length) ?? 0) > 0;
  const {
    occurrenceId: occurrenceFilter,
    setOccurrenceId: setOccurrenceFilter,
    didClearStale
  } = useCheckInOccurrenceFilter(checkInListShortId, pillOccurrences);
  useEffect(() => {
    if (didClearStale) {
      showInfo(i18n._(
        /*i18n*/
        {
          id: "N4Zkqc"
        }
      ));
    }
  }, [didClearStale]);
  const queryFilters = {
    pageNumber: 1,
    query: searchQueryDebounced,
    perPage: 150,
    filterFields: {
      status: {
        operator: QueryFilterOperator.Equals,
        value: "ACTIVE"
      },
      ...showOccurrenceFilter && occurrenceFilter !== null ? {
        event_occurrence_id: {
          operator: QueryFilterOperator.Equals,
          value: String(occurrenceFilter)
        }
      } : {}
    }
  };
  const attendeesQuery = useGetCheckInListAttendees(checkInListShortId, queryFilters, (checkInList == null ? void 0 : checkInList.is_active) && !(checkInList == null ? void 0 : checkInList.is_expired));
  const attendees = (_b = attendeesQuery == null ? void 0 : attendeesQuery.data) == null ? void 0 : _b.data;
  const checkInMutation = useCreateCheckInPublic(queryFilters);
  const deleteCheckInMutation = useDeleteCheckInPublic(queryFilters);
  const areOfflinePaymentsEnabled = (_c = eventSettings == null ? void 0 : eventSettings.payment_providers) == null ? void 0 : _c.includes("OFFLINE");
  const allowOrdersAwaitingOfflinePaymentToCheckIn = areOfflinePaymentsEnabled && (eventSettings == null ? void 0 : eventSettings.allow_orders_awaiting_offline_payment_to_check_in);
  const progressStatsQuery = useGetCheckInListStatsPublic(checkInListShortId, !!(checkInList == null ? void 0 : checkInList.is_active) && !(checkInList == null ? void 0 : checkInList.is_expired) && showOccurrenceFilter && occurrenceFilter !== null, occurrenceFilter);
  useEffect(() => {
  }, [isSoundOn]);
  useEffect(() => {
  }, [scanMode]);
  useEffect(() => {
    return;
  }, [checkInListShortId, checkInList == null ? void 0 : checkInList.description]);
  const dismissDescription = () => {
    setDescriptionModalOpen(false);
  };
  const playSuccessSound = useCallback(() => {
    if (isSoundOn && scanSuccessAudioRef.current) {
      scanSuccessAudioRef.current.currentTime = 0;
      scanSuccessAudioRef.current.play().catch(() => {
      });
    }
  }, [isSoundOn]);
  const playErrorSound = useCallback(() => {
    if (isSoundOn && scanErrorAudioRef.current) {
      scanErrorAudioRef.current.currentTime = 0;
      scanErrorAudioRef.current.play().catch(() => {
      });
    }
  }, [isSoundOn]);
  const pushRecentScan = useCallback((scan) => {
    setRecentScans((prev) => [{
      ...scan,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now()
    }, ...prev].slice(0, MAX_RECENT_SCANS));
  }, []);
  const recordScan = useCallback((attendee, code2, status) => {
    const name2 = attendee ? `${attendee.first_name ?? ""} ${attendee.last_name ?? ""}`.trim() || code2 : code2;
    pushRecentScan({
      name: name2,
      code: code2,
      status
    });
  }, [pushRecentScan]);
  const undoCheckIn = useCallback((attendee, checkInShortId) => {
    deleteCheckInMutation.mutate({
      checkInListShortId,
      checkInShortId
    }, {
      onSuccess: () => {
        showSuccess(/* @__PURE__ */ jsx(Trans, { id: "as6XfO", values: {
          0: attendee.first_name
        } }));
        playSuccessSound();
        haptic("tap");
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "17VbmV"
          }
        ));
        playErrorSound();
        haptic("error");
      }
    });
  }, [deleteCheckInMutation, checkInListShortId, playSuccessSound, playErrorSound, haptic]);
  const handleCheckInAction = (attendee, action) => {
    checkInMutation.mutate({
      checkInListShortId,
      attendeePublicId: attendee.public_id,
      action
    }, {
      onSuccess: (response) => {
        const {
          errors,
          data
        } = response;
        if (errors && errors[attendee.public_id]) {
          showError(errors[attendee.public_id]);
          playErrorSound();
          haptic("error");
          recordScan(attendee, attendee.public_id, "error");
          return;
        }
        playSuccessSound();
        haptic("success");
        recordScan(attendee, attendee.public_id, "success");
        checkInModalHandlers.close();
        setSelectedAttendee(null);
        const createdCheckIn = data == null ? void 0 : data.find((c) => c.attendee_id === attendee.id);
        const message = /* @__PURE__ */ jsx(Trans, { id: "3beCx0", values: {
          0: attendee.first_name
        }, components: {
          0: /* @__PURE__ */ jsx("b", {})
        } });
        if (createdCheckIn) {
          showSuccessWithUndo(message, () => undoCheckIn(attendee, String(createdCheckIn.short_id)), {
            undoLabel: i18n._(
              /*i18n*/
              {
                id: "9uI/rE"
              }
            )
          });
        } else {
          showSuccess(message);
        }
      },
      onError: (error) => {
        var _a2, _b2;
        playErrorSound();
        haptic("error");
        recordScan(attendee, attendee.public_id, "error");
        if (!networkStatus.online) {
          showError(i18n._(
            /*i18n*/
            {
              id: "gGhBmF"
            }
          ));
          return;
        }
        if (error instanceof AxiosError) {
          showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "FMdMfZ"
            }
          ));
        }
      }
    });
  };
  const handleCheckInToggle = (attendee) => {
    if (attendee.check_in) {
      deleteCheckInMutation.mutate({
        checkInListShortId,
        checkInShortId: attendee.check_in.short_id
      }, {
        onSuccess: () => {
          showSuccess(/* @__PURE__ */ jsx(Trans, { id: "yxhYRZ", values: {
            0: attendee.first_name
          }, components: {
            0: /* @__PURE__ */ jsx("b", {})
          } }));
          playSuccessSound();
          haptic("tap");
        },
        onError: (error) => {
          var _a2, _b2;
          playErrorSound();
          haptic("error");
          if (!networkStatus.online) {
            showError(i18n._(
              /*i18n*/
              {
                id: "gGhBmF"
              }
            ));
            return;
          }
          if (error instanceof AxiosError) {
            showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
              /*i18n*/
              {
                id: "bPWBLL"
              }
            ));
          } else {
            showError(i18n._(
              /*i18n*/
              {
                id: "bPWBLL"
              }
            ));
          }
        }
      });
      return;
    }
    const isAttendeeAwaitingPayment = attendee.status === "AWAITING_PAYMENT";
    if (allowOrdersAwaitingOfflinePaymentToCheckIn && isAttendeeAwaitingPayment) {
      setSelectedAttendee(attendee);
      checkInModalHandlers.open();
      return;
    }
    if (!allowOrdersAwaitingOfflinePaymentToCheckIn && isAttendeeAwaitingPayment) {
      showError(i18n._(
        /*i18n*/
        {
          id: "yNi4PV"
        }
      ));
      return;
    }
    handleCheckInAction(attendee, "check-in");
  };
  const handleQrCheckIn = useCallback(async (attendeePublicId) => {
    if (isProcessingRef.current) {
      return;
    }
    const now = Date.now();
    if (processedBarcodesRef.current.has(attendeePublicId) && now - lastScanTimeRef.current < 3e3) {
      showError(i18n._(
        /*i18n*/
        {
          id: "0Ew0uk"
        }
      ));
      playErrorSound();
      return;
    }
    isProcessingRef.current = true;
    lastScanTimeRef.current = now;
    let attendee = attendees == null ? void 0 : attendees.find((a) => a.public_id === attendeePublicId);
    if (!attendee) {
      try {
        const {
          data
        } = await publicCheckInClient.getCheckInListAttendee(checkInListShortId, attendeePublicId);
        attendee = data;
      } catch (error) {
        showError(i18n._(
          /*i18n*/
          {
            id: "Vx2J6x"
          }
        ));
        playErrorSound();
        recordScan(null, attendeePublicId, "error");
        isProcessingRef.current = false;
        return;
      }
      if (!attendee) {
        showError(i18n._(
          /*i18n*/
          {
            id: "QKim6l"
          }
        ));
        playErrorSound();
        recordScan(null, attendeePublicId, "error");
        isProcessingRef.current = false;
        return;
      }
    }
    if (attendee.check_in) {
      showError(/* @__PURE__ */ jsx(Trans, { id: "lAOy2r", values: {
        0: attendee.first_name,
        1: attendee.last_name
      } }));
      playErrorSound();
      haptic("warning");
      recordScan(attendee, attendeePublicId, "duplicate");
      processedBarcodesRef.current.add(attendeePublicId);
      isProcessingRef.current = false;
      return;
    }
    const isAttendeeAwaitingPayment = attendee.status === "AWAITING_PAYMENT";
    if (allowOrdersAwaitingOfflinePaymentToCheckIn && isAttendeeAwaitingPayment) {
      setSelectedAttendee(attendee);
      checkInModalHandlers.open();
      isProcessingRef.current = false;
      return;
    }
    if (!allowOrdersAwaitingOfflinePaymentToCheckIn && isAttendeeAwaitingPayment) {
      showError(i18n._(
        /*i18n*/
        {
          id: "yNi4PV"
        }
      ));
      playErrorSound();
      recordScan(attendee, attendeePublicId, "error");
      isProcessingRef.current = false;
      return;
    }
    processedBarcodesRef.current.add(attendeePublicId);
    setTimeout(() => {
      processedBarcodesRef.current.delete(attendeePublicId);
    }, 1e4);
    await handleCheckInAction(attendee, "check-in");
    isProcessingRef.current = false;
  }, [attendees, checkInListShortId, allowOrdersAwaitingOfflinePaymentToCheckIn, checkInModalHandlers, handleCheckInAction, playErrorSound, recordScan]);
  const processBarcode = useCallback((barcode) => {
    if (barcode.startsWith("A-") && barcode.length > 3) {
      handleQrCheckIn(barcode);
    }
  }, [handleQrCheckIn]);
  useEffect(() => {
    const handleFocus = () => setPageHasFocus(true);
    const handleBlur = () => setPageHasFocus(false);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);
  useEffect(() => {
    const usbListeningActive = activeTab === "scan" && scanMode === "usb";
    if (!usbListeningActive) {
      setCurrentBarcode("");
      return;
    }
    const handleKeyPress = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "Enter") {
        if (currentBarcode.length > 0) {
          processBarcode(currentBarcode);
          setCurrentBarcode("");
        }
      } else if (e.key.length === 1) {
        setCurrentBarcode((prev) => {
          const newBarcode = prev + e.key;
          if (barcodeTimeoutRef.current) {
            clearTimeout(barcodeTimeoutRef.current);
          }
          barcodeTimeoutRef.current = setTimeout(() => {
            if (newBarcode.startsWith("A-") && newBarcode.length > 3) {
              processBarcode(newBarcode);
            }
            setCurrentBarcode("");
          }, 100);
          return newBarcode;
        });
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (barcodeTimeoutRef.current) {
        clearTimeout(barcodeTimeoutRef.current);
      }
    };
  }, [activeTab, scanMode, currentBarcode, processBarcode]);
  if (CheckInListQuery.error && ((_d = CheckInListQuery.error.response) == null ? void 0 : _d.status) === 404) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "vPqpQG"
      }
    ), imageHref: "/blank-slate/check-in-lists.svg", subHeading: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: i18n._(
      /*i18n*/
      {
        id: "5ShqeM"
      }
    ) }) }) });
  }
  if (checkInList == null ? void 0 : checkInList.is_expired) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "+hBhWk"
      }
    ), imageHref: "/blank-slate/check-in-lists.svg", subHeading: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "Sa7w7S" }) }) }) });
  }
  if (((_e = checkInList == null ? void 0 : checkInList.event_occurrence) == null ? void 0 : _e.status) === EventOccurrenceStatus.CANCELLED) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "5sN96e"
      }
    ), imageHref: "/blank-slate/check-in-lists.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "SOmGDa" }) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "PhioFp" }) })
    ] }) });
  }
  if (checkInList && !(checkInList == null ? void 0 : checkInList.is_active)) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "mBsBHq"
      }
    ), imageHref: "/blank-slate/check-in-lists.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "K6fmBI"
        }
      ) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Check-in list will activate in",
        " ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(Countdown, { targetDate: checkInList.activates_at, onExpiry: () => CheckInListQuery.refetch() }) })
      ] })
    ] }) });
  }
  const filteredStats = (_f = progressStatsQuery.data) == null ? void 0 : _f.data;
  const totalAttendees = (filteredStats == null ? void 0 : filteredStats.total_attendees) ?? (checkInList == null ? void 0 : checkInList.total_attendees) ?? 0;
  const checkedInCount = (filteredStats == null ? void 0 : filteredStats.checked_in_attendees) ?? (checkInList == null ? void 0 : checkInList.checked_in_attendees) ?? 0;
  return /* @__PURE__ */ jsxs("div", { className: classes$7.app, children: [
    /* @__PURE__ */ jsxs("header", { className: classes$7.topBar, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$7.topBarMain, children: [
        /* @__PURE__ */ jsx("div", { className: classes$7.topLabel, children: i18n._(
          /*i18n*/
          {
            id: "gXcPxc"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes$7.topTitle, children: /* @__PURE__ */ jsx(Truncate, { text: (checkInList == null ? void 0 : checkInList.name) ?? "", length: 26 }) }),
        (checkInList == null ? void 0 : checkInList.event_occurrence) && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsxs("div", { className: classes$7.topScope, children: [
          /* @__PURE__ */ jsx(IconCalendarEvent, { size: 12 }),
          /* @__PURE__ */ jsxs("span", { children: [
            formatDateWithLocale(checkInList.event_occurrence.start_date, "shortDate", event.timezone),
            " · ",
            formatDateWithLocale(checkInList.event_occurrence.start_date, "timeOnly", event.timezone),
            checkInList.event_occurrence.label ? ` · ${checkInList.event_occurrence.label}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$7.topRight, children: [
        totalAttendees > 0 && /* @__PURE__ */ jsxs("div", { className: classes$7.progressChip, "aria-label": i18n._(
          /*i18n*/
          {
            id: "5tV1in"
          }
        ), children: [
          /* @__PURE__ */ jsx("span", { className: classes$7.progressValue, children: checkedInCount }),
          /* @__PURE__ */ jsxs("span", { className: classes$7.progressOf, children: [
            "/",
            totalAttendees
          ] })
        ] }),
        !networkStatus.online && /* @__PURE__ */ jsxs("div", { className: classes$7.offlineBadge, "aria-label": i18n._(
          /*i18n*/
          {
            id: "6Aih4U"
          }
        ), children: [
          /* @__PURE__ */ jsx(IconWifiOff, { size: 14 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "6Aih4U"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", radius: "xl", onClick: () => infoModalHandlers.open(), "aria-label": i18n._(
          /*i18n*/
          {
            id: "dwjiJt"
          }
        ), className: classes$7.infoBtn, children: /* @__PURE__ */ jsx(IconInfoCircle, { size: 20 }) })
      ] })
    ] }),
    showOccurrenceFilter && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsx("div", { className: classes$7.occurrenceFilterBar, children: /* @__PURE__ */ jsx(OccurrenceFilterPill, { occurrences: pillOccurrences ?? [], activeOccurrenceId: occurrenceFilter, timezone: event.timezone, onSelect: setOccurrenceFilter }) }),
    /* @__PURE__ */ jsxs("main", { className: classes$7.content, children: [
      activeTab === "scan" && /* @__PURE__ */ jsx(ScanTab, { mode: scanMode, onModeChange: setScanMode, hidPageHasFocus: pageHasFocus, hidBuffer: currentBarcode, isSoundOn, onSoundToggle: () => setIsSoundOn(!isSoundOn), onAttendeeScanned: handleQrCheckIn, onOpenRecentScan: setDetailAttendeePublicId, recentScans }),
      activeTab === "search" && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(SearchTab, { attendees, products, searchQuery, onSearchChange: setSearchQuery, onCheckInToggle: handleCheckInToggle, onOpenDetail: setDetailAttendeePublicId, isLoading: attendeesQuery.isFetching, isCheckInPending: checkInMutation.isPending, isDeletePending: deleteCheckInMutation.isPending, allowOrdersAwaitingOfflinePaymentToCheckIn: allowOrdersAwaitingOfflinePaymentToCheckIn || false, eventType: event == null ? void 0 : event.type, timezone: event == null ? void 0 : event.timezone, showRowOccurrences: showOccurrenceFilter }) }),
      activeTab === "stats" && /* @__PURE__ */ jsx(StatsTab, { checkInListShortId, enabled: !!(checkInList == null ? void 0 : checkInList.is_active) && !(checkInList == null ? void 0 : checkInList.is_expired), eventOccurrenceId: showOccurrenceFilter ? occurrenceFilter : null })
    ] }),
    /* @__PURE__ */ jsx(BottomNav, { active: activeTab, onChange: setActiveTab }),
    /* @__PURE__ */ jsx(CheckInOptionsModal, { isOpen: checkInModalOpen, attendee: selectedAttendee, isPending: checkInMutation.isPending, onClose: () => {
      checkInModalHandlers.close();
      setSelectedAttendee(null);
    }, onCheckIn: (action) => selectedAttendee && handleCheckInAction(selectedAttendee, action) }),
    /* @__PURE__ */ jsx(CheckInInfoModal, { isOpen: infoModalOpen, checkInList, onClose: infoModalHandlers.close }),
    /* @__PURE__ */ jsx(CheckInDescriptionModal, { isOpen: descriptionModalOpen, description: checkInList == null ? void 0 : checkInList.description, onDismiss: dismissDescription }),
    /* @__PURE__ */ jsx(AttendeeDetailSheet, { checkInListShortId, attendeePublicId: detailAttendeePublicId, eventType: event == null ? void 0 : event.type, timezone: event == null ? void 0 : event.timezone, onClose: () => setDetailAttendeePublicId(null), isActionPending: checkInMutation.isPending || deleteCheckInMutation.isPending, onCheckInToggle: (detail) => {
      var _a2, _b2;
      const attendee = {
        id: detail.id,
        product_id: detail.product_id,
        product_price_id: 0,
        order_id: ((_a2 = detail.order) == null ? void 0 : _a2.id) ?? 0,
        status: detail.status,
        first_name: detail.first_name,
        last_name: detail.last_name,
        email: detail.email,
        public_id: detail.public_id,
        short_id: detail.public_id,
        check_in: ((_b2 = detail.check_ins) == null ? void 0 : _b2[0]) ? {
          id: detail.check_ins[0].id,
          attendee_id: detail.check_ins[0].attendee_id,
          check_in_list_id: detail.check_ins[0].check_in_list_id,
          product_id: detail.product_id,
          event_id: 0,
          short_id: detail.check_ins[0].short_id,
          order_id: detail.check_ins[0].order_id,
          created_at: detail.check_ins[0].checked_in_at
        } : void 0
      };
      handleCheckInToggle(attendee);
    } }),
    /* @__PURE__ */ jsx("audio", { ref: scanSuccessAudioRef, src: "/sounds/scan-success.wav" }),
    /* @__PURE__ */ jsx("audio", { ref: scanErrorAudioRef, src: "/sounds/scan-error.wav" })
  ] });
};
export {
  CheckIn as default
};

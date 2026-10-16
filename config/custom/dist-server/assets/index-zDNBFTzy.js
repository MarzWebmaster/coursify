import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useNavigate, useLocation } from "react-router";
import { Text, SegmentedControl, Stack, Checkbox, NumberInput, TextInput, Radio, Button, Drawer, CloseButton, Select, ActionIcon, Table, Skeleton, Anchor, Progress, Tooltip, Group, Menu, Paper } from "@mantine/core";
import { IconClock, IconRuler, IconUsers, IconTag, IconMapPin, IconAlertTriangle, IconSparkles, IconPlus, IconX, IconChevronLeft, IconChevronRight, IconWorld, IconPencil, IconDotsVertical, IconList, IconCalendar, IconCalendarEvent, IconCalendarPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState, useMemo, useId, useEffect, useCallback, useRef } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { modals } from "@mantine/modals";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { G as GET_EVENT_OCCURRENCES_QUERY_KEY, u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { d as EventOccurrenceStatus, M as MessageType, L as LocationType, Q as QueryFilterOperator } from "./types-CqPWB-a5.js";
import { G as GET_EVENT_QUERY_KEY, u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { f as formatDateWithLocale, a as formatOccurrenceEnd } from "./dates-CbVpwZeX.js";
import { g as getEventLocationDisplay } from "./effectiveLocation-BzDgAlu_.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { b as buildBulkRescheduleTemplate, u as useCancelOccurrence, a as useDeleteEventOccurrence, c as useReactivateOccurrence, O as OccurrenceAttendeesAndOrders, d as OccurrenceEditModal } from "./index-Yy0Il7Zs.js";
import { useForm } from "@mantine/form";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { L as LocationPicker } from "./index-iW6667X7.js";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { e as eventOccurrenceClient } from "./event-occurrence.client-xqTaU2Nv.js";
import { u as useCreateLocation } from "./useCreateLocation-DZ93UmD2.js";
import { i as isAddressSet } from "./addressUtilities-7xIQim0X.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { S as SendMessageModal } from "./index-7RPUkRz0.js";
import classNames from "classnames";
import { C as CalendarView } from "./index-CK3ZfAh1.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { u as useOccurrenceCheckIn, s as statusLabel, a as OccurrenceActionBar, S as StatusIcon, O as OccurrenceMenuItems } from "./useOccurrenceCheckIn-CRXwKNrq.js";
import { u as useGetEventOccurrence } from "./useGetEventOccurrence-Csyd2oEM.js";
import { S as SideDrawer } from "./index-DTsqBh8c.js";
import { S as ShareModal } from "./index-BwSXzvSP.js";
import { e as eventHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import "../entry.server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/dates";
import "@mantine/colors-generator";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/advancedFormat.js";
import "./useGetPriceOverrides-DcysoAcA.js";
import "./index-DAgXC5_F.js";
import "./useGetCheckInLists-DZb0QIwp.js";
import "./index-DC4VxyXX.js";
import "./attendee.client-CeeZ2TBj.js";
import "./useGetEventCounts-BudQN_tQ.js";
import "./index-BXVupOij.js";
import "./products-BLTGbPdF.js";
import "react-qr-code";
import "./index-BfWJHinS.js";
import "./index-gUnclHYL.js";
import "./index-R0GQzPHn.js";
import "./index-CoMrHZbF.js";
import "./index-ChciN8SC.js";
import "./index-CYsdl7UG.js";
import "./index-D0pbWAZK.js";
import "@tanstack/react-table";
import "./index-DuG5BVAJ.js";
import "./index-BAJxP518.js";
import "./useUrlHash-BZci-yZ8.js";
import "./countries-C8-MXWCy.js";
import "./useGeoStatus-GfcfS0IW.js";
import "./order.client-BmBVeAyF.js";
import "./useGetAccount-CGfwRfDK.js";
import "./index-BmGsefon.js";
import "./index-CnTFmtaW.js";
import "./index-IzdRcWBR.js";
import "./index-wMxbqESV.js";
import "./download-DP3M_6Yt.js";
import "./withLoadingNotification-6oRbhBHA.js";
const useBulkUpdateOccurrences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      data
    }) => eventOccurrenceClient.bulkUpdate(eventId, data),
    onSuccess: () => Promise.all([queryClient.invalidateQueries({
      queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
    }), queryClient.invalidateQueries({
      queryKey: [GET_EVENT_QUERY_KEY]
    })])
  });
};
const actionPicker = "_actionPicker_pgnyw_1";
const actionOption = "_actionOption_pgnyw_7";
const actionOptionIcon = "_actionOptionIcon_pgnyw_25";
const actionOptionLabel = "_actionOptionLabel_pgnyw_37";
const actionOptionDesc = "_actionOptionDesc_pgnyw_43";
const backLink = "_backLink_pgnyw_49";
const classes$4 = {
  actionPicker,
  actionOption,
  actionOptionIcon,
  actionOptionLabel,
  actionOptionDesc,
  backLink
};
const OccurrenceBulkEditModal = ({
  onClose,
  occurrences
}) => {
  const ACTIONS = [{
    value: "shift_times",
    label: i18n._(
      /*i18n*/
      {
        id: "jDNHW4"
      }
    ),
    icon: IconClock,
    description: i18n._(
      /*i18n*/
      {
        id: "+Y/na7"
      }
    ),
    testId: "occurrence-bulk-action-shift-times"
  }, {
    value: "change_duration",
    label: i18n._(
      /*i18n*/
      {
        id: "kJkjoB"
      }
    ),
    icon: IconRuler,
    description: i18n._(
      /*i18n*/
      {
        id: "uPe5p8"
      }
    ),
    testId: "occurrence-bulk-action-change-duration"
  }, {
    value: "update_capacity",
    label: i18n._(
      /*i18n*/
      {
        id: "59qHrb"
      }
    ),
    icon: IconUsers,
    description: i18n._(
      /*i18n*/
      {
        id: "J0KExZ"
      }
    ),
    testId: "occurrence-bulk-action-update-capacity"
  }, {
    value: "update_label",
    label: i18n._(
      /*i18n*/
      {
        id: "7EhE4k"
      }
    ),
    icon: IconTag,
    description: i18n._(
      /*i18n*/
      {
        id: "ODuUEi"
      }
    ),
    testId: "occurrence-bulk-action-update-label"
  }, {
    value: "update_location",
    label: i18n._(
      /*i18n*/
      {
        id: "NPQWj8"
      }
    ),
    icon: IconMapPin,
    description: i18n._(
      /*i18n*/
      {
        id: "ETC76A"
      }
    ),
    testId: "occurrence-bulk-action-update-location"
  }];
  const {
    eventId
  } = useParams();
  const bulkUpdateMutation = useBulkUpdateOccurrences();
  const createLocationMutation = useCreateLocation();
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: event
  } = useGetEvent(eventId);
  const organizerId = event == null ? void 0 : event.organizer_id;
  const [pendingNotification, setPendingNotification] = useState(null);
  const form = useForm({
    initialValues: {
      bulk_action: null,
      shift_direction: "later",
      shift_hours: 0,
      shift_minutes: 0,
      duration_hours: 1,
      duration_minutes: 0,
      capacity: void 0,
      clear_capacity: false,
      label: "",
      clear_label: false,
      location_mode: "in_person",
      location: null,
      online_event_connection_details: "",
      future_only: true,
      skip_overridden: true,
      scope: "loaded"
    }
  });
  const selectedAction = form.values.bulk_action;
  const isAllMatching = form.values.scope === "matching";
  const affectedOccurrences = (occurrences ?? []).filter((occ) => {
    if (occ.status === EventOccurrenceStatus.CANCELLED) return false;
    if (form.values.future_only && occ.is_past) return false;
    if (form.values.skip_overridden && occ.is_overridden) return false;
    return true;
  });
  const affectedOccurrenceIds = affectedOccurrences.map((occ) => Number(occ.id)).filter((id) => Number.isFinite(id));
  const loadedAffectedCount = occurrences ? affectedOccurrences.length : void 0;
  const loadedAffectedAttendees = affectedOccurrences.reduce((sum, occ) => {
    var _a;
    return sum + (((_a = occ.statistics) == null ? void 0 : _a.attendees_registered) ?? 0);
  }, 0);
  const buildRequest = async () => {
    if (!isAllMatching && affectedOccurrenceIds.length === 0) {
      showError(i18n._(
        /*i18n*/
        {
          id: "yDukIL"
        }
      ));
      return null;
    }
    const base = isAllMatching ? {
      action: "update",
      future_only: form.values.future_only,
      skip_overridden: form.values.skip_overridden,
      apply_to_all: true
    } : {
      action: "update",
      future_only: form.values.future_only,
      skip_overridden: form.values.skip_overridden,
      occurrence_ids: affectedOccurrenceIds
    };
    switch (selectedAction) {
      case "shift_times": {
        const totalMinutes = form.values.shift_hours * 60 + form.values.shift_minutes;
        if (totalMinutes === 0) {
          showError(i18n._(
            /*i18n*/
            {
              id: "khyScF"
            }
          ));
          return null;
        }
        const shift = form.values.shift_direction === "earlier" ? -totalMinutes : totalMinutes;
        return {
          ...base,
          start_time_shift: shift,
          end_time_shift: shift
        };
      }
      case "change_duration": {
        const totalMinutes = form.values.duration_hours * 60 + form.values.duration_minutes;
        if (totalMinutes === 0) {
          showError(i18n._(
            /*i18n*/
            {
              id: "Jd3ymG"
            }
          ));
          return null;
        }
        return {
          ...base,
          duration_minutes: totalMinutes
        };
      }
      case "update_capacity": {
        if (form.values.clear_capacity) {
          return {
            ...base,
            clear_capacity: true
          };
        }
        if (form.values.capacity === void 0 || form.values.capacity === null) {
          showError(i18n._(
            /*i18n*/
            {
              id: "SqOIQU"
            }
          ));
          return null;
        }
        return {
          ...base,
          capacity: form.values.capacity
        };
      }
      case "update_label": {
        if (form.values.clear_label) {
          return {
            ...base,
            clear_label: true
          };
        }
        if (form.values.label.trim() === "") {
          showError(i18n._(
            /*i18n*/
            {
              id: "h37gRz"
            }
          ));
          return null;
        }
        return {
          ...base,
          label: form.values.label.trim()
        };
      }
      case "update_location": {
        if (form.values.location_mode === "online") {
          const details = form.values.online_event_connection_details.trim();
          if (details === "") {
            showError(i18n._(
              /*i18n*/
              {
                id: "/chGpa"
              }
            ));
            return null;
          }
          return {
            ...base,
            event_location: {
              type: LocationType.Online,
              online_event_connection_details: details
            }
          };
        }
        if (form.values.location_mode === "clear") {
          return {
            ...base,
            clear_event_location: true
          };
        }
        const location2 = form.values.location;
        if (!location2 || location2.kind === "new" && !isAddressSet(location2.address)) {
          showError(i18n._(
            /*i18n*/
            {
              id: "ppwojw"
            }
          ));
          return null;
        }
        if (location2.kind === "saved") {
          return {
            ...base,
            event_location: {
              type: LocationType.InPerson,
              location_id: Number(location2.location.id)
            }
          };
        }
        if (!organizerId) {
          showError(i18n._(
            /*i18n*/
            {
              id: "vLd1tV"
            }
          ));
          return null;
        }
        const created = await createLocationMutation.mutateAsync({
          organizerId,
          payload: {
            name: location2.address.venue_name || null,
            structured_address: location2.address,
            latitude: location2.latitude,
            longitude: location2.longitude,
            provider: location2.provider,
            provider_place_id: location2.providerPlaceId
          }
        });
        return {
          ...base,
          event_location: {
            type: LocationType.InPerson,
            location_id: Number(created.data.id)
          }
        };
      }
      default:
        return null;
    }
  };
  const submit = (data, notifyAfterSave) => {
    bulkUpdateMutation.mutate({
      eventId,
      data
    }, {
      onSuccess: (response) => {
        const count = response.updated_count;
        const actionLabels = {
          "shift_times": i18n._(
            /*i18n*/
            {
              id: "tPfIaW",
              values: {
                count
              }
            }
          ),
          "change_duration": i18n._(
            /*i18n*/
            {
              id: "B5icLR",
              values: {
                count
              }
            }
          ),
          "update_capacity": i18n._(
            /*i18n*/
            {
              id: "dDuona",
              values: {
                count
              }
            }
          ),
          "update_label": i18n._(
            /*i18n*/
            {
              id: "FT3LSc",
              values: {
                count
              }
            }
          ),
          "update_location": i18n._(
            /*i18n*/
            {
              id: "8EcY1g",
              values: {
                count
              }
            }
          )
        };
        showSuccess(actionLabels[selectedAction] || i18n._(
          /*i18n*/
          {
            id: "ogoTrw",
            values: {
              count
            }
          }
        ));
        const updatedIds = response.updated_ids ?? [];
        if (notifyAfterSave && updatedIds.length > 0 && selectedAction) {
          setPendingNotification({
            occurrenceIds: updatedIds,
            actionDescription: describeAction(selectedAction)
          });
          return;
        }
        onClose();
      },
      onError: (error) => {
        var _a, _b, _c, _d, _e;
        if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 422) {
          errorHandler(form, error, (_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message);
        } else {
          showError(((_e = (_d = error == null ? void 0 : error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || i18n._(
            /*i18n*/
            {
              id: "Eq6Tu9"
            }
          ));
        }
      }
    });
  };
  const handleSubmit = async () => {
    var _a, _b;
    let data;
    try {
      data = await buildRequest();
    } catch (error) {
      showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
        /*i18n*/
        {
          id: "vkiDx2"
        }
      ));
      return;
    }
    if (!data) return;
    const changesDateOrTime = selectedAction === "shift_times" || selectedAction === "change_duration";
    const shouldConfirm = changesDateOrTime && (isAllMatching || loadedAffectedAttendees > 0);
    if (shouldConfirm) {
      const notifyRef = {
        current: true
      };
      modals.openConfirmModal({
        title: i18n._(
          /*i18n*/
          {
            id: "zKAheG"
          }
        ),
        children: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", mb: "md", children: isAllMatching ? i18n._(
            /*i18n*/
            {
              id: "wkP5FM"
            }
          ) : loadedAffectedAttendees === 1 ? i18n._(
            /*i18n*/
            {
              id: "6hIk/x"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "mhZbzw",
              values: {
                loadedAffectedAttendees
              }
            }
          ) }),
          /* @__PURE__ */ jsx(Checkbox, { defaultChecked: true, label: i18n._(
            /*i18n*/
            {
              id: "+uexiy"
            }
          ), description: i18n._(
            /*i18n*/
            {
              id: "McuGND"
            }
          ), onChange: (e) => {
            notifyRef.current = e.currentTarget.checked;
          } })
        ] }),
        labels: {
          confirm: i18n._(
            /*i18n*/
            {
              id: "tfDRzk"
            }
          ),
          cancel: i18n._(
            /*i18n*/
            {
              id: "dEgA5A"
            }
          )
        },
        onConfirm: () => submit(data, notifyRef.current)
      });
      return;
    }
    submit(data, false);
  };
  const notificationTemplate = useMemo(() => {
    if (!pendingNotification || !event) return null;
    return buildBulkRescheduleTemplate(event, pendingNotification.occurrenceIds.length, pendingNotification.actionDescription);
  }, [pendingNotification, event]);
  const scopeParts = [];
  scopeParts.push(form.values.future_only ? i18n._(
    /*i18n*/
    {
      id: "PGQLdy"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "z7GAMJ"
    }
  ));
  if (form.values.skip_overridden) {
    scopeParts.push(i18n._(
      /*i18n*/
      {
        id: "4JVMUi"
      }
    ));
  }
  const describeAction = (action2) => {
    switch (action2) {
      case "shift_times":
        return i18n._(
          /*i18n*/
          {
            id: "sr2Je0"
          }
        );
      case "change_duration":
        return i18n._(
          /*i18n*/
          {
            id: "o++0qa"
          }
        );
      case "update_capacity":
        return i18n._(
          /*i18n*/
          {
            id: "nzao08"
          }
        );
      case "update_label":
        return i18n._(
          /*i18n*/
          {
            id: "o66QSP"
          }
        );
      case "update_location":
        return i18n._(
          /*i18n*/
          {
            id: "A/kIva"
          }
        );
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Modal, { opened: !pendingNotification, onClose, heading: i18n._(
      /*i18n*/
      {
        id: "1Fbd6n"
      }
    ), children: !selectedAction ? /* @__PURE__ */ jsx("div", { className: classes$4.actionPicker, children: ACTIONS.map(({
      value,
      label,
      icon: Icon,
      description,
      testId
    }) => /* @__PURE__ */ jsxs("button", { type: "button", className: classes$4.actionOption, "data-testid": testId, onClick: () => form.setFieldValue("bulk_action", value), children: [
      /* @__PURE__ */ jsx("div", { className: classes$4.actionOptionIcon, children: /* @__PURE__ */ jsx(Icon, { size: 20 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: classes$4.actionOptionLabel, children: label }),
        /* @__PURE__ */ jsx("div", { className: classes$4.actionOptionDesc, children: description })
      ] })
    ] }, value)) }) : /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      handleSubmit();
    }, children: [
      /* @__PURE__ */ jsxs("button", { type: "button", className: classes$4.backLink, onClick: () => form.setFieldValue("bulk_action", null), children: [
        "← ",
        i18n._(
          /*i18n*/
          {
            id: "ElShBO"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, mb: 4, children: i18n._(
        /*i18n*/
        {
          id: "NzWX1Y"
        }
      ) }),
      /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, size: "sm", mb: "sm", data: [{
        value: "loaded",
        label: i18n._(
          /*i18n*/
          {
            id: "C33p4q"
          }
        )
      }, {
        value: "matching",
        label: i18n._(
          /*i18n*/
          {
            id: "B4RFBk"
          }
        )
      }], ...form.getInputProps("scope") }),
      /* @__PURE__ */ jsxs(Stack, { gap: "xs", mb: "sm", children: [
        /* @__PURE__ */ jsx(Checkbox, { label: i18n._(
          /*i18n*/
          {
            id: "8N/j1s"
          }
        ), ...form.getInputProps("future_only", {
          type: "checkbox"
        }) }),
        /* @__PURE__ */ jsx(Checkbox, { label: i18n._(
          /*i18n*/
          {
            id: "E//btK"
          }
        ), ...form.getInputProps("skip_overridden", {
          type: "checkbox"
        }) })
      ] }),
      /* @__PURE__ */ jsxs(Callout, { variant: "info", children: [
        isAllMatching ? i18n._(
          /*i18n*/
          {
            id: "je4muG",
            values: {
              0: scopeParts.join(", ")
            }
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "vP3Nzg",
            values: {
              0: scopeParts.join(", ")
            }
          }
        ),
        !isAllMatching && loadedAffectedCount !== void 0 && /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, mt: 4, children: i18n._(
          /*i18n*/
          {
            id: "FYXq7k",
            values: {
              loadedAffectedCount
            }
          }
        ) })
      ] }),
      selectedAction === "shift_times" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, size: "sm", mb: "sm", data: [{
          value: "later",
          label: i18n._(
            /*i18n*/
            {
              id: "FIq1Ba"
            }
          )
        }, {
          value: "earlier",
          label: i18n._(
            /*i18n*/
            {
              id: "5oD9f/"
            }
          )
        }], ...form.getInputProps("shift_direction") }),
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
            /*i18n*/
            {
              id: "yY8wAv"
            }
          ), ...form.getInputProps("shift_hours"), min: 0, max: 23, allowNegative: false }),
          /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
            /*i18n*/
            {
              id: "agRWc1"
            }
          ), ...form.getInputProps("shift_minutes"), min: 0, max: 59, allowNegative: false })
        ] })
      ] }),
      selectedAction === "change_duration" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "sm", children: i18n._(
          /*i18n*/
          {
            id: "buHACR"
          }
        ) }),
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
            /*i18n*/
            {
              id: "yY8wAv"
            }
          ), ...form.getInputProps("duration_hours"), min: 0, max: 168, allowNegative: false }),
          /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
            /*i18n*/
            {
              id: "agRWc1"
            }
          ), ...form.getInputProps("duration_minutes"), min: 0, max: 59, allowNegative: false })
        ] })
      ] }),
      selectedAction === "update_capacity" && /* @__PURE__ */ jsxs(Fragment, { children: [
        !form.values.clear_capacity && /* @__PURE__ */ jsx(NumberInput, { ...form.getInputProps("capacity"), label: i18n._(
          /*i18n*/
          {
            id: "7I8LlL"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "ej4L8b"
          }
        ), min: 0, allowNegative: false, mb: "xs" }),
        /* @__PURE__ */ jsx(Checkbox, { label: i18n._(
          /*i18n*/
          {
            id: "TaeFgl"
          }
        ), ...form.getInputProps("clear_capacity", {
          type: "checkbox"
        }) })
      ] }),
      selectedAction === "update_label" && /* @__PURE__ */ jsxs(Fragment, { children: [
        !form.values.clear_label && /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("label"), label: i18n._(
          /*i18n*/
          {
            id: "n1GRql"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "/zajIE"
          }
        ), leftSection: /* @__PURE__ */ jsx(IconTag, { size: 14 }), mb: "xs" }),
        /* @__PURE__ */ jsx(Checkbox, { label: i18n._(
          /*i18n*/
          {
            id: "Bjh87R"
          }
        ), ...form.getInputProps("clear_label", {
          type: "checkbox"
        }) })
      ] }),
      selectedAction === "update_location" && /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsx(Radio.Group, { label: i18n._(
          /*i18n*/
          {
            id: "zz/Wd/"
          }
        ), value: form.values.location_mode, onChange: (value) => form.setFieldValue("location_mode", value), children: /* @__PURE__ */ jsxs(Stack, { gap: 6, mt: 6, children: [
          /* @__PURE__ */ jsx(Radio, { value: "in_person", label: i18n._(
            /*i18n*/
            {
              id: "u7r0G5"
            }
          ) }),
          /* @__PURE__ */ jsx(Radio, { value: "online", label: i18n._(
            /*i18n*/
            {
              id: "aqmy5k"
            }
          ) }),
          /* @__PURE__ */ jsx(Radio, { value: "clear", label: i18n._(
            /*i18n*/
            {
              id: "QyOWu9"
            }
          ) })
        ] }) }),
        form.values.location_mode === "in_person" && organizerId && /* @__PURE__ */ jsx(LocationPicker, { organizerId, value: form.values.location, onChange: (value) => form.setFieldValue("location", value) }),
        form.values.location_mode === "online" && /* @__PURE__ */ jsx(Editor, { value: form.values.online_event_connection_details, label: i18n._(
          /*i18n*/
          {
            id: "5lcVkL"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "jQjwR+"
          }
        ), onChange: (value) => form.setFieldValue("online_event_connection_details", value) }),
        form.values.location_mode === "clear" && /* @__PURE__ */ jsx(Callout, { variant: "tip", children: i18n._(
          /*i18n*/
          {
            id: "kmnKnX"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "lg", "data-testid": "occurrence-bulk-edit-submit-button", loading: bulkUpdateMutation.isPending || createLocationMutation.isPending, children: i18n._(
        /*i18n*/
        {
          id: "YIIQtt"
        }
      ) })
    ] }) }),
    pendingNotification && notificationTemplate && /* @__PURE__ */ jsx(SendMessageModal, { onClose: () => {
      setPendingNotification(null);
      onClose();
    }, messageType: MessageType.AllAttendees, eventOccurrenceIds: pendingNotification.occurrenceIds, initialSubject: notificationTemplate.subject, initialMessage: notificationTemplate.message })
  ] });
};
const useGenerateOccurrences = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      data
    }) => eventOccurrenceClient.generate(eventId, data)
  });
};
const content = "_content_1xmgv_1";
const body = "_body_1xmgv_7";
const header$1 = "_header_1xmgv_15";
const headerText = "_headerText_1xmgv_25";
const headerTitle = "_headerTitle_1xmgv_32";
const headerActions = "_headerActions_1xmgv_40";
const escHint = "_escHint_1xmgv_48";
const main = "_main_1xmgv_58";
const formColumn = "_formColumn_1xmgv_65";
const previewColumn = "_previewColumn_1xmgv_71";
const previewEyebrow = "_previewEyebrow_1xmgv_81";
const footer = "_footer_1xmgv_89";
const footerHint = "_footerHint_1xmgv_99";
const footerActions = "_footerActions_1xmgv_105";
const block = "_block_1xmgv_112";
const blockHeader = "_blockHeader_1xmgv_122";
const blockLabel = "_blockLabel_1xmgv_135";
const capacityInput = "_capacityInput_1xmgv_140";
const fieldHint = "_fieldHint_1xmgv_144";
const sentenceRow = "_sentenceRow_1xmgv_150";
const timeSlot = "_timeSlot_1xmgv_158";
const sentenceWord = "_sentenceWord_1xmgv_163";
const stepper = "_stepper_1xmgv_168";
const dayDots = "_dayDots_1xmgv_210";
const dayDot = "_dayDot_1xmgv_210";
const selected = "_selected_1xmgv_240";
const patternContent = "_patternContent_1xmgv_256";
const monthGrid = "_monthGrid_1xmgv_260";
const monthCell = "_monthCell_1xmgv_267";
const inlineSelect = "_inlineSelect_1xmgv_294";
const inlineDayInput = "_inlineDayInput_1xmgv_298";
const inlineDateInput = "_inlineDateInput_1xmgv_305";
const inlineCountInput = "_inlineCountInput_1xmgv_309";
const slotStart = "_slotStart_1xmgv_321";
const slotSep = "_slotSep_1xmgv_325";
const slotEnd = "_slotEnd_1xmgv_329";
const slotLabel = "_slotLabel_1xmgv_333";
const slotRemove = "_slotRemove_1xmgv_337";
const timeInput = "_timeInput_1xmgv_341";
const timeSeparator = "_timeSeparator_1xmgv_345";
const endTimeWrap = "_endTimeWrap_1xmgv_351";
const plusDayPill = "_plusDayPill_1xmgv_355";
const countCard = "_countCard_1xmgv_370";
const countNumber = "_countNumber_1xmgv_380";
const countNumberWarning = "_countNumberWarning_1xmgv_387";
const countSubtitle = "_countSubtitle_1xmgv_391";
const calendarCard = "_calendarCard_1xmgv_396";
const calendarHeader = "_calendarHeader_1xmgv_403";
const calendarWeekdays = "_calendarWeekdays_1xmgv_439";
const calendarGrid = "_calendarGrid_1xmgv_453";
const calendarCell = "_calendarCell_1xmgv_459";
const outside = "_outside_1xmgv_468";
const occurrence = "_occurrence_1xmgv_471";
const ruleBox = "_ruleBox_1xmgv_477";
const ruleDot = "_ruleDot_1xmgv_496";
const ruleBoxWarning = "_ruleBoxWarning_1xmgv_505";
const previewFootnote = "_previewFootnote_1xmgv_510";
const previewEmpty = "_previewEmpty_1xmgv_516";
const previewBelowForm = "_previewBelowForm_1xmgv_531";
const classes$3 = {
  content,
  body,
  header: header$1,
  headerText,
  headerTitle,
  headerActions,
  escHint,
  main,
  formColumn,
  previewColumn,
  previewEyebrow,
  footer,
  footerHint,
  footerActions,
  block,
  blockHeader,
  blockLabel,
  capacityInput,
  fieldHint,
  sentenceRow,
  timeSlot,
  sentenceWord,
  stepper,
  dayDots,
  dayDot,
  selected,
  patternContent,
  monthGrid,
  monthCell,
  inlineSelect,
  inlineDayInput,
  inlineDateInput,
  inlineCountInput,
  slotStart,
  slotSep,
  slotEnd,
  slotLabel,
  slotRemove,
  timeInput,
  timeSeparator,
  endTimeWrap,
  plusDayPill,
  countCard,
  countNumber,
  countNumberWarning,
  countSubtitle,
  calendarCard,
  calendarHeader,
  calendarWeekdays,
  calendarGrid,
  calendarCell,
  outside,
  occurrence,
  ruleBox,
  ruleDot,
  ruleBoxWarning,
  previewFootnote,
  previewEmpty,
  previewBelowForm
};
const MAX_PREVIEW = 1200;
const DAYS_OF_WEEK = [{
  value: "monday",
  label: i18n._(
    /*i18n*/
    {
      id: "fpMgHS"
    }
  ),
  full: i18n._(
    /*i18n*/
    {
      id: "hty0d5"
    }
  )
}, {
  value: "tuesday",
  label: i18n._(
    /*i18n*/
    {
      id: "vq2WxD"
    }
  ),
  full: i18n._(
    /*i18n*/
    {
      id: "G3myU+"
    }
  )
}, {
  value: "wednesday",
  label: i18n._(
    /*i18n*/
    {
      id: "0f7U0k"
    }
  ),
  full: i18n._(
    /*i18n*/
    {
      id: "VAcXNz"
    }
  )
}, {
  value: "thursday",
  label: i18n._(
    /*i18n*/
    {
      id: "+FjWgX"
    }
  ),
  full: i18n._(
    /*i18n*/
    {
      id: "kkDQ8m"
    }
  )
}, {
  value: "friday",
  label: i18n._(
    /*i18n*/
    {
      id: "xVhQZV"
    }
  ),
  full: i18n._(
    /*i18n*/
    {
      id: "39y5bn"
    }
  )
}, {
  value: "saturday",
  label: i18n._(
    /*i18n*/
    {
      id: "PiK6Ld"
    }
  ),
  full: i18n._(
    /*i18n*/
    {
      id: "+5kO8P"
    }
  )
}, {
  value: "sunday",
  label: i18n._(
    /*i18n*/
    {
      id: "D89zck"
    }
  ),
  full: i18n._(
    /*i18n*/
    {
      id: "DBC3t5"
    }
  )
}];
const FREQUENCIES = [{
  value: "daily",
  label: i18n._(
    /*i18n*/
    {
      id: "U0sC6H"
    }
  )
}, {
  value: "weekly",
  label: i18n._(
    /*i18n*/
    {
      id: "4XSc4l"
    }
  )
}, {
  value: "monthly",
  label: i18n._(
    /*i18n*/
    {
      id: "+8Nek/"
    }
  )
}, {
  value: "yearly",
  label: i18n._(
    /*i18n*/
    {
      id: "zkWmBh"
    }
  )
}];
const WEEK_POSITIONS = [{
  value: "1",
  label: i18n._(
    /*i18n*/
    {
      id: "syyeb9"
    }
  )
}, {
  value: "2",
  label: i18n._(
    /*i18n*/
    {
      id: "ku//5b"
    }
  )
}, {
  value: "3",
  label: i18n._(
    /*i18n*/
    {
      id: "UlykKR"
    }
  )
}, {
  value: "4",
  label: i18n._(
    /*i18n*/
    {
      id: "a8nooQ"
    }
  )
}, {
  value: "-1",
  label: i18n._(
    /*i18n*/
    {
      id: "RtKKbA"
    }
  )
}];
const MONTHS = [{
  value: "1",
  label: i18n._(
    /*i18n*/
    {
      id: "rjyWPb"
    }
  )
}, {
  value: "2",
  label: i18n._(
    /*i18n*/
    {
      id: "4lgLew"
    }
  )
}, {
  value: "3",
  label: i18n._(
    /*i18n*/
    {
      id: "hg6l4j"
    }
  )
}, {
  value: "4",
  label: i18n._(
    /*i18n*/
    {
      id: "naCW6Z"
    }
  )
}, {
  value: "5",
  label: i18n._(
    /*i18n*/
    {
      id: "3JzsDb"
    }
  )
}, {
  value: "6",
  label: i18n._(
    /*i18n*/
    {
      id: "zeEQd/"
    }
  )
}, {
  value: "7",
  label: i18n._(
    /*i18n*/
    {
      id: "u4ex5r"
    }
  )
}, {
  value: "8",
  label: i18n._(
    /*i18n*/
    {
      id: "DBHTm/"
    }
  )
}, {
  value: "9",
  label: i18n._(
    /*i18n*/
    {
      id: "hgvbYY"
    }
  )
}, {
  value: "10",
  label: i18n._(
    /*i18n*/
    {
      id: "dzQfDY"
    }
  )
}, {
  value: "11",
  label: i18n._(
    /*i18n*/
    {
      id: "t9QlBd"
    }
  )
}, {
  value: "12",
  label: i18n._(
    /*i18n*/
    {
      id: "r6zgGo"
    }
  )
}];
const DAY_NUMBER_MAP = {
  "sunday": 0,
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6
};
const frequencyUnitLabel = (frequency, interval) => {
  if (interval === 1) {
    switch (frequency) {
      case "daily":
        return i18n._(
          /*i18n*/
          {
            id: "/ITcnz"
          }
        );
      case "weekly":
        return i18n._(
          /*i18n*/
          {
            id: "64X6l4"
          }
        );
      case "monthly":
        return i18n._(
          /*i18n*/
          {
            id: "kY2ll9"
          }
        );
      case "yearly":
        return i18n._(
          /*i18n*/
          {
            id: "7qI8sJ"
          }
        );
      default:
        return "";
    }
  }
  switch (frequency) {
    case "daily":
      return i18n._(
        /*i18n*/
        {
          id: "J/Upwb"
        }
      );
    case "weekly":
      return i18n._(
        /*i18n*/
        {
          id: "IAUiSh"
        }
      );
    case "monthly":
      return i18n._(
        /*i18n*/
        {
          id: "6jefe3"
        }
      );
    case "yearly":
      return i18n._(
        /*i18n*/
        {
          id: "+BGee5"
        }
      );
    default:
      return "";
  }
};
const getNthWeekdayOfMonth = (year, month, dayOfWeek, position) => {
  if (position === -1) {
    const lastDay = new Date(year, month + 1, 0);
    for (let d = lastDay.getDate(); d >= 1; d--) {
      const candidate = new Date(year, month, d);
      if (candidate.getDay() === dayOfWeek) return candidate;
    }
    return null;
  }
  let count = 0;
  for (let d = 1; d <= 31; d++) {
    const candidate = new Date(year, month, d);
    if (candidate.getMonth() !== month) break;
    if (candidate.getDay() === dayOfWeek) {
      count++;
      if (count === position) return candidate;
    }
  }
  return null;
};
const parseLocalDate = (value) => {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};
const computePreviewDates = (values) => {
  const dates = [];
  const today = parseLocalDate(values.range_start) ?? /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = values.range_type === "until" && values.range_until ? /* @__PURE__ */ new Date(values.range_until + "T23:59:59") : null;
  const maxCount = values.range_type === "count" ? Math.min(values.range_count || 1, MAX_PREVIEW) : MAX_PREVIEW;
  if (values.range_type === "until" && !endDate) return dates;
  const addCandidate = (date) => {
    if (endDate && date > endDate) return false;
    if (dates.length >= maxCount) return false;
    dates.push(new Date(date));
    return true;
  };
  switch (values.frequency) {
    case "daily": {
      const current = new Date(today);
      let safety = 0;
      while (dates.length < maxCount && safety < MAX_PREVIEW + 100) {
        if (!addCandidate(current)) break;
        current.setDate(current.getDate() + (values.interval || 1));
        safety++;
      }
      break;
    }
    case "weekly": {
      const selectedDays = values.days_of_week.map((d) => DAY_NUMBER_MAP[d]).filter((d) => d !== void 0).sort((a, b) => a - b);
      if (selectedDays.length === 0) break;
      const weekStart = new Date(today);
      const todayDay = weekStart.getDay();
      const diff = todayDay === 0 ? -6 : 1 - todayDay;
      weekStart.setDate(weekStart.getDate() + diff);
      let safety = 0;
      outer: while (dates.length < maxCount && safety < MAX_PREVIEW + 100) {
        for (const dayNum of selectedDays) {
          const candidate = new Date(weekStart);
          const offset = dayNum === 0 ? 6 : dayNum - 1;
          candidate.setDate(weekStart.getDate() + offset);
          if (candidate >= today) {
            if (!addCandidate(candidate)) break outer;
          }
        }
        weekStart.setDate(weekStart.getDate() + 7 * (values.interval || 1));
        safety++;
      }
      break;
    }
    case "monthly": {
      if (values.monthly_pattern === "by_day_of_month") {
        const days = values.days_of_month.map((d) => parseInt(d)).filter((n) => !isNaN(n)).sort((a, b) => a - b);
        if (days.length === 0) break;
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        let safety = 0;
        outer2: while (dates.length < maxCount && safety < MAX_PREVIEW + 100) {
          for (const day of days) {
            const candidate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            if (candidate.getMonth() !== currentMonth.getMonth()) continue;
            if (candidate >= today) {
              if (!addCandidate(candidate)) break outer2;
            }
          }
          currentMonth.setMonth(currentMonth.getMonth() + (values.interval || 1));
          safety++;
        }
      } else {
        const targetDay = DAY_NUMBER_MAP[values.day_of_week] ?? 1;
        const position = parseInt(values.week_position) || 1;
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        let safety = 0;
        while (dates.length < maxCount && safety < MAX_PREVIEW + 100) {
          const candidate = getNthWeekdayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth(), targetDay, position);
          if (candidate && candidate >= today) {
            if (!addCandidate(candidate)) break;
          }
          currentMonth.setMonth(currentMonth.getMonth() + (values.interval || 1));
          safety++;
        }
      }
      break;
    }
    case "yearly": {
      const month = parseInt(values.yearly_month) - 1;
      const day = values.yearly_day;
      let year = today.getFullYear();
      let safety = 0;
      while (dates.length < maxCount && safety < MAX_PREVIEW + 100) {
        const candidate = new Date(year, month, day);
        if (candidate.getMonth() === month && candidate >= today) {
          if (!addCandidate(candidate)) break;
        }
        if (endDate && candidate > endDate) break;
        year += values.interval || 1;
        safety++;
      }
      break;
    }
  }
  return dates;
};
const computeEndTime = (startTime, durationMinutes) => {
  if (!startTime || !durationMinutes) return "";
  const [h, m] = startTime.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return "";
  const totalMinutes = h * 60 + m + durationMinutes;
  const endH = Math.floor(totalMinutes / 60) % 24;
  const endM = totalMinutes % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
};
const computeDurationFromTimes = (startTime, endTime) => {
  if (!startTime || !endTime) return null;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return null;
  let diff = eh * 60 + em - (sh * 60 + sm);
  if (diff <= 0) diff += 24 * 60;
  return diff;
};
const slotWrapsMidnight = (slot) => {
  if (!slot.time || !slot.end_time) return false;
  const [sh, sm] = slot.time.split(":").map(Number);
  const [eh, em] = slot.end_time.split(":").map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return false;
  return eh * 60 + em - (sh * 60 + sm) <= 0;
};
const formatShortDate = (date) => {
  return date.toLocaleDateString(void 0, {
    day: "numeric",
    month: "short"
  });
};
const formatLocalDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
const todayLocalDate = () => formatLocalDate(/* @__PURE__ */ new Date());
const IntervalStepper = ({
  value,
  onChange
}) => /* @__PURE__ */ jsxs("div", { className: classes$3.stepper, children: [
  /* @__PURE__ */ jsx("button", { type: "button", "aria-label": i18n._(
    /*i18n*/
    {
      id: "WGD1Al"
    }
  ), disabled: (value || 1) <= 1, onClick: () => onChange(Math.max(1, (value || 1) - 1)), children: "−" }),
  /* @__PURE__ */ jsx("span", { children: value || 1 }),
  /* @__PURE__ */ jsx("button", { type: "button", "aria-label": i18n._(
    /*i18n*/
    {
      id: "pxFAp/"
    }
  ), onClick: () => onChange((value || 1) + 1), children: "+" })
] });
const DayDots = ({
  selected: selected2,
  onToggle
}) => /* @__PURE__ */ jsx("div", { className: classes$3.dayDots, children: DAYS_OF_WEEK.map((day) => {
  const isSelected = selected2.includes(day.value);
  return /* @__PURE__ */ jsx("button", { type: "button", role: "checkbox", "aria-checked": isSelected, "aria-label": day.full, className: classNames(classes$3.dayDot, isSelected && classes$3.selected), onClick: () => onToggle(day.value), children: /* @__PURE__ */ jsx("span", { children: day.label }) }, day.value);
}) });
const MonthDayGrid = ({
  selected: selected2,
  onToggle
}) => /* @__PURE__ */ jsx("div", { className: classes$3.monthGrid, children: Array.from({
  length: 31
}, (_, i) => String(i + 1)).map((day) => {
  const isSelected = selected2.includes(day);
  return /* @__PURE__ */ jsx("button", { type: "button", role: "checkbox", "aria-checked": isSelected, "aria-label": day, className: classNames(classes$3.monthCell, isSelected && classes$3.selected), onClick: () => onToggle(day), children: day }, day);
}) });
const monthIndexOf = (date) => date.getFullYear() * 12 + date.getMonth();
const MiniCalendar = ({
  previewDates,
  rangeStart
}) => {
  const [viewMonth, setViewMonth] = useState(null);
  const firstMonth = monthIndexOf(previewDates[0]);
  const lastMonth = monthIndexOf(previewDates[previewDates.length - 1]);
  useEffect(() => {
    setViewMonth((current) => current === null || current < firstMonth || current > lastMonth ? firstMonth : current);
  }, [firstMonth, lastMonth]);
  const month = viewMonth === null || viewMonth < firstMonth || viewMonth > lastMonth ? firstMonth : viewMonth;
  const year = Math.floor(month / 12);
  const monthOfYear = month % 12;
  const occurrenceKeys = useMemo(() => new Set(previewDates.map(formatLocalDate)), [previewDates]);
  const startDate = parseLocalDate(rangeStart);
  const firstOfMonth = new Date(year, monthOfYear, 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - (gridStart.getDay() + 6) % 7);
  const cells = Array.from({
    length: 42
  }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return date;
  });
  return /* @__PURE__ */ jsxs("div", { className: classes$3.calendarCard, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$3.calendarHeader, children: [
      /* @__PURE__ */ jsx("button", { type: "button", "aria-label": i18n._(
        /*i18n*/
        {
          id: "1xwZj/"
        }
      ), disabled: month <= firstMonth, onClick: () => setViewMonth(month - 1), children: /* @__PURE__ */ jsx(IconChevronLeft, { size: 14 }) }),
      /* @__PURE__ */ jsx("span", { children: firstOfMonth.toLocaleDateString(void 0, {
        month: "long",
        year: "numeric"
      }) }),
      /* @__PURE__ */ jsx("button", { type: "button", "aria-label": i18n._(
        /*i18n*/
        {
          id: "g8JmSC"
        }
      ), disabled: month >= lastMonth, onClick: () => setViewMonth(month + 1), children: /* @__PURE__ */ jsx(IconChevronRight, { size: 14 }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes$3.calendarWeekdays, children: DAYS_OF_WEEK.map((day) => /* @__PURE__ */ jsx("span", { children: day.label }, day.value)) }),
    /* @__PURE__ */ jsx("div", { className: classes$3.calendarGrid, children: cells.map((date, i) => {
      const outside2 = date.getMonth() !== monthOfYear || startDate !== null && date < startDate;
      const isOccurrence = occurrenceKeys.has(formatLocalDate(date));
      return /* @__PURE__ */ jsx("span", { className: classNames(classes$3.calendarCell, outside2 && classes$3.outside, isOccurrence && classes$3.occurrence), children: date.getDate() }, i);
    }) })
  ] });
};
const RecurrenceScheduleDrawer = ({
  onClose,
  onGenerationStarted
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const generateMutation = useGenerateOccurrences();
  const queryClient = useQueryClient();
  const errorHandler = useFormErrorResponseHandler();
  const headingId = useId();
  const formId = useId();
  const hasExistingRule = !!(event == null ? void 0 : event.recurrence_rule);
  const parseTimeSlotsFromRule = (rule) => {
    const times = rule.times_of_day;
    const fallbackDuration = rule.duration_minutes || 120;
    if (!(times == null ? void 0 : times.length)) {
      return [{
        time: "09:00",
        end_time: computeEndTime("09:00", fallbackDuration),
        label: ""
      }];
    }
    return times.map((entry) => {
      if (typeof entry === "string") {
        return {
          time: entry,
          end_time: computeEndTime(entry, fallbackDuration),
          label: ""
        };
      }
      const duration = entry.duration_minutes || fallbackDuration;
      return {
        time: entry.time,
        end_time: computeEndTime(entry.time, duration),
        label: entry.label || ""
      };
    });
  };
  const form = useForm({
    initialValues: {
      frequency: "weekly",
      interval: 1,
      days_of_week: [],
      time_slots: [{
        time: "09:00",
        end_time: "11:00",
        label: ""
      }],
      range_start: todayLocalDate(),
      range_type: "until",
      range_until: "",
      range_count: 10,
      default_capacity: void 0,
      monthly_pattern: "by_day_of_month",
      days_of_month: ["1"],
      day_of_week: "monday",
      week_position: "1",
      yearly_month: String((/* @__PURE__ */ new Date()).getMonth() + 1),
      yearly_day: 1
    },
    validate: {
      days_of_week: (value, values) => values.frequency === "weekly" && value.length === 0 ? i18n._(
        /*i18n*/
        {
          id: "35C8QZ"
        }
      ) : null,
      range_until: (value, values) => values.range_type === "until" && !value ? i18n._(
        /*i18n*/
        {
          id: "tSR/oe"
        }
      ) : null,
      time_slots: (value) => value.every((s) => !s.time.trim()) ? i18n._(
        /*i18n*/
        {
          id: "0XCduh"
        }
      ) : null,
      days_of_month: (value, values) => values.frequency === "monthly" && values.monthly_pattern === "by_day_of_month" && value.length === 0 ? i18n._(
        /*i18n*/
        {
          id: "e8kzpp"
        }
      ) : null
    }
  });
  useEffect(() => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (event == null ? void 0 : event.recurrence_rule) {
      const rule = event.recurrence_rule;
      const earliestOccurrence = ((_a = event.occurrences) == null ? void 0 : _a.length) ? event.occurrences.map((o) => o.start_date).filter((d) => !!d).sort()[0] : void 0;
      const startFromRule = (_b = rule.range) == null ? void 0 : _b.start;
      const fallbackStart = earliestOccurrence ? earliestOccurrence.slice(0, 10) : todayLocalDate();
      form.setValues({
        frequency: rule.frequency || "weekly",
        interval: rule.interval || 1,
        days_of_week: rule.days_of_week || [],
        time_slots: parseTimeSlotsFromRule(rule),
        range_start: startFromRule ? startFromRule.slice(0, 10) : fallbackStart,
        range_type: ((_c = rule.range) == null ? void 0 : _c.type) || "until",
        range_until: ((_d = rule.range) == null ? void 0 : _d.until) || "",
        range_count: ((_e = rule.range) == null ? void 0 : _e.count) || 10,
        default_capacity: rule.default_capacity ?? void 0,
        monthly_pattern: rule.monthly_pattern || "by_day_of_month",
        days_of_month: ((_f = rule.days_of_month) == null ? void 0 : _f.map(String)) || ["1"],
        day_of_week: rule.day_of_week || "monday",
        week_position: String(rule.week_position || 1),
        yearly_month: String(rule.month || (/* @__PURE__ */ new Date()).getMonth() + 1),
        yearly_day: ((_g = rule.days_of_month) == null ? void 0 : _g[0]) || 1
      });
      form.resetDirty();
    }
  }, [event]);
  const toggleDayOfWeek = (value) => {
    const current = form.values.days_of_week;
    form.setFieldValue("days_of_week", current.includes(value) ? current.filter((d) => d !== value) : [...current, value]);
  };
  const toggleDayOfMonth = (value) => {
    const current = form.values.days_of_month;
    form.setFieldValue("days_of_month", current.includes(value) ? current.filter((d) => d !== value) : [...current, value]);
  };
  const handleAddTime = () => {
    const lastSlot = form.values.time_slots[form.values.time_slots.length - 1];
    const defaultStart = (lastSlot == null ? void 0 : lastSlot.end_time) || "09:00";
    const defaultEnd = computeEndTime(defaultStart, 120);
    form.setFieldValue("time_slots", [...form.values.time_slots, {
      time: defaultStart,
      end_time: defaultEnd,
      label: ""
    }]);
  };
  const handleRemoveTime = (index) => {
    const updated = form.values.time_slots.filter((_, i) => i !== index);
    form.setFieldValue("time_slots", updated.length > 0 ? updated : [{
      time: "",
      end_time: "",
      label: ""
    }]);
  };
  const handleSlotChange = (index, field, value) => {
    const updated = [...form.values.time_slots];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    form.setFieldValue("time_slots", updated);
  };
  const previewDates = useMemo(() => computePreviewDates(form.values), [form.values.frequency, form.values.interval, form.values.days_of_week, form.values.range_start, form.values.range_type, form.values.range_until, form.values.range_count, form.values.monthly_pattern, form.values.days_of_month, form.values.day_of_week, form.values.week_position, form.values.yearly_month, form.values.yearly_day]);
  const validTimes = form.values.time_slots.filter((s) => s.time.trim() !== "");
  const totalOccurrences = previewDates.length * Math.max(validTimes.length, 1);
  const exceedsLimit = totalOccurrences > MAX_PREVIEW;
  const handleSubmit = (values) => {
    const filteredSlots = values.time_slots.filter((s) => s.time.trim() !== "");
    const timesOfDay = filteredSlots.length > 0 ? filteredSlots.map((s) => {
      const duration = computeDurationFromTimes(s.time, s.end_time);
      return {
        time: s.time,
        ...s.label ? {
          label: s.label
        } : {},
        ...duration ? {
          duration_minutes: duration
        } : {}
      };
    }) : [{
      time: "09:00"
    }];
    const range = values.range_type === "until" ? {
      type: "until",
      until: values.range_until
    } : {
      type: "count",
      count: values.range_count
    };
    if (values.range_start) {
      range.start = values.range_start;
    }
    const existingRule = event == null ? void 0 : event.recurrence_rule;
    const preservedMetadata = {};
    if ((existingRule == null ? void 0 : existingRule.excluded_occurrences) && existingRule.excluded_occurrences.length > 0) {
      preservedMetadata.excluded_occurrences = existingRule.excluded_occurrences;
    }
    if ((existingRule == null ? void 0 : existingRule.excluded_dates) && existingRule.excluded_dates.length > 0) {
      preservedMetadata.excluded_dates = existingRule.excluded_dates;
    }
    if ((existingRule == null ? void 0 : existingRule.additional_dates) && existingRule.additional_dates.length > 0) {
      preservedMetadata.additional_dates = existingRule.additional_dates;
    }
    const rule = {
      frequency: values.frequency,
      interval: values.interval,
      times_of_day: timesOfDay,
      range,
      default_capacity: values.default_capacity ?? null,
      ...preservedMetadata
    };
    if (values.frequency === "weekly") {
      rule.days_of_week = values.days_of_week;
    }
    if (values.frequency === "monthly") {
      rule.monthly_pattern = values.monthly_pattern;
      if (values.monthly_pattern === "by_day_of_month") {
        rule.days_of_month = values.days_of_month.map((d) => parseInt(d)).filter((n) => !isNaN(n));
      } else {
        rule.day_of_week = values.day_of_week;
        rule.week_position = parseInt(values.week_position);
      }
    }
    if (values.frequency === "yearly") {
      rule.month = parseInt(values.yearly_month);
      rule.days_of_month = [values.yearly_day];
    }
    generateMutation.mutate({
      eventId,
      data: {
        recurrence_rule: rule
      }
    }, {
      onSuccess: (response) => {
        if (response.status === "IN_PROGRESS" && response.job_uuid) {
          onGenerationStarted(response.job_uuid, totalOccurrences);
          onClose();
        } else if (response.status === "FINISHED") {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "j6NnBq"
            }
          ));
          queryClient.invalidateQueries({
            queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
          });
          queryClient.invalidateQueries({
            queryKey: [GET_EVENT_QUERY_KEY, eventId]
          });
          onClose();
        } else {
          showError(i18n._(
            /*i18n*/
            {
              id: "4yLYTb"
            }
          ));
        }
      },
      onError: (error) => {
        var _a, _b, _c, _d, _e;
        const errors = (_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors;
        if (((_c = error == null ? void 0 : error.response) == null ? void 0 : _c.status) === 422 && errors) {
          const firstError = Object.values(errors).flat()[0];
          showError(firstError || i18n._(
            /*i18n*/
            {
              id: "FJ9Yat"
            }
          ));
          errorHandler(form, error);
        } else {
          showError(((_e = (_d = error == null ? void 0 : error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.message) || i18n._(
            /*i18n*/
            {
              id: "fAoRRJ"
            }
          ));
        }
      }
    });
  };
  const handleClose = () => {
    if (!form.isDirty()) {
      onClose();
      return;
    }
    modals.openConfirmModal({
      title: i18n._(
        /*i18n*/
        {
          id: "0EcUWz"
        }
      ),
      children: /* @__PURE__ */ jsx(Text, { size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "5SgD0L"
        }
      ) }),
      labels: {
        confirm: i18n._(
          /*i18n*/
          {
            id: "bzSI52"
          }
        ),
        cancel: i18n._(
          /*i18n*/
          {
            id: "4OjqAQ"
          }
        )
      },
      confirmProps: {
        color: "red"
      },
      zIndex: 400,
      onConfirm: onClose
    });
  };
  const handleKeyDown = (keyboardEvent) => {
    var _a;
    if ((keyboardEvent.metaKey || keyboardEvent.ctrlKey) && keyboardEvent.key === "Enter") {
      keyboardEvent.preventDefault();
      (_a = document.getElementById(formId)) == null ? void 0 : _a.requestSubmit();
    }
  };
  const cadenceUnit = frequencyUnitLabel(form.values.frequency, form.values.interval);
  const cadenceSummary = form.values.interval === 1 ? i18n._(
    /*i18n*/
    {
      id: "XlRpgq",
      values: {
        cadenceUnit
      }
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "B2jjf8",
      values: {
        0: form.values.interval,
        cadenceUnit
      }
    }
  );
  const ruleSentence = useMemo(() => {
    var _a, _b, _c;
    if (previewDates.length === 0) return null;
    const values = form.values;
    let onPart = "";
    if (values.frequency === "weekly") {
      const dayList = DAYS_OF_WEEK.filter((day) => values.days_of_week.includes(day.value)).map((day) => day.label).join(", ");
      if (dayList) onPart = i18n._(
        /*i18n*/
        {
          id: "TH5A28",
          values: {
            dayList
          }
        }
      );
    } else if (values.frequency === "monthly") {
      if (values.monthly_pattern === "by_day_of_month") {
        const dayList = values.days_of_month.map(Number).filter((n) => !isNaN(n)).sort((a, b) => a - b).join(", ");
        if (dayList) onPart = i18n._(
          /*i18n*/
          {
            id: "TH5A28",
            values: {
              dayList
            }
          }
        );
      } else {
        const position = ((_a = WEEK_POSITIONS.find((p) => p.value === values.week_position)) == null ? void 0 : _a.label) ?? "";
        const day = ((_b = DAYS_OF_WEEK.find((d) => d.value === values.day_of_week)) == null ? void 0 : _b.full) ?? "";
        onPart = i18n._(
          /*i18n*/
          {
            id: "pPAGSK",
            values: {
              position,
              day
            }
          }
        );
      }
    } else if (values.frequency === "yearly") {
      const month = ((_c = MONTHS.find((m) => m.value === values.yearly_month)) == null ? void 0 : _c.label) ?? "";
      const day = values.yearly_day;
      onPart = i18n._(
        /*i18n*/
        {
          id: "qiMtVT",
          values: {
            month,
            day
          }
        }
      );
    }
    const times = validTimes.map((s) => s.end_time ? `${s.time}–${s.end_time}` : s.time).join(` ${i18n._(
      /*i18n*/
      {
        id: "HZFm5R"
      }
    )} `);
    const startDate = parseLocalDate(values.range_start) ?? /* @__PURE__ */ new Date();
    const start = formatShortDate(startDate);
    const range = values.range_type === "until" && values.range_until ? (() => {
      const end = formatShortDate(parseLocalDate(values.range_until));
      return i18n._(
        /*i18n*/
        {
          id: "1dv+MO",
          values: {
            start,
            end
          }
        }
      );
    })() : (() => {
      const count = values.range_count;
      return i18n._(
        /*i18n*/
        {
          id: "l82hjf",
          values: {
            start,
            count
          }
        }
      );
    })();
    return {
      bold: onPart ? `${cadenceSummary} ${onPart}` : cadenceSummary,
      rest: `, ${times}, ${range}.`
    };
  }, [form.values, previewDates.length, validTimes, cadenceSummary]);
  const dateCount = previewDates.length;
  const timesPerDay = validTimes.length;
  const max = MAX_PREVIEW;
  const countSubtitle2 = timesPerDay > 1 ? i18n._(
    /*i18n*/
    {
      id: "S9i0UC",
      values: {
        dateCount,
        timesPerDay
      }
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "JxwIlL"
    }
  );
  const ruleBox2 = ruleSentence && /* @__PURE__ */ jsx("div", { "aria-live": "polite", className: classNames(classes$3.ruleBox, exceedsLimit && classes$3.ruleBoxWarning), children: exceedsLimit ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(IconAlertTriangle, { size: 14 }),
    /* @__PURE__ */ jsx("span", { children: i18n._(
      /*i18n*/
      {
        id: "cIHkSd",
        values: {
          totalOccurrences,
          max
        }
      }
    ) })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: classes$3.ruleDot }),
    /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx("strong", { children: ruleSentence.bold }),
      ruleSentence.rest
    ] })
  ] }) });
  const countLine = /* @__PURE__ */ jsxs("div", { className: classes$3.countCard, children: [
    /* @__PURE__ */ jsx("span", { className: classNames(classes$3.countNumber, exceedsLimit && classes$3.countNumberWarning), children: totalOccurrences }),
    /* @__PURE__ */ jsx("span", { className: classes$3.countSubtitle, children: countSubtitle2 })
  ] });
  const emptyPreview = /* @__PURE__ */ jsxs("div", { className: classes$3.previewEmpty, children: [
    /* @__PURE__ */ jsx(IconSparkles, { size: 18 }),
    i18n._(
      /*i18n*/
      {
        id: "kJmAsd"
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(Drawer, { opened: true, onClose: handleClose, position: "right", size: 900, withCloseButton: false, closeOnClickOutside: false, overlayProps: {
    opacity: 0.55,
    blur: 3
  }, "aria-labelledby": headingId, classNames: {
    content: classes$3.content,
    body: classes$3.body
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$3.header, children: [
      /* @__PURE__ */ jsx("div", { className: classes$3.headerText, id: headingId, children: /* @__PURE__ */ jsx("h2", { className: classes$3.headerTitle, children: hasExistingRule ? i18n._(
        /*i18n*/
        {
          id: "pHm0k9"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "5pEFnq"
        }
      ) }) }),
      /* @__PURE__ */ jsxs("div", { className: classes$3.headerActions, children: [
        /* @__PURE__ */ jsx("span", { className: classes$3.escHint, children: i18n._(
          /*i18n*/
          {
            id: "BkEWfd"
          }
        ) }),
        /* @__PURE__ */ jsx(CloseButton, { "aria-label": i18n._(
          /*i18n*/
          {
            id: "yz7wBu"
          }
        ), onClick: handleClose, size: "lg", radius: "xl" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.main, onKeyDown: handleKeyDown, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$3.formColumn, "data-autofocus": true, tabIndex: -1, children: [
        /* @__PURE__ */ jsxs("form", { id: formId, onSubmit: form.onSubmit(handleSubmit), children: [
          /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$3.blockHeader, children: [
              /* @__PURE__ */ jsx("span", { className: classes$3.blockLabel, children: i18n._(
                /*i18n*/
                {
                  id: "RYlQY0"
                }
              ) }),
              /* @__PURE__ */ jsx(SegmentedControl, { size: "xs", value: form.values.frequency, onChange: (value) => form.setFieldValue("frequency", value), data: FREQUENCIES })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: classes$3.sentenceRow, children: [
              /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                /*i18n*/
                {
                  id: "CRsuq4"
                }
              ) }),
              /* @__PURE__ */ jsx(IntervalStepper, { value: form.values.interval, onChange: (value) => form.setFieldValue("interval", value) }),
              /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: cadenceUnit }),
              form.values.frequency === "weekly" && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                  /*i18n*/
                  {
                    id: "Fdp03t"
                  }
                ) }),
                /* @__PURE__ */ jsx(DayDots, { selected: form.values.days_of_week, onToggle: toggleDayOfWeek })
              ] }),
              form.values.frequency === "monthly" && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                  /*i18n*/
                  {
                    id: "Fdp03t"
                  }
                ) }),
                /* @__PURE__ */ jsx(SegmentedControl, { size: "xs", value: form.values.monthly_pattern, onChange: (value) => form.setFieldValue("monthly_pattern", value), data: [{
                  label: i18n._(
                    /*i18n*/
                    {
                      id: "V3VGYb"
                    }
                  ),
                  value: "by_day_of_month"
                }, {
                  label: i18n._(
                    /*i18n*/
                    {
                      id: "RpjXTb"
                    }
                  ),
                  value: "by_day_of_week"
                }] })
              ] }),
              form.values.frequency === "yearly" && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                  /*i18n*/
                  {
                    id: "Fdp03t"
                  }
                ) }),
                /* @__PURE__ */ jsx(Select, { "aria-label": i18n._(
                  /*i18n*/
                  {
                    id: "HajiZl"
                  }
                ), data: MONTHS, className: classes$3.inlineSelect, ...form.getInputProps("yearly_month") }),
                /* @__PURE__ */ jsx(NumberInput, { "aria-label": i18n._(
                  /*i18n*/
                  {
                    id: "JtHrX9"
                  }
                ), min: 1, max: 31, hideControls: true, className: classes$3.inlineDayInput, ...form.getInputProps("yearly_day") })
              ] })
            ] }),
            form.values.frequency === "weekly" && form.errors.days_of_week && /* @__PURE__ */ jsx(Text, { c: "red", size: "xs", mt: 6, children: form.errors.days_of_week }),
            form.values.frequency === "monthly" && form.values.monthly_pattern === "by_day_of_month" && /* @__PURE__ */ jsxs("div", { className: classes$3.patternContent, children: [
              /* @__PURE__ */ jsx(MonthDayGrid, { selected: form.values.days_of_month, onToggle: toggleDayOfMonth }),
              form.errors.days_of_month ? /* @__PURE__ */ jsx(Text, { c: "red", size: "xs", mt: 6, children: form.errors.days_of_month }) : /* @__PURE__ */ jsx("p", { className: classes$3.fieldHint, children: i18n._(
                /*i18n*/
                {
                  id: "hCR98w"
                }
              ) })
            ] }),
            form.values.frequency === "monthly" && form.values.monthly_pattern === "by_day_of_week" && /* @__PURE__ */ jsxs("div", { className: classNames(classes$3.patternContent, classes$3.sentenceRow), children: [
              /* @__PURE__ */ jsx(Select, { "aria-label": i18n._(
                /*i18n*/
                {
                  id: "p/78dY"
                }
              ), data: WEEK_POSITIONS, className: classes$3.inlineSelect, ...form.getInputProps("week_position") }),
              /* @__PURE__ */ jsx(Select, { "aria-label": i18n._(
                /*i18n*/
                {
                  id: "H7OUPr"
                }
              ), data: DAYS_OF_WEEK.map((day) => ({
                value: day.value,
                label: day.full
              })), className: classes$3.inlineSelect, ...form.getInputProps("day_of_week") }),
              /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                /*i18n*/
                {
                  id: "GQnX9d"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$3.blockHeader, children: [
              /* @__PURE__ */ jsx("span", { className: classes$3.blockLabel, children: i18n._(
                /*i18n*/
                {
                  id: "kGEhUy"
                }
              ) }),
              /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "compact-sm", leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 14 }), onClick: handleAddTime, children: i18n._(
                /*i18n*/
                {
                  id: "CjvTPJ"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Stack, { gap: "sm", children: form.values.time_slots.map((slot, index) => /* @__PURE__ */ jsxs("div", { className: classes$3.timeSlot, children: [
              /* @__PURE__ */ jsx(TextInput, { "aria-label": i18n._(
                /*i18n*/
                {
                  id: "xAYSEs"
                }
              ), type: "time", value: slot.time, onChange: (e) => handleSlotChange(index, "time", e.currentTarget.value), placeholder: "09:00", className: classes$3.slotStart, classNames: {
                input: classes$3.timeInput
              } }),
              /* @__PURE__ */ jsx("span", { className: classNames(classes$3.timeSeparator, classes$3.slotSep), children: i18n._(
                /*i18n*/
                {
                  id: "dMtLDE"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: classNames(classes$3.endTimeWrap, classes$3.slotEnd), children: [
                /* @__PURE__ */ jsx(TextInput, { "aria-label": i18n._(
                  /*i18n*/
                  {
                    id: "vTL8gi"
                  }
                ), type: "time", value: slot.end_time, onChange: (e) => handleSlotChange(index, "end_time", e.currentTarget.value), placeholder: "11:00", classNames: {
                  input: classes$3.timeInput
                } }),
                slotWrapsMidnight(slot) && /* @__PURE__ */ jsx("span", { className: classes$3.plusDayPill, children: i18n._(
                  /*i18n*/
                  {
                    id: "JwzOqN"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx(TextInput, { "aria-label": i18n._(
                /*i18n*/
                {
                  id: "87a/t/"
                }
              ), value: slot.label, onChange: (e) => handleSlotChange(index, "label", e.currentTarget.value), placeholder: i18n._(
                /*i18n*/
                {
                  id: "C/pOUI"
                }
              ), className: classes$3.slotLabel }),
              form.values.time_slots.length > 1 ? /* @__PURE__ */ jsx(ActionIcon, { "aria-label": i18n._(
                /*i18n*/
                {
                  id: "5Vkr/a"
                }
              ), className: classes$3.slotRemove, variant: "subtle", color: "gray", onClick: () => handleRemoveTime(index), children: /* @__PURE__ */ jsx(IconX, { size: 16 }) }) : /* @__PURE__ */ jsx("span", { className: classes$3.slotRemove })
            ] }, index)) }),
            form.errors.time_slots && /* @__PURE__ */ jsx(Text, { c: "red", size: "xs", mt: 6, children: form.errors.time_slots }),
            /* @__PURE__ */ jsx("p", { className: classes$3.fieldHint, children: i18n._(
              /*i18n*/
              {
                id: "GCQlV2"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$3.blockHeader, children: [
              /* @__PURE__ */ jsx("span", { className: classes$3.blockLabel, children: i18n._(
                /*i18n*/
                {
                  id: "Tpm2G9"
                }
              ) }),
              /* @__PURE__ */ jsx(SegmentedControl, { size: "xs", value: form.values.range_type, onChange: (value) => form.setFieldValue("range_type", value), data: [{
                label: i18n._(
                  /*i18n*/
                  {
                    id: "porwAO"
                  }
                ),
                value: "until"
              }, {
                label: i18n._(
                  /*i18n*/
                  {
                    id: "NTzcRQ"
                  }
                ),
                value: "count"
              }] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: classes$3.sentenceRow, children: [
              /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                /*i18n*/
                {
                  id: "ejVYRQ"
                }
              ) }),
              /* @__PURE__ */ jsx(TextInput, { type: "date", "aria-label": i18n._(
                /*i18n*/
                {
                  id: "Fz09JP"
                }
              ), className: classes$3.inlineDateInput, ...form.getInputProps("range_start") }),
              form.values.range_type === "until" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                  /*i18n*/
                  {
                    id: "C51N+0"
                  }
                ) }),
                /* @__PURE__ */ jsx(TextInput, { type: "date", "aria-label": i18n._(
                  /*i18n*/
                  {
                    id: "YP7frt"
                  }
                ), className: classes$3.inlineDateInput, ...form.getInputProps("range_until") })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                  /*i18n*/
                  {
                    id: "sQv06Y"
                  }
                ) }),
                /* @__PURE__ */ jsx(NumberInput, { "aria-label": i18n._(
                  /*i18n*/
                  {
                    id: "kAREMN"
                  }
                ), min: 1, max: 1200, className: classes$3.inlineCountInput, ...form.getInputProps("range_count") }),
                /* @__PURE__ */ jsx("span", { className: classes$3.sentenceWord, children: i18n._(
                  /*i18n*/
                  {
                    id: "JxwIlL"
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: classes$3.fieldHint, children: i18n._(
              /*i18n*/
              {
                id: "GGFOZD"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes$3.block, children: [
            /* @__PURE__ */ jsxs("div", { className: classes$3.blockHeader, children: [
              /* @__PURE__ */ jsx("span", { className: classes$3.blockLabel, children: i18n._(
                /*i18n*/
                {
                  id: "QyjCeq"
                }
              ) }),
              /* @__PURE__ */ jsx(NumberInput, { "aria-label": i18n._(
                /*i18n*/
                {
                  id: "ULjv90"
                }
              ), placeholder: i18n._(
                /*i18n*/
                {
                  id: "NIuIk1"
                }
              ), min: 0, allowNegative: false, className: classes$3.capacityInput, ...form.getInputProps("default_capacity") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: classes$3.fieldHint, children: i18n._(
              /*i18n*/
              {
                id: "rj3A7+"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes$3.previewBelowForm, children: previewDates.length === 0 ? emptyPreview : /* @__PURE__ */ jsxs(Fragment, { children: [
          countLine,
          ruleBox2
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: classes$3.previewColumn, children: [
        /* @__PURE__ */ jsx("div", { className: classes$3.previewEyebrow, children: i18n._(
          /*i18n*/
          {
            id: "/rTL/5"
          }
        ) }),
        previewDates.length === 0 ? emptyPreview : /* @__PURE__ */ jsxs(Fragment, { children: [
          countLine,
          /* @__PURE__ */ jsx(MiniCalendar, { previewDates, rangeStart: form.values.range_start }),
          ruleBox2,
          /* @__PURE__ */ jsx("p", { className: classes$3.previewFootnote, children: i18n._(
            /*i18n*/
            {
              id: "83tNam"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$3.footer, children: [
      /* @__PURE__ */ jsx("span", { className: classes$3.footerHint, children: hasExistingRule ? i18n._(
        /*i18n*/
        {
          id: "lE8PgT"
        }
      ) : totalOccurrences > 0 ? i18n._(
        /*i18n*/
        {
          id: "4HaEdK",
          values: {
            totalOccurrences
          }
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "69GWRq"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: classes$3.footerActions, children: [
        /* @__PURE__ */ jsx(Button, { variant: "default", onClick: handleClose, children: i18n._(
          /*i18n*/
          {
            id: "dEgA5A"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", form: formId, loading: generateMutation.isPending, disabled: exceedsLimit, children: hasExistingRule ? i18n._(
          /*i18n*/
          {
            id: "x1fMXJ"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "utHSNE"
          }
        ) })
      ] })
    ] })
  ] });
};
const tableWrapper = "_tableWrapper_eb3nm_1";
const card = "_card_eb3nm_7";
const table = "_table_eb3nm_1";
const tableHead = "_tableHead_eb3nm_29";
const stickyRight = "_stickyRight_eb3nm_38";
const dateHeaderRow = "_dateHeaderRow_eb3nm_49";
const dateHeaderContent = "_dateHeaderContent_eb3nm_55";
const dateHeaderLabel = "_dateHeaderLabel_eb3nm_61";
const dateHeaderBadge = "_dateHeaderBadge_eb3nm_67";
const dateHeaderCheckbox = "_dateHeaderCheckbox_eb3nm_73";
const rowCheckbox = "_rowCheckbox_eb3nm_77";
const classes$2 = {
  tableWrapper,
  card,
  table,
  tableHead,
  stickyRight,
  dateHeaderRow,
  dateHeaderContent,
  dateHeaderLabel,
  dateHeaderBadge,
  dateHeaderCheckbox,
  rowCheckbox
};
dayjs.extend(utc);
dayjs.extend(timezone);
const formatDateHeader = (dateKey, eventTimezone) => {
  const date = dayjs(dateKey);
  const todayKey = dayjs().tz(eventTimezone).format("YYYY-MM-DD");
  const tomorrowKey = dayjs().tz(eventTimezone).add(1, "day").format("YYYY-MM-DD");
  if (dateKey === todayKey) {
    return i18n._(
      /*i18n*/
      {
        id: "ecUA8p"
      }
    ) + " — " + date.format("dddd, MMMM D, YYYY");
  }
  if (dateKey === tomorrowKey) {
    return i18n._(
      /*i18n*/
      {
        id: "BRMXj0"
      }
    ) + " — " + date.format("dddd, MMMM D, YYYY");
  }
  return date.format("dddd, MMMM D, YYYY");
};
const GroupedOccurrenceTable = ({
  occurrences,
  columns,
  eventTimezone,
  selectedIds,
  onSelectionChange,
  rowStyle
}) => {
  const groups = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    occurrences.forEach((occ) => {
      const dateKey = dayjs.utc(occ.start_date).tz(eventTimezone).format("YYYY-MM-DD");
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey).push(occ);
    });
    return Array.from(map.entries()).map(([dateKey, occs]) => ({
      dateKey,
      label: formatDateHeader(dateKey, eventTimezone),
      occurrences: occs
    }));
  }, [occurrences, eventTimezone]);
  const allIds = useMemo(() => occurrences.map((o) => o.id), [occurrences]);
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
  const someSelected = allIds.some((id) => selectedIds.has(id)) && !allSelected;
  const toggleAll = useCallback(() => {
    if (allSelected) {
      onSelectionChange(/* @__PURE__ */ new Set());
    } else {
      onSelectionChange(new Set(allIds));
    }
  }, [allSelected, allIds, onSelectionChange]);
  const toggleGroup = useCallback((groupOccs) => {
    const groupIds = groupOccs.map((o) => o.id);
    const allGroupSelected = groupIds.every((id) => selectedIds.has(id));
    const next = new Set(selectedIds);
    if (allGroupSelected) {
      groupIds.forEach((id) => next.delete(id));
    } else {
      groupIds.forEach((id) => next.add(id));
    }
    onSelectionChange(next);
  }, [selectedIds, onSelectionChange]);
  const toggleRow = useCallback((id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectionChange(next);
  }, [selectedIds, onSelectionChange]);
  const totalColumns = columns.length + 1;
  return /* @__PURE__ */ jsx("div", { className: classes$2.tableWrapper, children: /* @__PURE__ */ jsx(Card, { className: classes$2.card, children: /* @__PURE__ */ jsx(Table.ScrollContainer, { minWidth: 200, scrollAreaProps: {
    type: "hover"
  }, children: /* @__PURE__ */ jsxs(Table, { className: classes$2.table, children: [
    /* @__PURE__ */ jsx(Table.Thead, { className: classes$2.tableHead, children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
      /* @__PURE__ */ jsx(Table.Th, { style: {
        width: 40,
        paddingLeft: 20
      }, children: /* @__PURE__ */ jsx(Checkbox, { size: "xs", checked: allSelected, indeterminate: someSelected, onChange: toggleAll, "aria-label": i18n._(
        /*i18n*/
        {
          id: "wgNoIs"
        }
      ) }) }),
      columns.map((col) => /* @__PURE__ */ jsx(Table.Th, { className: col.sticky === "right" ? classes$2.stickyRight : void 0, style: col.headerStyle, children: col.header }, col.id))
    ] }) }),
    /* @__PURE__ */ jsx(Table.Tbody, { children: groups.map((group) => {
      const groupIds = group.occurrences.map((o) => o.id);
      const allGroupSelected = groupIds.every((id) => selectedIds.has(id));
      const someGroupSelected = groupIds.some((id) => selectedIds.has(id)) && !allGroupSelected;
      return [/* @__PURE__ */ jsx(Table.Tr, { className: classes$2.dateHeaderRow, children: /* @__PURE__ */ jsx(Table.Td, { colSpan: totalColumns, children: /* @__PURE__ */ jsxs("div", { className: classes$2.dateHeaderContent, children: [
        /* @__PURE__ */ jsx(Checkbox, { size: "xs", className: classes$2.dateHeaderCheckbox, checked: allGroupSelected, indeterminate: someGroupSelected, onChange: () => toggleGroup(group.occurrences), "aria-label": i18n._(
          /*i18n*/
          {
            id: "aCEysm",
            values: {
              0: group.label
            }
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: classes$2.dateHeaderLabel, children: group.label }),
        group.occurrences.length > 1 && /* @__PURE__ */ jsx("span", { className: classes$2.dateHeaderBadge, children: group.occurrences.length })
      ] }) }) }, `header-${group.dateKey}`), ...group.occurrences.map((occ) => /* @__PURE__ */ jsxs(Table.Tr, { style: rowStyle == null ? void 0 : rowStyle(occ), children: [
        /* @__PURE__ */ jsx(Table.Td, { style: {
          width: 40,
          paddingLeft: 20
        }, children: /* @__PURE__ */ jsx("div", { className: classes$2.rowCheckbox, children: /* @__PURE__ */ jsx(Checkbox, { size: "xs", checked: selectedIds.has(occ.id), onChange: () => toggleRow(occ.id), "aria-label": i18n._(
          /*i18n*/
          {
            id: "SJQM1I"
          }
        ) }) }) }),
        columns.map((col) => /* @__PURE__ */ jsx(Table.Td, { className: col.sticky === "right" ? classes$2.stickyRight : void 0, children: col.render(occ) }, col.id))
      ] }, occ.id))];
    }) })
  ] }) }) }) });
};
const openCancelOccurrenceDialog = ({
  eventId,
  occurrenceId,
  orderCount = 0,
  mutation,
  onSuccess
}) => {
  let refund = false;
  modals.openConfirmModal({
    title: i18n._(
      /*i18n*/
      {
        id: "Py78q9"
      }
    ),
    children: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", mb: "md", children: i18n._(
        /*i18n*/
        {
          id: "GTxE0U"
        }
      ) }),
      orderCount > 0 && /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, c: "red", mb: "md", children: i18n._(
        /*i18n*/
        {
          id: "o1phK/",
          values: {
            orderCount
          }
        }
      ) }),
      /* @__PURE__ */ jsx(Checkbox, { label: i18n._(
        /*i18n*/
        {
          id: "4cRUK3"
        }
      ), onChange: (e) => {
        refund = e.currentTarget.checked;
      } })
    ] }),
    labels: {
      confirm: i18n._(
        /*i18n*/
        {
          id: "Py78q9"
        }
      ),
      cancel: i18n._(
        /*i18n*/
        {
          id: "sr0UJD"
        }
      )
    },
    confirmProps: {
      color: "red"
    },
    onConfirm: () => {
      mutation.mutate({
        eventId,
        occurrenceId,
        refundOrders: refund
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "e6cAxJ"
            }
          ));
          onSuccess == null ? void 0 : onSuccess();
        },
        onError: (error) => {
          var _a, _b;
          return showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
            /*i18n*/
            {
              id: "PO0cfn"
            }
          ));
        }
      });
    }
  });
};
const useOccurrenceGenerationPolling = (eventId) => {
  var _a;
  const queryClient = useQueryClient();
  const [jobUuid, setJobUuid] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const handledRef = useRef(null);
  const query = useQuery({
    queryKey: ["occurrenceGenerationStatus", eventId, jobUuid],
    queryFn: () => eventOccurrenceClient.getGenerationStatus(eventId, jobUuid),
    enabled: !!jobUuid,
    refetchInterval: (query2) => {
      var _a2;
      const status2 = (_a2 = query2.state.data) == null ? void 0 : _a2.status;
      return status2 && status2 !== "IN_PROGRESS" ? false : 2e3;
    }
  });
  const status = (_a = query.data) == null ? void 0 : _a.status;
  useEffect(() => {
    if (!jobUuid || handledRef.current === jobUuid) {
      return;
    }
    if (status === "FINISHED") {
      handledRef.current = jobUuid;
      setJobUuid(null);
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "j6NnBq"
        }
      ));
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY, eventId == null ? void 0 : eventId.toString()]
      });
    } else if (status === "FAILED" || status === "NOT_FOUND") {
      handledRef.current = jobUuid;
      setJobUuid(null);
      showError(i18n._(
        /*i18n*/
        {
          id: "4yLYTb"
        }
      ));
    }
  }, [status, jobUuid]);
  const start = (newJobUuid, count) => {
    setTotalCount(count);
    setJobUuid(newJobUuid);
  };
  return {
    start,
    isGenerating: !!jobUuid,
    totalCount
  };
};
const container = "_container_b8j2u_2";
const header = "_header_b8j2u_6";
const occurrenceInfo = "_occurrenceInfo_b8j2u_13";
const dateTime = "_dateTime_b8j2u_18";
const titleSuffix = "_titleSuffix_b8j2u_24";
const location = "_location_b8j2u_30";
const locationIcon = "_locationIcon_b8j2u_39";
const locationText = "_locationText_b8j2u_44";
const locationVenue = "_locationVenue_b8j2u_48";
const statusBadge$1 = "_statusBadge_b8j2u_59";
const statsGrid = "_statsGrid_b8j2u_84";
const statCard = "_statCard_b8j2u_91";
const statValue = "_statValue_b8j2u_97";
const statLabel = "_statLabel_b8j2u_103";
const classes$1 = {
  container,
  header,
  occurrenceInfo,
  dateTime,
  titleSuffix,
  location,
  locationIcon,
  locationText,
  locationVenue,
  statusBadge: statusBadge$1,
  statsGrid,
  statCard,
  statValue,
  statLabel
};
const ManageOccurrenceModal = ({
  onClose,
  occurrenceId
}) => {
  var _a, _b, _c;
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const {
    data: occurrence2
  } = useGetEventOccurrence(eventId, occurrenceId);
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    launchCheckIn,
    checkInModals
  } = useOccurrenceCheckIn(eventId);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareOccurrence, setShowShareOccurrence] = useState();
  const cancelMutation = useCancelOccurrence();
  const deleteMutation = useDeleteEventOccurrence();
  const reactivateMutation = useReactivateOccurrence();
  const handleCancel = useCallback((occId) => {
    var _a2;
    openCancelOccurrenceDialog({
      eventId,
      occurrenceId: occId,
      orderCount: ((_a2 = occurrence2 == null ? void 0 : occurrence2.statistics) == null ? void 0 : _a2.orders_created) ?? 0,
      mutation: cancelMutation
    });
  }, [occurrence2, eventId, cancelMutation]);
  const handleDelete = useCallback((occId) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "h42Hc/"
      }
    ), () => {
      deleteMutation.mutate({
        eventId,
        occurrenceId: occId
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "IW7Q+u"
            }
          ));
          onClose();
        },
        onError: (error) => {
          var _a2, _b2;
          return showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "n1CYMH"
            }
          ));
        }
      });
    });
  }, [eventId, onClose]);
  const handleReactivate = useCallback((occ) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "TNclgc"
      }
    ), () => {
      reactivateMutation.mutate({
        eventId,
        occurrenceId: occ.id
      }, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "vHbfoQ"
          }
        )),
        onError: (error) => {
          var _a2, _b2;
          return showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "e5KIbI"
            }
          ));
        }
      });
    });
  }, [eventId]);
  const menuActions = useMemo(() => ({
    eventId,
    onEdit: () => setShowEditModal(true),
    onCancel: handleCancel,
    onDelete: handleDelete,
    onNavigate: (path) => {
      onClose();
      navigate(path);
    },
    onMessage: () => setShowMessageModal(true),
    onCheckIn: launchCheckIn,
    onReactivate: handleReactivate,
    onShare: (occ) => setShowShareOccurrence(occ)
  }), [eventId, launchCheckIn, handleCancel, handleDelete, handleReactivate, onClose, navigate]);
  if (!occurrence2 || !event) {
    return /* @__PURE__ */ jsx(SideDrawer, { opened: true, onClose, children: /* @__PURE__ */ jsxs(Stack, { p: "md", gap: "md", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 24, width: "70%" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 14, width: "40%" }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 70, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 70, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 70, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 70, radius: "md" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { height: 32, width: "100%" })
    ] }) });
  }
  const startFormatted = formatDateWithLocale(occurrence2.start_date, "fullDateTime", event.timezone);
  const endFormatted = occurrence2.end_date ? formatOccurrenceEnd(occurrence2.end_date, occurrence2.start_date, event.timezone) : null;
  const locationDisplay = getEventLocationDisplay(event, occurrence2);
  const usedCapacity = occurrence2.used_capacity ?? 0;
  const hasCapacityLimit = occurrence2.capacity != null;
  const soldLabel = hasCapacityLimit ? `${usedCapacity} / ${occurrence2.capacity}` : `${usedCapacity}`;
  const capacityPercent = hasCapacityLimit && occurrence2.capacity ? Math.min(100, Math.round(usedCapacity / occurrence2.capacity * 100)) : 0;
  return /* @__PURE__ */ jsxs(SideDrawer, { opened: true, onClose, children: [
    /* @__PURE__ */ jsxs(Stack, { className: classes$1.container, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.header, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$1.occurrenceInfo, children: [
          /* @__PURE__ */ jsxs(Text, { className: classes$1.dateTime, children: [
            startFormatted,
            endFormatted && /* @__PURE__ */ jsxs(Fragment, { children: [
              " — ",
              endFormatted
            ] })
          ] }),
          occurrence2.label && /* @__PURE__ */ jsx(Text, { className: classes$1.titleSuffix, children: occurrence2.label }),
          locationDisplay && /* @__PURE__ */ jsxs("div", { className: classes$1.location, children: [
            locationDisplay.isOnline ? /* @__PURE__ */ jsx(IconWorld, { size: 13, className: classes$1.locationIcon }) : /* @__PURE__ */ jsx(IconMapPin, { size: 13, className: classes$1.locationIcon }),
            locationDisplay.isOnline ? /* @__PURE__ */ jsx("span", { className: classes$1.locationText, children: i18n._(
              /*i18n*/
              {
                id: "z+nuVJ"
              }
            ) }) : locationDisplay.mapsUrl ? /* @__PURE__ */ jsxs(Anchor, { href: locationDisplay.mapsUrl, target: "_blank", rel: "noopener noreferrer", className: classes$1.locationText, onClick: (e) => e.stopPropagation(), children: [
              locationDisplay.venueName && /* @__PURE__ */ jsx("span", { className: classes$1.locationVenue, children: locationDisplay.venueName }),
              /* @__PURE__ */ jsx("span", { children: locationDisplay.full })
            ] }) : /* @__PURE__ */ jsx("span", { className: classes$1.locationText, children: locationDisplay.short })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes$1.statusBadge, "data-status": occurrence2.status, children: statusLabel(occurrence2.status) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.statsGrid, children: [
        /* @__PURE__ */ jsxs("div", { className: classes$1.statCard, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.statValue, children: ((_a = occurrence2.statistics) == null ? void 0 : _a.attendees_registered) ?? 0 }),
          /* @__PURE__ */ jsx("div", { className: classes$1.statLabel, children: i18n._(
            /*i18n*/
            {
              id: "9SZT4E"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes$1.statCard, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.statValue, children: ((_b = occurrence2.statistics) == null ? void 0 : _b.orders_created) ?? 0 }),
          /* @__PURE__ */ jsx("div", { className: classes$1.statLabel, children: i18n._(
            /*i18n*/
            {
              id: "1h+RBg"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes$1.statCard, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.statValue, children: formatCurrency(((_c = occurrence2.statistics) == null ? void 0 : _c.total_gross_sales) ?? 0, event.currency) }),
          /* @__PURE__ */ jsx("div", { className: classes$1.statLabel, children: i18n._(
            /*i18n*/
            {
              id: "yRg26W"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes$1.statCard, children: [
          /* @__PURE__ */ jsx("div", { className: classes$1.statValue, children: soldLabel }),
          /* @__PURE__ */ jsx("div", { className: classes$1.statLabel, children: i18n._(
            /*i18n*/
            {
              id: "s9KGXU"
            }
          ) }),
          hasCapacityLimit && /* @__PURE__ */ jsx(Progress, { value: capacityPercent, size: "sm", mt: 6, color: capacityPercent >= 90 ? "red" : capacityPercent >= 70 ? "orange" : "blue" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(OccurrenceActionBar, { occurrence: occurrence2, actions: menuActions }),
      /* @__PURE__ */ jsx(OccurrenceAttendeesAndOrders, { occurrenceId, onNavigateAway: onClose })
    ] }),
    showMessageModal && /* @__PURE__ */ jsx(SendMessageModal, { onClose: () => setShowMessageModal(false), messageType: MessageType.AllAttendees, eventOccurrenceId: occurrenceId }),
    showEditModal && /* @__PURE__ */ jsx(OccurrenceEditModal, { onClose: () => setShowEditModal(false), occurrenceId }),
    checkInModals,
    showShareOccurrence && /* @__PURE__ */ jsx(ShareModal, { opened: !!showShareOccurrence, onClose: () => setShowShareOccurrence(void 0), url: `${eventHomepageUrl(event)}?occurrence_id=${showShareOccurrence.id}`, title: event.title, shareText: `${event.title} — ${formatDateWithLocale(showShareOccurrence.start_date, "shortDateTime", event.timezone)}` })
  ] });
};
const toolbar = "_toolbar_4b5x1_1";
const toolbarDivider = "_toolbarDivider_4b5x1_13";
const toolbarSpacer = "_toolbarSpacer_4b5x1_20";
const selectionGroup = "_selectionGroup_4b5x1_24";
const selectionCount = "_selectionCount_4b5x1_30";
const selectionAction = "_selectionAction_4b5x1_37";
const dateTimeLink = "_dateTimeLink_4b5x1_61";
const dateTimePrimary = "_dateTimePrimary_4b5x1_69";
const dateTimeMeta = "_dateTimeMeta_4b5x1_83";
const dateTimeLocation = "_dateTimeLocation_4b5x1_89";
const statusBadge = "_statusBadge_4b5x1_99";
const editedIcon = "_editedIcon_4b5x1_130";
const ticketsSold = "_ticketsSold_4b5x1_137";
const ticketsSoldNumbers = "_ticketsSoldNumbers_4b5x1_144";
const ticketsSoldCount = "_ticketsSoldCount_4b5x1_149";
const ticketsSoldTotal = "_ticketsSoldTotal_4b5x1_154";
const ticketsProgress = "_ticketsProgress_4b5x1_158";
const activity = "_activity_4b5x1_167";
const activityText = "_activityText_4b5x1_173";
const activityRefunded = "_activityRefunded_4b5x1_179";
const action = "_action_4b5x1_184";
const emptyState = "_emptyState_4b5x1_190";
const contentArea = "_contentArea_4b5x1_196";
const generationBanner = "_generationBanner_4b5x1_200";
const countText = "_countText_4b5x1_211";
const classes = {
  toolbar,
  toolbarDivider,
  toolbarSpacer,
  selectionGroup,
  selectionCount,
  selectionAction,
  dateTimeLink,
  dateTimePrimary,
  dateTimeMeta,
  dateTimeLocation,
  statusBadge,
  editedIcon,
  ticketsSold,
  ticketsSoldNumbers,
  ticketsSoldCount,
  ticketsSoldTotal,
  ticketsProgress,
  activity,
  activityText,
  activityRefunded,
  action,
  emptyState,
  contentArea,
  generationBanner,
  countText
};
dayjs.extend(utc);
dayjs.extend(timezone);
const OccurrencesTab = () => {
  var _a, _b, _c;
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const location2 = useLocation();
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const viewMode = location2.pathname.endsWith("/calendar") ? "calendar" : "list";
  const handleViewModeChange = (val) => {
    const mode = val;
    const target = mode === "calendar" ? `/manage/event/${eventId}/occurrences/calendar` : `/manage/event/${eventId}/occurrences`;
    navigate(target);
  };
  const [selectedIds, setSelectedIds] = useState(/* @__PURE__ */ new Set());
  const [calendarMonth, setCalendarMonth] = useState(() => dayjs().startOf("month"));
  const timePeriod = useMemo(() => {
    var _a2, _b2;
    const tp = (_a2 = searchParams.filterFields) == null ? void 0 : _a2.time_period;
    if (!tp) return "upcoming";
    const val = Array.isArray(tp) ? (_b2 = tp[0]) == null ? void 0 : _b2.value : tp.value;
    return val || "upcoming";
  }, [(_a = searchParams.filterFields) == null ? void 0 : _a.time_period]);
  const {
    data: event
  } = useGetEvent(eventId);
  const calendarRange = useMemo(() => {
    if (!(event == null ? void 0 : event.timezone)) return null;
    const tz = event.timezone;
    const monthStart = dayjs.tz(calendarMonth.format("YYYY-MM-01"), tz).startOf("month");
    const startDay = monthStart.day();
    const offset = startDay === 0 ? 6 : startDay - 1;
    const gridStart = monthStart.subtract(offset, "day").startOf("day");
    const gridEnd = gridStart.add(42, "day").endOf("day");
    return {
      start: gridStart.utc().format("YYYY-MM-DD HH:mm:ss"),
      end: gridEnd.utc().format("YYYY-MM-DD HH:mm:ss")
    };
  }, [calendarMonth, event == null ? void 0 : event.timezone]);
  const queryParams = useMemo(() => {
    if (viewMode === "calendar") {
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
    }
    const filterFields = {
      ...searchParams.filterFields
    };
    if (timePeriod === "all") {
      delete filterFields.time_period;
    } else if (!filterFields.time_period) {
      filterFields.time_period = {
        operator: QueryFilterOperator.Equals,
        value: "upcoming"
      };
    }
    return {
      ...searchParams,
      perPage: searchParams.perPage || 50,
      filterFields
    };
  }, [searchParams, timePeriod, viewMode, calendarRange]);
  const queryEnabled = viewMode !== "calendar" || calendarRange !== null;
  const occurrencesQuery = useGetEventOccurrences(eventId, queryParams, queryEnabled);
  const occurrences = (_b = occurrencesQuery == null ? void 0 : occurrencesQuery.data) == null ? void 0 : _b.data;
  const pagination = (_c = occurrencesQuery == null ? void 0 : occurrencesQuery.data) == null ? void 0 : _c.meta;
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [bulkEditOpen, {
    open: openBulkEdit,
    close: closeBulkEdit
  }] = useDisclosure(false);
  const [generateOpen, {
    open: openGenerate,
    close: closeGenerate
  }] = useDisclosure(false);
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState();
  const [slideoutOccurrenceId, setSlideoutOccurrenceId] = useState();
  const [duplicateFrom, setDuplicateFrom] = useState();
  const [defaultDate, setDefaultDate] = useState();
  const [messageOccurrenceId, setMessageOccurrenceId] = useState();
  const [shareOccurrence, setShareOccurrence] = useState();
  const {
    launchCheckIn,
    checkInModals
  } = useOccurrenceCheckIn(eventId);
  const generationPolling = useOccurrenceGenerationPolling(eventId);
  const cancelMutation = useCancelOccurrence();
  const deleteMutation = useDeleteEventOccurrence();
  const bulkUpdateMutation = useBulkUpdateOccurrences();
  const reactivateMutation = useReactivateOccurrence();
  const refundRef = useRef(false);
  const handleEditClick = (occurrenceId) => {
    setSelectedOccurrenceId(occurrenceId);
    setDuplicateFrom(void 0);
    openEditModal();
  };
  const handleEditClose = () => {
    setSelectedOccurrenceId(void 0);
    setDuplicateFrom(void 0);
    setDefaultDate(void 0);
    closeEditModal();
  };
  const handleCreateClick = () => {
    setSelectedOccurrenceId(void 0);
    setDuplicateFrom(void 0);
    setDefaultDate(void 0);
    openEditModal();
  };
  const handleCreateWithDate = (date) => {
    setSelectedOccurrenceId(void 0);
    setDuplicateFrom(void 0);
    setDefaultDate(date);
    openEditModal();
  };
  const handleDuplicate = (occ) => {
    setSelectedOccurrenceId(void 0);
    setDuplicateFrom(occ);
    openEditModal();
  };
  const handleCancel = (occurrenceId) => {
    var _a2;
    const occ = occurrences == null ? void 0 : occurrences.find((o) => o.id === occurrenceId);
    openCancelOccurrenceDialog({
      eventId,
      occurrenceId,
      orderCount: ((_a2 = occ == null ? void 0 : occ.statistics) == null ? void 0 : _a2.orders_created) ?? 0,
      mutation: cancelMutation
    });
  };
  const handleDelete = (occurrenceId) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "h42Hc/"
      }
    ), () => {
      deleteMutation.mutate({
        eventId,
        occurrenceId
      }, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "IW7Q+u"
          }
        )),
        onError: (error) => {
          var _a2, _b2;
          return showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "n1CYMH"
            }
          ));
        }
      });
    });
  };
  const handleReactivate = (occ) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "XJwWJp"
      }
    ), () => {
      reactivateMutation.mutate({
        eventId,
        occurrenceId: occ.id
      }, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "hvah+S"
          }
        )),
        onError: (error) => {
          var _a2, _b2;
          return showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "ogWc1z"
            }
          ));
        }
      });
    });
  };
  const handleBulkCancel = () => {
    const count = selectedIds.size;
    refundRef.current = false;
    modals.openConfirmModal({
      title: i18n._(
        /*i18n*/
        {
          id: "OcVwAd",
          values: {
            count
          }
        }
      ),
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", mb: "md", children: i18n._(
          /*i18n*/
          {
            id: "wOvn+e",
            values: {
              count
            }
          }
        ) }),
        /* @__PURE__ */ jsx(Checkbox, { label: i18n._(
          /*i18n*/
          {
            id: "vuFYA6"
          }
        ), onChange: (e) => {
          refundRef.current = e.currentTarget.checked;
        } })
      ] }),
      labels: {
        confirm: i18n._(
          /*i18n*/
          {
            id: "OcVwAd",
            values: {
              count
            }
          }
        ),
        cancel: i18n._(
          /*i18n*/
          {
            id: "sr0UJD"
          }
        )
      },
      confirmProps: {
        color: "red"
      },
      onConfirm: () => {
        bulkUpdateMutation.mutate({
          eventId,
          data: {
            action: "cancel",
            occurrence_ids: [...selectedIds],
            future_only: false,
            skip_overridden: false,
            refund_orders: refundRef.current
          }
        }, {
          onSuccess: (response) => {
            showSuccess(i18n._(
              /*i18n*/
              {
                id: "FPpqc7",
                values: {
                  0: response.updated_count
                }
              }
            ));
            setSelectedIds(/* @__PURE__ */ new Set());
            setTimeout(() => occurrencesQuery.refetch(), 5e3);
          },
          onError: (error) => {
            var _a2, _b2;
            return showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
              /*i18n*/
              {
                id: "YUX+f+"
              }
            ));
          }
        });
      }
    });
  };
  const handleBulkDelete = () => {
    const count = selectedIds.size;
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "BlII4o",
        values: {
          count
        }
      }
    ), () => {
      bulkUpdateMutation.mutate({
        eventId,
        data: {
          action: "delete",
          occurrence_ids: [...selectedIds],
          future_only: false,
          skip_overridden: false
        }
      }, {
        onSuccess: (response) => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "LIZZLY",
              values: {
                0: response.updated_count
              }
            }
          ));
          setSelectedIds(/* @__PURE__ */ new Set());
        },
        onError: (error) => {
          var _a2, _b2;
          return showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "JJ0uRo"
            }
          ));
        }
      });
    });
  };
  const handlePageChange = (value) => {
    setSelectedIds(/* @__PURE__ */ new Set());
    setSearchParams({
      pageNumber: value
    });
  };
  const handleTimePeriodChange = (val) => {
    const newFilterFields = {
      ...searchParams.filterFields || {}
    };
    newFilterFields.time_period = {
      operator: QueryFilterOperator.Equals,
      value: val
    };
    setSelectedIds(/* @__PURE__ */ new Set());
    setSearchParams({
      ...searchParams,
      filterFields: newFilterFields,
      pageNumber: 1
    }, true);
  };
  const menuActions = {
    eventId,
    onEdit: handleEditClick,
    onCancel: handleCancel,
    onDelete: handleDelete,
    onNavigate: navigate,
    onDuplicate: handleDuplicate,
    onMessage: (id) => setMessageOccurrenceId(id),
    onCheckIn: launchCheckIn,
    onReactivate: handleReactivate,
    onShare: (occ) => setShareOccurrence(occ)
  };
  const columns = useMemo(() => [{
    id: "time",
    header: i18n._(
      /*i18n*/
      {
        id: "LhMjLm"
      }
    ),
    render: (occ) => {
      if (!event) return null;
      const startTime = formatDateWithLocale(occ.start_date, "timeOnly", event.timezone);
      const endTime = occ.end_date ? formatOccurrenceEnd(occ.end_date, occ.start_date, event.timezone) : null;
      const locationDisplay = getEventLocationDisplay(event, occ);
      return /* @__PURE__ */ jsxs(Anchor, { className: classes.dateTimeLink, onClick: () => setSlideoutOccurrenceId(occ.id), children: [
        /* @__PURE__ */ jsxs("div", { className: classes.dateTimePrimary, children: [
          startTime,
          endTime && /* @__PURE__ */ jsxs(Fragment, { children: [
            " — ",
            endTime
          ] }),
          occ.is_overridden && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
            /*i18n*/
            {
              id: "MRZxAn"
            }
          ), withArrow: true, children: /* @__PURE__ */ jsx(IconPencil, { size: 12, className: classes.editedIcon }) })
        ] }),
        occ.label && /* @__PURE__ */ jsx("div", { className: classes.dateTimeMeta, children: occ.label }),
        locationDisplay && /* @__PURE__ */ jsx("div", { className: classes.dateTimeLocation, children: locationDisplay.isOnline ? i18n._(
          /*i18n*/
          {
            id: "oXOSPE"
          }
        ) : locationDisplay.short })
      ] });
    },
    headerStyle: {
      minWidth: 160
    }
  }, {
    id: "status",
    header: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    render: (occ) => {
      const isClickable = occ.status === EventOccurrenceStatus.ACTIVE || occ.status === EventOccurrenceStatus.CANCELLED;
      const tooltip = occ.status === EventOccurrenceStatus.ACTIVE ? i18n._(
        /*i18n*/
        {
          id: "/o+aQX"
        }
      ) : occ.status === EventOccurrenceStatus.CANCELLED ? i18n._(
        /*i18n*/
        {
          id: "gD7WGV"
        }
      ) : void 0;
      const handleStatusClick = () => {
        if (occ.status === EventOccurrenceStatus.ACTIVE) {
          handleCancel(occ.id);
        } else if (occ.status === EventOccurrenceStatus.CANCELLED) {
          handleReactivate(occ);
        }
      };
      const badge = /* @__PURE__ */ jsxs("div", { className: classes.statusBadge, "data-status": occ.status, "data-clickable": isClickable || void 0, onClick: isClickable ? handleStatusClick : void 0, children: [
        /* @__PURE__ */ jsx(StatusIcon, { status: occ.status }),
        statusLabel(occ.status)
      ] });
      if (tooltip) {
        return /* @__PURE__ */ jsx(Tooltip, { label: tooltip, position: "top", withArrow: true, children: badge });
      }
      return badge;
    },
    headerStyle: {
      minWidth: 120
    }
  }, {
    id: "ticketsSold",
    header: i18n._(
      /*i18n*/
      {
        id: "s9KGXU"
      }
    ),
    render: (occ) => {
      const used = occ.used_capacity ?? 0;
      const total = occ.capacity;
      const pct = total ? Math.min(100, Math.round(used / total * 100)) : 0;
      return /* @__PURE__ */ jsxs("div", { className: classes.ticketsSold, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.ticketsSoldNumbers, children: [
          /* @__PURE__ */ jsx("span", { className: classes.ticketsSoldCount, children: used }),
          total != null && /* @__PURE__ */ jsxs("span", { className: classes.ticketsSoldTotal, children: [
            " / ",
            total
          ] })
        ] }),
        total != null && /* @__PURE__ */ jsx(Progress, { value: pct, size: 4, radius: "xl", color: pct >= 90 ? "red" : pct >= 70 ? "orange" : "blue", className: classes.ticketsProgress, style: used === 0 ? {
          opacity: 0.3
        } : void 0 })
      ] });
    },
    headerStyle: {
      minWidth: 120
    }
  }, {
    id: "activity",
    header: i18n._(
      /*i18n*/
      {
        id: "XJOV1Y"
      }
    ),
    render: (occ) => {
      var _a2, _b2, _c2;
      const orders = ((_a2 = occ.statistics) == null ? void 0 : _a2.orders_created) ?? 0;
      const gross = ((_b2 = occ.statistics) == null ? void 0 : _b2.total_gross_sales) ?? 0;
      const refunded = ((_c2 = occ.statistics) == null ? void 0 : _c2.total_refunded) ?? 0;
      if (orders === 0 && gross === 0) {
        return null;
      }
      return /* @__PURE__ */ jsxs("div", { className: classes.activity, children: [
        /* @__PURE__ */ jsxs("span", { className: classes.activityText, children: [
          orders,
          " ",
          orders === 1 ? i18n._(
            /*i18n*/
            {
              id: "dSeVIm"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "V5khLm"
            }
          ),
          gross > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
            " · ",
            formatCurrency(gross, event == null ? void 0 : event.currency)
          ] })
        ] }),
        refunded > 0 && /* @__PURE__ */ jsxs("span", { className: classes.activityRefunded, children: [
          "(-",
          formatCurrency(refunded, event == null ? void 0 : event.currency),
          ")"
        ] })
      ] });
    },
    headerStyle: {
      minWidth: 140
    }
  }, {
    id: "actions",
    header: "",
    sticky: "right",
    render: (occ) => /* @__PURE__ */ jsx(Group, { wrap: "nowrap", gap: 0, justify: "flex-end", children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx("div", { className: classes.action, children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "transparent", "data-testid": "occurrence-actions-menu", children: /* @__PURE__ */ jsx(IconDotsVertical, {}) }) }) }),
      /* @__PURE__ */ jsx(Menu.Dropdown, { children: /* @__PURE__ */ jsx(OccurrenceMenuItems, { occurrence: occ, actions: menuActions }) })
    ] }) }),
    headerStyle: {
      width: 70
    }
  }], [event]);
  const rowStyleFn = useCallback((occ) => {
    return timePeriod === "all" && occ.is_past ? {
      opacity: 0.5
    } : void 0;
  }, [timePeriod]);
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "wZJfA8"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "V9flmL"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: classes.toolbar, children: [
      /* @__PURE__ */ jsx(SegmentedControl, { size: "sm", value: viewMode, onChange: handleViewModeChange, data: [{
        label: /* @__PURE__ */ jsxs(Group, { gap: 5, wrap: "nowrap", children: [
          /* @__PURE__ */ jsx(IconList, { size: 13 }),
          i18n._(
            /*i18n*/
            {
              id: "2BBAbc"
            }
          )
        ] }),
        value: "list"
      }, {
        label: /* @__PURE__ */ jsxs(Group, { gap: 5, wrap: "nowrap", children: [
          /* @__PURE__ */ jsx(IconCalendar, { size: 13 }),
          i18n._(
            /*i18n*/
            {
              id: "AjVXBS"
            }
          )
        ] }),
        value: "calendar"
      }] }),
      viewMode === "list" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: classes.toolbarDivider }),
        /* @__PURE__ */ jsx(SegmentedControl, { size: "sm", value: timePeriod, onChange: handleTimePeriodChange, data: [{
          label: i18n._(
            /*i18n*/
            {
              id: "ia8YsC"
            }
          ),
          value: "upcoming"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "Ff0Dor"
            }
          ),
          value: "past"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "N40H+G"
            }
          ),
          value: "all"
        }] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.toolbarSpacer }),
      selectedIds.size > 0 && /* @__PURE__ */ jsxs("div", { className: classes.selectionGroup, children: [
        /* @__PURE__ */ jsxs("span", { className: classes.selectionCount, children: [
          selectedIds.size,
          " ",
          i18n._(
            /*i18n*/
            {
              id: "+6YAwo"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { className: classes.selectionAction, "data-danger": true, "data-testid": "occurrence-bulk-cancel-button", onClick: handleBulkCancel, children: i18n._(
          /*i18n*/
          {
            id: "dEgA5A"
          }
        ) }),
        /* @__PURE__ */ jsx("button", { className: classes.selectionAction, "data-danger": true, "data-testid": "occurrence-bulk-delete-button", onClick: handleBulkDelete, children: i18n._(
          /*i18n*/
          {
            id: "cnGeoo"
          }
        ) }),
        /* @__PURE__ */ jsx("button", { className: classes.selectionAction, "data-testid": "occurrence-bulk-clear-selection-button", onClick: () => setSelectedIds(/* @__PURE__ */ new Set()), children: i18n._(
          /*i18n*/
          {
            id: "xCJdfg"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes.toolbarDivider })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "light", leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), onClick: openBulkEdit, "data-testid": "occurrence-bulk-edit-button", children: i18n._(
        /*i18n*/
        {
          id: "cr7kGH"
        }
      ) }),
      /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 220, children: [
        /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { size: "sm", leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 14 }), children: i18n._(
          /*i18n*/
          {
            id: "Q219NT"
          }
        ) }) }),
        /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
          /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconCalendarEvent, { size: 16 }), onClick: openGenerate, disabled: generationPolling.isGenerating, children: i18n._(
            /*i18n*/
            {
              id: "gzXY7l"
            }
          ) }),
          /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconCalendarPlus, { size: 16 }), onClick: handleCreateClick, children: i18n._(
            /*i18n*/
            {
              id: "nOZl6j"
            }
          ) })
        ] })
      ] })
    ] }),
    generationPolling.isGenerating && /* @__PURE__ */ jsxs("div", { className: classes.generationBanner, "data-testid": "occurrence-generation-progress", children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "qdv10s",
          values: {
            0: generationPolling.totalCount
          }
        }
      ) }),
      /* @__PURE__ */ jsx(Progress, { size: 4, value: 100, animated: true, color: "blue" })
    ] }),
    occurrences && occurrencesQuery.isFetching && !occurrencesQuery.isLoading && !occurrencesQuery.isPlaceholderData && /* @__PURE__ */ jsx(Progress, { size: 2, value: 100, animated: true, color: "blue", mb: "xs" }),
    /* @__PURE__ */ jsxs("div", { className: classes.contentArea, children: [
      viewMode === "list" && (occurrencesQuery.isLoading || occurrencesQuery.isPlaceholderData) && /* @__PURE__ */ jsx(TableSkeleton, { isVisible: true }),
      viewMode === "calendar" && (occurrencesQuery.isLoading || occurrencesQuery.isPlaceholderData || !event) && /* @__PURE__ */ jsx(Skeleton, { height: 720, radius: "md" }),
      viewMode === "list" && occurrences && occurrences.length === 0 && !occurrencesQuery.isFetching && !occurrencesQuery.isPlaceholderData && (() => {
        const hasActiveFilters = !!(timePeriod === "past" || timePeriod === "all");
        return /* @__PURE__ */ jsx(Paper, { className: classes.emptyState, p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "md", children: [
          /* @__PURE__ */ jsx("img", { src: "/blank-slate/occurrence-schedule.svg", alt: "", style: {
            width: 200,
            height: 200
          } }),
          /* @__PURE__ */ jsxs(Stack, { align: "center", gap: 4, children: [
            /* @__PURE__ */ jsx(Text, { fw: 600, size: "lg", children: hasActiveFilters ? i18n._(
              /*i18n*/
              {
                id: "B7phdj"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "gEdNe8"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", ta: "center", maw: 360, children: hasActiveFilters ? i18n._(
              /*i18n*/
              {
                id: "2P/OWN"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "pd6SSe"
              }
            ) })
          ] }),
          !hasActiveFilters && /* @__PURE__ */ jsxs(Group, { gap: "md", mt: "sm", children: [
            /* @__PURE__ */ jsx(Button, { variant: "filled", leftSection: /* @__PURE__ */ jsx(IconCalendarEvent, { size: 16 }), onClick: openGenerate, children: i18n._(
              /*i18n*/
              {
                id: "gzXY7l"
              }
            ) }),
            /* @__PURE__ */ jsx(Button, { variant: "subtle", color: "gray", onClick: handleCreateClick, children: i18n._(
              /*i18n*/
              {
                id: "8m9emP"
              }
            ) })
          ] })
        ] }) });
      })(),
      occurrences && occurrences.length > 0 && viewMode === "list" && event && !occurrencesQuery.isPlaceholderData && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(GroupedOccurrenceTable, { occurrences, columns, eventTimezone: event.timezone, selectedIds, onSelectionChange: setSelectedIds, rowStyle: rowStyleFn }),
        pagination && /* @__PURE__ */ jsx(Text, { className: classes.countText, children: i18n._(
          /*i18n*/
          {
            id: "E717U9",
            values: {
              0: pagination.from,
              1: pagination.to,
              2: pagination.total
            }
          }
        ) })
      ] }),
      viewMode === "calendar" && event && !occurrencesQuery.isLoading && !occurrencesQuery.isPlaceholderData && /* @__PURE__ */ jsx(CalendarView, { occurrences: occurrences || [], eventTimezone: event.timezone, currentMonth: calendarMonth, onMonthChange: setCalendarMonth, menuActions, onOccurrenceClick: (id) => setSlideoutOccurrenceId(id), onCreate: handleCreateWithDate })
    ] }),
    !!(occurrences == null ? void 0 : occurrences.length) && viewMode === "list" && !occurrencesQuery.isPlaceholderData && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: handlePageChange, total: Number(pagination == null ? void 0 : pagination.last_page) }),
    editModalOpen && /* @__PURE__ */ jsx(OccurrenceEditModal, { onClose: handleEditClose, occurrenceId: selectedOccurrenceId, duplicateFrom, defaultDate }),
    bulkEditOpen && /* @__PURE__ */ jsx(OccurrenceBulkEditModal, { onClose: closeBulkEdit, occurrences }),
    generateOpen && /* @__PURE__ */ jsx(RecurrenceScheduleDrawer, { onClose: closeGenerate, onGenerationStarted: generationPolling.start }),
    slideoutOccurrenceId && /* @__PURE__ */ jsx(ManageOccurrenceModal, { occurrenceId: slideoutOccurrenceId, onClose: () => setSlideoutOccurrenceId(void 0) }),
    messageOccurrenceId && /* @__PURE__ */ jsx(SendMessageModal, { onClose: () => setMessageOccurrenceId(void 0), messageType: MessageType.AllAttendees, eventOccurrenceId: messageOccurrenceId }),
    checkInModals,
    shareOccurrence && event && /* @__PURE__ */ jsx(ShareModal, { opened: !!shareOccurrence, onClose: () => setShareOccurrence(void 0), url: `${eventHomepageUrl(event)}?occurrence_id=${shareOccurrence.id}`, title: event.title, shareText: `${event.title} — ${formatDateWithLocale(shareOccurrence.start_date, "shortDateTime", event.timezone)}` })
  ] });
};
export {
  OccurrencesTab as default
};

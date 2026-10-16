import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useNavigate } from "react-router";
import { Text, Checkbox, Skeleton } from "@mantine/core";
import { useState, useRef, useCallback, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { u as useGetEventStats, S as StatBoxes, P as ProductSalesChartCard, R as RevenueChartCard } from "./index-R-MWObZZ.js";
import { u as useCancelOccurrence, a as useDeleteEventOccurrence, c as useReactivateOccurrence, O as OccurrenceAttendeesAndOrders, d as OccurrenceEditModal } from "./index-Yy0Il7Zs.js";
import { S as SendMessageModal } from "./index-7RPUkRz0.js";
import { S as ShareModal } from "./index-BwSXzvSP.js";
import { u as useOccurrenceCheckIn, s as statusLabel, a as OccurrenceActionBar } from "./useOccurrenceCheckIn-CRXwKNrq.js";
import { u as useGetEventOccurrence } from "./useGetEventOccurrence-Csyd2oEM.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
import { M as MessageType } from "./types-CqPWB-a5.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { e as eventHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import "./periodPreset-yPBfrqeg.js";
import "@mantine/charts";
import "@tabler/icons-react";
import "@tanstack/react-query";
import "../entry.server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./currency-Br7a8J7F.js";
import "./index-jHMtuNEo.js";
import "@mantine/form";
import "dayjs";
import "./index-AhXgh6Nz.js";
import "./index-CwAoF9NO.js";
import "./index-CwjvB_vn.js";
import "./index-D4cOjjnu.js";
import "./index-iW6667X7.js";
import "./countries-C8-MXWCy.js";
import "./useCreateLocation-DZ93UmD2.js";
import "./useGeoStatus-GfcfS0IW.js";
import "./addressUtilities-7xIQim0X.js";
import "./useGetEventOccurrences-Ch0XNQBq.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./useGetPriceOverrides-DcysoAcA.js";
import "./index-DAgXC5_F.js";
import "./useGetCheckInLists-DZb0QIwp.js";
import "./index-DC4VxyXX.js";
import "./attendee.client-CeeZ2TBj.js";
import "./index-DTsqBh8c.js";
import "./index-IzdRcWBR.js";
import "./index-wMxbqESV.js";
import "./order.client-BmBVeAyF.js";
import "./useGetEventCounts-BudQN_tQ.js";
import "./download-DP3M_6Yt.js";
import "./withLoadingNotification-6oRbhBHA.js";
import "./index-R0GQzPHn.js";
import "./index-CoMrHZbF.js";
import "./index-BXVupOij.js";
import "./products-BLTGbPdF.js";
import "react-qr-code";
import "./effectiveLocation-BzDgAlu_.js";
import "./index-BfWJHinS.js";
import "./index-gUnclHYL.js";
import "./index-ChciN8SC.js";
import "./index-CYsdl7UG.js";
import "./index-D0pbWAZK.js";
import "@tanstack/react-table";
import "./index-DuG5BVAJ.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "./index-BAJxP518.js";
import "./useUrlHash-BZci-yZ8.js";
import "./useGetAccount-CGfwRfDK.js";
import "./index-BmGsefon.js";
import "./index-CnTFmtaW.js";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/advancedFormat.js";
const header = "_header_4745x_1";
const statusBadge = "_statusBadge_4745x_9";
const classes = {
  header,
  statusBadge
};
const OccurrenceDetail = () => {
  const {
    eventId,
    occurrenceId
  } = useParams();
  const navigate = useNavigate();
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: occurrence,
    isLoading: occurrenceLoading
  } = useGetEventOccurrence(eventId, occurrenceId);
  const {
    data: eventStats
  } = useGetEventStats(eventId, {
    occurrenceId
  });
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showShareOccurrence, setShowShareOccurrence] = useState();
  const {
    launchCheckIn,
    checkInModals
  } = useOccurrenceCheckIn(eventId);
  const cancelMutation = useCancelOccurrence();
  const deleteMutation = useDeleteEventOccurrence();
  const reactivateMutation = useReactivateOccurrence();
  const refundRef = useRef(false);
  const handleCancel = useCallback((occId) => {
    var _a;
    const orderCount = ((_a = occurrence == null ? void 0 : occurrence.statistics) == null ? void 0 : _a.orders_created) ?? 0;
    refundRef.current = false;
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
          refundRef.current = e.currentTarget.checked;
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
        cancelMutation.mutate({
          eventId,
          occurrenceId: occId,
          refundOrders: refundRef.current
        }, {
          onSuccess: () => showSuccess(i18n._(
            /*i18n*/
            {
              id: "e6cAxJ"
            }
          )),
          onError: (error) => {
            var _a2, _b;
            return showError(((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || i18n._(
              /*i18n*/
              {
                id: "PO0cfn"
              }
            ));
          }
        });
      }
    });
  }, [occurrence, eventId]);
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
          navigate(`/manage/event/${eventId}/occurrences`);
        },
        onError: (error) => {
          var _a, _b;
          return showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
            /*i18n*/
            {
              id: "n1CYMH"
            }
          ));
        }
      });
    });
  }, [eventId, navigate]);
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
          var _a, _b;
          return showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
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
    onEdit: () => openEditModal(),
    onCancel: handleCancel,
    onDelete: handleDelete,
    onNavigate: navigate,
    onMessage: () => setShowMessageModal(true),
    onCheckIn: launchCheckIn,
    onReactivate: handleReactivate,
    onShare: (occ) => setShowShareOccurrence(occ)
  }), [eventId, launchCheckIn, handleCancel, handleDelete, handleReactivate, navigate, openEditModal]);
  if (occurrenceLoading || !event) {
    return /* @__PURE__ */ jsxs(PageBody, { children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 30, width: 200, mb: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 120, mb: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 300 })
    ] });
  }
  const startDate = occurrence ? formatDateWithLocale(occurrence.start_date, "fullDateTime", event.timezone) : "";
  const dateRange = eventStats ? `${formatDateWithLocale(eventStats.start_date, "chartDate", event.timezone)} - ${formatDateWithLocale(eventStats.end_date, "chartDate", event.timezone)}` : "";
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsxs("div", { className: classes.header, children: [
      /* @__PURE__ */ jsxs(PageTitle, { style: {
        marginBottom: 0
      }, children: [
        startDate,
        (occurrence == null ? void 0 : occurrence.label) && ` — ${occurrence.label}`
      ] }),
      (occurrence == null ? void 0 : occurrence.status) && /* @__PURE__ */ jsx("span", { className: classes.statusBadge, "data-status": occurrence.status, children: statusLabel(occurrence.status) })
    ] }),
    occurrence && /* @__PURE__ */ jsx("div", { style: {
      marginBottom: 16
    }, children: /* @__PURE__ */ jsx(OccurrenceActionBar, { occurrence, actions: menuActions, hiddenKeys: ["dashboard"] }) }),
    /* @__PURE__ */ jsx("div", { style: {
      marginBottom: 20
    }, children: /* @__PURE__ */ jsx(StatBoxes, { occurrenceId }) }),
    /* @__PURE__ */ jsx(OccurrenceAttendeesAndOrders, { occurrenceId, perPage: 25 }),
    eventStats && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ProductSalesChartCard, { dailyStats: eventStats.daily_stats, timezone: event.timezone, dateRangeLabel: dateRange, syncId: "occurrences" }),
      /* @__PURE__ */ jsx(RevenueChartCard, { dailyStats: eventStats.daily_stats, timezone: event.timezone, currency: event.currency, dateRangeLabel: dateRange, syncId: "occurrences" })
    ] }),
    editModalOpen && /* @__PURE__ */ jsx(OccurrenceEditModal, { onClose: closeEditModal, occurrenceId }),
    showMessageModal && /* @__PURE__ */ jsx(SendMessageModal, { onClose: () => setShowMessageModal(false), messageType: MessageType.AllAttendees, eventOccurrenceId: occurrenceId }),
    checkInModals,
    showShareOccurrence && /* @__PURE__ */ jsx(ShareModal, { opened: !!showShareOccurrence, onClose: () => setShowShareOccurrence(void 0), url: `${eventHomepageUrl(event)}?occurrence_id=${showShareOccurrence.id}`, title: event.title, shareText: `${event.title} — ${formatDateWithLocale(showShareOccurrence.start_date, "shortDateTime", event.timezone)}` })
  ] });
};
export {
  OccurrenceDetail as default
};

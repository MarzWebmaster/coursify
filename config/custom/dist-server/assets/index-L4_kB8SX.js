import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { useParams } from "react-router";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { Center, Loader, Alert, Button, Anchor, Badge, Progress } from "@mantine/core";
import { IconCalendarEvent, IconUsers, IconCheck, IconX, IconPencil, IconCopy, IconQrcode, IconTrash, IconPlus } from "@tabler/icons-react";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { c as checkInListClient, G as GET_EVENT_CHECK_IN_LISTS_QUERY_KEY, u as useGetEventCheckInLists } from "./useGetCheckInLists-DZb0QIwp.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { Trans } from "@lingui/react";
import { E as EventType } from "./types-CqPWB-a5.js";
import { useEffect, useState, useMemo } from "react";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { a as CheckInListForm, C as CreateCheckInListModal } from "./index-BmGsefon.js";
import { useForm } from "@mantine/form";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { u as utcToTz, f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { T as TanStackTable } from "./index-D0pbWAZK.js";
import { A as ActionMenu } from "./index-ChciN8SC.js";
import { T as Truncate } from "./index-DC4VxyXX.js";
import "classnames";
import "./index-jHMtuNEo.js";
import "../entry.server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/notifications";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./index-CwAoF9NO.js";
import "./index-gUnclHYL.js";
import "./index-CwjvB_vn.js";
import "./index-CnTFmtaW.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "@tanstack/react-table";
const GET_EVENT_CHECK_IN_LIST_QUERY_KEY = "getEventCheckInList";
const useGetEventCheckInList = (checkInListId, eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_CHECK_IN_LIST_QUERY_KEY, eventId, checkInListId],
    queryFn: async () => {
      const {
        data
      } = await checkInListClient.get(eventId, checkInListId);
      return data;
    }
  });
};
const useEditCheckInList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      checkInListData,
      eventId,
      checkInListId
    }) => checkInListClient.update(eventId, checkInListId, checkInListData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_CHECK_IN_LIST_QUERY_KEY, variables.eventId, variables.checkInListId]
      });
      return queryClient.invalidateQueries({
        queryKey: [GET_EVENT_CHECK_IN_LISTS_QUERY_KEY]
      });
    }
  });
};
const EditCheckInListModal = ({
  onClose,
  checkInListId
}) => {
  const {
    eventId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: checkInList,
    error: checkInListError,
    isLoading: checkInListLoading
  } = useGetEventCheckInList(checkInListId, eventId);
  const {
    data: event
  } = useGetEvent(eventId);
  const form = useForm({
    initialValues: {
      name: "",
      expires_at: "",
      activates_at: "",
      description: "",
      product_ids: [],
      event_occurrence_id: null,
      public_show_attendee_notes: true,
      public_show_question_answers: true,
      public_show_order_details: true
    }
  });
  const editMutation = useEditCheckInList();
  const handleSubmit = (requestData) => {
    editMutation.mutate({
      eventId,
      checkInListData: requestData,
      checkInListId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "Z+rnth"
          }
        ));
        onClose();
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  useEffect(() => {
    var _a;
    if (checkInList && event) {
      form.setValues({
        name: checkInList.name,
        description: checkInList.description,
        expires_at: utcToTz(checkInList.expires_at, event.timezone),
        activates_at: utcToTz(checkInList.activates_at, event.timezone),
        product_ids: (_a = checkInList.products) == null ? void 0 : _a.map((product) => String(product.id)),
        event_occurrence_id: checkInList.event_occurrence_id ?? null,
        public_show_attendee_notes: checkInList.public_show_attendee_notes ?? true,
        public_show_question_answers: checkInList.public_show_question_answers ?? true,
        public_show_order_details: checkInList.public_show_order_details ?? true
      });
    }
  }, [checkInList]);
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "FU1gvP"
    }
  ), children: [
    checkInListLoading && /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Loader, {}) }),
    !!checkInListError && /* @__PURE__ */ jsx(Alert, { color: "red", children: i18n._(
      /*i18n*/
      {
        id: "d+KKMz"
      }
    ) }),
    event && checkInList && /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
      /* @__PURE__ */ jsx(CheckInListForm, { form, productCategories: event.product_categories, eventType: event.type, occurrences: event.occurrences, timezone: event.timezone, hideIntro: true }),
      /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, loading: editMutation.isPending, mt: "md", children: i18n._(
        /*i18n*/
        {
          id: "FU1gvP"
        }
      ) })
    ] })
  ] });
};
const useDeleteCheckInList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      checkInListId,
      eventId
    }) => checkInListClient.delete(eventId, checkInListId),
    onSuccess: (_, {
      eventId
    }) => queryClient.invalidateQueries({
      queryKey: [GET_EVENT_CHECK_IN_LISTS_QUERY_KEY, eventId]
    })
  });
};
const listDetails = "_listDetails_vxgum_1";
const listName = "_listName_vxgum_9";
const nameRow = "_nameRow_vxgum_21";
const productsText = "_productsText_vxgum_34";
const occurrenceContainer = "_occurrenceContainer_vxgum_40";
const occurrenceChip = "_occurrenceChip_vxgum_46";
const occurrenceText = "_occurrenceText_vxgum_56";
const progressContainer = "_progressContainer_vxgum_61";
const progressText = "_progressText_vxgum_68";
const statusBadge = "_statusBadge_vxgum_76";
const rowActions = "_rowActions_vxgum_95";
const classes = {
  listDetails,
  listName,
  nameRow,
  productsText,
  occurrenceContainer,
  occurrenceChip,
  occurrenceText,
  progressContainer,
  progressText,
  statusBadge,
  rowActions
};
const CheckInListTable = ({
  checkInLists,
  openCreateModal,
  event
}) => {
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [selectedCheckInListId, setSelectedCheckInListId] = useState();
  const deleteMutation = useDeleteCheckInList();
  const {
    eventId
  } = useParams();
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleDeleteCheckInList = (checkInListId, eventId2) => {
    deleteMutation.mutate({
      checkInListId,
      eventId: eventId2
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "+CeSxK"
          }
        ));
      },
      onError: (error) => {
        showError(error.message);
      }
    });
  };
  const columns = useMemo(() => {
    const allColumns = [{
      id: "name",
      header: i18n._(
        /*i18n*/
        {
          id: "Wwztk4"
        }
      ),
      enableHiding: false,
      cell: (info) => {
        const list = info.row.original;
        const coversAllTickets = !list.products || list.products.length === 0;
        return /* @__PURE__ */ jsxs("div", { className: classes.listDetails, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.nameRow, children: [
            /* @__PURE__ */ jsx(Anchor, { className: classes.listName, onClick: () => {
              setSelectedCheckInListId(list.id);
              openEditModal();
            }, children: /* @__PURE__ */ jsx(Truncate, { text: list.name, length: 40 }) }),
            list.is_system_default && /* @__PURE__ */ jsx(Badge, { size: "xs", color: "gray", variant: "light", children: i18n._(
              /*i18n*/
              {
                id: "ovBPCi"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: classes.productsText, children: coversAllTickets ? i18n._(
            /*i18n*/
            {
              id: "GkrqoY"
            }
          ) : list.products.length === 1 ? i18n._(
            /*i18n*/
            {
              id: "lpm0+y"
            }
          ) : /* @__PURE__ */ jsx(Trans, { id: "Vi+BiW", values: {
            0: list.products.length
          } }) })
        ] });
      },
      meta: {
        headerStyle: {
          minWidth: 250
        }
      }
    }, {
      id: "occurrence",
      header: i18n._(
        /*i18n*/
        {
          id: "mYGY3B"
        }
      ),
      enableHiding: true,
      cell: (info) => {
        const list = info.row.original;
        const occurrence = list.event_occurrence;
        if (!occurrence || !(event == null ? void 0 : event.timezone)) {
          return /* @__PURE__ */ jsx("div", { className: classes.occurrenceText, children: i18n._(
            /*i18n*/
            {
              id: "e4q4uO"
            }
          ) });
        }
        return /* @__PURE__ */ jsx("div", { className: classes.occurrenceContainer, children: /* @__PURE__ */ jsxs("span", { className: classes.occurrenceChip, children: [
          /* @__PURE__ */ jsx(IconCalendarEvent, { size: 12 }),
          formatDateWithLocale(occurrence.start_date, "shortDate", event.timezone),
          " ",
          formatDateWithLocale(occurrence.start_date, "timeOnly", event.timezone),
          occurrence.label && ` · ${occurrence.label}`
        ] }) });
      },
      meta: {
        headerStyle: {
          minWidth: 160
        }
      }
    }, {
      id: "progress",
      header: i18n._(
        /*i18n*/
        {
          id: "7B5M35"
        }
      ),
      enableHiding: true,
      cell: (info) => {
        const list = info.row.original;
        const percentage = list.total_attendees === 0 ? 0 : list.checked_in_attendees / list.total_attendees * 100;
        return /* @__PURE__ */ jsxs("div", { className: classes.progressContainer, children: [
          /* @__PURE__ */ jsx(Progress, { value: percentage, radius: "xl", color: list.checked_in_attendees === list.total_attendees && list.total_attendees > 0 ? "primary" : "green", size: "md" }),
          /* @__PURE__ */ jsxs("div", { className: classes.progressText, children: [
            /* @__PURE__ */ jsx(IconUsers, { size: 14 }),
            list.checked_in_attendees,
            " / ",
            list.total_attendees
          ] })
        ] });
      },
      meta: {
        headerStyle: {
          minWidth: 160
        }
      }
    }, {
      id: "status",
      header: i18n._(
        /*i18n*/
        {
          id: "uAQUqI"
        }
      ),
      enableHiding: true,
      cell: (info) => {
        const list = info.row.original;
        const isActive = !list.is_expired && list.is_active;
        return /* @__PURE__ */ jsx("div", { className: classes.statusBadge, "data-status": isActive ? "active" : "inactive", children: isActive ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconCheck, { size: 14 }),
          i18n._(
            /*i18n*/
            {
              id: "F6pfE9"
            }
          )
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconX, { size: 14 }),
          i18n._(
            /*i18n*/
            {
              id: "NoNwIX"
            }
          )
        ] }) });
      },
      meta: {
        headerStyle: {
          minWidth: 100
        }
      }
    }, {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: (info) => {
        const list = info.row.original;
        const manageItems = [{
          label: i18n._(
            /*i18n*/
            {
              id: "FU1gvP"
            }
          ),
          icon: /* @__PURE__ */ jsx(IconPencil, { size: 14 }),
          onClick: () => {
            setSelectedCheckInListId(list.id);
            openEditModal();
          }
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "r2B2P8"
            }
          ),
          icon: /* @__PURE__ */ jsx(IconCopy, { size: 14 }),
          onClick: () => {
            navigator.clipboard.writeText(`${window.location.origin}/check-in/${list.short_id}`).then(() => {
              showSuccess(i18n._(
                /*i18n*/
                {
                  id: "hD1ocH"
                }
              ));
            });
          }
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "Qqqrwa"
            }
          ),
          icon: /* @__PURE__ */ jsx(IconQrcode, { size: 14 }),
          onClick: () => {
            window.open(`/check-in/${list.short_id}`, "_blank");
          },
          visible: isMobile
        }];
        const groups = [{
          label: i18n._(
            /*i18n*/
            {
              id: "wckWOP"
            }
          ),
          items: manageItems
        }];
        if (!list.is_system_default) {
          groups.push({
            label: i18n._(
              /*i18n*/
              {
                id: "Zz6Cxn"
              }
            ),
            items: [{
              label: i18n._(
                /*i18n*/
                {
                  id: "Qrc8RZ"
                }
              ),
              icon: /* @__PURE__ */ jsx(IconTrash, { size: 14 }),
              onClick: () => {
                confirmationDialog(i18n._(
                  /*i18n*/
                  {
                    id: "baHeCz"
                  }
                ), () => {
                  handleDeleteCheckInList(list.id, eventId);
                });
              },
              color: "red"
            }]
          });
        }
        return /* @__PURE__ */ jsxs("div", { className: classes.rowActions, children: [
          !isMobile && /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", leftSection: /* @__PURE__ */ jsx(IconQrcode, { size: 14 }), onClick: () => window.open(`/check-in/${list.short_id}`, "_blank"), "data-testid": "check-in-list-open-button", children: i18n._(
            /*i18n*/
            {
              id: "JVmMzo"
            }
          ) }),
          /* @__PURE__ */ jsx(ActionMenu, { itemsGroups: groups, dataTestId: "check-in-list-actions-menu" })
        ] });
      },
      meta: {
        sticky: "right"
      }
    }];
    return allColumns.filter((column) => {
      if (column.id === "occurrence" && !isRecurring) {
        return false;
      }
      return true;
    });
  }, [eventId, isRecurring, event == null ? void 0 : event.timezone, isMobile]);
  if (checkInLists.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "a/gMx2"
      }
    ), imageHref: "/blank-slate/check-in-lists.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "B1St2O", components: {
        0: /* @__PURE__ */ jsx("p", {})
      } }) }),
      /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
        /*i18n*/
        {
          id: "WVbTwK"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TanStackTable, { data: checkInLists, columns, storageKey: "check-in-lists-table" }),
    editModalOpen && selectedCheckInListId && /* @__PURE__ */ jsx(EditCheckInListModal, { onClose: closeEditModal, checkInListId: selectedCheckInListId })
  ] });
};
const CheckInLists = () => {
  var _a, _b;
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const checkInListsQuery = useGetEventCheckInLists(eventId, searchParams);
  const checkInLists = (_a = checkInListsQuery == null ? void 0 : checkInListsQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = checkInListsQuery == null ? void 0 : checkInListsQuery.data) == null ? void 0 : _b.meta;
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "s0FkEx"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "tejfAy"
      }
    ) }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "r9M1hc"
      }
    ), setSearchParams, searchParams }), filterComponent: (pagination == null ? void 0 : pagination.allowed_sorts) ? /* @__PURE__ */ jsx(SortSelector, { selected: searchParams.sortBy && searchParams.sortDirection ? searchParams.sortBy + ":" + searchParams.sortDirection : pagination.default_sort + ":" + pagination.default_sort_direction, options: pagination.allowed_sorts, onSortSelect: (key, sortDirection) => {
      setSearchParams({
        sortBy: key,
        sortDirection
      });
    } }) : void 0, resultCount: pagination == null ? void 0 : pagination.total, resultLabel: i18n._(
      /*i18n*/
      {
        id: "7od0PV"
      }
    ), children: /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", size: "sm", "data-testid": "checkin-list-create-button", onClick: openCreateModal, children: i18n._(
      /*i18n*/
      {
        id: "WVbTwK"
      }
    ) }) }),
    /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !checkInLists || checkInListsQuery.isFetching }),
    checkInLists && /* @__PURE__ */ jsx(CheckInListTable, { checkInLists, openCreateModal, event }),
    createModalOpen && /* @__PURE__ */ jsx(CreateCheckInListModal, { onClose: closeCreateModal }),
    !!(checkInLists == null ? void 0 : checkInLists.length) && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) })
  ] });
};
export {
  CheckInLists as default
};

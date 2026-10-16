import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Badge, Anchor, Avatar, Button, TextInput, Textarea, Text, Modal, Group, Stack, Box, ScrollArea, Popover, Tooltip, ActionIcon } from "@mantine/core";
import { IconUserCog, IconPencil, IconSend, IconMailForward, IconTrash, IconQrcode, IconCheck, IconX, IconCopy, IconNote, IconCalendarEvent, IconClock, IconClipboardList, IconPlus } from "@tabler/icons-react";
import { F as getLocaleName, e as getInitials, H as getProductFromEvent } from "../entry.server.js";
import { useDisclosure, useClipboard } from "@mantine/hooks";
import { useState, useEffect, useMemo } from "react";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { useParams } from "react-router";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { u as useGetEventCheckInLists } from "./useGetCheckInLists-DZb0QIwp.js";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { a as attendeesClient } from "./attendee.client-CeeZ2TBj.js";
import { S as SendMessageModal, u as useGetOrder } from "./index-7RPUkRz0.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useForm } from "@mantine/form";
import { S as SideDrawer, a as SideDrawerHeading, b as SideDrawerStats, E as EntityActionBar, c as SideDrawerSection, d as SideDrawerFields, Q as QuestionList, M as ManageOrderModal, t as toActionMenuGroups } from "./index-DTsqBh8c.js";
import { Trans } from "@lingui/react";
import { notifications } from "@mantine/notifications";
import { M as MessageType, f as ProductType } from "./types-CqPWB-a5.js";
import { G as GET_EVENT_COUNTS_QUERY_KEY } from "./useGetEventCounts-BudQN_tQ.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { A as AttendeeTicket } from "./index-BXVupOij.js";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { I as InputLabelWithHelp } from "./index-R0GQzPHn.js";
import { g as getAttendeeProductTitle } from "./products-BLTGbPdF.js";
import { r as relativeDate, p as prettyDate, f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
import { A as ActionMenu } from "./index-ChciN8SC.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { T as TanStackTable } from "./index-D0pbWAZK.js";
import { C as ColumnVisibilityToggle } from "./index-DuG5BVAJ.js";
import { e as eventOccurrenceClient } from "./event-occurrence.client-xqTaU2Nv.js";
const GET_ATTENDEES_QUERY_KEY = "getAttendees";
const useGetAttendees = (eventId, queryFilters) => {
  return useQuery({
    queryKey: [GET_ATTENDEES_QUERY_KEY, queryFilters, eventId],
    queryFn: async () => await attendeesClient.all(eventId, queryFilters),
    placeholderData: keepPreviousData
  });
};
const GET_ATTENDEE_QUERY_KEY = "getAttendee";
const useGetAttendee = (eventId, attendeeId2) => {
  return useQuery({
    queryKey: [GET_ATTENDEE_QUERY_KEY, eventId, attendeeId2],
    queryFn: async () => {
      const {
        data
      } = await attendeesClient.findById(eventId, attendeeId2);
      return data;
    },
    staleTime: 0,
    gcTime: 0
  });
};
const useUpdateAttendee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attendeeId: attendeeId2,
      attendeeData,
      eventId
    }) => attendeesClient.update(eventId, attendeeId2, attendeeData),
    onSuccess: (_data, variables) => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_ATTENDEES_QUERY_KEY]
      }), queryClient.invalidateQueries({
        queryKey: [GET_ATTENDEE_QUERY_KEY, variables.eventId, variables.attendeeId]
      })]);
    }
  });
};
const useModifyAttendee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attendeeId: attendeeId2,
      attendeeData,
      eventId
    }) => attendeesClient.modify(eventId, attendeeId2, attendeeData),
    onSuccess: () => Promise.all([queryClient.invalidateQueries({
      queryKey: [GET_ATTENDEES_QUERY_KEY]
    }), queryClient.invalidateQueries({
      queryKey: [GET_EVENT_COUNTS_QUERY_KEY]
    })])
  });
};
const useResendAttendeeTicket = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      attendeeId: attendeeId2
    }) => attendeesClient.resendTicket(eventId, attendeeId2)
  });
};
const useAttendeeActions = ({
  eventId,
  onManage,
  onEdit
}) => {
  const [isMessageModalOpen, messageModal] = useDisclosure(false);
  const [selectedAttendee, setSelectedAttendee] = useState();
  const modifyMutation = useModifyAttendee();
  const resendTicketMutation = useResendAttendeeTicket();
  const handleMessage = (attendee) => {
    setSelectedAttendee(attendee);
    messageModal.open();
  };
  const handleResendTicket = (attendee) => {
    resendTicketMutation.mutate({
      attendeeId: attendee.id,
      eventId
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "dtGC3q"
        }
      )),
      onError: (error) => showError(error.response.data.message || i18n._(
        /*i18n*/
        {
          id: "ZQ15eN"
        }
      ))
    });
  };
  const handleCancel = (attendee) => {
    const message = attendee.status === "CANCELLED" ? i18n._(
      /*i18n*/
      {
        id: "q7TRd7"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "/CV2x+"
      }
    );
    confirmationDialog(message, () => {
      modifyMutation.mutate({
        attendeeId: attendee.id,
        eventId,
        attendeeData: {
          status: attendee.status === "CANCELLED" ? "ACTIVE" : "CANCELLED"
        }
      }, {
        onSuccess: () => {
          notifications.show({
            message: /* @__PURE__ */ jsx(Trans, { id: "BJIEiF", values: {
              0: attendee.status === "CANCELLED" ? "activated" : "cancelled"
            } }),
            color: "green"
          });
        },
        onError: () => showError(i18n._(
          /*i18n*/
          {
            id: "9xAp/j"
          }
        ))
      });
    });
  };
  const getAttendeeActions = (attendee) => {
    const isCancelled = attendee.status === "CANCELLED";
    const actions2 = [!!onManage && {
      key: "manage",
      label: i18n._(
        /*i18n*/
        {
          id: "onpJrA"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconUserCog, { size: 14 }),
      onClick: () => onManage(attendee),
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
      onClick: () => onEdit(attendee),
      group: "primary",
      dataTestId: "attendee-edit-button"
    }, {
      key: "message",
      label: i18n._(
        /*i18n*/
        {
          id: "l5OcwO"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconSend, { size: 14 }),
      onClick: () => handleMessage(attendee),
      group: "primary"
    }, attendee.status === "ACTIVE" && {
      key: "resend",
      label: i18n._(
        /*i18n*/
        {
          id: "dFuEhO"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconMailForward, { size: 14 }),
      onClick: () => handleResendTicket(attendee),
      group: "primary"
    }, {
      key: "cancel",
      label: isCancelled ? i18n._(
        /*i18n*/
        {
          id: "FQBaXG"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      ) + ` ` + i18n._(
        /*i18n*/
        {
          id: "5AnPaO"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconTrash, { size: 14 }),
      onClick: () => handleCancel(attendee),
      group: "danger",
      color: isCancelled ? "green" : "red"
    }];
    return actions2.filter(Boolean);
  };
  const attendeeActionModals = selectedAttendee && isMessageModalOpen && /* @__PURE__ */ jsx(SendMessageModal, { onClose: messageModal.close, orderId: selectedAttendee.order_id, attendeeId: selectedAttendee.id, messageType: MessageType.IndividualAttendees, eventOccurrenceId: selectedAttendee.event_occurrence_id });
  return {
    getAttendeeActions,
    attendeeActionModals,
    openMessageModal: handleMessage
  };
};
const reference = "_reference_1ft6f_1";
const actions = "_actions_1ft6f_5";
const form = "_form_1ft6f_9";
const notes = "_notes_1ft6f_13";
const classes$2 = {
  reference,
  actions,
  form,
  notes
};
const AttendeeStatusBadge = ({
  attendee,
  noStyle = false
}) => {
  let color;
  switch (attendee.status) {
    case "AWAITING_PAYMENT":
      color = "orange";
      break;
    case "CANCELLED":
      color = "red";
      break;
    case "ACTIVE":
    default:
      color = "green";
      break;
  }
  const statusLabels = {
    "ACTIVE": i18n._(
      /*i18n*/
      {
        id: "F6pfE9"
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
    )
  };
  const status = statusLabels[attendee.status] || attendee.status.replace("_", " ");
  if (noStyle) {
    return /* @__PURE__ */ jsx("span", { style: {
      color
    }, children: status });
  }
  return /* @__PURE__ */ jsx(Badge, { variant: "light", color, children: status });
};
const FORM_ID = "manage-attendee-form";
const ManageAttendeeModal = ({
  onClose,
  attendeeId: attendeeId2
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: attendee,
    refetch: refetchAttendee
  } = useGetAttendee(eventId, attendeeId2);
  const {
    data: order
  } = useGetOrder(eventId, attendee == null ? void 0 : attendee.order_id);
  const {
    data: event
  } = useGetEvent(eventId);
  const errorHandler = useFormErrorResponseHandler();
  const mutation = useUpdateAttendee();
  const {
    getAttendeeActions,
    attendeeActionModals
  } = useAttendeeActions({
    eventId,
    onEdit: () => setIsEditing(true)
  });
  const form2 = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      notes: "",
      product_id: "",
      product_price_id: ""
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  useEffect(() => {
    if (attendee) {
      form2.initialize({
        first_name: attendee.first_name,
        last_name: attendee.last_name,
        email: attendee.email,
        notes: attendee.notes || "",
        product_id: String(attendee.product_id),
        product_price_id: attendee.product_price_id ? String(attendee.product_price_id) : ""
      });
    }
  }, [attendee]);
  useEffect(() => {
    var _a, _b, _c, _d;
    if (!form2.values.product_id) {
      return;
    }
    let productPriceId = (_d = (_c = (_b = (_a = event == null ? void 0 : event.product_categories) == null ? void 0 : _a.flatMap((category) => category.products).find((product) => String(product == null ? void 0 : product.id) === String(form2.values.product_id))) == null ? void 0 : _b.prices) == null ? void 0 : _c[0]) == null ? void 0 : _d.id;
    form2.setValues({
      ...form2.values,
      product_price_id: productPriceId ? String(productPriceId) : ""
    });
  }, [form2.values.product_id]);
  if (!attendee || !order || !event) {
    return /* @__PURE__ */ jsx(SideDrawer, { opened: true, onClose, loading: true });
  }
  const handleSubmit = (values) => {
    mutation.mutate({
      attendeeId: attendeeId2,
      eventId,
      attendeeData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "J3RJSZ"
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
  const fullName = `${attendee.first_name} ${attendee.last_name}`;
  const questionAnswers = attendee.question_answers ?? [];
  const checkIns = attendee.check_ins ?? [];
  const stats = [{
    label: i18n._(
      /*i18n*/
      {
        id: "kjAL4v"
      }
    ),
    value: getAttendeeProductTitle(attendee, attendee.product)
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    value: /* @__PURE__ */ jsx(AttendeeStatusBadge, { attendee })
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "Y3FYXy"
      }
    ),
    value: checkIns.length > 0 ? relativeDate(checkIns[0].created_at) : i18n._(
      /*i18n*/
      {
        id: "Itw24Q"
      }
    )
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "UYUgdb"
      }
    ),
    value: /* @__PURE__ */ jsx(Anchor, { className: classes$2.reference, onClick: () => setShowOrder(true), children: order.public_id })
  }];
  const fields = [{
    label: i18n._(
      /*i18n*/
      {
        id: "O3oNi5"
      }
    ),
    value: /* @__PURE__ */ jsx(Anchor, { href: "mailto:" + attendee.email, target: "_blank", children: attendee.email })
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "vXIe7J"
      }
    ),
    value: getLocaleName(attendee.locale)
  }, ...checkIns.length > 0 ? [{
    label: i18n._(
      /*i18n*/
      {
        id: "7B5M35"
      }
    ),
    value: checkIns.map((checkIn) => {
      var _a;
      return /* @__PURE__ */ jsxs("div", { children: [
        (_a = checkIn.check_in_list) == null ? void 0 : _a.name,
        " · ",
        relativeDate(checkIn.created_at)
      ] }, checkIn.id);
    })
  }] : []];
  const header = /* @__PURE__ */ jsx(SideDrawerHeading, { media: /* @__PURE__ */ jsx(Avatar, { size: 42, radius: "xl", variant: "light", color: "primary", children: getInitials(fullName) }), title: /* @__PURE__ */ jsx("span", { children: fullName }), subtitle: /* @__PURE__ */ jsx("span", { children: attendee.email }) });
  const footer = isEditing && /* @__PURE__ */ jsxs(Fragment, { children: [
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
  return /* @__PURE__ */ jsxs(SideDrawer, { opened: true, onClose, header, footer, children: [
    isEditing ? /* @__PURE__ */ jsxs("form", { id: FORM_ID, onSubmit: form2.onSubmit(handleSubmit), className: classes$2.form, children: [
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
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { ...form2.getInputProps("email"), label: i18n._(
          /*i18n*/
          {
            id: "ATGYL1"
          }
        ), placeholder: "homer@simpson.com", required: true }),
        (event == null ? void 0 : event.product_categories) && event.product_categories.length > 0 && /* @__PURE__ */ jsx(ProductSelector, { placeholder: i18n._(
          /*i18n*/
          {
            id: "ixIx1f"
          }
        ), label: i18n._(
          /*i18n*/
          {
            id: "K47k8R"
          }
        ), productCategories: event.product_categories, form: form2, productFieldName: "product_id", includedProductTypes: [ProductType.Ticket], multiSelect: false, showTierSelector: true })
      ] }),
      /* @__PURE__ */ jsx(Textarea, { label: /* @__PURE__ */ jsx(InputLabelWithHelp, { label: i18n._(
        /*i18n*/
        {
          id: "1DBGsz"
        }
      ), helpText: i18n._(
        /*i18n*/
        {
          id: "0/vPdA"
        }
      ) }), ...form2.getInputProps("notes"), placeholder: i18n._(
        /*i18n*/
        {
          id: "Or1CPR"
        }
      ), minRows: 3, maxRows: 6, autosize: true })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SideDrawerStats, { stats }),
      /* @__PURE__ */ jsx("div", { className: classes$2.actions, children: /* @__PURE__ */ jsx(EntityActionBar, { actions: getAttendeeActions(attendee) }) }),
      /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "URmyfc"
        }
      ), children: /* @__PURE__ */ jsx(SideDrawerFields, { fields }) }),
      attendee.notes && /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "1DBGsz"
        }
      ), children: /* @__PURE__ */ jsx(Text, { size: "sm", className: classes$2.notes, children: attendee.notes }) }),
      attendee.product && /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "kjAL4v"
        }
      ), children: /* @__PURE__ */ jsx(AttendeeTicket, { event, attendee, product: attendee.product }) }),
      questionAnswers.length > 0 && /* @__PURE__ */ jsx(SideDrawerSection, { title: i18n._(
        /*i18n*/
        {
          id: "ROv2ZT"
        }
      ), count: questionAnswers.length, children: /* @__PURE__ */ jsx(QuestionList, { hideProductTitle: true, onEditAnswer: refetchAttendee, questions: questionAnswers }) })
    ] }),
    attendeeActionModals,
    showOrder && /* @__PURE__ */ jsx(ManageOrderModal, { orderId: attendee.order_id, onClose: () => setShowOrder(false) })
  ] });
};
const listItem = "_listItem_wmv9y_1";
const classes$1 = {
  listItem
};
const CheckInStatusModal = ({
  attendee,
  eventTimezone,
  eventId,
  isOpen,
  onClose
}) => {
  const {
    data: checkInListsResponse,
    isLoading
  } = useGetEventCheckInLists(eventId);
  if (isLoading) {
    return /* @__PURE__ */ jsxs(Modal.Root, { opened: isOpen, onClose, size: "md", children: [
      /* @__PURE__ */ jsx(Modal.Overlay, {}),
      /* @__PURE__ */ jsxs(Modal.Content, { children: [
        /* @__PURE__ */ jsxs(Modal.Header, { children: [
          /* @__PURE__ */ jsx(Modal.Title, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsx(IconQrcode, { size: 20 }),
            /* @__PURE__ */ jsx(Trans, { id: "qCqdg6" })
          ] }) }),
          /* @__PURE__ */ jsx(Modal.CloseButton, {})
        ] }),
        /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx("div", { style: {
          position: "relative",
          minHeight: "200px"
        }, children: /* @__PURE__ */ jsx(LoadingMask, {}) }) })
      ] })
    ] });
  }
  const allCheckInLists = (checkInListsResponse == null ? void 0 : checkInListsResponse.data) || [];
  const checkInLists = allCheckInLists.filter((list) => !list.event_occurrence_id || list.event_occurrence_id === attendee.event_occurrence_id);
  const attendeeCheckIns = attendee.check_ins || [];
  const getCheckInForList = (listId) => {
    return attendeeCheckIns.find((ci) => ci.check_in_list_id === listId && (!attendee.event_occurrence_id || ci.event_occurrence_id === attendee.event_occurrence_id));
  };
  const isAttendeeEligibleForList = (list) => {
    if (!list.products || list.products.length === 0) {
      return true;
    }
    return list.products.some((product) => product.id === attendee.product_id);
  };
  const eligibleLists = checkInLists.filter((list) => isAttendeeEligibleForList(list));
  const ineligibleLists = checkInLists.filter((list) => !isAttendeeEligibleForList(list));
  const renderListItem = (list, isEligible) => {
    const checkIn = getCheckInForList(list.id);
    const isCheckedIn = !!checkIn;
    return /* @__PURE__ */ jsx(Box, { className: classes$1.listItem, style: {
      opacity: isEligible ? 1 : 0.6,
      borderColor: isEligible ? "var(--mantine-color-gray-2)" : "var(--mantine-color-gray-1)"
    }, children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", wrap: "nowrap", children: [
      /* @__PURE__ */ jsxs(Group, { gap: "sm", style: {
        flex: 1
      }, children: [
        isEligible ? isCheckedIn ? /* @__PURE__ */ jsx(IconCheck, { size: 20, color: "var(--mantine-color-green-6)" }) : /* @__PURE__ */ jsx(IconX, { size: 20, color: "var(--mantine-color-gray-5)" }) : /* @__PURE__ */ jsx(IconX, { size: 20, color: "var(--mantine-color-gray-4)" }),
        /* @__PURE__ */ jsxs(Box, { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: list.name }),
          isCheckedIn && checkIn.created_at && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: prettyDate(checkIn.created_at, eventTimezone) }),
          !isEligible && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "x8Vnvf" }) })
        ] })
      ] }),
      isEligible ? /* @__PURE__ */ jsx(Badge, { variant: "light", color: isCheckedIn ? "green" : "gray", size: "sm", children: isCheckedIn ? i18n._(
        /*i18n*/
        {
          id: "CRu4lK"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "x5+Lcz"
        }
      ) }) : /* @__PURE__ */ jsx(Badge, { variant: "light", color: "gray", size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "8n10sz"
        }
      ) })
    ] }) }, list.id);
  };
  return /* @__PURE__ */ jsxs(Modal.Root, { opened: isOpen, onClose, size: "md", children: [
    /* @__PURE__ */ jsx(Modal.Overlay, {}),
    /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsxs(Modal.Header, { children: [
        /* @__PURE__ */ jsx(Modal.Title, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(IconQrcode, { size: 20 }),
          /* @__PURE__ */ jsx(Trans, { id: "qCqdg6" })
        ] }) }),
        /* @__PURE__ */ jsx(Modal.CloseButton, {})
      ] }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxs(Box, { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: "xs", children: /* @__PURE__ */ jsx(Trans, { id: "xYxQCZ", values: {
            0: attendee.first_name,
            1: attendee.last_name
          } }) }),
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: attendee.public_id })
        ] }),
        checkInLists.length === 0 ? /* @__PURE__ */ jsx(Text, { c: "dimmed", ta: "center", py: "xl", children: /* @__PURE__ */ jsx(Trans, { id: "99ntUF" }) }) : /* @__PURE__ */ jsx(ScrollArea, { h: Math.min(checkInLists.length * 100, 400), children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
          eligibleLists.length > 0 && /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", children: /* @__PURE__ */ jsx(Trans, { id: "zPiC+q" }) }),
            eligibleLists.map((list) => renderListItem(list, true))
          ] }),
          ineligibleLists.length > 0 && /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", children: /* @__PURE__ */ jsx(Trans, { id: "RsiDDQ" }) }),
            ineligibleLists.map((list) => renderListItem(list, false))
          ] })
        ] }) })
      ] }) })
    ] })
  ] });
};
const attendeeDetails = "_attendeeDetails_s3rcv_1";
const nameRow = "_nameRow_s3rcv_9";
const attendeeName = "_attendeeName_s3rcv_23";
const attendeeId = "_attendeeId_s3rcv_41";
const emailRow = "_emailRow_s3rcv_48";
const attendeeEmail = "_attendeeEmail_s3rcv_54";
const emailActions = "_emailActions_s3rcv_64";
const actionIcon = "_actionIcon_s3rcv_71";
const orderTicketContainer = "_orderTicketContainer_s3rcv_75";
const ticketName = "_ticketName_s3rcv_81";
const occurrenceChip = "_occurrenceChip_s3rcv_91";
const orderId = "_orderId_s3rcv_101";
const registrationDate = "_registrationDate_s3rcv_111";
const checkInButton = "_checkInButton_s3rcv_117";
const checkedIn = "_checkedIn_s3rcv_130";
const notCheckedIn = "_notCheckedIn_s3rcv_135";
const statusBadge = "_statusBadge_s3rcv_139";
const actionsMenu = "_actionsMenu_s3rcv_162";
const classes = {
  attendeeDetails,
  nameRow,
  attendeeName,
  attendeeId,
  emailRow,
  attendeeEmail,
  emailActions,
  actionIcon,
  orderTicketContainer,
  ticketName,
  occurrenceChip,
  orderId,
  registrationDate,
  checkInButton,
  checkedIn,
  notCheckedIn,
  statusBadge,
  actionsMenu
};
const AttendeeTable = ({
  attendees,
  openCreateModal,
  compact,
  occurrenceId
}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const [isViewModalOpen, viewModalOpen] = useDisclosure(false);
  const [isCheckInModalOpen, checkInModal] = useDisclosure(false);
  const [isOrderModalOpen, orderModal] = useDisclosure(false);
  const [emailPopoverId, setEmailPopoverId] = useState(null);
  const [selectedAttendee, setSelectedAttendee] = useState();
  const [selectedOrderId, setSelectedOrderId] = useState();
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: checkInLists
  } = useGetEventCheckInLists(eventId);
  const clipboard = useClipboard({
    timeout: 2e3
  });
  const {
    getAttendeeActions,
    attendeeActionModals,
    openMessageModal
  } = useAttendeeActions({
    eventId,
    onManage: (attendee) => handleModalClick(attendee, viewModalOpen)
  });
  const relevantCheckInLists = ((_a = checkInLists == null ? void 0 : checkInLists.data) == null ? void 0 : _a.filter((list) => !occurrenceId || !list.event_occurrence_id || list.event_occurrence_id === Number(occurrenceId))) || [];
  const hasCheckInLists = relevantCheckInLists.length > 0;
  const handleModalClick = (attendee, modal) => {
    setSelectedAttendee(attendee);
    modal.open();
  };
  const getCheckInCount = (attendee) => {
    if (!attendee.check_ins) return 0;
    if (!occurrenceId) return attendee.check_ins.length;
    return attendee.check_ins.filter((ci) => ci.event_occurrence_id === Number(occurrenceId)).length;
  };
  const hasCheckIns = (attendee) => {
    return getCheckInCount(attendee) > 0;
  };
  const handleCopyEmail = (email) => {
    clipboard.copy(email);
    showSuccess(i18n._(
      /*i18n*/
      {
        id: "hbwCKE"
      }
    ));
    setEmailPopoverId(null);
  };
  const handleMessageFromEmail = (attendee) => {
    setEmailPopoverId(null);
    openMessageModal(attendee);
  };
  const handleOrderClick = (orderId2) => {
    setSelectedOrderId(orderId2);
    orderModal.open();
  };
  const columns = useMemo(() => {
    const allColumns = [{
      id: "attendeeDetails",
      header: i18n._(
        /*i18n*/
        {
          id: "m0CFV2"
        }
      ),
      enableHiding: false,
      cell: (info) => /* @__PURE__ */ jsxs(Group, { gap: "sm", wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(Avatar, { size: 44, radius: 10, color: "primary", variant: "light", children: getInitials(info.row.original.first_name + " " + info.row.original.last_name) }),
        /* @__PURE__ */ jsxs("div", { className: classes.attendeeDetails, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.nameRow, children: [
            /* @__PURE__ */ jsx(Anchor, { className: classes.attendeeName, onClick: () => handleModalClick(info.row.original, viewModalOpen), style: {
              cursor: "pointer"
            }, children: /* @__PURE__ */ jsx(Truncate, { length: 30, text: info.row.original.first_name + " " + info.row.original.last_name }) }),
            /* @__PURE__ */ jsx("div", { className: classes.attendeeId, children: info.row.original.public_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.emailRow, children: [
            /* @__PURE__ */ jsxs(Popover, { opened: emailPopoverId === info.row.original.id, onChange: (opened) => {
              if (!opened) setEmailPopoverId(null);
            }, width: 200, position: "bottom", withArrow: true, shadow: "md", children: [
              /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsx(Anchor, { onClick: () => setEmailPopoverId(info.row.original.id || null), className: classes.attendeeEmail, style: {
                cursor: "pointer"
              }, children: info.row.original.email }) }),
              /* @__PURE__ */ jsx(Popover.Dropdown, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", style: {
                flexDirection: "column",
                width: "100%"
              }, children: [
                /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "light", leftSection: /* @__PURE__ */ jsx(IconSend, { size: 16 }), onClick: () => handleMessageFromEmail(info.row.original), children: i18n._(
                  /*i18n*/
                  {
                    id: "xDAtGP"
                  }
                ) }),
                /* @__PURE__ */ jsx(Button, { fullWidth: true, variant: "light", color: "gray", leftSection: /* @__PURE__ */ jsx(IconCopy, { size: 16 }), onClick: () => handleCopyEmail(info.row.original.email), children: i18n._(
                  /*i18n*/
                  {
                    id: "ZN1WLO"
                  }
                ) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: classes.emailActions, children: info.row.original.notes && /* @__PURE__ */ jsx(Tooltip, { label: info.row.original.notes.length > 100 ? i18n._(
              /*i18n*/
              {
                id: "CySr+W"
              }
            ) : info.row.original.notes, multiline: true, w: info.row.original.notes.length > 100 ? "auto" : 300, withArrow: true, children: /* @__PURE__ */ jsx(ActionIcon, { className: classes.actionIcon, size: "xs", variant: "subtle", color: "green", onClick: () => {
              if (info.row.original.notes && info.row.original.notes.length > 100) {
                handleModalClick(info.row.original, viewModalOpen);
              }
            }, children: /* @__PURE__ */ jsx(IconNote, { size: 16 }) }) }) })
          ] })
        ] })
      ] }),
      meta: {
        headerStyle: {
          minWidth: 300
        }
      }
    }, {
      id: "orderAndTicket",
      header: i18n._(
        /*i18n*/
        {
          id: "c/TIyD"
        }
      ),
      enableHiding: true,
      cell: (info) => {
        var _a2, _b, _c;
        const attendee = info.row.original;
        const ticketTitle = (_a2 = getProductFromEvent(attendee.product_id, event)) == null ? void 0 : _a2.title;
        const occurrence = attendee.event_occurrence;
        return /* @__PURE__ */ jsxs("div", { className: classes.orderTicketContainer, children: [
          /* @__PURE__ */ jsx("div", { className: classes.ticketName, children: /* @__PURE__ */ jsx(Truncate, { text: ticketTitle, length: 25 }) }),
          occurrence && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsxs("span", { className: classes.occurrenceChip, children: [
            /* @__PURE__ */ jsx(IconCalendarEvent, { size: 12 }),
            formatDateWithLocale(occurrence.start_date, "shortDate", event.timezone),
            " ",
            formatDateWithLocale(occurrence.start_date, "timeOnly", event.timezone),
            occurrence.label && ` · ${occurrence.label}`
          ] }),
          /* @__PURE__ */ jsx("div", { className: classes.orderId, children: /* @__PURE__ */ jsx(Anchor, { onClick: () => handleOrderClick(attendee.order_id), style: {
            cursor: "pointer",
            color: "inherit",
            textDecoration: "none"
          }, children: (_b = attendee.order) == null ? void 0 : _b.public_id }) }),
          ((_c = attendee.order) == null ? void 0 : _c.created_at) && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsx("div", { className: classes.registrationDate, children: prettyDate(attendee.order.created_at, event.timezone) })
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
        const attendee = info.row.original;
        return /* @__PURE__ */ jsxs("div", { className: classes.statusBadge, "data-status": attendee.status, children: [
          attendee.status === "ACTIVE" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(IconCheck, { size: 14 }),
            i18n._(
              /*i18n*/
              {
                id: "F6pfE9"
              }
            )
          ] }),
          attendee.status === "AWAITING_PAYMENT" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(IconClock, { size: 14 }),
            i18n._(
              /*i18n*/
              {
                id: "ioG+xt"
              }
            )
          ] }),
          attendee.status === "CANCELLED" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(IconX, { size: 14 }),
            i18n._(
              /*i18n*/
              {
                id: "vv7kpg"
              }
            )
          ] })
        ] });
      },
      meta: {
        headerStyle: {
          minWidth: 120
        }
      }
    }, {
      id: "checkIn",
      header: i18n._(
        /*i18n*/
        {
          id: "qCqdg6"
        }
      ),
      enableHiding: true,
      cell: (info) => {
        const checkInCount = getCheckInCount(info.row.original);
        const hasChecked = hasCheckIns(info.row.original);
        const totalLists = relevantCheckInLists.length;
        return /* @__PURE__ */ jsx("button", { className: `${classes.checkInButton} ${hasChecked ? classes.checkedIn : classes.notCheckedIn}`, onClick: () => handleModalClick(info.row.original, checkInModal), children: hasChecked ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconCheck, { size: 16 }),
          i18n._(
            /*i18n*/
            {
              id: "CRu4lK"
            }
          ),
          " (",
          checkInCount,
          "/",
          totalLists,
          ")"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconClipboardList, { size: 16 }),
          i18n._(
            /*i18n*/
            {
              id: "x5+Lcz"
            }
          )
        ] }) });
      },
      meta: {
        headerStyle: {
          width: 80,
          textAlign: "center"
        },
        cellStyle: {
          textAlign: "center"
        }
      }
    }, {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: (info) => /* @__PURE__ */ jsx("div", { className: classes.actionsMenu, children: /* @__PURE__ */ jsx(ActionMenu, { dataTestId: "attendee-actions-trigger", itemsGroups: toActionMenuGroups(getAttendeeActions(info.row.original)) }) }),
      meta: {
        sticky: "right",
        cellStyle: {
          paddingRight: 0
        }
      }
    }];
    return allColumns.filter((column) => {
      if (column.id === "checkIn" && !hasCheckInLists) {
        return false;
      }
      return true;
    });
  }, [emailPopoverId, event, hasCheckInLists, relevantCheckInLists, occurrenceId]);
  if (attendees.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "Wjz5KP"
      }
    ), imageHref: "/blank-slate/attendees.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "veessc"
        }
      ) }),
      openCreateModal && /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
        /*i18n*/
        {
          id: "Dim4LO"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TanStackTable, { data: attendees, columns, storageKey: "attendee-table", enableColumnVisibility: !compact, renderColumnVisibilityToggle: !compact ? (table) => /* @__PURE__ */ jsx(ColumnVisibilityToggle, { table }) : void 0, hideHeader: compact, noCard: compact }),
    attendeeActionModals,
    (selectedAttendee == null ? void 0 : selectedAttendee.id) && isViewModalOpen && /* @__PURE__ */ jsx(ManageAttendeeModal, { attendeeId: selectedAttendee.id, onClose: viewModalOpen.close }),
    selectedAttendee && isCheckInModalOpen && (event == null ? void 0 : event.timezone) && /* @__PURE__ */ jsx(CheckInStatusModal, { attendee: selectedAttendee, eventTimezone: event.timezone, eventId, isOpen: isCheckInModalOpen, onClose: checkInModal.close }),
    selectedOrderId && isOrderModalOpen && /* @__PURE__ */ jsx(ManageOrderModal, { orderId: selectedOrderId, onClose: orderModal.close })
  ] });
};
const GET_PRICE_OVERRIDES_QUERY_KEY = "getPriceOverrides";
const useGetPriceOverrides = (eventId, occurrenceId) => {
  return useQuery({
    queryKey: [GET_PRICE_OVERRIDES_QUERY_KEY, eventId, occurrenceId],
    queryFn: async () => {
      const {
        data
      } = await eventOccurrenceClient.getPriceOverrides(eventId, occurrenceId);
      return data;
    },
    staleTime: 3e4,
    enabled: !!occurrenceId
  });
};
export {
  AttendeeTable as A,
  GET_ATTENDEES_QUERY_KEY as G,
  useGetAttendees as a,
  GET_PRICE_OVERRIDES_QUERY_KEY as b,
  useGetPriceOverrides as u
};

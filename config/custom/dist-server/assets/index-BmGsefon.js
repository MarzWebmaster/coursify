import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { Trans } from "@lingui/react";
import { TextInput, Switch, Select, Textarea, Stack, Text, CopyButton, Button, Group } from "@mantine/core";
import { E as EventType, f as ProductType } from "./types-CqPWB-a5.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { A as AdvancedOptions } from "./index-CnTFmtaW.js";
import { useMemo, useState, useEffect } from "react";
import { IconEye, IconClipboardText, IconMessageCircleQuestion, IconReceipt2, IconCheck, IconCopy, IconExternalLink, IconPlus } from "@tabler/icons-react";
import { f as formatDateWithLocale } from "./dates-CbVpwZeX.js";
import { useForm } from "@mantine/form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { c as checkInListClient, G as GET_EVENT_CHECK_IN_LISTS_QUERY_KEY } from "./useGetCheckInLists-DZb0QIwp.js";
import { useParams } from "react-router";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
const visibilitySection = "_visibilitySection_1x1qp_1";
const visibilityHeader = "_visibilityHeader_1x1qp_9";
const visibilityIcon = "_visibilityIcon_1x1qp_16";
const visibilityTitle = "_visibilityTitle_1x1qp_29";
const visibilityHint = "_visibilityHint_1x1qp_37";
const visibilityRows = "_visibilityRows_1x1qp_44";
const visibilityRow = "_visibilityRow_1x1qp_44";
const visibilityRowIcon = "_visibilityRowIcon_1x1qp_60";
const visibilityRowMain = "_visibilityRowMain_1x1qp_72";
const visibilityRowLabel = "_visibilityRowLabel_1x1qp_77";
const visibilityRowDesc = "_visibilityRowDesc_1x1qp_83";
const classes = {
  visibilitySection,
  visibilityHeader,
  visibilityIcon,
  visibilityTitle,
  visibilityHint,
  visibilityRows,
  visibilityRow,
  visibilityRowIcon,
  visibilityRowMain,
  visibilityRowLabel,
  visibilityRowDesc
};
const hasAdvancedValuesSet = (form) => {
  return !!(form.values.description || form.values.activates_at || form.values.expires_at || form.values.public_show_attendee_notes === false || form.values.public_show_question_answers === false || form.values.public_show_order_details === false);
};
const CheckInListForm = ({
  form,
  productCategories,
  eventType,
  occurrences,
  timezone,
  isNewForOccurrence,
  hideIntro
}) => {
  const isRecurring = eventType === EventType.RECURRING;
  const activeOccurrences = useMemo(() => {
    if (!isRecurring || !occurrences || !timezone) return [];
    return occurrences.filter((o) => o.status !== "CANCELLED");
  }, [isRecurring, occurrences, timezone]);
  const occurrenceOptions = useMemo(() => {
    if (!activeOccurrences.length || !timezone) return [];
    return activeOccurrences.map((o) => ({
      value: String(o.id),
      label: formatDateWithLocale(o.start_date, "shortDate", timezone) + " " + formatDateWithLocale(o.start_date, "timeOnly", timezone) + (o.label ? ` — ${o.label}` : "")
    }));
  }, [activeOccurrences, timezone]);
  const [showAdvanced, setShowAdvanced] = useState(() => hasAdvancedValuesSet(form));
  const [scopeToAll, setScopeToAll] = useState(() => !form.values.product_ids || form.values.product_ids.length === 0);
  useEffect(() => {
    var _a;
    const hasProducts = (((_a = form.values.product_ids) == null ? void 0 : _a.length) ?? 0) > 0;
    if (hasProducts && scopeToAll) setScopeToAll(false);
  }, [form.values.product_ids]);
  const introTitle = isNewForOccurrence ? i18n._(
    /*i18n*/
    {
      id: "NqfabH"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "fmYxZx"
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !hideIntro && /* @__PURE__ */ jsx(Callout, { variant: "info", title: introTitle, children: /* @__PURE__ */ jsx(Trans, { id: "oPaRES" }) }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("name"), required: true, label: i18n._(
      /*i18n*/
      {
        id: "6YtxFj"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "QIWCnW"
      }
    ) }),
    /* @__PURE__ */ jsx(Switch, { mt: "sm", label: i18n._(
      /*i18n*/
      {
        id: "Ps5oDT"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "9Pf3wk"
      }
    ), checked: scopeToAll, onChange: (e) => {
      const checked = e.currentTarget.checked;
      setScopeToAll(checked);
      if (checked) {
        form.setFieldValue("product_ids", []);
      }
    } }),
    !scopeToAll && /* @__PURE__ */ jsx(ProductSelector, { label: i18n._(
      /*i18n*/
      {
        id: "FVetkT"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "OMX4tH"
      }
    ), productCategories, form, productFieldName: "product_ids", includedProductTypes: [ProductType.Ticket] }),
    isRecurring && occurrenceOptions.length > 0 && /* @__PURE__ */ jsx(Select, { label: i18n._(
      /*i18n*/
      {
        id: "6u1B3O"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "L/hDDD"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "F1/VgK"
      }
    ), data: occurrenceOptions, value: form.values.event_occurrence_id ? String(form.values.event_occurrence_id) : null, onChange: (val) => form.setFieldValue("event_occurrence_id", val ? Number(val) : null), clearable: true }),
    /* @__PURE__ */ jsxs(AdvancedOptions, { opened: showAdvanced, onToggle: () => setShowAdvanced((v) => !v), children: [
      /* @__PURE__ */ jsx(Textarea, { ...form.getInputProps("description"), label: i18n._(
        /*i18n*/
        {
          id: "YC3oXa"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "/PN1DA"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "OJLTEL"
        }
      ), minRows: 3, autosize: true }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("activates_at"), type: "datetime-local", label: i18n._(
          /*i18n*/
          {
            id: "5T2HxQ"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "XIG669"
          }
        ) }),
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("expires_at"), type: "datetime-local", label: i18n._(
          /*i18n*/
          {
            id: "sZg7s1"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "bcYlvb"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.visibilitySection, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.visibilityHeader, children: [
          /* @__PURE__ */ jsx("div", { className: classes.visibilityIcon, children: /* @__PURE__ */ jsx(IconEye, { size: 16 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: classes.visibilityTitle, children: i18n._(
              /*i18n*/
              {
                id: "0WyYF4"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: classes.visibilityHint, children: /* @__PURE__ */ jsx(Trans, { id: "kkVyZZ" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.visibilityRows, children: [
          /* @__PURE__ */ jsxs("label", { className: classes.visibilityRow, children: [
            /* @__PURE__ */ jsx("div", { className: classes.visibilityRowIcon, children: /* @__PURE__ */ jsx(IconClipboardText, { size: 16 }) }),
            /* @__PURE__ */ jsxs("div", { className: classes.visibilityRowMain, children: [
              /* @__PURE__ */ jsx("div", { className: classes.visibilityRowLabel, children: i18n._(
                /*i18n*/
                {
                  id: "sjPjOg"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: classes.visibilityRowDesc, children: i18n._(
                /*i18n*/
                {
                  id: "I8eJ6/"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Switch, { size: "md", ...form.getInputProps("public_show_attendee_notes", {
              type: "checkbox"
            }), "aria-label": i18n._(
              /*i18n*/
              {
                id: "wXi9pZ"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: classes.visibilityRow, children: [
            /* @__PURE__ */ jsx("div", { className: classes.visibilityRowIcon, children: /* @__PURE__ */ jsx(IconMessageCircleQuestion, { size: 16 }) }),
            /* @__PURE__ */ jsxs("div", { className: classes.visibilityRowMain, children: [
              /* @__PURE__ */ jsx("div", { className: classes.visibilityRowLabel, children: i18n._(
                /*i18n*/
                {
                  id: "biEyJ4"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: classes.visibilityRowDesc, children: i18n._(
                /*i18n*/
                {
                  id: "GK7Lnt"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Switch, { size: "md", ...form.getInputProps("public_show_question_answers", {
              type: "checkbox"
            }), "aria-label": i18n._(
              /*i18n*/
              {
                id: "+RoWKN"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: classes.visibilityRow, children: [
            /* @__PURE__ */ jsx("div", { className: classes.visibilityRowIcon, children: /* @__PURE__ */ jsx(IconReceipt2, { size: 16 }) }),
            /* @__PURE__ */ jsxs("div", { className: classes.visibilityRowMain, children: [
              /* @__PURE__ */ jsx("div", { className: classes.visibilityRowLabel, children: i18n._(
                /*i18n*/
                {
                  id: "xtQzag"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: classes.visibilityRowDesc, children: i18n._(
                /*i18n*/
                {
                  id: "eJ8SvM"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Switch, { size: "md", ...form.getInputProps("public_show_order_details", {
              type: "checkbox"
            }), "aria-label": i18n._(
              /*i18n*/
              {
                id: "Eut7p9"
              }
            ) })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const useCreateCheckInList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      checkInListData,
      eventId
    }) => checkInListClient.create(eventId, checkInListData),
    onSuccess: (_, variables) => queryClient.invalidateQueries({
      queryKey: [GET_EVENT_CHECK_IN_LISTS_QUERY_KEY, variables.eventId]
    })
  });
};
const CheckInListSuccessModal = ({
  onClose,
  checkInListName,
  checkInListShortId
}) => {
  const checkInUrl = `${window.location.origin}/check-in/${checkInListShortId}`;
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "9gPPUY"
    }
  ) + " 🎉", size: "sm", children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsx(Text, { size: "sm", children: i18n._(
      /*i18n*/
      {
        id: "79lXGw"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: 4, children: checkInListName }),
      /* @__PURE__ */ jsx(TextInput, { value: checkInUrl, readOnly: true, rightSection: /* @__PURE__ */ jsx(CopyButton, { value: checkInUrl, children: ({
        copied,
        copy
      }) => /* @__PURE__ */ jsx(Button, { size: "compact-sm", variant: "subtle", onClick: copy, leftSection: copied ? /* @__PURE__ */ jsx(IconCheck, { size: 14 }) : /* @__PURE__ */ jsx(IconCopy, { size: 14 }), children: copied ? i18n._(
        /*i18n*/
        {
          id: "6V3Ea3"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "he3ygx"
        }
      ) }) }) })
    ] }),
    /* @__PURE__ */ jsxs(Group, { grow: true, children: [
      /* @__PURE__ */ jsx(Button, { variant: "light", leftSection: /* @__PURE__ */ jsx(IconExternalLink, { size: 16 }), onClick: () => window.open(checkInUrl, "_blank"), children: i18n._(
        /*i18n*/
        {
          id: "Qqqrwa"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { onClick: onClose, children: i18n._(
        /*i18n*/
        {
          id: "DPfwMq"
        }
      ) })
    ] })
  ] }) });
};
const CreateCheckInListModal = ({
  onClose,
  initialOccurrenceId
}) => {
  const {
    eventId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: event
  } = useGetEvent(eventId);
  const [createdCheckInList, setCreatedCheckInList] = useState(null);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      expires_at: "",
      activates_at: "",
      product_ids: [],
      event_occurrence_id: initialOccurrenceId ?? null,
      public_show_attendee_notes: true,
      public_show_question_answers: true,
      public_show_order_details: true
    }
  });
  const createMutation = useCreateCheckInList();
  const eventHasTickets = (event == null ? void 0 : event.product_categories) && event.product_categories.some((category) => category.products.length > 0) && event.product_categories.filter((category) => {
    var _a;
    return ((_a = category == null ? void 0 : category.products) == null ? void 0 : _a.filter((product) => product.product_type === "TICKET").length) > 0;
  }).length > 0;
  const handleSubmit = (requestData) => {
    createMutation.mutate({
      eventId,
      checkInListData: requestData
    }, {
      onSuccess: (response) => {
        setCreatedCheckInList(response.data);
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  const NoProducts = () => {
    return /* @__PURE__ */ jsx(NoResultsSplash, { imageHref: "/blank-slate/tickets.svg", heading: i18n._(
      /*i18n*/
      {
        id: "cdR8d6"
      }
    ), subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "L/+xOk"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => window.location.href = `/manage/event/${eventId}/products/#create-product`, children: i18n._(
        /*i18n*/
        {
          id: "n5pRtF"
        }
      ) })
    ] }) });
  };
  if (createdCheckInList) {
    return /* @__PURE__ */ jsx(CheckInListSuccessModal, { onClose, checkInListName: createdCheckInList.name, checkInListShortId: createdCheckInList.short_id });
  }
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: null, children: [
    !eventHasTickets && /* @__PURE__ */ jsx(NoProducts, {}),
    eventHasTickets && /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
      event && /* @__PURE__ */ jsx(CheckInListForm, { form, productCategories: event.product_categories, eventType: event.type, occurrences: event.occurrences, timezone: event.timezone, isNewForOccurrence: !!initialOccurrenceId }),
      /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, loading: createMutation.isPending, mt: "md", "data-testid": "checkin-list-submit-button", children: i18n._(
        /*i18n*/
        {
          id: "WVbTwK"
        }
      ) })
    ] })
  ] });
};
export {
  CreateCheckInListModal as C,
  CheckInListForm as a
};

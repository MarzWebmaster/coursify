import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { TextInput, Group, Tooltip, ActionIcon, Grid, Switch, Button } from "@mantine/core";
import { E as EventType, L as LocationType, b as EventStatus, Q as QueryFilterOperator } from "./types-CqPWB-a5.js";
import { useNavigate, NavLink, useParams } from "react-router";
import { IconCheckbox, IconSquare, IconEye, IconSettings, IconCopy, IconArchive, IconRepeat, IconDotsVertical } from "@tabler/icons-react";
import { a as eventHomepagePath } from "./urlHelper-CsaWRwIV.js";
import { useDisclosure } from "@mantine/hooks";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { h as eventsClient, j as formatNumber } from "../entry.server.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { useEffect, useState } from "react";
import { u as utcToTz, i as isValidDate, f as formatDateWithLocale, r as relativeDate$1 } from "./dates-CbVpwZeX.js";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { A as ActionMenu } from "./index-ChciN8SC.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { u as useUpdateEventStatus } from "./useUpdateEventStatus-Ck9Vcq_R.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { s as summariseEventLocations } from "./effectiveLocation-BzDgAlu_.js";
import { f as formatAddress } from "./addressUtilities-7xIQim0X.js";
const eventCard = "_eventCard_2npm7_1";
const title = "_title_2npm7_12";
const isDraft = "_isDraft_2npm7_15";
const isEnded = "_isEnded_2npm7_22";
const image = "_image_2npm7_28";
const cardLink = "_cardLink_2npm7_32";
const imageContainer = "_imageContainer_2npm7_46";
const placeholderImage = "_placeholderImage_2npm7_67";
const imageOverlay = "_imageOverlay_2npm7_75";
const placeholderOverlay = "_placeholderOverlay_2npm7_81";
const statusBadge = "_statusBadge_2npm7_85";
const pulseDot = "_pulseDot_2npm7_118";
const pulse = "_pulse_2npm7_118";
const dateBadge = "_dateBadge_2npm7_134";
const dateDay = "_dateDay_2npm7_148";
const dateMonth = "_dateMonth_2npm7_155";
const recurringBadge = "_recurringBadge_2npm7_164";
const recurringLabel = "_recurringLabel_2npm7_178";
const content = "_content_2npm7_188";
const contentMain = "_contentMain_2npm7_205";
const meta = "_meta_2npm7_227";
const eventDate = "_eventDate_2npm7_236";
const relativeDate = "_relativeDate_2npm7_245";
const separator = "_separator_2npm7_250";
const location = "_location_2npm7_254";
const footer = "_footer_2npm7_263";
const organizer = "_organizer_2npm7_270";
const ticketStatus = "_ticketStatus_2npm7_280";
const statsPanel = "_statsPanel_2npm7_299";
const stat = "_stat_2npm7_85";
const statValue = "_statValue_2npm7_335";
const statValueRevenue = "_statValueRevenue_2npm7_347";
const statLabel = "_statLabel_2npm7_359";
const menuButton = "_menuButton_2npm7_367";
const actionButton = "_actionButton_2npm7_378";
const eventCardCompact = "_eventCardCompact_2npm7_395";
const compactTitle = "_compactTitle_2npm7_406";
const compactImage = "_compactImage_2npm7_409";
const cardLinkCompact = "_cardLinkCompact_2npm7_416";
const compactThumb = "_compactThumb_2npm7_432";
const compactDateBadge = "_compactDateBadge_2npm7_456";
const compactDateDay = "_compactDateDay_2npm7_468";
const compactDateMonth = "_compactDateMonth_2npm7_479";
const compactContent = "_compactContent_2npm7_492";
const compactPrimary = "_compactPrimary_2npm7_500";
const compactRecurringIcon = "_compactRecurringIcon_2npm7_519";
const compactMeta = "_compactMeta_2npm7_527";
const compactMetaItem = "_compactMetaItem_2npm7_537";
const compactLocation = "_compactLocation_2npm7_541";
const compactDot = "_compactDot_2npm7_549";
const compactStatus = "_compactStatus_2npm7_553";
const compactStatusDot = "_compactStatusDot_2npm7_561";
const compactTickets = "_compactTickets_2npm7_585";
const compactStats = "_compactStats_2npm7_602";
const compactStat = "_compactStat_2npm7_553";
const compactStatValue = "_compactStatValue_2npm7_628";
const compactStatLabel = "_compactStatLabel_2npm7_637";
const compactMenuButton = "_compactMenuButton_2npm7_651";
const classes = {
  eventCard,
  title,
  isDraft,
  isEnded,
  image,
  cardLink,
  imageContainer,
  placeholderImage,
  imageOverlay,
  placeholderOverlay,
  statusBadge,
  "status-live": "_status-live_2npm7_100",
  "status-onsale": "_status-onsale_2npm7_104",
  "status-draft": "_status-draft_2npm7_108",
  "status-ended": "_status-ended_2npm7_113",
  "status-archived": "_status-archived_2npm7_113",
  pulseDot,
  pulse,
  dateBadge,
  dateDay,
  dateMonth,
  recurringBadge,
  recurringLabel,
  content,
  contentMain,
  meta,
  eventDate,
  relativeDate,
  separator,
  location,
  footer,
  organizer,
  ticketStatus,
  "ticket-available": "_ticket-available_2npm7_286",
  "ticket-partial": "_ticket-partial_2npm7_290",
  "ticket-sold-out": "_ticket-sold-out_2npm7_294",
  statsPanel,
  stat,
  statValue,
  statValueRevenue,
  statLabel,
  menuButton,
  actionButton,
  eventCardCompact,
  compactTitle,
  compactImage,
  cardLinkCompact,
  compactThumb,
  compactDateBadge,
  compactDateDay,
  compactDateMonth,
  compactContent,
  compactPrimary,
  compactRecurringIcon,
  compactMeta,
  compactMetaItem,
  compactLocation,
  compactDot,
  compactStatus,
  compactStatusDot,
  "compactStatus-success": "_compactStatus-success_2npm7_569",
  "compactStatus-warning": "_compactStatus-warning_2npm7_573",
  "compactStatus-danger": "_compactStatus-danger_2npm7_577",
  "compactStatus-muted": "_compactStatus-muted_2npm7_581",
  compactTickets,
  "compactTickets-available": "_compactTickets-available_2npm7_590",
  "compactTickets-partial": "_compactTickets-partial_2npm7_594",
  "compactTickets-sold-out": "_compactTickets-sold-out_2npm7_598",
  compactStats,
  compactStat,
  compactStatValue,
  compactStatLabel,
  compactMenuButton
};
const useDuplicateEvent = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      duplicateData
    }) => eventsClient.duplicate(eventId, duplicateData)
  });
};
const DuplicateEventModal = ({
  onClose,
  eventId
}) => {
  var _a, _b;
  const form = useForm({
    initialValues: {
      title: "",
      start_date: "",
      end_date: "",
      description: "",
      duplicate_products: true,
      duplicate_questions: true,
      duplicate_settings: true,
      duplicate_promo_codes: true,
      duplicate_capacity_assignments: true,
      duplicate_check_in_lists: true,
      duplicate_event_cover_image: true,
      duplicate_ticket_logo: true,
      duplicate_webhooks: true,
      duplicate_affiliates: true,
      duplicate_occurrences: true
    }
  });
  const mutation = useDuplicateEvent();
  const eventQuery = useGetEvent(eventId);
  const isRecurring = ((_a = eventQuery == null ? void 0 : eventQuery.data) == null ? void 0 : _a.type) === EventType.RECURRING;
  const nav = useNavigate();
  const errorHandler = useFormErrorResponseHandler();
  const duplicateOptions = [{
    key: "duplicate_products",
    label: i18n._(
      /*i18n*/
      {
        id: "N0qXpE"
      }
    )
  }, {
    key: "duplicate_questions",
    label: i18n._(
      /*i18n*/
      {
        id: "enzGAL"
      }
    )
  }, {
    key: "duplicate_settings",
    label: i18n._(
      /*i18n*/
      {
        id: "Tz0i8g"
      }
    )
  }, {
    key: "duplicate_promo_codes",
    label: i18n._(
      /*i18n*/
      {
        id: "RVb8Fo"
      }
    )
  }, {
    key: "duplicate_capacity_assignments",
    label: i18n._(
      /*i18n*/
      {
        id: "VsM1HH"
      }
    )
  }, {
    key: "duplicate_check_in_lists",
    label: i18n._(
      /*i18n*/
      {
        id: "tejfAy"
      }
    )
  }, {
    key: "duplicate_event_cover_image",
    label: i18n._(
      /*i18n*/
      {
        id: "b46pt5"
      }
    )
  }, {
    key: "duplicate_ticket_logo",
    label: i18n._(
      /*i18n*/
      {
        id: "6czJik"
      }
    )
  }, {
    key: "duplicate_webhooks",
    label: i18n._(
      /*i18n*/
      {
        id: "v1kQyJ"
      }
    )
  }, {
    key: "duplicate_affiliates",
    label: i18n._(
      /*i18n*/
      {
        id: "CPXP5Z"
      }
    )
  }, ...isRecurring ? [{
    key: "duplicate_occurrences",
    label: i18n._(
      /*i18n*/
      {
        id: "KATw3p"
      }
    ),
    description: i18n._(
      /*i18n*/
      {
        id: "yRx/6K"
      }
    )
  }] : []];
  const handleSelectAll = () => {
    duplicateOptions.forEach((option) => {
      form.setFieldValue(option.key, true);
    });
  };
  const handleDeselectAll = () => {
    duplicateOptions.forEach((option) => {
      form.setFieldValue(option.key, false);
    });
  };
  const allSelected = duplicateOptions.every((option) => form.values[option.key]);
  const noneSelected = duplicateOptions.every((option) => !form.values[option.key]);
  useEffect(() => {
    if (eventQuery == null ? void 0 : eventQuery.data) {
      form.setValues({
        title: eventQuery.data.title,
        description: eventQuery.data.description,
        start_date: utcToTz(eventQuery.data.start_date, eventQuery.data.timezone),
        end_date: utcToTz(eventQuery.data.end_date, eventQuery.data.timezone)
      });
    }
  }, [eventQuery.isFetched]);
  const handleDuplicate = (eventId2, duplicateData) => {
    mutation.mutate({
      eventId: eventId2,
      duplicateData
    }, {
      onSuccess: ({
        data
      }) => {
        nav(`/manage/event/${data.id}`);
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "6fuA9p"
          }
        ));
      },
      onError: (error) => {
        errorHandler(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsx(Modal, { onClose, heading: i18n._(
    /*i18n*/
    {
      id: "3ogkAk"
    }
  ), opened: true, size: "lg", withCloseButton: true, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => handleDuplicate(eventId, values)), children: [
    /* @__PURE__ */ jsxs("fieldset", { disabled: eventQuery.isLoading || mutation.isPending, children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("title"), label: i18n._(
        /*i18n*/
        {
          id: "6YtxFj"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "/RfJXt",
          values: {
            0: (/* @__PURE__ */ new Date()).getFullYear()
          }
        }
      ), required: true }),
      /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "Nu4oKW"
        }
      ), value: form.values.description || "", onChange: (value) => form.setFieldValue("description", value), error: (_b = form.errors) == null ? void 0 : _b.description }),
      !isRecurring && /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("start_date"), label: i18n._(
          /*i18n*/
          {
            id: "D3iCkb"
          }
        ), required: true }),
        /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("end_date"), label: i18n._(
          /*i18n*/
          {
            id: "VFv2ZC"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "center", mb: "md", children: [
        /* @__PURE__ */ jsx("h3", { style: {
          margin: 0
        }, children: i18n._(
          /*i18n*/
          {
            id: "+fA4C7"
          }
        ) }),
        /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
            /*i18n*/
            {
              id: "mCB6Je"
            }
          ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "light", size: "sm", onClick: handleSelectAll, disabled: allSelected, color: "blue", children: /* @__PURE__ */ jsx(IconCheckbox, { size: 16 }) }) }),
          /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
            /*i18n*/
            {
              id: "vYgeDk"
            }
          ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "light", size: "sm", onClick: handleDeselectAll, disabled: noneSelected, color: "gray", children: /* @__PURE__ */ jsx(IconSquare, { size: 16 }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { variant: "lightGray", children: /* @__PURE__ */ jsx(Grid, { children: duplicateOptions.map((option, index) => /* @__PURE__ */ jsx(Grid.Col, { span: {
        base: 12,
        sm: 6
      }, children: /* @__PURE__ */ jsx(Switch, { ...form.getInputProps(option.key, {
        type: "checkbox"
      }), label: option.label, description: option.description, mb: index === duplicateOptions.length - 1 || index === duplicateOptions.length - 2 ? 0 : "xs" }) }, option.key)) }) })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, disabled: mutation.isPending, children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "hqmXmc"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "3ogkAk"
      }
    ) })
  ] }) });
};
const placeholderGradients = ["linear-gradient(135deg, var(--mantine-color-violet-5) 0%, var(--mantine-color-indigo-5) 100%)", "linear-gradient(135deg, var(--mantine-color-pink-5) 0%, var(--mantine-color-grape-5) 100%)", "linear-gradient(135deg, var(--mantine-color-blue-5) 0%, var(--mantine-color-cyan-5) 100%)", "linear-gradient(135deg, var(--mantine-color-teal-5) 0%, var(--mantine-color-green-5) 100%)", "linear-gradient(135deg, var(--mantine-color-orange-5) 0%, var(--mantine-color-yellow-5) 100%)", "linear-gradient(135deg, var(--mantine-color-indigo-5) 0%, var(--mantine-color-blue-5) 100%)", "linear-gradient(135deg, var(--mantine-color-grape-5) 0%, var(--mantine-color-violet-5) 100%)", "linear-gradient(135deg, var(--mantine-color-cyan-5) 0%, var(--mantine-color-teal-5) 100%)"];
function EventCard({
  event,
  compact = false
}) {
  var _a, _b, _c, _d;
  const navigate = useNavigate();
  const [isDuplicateModalOpen, duplicateModal] = useDisclosure(false);
  const [eventId, setEventId] = useState();
  const statusToggleMutation = useUpdateEventStatus();
  const coverImage = (_a = event.images) == null ? void 0 : _a.find((img) => img.type === "EVENT_COVER");
  const gradientIndex = event.id ? Number(event.id) % placeholderGradients.length : 0;
  const placeholderGradient = placeholderGradients[gradientIndex];
  const handleDuplicate = () => {
    setEventId(event.id);
    duplicateModal.open();
  };
  const handleStatusToggle = () => {
    const message = (event == null ? void 0 : event.status) !== "ARCHIVED" ? i18n._(
      /*i18n*/
      {
        id: "TvkW9+"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "s4JozW"
      }
    );
    confirmationDialog(message, () => {
      statusToggleMutation.mutate({
        eventId: event.id,
        status: (event == null ? void 0 : event.status) === "ARCHIVED" ? "DRAFT" : "ARCHIVED"
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "btxLWj"
            }
          ));
        },
        onError: (error) => {
          var _a2, _b2;
          showError(((_b2 = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || i18n._(
            /*i18n*/
            {
              id: "4/If97"
            }
          ));
        }
      });
    });
  };
  const getStatusConfig = () => {
    if (event.status === "ARCHIVED") {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "TdfEV7"
          }
        ),
        status: "archived",
        tone: "muted"
      };
    }
    if (event.lifecycle_status === "ENDED") {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "237hSL"
          }
        ),
        status: "ended",
        tone: "muted"
      };
    }
    if (event.status === "DRAFT") {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "eneWvv"
          }
        ),
        status: "draft",
        tone: "warning"
      };
    }
    if (event.lifecycle_status === "ONGOING") {
      return {
        label: i18n._(
          /*i18n*/
          {
            id: "dF6vP6"
          }
        ),
        status: "live",
        tone: "success",
        pulse: true
      };
    }
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "Ldu/RI"
        }
      ),
      status: "onsale",
      tone: "success"
    };
  };
  const getLocationText = () => {
    var _a2, _b2, _c2, _d2, _e, _f;
    const locationSummary = summariseEventLocations(event);
    if (locationSummary.kind === "none") return null;
    if (locationSummary.kind === "varied") {
      return locationSummary.types.length > 1 ? i18n._(
        /*i18n*/
        {
          id: "LuZBbx"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "3DIpY0"
        }
      );
    }
    const eventLocation = locationSummary.eventLocation;
    if (eventLocation.type === LocationType.Online) return i18n._(
      /*i18n*/
      {
        id: "oXOSPE"
      }
    );
    const city = (_b2 = (_a2 = eventLocation.location) == null ? void 0 : _a2.structured_address) == null ? void 0 : _b2.city;
    const venueName = ((_c2 = eventLocation.location) == null ? void 0 : _c2.name) || ((_e = (_d2 = eventLocation.location) == null ? void 0 : _d2.structured_address) == null ? void 0 : _e.venue_name);
    const formatted = ((_f = eventLocation.location) == null ? void 0 : _f.structured_address) ? formatAddress(eventLocation.location.structured_address) : "";
    return venueName ?? city ?? (formatted ? formatted : null);
  };
  const getTicketAvailability = () => {
    const products = event.products;
    if (!products || products.length === 0) return null;
    const ticketProducts = products.filter((p) => p.product_type === "TICKET");
    if (ticketProducts.length === 0) return null;
    const availableCount = ticketProducts.filter((p) => {
      if (p.status === "INACTIVE") return false;
      return p.is_available !== false && p.is_sold_out !== true;
    }).length;
    const totalCount = ticketProducts.length;
    if (availableCount === 0) {
      return {
        text: i18n._(
          /*i18n*/
          {
            id: "lgFfeO"
          }
        ),
        status: "sold-out"
      };
    }
    if (availableCount === totalCount) {
      return {
        text: totalCount === 1 ? i18n._(
          /*i18n*/
          {
            id: "nz96Ue"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "3IEF7U",
            values: {
              totalCount
            }
          }
        ),
        status: "available"
      };
    }
    return {
      text: i18n._(
        /*i18n*/
        {
          id: "TjbIUI",
          values: {
            availableCount,
            totalCount
          }
        }
      ),
      status: "partial"
    };
  };
  const menuItems = [{
    label: "",
    items: [{
      label: i18n._(
        /*i18n*/
        {
          id: "/5PEQz"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconEye, { size: 14 }),
      onClick: () => window.location.href = eventHomepagePath(event)
    }, {
      label: i18n._(
        /*i18n*/
        {
          id: "n4SpU5"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconSettings, { size: 14 }),
      onClick: () => navigate(`/manage/event/${event.id}`)
    }, {
      label: i18n._(
        /*i18n*/
        {
          id: "vi8Q/5"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconCopy, { size: 14 }),
      onClick: handleDuplicate,
      dataTestId: "event-duplicate-menu-item"
    }, {
      label: (event == null ? void 0 : event.status) === "ARCHIVED" ? i18n._(
        /*i18n*/
        {
          id: "e99fHm"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "S0ctOE"
        }
      ),
      icon: /* @__PURE__ */ jsx(IconArchive, { size: 14 }),
      onClick: handleStatusToggle
    }]
  }];
  const locationText = getLocationText();
  const revenue = ((_b = event == null ? void 0 : event.statistics) == null ? void 0 : _b.sales_total_gross) || 0;
  const attendees = ((_c = event == null ? void 0 : event.statistics) == null ? void 0 : _c.attendees_registered) || 0;
  const statusConfig = getStatusConfig();
  const ticketAvailability = getTicketAvailability();
  const isEnded2 = event.lifecycle_status === "ENDED";
  const isDraft2 = event.status === "DRAFT";
  const isRecurring = event.type === EventType.RECURRING;
  const displayDate = isRecurring && event.next_occurrence_start_date || event.start_date;
  const hasDate = isValidDate(displayDate);
  const monthShort = formatDateWithLocale(displayDate, "monthShort", event.timezone);
  const dayOfMonth = formatDateWithLocale(displayDate, "dayOfMonth", event.timezone);
  const shortDateTime = formatDateWithLocale(displayDate, "shortDateTime", event.timezone);
  const relativeDateStr = relativeDate$1(displayDate);
  if (compact) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: `${classes.eventCardCompact} ${isEnded2 ? classes.isEnded : ""} ${isDraft2 ? classes.isDraft : ""}`, children: /* @__PURE__ */ jsxs(NavLink, { to: `/manage/event/${event.id}/dashboard`, className: classes.cardLinkCompact, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.compactThumb, children: [
          /* @__PURE__ */ jsx("div", { className: `${classes.compactImage} ${!coverImage ? classes.placeholderImage : ""}`, style: coverImage ? {
            backgroundImage: `url(${coverImage.url})`
          } : {
            background: placeholderGradient
          } }),
          hasDate && /* @__PURE__ */ jsxs("div", { className: `${classes.compactDateBadge}`, children: [
            /* @__PURE__ */ jsx("span", { className: classes.compactDateDay, children: dayOfMonth }),
            /* @__PURE__ */ jsx("span", { className: classes.compactDateMonth, children: monthShort })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.compactContent, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.compactPrimary, children: [
            /* @__PURE__ */ jsx("span", { className: classes.compactTitle, children: event.title }),
            isRecurring && /* @__PURE__ */ jsx("span", { className: classes.compactRecurringIcon, "aria-label": i18n._(
              /*i18n*/
              {
                id: "wuhHPE"
              }
            ), children: /* @__PURE__ */ jsx(IconRepeat, { size: 12 }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.compactMeta, children: [
            /* @__PURE__ */ jsxs("span", { className: `${classes.compactStatus} ${classes[`compactStatus-${statusConfig.tone}`]}`, children: [
              statusConfig.pulse && /* @__PURE__ */ jsx("span", { className: classes.compactStatusDot }),
              statusConfig.label
            ] }),
            /* @__PURE__ */ jsx("span", { className: classes.compactDot, children: "·" }),
            /* @__PURE__ */ jsx("span", { className: classes.compactMetaItem, children: hasDate ? shortDateTime : i18n._(
              /*i18n*/
              {
                id: "Zc216S"
              }
            ) }),
            hasDate && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: classes.compactDot, children: "·" }),
              /* @__PURE__ */ jsx("span", { className: classes.compactMetaItem, children: relativeDateStr })
            ] }),
            locationText && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: classes.compactDot, children: "·" }),
              /* @__PURE__ */ jsx("span", { className: `${classes.compactMetaItem} ${classes.compactLocation}`, children: locationText })
            ] }),
            ticketAvailability && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: classes.compactDot, children: "·" }),
              /* @__PURE__ */ jsx("span", { className: `${classes.compactTickets} ${classes[`compactTickets-${ticketAvailability.status}`]}`, children: ticketAvailability.text })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.compactStats, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.compactStat, children: [
            /* @__PURE__ */ jsx("span", { className: classes.compactStatValue, children: formatNumber(attendees) }),
            /* @__PURE__ */ jsx("span", { className: classes.compactStatLabel, children: i18n._(
              /*i18n*/
              {
                id: "9SZT4E"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.compactStat, children: [
            /* @__PURE__ */ jsx("span", { className: classes.compactStatValue, children: formatCurrency(revenue, event == null ? void 0 : event.currency) }),
            /* @__PURE__ */ jsx("span", { className: classes.compactStatLabel, children: i18n._(
              /*i18n*/
              {
                id: "8YBH95"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes.compactMenuButton, onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx(ActionMenu, { itemsGroups: menuItems, target: /* @__PURE__ */ jsx(ActionIcon, { className: classes.actionButton, size: "sm", variant: "subtle", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 16 }) }) }) })
      ] }) }),
      isDuplicateModalOpen && /* @__PURE__ */ jsx(DuplicateEventModal, { eventId, onClose: duplicateModal.close })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Card, { className: `${classes.eventCard} ${isEnded2 ? classes.isEnded : ""} ${isDraft2 ? classes.isDraft : ""}`, children: /* @__PURE__ */ jsxs(NavLink, { to: `/manage/event/${event.id}/dashboard`, className: classes.cardLink, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.imageContainer, children: [
        /* @__PURE__ */ jsx("div", { className: `${classes.image} ${!coverImage ? classes.placeholderImage : ""}`, style: coverImage ? {
          backgroundImage: `url(${coverImage.url})`
        } : {
          background: placeholderGradient
        } }),
        /* @__PURE__ */ jsx("div", { className: `${classes.imageOverlay} ${!coverImage ? classes.placeholderOverlay : ""}` }),
        /* @__PURE__ */ jsxs("div", { className: `${classes.statusBadge} ${classes[`status-${statusConfig.status}`]}`, children: [
          statusConfig.pulse && /* @__PURE__ */ jsx("span", { className: classes.pulseDot }),
          statusConfig.label
        ] }),
        hasDate && /* @__PURE__ */ jsxs("div", { className: classes.dateBadge, children: [
          /* @__PURE__ */ jsx("span", { className: classes.dateDay, children: dayOfMonth }),
          /* @__PURE__ */ jsx("span", { className: classes.dateMonth, children: monthShort })
        ] }),
        isRecurring && /* @__PURE__ */ jsx("div", { className: classes.recurringBadge, children: /* @__PURE__ */ jsx(IconRepeat, { size: 12 }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.contentMain, children: [
          /* @__PURE__ */ jsx("h3", { className: classes.title, children: event.title }),
          /* @__PURE__ */ jsxs("div", { className: classes.meta, children: [
            /* @__PURE__ */ jsxs("span", { className: classes.eventDate, children: [
              hasDate ? shortDateTime : i18n._(
                /*i18n*/
                {
                  id: "Zc216S"
                }
              ),
              isRecurring && /* @__PURE__ */ jsxs("span", { className: classes.recurringLabel, children: [
                /* @__PURE__ */ jsx(IconRepeat, { size: 11 }),
                i18n._(
                  /*i18n*/
                  {
                    id: "wuhHPE"
                  }
                )
              ] })
            ] }),
            hasDate && /* @__PURE__ */ jsxs("span", { className: classes.relativeDate, children: [
              "(",
              relativeDateStr,
              ")"
            ] }),
            locationText && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: classes.separator, children: "·" }),
              /* @__PURE__ */ jsx("span", { className: classes.location, children: locationText })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.footer, children: [
            /* @__PURE__ */ jsx("span", { role: "link", tabIndex: 0, className: classes.organizer, onClick: (e) => {
              var _a2;
              e.preventDefault();
              e.stopPropagation();
              navigate(`/manage/organizer/${(_a2 = event == null ? void 0 : event.organizer) == null ? void 0 : _a2.id}`);
            }, onKeyDown: (e) => {
              var _a2;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/manage/organizer/${(_a2 = event == null ? void 0 : event.organizer) == null ? void 0 : _a2.id}`);
              }
            }, children: (_d = event == null ? void 0 : event.organizer) == null ? void 0 : _d.name }),
            ticketAvailability && /* @__PURE__ */ jsx("span", { className: `${classes.ticketStatus} ${classes[`ticket-${ticketAvailability.status}`]}`, children: ticketAvailability.text })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.statsPanel, children: [
          /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
            /*i18n*/
            {
              id: "UoIRW8"
            }
          ), withArrow: true, position: "top", children: /* @__PURE__ */ jsxs("div", { className: classes.stat, children: [
            /* @__PURE__ */ jsx("span", { className: classes.statValue, children: formatNumber(attendees) }),
            /* @__PURE__ */ jsx("span", { className: classes.statLabel, children: i18n._(
              /*i18n*/
              {
                id: "9SZT4E"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
            /*i18n*/
            {
              id: "aGWZUr"
            }
          ), withArrow: true, position: "top", children: /* @__PURE__ */ jsxs("div", { className: classes.stat, children: [
            /* @__PURE__ */ jsx("span", { className: classes.statValueRevenue, children: formatCurrency(revenue, event == null ? void 0 : event.currency) }),
            /* @__PURE__ */ jsx("span", { className: classes.statLabel, children: i18n._(
              /*i18n*/
              {
                id: "8YBH95"
              }
            ) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes.menuButton, onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx(ActionMenu, { itemsGroups: menuItems, target: /* @__PURE__ */ jsx(ActionIcon, { className: classes.actionButton, size: "md", variant: "subtle", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 18 }) }) }) })
      ] })
    ] }) }),
    isDuplicateModalOpen && /* @__PURE__ */ jsx(DuplicateEventModal, { eventId, onClose: duplicateModal.close })
  ] });
}
const getEventQueryFilters = (searchParams) => {
  const {
    eventsState,
    organizerId
  } = useParams();
  return getEventQueryFiltersWithParams(searchParams, eventsState, organizerId);
};
const getEventQueryFiltersWithParams = (searchParams, eventsState, organizerId) => {
  let filter = {};
  if (eventsState === "upcoming" || !eventsState) {
    filter = {
      additionalParams: {
        eventsStatus: "upcoming"
      },
      filterFields: {}
    };
  } else if (eventsState === "ended") {
    filter = {
      additionalParams: {
        eventsStatus: "ended"
      },
      filterFields: {}
    };
  } else if (eventsState === "archived") {
    filter = {
      filterFields: {
        status: {
          operator: QueryFilterOperator.Equals,
          value: EventStatus.ARCHIVED
        }
      }
    };
  }
  if (organizerId) {
    filter = {
      ...filter,
      filterFields: {
        organizer_id: {
          operator: QueryFilterOperator.Equals,
          value: organizerId
        },
        ...filter.filterFields
      }
    };
  }
  return {
    ...searchParams,
    ...filter
  };
};
export {
  EventCard as E,
  getEventQueryFilters as g
};

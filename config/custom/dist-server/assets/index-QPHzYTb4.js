import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useNavigate } from "react-router";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { E as EventType } from "./types-CqPWB-a5.js";
import { useState, useEffect } from "react";
import { Select, Anchor, TextInput, SegmentedControl, Button } from "@mantine/core";
import { useForm, hasLength } from "@mantine/form";
import { u as useCreateEvent } from "./useCreateEvent-_hCh3y7f.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { u as useGetOrganizers } from "./useGetOrganizers-AXXYibKP.js";
import { IconX, IconUsers, IconSparkles, IconCalendarEvent, IconCalendarRepeat } from "@tabler/icons-react";
import { O as OrganizerCreateForm } from "./index-t-LfUV0_.js";
import dayjs from "dayjs";
import { DateTimePicker } from "@mantine/dates";
import { g as getEventCategories } from "./eventCategories-BcVMR4Oy.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { g as getDateTimePickerFormat } from "./dates-CbVpwZeX.js";
const modalOverlay = "_modalOverlay_cmvdv_1";
const floatingEmojis = "_floatingEmojis_cmvdv_28";
const floatingEmoji = "_floatingEmoji_cmvdv_28";
const modalContainer = "_modalContainer_cmvdv_64";
const closeButton = "_closeButton_cmvdv_98";
const modalHeader = "_modalHeader_cmvdv_129";
const headerContent = "_headerContent_cmvdv_143";
const magicWand = "_magicWand_cmvdv_148";
const headerTitle = "_headerTitle_cmvdv_174";
const headerSubtitle = "_headerSubtitle_cmvdv_188";
const modalContent = "_modalContent_cmvdv_201";
const formContainer = "_formContainer_cmvdv_234";
const createOrganizerLink = "_createOrganizerLink_cmvdv_258";
const dateTimeGrid = "_dateTimeGrid_cmvdv_266";
const recurringNotice = "_recurringNotice_cmvdv_278";
const recurringNoticeIcon = "_recurringNoticeIcon_cmvdv_288";
const createButton = "_createButton_cmvdv_308";
const createOrganizerCard = "_createOrganizerCard_cmvdv_355";
const createOrganizerHeading = "_createOrganizerHeading_cmvdv_369";
const classes = {
  modalOverlay,
  floatingEmojis,
  floatingEmoji,
  modalContainer,
  closeButton,
  modalHeader,
  headerContent,
  magicWand,
  headerTitle,
  headerSubtitle,
  modalContent,
  formContainer,
  createOrganizerLink,
  dateTimeGrid,
  recurringNotice,
  recurringNoticeIcon,
  createButton,
  createOrganizerCard,
  createOrganizerHeading
};
const CreateEventModal = ({
  onClose,
  organizerId
}) => {
  var _a, _b;
  const errorHandler = useFormErrorResponseHandler();
  const navigate = useNavigate();
  const {
    data: account,
    isFetched: isAccountFetched
  } = useGetAccount();
  const organizersQuery = useGetOrganizers();
  const form = useForm({
    initialValues: {
      title: "",
      status: void 0,
      type: EventType.SINGLE,
      start_date: dayjs().add(1, "day").hour(21).minute(0).second(0).toISOString(),
      end_date: void 0,
      description: void 0,
      organizer_id: organizerId ? String(organizerId) : void 0,
      category: void 0
    },
    validate: {
      title: hasLength({
        max: 150
      }, i18n._(
        /*i18n*/
        {
          id: "Wd5CDM"
        }
      )),
      end_date: (value, values) => {
        if (values.type === EventType.RECURRING) return;
        if (value && values.start_date && dayjs(value).isBefore(dayjs(values.start_date))) {
          return i18n._(
            /*i18n*/
            {
              id: "PKXt9R"
            }
          );
        }
      },
      organizer_id: (value) => {
        if (!value) {
          return i18n._(
            /*i18n*/
            {
              id: "mYygCM"
            }
          );
        }
      }
    },
    validateInputOnChange: true
  });
  const eventMutation = useCreateEvent();
  const [showCreateOrganizer, setShowCreateOrganizer] = useState(false);
  useEffect(() => {
    if (organizerId) {
      form.setFieldValue("organizer_id", String(organizerId));
    }
  }, [organizerId]);
  useEffect(() => {
    var _a2, _b2, _c;
    if (organizersQuery.isFetched && ((_b2 = (_a2 = organizersQuery.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.length) === 1) {
      form.setFieldValue("organizer_id", String((_c = organizersQuery.data) == null ? void 0 : _c.data[0].id));
    }
  }, [organizersQuery.isFetched]);
  useEffect(() => {
    if (isAccountFetched) {
      form.setFieldValue("currency", account == null ? void 0 : account.currency_code);
      form.setFieldValue("timezone", account == null ? void 0 : account.timezone);
    }
  }, [isAccountFetched]);
  useEffect(() => {
    var _a2;
    if (form.values.organizer_id && organizersQuery.data) {
      form.setFieldValue("currency", (_a2 = organizersQuery.data.data.find((organizer) => organizer.id === Number(form.values.organizer_id))) == null ? void 0 : _a2.currency);
    }
  }, [form.values.organizer_id]);
  const handleCreate = (values) => {
    eventMutation.mutateAsync({
      eventData: values
    }).then((data) => {
      navigate(`/manage/event/${data.data.id}/dashboard?new_event=true`);
    }).catch((error) => {
      errorHandler(form, error);
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: classes.modalOverlay, onClick: onClose, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.floatingEmojis, children: [
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        top: "10%",
        left: "15%",
        animationDelay: "0s"
      }, children: "🎉" }),
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        top: "20%",
        right: "20%",
        animationDelay: "2s"
      }, children: "✨" }),
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        top: "60%",
        left: "10%",
        animationDelay: "4s"
      }, children: "🥳" }),
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        bottom: "30%",
        right: "15%",
        animationDelay: "1s"
      }, children: "🎪" }),
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        bottom: "15%",
        left: "25%",
        animationDelay: "3s"
      }, children: "🌟" }),
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        top: "40%",
        right: "8%",
        animationDelay: "5s"
      }, children: "🎭" }),
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        top: "70%",
        left: "70%",
        animationDelay: "2.5s"
      }, children: "🎨" }),
      /* @__PURE__ */ jsx("span", { className: classes.floatingEmoji, style: {
        top: "25%",
        left: "60%",
        animationDelay: "1.5s"
      }, children: "🎯" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.modalContainer, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx("button", { className: classes.closeButton, onClick: onClose, "aria-label": i18n._(
        /*i18n*/
        {
          id: "RWw9Lg"
        }
      ), children: /* @__PURE__ */ jsx(IconX, { size: 20 }) }),
      /* @__PURE__ */ jsx("div", { className: classes.modalHeader, children: /* @__PURE__ */ jsxs("div", { className: classes.headerContent, children: [
        /* @__PURE__ */ jsx("div", { className: classes.magicWand, children: "✨" }),
        /* @__PURE__ */ jsx("h1", { className: classes.headerTitle, children: i18n._(
          /*i18n*/
          {
            id: "5slqwZ"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: classes.headerSubtitle, children: i18n._(
          /*i18n*/
          {
            id: "NiIUyb"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: classes.modalContent, children: /* @__PURE__ */ jsxs("div", { className: classes.formContainer, children: [
        showCreateOrganizer && /* @__PURE__ */ jsxs("div", { className: classes.createOrganizerCard, children: [
          /* @__PURE__ */ jsxs("h3", { className: classes.createOrganizerHeading, children: [
            /* @__PURE__ */ jsx(IconUsers, { size: 20 }),
            i18n._(
              /*i18n*/
              {
                id: "kpJAeS"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(OrganizerCreateForm, { onCancel: () => setShowCreateOrganizer(false), onSuccess: (organizer) => {
            setShowCreateOrganizer(false);
            form.setFieldValue("organizer_id", String(organizer.id));
          } })
        ] }),
        !showCreateOrganizer && !organizerId && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Select, { ...form.getInputProps("organizer_id"), label: i18n._(
            /*i18n*/
            {
              id: "S+OdxP"
            }
          ), required: true, leftSection: /* @__PURE__ */ jsx(IconUsers, { size: 18 }), placeholder: i18n._(
            /*i18n*/
            {
              id: "kWI/37"
            }
          ), data: (_b = (_a = organizersQuery.data) == null ? void 0 : _a.data) == null ? void 0 : _b.map((organizer) => ({
            value: String(organizer.id),
            label: organizer.name
          })), mb: 0 }),
          /* @__PURE__ */ jsxs("div", { className: classes.createOrganizerLink, children: [
            i18n._(
              /*i18n*/
              {
                id: "BzEFor"
              }
            ),
            " ",
            "  ",
            /* @__PURE__ */ jsx(Anchor, { href: "#", variant: "transparent", onClick: () => setShowCreateOrganizer(true), children: i18n._(
              /*i18n*/
              {
                id: "nx+rqg"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleCreate), children: [
          /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("title"), label: i18n._(
            /*i18n*/
            {
              id: "HhwcTQ"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "/RfJXt",
              values: {
                0: (/* @__PURE__ */ new Date()).getFullYear()
              }
            }
          ), required: true, size: "lg", leftSection: /* @__PURE__ */ jsx(IconSparkles, { size: 18 }) }),
          /* @__PURE__ */ jsx(Select, { ...form.getInputProps("category"), label: i18n._(
            /*i18n*/
            {
              id: "WgD6rb"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "p7xUrt"
            }
          ), data: getEventCategories().map((category) => ({
            value: category.id,
            label: `${category.emoji} ${category.name}`
          })), size: "lg", searchable: true }),
          /* @__PURE__ */ jsx("div", { className: classes.editorField, children: /* @__PURE__ */ jsx(Editor, { label: i18n._(
            /*i18n*/
            {
              id: "imgKgl"
            }
          ), description: i18n._(
            /*i18n*/
            {
              id: "iWa9cY"
            }
          ), value: form.values.description || "", onChange: (value) => form.setFieldValue("description", value), error: form.errors.description, editorType: "simple", maxLength: 2e3, size: "lg" }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, size: "md", value: form.values.type || EventType.SINGLE, onChange: (value) => {
            form.setFieldValue("type", value);
            if (value === EventType.RECURRING) {
              form.setFieldValue("start_date", void 0);
              form.setFieldValue("end_date", void 0);
            } else {
              form.setFieldValue("start_date", dayjs().add(1, "day").hour(21).minute(0).second(0).toISOString());
            }
          }, data: [{
            value: EventType.SINGLE,
            label: /* @__PURE__ */ jsxs("span", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              justifyContent: "center"
            }, children: [
              /* @__PURE__ */ jsx(IconCalendarEvent, { size: 16 }),
              i18n._(
                /*i18n*/
                {
                  id: "5C7J+P"
                }
              )
            ] })
          }, {
            value: EventType.RECURRING,
            label: /* @__PURE__ */ jsxs("span", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              justifyContent: "center"
            }, children: [
              /* @__PURE__ */ jsx(IconCalendarRepeat, { size: 16 }),
              i18n._(
                /*i18n*/
                {
                  id: "asLqwt"
                }
              )
            ] })
          }], mb: "md" }) }),
          form.values.type === EventType.RECURRING ? /* @__PURE__ */ jsx(Callout, { icon: /* @__PURE__ */ jsx(IconCalendarRepeat, { size: 22, className: classes.recurringNoticeIcon }), title: i18n._(
            /*i18n*/
            {
              id: "85rTR2"
            }
          ), children: i18n._(
            /*i18n*/
            {
              id: "O6/3cu"
            }
          ), className: classes.recurringNotice }) : /* @__PURE__ */ jsxs("div", { className: classes.dateTimeGrid, children: [
            /* @__PURE__ */ jsx(DateTimePicker, { label: i18n._(
              /*i18n*/
              {
                id: "0m/ekX"
              }
            ), ...form.getInputProps("start_date"), required: true, size: "md", placeholder: i18n._(
              /*i18n*/
              {
                id: "KizCK7"
              }
            ), valueFormat: getDateTimePickerFormat(), clearable: true, dropdownType: "modal", timePickerProps: {
              format: "12h",
              withDropdown: true
            }, onChange: (value) => {
              form.setFieldValue("start_date", value);
              if (form.values.end_date && value && dayjs(form.values.end_date).isBefore(dayjs(value))) {
                form.setFieldValue("end_date", dayjs(value).add(2, "hours").toISOString());
              }
            } }),
            /* @__PURE__ */ jsx(DateTimePicker, { label: i18n._(
              /*i18n*/
              {
                id: "sGjBEq"
              }
            ), ...form.getInputProps("end_date"), size: "md", placeholder: i18n._(
              /*i18n*/
              {
                id: "n9ZhRa"
              }
            ), valueFormat: getDateTimePickerFormat(), clearable: true, dropdownType: "modal", timePickerProps: {
              format: "12h",
              withDropdown: true
            }, minDate: form.values.start_date ?? void 0, onFocus: () => {
              if (!form.values.end_date && form.values.start_date) {
                form.setFieldValue("end_date", dayjs(form.values.start_date).add(2, "hours").toISOString());
              }
            } })
          ] }),
          /* @__PURE__ */ jsx(Button, { loading: eventMutation.isPending, fullWidth: true, type: "submit", size: "xl", className: classes.createButton, leftSection: /* @__PURE__ */ jsx(IconCalendarEvent, { size: 24 }), children: i18n._(
            /*i18n*/
            {
              id: "m8WD6t"
            }
          ) })
        ] })
      ] }) })
    ] })
  ] });
};
export {
  CreateEventModal as C
};

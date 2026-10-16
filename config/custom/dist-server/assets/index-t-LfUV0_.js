import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { G as GET_ORGANIZERS_QUERY_KEY } from "./useGetOrganizers-AXXYibKP.js";
import { o as organizerClient, u as useGetMe } from "../entry.server.js";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { Button, Stack, TextInput, Select } from "@mantine/core";
import { a as currencies } from "./currencies-wzczGcKi.js";
import { t as timezones } from "./timezones-CsvfI1Rm.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { IconBuilding } from "@tabler/icons-react";
import { t as trackEvent, A as AnalyticsEvents } from "./analytics-Cd4RPKa9.js";
const useCreateOrganizer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerData
    }) => organizerClient.create(organizerData),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZERS_QUERY_KEY]
    })
  });
};
const LoadingContainer = ({
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxs("div", { ...props, style: {
    ...props.style,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx(LoadingMask, {}),
    children
  ] });
};
const welcomeContainer = "_welcomeContainer_1lluz_1";
const welcomeContent = "_welcomeContent_1lluz_20";
const welcomeHeader = "_welcomeHeader_1lluz_33";
const logo = "_logo_1lluz_43";
const welcomeTitle = "_welcomeTitle_1lluz_60";
const welcomeCard = "_welcomeCard_1lluz_73";
const categoryCard = "_categoryCard_1lluz_87";
const stepContainer = "_stepContainer_1lluz_92";
const progressContainer = "_progressContainer_1lluz_101";
const progressBar = "_progressBar_1lluz_110";
const progressFill = "_progressFill_1lluz_119";
const stepHeader = "_stepHeader_1lluz_126";
const stepTitle = "_stepTitle_1lluz_136";
const stepDescription = "_stepDescription_1lluz_151";
const stepContent = "_stepContent_1lluz_163";
const categoryGrid = "_categoryGrid_1lluz_222";
const categoryDropdown = "_categoryDropdown_1lluz_233";
const categoryCardSelected = "_categoryCardSelected_1lluz_272";
const categoryEmoji = "_categoryEmoji_1lluz_277";
const categoryText = "_categoryText_1lluz_287";
const emailDisplay = "_emailDisplay_1lluz_302";
const pinInput = "_pinInput_1lluz_326";
const helpText = "_helpText_1lluz_345";
const dateTimeGrid = "_dateTimeGrid_1lluz_356";
const recurringToggle = "_recurringToggle_1lluz_404";
const recurringCallout = "_recurringCallout_1lluz_420";
const recurringToggleBody = "_recurringToggleBody_1lluz_424";
const recurringToggleLabelWrapper = "_recurringToggleLabelWrapper_1lluz_430";
const recurringToggleLabel = "_recurringToggleLabel_1lluz_430";
const recurringToggleIcon = "_recurringToggleIcon_1lluz_440";
const recurringToggleText = "_recurringToggleText_1lluz_445";
const recurringToggleTitle = "_recurringToggleTitle_1lluz_451";
const recurringToggleHint = "_recurringToggleHint_1lluz_458";
const primaryButton = "_primaryButton_1lluz_464";
const skipSection = "_skipSection_1lluz_489";
const classes = {
  welcomeContainer,
  welcomeContent,
  welcomeHeader,
  logo,
  welcomeTitle,
  welcomeCard,
  categoryCard,
  stepContainer,
  progressContainer,
  progressBar,
  progressFill,
  stepHeader,
  stepTitle,
  stepDescription,
  stepContent,
  categoryGrid,
  categoryDropdown,
  categoryCardSelected,
  categoryEmoji,
  categoryText,
  emailDisplay,
  pinInput,
  helpText,
  dateTimeGrid,
  recurringToggle,
  recurringCallout,
  recurringToggleBody,
  recurringToggleLabelWrapper,
  recurringToggleLabel,
  recurringToggleIcon,
  recurringToggleText,
  recurringToggleTitle,
  recurringToggleHint,
  primaryButton,
  skipSection
};
const OrganizerForm = ({
  form
}) => {
  return /* @__PURE__ */ jsxs(Stack, { gap: 24, children: [
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("name"), required: true, label: i18n._(
      /*i18n*/
      {
        id: "nfnm9D"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "kNmmvE"
      }
    ), size: "lg" }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("email"), required: true, label: i18n._(
      /*i18n*/
      {
        id: "41BQ3k"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "V7yhws"
      }
    ), size: "lg", type: "email" }),
    /* @__PURE__ */ jsxs("div", { className: classes.dateTimeGrid, children: [
      /* @__PURE__ */ jsx(Select, { ...form.getInputProps("currency"), searchable: true, required: true, data: Object.entries(currencies).map(([key, value]) => ({
        value,
        label: `${key} (${value})`
      })), label: i18n._(
        /*i18n*/
        {
          id: "Q2lUR2"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "tVW/yo"
        }
      ), size: "lg" }),
      /* @__PURE__ */ jsx(Select, { ...form.getInputProps("timezone"), searchable: true, required: true, data: timezones, label: i18n._(
        /*i18n*/
        {
          id: "40Gx0U"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "aT3jZX"
        }
      ), size: "lg" })
    ] })
  ] });
};
const OrganizerCreateForm = ({
  onSuccess,
  onCancel
}) => {
  const organizerMutation = useCreateOrganizer();
  const {
    data: account,
    isFetched: accountFetched
  } = useGetAccount();
  const {
    data: me,
    isFetched: meFetched
  } = useGetMe();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      currency: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  });
  const handleSubmit = (values) => {
    organizerMutation.mutate({
      organizerData: values
    }, {
      onSuccess: ({
        data: organizer
      }) => {
        trackEvent(AnalyticsEvents.ORGANIZER_CREATED);
        if (onSuccess) {
          onSuccess(organizer);
        }
      },
      onError: (error) => {
        useFormErrorResponseHandler()(form, error);
      }
    });
  };
  useEffect(() => {
    if (!accountFetched) {
      return;
    }
    form.setFieldValue("currency", (account == null ? void 0 : account.currency_code) ?? "");
    form.setFieldValue("name", (account == null ? void 0 : account.name) ?? "");
  }, [accountFetched]);
  useEffect(() => {
    if (!meFetched) {
      return;
    }
    form.setFieldValue("email", (me == null ? void 0 : me.email) ?? "");
    form.setFieldValue("timezone", (me == null ? void 0 : me.timezone) ?? Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, [meFetched]);
  return /* @__PURE__ */ jsx(LoadingContainer, { children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: organizerMutation.isPending || !accountFetched || !meFetched, children: [
    /* @__PURE__ */ jsx(OrganizerForm, { form }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, size: "lg", loading: organizerMutation.isPending, leftSection: organizerMutation.isPending ? null : /* @__PURE__ */ jsx(IconBuilding, { size: 20 }), className: classes.primaryButton, disabled: organizerMutation.isPending, style: {
      marginTop: "1.5rem"
    }, "aria-label": organizerMutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "yiy8Jt"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "sBV87H"
      }
    ), children: organizerMutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "H34qcM"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "m8WD6t"
      }
    ) })
  ] }) }) });
};
export {
  LoadingContainer as L,
  OrganizerCreateForm as O,
  classes as c
};

import { jsxs, jsx } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { C as Card } from "./index-jHMtuNEo.js";
import { useForm } from "@mantine/form";
import { b as userClient, G as GET_ME_QUERY_KEY, u as useGetMe, a as getConfig, l as localeToNameMap, c as localeToFlagEmojiMap } from "../entry.server.js";
import { Tabs, Button, TextInput, Select, NativeSelect, Checkbox, PasswordInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconUser, IconPassword, IconWorld, IconMail } from "@tabler/icons-react";
import { C as Callout } from "./index-CwjvB_vn.js";
import { t as timezones } from "./timezones-CsvfI1Rm.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { u as useResendEmailConfirmation } from "./useResendEmailConfirmation-DWCgfO2b.js";
import { F as Fieldset } from "./index-DetjybmM.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import "react-dom/server";
import "react-router";
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
const container = "_container_cuvmc_1";
const tabsCard = "_tabsCard_cuvmc_4";
const emailChangeAlert = "_emailChangeAlert_cuvmc_7";
const tabWrapper = "_tabWrapper_cuvmc_10";
const fieldsetLegend = "_fieldsetLegend_cuvmc_13";
const classes = {
  container,
  tabsCard,
  emailChangeAlert,
  tabWrapper,
  fieldsetLegend
};
const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userData
    }) => userClient.updateMe(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ME_QUERY_KEY]
      });
    }
  });
};
const useCancelEmailChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId
    }) => userClient.cancelEmailChange(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ME_QUERY_KEY]
      });
    }
  });
};
const localeSelectData = Object.keys(localeToNameMap).map((locale) => ({
  value: locale,
  label: `${localeToFlagEmojiMap[locale]} ${localeToNameMap[locale]}`
}));
const ManageProfile = () => {
  const {
    data: me,
    isFetching
  } = useGetMe();
  const mutation = useUpdateMe();
  const cancelEmailChangeMutation = useCancelEmailChange();
  const resendEmailConfirmationMutation = useResendEmailConfirmation();
  const errorHandler = useFormErrorResponseHandler();
  const [emailConfirmationResent, setEmailConfirmationResent] = useState(false);
  const profileForm = useForm({
    initialValues: {
      first_name: me == null ? void 0 : me.first_name,
      last_name: me == null ? void 0 : me.last_name,
      email: me == null ? void 0 : me.email,
      timezone: me == null ? void 0 : me.timezone,
      locale: me == null ? void 0 : me.locale,
      marketing_opt_in: (me == null ? void 0 : me.marketing_opted_in_at) !== null
    }
  });
  const passwordForm = useForm({
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: ""
    }
  });
  useEffect(() => {
    profileForm.setValues({
      first_name: me == null ? void 0 : me.first_name,
      last_name: me == null ? void 0 : me.last_name,
      email: me == null ? void 0 : me.email,
      timezone: me == null ? void 0 : me.timezone,
      locale: me == null ? void 0 : me.locale,
      marketing_opt_in: (me == null ? void 0 : me.marketing_opted_in_at) !== null
    });
  }, [me]);
  const handleProfileFormSubmit = (formValues, form) => {
    mutation.mutate({
      userData: formValues
    }, {
      onSuccess: () => {
        form.reset();
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "kUlL8W"
          }
        ));
        document.cookie = `locale=${formValues.locale};path=/;max-age=31536000`;
        if (form.isDirty("locale")) {
          window.location.reload();
        }
      },
      onError: (error) => {
        errorHandler(form, error);
      }
    });
  };
  const handleCancelEmailChange = () => {
    cancelEmailChangeMutation.mutate({
      userId: me == null ? void 0 : me.id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "HqP6Qf"
          }
        ));
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "fWsBTs"
          }
        ));
      }
    });
  };
  const handleEmailConfirmationResend = () => {
    resendEmailConfirmationMutation.mutate({
      userId: me == null ? void 0 : me.id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "YaCgdO"
          }
        ));
        setEmailConfirmationResent(true);
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "fWsBTs"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
    /* @__PURE__ */ jsx("h1", { children: i18n._(
      /*i18n*/
      {
        id: "cQrNR3"
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { className: classes.tabsCard, children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "profile", children: [
      /* @__PURE__ */ jsxs(Tabs.List, { grow: true, children: [
        /* @__PURE__ */ jsx(Tabs.Tab, { value: "profile", leftSection: /* @__PURE__ */ jsx(IconUser, {}), children: i18n._(
          /*i18n*/
          {
            id: "vERlcd"
          }
        ) }),
        /* @__PURE__ */ jsx(Tabs.Tab, { value: "password", leftSection: /* @__PURE__ */ jsx(IconPassword, {}), children: i18n._(
          /*i18n*/
          {
            id: "8ZsakT"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "profile", children: /* @__PURE__ */ jsxs("div", { className: classes.tabWrapper, children: [
        (me == null ? void 0 : me.has_pending_email_change) && /* @__PURE__ */ jsxs(Callout, { variant: "info", className: classes.emailChangeAlert, title: i18n._(
          /*i18n*/
          {
            id: "mISwW1"
          }
        ), children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "3ENYTQ", values: {
            0: me == null ? void 0 : me.pending_email
          }, components: {
            0: /* @__PURE__ */ jsx("b", {})
          } }) }),
          /* @__PURE__ */ jsx("p", { children: i18n._(
            /*i18n*/
            {
              id: "6fLyj/"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Button, { onClick: handleCancelEmailChange, size: "xs", children: i18n._(
            /*i18n*/
            {
              id: "Gjt/py"
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsx("form", { onSubmit: profileForm.onSubmit((values) => handleProfileFormSubmit(values, profileForm)), children: /* @__PURE__ */ jsxs("fieldset", { disabled: isFetching, children: [
          /* @__PURE__ */ jsxs(Fieldset, { legend: /* @__PURE__ */ jsxs("span", { className: classes.fieldsetLegend, children: [
            /* @__PURE__ */ jsx(IconUser, { size: 16 }),
            i18n._(
              /*i18n*/
              {
                id: "6kPk3+"
              }
            )
          ] }), children: [
            /* @__PURE__ */ jsxs(InputGroup, { children: [
              /* @__PURE__ */ jsx(TextInput, { required: true, ...profileForm.getInputProps("first_name"), label: i18n._(
                /*i18n*/
                {
                  id: "kODvZJ"
                }
              ) }),
              /* @__PURE__ */ jsx(TextInput, { required: true, ...profileForm.getInputProps("last_name"), label: i18n._(
                /*i18n*/
                {
                  id: "UXBCwc"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(TextInput, { required: true, ...profileForm.getInputProps("email"), label: i18n._(
              /*i18n*/
              {
                id: "O3oNi5"
              }
            ) }),
            me && !me.is_email_verified && !emailConfirmationResent && /* @__PURE__ */ jsxs(Callout, { variant: "tip", style: {
              marginTop: 10
            }, title: i18n._(
              /*i18n*/
              {
                id: "I6F3cp"
              }
            ), children: [
              /* @__PURE__ */ jsx("p", { children: i18n._(
                /*i18n*/
                {
                  id: "igBrCH"
                }
              ) }),
              /* @__PURE__ */ jsx(Button, { size: "xs", onClick: handleEmailConfirmationResend, children: resendEmailConfirmationMutation.isPending ? i18n._(
                /*i18n*/
                {
                  id: "o6+Y6d"
                }
              ) : i18n._(
                /*i18n*/
                {
                  id: "lnrkNz"
                }
              ) })
            ] }),
            emailConfirmationResent && /* @__PURE__ */ jsx(Callout, { variant: "success", style: {
              marginTop: 10
            }, title: i18n._(
              /*i18n*/
              {
                id: "APuxIE"
              }
            ), children: i18n._(
              /*i18n*/
              {
                id: "Ajavq0"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Fieldset, { mt: 20, legend: /* @__PURE__ */ jsxs("span", { className: classes.fieldsetLegend, children: [
            /* @__PURE__ */ jsx(IconWorld, { size: 16 }),
            i18n._(
              /*i18n*/
              {
                id: "rYXfOA"
              }
            )
          ] }), children: /* @__PURE__ */ jsxs(InputGroup, { children: [
            /* @__PURE__ */ jsx(Select, { required: true, searchable: true, data: timezones, ...profileForm.getInputProps("timezone"), label: i18n._(
              /*i18n*/
              {
                id: "40Gx0U"
              }
            ), placeholder: i18n._(
              /*i18n*/
              {
                id: "vgwVkd"
              }
            ) }),
            /* @__PURE__ */ jsx(NativeSelect, { required: true, data: localeSelectData, value: profileForm.values.locale || "", onChange: (e) => profileForm.setFieldValue("locale", e.target.value), label: i18n._(
              /*i18n*/
              {
                id: "vXIe7J"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(Fieldset, { mt: 20, legend: /* @__PURE__ */ jsxs("span", { className: classes.fieldsetLegend, children: [
            /* @__PURE__ */ jsx(IconMail, { size: 16 }),
            i18n._(
              /*i18n*/
              {
                id: "rPA+Gc"
              }
            )
          ] }), children: /* @__PURE__ */ jsx(Checkbox, { ...profileForm.getInputProps("marketing_opt_in", {
            type: "checkbox"
          }), label: /* @__PURE__ */ jsx(Trans, { id: "xzRvs4", values: {
            0: getConfig("VITE_APP_NAME", "Coursify")
          } }) }) }),
          /* @__PURE__ */ jsx(Button, { fullWidth: true, loading: mutation.isPending, mt: "lg", type: "submit", children: i18n._(
            /*i18n*/
            {
              id: "vXPSuB"
            }
          ) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "password", children: /* @__PURE__ */ jsx("div", { className: classes.tabWrapper, children: /* @__PURE__ */ jsx("form", { onSubmit: passwordForm.onSubmit((values) => handleProfileFormSubmit(values, passwordForm)), children: /* @__PURE__ */ jsxs("fieldset", { disabled: isFetching, children: [
        /* @__PURE__ */ jsx(PasswordInput, { required: true, ...passwordForm.getInputProps("current_password"), label: i18n._(
          /*i18n*/
          {
            id: "DCKkhU"
          }
        ) }),
        /* @__PURE__ */ jsx(PasswordInput, { required: true, ...passwordForm.getInputProps("password"), label: i18n._(
          /*i18n*/
          {
            id: "7vhWI8"
          }
        ) }),
        /* @__PURE__ */ jsx(PasswordInput, { required: true, ...passwordForm.getInputProps("password_confirmation"), label: i18n._(
          /*i18n*/
          {
            id: "yjkELF"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { fullWidth: true, loading: mutation.isPending, type: "submit", children: i18n._(
          /*i18n*/
          {
            id: "GptGxg"
          }
        ) })
      ] }) }) }) })
    ] }) })
  ] });
};
export {
  ManageProfile,
  ManageProfile as default
};

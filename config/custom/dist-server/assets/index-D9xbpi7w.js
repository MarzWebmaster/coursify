import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { TextInput, Select, Button } from "@mantine/core";
import { a as currencies } from "./currencies-wzczGcKi.js";
import { t as timezones } from "./timezones-CsvfI1Rm.js";
import { useForm } from "@mantine/form";
import { a as accountClasses } from "./ManageAccount.module-DbFPjLmV.js";
import { a as accountClient, u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { useEffect } from "react";
import { C as Card } from "./index-jHMtuNEo.js";
import { H as HeadingCard } from "./index-D8DZtV6f.js";
import { useMutation } from "@tanstack/react-query";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { u as useIsCurrentUserAdmin } from "./useIsCurrentUserAdmin-DKXhmYit.js";
import "../entry.server.js";
import "react-dom/server";
import "react-router";
import "@tabler/icons-react";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const useUpdateAccount = () => {
  return useMutation({
    mutationFn: ({
      accountData
    }) => accountClient.updateAccount(accountData)
  });
};
const AccountSettings = () => {
  const form = useForm({
    initialValues: {
      name: "",
      currency_code: "",
      timezone: ""
    }
  });
  const accountQuery = useGetAccount();
  const updateMutation = useUpdateAccount();
  const formErrorHandler = useFormErrorResponseHandler();
  const isUserAdmin = useIsCurrentUserAdmin();
  useEffect(() => {
    if (accountQuery.data) {
      form.setValues(accountQuery.data);
    }
  }, [accountQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      accountData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "OmylXO"
          }
        ));
      },
      onError: (error) => {
        formErrorHandler(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeadingCard, { heading: i18n._(
      /*i18n*/
      {
        id: "AeXO77"
      }
    ), subHeading: i18n._(
      /*i18n*/
      {
        id: "DdHfeW"
      }
    ) }),
    /* @__PURE__ */ jsxs(Card, { className: accountClasses.tabContent, children: [
      /* @__PURE__ */ jsx(LoadingMask, {}),
      /* @__PURE__ */ jsx("fieldset", { disabled: updateMutation.isPending || accountQuery.isLoading || !isUserAdmin, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("name"), label: i18n._(
          /*i18n*/
          {
            id: "lkNdiH"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "6YtxFj"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "ROR8QD"
          }
        ) }),
        /* @__PURE__ */ jsx(Select, { searchable: true, data: Object.entries(currencies).map(([key, value]) => ({
          value,
          label: key
        })), ...form.getInputProps("currency_code"), label: i18n._(
          /*i18n*/
          {
            id: "Q2lUR2"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "5/63nR"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "QXlz+n"
          }
        ) }),
        /* @__PURE__ */ jsx(Select, { mb: 0, searchable: true, data: timezones, ...form.getInputProps("timezone"), label: i18n._(
          /*i18n*/
          {
            id: "40Gx0U"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "vgwVkd"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "mnafgQ"
          }
        ) }),
        isUserAdmin && /* @__PURE__ */ jsx("div", { className: accountClasses.footer, children: /* @__PURE__ */ jsx(Button, { disabled: updateMutation.isPending, type: "submit", fullWidth: true, children: i18n._(
          /*i18n*/
          {
            id: "UGT5vp"
          }
        ) }) })
      ] }) })
    ] })
  ] });
};
export {
  AccountSettings as default
};

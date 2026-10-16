import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { LoadingOverlay, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams, useNavigate, NavLink } from "react-router";
import { a as authClient } from "./auth.client-Bgg-Rraf.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useEffect } from "react";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import "../entry.server.js";
import "react-dom/server";
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
const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      token,
      resetData
    }) => authClient.resetPassword(token, resetData)
  });
};
const VERIFY_PASSWORD_TOKEN_QUERY_KEY = "verifyPasswordResetToken";
const useVerifyPasswordResetToken = (token) => {
  return useQuery({
    queryKey: [VERIFY_PASSWORD_TOKEN_QUERY_KEY, token],
    queryFn: async () => {
      return await authClient.verifyPasswordResetToken(token);
    },
    retry: false
  });
};
const header = "_header_104so_1";
const resetPasswordCard = "_resetPasswordCard_104so_37";
const loadingWrapper = "_loadingWrapper_104so_142";
const classes = {
  header,
  resetPasswordCard,
  loadingWrapper
};
const ResetPassword = () => {
  const form = useForm({
    initialValues: {
      password: "",
      password_confirmation: ""
    }
  });
  const {
    token
  } = useParams();
  const navigate = useNavigate();
  const mutate = useResetPassword();
  const verifyQuery = useVerifyPasswordResetToken(String(token));
  const errorHandler = useFormErrorResponseHandler();
  useEffect(() => {
    if (verifyQuery.isError) {
      showError(i18n._(
        /*i18n*/
        {
          id: "os29v1"
        }
      ));
      navigate("/auth/login");
    }
  }, [verifyQuery.isError]);
  if (verifyQuery.isLoading) {
    return /* @__PURE__ */ jsx("div", { className: classes.loadingWrapper, children: /* @__PURE__ */ jsx(LoadingOverlay, { visible: true }) });
  }
  const handleSubmit = (values) => mutate.mutate({
    token: String(token),
    resetData: values
  }, {
    onError: (error) => {
      errorHandler(form, error);
    },
    onSuccess: () => {
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "BLTZ42"
        }
      ));
      navigate("/auth/login");
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: classes.header, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "eWEV9G"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "PFjJxY"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.resetPasswordCard, children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
        /* @__PURE__ */ jsx(PasswordInput, { ...form.getInputProps("password"), label: i18n._(
          /*i18n*/
          {
            id: "7vhWI8"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "VpwcSk"
          }
        ), required: true }),
        /* @__PURE__ */ jsx(PasswordInput, { ...form.getInputProps("password_confirmation"), label: i18n._(
          /*i18n*/
          {
            id: "p2/GCq"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "JRQitQ"
          }
        ), required: true }),
        /* @__PURE__ */ jsx(Button, { color: "secondary.5", type: "submit", fullWidth: true, loading: mutate.isPending, disabled: mutate.isPending, children: mutate.isPending ? i18n._(
          /*i18n*/
          {
            id: "kCn6wb"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "RfwZxd"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx(NavLink, { to: "/auth/login", children: i18n._(
        /*i18n*/
        {
          id: "VCoEm+"
        }
      ) }) })
    ] })
  ] });
};
export {
  ResetPassword,
  ResetPassword as default
};

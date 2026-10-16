import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { a as showError } from "./notifications-Coh3Ef-t.js";
import { a as authClient } from "./auth.client-Bgg-Rraf.js";
import { useState } from "react";
import { NavLink } from "react-router";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";
import "@mantine/notifications";
import "../entry.server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const header = "_header_1dcz7_1";
const forgotPasswordCard = "_forgotPasswordCard_1dcz7_37";
const successMessage = "_successMessage_1dcz7_142";
const successIcon = "_successIcon_1dcz7_153";
const classes = {
  header,
  forgotPasswordCard,
  successMessage,
  successIcon
};
const ForgotPassword = () => {
  const form = useForm({
    initialValues: {
      email: ""
    }
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const mutate = useMutation({
    mutationFn: (email) => {
      return authClient.forgotPassword({
        email
      });
    },
    onSuccess: () => {
      setShowSuccessMessage(true);
    },
    onError: () => {
      showError(i18n._(
        /*i18n*/
        {
          id: "KTxc6k"
        }
      ));
    }
  });
  if (showSuccessMessage) {
    return /* @__PURE__ */ jsxs("div", { className: classes.successMessage, children: [
      /* @__PURE__ */ jsx("div", { className: classes.successIcon, children: /* @__PURE__ */ jsx(IconCheck, { size: 24 }) }),
      /* @__PURE__ */ jsx("h3", { children: i18n._(
        /*i18n*/
        {
          id: "v4fiSg"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "iIEaNB"
        }
      ) }),
      /* @__PURE__ */ jsxs(NavLink, { to: "/auth/login", children: [
        /* @__PURE__ */ jsx(IconArrowLeft, { size: 14 }),
        i18n._(
          /*i18n*/
          {
            id: "VCoEm+"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: classes.header, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "RfwZxd"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "VmXiz4"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.forgotPasswordCard, children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => mutate.mutate(values.email)), children: [
        /* @__PURE__ */ jsx(TextInput, { type: "email", ...form.getInputProps("email"), label: i18n._(
          /*i18n*/
          {
            id: "O3oNi5"
          }
        ), placeholder: "you@example.com", required: true }),
        /* @__PURE__ */ jsx(Button, { color: "secondary.5", type: "submit", fullWidth: true, loading: mutate.isPending, disabled: mutate.isPending, children: mutate.isPending ? i18n._(
          /*i18n*/
          {
            id: "IoAuJG"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "eaUTwS"
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
  ForgotPassword,
  ForgotPassword as default
};

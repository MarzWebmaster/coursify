import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { TextInput, PasswordInput, Button, UnstyledButton, Collapse } from "@mantine/core";
import { useLocation, NavLink } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { a as authClient } from "./auth.client-Bgg-Rraf.js";
import { useForm } from "@mantine/form";
import { r as redirectToPreviousUrl } from "../entry.server.js";
import { useState, useEffect } from "react";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { u as useSendTicketLookupEmail } from "./useSendTicketLookupEmail-DzId01R5.js";
import { a as showError } from "./notifications-Coh3Ef-t.js";
import { IconTicket, IconChevronDown } from "@tabler/icons-react";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const header = "_header_8mkar_1";
const loginCard = "_loginCard_8mkar_37";
const passwordLabelRow = "_passwordLabelRow_8mkar_126";
const ticketLookup = "_ticketLookup_8mkar_148";
const ticketLookupTrigger = "_ticketLookupTrigger_8mkar_160";
const chevron = "_chevron_8mkar_193";
const ticketLookupContent = "_ticketLookupContent_8mkar_201";
const ticketLookupForm = "_ticketLookupForm_8mkar_205";
const ticketEmailInput = "_ticketEmailInput_8mkar_255";
const successMessage = "_successMessage_8mkar_259";
const resetLink = "_resetLink_8mkar_277";
const classes$1 = {
  header,
  loginCard,
  passwordLabelRow,
  ticketLookup,
  ticketLookupTrigger,
  chevron,
  ticketLookupContent,
  ticketLookupForm,
  ticketEmailInput,
  successMessage,
  resetLink
};
const accountRow = "_accountRow_vx0bi_1";
const classes = {
  accountRow
};
const ChooseAccountModal = ({
  onAccountChosen,
  accounts
}) => {
  return /* @__PURE__ */ jsxs(Modal, { heading: i18n._(
    /*i18n*/
    {
      id: "/Jizh9"
    }
  ), withCloseButton: false, onClose: () => {
  }, opened: true, children: [
    /* @__PURE__ */ jsx("p", { children: i18n._(
      /*i18n*/
      {
        id: "BRArmD"
      }
    ) }),
    accounts.map((account) => /* @__PURE__ */ jsx("div", { className: classes.accountRow, onClick: () => onAccountChosen(account.id), children: account.name }, account.id))
  ] });
};
const Login = () => {
  const location = useLocation();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      account_id: ""
    }
  });
  const [showChooseAccount, setShowChooseAccount] = useState(false);
  const [ticketLookupOpen, setTicketLookupOpen] = useState(false);
  const ticketLookupForm2 = useForm({
    initialValues: {
      email: ""
    }
  });
  const [ticketLookupSuccess, setTicketLookupSuccess] = useState(false);
  const {
    mutate: loginUser,
    isPending,
    data
  } = useMutation({
    mutationFn: (userData) => authClient.login(userData),
    onSuccess: (response) => {
      if (response.token) {
        redirectToPreviousUrl();
        return;
      }
      if (response.accounts.length > 1) {
        setShowChooseAccount(true);
        return;
      }
    },
    onError: () => {
      notifications.show({
        message: i18n._(
          /*i18n*/
          {
            id: "TkQVup"
          }
        ),
        color: "red",
        position: "top-center"
      });
    }
  });
  const ticketLookupMutation = useSendTicketLookupEmail();
  useEffect(() => {
    form.values.account_id && loginUser(form.values);
  }, [form.values.account_id]);
  const handleTicketLookup = (values) => {
    ticketLookupMutation.mutate(values.email, {
      onSuccess: () => {
        setTicketLookupSuccess(true);
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: classes$1.header, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "9eF5oV"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "352VU2", components: {
        0: /* @__PURE__ */ jsx(NavLink, { to: `/auth/register${location.search}` })
      } }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes$1.loginCard, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => loginUser(values)), children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("email"), label: i18n._(
        /*i18n*/
        {
          id: "O3oNi5"
        }
      ), placeholder: "you@example.com", required: true }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.passwordLabelRow, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "login-password", children: i18n._(
          /*i18n*/
          {
            id: "8ZsakT"
          }
        ) }),
        /* @__PURE__ */ jsx(NavLink, { to: `/auth/forgot-password`, tabIndex: -1, children: i18n._(
          /*i18n*/
          {
            id: "UNMVei"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(PasswordInput, { ...form.getInputProps("password"), id: "login-password", placeholder: i18n._(
        /*i18n*/
        {
          id: "9TO8nT"
        }
      ), required: true }),
      /* @__PURE__ */ jsx(Button, { color: "secondary.5", type: "submit", fullWidth: true, loading: isPending, disabled: isPending, mt: "lg", children: isPending ? i18n._(
        /*i18n*/
        {
          id: "zUDyah"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "sQia9P"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.ticketLookup, children: [
      /* @__PURE__ */ jsxs(UnstyledButton, { className: classes$1.ticketLookupTrigger, onClick: () => setTicketLookupOpen(!ticketLookupOpen), "data-expanded": ticketLookupOpen, children: [
        /* @__PURE__ */ jsx(IconTicket, { size: 18 }),
        /* @__PURE__ */ jsx("span", { children: i18n._(
          /*i18n*/
          {
            id: "MxjCqk"
          }
        ) }),
        /* @__PURE__ */ jsx(IconChevronDown, { size: 16, className: classes$1.chevron, "data-expanded": ticketLookupOpen })
      ] }),
      /* @__PURE__ */ jsx(Collapse, { expanded: ticketLookupOpen, children: /* @__PURE__ */ jsx("div", { className: classes$1.ticketLookupContent, children: ticketLookupSuccess ? /* @__PURE__ */ jsxs("div", { className: classes$1.successMessage, children: [
        /* @__PURE__ */ jsx("p", { children: i18n._(
          /*i18n*/
          {
            id: "51AsAN"
          }
        ) }),
        /* @__PURE__ */ jsx(UnstyledButton, { className: classes$1.resetLink, onClick: () => {
          setTicketLookupSuccess(false);
          ticketLookupForm2.reset();
        }, children: i18n._(
          /*i18n*/
          {
            id: "ouM5IM"
          }
        ) })
      ] }) : /* @__PURE__ */ jsx("form", { onSubmit: ticketLookupForm2.onSubmit(handleTicketLookup), children: /* @__PURE__ */ jsxs("div", { className: classes$1.ticketLookupForm, children: [
        /* @__PURE__ */ jsx(TextInput, { ...ticketLookupForm2.getInputProps("email"), type: "email", placeholder: i18n._(
          /*i18n*/
          {
            id: "C3nD/1"
          }
        ), required: true, className: classes$1.ticketEmailInput }),
        /* @__PURE__ */ jsx(Button, { type: "submit", color: "secondary.5", loading: ticketLookupMutation.isPending, disabled: ticketLookupMutation.isPending, children: i18n._(
          /*i18n*/
          {
            id: "JlFcis"
          }
        ) })
      ] }) }) }) })
    ] }),
    showChooseAccount && data && /* @__PURE__ */ jsx(ChooseAccountModal, { onAccountChosen: (accountId) => {
      form.setFieldValue("account_id", accountId);
    }, accounts: data.accounts })
  ] });
};
export {
  Login as default
};

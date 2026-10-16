import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { SimpleGrid, TextInput, PasswordInput, Checkbox, Button } from "@mantine/core";
import { useForm, isEmail, matchesField, hasLength } from "@mantine/form";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useMutation } from "@tanstack/react-query";
import { a as authClient } from "./auth.client-Bgg-Rraf.js";
import { useNavigate, useLocation, NavLink } from "react-router";
import { g as getClientLocale, a as getConfig } from "../entry.server.js";
import { useEffect } from "react";
import { g as getUserCurrency } from "./currency-Br7a8J7F.js";
import "./notifications-Coh3Ef-t.js";
import "@mantine/notifications";
import "@tabler/icons-react";
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
const useRegisterAccount = () => {
  return useMutation({
    mutationFn: ({
      registerData
    }) => authClient.register(registerData)
  });
};
const header = "_header_k3bzg_1";
const registerCard = "_registerCard_k3bzg_37";
const classes = {
  header,
  registerCard
};
const UTM_STORAGE_KEY = "hi_events_utm_first_touch";
function captureUtmData() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(UTM_STORAGE_KEY)) return;
  const params = new URLSearchParams(window.location.search);
  const rawParams = {};
  params.forEach((value, key) => {
    if (key.startsWith("utm_") || ["gclid", "fbclid", "ref"].includes(key)) {
      rawParams[key] = value;
    }
  });
  const utmData = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    referrer_url: document.referrer || null,
    landing_page: window.location.href,
    gclid: params.get("gclid"),
    fbclid: params.get("fbclid"),
    utm_raw: Object.keys(rawParams).length > 0 ? rawParams : null
  };
  if (hasUtmData(utmData)) {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  }
}
function getStoredUtmData() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(UTM_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}
function clearStoredUtmData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(UTM_STORAGE_KEY);
}
function hasUtmData(data) {
  return !!(data.utm_source || data.utm_medium || data.utm_campaign || data.gclid || data.fbclid);
}
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      timezone: typeof window !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
      locale: getClientLocale(),
      invite_token: "",
      currency_code: getUserCurrency(),
      marketing_opt_in: false
    },
    validate: {
      password: hasLength({
        min: 8
      }, i18n._(
        /*i18n*/
        {
          id: "vwGkYB"
        }
      )),
      password_confirmation: matchesField("password", i18n._(
        /*i18n*/
        {
          id: "f7SUun"
        }
      )),
      email: isEmail(i18n._(
        /*i18n*/
        {
          id: "sMiGXD"
        }
      ))
    }
  });
  const errorHandler = useFormErrorResponseHandler();
  const mutate = useRegisterAccount();
  const registerUser = (data) => {
    const utmData = getStoredUtmData();
    const registrationData = utmData ? {
      ...data,
      ...utmData
    } : data;
    mutate.mutate({
      registerData: registrationData
    }, {
      onSuccess: () => {
        clearStoredUtmData();
        navigate(`/welcome${location.search}`);
      },
      onError: (error) => {
        var _a, _b;
        errorHandler(form, error, (_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message);
      }
    });
  };
  useEffect(() => {
    captureUtmData();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("invite_token");
    if (token) {
      form.setFieldValue("invite_token", token);
    }
  }, [location.search]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: classes.header, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "ZDIydz"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "ocS8eq", values: {
        0: i18n._(
          /*i18n*/
          {
            id: "sQia9P"
          }
        )
      }, components: {
        0: /* @__PURE__ */ jsx(NavLink, { to: `/auth/login${location.search}` })
      } }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes.registerCard, children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => registerUser(values)), children: [
        /* @__PURE__ */ jsxs(SimpleGrid, { verticalSpacing: {
          base: "md",
          sm: 0
        }, cols: {
          base: 1,
          sm: 2
        }, mb: "md", children: [
          /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("first_name"), label: i18n._(
            /*i18n*/
            {
              id: "kODvZJ"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "KFXip/"
            }
          ), required: true }),
          /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("last_name"), label: i18n._(
            /*i18n*/
            {
              id: "UXBCwc"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "YSEnLE"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(TextInput, { mb: 0, ...form.getInputProps("email"), label: i18n._(
          /*i18n*/
          {
            id: "O3oNi5"
          }
        ), placeholder: "your@email.com", required: true }),
        /* @__PURE__ */ jsxs(SimpleGrid, { verticalSpacing: {
          base: "md",
          sm: 0
        }, cols: {
          base: 1,
          sm: 2
        }, mt: "md", mb: "md", children: [
          /* @__PURE__ */ jsx(PasswordInput, { ...form.getInputProps("password"), label: i18n._(
            /*i18n*/
            {
              id: "8ZsakT"
            }
          ), placeholder: i18n._(
            /*i18n*/
            {
              id: "9TO8nT"
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
              id: "xnWESi"
            }
          ), required: true })
        ] }),
        /* @__PURE__ */ jsx(TextInput, { style: {
          display: "none"
        }, ...form.getInputProps("timezone"), type: "hidden" }),
        /* @__PURE__ */ jsx(Checkbox, { mb: "md", ...form.getInputProps("marketing_opt_in", {
          type: "checkbox"
        }), label: /* @__PURE__ */ jsx(Trans, { id: "xzRvs4", values: {
          0: getConfig("VITE_APP_NAME", "Coursify")
        } }) }),
        /* @__PURE__ */ jsx(Button, { color: "secondary.5", type: "submit", fullWidth: true, disabled: mutate.isPending, children: mutate.isPending ? i18n._(
          /*i18n*/
          {
            id: "hqmXmc"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "fgLNSM"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx(Trans, { id: "whqocw", components: {
        0: /* @__PURE__ */ jsx(NavLink, { target: "_blank", to: getConfig("VITE_TOS_URL", "https://coursify.guru/terms-of-service?utm_source=app-register-footer") }),
        1: /* @__PURE__ */ jsx(NavLink, { target: "_blank", to: getConfig("VITE_PRIVACY_URL", "https://coursify.guru/privacy-policy?utm_source=app-register-footer") })
      } }) })
    ] })
  ] });
};
export {
  Register,
  Register as default
};

import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { TextInput, Select, PasswordInput, Checkbox, Anchor, Button } from "@mantine/core";
import { t as timezones } from "./timezones-CsvfI1Rm.js";
import { useNavigate, useParams } from "react-router";
import { useForm, isEmail, matchesField, hasLength } from "@mantine/form";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { a as authClient } from "./auth.client-Bgg-Rraf.js";
import { useEffect } from "react";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { a as getConfig } from "../entry.server.js";
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
const GET_INVITATION_QUERY_KEY = "getInvitation";
const useGetInvitation = (token) => {
  return useQuery({
    queryKey: [GET_INVITATION_QUERY_KEY, token],
    queryFn: async () => {
      return await authClient.getInvitation(token);
    },
    retry: false
  });
};
const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: ({
      token,
      userData
    }) => authClient.acceptInvitation(token, userData)
  });
};
const header = "_header_j2s4m_1";
const invitationCard = "_invitationCard_j2s4m_37";
const inputGroup = "_inputGroup_j2s4m_140";
const classes = {
  header,
  invitationCard,
  inputGroup
};
const AcceptInvitation = () => {
  const navigate = useNavigate();
  const {
    token
  } = useParams();
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      timezone: "",
      password_confirmation: "",
      terms: false,
      marketing_opt_in: true
    },
    validate: {
      first_name: hasLength({
        min: 1,
        max: 50
      }, i18n._(
        /*i18n*/
        {
          id: "S+tm06"
        }
      )),
      password: hasLength({
        min: 8
      }, i18n._(
        /*i18n*/
        {
          id: "TUJAyx"
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
      )),
      terms: (value) => value === true ? null : i18n._(
        /*i18n*/
        {
          id: "3ZI8IL"
        }
      )
    }
  });
  const {
    data: user,
    isFetched,
    isError,
    error
  } = useGetInvitation(String(token));
  const errorHandler = useFormErrorResponseHandler();
  const acceptInvitationMutation = useAcceptInvitation();
  useEffect(() => {
    var _a, _b;
    if (!isError) {
      return;
    }
    showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
      /*i18n*/
      {
        id: "nwtY4N"
      }
    ));
    navigate("/auth/login");
  }, [isError]);
  useEffect(() => {
    var _a, _b, _c, _d, _e;
    if (!user) {
      return;
    }
    if (((_a = user == null ? void 0 : user.data) == null ? void 0 : _a.status) !== "INVITED") {
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "Z6q0Vl"
        }
      ));
      navigate("/auth/login");
    }
    form.setValues({
      first_name: (_b = user == null ? void 0 : user.data) == null ? void 0 : _b.first_name,
      last_name: (_c = user == null ? void 0 : user.data) == null ? void 0 : _c.last_name,
      email: (_d = user == null ? void 0 : user.data) == null ? void 0 : _d.email,
      timezone: (_e = user == null ? void 0 : user.data) == null ? void 0 : _e.timezone
    });
  }, [isFetched]);
  const handleSubmit = (values) => {
    acceptInvitationMutation.mutate({
      userData: values,
      token: String(token)
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "LuY52w"
          }
        ));
        navigate("/auth/login");
      },
      onError: (error2) => errorHandler(form, error2)
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: classes.header, children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "K5+3xg"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "xGU92i"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes.invitationCard, children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: !isFetched, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.inputGroup, children: [
        /* @__PURE__ */ jsx(TextInput, { required: true, ...form.getInputProps("first_name"), label: i18n._(
          /*i18n*/
          {
            id: "kODvZJ"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "KFXip/"
          }
        ) }),
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
      /* @__PURE__ */ jsxs("div", { className: classes.inputGroup, children: [
        /* @__PURE__ */ jsx(TextInput, { disabled: true, required: true, ...form.getInputProps("email"), label: i18n._(
          /*i18n*/
          {
            id: "O3oNi5"
          }
        ) }),
        /* @__PURE__ */ jsx(Select, { required: true, searchable: true, data: timezones, ...form.getInputProps("timezone"), label: i18n._(
          /*i18n*/
          {
            id: "40Gx0U"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "aT3jZX"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.inputGroup, children: [
        /* @__PURE__ */ jsx(PasswordInput, { ...form.getInputProps("password"), label: i18n._(
          /*i18n*/
          {
            id: "8ZsakT"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "yIRev4"
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
      /* @__PURE__ */ jsx(Checkbox, { ...form.getInputProps("terms", {
        type: "checkbox"
      }), label: /* @__PURE__ */ jsx(Trans, { id: "uOXLV3", components: {
        0: /* @__PURE__ */ jsx(Anchor, { target: "_blank", href: getConfig("VITE_TOS_URL", "https://coursify.guru/terms-of-service") })
      } }) }),
      /* @__PURE__ */ jsx(Checkbox, { mb: "md", ...form.getInputProps("marketing_opt_in", {
        type: "checkbox"
      }), label: /* @__PURE__ */ jsx(Trans, { id: "xzRvs4", values: {
        0: getConfig("VITE_APP_NAME", "Coursify")
      } }) }),
      /* @__PURE__ */ jsx(Button, { color: "secondary.5", fullWidth: true, loading: acceptInvitationMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "bfXQ+N"
        }
      ) })
    ] }) }) })
  ] });
};
export {
  AcceptInvitation as default
};

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useParams, useNavigate } from "react-router";
import { b as userClient, G as GET_ME_QUERY_KEY, u as useGetMe } from "../entry.server.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button, Anchor } from "@mantine/core";
import { C as Card } from "./index-jHMtuNEo.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import "react-dom/server";
import "@tabler/icons-react";
import "react";
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
const useConfirmEmailChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      token
    }) => userClient.confirmEmailChange(userId, token),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [GET_ME_QUERY_KEY]
      });
    }
  });
};
const MessageCard = ({
  message,
  linkText,
  linkHref
}) => /* @__PURE__ */ jsxs(Card, { style: {
  marginTop: "var(--hi-spacing-lg)"
}, children: [
  message,
  " ",
  /* @__PURE__ */ jsx(Anchor, { href: linkHref, children: linkText }),
  "."
] });
const ConfirmEmailChange = () => {
  const {
    token
  } = useParams();
  const {
    data: userData,
    isFetched
  } = useGetMe();
  const navigate = useNavigate();
  const {
    mutate
  } = useConfirmEmailChange();
  if (!token) {
    return /* @__PURE__ */ jsx(MessageCard, { message: i18n._(
      /*i18n*/
      {
        id: "NlfnUd"
      }
    ), linkText: i18n._(
      /*i18n*/
      {
        id: "4D3rRj"
      }
    ), linkHref: "/manage/profile" });
  }
  const confirmChange = () => {
    mutate({
      token,
      userId: userData == null ? void 0 : userData.id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "IKwyaF"
          }
        ));
        navigate("/manage/profile");
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "a6gga1"
          }
        ));
      }
    });
  };
  if (isFetched && !(userData == null ? void 0 : userData.pending_email)) {
    return /* @__PURE__ */ jsx(MessageCard, { message: i18n._(
      /*i18n*/
      {
        id: "15qAvl"
      }
    ), linkText: i18n._(
      /*i18n*/
      {
        id: "4D3rRj"
      }
    ), linkHref: "/manage/profile" });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: isFetched && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { children: i18n._(
      /*i18n*/
      {
        id: "ZaEJZM"
      }
    ) }),
    /* @__PURE__ */ jsxs(Card, { style: {
      marginTop: "var(--hi-spacing-lg)"
    }, children: [
      /* @__PURE__ */ jsx(Trans, { id: "P+Sty0", values: {
        0: userData == null ? void 0 : userData.pending_email
      }, components: {
        0: /* @__PURE__ */ jsx("b", {})
      } }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Button, { onClick: confirmChange, children: i18n._(
        /*i18n*/
        {
          id: "ZaEJZM"
        }
      ) }) })
    ] })
  ] }) });
};
export {
  ConfirmEmailChange,
  ConfirmEmailChange as default
};

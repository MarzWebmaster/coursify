import { jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useNavigate } from "react-router";
import { b as userClient, G as GET_ME_QUERY_KEY, u as useGetMe } from "../entry.server.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import "react-dom/server";
import "@mantine/core";
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
const useConfirmEmailAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      token
    }) => userClient.confirmEmailAddress(userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ME_QUERY_KEY]
      });
    }
  });
};
const ConfirmEmailAddress = () => {
  const {
    token
  } = useParams();
  const {
    data: userData,
    isFetched
  } = useGetMe();
  const navigate = useNavigate();
  const confirmEmailAddressMutation = useConfirmEmailAddress();
  const confirmEmail = () => {
    if (!(userData == null ? void 0 : userData.id)) {
      return;
    }
    confirmEmailAddressMutation.mutate({
      token,
      userId: userData == null ? void 0 : userData.id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "OtgNFx"
          }
        ));
        navigate("/manage/events");
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "3Z223G"
          }
        ));
      }
    });
  };
  useEffect(() => confirmEmail(), [isFetched]);
  return /* @__PURE__ */ jsx(Card, { style: {
    marginTop: "var(--hi-spacing-lg)"
  }, children: /* @__PURE__ */ jsx("p", { children: i18n._(
    /*i18n*/
    {
      id: "wnDgGj"
    }
  ) }) });
};
export {
  ConfirmEmailAddress as default
};

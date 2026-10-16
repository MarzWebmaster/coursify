import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { Alert, Button, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertTriangle, IconTrash } from "@tabler/icons-react";
import { a as accountClient, G as GET_ACCOUNT_QUERY_KEY, u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { u as useGetMe } from "../entry.server.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { p as prettyDate } from "./dates-CbVpwZeX.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { H as HeadingCard } from "./index-D8DZtV6f.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import "react-dom/server";
import "react-router";
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
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
const GET_ACCOUNT_DELETION_STATUS_QUERY_KEY = "getAccountDeletionStatus";
const useGetAccountDeletionStatus = () => {
  return useQuery({
    queryKey: [GET_ACCOUNT_DELETION_STATUS_QUERY_KEY],
    queryFn: async () => {
      const {
        data
      } = await accountClient.getDeletionStatus();
      return data;
    }
  });
};
const useRequestAccountDeletion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => accountClient.requestDeletion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ACCOUNT_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_ACCOUNT_DELETION_STATUS_QUERY_KEY]
      });
    }
  });
};
const useCancelAccountDeletion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => accountClient.cancelDeletion(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ACCOUNT_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_ACCOUNT_DELETION_STATUS_QUERY_KEY]
      });
    }
  });
};
const card = "_card_1ebw6_1";
const modalText = "_modalText_1ebw6_11";
const classes = {
  card,
  modalText
};
const DangerZone = () => {
  const accountQuery = useGetAccount();
  const deletionStatusQuery = useGetAccountDeletionStatus();
  const {
    data: me
  } = useGetMe();
  const requestDeletionMutation = useRequestAccountDeletion();
  const cancelDeletionMutation = useCancelAccountDeletion();
  const formErrorHandler = useFormErrorResponseHandler();
  const [modalOpened, {
    open: openModal,
    close: closeModal
  }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      confirmation: "",
      reason: ""
    }
  });
  const account = accountQuery.data;
  const deletionStatus = deletionStatusQuery.data;
  const isOwner = !!(me == null ? void 0 : me.is_account_owner);
  if (!account || !deletionStatus) {
    return /* @__PURE__ */ jsx(LoadingMask, {});
  }
  const pendingRequest = deletionStatus.deletion_request;
  const willBeAnonymized = deletionStatus.expected_outcome === "ANONYMIZE";
  const handleRequestDeletion = (values) => {
    requestDeletionMutation.mutate({
      confirmation: values.confirmation,
      reason: values.reason || void 0
    }, {
      onSuccess: () => {
        closeModal();
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "gsWZkk"
          }
        ));
      },
      onError: (error) => {
        var _a;
        if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 409) {
          closeModal();
          showError(error.response.data.message);
          return;
        }
        formErrorHandler(form, error);
      }
    });
  };
  const handleCancelDeletion = () => {
    cancelDeletionMutation.mutate(void 0, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "qzqe6c"
          }
        ));
      },
      onError: (error) => {
        var _a, _b;
        showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "fWsBTs"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeadingCard, { heading: i18n._(
      /*i18n*/
      {
        id: "ZQKLI1"
      }
    ), subHeading: i18n._(
      /*i18n*/
      {
        id: "dGdKgQ"
      }
    ) }),
    /* @__PURE__ */ jsxs(Card, { className: classes.card, children: [
      pendingRequest && /* @__PURE__ */ jsxs(Alert, { color: "red", icon: /* @__PURE__ */ jsx(IconAlertTriangle, {}), title: i18n._(
        /*i18n*/
        {
          id: "jCPU8z"
        }
      ), children: [
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "YI0K8C", values: {
          0: prettyDate(pendingRequest.scheduled_deletion_at, account.timezone || "UTC")
        }, components: {
          0: /* @__PURE__ */ jsx("b", {})
        } }) }),
        /* @__PURE__ */ jsx(Button, { color: "red", variant: "outline", onClick: handleCancelDeletion, loading: cancelDeletionMutation.isPending, "data-testid": "cancel-account-deletion-button", children: i18n._(
          /*i18n*/
          {
            id: "lUjTpS"
          }
        ) })
      ] }),
      !pendingRequest && !deletionStatus.can_request_deletion && /* @__PURE__ */ jsx(Alert, { color: "orange", icon: /* @__PURE__ */ jsx(IconAlertTriangle, {}), title: i18n._(
        /*i18n*/
        {
          id: "WtlP+7"
        }
      ), children: deletionStatus.cannot_delete_reason }),
      !pendingRequest && deletionStatus.can_request_deletion && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "IlUuGb" }) }),
        /* @__PURE__ */ jsx("p", { children: willBeAnonymized ? /* @__PURE__ */ jsx(Trans, { id: "lINGcL" }) : /* @__PURE__ */ jsx(Trans, { id: "1YTBzS" }) }),
        !isOwner && /* @__PURE__ */ jsx(Alert, { color: "orange", icon: /* @__PURE__ */ jsx(IconAlertTriangle, {}), children: i18n._(
          /*i18n*/
          {
            id: "Z82In9"
          }
        ) }),
        isOwner && /* @__PURE__ */ jsx(Button, { color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 18 }), onClick: openModal, "data-testid": "delete-account-button", children: i18n._(
          /*i18n*/
          {
            id: "ZDGm40"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { opened: modalOpened, onClose: closeModal, title: i18n._(
      /*i18n*/
      {
        id: "ZDGm40"
      }
    ), children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleRequestDeletion), children: [
      /* @__PURE__ */ jsx("p", { className: classes.modalText, children: /* @__PURE__ */ jsx(Trans, { id: "4yx4a4", values: {
        0: account.name
      }, components: {
        0: /* @__PURE__ */ jsx("b", {})
      } }) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("confirmation"), label: i18n._(
        /*i18n*/
        {
          id: "F9cvwz"
        }
      ), placeholder: account.name, required: true }),
      /* @__PURE__ */ jsx(Textarea, { ...form.getInputProps("reason"), label: i18n._(
        /*i18n*/
        {
          id: "jPSk57"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "URTkcd"
        }
      ), mt: "md" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", color: "red", fullWidth: true, mt: "lg", disabled: form.values.confirmation.trim().toLowerCase() !== account.name.trim().toLowerCase(), loading: requestDeletionMutation.isPending, "data-testid": "confirm-account-deletion-button", children: i18n._(
        /*i18n*/
        {
          id: "/4mGVp"
        }
      ) })
    ] }) })
  ] });
};
export {
  DangerZone as default
};

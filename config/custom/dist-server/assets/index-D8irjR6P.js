import { jsx, jsxs } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useForm } from "@mantine/form";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { SimpleGrid, TextInput, Button } from "@mantine/core";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { b as userClient } from "../entry.server.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { IconUserShield, IconUser } from "@tabler/icons-react";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
const GET_USERS_QUERY_KEY = "getUsers";
const useGetUsers = () => {
  return useQuery({
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: async () => await userClient.all()
  });
};
const useInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      inviteUserData
    }) => userClient.invite(inviteUserData),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_USERS_QUERY_KEY]
    })
  });
};
const InviteUserModal = ({
  onClose
}) => {
  const createMutation = useInviteUser();
  const formErrorHandler = useFormErrorResponseHandler();
  const form = useForm({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      role: "ADMIN"
    }
  });
  const handleCreate = (values) => {
    createMutation.mutate({
      inviteUserData: values
    }, {
      onSuccess: () => {
        form.reset();
        onClose();
        showSuccess(/* @__PURE__ */ jsx(Trans, { id: "b0HJ45", values: {
          0: values.first_name
        } }));
      },
      onError: (error) => formErrorHandler(form, error)
    });
  };
  const calcTypeOptions = [{
    icon: /* @__PURE__ */ jsx(IconUserShield, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "U3pytU"
      }
    ),
    value: "ADMIN",
    description: i18n._(
      /*i18n*/
      {
        id: "HLDaLi"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconUser, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "G5RhpL"
      }
    ),
    value: "ORGANIZER",
    description: i18n._(
      /*i18n*/
      {
        id: "l894xP"
      }
    )
  }];
  return /* @__PURE__ */ jsx(Modal, { heading: i18n._(
    /*i18n*/
    {
      id: "g+lLS9"
    }
  ), onClose, opened: true, modalHeader: "branded", children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => handleCreate(values)), children: [
    /* @__PURE__ */ jsxs(SimpleGrid, { cols: 2, children: [
      /* @__PURE__ */ jsx(TextInput, { required: true, ...form.getInputProps("first_name"), label: i18n._(
        /*i18n*/
        {
          id: "kODvZJ"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("last_name"), label: i18n._(
        /*i18n*/
        {
          id: "UXBCwc"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(TextInput, { required: true, type: "email", ...form.getInputProps("email"), label: i18n._(
      /*i18n*/
      {
        id: "O3oNi5"
      }
    ) }),
    /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
      /*i18n*/
      {
        id: "GDvlUT"
      }
    ), optionList: calcTypeOptions, form, name: "role" }),
    /* @__PURE__ */ jsx(Button, { fullWidth: true, loading: createMutation.isPending, type: "submit", children: i18n._(
      /*i18n*/
      {
        id: "1z26sk"
      }
    ) })
  ] }) });
};
export {
  GET_USERS_QUERY_KEY as G,
  InviteUserModal as I,
  useGetUsers as u
};

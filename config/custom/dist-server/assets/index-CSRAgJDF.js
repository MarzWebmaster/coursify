import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { G as GET_USERS_QUERY_KEY, u as useGetUsers, I as InviteUserModal } from "./index-D8irjR6P.js";
import { TextInput, Select, Button, Table, Group, Avatar, Text, Badge, Menu } from "@mantine/core";
import { IconUserShield, IconUser, IconDotsVertical, IconEye, IconSend } from "@tabler/icons-react";
import { b as userClient, e as getInitials } from "../entry.server.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { H as HeadingCard } from "./index-D8DZtV6f.js";
import { r as relativeDate } from "./dates-CbVpwZeX.js";
import { useDisclosure } from "@mantine/hooks";
import { Trans } from "@lingui/react";
import { useForm } from "@mantine/form";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { useState } from "react";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import "react-dom/server";
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
const table = "_table_e1vvh_14";
const classes = {
  table
};
const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      userData
    }) => userClient.updateUser(userId, userData),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_USERS_QUERY_KEY]
    })
  });
};
const EditUserModal = ({
  onClose,
  user
}) => {
  const ediMutation = useEditUser();
  const formErrorHandler = useFormErrorResponseHandler();
  const form = useForm({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      status: String(user.status),
      role: String(user.role)
    }
  });
  const handleCreate = (values) => {
    ediMutation.mutate({
      userId: user.id,
      userData: values
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
  return /* @__PURE__ */ jsxs(Modal, { heading: i18n._(
    /*i18n*/
    {
      id: "GTOcxw"
    }
  ), onClose, opened: true, children: [
    user.status === "INVITED" && /* @__PURE__ */ jsx(Callout, { variant: "info", children: /* @__PURE__ */ jsx(Trans, { id: "IV9xTT" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => handleCreate(values)), children: [
      /* @__PURE__ */ jsxs("fieldset", { disabled: ediMutation.isPending, children: [
        /* @__PURE__ */ jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsx(TextInput, { required: true, ...form.getInputProps("first_name"), label: i18n._(
            /*i18n*/
            {
              id: "kODvZJ"
            }
          ) }),
          /* @__PURE__ */ jsx(TextInput, { required: true, ...form.getInputProps("last_name"), label: i18n._(
            /*i18n*/
            {
              id: "UXBCwc"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(TextInput, { disabled: true, readOnly: true, value: user.email, type: "email", label: i18n._(
          /*i18n*/
          {
            id: "O3oNi5"
          }
        ), description: /* @__PURE__ */ jsx(Trans, { id: "VEsDvU", components: {
          0: /* @__PURE__ */ jsx(NavLink, { target: "_blank", to: "/manage/profile" })
        } }) }),
        user.is_account_owner && /* @__PURE__ */ jsx(Callout, { variant: "info", children: i18n._(
          /*i18n*/
          {
            id: "tFbRKJ"
          }
        ) }),
        /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
          /*i18n*/
          {
            id: "GDvlUT"
          }
        ), optionList: calcTypeOptions, form, name: "role", disabled: user.is_account_owner }),
        user.status !== "INVITED" && /* @__PURE__ */ jsx(Select, { disabled: user.is_account_owner, label: i18n._(
          /*i18n*/
          {
            id: "uAQUqI"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "hAjDQy"
          }
        ), required: true, ...form.getInputProps("status"), description: i18n._(
          /*i18n*/
          {
            id: "T0K0yl"
          }
        ), data: [{
          value: "ACTIVE",
          label: i18n._(
            /*i18n*/
            {
              id: "F6pfE9"
            }
          )
        }, {
          value: "INACTIVE",
          label: i18n._(
            /*i18n*/
            {
              id: "NoNwIX"
            }
          )
        }] })
      ] }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, loading: ediMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "GTOcxw"
        }
      ) })
    ] })
  ] });
};
const useResendUserInvitation = () => {
  return useMutation({
    mutationFn: ({
      userId
    }) => userClient.resendInvitation(userId)
  });
};
const useDeleteUserInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId
    }) => userClient.deleteInvitation(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_USERS_QUERY_KEY]
      });
    }
  });
};
const Users = () => {
  var _a;
  const usersQuery = useGetUsers();
  const resendInvitationMutation = useResendUserInvitation();
  const revokeInvitationMutation = useDeleteUserInvitation();
  const users = (_a = usersQuery.data) == null ? void 0 : _a.data;
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleEdit = (user) => {
    setSelectedUser(user);
    openEditModal();
  };
  const handleResendInvitation = (user) => {
    resendInvitationMutation.mutate({
      userId: user.id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "OyLdaz"
          }
        ));
      },
      onError: (error) => {
        console.error(error);
        showError(i18n._(
          /*i18n*/
          {
            id: "YHFrbe"
          }
        ));
      }
    });
  };
  const handleRevokeInvitation = (user) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "b7tkGp"
      }
    ), () => {
      revokeInvitationMutation.mutate({
        userId: user.id
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "HE6KcK"
            }
          ));
        },
        onError: (error) => {
          console.error(error);
          showError(i18n._(
            /*i18n*/
            {
              id: "YHFrbe"
            }
          ));
        }
      });
    });
  };
  const statusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "";
      case "INVITED":
        return "orange";
      case "INACTIVE":
        return "red";
      default:
        return "gray";
    }
  };
  const rows = users == null ? void 0 : users.map((user) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
    /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Group, { gap: "sm", children: [
      /* @__PURE__ */ jsx(Avatar, { size: 40, radius: 40, children: getInitials(user.first_name + " " + user.last_name) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { fz: "sm", fw: 500, children: user.first_name + " " + user.last_name }),
        /* @__PURE__ */ jsx(Text, { fz: "xs", c: "dimmed", children: user.email })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: /* @__PURE__ */ jsxs(Group, { gap: 5, children: [
      user.role === "ORGANIZER" && /* @__PURE__ */ jsx(IconUser, { size: 14 }),
      user.role === "ADMIN" && /* @__PURE__ */ jsx(IconUserShield, { size: 14 }),
      " ",
      user.role === "ADMIN" ? i18n._(
        /*i18n*/
        {
          id: "U3pytU"
        }
      ) : user.role === "ORGANIZER" ? i18n._(
        /*i18n*/
        {
          id: "G5RhpL"
        }
      ) : user.role
    ] }) }) }),
    /* @__PURE__ */ jsx(Table.Td, { children: user.last_login_at ? relativeDate(user.last_login_at) : i18n._(
      /*i18n*/
      {
        id: "qqeAJM"
      }
    ) }),
    /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { color: statusColor(user.status), variant: "light", children: user.status === "ACTIVE" ? i18n._(
      /*i18n*/
      {
        id: "F6pfE9"
      }
    ) : user.status === "INVITED" ? i18n._(
      /*i18n*/
      {
        id: "Dn4OyV"
      }
    ) : user.status === "INACTIVE" ? i18n._(
      /*i18n*/
      {
        id: "NoNwIX"
      }
    ) : user.status }) }),
    /* @__PURE__ */ jsx(Table.Td, { width: "60px", children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { variant: "transparent", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 18 }) }) }),
      /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
        /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleEdit(user), leftSection: /* @__PURE__ */ jsx(IconEye, { size: 14 }), children: i18n._(
          /*i18n*/
          {
            id: "poTr35"
          }
        ) }),
        user.status === "INVITED" && /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleResendInvitation(user), leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), children: i18n._(
          /*i18n*/
          {
            id: "wIa8Qe"
          }
        ) }),
        user.status === "INVITED" && /* @__PURE__ */ jsx(Menu.Item, { color: "red", onClick: () => handleRevokeInvitation(user), leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), children: i18n._(
          /*i18n*/
          {
            id: "PO/sOY"
          }
        ) })
      ] })
    ] }) })
  ] }, user.id));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeadingCard, { heading: i18n._(
      /*i18n*/
      {
        id: "yDOdwQ"
      }
    ), subHeading: i18n._(
      /*i18n*/
      {
        id: "BfucwY"
      }
    ), buttonText: i18n._(
      /*i18n*/
      {
        id: "SQKPvQ"
      }
    ), buttonAction: openCreateModal, buttonDataTestId: "team-invite-button" }),
    /* @__PURE__ */ jsxs(Card, { style: {
      padding: 0,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx(LoadingMask, {}),
      /* @__PURE__ */ jsx(Table.ScrollContainer, { className: classes.table, minWidth: 800, children: /* @__PURE__ */ jsxs(Table, { verticalSpacing: "sm", children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "7PzzBU"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "GDvlUT"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "I3yitW"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "uAQUqI"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: rows })
      ] }) })
    ] }),
    createModalOpen && /* @__PURE__ */ jsx(InviteUserModal, { onClose: closeCreateModal }),
    editModalOpen && selectedUser && /* @__PURE__ */ jsx(EditUserModal, { user: selectedUser, onClose: closeEditModal })
  ] });
};
export {
  Users as default
};

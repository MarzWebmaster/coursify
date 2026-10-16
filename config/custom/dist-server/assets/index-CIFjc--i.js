import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Container, Stack, Title, Text, Group, TextInput, Select, Skeleton, Table, Badge, Tooltip, ActionIcon, Pagination, Modal, ScrollArea } from "@mantine/core";
import { IconSearch, IconMail, IconUsers, IconEye, IconCheck } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { r as relativeDate } from "./dates-CbVpwZeX.js";
import { useDisclosure } from "@mantine/hooks";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { t as tableStyles } from "./admin-table.module-CfJrGaI_.js";
import "../entry.server.js";
import "react-dom/server";
import "react-router";
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
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
const GET_ADMIN_MESSAGES_QUERY_KEY = ["admin", "messages"];
const useGetAdminMessages = (params = {}) => {
  return useQuery({
    queryKey: [...GET_ADMIN_MESSAGES_QUERY_KEY, params],
    queryFn: () => adminClient.getAllAdminMessages(params)
  });
};
const useApproveMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (messageId) => adminClient.approveMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_MESSAGES_QUERY_KEY
      });
    }
  });
};
const Messages = () => {
  var _a, _b;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [detailModalOpened, {
    open: openDetailModal,
    close: closeDetailModal
  }] = useDisclosure(false);
  const {
    data: messagesData,
    isLoading
  } = useGetAdminMessages({
    page,
    per_page: 20,
    search: debouncedSearch,
    status: statusFilter || void 0,
    type: typeFilter || void 0
  });
  const approveMutation = useApproveMessage();
  const handleApprove = (messageId) => {
    approveMutation.mutate(messageId, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "bECJqy"
          }
        ));
      }
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "sent":
        return "green";
      case "pending":
      case "pending_review":
        return "yellow";
      case "failed":
        return "red";
      case "scheduled":
        return "blue";
      case "cancelled":
        return "gray";
      case "queued":
        return "blue";
      default:
        return "gray";
    }
  };
  const getEligibilityFailureLabel = (failure) => {
    switch (failure) {
      case "stripe_not_connected":
        return i18n._(
          /*i18n*/
          {
            id: "aKtF0O"
          }
        );
      case "no_paid_orders":
        return i18n._(
          /*i18n*/
          {
            id: "PChXMe"
          }
        );
      case "event_too_new":
        return i18n._(
          /*i18n*/
          {
            id: "OfmsI9"
          }
        );
      default:
        return failure;
    }
  };
  const getTypeLabel = (type) => {
    switch (type.toUpperCase()) {
      case "TICKET":
        return i18n._(
          /*i18n*/
          {
            id: "CMUt3Y"
          }
        );
      case "ORDER":
        return i18n._(
          /*i18n*/
          {
            id: "rzw+wS"
          }
        );
      case "ATTENDEE":
        return i18n._(
          /*i18n*/
          {
            id: "9SZT4E"
          }
        );
      default:
        return type;
    }
  };
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    openDetailModal();
  };
  const totalMessages = ((_a = messagesData == null ? void 0 : messagesData.meta) == null ? void 0 : _a.total) || 0;
  return /* @__PURE__ */ jsxs(Container, { size: "xl", p: "xl", children: [
    /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
          /*i18n*/
          {
            id: "qMASRF"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: i18n._(
          /*i18n*/
          {
            id: "RnvnDc"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
          /*i18n*/
          {
            id: "4DSz7Z"
          }
        ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value), style: {
          flex: 1
        } }),
        /* @__PURE__ */ jsx(Select, { placeholder: i18n._(
          /*i18n*/
          {
            id: "uAQUqI"
          }
        ), clearable: true, data: [{
          value: "SENT",
          label: i18n._(
            /*i18n*/
            {
              id: "h69WC6"
            }
          )
        }, {
          value: "PENDING_REVIEW",
          label: i18n._(
            /*i18n*/
            {
              id: "UkM20g"
            }
          )
        }, {
          value: "SCHEDULED",
          label: i18n._(
            /*i18n*/
            {
              id: "4ba0NE"
            }
          )
        }, {
          value: "CANCELLED",
          label: i18n._(
            /*i18n*/
            {
              id: "vv7kpg"
            }
          )
        }, {
          value: "FAILED",
          label: i18n._(
            /*i18n*/
            {
              id: "7Bj3x9"
            }
          )
        }], value: statusFilter, onChange: setStatusFilter, w: 150 }),
        /* @__PURE__ */ jsx(Select, { placeholder: i18n._(
          /*i18n*/
          {
            id: "+zy2Nq"
          }
        ), clearable: true, data: [{
          value: "TICKET",
          label: i18n._(
            /*i18n*/
            {
              id: "CMUt3Y"
            }
          )
        }, {
          value: "ORDER",
          label: i18n._(
            /*i18n*/
            {
              id: "rzw+wS"
            }
          )
        }, {
          value: "ATTENDEE",
          label: i18n._(
            /*i18n*/
            {
              id: "9SZT4E"
            }
          )
        }], value: typeFilter, onChange: setTypeFilter, w: 150 })
      ] }),
      isLoading ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 50, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 400, radius: "md" })
      ] }) : totalMessages === 0 ? /* @__PURE__ */ jsx("div", { className: tableStyles.emptyState, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "lg", children: i18n._(
        /*i18n*/
        {
          id: "nrSs2u"
        }
      ) }) }) : /* @__PURE__ */ jsx("div", { className: tableStyles.tableWrapper, children: /* @__PURE__ */ jsx("div", { className: tableStyles.tableScroll, children: /* @__PURE__ */ jsxs(Table, { className: tableStyles.table, highlightOnHover: true, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "UJmAAK"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "0pC/y6"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "AeXO77"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "+zy2Nq"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "yPrbsy"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "uAQUqI"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "BVu2Hz"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "d+F6q9"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { style: {
            width: 60
          } })
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: (_b = messagesData == null ? void 0 : messagesData.data) == null ? void 0 : _b.map((message) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsx(IconMail, { size: 16, color: "gray" }),
            /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, lineClamp: 1, maw: 200, children: message.subject })
          ] }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", lineClamp: 1, maw: 150, children: message.event_title }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", lineClamp: 1, maw: 120, children: message.account_name }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: "gray", children: getTypeLabel(message.type) }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Group, { gap: 4, children: [
            /* @__PURE__ */ jsx(IconUsers, { size: 14, color: "gray" }),
            /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: message.recipients_count })
          ] }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { color: getStatusColor(message.status), variant: "light", children: message.status }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: message.sent_by || "-" }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: relativeDate(message.created_at) }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "zNZNMs"
              }
            ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", onClick: () => handleViewMessage(message), children: /* @__PURE__ */ jsx(IconEye, { size: 16 }) }) }),
            message.status === "PENDING_REVIEW" && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "261RBr"
              }
            ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "green", "data-testid": "admin-approve-message-button", onClick: () => handleApprove(message.id), loading: approveMutation.isPending, children: /* @__PURE__ */ jsx(IconCheck, { size: 16 }) }) })
          ] }) })
        ] }, message.id)) })
      ] }) }) }),
      (messagesData == null ? void 0 : messagesData.meta) && messagesData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: messagesData.meta.last_page, value: page, onChange: setPage, mt: "md" })
    ] }),
    /* @__PURE__ */ jsx(Modal, { opened: detailModalOpened, onClose: closeDetailModal, title: i18n._(
      /*i18n*/
      {
        id: "ZPj0Q8"
      }
    ), size: "lg", children: selectedMessage && /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "UJmAAK"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { fw: 500, children: selectedMessage.subject })
      ] }),
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "0pC/y6"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", children: selectedMessage.event_title })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "AeXO77"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", children: selectedMessage.account_name })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "+zy2Nq"
            }
          ) }),
          /* @__PURE__ */ jsx(Badge, { variant: "light", color: "gray", children: getTypeLabel(selectedMessage.type) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "uAQUqI"
            }
          ) }),
          /* @__PURE__ */ jsx(Badge, { color: getStatusColor(selectedMessage.status), variant: "light", children: selectedMessage.status })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "yPrbsy"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: selectedMessage.recipients_count })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "BVu2Hz"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", children: selectedMessage.sent_by || "-" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "d+F6q9"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", children: selectedMessage.created_at })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", mb: "xs", children: i18n._(
          /*i18n*/
          {
            id: "tNZzFb"
          }
        ) }),
        /* @__PURE__ */ jsx(ScrollArea, { h: 300, style: {
          border: "1px solid var(--mantine-color-gray-3)",
          borderRadius: "4px"
        }, children: /* @__PURE__ */ jsx("div", { style: {
          padding: "12px"
        }, dangerouslySetInnerHTML: {
          __html: selectedMessage.message
        } }) })
      ] }),
      selectedMessage.eligibility_failures && selectedMessage.eligibility_failures.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", mb: "xs", children: i18n._(
          /*i18n*/
          {
            id: "iiWXDL"
          }
        ) }),
        /* @__PURE__ */ jsx(Group, { gap: "xs", children: selectedMessage.eligibility_failures.map((failure) => /* @__PURE__ */ jsx(Badge, { color: "orange", variant: "light", children: getEligibilityFailureLabel(failure) }, failure)) })
      ] })
    ] }) })
  ] });
};
export {
  Messages as default
};

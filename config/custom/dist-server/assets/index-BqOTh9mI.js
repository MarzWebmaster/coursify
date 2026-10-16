import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Container, Stack, Title, Group, SegmentedControl, TextInput, Skeleton, Text, Table, Badge, Button, Pagination, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { t as tableStyles } from "./admin-table.module-CfJrGaI_.js";
import "../entry.server.js";
import "react-dom/server";
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
const GET_ALL_DELETION_REQUESTS_QUERY_KEY = "getAllDeletionRequests";
const useGetAllDeletionRequests = (params = {}) => {
  return useQuery({
    queryKey: [GET_ALL_DELETION_REQUESTS_QUERY_KEY, params],
    queryFn: () => adminClient.getDeletionRequests(params)
  });
};
const useAdminCancelDeletionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletionRequestId) => adminClient.cancelDeletionRequest(deletionRequestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_DELETION_REQUESTS_QUERY_KEY]
      });
    }
  });
};
const useAdminExecuteDeletionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletionRequestId) => adminClient.executeDeletionRequest(deletionRequestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_DELETION_REQUESTS_QUERY_KEY]
      });
    }
  });
};
const statusColors = {
  REQUESTED: "orange",
  CANCELLED: "gray",
  COMPLETED: "red"
};
const DeletionRequests = () => {
  var _a;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("REQUESTED");
  const [confirmAction, setConfirmAction] = useState(null);
  const {
    data: requestsData,
    isLoading
  } = useGetAllDeletionRequests({
    page,
    per_page: 20,
    search: debouncedSearch,
    status: status === "ALL" ? void 0 : status
  });
  const cancelMutation = useAdminCancelDeletionRequest();
  const executeMutation = useAdminExecuteDeletionRequest();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : "-";
  const handleConfirm = () => {
    if (!confirmAction) {
      return;
    }
    const mutation = confirmAction.type === "cancel" ? cancelMutation : executeMutation;
    const successMessage = confirmAction.type === "cancel" ? i18n._(
      /*i18n*/
      {
        id: "/U002t"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "nMdIuB"
      }
    );
    mutation.mutate(confirmAction.request.id, {
      onSuccess: () => {
        showSuccess(successMessage);
        setConfirmAction(null);
      },
      onError: (error) => {
        var _a2, _b;
        showError(((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "fWsBTs"
          }
        ));
        setConfirmAction(null);
      }
    });
  };
  const requests = (requestsData == null ? void 0 : requestsData.data) || [];
  return /* @__PURE__ */ jsxs(Container, { size: "xl", p: "xl", children: [
    /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
        /*i18n*/
        {
          id: "PBA62s"
        }
      ) }),
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsx(SegmentedControl, { value: status, onChange: (value) => {
          setStatus(value);
          setPage(1);
        }, data: [{
          label: i18n._(
            /*i18n*/
            {
              id: "UbRKMZ"
            }
          ),
          value: "REQUESTED"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "qqWcBV"
            }
          ),
          value: "COMPLETED"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "vv7kpg"
            }
          ),
          value: "CANCELLED"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "N40H+G"
            }
          ),
          value: "ALL"
        }] }),
        /* @__PURE__ */ jsx(TextInput, { style: {
          flex: 1
        }, placeholder: i18n._(
          /*i18n*/
          {
            id: "VY+Bdn"
          }
        ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      isLoading && /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "md" })
      ] }),
      !isLoading && requests.length === 0 && /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", ta: "center", py: "xl", children: i18n._(
        /*i18n*/
        {
          id: "w+wkcC"
        }
      ) }),
      !isLoading && requests.length > 0 && /* @__PURE__ */ jsx("div", { className: tableStyles.tableWrapper, children: /* @__PURE__ */ jsx("div", { className: tableStyles.tableScroll, children: /* @__PURE__ */ jsxs(Table, { className: tableStyles.table, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "AeXO77"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "Wcv9QD"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "Yx0Ud8"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "4HKQZj"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "EufvBx"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "uAQUqI"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, {})
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: requests.map((request) => {
          var _a2;
          return /* @__PURE__ */ jsxs(Table.Tr, { children: [
            /* @__PURE__ */ jsx(Table.Td, { children: request.account ? /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, style: {
                cursor: "pointer"
              }, onClick: () => {
                var _a3;
                return navigate(`/admin/accounts/${(_a3 = request.account) == null ? void 0 : _a3.id}`);
              }, children: request.account.name }),
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: request.account.email })
            ] }) : /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "loLVyU"
              }
            ) }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "sm", children: ((_a2 = request.requested_by_user) == null ? void 0 : _a2.full_name) || "-" }),
              /* @__PURE__ */ jsx(Badge, { size: "xs", variant: "light", color: request.initiated_by === "ADMIN" ? "grape" : "blue", children: request.initiated_by === "ADMIN" ? i18n._(
                /*i18n*/
                {
                  id: "U3pytU"
                }
              ) : i18n._(
                /*i18n*/
                {
                  id: "Hy1lfH"
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: formatDate(request.requested_at) }),
            /* @__PURE__ */ jsx(Table.Td, { children: formatDate(request.scheduled_deletion_at) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: (request.outcome || request.expected_outcome) === "HARD_DELETE" ? "red" : "yellow", children: (request.outcome || request.expected_outcome) === "HARD_DELETE" ? i18n._(
              /*i18n*/
              {
                id: "S2Y4aO"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "asqL+J"
              }
            ) }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: statusColors[request.status], children: request.status }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: request.status === "REQUESTED" && /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
              /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", onClick: () => setConfirmAction({
                type: "cancel",
                request
              }), "data-testid": "admin-cancel-deletion-button", children: i18n._(
                /*i18n*/
                {
                  id: "dEgA5A"
                }
              ) }),
              /* @__PURE__ */ jsx(Button, { size: "xs", color: "red", variant: "light", onClick: () => setConfirmAction({
                type: "execute",
                request
              }), "data-testid": "admin-execute-deletion-button", children: i18n._(
                /*i18n*/
                {
                  id: "xj4fwT"
                }
              ) })
            ] }) })
          ] }, String(request.id));
        }) })
      ] }) }) }),
      (requestsData == null ? void 0 : requestsData.meta) && requestsData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: requestsData.meta.last_page, value: page, onChange: setPage, mt: "md" })
    ] }),
    /* @__PURE__ */ jsx(Modal, { opened: confirmAction !== null, onClose: () => setConfirmAction(null), title: (confirmAction == null ? void 0 : confirmAction.type) === "cancel" ? i18n._(
      /*i18n*/
      {
        id: "5YkF5G"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "CtAcQ7"
      }
    ), children: /* @__PURE__ */ jsxs(Stack, { children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", children: (confirmAction == null ? void 0 : confirmAction.type) === "cancel" ? i18n._(
        /*i18n*/
        {
          id: "bPgkdx"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "VGEfU7"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: (_a = confirmAction == null ? void 0 : confirmAction.request.account) == null ? void 0 : _a.name }),
      /* @__PURE__ */ jsxs(Group, { justify: "flex-end", children: [
        /* @__PURE__ */ jsx(Button, { variant: "default", onClick: () => setConfirmAction(null), children: i18n._(
          /*i18n*/
          {
            id: "CKyk7Q"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { color: (confirmAction == null ? void 0 : confirmAction.type) === "execute" ? "red" : "blue", loading: cancelMutation.isPending || executeMutation.isPending, onClick: handleConfirm, "data-testid": "admin-confirm-deletion-action-button", children: (confirmAction == null ? void 0 : confirmAction.type) === "cancel" ? i18n._(
          /*i18n*/
          {
            id: "lUjTpS"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "aW/bzJ"
          }
        ) })
      ] })
    ] }) })
  ] });
};
export {
  DeletionRequests as default
};

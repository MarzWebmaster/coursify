import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Container, Stack, Group, Title, Text, Button, TextInput, Skeleton, Table, Badge, Tooltip, ActionIcon, Pagination, Modal, ScrollArea, Code } from "@mantine/core";
import { IconRefresh, IconTrash, IconSearch, IconEye } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useDisclosure } from "@mantine/hooks";
import { r as relativeDate } from "./dates-CbVpwZeX.js";
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
const GET_ADMIN_FAILED_JOBS_QUERY_KEY = ["admin", "failed-jobs"];
const useGetAdminFailedJobs = (params = {}) => {
  return useQuery({
    queryKey: [...GET_ADMIN_FAILED_JOBS_QUERY_KEY, params],
    queryFn: () => adminClient.getAllFailedJobs(params)
  });
};
const useDeleteFailedJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId) => adminClient.deleteFailedJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_FAILED_JOBS_QUERY_KEY
      });
    }
  });
};
const useDeleteAllFailedJobs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminClient.deleteAllFailedJobs(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_FAILED_JOBS_QUERY_KEY
      });
    }
  });
};
const useRetryFailedJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId) => adminClient.retryFailedJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_FAILED_JOBS_QUERY_KEY
      });
    }
  });
};
const useRetryAllFailedJobs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminClient.retryAllFailedJobs(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_FAILED_JOBS_QUERY_KEY
      });
    }
  });
};
const FailedJobs = () => {
  var _a, _b;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailModalOpened, {
    open: openDetailModal,
    close: closeDetailModal
  }] = useDisclosure(false);
  const {
    data: jobsData,
    isLoading
  } = useGetAdminFailedJobs({
    page,
    per_page: 20,
    search: debouncedSearch
  });
  const deleteJobMutation = useDeleteFailedJob();
  const deleteAllJobsMutation = useDeleteAllFailedJobs();
  const retryJobMutation = useRetryFailedJob();
  const retryAllJobsMutation = useRetryAllFailedJobs();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    openDetailModal();
  };
  const handleRetryJob = (jobId) => {
    if (!jobId) return;
    retryJobMutation.mutate(jobId, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "YZi+Hu"
          }
        ));
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "wDioLj"
          }
        ));
      }
    });
  };
  const handleDeleteJob = (jobId) => {
    if (!jobId) return;
    deleteJobMutation.mutate(jobId, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "o5r6b2"
          }
        ));
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "Zw6LWb"
          }
        ));
      }
    });
  };
  const handleRetryAll = () => {
    retryAllJobsMutation.mutate(void 0, {
      onSuccess: (response) => {
        showSuccess(response.message || i18n._(
          /*i18n*/
          {
            id: "D2g7C7"
          }
        ));
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "DKYTWG"
          }
        ));
      }
    });
  };
  const handleDeleteAll = () => {
    if (!confirm(i18n._(
      /*i18n*/
      {
        id: "0aVEBY"
      }
    ))) {
      return;
    }
    deleteAllJobsMutation.mutate(void 0, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "31KB8w"
          }
        ));
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "tq0abZ"
          }
        ));
      }
    });
  };
  const formatPayloadForDisplay = (payload) => {
    if (!payload) return "No payload data";
    try {
      return JSON.stringify(JSON.parse(payload), null, 2);
    } catch {
      return payload;
    }
  };
  const totalJobs = ((_a = jobsData == null ? void 0 : jobsData.meta) == null ? void 0 : _a.total) || 0;
  return /* @__PURE__ */ jsxs(Container, { size: "xl", p: "xl", children: [
    /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
            /*i18n*/
            {
              id: "tKcbYd"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: i18n._(
            /*i18n*/
            {
              id: "qvF+MT"
            }
          ) })
        ] }),
        totalJobs > 0 && /* @__PURE__ */ jsxs(Group, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", color: "blue", leftSection: /* @__PURE__ */ jsx(IconRefresh, { size: 16 }), onClick: handleRetryAll, loading: retryAllJobsMutation.isPending, children: i18n._(
            /*i18n*/
            {
              id: "1BG8ga"
            }
          ) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 16 }), onClick: handleDeleteAll, loading: deleteAllJobsMutation.isPending, children: i18n._(
            /*i18n*/
            {
              id: "KZN4Lc"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
        /*i18n*/
        {
          id: "R0wEyA"
        }
      ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value) }),
      isLoading ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 50, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 400, radius: "md" })
      ] }) : totalJobs === 0 ? /* @__PURE__ */ jsx("div", { className: tableStyles.emptyState, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "lg", children: i18n._(
        /*i18n*/
        {
          id: "Yc5YW6"
        }
      ) }) }) : /* @__PURE__ */ jsx("div", { className: tableStyles.tableWrapper, children: /* @__PURE__ */ jsx("div", { className: tableStyles.tableScroll, children: /* @__PURE__ */ jsxs(Table, { className: tableStyles.table, highlightOnHover: true, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "KmWyx0"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "b24kPi"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "8uOlgz"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "qNuTh3"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { style: {
            width: 120
          }, children: i18n._(
            /*i18n*/
            {
              id: "7L01XJ"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: (_b = jobsData == null ? void 0 : jobsData.data) == null ? void 0 : _b.map((job) => /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxs(Table.Td, { children: [
            /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: job.job_name }),
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: job.uuid })
          ] }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "light", children: job.queue }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", children: relativeDate(job.failed_at) }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", lineClamp: 1, maw: 300, children: job.exception_summary }) }),
          /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "SZw9tS"
              }
            ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", onClick: () => handleViewDetails(job), children: /* @__PURE__ */ jsx(IconEye, { size: 16 }) }) }),
            /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "6gRgw8"
              }
            ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "blue", onClick: () => handleRetryJob(job.id), loading: retryJobMutation.isPending, children: /* @__PURE__ */ jsx(IconRefresh, { size: 16 }) }) }),
            /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
              /*i18n*/
              {
                id: "cnGeoo"
              }
            ), children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "red", onClick: () => handleDeleteJob(job.id), loading: deleteJobMutation.isPending, children: /* @__PURE__ */ jsx(IconTrash, { size: 16 }) }) })
          ] }) })
        ] }, job.id)) })
      ] }) }) }),
      (jobsData == null ? void 0 : jobsData.meta) && jobsData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: jobsData.meta.last_page, value: page, onChange: setPage, mt: "md" })
    ] }),
    /* @__PURE__ */ jsx(Modal, { opened: detailModalOpened, onClose: closeDetailModal, title: i18n._(
      /*i18n*/
      {
        id: "cd0jIM"
      }
    ), size: "xl", children: selectedJob && /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "ruJO57"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { children: selectedJob.job_name }),
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: selectedJob.job_name_full })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "l5ackE"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "sm", children: selectedJob.uuid })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "b24kPi"
          }
        ) }),
        /* @__PURE__ */ jsx(Badge, { variant: "light", children: selectedJob.queue })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "8uOlgz"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "sm", children: selectedJob.failed_at })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "qNuTh3"
          }
        ) }),
        /* @__PURE__ */ jsx(ScrollArea, { h: 300, children: /* @__PURE__ */ jsx(Code, { block: true, style: {
          whiteSpace: "pre-wrap",
          fontSize: "12px"
        }, children: selectedJob.exception }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "c2/9VE"
          }
        ) }),
        /* @__PURE__ */ jsx(ScrollArea, { h: 200, children: /* @__PURE__ */ jsx(Code, { block: true, style: {
          whiteSpace: "pre-wrap",
          fontSize: "12px"
        }, children: formatPayloadForDisplay(selectedJob.payload) }) })
      ] }),
      /* @__PURE__ */ jsxs(Group, { justify: "flex-end", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", color: "blue", leftSection: /* @__PURE__ */ jsx(IconRefresh, { size: 16 }), onClick: () => {
          handleRetryJob(selectedJob.id);
          closeDetailModal();
        }, children: i18n._(
          /*i18n*/
          {
            id: "rDC+T6"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 16 }), onClick: () => {
          handleDeleteJob(selectedJob.id);
          closeDetailModal();
        }, children: i18n._(
          /*i18n*/
          {
            id: "hdyeZ0"
          }
        ) })
      ] })
    ] }) })
  ] });
};
export {
  FailedJobs as default
};

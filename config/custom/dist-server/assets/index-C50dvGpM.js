import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Center, Loader, Alert, Button, Stack, Text, Paper, Group, Badge, Collapse, Code, Anchor, Table as Table$1, Tooltip, Popover, Menu, TextInput, Box } from "@mantine/core";
import { IconX, IconChevronRight, IconCheck, IconPlus, IconClockHour4, IconBolt, IconDotsVertical, IconPencil, IconClipboardList, IconTrash } from "@tabler/icons-react";
import { C as Card } from "./index-jHMtuNEo.js";
import { useDisclosure } from "@mantine/hooks";
import { Trans } from "@lingui/react";
import { T as Table, a as TableHead } from "./index-XJu-jVVm.js";
import { W as WebhookForm, C as Center$1, c as classes$1 } from "./index-hcfywf1A.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { r as relativeDate } from "./dates-CbVpwZeX.js";
import { useEffect, useState } from "react";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { useForm } from "@mantine/form";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { useParams } from "react-router";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { f as api } from "../entry.server.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { C as CopyButton } from "./index-CxL5Ax7s.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import "./index-CV5KyLiQ.js";
import "@mantine/modals";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "classnames";
import "@mantine/notifications";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/dates";
import "@mantine/colors-generator";
const organizerWebhookClient = {
  get: async (organizerId, webhookId) => {
    return await api.get(`organizers/${organizerId}/webhooks/${webhookId}`);
  },
  create: async (organizerId, webhook) => {
    return await api.post(`organizers/${organizerId}/webhooks`, webhook);
  },
  all: async (organizerId) => {
    return await api.get(`organizers/${organizerId}/webhooks`);
  },
  logs: async (organizerId, webhookId) => {
    return await api.get(`organizers/${organizerId}/webhooks/${webhookId}/logs`);
  },
  delete: async (organizerId, webhookId) => {
    return await api.delete(`organizers/${organizerId}/webhooks/${webhookId}`);
  },
  update: async (organizerId, webhookId, webhook) => {
    return await api.put(`organizers/${organizerId}/webhooks/${webhookId}`, webhook);
  }
};
const GET_ORGANIZER_WEBHOOK_QUERY_KEY = "getOrganizerWebhook";
const useGetOrganizerWebhook = (organizerId, webhookId) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_WEBHOOK_QUERY_KEY, organizerId, webhookId],
    queryFn: async () => await organizerWebhookClient.get(organizerId, webhookId),
    enabled: !!webhookId
  });
};
const GET_ORGANIZER_WEBHOOKS_QUERY_KEY = "getOrganizerWebhooks";
const useGetOrganizerWebhooks = (organizerId) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_WEBHOOKS_QUERY_KEY, organizerId],
    queryFn: async () => await organizerWebhookClient.all(organizerId)
  });
};
const useEditOrganizerWebhook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      webhookId,
      webhook
    }) => organizerWebhookClient.update(organizerId, webhookId, webhook),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_WEBHOOKS_QUERY_KEY]
    })
  });
};
const EditOrganizerWebhookModal = ({
  onClose,
  webhookId
}) => {
  const {
    organizerId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: webhook,
    error: webhookError,
    isLoading: webhookLoading
  } = useGetOrganizerWebhook(organizerId, webhookId);
  const form = useForm({
    initialValues: {
      url: "",
      event_types: [],
      status: "ENABLED"
    }
  });
  const editMutation = useEditOrganizerWebhook();
  const handleSubmit = (requestData) => {
    editMutation.mutate({
      organizerId,
      webhook: requestData,
      webhookId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "kj7zYe"
          }
        ));
        onClose();
      },
      onError: (error) => {
        errorHandler(form, error);
      }
    });
  };
  useEffect(() => {
    if (webhook && webhook.data && webhook.data.data) {
      form.setValues({
        url: webhook.data.data.url,
        event_types: webhook.data.data.event_types,
        status: webhook.data.data.status
      });
    }
  }, [webhook]);
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "nP7CdQ"
    }
  ), children: [
    webhookLoading && /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Loader, {}) }),
    !!webhookError && /* @__PURE__ */ jsx(Alert, { color: "red", children: i18n._(
      /*i18n*/
      {
        id: "X4o0MX"
      }
    ) }),
    webhook && /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
      /* @__PURE__ */ jsx(WebhookForm, { form }),
      /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, loading: editMutation.isPending, children: i18n._(
        /*i18n*/
        {
          id: "nP7CdQ"
        }
      ) })
    ] })
  ] });
};
const useDeleteOrganizerWebhook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      webhookId
    }) => organizerWebhookClient.delete(organizerId, webhookId),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_WEBHOOKS_QUERY_KEY]
    })
  });
};
const GET_ORGANIZER_WEBHOOK_LOGS_QUERY_KEY = "getOrganizerWebhookLogs";
const useGetOrganizerWebhookLogs = (organizerId, webhookId) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_WEBHOOK_LOGS_QUERY_KEY, organizerId, webhookId],
    queryFn: async () => await organizerWebhookClient.logs(organizerId, webhookId),
    enabled: !!webhookId
  });
};
const logEntry = "_logEntry_10702_1";
const logEntryExpanded = "_logEntryExpanded_10702_7";
const chevronIcon = "_chevronIcon_10702_11";
const chevronIconExpanded = "_chevronIconExpanded_10702_15";
const statusIcon = "_statusIcon_10702_19";
const codeBlock = "_codeBlock_10702_28";
const noLogsAlert = "_noLogsAlert_10702_35";
const classes = {
  logEntry,
  logEntryExpanded,
  chevronIcon,
  chevronIconExpanded,
  statusIcon,
  codeBlock,
  noLogsAlert
};
const LogEntry = ({
  log
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const getStatusColor = (code) => {
    if (!code) return "gray";
    if (code >= 200 && code < 300) return "green";
    if (code >= 300 && code < 400) return "blue";
    return "red";
  };
  const formatContent = (content) => {
    if (!content) return "";
    try {
      return JSON.stringify(JSON.parse(content), null, 2);
    } catch (e) {
      return content;
    }
  };
  const statusColor = getStatusColor(log.response_code);
  return /* @__PURE__ */ jsxs(Paper, { withBorder: true, p: "md", mb: "md", onClick: () => setDetailsOpen(!detailsOpen), className: `${classes.logEntry} ${detailsOpen ? classes.logEntryExpanded : ""}`, style: {
    borderLeft: `4px solid var(--mantine-color-${statusColor}-6)`
  }, children: [
    /* @__PURE__ */ jsxs(Group, { justify: "space-between", wrap: "nowrap", children: [
      /* @__PURE__ */ jsxs(Group, { wrap: "nowrap", gap: "md", children: [
        /* @__PURE__ */ jsx("div", { className: `${classes.chevronIcon} ${detailsOpen ? classes.chevronIconExpanded : ""}`, style: {
          color: `var(--mantine-color-${statusColor}-6)`
        }, children: /* @__PURE__ */ jsx(IconChevronRight, { size: 20 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Group, { wrap: "nowrap", mb: 6, gap: "xs", children: [
            /* @__PURE__ */ jsx(Text, { fw: 600, size: "sm", children: log.event_type }),
            /* @__PURE__ */ jsx(Badge, { color: statusColor, variant: "filled", size: "sm", radius: "sm", children: log.response_code || i18n._(
              /*i18n*/
              {
                id: "JeO7SI"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: relativeDate(log.created_at) })
        ] })
      ] }),
      log.response_code && /* @__PURE__ */ jsx("div", { className: classes.statusIcon, style: {
        background: `var(--mantine-color-${statusColor}-0)`,
        color: `var(--mantine-color-${statusColor}-6)`
      }, children: log.response_code >= 200 && log.response_code < 300 ? /* @__PURE__ */ jsx(IconCheck, { size: 18 }) : /* @__PURE__ */ jsx(IconX, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { expanded: detailsOpen, transitionDuration: 300, children: /* @__PURE__ */ jsxs(Stack, { mt: "lg", gap: "md", children: [
      log.payload && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Text, { size: "sm", fw: 500, mb: 8, c: "dimmed", children: [
          i18n._(
            /*i18n*/
            {
              id: "c2/9VE"
            }
          ),
          ":"
        ] }),
        /* @__PURE__ */ jsx(Code, { block: true, p: "md", className: classes.codeBlock, children: formatContent(log.payload) })
      ] }),
      log.response_body && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Text, { size: "sm", fw: 500, mb: 8, c: "dimmed", children: [
          i18n._(
            /*i18n*/
            {
              id: "ZlCDf+"
            }
          ),
          ":"
        ] }),
        /* @__PURE__ */ jsx(Code, { block: true, p: "md", className: classes.codeBlock, children: formatContent(log.response_body) })
      ] })
    ] }) })
  ] });
};
const OrganizerWebhookLogsModal = ({
  onClose,
  webhookId
}) => {
  var _a, _b;
  const {
    organizerId
  } = useParams();
  const logsQuery = useGetOrganizerWebhookLogs(organizerId, webhookId);
  const logs = (_b = (_a = logsQuery.data) == null ? void 0 : _a.data) == null ? void 0 : _b.data;
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "CThMKa"
    }
  ), size: "xl", children: [
    logsQuery.isLoading && /* @__PURE__ */ jsx(Center$1, { children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "xs", children: [
      /* @__PURE__ */ jsx(Loader, { size: "md" }),
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
        /*i18n*/
        {
          id: "G3Ge9Z"
        }
      ) })
    ] }) }),
    !!logsQuery.error && /* @__PURE__ */ jsx(Alert, { color: "red", title: i18n._(
      /*i18n*/
      {
        id: "LslKhj"
      }
    ), icon: /* @__PURE__ */ jsx(IconX, { size: 18 }), radius: "md", children: logsQuery.error.message }),
    logs && logs.length === 0 && !logsQuery.isLoading && /* @__PURE__ */ jsxs(Alert, { className: classes.noLogsAlert, radius: "md", children: [
      /* @__PURE__ */ jsx("h2", { children: i18n._(
        /*i18n*/
        {
          id: "XZkeaI"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "n5vdm2"
        }
      ) })
    ] }),
    logs && logs.length > 0 && /* @__PURE__ */ jsx(Fragment, { children: logs.map((log) => /* @__PURE__ */ jsx(LogEntry, { log }, log.id)) })
  ] });
};
const OrganizerWebhookTable = ({
  webhooks,
  openCreateModal
}) => {
  const {
    organizerId
  } = useParams();
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [logsModalOpen, {
    open: openLogsModal,
    close: closeLogsModal
  }] = useDisclosure(false);
  const [selectedWebhookId, setSelectedWebhookId] = useState();
  const deleteMutation = useDeleteOrganizerWebhook();
  const handleDelete = (webhookId) => {
    deleteMutation.mutate({
      organizerId,
      webhookId
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "2X4ecw"
        }
      )),
      onError: (error) => showError(error.message)
    });
  };
  const EventTypeDisplay = ({
    webhook
  }) => {
    const eventTypes = webhook.event_types;
    if (!eventTypes || eventTypes.length === 0) {
      return /* @__PURE__ */ jsx(Fragment, { children: "-" });
    }
    const eventCount = eventTypes.length;
    return /* @__PURE__ */ jsx("div", { style: {
      cursor: "pointer"
    }, children: /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx("div", { className: classes$1.tooltipContent, children: eventTypes.map((type) => /* @__PURE__ */ jsx("div", { children: type }, type)) }), children: /* @__PURE__ */ jsx(Badge, { variant: "light", size: "sm", children: eventCount > 1 ? /* @__PURE__ */ jsx(Trans, { id: "OJnhhX", values: {
      eventCount
    } }) : eventTypes[0] }) }) });
  };
  const ActionMenu = ({
    webhook
  }) => /* @__PURE__ */ jsx(Group, { wrap: "nowrap", gap: 0, justify: "flex-end", children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
    /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "transparent", children: /* @__PURE__ */ jsx(IconDotsVertical, {}) }) }),
    /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
      /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
        /*i18n*/
        {
          id: "wckWOP"
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), onClick: () => {
        setSelectedWebhookId(webhook.id);
        openEditModal();
      }, children: i18n._(
        /*i18n*/
        {
          id: "fW5sSv"
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconClipboardList, { size: 14 }), onClick: () => {
        setSelectedWebhookId(webhook.id);
        openLogsModal();
      }, children: i18n._(
        /*i18n*/
        {
          id: "n6EaWL"
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Divider, {}),
      /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
        /*i18n*/
        {
          id: "Zz6Cxn"
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Item, { color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), onClick: () => {
        confirmationDialog(i18n._(
          /*i18n*/
          {
            id: "5H3Z78"
          }
        ), () => handleDelete(webhook.id));
      }, children: i18n._(
        /*i18n*/
        {
          id: "snMaH4"
        }
      ) })
    ] })
  ] }) });
  const ResponseDisplay = ({
    webhook
  }) => {
    if (webhook.last_response_code === null || webhook.last_response_code === void 0) {
      return /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: /* @__PURE__ */ jsxs(Group, { gap: 6, wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(IconClockHour4, { size: 14 }),
        /* @__PURE__ */ jsx("span", { children: i18n._(
          /*i18n*/
          {
            id: "EK/G11"
          }
        ) })
      ] }) });
    }
    const isSuccess = webhook.last_response_code >= 200 && webhook.last_response_code < 300 && webhook.last_response_code !== 0;
    const statusColor = isSuccess ? "green" : "red";
    const statusText = isSuccess ? i18n._(
      /*i18n*/
      {
        id: "zzDlyQ"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "SlfejT"
      }
    );
    return /* @__PURE__ */ jsxs(Popover, { width: 400, position: "bottom", withArrow: true, children: [
      /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsx(Group, { gap: "xs", wrap: "nowrap", children: /* @__PURE__ */ jsxs(Badge, { variant: "light", color: statusColor, leftSection: /* @__PURE__ */ jsx(IconBolt, { size: 12 }), children: [
        statusText,
        " ",
        webhook.last_response_code > 0 ? `- ${webhook.last_response_code}` : ""
      ] }) }) }),
      /* @__PURE__ */ jsx(Popover.Dropdown, { children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "center", children: [
          /* @__PURE__ */ jsx(Text, { fw: 500, size: "sm", children: i18n._(
            /*i18n*/
            {
              id: "bsydMp"
            }
          ) }),
          /* @__PURE__ */ jsx(Badge, { variant: "light", color: statusColor, size: "sm", children: webhook.last_response_code > 0 ? webhook.last_response_code : i18n._(
            /*i18n*/
            {
              id: "QoAi8D"
            }
          ) })
        ] }),
        webhook.last_response_body && /* @__PURE__ */ jsx(Paper, { className: classes$1.responseBody, withBorder: true, p: "xs", children: /* @__PURE__ */ jsx(Text, { component: "pre", style: {
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }, children: webhook.last_response_body }) })
      ] }) })
    ] });
  };
  if (webhooks.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "4GhX3c"
      }
    ), imageHref: "/blank-slate/webhooks.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Trans, { id: "ZnVt5v", components: {
        0: /* @__PURE__ */ jsx("p", {}),
        1: /* @__PURE__ */ jsx("p", {}),
        2: /* @__PURE__ */ jsx(Anchor, { underline: "always", target: "_blank", href: "https://zapier.com/features/webhooks" }),
        3: /* @__PURE__ */ jsx(Anchor, { underline: "always", target: "_blank", href: "https://ifttt.com/maker_webhooks" }),
        4: /* @__PURE__ */ jsx(Anchor, { underline: "always", target: "_blank", href: "https://www.make.com/en/help/tools/webhooks" })
      } }),
      /* @__PURE__ */ jsx(Button, { loading: deleteMutation.isPending, size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
        /*i18n*/
        {
          id: "QN2F+7"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "IagCbF"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "YDVUVl"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { miw: 120, children: i18n._(
          /*i18n*/
          {
            id: "uAQUqI"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { miw: 140, children: i18n._(
          /*i18n*/
          {
            id: "h0Q9Iw"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "gw3Ur5"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, {})
      ] }) }),
      /* @__PURE__ */ jsx(Table$1.Tbody, { children: webhooks.map((webhook) => /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Truncate, { text: webhook.url, length: 35 }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(EventTypeDisplay, { webhook }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: webhook.status === "ENABLED" ? "green" : "gray", children: webhook.status }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(ResponseDisplay, { webhook }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", title: webhook.last_triggered_at, children: webhook.last_triggered_at ? relativeDate(webhook.last_triggered_at) : i18n._(
          /*i18n*/
          {
            id: "qqeAJM"
          }
        ) }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(ActionMenu, { webhook }) })
      ] }, webhook.id)) })
    ] }),
    logsModalOpen && selectedWebhookId && /* @__PURE__ */ jsx(OrganizerWebhookLogsModal, { onClose: closeLogsModal, webhookId: selectedWebhookId }),
    editModalOpen && selectedWebhookId && /* @__PURE__ */ jsx(EditOrganizerWebhookModal, { onClose: closeEditModal, webhookId: selectedWebhookId })
  ] });
};
const useCreateOrganizerWebhook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      webhook
    }) => organizerWebhookClient.create(organizerId, webhook),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_WEBHOOKS_QUERY_KEY]
    })
  });
};
const CreateOrganizerWebhookModal = ({
  onClose
}) => {
  const {
    organizerId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const [secret, setSecret] = useState(null);
  const form = useForm({
    initialValues: {
      url: "",
      event_types: [],
      status: "ENABLED"
    },
    validate: {
      url: (value) => {
        if (!value) return i18n._(
          /*i18n*/
          {
            id: "HtrFfw"
          }
        );
        try {
          new URL(value);
          return null;
        } catch {
          return i18n._(
            /*i18n*/
            {
              id: "jEw0Mr"
            }
          );
        }
      },
      event_types: (value) => value.length === 0 ? i18n._(
        /*i18n*/
        {
          id: "F2rX0R"
        }
      ) : null
    }
  });
  const createMutation = useCreateOrganizerWebhook();
  const handleSubmit = (requestData) => {
    createMutation.mutate({
      organizerId,
      webhook: requestData
    }, {
      onSuccess: (response) => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "GdWB+V"
          }
        ));
        setSecret(response.data.data.secret);
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  if (secret) {
    return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
      /*i18n*/
      {
        id: "I0adYQ"
      }
    ), children: [
      /* @__PURE__ */ jsx(Callout, { variant: "tip", children: /* @__PURE__ */ jsx(Trans, { id: "vt7jiq" }) }),
      /* @__PURE__ */ jsx(TextInput, { value: secret, readOnly: true, rightSection: /* @__PURE__ */ jsx(CopyButton, { value: secret }) }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, mt: "xl", onClick: onClose, "data-testid": "webhook-done-button", children: i18n._(
        /*i18n*/
        {
          id: "DPfwMq"
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "dkAPxi"
    }
  ), children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
    /* @__PURE__ */ jsx(WebhookForm, { form }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "xl", loading: createMutation.isPending, "data-testid": "webhook-submit-button", children: i18n._(
      /*i18n*/
      {
        id: "dkAPxi"
      }
    ) })
  ] }) });
};
function Webhooks() {
  var _a, _b;
  const {
    organizerId
  } = useParams();
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const webhooksQuery = useGetOrganizerWebhooks(organizerId);
  const webhooks = (_b = (_a = webhooksQuery.data) == null ? void 0 : _a.data) == null ? void 0 : _b.data;
  const getWebhookCountText = () => {
    if (!webhooks) return i18n._(
      /*i18n*/
      {
        id: "NFxlHW"
      }
    );
    if (webhooks.length === 0) return i18n._(
      /*i18n*/
      {
        id: "074+X8"
      }
    );
    if (webhooks.length === 1) return i18n._(
      /*i18n*/
      {
        id: "M2DyLc"
      }
    );
    return i18n._(
      /*i18n*/
      {
        id: "S4PqS9",
        values: {
          0: webhooks.length
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { children: i18n._(
      /*i18n*/
      {
        id: "v1kQyJ"
      }
    ) }),
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsx(Button, { color: "green", rightSection: /* @__PURE__ */ jsx(IconPlus, {}), onClick: openCreateModal, "data-testid": "webhook-add-button", children: i18n._(
          /*i18n*/
          {
            id: "QN2F+7"
          }
        ) }),
        /* @__PURE__ */ jsx(Badge, { variant: "transparent", size: "lg", children: getWebhookCountText() })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !webhooks }),
        webhooks && /* @__PURE__ */ jsx(OrganizerWebhookTable, { webhooks, openCreateModal })
      ] }),
      createModalOpen && /* @__PURE__ */ jsx(CreateOrganizerWebhookModal, { onClose: closeCreateModal })
    ] })
  ] });
}
export {
  Webhooks as default
};

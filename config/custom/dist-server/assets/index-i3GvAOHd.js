import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { f as api } from "../entry.server.js";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useState, useEffect } from "react";
import { Stack, Text, LoadingOverlay, Alert, Typography, Divider, Paper, TextInput, Group, ActionIcon, Tabs, Button, Switch, Modal, Badge, Title, NumberInput, SegmentedControl, Grid, Anchor } from "@mantine/core";
import { IconAlertCircle, IconEye, IconX, IconBraces, IconBrandStripe, IconMail, IconEdit, IconTrash, IconPlus, IconArrowRight, IconAlertTriangle } from "@tabler/icons-react";
import { C as Callout } from "./index-CwjvB_vn.js";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { c as createLazyModule, E as Editor } from "./index-D4cOjjnu.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { E as EventType } from "./types-CqPWB-a5.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { H as HeadingWithDescription } from "./index-encY-Si0.js";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { NavLink } from "react-router";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
const emailTemplateClient = {
  // Organizer-level templates
  getByOrganizer: async (organizerId, params) => {
    const queryParams = new URLSearchParams();
    if (params == null ? void 0 : params.template_type) queryParams.append("template_type", params.template_type);
    if (params == null ? void 0 : params.include_inactive) queryParams.append("include_inactive", "true");
    const queryString = queryParams.toString();
    const url = `organizers/${organizerId}/email-templates${queryString ? `?${queryString}` : ""}`;
    const response = await api.get(url);
    return response.data;
  },
  createForOrganizer: async (organizerId, templateData) => {
    const response = await api.post(`organizers/${organizerId}/email-templates`, templateData);
    return response.data;
  },
  updateForOrganizer: async (organizerId, templateId, templateData) => {
    const response = await api.put(`organizers/${organizerId}/email-templates/${templateId}`, templateData);
    return response.data;
  },
  deleteForOrganizer: async (organizerId, templateId) => {
    const response = await api.delete(`organizers/${organizerId}/email-templates/${templateId}`);
    return response.data;
  },
  previewForOrganizer: async (organizerId, previewData) => {
    const response = await api.post(`organizers/${organizerId}/email-templates/preview`, previewData);
    return response.data;
  },
  // Event-level templates
  getByEvent: async (eventId, params) => {
    const queryParams = new URLSearchParams();
    if (params == null ? void 0 : params.template_type) queryParams.append("template_type", params.template_type);
    if (params == null ? void 0 : params.include_inactive) queryParams.append("include_inactive", "true");
    const queryString = queryParams.toString();
    const url = `events/${eventId}/email-templates${queryString ? `?${queryString}` : ""}`;
    const response = await api.get(url);
    return response.data;
  },
  createForEvent: async (eventId, templateData) => {
    const response = await api.post(`events/${eventId}/email-templates`, templateData);
    return response.data;
  },
  updateForEvent: async (eventId, templateId, templateData) => {
    const response = await api.put(`events/${eventId}/email-templates/${templateId}`, templateData);
    return response.data;
  },
  deleteForEvent: async (eventId, templateId) => {
    const response = await api.delete(`events/${eventId}/email-templates/${templateId}`);
    return response.data;
  },
  previewForEvent: async (eventId, previewData) => {
    const response = await api.post(`events/${eventId}/email-templates/preview`, previewData);
    return response.data;
  },
  // Get available tokens
  getAvailableTokens: async (templateType) => {
    const response = await api.get(`email-templates/tokens/${templateType}`);
    return response.data;
  },
  // Get default templates
  getDefaultTemplates: async () => {
    const response = await api.get("email-templates/defaults");
    return response.data;
  }
};
const GET_EMAIL_TEMPLATES_QUERY_KEY = "getEmailTemplates";
const useGetEmailTemplatesForOrganizer = (organizerId, params, enabled = true) => {
  return useQuery({
    queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "organizer", organizerId, params],
    queryFn: () => emailTemplateClient.getByOrganizer(organizerId, params),
    enabled: !!organizerId && enabled
  });
};
const useGetEmailTemplatesForEvent = (eventId, params, enabled = true) => {
  return useQuery({
    queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "event", eventId, params],
    queryFn: () => emailTemplateClient.getByEvent(eventId, params),
    enabled: !!eventId && enabled
  });
};
const GET_DEFAULT_EMAIL_TEMPLATES_QUERY_KEY = "getDefaultEmailTemplates";
const useGetDefaultEmailTemplates = (enabled = false) => {
  return useQuery({
    queryKey: [GET_DEFAULT_EMAIL_TEMPLATES_QUERY_KEY],
    queryFn: () => emailTemplateClient.getDefaultTemplates(),
    enabled
  });
};
const useCreateEmailTemplateForOrganizer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      templateData
    }) => emailTemplateClient.createForOrganizer(organizerId, templateData),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "organizer", variables.organizerId]
      });
    }
  });
};
const useCreateEmailTemplateForEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      templateData
    }) => emailTemplateClient.createForEvent(eventId, templateData),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "event", variables.eventId]
      });
    }
  });
};
const usePreviewEmailTemplateForOrganizer = () => {
  return useMutation({
    mutationFn: ({
      organizerId,
      previewData
    }) => emailTemplateClient.previewForOrganizer(organizerId, previewData)
  });
};
const usePreviewEmailTemplateForEvent = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      previewData
    }) => emailTemplateClient.previewForEvent(eventId, previewData)
  });
};
const useDeleteEmailTemplateForOrganizer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      templateId
    }) => emailTemplateClient.deleteForOrganizer(organizerId, templateId),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "organizer", variables.organizerId]
      });
    }
  });
};
const useDeleteEmailTemplateForEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      templateId
    }) => emailTemplateClient.deleteForEvent(eventId, templateId),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "event", variables.eventId]
      });
    }
  });
};
const useUpdateEmailTemplateForOrganizer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      templateId,
      templateData
    }) => emailTemplateClient.updateForOrganizer(organizerId, templateId, templateData),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "organizer", variables.organizerId]
      });
    }
  });
};
const useUpdateEmailTemplateForEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      templateId,
      templateData
    }) => emailTemplateClient.updateForEvent(eventId, templateId, templateData),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: [GET_EMAIL_TEMPLATES_QUERY_KEY, "event", variables.eventId]
      });
    }
  });
};
const editor = "_editor_1sged_1";
const templatePreview = "_templatePreview_1sged_1";
const previewHeader = "_previewHeader_1sged_6";
const previewContent = "_previewContent_1sged_12";
const classes$2 = {
  editor,
  templatePreview,
  previewHeader,
  previewContent
};
const EmailTemplatePreviewPane = ({
  subject,
  previewData,
  isLoading = false,
  error
}) => {
  const hasContent = (previewData == null ? void 0 : previewData.subject) && (previewData == null ? void 0 : previewData.body);
  return /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxs("div", { className: classes$2.templatePreview, children: [
      /* @__PURE__ */ jsx("div", { className: classes$2.previewHeader, children: /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "Be4gD+" }) }),
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: (previewData == null ? void 0 : previewData.subject) || subject || /* @__PURE__ */ jsx(Trans, { id: "M7Uapz" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: classes$2.previewContent, style: {
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx(LoadingOverlay, { visible: isLoading }),
        error && /* @__PURE__ */ jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsx(IconAlertCircle, { size: 16 }), children: error }),
        !error && hasContent && /* @__PURE__ */ jsx(Typography, { children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
          __html: previewData.body
        } }) }),
        !error && !hasContent && !isLoading && /* @__PURE__ */ jsxs(Stack, { gap: "md", align: "center", py: "xl", children: [
          /* @__PURE__ */ jsx(IconEye, { size: 48, color: "var(--mantine-color-gray-5)" }),
          /* @__PURE__ */ jsx(Text, { c: "dimmed", ta: "center", children: /* @__PURE__ */ jsx(Trans, { id: "7YZofi" }) })
        ] })
      ] })
    ] }),
    previewData && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fs: "italic", children: /* @__PURE__ */ jsx(Trans, { id: "9b5956" }) })
    ] })
  ] });
};
const CTAConfiguration = ({
  label,
  onLabelChange,
  error
}) => {
  return /* @__PURE__ */ jsx(Paper, { p: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Stack, { gap: "sm", children: [
    /* @__PURE__ */ jsx(Text, { fw: 500, size: "sm", children: /* @__PURE__ */ jsx(Trans, { id: "2VLZwd" }) }),
    /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mb: "sm", children: /* @__PURE__ */ jsx(Trans, { id: "fTFfOK" }) }),
    /* @__PURE__ */ jsx(TextInput, { label: /* @__PURE__ */ jsx(Trans, { id: "bv6RXK" }), placeholder: i18n._(
      /*i18n*/
      {
        id: "67OJ7t"
      }
    ), value: label, onChange: (event) => onLabelChange(event.currentTarget.value), error, required: true })
  ] }) });
};
const liquidTokenControlModule = createLazyModule(() => import("./LiquidTokenControl-C-SikvkH.js"));
const LiquidTokenControl = (props) => {
  const module = liquidTokenControlModule.useModule();
  if (!module) {
    return null;
  }
  return /* @__PURE__ */ jsx(module.LiquidTokenControl, { ...props });
};
const EmailTemplateEditor = ({
  templateType,
  template,
  defaultTemplate,
  onSave,
  onPreview,
  onClose,
  isSaving = false,
  isPreviewLoading = false,
  previewData
}) => {
  var _a;
  const [activeTab, setActiveTab] = useState("editor");
  const form = useForm({
    initialValues: {
      subject: (template == null ? void 0 : template.subject) || (defaultTemplate == null ? void 0 : defaultTemplate.subject) || "",
      body: (template == null ? void 0 : template.body) || (defaultTemplate == null ? void 0 : defaultTemplate.body) || "",
      ctaLabel: ((_a = template == null ? void 0 : template.cta) == null ? void 0 : _a.label) || "",
      isActive: (template == null ? void 0 : template.is_active) ?? true
    },
    validate: {
      subject: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "ii0qn/"
        }
      ) : null,
      body: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "UabgBd"
        }
      ) : null,
      ctaLabel: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "lfLHNz"
        }
      ) : null
    }
  });
  useEffect(() => {
    if (!template && defaultTemplate && defaultTemplate.subject && defaultTemplate.body) {
      form.setFieldValue("subject", defaultTemplate.subject);
      form.setFieldValue("body", defaultTemplate.body);
      const defaultCtaLabel = templateType === "order_confirmation" ? i18n._(
        /*i18n*/
        {
          id: "67OJ7t"
        }
      ) : templateType === "occurrence_cancellation" ? i18n._(
        /*i18n*/
        {
          id: "FCVmuU"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "1J/AWD"
        }
      );
      form.setFieldValue("ctaLabel", defaultCtaLabel);
      form.setFieldValue("isActive", true);
    }
  }, [defaultTemplate, template]);
  const triggerPreview = () => {
    if (form.values.subject && form.values.body) {
      onPreview({
        subject: form.values.subject,
        body: form.values.body,
        template_type: templateType,
        ctaLabel: form.values.ctaLabel || (templateType === "order_confirmation" ? i18n._(
          /*i18n*/
          {
            id: "67OJ7t"
          }
        ) : templateType === "occurrence_cancellation" ? i18n._(
          /*i18n*/
          {
            id: "FCVmuU"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "1J/AWD"
          }
        ))
      });
    }
  };
  useEffect(() => {
    if (activeTab === "preview" && form.values.subject && form.values.body) {
      triggerPreview();
    }
  }, [activeTab]);
  const handleSave = (values) => {
    const templateData = {
      ...template ? {} : {
        template_type: templateType
      },
      subject: values.subject,
      body: values.body,
      ctaLabel: values.ctaLabel,
      isActive: values.isActive
    };
    onSave(templateData, form);
  };
  const templateTypeLabels = {
    "order_confirmation": i18n._(
      /*i18n*/
      {
        id: "x4MLWE"
      }
    ),
    "attendee_ticket": i18n._(
      /*i18n*/
      {
        id: "HT/08n"
      }
    ),
    "occurrence_cancellation": i18n._(
      /*i18n*/
      {
        id: "MaB9wW"
      }
    )
  };
  return /* @__PURE__ */ jsx("div", { className: classes$2.editor, children: /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSave), children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "flex-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, mb: "xs", children: template ? /* @__PURE__ */ jsx(Trans, { id: "LTzmgK", values: {
          0: templateTypeLabels[templateType]
        } }) : /* @__PURE__ */ jsx(Trans, { id: "zg4oSu", values: {
          0: templateTypeLabels[templateType]
        } }) }),
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: /* @__PURE__ */ jsx(Trans, { id: "pxNIxa" }) })
      ] }),
      onClose && /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", size: "lg", onClick: onClose, children: /* @__PURE__ */ jsx(IconX, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsx(TextInput, { label: /* @__PURE__ */ jsx(Trans, { id: "UJmAAK" }), placeholder: i18n._(
      /*i18n*/
      {
        id: "INDKM9"
      }
    ), required: true, ...form.getInputProps("subject") }),
    /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onChange: (value) => setActiveTab(value || "editor"), children: [
      /* @__PURE__ */ jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsx(Tabs.Tab, { value: "editor", leftSection: /* @__PURE__ */ jsx(IconBraces, { size: 16 }), children: /* @__PURE__ */ jsx(Trans, { id: "uBAxNB" }) }),
        /* @__PURE__ */ jsx(Tabs.Tab, { value: "preview", leftSection: /* @__PURE__ */ jsx(IconEye, { size: 16 }), children: /* @__PURE__ */ jsx(Trans, { id: "rdUucN" }) })
      ] }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "editor", pt: "md", children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Editor, { value: form.values.body, onChange: (value) => form.setFieldValue("body", value), error: form.errors.body, label: /* @__PURE__ */ jsx(Trans, { id: "elW7Tn" }), description: /* @__PURE__ */ jsx(Trans, { id: "OHJXlK", components: {
          0: /* @__PURE__ */ jsx("a", { href: "https://shopify.github.io/liquid/", target: "_blank" })
        } }), editorType: "full", additionalToolbarControls: /* @__PURE__ */ jsx(LiquidTokenControl, { templateType }) }),
        /* @__PURE__ */ jsx(CTAConfiguration, { label: form.values.ctaLabel, onLabelChange: (label) => form.setFieldValue("ctaLabel", label), error: form.errors.ctaLabel })
      ] }) }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "preview", pt: "md", children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Group, { justify: "flex-end", children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", onClick: triggerPreview, loading: isPreviewLoading, leftSection: /* @__PURE__ */ jsx(IconEye, { size: 16 }), children: /* @__PURE__ */ jsx(Trans, { id: "ACKu03" }) }) }),
        /* @__PURE__ */ jsx(EmailTemplatePreviewPane, { subject: form.values.subject, previewData, isLoading: isPreviewLoading })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(Switch, { label: /* @__PURE__ */ jsx(Trans, { id: "7wtpH5" }), description: /* @__PURE__ */ jsx(Trans, { id: "Upeg/u" }), ...form.getInputProps("isActive", {
      type: "checkbox"
    }) }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, loading: isSaving, children: /* @__PURE__ */ jsx(Trans, { id: "9Y3hAT" }) })
  ] }) }) });
};
const EmailTemplateSettingsBase = ({
  contextId,
  contextType,
  templates,
  defaultTemplates,
  isLoading,
  createMutation,
  updateMutation,
  deleteMutation,
  previewMutation,
  onCreateTemplate,
  onSaveSuccess,
  onDeleteSuccess,
  onError,
  eventType
}) => {
  var _a;
  const [editorOpened, {
    open: openEditor,
    close: closeEditor
  }] = useDisclosure(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [editingType, setEditingType] = useState("order_confirmation");
  const handleFormError = useFormErrorResponseHandler();
  const {
    data: account,
    isFetched: isAccountFetched
  } = useGetAccount();
  const eventQuery = useGetEvent(contextType === "event" ? contextId : void 0);
  const stripeOrganizerId = contextType === "organizer" ? contextId : (_a = eventQuery.data) == null ? void 0 : _a.organizer_id;
  const isAccountVerified = isAccountFetched && (account == null ? void 0 : account.is_account_email_confirmed);
  const accountRequiresManualVerification = isAccountFetched && (account == null ? void 0 : account.requires_manual_verification);
  const isModifyDisabled = !isAccountVerified || accountRequiresManualVerification;
  const orderConfirmationTemplate = templates.find((t) => t.template_type === "order_confirmation");
  const attendeeTicketTemplate = templates.find((t) => t.template_type === "attendee_ticket");
  const occurrenceCancellationTemplate = templates.find((t) => t.template_type === "occurrence_cancellation");
  const handleCreateTemplate = (type) => {
    setEditingTemplate(null);
    setEditingType(type);
    onCreateTemplate == null ? void 0 : onCreateTemplate(type);
    openEditor();
  };
  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setEditingType(template.template_type);
    openEditor();
  };
  const handleDeleteTemplate = (template) => {
    const fallbackMessage = contextType === "event" ? i18n._(
      /*i18n*/
      {
        id: "aLS+A6"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "JmVITJ"
      }
    );
    confirmationDialog(fallbackMessage, () => {
      const params = contextType === "event" ? {
        eventId: contextId,
        templateId: template.id
      } : {
        organizerId: contextId,
        templateId: template.id
      };
      deleteMutation.mutate(params, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "xrWdPR"
            }
          ));
          onDeleteSuccess == null ? void 0 : onDeleteSuccess();
        },
        onError: (error) => {
          showError(i18n._(
            /*i18n*/
            {
              id: "xFj7Yj"
            }
          ));
          onError == null ? void 0 : onError(error, i18n._(
            /*i18n*/
            {
              id: "xFj7Yj"
            }
          ));
        }
      });
    }, {
      confirm: i18n._(
        /*i18n*/
        {
          id: "dPyJ15"
        }
      ),
      cancel: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      )
    });
  };
  const handleSaveTemplate = (data, editorForm) => {
    if (editingTemplate) {
      const params = contextType === "event" ? {
        eventId: contextId,
        templateId: editingTemplate.id,
        templateData: data
      } : {
        organizerId: contextId,
        templateId: editingTemplate.id,
        templateData: data
      };
      updateMutation.mutate(params, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "G04Zjt"
            }
          ));
          closeEditor();
          onSaveSuccess == null ? void 0 : onSaveSuccess();
        },
        onError: (error) => {
          var _a2, _b;
          if (((_b = (_a2 = error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.errors) && editorForm) {
            const errors = error.response.data.errors;
            if (errors.body) {
              editorForm.setFieldError("body", i18n._(
                /*i18n*/
                {
                  id: "tnL+GP"
                }
              ));
              showError(i18n._(
                /*i18n*/
                {
                  id: "DEcpfp"
                }
              ));
            } else {
              handleFormError(editorForm, error, i18n._(
                /*i18n*/
                {
                  id: "zTkTF3"
                }
              ));
            }
          } else {
            showError(i18n._(
              /*i18n*/
              {
                id: "zTkTF3"
              }
            ));
          }
          onError == null ? void 0 : onError(error, i18n._(
            /*i18n*/
            {
              id: "zTkTF3"
            }
          ));
        }
      });
    } else {
      const params = contextType === "event" ? {
        eventId: contextId,
        templateData: data
      } : {
        organizerId: contextId,
        templateData: data
      };
      createMutation.mutate(params, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "QHhZeE"
            }
          ));
          closeEditor();
          onSaveSuccess == null ? void 0 : onSaveSuccess();
        },
        onError: (error) => {
          var _a2, _b;
          if (((_b = (_a2 = error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.errors) && editorForm) {
            const errors = error.response.data.errors;
            if (errors.body) {
              editorForm.setFieldError("body", i18n._(
                /*i18n*/
                {
                  id: "tnL+GP"
                }
              ));
              showError(i18n._(
                /*i18n*/
                {
                  id: "DEcpfp"
                }
              ));
            } else {
              handleFormError(editorForm, error, i18n._(
                /*i18n*/
                {
                  id: "zTkTF3"
                }
              ));
            }
          } else {
            showError(i18n._(
              /*i18n*/
              {
                id: "U66oUa"
              }
            ));
          }
          onError == null ? void 0 : onError(error, i18n._(
            /*i18n*/
            {
              id: "U66oUa"
            }
          ));
        }
      });
    }
  };
  const handlePreviewTemplate = (data) => {
    const params = contextType === "event" ? {
      eventId: contextId,
      previewData: data
    } : {
      organizerId: contextId,
      previewData: data
    };
    previewMutation.mutate(params);
  };
  const templateTypeLabels = {
    "order_confirmation": i18n._(
      /*i18n*/
      {
        id: "x4MLWE"
      }
    ),
    "attendee_ticket": i18n._(
      /*i18n*/
      {
        id: "HT/08n"
      }
    ),
    "occurrence_cancellation": i18n._(
      /*i18n*/
      {
        id: "MaB9wW"
      }
    )
  };
  const templateDescriptions = {
    "order_confirmation": i18n._(
      /*i18n*/
      {
        id: "SPdzrs"
      }
    ),
    "attendee_ticket": i18n._(
      /*i18n*/
      {
        id: "LxSN5F"
      }
    ),
    "occurrence_cancellation": i18n._(
      /*i18n*/
      {
        id: "ZFa8wv"
      }
    )
  };
  const getTemplateStatusBadge = (template) => {
    if (!template) {
      const fallbackText = contextType === "event" ? i18n._(
        /*i18n*/
        {
          id: "LqBITi"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "1bZAZA"
        }
      );
      return /* @__PURE__ */ jsx(Badge, { size: "sm", variant: "light", children: fallbackText });
    }
    return /* @__PURE__ */ jsx(Badge, { size: "sm", variant: "light", children: contextType === "event" ? i18n._(
      /*i18n*/
      {
        id: "1Hzev4"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "axv/Mi"
      }
    ) });
  };
  const TemplateCard = ({
    type,
    template,
    label,
    description
  }) => /* @__PURE__ */ jsx(Paper, { p: "md", withBorder: true, children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "flex-start", children: [
    /* @__PURE__ */ jsxs("div", { style: {
      flex: 1
    }, children: [
      /* @__PURE__ */ jsxs(Group, { gap: "xs", mb: "xs", children: [
        /* @__PURE__ */ jsx(IconMail, { size: 16 }),
        /* @__PURE__ */ jsx(Text, { fw: 600, children: label }),
        getTemplateStatusBadge(template)
      ] }),
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "md", children: description }),
      template && /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: /* @__PURE__ */ jsx(Trans, { id: "6aXq+t" }) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: template.subject })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Badge, { size: "xs", color: template.is_active ? "teal" : "red", variant: "filled", children: template.is_active ? i18n._(
          /*i18n*/
          {
            id: "F6pfE9"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "NoNwIX"
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Group, { gap: "xs", children: template ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", onClick: () => handleEditTemplate(template), disabled: isModifyDisabled, children: /* @__PURE__ */ jsx(IconEdit, { size: 16 }) }),
      /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "red", onClick: () => handleDeleteTemplate(template), loading: deleteMutation.isPending, disabled: isModifyDisabled, children: /* @__PURE__ */ jsx(IconTrash, { size: 16 }) })
    ] }) : /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 16 }), "data-testid": "email-template-create-button", onClick: () => handleCreateTemplate(type), disabled: isModifyDisabled, children: /* @__PURE__ */ jsx(Trans, { id: "YIDzi/" }) }) })
  ] }) });
  const getHeadingDescription = () => {
    if (contextType === "event") {
      return i18n._(
        /*i18n*/
        {
          id: "BTne9e"
        }
      );
    }
    return i18n._(
      /*i18n*/
      {
        id: "7gsjkI"
      }
    );
  };
  const getAlertMessage = () => {
    if (contextType === "event") {
      return /* @__PURE__ */ jsx(Trans, { id: "lzAaG5" });
    }
    return /* @__PURE__ */ jsx(Trans, { id: "HirZe8" });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "6IwNUc"
      }
    ), description: getHeadingDescription() }),
    !isAccountVerified && isAccountFetched && /* @__PURE__ */ jsx(Callout, { variant: "tip", children: i18n._(
      /*i18n*/
      {
        id: "w65ZgF"
      }
    ) }),
    accountRequiresManualVerification && /* @__PURE__ */ jsxs(Callout, { variant: "tip", title: i18n._(
      /*i18n*/
      {
        id: "nQI4H5"
      }
    ), children: [
      i18n._(
        /*i18n*/
        {
          id: "Ts8hhq"
        }
      ),
      stripeOrganizerId && /* @__PURE__ */ jsx("div", { style: {
        marginTop: "0.75rem"
      }, children: /* @__PURE__ */ jsx(Button, { component: NavLink, to: `/manage/organizer/${stripeOrganizerId}/settings#payouts`, leftSection: /* @__PURE__ */ jsx(IconBrandStripe, { size: 16 }), variant: "light", children: i18n._(
        /*i18n*/
        {
          id: "pbAk7a"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx(Callout, { variant: "info", children: getAlertMessage() }),
    /* @__PURE__ */ jsxs("div", { style: {
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx(LoadingOverlay, { visible: isLoading }),
      /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(TemplateCard, { type: "order_confirmation", template: orderConfirmationTemplate, label: templateTypeLabels.order_confirmation, description: templateDescriptions.order_confirmation }),
        /* @__PURE__ */ jsx(TemplateCard, { type: "attendee_ticket", template: attendeeTicketTemplate, label: templateTypeLabels.attendee_ticket, description: templateDescriptions.attendee_ticket }),
        (contextType === "organizer" || eventType === EventType.RECURRING) && /* @__PURE__ */ jsx(TemplateCard, { type: "occurrence_cancellation", template: occurrenceCancellationTemplate, label: templateTypeLabels.occurrence_cancellation, description: templateDescriptions.occurrence_cancellation })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { opened: editorOpened, onClose: closeEditor, size: "xl", withCloseButton: false, padding: "xl", children: /* @__PURE__ */ jsx(EmailTemplateEditor, { templateType: editingType, template: editingTemplate || void 0, defaultTemplate: defaultTemplates == null ? void 0 : defaultTemplates[editingType], onSave: handleSaveTemplate, onPreview: handlePreviewTemplate, onClose: closeEditor, isSaving: createMutation.isPending || updateMutation.isPending, isPreviewLoading: previewMutation.isPending, previewData: previewMutation.data }) })
  ] });
};
const SelfServiceSettings = ({
  value,
  onChange,
  disabled = false,
  isDefault = false
}) => {
  const label = isDefault ? i18n._(
    /*i18n*/
    {
      id: "hEtQsg"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "Qj0GKe"
    }
  );
  const description = isDefault ? i18n._(
    /*i18n*/
    {
      id: "403wpZ"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "GpT6Uf"
    }
  );
  return /* @__PURE__ */ jsx(Switch, { label, description, checked: value, onChange: (event) => onChange(event.currentTarget.checked), disabled });
};
const breakdown = "_breakdown_w1ep0_1";
const breakdownRow = "_breakdownRow_w1ep0_5";
const breakdownLabel = "_breakdownLabel_w1ep0_12";
const breakdownValue = "_breakdownValue_w1ep0_17";
const breakdownLabelBold = "_breakdownLabelBold_w1ep0_22";
const breakdownValueBold = "_breakdownValueBold_w1ep0_28";
const breakdownDivider = "_breakdownDivider_w1ep0_34";
const breakdownNote = "_breakdownNote_w1ep0_40";
const activeCard = "_activeCard_w1ep0_46";
const classes$1 = {
  breakdown,
  breakdownRow,
  breakdownLabel,
  breakdownValue,
  breakdownLabelBold,
  breakdownValueBold,
  breakdownDivider,
  breakdownNote,
  activeCard
};
const formatPercentage = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};
const FeeBreakdown = ({
  ticketPrice,
  feePercentage,
  fixedFee,
  currency,
  passToBuyer
}) => {
  const percentageRate = feePercentage / 100;
  let platformFee;
  if (passToBuyer) {
    platformFee = percentageRate >= 1 ? fixedFee + ticketPrice * percentageRate : (fixedFee + ticketPrice * percentageRate) / (1 - percentageRate);
  } else {
    platformFee = fixedFee + ticketPrice * percentageRate;
  }
  const roundedPlatformFee = Math.round(platformFee * 100) / 100;
  const buyerPays = passToBuyer ? ticketPrice + roundedPlatformFee : ticketPrice;
  const organizerReceives = passToBuyer ? ticketPrice : ticketPrice - roundedPlatformFee;
  return /* @__PURE__ */ jsxs("div", { className: classes$1.breakdown, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$1.breakdownRow, children: [
      /* @__PURE__ */ jsx("span", { className: classes$1.breakdownLabel, children: i18n._(
        /*i18n*/
        {
          id: "KnjoUA"
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: classes$1.breakdownValue, children: formatCurrency(ticketPrice, currency) })
    ] }),
    passToBuyer && /* @__PURE__ */ jsxs("div", { className: classes$1.breakdownRow, children: [
      /* @__PURE__ */ jsx("span", { className: classes$1.breakdownLabel, children: i18n._(
        /*i18n*/
        {
          id: "J3lhKT"
        }
      ) }),
      /* @__PURE__ */ jsxs("span", { className: classes$1.breakdownValue, children: [
        "+",
        formatCurrency(roundedPlatformFee, currency)
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classes$1.breakdownDivider }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.breakdownRow, children: [
      /* @__PURE__ */ jsx("span", { className: classes$1.breakdownLabelBold, children: i18n._(
        /*i18n*/
        {
          id: "BUe8Wj"
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: classes$1.breakdownValueBold, children: formatCurrency(buyerPays, currency) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.breakdownRow, children: [
      /* @__PURE__ */ jsx("span", { className: classes$1.breakdownLabelBold, children: i18n._(
        /*i18n*/
        {
          id: "88cUW+"
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: classes$1.breakdownValueBold, children: formatCurrency(organizerReceives, currency) })
    ] }),
    !passToBuyer && roundedPlatformFee > 0 && /* @__PURE__ */ jsx("div", { className: classes$1.breakdownNote, children: /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
      /*i18n*/
      {
        id: "RD51+P",
        values: {
          0: formatCurrency(roundedPlatformFee, currency)
        }
      }
    ) }) })
  ] });
};
const PlatformFeesSettings = ({
  configuration,
  currentValue,
  onSave,
  isLoading,
  isSaving,
  heading: heading2,
  description,
  feeHandlingLabel,
  feeHandlingDescription,
  feePreview,
  onPriceChange
}) => {
  var _a, _b, _c, _d, _e, _f;
  const [samplePrice, setSamplePrice] = useState(50);
  const [selectedOption, setSelectedOption] = useState(currentValue ? "pass" : "absorb");
  const feePercentage = (feePreview == null ? void 0 : feePreview.percentage_fee) ?? ((_a = configuration == null ? void 0 : configuration.application_fees) == null ? void 0 : _a.percentage) ?? 0;
  const fixedFee = (feePreview == null ? void 0 : feePreview.fixed_fee_converted) ?? ((_b = configuration == null ? void 0 : configuration.application_fees) == null ? void 0 : _b.fixed) ?? 0;
  const feeCurrency = (feePreview == null ? void 0 : feePreview.event_currency) ?? ((_c = configuration == null ? void 0 : configuration.application_fees) == null ? void 0 : _c.currency) ?? "USD";
  const configCurrency = ((_d = configuration == null ? void 0 : configuration.application_fees) == null ? void 0 : _d.currency) ?? "USD";
  const numericPrice = typeof samplePrice === "number" ? samplePrice : parseFloat(samplePrice) || 0;
  const handlePriceChange = (value) => {
    setSamplePrice(value);
    const price = typeof value === "number" ? value : parseFloat(value) || 0;
    if (onPriceChange && price > 0) {
      onPriceChange(price);
    }
  };
  const handleSave = () => {
    onSave(selectedOption === "pass");
  };
  useEffect(() => {
    if (!isLoading) {
      setSelectedOption(currentValue ? "pass" : "absorb");
    }
  }, [isLoading, currentValue]);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: heading2, description }),
    /* @__PURE__ */ jsxs(Stack, { gap: "xl", children: [
      configuration && /* @__PURE__ */ jsx(Card, { variant: "lightGray", children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "flex-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: "xs", children: i18n._(
            /*i18n*/
            {
              id: "5b3QLi"
            }
          ) }),
          /* @__PURE__ */ jsx(Title, { order: 4, children: configuration.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          textAlign: "right"
        }, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "J3lhKT"
            }
          ) }),
          /* @__PURE__ */ jsxs(Text, { fw: 600, children: [
            formatPercentage(feePercentage),
            ((_e = configuration.application_fees) == null ? void 0 : _e.fixed) > 0 && ` + ${formatCurrency(configuration.application_fees.fixed, configCurrency)}`
          ] }),
          feePreview && configCurrency !== feeCurrency && ((_f = configuration.application_fees) == null ? void 0 : _f.fixed) > 0 && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "xFTHZ5",
              values: {
                0: formatCurrency(fixedFee, feeCurrency)
              }
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { fw: 500, mb: "sm", children: feeHandlingLabel }),
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "md", children: feeHandlingDescription }),
        /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
          /*i18n*/
          {
            id: "B4nE3N"
          }
        ), value: samplePrice, onChange: handlePriceChange, min: 0, max: 1e4, decimalScale: 2, prefix: formatCurrency(0, feeCurrency).replace(/[\d.,\s]/g, ""), mb: "lg", style: {
          maxWidth: 200
        } }),
        /* @__PURE__ */ jsxs("fieldset", { disabled: isLoading || isSaving, children: [
          /* @__PURE__ */ jsx(SegmentedControl, { value: selectedOption, onChange: (value) => setSelectedOption(value), data: [{
            label: i18n._(
              /*i18n*/
              {
                id: "i8day5"
              }
            ),
            value: "pass"
          }, {
            label: i18n._(
              /*i18n*/
              {
                id: "JvuLls"
              }
            ),
            value: "absorb"
          }], mb: "md", fullWidth: true, size: "md" }),
          /* @__PURE__ */ jsxs(Grid, { mb: "lg", children: [
            /* @__PURE__ */ jsx(Grid.Col, { span: {
              base: 12,
              sm: 6
            }, children: /* @__PURE__ */ jsxs(Card, { variant: selectedOption === "pass" ? "default" : "lightGray", className: selectedOption === "pass" ? classes$1.activeCard : "", children: [
              /* @__PURE__ */ jsxs(Group, { gap: "xs", mb: "md", children: [
                /* @__PURE__ */ jsx(Text, { fw: 600, children: i18n._(
                  /*i18n*/
                  {
                    id: "k4FLBQ"
                  }
                ) }),
                selectedOption === "pass" && /* @__PURE__ */ jsx(Text, { size: "xs", c: "teal", fw: 500, children: i18n._(
                  /*i18n*/
                  {
                    id: "ylXj1N"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "md", children: i18n._(
                /*i18n*/
                {
                  id: "C4nQe5"
                }
              ) }),
              /* @__PURE__ */ jsx(FeeBreakdown, { ticketPrice: numericPrice, feePercentage, fixedFee, currency: feeCurrency, passToBuyer: true })
            ] }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: {
              base: 12,
              sm: 6
            }, children: /* @__PURE__ */ jsxs(Card, { variant: selectedOption === "absorb" ? "default" : "lightGray", className: selectedOption === "absorb" ? classes$1.activeCard : "", children: [
              /* @__PURE__ */ jsxs(Group, { gap: "xs", mb: "md", children: [
                /* @__PURE__ */ jsx(Text, { fw: 600, children: i18n._(
                  /*i18n*/
                  {
                    id: "lk74+I"
                  }
                ) }),
                selectedOption === "absorb" && /* @__PURE__ */ jsx(Text, { size: "xs", c: "teal", fw: 500, children: i18n._(
                  /*i18n*/
                  {
                    id: "ylXj1N"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "md", children: i18n._(
                /*i18n*/
                {
                  id: "qF1qbA"
                }
              ) }),
              /* @__PURE__ */ jsx(FeeBreakdown, { ticketPrice: numericPrice, feePercentage, fixedFee, currency: feeCurrency, passToBuyer: false })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(Button, { loading: isSaving, onClick: handleSave, children: i18n._(
            /*i18n*/
            {
              id: "tfDRzk"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { variant: "lightGray", children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { fw: 500, mb: 4, children: i18n._(
            /*i18n*/
            {
              id: "bVjDs9"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "o7LgX6"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Anchor, { href: "/account/taxes-and-fees", size: "sm", children: /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "FI60XC"
            }
          ) }),
          /* @__PURE__ */ jsx(IconArrowRight, { size: 16 })
        ] }) })
      ] }) })
    ] })
  ] });
};
const dangerZone = "_dangerZone_5vqvn_1";
const heading = "_heading_5vqvn_8";
const section = "_section_5vqvn_18";
const sectionTitle = "_sectionTitle_5vqvn_30";
const sectionDescription = "_sectionDescription_5vqvn_36";
const classes = {
  dangerZone,
  heading,
  section,
  sectionTitle,
  sectionDescription
};
const DangerZoneSection = ({
  title,
  description,
  action
}) => {
  return /* @__PURE__ */ jsxs("div", { className: classes.section, children: [
    /* @__PURE__ */ jsx("p", { className: classes.sectionTitle, children: title }),
    /* @__PURE__ */ jsx("p", { className: classes.sectionDescription, children: description }),
    action
  ] });
};
const DangerZone = ({
  children
}) => {
  return /* @__PURE__ */ jsxs("div", { className: classes.dangerZone, children: [
    /* @__PURE__ */ jsxs("h3", { className: classes.heading, children: [
      /* @__PURE__ */ jsx(IconAlertTriangle, { size: 20 }),
      i18n._(
        /*i18n*/
        {
          id: "ZQKLI1"
        }
      )
    ] }),
    children
  ] });
};
export {
  DangerZone as D,
  EmailTemplateSettingsBase as E,
  LiquidTokenControl as L,
  PlatformFeesSettings as P,
  SelfServiceSettings as S,
  useGetDefaultEmailTemplates as a,
  useCreateEmailTemplateForOrganizer as b,
  useUpdateEmailTemplateForOrganizer as c,
  useDeleteEmailTemplateForOrganizer as d,
  usePreviewEmailTemplateForOrganizer as e,
  DangerZoneSection as f,
  useGetEmailTemplatesForEvent as g,
  useCreateEmailTemplateForEvent as h,
  useUpdateEmailTemplateForEvent as i,
  useDeleteEmailTemplateForEvent as j,
  usePreviewEmailTemplateForEvent as k,
  emailTemplateClient as l,
  useGetEmailTemplatesForOrganizer as u
};

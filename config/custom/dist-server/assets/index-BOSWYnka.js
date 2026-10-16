import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Container, Stack, Skeleton, Group, Title, Button, Card, Text, Badge, ActionIcon, TextInput, Select, NumberInput, Switch } from "@mantine/core";
import { u as useGetAllConfigurations } from "./useGetAllConfigurations-DPUMS8t7.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { C as Callout } from "./index-CwjvB_vn.js";
import { useState } from "react";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { useForm } from "@mantine/form";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { c as currenciesMap } from "./currencies-wzczGcKi.js";
import { a as getCurrencySymbol } from "./currency-Br7a8J7F.js";
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
const useCreateConfiguration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminClient.createConfiguration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "configurations"]
      });
    }
  });
};
const useUpdateConfiguration = (configurationId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminClient.updateConfiguration(configurationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "configurations"]
      });
    }
  });
};
const useDeleteConfiguration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (configurationId) => adminClient.deleteConfiguration(configurationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "configurations"]
      });
    }
  });
};
const configCard = "_configCard_616o6_1";
const classes = {
  configCard
};
const Configurations = () => {
  const {
    data: configurationsData,
    isLoading
  } = useGetAllConfigurations();
  const deleteMutation = useDeleteConfiguration();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const configurations = (configurationsData == null ? void 0 : configurationsData.data) || [];
  const handleDelete = (config) => {
    if (config.is_system_default) {
      showError(i18n._(
        /*i18n*/
        {
          id: "01sEfm"
        }
      ));
      return;
    }
    if (window.confirm(i18n._(
      /*i18n*/
      {
        id: "vPeW/6"
      }
    ))) {
      deleteMutation.mutate(config.id, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "mLBUMQ"
          }
        )),
        onError: () => showError(i18n._(
          /*i18n*/
          {
            id: "aFk48v"
          }
        ))
      });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 40, width: 200 }),
      /* @__PURE__ */ jsx(Skeleton, { height: 150, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 150, radius: "md" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
          /*i18n*/
          {
            id: "3cKoxx"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 16 }), onClick: () => setShowCreateModal(true), children: i18n._(
          /*i18n*/
          {
            id: "YAl9Hg"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Callout, { variant: "tip", children: i18n._(
        /*i18n*/
        {
          id: "UIENhw"
        }
      ) }),
      /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        configurations.map((config) => {
          var _a, _b, _c, _d;
          return /* @__PURE__ */ jsx(Card, { className: classes.configCard, children: /* @__PURE__ */ jsxs(Group, { justify: "space-between", align: "flex-start", children: [
            /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
              /* @__PURE__ */ jsxs(Group, { gap: "sm", children: [
                /* @__PURE__ */ jsx(Text, { fw: 600, children: config.name }),
                config.is_system_default && /* @__PURE__ */ jsx(Badge, { color: "blue", size: "sm", children: i18n._(
                  /*i18n*/
                  {
                    id: "9YHrNC"
                  }
                ) }),
                config.bypass_application_fees && /* @__PURE__ */ jsx(Badge, { color: "orange", size: "sm", children: i18n._(
                  /*i18n*/
                  {
                    id: "LyUWXA"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs(Group, { gap: "xl", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
                    /*i18n*/
                    {
                      id: "6bBh3/"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs(Text, { size: "sm", fw: 500, children: [
                    getCurrencySymbol(((_a = config.application_fees) == null ? void 0 : _a.currency) || "USD"),
                    ((_b = config.application_fees) == null ? void 0 : _b.fixed) || 0,
                    " ",
                    ((_c = config.application_fees) == null ? void 0 : _c.currency) || "USD"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
                    /*i18n*/
                    {
                      id: "mnF83a"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs(Text, { size: "sm", fw: 500, children: [
                    ((_d = config.application_fees) == null ? void 0 : _d.percentage) || 0,
                    "%"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsx(ActionIcon, { variant: "light", onClick: () => setEditingConfig(config), children: /* @__PURE__ */ jsx(IconEdit, { size: 16 }) }),
              /* @__PURE__ */ jsx(ActionIcon, { variant: "light", color: "red", onClick: () => handleDelete(config), disabled: config.is_system_default, children: /* @__PURE__ */ jsx(IconTrash, { size: 16 }) })
            ] })
          ] }) }, config.id);
        }),
        configurations.length === 0 && /* @__PURE__ */ jsx(Text, { c: "dimmed", ta: "center", children: i18n._(
          /*i18n*/
          {
            id: "+dAKxg"
          }
        ) })
      ] })
    ] }) }),
    showCreateModal && /* @__PURE__ */ jsx(ConfigurationModal, { onClose: () => setShowCreateModal(false) }),
    editingConfig && /* @__PURE__ */ jsx(ConfigurationModal, { configuration: editingConfig, onClose: () => setEditingConfig(null) })
  ] });
};
const ConfigurationModal = ({
  configuration,
  onClose
}) => {
  var _a, _b, _c;
  const createMutation = useCreateConfiguration();
  const updateMutation = useUpdateConfiguration((configuration == null ? void 0 : configuration.id) || 0);
  const isEditing = !!configuration;
  const form = useForm({
    initialValues: {
      name: (configuration == null ? void 0 : configuration.name) || "",
      fixed_fee: ((_a = configuration == null ? void 0 : configuration.application_fees) == null ? void 0 : _a.fixed) || 0,
      percentage_fee: ((_b = configuration == null ? void 0 : configuration.application_fees) == null ? void 0 : _b.percentage) || 0,
      currency: ((_c = configuration == null ? void 0 : configuration.application_fees) == null ? void 0 : _c.currency) || "USD",
      bypass_application_fees: (configuration == null ? void 0 : configuration.bypass_application_fees) || false
    },
    validate: {
      name: (value) => {
        if (!value.trim()) return i18n._(
          /*i18n*/
          {
            id: "8/brI5"
          }
        );
        if (value.length > 255) return i18n._(
          /*i18n*/
          {
            id: "sFFArG"
          }
        );
        return null;
      },
      fixed_fee: (value) => value < 0 ? i18n._(
        /*i18n*/
        {
          id: "LWL3Bs"
        }
      ) : null,
      percentage_fee: (value) => {
        if (value < 0 || value > 100) return i18n._(
          /*i18n*/
          {
            id: "MixU2P"
          }
        );
        return null;
      }
    }
  });
  const handleSubmit = (values) => {
    const data = {
      name: values.name,
      application_fees: {
        fixed: values.fixed_fee,
        percentage: values.percentage_fee,
        currency: values.currency
      },
      bypass_application_fees: values.bypass_application_fees
    };
    const mutation = isEditing ? updateMutation : createMutation;
    mutation.mutate(data, {
      onSuccess: () => {
        showSuccess(isEditing ? i18n._(
          /*i18n*/
          {
            id: "eeZdaB"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "X1zdE7"
          }
        ));
        onClose();
      },
      onError: () => {
        showError(isEditing ? i18n._(
          /*i18n*/
          {
            id: "uQynyf"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "dVgNF1"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { heading: isEditing ? i18n._(
    /*i18n*/
    {
      id: "+guao5"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "YAl9Hg"
    }
  ), onClose, opened: true, children: [
    isEditing && (configuration == null ? void 0 : configuration.is_system_default) && /* @__PURE__ */ jsx(Callout, { variant: "tip", children: i18n._(
      /*i18n*/
      {
        id: "aUi/Dz"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "6YtxFj"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "9LEqK0"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "54MPqC"
        }
      ), required: true, ...form.getInputProps("name") }),
      /* @__PURE__ */ jsx(Select, { label: i18n._(
        /*i18n*/
        {
          id: "9bHCo2"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "AIF7J2"
        }
      ), data: currenciesMap, searchable: true, ...form.getInputProps("currency") }),
      /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
        /*i18n*/
        {
          id: "6bBh3/"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "zWqUyJ"
        }
      ), placeholder: "0.00", decimalScale: 2, fixedDecimalScale: true, min: 0, prefix: getCurrencySymbol(form.values.currency), ...form.getInputProps("fixed_fee") }),
      /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
        /*i18n*/
        {
          id: "mnF83a"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "MkuVAZ"
        }
      ), placeholder: "0", decimalScale: 2, fixedDecimalScale: true, min: 0, max: 100, suffix: "%", ...form.getInputProps("percentage_fee") }),
      /* @__PURE__ */ jsx(Switch, { label: i18n._(
        /*i18n*/
        {
          id: "lFdbRS"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "Kj0Txn"
        }
      ), ...form.getInputProps("bypass_application_fees", {
        type: "checkbox"
      }) }),
      /* @__PURE__ */ jsx(Button, { fullWidth: true, loading: createMutation.isPending || updateMutation.isPending, type: "submit", children: isEditing ? i18n._(
        /*i18n*/
        {
          id: "IUwGEM"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "YAl9Hg"
        }
      ) })
    ] }) })
  ] });
};
export {
  Configurations as default
};

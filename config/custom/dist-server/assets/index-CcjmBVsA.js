import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Modal, Tabs, Stack, Text, Group, Badge, Select, Button, Divider, NumberInput, Switch, TextInput, Container, Skeleton, Title, Card } from "@mantine/core";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { G as GET_ALL_ACCOUNTS_QUERY_KEY } from "./useGetAllAccounts-CXYiP3Zg.js";
import { IconArrowLeft, IconCalendar, IconWorld, IconBuildingBank, IconUsers } from "@tabler/icons-react";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useGetAllConfigurations } from "./useGetAllConfigurations-DPUMS8t7.js";
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
const GET_ADMIN_ACCOUNT_QUERY_KEY = ["admin", "account"];
const useGetAdminAccount = (accountId) => {
  return useQuery({
    queryKey: [...GET_ADMIN_ACCOUNT_QUERY_KEY, accountId],
    queryFn: () => adminClient.getAccount(accountId),
    enabled: !!accountId
  });
};
const GET_MESSAGING_TIERS_QUERY_KEY = "GET_MESSAGING_TIERS";
const useGetMessagingTiers = () => {
  return useQuery({
    queryKey: [GET_MESSAGING_TIERS_QUERY_KEY],
    queryFn: () => adminClient.getMessagingTiers()
  });
};
const useUpdateAccountMessagingTier = (accountId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tierId) => adminClient.updateAccountMessagingTier(accountId, tierId),
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [...GET_ADMIN_ACCOUNT_QUERY_KEY, accountId]
      }), queryClient.invalidateQueries({
        queryKey: GET_ALL_ACCOUNTS_QUERY_KEY
      })]);
    }
  });
};
const useUpdateAccountVerification = (accountId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isManuallyVerified) => adminClient.updateAccountVerification(accountId, isManuallyVerified),
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [...GET_ADMIN_ACCOUNT_QUERY_KEY, accountId]
      }), queryClient.invalidateQueries({
        queryKey: GET_ALL_ACCOUNTS_QUERY_KEY
      })]);
    }
  });
};
const useAssignOrganizerConfiguration = (organizerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (configurationId) => adminClient.assignOrganizerConfiguration(organizerId, configurationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_ACCOUNT_QUERY_KEY
      });
    }
  });
};
const useUpdateOrganizerConfigurationOverride = (organizerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminClient.updateOrganizerConfigurationOverride(organizerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_ACCOUNT_QUERY_KEY
      });
    }
  });
};
const useUpdateAdminOrganizerVatSetting = (organizerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminClient.updateOrganizerVatSetting(organizerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_ACCOUNT_QUERY_KEY
      });
    }
  });
};
const OrganizerAdminModal = ({
  organizer,
  onClose
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const {
    data: configsData
  } = useGetAllConfigurations();
  const configurations = (configsData == null ? void 0 : configsData.data) ?? [];
  const assignMutation = useAssignOrganizerConfiguration(organizer.id);
  const overrideMutation = useUpdateOrganizerConfigurationOverride(organizer.id);
  const vatMutation = useUpdateAdminOrganizerVatSetting(organizer.id);
  const [selectedConfigId, setSelectedConfigId] = useState(organizer.configuration ? String(organizer.configuration.id) : null);
  const [overridePercentage, setOverridePercentage] = useState(((_b = (_a = organizer.configuration) == null ? void 0 : _a.application_fees) == null ? void 0 : _b.percentage) ?? 0);
  const [overrideFixed, setOverrideFixed] = useState(((_d = (_c = organizer.configuration) == null ? void 0 : _c.application_fees) == null ? void 0 : _d.fixed) ?? 0);
  const [vatRegistered, setVatRegistered] = useState(!!((_e = organizer.vat_setting) == null ? void 0 : _e.vat_registered));
  const [vatNumber, setVatNumber] = useState(((_f = organizer.vat_setting) == null ? void 0 : _f.vat_number) ?? "");
  const [vatValidated, setVatValidated] = useState(!!((_g = organizer.vat_setting) == null ? void 0 : _g.vat_validated));
  const [businessName, setBusinessName] = useState(((_h = organizer.vat_setting) == null ? void 0 : _h.business_name) ?? "");
  const [businessAddress, setBusinessAddress] = useState(((_i = organizer.vat_setting) == null ? void 0 : _i.business_address) ?? "");
  const [vatCountryCode, setVatCountryCode] = useState(((_j = organizer.vat_setting) == null ? void 0 : _j.vat_country_code) ?? "");
  useEffect(() => {
    var _a2, _b2, _c2, _d2;
    setSelectedConfigId(organizer.configuration ? String(organizer.configuration.id) : null);
    setOverridePercentage(((_b2 = (_a2 = organizer.configuration) == null ? void 0 : _a2.application_fees) == null ? void 0 : _b2.percentage) ?? 0);
    setOverrideFixed(((_d2 = (_c2 = organizer.configuration) == null ? void 0 : _c2.application_fees) == null ? void 0 : _d2.fixed) ?? 0);
  }, [organizer.configuration]);
  const handleAssign = () => {
    if (!selectedConfigId) return;
    assignMutation.mutate(selectedConfigId, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "WTw0bB"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "LdPKPR"
        }
      ))
    });
  };
  const handleOverride = () => {
    var _a2, _b2;
    const currency = ((_b2 = (_a2 = organizer.configuration) == null ? void 0 : _a2.application_fees) == null ? void 0 : _b2.currency) ?? "USD";
    overrideMutation.mutate({
      application_fees: {
        percentage: overridePercentage,
        fixed: overrideFixed,
        currency
      }
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "K4dKSP"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "WRREqF"
        }
      ))
    });
  };
  const handleVatSave = () => {
    vatMutation.mutate({
      vat_registered: vatRegistered,
      vat_number: vatRegistered ? vatNumber || null : null,
      vat_validated: vatValidated,
      business_name: businessName || null,
      business_address: businessAddress || null,
      vat_country_code: vatCountryCode ? vatCountryCode.toUpperCase() : null
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "bXn1Jz"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "kqA9lY"
        }
      ))
    });
  };
  const configOptions = configurations.map((c) => ({
    value: String(c.id),
    label: c.is_system_default ? `${c.name} (default)` : c.name
  }));
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, title: i18n._(
    /*i18n*/
    {
      id: "cdY2at",
      values: {
        0: organizer.name
      }
    }
  ), size: "lg", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "configuration", children: [
    /* @__PURE__ */ jsxs(Tabs.List, { children: [
      /* @__PURE__ */ jsx(Tabs.Tab, { value: "configuration", children: i18n._(
        /*i18n*/
        {
          id: "ywFj2D"
        }
      ) }),
      /* @__PURE__ */ jsx(Tabs.Tab, { value: "vat", children: i18n._(
        /*i18n*/
        {
          id: "khBZkl"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Tabs.Panel, { value: "configuration", pt: "md", children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "0xLR6W"
          }
        ) }),
        /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: ((_k = organizer.configuration) == null ? void 0 : _k.name) ?? i18n._(
            /*i18n*/
            {
              id: "B/gRsg"
            }
          ) }),
          ((_l = organizer.configuration) == null ? void 0 : _l.is_system_default) && /* @__PURE__ */ jsx(Badge, { size: "xs", children: i18n._(
            /*i18n*/
            {
              id: "ovBPCi"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Select, { label: i18n._(
        /*i18n*/
        {
          id: "ui5ln+"
        }
      ), data: configOptions, value: selectedConfigId, onChange: setSelectedConfigId, placeholder: i18n._(
        /*i18n*/
        {
          id: "p8Jvp4"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleAssign, loading: assignMutation.isPending, disabled: !selectedConfigId || String((_m = organizer.configuration) == null ? void 0 : _m.id) === selectedConfigId, children: i18n._(
        /*i18n*/
        {
          id: "9Jxliv"
        }
      ) }),
      /* @__PURE__ */ jsx(Divider, { my: "sm", label: i18n._(
        /*i18n*/
        {
          id: "GpFTEc"
        }
      ), labelPosition: "center" }),
      /* @__PURE__ */ jsxs(Group, { grow: true, children: [
        /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
          /*i18n*/
          {
            id: "TNLuRD"
          }
        ), value: overridePercentage, onChange: (v) => setOverridePercentage(typeof v === "number" ? v : Number(v) || 0), min: 0, max: 100, decimalScale: 2 }),
        /* @__PURE__ */ jsx(NumberInput, { label: i18n._(
          /*i18n*/
          {
            id: "3lkYdQ"
          }
        ), value: overrideFixed, onChange: (v) => setOverrideFixed(typeof v === "number" ? v : Number(v) || 0), min: 0, decimalScale: 2 })
      ] }),
      /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
        /*i18n*/
        {
          id: "Fbqm/I"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { variant: "light", onClick: handleOverride, loading: overrideMutation.isPending, children: i18n._(
        /*i18n*/
        {
          id: "zJiuDn"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Tabs.Panel, { value: "vat", pt: "md", children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(Switch, { label: i18n._(
        /*i18n*/
        {
          id: "+KJZt3"
        }
      ), checked: vatRegistered, onChange: (e) => setVatRegistered(e.currentTarget.checked) }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "WLkfqH"
        }
      ), value: vatNumber, onChange: (e) => setVatNumber(e.currentTarget.value), disabled: !vatRegistered, placeholder: "IE1234567A" }),
      /* @__PURE__ */ jsx(Switch, { label: i18n._(
        /*i18n*/
        {
          id: "pqRBOz"
        }
      ), checked: vatValidated, onChange: (e) => setVatValidated(e.currentTarget.checked) }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "kQekXw"
        }
      ), value: businessName, onChange: (e) => setBusinessName(e.currentTarget.value) }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "SWnN1L"
        }
      ), value: businessAddress, onChange: (e) => setBusinessAddress(e.currentTarget.value) }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "t7caBM"
        }
      ), value: vatCountryCode, onChange: (e) => setVatCountryCode(e.currentTarget.value.toUpperCase().slice(0, 2)), maxLength: 2, placeholder: "IE" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleVatSave, loading: vatMutation.isPending, children: i18n._(
        /*i18n*/
        {
          id: "cTI8IK"
        }
      ) })
    ] }) })
  ] }) });
};
const accountCard = "_accountCard_66gw3_1";
const infoGrid = "_infoGrid_66gw3_8";
const infoItem = "_infoItem_66gw3_15";
const statsGrid = "_statsGrid_66gw3_21";
const statItem = "_statItem_66gw3_30";
const usersList = "_usersList_66gw3_39";
const userItem = "_userItem_66gw3_45";
const classes = {
  accountCard,
  infoGrid,
  infoItem,
  statsGrid,
  statItem,
  usersList,
  userItem
};
const AccountDetail = () => {
  var _a;
  const {
    accountId
  } = useParams();
  const navigate = useNavigate();
  const {
    data: accountData,
    isLoading
  } = useGetAdminAccount(accountId);
  const {
    data: messagingTiersData
  } = useGetMessagingTiers();
  const updateTierMutation = useUpdateAccountMessagingTier(accountId);
  const updateVerificationMutation = useUpdateAccountVerification(accountId);
  const [managedOrganizer, setManagedOrganizer] = useState(null);
  const account = accountData == null ? void 0 : accountData.data;
  const messagingTiers = (messagingTiersData == null ? void 0 : messagingTiersData.data) || [];
  const organizers = (account == null ? void 0 : account.organizers) ?? [];
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const handleMessagingTierChange = (value) => {
    if (!value) return;
    updateTierMutation.mutate(parseInt(value, 10), {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "v7xKtM"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "EhlbcI"
        }
      ))
    });
  };
  const handleVerificationChange = (isVerified) => {
    updateVerificationMutation.mutate(isVerified, {
      onSuccess: () => showSuccess(isVerified ? i18n._(
        /*i18n*/
        {
          id: "M5dQOI"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "brX9lB"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "g9GCpn"
        }
      ))
    });
  };
  const getTierBadgeColor = (tierName) => {
    if (!tierName) return "gray";
    const name = tierName.toLowerCase();
    if (name.includes("premium")) return "green";
    if (name.includes("trusted")) return "blue";
    return "gray";
  };
  const getSelectedTierDetails = () => {
    var _a2;
    const selectedTierId = (_a2 = account == null ? void 0 : account.messaging_tier) == null ? void 0 : _a2.id;
    if (!selectedTierId) return null;
    return messagingTiers.find((tier) => tier.id === selectedTierId);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 40, width: 200 }),
      /* @__PURE__ */ jsx(Skeleton, { height: 200, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 150, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 150, radius: "md" })
    ] }) });
  }
  if (!account) {
    return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsx(Text, { c: "dimmed", children: i18n._(
      /*i18n*/
      {
        id: "EHNORh"
      }
    ) }) });
  }
  const tierOptions = messagingTiers.map((tier) => ({
    value: String(tier.id),
    label: tier.name
  }));
  const selectedTierDetails = getSelectedTierDetails();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsx(Group, { children: /* @__PURE__ */ jsx(Button, { variant: "subtle", leftSection: /* @__PURE__ */ jsx(IconArrowLeft, { size: 16 }), onClick: () => navigate("/admin/accounts"), children: i18n._(
        /*i18n*/
        {
          id: "TeSaQO"
        }
      ) }) }),
      /* @__PURE__ */ jsx(Title, { order: 1, children: account.name }),
      /* @__PURE__ */ jsx(Card, { className: classes.accountCard, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Group, { justify: "space-between", children: /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: i18n._(
          /*i18n*/
          {
            id: "vOuxvL"
          }
        ) }) }),
        /* @__PURE__ */ jsxs("div", { className: classes.infoGrid, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.infoItem, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "O3oNi5"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { size: "sm", children: account.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.infoItem, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "d+F6q9"
              }
            ) }),
            /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsx(IconCalendar, { size: 14 }),
              /* @__PURE__ */ jsx(Text, { size: "sm", children: formatDate(account.created_at) })
            ] })
          ] }),
          account.timezone && /* @__PURE__ */ jsxs("div", { className: classes.infoItem, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "40Gx0U"
              }
            ) }),
            /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsx(IconWorld, { size: 14 }),
              /* @__PURE__ */ jsx(Text, { size: "sm", children: account.timezone })
            ] })
          ] }),
          account.currency_code && /* @__PURE__ */ jsxs("div", { className: classes.infoItem, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "Q2lUR2"
              }
            ) }),
            /* @__PURE__ */ jsx(Badge, { variant: "light", children: account.currency_code })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.statsGrid, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.statItem, children: [
            /* @__PURE__ */ jsx(IconBuildingBank, { size: 24 }),
            /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
                /*i18n*/
                {
                  id: "tst44n"
                }
              ) }),
              /* @__PURE__ */ jsx(Text, { size: "xl", fw: 600, children: account.events_count })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.statItem, children: [
            /* @__PURE__ */ jsx(IconUsers, { size: 24 }),
            /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
                /*i18n*/
                {
                  id: "Sxm8rQ"
                }
              ) }),
              /* @__PURE__ */ jsx(Text, { size: "xl", fw: 600, children: account.users_count })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: classes.accountCard, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: i18n._(
            /*i18n*/
            {
              id: "yHrk88"
            }
          ) }),
          /* @__PURE__ */ jsx(Badge, { color: account.is_manually_verified ? "green" : "orange", children: account.is_manually_verified ? i18n._(
            /*i18n*/
            {
              id: "QDEWii"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "VBTGXl"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Switch, { label: i18n._(
          /*i18n*/
          {
            id: "gEke4J"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "5FMD2G"
          }
        ), checked: account.is_manually_verified, onChange: (event) => handleVerificationChange(event.currentTarget.checked), disabled: updateVerificationMutation.isPending, "data-testid": "account-verification-switch" })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: classes.accountCard, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: i18n._(
            /*i18n*/
            {
              id: "mFdA+i"
            }
          ) }),
          account.messaging_tier && /* @__PURE__ */ jsx(Badge, { color: getTierBadgeColor(account.messaging_tier.name), children: account.messaging_tier.name })
        ] }),
        /* @__PURE__ */ jsx(Select, { label: i18n._(
          /*i18n*/
          {
            id: "xdiER7"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "x8XMsJ"
          }
        ), data: tierOptions, value: ((_a = account.messaging_tier) == null ? void 0 : _a.id) ? String(account.messaging_tier.id) : null, onChange: handleMessagingTierChange, placeholder: i18n._(
          /*i18n*/
          {
            id: "zPRPMf"
          }
        ), disabled: updateTierMutation.isPending }),
        selectedTierDetails && /* @__PURE__ */ jsxs("div", { className: classes.infoGrid, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.infoItem, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "2L3vle"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: selectedTierDetails.max_messages_per_24h })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.infoItem, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "Qp4HWD"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: selectedTierDetails.max_recipients_per_message })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.infoItem, children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
              /*i18n*/
              {
                id: "nvOPBA"
              }
            ) }),
            /* @__PURE__ */ jsx(Badge, { color: selectedTierDetails.links_allowed ? "green" : "gray", children: selectedTierDetails.links_allowed ? i18n._(
              /*i18n*/
              {
                id: "l75CjT"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "1UzENP"
              }
            ) })
          ] })
        ] })
      ] }) }),
      organizers.length > 0 && /* @__PURE__ */ jsx(Card, { className: classes.accountCard, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: i18n._(
          /*i18n*/
          {
            id: "q4zH+l"
          }
        ) }),
        /* @__PURE__ */ jsx(Stack, { gap: "xs", children: organizers.map((organizer) => {
          var _a2;
          const fees = (_a2 = organizer.configuration) == null ? void 0 : _a2.application_fees;
          const vat = organizer.vat_setting;
          return /* @__PURE__ */ jsxs(Group, { justify: "space-between", wrap: "nowrap", className: classes.userItem, children: [
            /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: organizer.name }),
              /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
                organizer.configuration && /* @__PURE__ */ jsxs(Badge, { size: "xs", variant: "light", children: [
                  organizer.configuration.name,
                  fees ? ` · ${fees.percentage}% + ${fees.fixed} ${fees.currency}` : ""
                ] }),
                (vat == null ? void 0 : vat.vat_registered) ? /* @__PURE__ */ jsxs(Badge, { size: "xs", color: "green", variant: "light", children: [
                  i18n._(
                    /*i18n*/
                    {
                      id: "p6QQLa",
                      values: {
                        0: vat.vat_number ?? "—"
                      }
                    }
                  ),
                  vat.vat_validated ? ` ✓` : ""
                ] }) : /* @__PURE__ */ jsx(Badge, { size: "xs", color: "gray", variant: "light", children: i18n._(
                  /*i18n*/
                  {
                    id: "5q87Y9"
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "subtle", size: "xs", onClick: () => setManagedOrganizer(organizer), children: i18n._(
              /*i18n*/
              {
                id: "wckWOP"
              }
            ) })
          ] }, String(organizer.id));
        }) })
      ] }) }),
      account.users && account.users.length > 0 && /* @__PURE__ */ jsx(Card, { className: classes.accountCard, children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: i18n._(
          /*i18n*/
          {
            id: "Sxm8rQ"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: classes.usersList, children: account.users.map((user) => /* @__PURE__ */ jsxs("div", { className: classes.userItem, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Text, { size: "sm", fw: 500, children: [
              user.first_name,
              " ",
              user.last_name
            ] }),
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: user.email })
          ] }),
          /* @__PURE__ */ jsx(Badge, { size: "sm", children: user.role })
        ] }, user.id)) })
      ] }) })
    ] }) }),
    managedOrganizer && /* @__PURE__ */ jsx(OrganizerAdminModal, { organizer: managedOrganizer, onClose: () => setManagedOrganizer(null) })
  ] });
};
export {
  AccountDetail as default
};

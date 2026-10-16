import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Text, Button, Stack, Badge, Container, Title, TextInput, Skeleton, Pagination } from "@mantine/core";
import { IconEye, IconBuildingBank, IconUsers, IconMessage, IconCalendar, IconWorld, IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { u as useGetAllAccounts } from "./useGetAllAccounts-CXYiP3Zg.js";
import { u as useStartImpersonation } from "./useStartImpersonation-CU8BGgZu.js";
import { useNavigate } from "react-router";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import "@tanstack/react-query";
import "./admin.client-DIpS7H64.js";
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
const cardsContainer = "_cardsContainer_139op_1";
const accountCard = "_accountCard_139op_7";
const cardHeader = "_cardHeader_139op_18";
const accountInfo = "_accountInfo_139op_25";
const accountName = "_accountName_139op_31";
const accountEmail = "_accountEmail_139op_38";
const cardBody = "_cardBody_139op_43";
const statsGrid = "_statsGrid_139op_49";
const statItem = "_statItem_139op_55";
const cardFooter = "_cardFooter_139op_62";
const footerInfo = "_footerInfo_139op_67";
const footerItem = "_footerItem_139op_73";
const emptyState = "_emptyState_139op_81";
const usersSection = "_usersSection_139op_86";
const usersList = "_usersList_139op_91";
const userItem = "_userItem_139op_97";
const userDetails = "_userDetails_139op_110";
const classes = {
  cardsContainer,
  accountCard,
  cardHeader,
  accountInfo,
  accountName,
  accountEmail,
  cardBody,
  statsGrid,
  statItem,
  cardFooter,
  footerInfo,
  footerItem,
  emptyState,
  usersSection,
  usersList,
  userItem,
  userDetails
};
const AdminAccountsTable = ({
  accounts,
  onImpersonate,
  isLoading
}) => {
  const navigate = useNavigate();
  if (!accounts || accounts.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes.emptyState, children: /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: i18n._(
      /*i18n*/
      {
        id: "+jIeoh"
      }
    ) }) });
  }
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "blue";
      case "ORGANIZER":
        return "green";
      case "SUPERADMIN":
        return "red";
      default:
        return "gray";
    }
  };
  const canImpersonate = (role) => {
    return role !== "SUPERADMIN";
  };
  const getTierBadgeColor = (tierName) => {
    if (!tierName) return "gray";
    const name = tierName.toLowerCase();
    if (name.includes("premium")) return "green";
    if (name.includes("trusted")) return "blue";
    return "gray";
  };
  return /* @__PURE__ */ jsx("div", { className: classes.cardsContainer, children: accounts.map((account) => {
    var _a, _b;
    return /* @__PURE__ */ jsxs("div", { className: classes.accountCard, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.cardHeader, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.accountInfo, children: [
          /* @__PURE__ */ jsx("h3", { className: classes.accountName, children: account.name }),
          /* @__PURE__ */ jsx("span", { className: classes.accountEmail, children: account.email })
        ] }),
        /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", leftSection: /* @__PURE__ */ jsx(IconEye, { size: 14 }), onClick: () => navigate(`/admin/accounts/${account.id}`), children: i18n._(
          /*i18n*/
          {
            id: "SZw9tS"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.cardBody, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.statsGrid, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.statItem, children: [
            /* @__PURE__ */ jsx(IconBuildingBank, { size: 18 }),
            /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
                /*i18n*/
                {
                  id: "tst44n"
                }
              ) }),
              /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: account.events_count })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.statItem, children: [
            /* @__PURE__ */ jsx(IconUsers, { size: 18 }),
            /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
                /*i18n*/
                {
                  id: "Sxm8rQ"
                }
              ) }),
              /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, children: account.users_count })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.statItem, children: [
            /* @__PURE__ */ jsx(IconMessage, { size: 18 }),
            /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
                /*i18n*/
                {
                  id: "mFdA+i"
                }
              ) }),
              /* @__PURE__ */ jsx(Badge, { size: "sm", color: getTierBadgeColor((_a = account.messaging_tier) == null ? void 0 : _a.name), children: ((_b = account.messaging_tier) == null ? void 0 : _b.name) || i18n._(
                /*i18n*/
                {
                  id: "X13xGn"
                }
              ) })
            ] })
          ] })
        ] }),
        account.users && account.users.length > 0 && /* @__PURE__ */ jsxs("div", { className: classes.usersSection, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 600, mb: "xs", children: i18n._(
            /*i18n*/
            {
              id: "Sxm8rQ"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: classes.usersList, children: account.users.map((user) => /* @__PURE__ */ jsxs("div", { className: classes.userItem, children: [
            /* @__PURE__ */ jsxs("div", { className: classes.userDetails, children: [
              /* @__PURE__ */ jsxs(Text, { size: "sm", fw: 500, children: [
                user.first_name,
                " ",
                user.last_name
              ] }),
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: user.email }),
              /* @__PURE__ */ jsx(Badge, { size: "xs", color: getRoleBadgeColor(user.role), mt: 4, children: user.role })
            ] }),
            canImpersonate(user.role) && /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", "data-testid": "admin-impersonate-menu-item", onClick: () => onImpersonate(user.id, account.id), disabled: isLoading, children: i18n._(
              /*i18n*/
              {
                id: "tSVr6t"
              }
            ) })
          ] }, user.id)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes.cardFooter, children: /* @__PURE__ */ jsxs("div", { className: classes.footerInfo, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.footerItem, children: [
            /* @__PURE__ */ jsx(IconCalendar, { size: 14 }),
            /* @__PURE__ */ jsx("span", { children: formatDate(account.created_at) })
          ] }),
          account.timezone && /* @__PURE__ */ jsxs("div", { className: classes.footerItem, children: [
            /* @__PURE__ */ jsx(IconWorld, { size: 14 }),
            /* @__PURE__ */ jsx("span", { children: account.timezone })
          ] }),
          account.currency_code && /* @__PURE__ */ jsx("div", { className: classes.footerItem, children: /* @__PURE__ */ jsx(Badge, { size: "sm", variant: "light", children: account.currency_code }) })
        ] }) })
      ] })
    ] }, account.id);
  }) });
};
const Accounts = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const {
    data: accountsData,
    isLoading
  } = useGetAllAccounts({
    page,
    per_page: 20,
    search: debouncedSearch
  });
  const startImpersonationMutation = useStartImpersonation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const handleImpersonate = (userId, accountId) => {
    startImpersonationMutation.mutate({
      userId,
      accountId
    }, {
      onSuccess: (response) => {
        showSuccess(response.message || i18n._(
          /*i18n*/
          {
            id: "5LAZwq"
          }
        ));
        if (response.redirect_url) {
          window.location.href = response.redirect_url;
        } else {
          navigate("/manage/events");
        }
      },
      onError: (error) => {
        var _a, _b;
        showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "t/KVOk"
          }
        ));
      }
    });
  };
  return /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
    /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
      /*i18n*/
      {
        id: "bPwFdf"
      }
    ) }),
    /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
      /*i18n*/
      {
        id: "VY+Bdn"
      }
    ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value) }),
    isLoading ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" })
    ] }) : /* @__PURE__ */ jsx(AdminAccountsTable, { accounts: (accountsData == null ? void 0 : accountsData.data) || [], onImpersonate: handleImpersonate, isLoading: startImpersonationMutation.isPending }),
    (accountsData == null ? void 0 : accountsData.meta) && accountsData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: accountsData.meta.last_page, value: page, onChange: setPage, mt: "md" })
  ] }) });
};
export {
  Accounts as default
};

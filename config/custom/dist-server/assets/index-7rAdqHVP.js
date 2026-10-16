import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Text, Button, Menu, Stack, Badge, Container, Title, TextInput, Skeleton, Pagination } from "@mantine/core";
import { IconChevronDown, IconCalendar, IconWorld, IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { u as useGetAllUsers } from "./useGetAllUsers-BdGfilXM.js";
import { u as useStartImpersonation } from "./useStartImpersonation-CU8BGgZu.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useNavigate } from "react-router";
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
const cardsContainer = "_cardsContainer_1lx0j_1";
const userCard = "_userCard_1lx0j_13";
const cardHeader = "_cardHeader_1lx0j_25";
const cardActions = "_cardActions_1lx0j_40";
const impersonateBtn = "_impersonateBtn_1lx0j_50";
const cardBody = "_cardBody_1lx0j_54";
const section = "_section_1lx0j_61";
const sectionLabel = "_sectionLabel_1lx0j_67";
const cardFooter = "_cardFooter_1lx0j_75";
const footerInfo = "_footerInfo_1lx0j_80";
const footerItem = "_footerItem_1lx0j_86";
const userInfo = "_userInfo_1lx0j_97";
const userName = "_userName_1lx0j_105";
const userEmail = "_userEmail_1lx0j_114";
const accountsList = "_accountsList_1lx0j_120";
const accountItem = "_accountItem_1lx0j_126";
const accountName = "_accountName_1lx0j_142";
const emptyState = "_emptyState_1lx0j_153";
const classes = {
  cardsContainer,
  userCard,
  cardHeader,
  cardActions,
  impersonateBtn,
  cardBody,
  section,
  sectionLabel,
  cardFooter,
  footerInfo,
  footerItem,
  userInfo,
  userName,
  userEmail,
  accountsList,
  accountItem,
  accountName,
  emptyState
};
const AdminUsersTable = ({
  users,
  onImpersonate,
  isLoading
}) => {
  if (!users || users.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes.emptyState, children: /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: i18n._(
      /*i18n*/
      {
        id: "qpC74J"
      }
    ) }) });
  }
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
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const handleImpersonate = (user) => {
    if (!user.accounts || user.accounts.length === 0) {
      return;
    }
    if (user.accounts.length === 1) {
      onImpersonate(user.id, user.accounts[0].id);
    }
  };
  const isSuperAdmin = (user) => {
    var _a;
    return (_a = user.accounts) == null ? void 0 : _a.some((account) => account.role === "SUPERADMIN");
  };
  const canImpersonateAccount = (role) => {
    return role !== "SUPERADMIN";
  };
  return /* @__PURE__ */ jsx("div", { className: classes.cardsContainer, children: users.map((user) => {
    var _a;
    const userIsSuperAdmin = isSuperAdmin(user);
    const impersonatableAccounts = ((_a = user.accounts) == null ? void 0 : _a.filter((account) => canImpersonateAccount(account.role))) || [];
    return /* @__PURE__ */ jsxs("div", { className: classes.userCard, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.cardHeader, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.userInfo, children: [
          /* @__PURE__ */ jsx("h3", { className: classes.userName, children: user.full_name }),
          /* @__PURE__ */ jsx("span", { className: classes.userEmail, children: user.email })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes.cardActions, children: !userIsSuperAdmin && impersonatableAccounts.length > 0 && /* @__PURE__ */ jsx(Fragment, { children: impersonatableAccounts.length === 1 ? /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", onClick: () => handleImpersonate(user), disabled: isLoading, className: classes.impersonateBtn, children: i18n._(
          /*i18n*/
          {
            id: "tSVr6t"
          }
        ) }) : /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
          /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", rightSection: /* @__PURE__ */ jsx(IconChevronDown, { size: 14 }), disabled: isLoading, className: classes.impersonateBtn, children: i18n._(
            /*i18n*/
            {
              id: "tSVr6t"
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
            /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
              /*i18n*/
              {
                id: "BFRSTT"
              }
            ) }),
            impersonatableAccounts.map((account) => /* @__PURE__ */ jsx(Menu.Item, { onClick: () => onImpersonate(user.id, account.id), children: /* @__PURE__ */ jsxs(Stack, { gap: 4, children: [
              /* @__PURE__ */ jsx(Text, { size: "sm", children: account.name }),
              /* @__PURE__ */ jsx(Badge, { size: "xs", color: getRoleBadgeColor(account.role), children: account.role })
            ] }) }, account.id))
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes.cardBody, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.section, children: [
          /* @__PURE__ */ jsx("span", { className: classes.sectionLabel, children: i18n._(
            /*i18n*/
            {
              id: "bPwFdf"
            }
          ) }),
          user.accounts && user.accounts.length > 0 ? /* @__PURE__ */ jsx("div", { className: classes.accountsList, children: user.accounts.map((account) => /* @__PURE__ */ jsxs("div", { className: classes.accountItem, children: [
            /* @__PURE__ */ jsx("span", { className: classes.accountName, children: account.name }),
            /* @__PURE__ */ jsx(Badge, { size: "sm", color: getRoleBadgeColor(account.role), children: account.role })
          ] }, account.id)) }) : /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
            /*i18n*/
            {
              id: "VHfLAW"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes.cardFooter, children: /* @__PURE__ */ jsxs("div", { className: classes.footerInfo, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.footerItem, children: [
            /* @__PURE__ */ jsx(IconCalendar, { size: 14 }),
            /* @__PURE__ */ jsx("span", { children: formatDate(user.created_at) })
          ] }),
          user.timezone && /* @__PURE__ */ jsxs("div", { className: classes.footerItem, children: [
            /* @__PURE__ */ jsx(IconWorld, { size: 14 }),
            /* @__PURE__ */ jsx("span", { children: user.timezone })
          ] })
        ] }) })
      ] })
    ] }, user.id);
  }) });
};
const Users = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const {
    data: usersData,
    isLoading
  } = useGetAllUsers({
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
        id: "Sxm8rQ"
      }
    ) }),
    /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
      /*i18n*/
      {
        id: "GHdjuo"
      }
    ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value) }),
    isLoading ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" }),
      /* @__PURE__ */ jsx(Skeleton, { height: 180, radius: "md" })
    ] }) : /* @__PURE__ */ jsx(AdminUsersTable, { users: (usersData == null ? void 0 : usersData.data) || [], onImpersonate: handleImpersonate, isLoading: startImpersonationMutation.isPending }),
    (usersData == null ? void 0 : usersData.meta) && usersData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: usersData.meta.last_page, value: page, onChange: setPage, mt: "md" })
  ] }) });
};
export {
  Users as default
};

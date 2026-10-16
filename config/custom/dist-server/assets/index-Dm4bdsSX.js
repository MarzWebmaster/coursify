import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { MultiSelect, Container, Stack, Group, Title, Button, TextInput, Skeleton, Text, Table, Badge, Tooltip, Menu, ActionIcon, Pagination, SegmentedControl, Select } from "@mantine/core";
import { IconPlus, IconSearch, IconSpeakerphone, IconDotsVertical, IconEdit, IconCopy, IconTrash, IconEye } from "@tabler/icons-react";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { a as announcementClient, A as AnnouncementBanner, b as AnnouncementModal } from "./AnnouncementModal-BnhI_3XO.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { u as useGetAllAccounts } from "./useGetAllAccounts-CXYiP3Zg.js";
import { u as useGetAllUsers } from "./useGetAllUsers-BdGfilXM.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
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
import "./admin.client-DIpS7H64.js";
const GET_ADMIN_ANNOUNCEMENTS_QUERY_KEY = ["admin", "announcements"];
const useGetAdminAnnouncements = (params = {}) => {
  return useQuery({
    queryKey: [...GET_ADMIN_ANNOUNCEMENTS_QUERY_KEY, params],
    queryFn: () => announcementClient.all(params)
  });
};
const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => announcementClient.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_ANNOUNCEMENTS_QUERY_KEY
      });
    }
  });
};
const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      announcementId,
      data
    }) => announcementClient.update(announcementId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_ANNOUNCEMENTS_QUERY_KEY
      });
    }
  });
};
const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (announcementId) => announcementClient.delete(announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ADMIN_ANNOUNCEMENTS_QUERY_KEY
      });
    }
  });
};
const PickerBase = ({
  label,
  searchResults,
  isFetching,
  search,
  onSearchChange,
  value,
  onChange,
  initialLabels,
  error
}) => {
  const [knownLabels, setKnownLabels] = useState(initialLabels);
  useEffect(() => {
    if (!searchResults.length) {
      return;
    }
    setKnownLabels((labels) => ({
      ...labels,
      ...Object.fromEntries(searchResults.map((result) => [result.id, result.label]))
    }));
  }, [searchResults]);
  const options = useMemo(() => {
    const ids = /* @__PURE__ */ new Set([...searchResults.map((result) => result.id), ...value]);
    return [...ids].map((id) => ({
      value: id.toString(),
      label: knownLabels[id] || `#${id}`
    }));
  }, [searchResults, value, knownLabels]);
  return /* @__PURE__ */ jsx(MultiSelect, { label, description: i18n._(
    /*i18n*/
    {
      id: "3yKuDu"
    }
  ), placeholder: i18n._(
    /*i18n*/
    {
      id: "nSlb72"
    }
  ), data: options, value: value.map((id) => id.toString()), onChange: (ids) => onChange(ids.map(Number)), searchable: true, searchValue: search, onSearchChange, filter: ({
    options: options2
  }) => options2, nothingFoundMessage: isFetching ? i18n._(
    /*i18n*/
    {
      id: "Du+zn+"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "AxPAXW"
    }
  ), error, "data-testid": "announcement-target-picker" });
};
const useDebouncedSearch = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);
  return {
    search,
    setSearch,
    debouncedSearch
  };
};
const AccountPicker = (props) => {
  const {
    search,
    setSearch,
    debouncedSearch
  } = useDebouncedSearch();
  const {
    data,
    isFetching
  } = useGetAllAccounts({
    search: debouncedSearch,
    per_page: 20
  });
  const searchResults = useMemo(() => ((data == null ? void 0 : data.data) || []).map((account) => ({
    id: Number(account.id),
    label: `${account.name} (${account.email})`
  })), [data]);
  return /* @__PURE__ */ jsx(PickerBase, { ...props, label: i18n._(
    /*i18n*/
    {
      id: "X9v2GM"
    }
  ), searchResults, isFetching, search, onSearchChange: setSearch });
};
const UserPicker = (props) => {
  const {
    search,
    setSearch,
    debouncedSearch
  } = useDebouncedSearch();
  const {
    data,
    isFetching
  } = useGetAllUsers({
    search: debouncedSearch,
    per_page: 20
  });
  const searchResults = useMemo(() => ((data == null ? void 0 : data.data) || []).map((user) => ({
    id: Number(user.id),
    label: `${user.full_name || user.email} (${user.email})`
  })), [data]);
  return /* @__PURE__ */ jsx(PickerBase, { ...props, label: i18n._(
    /*i18n*/
    {
      id: "TmyDCw"
    }
  ), searchResults, isFetching, search, onSearchChange: setSearch });
};
const AnnouncementTargetPicker = ({
  targetType,
  ...props
}) => {
  return targetType === "ACCOUNTS" ? /* @__PURE__ */ jsx(AccountPicker, { ...props }, "accounts") : /* @__PURE__ */ jsx(UserPicker, { ...props }, "users");
};
const announcementsTable = "_announcementsTable_1apdt_1";
const emojiPreview = "_emojiPreview_1apdt_13";
const bannerPreview = "_bannerPreview_1apdt_21";
const classes = {
  announcementsTable,
  emojiPreview,
  bannerPreview
};
const targetSummary = (announcement) => {
  const names = Object.values(announcement.target_names || {});
  if (announcement.target_type === "ACCOUNTS") {
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "pi/Iog",
          values: {
            0: names.length
          }
        }
      ),
      tooltip: names.join(", ")
    };
  }
  if (announcement.target_type === "USERS") {
    return {
      label: i18n._(
        /*i18n*/
        {
          id: "b0XTc/",
          values: {
            0: names.length
          }
        }
      ),
      tooltip: names.join(", ")
    };
  }
  return {
    label: i18n._(
      /*i18n*/
      {
        id: "UBpkWM"
      }
    ),
    tooltip: void 0
  };
};
const Announcements = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [duplicatingAnnouncement, setDuplicatingAnnouncement] = useState(null);
  const {
    data: announcementsData,
    isLoading
  } = useGetAdminAnnouncements({
    page,
    per_page: 20,
    search: debouncedSearch
  });
  const deleteMutation = useDeleteAnnouncement();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const announcements = (announcementsData == null ? void 0 : announcementsData.data) || [];
  const handleDelete = (announcement) => {
    if (window.confirm(i18n._(
      /*i18n*/
      {
        id: "U49Xd6"
      }
    ))) {
      deleteMutation.mutate(announcement.id, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "p/XJYI"
          }
        )),
        onError: () => showError(i18n._(
          /*i18n*/
          {
            id: "+RTkEY"
          }
        ))
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Container, { size: "xl", p: "xl", children: /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsx(Title, { order: 1, children: i18n._(
          /*i18n*/
          {
            id: "Dzr23X"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 16 }), onClick: () => setShowCreateModal(true), "data-testid": "announcement-create-button", children: i18n._(
          /*i18n*/
          {
            id: "Q4VlI/"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
        /*i18n*/
        {
          id: "gTUY97"
        }
      ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), value: search, onChange: (e) => setSearch(e.target.value) }),
      isLoading ? /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "md" }),
        /* @__PURE__ */ jsx(Skeleton, { height: 120, radius: "md" })
      ] }) : announcements.length === 0 ? /* @__PURE__ */ jsx("div", { className: tableStyles.emptyState, children: /* @__PURE__ */ jsxs(Stack, { align: "center", gap: "sm", children: [
        /* @__PURE__ */ jsx(IconSpeakerphone, { size: 40, color: "var(--hi-color-gray-dark)" }),
        /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "hUHrkV"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "GT/OIA"
          }
        ) })
      ] }) }) : /* @__PURE__ */ jsx("div", { className: tableStyles.tableWrapper, children: /* @__PURE__ */ jsx("div", { className: tableStyles.tableScroll, children: /* @__PURE__ */ jsxs(Table, { className: `${tableStyles.table} ${classes.announcementsTable}`, highlightOnHover: true, children: [
        /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "MHrjPM"
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
              id: "uAQUqI"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "cHfbVT"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "6lGaum"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "J6hrEy"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
            /*i18n*/
            {
              id: "+b7T3G"
            }
          ) }),
          /* @__PURE__ */ jsx(Table.Th, {})
        ] }) }),
        /* @__PURE__ */ jsx(Table.Tbody, { children: announcements.map((announcement) => {
          const target = targetSummary(announcement);
          const isDraft = announcement.status === "DRAFT";
          return /* @__PURE__ */ jsxs(Table.Tr, { children: [
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { fw: 500, size: "sm", children: announcement.title }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: announcement.display_type === "MODAL" ? "grape" : "blue", size: "sm", children: announcement.display_type === "MODAL" ? i18n._(
              /*i18n*/
              {
                id: "FfPWR0"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "KSSL9f"
              }
            ) }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: isDraft ? "yellow" : "green", size: "sm", children: isDraft ? i18n._(
              /*i18n*/
              {
                id: "eneWvv"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "u3wRF+"
              }
            ) }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Tooltip, { label: target.tooltip, disabled: !target.tooltip, multiline: true, maw: 320, children: /* @__PURE__ */ jsx(Badge, { variant: "outline", color: "gray", size: "sm", children: target.label }) }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: isDraft ? "—" : announcement.seen_count }),
            /* @__PURE__ */ jsx(Table.Td, { children: isDraft ? "—" : announcement.dismissed_count }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: new Date(announcement.updated_at).toLocaleDateString() }) }),
            /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs(Menu, { position: "bottom-end", withinPortal: true, children: [
              /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", "data-testid": "announcement-row-menu", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 16 }) }) }),
              /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
                /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconEdit, { size: 14 }), onClick: () => setEditingAnnouncement(announcement), "data-testid": "announcement-edit-menu-item", children: i18n._(
                  /*i18n*/
                  {
                    id: "ePK91l"
                  }
                ) }),
                /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconCopy, { size: 14 }), onClick: () => setDuplicatingAnnouncement(announcement), "data-testid": "announcement-duplicate-menu-item", children: i18n._(
                  /*i18n*/
                  {
                    id: "euc6Ns"
                  }
                ) }),
                /* @__PURE__ */ jsx(Menu.Item, { color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), onClick: () => handleDelete(announcement), "data-testid": "announcement-delete-menu-item", children: i18n._(
                  /*i18n*/
                  {
                    id: "cnGeoo"
                  }
                ) })
              ] })
            ] }) })
          ] }, announcement.id);
        }) })
      ] }) }) }),
      (announcementsData == null ? void 0 : announcementsData.meta) && announcementsData.meta.last_page > 1 && /* @__PURE__ */ jsx(Pagination, { total: announcementsData.meta.last_page, value: page, onChange: setPage })
    ] }) }),
    showCreateModal && /* @__PURE__ */ jsx(AnnouncementFormModal, { onClose: () => setShowCreateModal(false) }),
    editingAnnouncement && /* @__PURE__ */ jsx(AnnouncementFormModal, { announcement: editingAnnouncement, onClose: () => setEditingAnnouncement(null) }),
    duplicatingAnnouncement && /* @__PURE__ */ jsx(AnnouncementFormModal, { announcement: duplicatingAnnouncement, duplicate: true, onClose: () => setDuplicatingAnnouncement(null) })
  ] });
};
const AnnouncementFormModal = ({
  announcement,
  duplicate,
  onClose
}) => {
  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();
  const formErrorHandler = useFormErrorResponseHandler();
  const [previewing, setPreviewing] = useState(false);
  const isEditing = !!announcement && !duplicate;
  const form = useForm({
    initialValues: {
      title: (duplicate ? i18n._(
        /*i18n*/
        {
          id: "wqtZLy",
          values: {
            0: announcement == null ? void 0 : announcement.title
          }
        }
      ) : announcement == null ? void 0 : announcement.title) || "",
      content: (announcement == null ? void 0 : announcement.content) || "",
      display_type: (announcement == null ? void 0 : announcement.display_type) || "BANNER",
      emoji: (announcement == null ? void 0 : announcement.emoji) || "🎉",
      target_type: (announcement == null ? void 0 : announcement.target_type) || "ALL",
      target_account_ids: (announcement == null ? void 0 : announcement.target_account_ids) || [],
      target_user_ids: (announcement == null ? void 0 : announcement.target_user_ids) || [],
      cta_label: (announcement == null ? void 0 : announcement.cta_label) || "",
      cta_url: (announcement == null ? void 0 : announcement.cta_url) || "",
      status: (duplicate ? "DRAFT" : announcement == null ? void 0 : announcement.status) || "DRAFT"
    },
    validate: {
      title: (value) => value.trim() ? null : i18n._(
        /*i18n*/
        {
          id: "9udQT9"
        }
      ),
      content: (value, values) => {
        if (!value.trim()) return i18n._(
          /*i18n*/
          {
            id: "13CIgI"
          }
        );
        if (values.display_type === "BANNER" && value.length > 200) {
          return i18n._(
            /*i18n*/
            {
              id: "zdYsg1"
            }
          );
        }
        return null;
      },
      emoji: (value, values) => values.display_type === "MODAL" && !value.trim() ? i18n._(
        /*i18n*/
        {
          id: "69YV6l"
        }
      ) : null,
      target_account_ids: (value, values) => values.target_type === "ACCOUNTS" && value.length === 0 ? i18n._(
        /*i18n*/
        {
          id: "4oT6dP"
        }
      ) : null,
      target_user_ids: (value, values) => values.target_type === "USERS" && value.length === 0 ? i18n._(
        /*i18n*/
        {
          id: "neCGH1"
        }
      ) : null,
      cta_url: (value, values) => {
        if (values.cta_label && !value) return i18n._(
          /*i18n*/
          {
            id: "3BKFn6"
          }
        );
        if (value && !/^https?:\/\//.test(value)) return i18n._(
          /*i18n*/
          {
            id: "3VnYUR"
          }
        );
        return null;
      },
      cta_label: (value, values) => values.cta_url && !value ? i18n._(
        /*i18n*/
        {
          id: "/d9gcz"
        }
      ) : null
    }
  });
  const toPayload = (values) => ({
    title: values.title,
    content: values.content,
    status: values.status,
    display_type: values.display_type,
    emoji: values.display_type === "MODAL" ? values.emoji : null,
    target_type: values.target_type,
    target_account_ids: values.target_type === "ACCOUNTS" ? values.target_account_ids : void 0,
    target_user_ids: values.target_type === "USERS" ? values.target_user_ids : void 0,
    cta_label: values.cta_label || null,
    cta_url: values.cta_url || null
  });
  const handleSubmit = (values) => {
    const payload = toPayload(values);
    const onSuccess = () => {
      showSuccess(isEditing ? i18n._(
        /*i18n*/
        {
          id: "qLqgre"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "Th00L9"
        }
      ));
      onClose();
    };
    const onError = (error) => formErrorHandler(form, error);
    if (isEditing) {
      updateMutation.mutate({
        announcementId: announcement.id,
        data: payload
      }, {
        onSuccess,
        onError
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess,
        onError
      });
    }
  };
  const previewAnnouncement = {
    id: 0,
    title: form.values.title || i18n._(
      /*i18n*/
      {
        id: "08iV57"
      }
    ),
    content: form.values.content || i18n._(
      /*i18n*/
      {
        id: "l3LBtZ"
      }
    ),
    display_type: form.values.display_type,
    emoji: form.values.emoji,
    cta_label: form.values.cta_label || null,
    cta_url: form.values.cta_url || null
  };
  const isBanner = form.values.display_type === "BANNER";
  return /* @__PURE__ */ jsxs(Modal, { heading: isEditing ? i18n._(
    /*i18n*/
    {
      id: "ndNHsK"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "Q4VlI/"
    }
  ), onClose, opened: true, children: [
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, data: [{
        label: i18n._(
          /*i18n*/
          {
            id: "KSSL9f"
          }
        ),
        value: "BANNER"
      }, {
        label: i18n._(
          /*i18n*/
          {
            id: "FfPWR0"
          }
        ),
        value: "MODAL"
      }], ...form.getInputProps("display_type") }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "MHrjPM"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "XDHATF"
        }
      ), required: true, ...form.getInputProps("title") }),
      isBanner ? /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "4b3oEV"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "lwO5vw",
          values: {
            0: form.values.content.length
          }
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "tAtvUj"
        }
      ), maxLength: 200, required: true, ...form.getInputProps("content") }) : /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "4b3oEV"
        }
      ), value: form.values.content, onChange: (value) => form.setFieldValue("content", value), error: form.errors.content, editorType: "simple" }),
      !isBanner && /* @__PURE__ */ jsxs(Group, { align: "flex-end", gap: "md", children: [
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "tKlWWY"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "o1UbOh"
          }
        ), w: 140, ...form.getInputProps("emoji") }),
        /* @__PURE__ */ jsx("div", { className: classes.emojiPreview, children: /* @__PURE__ */ jsx(BouncingEmoji, { emoji: form.values.emoji || "🎉", size: 36 }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: 4, children: i18n._(
          /*i18n*/
          {
            id: "cHfbVT"
          }
        ) }),
        /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, data: [{
          label: i18n._(
            /*i18n*/
            {
              id: "UBpkWM"
            }
          ),
          value: "ALL"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "SzuJ5m"
            }
          ),
          value: "ACCOUNTS"
        }, {
          label: i18n._(
            /*i18n*/
            {
              id: "/h8G1o"
            }
          ),
          value: "USERS"
        }], ...form.getInputProps("target_type") })
      ] }),
      form.values.target_type === "ACCOUNTS" && /* @__PURE__ */ jsx(AnnouncementTargetPicker, { targetType: "ACCOUNTS", value: form.values.target_account_ids, onChange: (ids) => form.setFieldValue("target_account_ids", ids), initialLabels: (announcement == null ? void 0 : announcement.target_type) === "ACCOUNTS" ? announcement.target_names : {}, error: form.errors.target_account_ids }),
      form.values.target_type === "USERS" && /* @__PURE__ */ jsx(AnnouncementTargetPicker, { targetType: "USERS", value: form.values.target_user_ids, onChange: (ids) => form.setFieldValue("target_user_ids", ids), initialLabels: (announcement == null ? void 0 : announcement.target_type) === "USERS" ? announcement.target_names : {}, error: form.errors.target_user_ids }),
      /* @__PURE__ */ jsxs(Group, { grow: true, children: [
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "3W/QV7"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "iMqrOb"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "MCx4ov"
          }
        ), ...form.getInputProps("cta_label") }),
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "MOht10"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "xo06V3"
          }
        ), placeholder: "https://", ...form.getInputProps("cta_url") })
      ] }),
      /* @__PURE__ */ jsx(Select, { label: i18n._(
        /*i18n*/
        {
          id: "uAQUqI"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "z4JBd7"
        }
      ), data: [{
        label: i18n._(
          /*i18n*/
          {
            id: "eneWvv"
          }
        ),
        value: "DRAFT"
      }, {
        label: i18n._(
          /*i18n*/
          {
            id: "u3wRF+"
          }
        ),
        value: "PUBLISHED"
      }], allowDeselect: false, ...form.getInputProps("status") }),
      previewing && isBanner && /* @__PURE__ */ jsx("div", { className: classes.bannerPreview, children: /* @__PURE__ */ jsx(AnnouncementBanner, { announcement: previewAnnouncement, onDismiss: () => setPreviewing(false) }) }),
      /* @__PURE__ */ jsxs(Group, { grow: true, children: [
        /* @__PURE__ */ jsx(Button, { variant: "light", leftSection: /* @__PURE__ */ jsx(IconEye, { size: 16 }), onClick: () => setPreviewing((current) => !current), "data-testid": "announcement-preview-button", children: previewing && isBanner ? i18n._(
          /*i18n*/
          {
            id: "NQgWuh"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "rdUucN"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { loading: createMutation.isPending || updateMutation.isPending, type: "submit", "data-testid": "announcement-submit-button", children: isEditing ? i18n._(
          /*i18n*/
          {
            id: "IUwGEM"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "Q4VlI/"
          }
        ) })
      ] })
    ] }) }),
    previewing && !isBanner && /* @__PURE__ */ jsx(AnnouncementModal, { announcement: previewAnnouncement, onDismiss: () => setPreviewing(false), onClose: () => setPreviewing(false) })
  ] });
};
export {
  Announcements as default
};

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { useParams } from "react-router";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { useDisclosure, useClipboard } from "@mantine/hooks";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { TextInput, Button, Table as Table$1, Text, Badge, Group } from "@mantine/core";
import { IconCheck, IconX, IconRefresh, IconPlus, IconCopy, IconUsers, IconCurrencyDollar, IconPencil, IconShare, IconTrash, IconDownload } from "@tabler/icons-react";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { f as api, q as queryParamsHelper } from "../entry.server.js";
import { useEffect, useState } from "react";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { useForm } from "@mantine/form";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { S as ShowForMobile, a as ShowForDesktop } from "./ShowHideComponents-Bm9N1oAJ.js";
import { S as ShareModal } from "./index-BwSXzvSP.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { T as Table, a as TableHead } from "./index-XJu-jVVm.js";
import { A as ActionMenu } from "./index-ChciN8SC.js";
import { e as eventHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import { u as useGetEvent, G as GET_EVENT_QUERY_KEY } from "./useGetEvent-DyvalBPE.js";
import { d as downloadBinary } from "./download-DP3M_6Yt.js";
import { w as withLoadingNotification } from "./withLoadingNotification-6oRbhBHA.js";
import "classnames";
import "./index-jHMtuNEo.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./useWindowWidth-CvsXQp3R.js";
import "react-qr-code";
const affiliateClient = {
  create: async (eventId, affiliate) => {
    const response = await api.post(`events/${eventId}/affiliates`, affiliate);
    return response.data;
  },
  update: async (eventId, affiliateId, affiliate) => {
    const response = await api.put(`events/${eventId}/affiliates/${affiliateId}`, affiliate);
    return response.data;
  },
  all: async (eventId, pagination) => {
    const response = await api.get(`events/${eventId}/affiliates` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  findById: async (eventId, affiliateId) => {
    const response = await api.get(`events/${eventId}/affiliates/${affiliateId}`);
    return response.data;
  },
  delete: async (eventId, affiliateId) => {
    const response = await api.delete(`events/${eventId}/affiliates/${affiliateId}`);
    return response.data;
  },
  exportAffiliates: async (eventId) => {
    const response = await api.post(`events/${eventId}/affiliates/export`, {}, {
      responseType: "blob"
    });
    return response.data;
  }
};
const GET_AFFILIATES_QUERY_KEY = "getAffiliates";
const useGetAffiliates = (eventId, queryFilters = {}) => {
  return useQuery({
    queryKey: [GET_AFFILIATES_QUERY_KEY, eventId, queryFilters],
    queryFn: () => affiliateClient.all(eventId, queryFilters)
  });
};
const GET_AFFILIATE_QUERY_KEY = "getAffiliate";
const useGetAffiliate = (eventId, affiliateId) => {
  return useQuery({
    queryKey: [GET_AFFILIATE_QUERY_KEY, affiliateId],
    queryFn: () => affiliateClient.findById(eventId, affiliateId),
    enabled: !!affiliateId
  });
};
const useUpdateAffiliate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      affiliateId,
      affiliateData
    }) => affiliateClient.update(eventId, affiliateId, affiliateData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_AFFILIATE_QUERY_KEY, variables.affiliateId]
      });
      return queryClient.invalidateQueries({
        queryKey: [GET_AFFILIATES_QUERY_KEY]
      });
    }
  });
};
const AffiliateForm = ({
  form,
  isEditing = false,
  existingCode,
  onGenerateCode
}) => {
  const statusOptions = [{
    icon: /* @__PURE__ */ jsx(IconCheck, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "F6pfE9"
      }
    ),
    value: "ACTIVE",
    description: i18n._(
      /*i18n*/
      {
        id: "a41PKA"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconX, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "NoNwIX"
      }
    ),
    value: "INACTIVE",
    description: i18n._(
      /*i18n*/
      {
        id: "mJJh2s"
      }
    )
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !isEditing && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(TextInput, { label: i18n._(
      /*i18n*/
      {
        id: "EWPtMO"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "kWg31j"
      }
    ), required: true, description: i18n._(
      /*i18n*/
      {
        id: "XBNC3E"
      }
    ), ...form.getInputProps("code"), onChange: (event) => {
      form.setFieldValue("code", event.target.value.toUpperCase());
    }, rightSection: /* @__PURE__ */ jsxs(Button, { variant: "subtle", size: "xs", color: "gray", onClick: onGenerateCode, style: {
      fontWeight: 400
    }, title: i18n._(
      /*i18n*/
      {
        id: "exy8uo"
      }
    ), leftSection: /* @__PURE__ */ jsx(IconRefresh, { size: 16 }), children: [
      /* @__PURE__ */ jsx(ShowForMobile, { children: i18n._(
        /*i18n*/
        {
          id: "ziAjHi"
        }
      ) }),
      /* @__PURE__ */ jsx(ShowForDesktop, { children: i18n._(
        /*i18n*/
        {
          id: "exy8uo"
        }
      ) })
    ] }), rightSectionWidth: "auto" }) }),
    isEditing && existingCode && /* @__PURE__ */ jsx(TextInput, { label: i18n._(
      /*i18n*/
      {
        id: "EWPtMO"
      }
    ), value: existingCode, disabled: true, description: i18n._(
      /*i18n*/
      {
        id: "I+utEq"
      }
    ) }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "6YtxFj"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "rhsath"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "ARkzso"
        }
      ), required: true, ...form.getInputProps("name") }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "O3oNi5"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "Zkymb9"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "3bR1r4"
        }
      ), type: "email", ...form.getInputProps("email") })
    ] }),
    /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ), required: true, form, name: "status", optionList: statusOptions })
  ] });
};
const EditAffiliateModal = ({
  affiliateId,
  onClose
}) => {
  const {
    eventId
  } = useParams();
  const updateMutation = useUpdateAffiliate();
  const {
    data: affiliateData,
    isLoading
  } = useGetAffiliate(eventId, affiliateId);
  const affiliate = affiliateData == null ? void 0 : affiliateData.data;
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      status: "ACTIVE"
    },
    validate: {
      name: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "8/brI5"
        }
      ) : null,
      email: (value) => {
        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
          return i18n._(
            /*i18n*/
            {
              id: "5tT0+u"
            }
          );
        }
        return null;
      }
    }
  });
  useEffect(() => {
    if (affiliate) {
      form.setValues({
        name: affiliate.name,
        email: affiliate.email || "",
        status: affiliate.status
      });
    }
  }, [affiliate]);
  const handleSubmit = form.onSubmit((values) => {
    updateMutation.mutate({
      eventId,
      affiliateId,
      affiliateData: {
        ...values,
        email: values.email || void 0
      }
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "jabmnm"
          }
        ));
        onClose();
      },
      onError: (error) => {
        var _a, _b;
        if ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) {
          showError(error.response.data.message);
        } else {
          showError(i18n._(
            /*i18n*/
            {
              id: "i0QKrm"
            }
          ));
        }
      }
    });
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, title: i18n._(
      /*i18n*/
      {
        id: "v4+lcZ"
      }
    ), size: "md", children: /* @__PURE__ */ jsx(LoadingMask, {}) });
  }
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "v4+lcZ"
    }
  ), size: "md", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(AffiliateForm, { form, isEditing: true, existingCode: affiliate == null ? void 0 : affiliate.code }),
    /* @__PURE__ */ jsx(Button, { type: "submit", loading: updateMutation.isPending, fullWidth: true, children: i18n._(
      /*i18n*/
      {
        id: "Pp1sWX"
      }
    ) })
  ] }) });
};
const useDeleteAffiliate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      affiliateId
    }) => affiliateClient.delete(eventId, affiliateId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [GET_AFFILIATES_QUERY_KEY]
      });
    }
  });
};
const codeCell = "_codeCell_nu0pn_1";
const codeWrapper = "_codeWrapper_nu0pn_5";
const copyButton = "_copyButton_nu0pn_19";
const codeText = "_codeText_nu0pn_23";
const statsCell = "_statsCell_nu0pn_43";
const statItem = "_statItem_nu0pn_50";
const statIcon = "_statIcon_nu0pn_67";
const statValue = "_statValue_nu0pn_70";
const statLabel = "_statLabel_nu0pn_91";
const affiliateInfo = "_affiliateInfo_nu0pn_100";
const affiliateName = "_affiliateName_nu0pn_106";
const affiliateEmail = "_affiliateEmail_nu0pn_112";
const classes = {
  codeCell,
  codeWrapper,
  copyButton,
  codeText,
  statsCell,
  statItem,
  statIcon,
  statValue,
  statLabel,
  affiliateInfo,
  affiliateName,
  affiliateEmail
};
const AffiliateTable = ({
  affiliates,
  openCreateModal
}) => {
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [shareModalOpen, {
    open: openShareModal,
    close: closeShareModal
  }] = useDisclosure(false);
  const [selectedAffiliateId, setSelectedAffiliateId] = useState();
  const [selectedAffiliate, setSelectedAffiliate] = useState();
  const deleteMutation = useDeleteAffiliate();
  const {
    eventId
  } = useParams();
  const copy = useClipboard();
  const {
    data: event
  } = useGetEvent(eventId);
  const handleDeleteAffiliate = (affiliateId, eventId2) => {
    deleteMutation.mutate({
      affiliateId,
      eventId: eventId2
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "uCFbG2"
          }
        ));
      },
      onError: (error) => {
        showError(error.message);
      }
    });
  };
  const copyToClipboard = (text) => {
    copy.copy(text);
    showSuccess(i18n._(
      /*i18n*/
      {
        id: "FxVG/l"
      }
    ));
  };
  if (affiliates.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "zxnup4"
      }
    ), imageHref: "/blank-slate/affiliates.png", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "3cqmut"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: openCreateModal, children: i18n._(
        /*i18n*/
        {
          id: "xfKgwv"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
        /* @__PURE__ */ jsx(Table$1.Th, { miw: 200, children: i18n._(
          /*i18n*/
          {
            id: "EWPtMO"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "YAV57v"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { miw: 120, children: i18n._(
          /*i18n*/
          {
            id: "uAQUqI"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { miw: 250, children: i18n._(
          /*i18n*/
          {
            id: "/Bh+7r"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { w: 50 })
      ] }) }),
      /* @__PURE__ */ jsx(Table$1.Tbody, { children: affiliates.map((affiliate) => /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx("div", { className: classes.codeCell, children: /* @__PURE__ */ jsxs("div", { className: classes.codeWrapper, children: [
          /* @__PURE__ */ jsx(Text, { ff: "monospace", size: "sm", className: classes.codeText, children: affiliate.code }),
          /* @__PURE__ */ jsx(Button, { size: "xs", variant: "subtle", color: "gray", leftSection: /* @__PURE__ */ jsx(IconCopy, { size: 12 }), onClick: () => copyToClipboard(eventHomepageUrl(event) + `?aff=${affiliate.code}`), className: classes.copyButton, children: i18n._(
            /*i18n*/
            {
              id: "E6nRW7"
            }
          ) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsxs("div", { className: classes.affiliateInfo, children: [
          /* @__PURE__ */ jsx(Text, { className: classes.affiliateName, size: "sm", children: affiliate.name }),
          affiliate.email && /* @__PURE__ */ jsx(Text, { className: classes.affiliateEmail, children: affiliate.email })
        ] }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Badge, { color: affiliate.status === "ACTIVE" ? "green" : "gray", variant: affiliate.status === "ACTIVE" ? "light" : "outline", size: "sm", radius: "md", children: affiliate.status === "ACTIVE" ? i18n._(
          /*i18n*/
          {
            id: "F6pfE9"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "NoNwIX"
          }
        ) }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsxs("div", { className: classes.statsCell, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.statItem, children: [
            /* @__PURE__ */ jsxs(Group, { gap: 4, align: "center", children: [
              /* @__PURE__ */ jsx(IconUsers, { size: 12, className: classes.statIcon }),
              /* @__PURE__ */ jsx(Text, { className: classes.statValue, children: affiliate.total_sales })
            ] }),
            /* @__PURE__ */ jsx(Text, { className: classes.statLabel, children: i18n._(
              /*i18n*/
              {
                id: "mUv9U4"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.statItem, children: [
            /* @__PURE__ */ jsxs(Group, { gap: 4, align: "center", children: [
              /* @__PURE__ */ jsx(IconCurrencyDollar, { size: 12, className: classes.statIcon }),
              /* @__PURE__ */ jsxs(Text, { className: classes.statValue, children: [
                "$",
                affiliate.total_sales_gross.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsx(Text, { className: classes.statLabel, children: i18n._(
              /*i18n*/
              {
                id: "8YBH95"
              }
            ) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(ActionMenu, { itemsGroups: [{
          label: i18n._(
            /*i18n*/
            {
              id: "7L01XJ"
            }
          ),
          items: [{
            label: i18n._(
              /*i18n*/
              {
                id: "v4+lcZ"
              }
            ),
            icon: /* @__PURE__ */ jsx(IconPencil, { size: 14 }),
            onClick: () => {
              setSelectedAffiliateId(affiliate.id);
              openEditModal();
            }
          }, {
            label: i18n._(
              /*i18n*/
              {
                id: "iVm46+"
              }
            ),
            icon: /* @__PURE__ */ jsx(IconCopy, { size: 14 }),
            onClick: () => copyToClipboard(affiliate.code)
          }, {
            label: i18n._(
              /*i18n*/
              {
                id: "uUPbPg"
              }
            ),
            icon: /* @__PURE__ */ jsx(IconCopy, { size: 14 }),
            onClick: () => copyToClipboard(eventHomepageUrl(event) + `?aff=${affiliate.code}`)
          }, {
            label: i18n._(
              /*i18n*/
              {
                id: "GG7qDw"
              }
            ),
            icon: /* @__PURE__ */ jsx(IconShare, { size: 14 }),
            onClick: () => {
              setSelectedAffiliate(affiliate);
              openShareModal();
            }
          }, {
            label: i18n._(
              /*i18n*/
              {
                id: "vu7gDm"
              }
            ),
            icon: /* @__PURE__ */ jsx(IconTrash, { size: 14 }),
            color: "red",
            onClick: () => confirmationDialog(i18n._(
              /*i18n*/
              {
                id: "LchiNd"
              }
            ), () => handleDeleteAffiliate(affiliate.id, eventId))
          }]
        }] }) })
      ] }, affiliate.id)) })
    ] }),
    editModalOpen && selectedAffiliateId && /* @__PURE__ */ jsx(EditAffiliateModal, { affiliateId: selectedAffiliateId, onClose: closeEditModal }),
    shareModalOpen && selectedAffiliate && event && /* @__PURE__ */ jsx(ShareModal, { opened: shareModalOpen, onClose: closeShareModal, url: eventHomepageUrl(event) + `?aff=${selectedAffiliate.code}`, title: event.title, modalTitle: i18n._(
      /*i18n*/
      {
        id: "GG7qDw"
      }
    ), shareText: i18n._(
      /*i18n*/
      {
        id: "g+2103"
      }
    ) })
  ] });
};
const useCreateAffiliate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      affiliateData
    }) => affiliateClient.create(eventId, affiliateData),
    onSuccess: (_, variables) => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY, variables.eventId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_AFFILIATES_QUERY_KEY]
      })]);
    }
  });
};
const CreateAffiliateModal = ({
  onClose
}) => {
  const {
    eventId
  } = useParams();
  const createMutation = useCreateAffiliate();
  const form = useForm({
    initialValues: {
      name: "",
      code: "",
      email: "",
      status: "ACTIVE"
    },
    validateInputOnBlur: true,
    validate: {
      name: (value) => !value ? i18n._(
        /*i18n*/
        {
          id: "8/brI5"
        }
      ) : null,
      code: (value) => {
        if (!value) return i18n._(
          /*i18n*/
          {
            id: "+yMJb7"
          }
        );
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) return i18n._(
          /*i18n*/
          {
            id: "XwdMMg"
          }
        );
        if (value.length < 3) return i18n._(
          /*i18n*/
          {
            id: "m9SD3V"
          }
        );
        if (value.length > 20) return i18n._(
          /*i18n*/
          {
            id: "V1krgP"
          }
        );
        return null;
      },
      email: (value) => {
        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
          return i18n._(
            /*i18n*/
            {
              id: "5tT0+u"
            }
          );
        }
        return null;
      }
    }
  });
  const handleSubmit = form.onSubmit((values) => {
    createMutation.mutate({
      eventId,
      affiliateData: {
        ...values,
        code: values.code.toUpperCase(),
        email: values.email || void 0
      }
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "/jHBj5"
          }
        ));
        onClose();
      },
      onError: (error) => {
        var _a, _b;
        if ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) {
          showError(error.response.data.message);
        } else {
          showError(i18n._(
            /*i18n*/
            {
              id: "cEFg3R"
            }
          ));
        }
      }
    });
  });
  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    form.setFieldValue("code", randomCode);
  };
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "xfKgwv"
    }
  ), size: "md", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(AffiliateForm, { form, isEditing: false, onGenerateCode: generateRandomCode }),
    /* @__PURE__ */ jsx(Button, { type: "submit", loading: createMutation.isPending, fullWidth: true, mt: "md", children: i18n._(
      /*i18n*/
      {
        id: "xfKgwv"
      }
    ) })
  ] }) });
};
const Affiliates = () => {
  const {
    eventId
  } = useParams();
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const {
    data: affiliatesData
  } = useGetAffiliates(eventId, searchParams);
  const affiliates = affiliatesData == null ? void 0 : affiliatesData.data;
  const pagination = affiliatesData == null ? void 0 : affiliatesData.meta;
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const [downloadPending, setDownloadPending] = useState(false);
  const handleExport = async (eventId2) => {
    await withLoadingNotification(async () => {
      setDownloadPending(true);
      const blob = await affiliateClient.exportAffiliates(eventId2);
      downloadBinary(blob, "affiliates.xlsx");
    }, {
      loading: {
        title: i18n._(
          /*i18n*/
          {
            id: "9bpUSo"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "hfHhaa"
          }
        )
      },
      success: {
        title: i18n._(
          /*i18n*/
          {
            id: "9Wh+ug"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "x/xjzn"
          }
        ),
        onRun: () => setDownloadPending(false)
      },
      error: {
        title: i18n._(
          /*i18n*/
          {
            id: "jo3Gm6"
          }
        ),
        message: i18n._(
          /*i18n*/
          {
            id: "fuwKpE"
          }
        ),
        onRun: () => setDownloadPending(false)
      }
    });
  };
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "/HGmW9"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "CPXP5Z"
      }
    ) }),
    /* @__PURE__ */ jsxs(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "ftNXma"
      }
    ), setSearchParams, searchParams }), filterComponent: (pagination == null ? void 0 : pagination.allowed_sorts) ? /* @__PURE__ */ jsx(SortSelector, { selected: searchParams.sortBy && searchParams.sortDirection ? searchParams.sortBy + ":" + searchParams.sortDirection : pagination.default_sort + ":" + pagination.default_sort_direction, options: pagination.allowed_sorts, onSortSelect: (key, sortDirection) => {
      setSearchParams({
        sortBy: key,
        sortDirection
      });
    } }) : void 0, children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => handleExport(eventId), rightSection: /* @__PURE__ */ jsx(IconDownload, { size: 14 }), color: "green", loading: downloadPending, size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "GS+Mus"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", "data-testid": "affiliate-create-button", onClick: openCreateModal, children: i18n._(
        /*i18n*/
        {
          id: "xfKgwv"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !affiliates }),
    affiliates && /* @__PURE__ */ jsx(AffiliateTable, { affiliates, openCreateModal }),
    createModalOpen && /* @__PURE__ */ jsx(CreateAffiliateModal, { onClose: closeCreateModal }),
    !!(affiliates == null ? void 0 : affiliates.length) && ((pagination == null ? void 0 : pagination.last_page) || 0) > 1 && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) })
  ] });
};
export {
  Affiliates as default
};

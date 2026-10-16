import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { useParams } from "react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { f as api, q as queryParamsHelper } from "../entry.server.js";
import { Trans } from "@lingui/react";
import { TextInput, NumberInput, Button, Badge, Progress } from "@mantine/core";
import { IconCheck, IconX, IconPlus, IconHelp, IconPencil, IconTrash } from "@tabler/icons-react";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { P as Popover } from "./index-CoMrHZbF.js";
import { useEffect, useState } from "react";
import { A as ActionMenu } from "./index-ChciN8SC.js";
import { useDisclosure } from "@mantine/hooks";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import { useForm } from "@mantine/form";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./types-CqPWB-a5.js";
const capacityAssignmentClient = {
  create: async (eventId, capacityAssignment) => {
    const response = await api.post(`events/${eventId}/capacity-assignments`, capacityAssignment);
    return response.data;
  },
  update: async (eventId, capacityAssignmentId, capacityAssignment) => {
    const response = await api.put(`events/${eventId}/capacity-assignments/${capacityAssignmentId}`, capacityAssignment);
    return response.data;
  },
  all: async (eventId, pagination) => {
    const response = await api.get(`events/${eventId}/capacity-assignments` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  get: async (eventId, capacityAssignmentId) => {
    const response = await api.get(`events/${eventId}/capacity-assignments/${capacityAssignmentId}`);
    return response.data;
  },
  delete: async (eventId, capacityAssignmentId) => {
    const response = await api.delete(`events/${eventId}/capacity-assignments/${capacityAssignmentId}`);
    return response.data;
  }
};
const GET_EVENT_CAPACITY_ASSIGNMENTS_QUERY_KEY = "getEventCapacityAssignments";
const useGetEventCapacityAssignments = (eventId, pagination) => {
  return useQuery({
    queryKey: [GET_EVENT_CAPACITY_ASSIGNMENTS_QUERY_KEY, eventId, pagination],
    queryFn: async () => {
      return await capacityAssignmentClient.all(eventId, pagination);
    }
  });
};
const capacityAssignmentList = "_capacityAssignmentList_d72a6_37";
const capacityCard = "_capacityCard_d72a6_43";
const capacityAssignmentHeader = "_capacityAssignmentHeader_d72a6_49";
const capacityAssignmentAppliesTo = "_capacityAssignmentAppliesTo_d72a6_56";
const appliesToText = "_appliesToText_d72a6_56";
const capacityAssignmentName = "_capacityAssignmentName_d72a6_62";
const capacityAssignmentInfo = "_capacityAssignmentInfo_d72a6_67";
const capacityAssignmentCapacity = "_capacityAssignmentCapacity_d72a6_72";
const capacityText = "_capacityText_d72a6_76";
const classes = {
  capacityAssignmentList,
  capacityCard,
  capacityAssignmentHeader,
  capacityAssignmentAppliesTo,
  appliesToText,
  capacityAssignmentName,
  capacityAssignmentInfo,
  capacityAssignmentCapacity,
  capacityText
};
const CapacityAssigmentForm = ({
  form,
  productsCategories
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
        id: "j6w7d/"
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
        id: "1lRT3t"
      }
    )
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("name"), required: true, label: i18n._(
        /*i18n*/
        {
          id: "6YtxFj"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "JJhRbH"
        }
      ) }),
      /* @__PURE__ */ jsx(NumberInput, { ...form.getInputProps("capacity"), label: i18n._(
        /*i18n*/
        {
          id: "QyjCeq"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "NIuIk1"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(ProductSelector, { label: i18n._(
      /*i18n*/
      {
        id: "AeejQi"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "C4Y1hA"
      }
    ), productCategories: productsCategories, form, productFieldName: "product_ids" }),
    /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ), required: true, form, name: "status", optionList: statusOptions })
  ] });
};
const GET_EVENT_CAPACITY_ASSIGNMENT_QUERY_KEY = "getEventCapacityAssignment";
const useGetEventCapacityAssignment = (capacityAssignmentId, eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_CAPACITY_ASSIGNMENT_QUERY_KEY, eventId, capacityAssignmentId],
    queryFn: async () => {
      const {
        data
      } = await capacityAssignmentClient.get(eventId, capacityAssignmentId);
      return data;
    }
  });
};
const useEditCapacityAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      capacityAssignmentData,
      eventId,
      capacityAssignmentId
    }) => capacityAssignmentClient.update(eventId, capacityAssignmentId, capacityAssignmentData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_CAPACITY_ASSIGNMENT_QUERY_KEY, variables.eventId, variables.capacityAssignmentId]
      });
      return queryClient.invalidateQueries({
        queryKey: [GET_EVENT_CAPACITY_ASSIGNMENTS_QUERY_KEY]
      });
    }
  });
};
const EditCapacityAssignmentModal = ({
  onClose,
  capacityAssignmentId
}) => {
  const {
    eventId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: capacityAssignment
  } = useGetEventCapacityAssignment(capacityAssignmentId, eventId);
  const {
    data: event
  } = useGetEvent(eventId);
  const form = useForm({
    initialValues: {
      name: "",
      capacity: void 0,
      status: "ACTIVE",
      product_ids: []
    }
  });
  const editMutation = useEditCapacityAssignment();
  const handleSubmit = (requestData) => {
    editMutation.mutate({
      eventId,
      capacityAssignmentData: requestData,
      capacityAssignmentId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "3suLF0"
          }
        ));
        onClose();
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  useEffect(() => {
    var _a;
    if (capacityAssignment) {
      form.setValues({
        name: capacityAssignment.name,
        capacity: capacityAssignment.capacity,
        status: capacityAssignment.status,
        product_ids: (_a = capacityAssignment.products) == null ? void 0 : _a.map((product) => String(product.id))
      });
    }
  }, [capacityAssignment]);
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "oHE9JT"
    }
  ), children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
    event && /* @__PURE__ */ jsx(CapacityAssigmentForm, { form, productsCategories: event.product_categories }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, loading: editMutation.isPending, children: i18n._(
      /*i18n*/
      {
        id: "oHE9JT"
      }
    ) })
  ] }) });
};
const useDeleteCapacityAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      capacityAssignmentId,
      eventId
    }) => capacityAssignmentClient.delete(eventId, capacityAssignmentId),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_EVENT_CAPACITY_ASSIGNMENTS_QUERY_KEY]
    })
  });
};
const CapacityAssignmentList = ({
  capacityAssignments,
  openCreateModal
}) => {
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [selectedCapacityAssignmentId, setSelectedCapacityAssignmentId] = useState();
  const deleteMutation = useDeleteCapacityAssignment();
  const handleDeleteProduct = (capacityAssignmentId, eventId) => {
    deleteMutation.mutate({
      capacityAssignmentId,
      eventId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "k5p8dz"
          }
        ));
      },
      onError: (error) => {
        showError(error.message);
      }
    });
  };
  if (capacityAssignments.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "XUfgCI"
      }
    ), imageHref: "/blank-slate/capacity-assignments.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "v9VSIS", components: {
        0: /* @__PURE__ */ jsx("p", {}),
        1: /* @__PURE__ */ jsx("p", {}),
        2: /* @__PURE__ */ jsx("b", {}),
        3: /* @__PURE__ */ jsx("b", {})
      } }) }),
      /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
        /*i18n*/
        {
          id: "VwdqVy"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: classes.capacityAssignmentList, children: capacityAssignments.map((assignment) => {
      const capacityPercentage = assignment.capacity ? assignment.used_capacity / assignment.capacity * 100 : 0;
      const capacityColor = capacityPercentage > 80 ? "red" : capacityPercentage > 50 ? "yellow" : "green";
      return /* @__PURE__ */ jsxs(Card, { className: classes.capacityCard, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.capacityAssignmentHeader, children: [
          /* @__PURE__ */ jsx("div", { className: classes.capacityAssignmentAppliesTo, children: assignment.products && /* @__PURE__ */ jsx(Popover, { title: assignment.products.map((product) => /* @__PURE__ */ jsx("div", { children: product.title }, product.id)), position: "bottom", withArrow: true, children: /* @__PURE__ */ jsxs("div", { className: classes.appliesToText, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              assignment.products.length > 1 && /* @__PURE__ */ jsx(Trans, { id: "sy6fss", values: {
                0: assignment.products.length
              } }),
              assignment.products.length === 1 && i18n._(
                /*i18n*/
                {
                  id: "kadJKg"
                }
              )
            ] }),
            " ",
            /* @__PURE__ */ jsx(IconHelp, { size: 16 })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: classes.capacityAssignmentStatus, children: /* @__PURE__ */ jsx(Badge, { variant: "light", color: assignment.status === "ACTIVE" ? "green" : "gray", children: assignment.status }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: classes.capacityAssignmentName, children: /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(Truncate, { text: assignment.name, length: 30 }) }) }),
        /* @__PURE__ */ jsxs("div", { className: classes.capacityAssignmentInfo, children: [
          /* @__PURE__ */ jsx("div", { className: classes.capacityAssignmentCapacity, children: assignment.capacity ? /* @__PURE__ */ jsxs("div", { className: classes.capacity, children: [
            /* @__PURE__ */ jsx(Progress, { className: classes.capacityBar, value: capacityPercentage, color: capacityColor, size: "md" }),
            /* @__PURE__ */ jsxs("div", { className: classes.capacityText, children: [
              assignment.used_capacity,
              "/",
              assignment.capacity
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: classes.capacityText, children: [
            assignment.used_capacity,
            "/∞"
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: classes.capacityAssignmentActions, children: /* @__PURE__ */ jsx(ActionMenu, { itemsGroups: [{
            label: i18n._(
              /*i18n*/
              {
                id: "wckWOP"
              }
            ),
            items: [{
              label: i18n._(
                /*i18n*/
                {
                  id: "kBkYSa"
                }
              ),
              icon: /* @__PURE__ */ jsx(IconPencil, { size: 14 }),
              onClick: () => {
                setSelectedCapacityAssignmentId(assignment.id);
                openEditModal();
              }
            }]
          }, {
            label: i18n._(
              /*i18n*/
              {
                id: "Zz6Cxn"
              }
            ),
            items: [{
              label: i18n._(
                /*i18n*/
                {
                  id: "jRJZxD"
                }
              ),
              icon: /* @__PURE__ */ jsx(IconTrash, { size: 14 }),
              onClick: () => {
                confirmationDialog(i18n._(
                  /*i18n*/
                  {
                    id: "vJuISq"
                  }
                ), () => {
                  handleDeleteProduct(assignment.id, assignment.event_id);
                });
              },
              color: "red"
            }]
          }] }) })
        ] })
      ] }, assignment.id);
    }) }),
    editModalOpen && selectedCapacityAssignmentId && /* @__PURE__ */ jsx(EditCapacityAssignmentModal, { onClose: closeEditModal, capacityAssignmentId: selectedCapacityAssignmentId })
  ] });
};
const useCreateCapacityAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      capacityAssignmentData,
      eventId
    }) => capacityAssignmentClient.create(eventId, capacityAssignmentData),
    onSuccess: (_, variables) => queryClient.invalidateQueries({
      queryKey: [GET_EVENT_CAPACITY_ASSIGNMENTS_QUERY_KEY, variables.eventId]
    })
  });
};
const CreateCapacityAssignmentModal = ({
  onClose
}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const {
    data: event
  } = useGetEvent(eventId);
  const form = useForm({
    initialValues: {
      name: "",
      capacity: void 0,
      status: "ACTIVE",
      product_ids: []
    }
  });
  const createMutation = useCreateCapacityAssignment();
  const eventHasProducts = ((_a = event == null ? void 0 : event.product_categories) == null ? void 0 : _a.every((category) => {
    var _a2;
    return ((_a2 = category.products) == null ? void 0 : _a2.length) === 0;
  })) === false;
  const handleSubmit = (requestData) => {
    createMutation.mutate({
      eventId,
      capacityAssignmentData: requestData
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "V6Q5RZ"
          }
        ));
        onClose();
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  const NoProducts = () => {
    return /* @__PURE__ */ jsx(NoResultsSplash, { imageHref: "/blank-slate/tickets.svg", heading: i18n._(
      /*i18n*/
      {
        id: "hcX103"
      }
    ), subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "Djl45M"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => window.location.href = `/manage/event/${eventId}/products/#create-product`, children: i18n._(
        /*i18n*/
        {
          id: "k9RiLi"
        }
      ) })
    ] }) });
  };
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: eventHasProducts ? i18n._(
    /*i18n*/
    {
      id: "VwdqVy"
    }
  ) : null, children: [
    !eventHasProducts && /* @__PURE__ */ jsx(NoProducts, {}),
    eventHasProducts && /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
      event && /* @__PURE__ */ jsx(CapacityAssigmentForm, { form, productsCategories: event.product_categories }),
      /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, loading: createMutation.isPending, children: i18n._(
        /*i18n*/
        {
          id: "VwdqVy"
        }
      ) })
    ] })
  ] });
};
const CapacityAssignments = () => {
  const {
    eventId
  } = useParams();
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const {
    data: capacityAssignmentsData
  } = useGetEventCapacityAssignments(eventId, searchParams);
  const capacityAssignments = capacityAssignmentsData == null ? void 0 : capacityAssignmentsData.data;
  const pagination = capacityAssignmentsData == null ? void 0 : capacityAssignmentsData.meta;
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "OESu7I"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "jy6QDF"
      }
    ) }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "Pjsch9"
      }
    ), setSearchParams, searchParams }), filterComponent: (pagination == null ? void 0 : pagination.allowed_sorts) ? /* @__PURE__ */ jsx(SortSelector, { selected: searchParams.sortBy && searchParams.sortDirection ? searchParams.sortBy + ":" + searchParams.sortDirection : pagination.default_sort + ":" + pagination.default_sort_direction, options: pagination.allowed_sorts, onSortSelect: (key, sortDirection) => {
      setSearchParams({
        sortBy: key,
        sortDirection
      });
    } }) : void 0, children: /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", "data-testid": "capacity-create-button", onClick: () => openCreateModal(), children: i18n._(
      /*i18n*/
      {
        id: "VwdqVy"
      }
    ) }) }),
    /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !capacityAssignments }),
    capacityAssignments && /* @__PURE__ */ jsx(CapacityAssignmentList, { capacityAssignments, openCreateModal }),
    createModalOpen && /* @__PURE__ */ jsx(CreateCapacityAssignmentModal, { onClose: closeCreateModal }),
    !!(capacityAssignments == null ? void 0 : capacityAssignments.length) && ((pagination == null ? void 0 : pagination.total) || 0) >= 20 && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) })
  ] });
};
export {
  CapacityAssignments as default
};

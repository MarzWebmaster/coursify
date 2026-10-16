import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Button, Menu, Badge } from "@mantine/core";
import { t as taxAndFeeClient, G as GET_TAXES_AND_FEES_QUERY_KEY, T as TaxAndFeeForm, u as useGetTaxesAndFees, C as CreateTaxOrFeeModal } from "./index-CRDLFx3A.js";
import { T as TaxAndFeeCalculationType, a as TaxAndFeeType } from "./types-CqPWB-a5.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { IconPercentage, IconReceipt, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Trans } from "@lingui/react";
import { useForm } from "@mantine/form";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { u as useGetMe } from "../entry.server.js";
import { useEffect, useState } from "react";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { a as accountClasses } from "./ManageAccount.module-DbFPjLmV.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { H as HeadingCard } from "./index-D8DZtV6f.js";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import "./index-CV5KyLiQ.js";
import "classnames";
import "@mantine/notifications";
import "react-dom/server";
import "react-router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const taxes = "_taxes_f4j7a_1";
const taxBlock = "_taxBlock_f4j7a_7";
const taxType = "_taxType_f4j7a_20";
const header = "_header_f4j7a_20";
const iconWrapper = "_iconWrapper_f4j7a_24";
const rateBadge = "_rateBadge_f4j7a_28";
const feeType = "_feeType_f4j7a_32";
const type = "_type_f4j7a_59";
const action = "_action_f4j7a_66";
const menuButton = "_menuButton_f4j7a_69";
const body = "_body_f4j7a_76";
const name = "_name_f4j7a_83";
const value = "_value_f4j7a_92";
const noTaxes = "_noTaxes_f4j7a_100";
const classes = {
  taxes,
  taxBlock,
  taxType,
  header,
  iconWrapper,
  rateBadge,
  feeType,
  type,
  action,
  menuButton,
  body,
  name,
  value,
  noTaxes
};
const useUpdateTaxOrFee = () => {
  const queryClient = useQueryClient();
  const {
    data: me
  } = useGetMe();
  return useMutation({
    mutationFn: ({
      taxOrFeeData,
      taxOrFeeId
    }) => taxAndFeeClient.update(me == null ? void 0 : me.account_id, taxOrFeeId, taxOrFeeData),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_TAXES_AND_FEES_QUERY_KEY]
    })
  });
};
const EditTaxOrFeeModal = ({
  onClose,
  taxOrFee
}) => {
  const updateMutation = useUpdateTaxOrFee();
  const formErrorHandler = useFormErrorResponseHandler();
  const form = useForm({
    initialValues: {
      name: "",
      type: TaxAndFeeType.Tax,
      calculation_type: TaxAndFeeCalculationType.Percentage,
      rate: void 0,
      description: void 0,
      is_default: true,
      is_active: true
    }
  });
  useEffect(() => {
    form.setValues(taxOrFee);
  }, [taxOrFee]);
  const handleEdit = (values) => {
    updateMutation.mutate({
      taxOrFeeId: taxOrFee.id,
      taxOrFeeData: values
    }, {
      onSuccess: () => {
        showSuccess(/* @__PURE__ */ jsx(Trans, { id: "FImCSc", values: {
          0: form.values.type === TaxAndFeeType.Tax ? i18n._(
            /*i18n*/
            {
              id: "JpohL9"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "PLUB/s"
            }
          )
        } }));
        form.reset();
        onClose();
      },
      onError: (error) => formErrorHandler(form, error)
    });
  };
  return /* @__PURE__ */ jsx(Modal, { heading: /* @__PURE__ */ jsx(Trans, { id: "N6j2JH", values: {
    0: form.values.type === TaxAndFeeType.Tax ? i18n._(
      /*i18n*/
      {
        id: "JpohL9"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "PLUB/s"
      }
    )
  } }), onClose, opened: true, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => handleEdit(values)), children: [
    /* @__PURE__ */ jsx(TaxAndFeeForm, { form }),
    /* @__PURE__ */ jsx(Button, { fullWidth: true, loading: updateMutation.isPending, type: "submit", children: /* @__PURE__ */ jsx(Trans, { id: "L/gNNk", values: {
      0: form.values.type === TaxAndFeeType.Tax ? i18n._(
        /*i18n*/
        {
          id: "JpohL9"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "PLUB/s"
        }
      )
    } }) })
  ] }) });
};
const useDeleteTaxOrFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      accountId,
      taxAndFeeId
    }) => taxAndFeeClient.delete(accountId, taxAndFeeId),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_TAXES_AND_FEES_QUERY_KEY]
    })
  });
};
const TaxAndFeeList = () => {
  const {
    data: taxesAndFees,
    isFetched
  } = useGetTaxesAndFees();
  const {
    data: account
  } = useGetAccount();
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [selectedTaxOrFee, setSelectedTaxOrFee] = useState();
  const deleteMutation = useDeleteTaxOrFee();
  if (!isFetched || !taxesAndFees) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  const handleEdit = (taxAndFee) => {
    setSelectedTaxOrFee(taxAndFee);
    openEditModal();
  };
  const handleDelete = (taxAndFee) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "b3+Qku"
      }
    ), () => {
      deleteMutation.mutate({
        taxAndFeeId: taxAndFee.id,
        accountId: taxAndFee.account_id
      }, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "0RXCDo"
          }
        )),
        onError: (error) => {
          console.error(error);
          showError(i18n._(
            /*i18n*/
            {
              id: "GRChTw"
            }
          ));
        }
      });
    });
  };
  const TaxList = () => {
    return /* @__PURE__ */ jsx("div", { className: classes.taxes, children: taxesAndFees.data.map((tax) => {
      const isTax = tax.type === TaxAndFeeType.Tax;
      return /* @__PURE__ */ jsxs("div", { className: `${classes.taxBlock} ${isTax ? classes.taxType : classes.feeType}`, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.header, children: [
          /* @__PURE__ */ jsx("div", { className: classes.iconWrapper, children: isTax ? /* @__PURE__ */ jsx(IconPercentage, { size: 16 }) : /* @__PURE__ */ jsx(IconReceipt, { size: 16 }) }),
          /* @__PURE__ */ jsx("div", { className: classes.type, children: tax.type.toLocaleLowerCase() }),
          /* @__PURE__ */ jsx("div", { className: classes.action, children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
            /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { size: "compact-xs", variant: "transparent", className: classes.menuButton, children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 14 }) }) }),
            /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
              /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), onClick: () => handleEdit(tax), children: i18n._(
                /*i18n*/
                {
                  id: "ePK91l"
                }
              ) }),
              /* @__PURE__ */ jsx(Menu.Item, { color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), onClick: () => handleDelete(tax), children: i18n._(
                /*i18n*/
                {
                  id: "cnGeoo"
                }
              ) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.body, children: [
          /* @__PURE__ */ jsx("div", { className: classes.name, children: tax.name }),
          /* @__PURE__ */ jsx("div", { className: classes.value, children: /* @__PURE__ */ jsx(Badge, { variant: "light", size: "lg", className: classes.rateBadge, children: tax.calculation_type === TaxAndFeeCalculationType.Percentage ? tax.rate + "%" : formatCurrency(Number(tax.rate), account == null ? void 0 : account.currency_code) }) })
        ] })
      ] }, tax.id);
    }) });
  };
  const NoTaxes = () => {
    return /* @__PURE__ */ jsx("div", { className: classes.noTaxes, children: /* @__PURE__ */ jsxs("p", { children: [
      i18n._(
        /*i18n*/
        {
          id: "RY2eP1"
        }
      ),
      " "
    ] }) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    taxesAndFees.data.length > 0 && /* @__PURE__ */ jsx(TaxList, {}),
    taxesAndFees.data.length === 0 && /* @__PURE__ */ jsx(NoTaxes, {}),
    editModalOpen && selectedTaxOrFee && /* @__PURE__ */ jsx(EditTaxOrFeeModal, { taxOrFee: selectedTaxOrFee, onClose: closeEditModal })
  ] });
};
const TaxSettings = () => {
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeadingCard, { heading: i18n._(
      /*i18n*/
      {
        id: "geUFpZ"
      }
    ), subHeading: i18n._(
      /*i18n*/
      {
        id: "AtXtSw"
      }
    ), buttonText: i18n._(
      /*i18n*/
      {
        id: "yWiPh+"
      }
    ), buttonAction: openCreateModal }),
    /* @__PURE__ */ jsxs(Card, { className: accountClasses.tabContent, children: [
      /* @__PURE__ */ jsx(LoadingMask, {}),
      /* @__PURE__ */ jsx(TaxAndFeeList, {}),
      createModalOpen && /* @__PURE__ */ jsx(CreateTaxOrFeeModal, { onClose: closeCreateModal })
    ] })
  ] });
};
export {
  TaxSettings,
  TaxSettings as default
};

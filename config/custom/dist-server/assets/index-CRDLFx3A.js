import { jsx, jsxs } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useForm } from "@mantine/form";
import { a as TaxAndFeeType, T as TaxAndFeeCalculationType } from "./types-CqPWB-a5.js";
import { TextInput, NumberInput, Switch, Button } from "@mantine/core";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { IconReceiptTax, IconCash, IconPercentage } from "@tabler/icons-react";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { f as api, u as useGetMe } from "../entry.server.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
const taxAndFeeClient = {
  create: async (accountId, payload) => {
    const response = await api.post(`accounts/${accountId}/taxes-and-fees`, payload);
    return response.data;
  },
  all: async (accountId) => {
    const response = await api.get(`accounts/${accountId}/taxes-and-fees`);
    return response.data;
  },
  delete: async (accountId, taxAndFeeId) => {
    return await api.delete(`accounts/${accountId}/taxes-and-fees/${taxAndFeeId}`);
  },
  update: async (accountId, taxAndFeeId, payload) => {
    const response = await api.put(`accounts/${accountId}/taxes-and-fees/${taxAndFeeId}`, payload);
    return response.data;
  }
};
const GET_TAXES_AND_FEES_QUERY_KEY = "getTaxesAndFees";
const useGetTaxesAndFees = () => {
  var _a;
  const meQuery = useGetMe();
  const accountId = (_a = meQuery.data) == null ? void 0 : _a.account_id;
  return useQuery({
    queryKey: [GET_TAXES_AND_FEES_QUERY_KEY, accountId],
    enabled: meQuery.isFetched,
    queryFn: async () => await taxAndFeeClient.all(accountId)
  });
};
const TaxAndFeeForm = ({
  form
}) => {
  const typeOptions = [{
    icon: /* @__PURE__ */ jsx(IconReceiptTax, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "JpohL9"
      }
    ),
    value: "TAX",
    description: i18n._(
      /*i18n*/
      {
        id: "RlJmQg"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconCash, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "PLUB/s"
      }
    ),
    value: "FEE",
    description: i18n._(
      /*i18n*/
      {
        id: "qv4bfj"
      }
    )
  }];
  const calcTypeOptions = [{
    icon: /* @__PURE__ */ jsx(IconPercentage, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "/roQKz"
      }
    ),
    value: "PERCENTAGE",
    description: i18n._(
      /*i18n*/
      {
        id: "OIPtI5"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconCash, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "TpqW74"
      }
    ),
    value: "FIXED",
    description: i18n._(
      /*i18n*/
      {
        id: "POT0K/"
      }
    )
  }];
  const type = (form.values.type === TaxAndFeeType.Tax ? i18n._(
    /*i18n*/
    {
      id: "JpohL9"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "PLUB/s"
    }
  )).toLowerCase();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
      /*i18n*/
      {
        id: "+zy2Nq"
      }
    ), required: true, form, name: "type", optionList: typeOptions }),
    /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
      /*i18n*/
      {
        id: "bcCn6r"
      }
    ), required: true, form, name: "calculation_type", optionList: calcTypeOptions }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("name"), label: i18n._(
      /*i18n*/
      {
        id: "6YtxFj"
      }
    ), placeholder: form.values.type === TaxAndFeeType.Tax ? i18n._(
      /*i18n*/
      {
        id: "khBZkl"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "/jZOZa"
      }
    ), required: true }),
    /* @__PURE__ */ jsx(NumberInput, { decimalScale: 2, fixedDecimalScale: true, step: 0.5, ...form.getInputProps("rate"), label: form.values.calculation_type === TaxAndFeeCalculationType.Percentage ? i18n._(
      /*i18n*/
      {
        id: "vPJ1FI"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "hehnjM"
      }
    ), placeholder: form.values.calculation_type === TaxAndFeeCalculationType.Percentage ? "23" : "2.50", leftSection: form.values.calculation_type === TaxAndFeeCalculationType.Percentage ? "%" : "", description: form.values.calculation_type === TaxAndFeeCalculationType.Percentage ? i18n._(
      /*i18n*/
      {
        id: "3yiej1"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "pqFrv2"
      }
    ), required: true, max: form.values.calculation_type === TaxAndFeeCalculationType.Percentage ? 100 : void 0 }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("description"), label: i18n._(
      /*i18n*/
      {
        id: "Nu4oKW"
      }
    ) }),
    /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("is_default", {
      type: "checkbox"
    }), label: i18n._(
      /*i18n*/
      {
        id: "ARBThj",
        values: {
          type
        }
      }
    ), value: 1, description: i18n._(
      /*i18n*/
      {
        id: "6euFZ/",
        values: {
          type
        }
      }
    ) })
  ] });
};
const useCreateTaxOrFee = () => {
  const queryClient = useQueryClient();
  const {
    data: me
  } = useGetMe();
  return useMutation({
    mutationFn: ({
      taxOrFeeData
    }) => taxAndFeeClient.create(me == null ? void 0 : me.account_id, taxOrFeeData),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [GET_TAXES_AND_FEES_QUERY_KEY]
    })
  });
};
const CreateTaxOrFeeModal = ({
  onClose,
  onCreated
}) => {
  const createMutation = useCreateTaxOrFee();
  const formErrorHandler = useFormErrorResponseHandler();
  const form = useForm({
    initialValues: {
      name: "",
      type: TaxAndFeeType.Tax,
      calculation_type: TaxAndFeeCalculationType.Percentage,
      rate: void 0,
      description: "",
      is_default: true,
      is_active: true
    }
  });
  const handleCreate = (values) => {
    createMutation.mutate({
      taxOrFeeData: values
    }, {
      onSuccess: (response) => {
        showSuccess(/* @__PURE__ */ jsx(Trans, { id: "Pmr5xp", values: {
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
        onCreated == null ? void 0 : onCreated(response.data);
        onClose();
      },
      onError: (error) => formErrorHandler(form, error)
    });
  };
  const handleSubmit = () => {
    form.validate();
    if (form.isValid()) {
      handleCreate(form.values);
    }
  };
  return /* @__PURE__ */ jsxs(Modal, { heading: i18n._(
    /*i18n*/
    {
      id: "UKfi21"
    }
  ), onClose, opened: true, children: [
    /* @__PURE__ */ jsx(TaxAndFeeForm, { form }),
    /* @__PURE__ */ jsx(Button, { fullWidth: true, loading: createMutation.isPending, onClick: handleSubmit, children: /* @__PURE__ */ jsx(Trans, { id: "b9XOHo", values: {
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
  ] });
};
export {
  CreateTaxOrFeeModal as C,
  GET_TAXES_AND_FEES_QUERY_KEY as G,
  TaxAndFeeForm as T,
  taxAndFeeClient as t,
  useGetTaxesAndFees as u
};

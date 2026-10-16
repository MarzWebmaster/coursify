import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams } from "react-router";
import { u as useGetEvent, G as GET_EVENT_QUERY_KEY } from "./useGetEvent-DyvalBPE.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { g as PromoCodeDiscountType, h as PromoCodeDiscountAppliesTo } from "./types-CqPWB-a5.js";
import { u as utcToTz, p as prettyDate, r as relativeDate } from "./dates-CbVpwZeX.js";
import { TextInput, Button, Select, NumberInput, Input, SegmentedControl, Table as Table$1, Badge, Tooltip, Group, Menu, Flex } from "@mantine/core";
import { T as Table, a as TableHead } from "./index-XJu-jVVm.js";
import { IconRefresh, IconBulb, IconTicket, IconPercentage, IconPlus, IconDotsVertical, IconSend, IconCopy, IconTrash, IconCheck } from "@tabler/icons-react";
import { C as Currency } from "./index-IzdRcWBR.js";
import { useDisclosure, useClipboard } from "@mantine/hooks";
import { b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useForm, hasLength } from "@mantine/form";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useState, useEffect } from "react";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { a as getCurrencySymbol } from "./currency-Br7a8J7F.js";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import { S as ShowForMobile, a as ShowForDesktop } from "./ShowHideComponents-Bm9N1oAJ.js";
import { C as Callout } from "./index-CwjvB_vn.js";
import { A as AdvancedOptions } from "./index-CnTFmtaW.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { B as Button$1 } from "./index-hLKQavXc.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { J as promoCodeClient } from "../entry.server.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { e as eventHomepageUrl } from "./urlHelper-CsaWRwIV.js";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "./index-jHMtuNEo.js";
import "@mantine/notifications";
import "./useWindowWidth-CvsXQp3R.js";
import "classnames";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const hasAdvancedValuesSet = (form) => {
  var _a;
  return !!((((_a = form.values.applicable_product_ids) == null ? void 0 : _a.length) ?? 0) > 0 || form.values.expiry_date || form.values.max_allowed_usages);
};
const PromoCodeForm = ({
  form
}) => {
  const {
    eventId
  } = useParams();
  const {
    data: event,
    data: {
      product_categories: productCategories
    } = {}
  } = useGetEvent(eventId);
  const [showAdvanced, setShowAdvanced] = useState(() => hasAdvancedValuesSet(form));
  useEffect(() => {
    if (hasAdvancedValuesSet(form)) {
      setShowAdvanced(true);
    }
  }, [form.values.applicable_product_ids, form.values.expiry_date, form.values.max_allowed_usages]);
  const currencySymbol = getCurrencySymbol(event == null ? void 0 : event.currency);
  const DiscountIcon = () => {
    if (form.values.discount_type === "PERCENTAGE") {
      return /* @__PURE__ */ jsx(IconPercentage, {});
    }
    return currencySymbol;
  };
  if (!event || !productCategories) {
    return /* @__PURE__ */ jsx(LoadingMask, {});
  }
  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    form.setFieldValue("code", randomCode);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("code"), label: i18n._(
      /*i18n*/
      {
        id: "EWPtMO"
      }
    ), placeholder: "20OFF", required: true, rightSection: /* @__PURE__ */ jsxs(Button, { variant: "subtle", size: "xs", color: "gray", onClick: generateRandomCode, style: {
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
    ] }), rightSectionWidth: "auto" }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(Select, { ...form.getInputProps("discount_type"), label: i18n._(
        /*i18n*/
        {
          id: "C8JLas"
        }
      ), data: [{
        value: "NONE",
        label: i18n._(
          /*i18n*/
          {
            id: "fFeCKc"
          }
        )
      }, {
        value: "PERCENTAGE",
        label: i18n._(
          /*i18n*/
          {
            id: "/roQKz"
          }
        )
      }, {
        value: "FIXED",
        label: i18n._(
          /*i18n*/
          {
            id: "irpUxR"
          }
        )
      }] }),
      /* @__PURE__ */ jsx(NumberInput, { disabled: form.values.discount_type === PromoCodeDiscountType.None, decimalScale: 2, min: 0, rightSection: /* @__PURE__ */ jsx(DiscountIcon, {}), ...form.getInputProps("discount"), label: form.values.discount_type === "PERCENTAGE" ? i18n._(
        /*i18n*/
        {
          id: "ypJ62C"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "3LtiBI",
          values: {
            0: event.currency
          }
        }
      ), placeholder: "0.00" })
    ] }),
    form.values.discount_type === PromoCodeDiscountType.Fixed && /* @__PURE__ */ jsx(Input.Wrapper, { label: i18n._(
      /*i18n*/
      {
        id: "49Tkiw"
      }
    ), description: form.values.discount_applies_to === PromoCodeDiscountAppliesTo.Order ? i18n._(
      /*i18n*/
      {
        id: "sKL8k2"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "7oksH+",
        values: {
          currencySymbol
        }
      }
    ), children: /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, mt: 4, value: form.values.discount_applies_to ?? PromoCodeDiscountAppliesTo.EachProduct, onChange: (value) => form.setFieldValue("discount_applies_to", value), data: [{
      value: PromoCodeDiscountAppliesTo.Order,
      label: i18n._(
        /*i18n*/
        {
          id: "RRlWVA"
        }
      )
    }, {
      value: PromoCodeDiscountAppliesTo.EachProduct,
      label: i18n._(
        /*i18n*/
        {
          id: "Xfsjel"
        }
      )
    }], "data-testid": "promo-code-discount-applies-to" }) }),
    form.values.discount_type === PromoCodeDiscountType.None && /* @__PURE__ */ jsx(Callout, { icon: /* @__PURE__ */ jsx(IconBulb, { size: 18, stroke: 2 }), variant: "info", title: i18n._(
      /*i18n*/
      {
        id: "lTPqpM"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "ZthcdI"
      }
    ) }),
    /* @__PURE__ */ jsxs(AdvancedOptions, { opened: showAdvanced, onToggle: () => setShowAdvanced((v) => !v), dataTestId: "promo-code-advanced-toggle", children: [
      /* @__PURE__ */ jsx(ProductSelector, { label: i18n._(
        /*i18n*/
        {
          id: "hFHnxR"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "C4Y1hA"
        }
      ), icon: /* @__PURE__ */ jsx(IconTicket, { size: "1rem" }), productCategories, form, productFieldName: "applicable_product_ids" }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { type: "datetime-local", ...form.getInputProps("expiry_date"), label: i18n._(
          /*i18n*/
          {
            id: "uaSvqt"
          }
        ) }),
        /* @__PURE__ */ jsx(NumberInput, { min: 1, placeholder: i18n._(
          /*i18n*/
          {
            id: "NIuIk1"
          }
        ), ...form.getInputProps("max_allowed_usages"), label: i18n._(
          /*i18n*/
          {
            id: "ySxKZe"
          }
        ) })
      ] })
    ] })
  ] });
};
const GET_PROMO_CODE_QUERY_KEY = "getPromoCode";
const useGetPromoCode = (eventId, promoCodeId) => {
  return useQuery({
    queryKey: [GET_PROMO_CODE_QUERY_KEY, eventId, promoCodeId],
    queryFn: async () => {
      const {
        data
      } = await promoCodeClient.findById(eventId, promoCodeId);
      return data;
    }
  });
};
const GET_EVENT_PROMO_CODES_QUERY_KEY = "getEventPromoCodes";
const useGetEventPromoCodes = (eventId, pagination) => {
  return useQuery({
    queryKey: [GET_EVENT_PROMO_CODES_QUERY_KEY, eventId, pagination],
    queryFn: async () => await promoCodeClient.all(eventId, pagination)
  });
};
const useUpdatePromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      promoCodeId,
      promoCodeData
    }) => promoCodeClient.update(eventId, promoCodeId, promoCodeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_PROMO_CODES_QUERY_KEY]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_PROMO_CODE_QUERY_KEY]
      });
    }
  });
};
const EditPromoCodeModal = ({
  onClose,
  promoCodeId
}) => {
  const {
    eventId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const promoCodeQuery = useGetPromoCode(eventId, promoCodeId);
  const {
    data: event
  } = useGetEvent(eventId);
  const {
    data: promoCode
  } = promoCodeQuery;
  const form = useForm({
    initialValues: {
      code: "",
      discount: void 0,
      applicable_product_ids: [],
      expiry_date: void 0,
      discount_type: void 0,
      max_allowed_usages: void 0
    },
    validate: {
      code: hasLength({
        min: 3,
        max: 50
      }, i18n._(
        /*i18n*/
        {
          id: "ercTDX"
        }
      ))
    },
    validateInputOnBlur: true
  });
  const mutation = useUpdatePromoCode();
  const handleSubmit = (values) => {
    mutation.mutate({
      promoCodeId,
      eventId,
      promoCodeData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "70dYC8"
          }
        ));
        form.reset();
        onClose();
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  useEffect(() => {
    if (!promoCode || !event) {
      return;
    }
    form.setValues({
      code: promoCode.code,
      discount: promoCode.discount,
      applicable_product_ids: promoCode.applicable_product_ids ? promoCode.applicable_product_ids.map((id) => id.toString()) : [],
      expiry_date: utcToTz(promoCode.expiry_date, event.timezone),
      discount_type: promoCode.discount_type,
      discount_applies_to: promoCode.discount_applies_to ?? PromoCodeDiscountAppliesTo.EachProduct,
      max_allowed_usages: promoCode.max_allowed_usages || void 0
    });
  }, [promoCode, event]);
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "9BdS63"
    }
  ), children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
      /* @__PURE__ */ jsx(PromoCodeForm, { form }),
      /* @__PURE__ */ jsx(Button$1, { type: "submit", fullWidth: true, mt: "lg", disabled: mutation.isPending, children: mutation.isPending ? i18n._(
        /*i18n*/
        {
          id: "hqmXmc"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "9BdS63"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(LoadingMask, {})
  ] });
};
const useDeletePromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      promoCodeId,
      eventId
    }) => promoCodeClient.delete(eventId, promoCodeId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_PROMO_CODE_QUERY_KEY, variables.eventId, variables.promoCodeId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_PROMO_CODES_QUERY_KEY]
      });
    }
  });
};
const PromoCodeTable = ({
  event,
  promoCodes,
  openCreateModal
}) => {
  var _a;
  const [promoCodeId, setPromoCodeId] = useState();
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const deleteMutation = useDeletePromoCode();
  const clipboard = useClipboard({
    timeout: 500
  });
  const eventProducts = (_a = event.product_categories) == null ? void 0 : _a.flatMap((category) => category.products);
  const handleEditModal = (promoCodeId2) => {
    setPromoCodeId(promoCodeId2);
    openEditModal();
  };
  const handleDeleteCode = (promoCodeId2) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "YgRSEE"
      }
    ), () => {
      deleteMutation.mutate({
        eventId: event.id,
        promoCodeId: promoCodeId2
      });
    }, {
      confirm: i18n._(
        /*i18n*/
        {
          id: "cnGeoo"
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
  if (promoCodes.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "+Y976X"
      }
    ), imageHref: "/blank-slate/promo-codes.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "BZ9GWa"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
        /*i18n*/
        {
          id: "6kdXbW"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "EWPtMO"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "H6Ma8Z"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "s/0RpH"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "N0qXpE"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "KnN1Tu"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, {})
      ] }) }),
      /* @__PURE__ */ jsx(Table$1.Tbody, { children: promoCodes == null ? void 0 : promoCodes.map((code) => {
        var _a2, _b, _c;
        const Discount = () => {
          if ((code == null ? void 0 : code.discount) === 0) {
            return /* @__PURE__ */ jsx(Fragment, { children: i18n._(
              /*i18n*/
              {
                id: "EdQY6l"
              }
            ) });
          }
          if (code.discount_type === PromoCodeDiscountType.Fixed) {
            return /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Currency, { currency: event.currency, price: code.discount }),
              " ",
              code.discount_applies_to === PromoCodeDiscountAppliesTo.Order ? i18n._(
                /*i18n*/
                {
                  id: "+kvxv+"
                }
              ) : i18n._(
                /*i18n*/
                {
                  id: "NhuGd7"
                }
              )
            ] });
          }
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            code.discount,
            "%"
          ] });
        };
        const CopyCodeBadge = () => {
          const clipboard2 = useClipboard({
            timeout: 500
          });
          return /* @__PURE__ */ jsx(Badge, { variant: "outline", title: i18n._(
            /*i18n*/
            {
              id: "sby+1/"
            }
          ), style: {
            cursor: "pointer",
            alignItems: "center"
          }, rightSection: /* @__PURE__ */ jsx(Flex, { children: clipboard2.copied ? /* @__PURE__ */ jsx(IconCheck, { color: "green", size: "12" }) : /* @__PURE__ */ jsx(IconCopy, { size: "12" }) }), onClick: () => {
            clipboard2.copy(code.code.toUpperCase());
            showSuccess(`${code == null ? void 0 : code.code.toUpperCase()} ${i18n._(
              /*i18n*/
              {
                id: "T5rdis"
              }
            )}`);
          }, children: code.code.toUpperCase() });
        };
        return /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
          /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(CopyCodeBadge, {}) }),
          /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Badge, { color: "cyan", variant: "light", children: /* @__PURE__ */ jsx(Discount, {}) }) }),
          /* @__PURE__ */ jsxs(Table$1.Td, { children: [
            code.order_usage_count,
            " / ",
            code.max_allowed_usages ? code.max_allowed_usages : /* @__PURE__ */ jsx("span", { title: i18n._(
              /*i18n*/
              {
                id: "E0q9qH"
              }
            ), children: "∞" })
          ] }),
          /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsxs("div", { style: {
            cursor: "pointer"
          }, children: [
            ((_a2 = code.applicable_product_ids) == null ? void 0 : _a2.length) === 0 && /* @__PURE__ */ jsx(Badge, { variant: "light", color: "primary", children: i18n._(
              /*i18n*/
              {
                id: "cde2hc"
              }
            ) }),
            Number((_b = code.applicable_product_ids) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsx(Tooltip, { label: eventProducts == null ? void 0 : eventProducts.filter((product) => {
              var _a3, _b2;
              return (_b2 = (_a3 = code.applicable_product_ids) == null ? void 0 : _a3.map(Number)) == null ? void 0 : _b2.includes(Number(product.id));
            }).map((product) => {
              return /* @__PURE__ */ jsxs(Fragment, { children: [
                product.title,
                /* @__PURE__ */ jsx("br", {})
              ] });
            }), children: /* @__PURE__ */ jsxs(Badge, { variant: "light", color: "pink", children: [
              (_c = code.applicable_product_ids) == null ? void 0 : _c.length,
              " ",
              i18n._(
                /*i18n*/
                {
                  id: "ktyvbu"
                }
              )
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx(Table$1.Td, { children: code.expiry_date ? /* @__PURE__ */ jsx(Tooltip, { label: prettyDate(String(code.expiry_date), event.timezone), children: /* @__PURE__ */ jsx("span", { children: relativeDate(String(code.expiry_date)) }) }) : i18n._(
            /*i18n*/
            {
              id: "qqeAJM"
            }
          ) }),
          /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Group, { wrap: "nowrap", gap: 0, justify: "flex-end", children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
            /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "transparent", "data-testid": "promo-code-actions-button", children: /* @__PURE__ */ jsx(IconDotsVertical, {}) }) }),
            /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
              /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
                /*i18n*/
                {
                  id: "wckWOP"
                }
              ) }),
              /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), onClick: () => handleEditModal(code == null ? void 0 : code.id), children: i18n._(
                /*i18n*/
                {
                  id: "iFgaVN"
                }
              ) }),
              /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconCopy, { size: 14 }), onClick: () => {
                clipboard.copy(eventHomepageUrl(event) + `?promo_code=${code == null ? void 0 : code.code}`);
                showSuccess(i18n._(
                  /*i18n*/
                  {
                    id: "UtDm3q"
                  }
                ));
              }, children: i18n._(
                /*i18n*/
                {
                  id: "E6nRW7"
                }
              ) }),
              /* @__PURE__ */ jsx(Menu.Divider, {}),
              /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
                /*i18n*/
                {
                  id: "Zz6Cxn"
                }
              ) }),
              /* @__PURE__ */ jsx(Menu.Item, { color: "red", onClick: () => handleDeleteCode(code == null ? void 0 : code.id), leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), children: i18n._(
                /*i18n*/
                {
                  id: "WHf154"
                }
              ) })
            ] })
          ] }) }) })
        ] });
      }) })
    ] }),
    promoCodeId && editModalOpen && /* @__PURE__ */ jsx(EditPromoCodeModal, { promoCodeId, onClose: closeEditModal })
  ] });
};
const useCreatePromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      promoCodeData
    }) => promoCodeClient.create(eventId, promoCodeData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY, variables.eventId]
      });
      return queryClient.invalidateQueries({
        queryKey: [GET_EVENT_PROMO_CODES_QUERY_KEY]
      });
    }
  });
};
const CreatePromoCodeModal = ({
  onClose
}) => {
  const {
    eventId
  } = useParams();
  const errorHandler = useFormErrorResponseHandler();
  const mutation = useCreatePromoCode();
  const form = useForm({
    initialValues: {
      code: "",
      discount: void 0,
      applicable_product_ids: [],
      expiry_date: void 0,
      discount_type: PromoCodeDiscountType.None,
      discount_applies_to: PromoCodeDiscountAppliesTo.Order,
      max_allowed_usages: void 0
    },
    validate: {
      code: hasLength({
        min: 3,
        max: 50
      }, i18n._(
        /*i18n*/
        {
          id: "ercTDX"
        }
      ))
    },
    validateInputOnBlur: true
  });
  const handleSubmit = (values) => {
    mutation.mutate({
      eventId,
      promoCodeData: {
        ...values
      }
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "9mZEgt"
          }
        ));
        form.reset();
        onClose();
      },
      onError: (error) => errorHandler(form, error)
    });
  };
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "sYpiZP"
    }
  ), children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
    /* @__PURE__ */ jsx(PromoCodeForm, { form }),
    /* @__PURE__ */ jsx(Button$1, { type: "submit", fullWidth: true, mt: "lg", disabled: mutation.isPending, "data-testid": "promo-code-submit-button", children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "hqmXmc"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "sYpiZP"
      }
    ) })
  ] }) });
};
const PromoCodes = () => {
  var _a, _b;
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const promoCodesQuery = useGetEventPromoCodes(eventId, searchParams);
  const promoCodes = (_a = promoCodesQuery == null ? void 0 : promoCodesQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = promoCodesQuery == null ? void 0 : promoCodesQuery.data) == null ? void 0 : _b.meta;
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(PageBody, { children: [
      /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
        /*i18n*/
        {
          id: "Nc3l/D"
        }
      ), children: i18n._(
        /*i18n*/
        {
          id: "RVb8Fo"
        }
      ) }),
      /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
        /*i18n*/
        {
          id: "BiYOdA"
        }
      ), setSearchParams, searchParams }), filterComponent: (pagination == null ? void 0 : pagination.allowed_sorts) ? /* @__PURE__ */ jsx(SortSelector, { selected: searchParams.sortBy && searchParams.sortDirection ? searchParams.sortBy + ":" + searchParams.sortDirection : pagination.default_sort + ":" + pagination.default_sort_direction, options: pagination.allowed_sorts, onSortSelect: (key, sortDirection) => {
        setSearchParams({
          sortBy: key,
          sortDirection
        });
      } }) : void 0, resultCount: pagination == null ? void 0 : pagination.total, resultLabel: i18n._(
        /*i18n*/
        {
          id: "tZqL0q"
        }
      ), children: /* @__PURE__ */ jsx(Button, { color: "green", size: "sm", onClick: openCreateModal, rightSection: /* @__PURE__ */ jsx(IconPlus, {}), "data-testid": "promo-code-create-button", children: "Create" }) }),
      /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !promoCodes || !event }),
      promoCodes && event && /* @__PURE__ */ jsx(PromoCodeTable, { openCreateModal, event, promoCodes }),
      !!(promoCodes == null ? void 0 : promoCodes.length) && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
        pageNumber: value
      }), total: Number(pagination == null ? void 0 : pagination.last_page) })
    ] }),
    createModalOpen && /* @__PURE__ */ jsx(CreatePromoCodeModal, { onClose: closeCreateModal, isOpen: true })
  ] });
};
export {
  PromoCodes,
  PromoCodes as default
};

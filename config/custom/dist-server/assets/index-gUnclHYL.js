import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Select, MultiSelect } from "@mantine/core";
import { IconTicket } from "@tabler/icons-react";
import { f as ProductType } from "./types-CqPWB-a5.js";
const ProductSelector = ({
  label,
  placeholder,
  icon = /* @__PURE__ */ jsx(IconTicket, { size: "1rem" }),
  productCategories,
  form,
  productFieldName,
  tierFieldName = "product_price_id",
  includedProductTypes = [ProductType.Ticket, ProductType.General],
  excludedProductIds = [],
  multiSelect = true,
  showTierSelector = false,
  noProductsMessage = i18n._(
    /*i18n*/
    {
      id: "zK/+ef"
    }
  )
}) => {
  const excludedIds = excludedProductIds.map(String);
  const formattedData = productCategories == null ? void 0 : productCategories.map((category) => {
    var _a, _b;
    return {
      group: category.name,
      items: ((_b = (_a = category.products) == null ? void 0 : _a.filter((product) => includedProductTypes.includes(product.product_type) && !excludedIds.includes(String(product.id)))) == null ? void 0 : _b.map((product) => ({
        value: String(product.id),
        label: product.title
      }))) || []
    };
  });
  const eventProducts = productCategories == null ? void 0 : productCategories.flatMap((category) => category.products).filter((product) => product !== void 0);
  if (!eventProducts || eventProducts.length === 0) {
    return /* @__PURE__ */ jsx(Select, { label, placeholder: noProductsMessage, disabled: true, ...form.getInputProps(productFieldName) });
  }
  const TierSelector = () => {
    var _a, _b, _c;
    return /* @__PURE__ */ jsx(Fragment, { children: ((_a = eventProducts == null ? void 0 : eventProducts.find((product) => product.id == form.values.product_id)) == null ? void 0 : _a.type) === "TIERED" && /* @__PURE__ */ jsx(Select, { label: i18n._(
      /*i18n*/
      {
        id: "U/R4Ng"
      }
    ), mt: 20, placeholder: i18n._(
      /*i18n*/
      {
        id: "3oSV95"
      }
    ), ...form.getInputProps(tierFieldName), data: (_c = (_b = eventProducts == null ? void 0 : eventProducts.find((product) => product.id == form.values.product_id)) == null ? void 0 : _b.prices) == null ? void 0 : _c.map((price) => {
      return {
        value: String(price.id),
        label: String(price.label)
      };
    }) }) });
  };
  if (multiSelect) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(MultiSelect, { label, placeholder, multiple: true, data: formattedData, leftSection: icon, ...form.getInputProps(productFieldName) }),
      showTierSelector && /* @__PURE__ */ jsx(TierSelector, {})
    ] });
  } else {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Select, { label, placeholder, data: formattedData, leftSection: icon, ...form.getInputProps(productFieldName) }),
      showTierSelector && /* @__PURE__ */ jsx(TierSelector, {})
    ] });
  }
};
export {
  ProductSelector as P
};

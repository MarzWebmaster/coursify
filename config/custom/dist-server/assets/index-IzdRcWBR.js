import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { Popover } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
const Currency = ({
  price,
  currency = "USD",
  strikeThrough,
  className,
  freeLabel
}) => {
  if (!price) {
    return freeLabel ? freeLabel : formatCurrency(0, currency);
  }
  let formattedPrice = /* @__PURE__ */ jsx(Fragment, { children: formatCurrency(price, currency) });
  if (strikeThrough) {
    formattedPrice = /* @__PURE__ */ jsx("s", { children: formattedPrice });
  }
  return /* @__PURE__ */ jsx("span", { className, children: formattedPrice });
};
const getDisplayPrice = (price, taxAndServiceFeeDisplayType) => {
  const totalTaxAndFees = (price.tax_total || 0) + (price.fee_total || 0);
  return taxAndServiceFeeDisplayType === "INCLUSIVE" ? Number(price.price) + totalTaxAndFees : Number(price.price);
};
const getInclusiveFeeNote = (hasFees, hasTax) => {
  if (hasFees && hasTax) {
    return i18n._(
      /*i18n*/
      {
        id: "laL+R0"
      }
    );
  }
  return hasFees ? i18n._(
    /*i18n*/
    {
      id: "5gTmFD"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "cXeh90"
    }
  );
};
const getExclusiveFeeNote = (formattedAmount, hasFees, hasTax) => {
  if (hasFees && hasTax) {
    return i18n._(
      /*i18n*/
      {
        id: "9y8S9C",
        values: {
          formattedAmount
        }
      }
    );
  }
  return hasFees ? i18n._(
    /*i18n*/
    {
      id: "aiUoiS",
      values: {
        formattedAmount
      }
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "xdIBoz",
      values: {
        formattedAmount
      }
    }
  );
};
const ProductPriceDisplay = ({
  product,
  price,
  currency = "USD",
  className,
  freeLabel,
  taxAndServiceFeeDisplayType = "exclusive",
  feeDisplay = "popover"
}) => {
  let displayPrice = price.price;
  const totalTaxAndFees = (price.tax_total || 0) + (price.fee_total || 0);
  if (feeDisplay === "none") {
    const inclusiveAwarePrice = getDisplayPrice(price, taxAndServiceFeeDisplayType);
    if (inclusiveAwarePrice === 0 && totalTaxAndFees === 0) {
      return /* @__PURE__ */ jsx("span", { className, children: freeLabel || i18n._(
        /*i18n*/
        {
          id: "2POOFK"
        }
      ) });
    }
    return /* @__PURE__ */ jsx("span", { className, children: /* @__PURE__ */ jsx("span", { className: "hi-price-amount", children: formatCurrency(inclusiveAwarePrice, currency) }) });
  }
  const orderedFees = [...product.taxes || []].sort((a, b) => a.type.localeCompare(b.type));
  const feeDescriptions = orderedFees.map((fee) => fee.name).join(", ");
  const getTextAppendage = () => {
    if (taxAndServiceFeeDisplayType === "INCLUSIVE") {
      displayPrice += totalTaxAndFees;
      return `incl. ${feeDescriptions}`;
    } else {
      const formattedFees = formatCurrency(totalTaxAndFees, currency);
      return `excl. ${formattedFees} ${feeDescriptions}`;
    }
  };
  const appendedText = totalTaxAndFees === 0 ? "" : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsxs("span", { style: {
      cursor: "pointer"
    }, children: [
      " ",
      /* @__PURE__ */ jsx(IconInfoCircle, { size: 18 }),
      " "
    ] }) }),
    /* @__PURE__ */ jsx(Popover.Dropdown, { children: getTextAppendage() })
  ] }) });
  const formattedPrice = formatCurrency(displayPrice, currency);
  if (displayPrice === 0 && totalTaxAndFees === 0) {
    return /* @__PURE__ */ jsx("span", { className, children: freeLabel || i18n._(
      /*i18n*/
      {
        id: "2POOFK"
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("div", { children: formattedPrice }),
    /* @__PURE__ */ jsx("div", { children: appendedText })
  ] });
};
export {
  Currency as C,
  ProductPriceDisplay as P,
  getExclusiveFeeNote as a,
  getDisplayPrice as b,
  getInclusiveFeeNote as g
};

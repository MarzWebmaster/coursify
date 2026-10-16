import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState } from "react";
import { Collapse, Popover } from "@mantine/core";
import { IconChevronDown, IconCalendarEvent, IconTag, IconInfoCircle, IconShieldCheck } from "@tabler/icons-react";
import classNames from "classnames";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { p as prettyDate } from "./dates-CbVpwZeX.js";
import { r as resolveEventLocation } from "./effectiveLocation-BzDgAlu_.js";
const stepTitleBlock = "_stepTitleBlock_1gzp6_1";
const title = "_title_1gzp6_8";
const subtitle = "_subtitle_1gzp6_22";
const classes$1 = {
  stepTitleBlock,
  title,
  subtitle
};
const CheckoutStepTitle = ({
  title: title2,
  subtitle: subtitle2
}) => /* @__PURE__ */ jsxs("div", { className: classes$1.stepTitleBlock, children: [
  /* @__PURE__ */ jsx("h2", { className: classes$1.title, children: title2 }),
  subtitle2 && /* @__PURE__ */ jsx("p", { className: classes$1.subtitle, children: subtitle2 })
] });
const inlineOrderSummary = "_inlineOrderSummary_1jb9a_1";
const header = "_header_1jb9a_10";
const headerTitle = "_headerTitle_1jb9a_23";
const headerRight = "_headerRight_1jb9a_29";
const headerTotal = "_headerTotal_1jb9a_35";
const chevron = "_chevron_1jb9a_41";
const chevronRotated = "_chevronRotated_1jb9a_46";
const content = "_content_1jb9a_50";
const eventInfo = "_eventInfo_1jb9a_55";
const eventImage = "_eventImage_1jb9a_61";
const eventImagePlaceholder = "_eventImagePlaceholder_1jb9a_74";
const eventDetails = "_eventDetails_1jb9a_84";
const eventTitle = "_eventTitle_1jb9a_92";
const eventMeta = "_eventMeta_1jb9a_103";
const divider = "_divider_1jb9a_113";
const lineItems = "_lineItems_1jb9a_118";
const lineItem = "_lineItem_1jb9a_118";
const lineItemLeft = "_lineItemLeft_1jb9a_131";
const lineItemName = "_lineItemName_1jb9a_139";
const lineItemQuantity = "_lineItemQuantity_1jb9a_153";
const lineItemPriceWrapper = "_lineItemPriceWrapper_1jb9a_159";
const lineItemPriceOriginal = "_lineItemPriceOriginal_1jb9a_167";
const lineItemPrice = "_lineItemPrice_1jb9a_159";
const promoCode = "_promoCode_1jb9a_179";
const promoCodeLeft = "_promoCodeLeft_1jb9a_190";
const promoCodeDiscount = "_promoCodeDiscount_1jb9a_199";
const totals = "_totals_1jb9a_205";
const totalsRow = "_totalsRow_1jb9a_209";
const totalsLabel = "_totalsLabel_1jb9a_218";
const totalsLabelWithInfo = "_totalsLabelWithInfo_1jb9a_223";
const infoIcon = "_infoIcon_1jb9a_231";
const breakdownList = "_breakdownList_1jb9a_245";
const breakdownItem = "_breakdownItem_1jb9a_251";
const breakdownName = "_breakdownName_1jb9a_258";
const breakdownValue = "_breakdownValue_1jb9a_265";
const totalsValue = "_totalsValue_1jb9a_272";
const totalsValueFree = "_totalsValueFree_1jb9a_277";
const totalsRowFinal = "_totalsRowFinal_1jb9a_281";
const totalsFinalLabel = "_totalsFinalLabel_1jb9a_287";
const totalsFinalValue = "_totalsFinalValue_1jb9a_293";
const totalsCurrency = "_totalsCurrency_1jb9a_299";
const buyerProtection = "_buyerProtection_1jb9a_306";
const buyerProtectionIcon = "_buyerProtectionIcon_1jb9a_317";
const buyerProtectionText = "_buyerProtectionText_1jb9a_323";
const buyerProtectionTitle = "_buyerProtectionTitle_1jb9a_329";
const buyerProtectionSubtitle = "_buyerProtectionSubtitle_1jb9a_335";
const classes = {
  inlineOrderSummary,
  header,
  headerTitle,
  headerRight,
  headerTotal,
  chevron,
  chevronRotated,
  content,
  eventInfo,
  eventImage,
  eventImagePlaceholder,
  eventDetails,
  eventTitle,
  eventMeta,
  divider,
  lineItems,
  lineItem,
  lineItemLeft,
  lineItemName,
  lineItemQuantity,
  lineItemPriceWrapper,
  lineItemPriceOriginal,
  lineItemPrice,
  promoCode,
  promoCodeLeft,
  promoCodeDiscount,
  totals,
  totalsRow,
  totalsLabel,
  totalsLabelWithInfo,
  infoIcon,
  breakdownList,
  breakdownItem,
  breakdownName,
  breakdownValue,
  totalsValue,
  totalsValueFree,
  totalsRowFinal,
  totalsFinalLabel,
  totalsFinalValue,
  totalsCurrency,
  buyerProtection,
  buyerProtectionIcon,
  buyerProtectionText,
  buyerProtectionTitle,
  buyerProtectionSubtitle
};
const InlineOrderSummary = ({
  event,
  order,
  defaultExpanded = true,
  showBuyerProtection = true
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
  const [expanded, setExpanded] = useState(defaultExpanded);
  const totalAmount = order.total_refunded ? order.total_gross - order.total_refunded : order.total_gross;
  const coverImage = (_a = event == null ? void 0 : event.images) == null ? void 0 : _a.find((image) => image.type === "EVENT_COVER");
  const orderOccurrence = (_c = (_b = order.order_items) == null ? void 0 : _b[0]) == null ? void 0 : _c.event_occurrence;
  const effective = resolveEventLocation(event, orderOccurrence);
  const venueName = (effective == null ? void 0 : effective.type) === LocationType.InPerson ? ((_d = effective.location) == null ? void 0 : _d.name) || ((_f = (_e = effective.location) == null ? void 0 : _e.structured_address) == null ? void 0 : _f.venue_name) || null : null;
  const city = (effective == null ? void 0 : effective.type) === LocationType.InPerson ? ((_h = (_g = effective.location) == null ? void 0 : _g.structured_address) == null ? void 0 : _h.city) ?? null : null;
  const location = city || venueName || null;
  const totalFee = ((_j = (_i = order.taxes_and_fees_rollup) == null ? void 0 : _i.fees) == null ? void 0 : _j.reduce((sum, fee) => sum + fee.value, 0)) || 0;
  const totalTax = ((_l = (_k = order.taxes_and_fees_rollup) == null ? void 0 : _k.taxes) == null ? void 0 : _l.reduce((sum, tax) => sum + tax.value, 0)) || 0;
  const totalDiscount = ((_m = order.order_items) == null ? void 0 : _m.reduce((sum, item) => {
    if (item.total_before_discount && item.total_before_additions) {
      return sum + (item.total_before_discount - item.total_before_additions);
    }
    return sum;
  }, 0)) || 0;
  return /* @__PURE__ */ jsxs("div", { className: classes.inlineOrderSummary, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.header, onClick: () => setExpanded(!expanded), role: "button", "aria-expanded": expanded, tabIndex: 0, onKeyDown: (e) => e.key === "Enter" && setExpanded(!expanded), children: [
      /* @__PURE__ */ jsx("span", { className: classes.headerTitle, children: i18n._(
        /*i18n*/
        {
          id: "GX6dZv"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: classes.headerRight, children: [
        /* @__PURE__ */ jsxs("span", { className: classes.headerTotal, children: [
          formatCurrency(totalAmount, order.currency),
          " ",
          order.currency
        ] }),
        /* @__PURE__ */ jsx(IconChevronDown, { size: 20, className: classNames(classes.chevron, {
          [classes.chevronRotated]: expanded
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { expanded, children: /* @__PURE__ */ jsxs("div", { className: classes.content, children: [
      /* @__PURE__ */ jsxs("div", { className: classes.eventInfo, children: [
        /* @__PURE__ */ jsx("div", { className: classes.eventImage, children: coverImage ? /* @__PURE__ */ jsx("img", { src: coverImage.url, alt: event.title }) : /* @__PURE__ */ jsx("div", { className: classes.eventImagePlaceholder, children: /* @__PURE__ */ jsx(IconCalendarEvent, { size: 24 }) }) }),
        /* @__PURE__ */ jsxs("div", { className: classes.eventDetails, children: [
          /* @__PURE__ */ jsx("div", { className: classes.eventTitle, children: event.title }),
          /* @__PURE__ */ jsx("div", { className: classes.eventMeta, children: prettyDate(((_p = (_o = (_n = order.order_items) == null ? void 0 : _n[0]) == null ? void 0 : _o.event_occurrence) == null ? void 0 : _p.start_date) || event.start_date, event.timezone, false) }),
          ((_s = (_r = (_q = order.order_items) == null ? void 0 : _q[0]) == null ? void 0 : _r.event_occurrence) == null ? void 0 : _s.label) && /* @__PURE__ */ jsx("div", { className: classes.eventMeta, children: order.order_items[0].event_occurrence.label }),
          location && /* @__PURE__ */ jsx("div", { className: classes.eventMeta, children: location })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.divider }),
      /* @__PURE__ */ jsx("div", { className: classes.lineItems, children: (_t = order.order_items) == null ? void 0 : _t.map((item) => /* @__PURE__ */ jsxs("div", { className: classes.lineItem, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.lineItemLeft, children: [
          /* @__PURE__ */ jsx("span", { title: item.item_name, className: classes.lineItemName, children: item.item_name }),
          /* @__PURE__ */ jsxs("span", { className: classes.lineItemQuantity, children: [
            "× ",
            item.quantity
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.lineItemPriceWrapper, children: [
          !!item.price_before_discount && /* @__PURE__ */ jsx("span", { className: classes.lineItemPriceOriginal, children: formatCurrency(item.price_before_discount * item.quantity, order.currency) }),
          /* @__PURE__ */ jsx("span", { className: classes.lineItemPrice, children: formatCurrency(item.price * item.quantity, order.currency) })
        ] })
      ] }, item.id)) }),
      order.promo_code && totalDiscount > 0 && /* @__PURE__ */ jsxs("div", { className: classes.promoCode, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.promoCodeLeft, children: [
          /* @__PURE__ */ jsx(IconTag, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: order.promo_code })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: classes.promoCodeDiscount, children: [
          "-",
          formatCurrency(totalDiscount, order.currency)
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes.divider }),
      /* @__PURE__ */ jsxs("div", { className: classes.totals, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.totalsRow, children: [
          /* @__PURE__ */ jsx("span", { className: classes.totalsLabel, children: i18n._(
            /*i18n*/
            {
              id: "X2rrlw"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: classes.totalsValue, children: formatCurrency(order.total_before_additions, order.currency) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.totalsRow, children: [
          /* @__PURE__ */ jsxs("span", { className: classes.totalsLabelWithInfo, children: [
            /* @__PURE__ */ jsx("span", { children: i18n._(
              /*i18n*/
              {
                id: "/mfICu"
              }
            ) }),
            ((_u = order.taxes_and_fees_rollup) == null ? void 0 : _u.fees) && order.taxes_and_fees_rollup.fees.length > 0 && /* @__PURE__ */ jsxs(Popover, { position: "top", withArrow: true, shadow: "sm", width: 220, children: [
              /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsx("span", { className: classes.infoIcon, children: /* @__PURE__ */ jsx(IconInfoCircle, { size: 14 }) }) }),
              /* @__PURE__ */ jsx(Popover.Dropdown, { children: /* @__PURE__ */ jsx("div", { className: classes.breakdownList, children: order.taxes_and_fees_rollup.fees.map((fee, index) => /* @__PURE__ */ jsxs("div", { className: classes.breakdownItem, children: [
                /* @__PURE__ */ jsx("span", { className: classes.breakdownName, children: fee.name }),
                /* @__PURE__ */ jsx("span", { className: classes.breakdownValue, children: formatCurrency(fee.value, order.currency) })
              ] }, index)) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: classNames(classes.totalsValue, {
            [classes.totalsValueFree]: totalFee === 0
          }), children: formatCurrency(totalFee, order.currency) })
        ] }),
        totalTax > 0 && /* @__PURE__ */ jsxs("div", { className: classes.totalsRow, children: [
          /* @__PURE__ */ jsxs("span", { className: classes.totalsLabelWithInfo, children: [
            /* @__PURE__ */ jsx("span", { children: i18n._(
              /*i18n*/
              {
                id: "ZowkxF"
              }
            ) }),
            ((_v = order.taxes_and_fees_rollup) == null ? void 0 : _v.taxes) && order.taxes_and_fees_rollup.taxes.length > 0 && /* @__PURE__ */ jsxs(Popover, { position: "top", withArrow: true, shadow: "sm", width: 220, children: [
              /* @__PURE__ */ jsx(Popover.Target, { children: /* @__PURE__ */ jsx("span", { className: classes.infoIcon, children: /* @__PURE__ */ jsx(IconInfoCircle, { size: 14 }) }) }),
              /* @__PURE__ */ jsx(Popover.Dropdown, { children: /* @__PURE__ */ jsx("div", { className: classes.breakdownList, children: order.taxes_and_fees_rollup.taxes.map((tax, index) => /* @__PURE__ */ jsxs("div", { className: classes.breakdownItem, children: [
                /* @__PURE__ */ jsx("span", { className: classes.breakdownName, children: tax.name }),
                /* @__PURE__ */ jsx("span", { className: classes.breakdownValue, children: formatCurrency(tax.value, order.currency) })
              ] }, index)) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: classes.totalsValue, children: formatCurrency(totalTax, order.currency) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classNames(classes.totalsRow, classes.totalsRowFinal), children: [
          /* @__PURE__ */ jsx("span", { className: classes.totalsFinalLabel, children: i18n._(
            /*i18n*/
            {
              id: "72c5Qo"
            }
          ) }),
          /* @__PURE__ */ jsxs("span", { className: classes.totalsFinalValue, children: [
            formatCurrency(totalAmount, order.currency),
            /* @__PURE__ */ jsx("span", { className: classes.totalsCurrency, children: order.currency })
          ] })
        ] })
      ] }),
      showBuyerProtection && order.is_payment_required && /* @__PURE__ */ jsxs("div", { className: classes.buyerProtection, children: [
        /* @__PURE__ */ jsx(IconShieldCheck, { size: 20, className: classes.buyerProtectionIcon }),
        /* @__PURE__ */ jsxs("div", { className: classes.buyerProtectionText, children: [
          /* @__PURE__ */ jsx("span", { className: classes.buyerProtectionTitle, children: i18n._(
            /*i18n*/
            {
              id: "Mck5ht"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: classes.buyerProtectionSubtitle, children: i18n._(
            /*i18n*/
            {
              id: "WWYHKD"
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  CheckoutStepTitle as C,
  InlineOrderSummary as I
};

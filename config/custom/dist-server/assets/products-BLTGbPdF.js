import { P as ProductPriceType } from "./types-CqPWB-a5.js";
const getAttendeeProductTitle = (attendee, product) => {
  var _a;
  if (product.type !== ProductPriceType.Tiered) {
    return product.title;
  }
  const productPrice = (_a = product.prices) == null ? void 0 : _a.find((price) => price.id === attendee.product_price_id);
  return product.title + ((productPrice == null ? void 0 : productPrice.label) ? ` - ${productPrice.label}` : "");
};
const getAttendeeProductPrice = (attendee, product) => {
  var _a;
  const productPrice = (_a = product.prices) == null ? void 0 : _a.find((price) => price.id === attendee.product_price_id);
  return (productPrice == null ? void 0 : productPrice.price) ?? 0;
};
export {
  getAttendeeProductPrice as a,
  getAttendeeProductTitle as g
};

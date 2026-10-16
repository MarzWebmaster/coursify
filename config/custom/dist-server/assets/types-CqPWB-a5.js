var EventStatus = /* @__PURE__ */ ((EventStatus2) => {
  EventStatus2["DRAFT"] = "DRAFT";
  EventStatus2["LIVE"] = "LIVE";
  EventStatus2["PAUSED"] = "PAUSED";
  EventStatus2["ARCHIVED"] = "ARCHIVED";
  return EventStatus2;
})(EventStatus || {});
var OrganizerStatus = /* @__PURE__ */ ((OrganizerStatus2) => {
  OrganizerStatus2["DRAFT"] = "DRAFT";
  OrganizerStatus2["LIVE"] = "LIVE";
  OrganizerStatus2["ARCHIVED"] = "ARCHIVED";
  return OrganizerStatus2;
})(OrganizerStatus || {});
var EventLifecycleStatus = /* @__PURE__ */ ((EventLifecycleStatus2) => {
  EventLifecycleStatus2["ONGOING"] = "ONGOING";
  EventLifecycleStatus2["UPCOMING"] = "UPCOMING";
  EventLifecycleStatus2["ENDED"] = "ENDED";
  return EventLifecycleStatus2;
})(EventLifecycleStatus || {});
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2["SINGLE"] = "SINGLE";
  EventType2["RECURRING"] = "RECURRING";
  return EventType2;
})(EventType || {});
var LocationType = /* @__PURE__ */ ((LocationType2) => {
  LocationType2["InPerson"] = "IN_PERSON";
  LocationType2["Online"] = "ONLINE";
  return LocationType2;
})(LocationType || {});
var EventOccurrenceStatus = /* @__PURE__ */ ((EventOccurrenceStatus2) => {
  EventOccurrenceStatus2["ACTIVE"] = "ACTIVE";
  EventOccurrenceStatus2["CANCELLED"] = "CANCELLED";
  EventOccurrenceStatus2["SOLD_OUT"] = "SOLD_OUT";
  return EventOccurrenceStatus2;
})(EventOccurrenceStatus || {});
var ProductPriceType = /* @__PURE__ */ ((ProductPriceType2) => {
  ProductPriceType2["Paid"] = "PAID";
  ProductPriceType2["Donation"] = "DONATION";
  ProductPriceType2["Free"] = "FREE";
  ProductPriceType2["Tiered"] = "TIERED";
  return ProductPriceType2;
})(ProductPriceType || {});
var ProductType = /* @__PURE__ */ ((ProductType2) => {
  ProductType2["Ticket"] = "TICKET";
  ProductType2["General"] = "GENERAL";
  return ProductType2;
})(ProductType || {});
var QuestionType = /* @__PURE__ */ ((QuestionType2) => {
  QuestionType2["ADDRESS"] = "ADDRESS";
  QuestionType2["SINGLE_LINE_TEXT"] = "SINGLE_LINE_TEXT";
  QuestionType2["MULTI_LINE_TEXT"] = "MULTI_LINE_TEXT";
  QuestionType2["CHECKBOX"] = "CHECKBOX";
  QuestionType2["RADIO"] = "RADIO";
  QuestionType2["DROPDOWN"] = "DROPDOWN";
  QuestionType2["DATE"] = "DATE";
  return QuestionType2;
})(QuestionType || {});
var QuestionBelongsToType = /* @__PURE__ */ ((QuestionBelongsToType2) => {
  QuestionBelongsToType2["PRODUCT"] = "PRODUCT";
  QuestionBelongsToType2["ORDER"] = "ORDER";
  return QuestionBelongsToType2;
})(QuestionBelongsToType || {});
var QueryFilterOperator = /* @__PURE__ */ ((QueryFilterOperator2) => {
  QueryFilterOperator2["Equals"] = "eq";
  QueryFilterOperator2["NotEquals"] = "ne";
  QueryFilterOperator2["GreaterThan"] = "gt";
  QueryFilterOperator2["GreaterThanOrEquals"] = "gte";
  QueryFilterOperator2["LessThan"] = "lt";
  QueryFilterOperator2["LessThanOrEquals"] = "lte";
  QueryFilterOperator2["Like"] = "like";
  QueryFilterOperator2["NotLike"] = "not_like";
  QueryFilterOperator2["In"] = "in";
  return QueryFilterOperator2;
})(QueryFilterOperator || {});
var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2["IndividualAttendees"] = "INDIVIDUAL_ATTENDEES";
  MessageType2["OrderOwner"] = "ORDER_OWNER";
  MessageType2["TicketHolders"] = "TICKET_HOLDERS";
  MessageType2["AllAttendees"] = "ALL_ATTENDEES";
  MessageType2["OrderOwnersWithProduct"] = "ORDER_OWNERS_WITH_PRODUCT";
  return MessageType2;
})(MessageType || {});
var PromoCodeDiscountType = /* @__PURE__ */ ((PromoCodeDiscountType2) => {
  PromoCodeDiscountType2["Percentage"] = "PERCENTAGE";
  PromoCodeDiscountType2["Fixed"] = "FIXED";
  PromoCodeDiscountType2["None"] = "NONE";
  return PromoCodeDiscountType2;
})(PromoCodeDiscountType || {});
var PromoCodeDiscountAppliesTo = /* @__PURE__ */ ((PromoCodeDiscountAppliesTo2) => {
  PromoCodeDiscountAppliesTo2["Order"] = "ORDER";
  PromoCodeDiscountAppliesTo2["EachProduct"] = "EACH_PRODUCT";
  return PromoCodeDiscountAppliesTo2;
})(PromoCodeDiscountAppliesTo || {});
var TaxAndFeeType = /* @__PURE__ */ ((TaxAndFeeType2) => {
  TaxAndFeeType2["Tax"] = "TAX";
  TaxAndFeeType2["Fee"] = "FEE";
  return TaxAndFeeType2;
})(TaxAndFeeType || {});
var TaxAndFeeCalculationType = /* @__PURE__ */ ((TaxAndFeeCalculationType2) => {
  TaxAndFeeCalculationType2["Percentage"] = "PERCENTAGE";
  TaxAndFeeCalculationType2["Fixed"] = "FIXED";
  return TaxAndFeeCalculationType2;
})(TaxAndFeeCalculationType || {});
var ReportTypes = /* @__PURE__ */ ((ReportTypes2) => {
  ReportTypes2["ProductSales"] = "product_sales";
  ReportTypes2["DailySales"] = "daily_sales_report";
  ReportTypes2["PromoCodes"] = "promo_codes_report";
  ReportTypes2["OccurrenceSummary"] = "occurrence_summary";
  return ReportTypes2;
})(ReportTypes || {});
var OrganizerReportTypes = /* @__PURE__ */ ((OrganizerReportTypes2) => {
  OrganizerReportTypes2["RevenueSummary"] = "revenue_summary";
  OrganizerReportTypes2["EventsPerformance"] = "events_performance";
  OrganizerReportTypes2["TaxSummary"] = "tax_summary";
  OrganizerReportTypes2["CheckInSummary"] = "check_in_summary";
  OrganizerReportTypes2["PlatformFees"] = "platform_fees";
  return OrganizerReportTypes2;
})(OrganizerReportTypes || {});
var WaitlistEntryStatus = /* @__PURE__ */ ((WaitlistEntryStatus2) => {
  WaitlistEntryStatus2["Waiting"] = "WAITING";
  WaitlistEntryStatus2["Offered"] = "OFFERED";
  WaitlistEntryStatus2["Purchased"] = "PURCHASED";
  WaitlistEntryStatus2["Cancelled"] = "CANCELLED";
  WaitlistEntryStatus2["OfferExpired"] = "OFFER_EXPIRED";
  return WaitlistEntryStatus2;
})(WaitlistEntryStatus || {});
export {
  EventType as E,
  LocationType as L,
  MessageType as M,
  OrganizerStatus as O,
  ProductPriceType as P,
  QueryFilterOperator as Q,
  ReportTypes as R,
  TaxAndFeeCalculationType as T,
  WaitlistEntryStatus as W,
  TaxAndFeeType as a,
  EventStatus as b,
  OrganizerReportTypes as c,
  EventOccurrenceStatus as d,
  EventLifecycleStatus as e,
  ProductType as f,
  PromoCodeDiscountType as g,
  PromoCodeDiscountAppliesTo as h,
  QuestionType as i,
  QuestionBelongsToType as j
};

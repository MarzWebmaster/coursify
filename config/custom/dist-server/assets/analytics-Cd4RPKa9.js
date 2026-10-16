const AnalyticsEvents = {
  SIGNUP_COMPLETED: "signup_completed",
  ORGANIZER_CREATED: "organizer_created",
  FIRST_EVENT_CREATED: "first_event_created",
  EVENT_PUBLISHED: "event_published",
  PURCHASE_COMPLETED_PAID: "purchase_completed_paid",
  PURCHASE_COMPLETED_OFFLINE: "purchase_completed_offline",
  PURCHASE_COMPLETED_FREE: "purchase_completed_free"
};
function trackEvent(eventName, options) {
  var _a;
  if (typeof window === "undefined") {
    return;
  }
  if ((_a = window.fathom) == null ? void 0 : _a.trackEvent) {
    const fathomOptions = (options == null ? void 0 : options.value) ? {
      _value: options.value
    } : void 0;
    window.fathom.trackEvent(eventName, fathomOptions);
  }
}
export {
  AnalyticsEvents as A,
  trackEvent as t
};

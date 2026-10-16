import { f as api, q as queryParamsHelper, t as publicApi } from "../entry.server.js";
const waitlistClient = {
  all: async (eventId, pagination) => {
    const response = await api.get(`events/${eventId}/waitlist` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  stats: async (eventId, eventOccurrenceId) => {
    const query = new URLSearchParams();
    if (eventOccurrenceId) {
      query.set("event_occurrence_id", String(eventOccurrenceId));
    }
    const queryString = query.toString();
    const response = await api.get(`events/${eventId}/waitlist/stats${queryString ? `?${queryString}` : ""}`);
    return response.data;
  },
  offerNext: async (eventId, productPriceId, quantity = 1, eventOccurrenceId) => {
    const response = await api.post(`events/${eventId}/waitlist/offer-next`, {
      product_price_id: productPriceId,
      quantity,
      event_occurrence_id: eventOccurrenceId
    });
    return response.data;
  },
  offerEntry: async (eventId, entryId) => {
    const response = await api.post(`events/${eventId}/waitlist/offer-next`, {
      entry_id: entryId
    });
    return response.data;
  },
  remove: async (eventId, entryId) => {
    return api.delete(`events/${eventId}/waitlist/${entryId}`);
  }
};
const waitlistClientPublic = {
  join: async (eventId, data) => {
    const response = await publicApi.post(`events/${eventId}/waitlist`, data);
    return response.data;
  },
  cancel: async (eventId, cancelToken) => {
    return publicApi.delete(`events/${eventId}/waitlist/${cancelToken}`);
  }
};
export {
  waitlistClient as a,
  waitlistClientPublic as w
};

import { f as api, q as queryParamsHelper, t as publicApi } from "../entry.server.js";
const eventOccurrenceClient = {
  all: async (eventId, pagination, options = {}) => {
    const queryString = queryParamsHelper.buildQueryString(pagination);
    const separator = queryString.includes("?") ? "&" : "?";
    const url = `events/${eventId}/occurrences` + queryString + (options.includeStats === false ? `${separator}include_stats=false` : "");
    const response = await api.get(url);
    return response.data;
  },
  get: async (eventId, occurrenceId) => {
    const response = await api.get(`events/${eventId}/occurrences/${occurrenceId}`);
    return response.data;
  },
  create: async (eventId, data) => {
    const response = await api.post(`events/${eventId}/occurrences`, data);
    return response.data;
  },
  update: async (eventId, occurrenceId, data) => {
    const response = await api.put(`events/${eventId}/occurrences/${occurrenceId}`, data);
    return response.data;
  },
  delete: async (eventId, occurrenceId) => {
    const response = await api.delete(`events/${eventId}/occurrences/${occurrenceId}`);
    return response.data;
  },
  cancel: async (eventId, occurrenceId, refundOrders = false) => {
    const response = await api.post(`events/${eventId}/occurrences/${occurrenceId}/cancel`, {
      refund_orders: refundOrders
    });
    return response.data;
  },
  reactivate: async (eventId, occurrenceId) => {
    const response = await api.post(`events/${eventId}/occurrences/${occurrenceId}/reactivate`, {});
    return response.data;
  },
  generate: async (eventId, data) => {
    const response = await api.post(`events/${eventId}/occurrences/generate`, data);
    return response.data;
  },
  getGenerationStatus: async (eventId, jobUuid) => {
    const response = await api.get(`events/${eventId}/occurrences/generate/status?job_uuid=${jobUuid}`);
    return response.data;
  },
  bulkUpdate: async (eventId, data) => {
    const response = await api.post(`events/${eventId}/occurrences/bulk-update`, data);
    return response.data;
  },
  getPriceOverrides: async (eventId, occurrenceId) => {
    const response = await api.get(`events/${eventId}/occurrences/${occurrenceId}/price-overrides`);
    return response.data;
  },
  upsertPriceOverride: async (eventId, occurrenceId, data) => {
    const response = await api.put(`events/${eventId}/occurrences/${occurrenceId}/price-overrides`, data);
    return response.data;
  },
  deletePriceOverride: async (eventId, occurrenceId, overrideId) => {
    const response = await api.delete(`events/${eventId}/occurrences/${occurrenceId}/price-overrides/${overrideId}`);
    return response.data;
  },
  getProductVisibility: async (eventId, occurrenceId) => {
    const response = await api.get(`events/${eventId}/occurrences/${occurrenceId}/product-visibility`);
    return response.data;
  },
  updateProductVisibility: async (eventId, occurrenceId, productIds) => {
    const response = await api.put(`events/${eventId}/occurrences/${occurrenceId}/product-visibility`, {
      product_ids: productIds
    });
    return response.data;
  }
};
const eventOccurrenceClientPublic = {
  all: async (eventId, startDateFrom, startDateTo) => {
    const params = new URLSearchParams({
      start_date_from: startDateFrom,
      start_date_to: startDateTo
    });
    const response = await publicApi.get(`events/${eventId}/occurrences?${params.toString()}`);
    return response.data;
  }
};
export {
  eventOccurrenceClientPublic as a,
  eventOccurrenceClient as e
};

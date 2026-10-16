import { t as publicApi, f as api, q as queryParamsHelper } from "../entry.server.js";
const orderClient = {
  all: async (eventId, pagination) => {
    const response = await api.get(`events/${eventId}/orders` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  findByID: async (eventId, orderId) => {
    const response = await api.get(`events/${eventId}/orders/${orderId}`);
    return response.data;
  },
  refund: async (eventId, orderId, refundPayload) => {
    const response = await api.post("events/" + eventId + "/orders/" + orderId + "/refund", refundPayload);
    return response.data;
  },
  resendConfirmation: async (eventId, orderId) => {
    const response = await api.post("events/" + eventId + "/orders/" + orderId + "/resend_confirmation");
    return response.data;
  },
  cancel: async (eventId, orderId, refund) => {
    const response = await api.post("events/" + eventId + "/orders/" + orderId + "/cancel", {
      refund: refund ?? false
    });
    return response.data;
  },
  exportOrders: async (eventId, eventOccurrenceId) => {
    const body = eventOccurrenceId ? {
      event_occurrence_id: eventOccurrenceId
    } : {};
    const response = await api.post(`events/${eventId}/orders/export`, body, {
      responseType: "blob"
    });
    return new Blob([response.data]);
  },
  markAsPaid: async (eventId, orderId) => {
    const response = await api.post("events/" + eventId + "/orders/" + orderId + "/mark-as-paid");
    return response.data;
  },
  downloadInvoice: async (eventId, orderId) => {
    const response = await api.get(`events/${eventId}/orders/${orderId}/invoice`, {
      responseType: "blob"
    });
    return new Blob([response.data]);
  },
  editOrder: async (eventId, orderId, payload) => {
    const response = await api.put(`events/${eventId}/orders/${orderId}`, payload);
    return response.data;
  }
};
const orderClientPublic = {
  create: async (eventId, createOrderPayload) => {
    const response = await publicApi.post("events/" + eventId + "/order", createOrderPayload);
    return response.data;
  },
  findByShortId: async (eventId, orderShortId, includes = []) => {
    const query = new URLSearchParams();
    if (includes.length > 0) {
      query.append("include", includes.join(","));
    }
    const response = await publicApi.get(`events/${eventId}/order/${orderShortId}?${query.toString()}`);
    return response.data;
  },
  findOrderStripePaymentIntent: async (eventId, orderShortId) => {
    return await publicApi.get(`events/${eventId}/order/${orderShortId}/stripe/payment_intent`);
  },
  createStripePaymentIntent: async (eventId, orderShortId) => {
    const response = await publicApi.post(`events/${eventId}/order/${orderShortId}/stripe/payment_intent`);
    return response.data;
  },
  finaliseOrder: async (eventId, orderShortId, payload) => {
    const response = await publicApi.put(`events/${eventId}/order/${orderShortId}`, payload);
    return response.data;
  },
  transitionToOfflinePayment: async (eventId, orderShortId) => {
    const response = await publicApi.post(`events/${eventId}/order/${orderShortId}/await-offline-payment`);
    return response.data;
  },
  downloadInvoice: async (eventId, orderShortId) => {
    const response = await publicApi.get(`events/${eventId}/order/${orderShortId}/invoice`, {
      responseType: "blob"
    });
    return new Blob([response.data]);
  },
  abandonOrder: async (eventId, orderShortId) => {
    const response = await publicApi.post(`events/${eventId}/order/${orderShortId}/abandon`);
    return response.data;
  }
};
export {
  orderClientPublic as a,
  orderClient as o
};

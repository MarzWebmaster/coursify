import { f as api, q as queryParamsHelper, t as publicApi } from "../entry.server.js";
const attendeesClient = {
  create: async (eventId, attendee) => {
    const response = await api.post(`events/${eventId}/attendees`, attendee);
    return response.data;
  },
  update: async (eventId, attendeeId, attendee) => {
    const response = await api.put(`events/${eventId}/attendees/${attendeeId}`, attendee);
    return response.data;
  },
  modify: async (eventId, attendeeId, attendee) => {
    const response = await api.patch(`events/${eventId}/attendees/${attendeeId}`, attendee);
    return response.data;
  },
  all: async (eventId, queryFilters) => {
    const response = await api.get(`/events/${eventId}/attendees` + queryParamsHelper.buildQueryString(queryFilters));
    return response.data;
  },
  findById: async (eventId, attendeeId) => {
    const response = await api.get(`events/${eventId}/attendees/${attendeeId}`);
    return response.data;
  },
  checkIn: async (eventId, attendeePublicId, action) => {
    const response = await api.post(`events/${eventId}/attendees/${attendeePublicId}/check_in`, {
      action
    });
    return response.data;
  },
  export: async (eventId, eventOccurrenceId) => {
    const body = eventOccurrenceId ? {
      event_occurrence_id: eventOccurrenceId
    } : {};
    const response = await api.post(`events/${eventId}/attendees/export`, body, {
      responseType: "blob"
    });
    return new Blob([response.data]);
  },
  resendTicket: async (eventId, attendeeId) => {
    return await api.post(`events/${eventId}/attendees/${attendeeId}/resend-ticket`);
  }
};
const attendeeClientPublic = {
  findByShortId: async (eventId, attendeeShortId) => {
    const response = await publicApi.get(`events/${eventId}/attendees/${attendeeShortId}`);
    return response.data;
  }
};
export {
  attendeesClient as a,
  attendeeClientPublic as b
};

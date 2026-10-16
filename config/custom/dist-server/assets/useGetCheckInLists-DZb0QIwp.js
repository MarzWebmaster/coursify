import { useQuery } from "@tanstack/react-query";
import { f as api, q as queryParamsHelper } from "../entry.server.js";
const checkInListClient = {
  create: async (eventId, checkInList) => {
    const response = await api.post(`events/${eventId}/check-in-lists`, checkInList);
    return response.data;
  },
  update: async (eventId, checkInListId, checkInList) => {
    const response = await api.put(`events/${eventId}/check-in-lists/${checkInListId}`, checkInList);
    return response.data;
  },
  all: async (eventId, pagination = null) => {
    const paginationQuery = pagination ? queryParamsHelper.buildQueryString(pagination) : "";
    const response = await api.get(`events/${eventId}/check-in-lists` + paginationQuery);
    return response.data;
  },
  get: async (eventId, checkInListId) => {
    const response = await api.get(`events/${eventId}/check-in-lists/${checkInListId}`);
    return response.data;
  },
  delete: async (eventId, checkInListId) => {
    const response = await api.delete(`events/${eventId}/check-in-lists/${checkInListId}`);
    return response.data;
  }
};
const GET_EVENT_CHECK_IN_LISTS_QUERY_KEY = "getEventCheckInLists";
const useGetEventCheckInLists = (eventId, pagination = null) => {
  return useQuery({
    queryKey: [GET_EVENT_CHECK_IN_LISTS_QUERY_KEY, eventId, pagination],
    queryFn: async () => {
      return await checkInListClient.all(eventId, pagination);
    }
  });
};
export {
  GET_EVENT_CHECK_IN_LISTS_QUERY_KEY as G,
  checkInListClient as c,
  useGetEventCheckInLists as u
};

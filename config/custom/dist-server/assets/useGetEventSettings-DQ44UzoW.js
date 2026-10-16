import { useQuery } from "@tanstack/react-query";
import { f as api } from "../entry.server.js";
const eventsSettingsClient = {
  partialUpdate: async (eventId, event) => {
    const response = await api.patch("events/" + eventId + "/settings", event);
    return response.data;
  },
  all: async (eventId) => {
    const response = await api.get("events/" + eventId + "/settings");
    return response.data;
  },
  getPlatformFeePreview: async (eventId, price) => {
    const response = await api.get("events/" + eventId + "/settings/platform-fee-preview", {
      params: {
        price
      }
    });
    return response.data.data;
  }
};
const GET_EVENT_SETTINGS_QUERY_KEY = "getEventSettings";
const useGetEventSettings = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_SETTINGS_QUERY_KEY, eventId],
    queryFn: async () => {
      const res = await eventsSettingsClient.all(eventId);
      return res.data;
    }
  });
};
export {
  GET_EVENT_SETTINGS_QUERY_KEY as G,
  eventsSettingsClient as e,
  useGetEventSettings as u
};

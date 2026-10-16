import { useQuery } from "@tanstack/react-query";
import { h as eventsClient } from "../entry.server.js";
const GET_EVENT_QUERY_KEY = "getEvent";
const useGetEvent = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_QUERY_KEY, eventId],
    queryFn: async () => {
      const {
        data
      } = await eventsClient.findByID(eventId);
      return data;
    }
  });
};
export {
  GET_EVENT_QUERY_KEY as G,
  useGetEvent as u
};

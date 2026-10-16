import { useQuery } from "@tanstack/react-query";
import { h as eventsClient } from "../entry.server.js";
const GET_EVENT_COUNTS_QUERY_KEY = "getEventCounts";
const useGetEventCounts = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_COUNTS_QUERY_KEY, eventId],
    queryFn: async () => {
      const {
        data
      } = await eventsClient.getEventCounts(eventId);
      return data;
    },
    enabled: !!eventId
  });
};
export {
  GET_EVENT_COUNTS_QUERY_KEY as G,
  useGetEventCounts as u
};

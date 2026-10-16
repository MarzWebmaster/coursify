import { useQuery } from "@tanstack/react-query";
import { e as eventOccurrenceClient } from "./event-occurrence.client-xqTaU2Nv.js";
const GET_EVENT_OCCURRENCE_QUERY_KEY = "getEventOccurrence";
const useGetEventOccurrence = (eventId, occurrenceId) => {
  return useQuery({
    queryKey: [GET_EVENT_OCCURRENCE_QUERY_KEY, eventId, occurrenceId],
    queryFn: async () => {
      const {
        data
      } = await eventOccurrenceClient.get(eventId, occurrenceId);
      return data;
    },
    staleTime: 3e4,
    enabled: !!occurrenceId
  });
};
export {
  GET_EVENT_OCCURRENCE_QUERY_KEY as G,
  useGetEventOccurrence as u
};

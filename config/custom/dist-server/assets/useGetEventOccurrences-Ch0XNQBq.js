import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { e as eventOccurrenceClient } from "./event-occurrence.client-xqTaU2Nv.js";
const GET_EVENT_OCCURRENCES_QUERY_KEY = "getEventOccurrences";
const useGetEventOccurrences = (eventId, pagination, enabled = true, options = {}) => {
  return useQuery({
    queryKey: [GET_EVENT_OCCURRENCES_QUERY_KEY, eventId, pagination, options.includeStats ?? true],
    queryFn: async () => await eventOccurrenceClient.all(eventId, pagination, options),
    placeholderData: keepPreviousData,
    staleTime: 3e4,
    enabled: !!eventId && enabled
  });
};
export {
  GET_EVENT_OCCURRENCES_QUERY_KEY as G,
  useGetEventOccurrences as u
};

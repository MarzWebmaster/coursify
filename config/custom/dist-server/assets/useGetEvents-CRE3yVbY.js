import { useQuery } from "@tanstack/react-query";
import { h as eventsClient } from "../entry.server.js";
const GET_EVENTS_QUERY_KEY = "getEvents";
const useGetEvents = (pagination) => {
  return useQuery({
    queryKey: [GET_EVENTS_QUERY_KEY, pagination],
    queryFn: async () => {
      return await eventsClient.all(pagination);
    }
  });
};
export {
  GET_EVENTS_QUERY_KEY as G,
  useGetEvents as u
};

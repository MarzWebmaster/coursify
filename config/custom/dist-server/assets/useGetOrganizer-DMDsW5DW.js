import { useQuery } from "@tanstack/react-query";
import { o as organizerClient } from "../entry.server.js";
const GET_ORGANIZER_QUERY_KEY = "getOrganizer";
const useGetOrganizer = (organizerId) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_QUERY_KEY, organizerId],
    queryFn: async () => {
      const {
        data
      } = await organizerClient.findByID(organizerId);
      return data;
    },
    enabled: !!organizerId
  });
};
export {
  GET_ORGANIZER_QUERY_KEY as G,
  useGetOrganizer as u
};

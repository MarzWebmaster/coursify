import { useQuery } from "@tanstack/react-query";
import { o as organizerClient } from "../entry.server.js";
const GET_ORGANIZERS_QUERY_KEY = "getOrganizers";
const useGetOrganizers = () => {
  return useQuery({
    queryKey: [GET_ORGANIZERS_QUERY_KEY],
    queryFn: async () => {
      return await organizerClient.all();
    }
  });
};
export {
  GET_ORGANIZERS_QUERY_KEY as G,
  useGetOrganizers as u
};

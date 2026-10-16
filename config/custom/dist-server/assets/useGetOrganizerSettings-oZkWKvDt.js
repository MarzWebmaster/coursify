import { useQuery } from "@tanstack/react-query";
import { n as organizerSettingsClient } from "../entry.server.js";
const GET_ORGANIZER_SETTINGS_QUERY_KEY = "getOrganizerSettings";
const useGetOrganizerSettings = (organizerId) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_SETTINGS_QUERY_KEY, organizerId],
    queryFn: async () => {
      const res = await organizerSettingsClient.all(organizerId);
      return res.data;
    }
  });
};
export {
  GET_ORGANIZER_SETTINGS_QUERY_KEY as G,
  useGetOrganizerSettings as u
};

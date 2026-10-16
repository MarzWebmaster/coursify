import { useQuery } from "@tanstack/react-query";
import { o as organizerClient } from "../entry.server.js";
const GET_ORGANIZER_STATS_QUERY_KEY = "getOrganizerStats";
const useGetOrganizerStats = (organizerId, currencyCode, options) => {
  const startDate = options == null ? void 0 : options.startDate;
  const endDate = options == null ? void 0 : options.endDate;
  const datesRequired = options !== void 0;
  const datesReady = !datesRequired || !!startDate && !!endDate;
  return useQuery({
    queryKey: [GET_ORGANIZER_STATS_QUERY_KEY, organizerId, currencyCode, startDate, endDate],
    enabled: !!organizerId && !!currencyCode && datesReady,
    queryFn: async () => {
      const {
        data
      } = await organizerClient.getOrganizerStats(organizerId, {
        currencyCode,
        startDate,
        endDate
      });
      return data;
    }
  });
};
export {
  useGetOrganizerStats as u
};

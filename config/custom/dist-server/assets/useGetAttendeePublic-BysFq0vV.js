import { useQuery } from "@tanstack/react-query";
import { b as attendeeClientPublic } from "./attendee.client-CeeZ2TBj.js";
const GET_ATTENDEE_PUBLIC_QUERY_KEY = "getAttendeePublic";
const useGetAttendeePublic = (eventId, attendeeShortId) => {
  return useQuery({
    queryKey: [GET_ATTENDEE_PUBLIC_QUERY_KEY, eventId, attendeeShortId],
    queryFn: async () => {
      const {
        data
      } = await attendeeClientPublic.findByShortId(eventId, attendeeShortId);
      return data;
    },
    refetchOnWindowFocus: false,
    retryOnMount: false,
    staleTime: 0,
    retry: (failureCount, error) => {
      var _a;
      if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 404) {
        return false;
      }
      return failureCount < 3;
    }
  });
};
export {
  useGetAttendeePublic as u
};

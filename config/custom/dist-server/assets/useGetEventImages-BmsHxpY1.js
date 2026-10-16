import { useQuery } from "@tanstack/react-query";
import { h as eventsClient } from "../entry.server.js";
const GET_EVENT_IMAGES_QUERY_KEY = "getEventImages";
const useGetEventImages = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_IMAGES_QUERY_KEY, eventId],
    queryFn: async () => {
      const res = await eventsClient.getEventImages(eventId);
      return res.data;
    }
  });
};
export {
  GET_EVENT_IMAGES_QUERY_KEY as G,
  useGetEventImages as u
};

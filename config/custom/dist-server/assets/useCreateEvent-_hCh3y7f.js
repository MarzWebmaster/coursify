import { useQueryClient, useMutation } from "@tanstack/react-query";
import { G as GET_EVENTS_QUERY_KEY } from "./useGetEvents-CRE3yVbY.js";
import { h as eventsClient } from "../entry.server.js";
const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventData
    }) => eventsClient.create(eventData),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [GET_EVENTS_QUERY_KEY]
      });
    }
  });
};
export {
  useCreateEvent as u
};

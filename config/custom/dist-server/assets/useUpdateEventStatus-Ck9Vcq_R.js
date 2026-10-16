import { h as eventsClient, k as GET_EVENT_PUBLIC_QUERY_KEY } from "../entry.server.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { G as GET_EVENT_QUERY_KEY } from "./useGetEvent-DyvalBPE.js";
import { G as GET_EVENTS_QUERY_KEY } from "./useGetEvents-CRE3yVbY.js";
const useUpdateEventStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      status
    }) => eventsClient.updateEventStatus(eventId, status),
    onSuccess: (_, variables) => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUERY_KEY, variables.eventId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_EVENT_PUBLIC_QUERY_KEY, variables.eventId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_EVENTS_QUERY_KEY]
      })]);
    }
  });
};
export {
  useUpdateEventStatus as u
};

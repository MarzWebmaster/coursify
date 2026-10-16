import { useQueryClient, useMutation } from "@tanstack/react-query";
import { e as eventsSettingsClient, G as GET_EVENT_SETTINGS_QUERY_KEY } from "./useGetEventSettings-DQ44UzoW.js";
const useUpdateEventSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventSettings,
      eventId
    }) => eventsSettingsClient.partialUpdate(eventId, eventSettings),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_SETTINGS_QUERY_KEY, variables.eventId]
      });
    }
  });
};
export {
  useUpdateEventSettings as u
};

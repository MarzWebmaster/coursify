import { useQueryClient, useMutation } from "@tanstack/react-query";
import { G as GET_ORGANIZER_SETTINGS_QUERY_KEY } from "./useGetOrganizerSettings-oZkWKvDt.js";
import { n as organizerSettingsClient } from "../entry.server.js";
const useUpdateOrganizerSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerSettings,
      organizerId
    }) => organizerSettingsClient.partialUpdate(organizerId, organizerSettings),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_SETTINGS_QUERY_KEY, variables.organizerId]
      });
    }
  });
};
export {
  useUpdateOrganizerSettings as u
};

import { o as organizerClient, m as GET_ORGANIZER_PUBLIC_QUERY_KEY } from "../entry.server.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { G as GET_ORGANIZER_QUERY_KEY } from "./useGetOrganizer-DMDsW5DW.js";
import { G as GET_ORGANIZERS_QUERY_KEY } from "./useGetOrganizers-AXXYibKP.js";
const useUpdateOrganizerStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      status
    }) => organizerClient.updateStatus(organizerId, status),
    onSuccess: (_, variables) => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_QUERY_KEY, variables.organizerId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZERS_QUERY_KEY]
      }), queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_PUBLIC_QUERY_KEY, variables.organizerId]
      })]);
    }
  });
};
export {
  useUpdateOrganizerStatus as u
};

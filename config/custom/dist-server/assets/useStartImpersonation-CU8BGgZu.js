import { useQueryClient, useMutation } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
import { s as setAuthToken, G as GET_ME_QUERY_KEY } from "../entry.server.js";
const useStartImpersonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      accountId
    }) => adminClient.startImpersonation(userId, accountId),
    onSuccess: (response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        setAuthToken(response.token);
      }
      queryClient.invalidateQueries({
        queryKey: [GET_ME_QUERY_KEY]
      });
    }
  });
};
export {
  useStartImpersonation as u
};

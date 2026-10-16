import { useMutation } from "@tanstack/react-query";
import { b as userClient } from "../entry.server.js";
const useResendEmailConfirmation = () => {
  return useMutation({
    mutationFn: ({
      userId
    }) => userClient.resendConfirmation(userId)
  });
};
export {
  useResendEmailConfirmation as u
};

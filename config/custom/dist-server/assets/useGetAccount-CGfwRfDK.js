import { useQuery } from "@tanstack/react-query";
import { f as api } from "../entry.server.js";
const accountClient = {
  create: async (account) => {
    const response = await api.post("accounts", account);
    return response.data;
  },
  getAccount: async () => {
    const response = await api.get("accounts");
    return response.data;
  },
  updateAccount: async (account) => {
    const response = await api.put("accounts", account);
    return response.data;
  },
  getDeletionStatus: async () => {
    const response = await api.get("accounts/deletion-request");
    return response.data;
  },
  requestDeletion: async (payload) => {
    const response = await api.post("accounts/deletion-request", payload);
    return response.data;
  },
  cancelDeletion: async () => {
    const response = await api.delete("accounts/deletion-request");
    return response.data;
  }
};
const GET_ACCOUNT_QUERY_KEY = "getAccount";
const useGetAccount = () => {
  return useQuery({
    queryKey: [GET_ACCOUNT_QUERY_KEY],
    queryFn: async () => {
      const {
        data
      } = await accountClient.getAccount();
      return data;
    }
  });
};
export {
  GET_ACCOUNT_QUERY_KEY as G,
  accountClient as a,
  useGetAccount as u
};

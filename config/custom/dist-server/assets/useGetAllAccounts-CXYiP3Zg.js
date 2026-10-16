import { useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
const GET_ALL_ACCOUNTS_QUERY_KEY = ["admin", "accounts"];
const useGetAllAccounts = (params = {}) => {
  return useQuery({
    queryKey: [...GET_ALL_ACCOUNTS_QUERY_KEY, params],
    queryFn: () => adminClient.getAllAccounts(params)
  });
};
export {
  GET_ALL_ACCOUNTS_QUERY_KEY as G,
  useGetAllAccounts as u
};

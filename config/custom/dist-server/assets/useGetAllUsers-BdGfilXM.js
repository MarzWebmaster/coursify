import { useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
const GET_ALL_USERS_QUERY_KEY = "getAllUsers";
const useGetAllUsers = (params = {}) => {
  return useQuery({
    queryKey: [GET_ALL_USERS_QUERY_KEY, params],
    queryFn: async () => await adminClient.getAllUsers(params)
  });
};
export {
  useGetAllUsers as u
};

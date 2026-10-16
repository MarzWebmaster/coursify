import { useQuery } from "@tanstack/react-query";
import { a as adminClient } from "./admin.client-DIpS7H64.js";
const useGetAllConfigurations = () => {
  return useQuery({
    queryKey: ["admin", "configurations"],
    queryFn: () => adminClient.getAllConfigurations()
  });
};
export {
  useGetAllConfigurations as u
};

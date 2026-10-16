import { u as useGetMe } from "../entry.server.js";
const useIsCurrentUserAdmin = () => {
  const {
    data: user,
    isFetched
  } = useGetMe();
  return isFetched && ((user == null ? void 0 : user.role) === "ADMIN" || (user == null ? void 0 : user.role) === "SUPERADMIN");
};
const useIsCurrentUserSuperAdmin = () => {
  const {
    data: user,
    isFetched
  } = useGetMe();
  return isFetched && (user == null ? void 0 : user.role) === "SUPERADMIN";
};
export {
  useIsCurrentUserSuperAdmin as a,
  useIsCurrentUserAdmin as u
};

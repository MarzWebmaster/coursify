import { jsx } from "react/jsx-runtime";
import { useParams, useLocation, Navigate } from "react-router";
const PaymentsRedirect = () => {
  const {
    organizerId
  } = useParams();
  const location = useLocation();
  const target = `/manage/organizer/${organizerId}/settings${location.search}#payouts`;
  return /* @__PURE__ */ jsx(Navigate, { to: target, replace: true });
};
export {
  PaymentsRedirect as default
};

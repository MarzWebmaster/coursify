import { useMemo } from "react";
import { useSearchParams } from "react-router";
const CHECKOUT_PREFILL_PARAM_KEYS = ["first_name", "last_name", "email", "lock"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const useCheckoutPrefill = () => {
  const [searchParams] = useSearchParams();
  const firstNameParam = searchParams.get("first_name");
  const lastNameParam = searchParams.get("last_name");
  const emailParam = searchParams.get("email");
  const lockParam = searchParams.get("lock");
  return useMemo(() => {
    const prefill = {};
    const firstName = firstNameParam == null ? void 0 : firstNameParam.trim();
    if (firstName) {
      prefill.first_name = firstName;
    }
    const lastName = lastNameParam == null ? void 0 : lastNameParam.trim();
    if (lastName) {
      prefill.last_name = lastName;
    }
    const email = emailParam == null ? void 0 : emailParam.trim();
    if (email && EMAIL_REGEX.test(email)) {
      prefill.email = email;
    }
    const hasPrefill = Object.keys(prefill).length > 0;
    const lock = hasPrefill && (lockParam === "true" || lockParam === "1");
    return {
      prefill,
      lock
    };
  }, [firstNameParam, lastNameParam, emailParam, lockParam]);
};
export {
  CHECKOUT_PREFILL_PARAM_KEYS as C,
  useCheckoutPrefill as u
};

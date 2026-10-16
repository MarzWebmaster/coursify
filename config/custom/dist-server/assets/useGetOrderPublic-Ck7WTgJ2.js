import { useQuery } from "@tanstack/react-query";
import { a as orderClientPublic } from "./order.client-BmBVeAyF.js";
import { useMemo } from "react";
import { U as getCheckoutSessionIdentifier } from "../entry.server.js";
const GET_ORDER_PUBLIC_QUERY_KEY = "getOrderPublic";
const useGetOrderPublic = (eventId, orderShortId, includes = []) => {
  const sessionIdentifier = useMemo(() => getCheckoutSessionIdentifier(), [orderShortId]);
  return useQuery({
    queryKey: [GET_ORDER_PUBLIC_QUERY_KEY, eventId, orderShortId, sessionIdentifier],
    queryFn: async () => {
      const {
        data
      } = await orderClientPublic.findByShortId(Number(eventId), String(orderShortId), includes);
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 500,
    retryOnMount: false,
    retry: false
  });
};
export {
  GET_ORDER_PUBLIC_QUERY_KEY as G,
  useGetOrderPublic as u
};

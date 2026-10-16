import { useMutation } from "@tanstack/react-query";
import { f as api } from "../entry.server.js";
const ticketLookupClient = {
  sendTicketLookupEmail: async (email) => {
    const response = await api.post("public/ticket-lookup", {
      email
    });
    return response.data;
  },
  getOrdersByToken: async (token) => {
    const response = await api.get(`public/ticket-lookup/${token}`);
    return response.data;
  }
};
const useSendTicketLookupEmail = () => {
  return useMutation({
    mutationFn: (email) => ticketLookupClient.sendTicketLookupEmail(email)
  });
};
export {
  ticketLookupClient as t,
  useSendTicketLookupEmail as u
};

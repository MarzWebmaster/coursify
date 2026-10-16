import { useQuery } from "@tanstack/react-query";
import { f as api } from "../entry.server.js";
const productCategoryClient = {
  create: async (eventId, productCategory) => {
    const response = await api.post(`events/${eventId}/product-categories`, productCategory);
    return response.data;
  },
  update: async (eventId, productCategoryId, productCategory) => {
    const response = await api.put(`events/${eventId}/product-categories/${productCategoryId}`, productCategory);
    return response.data;
  },
  all: async (eventId) => {
    const response = await api.get(`events/${eventId}/product-categories`);
    return response.data;
  },
  get: async (eventId, productCategoryId) => {
    const response = await api.get(`events/${eventId}/product-categories/${productCategoryId}`);
    return response.data;
  },
  delete: async (eventId, productCategoryId) => {
    const response = await api.delete(`events/${eventId}/product-categories/${productCategoryId}`);
    return response.data;
  }
};
const GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY = "getEventProductCategories";
const useGetEventProductCategories = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY, eventId],
    queryFn: async () => {
      return await productCategoryClient.all(eventId);
    }
  });
};
export {
  GET_EVENT_PRODUCT_CATEGORIES_QUERY_KEY as G,
  productCategoryClient as p,
  useGetEventProductCategories as u
};

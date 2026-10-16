import { useQuery } from "@tanstack/react-query";
import { f as api, q as queryParamsHelper } from "../entry.server.js";
const locationClient = {
  all: async (organizerId, pagination) => {
    const response = await api.get("organizers/" + organizerId + "/locations" + queryParamsHelper.buildQueryString(pagination ?? {}));
    return response.data;
  },
  create: async (organizerId, payload) => {
    const response = await api.post("organizers/" + organizerId + "/locations", payload);
    return response.data;
  },
  update: async (organizerId, locationId, payload) => {
    const response = await api.put("organizers/" + organizerId + "/locations/" + locationId, payload);
    return response.data;
  },
  delete: async (organizerId, locationId) => {
    const response = await api.delete("organizers/" + organizerId + "/locations/" + locationId);
    return response.data;
  },
  geoStatus: async () => {
    const response = await api.get("geo/status");
    return response.data;
  },
  autocomplete: async (organizerId, query, opts = {}) => {
    const params = new URLSearchParams();
    params.set("query", query);
    if (opts.locale) params.set("locale", opts.locale);
    if (opts.country) params.set("country", opts.country);
    const response = await api.get("organizers/" + organizerId + "/locations/autocomplete?" + params.toString());
    return response.data;
  },
  placeDetails: async (organizerId, placeId, opts = {}) => {
    const params = new URLSearchParams();
    if (opts.locale) params.set("locale", opts.locale);
    const qs = params.toString();
    const response = await api.get("organizers/" + organizerId + "/locations/places/" + encodeURIComponent(placeId) + (qs ? "?" + qs : ""));
    return response.data;
  }
};
const GEO_STATUS_QUERY_KEY = "geoStatus";
const useGeoStatus = () => {
  return useQuery({
    queryKey: [GEO_STATUS_QUERY_KEY],
    queryFn: () => locationClient.geoStatus(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1
  });
};
export {
  locationClient as l,
  useGeoStatus as u
};

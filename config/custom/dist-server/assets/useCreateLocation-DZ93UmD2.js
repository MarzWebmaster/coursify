import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { l as locationClient } from "./useGeoStatus-GfcfS0IW.js";
const GET_ORGANIZER_LOCATIONS_QUERY_KEY = "getOrganizerLocations";
const useGetOrganizerLocations = (organizerId, pagination, enabled = true) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_LOCATIONS_QUERY_KEY, organizerId, pagination],
    queryFn: () => locationClient.all(organizerId, pagination),
    enabled: enabled && organizerId !== void 0 && organizerId !== null
  });
};
const GEO_AUTOCOMPLETE_QUERY_KEY = "geoAutocomplete";
const useGeoAutocomplete = (organizerId, query, opts = {}) => {
  const trimmed = query.trim();
  return useQuery({
    queryKey: [GEO_AUTOCOMPLETE_QUERY_KEY, organizerId, trimmed, opts.locale, opts.country],
    queryFn: () => locationClient.autocomplete(organizerId, trimmed, {
      locale: opts.locale,
      country: opts.country
    }),
    enabled: (opts.enabled ?? true) && organizerId !== void 0 && organizerId !== null && trimmed.length >= 3,
    staleTime: 1e3 * 30
  });
};
const useResolveGeoPlace = () => {
  return useMutation({
    mutationFn: ({
      organizerId,
      placeId,
      locale
    }) => locationClient.placeDetails(organizerId, placeId, {
      locale
    })
  });
};
const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      payload
    }) => locationClient.create(organizerId, payload),
    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_LOCATIONS_QUERY_KEY, variables.organizerId]
      });
    }
  });
};
export {
  GET_ORGANIZER_LOCATIONS_QUERY_KEY as G,
  useResolveGeoPlace as a,
  useGetOrganizerLocations as b,
  useGeoAutocomplete as c,
  useCreateLocation as u
};

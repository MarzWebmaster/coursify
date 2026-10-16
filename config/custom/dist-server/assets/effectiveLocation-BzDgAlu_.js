import { L as LocationType } from "./types-CqPWB-a5.js";
import { g as getShortLocationDisplay, i as isAddressSet, f as formatAddress, a as getGoogleMapsUrl } from "./addressUtilities-7xIQim0X.js";
const resolveEventLocation = (event, occurrence) => {
  return (occurrence == null ? void 0 : occurrence.event_location) ?? (event == null ? void 0 : event.event_location) ?? null;
};
const locationIdentity = (eventLocation) => {
  var _a;
  if (eventLocation.type === LocationType.Online) {
    return "online";
  }
  if (eventLocation.location_id != null) {
    return `id:${eventLocation.location_id}`;
  }
  const location = eventLocation.location;
  return [(location == null ? void 0 : location.name) ?? "", ((_a = location == null ? void 0 : location.structured_address) == null ? void 0 : _a.venue_name) ?? "", (location == null ? void 0 : location.structured_address) ? formatAddress(location.structured_address) : ""].join("|").trim().toLowerCase();
};
const summariseEventLocations = (event) => {
  const occurrences = event.occurrences ?? [];
  const resolvedList = occurrences.length > 0 ? occurrences.map((occurrence) => resolveEventLocation(event, occurrence)) : [resolveEventLocation(event, null)];
  const resolved = resolvedList.filter((location) => location !== null);
  if (resolved.length === 0) {
    return {
      kind: "none"
    };
  }
  const identities = new Set(resolved.map(locationIdentity));
  if (identities.size === 1 && resolved.length === resolvedList.length) {
    const eventLocation = resolved[0];
    const isEventDefault = event.event_location != null && locationIdentity(event.event_location) === locationIdentity(eventLocation);
    return {
      kind: "single",
      eventLocation,
      isEventDefault
    };
  }
  return {
    kind: "varied",
    types: [...new Set(resolved.map((location) => location.type))]
  };
};
const buildMapsUrl = (event, allowCustomMapsUrl, eventLocation, fullAddress) => {
  var _a, _b, _c, _d;
  const customMapsUrl = allowCustomMapsUrl ? (_b = (_a = event.settings) == null ? void 0 : _a.maps_url) == null ? void 0 : _b.trim() : null;
  if (customMapsUrl) {
    return customMapsUrl;
  }
  const latitude = (_c = eventLocation.location) == null ? void 0 : _c.latitude;
  const longitude = (_d = eventLocation.location) == null ? void 0 : _d.longitude;
  if (latitude != null && longitude != null) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
  return fullAddress ? getGoogleMapsUrl(fullAddress) : null;
};
const buildEventLocationDisplay = (event, eventLocation, allowCustomMapsUrl) => {
  var _a, _b, _c, _d;
  if (!eventLocation) {
    return null;
  }
  if (eventLocation.type === LocationType.Online) {
    return {
      isOnline: true,
      venueName: null,
      short: null,
      full: null,
      mapsUrl: null
    };
  }
  const address = ((_a = eventLocation.location) == null ? void 0 : _a.structured_address) ?? null;
  const venueName = ((_c = (_b = eventLocation.location) == null ? void 0 : _b.name) == null ? void 0 : _c.trim()) || ((_d = address == null ? void 0 : address.venue_name) == null ? void 0 : _d.trim()) || null;
  const short = getShortLocationDisplay(address) ?? venueName;
  const full = address && isAddressSet(address) ? formatAddress(address) : null;
  if (!venueName && !short && !full) {
    return null;
  }
  return {
    isOnline: false,
    venueName,
    short: short ?? venueName,
    full,
    mapsUrl: buildMapsUrl(event, allowCustomMapsUrl, eventLocation, full ? address : null)
  };
};
const getEventLocationDisplay = (event, occurrence) => {
  return buildEventLocationDisplay(event, resolveEventLocation(event, occurrence), !(occurrence == null ? void 0 : occurrence.event_location));
};
export {
  buildEventLocationDisplay as b,
  getEventLocationDisplay as g,
  resolveEventLocation as r,
  summariseEventLocations as s
};

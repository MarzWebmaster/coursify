import { a as getConfig } from "../entry.server.js";
const eventCheckoutPath = (eventId, orderShortId, subPage = "") => {
  return `/checkout/${eventId}/${orderShortId}/${subPage}`;
};
const eventPreviewPath = (eventId) => {
  return `/event/${eventId}/preview`;
};
const eventHomepagePath = (event) => {
  return `/event/${event == null ? void 0 : event.id}/${event == null ? void 0 : event.slug}`;
};
const organizerHomepagePath = (organizer) => {
  return `/events/${organizer == null ? void 0 : organizer.id}/${organizer == null ? void 0 : organizer.slug}`;
};
const organizerHomepageUrl = (organizer) => {
  return getConfig("VITE_FRONTEND_URL") + organizerHomepagePath(organizer);
};
const eventCheckoutUrl = (eventId, orderShortId, subPage = "") => {
  return getConfig("VITE_FRONTEND_URL") + eventCheckoutPath(eventId, orderShortId, subPage);
};
const eventHomepageUrl = (event) => {
  return getConfig("VITE_FRONTEND_URL") + eventHomepagePath(event);
};
const eventCoverImageUrl = (event) => {
  var _a, _b;
  return (_b = (_a = event == null ? void 0 : event.images) == null ? void 0 : _a.find((image) => image.type === "EVENT_COVER")) == null ? void 0 : _b.url;
};
const eventCoverImage = (event) => {
  var _a;
  return (_a = event == null ? void 0 : event.images) == null ? void 0 : _a.find((image) => image.type === "EVENT_COVER");
};
const imageUrl = (imageType, images, fallbackUrl) => {
  if (!images || images.length === 0) {
    return getConfig("VITE_DEFAULT_IMAGE_URL");
  }
  const image = images.find((img) => img.type === imageType);
  if (image) {
    return image.url;
  }
  return getConfig("VITE_DEFAULT_IMAGE_URL");
};
const organizerPreviewPath = (organizerId) => {
  return `/organizer/${organizerId}/preview`;
};
export {
  eventHomepagePath as a,
  organizerPreviewPath as b,
  eventCheckoutUrl as c,
  eventPreviewPath as d,
  eventHomepageUrl as e,
  organizerHomepagePath as f,
  eventCoverImageUrl as g,
  eventCoverImage as h,
  imageUrl as i,
  eventCheckoutPath as j,
  organizerHomepageUrl as o
};

const isAddressSet = (address) => {
  if (!address) return false;
  const addressFields = ["venue_name", "address_line_1", "city", "state_or_region", "zip_or_postal_code", "country"];
  return addressFields.some((field) => address[field]);
};
const sameAddress = (left, right) => ["venue_name", "address_line_1", "address_line_2", "city", "state_or_region", "zip_or_postal_code", "country"].every((field) => (left[field] || "") === (right[field] || ""));
const formatAddress = (address) => {
  const addressLines = [address.address_line_1, address.address_line_2, address.city, address.state_or_region, address.zip_or_postal_code, address.country];
  return addressLines.filter((line) => line).join(", ");
};
const getShortLocationDisplay = (locationDetails) => {
  if (!locationDetails) return null;
  const parts = [];
  if (locationDetails.venue_name) {
    parts.push(locationDetails.venue_name);
  }
  if (locationDetails.city) {
    parts.push(locationDetails.city);
  }
  return parts.length > 0 ? parts.join(", ") : null;
};
const getGoogleMapsUrl = (locationDetails) => {
  if (!locationDetails) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(locationDetails))}`;
};
export {
  getGoogleMapsUrl as a,
  formatAddress as f,
  getShortLocationDisplay as g,
  isAddressSet as i,
  sameAddress as s
};

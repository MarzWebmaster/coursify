let cachedParentUrl = null;
let cachedEmbedMode = null;
const resolveParam = (urlParam, storageKey, cached) => {
  return null;
};
const getEmbedParentUrl = () => {
  cachedParentUrl = resolveParam();
  return cachedParentUrl;
};
const getEmbedMode = () => {
  cachedEmbedMode = resolveParam();
  return cachedEmbedMode;
};
const getParentOrigin = () => {
  const parentUrl = getEmbedParentUrl();
  if (!parentUrl) return null;
  try {
    return new URL(parentUrl).origin;
  } catch {
    return null;
  }
};
export {
  getParentOrigin as a,
  getEmbedMode as b,
  getEmbedParentUrl as g
};

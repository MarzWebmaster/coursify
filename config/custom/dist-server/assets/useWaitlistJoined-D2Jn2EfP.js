import { useState, useEffect, useCallback } from "react";
const STORAGE_KEY_PREFIX = "waitlist_joined_";
const getKey = (eventId, productPriceId, eventOccurrenceId) => {
  return `${STORAGE_KEY_PREFIX}${eventId}_${productPriceId}_${eventOccurrenceId ?? "single"}`;
};
const clearWaitlistJoinedForEvent = (eventId) => {
  if (typeof window === "undefined") return;
  try {
    const prefix = `${STORAGE_KEY_PREFIX}${eventId}_`;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key == null ? void 0 : key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    }
  } catch {
  }
};
const useWaitlistJoined = (eventId, productPriceId, eventOccurrenceId) => {
  const [joined, setJoined] = useState(false);
  useEffect(() => {
    if (!eventId || !productPriceId) return;
    try {
      setJoined(localStorage.getItem(getKey(eventId, productPriceId, eventOccurrenceId)) === "1");
    } catch {
    }
  }, [eventId, productPriceId, eventOccurrenceId]);
  const markJoined = useCallback(() => {
    if (!eventId || !productPriceId) return;
    setJoined(true);
    try {
      localStorage.setItem(getKey(eventId, productPriceId, eventOccurrenceId), "1");
    } catch {
    }
  }, [eventId, productPriceId, eventOccurrenceId]);
  return {
    joined,
    markJoined
  };
};
export {
  clearWaitlistJoinedForEvent as c,
  useWaitlistJoined as u
};

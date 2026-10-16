import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
};
const useFilterQueryParamSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({});
  useEffect(() => {
    const parsedParams = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith("filterFields[")) {
        const match = key.match(/^filterFields\[(.+)\]\[(.+)\]$/);
        if (match) {
          const [_, fieldName, operator] = match;
          if (!parsedParams.filterFields) {
            parsedParams.filterFields = {};
          }
          parsedParams.filterFields[fieldName] = {
            operator,
            value: value.includes(",") ? value.split(",") : value
          };
        }
      } else {
        parsedParams[key] = value;
      }
    });
    setQueryParams(parsedParams);
  }, [searchParams]);
  const debouncedSetSearchParams = useCallback(debounce((params) => {
    setSearchParams(params);
  }, 300), [setSearchParams]);
  const updateSearchParams = useCallback((updates, replace = false) => {
    const newParams = replace ? new URLSearchParams() : new URLSearchParams(searchParams);
    if (replace) {
      searchParams.forEach((_, key) => {
        if (key.startsWith("filterFields[")) {
          newParams.delete(key);
        }
      });
    }
    Object.entries(updates).forEach(([key, value]) => {
      if (key === "filterFields" && value) {
        Object.entries(value).forEach(([field, condition]) => {
          if (condition) {
            const paramKey = `filterFields[${field}][${condition.operator}]`;
            if (Array.isArray(condition.value)) {
              newParams.set(paramKey, condition.value.join(","));
            } else {
              newParams.set(paramKey, String(condition.value));
            }
          }
        });
      } else if (value !== void 0) {
        newParams.set(key, String(value));
      }
    });
    debouncedSetSearchParams(newParams);
  }, [searchParams, debouncedSetSearchParams]);
  return [queryParams, updateSearchParams];
};
export {
  useFilterQueryParamSync as u
};

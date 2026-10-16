import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import React from "react";
import { Button, Modal, Stack, Text, Group, TextInput, Select, MultiSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";
const normalizeFilterValue = (value, type) => {
  if (value === void 0 || value === null) {
    return type === "multi-select" ? [] : null;
  }
  switch (type) {
    case "multi-select": {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "string") {
        return value.split(",").filter(Boolean).map((item) => item.trim());
      }
      if (value == null ? void 0 : value.value) {
        if (Array.isArray(value.value)) {
          return value.value;
        }
        return normalizeFilterValue(value.value, type);
      }
      return [];
    }
    case "single-select": {
      if (Array.isArray(value)) {
        return value[0] || null;
      }
      if (value == null ? void 0 : value.value) {
        return typeof value.value === "string" ? value.value : null;
      }
      return typeof value === "string" ? value : null;
    }
    case "text": {
      return value;
    }
    default: {
      return value;
    }
  }
};
const normalizeFilters = (filters, values) => {
  return filters.reduce((acc, filter) => {
    return {
      ...acc,
      [filter.field]: normalizeFilterValue(values[filter.field], filter.type)
    };
  }, {});
};
const FilterModal = ({
  filters,
  activeFilters,
  onChange,
  onReset,
  title = i18n._(
    /*i18n*/
    {
      id: "cSev+j"
    }
  )
}) => {
  const [opened, {
    open,
    close
  }] = useDisclosure(false);
  const [localFilters, setLocalFilters] = React.useState(() => {
    return normalizeFilters(filters, activeFilters);
  });
  React.useEffect(() => {
    if (!opened) {
      setLocalFilters(normalizeFilters(filters, activeFilters));
    }
  }, [activeFilters, filters, opened]);
  const handleSave = () => {
    onChange(localFilters);
    close();
  };
  const handleReset = () => {
    const emptyFilters = filters.reduce((acc, filter) => {
      let emptyValue;
      switch (filter.type) {
        case "multi-select": {
          emptyValue = [];
          break;
        }
        case "text": {
          emptyValue = "";
          break;
        }
        case "single-select": {
          emptyValue = null;
          break;
        }
        case "date-range": {
          emptyValue = {
            start: null,
            end: null
          };
          break;
        }
        default: {
          emptyValue = null;
        }
      }
      return {
        ...acc,
        [filter.field]: emptyValue
      };
    }, {});
    if (onReset) {
      onReset();
    }
    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
    close();
  };
  const handleFilterChange = (field, value) => {
    setLocalFilters((prev) => {
      return {
        ...prev,
        [field]: value
      };
    });
  };
  const renderFilterInput = (filter) => {
    const normalizedValue = normalizeFilterValue(localFilters[filter.field], filter.type);
    switch (filter.type) {
      case "multi-select": {
        return /* @__PURE__ */ jsx(MultiSelect, { placeholder: i18n._(
          /*i18n*/
          {
            id: "02ePaq",
            values: {
              0: filter.label.toLowerCase()
            }
          }
        ), label: filter.label, data: filter.options || [], value: normalizedValue, onChange: (value) => {
          handleFilterChange(filter.field, value || []);
        }, clearable: true, searchable: true, w: "100%", style: {
          marginBottom: 0
        } }, filter.field);
      }
      case "single-select": {
        return /* @__PURE__ */ jsx(Select, { placeholder: i18n._(
          /*i18n*/
          {
            id: "02ePaq",
            values: {
              0: filter.label.toLowerCase()
            }
          }
        ), label: filter.label, data: filter.options || [], value: normalizedValue, onChange: (value) => {
          handleFilterChange(filter.field, value || null);
        }, clearable: true, searchable: true, w: "100%", style: {
          marginBottom: 0
        } }, filter.field);
      }
      case "text": {
        return /* @__PURE__ */ jsx(TextInput, { label: filter.label, value: normalizedValue, onChange: (event) => {
          handleFilterChange(filter.field, event.currentTarget.value);
        }, w: "100%" }, filter.field);
      }
      default: {
        return null;
      }
    }
  };
  const countActiveFilters = (filterValues, filterOptions) => {
    return Object.entries(filterValues).reduce((count, [field, value]) => {
      const filterOption = filterOptions.find((f) => f.field === field);
      if (!filterOption) {
        return count;
      }
      const normalizedValue = normalizeFilterValue(value, filterOption.type);
      if (Array.isArray(normalizedValue)) {
        if (normalizedValue.length > 0) {
          return count + 1;
        }
        return count;
      }
      if (normalizedValue) {
        return count + 1;
      }
      return count;
    }, 0);
  };
  const activeFilterCount = countActiveFilters(activeFilters, filters);
  const hasActiveFilters = activeFilterCount > 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { variant: hasActiveFilters ? "outline" : "light", color: hasActiveFilters ? "primary" : "gray", leftSection: /* @__PURE__ */ jsx(IconFilter, { size: 16 }), onClick: open, size: "sm", children: hasActiveFilters ? i18n._(
      /*i18n*/
      {
        id: "CVw2MU",
        values: {
          activeFilterCount
        }
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "cSev+j"
      }
    ) }),
    /* @__PURE__ */ jsx(Modal, { opened, onClose: close, title, size: "md", children: /* @__PURE__ */ jsxs(Stack, { children: [
      filters.length === 0 ? /* @__PURE__ */ jsx(Text, { c: "dimmed", ta: "center", py: "md", children: i18n._(
        /*i18n*/
        {
          id: "GqvPcv"
        }
      ) }) : filters.map((filter) => {
        return /* @__PURE__ */ jsx("div", { children: renderFilterInput(filter) }, filter.field);
      }),
      /* @__PURE__ */ jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsx(Button, { variant: "light", onClick: handleReset, disabled: !hasActiveFilters, children: i18n._(
          /*i18n*/
          {
            id: "OfhWJH"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { onClick: handleSave, children: i18n._(
          /*i18n*/
          {
            id: "DB8zMK"
          }
        ) })
      ] })
    ] }) })
  ] });
};
export {
  FilterModal as F
};

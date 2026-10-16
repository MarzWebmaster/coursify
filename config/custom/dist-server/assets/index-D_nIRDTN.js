import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Select, TextInput } from "@mantine/core";
import { IconX, IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { C as Card } from "./index-jHMtuNEo.js";
const searchBarWrapper = "_searchBarWrapper_1iwx2_1";
const searchBar = "_searchBar_1iwx2_1";
const classes$2 = {
  searchBarWrapper,
  searchBar
};
const selectWrapper = "_selectWrapper_c23dn_1";
const select = "_select_c23dn_1";
const classes$1 = {
  selectWrapper,
  select
};
const SortSelector = ({
  options,
  onSortSelect,
  selected
}) => {
  const sortOptions = Object.entries(options).flatMap(([key, {
    asc,
    desc
  }]) => {
    const optionsForThisKey = [];
    if (asc) {
      optionsForThisKey.push({
        value: `${key}:asc`,
        label: asc
      });
    }
    if (desc) {
      optionsForThisKey.push({
        value: `${key}:desc`,
        label: desc
      });
    }
    return optionsForThisKey;
  });
  return /* @__PURE__ */ jsx("div", { className: classes$1.selectWrapper, children: /* @__PURE__ */ jsx(Select, { size: "sm", data: sortOptions, className: classes$1.select, value: selected, onChange: (value) => {
    if (value) {
      const [key, sortDirection] = value.split(":");
      onSortSelect(key, sortDirection);
    }
  } }) });
};
const SearchBarWrapper = ({
  setSearchParams,
  searchParams,
  placeholder
}) => {
  return /* @__PURE__ */ jsx(SearchBar, { value: searchParams.query, onChange: (event) => {
    setSearchParams({
      query: event.target.value,
      pageNumber: 1
    });
  }, onClear: () => setSearchParams({
    query: "",
    pageNumber: 1
  }), placeholder: placeholder || i18n._(
    /*i18n*/
    {
      id: "YIix5Y"
    }
  ) });
};
const SearchBar = ({
  sortProps,
  onClear,
  value,
  onChange,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState(value);
  useEffect(() => {
    setSearchValue(value);
  }, [value]);
  return /* @__PURE__ */ jsxs("div", { className: classNames(classes$2.searchBarWrapper, props.className), children: [
    /* @__PURE__ */ jsx(TextInput, { className: classes$2.searchBar, leftSection: /* @__PURE__ */ jsx(IconSearch, { size: "1.1rem", stroke: 1.5 }), radius: "sm", size: "sm", value: searchValue, ...props, onChange: (event) => {
      setSearchValue(event.currentTarget.value);
      if (onChange) {
        onChange(event);
      }
    }, rightSection: /* @__PURE__ */ jsx(IconX, { "aria-label": i18n._(
      /*i18n*/
      {
        id: "FG98gC"
      }
    ), color: "#ddd", style: {
      cursor: "pointer"
    }, display: value ? "block" : "none", onClick: () => onClear() }) }),
    sortProps && /* @__PURE__ */ jsx(SortSelector, { selected: sortProps.selected, options: sortProps.options, onSortSelect: sortProps.onSortSelect })
  ] });
};
const toolbar = "_toolbar_1n3oc_1";
const rowPrimary = "_rowPrimary_1n3oc_6";
const searchSlot = "_searchSlot_1n3oc_17";
const actions = "_actions_1n3oc_28";
const rowFilters = "_rowFilters_1n3oc_46";
const filterSlot = "_filterSlot_1n3oc_54";
const resultCount = "_resultCount_1n3oc_77";
const classes = {
  toolbar,
  rowPrimary,
  searchSlot,
  actions,
  rowFilters,
  filterSlot,
  resultCount
};
const ToolBar = ({
  searchComponent,
  filterComponent,
  children,
  resultCount: resultCount2,
  resultLabel,
  className
}) => {
  return /* @__PURE__ */ jsxs(Card, { className: `${classes.toolbar} ${className || ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: classes.rowPrimary, children: [
      searchComponent && /* @__PURE__ */ jsx("div", { className: classes.searchSlot, children: searchComponent() }),
      children && /* @__PURE__ */ jsx("div", { className: classes.actions, children })
    ] }),
    (filterComponent || resultCount2 !== void 0) && /* @__PURE__ */ jsxs("div", { className: classes.rowFilters, children: [
      filterComponent && /* @__PURE__ */ jsx("div", { className: classes.filterSlot, children: filterComponent }),
      resultCount2 !== void 0 && /* @__PURE__ */ jsxs("span", { className: classes.resultCount, children: [
        resultCount2.toLocaleString(),
        " ",
        resultLabel || i18n._(
          /*i18n*/
          {
            id: "mO8KLE"
          }
        )
      ] })
    ] })
  ] });
};
export {
  SearchBarWrapper as S,
  ToolBar as T,
  SortSelector as a,
  SearchBar as b
};

import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState, useMemo } from "react";
import { useCombobox, Combobox, InputBase, ScrollArea, Text } from "@mantine/core";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { f as filterAndGroupOccurrences, a as formatOccurrenceLabel, i as isToday } from "./occurrenceSelectUtils-sehyBEho.js";
const MAX_VISIBLE = 50;
const OccurrenceSelect = ({
  occurrences,
  timezone: tz,
  value,
  onChange,
  placeholder,
  clearable = false,
  label,
  description,
  size = "sm",
  allLabel,
  filterCancelled = true,
  style
}) => {
  const [search, setSearch] = useState("");
  const combobox = useCombobox({
    onDropdownClose: () => {
      setSearch("");
      combobox.resetSelectedOption();
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    }
  });
  const {
    grouped,
    totalFiltered,
    totalAvailable
  } = useMemo(() => filterAndGroupOccurrences(occurrences, {
    search,
    tz,
    filterCancelled,
    maxVisible: MAX_VISIBLE
  }), [occurrences, tz, search, filterCancelled]);
  const selectedOcc = value ? occurrences.find((o) => String(o.id) === value) : null;
  const displayValue = selectedOcc ? formatOccurrenceLabel(selectedOcc, tz) : value === "" && allLabel ? allLabel : null;
  return /* @__PURE__ */ jsx("div", { style: {
    width: 275,
    ...style
  }, children: /* @__PURE__ */ jsxs(Combobox, { store: combobox, onOptionSubmit: (val) => {
    if (val === "__all__") {
      onChange("");
    } else if (val === "__clear__") {
      onChange(null);
    } else {
      onChange(val);
    }
    combobox.closeDropdown();
  }, children: [
    /* @__PURE__ */ jsx(Combobox.Target, { children: /* @__PURE__ */ jsx(InputBase, { component: "button", type: "button", pointer: true, label, description, size, mb: 0, styles: {
      input: {
        minWidth: 0,
        width: "100%"
      }
    }, leftSection: /* @__PURE__ */ jsx(IconCalendar, { size: 14 }), rightSection: /* @__PURE__ */ jsx(Combobox.Chevron, {}), rightSectionPointerEvents: "none", onClick: () => combobox.toggleDropdown(), children: /* @__PURE__ */ jsx("span", { style: {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, children: displayValue || /* @__PURE__ */ jsx("span", { style: {
      color: "var(--mantine-color-placeholder)"
    }, children: placeholder || i18n._(
      /*i18n*/
      {
        id: "ypTjHL"
      }
    ) }) }) }) }),
    /* @__PURE__ */ jsxs(Combobox.Dropdown, { children: [
      /* @__PURE__ */ jsx(Combobox.Search, { value: search, onChange: (event) => setSearch(event.currentTarget.value), placeholder: i18n._(
        /*i18n*/
        {
          id: "nQC7Z9"
        }
      ), leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 14 }) }),
      /* @__PURE__ */ jsx(Combobox.Options, { children: /* @__PURE__ */ jsxs(ScrollArea.Autosize, { mah: 280, type: "scroll", children: [
        allLabel && /* @__PURE__ */ jsx(Combobox.Option, { value: "__all__", active: value === "", children: allLabel }),
        clearable && value && /* @__PURE__ */ jsx(Combobox.Option, { value: "__clear__", children: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "xCJdfg"
          }
        ) }) }),
        grouped.map((group) => /* @__PURE__ */ jsx(Combobox.Group, { label: group.label, children: group.items.map((occ) => {
          const isTodayOcc = isToday(occ, tz);
          return /* @__PURE__ */ jsx(Combobox.Option, { value: String(occ.id), active: value === String(occ.id), children: /* @__PURE__ */ jsxs(Text, { size: "sm", fw: isTodayOcc ? 700 : 400, children: [
            isTodayOcc && `${i18n._(
              /*i18n*/
              {
                id: "ecUA8p"
              }
            )} — `,
            formatOccurrenceLabel(occ, tz)
          ] }) }, occ.id);
        }) }, group.key)),
        totalFiltered === 0 && /* @__PURE__ */ jsx(Combobox.Empty, { children: i18n._(
          /*i18n*/
          {
            id: "/ZB4Um"
          }
        ) }),
        totalFiltered >= MAX_VISIBLE && totalAvailable > MAX_VISIBLE && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", ta: "center", py: 8, children: i18n._(
          /*i18n*/
          {
            id: "5rzhBQ",
            values: {
              MAX_VISIBLE,
              totalAvailable
            }
          }
        ) })
      ] }) })
    ] })
  ] }) });
};
export {
  OccurrenceSelect as O
};

import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useState, useEffect } from "react";
import { Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
const trigger = "_trigger_1s99h_1";
const chevron = "_chevron_1s99h_19";
const selected = "_selected_1s99h_23";
const sectionLabel = "_sectionLabel_1s99h_27";
const classes = {
  trigger,
  chevron,
  selected,
  sectionLabel
};
const getLabel = (preset) => {
  switch (preset) {
    case "today":
      return i18n._(
        /*i18n*/
        {
          id: "ecUA8p"
        }
      );
    case "last_7_days":
      return i18n._(
        /*i18n*/
        {
          id: "ct2SYD"
        }
      );
    case "last_30_days":
      return i18n._(
        /*i18n*/
        {
          id: "uq2BmQ"
        }
      );
    case "last_90_days":
      return i18n._(
        /*i18n*/
        {
          id: "XgOuA7"
        }
      );
    case "year_to_date":
      return i18n._(
        /*i18n*/
        {
          id: "+G/XiQ"
        }
      );
    case "event_first_week":
      return i18n._(
        /*i18n*/
        {
          id: "/bpZYb"
        }
      );
    case "event_first_month":
      return i18n._(
        /*i18n*/
        {
          id: "Vj6wk9"
        }
      );
    case "event_first_quarter":
      return i18n._(
        /*i18n*/
        {
          id: "ziEnjY"
        }
      );
    case "event_full":
      return i18n._(
        /*i18n*/
        {
          id: "cfvx/y"
        }
      );
  }
};
const ROLLING_PRESETS = ["today", "last_7_days", "last_30_days", "last_90_days", "year_to_date"];
const EVENT_PRESETS = ["event_first_week", "event_first_month", "event_first_quarter", "event_full"];
const isValidPreset = (raw, allowed) => {
  return raw !== null && allowed.includes(raw);
};
const PeriodSelector = ({
  value,
  onChange,
  storageKey,
  className = "",
  event
}) => {
  const [hydrated, setHydrated] = useState(false);
  const allowed = event ? [...ROLLING_PRESETS, ...EVENT_PRESETS] : ROLLING_PRESETS;
  useEffect(() => {
    if (hydrated || !storageKey) {
      if (!storageKey) {
        setHydrated(true);
      }
      return;
    }
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (isValidPreset(stored, allowed) && stored !== value) {
        onChange(stored);
      }
    } catch {
    }
    setHydrated(true);
  }, [hydrated, storageKey, value, onChange, allowed]);
  const handleSelect = (preset) => {
    onChange(preset);
    if (storageKey && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(storageKey, preset);
      } catch {
      }
    }
  };
  return /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, position: "bottom-end", withinPortal: true, children: [
    /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsxs(UnstyledButton, { className: `${classes.trigger} ${className}`, children: [
      /* @__PURE__ */ jsx("span", { children: getLabel(value) }),
      /* @__PURE__ */ jsx(IconChevronDown, { size: 14, className: classes.chevron })
    ] }) }),
    /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
      event && /* @__PURE__ */ jsx(Menu.Label, { className: classes.sectionLabel, children: i18n._(
        /*i18n*/
        {
          id: "M1HGuR"
        }
      ) }),
      ROLLING_PRESETS.map((preset) => /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleSelect(preset), className: value === preset ? classes.selected : "", children: getLabel(preset) }, preset)),
      event && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Menu.Divider, {}),
        /* @__PURE__ */ jsx(Menu.Label, { className: classes.sectionLabel, children: i18n._(
          /*i18n*/
          {
            id: "IzR/Fc"
          }
        ) }),
        EVENT_PRESETS.map((preset) => /* @__PURE__ */ jsx(Menu.Item, { onClick: () => handleSelect(preset), className: value === preset ? classes.selected : "", children: getLabel(preset) }, preset))
      ] })
    ] })
  ] });
};
export {
  PeriodSelector as P
};

import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Stack, ColorInput, Text, SegmentedControl, Group, Tooltip, Select } from "@mantine/core";
import { d as detectMode, v as validateThemeSettings, h as hasContrastIssues, H as HOMEPAGE_FONTS, D as DEFAULT_HOMEPAGE_FONT, b as buildHomepageFontUrl, a as buildHomepageFontStack } from "./themeUtils-B--ztbrW.js";
import { IconSun, IconMoon, IconEyeExclamation, IconEyeCheck } from "@tabler/icons-react";
import { useEffect, useMemo } from "react";
const ThemeColorControls = ({
  values,
  onChange,
  disabled = false
}) => {
  const handleAccentChange = (accent) => {
    onChange({
      ...values,
      accent
    });
  };
  const handleBackgroundChange = (background) => {
    const newMode = detectMode(background);
    onChange({
      ...values,
      background,
      mode: newMode
    });
  };
  const handleModeChange = (mode) => {
    onChange({
      ...values,
      mode
    });
  };
  useEffect(() => {
    if (values.background && !values.mode) {
      const detectedMode = detectMode(values.background);
      onChange({
        ...values,
        mode: detectedMode
      });
    }
  }, [values.background]);
  const currentMode = values.mode || "light";
  const hasIssues = useMemo(() => {
    const validated = validateThemeSettings(values);
    return hasContrastIssues(validated);
  }, [values.accent, values.background, values.mode]);
  return /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsx(ColorInput, { format: "hexa", label: i18n._(
      /*i18n*/
      {
        id: "1uJlG9"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "HxxXZO"
      }
    ), size: "sm", value: values.accent || "#8b5cf6", onChange: handleAccentChange, disabled }),
    /* @__PURE__ */ jsx(ColorInput, { format: "hexa", label: i18n._(
      /*i18n*/
      {
        id: "k1bLf+"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "KfmPRW"
      }
    ), size: "sm", value: values.background || "#f5f3ff", onChange: handleBackgroundChange, disabled }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: 4, children: i18n._(
        /*i18n*/
        {
          id: "FpsvqB"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mb: 8, children: i18n._(
        /*i18n*/
        {
          id: "PZ7FTW"
        }
      ) }),
      /* @__PURE__ */ jsx(SegmentedControl, { fullWidth: true, value: currentMode, onChange: handleModeChange, disabled, data: [{
        label: /* @__PURE__ */ jsxs(Group, { gap: 6, justify: "center", children: [
          /* @__PURE__ */ jsx(IconSun, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "1njn7W"
            }
          ) })
        ] }),
        value: "light"
      }, {
        label: /* @__PURE__ */ jsxs(Group, { gap: 6, justify: "center", children: [
          /* @__PURE__ */ jsx(IconMoon, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "pvnfJD"
            }
          ) })
        ] }),
        value: "dark"
      }] })
    ] }),
    /* @__PURE__ */ jsx(Group, { gap: 6, style: {
      minHeight: 20
    }, children: hasIssues ? /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
      /*i18n*/
      {
        id: "AaP0M+"
      }
    ), multiline: true, w: 220, children: /* @__PURE__ */ jsxs(Group, { gap: 6, style: {
      cursor: "help"
    }, children: [
      /* @__PURE__ */ jsx(IconEyeExclamation, { size: 30, color: "var(--mantine-color-yellow-6)" }),
      /* @__PURE__ */ jsx(Text, { size: "xs", c: "yellow.7", children: i18n._(
        /*i18n*/
        {
          id: "6K0GjX"
        }
      ) })
    ] }) }) : /* @__PURE__ */ jsxs(Group, { gap: 6, children: [
      /* @__PURE__ */ jsx(IconEyeCheck, { size: 30, color: "var(--mantine-color-teal-6)" }),
      /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
        /*i18n*/
        {
          id: "6nDzTl"
        }
      ) })
    ] }) })
  ] });
};
const option = "_option_3w2xo_1";
const optionLabel = "_optionLabel_3w2xo_9";
const optionSample = "_optionSample_3w2xo_14";
const classes = {
  option,
  optionLabel,
  optionSample
};
const ThemeFontControl = ({
  value,
  onChange,
  disabled = false
}) => {
  const selected = value || DEFAULT_HOMEPAGE_FONT;
  const data = useMemo(() => HOMEPAGE_FONTS.map((font) => ({
    value: font.value,
    label: font.label
  })), []);
  useEffect(() => {
    HOMEPAGE_FONTS.forEach((font) => {
      if (font.value === DEFAULT_HOMEPAGE_FONT || typeof document === "undefined") {
        return;
      }
      const id = `hi-font-preview-${font.bunnyFamily}`;
      if (document.getElementById(id)) {
        return;
      }
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = buildHomepageFontUrl(font.value);
      document.head.appendChild(link);
    });
  }, []);
  useEffect(() => {
  }, [selected]);
  const handleChange = (next) => {
    if (!next) {
      return;
    }
    onChange(next);
  };
  const renderOption = ({
    option: option2
  }) => /* @__PURE__ */ jsxs("div", { className: classes.option, style: {
    fontFamily: buildHomepageFontStack(option2.value)
  }, children: [
    /* @__PURE__ */ jsx("span", { className: classes.optionLabel, children: option2.label }),
    /* @__PURE__ */ jsx("span", { className: classes.optionSample, children: "Aa 123" })
  ] });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Select, { label: i18n._(
      /*i18n*/
      {
        id: "X+U6/w"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "pHEhf+"
      }
    ), size: "sm", value: selected, onChange: handleChange, data, disabled, searchable: true, allowDeselect: false, nothingFoundMessage: i18n._(
      /*i18n*/
      {
        id: "IcAC6J"
      }
    ), renderOption, styles: {
      input: {
        fontFamily: buildHomepageFontStack(selected)
      }
    } }),
    /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mt: 6, style: {
      fontFamily: buildHomepageFontStack(selected)
    }, children: i18n._(
      /*i18n*/
      {
        id: "OVSkIF"
      }
    ) })
  ] });
};
export {
  ThemeColorControls as T,
  ThemeFontControl as a
};

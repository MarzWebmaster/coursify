import { jsx } from "react/jsx-runtime";
import { MantineProvider, v8CssVariablesResolver } from "@mantine/core";
import { useMemo } from "react";
import { g as getContrastColor, e as hexToRgb } from "./themeUtils-B--ztbrW.js";
const LIGHT_PALETTE = {
  surface: "#ffffff",
  background: "#f8f9fa",
  textPrimary: "#1a1a1a",
  textSecondary: "#525252",
  textTertiary: "#737373",
  border: "#e5e7eb"
};
const DARK_PALETTE = {
  surface: "#1f1f1f",
  background: "#121212",
  textPrimary: "#ffffff",
  textSecondary: "#a3a3a3",
  textTertiary: "#737373",
  border: "#333333"
};
function createColorPalette(accentColor) {
  const rgb = hexToRgb(accentColor);
  if (!rgb) {
    return ["#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95"];
  }
  const {
    r,
    g,
    b
  } = rgb;
  const lighten = (factor) => {
    const lr = Math.round(r + (255 - r) * factor);
    const lg = Math.round(g + (255 - g) * factor);
    const lb = Math.round(b + (255 - b) * factor);
    return `rgb(${lr}, ${lg}, ${lb})`;
  };
  const darken = (factor) => {
    const dr = Math.round(r * (1 - factor));
    const dg = Math.round(g * (1 - factor));
    const db = Math.round(b * (1 - factor));
    return `rgb(${dr}, ${dg}, ${db})`;
  };
  return [lighten(0.9), lighten(0.8), lighten(0.6), lighten(0.4), lighten(0.2), accentColor, accentColor, accentColor, darken(0.15), darken(0.3)];
}
function createCheckoutTheme(accentColor, mode) {
  const primaryColors = createColorPalette(accentColor);
  const contrastColor = getContrastColor(accentColor);
  return {
    primaryColor: "primary",
    colors: {
      primary: primaryColors
    },
    primaryShade: mode === "dark" ? 6 : 7,
    components: {
      Button: {
        defaultProps: {
          color: "primary"
        },
        vars: (_theme, props) => {
          if (props.variant === "filled" || props.variant === void 0) {
            return {
              root: {
                "--button-color": contrastColor
              }
            };
          }
          return {
            root: {}
          };
        }
      },
      Checkbox: {
        defaultProps: {
          color: "primary"
        },
        vars: (_theme, _props) => ({
          root: {
            "--checkbox-icon-color": contrastColor
          }
        })
      },
      Switch: {
        defaultProps: {
          color: "primary"
        }
      },
      SegmentedControl: {
        defaultProps: {
          color: "primary"
        }
      },
      Badge: {
        defaultProps: {
          color: "primary"
        }
      }
    }
  };
}
function createCSSVariablesResolver(accentColor, mode) {
  return (theme) => {
    const v8 = v8CssVariablesResolver(theme);
    const palette = mode === "light" ? LIGHT_PALETTE : DARK_PALETTE;
    const accentContrast = getContrastColor(accentColor);
    const rgb = hexToRgb(accentColor);
    const accentSoft = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${mode === "light" ? 0.1 : 0.2})` : mode === "light" ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.2)";
    const accentMuted = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${mode === "light" ? 0.6 : 0.7})` : mode === "light" ? "rgba(139, 92, 246, 0.6)" : "rgba(139, 92, 246, 0.7)";
    return {
      variables: {
        ...v8.variables,
        "--checkout-accent": accentColor,
        "--checkout-accent-contrast": accentContrast,
        "--checkout-accent-soft": accentSoft,
        "--checkout-accent-muted": accentMuted,
        "--checkout-background": palette.background,
        "--checkout-surface": palette.surface,
        "--checkout-text-primary": palette.textPrimary,
        "--checkout-text-secondary": palette.textSecondary,
        "--checkout-text-tertiary": palette.textTertiary,
        "--checkout-border": palette.border,
        "--hi-text": palette.textPrimary,
        "--mantine-color-text": palette.textPrimary
      },
      light: v8.light,
      dark: v8.dark
    };
  };
}
const CheckoutThemeProvider = ({
  accentColor,
  mode,
  children
}) => {
  const theme = useMemo(() => createCheckoutTheme(accentColor, mode), [accentColor, mode]);
  const cssVariablesResolver = useMemo(() => createCSSVariablesResolver(accentColor, mode), [accentColor, mode]);
  return /* @__PURE__ */ jsx(MantineProvider, { theme, cssVariablesResolver, forceColorScheme: mode, children });
};
export {
  CheckoutThemeProvider as C
};

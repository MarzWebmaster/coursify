const sansStack = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const serifStack = `Georgia, 'Times New Roman', Times, serif`;
const displayStack = `Impact, 'Helvetica Neue', sans-serif`;
const HOMEPAGE_FONTS = [{
  value: "Outfit",
  label: "Outfit",
  category: "sans",
  bunnyFamily: "outfit",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Inter",
  label: "Inter",
  category: "sans",
  bunnyFamily: "inter",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Roboto",
  label: "Roboto",
  category: "sans",
  bunnyFamily: "roboto",
  weights: "400,500,700",
  stack: sansStack
}, {
  value: "Open Sans",
  label: "Open Sans",
  category: "sans",
  bunnyFamily: "open-sans",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Poppins",
  label: "Poppins",
  category: "sans",
  bunnyFamily: "poppins",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Montserrat",
  label: "Montserrat",
  category: "sans",
  bunnyFamily: "montserrat",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Lato",
  label: "Lato",
  category: "sans",
  bunnyFamily: "lato",
  weights: "400,700,900",
  stack: sansStack
}, {
  value: "Nunito",
  label: "Nunito",
  category: "sans",
  bunnyFamily: "nunito",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Raleway",
  label: "Raleway",
  category: "sans",
  bunnyFamily: "raleway",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "DM Sans",
  label: "DM Sans",
  category: "sans",
  bunnyFamily: "dm-sans",
  weights: "400,500,700",
  stack: sansStack
}, {
  value: "Plus Jakarta Sans",
  label: "Plus Jakarta Sans",
  category: "sans",
  bunnyFamily: "plus-jakarta-sans",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Work Sans",
  label: "Work Sans",
  category: "sans",
  bunnyFamily: "work-sans",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Space Grotesk",
  label: "Space Grotesk",
  category: "sans",
  bunnyFamily: "space-grotesk",
  weights: "400,500,600,700",
  stack: sansStack
}, {
  value: "Manrope",
  label: "Manrope",
  category: "sans",
  bunnyFamily: "manrope",
  weights: "400,500,600,700,800",
  stack: sansStack
}, {
  value: "Oswald",
  label: "Oswald",
  category: "display",
  bunnyFamily: "oswald",
  weights: "400,500,600,700",
  stack: displayStack
}, {
  value: "Bebas Neue",
  label: "Bebas Neue",
  category: "display",
  bunnyFamily: "bebas-neue",
  weights: "400",
  stack: displayStack
}, {
  value: "Playfair Display",
  label: "Playfair Display",
  category: "serif",
  bunnyFamily: "playfair-display",
  weights: "400,500,600,700,800",
  stack: serifStack
}, {
  value: "Merriweather",
  label: "Merriweather",
  category: "serif",
  bunnyFamily: "merriweather",
  weights: "400,700,900",
  stack: serifStack
}, {
  value: "Lora",
  label: "Lora",
  category: "serif",
  bunnyFamily: "lora",
  weights: "400,500,600,700",
  stack: serifStack
}];
const DEFAULT_HOMEPAGE_FONT = "Outfit";
const FONT_LOOKUP = HOMEPAGE_FONTS.reduce((acc, font) => ({
  ...acc,
  [font.value]: font
}), {});
const getHomepageFont = (value) => {
  if (value && FONT_LOOKUP[value]) {
    return FONT_LOOKUP[value];
  }
  return FONT_LOOKUP[DEFAULT_HOMEPAGE_FONT];
};
const buildHomepageFontStack = (value) => {
  const font = getHomepageFont(value);
  return `'${font.value}', ${font.stack}`;
};
const buildHomepageFontUrl = (value) => {
  const font = getHomepageFont(value);
  return `https://fonts.bunny.net/css?family=${font.bunnyFamily}:${font.weights}&display=swap`;
};
function hexToRgb(hex) {
  if (!hex || typeof hex !== "string") {
    return null;
  }
  const rgbMatch = hex.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10)
    };
  }
  const cleanHex = hex.replace(/^#/, "").trim();
  let fullHex = cleanHex;
  if (cleanHex.length === 3) {
    fullHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
  }
  if (cleanHex.length === 4) {
    fullHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
  }
  if (fullHex.length === 8) {
    fullHex = fullHex.substring(0, 6);
  }
  if (fullHex.length !== 6) {
    return null;
  }
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }
  return {
    r,
    g,
    b
  };
}
function calculateLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return 128;
  }
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
}
function detectMode(backgroundColor) {
  const luminance = calculateLuminance(backgroundColor);
  return luminance > 128 ? "light" : "dark";
}
function isLightColor(hex) {
  return calculateLuminance(hex) > 128;
}
function getContrastColor(backgroundColor) {
  return isLightColor(backgroundColor) ? "#1a1a1a" : "#ffffff";
}
function getDerivedColors(mode) {
  if (mode === "light") {
    return {
      surface: "#ffffff",
      textPrimary: "#1a1a1a",
      textSecondary: "#525252",
      textTertiary: "#737373",
      border: "rgba(0, 0, 0, 0.1)"
    };
  }
  return {
    surface: "#1f1f1f",
    textPrimary: "#ffffff",
    textSecondary: "#a3a3a3",
    textTertiary: "#737373",
    border: "rgba(255, 255, 255, 0.1)"
  };
}
function getAccentSoft(accent, mode) {
  const rgb = hexToRgb(accent);
  if (!rgb) {
    return mode === "light" ? "rgba(139, 92, 246, 0.08)" : "rgba(139, 92, 246, 0.15)";
  }
  const opacity = mode === "light" ? 0.08 : 0.15;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}
function getAccentMuted(accent, mode) {
  const rgb = hexToRgb(accent);
  if (!rgb) {
    return mode === "light" ? "rgba(139, 92, 246, 0.6)" : "rgba(139, 92, 246, 0.7)";
  }
  const opacity = mode === "light" ? 0.6 : 0.7;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}
function computeThemeVariables(settings) {
  const derived = getDerivedColors(settings.mode);
  const accentContrast = getContrastColor(settings.accent);
  const accentSoft = getAccentSoft(settings.accent, settings.mode);
  const accentMuted = getAccentMuted(settings.accent, settings.mode);
  return {
    "--theme-accent": settings.accent,
    "--theme-background": settings.background,
    "--theme-surface": derived.surface,
    "--theme-text-primary": derived.textPrimary,
    "--theme-text-secondary": derived.textSecondary,
    "--theme-text-tertiary": derived.textTertiary,
    "--theme-border": derived.border,
    "--theme-accent-contrast": accentContrast,
    "--theme-accent-soft": accentSoft,
    "--theme-accent-muted": accentMuted,
    "--theme-accent-tint-10": `color-mix(in srgb, ${settings.accent} 10%, ${derived.surface})`,
    "--theme-accent-tint-15": `color-mix(in srgb, ${settings.accent} 15%, ${derived.surface})`,
    "--theme-accent-tint-20": `color-mix(in srgb, ${settings.accent} 20%, ${derived.surface})`,
    "--theme-font-family": buildHomepageFontStack(settings.font_family)
  };
}
function getDefaultThemeSettings() {
  return {
    accent: "#8b5cf6",
    background: "#f5f3ff",
    mode: "light",
    background_type: "COLOR",
    font_family: DEFAULT_HOMEPAGE_FONT
  };
}
function validateThemeSettings(settings) {
  const defaults = getDefaultThemeSettings();
  if (!settings) {
    return defaults;
  }
  return {
    accent: settings.accent || defaults.accent,
    background: settings.background || defaults.background,
    mode: settings.mode || detectMode(settings.background || defaults.background),
    background_type: settings.background_type || defaults.background_type,
    font_family: settings.font_family || defaults.font_family
  };
}
function getRelativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5;
  const toLinear = (c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function getContrastRatio(foreground, background) {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function checkContrast(foreground, background) {
  const ratio = getContrastRatio(foreground, background);
  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
    level: ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "fail"
  };
}
function hasContrastIssues(settings) {
  const derived = getDerivedColors(settings.mode);
  const accentContrast = getContrastColor(settings.accent);
  const buttonTextContrast = checkContrast(accentContrast, settings.accent);
  if (!buttonTextContrast.passesAA) {
    return true;
  }
  const accentOnSurface = checkContrast(settings.accent, derived.surface);
  if (accentOnSurface.ratio < 3) {
    return true;
  }
  return false;
}
export {
  DEFAULT_HOMEPAGE_FONT as D,
  HOMEPAGE_FONTS as H,
  buildHomepageFontStack as a,
  buildHomepageFontUrl as b,
  computeThemeVariables as c,
  detectMode as d,
  hexToRgb as e,
  getContrastColor as g,
  hasContrastIssues as h,
  validateThemeSettings as v
};

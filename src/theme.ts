import { extendTheme } from "@chakra-ui/react";

export const styles = {
  global: () => ({
    "html, body": {
      padding: 0,
      margin: 0,
      //   fontFamily: "Gilroy, Helvetica, sans-serif, system-ui",
    },
    body: {
      //   bg: "linear(to-r, gray.300, yellow.400, pink.200)",
      bgGradient: "linear(to-b, #E3FDF5, #FFE6FA)",
      color: "textPrimary",
    },
  }),
};

export const themeColors = {
  theme: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#2FA8AF",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#2FA8AF",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044",
  },
};

export const semanticTokens = {
  colors: {
    backgroundCanvas: {
      default: "#D8F0F0",
    },
    backgroundCard: {
      default: "#FFFFFF",
    },
    textSecondary: {
      default: "#3F6870",
    },
    seperator: {
      default: "#d1fdff",
    },
    textPrimary: {
      default: "#075A5A",
    },
    textTertiary: {
      default: "#A1B6BA",
    },
    backgroundDivider: {
      default: "#B6DFDF",
    },
    backgroundField: {
      default: "#E4F8F8",
    },
    error: {
      default: "#FF4D4D",
    },
  },
};

export const getCustomTheme = () => {
  return extendTheme({
    colors: themeColors,
    styles,
    semanticTokens: semanticTokens,
  });
};

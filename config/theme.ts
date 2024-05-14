"use client";
import { createTheme } from "@mui/material";

const appTheme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#7A6FF0",
      clear: "#EAEAFC",
      dark: "#352C60",
      bgDark: "#F8F8FA",
      disabled: "#9793AD",
      light: "#AFA9F6",
    },

    secondary: {
      main: "#F6A623",
      bgMain: "#FEF5E7",
      dark: "#FF5E00",
      bgDark: "#FFE7D9",
      light: "#FDD141",
      bgLight: "#FFF6D7",
    },

    companyRed: {
      main: "#FF4348",
      light: "#FCEAE8",
      error: "#F75F5F",
      bgError: "#FEE7E7",
    },

    companyBlue: {
      main: "#02CEFF",
      bgMain: "#CCF5FF",
      dark: "#002DDD",
      bgDark: "#D9DFFA",
    },

    success: {
      main: "#00AE42",
      bgMain: "#D9F3E3",
    },

    greyScale: {
      white: "#ffffff",
      shade100: "#F8FAFC",
      shade200: "#EEF0F2",
      shade300: "#DBDEE0",
      shade400: "#BCC3CC",
      shade500: "#9AA7BB",
    },

    customColors: {
      primary: "#00E1C8",
      primaryLight: "#E1FFFC",
      secondary: "#FF4383",
      secondaryLight: "#FFDCEB",
      secondaryDark: "#D03CFF",
      bgSecondaryDark: "#F8E2FF",
    },

    surfaceBackground: {
      dark: "#4B4B4B",
      bgDark: "#E4E4E4",
      backdrop: "#808081",
      default: "#F8F8FA",
    },
  },
  typography: {
    fontFamily: "inherit",
    h1: {
      fontSize: "56px",
      fontWeight: "bold",
      lineHeight: 64 / 56,
    },
    h2: {
      fontSize: "48px",
      fontWeight: "bold",
      lineHeight: 48 / 48,
    },
    h3: {
      fontSize: "32px",
      fontWeight: 400,
      lineHeight: 40 / 32,
    },
    h4: {
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: 32 / 24,
    },
    h5B: {
      fontSize: "18px",
      fontWeight: "bold",
      lineHeight: 24 / 18,
    },
    h5M: {
      fontSize: "18px",
      fontWeight: "500",
      lineHeight: 24 / 18,
    },

    h6: {
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: 24 / 16,
    },
    subtitle: {
      fontSize: "14px",
      fontWeight: "700",
      lineHeight: 16 / 14,
    },
    body1: {
      fontSize: "16px",
      lineHeight: 24 / 16,
      fontWeight: "400",
    },
    body2: {
      fontSize: "14px",
      lineHeight: 16 / 14,
      fontWeight: "400",
    },
    body3: {
      fontSize: "14px",
      lineHeight: 20 / 14,
      fontWeight: "400",
    },
    button: {
      fontSize: "14px",
      lineHeight: 16 / 14,
      fontWeight: "500",
    },
    currencyValue: {
      fontSize: "14px",
      lineHeight: 16 / 14,
      fontWeight: "400",
    },
    caption: {
      fontSize: "12px",
      lineHeight: 16 / 12,
      fontWeight: "500",
    },
    overline: {
      fontSize: "10px",
      lineHeight: 16 / 10,
      fontWeight: "400",
    },
    overlineBold: {
      fontSize: "10px",
      lineHeight: 16 / 10,
      fontWeight: "400",
    },
  },
});

export default appTheme;

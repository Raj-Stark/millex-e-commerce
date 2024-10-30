/* eslint-disable */

import { Theme, ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface PaletteColor {
    // ! Primary Colors
    main: React.CSSProperties["color"];
    clear: React.CSSProperties["color"];
    dark: React.CSSProperties["color"];
    bgDark: React.CSSProperties["color"];
    active: React.CSSProperties["color"];
    disabled: React.CSSProperties["color"];
    light: React.CSSProperties["color"];

    // ! Secondary Colors
    main: React.CSSProperties["color"];
    bgMain: React.CSSProperties["color"];
    dark: React.CSSProperties["color"];
    bgDark: React.CSSProperties["color"];
    light: React.CSSProperties["color"];
    bgLight: React.CSSProperties["color"];
  }

  interface SimplePaletteColorOptions {
    // ! Primary
    main?: string;
    clear?: string;
    dark?: string;
    bgDark?: string;
    disabled?: string;
    light?: string;

    // ! Secondary
    main?: string;
    bgMain?: string;
    dark?: string;
    bgDark?: string;
    light?: string;
    bgLight?: string;
  }

  // ! Custom Colors Types

  interface Palette {
    greyScale: {
      white: React.CSSProperties["color"];
      shade100: React.CSSProperties["color"];
      shade200: React.CSSProperties["color"];
      shade300: React.CSSProperties["color"];
      shade400: React.CSSProperties["color"];
      shade500: React.CSSProperties["color"];
    };
    companyRed: {
      main: React.CSSProperties["color"];
      light: React.CSSProperties["color"];
      error: React.CSSProperties["color"];
      bgError: React.CSSProperties["color"];
    };

    companyBlue: {
      main: React.CSSProperties["color"];
      bgMain: React.CSSProperties["color"];
      dark: React.CSSProperties["color"];
      bgDark: React.CSSProperties["color"];
    };

    success: {
      main: React.CSSProperties["color"];
      bgMain: React.CSSProperties["color"];
    };

    customColors: {
      primary: React.CSSProperties["color"];
      primaryLight: React.CSSProperties["color"];
      secondary: React.CSSProperties["color"];
      secondaryLight: React.CSSProperties["color"];
      secondaryDark: React.CSSProperties["color"];
      bgSecondaryDark: React.CSSProperties["color"];
    };

    surfaceBackground: {
      dark: React.CSSProperties["color"];
      bgDark: React.CSSProperties["color"];
      backdrop: React.CSSProperties["color"];
      default: React.CSSProperties["color"];
    };
  }

  interface PaletteOptions {
    greyScale?: {
      white?: string;
      shade100?: string;
      shade200?: string;
      shade300?: string;
      shade400?: string;
      shade500?: string;
    };
    companyRed?: {
      main?: string;
      light?: string;
      error?: string;
      bgError?: string;
    };

    companyBlue?: {
      main?: string;
      bgMain?: string;
      dark?: string;
      bgDark?: string;
    };

    success?: {
      main?: string;
      bgMain?: string;
    };

    customColors?: {
      primary?: string;
      primaryLight?: string;
      secondary?: string;
      secondaryLight?: string;
      secondaryDark?: string;
      bgSecondaryDark?: string;
    };

    surfaceBackground?: {
      dark?: string;
      bgDark?: string;
      backdrop?: string;
      default?: string;
    };
  }

  interface TypographyVariants {
    h5B: React.CSSProperties;
    h5M: React.CSSProperties;
    subtitle: React.CSSProperties;
    body3: React.CSSProperties;
    currencyValue: React.CSSProperties;
    overlineBold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h5B?: React.CSSProperties;
    h5M?: React.CSSProperties;
    subtitle?: React.CSSProperties;
    body3?: React.CSSProperties;
    currencyValue?: React.CSSProperties;
    overlineBold?: React.CSSProperties;
  }

  interface CustomTheme extends Theme {
    palette: PaletteColor;
    typography: TypographyVariants;
  }

  interface CustomThemeOptions extends ThemeOptions {
    palette: PaletteColor;
    typography: TypographyVariants;
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h5B: true;
    h5M: true;
    subtitle: true;
    body3: true;
    currencyValue: true;
    overlineBold: true;
  }
}

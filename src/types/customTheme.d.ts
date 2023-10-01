import { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomPalette extends Palette {
    custom: {
      text: {
        tertiary: string;
        titleSecondary: string;
      };
      background: {
        tertiary: string;
        buttonPrimary: string;
        buttonSecondary: string;
      };
      border: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
  }

  interface CustomPaletteOptions extends PaletteOptions {
    custom?: {
      text?: {
        tertiary?: string;
        titleSecondary?: string;
      };
      background?: {
        tertiary?: string;
        buttonPrimary?: string;
        buttonSecondary?: string;
      };
      border?: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
      };
    };
  }

  interface Theme {
    palette: CustomPalette;
  }

  interface ThemeOptions {
    palette?: CustomPaletteOptions;
  }
}

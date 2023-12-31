import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      text: {
        tertiary: string;
        titlePrimary?: string;
        titleSecondary: string;
        code: string;
        css: string;
      };
      background: {
        primary: string,
        secondary: string,
        tertiary: string;
        code: string;
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

  interface PaletteOptions {
    custom?: {
      text?: {
        tertiary?: string;
        titlePrimary?: string;
        titleSecondary?: string;
        code?: string;
        css?: string;
      };
      background?: {
        primary?: string,
        secondary?: string,
        tertiary?: string;
        code?: string;
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
}

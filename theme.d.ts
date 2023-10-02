import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
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

  interface PaletteOptions {
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
}

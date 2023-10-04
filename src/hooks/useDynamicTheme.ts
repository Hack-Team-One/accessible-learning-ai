import { createTheme, Theme } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { textColorState, bgColorState, borderColorState } from '../states/colorState';

export const useDynamicTheme = (mode: 'light' | 'dark' = 'light'): Theme => {
  const textColor = useRecoilValue(textColorState);
  const bgColor = useRecoilValue(bgColorState);
  const borderColor = useRecoilValue(borderColorState);

  return createTheme({
    palette: {
      contrastThreshold: 4.5,
      mode: mode,
      primary: {
        main: textColor.primary,
        contrastText: textColor.secondary,
      },
      secondary: {
        main: bgColor.secondary,
        contrastText: textColor.tertiary,
      },
      background: {
        default: bgColor.primary,
        paper: bgColor.response,
      },
      text: {
        primary: textColor.primary,
        secondary: textColor.secondary,
      },
      custom: {
        text: {
          tertiary: textColor.tertiary,
          titlePrimary: textColor.titlePrimary,
          titleSecondary: textColor.titleSecondary,
        },
        background: {
          primary: bgColor.primary,
          secondary: bgColor.secondary,
          tertiary: bgColor.tertiary,
          buttonPrimary: bgColor.buttonPrimary,
          buttonSecondary: bgColor.buttonSecondary,
        },
        border: {
          primary: borderColor.primary,
          secondary: borderColor.secondary,
          tertiary: borderColor.tertiary,
        },
      },
    },
  });
};

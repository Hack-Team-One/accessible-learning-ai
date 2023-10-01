import { createTheme } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { textColorState, bgColorState, borderColorState } from '../states/colorState';

// export const useDynamicTheme = (mode: 'light' | 'dark' = 'light') => {
//   const textColor = useRecoilValue(textColorState);
//   const bgColor = useRecoilValue(bgColorState);
//   const borderColor = useRecoilValue(borderColorState);

//   return createTheme({
//     palette: {
//       mode: mode,
//       primary: {
//         main: textColor.primary,
//         contrastText: textColor.secondary,
//       },
//       secondary: {
//         main: bgColor.secondary,
//         contrastText: textColor.tertiary,
//       },
//       background: {
//         default: bgColor.primary,
//         paper: bgColor.response,
//       },
//       text: {
//         primary: textColor.titlePrimary,
//         secondary: textColor.titleSecondary,
//       },
//       custom: {
//         text: {
//           tertiary: textColor.tertiary,
//           titleSecondary: textColor.titleSecondary,
//         },
//         background: {
//           tertiary: bgColor.tertiary,
//           buttonPrimary: bgColor.buttonPrimary,
//           buttonSecondary: bgColor.buttonSecondary,
//         },
//         border: {
//           primary: borderColor.primary,
//           secondary: borderColor.secondary,
//           tertiary: borderColor.tertiary,
//         },
//       },
//     },
//   });
// };

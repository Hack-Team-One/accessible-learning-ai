import React from 'react';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import ThemeProvider from '@mui/system/ThemeProvider';
// import { useDynamicTheme } from '../hooks/useDynamicTheme';

function MyApp({ Component, pageProps }: AppProps) {
  // const theme = useDynamicTheme();

  return (
    <RecoilRoot>
      {/* <ThemeProvider theme={theme}> */}
        <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </RecoilRoot>
  );
}

export default MyApp;

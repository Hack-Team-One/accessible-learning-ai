import React from 'react';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

  // const isReady = useMemo(() => typeof window !== 'undefined', []);
	// const currentTheme = useRecoilValue(currentThemeState);
	// const theme = useMemo(() => themes[currentTheme], [currentTheme]);
	// // @ts-ignore palette options
	// const muiTheme = useMemo(() => createTheme(getDesignTokens(currentTheme)), [currentTheme]);

  // theme={currentTheme === 'dark' ? darkTheme() : lightTheme()} 

  return (
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;

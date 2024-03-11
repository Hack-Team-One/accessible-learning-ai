// components/Layout.tsx
import React from 'react';
import Head from 'next/head';
import Header from '../Header';
import ThemeProvider from '@mui/system/ThemeProvider';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';
import useDynamicStyles from '../../hooks/useDynamicStyling';
import AccessControlsModal, { Backdrop } from '../../components/AccessControlsModal';
import { Button } from '@mui/base';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const Layout: React.FC<{ children: React.ReactNode, title?: string }> = ({ children, title = 'Default Title' }) => {
  const theme = useDynamicTheme();

  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const {
    textFont,
    contentScaling,
    fontSize,
    lineHeight,
    letterSpacing,
  } = useDynamicStyles();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div style={{ marginLeft: openModal ? '-20%' : '0' }}> 
        <Header />
        <main>{children}</main>
      </div>
      <AccessControlsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        slots={{ backdrop: Backdrop }}
      />
      <Button 
        type="button" 
        onClick={() => setOpenModal(true)} 
        className="absolute bottom-8 right-8 hover:shadow-xl rounded-full border border-black w-12 h-12 md:w-14 md:h-14 z-[99999999]"
      >
        <AccessibilityNewIcon style={{ fontSize: fontSize.text_4xl }} />
      </Button>
    </ThemeProvider>
  );
};

export default Layout;

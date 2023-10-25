import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import AccessControlsModal, { Backdrop } from '../components/AccessControlsModal';
import AccessibleChat from '../components/AccessibleChat';
import { Button } from '@mui/base';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import useDynamicStyles from '../hooks/useDynamicStyling';
import ThemeProvider from '@mui/system/ThemeProvider';
import { useDynamicTheme } from '../hooks/useDynamicTheme';

const Home: React.FC = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const theme = useDynamicTheme();

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
        <title>Accessible Learning AI</title>
        <meta name="homepage with chaGPT user interface" content="initial-scale=1, width=device-width" />
      </Head>
      <div style={{ marginLeft: openModal ? '-20%' : '0' }}> 
        <Header />
        <AccessibleChat />
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


export default Home;

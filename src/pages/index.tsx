import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import AccessControlsModal, { Backdrop } from '../components/AccessControlsModal';
import AccessibleChat from '../components/AccessibleChat';
import { Button } from '@mui/base';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import useDynamicStyles from '../hooks/useDynamicStyles';

const Home: React.FC = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const {
    textColor,
    textFont,
    textSize,
    textStyles,
    bgStyles,
    borderStyles,
  } = useDynamicStyles();


  return (
    <div>
      <Head>
        <title>Accessible Learning AI</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header />
      <AccessibleChat/>
      <AccessControlsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        slots={{ backdrop: Backdrop }}
      />
      <Button 
        type="button" 
        onClick={() => setOpenModal(true)} 
        className="absolute bottom-3 right-3 hover:shadow-xl rounded-full border border-black w-12 h-12 md:w-14 md:h-14 z-[99999999]"
      >
        <AccessibilityNewIcon className={`${textSize.text_lg}`} />
      </Button>
    </div>
  );
};

export default Home;

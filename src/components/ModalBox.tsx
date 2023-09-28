import React from 'react';
import { Box, styled, Theme } from '@mui/system';
import ResetAdjustBtn from './ResetAdjustBtn';
import SeizureSafeProf from './SeizureSafeProf';

function ModalBox() {
  return (
    <>
      <Box sx={style}>
          <h2 id="unstyled-modal-title" className="text-center col-span-2">Accessibility Adjustments</h2>
          <ResetAdjustBtn />
          <div className="">
            <SeizureSafeProf />
          </div>
        </Box>
    </>
  )
}

export default ModalBox;

const style = (theme: Theme) => ({
  width: 400,
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});
import React from 'react';
import { Box, styled, Theme } from '@mui/system';
import ResetAdjustBtn from './ResetAdjustBtn';
import SeizureSafeProf from './SeizureSafeProf';
import AccessSizeControl from './AccessSizeControl';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

function ModalBox() {
  return (
    <>
      <Box sx={style}>
          <h2 id="unstyled-modal-title" className="text-center col-span-2">Accessibility Adjustments</h2>
          {/* <ResetAdjustBtn /> */}
          <AccessSizeControl title="Content Scaling" text="Default" icon={<ZoomOutMapIcon />}/>
          <AccessSizeControl title="Adjust Font Sizing" text="Default" icon={<HeightIcon />} />
          <AccessSizeControl title="Adjust Line Height" text="Default" icon={<FormatLineSpacingIcon />} />
          <AccessSizeControl title="Adjust Letter Spacing" icon={<SyncAltIcon />} text="Default" />
          {/* <div className="">
            <SeizureSafeProf />
          </div> */}
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
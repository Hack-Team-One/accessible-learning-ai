import React from 'react';
import clsx from 'clsx';
import { styled, Box, Theme } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import AccessProfiles from '../AccessProfiles';
import { useRecoilState } from 'recoil';
import {
  fontSizeState,
  lineHeightState,
  // letterSpacingState,
  // contentScalingState,
  // contentScalingStateType,
  fontSizeStateType,
  // lineHeightStateType,
  // letterSpacingStateType,
} from '../../states/textState';
import AccessSizeControl from '../AccessSizeControl';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import useDynamicStyles from '../../hooks/useDynamicStyles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  slots: {
    backdrop: React.ElementType;
  };
}

export default function AccessControlsModal({ open, onClose, slots}: ModalProps) {
  const {
    textColor,
    textFont,
    textSize,
    textStyles,
    bgStyles,
    borderStyles,
  } = useDynamicStyles();
  
  // const [contentScaling, setContentScaling] = useRecoilState(contentScalingState);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const [lineHeight, setLineHeight] = useRecoilState(lineHeightState);
  // const [letterSpacing, setLetterSpacing] = useRecoilState(letterSpacingState);

  const handleUpdateValue = (stateKey: string, newValue: number) => {
    // if (stateKey === contentScalingState.key) setContentScaling(Object.assign({...contentScaling}, { multiplier: newValue }));
    if (stateKey === fontSizeState.key) setFontSize(Object.assign({...fontSize}, { multiplier: newValue }));
    else if (stateKey === lineHeightState.key) setLineHeight(Object.assign({...lineHeight}, { multiplier: newValue }));
    // else if (stateKey === letterSpacingState.key) setLetterSpacing(Object.assign({...letterSpacing}, { multiplier: newValue }));
  };
  const fontM  = fontSize.multiplier
  console.log('fontSize =', { fontM, fontSize });
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={onClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          <h2 id="accessibility-controls-modal" className={`${textSize.text_lg} text-center col-span-2`}>Accessibility Adjustments</h2>
          <span id="transition-modal-description" style={{ marginTop: 16 }} className={`${textSize.text_base}`} >
            Adjust the following settings to make the website more accessible.
          </span>
          <AccessProfiles />
          <div className="flex flex-col">
          {/* <AccessSizeControl
            title="Content Scaling"
            text="Default"
            icon={<ZoomOutMapIcon />}
            state={contentScaling}
            setState={setContentScaling}
          /> */}
          <AccessSizeControl
            title="Adjust Font Sizing"
            text="Default"
            icon={<HeightIcon />}
            stateKey={fontSizeState.key}
            value={fontSize.multiplier}
            handleUpdateValue={handleUpdateValue}
          />
          <AccessSizeControl
            title="Adjust Line Height"
            text="Default"
            icon={<FormatLineSpacingIcon />}
            stateKey={lineHeightState.key}
            value={lineHeight.multiplier}
            handleUpdateValue={handleUpdateValue}
          />
          {/* <AccessSizeControl 
            title="Adjust Letter Spacing"
            icon={<SyncAltIcon />}
            text="Default"
            state={letterSpacing}
            setState={setLetterSpacing}
          /> */}
          </div>
        </Box>
      </StyledModal>
    </div>
  );
}

export const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.displayName = 'Backdrop';

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
  width: 400,
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

const TriggerButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@mui/base/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  textColorState,
  textFontState,
  fontSizeState,
} from '../states/textState';

function AccessSizeControl({ title = "" }) {
  // const [textColor, setTextColor] = useRecoilState(textColorState);
  // const [textFont, setTextFont] = useRecoilState(textFontState);
  // const [fontSize, setFontSize] = useRecoilState(fontSizeState);


  return(
    <div className="bg-slate-50 grid grid-cols-3 grid-rows-4">
      <h3 className="col-span-3">{title}</h3>
      <div>
        <Button className="bg-blue-500 rounded-full">
          <KeyboardArrowDownIcon className='text-white' />
        </Button>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        <Button className="bg-blue-500 rounded-full">
          <KeyboardArrowUpIcon className="text-white"/>
        </Button>
      </div>
    </div>
  )
}

export default AccessSizeControl;
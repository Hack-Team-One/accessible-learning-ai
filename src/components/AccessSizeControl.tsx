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

function AccessSizeControl({ title="", text="" }) {
  // const [textColor, setTextColor] = useRecoilState(textColorState);
  // const [textFont, setTextFont] = useRecoilState(textFontState);
  // const [fontSize, setFontSize] = useRecoilState(fontSizeState);


  return(
    <div className="bg-slate-100 grid grid-cols-3 mt-5 rounded-md">
      <h3 className="col-span-3 text-center mt-5 mb-5">{title}</h3>
      <div>
        <Button className="bg-blue-500 rounded-full ml-10 mb-5">
          <KeyboardArrowDownIcon className='text-white' />
        </Button>
      </div>
      <div className="bg-white mb-5">
        <p className="text-blue-500 text-center text-sm ">{text}</p>
      </div>
      <div className="relative">
        <Button className="bg-blue-500 rounded-full absolute right-10 mb-5">
          <KeyboardArrowUpIcon className="text-white"/>
        </Button>
      </div>
    </div>
  )
}

export default AccessSizeControl;
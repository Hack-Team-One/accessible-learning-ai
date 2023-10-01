import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@mui/base/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type AccessSizeControlProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
  defaultState: any;
  state: any;
  setState: any;
} 

function AccessSizeControl({
  title,
  text,
  icon,
  defaultState,
  state,
  setState,
}: AccessSizeControlProps) {

  const handleUpdateValue = (newValue: number) => {
    const fontSizeKeys: string[] = Object.keys(state)
    const updatedFontSize: Record<string, number> = {};
    const originalFontSize: Record<string, number> = {...defaultState};

    fontSizeKeys.forEach((key: string) => {
      updatedFontSize[key] = Math.round(originalFontSize[key] * newValue);
    });


    setState(Object.assign({...state}, updatedFontSize));
  };

  return (
    <div className="bg-slate-100 grid grid-cols-3 mt-5 rounded-md">
      <h3 className="col-span-3 text-center mt-5 mb-5">
        <>{icon}</>
        <>{title}</>
      </h3>
      <div>
        <Button
          className="bg-blue-500 rounded-full ml-10 mb-5 hover:scale-110"
          onClick={() => handleUpdateValue(state.multiplier - .1)}
        >
          <KeyboardArrowDownIcon className='text-white' />
        </Button>
      </div>
      <div className="bg-white mb-5">
        <p className="text-blue-500 text-center text-sm ">{text}</p>
      </div>
      <div className="relative">
        <Button
          className="bg-blue-500 rounded-full absolute right-10 mb-5 hover:scale-110"
          onClick={() => handleUpdateValue(state.multiplier + .1)}
        >
          <KeyboardArrowUpIcon className="text-white"/>
        </Button>
      </div>
    </div>
  )
}

export default AccessSizeControl;
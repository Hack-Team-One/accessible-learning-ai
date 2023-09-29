import * as React from 'react';
import clsx from 'clsx';
import { Switch as BaseSwitch, SwitchProps } from '@mui/base/Switch';
import useIsDarkMode from '../hooks/useIsDarkMode';

interface CustomSwitchProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
  label: string;
}

const offBgColor = 'white';
const onBgColor = 'blue';
const offTextColor = 'black';
const onTextColor = 'white';
const borderColor = 'black';
const offSideColor = 'gray';

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onChange, label }) => {
  const handleToggle = () => {
    onChange(!value);
  };
  const ariaLabel = { 'aria-label': `${label}` };

  const isDarkMode = useIsDarkMode();

  return (
    <div className={clsx(isDarkMode ? 'dark' : '', 'p-4')}>
      <label className="block mb-2">{label}</label>
      <Switch slotProps={{ input: { ...ariaLabel } }} defaultChecked={value} />
    </div>
  );
}

export default CustomSwitch;

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>((props, ref) => {
  return (
    <BaseSwitch
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => ({
          className: clsx(
            `relative inline-block w-20 h-6 m-2.5 border ${borderColor} rounded-2xl transform scale-3`,
            ownerState.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
          ),
        }),
        input: (ownerState) => ({
          className: clsx(
            'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
          ),
        }),
        track: (ownerState) => ({
          className: clsx(
            `absolute block w-full h-full rounded-2xl ${ownerState.checked ? onBgColor : offBgColor}`,
          ),
        }),
        thumb: (ownerState) => ({
          className: clsx(
            `block w-10 h-6 top-0 ${ownerState.checked ? 'left-10' : 'left-0'} rounded-2xl relative transition-all`,
          ),
          children: (
            <>
              <span className={`absolute left-1 text-${offTextColor}`}>OFF</span>
              <span className={`absolute right-1 text-${ownerState.checked ? onTextColor : offTextColor}`}>ON</span>
              <div className={clsx(
                `absolute w-8 h-6 top-0 border ${borderColor} rounded-2xl transition-all`,
                ownerState.checked ? 'left-10 bg-blue-500' : 'left-0',
              )}></div>
            </>
          ),
        }),
      }}
    />
  );
});

Switch.displayName = 'Switch';

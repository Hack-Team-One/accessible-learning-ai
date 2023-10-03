import * as React from 'react';
import clsx from 'clsx';
import { Switch as BaseSwitch, SwitchProps } from '@mui/base/Switch';
import { useTheme } from '@mui/system';
import useIsDarkMode from '../hooks/useIsDarkMode';

// type CustomSwitchProps = {
//   value: boolean;
//   onChange: (newValue: boolean) => void;
//   label: string;
// }

const offBgColor = 'bg-slate-100';
const onBgColor = 'bg-blue-500';
const offTextColor = 'black';
const onTextColor = 'white';
const borderColor = 'border-slate-400';
const offSideColor = 'gray';

// function useIsDarkMode() {
//   const theme = useTheme();
//   return theme.palette.mode === 'dark';
// }

export default function CustomSwitch({ value, onChange, label }) {
  const ariaLabel = { 'aria-label': 'Demo switch' };

  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <div className={"grid " + (isDarkMode ? 'dark' : '')} >
      <hr className="col-span-2"></hr>
      <Switch slotProps={{ input: { ...ariaLabel } }} className="col-start-1" />
      <h3 className="col-start-2 mt-3">{label}</h3>
    </div>
  );
}

// const resolveSlotProps = (fn: any, args: any) =>
//   typeof fn === 'function' ? fn(args) : fn;

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>((props, ref) => {
  return (
    <>
      <BaseSwitch
        ref={ref}
        {...props}
        slotProps={{
          ...props.slotProps,
          root: (ownerState) => ({
              className: clsx(
                `relative inline-block w-24 m-2.5 border ${borderColor} rounded-2xl transform scale-3`,
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
                `absolute block w-24 h-full rounded-2xl ${
                  ownerState.checked 
                    ? onBgColor 
                    : offBgColor
                  }`,
              ),
              children: (
                <>
                  <span className={`absolute top-1 right-1 pr-2 text-${offTextColor}`}>OFF</span>
                  <span className={`absolute top-1 left-1 pl-2 text-${ownerState.checked ? onTextColor : offTextColor}`}>ON</span>
                </>
              )
            }),
            thumb: (ownerState) => ({
              className: clsx(
                `block w-12 h-8 top-0 ${
                  ownerState.checked ? 'ml-12' : 'left-0'
                } rounded-2xl ${
                  ownerState.focusVisible
                  ? `${
                  ownerState.checked ? 'bg-white' : 'bg-slate-500'
                  } shadow-outline-switch`
                  : 'bg-white'
                } relative transition-all`,
              ),
            }),
        }}
      />
      
    </>
  );
});


// const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onChange, label }) => {
//   const handleToggle = () => {
//     onChange(!value);
//   };
//   return (
//     <div className={clsx(isDarkMode ? 'dark' : '', 'p-4')}>
//       <label className="block mb-2">{label}</label>
//       <Switch slotProps={{ input: { ...ariaLabel } }} defaultChecked={value} />
//     </div>
//   );
// }

// export default CustomSwitch;

// const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>((props, ref) => {
//   return (
//     <BaseSwitch
//       ref={ref}
//       {...props}
//       slotProps={{
//         ...props.slotProps,
//         root: (ownerState) => ({
//           className: clsx(
//             `relative inline-block w-20 h-6 m-2.5 border ${borderColor} rounded-2xl transform scale-3`,
//             ownerState.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
//           ),
//         }),
//         input: (ownerState) => ({
//           className: clsx(
//             'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
//           ),
//         }),
//         track: (ownerState) => ({
//           className: clsx(
//             `absolute block w-full h-full rounded-2xl ${ownerState.checked ? onBgColor : offBgColor}`,
//           ),
//         }),
//         thumb: (ownerState) => ({
//           className: clsx(
//             `block w-10 h-6 top-0 ${ownerState.checked ? 'left-10' : 'left-0'} rounded-2xl relative transition-all`,
//           ),
//           children: (
//             <>
//               <span className={`absolute left-1 text-${offTextColor}`}>OFF</span>
//               <span className={`absolute right-1 text-${ownerState.checked ? onTextColor : offTextColor}`}>ON</span>
//               <div className={clsx(
//                 `absolute w-8 h-6 top-0 border ${borderColor} rounded-2xl transition-all`,
//                 ownerState.checked ? 'left-10 bg-blue-500' : 'left-0',
//               )}></div>
//             </>
//           ),
//         }),
//       }}
//     />
//   );
// });

// Switch.displayName = 'Switch';

import React from 'react';
import { Switch } from '@mui/base/Switch';

interface CustomSwitchProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
  label: string;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onChange, label }) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <div>
      <label>{label}</label>
      <Switch
        checked={value}
        onChange={handleToggle}
        slots={{
          root: 'div',
          track: 'div',
          thumb: 'div',
        }}
        slotProps={{
          root: { style: switchStyles.root },
          track: { style: switchStyles.track },
          thumb: {
            style: {
              ...switchStyles.thumb,
              left: value ? '50%' : '0',
              justifyContent: value ? 'flex-end' : 'flex-start',
            },
            children: value ? 'ON' : 'OFF',
          },
        }}
      />
    </div>
  );
};

export default CustomSwitch;

const switchStyles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100px', // Adjust width as needed
    height: '40px', // Adjust height as needed
    borderRadius: '20px',
    backgroundColor: '#f2f3f8',
    position: 'relative',
    cursor: 'pointer',
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    backgroundColor: '#1f2533',
  },
  thumb: {
    width: '50%',
    height: '100%',
    backgroundColor: '#f2f3f8',
    position: 'absolute',
    top: '0',
    left: '0',
    transition: 'left .3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    color: '#1f2533',
    zIndex: 1,
  },
};

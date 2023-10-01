import { useTheme } from '@mui/system';
import { useState } from 'react';

export default function useIsDarkMode() {
  const theme = useTheme();
  const [mode, setMode] = useState<'light' | 'dark'>(theme.palette.mode);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return { isDarkMode: mode === 'dark', toggleMode };
}

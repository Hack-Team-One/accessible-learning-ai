import { useTheme } from '@mui/system';

export default function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}
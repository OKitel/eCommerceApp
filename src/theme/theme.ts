import { createTheme } from '@mui/material/styles';
import { colors, fontSizes } from './consts';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.secondaryContrast,
    },
    text: {
      primary: colors.textPrimary,
    },
  },
  typography: {
    h1: {
      fontSize: fontSizes[800],
    },
  },
});
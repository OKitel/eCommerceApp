import { createTheme } from '@mui/material/styles';

import { colors, fonts, fontSizes } from './consts';

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
      fontFamily: fonts.heading,
      fontSize: fontSizes[800],
    },
    h4: {
      fontFamily: fonts.heading,
    },
  },
});

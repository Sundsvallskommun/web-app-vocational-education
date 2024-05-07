import { defaultTheme } from 'react-admin';

export const theme = {
  ...defaultTheme,
  sidebar: {
    width: 320,
  },
  palette: {
    background: {
      default: '#fafafb',
    },
    primary: {
      light: '#f3fcf8',
      main: '#208357',
      dark: '#208357',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f3fcf8',
      main: '#208357',
      dark: '#208357',
      contrastText: '#fff',
    },
  },
};

export default theme;

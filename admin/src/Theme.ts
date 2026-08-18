import { defaultTheme } from 'react-admin';

export const theme = {
  ...defaultTheme,
  sidebar: {
    width: 380,
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
  components: {
    ...defaultTheme.components,
    // react-admin 5 removed the `margin` prop on <SimpleForm>, which every form in
    // this app used to set to "none". The same result is achieved by defaulting the
    // MUI input components to no margin here.
    MuiTextField: {
      defaultProps: {
        margin: 'none' as const,
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'none' as const,
      },
    },
  },
};

export default theme;

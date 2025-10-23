'use client';

import LoginGuard from '@components/login-guard/login-guard';
import { AppWrapper } from '@contexts/app-context/app-wrapper';
import { ColorSchemeMode, GuiProvider, extendTheme } from '@sk-web-gui/react';
import '@styles/tailwind.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

// Create a client
const queryClient = new QueryClient();

dayjs.extend(utc);
dayjs.locale('sv');
dayjs.extend(updateLocale);
dayjs.updateLocale('sv', {
  months: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
});

export function MyApp(props: { children: React.ReactNode }) {
  const theme = extendTheme({
    colorSchemes: {
      light: {
        colors: {
          primary: {
            DEFAULT: '#655afc',
            hover: '#655afc',
            light: '#655afc',
          },
          secondary: {
            DEFAULT: '#208357',
          },
          'black': '#000',
          'black-light': '#333',
          white: '#FCFCFC',
          green: {
            DEFAULT: '#208357',
            middle: '#219561',
            light: '#f3fcf8',
            background: '#208357'
          },
          red: {
            DEFAULT: '#da2f40',
          },
          blue: {
            DEFAULT: '#655afc',
            light: '#f0f4f7',
          },
          label: {
            DEFAULT: '#5a5a5a',
          },
          error: {
            DEFAULT: '#DA2F40',
          },
          divider: '#8C8C8C',
          'border-color': '#16262d',
          disabled: '#bababa',
          'background-gray': '#919191',
          'dark-disabled': '#D9D9D9',
        },
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: '#B3B0DB',
            hover: '#B3B0DB',
            light: '#B3B0DB',
          },
          secondary: {
            DEFAULT: '#F1F9F5',
          },
          'black': '#FFF',
          'black-light': '#FFF',
          white: '#2F2F3C',
          green: {
            DEFAULT: '#F1F9F5',
            middle: '#CDEBD9',
            light: '#181926',
            background: '#192127'
          },
          red: {
            DEFAULT: '#FCD4D4',
          },
          blue: {
            DEFAULT: '#B3B0DB',
            light: '#212233',
          },
          label: {
            DEFAULT: '#F9F9F9',
          },
          error: {
            DEFAULT: '#FCD4D4',
          },
          divider: '#AAAAAA',
          'border-color': '#8C8C8C',
          disabled: '#828282',
          'background-gray': '#BCBCBC',
          'dark-disabled': '#D9D9D9',
        },
      },
    },
  });

  return (
    <GuiProvider theme={theme} colorScheme={ColorSchemeMode.System}>
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          <LoginGuard>{props.children}</LoginGuard>
        </AppWrapper>
      </QueryClientProvider>
    </GuiProvider>
  );
}

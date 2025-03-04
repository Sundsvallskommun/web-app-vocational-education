'use client';

import LoginGuard from '@components/login-guard/login-guard';
import { AppWrapper } from '@contexts/app-context/app-wrapper';
import { ColorSchemeMode, GuiProvider, defaultTheme } from '@sk-web-gui/react';
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

function MyApp(props: { children: React.ReactNode }) {
  return (
    <GuiProvider theme={defaultTheme} colorScheme={ColorSchemeMode.Light}>
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          <LoginGuard>{props.children}</LoginGuard>
        </AppWrapper>
      </QueryClientProvider>
    </GuiProvider>
  );
}

export function AppLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head />
      <body>
        <MyApp>{props.children}</MyApp>;
      </body>
    </html>
  );
}

export default AppLayout;

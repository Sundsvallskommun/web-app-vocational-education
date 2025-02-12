import LoginGuard from '@components/login-guard/login-guard';
import { ColorSchemeMode, GuiProvider, defaultTheme } from '@sk-web-gui/react';
import '@styles/tailwind.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import type { AppProps /*, AppContext */ } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppWrapper } from '@contexts/app-context/app-wrapper';

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GuiProvider theme={defaultTheme} colorScheme={ColorSchemeMode.Light}>
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          <LoginGuard>
            <Component {...pageProps} />
          </LoginGuard>
        </AppWrapper>
      </QueryClientProvider>
    </GuiProvider>
  );
}

export default MyApp;

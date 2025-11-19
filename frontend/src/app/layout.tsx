import { MyApp } from '@layouts/app-layout/app-layout.component';

export async function AppLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link rel="icon" type="image/png" href="/meta/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/meta/favicon-128x128.png" sizes="128x128" />
        <link rel="icon" type="image/png" href="/meta/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/meta/favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/meta/apple-touch-icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/meta/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/meta/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/meta/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/meta/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/meta/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/meta/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/meta/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/meta/apple-touch-icon-152x152.png" />
      </head>
      <body>
        <MyApp>{props.children}</MyApp>
      </body>
    </html>
  );
}

export default AppLayout;

import { MyApp } from '@layouts/app-layout/app-layout.component';

export async function AppLayout(props: { children: React.ReactNode }) {
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

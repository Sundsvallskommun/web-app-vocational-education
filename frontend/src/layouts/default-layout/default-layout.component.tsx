import { CookieConsent, Footer, Header, Link } from '@sk-web-gui/react';
import { useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Menu from '@components/menu/menu.component';
import Image from 'next/image';
import logo_stacked from '@public/svg/logo_stacked.svg';
import HeaderLogo from '@components/logo/header-logo.component';
import Sticky from 'react-sticky-el';
import { useRouter } from 'next/router';
import { LayoutData } from '@interfaces/admin-data';
import { getLayout } from '@services/layout-service';
import sanitized from '@services/sanitizer-service';

interface DefaultLayoutProps {
  title: string;
  children: React.ReactElement | React.ReactElement[];
  layoutData?: LayoutData;
}

export async function getServerSideProps({ res }) {
  return await getLayout(res);
}

export default function DefaultLayout({ layoutData, title, children }: DefaultLayoutProps) {
  const initialFocus = useRef(null);
  const [menuShow, setMenuShow] = useState(false);
  let lastScrollTop = 0;
  const router = useRouter();
  const setInitialFocus = () => {
    setTimeout(() => {
      initialFocus.current && initialFocus.current.focus();
    });
  };

  const listenToScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll
      setMenuShow(false);
    } else {
      // upscroll
      setMenuShow(true);
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="DefaultLayout full-page-layout">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Yrkesutbildningar" />
      </Head>

      <NextLink legacyBehavior={true} href={`${router.pathname}#content`} passHref>
        <a onClick={setInitialFocus} accessKey="s" className="next-link-a">
          Hoppa till innehåll
        </a>
      </NextLink>

      <Sticky
        boundaryElement=".DefaultLayout"
        // wrapperClassName="shadow"
        stickyStyle={{ top: menuShow ? 0 : '-150px', transition: 'all .3s ease-in-out' }}
        // !relative lg:!fixed för desktop only sticky
        stickyClassName={`block z-10 shadow-md ${menuShow ? 'menu-show' : 'menu-hide'}`}
      >
        <Header className="!max-width-content py-0">
          <div className="container">
            <div className="w-full flex items-center justify-between">
              <HeaderLogo />
              <Menu />
            </div>
          </div>
        </Header>
      </Sticky>

      <div className="main-container flex-grow">
        <main>{children}</main>
      </div>

      <CookieConsent
        title="Kakor på Yrkesutbildningar"
        body={
          <p>
            Vi använder kakor, cookies, för att ge dig en förbättrad upplevelse, sammanställa statistik och för att viss
            nödvändig funktionalitet ska fungera på webbplatsen.{' '}
            <NextLink href="/kakor" passHref>
              <Link as="span">Läs mer om hur vi använder kakor</Link>
            </NextLink>
          </p>
        }
        cookies={[
          {
            optional: false,
            displayName: 'Nödvändiga kakor',
            description:
              'Dessa kakor är nödvändiga för att webbplatsen ska fungera och kan inte stängas av i våra system.',
            cookieName: 'necessary',
          },
          {
            optional: true,
            displayName: 'Funktionella kakor',
            description: ' Dessa kakor ger förbättrade funktioner på webbplatsen.',
            cookieName: 'func',
          },
          {
            optional: true,
            displayName: 'Kakor för statistik',
            description:
              'Dessa kakor tillåter oss att räkna besök och trafikkällor, så att vi kan mäta och förbättra prestanda på vår webbplats.',
            cookieName: 'stats',
          },
        ]}
        resetConsentOnInit={false}
        onConsent={() => {
          // FIXME: do stuff with cookies?
          // NO ANO FUNCTIONS
        }}
      />

      <Footer color="gray">
        <div className="mx-auto">
          <div className="w-full flex justify-center mb-2xl md:mb-[84px]">
            <span>
              <Image width={170} height={131} src={logo_stacked} alt="" aria-hidden="true" />
            </span>
          </div>
          <div className="flex flex-col text-sm gap-2xl lg:gap-3xl md:flex-row">
            <div className="max-w-[215px] text-[12px]">
              <h2 className="text-lg mb-sm">Meny</h2>
              <div className="flex flex-col gap-[1rem]">
                <Link href="#">
                  <span>För dig som söker utbildning</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
                <Link href="#">
                  <span>För utbildningsannordnare</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
                <Link href="#">
                  <span>För arbetsgivare</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
              </div>
            </div>
            <div className="max-w-[215px] text-[12px]">
              <h2 className="text-lg mb-sm">Om sidan</h2>
              <div className="flex flex-col gap-[1rem]">
                <Link href="#">
                  <span>Behandling av personuppgifter</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
                <Link href="#">
                  <span>Tillgänglighetsredogörelse</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
                <Link href="#">
                  <span>Om webbplatsen</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
                <Link href="#">
                  <span>Cookies</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
              </div>
            </div>
            <div className="max-w-[215px] text-[12px]">
              <h2 className="text-lg mb-sm">{layoutData?.footer?.contactTitle || ''}</h2>
              <span
                className="text [&>*]:leading-[2.58]"
                dangerouslySetInnerHTML={{
                  __html: sanitized(layoutData?.footer?.contactText || ''),
                }}
              />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}

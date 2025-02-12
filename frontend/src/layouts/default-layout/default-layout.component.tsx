import HeaderLogo from '@components/logo/header-logo.component';
import Menu from '@components/menu/menu.component';
import { LayoutData } from '@interfaces/admin-data';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logo_stacked from '@public/svg/logo_stacked.svg';
import { getLayout } from '@services/layout-service';
import sanitized from '@services/sanitizer-service';
import { CookieConsent, Footer, Header, Link } from '@sk-web-gui/react';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { IncomingMessage, ServerResponse } from 'node:http';
import { useEffect, useState } from 'react';
import Sticky from 'react-sticky-el';

interface DefaultLayoutProps {
  title: string;
  children: React.ReactElement | React.ReactElement[];
  layoutData?: LayoutData;
}

export async function getServerSideProps({ res }: { res: ServerResponse<IncomingMessage> }) {
  return await getLayout(res);
}

export default function DefaultLayout({ layoutData, title, children }: DefaultLayoutProps) {
  const [menuShow, setMenuShow] = useState(false);
  let lastScrollTop = 0;

  const setInitialFocus = () => {
    const contentElement = document.getElementById('content');
    if (contentElement) {
      contentElement.focus();
    }
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

      <NextLink legacyBehavior={true} href={`#content`} passHref>
        <a onClick={setInitialFocus} accessKey="s" className="next-link-a">
          Hoppa till innehåll
        </a>
      </NextLink>

      <Sticky
        boundaryElement=".DefaultLayout"
        // wrapperClassName="shadow"
        stickyStyle={{ top: menuShow ? 0 : '-150px', transition: 'all .3s ease-in-out' }}
        // !relative desktop:!fixed för desktop only sticky
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
        <main id="content">{children}</main>
      </div>

      <CookieConsent
        title="Kakor på Yrkesutbildningar"
        body={
          <p>
            Vi använder kakor, cookies, för att ge dig en förbättrad upplevelse, sammanställa statistik och för att viss
            nödvändig funktionalitet ska fungera på webbplatsen.{' '}
            <NextLink href="/kakor">
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

      <Footer color="gray" className="justify-start medium-device:justify-center py-50 medium-device:py-100">
        <div className="w-full flex flex-col justify-start medium-device:justify-center">
          <div className="w-full flex justify-center mb-2xl medium-device:mb-[84px]">
            <span>
              <Image width={170} height={131} src={logo_stacked} alt="" aria-hidden="true" />
            </span>
          </div>
          <div className="w-max medium-device:mx-auto flex flex-col text-sm gap-2xl desktop:gap-3xl medium-device:flex-row">
            <div className="max-w-[215px] text-[12px]">
              <h2 className="text-large mb-sm">Meny</h2>
              <div className="flex flex-col gap-[1rem]">
                <NextLink href="/utbildningar">
                  <Link as="span">
                    <span>För dig som söker utbildning</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
                <NextLink href="/utbildningsanordnare">
                  <Link as="span">
                    <span>För utbildningsanordnare</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
                <NextLink href="/arbetsgivare">
                  <Link as="span">
                    <span>För arbetsgivare</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
              </div>
            </div>
            <div className="max-w-[215px] text-[12px]">
              <h2 className="text-large mb-sm">Om sidan</h2>
              <div className="flex flex-col gap-[1rem]">
                <NextLink href="/personuppgifter">
                  <Link as="span">
                    <span>Behandling av personuppgifter</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
                <NextLink href="/tillganglighetsredogorelse">
                  <Link as="span">
                    <span>Tillgänglighetsredogörelse</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
                <NextLink href="/om-webbplatsen">
                  <Link as="span">
                    <span>Om webbplatsen</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
                <NextLink href="/kakor">
                  <Link as="span">
                    <span>Cookies</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
              </div>
            </div>
            <div className="max-w-[215px] text-[12px]">
              <h2 className="text-large mb-sm">{layoutData?.footer?.contactTitle || ''}</h2>
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

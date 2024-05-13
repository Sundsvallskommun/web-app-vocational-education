import { Button, Link, MenuVertical } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';
import MenuModal from '@components/modal/menu-modal.component';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useUserStore } from '@services/user-service/user-service';

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState('/');
  const user = useUserStore((s) => s.user);

  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setActiveUrl(router.pathname);
    setIsOpen(false);
  }, [router.pathname]);

  return (
    <div className="menu">
      <Button
        variant="ghost"
        className="text-green p-sm"
        rightIcon={<MenuOutlinedIcon className="material-icon ml-sm !text-[3rem]" />}
        onClick={handleOpen}
      >
        Menu
      </Button>
      <MenuModal show={isOpen} onClose={handleClose} className="h-screen">
        <div className="max-w-[410px]">
          <MenuVertical.Provider current={activeUrl} setCurrent={setActiveUrl}>
            <MenuVertical.Nav>
              <MenuVertical>
                <MenuVertical.Item menuIndex="/utbildningar">
                  <NextLink href="/utbildningar">För dig som söker utbildning</NextLink>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/arbetsgivare">
                  <MenuVertical>
                    <MenuVertical.SubmenuButton>
                      <NextLink href="/arbetsgivare">För arbetsgivare</NextLink>
                    </MenuVertical.SubmenuButton>
                    <MenuVertical.Item menuIndex="/arbetsgivare/kontakta">
                      <NextLink href="/arbetsgivare/kontakta">Listning utbildningsanordnare</NextLink>
                    </MenuVertical.Item>
                  </MenuVertical>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/utbildningsanordnare">
                  <NextLink href="/utbildningsanordnare">För utbildningsanordnare</NextLink>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/kontakta">
                  <NextLink href="/kontakta">Kontakta oss</NextLink>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/siteguide">
                  <NextLink href="/siteguide">Siteguide (Development)</NextLink>
                </MenuVertical.Item>
              </MenuVertical>
            </MenuVertical.Nav>
          </MenuVertical.Provider>

          <div className="mt-2xl flex flex-col gap-sm md:gap-md text-[12px] md:text-base">
            <NextLink href="#">
              <Link as="span">
                <span>Behandling av personuppgifter</span> <ArrowForwardIcon className="material-icon !text-xl" />
              </Link>
            </NextLink>
            <NextLink href="#">
              <Link as="span">
                <span>Tillgänglighetsredogörelse</span> <ArrowForwardIcon className="material-icon !text-xl" />
              </Link>
            </NextLink>
            <NextLink href="#">
              <Link as="span">
                <span>Om webbplatsen</span> <ArrowForwardIcon className="material-icon !text-xl" />
              </Link>
            </NextLink>{' '}
            <NextLink href="#">
              <Link as="span">
                <span>Cookies</span> <ArrowForwardIcon className="material-icon !text-xl" />
              </Link>
            </NextLink>
            {user.username ?
              <NextLink href="/logout">
                <Link as="span">
                  <span>Logga ut</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
              </NextLink>
            : <NextLink href={`/login?path=${router.pathname}`}>
                <Link as="span">
                  <span>Logga in</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
              </NextLink>
            }
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default Menu;

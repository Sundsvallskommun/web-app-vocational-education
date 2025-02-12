import MenuModal from '@components/modal/menu-modal.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useUserStore } from '@services/user-service/user-service';
import { Button, Link, MenuVertical } from '@sk-web-gui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((s) => s.user);
  const pathname = usePathname();
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGoto = (current: string) => {
    setIsOpen(false);
    if (current !== pathname) {
      router.push(current);
    }
  };

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
        <div>
          <MenuVertical.Provider current={pathname}>
            <MenuVertical.Nav>
              <MenuVertical>
                <MenuVertical.Item menuIndex="/utbildningar">
                  <MenuVertical>
                    {/** @ts-expect-error onClick is not yet typed in the component */}
                    <MenuVertical.SubmenuButton menuIndex="/utbildningar" onClick={() => handleGoto('/utbildningar')}>
                      För dig som söker utbildning
                    </MenuVertical.SubmenuButton>
                    <MenuVertical.Item menuIndex="/utbildningar/sok">
                      <button onClick={() => handleGoto('/utbildningar/sok')}>Sök utbildning</button>
                    </MenuVertical.Item>
                  </MenuVertical>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/arbetsgivare">
                  <button onClick={() => handleGoto('/arbetsgivare')}>För arbetsgivare</button>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/utbildningsanordnare">
                  <button onClick={() => handleGoto('/utbildningsanordnare')}>För utbildningsanordnare</button>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/kontakta-oss">
                  <button onClick={() => handleGoto('/kontakta-oss')}>Kontakta oss</button>
                </MenuVertical.Item>
              </MenuVertical>
            </MenuVertical.Nav>
          </MenuVertical.Provider>

          <div className="mt-2xl flex flex-col gap-sm medium-device:gap-md text-[12px] medium-device:text-base">
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
            {user.username && (
              <NextLink href="/logout">
                <Link as="span">
                  <span>Logga ut</span> <ArrowForwardIcon className="material-icon !text-xl" />
                </Link>
              </NextLink>
            )}
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default Menu;

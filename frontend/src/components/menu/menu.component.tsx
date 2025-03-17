import MenuModal from '@components/modal/menu-modal.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useUserStore } from '@services/user-service/user-service';
import { Button, Link, MenuVertical } from '@sk-web-gui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((s) => s.user);
  const pathname = usePathname();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="menu">
      <Button
        variant="ghost"
        className="text-green p-sm"
        rightIcon={<MenuOutlinedIcon className="material-icon ml-sm !text-[3rem]" />}
        onClick={handleOpen}
      >
        Meny
      </Button>
      <MenuModal show={isOpen} onClose={handleClose} className="h-screen">
        <div>
          <MenuVertical.Provider current={pathname}>
            <MenuVertical.Nav aria-label="Huvudmeny">
              <MenuVertical>
                <MenuVertical.Item menuIndex="/utbildningar">
                  <MenuVertical>
                    <MenuVertical.SubmenuButton menuIndex="/utbildningar">
                      <NextLink href="/utbildningar">För dig som söker utbildning</NextLink>
                    </MenuVertical.SubmenuButton>
                    <MenuVertical.Item menuIndex="/utbildningar/sok">
                      <NextLink href="/utbildningar/sok">Sök utbildning</NextLink>
                    </MenuVertical.Item>
                  </MenuVertical>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/arbetsgivare">
                  <NextLink href="/arbetsgivare">För arbetsgivare</NextLink>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/utbildningsanordnare">
                  <NextLink href="/utbildningsanordnare">För utbildningsanordnare</NextLink>
                </MenuVertical.Item>
                <MenuVertical.Item menuIndex="/kontakta-oss">
                  <NextLink href="/kontakta-oss">Kontakta oss</NextLink>
                </MenuVertical.Item>
              </MenuVertical>
            </MenuVertical.Nav>
          </MenuVertical.Provider>

          <nav
            aria-label="Snabblänkar"
            className="mt-2xl flex flex-col gap-sm medium-device:gap-md text-[12px] medium-device:text-base"
          >
            <ul>
              <li>
                <NextLink href="/personuppgifter">
                  <Link as="span">
                    <span>Behandling av personuppgifter</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
              </li>
              <li>
                <NextLink href="/tillganglighetsredogorelse">
                  <Link as="span">
                    <span>Tillgänglighetsredogörelse</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
              </li>
              <li>
                <NextLink href="/om-webbplatsen">
                  <Link as="span">
                    <span>Om webbplatsen</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
              </li>
              <li>
                <NextLink href="/kakor">
                  <Link as="span">
                    <span>Cookies</span> <ArrowForwardIcon className="material-icon !text-xl" />
                  </Link>
                </NextLink>
              </li>
              {user.username && (
                <li>
                  <NextLink href="/logout">
                    <Link as="span">
                      <span>Logga ut</span> <ArrowForwardIcon className="material-icon !text-xl" />
                    </Link>
                  </NextLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </MenuModal>
    </div>
  );
};

export default Menu;

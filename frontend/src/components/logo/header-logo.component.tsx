import Image from 'next/image';
import NextLink from 'next/link';
import { ColorSchemeMode, useGui } from '@sk-web-gui/react';

export const HeaderLogo: React.FC = () => {

const { colorScheme, preferredColorScheme } = useGui();
const mode = colorScheme === ColorSchemeMode.System ? preferredColorScheme : colorScheme;

  return (
    <NextLink
      href="/"
      className="flex relative items-center h-[45px] w-[164px] desktop:h-[51px] desktop:w-[184px] rounded-10 focus:outline-offset-8"
    >
      <Image fill src={`${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logo_row_${mode}mode.svg`} alt={'Yrkesutbildning Mitt'} />
    </NextLink>
  );
};

export default HeaderLogo;

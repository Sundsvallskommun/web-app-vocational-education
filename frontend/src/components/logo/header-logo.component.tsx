import Image from 'next/image';
import NextLink from 'next/link';
import logo_row from '@public/svg/logo_row.svg';

export const HeaderLogo: React.FC = () => {
  return (
    <NextLink
      href="/"
      className="flex relative items-center h-[45px] w-[164px] desktop:h-[51px] desktop:w-[184px] rounded-10 focus:outline-offset-8"
    >
      <Image fill src={logo_row} alt={'Yrkesutbildning Mitt'} />
    </NextLink>
  );
};

export default HeaderLogo;

import ContentBlock from '@components/block/content-block.component';
import { LogosBlock as LogosBlockType } from '@interfaces/admin-data';
import Image from 'next/image';

interface LogosBlockProps {
  logosBlock?: LogosBlockType;
}

const logos: LogosBlockType['logos'] = [
  {
    filename: `${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logos-senders/Harnosand_logo.svg`,
    alt: 'Härnösands Kommun',
  },
  {
    filename: `${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logos-senders/Kramfors_logo.svg`,
    alt: 'Kramfors Kommun',
  },
  {
    filename: `${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logos-senders/Solleftea_logo.svg`,
    alt: 'Sollefteå Kommun',
  },
  {
    filename: `${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logos-senders/SK_logo.svg`,
    alt: 'Sundsvalls Kommun',
  },
  {
    filename: `${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logos-senders/Timra_logo.svg`,
    alt: 'Timrå Kommun',
  },
  {
    filename: `${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logos-senders/Ange_logo.svg`,
    alt: 'Ånge Kommun',
  },
  {
    filename: `${process.env.NEXT_PUBLIC_BASE_PATH}/svg/logos-senders/Ornskoldsvik_logo.svg`,
    alt: 'Örnsköldsvik Kommun',
  },
];

export default function LogosBlock({ logosBlock }: LogosBlockProps) {
  if (!logosBlock?.showBlock) return <></>;
  return (
    <ContentBlock classNameWrapper="LogosBlock bg-green text-white !mb-0" padded>
      <h2>{logosBlock.title}</h2>
      {logosBlock.description ?
        <p className="text !text-inverted-body">{logosBlock.description}</p>
      : null}
      <div className="mt-lg medium-device-min:mt-xl flex flex-col items-center gap-md medium-device-min:flex-row medium-device-min:flex-wrap medium-device-min:justify-center medium-device-min:gap-lg">
        {logos?.map((logo, i) => (
          <Image
            key={`${logo.filename}-${i}`}
            className="h-[11.3rem] w-[26.5rem] text-white dark:text-black pt-md px-xl pb-md border border-[#28a46c]"
            src={logo.filename}
            width={265}
            height={113}
            alt={`${logo.alt}`}
          />
        ))}
      </div>
    </ContentBlock>
  );
}
